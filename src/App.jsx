import { useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X, Github, Linkedin, Mail, ArrowUpRight, ChevronDown, ZoomIn, Loader2, FileText, Plus, Pencil, Trash2, Image, Eye, LogOut, Lock, Save } from 'lucide-react'
import './App.css'

/* ─── Default / fallback projects ─── */
const defaultProjects = [
  {
    title: 'NeuroTick',
    desc: 'A comprehensive educational platform for interactive STEM learning, combining quiz-based content with immersive 3D model visualization.',
    highlights: ['500+ quiz questions across 5 STEM categories', 'Interactive 3D GLB model viewer for complex concepts', 'Full user authentication and progress tracking via Firebase', 'Community Q&A platform with real-time updates', 'Responsive UI with light/dark theme support'],
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Provider', '3D GLB'],
    image: '/demos/neurotick.png', demoType: null, demoUrl: '', liveLink: null,
    githubLink: 'https://github.com/Arisha18-glitch/Neuro-Tick',
  },
  {
    title: 'DDoS Attack Detection System',
    desc: 'A machine learning system for real-time detection and classification of DDoS attacks, achieving 99.57% accuracy across 8 distinct attack categories.',
    highlights: ['99.57% detection accuracy using ensemble classification', 'Analyzes 77 network flow features per sample', 'Identifies 8 attack types vs. normal traffic', 'Trained on the CIC-DDoS2019 benchmark dataset', 'Interactive web interface built with Streamlit'],
    tech: ['Python', 'XGBoost', 'Random Forest', 'Scikit-learn', 'Streamlit', 'Pandas'],
    image: '/demos/ddos-detection.png', demoType: null, demoUrl: '', liveLink: null,
    githubLink: 'https://github.com/Arisha18-glitch/DDOS-DETECTION',
  },
  {
    title: 'Vibe Sync',
    desc: 'An AI-powered interior design system that transforms text descriptions into animated, particle-based spatial visualizations using depth estimation and real-time 3D rendering.',
    highlights: ['Text-to-image generation via Transformer models', 'Particle animations driven by AI-generated depth maps', 'Custom GLSL shaders for glow and depth effects', 'Real-time 3D rendering in-browser via Three.js'],
    tech: ['Three.js', 'Transformers', 'Custom Shaders', 'Depth Estimation', 'WebGL'],
    image: '/demos/vibe-sync.png', demoType: null, demoUrl: '', liveLink: null,
    githubLink: 'https://github.com/Arisha18-glitch/vibe-sync',
  },
  {
    title: 'AI Network Detection & Diagnosis',
    desc: 'A network monitoring system using AI-based rule logic to detect suspicious traffic patterns, generate real-time alerts, and visualize network health through an interactive dashboard.',
    highlights: ['Real-time traffic anomaly detection and alerting', 'Interactive visualization dashboard', 'MongoDB-backed secure authentication', 'Modular Flask architecture with logging'],
    tech: ['Python', 'Flask', 'MongoDB', 'HTML', 'CSS', 'JavaScript'],
    image: '/demos/ai-network.png', demoType: null, demoUrl: '', liveLink: null,
    githubLink: 'https://github.com/Arisha18-glitch/Network-Detection',
  },
  {
    title: 'Task Manager System',
    desc: 'A data structures course project implementing a full-featured task management system in C++, applying queue and dynamic array concepts in a practical application.',
    highlights: ['Task handling with Queue and dynamic array structures', 'Reminder system with sound notifications', 'Integrated chatbot assistant (Task Buddy)', 'Structured multi-window interface design'],
    tech: ['C++', 'Data Structures', 'HTML', 'JavaScript', 'Python'],
    image: '/demos/task-manager.png', demoType: null, demoUrl: '', liveLink: null,
    githubLink: 'https://github.com/Arisha18-glitch/Task-manager',
  },
  {
    title: 'AURA — Audio Visual Response',
    desc: '• Voice-responsive embedded system for audio-visual feedback\n• Integrates AI speech recognition with on-device hardware control\n• Built by a 6-member all-women engineering team',
    highlights: ['Voice input processed via Python Whisper model', 'Animated LCD display with response output', 'Speaker module for audio feedback', 'Developed by a 6-member all-women engineering team'],
    tech: ['Arduino Mega', 'Arduino Nano', 'Python', 'Whisper', 'LCD', 'Embedded Systems'],
    image: '/demos/aura.png', demoType: null, demoUrl: '', liveLink: null,
    githubLink: 'https://github.com/Arisha18-glitch/Aura-voice-to-text-assistant',
  },
  {
    title: 'Clirix — Your Thinking Layer',
    desc: 'A fully local AI assistant running 100% offline via Ollama. Features conversational streaming, document intelligence (RAG), voice input, and tone control with zero data leaving the machine.',
    highlights: ['Streams responses word-by-word like ChatGPT via Ollama', 'Document intelligence with custom chunking RAG engine', 'One-click voice input via Google STT', '5 System Prompt modes for dynamic tone control'],
    tech: ['Python', 'Streamlit', 'Ollama', 'SpeechRecognition', 'pdfplumber'],
    image: '', demoType: null, demoUrl: '', liveLink: null,
    githubLink: '',
  },
  {
    title: 'Medical Language Model Fine-tuning (QLoRA + Unsloth)',
    desc: 'Fine-tuned Llama 3 8B on a medical Q&A dataset using QLoRA (4-bit quantization + LoRA adapters) via Unsloth on Google Colab.',
    highlights: ['Trained on 33,955 medical examples with only 0.52% of parameters updated', 'Significantly reduced memory usage while maintaining model quality', 'Deployed fine-tuned adapter on Hugging Face Hub'],
    tech: ['Python', 'Unsloth', 'QLoRA', 'Llama 3', 'Hugging Face', 'Google Colab', 'PEFT', 'TRL'],
    image: '', demoType: null, demoUrl: '', liveLink: null,
    githubLink: '',
  },
  {
    title: 'Cognita AI- an Offline-First Mobile AI Teaching Assistant',
    desc: 'An offline-first mobile AI teaching assistant integrating Google Gemini API and a fine-tuned TinyLlama model. Deployed on Hugging Face Spaces for interactive use.',
    highlights: ['Fine-tuned TinyLlama and deployed to Hugging Face', 'Applied 4-bit quantization via BitsAndBytesConfig for on-device inference'],
    tech: ['TinyLlama', 'Google Gemini API', 'Hugging Face', 'BitsAndBytes', 'Quantization'],
    image: '', demoType: null, demoUrl: 'https://huggingface.co/spaces/SyedaArisha/cognita', liveLink: 'https://huggingface.co/spaces/SyedaArisha/cognita',
    githubLink: '',
  },
  {
    title: 'YOLO Vehicle Detection System',
    desc: 'A computer vision system designed for real-time vehicle detection and tracking using YOLO models.',
    highlights: ['Implemented custom object detection pipelines', 'Visualized data and bounding boxes using OpenCV and Matplotlib'],
    tech: ['Python', 'Computer Vision', 'YOLO', 'OpenCV', 'Matplotlib'],
    image: '', demoType: null, demoUrl: '', liveLink: null,
    githubLink: '',
  },

]

const skillGroups = [
  { label: 'Languages', skills: ['Python', 'C++', 'Dart', 'JavaScript', 'PHP', 'Assembly (MASM)'] },
  { label: 'Frameworks & Tools', skills: ['Flask', 'Flutter', 'React', 'Laravel', 'Streamlit', 'Three.js', 'OpenCV'] },
  { label: 'AI & Machine Learning', skills: ['XGBoost', 'Random Forest', 'Scikit-learn', 'Transformers', 'NLP', 'GPT-2'] },
  { label: 'Databases & Cloud', skills: ['MongoDB', 'Firebase', 'Firestore', 'MySQL'] },
]

const certifications = [
  {
    provider: 'DeepLearning.AI / Coursera',
    title: 'DLSE Program Scholar',
    desc: 'Selected for the DeepLearning.AI Specialization track to master deep learning and AI concepts.'
  },
  {
    provider: 'Microsoft Learn',
    title: 'AI & Responsible AI',
    desc: 'Completed comprehensive track including Fundamentals of Generative AI, Azure OpenAI Service, Responsible AI Principles, and Scaling AI.'
  },
  {
    provider: 'IBM',
    title: 'Python for Data Science, AI & Development',
    desc: 'Mastered Python programming for data analysis and AI pipelines. Achieved grade: 87.75%.'
  },
  {
    provider: 'DataCamp',
    title: 'Introduction to Python',
    desc: 'Foundational programming in Python.'
  }
]

const marqueeItems = ['Flutter', 'Python', 'Machine Learning', 'Firebase', 'React', 'Three.js', 'Arduino', 'XGBoost', 'Streamlit', 'C++', 'OpenCV', 'NLP']
const roles = ['Software Engineer', 'AI Enthusiast', 'Mobile App Developer', 'ML Engineer', 'Full-Stack Builder']

/* ═══════════════════════════════════════
   TOAST SYSTEM
   ═══════════════════════════════════════ */
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span className="toast-msg">{t.message}</span>
          <button className="toast-close" onClick={() => removeToast(t.id)}><X size={14} /></button>
        </div>
      ))}
    </div>
  )
}

function useToast() {
  const [toasts, setToasts] = useState([])
  const add = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
  }, [])
  const remove = useCallback((id) => setToasts(prev => prev.filter(t => t.id !== id)), [])
  return { toasts, add, remove }
}

/* ═══════════════════════════════════════
   CONSTELLATION CANVAS
   ═══════════════════════════════════════ */
function ConstellationCanvas() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const mouse = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = [], cw, ch
    const count = 70, maxDist = 130, mouseR = 160

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      cw = canvas.offsetWidth
      ch = canvas.offsetHeight
      canvas.width = cw * dpr
      canvas.height = ch * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const init = () => {
      particles = []
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * cw, y: Math.random() * ch,
          vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 2 + 0.8
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, cw, ch)
      for (const p of particles) {
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < mouseR && d > 0) {
          const f = (mouseR - d) / mouseR * 0.6
          p.x += dx / d * f; p.y += dy / d * f
        }
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > cw) p.vx *= -1
        if (p.y < 0 || p.y > ch) p.vy *= -1
        p.x = Math.max(0, Math.min(cw, p.x))
        p.y = Math.max(0, Math.min(ch, p.y))
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < maxDist) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(154,123,79,${(1 - d / maxDist) * 0.1})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(154,123,79,0.22)'
        ctx.fill()
      }
      animRef.current = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => { mouse.current = { x: -1000, y: -1000 } }

    resize(); init(); draw()
    window.addEventListener('resize', () => { resize(); init() })
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" style={{ width: '100%', height: '100%' }} />
}

/* ═══════════════════════════════════════
   TYPEWRITER
   ═══════════════════════════════════════ */
function Typewriter({ words, speed = 90, pause = 1800 }) {
  const [text, setText] = useState('')
  const [wi, setWi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const w = words[wi]
    let t
    if (!del && ci <= w.length) {
      t = setTimeout(() => { setText(w.slice(0, ci)); setCi(c => c + 1) }, speed)
    } else if (!del && ci > w.length) {
      t = setTimeout(() => setDel(true), pause)
    } else if (del && ci >= 0) {
      t = setTimeout(() => { setText(w.slice(0, ci)); setCi(c => c - 1) }, speed / 2)
    } else {
      setDel(false); setWi((wi + 1) % words.length); setCi(0)
    }
    return () => clearTimeout(t)
  }, [ci, del, wi, words, speed, pause])

  return (
    <>
      <span className="type-dynamic">{text}</span>
      <span className="type-cursor" />
    </>
  )
}

/* ═══════════════════════════════════════
   FADE-IN ON SCROLL
   ═══════════════════════════════════════ */
function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add('vis'), delay); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className="fi">{children}</div>
}

/* ═══════════════════════════════════════
   ANIMATED STAT COUNTER
   ═══════════════════════════════════════ */
function AnimatedStat({ value, label }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const num = parseFloat(value)
    const isNum = !isNaN(num)
    const suffix = isNum ? value.replace(String(num), '') : ''

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add('vis')
        if (isNum) {
          const dec = value.includes('.')
          let i = 0
          const iv = setInterval(() => {
            i++
            const p = i / 40
            const ea = 1 - Math.pow(1 - p, 3)
            const c = num * ea
            setDisplay((dec ? c.toFixed(2) : Math.round(c)) + suffix)
            if (i >= 40) { clearInterval(iv); setDisplay(value) }
          }, 40)
        }
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return (
    <div className="stat" ref={ref}>
      <div className="stn">{display}</div>
      <div className="stl">{label}</div>
    </div>
  )
}

/* ═══════════════════════════════════════
   PROJECT IMAGE with skeleton loader
   ═══════════════════════════════════════ */
function ProjectImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className="pimg-wrap">
      {!loaded && !error && <div className="pimg-skeleton" />}
      {!error && src ? (
        <img src={src} alt={alt} className={`pimg ${loaded ? 'pimg-loaded' : ''}`}
          onLoad={() => setLoaded(true)} onError={() => setError(true)} />
      ) : (
        <div className="pimg-placeholder">
          <span className="pimg-placeholder-text">{alt}</span>
        </div>
      )}
      <div className="pimg-overlay">
        <ZoomIn size={22} className="pimg-zoom-icon" />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   DEMO MODAL (lightbox for image/gif)
   ═══════════════════════════════════════ */
function DemoModal({ isOpen, onClose, title, demoType, demoUrl }) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="demo-modal-backdrop" onClick={onClose}>
      <div className="demo-modal" onClick={e => e.stopPropagation()}>
        <div className="demo-modal-header">
          <h3 className="demo-modal-title">{title}</h3>
          <span className="demo-modal-badge">{demoType === 'gif' ? 'GIF' : 'Image'}</span>
          <button className="demo-modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="demo-modal-body">
          <img src={demoUrl} alt={`${title} demo`} className="demo-modal-img" />
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   ADMIN PANEL
   ═══════════════════════════════════════ */
const emptyProject = {
  title: '', sem: '', desc: '', highlights: [''], tech: [''],
  image: '', demoType: null, demoUrl: '', githubLink: '', liveLink: '', order: 999,
}

function AdminPanel({ onClose, addToast }) {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ ...emptyProject })
  const [saving, setSaving] = useState(false)
  const [githubSyncing, setGithubSyncing] = useState(false)

  const storedPass = useRef('')

  // Attempt login
  const handleLogin = async (e) => {
    e.preventDefault()
    if (!password.trim()) return
    setAuthLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      })
      if (!res.ok) throw new Error('Invalid password')
      storedPass.current = password.trim()
      setAuthed(true)
      addToast('Welcome, Admin!', 'success')
      fetchProjects()
    } catch {
      // Local development fallback (Vite DEV mode only)
      if (import.meta.env.DEV && (password.trim() === 'admin' || password.trim() === 'rishu123')) {
        storedPass.current = 'admin'
        setAuthed(true)
        addToast('Local mode: Welcome!', 'success')
        fetchProjects()
      } else {
        addToast('Invalid password or API unavailable', 'error')
      }
    } finally {
      setAuthLoading(false)
    }
  }

  // Fetch from GitHub
  const handleGithubSync = async () => {
    if (!window.confirm('This will fetch your public repositories from GitHub and add them as projects. Proceed?')) return
    setGithubSyncing(true)
    try {
      const res = await fetch('https://api.github.com/users/Arisha18-glitch/repos?sort=updated&per_page=15')
      if (!res.ok) throw new Error('Failed to fetch from GitHub')
      const repos = await res.json()

      let addedCount = 0
      for (const repo of repos) {
        if (repo.fork) continue
        const exists = projects.find(p => p.githubLink === repo.html_url)
        if (exists) continue

        const body = {
          title: repo.name.replace(/-/g, ' '),
          sem: 'GitHub Repo',
          desc: repo.description || 'No description provided.',
          highlights: [],
          tech: repo.language ? [repo.language] : [],
          image: '',
          demoType: null,
          demoUrl: '',
          githubLink: repo.html_url,
          liveLink: repo.homepage || null,
          order: 999
        }

        await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedPass.current}`,
          },
          body: JSON.stringify(body),
        })
        addedCount++
      }

      addToast(`Imported ${addedCount} new projects from GitHub!`, 'success')
      fetchProjects()
    } catch (err) {
      addToast(err.message || 'GitHub sync failed', 'error')
    } finally {
      setGithubSyncing(false)
    }
  }

  // Fetch projects from DB
  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/projects')
      const text = await res.text()
      try {
        const data = JSON.parse(text)
        setProjects(data.projects || [])
      } catch {
        throw new Error('Local API unavailable')
      }
    } catch {
      // Local fallback
      const local = localStorage.getItem('local_projects')
      if (local) {
        setProjects(JSON.parse(local))
      } else {
        const initial = defaultProjects.map((p, i) => ({ ...p, _id: 'def_' + i }))
        localStorage.setItem('local_projects', JSON.stringify(initial))
        setProjects(initial)
      }
    } finally {
      setLoading(false)
    }
  }

  // Start editing
  const startEdit = (p) => {
    setEditing(p._id || 'existing')
    setForm({
      ...emptyProject,
      ...p,
      highlights: p.highlights && p.highlights.length ? p.highlights : [''],
      tech: p.tech && p.tech.length ? p.tech : [''],
    })
  }

  const startNew = () => {
    setEditing('new')
    setForm({ ...emptyProject, highlights: [''], tech: [''] })
  }

  // Save (add or update)
  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.desc.trim()) {
      addToast('Title and description are required', 'error')
      return
    }
    setSaving(true)
    try {
      const body = {
        ...form,
        highlights: form.highlights.filter(h => h.trim()),
        tech: form.tech.filter(t => t.trim()),
      }
      const isNew = editing === 'new'
      const res = await fetch('/api/projects', {
        method: isNew ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedPass.current}`,
        },
        body: JSON.stringify(isNew ? body : { _id: form._id, ...body }),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error) }
      addToast(isNew ? 'Project added!' : 'Project updated!', 'success')
      setEditing(null)
      fetchProjects()
    } catch (err) {
      // Local fallback for saving
      const local = JSON.parse(localStorage.getItem('local_projects') || '[]')
      const body = {
        ...form,
        highlights: form.highlights.filter(h => h.trim()),
        tech: form.tech.filter(t => t.trim()),
      }
      if (isNew) {
        body._id = 'local_' + Date.now()
        local.push(body)
      } else {
        const idx = local.findIndex(p => p._id === (form._id || body._id))
        if (idx !== -1) local[idx] = { ...local[idx], ...body }
      }
      localStorage.setItem('local_projects', JSON.stringify(local))
      addToast(isNew ? 'Saved locally!' : 'Updated locally!', 'success')
      setEditing(null)
      fetchProjects()
    } finally {
      setSaving(false)
    }
  }

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project permanently?')) return
    try {
      const res = await fetch('/api/projects', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedPass.current}`,
        },
        body: JSON.stringify({ _id: id }),
      })
      if (!res.ok) throw new Error()
      addToast('Project deleted', 'success')
      fetchProjects()
    } catch {
      // Local fallback for delete
      const local = JSON.parse(localStorage.getItem('local_projects') || '[]')
      const filtered = local.filter(p => p._id !== id)
      localStorage.setItem('local_projects', JSON.stringify(filtered))
      addToast('Deleted locally', 'success')
      fetchProjects()
    }
  }

  // Array field helpers
  const updateArrayField = (field, index, value) => {
    setForm(f => {
      const arr = [...f[field]]
      arr[index] = value
      return { ...f, [field]: arr }
    })
  }
  const addArrayField = (field) => setForm(f => ({ ...f, [field]: [...f[field], ''] }))
  const removeArrayField = (field, index) => {
    setForm(f => {
      const arr = f[field].filter((_, i) => i !== index)
      return { ...f, [field]: arr.length ? arr : [''] }
    })
  }

  /* ─── LOGIN SCREEN ─── */
  if (!authed) {
    return (
      <div className="admin-backdrop" onClick={onClose}>
        <div className="admin-panel admin-login" onClick={e => e.stopPropagation()}>
          <button className="admin-close" onClick={onClose}><X size={18} /></button>
          <div className="admin-login-icon"><Lock size={28} /></div>
          <h2 className="admin-title">Project Manager</h2>
          <p className="admin-subtitle">Enter admin password to continue</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <input
              type="password" className="finp admin-pass-input" placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)} autoFocus
            />
            <button type="submit" className="bgold admin-login-btn" disabled={authLoading}>
              {authLoading ? <><Loader2 size={15} className="spin" /> Verifying…</> : <>Sign In <ArrowUpRight size={14} /></>}
            </button>
          </form>
        </div>
      </div>
    )
  }

  /* ─── EDIT / ADD FORM ─── */
  if (editing !== null) {
    return (
      <div className="admin-backdrop" onClick={onClose}>
        <div className="admin-panel admin-wide" onClick={e => e.stopPropagation()}>
          <div className="admin-header">
            <h2 className="admin-title">{editing === 'new' ? 'Add Project' : 'Edit Project'}</h2>
            <button className="admin-close" onClick={() => setEditing(null)}><X size={18} /></button>
          </div>
          <form onSubmit={handleSave} className="admin-form">
            <div className="admin-form-grid">
              <div className="admin-field">
                <label className="flbl">Title *</label>
                <input className="finp" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Project title" />
              </div>
              <div className="admin-field">
                <label className="flbl">Semester / Tag</label>
                <input className="finp" value={form.sem} onChange={e => setForm(f => ({ ...f, sem: e.target.value }))} placeholder="e.g. 6th Semester, Recent" />
              </div>
              <div className="admin-field admin-full">
                <label className="flbl">Description *</label>
                <textarea className="farea" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Project description" />
              </div>
              <div className="admin-field">
                <label className="flbl">Card Image URL</label>
                <input className="finp" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="/demos/project.png" />
              </div>
              <div className="admin-field">
                <label className="flbl">GitHub Link</label>
                <input className="finp" value={form.githubLink} onChange={e => setForm(f => ({ ...f, githubLink: e.target.value }))} placeholder="https://github.com/..." />
              </div>
              <div className="admin-field">
                <label className="flbl">Live Link (optional)</label>
                <input className="finp" value={form.liveLink || ''} onChange={e => setForm(f => ({ ...f, liveLink: e.target.value || null }))} placeholder="https://..." />
              </div>
              <div className="admin-field">
                <label className="flbl">Display Order</label>
                <input className="finp" type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} />
              </div>

              {/* Demo type selector */}
              <div className="admin-field admin-full">
                <label className="flbl">Demo Preview</label>
                <div className="admin-demo-row">
                  <select className="finp admin-select" value={form.demoType || ''} onChange={e => setForm(f => ({ ...f, demoType: e.target.value || null }))}>
                    <option value="">None (Coming Soon)</option>
                    <option value="image">Image Screenshot</option>
                    <option value="gif">GIF / Animation</option>
                    <option value="link">Live Link (external)</option>
                  </select>
                  {(form.demoType === 'image' || form.demoType === 'gif') && (
                    <input className="finp" value={form.demoUrl} onChange={e => setForm(f => ({ ...f, demoUrl: e.target.value }))}
                      placeholder={form.demoType === 'gif' ? 'URL to .gif file' : 'URL to screenshot image'} style={{ flex: 1 }} />
                  )}
                  {form.demoType === 'link' && (
                    <input className="finp" value={form.demoUrl || form.liveLink || ''} onChange={e => setForm(f => ({ ...f, demoUrl: e.target.value }))}
                      placeholder="https://live-demo-url.com" style={{ flex: 1 }} />
                  )}
                </div>
                {form.demoType && form.demoUrl && (form.demoType === 'image' || form.demoType === 'gif') && (
                  <div className="admin-demo-preview">
                    <img src={form.demoUrl} alt="Demo preview" className="admin-demo-thumb" />
                  </div>
                )}
              </div>

              {/* Highlights */}
              <div className="admin-field admin-full">
                <label className="flbl">Highlights</label>
                {form.highlights.map((h, i) => (
                  <div key={i} className="admin-array-row">
                    <input className="finp" value={h} onChange={e => updateArrayField('highlights', i, e.target.value)} placeholder={`Highlight ${i + 1}`} />
                    <button type="button" className="admin-arr-btn admin-arr-del" onClick={() => removeArrayField('highlights', i)}><X size={14} /></button>
                  </div>
                ))}
                <button type="button" className="admin-arr-btn admin-arr-add" onClick={() => addArrayField('highlights')}><Plus size={14} /> Add highlight</button>
              </div>

              {/* Tech tags */}
              <div className="admin-field admin-full">
                <label className="flbl">Tech Stack</label>
                {form.tech.map((t, i) => (
                  <div key={i} className="admin-array-row">
                    <input className="finp" value={t} onChange={e => updateArrayField('tech', i, e.target.value)} placeholder={`Tech ${i + 1}`} />
                    <button type="button" className="admin-arr-btn admin-arr-del" onClick={() => removeArrayField('tech', i)}><X size={14} /></button>
                  </div>
                ))}
                <button type="button" className="admin-arr-btn admin-arr-add" onClick={() => addArrayField('tech')}><Plus size={14} /> Add tech</button>
              </div>
            </div>

            <div className="admin-form-actions">
              <button type="button" className="bghost" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="bgold" disabled={saving}>
                {saving ? <><Loader2 size={15} className="spin" /> Saving…</> : <><Save size={15} /> Save Project</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  /* ─── PROJECT LIST ─── */
  return (
    <div className="admin-backdrop" onClick={onClose}>
      <div className="admin-panel admin-wide" onClick={e => e.stopPropagation()}>
        <div className="admin-header">
          <h2 className="admin-title">Project Manager</h2>
          <div className="admin-header-actions">
            <button className="bghost admin-add-btn" onClick={handleGithubSync} disabled={githubSyncing}>
              {githubSyncing ? <Loader2 size={15} className="spin" /> : <Github size={15} />} Sync GitHub
            </button>
            <button className="bgold admin-add-btn" onClick={startNew}><Plus size={15} /> Add Project</button>
            <button className="admin-close" onClick={() => { setAuthed(false); onClose() }}><LogOut size={16} /></button>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading"><Loader2 size={24} className="spin" /> Loading projects…</div>
        ) : projects.length === 0 ? (
          <div className="admin-empty">
            <p>No projects in database yet.</p>
            <p className="admin-empty-hint">Projects from your code are used as defaults. Add projects here to manage them dynamically.</p>
          </div>
        ) : (
          <div className="admin-list">
            {projects.map(p => (
              <div key={p._id} className="admin-project-row">
                <div className="admin-project-info">
                  {p.image && <img src={p.image} alt="" className="admin-project-thumb" />}
                  <div>
                    <div className="admin-project-title">{p.title}</div>
                    <div className="admin-project-meta">
                      {p.sem && <span className="psem" style={{ fontSize: '0.58rem' }}>{p.sem}</span>}
                      {p.demoType && (
                        <span className="admin-demo-badge">
                          {p.demoType === 'gif' ? '🎬 GIF' : p.demoType === 'image' ? '🖼 Image' : '🔗 Link'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="admin-project-actions">
                  <button className="admin-action-btn" onClick={() => startEdit(p)} title="Edit"><Pencil size={15} /></button>
                  <button className="admin-action-btn admin-action-del" onClick={() => handleDelete(p._id)} title="Delete"><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [navVisible, setNavVisible] = useState(true)
  const [navScrolled, setNavScrolled] = useState(false)
  const [heroReady, setHeroReady] = useState(false)
  const lastScrollY = useRef(0)
  const cursorRef = useRef(null)
  const { toasts, add: addToast, remove: removeToast } = useToast()

  // Contact form state
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formSubject, setFormSubject] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState('')

  // Projects from DB + fallback
  const [projects, setProjects] = useState(defaultProjects)

  // Admin panel
  const [showAdmin, setShowAdmin] = useState(false)

  // Demo modal
  const [demoModal, setDemoModal] = useState({ open: false, title: '', demoType: '', demoUrl: '' })

  // Check URL hash for admin on mount + hash change
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') setShowAdmin(true)
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  // Fetch projects from API
  useEffect(() => {
    fetch('/api/projects')
      .then(async r => {
        const text = await r.text()
        try {
          return JSON.parse(text)
        } catch {
          const local = localStorage.getItem('local_projects')
          return local ? { projects: JSON.parse(local) } : null
        }
      })
      .then(data => {
        if (data && data.projects && data.projects.length > 0) {
          setProjects(data.projects)
        } else {
          const local = localStorage.getItem('local_projects')
          if (local) setProjects(JSON.parse(local))
        }
      })
      .catch(() => {
        const local = localStorage.getItem('local_projects')
        if (local) setProjects(JSON.parse(local))
      })
  }, [showAdmin]) // refetch when admin closes (projects may have changed)

  useEffect(() => { setTimeout(() => setHeroReady(true), 150) }, [])

  // Cursor glow
  useEffect(() => {
    const onMove = (e) => {
      const el = cursorRef.current
      if (!el) return
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
      el.classList.add('active')
    }
    const onLeave = () => cursorRef.current?.classList.remove('active')
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => { window.removeEventListener('mousemove', onMove); document.removeEventListener('mouseleave', onLeave) }
  }, [])

  // Card mouse tracking for radial glow
  const handleCardMouse = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%')
    e.currentTarget.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%')
  }, [])

  // Scroll tracking
  useEffect(() => {
    const fn = () => {
      const y = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docH > 0 ? y / docH : 0)
      setNavVisible(y < lastScrollY.current || y < 80)
      setNavScrolled(y > 40)
      lastScrollY.current = y
      const ids = ['home', 'about', 'certifications', 'projects', 'contact']
      const pos = y + 140
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  // Contact form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(''); setFormSuccess(false)

    // Client-side rate limit check (5 mins)
    const lastSubmit = localStorage.getItem('lastContactSubmit')
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < 5 * 60 * 1000) {
      setFormError('Please wait a few minutes before sending another message.')
      return
    }

    if (!formName.trim() || !formEmail.trim() || !formSubject.trim() || !formMessage.trim()) { setFormError('Please fill in all fields.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail.trim())) { setFormError('Please enter a valid email address.'); return }
    setFormLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formName.trim(), email: formEmail.trim(), subject: formSubject.trim(), message: formMessage.trim() }),
      })
      const text = await res.text()
      let data
      try { data = JSON.parse(text) } catch { throw new Error('API unavailable locally. Try running "npx vercel dev" instead.') }
      if (!res.ok) throw new Error(data.error || 'Server error')
      localStorage.setItem('lastContactSubmit', Date.now().toString())
      setFormSuccess(true); setFormName(''); setFormEmail(''); setFormSubject(''); setFormMessage('')
      addToast('Message sent successfully!', 'success')
    } catch (err) {
      setFormError(err.message || 'Something went wrong.'); addToast('Failed to send message.', 'error')
    } finally { setFormLoading(false) }
  }

  // Demo button click handler
  const handleDemoClick = (p) => {
    if (p.demoType === 'link') {
      window.open(p.demoUrl || p.liveLink, '_blank')
    } else if (p.demoType === 'image' || p.demoType === 'gif') {
      setDemoModal({ open: true, title: p.title, demoType: p.demoType, demoUrl: p.demoUrl })
    } else if (p.liveLink) {
      window.open(p.liveLink, '_blank')
    }
  }

  return (
    <div>
      <div ref={cursorRef} className="cursor-glow" />
      <div className="progress-bar" style={{ transform: `scaleX(${scrollProgress})` }} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Demo modal */}
      <DemoModal
        isOpen={demoModal.open}
        onClose={() => setDemoModal(m => ({ ...m, open: false }))}
        title={demoModal.title}
        demoType={demoModal.demoType}
        demoUrl={demoModal.demoUrl}
      />

      {/* Admin panel */}
      {showAdmin && (
        <AdminPanel
          onClose={() => { setShowAdmin(false); window.location.hash = '' }}
          addToast={addToast}
        />
      )}

      {/* ─── NAV ─── */}
      <nav className={`nav ${navVisible ? 'visible' : 'hidden'} ${navScrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="logo" onClick={() => go('home')}>
            <span className="logo-mark">SA</span>
            <span className="logo-text">Syeda Arisha</span>
          </div>
          <div className="nav-links">
            {['home', 'about', 'certifications', 'projects', 'contact'].map(s => (
              <button key={s} className={`nbtn ${active === s ? 'act' : ''}`} onClick={() => go(s)}>{s}</button>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="nav-resume-btn" id="nav-resume-btn">
              <FileText size={14} /> Resume
            </a>
          </div>
          <button className="mobbtn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className={`mobmenu ${menuOpen ? 'open' : ''}`}>
          {['home', 'about', 'certifications', 'projects', 'contact'].map(s => (
            <button key={s} className="moblink" onClick={() => go(s)}>{s}</button>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="moblink mob-resume-link">
            <FileText size={14} style={{ display: 'inline', marginRight: '0.4rem' }} /> Resume
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="home" className="hero">
        <ConstellationCanvas />
        <div className={`hero-content ${heroReady ? 'hero-anim' : ''}`}>
          <div className="hero-left">
            <h2 className="hero-greeting">Hi There,</h2>
            <h1 className="hero-name">I'm Syeda <em>Arisha Hassan</em></h1>
            <div className="hero-typing">
              <span className="type-static">I Am Into&nbsp;</span>
              <Typewriter words={roles} speed={90} pause={1800} />
            </div>
            <p className="hero-desc">
              Building intelligent systems from machine learning models and embedded
              hardware to mobile apps and AI-powered web experiences. Currently a 6th semester
              Software Engineer.
            </p>
            <div className="hero-btns">
              <button className="bgold" onClick={() => go('about')}>About Me <ChevronDown size={15} /></button>
              <button className="bghost" onClick={() => go('projects')}>View Projects</button>
            </div>
            <div className="socials">
              <a className="soc-link" href="https://linkedin.com/in/sayedaarisha1218" target="_blank" rel="noreferrer" title="LinkedIn"><Linkedin size={18} /></a>
              <a className="soc-link" href="https://github.com/Arisha18-glitch" target="_blank" rel="noreferrer" title="GitHub"><Github size={18} /></a>
              <a className="soc-link" href="mailto:arisha1218hassan@gmail.com" title="Email"><Mail size={18} /></a>
            </div>
          </div>
          <div className="hero-right">
            <div className="avatar-container">
              <div className="avatar-glow" />
              <div className="avatar-ring-outer" />
              <div className="avatar-ring" />
              <div className="avatar-main">
                <img src="/avatar.png" alt="Syeda Arisha Hassan" />
              </div>
              <div className="avatar-float-dots">
                <div className="af-dot" /><div className="af-dot" /><div className="af-dot" />
                <div className="af-dot" /><div className="af-dot" /><div className="af-dot" />
              </div>
            </div>
          </div>
        </div>
        <button className="scroll-hint" onClick={() => go('about')}>
          Scroll <ChevronDown size={16} className="scroll-bounce" />
        </button>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span className="marquee-item" key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <section id="about" className="sec about-sec">
        <div className="sec-inner">
          <FadeIn>
            <div className="slabel">About</div>
            <h2 className="sh">Building at the intersection<br />of software &amp; intelligence</h2>
          </FadeIn>
          <div className="agrid">
            <FadeIn delay={100}>
              <p className="ap">I'm <strong>Syeda Arisha Hassan</strong>, a Software Engineer with a broad foundation across AI, systems programming, mobile development, and web technologies.</p>
              <p className="ap">My work spans <strong>machine learning pipelines</strong>, <strong>real-time 3D web experiences</strong>, <strong>embedded systems</strong>, and <strong>full-stack mobile apps</strong>. I approach every project with a focus on clean architecture and thoughtful design.</p>
              <p className="ap">From a DDoS detection system to a voice-responsive embedded assistant, Each project reflects a commitment to technical depth and practical impact.</p>
              <div className="stats">
                <AnimatedStat value="10+" label="Projects Completed" />
                <AnimatedStat value="99.57%" label="DDoS Detection Accuracy" />
                <AnimatedStat value="6th" label="Semester — SE" />
                <AnimatedStat value="87%" label="IBM Python Course" />
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="sktitle">Technical Skills</div>
              {skillGroups.map(g => (
                <div className="skgrp" key={g.label}>
                  <div className="sklbl">{g.label}</div>
                  <div className="sktags">{g.skills.map(s => <span className="sktag" key={s}>{s}</span>)}</div>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section id="certifications" className="sec cert-sec">
        <div className="sec-inner">
          <FadeIn>
            <div className="slabel">Continuous Learning</div>
            <h2 className="sh">Certifications &amp; Achievements</h2>
            <p className="sdesc">Ongoing education, specialized programs, and professional certifications in AI, Data Science, and Software Development.</p>
          </FadeIn>
          <div className="cert-grid">
            {certifications.map((cert, i) => (
              <FadeIn key={cert.title} delay={i * 100}>
                <div className="cert-card">
                  <div className="cert-provider">{cert.provider}</div>
                  <div className="cert-title">{cert.title}</div>
                  <div className="cert-desc">{cert.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="sec psec">
        <div className="sec-inner">
          <FadeIn>
            <div className="slabel">My Work</div>
            <h2 className="sh">Projects</h2>
            <p className="sdesc">A selection of academic, independent, and team projects spanning AI, mobile development, embedded systems, and web technologies.</p>
          </FadeIn>
          <div className="pgrid">
            {projects.map((p, i) => (
              <FadeIn key={p._id || p.title} delay={i * 100}>
                <div className="pcard" onMouseMove={handleCardMouse}>
                  <ProjectImage src={p.image} alt={p.title} />
                  <div className="pidx">{String(i + 1).padStart(2, '0')}</div>

                  <div className="ptitle">{p.title}</div>
                  <div className="pdesc">{p.desc}</div>
                  {p.highlights && p.highlights.length > 0 && p.highlights[0] !== '' && (
                    <ul className="phigh">{p.highlights.map(h => <li key={h}>{h}</li>)}</ul>
                  )}
                  {p.tech && p.tech.length > 0 && p.tech[0] !== '' && (
                    <div className="ptags">{p.tech.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
                  )}

                  {/* Action buttons */}
                  <div className="pbtns">
                    {/* Demo button */}
                    {p.demoType === 'image' || p.demoType === 'gif' ? (
                      <button className="pbtn pbtn-live" onClick={() => handleDemoClick(p)} id={`demo-${(p.title || '').replace(/\s+/g, '-').toLowerCase()}`}>
                        {p.demoType === 'gif' ? <Eye size={14} /> : <Image size={14} />}
                        {p.demoType === 'gif' ? 'View GIF' : 'View Demo'}
                      </button>
                    ) : p.demoType === 'link' || p.liveLink ? (
                      <a href={p.demoUrl || p.liveLink} target="_blank" rel="noreferrer" className="pbtn pbtn-live"
                        id={`live-${(p.title || '').replace(/\s+/g, '-').toLowerCase()}`}>
                        <ArrowUpRight size={14} /> Live Demo
                      </a>
                    ) : (
                      <span className="pbtn pbtn-soon">Demo Coming Soon</span>
                    )}

                    {p.githubLink && (
                      <a href={p.githubLink} target="_blank" rel="noreferrer" className="pbtn pbtn-gh"
                        id={`github-${(p.title || '').replace(/\s+/g, '-').toLowerCase()}`}>
                        <Github size={14} /> View on GitHub
                      </a>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="sec csec">
        <div className="sec-inner">
          <FadeIn>
            <div className="slabel">Contact</div>
            <h2 className="sh">Get In Touch</h2>
          </FadeIn>
          <div className="cgrid">
            <FadeIn delay={100}>
              <div className="clead">Open to opportunities and collaborations</div>
              <p className="cp">Whether it's an internship, a collaboration, or a conversation about a project feel free to reach out.</p>
              <div className="clinks">
                <a className="clink" href="mailto:arisha1218hassan@gmail.com"><div className="cicon"><Mail size={15} /></div>arisha1218hassan@gmail.com</a>
                <a className="clink" href="https://linkedin.com/in/sayedaarisha1218" target="_blank" rel="noreferrer"><div className="cicon"><Linkedin size={15} /></div>linkedin.com/in/sayedaarisha1218</a>
                <a className="clink" href="https://github.com/Arisha18-glitch" target="_blank" rel="noreferrer"><div className="cicon"><Github size={15} /></div>github.com/Arisha18-glitch</a>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <form className="fbox" onSubmit={handleSubmit} noValidate>
                <div className="frow"><label className="flbl">Name</label><input id="contact-name" className="finp" placeholder="Your name" value={formName} onChange={e => setFormName(e.target.value)} /></div>
                <div className="frow"><label className="flbl">Email</label><input id="contact-email" className="finp" type="email" placeholder="your@email.com" value={formEmail} onChange={e => setFormEmail(e.target.value)} /></div>
                <div className="frow"><label className="flbl">Subject</label><input id="contact-subject" className="finp" placeholder="What is this regarding?" value={formSubject} onChange={e => setFormSubject(e.target.value)} /></div>
                <div className="frow"><label className="flbl">Message</label><textarea id="contact-message" className="farea" placeholder="Your message" value={formMessage} onChange={e => setFormMessage(e.target.value)} /></div>
                {formError && <div className="form-msg form-error">{formError}</div>}
                {formSuccess && <div className="form-msg form-success">Message sent successfully! I'll get back to you soon.</div>}
                <button id="contact-submit" type="submit" className="bgold" style={{ width: '100%', justifyContent: 'center' }} disabled={formLoading}>
                  {formLoading ? <><Loader2 size={15} className="spin" /> Sending…</> : <>Send Message <ArrowUpRight size={15} /></>}
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <span>© 2025 <em>Syeda Arisha Hassan</em> — Software Engineer</span>
        <button className="admin-gear-btn" onClick={() => setShowAdmin(true)} title="Admin Panel">⚙</button>
      </footer>
    </div>
  )
}