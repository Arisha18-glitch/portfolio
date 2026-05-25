import { MongoClient, ObjectId } from 'mongodb'

// ─── Helper: verify admin password from Authorization header ───
function verifyAdmin(req) {
  const auth = req.headers.authorization || ''
  const token = auth.replace('Bearer ', '')
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  if (!ADMIN_PASSWORD || token !== ADMIN_PASSWORD) return false
  return true
}

export default async function handler(req, res) {
  const MONGODB_URI = process.env.MONGODB_URI
  if (!MONGODB_URI) {
    return res.status(500).json({ error: 'Server misconfiguration: missing MONGODB_URI.' })
  }

  let client
  try {
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    })
    await client.connect()
    const db = client.db()
    const collection = db.collection('projects')

    // ─── GET: Fetch all projects (public) ──────────────────────────────
    if (req.method === 'GET') {
      const projects = await collection.find({}).sort({ order: 1, createdAt: -1 }).toArray()
      return res.status(200).json({ projects })
    }

    // ─── POST: Add a new project (admin only) ──────────────────────────
    if (req.method === 'POST') {
      if (!verifyAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })

      const { title, sem, desc, highlights, tech, image, demoType, demoUrl, githubLink, liveLink, order } = req.body || {}
      if (!title || !desc) {
        return res.status(400).json({ error: 'Title and description are required.' })
      }

      const doc = {
        title:      String(title).trim(),
        sem:        sem ? String(sem).trim() : '',
        desc:       String(desc).trim(),
        highlights: Array.isArray(highlights) ? highlights.map(h => String(h).trim()) : [],
        tech:       Array.isArray(tech) ? tech.map(t => String(t).trim()) : [],
        image:      image ? String(image).trim() : '',
        demoType:   ['image', 'gif', 'link'].includes(demoType) ? demoType : null,
        demoUrl:    demoUrl ? String(demoUrl).trim() : '',
        githubLink: githubLink ? String(githubLink).trim() : '',
        liveLink:   liveLink ? String(liveLink).trim() : null,
        order:      typeof order === 'number' ? order : 999,
        createdAt:  new Date(),
      }
      const result = await collection.insertOne(doc)
      return res.status(201).json({ success: true, id: result.insertedId })
    }

    // ─── PUT: Update a project (admin only) ────────────────────────────
    if (req.method === 'PUT') {
      if (!verifyAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })

      const { _id, ...updates } = req.body || {}
      if (!_id) return res.status(400).json({ error: 'Project _id is required.' })

      // Sanitize
      const set = {}
      if (updates.title !== undefined)      set.title      = String(updates.title).trim()
      if (updates.sem !== undefined)         set.sem        = String(updates.sem).trim()
      if (updates.desc !== undefined)        set.desc       = String(updates.desc).trim()
      if (updates.highlights !== undefined)  set.highlights = Array.isArray(updates.highlights) ? updates.highlights.map(h => String(h).trim()) : []
      if (updates.tech !== undefined)        set.tech       = Array.isArray(updates.tech) ? updates.tech.map(t => String(t).trim()) : []
      if (updates.image !== undefined)       set.image      = String(updates.image).trim()
      if (updates.demoType !== undefined)    set.demoType   = ['image', 'gif', 'link'].includes(updates.demoType) ? updates.demoType : null
      if (updates.demoUrl !== undefined)     set.demoUrl    = String(updates.demoUrl).trim()
      if (updates.githubLink !== undefined)  set.githubLink = String(updates.githubLink).trim()
      if (updates.liveLink !== undefined)    set.liveLink   = updates.liveLink ? String(updates.liveLink).trim() : null
      if (updates.order !== undefined)       set.order      = Number(updates.order)

      set.updatedAt = new Date()

      await collection.updateOne({ _id: new ObjectId(_id) }, { $set: set })
      return res.status(200).json({ success: true })
    }

    // ─── DELETE: Remove a project (admin only) ─────────────────────────
    if (req.method === 'DELETE') {
      if (!verifyAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })

      const { _id } = req.body || {}
      if (!_id) return res.status(400).json({ error: 'Project _id is required.' })

      await collection.deleteOne({ _id: new ObjectId(_id) })
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('[/api/projects] Error:', err)
    return res.status(500).json({ error: 'Server error.' })
  } finally {
    if (client) {
      try { await client.close() } catch (_) {}
    }
  }
}
