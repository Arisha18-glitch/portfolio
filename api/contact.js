import { MongoClient } from 'mongodb'

export default async function handler(req, res) {
  // Allow POST only
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' })
  }

  const { name, email, subject, message } = req.body || {}

  // ─── Server-side validation ───────────────────────────────────────────────
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(String(email).trim())) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  const MONGODB_URI = process.env.MONGODB_URI
  if (!MONGODB_URI) {
    return res.status(500).json({ error: 'Server misconfiguration: missing MONGODB_URI.' })
  }

  let client
  try {
    // ─── Connect to MongoDB Atlas ─────────────────────────────────────────
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    })
    await client.connect()

    const db = client.db()                  // Uses the DB name from the URI
    const collection = db.collection('messages')

    // ─── Rate limiting check ──────────────────────────────────────────────
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const recentMessage = await collection.findOne({
      email: String(email).trim().toLowerCase(),
      createdAt: { $gte: fiveMinutesAgo }
    })

    if (recentMessage) {
      return res.status(429).json({ error: 'Too many requests. Please wait 5 minutes before sending another message.' })
    }

    // ─── Insert document ─────────────────────────────────────────────────
    await collection.insertOne({
      name:      String(name).trim(),
      email:     String(email).trim().toLowerCase(),
      subject:   String(subject).trim(),
      message:   String(message).trim(),
      createdAt: new Date(),
    })

    return res.status(200).json({ success: true, message: 'Message received successfully!' })
  } catch (err) {
    console.error('[/api/contact] MongoDB error:', err)
    return res.status(500).json({ error: 'Failed to save message. Please try again later.' })
  } finally {
    // ─── Always close the connection ─────────────────────────────────────
    if (client) {
      try { await client.close() } catch (_) { /* ignore close errors */ }
    }
  }
}
