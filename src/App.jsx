import { useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X, Github, Linkedin, Mail, ArrowUpRight, ChevronDown } from 'lucide-react'
import './App.css'

const projects = [
  { sem: '6th Semester', title: 'NeuroTick', desc: 'A comprehensive educational platform for interactive STEM learning, combining quiz-based content with immersive 3D model visualization.', highlights: ['500+ quiz questions across 5 STEM categories', 'Interactive 3D GLB model viewer for complex concepts', 'Full user authentication and progress tracking via Firebase', 'Community Q&A platform with real-time updates', 'Responsive UI with light/dark theme support'], tech: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Provider', '3D GLB'] },
  { sem: '5th Semester', title: 'DDoS Attack Detection System', desc: 'A machine learning system for real-time detection and classification of DDoS attacks, achieving 99.57% accuracy across 8 distinct attack categories.', highlights: ['99.57% detection accuracy using ensemble classification', 'Analyzes 77 network flow features per sample', 'Identifies 8 attack types vs. normal traffic', 'Trained on the CIC-DDoS2019 benchmark dataset', 'Interactive web interface built with Streamlit'], tech: ['Python', 'XGBoost', 'Random Forest', 'Scikit-learn', 'Streamlit', 'Pandas'] },
  { sem: 'Recent', title: 'Vibe Sync', desc: 'An AI-powered interior design system that transforms text descriptions into animated, particle-based spatial visualizations using depth estimation and real-time 3D rendering.', highlights: ['Text-to-image generation via Transformer models', 'Particle animations driven by AI-generated depth maps', 'Custom GLSL shaders for glow and depth effects', 'Real-time 3D rendering in-browser via Three.js'], tech: ['Three.js', 'Transformers', 'Custom Shaders', 'Depth Estimation', 'WebGL'] },
  { sem: 'Recent', title: 'AI Network Detection & Diagnosis', desc: 'A network monitoring system using AI-based rule logic to detect suspicious traffic patterns, generate real-time alerts, and visualize network health through an interactive dashboard.', highlights: ['Real-time traffic anomaly detection and alerting', 'Interactive visualization dashboard', 'MongoDB-backed secure authentication', 'Modular Flask architecture with logging'], tech: ['Python', 'Flask', 'MongoDB', 'HTML', 'CSS', 'JavaScript'] },
  { sem: '4th Semester', title: 'Task Manager System', desc: 'A data structures course project implementing a full-featured task management system in C++, applying queue and dynamic array concepts in a practical application.', highlights: ['Task handling with Queue and dynamic array structures', 'Reminder system with sound notifications', 'Integrated chatbot assistant (Task Buddy)', 'Structured multi-window interface design'], tech: ['C++', 'Data Structures', 'HTML', 'JavaScript', 'Python'] },
  { sem: 'Team Project', title: 'AURA — Audio Visual Response', desc: 'A voice-responsive embedded system integrating AI speech recognition with hardware to create an expressive human-machine interaction experience. Developed by an all-women engineering team.', highlights: ['Voice input processed via Python Whisper model', 'Animated LCD display with response output', 'Speaker module for audio feedback', 'Developed by a 6-member all-women engineering team'], tech: ['Arduino Mega', 'Arduino Nano', 'Python', 'Whisper', 'LCD', 'Embedded Systems'] },
]

const skillGroups = [
  { label: 'Languages', skills: ['Python', 'C++', 'Dart', 'JavaScript', 'PHP', 'Assembly (MASM)'] },
  { label: 'Frameworks & Tools', skills: ['Flask', 'Flutter', 'React', 'Laravel', 'Streamlit', 'Three.js', 'OpenCV'] },
  { label: 'AI & Machine Learning', skills: ['XGBoost', 'Random Forest', 'Scikit-learn', 'Transformers', 'NLP', 'GPT-2'] },
  { label: 'Databases & Cloud', skills: ['MongoDB', 'Firebase', 'Firestore', 'MySQL'] },
]

const marqueeItems = ['Flutter', 'Python', 'Machine Learning', 'Firebase', 'React', 'Three.js', 'Arduino', 'XGBoost', 'Streamlit', 'C++', 'OpenCV', 'NLP']
const roles = ['Software Engineer', 'AI Enthusiast', 'Mobile App Developer', 'ML Engineer', 'Full-Stack Builder']

/* ─── Constellation Canvas ─── */
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
          x: Math.random() * cw,
          y: Math.random() * ch,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
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
          p.x += dx / d * f
          p.y += dy / d * f
        }
        p.x += p.vx
        p.y += p.vy
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

    resize()
    init()
    draw()
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

/* ─── Typewriter ─── */
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
      setDel(false)
      setWi((wi + 1) % words.length)
      setCi(0)
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

/* ─── Fade-in on scroll ─── */
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

/* ─── Animated stat counter ─── */
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

  useEffect(() => {
    setTimeout(() => setHeroReady(true), 150)
  }, [])

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
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
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

      const ids = ['home', 'about', 'projects', 'contact']
      const pos = y + 140
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div>
      <div ref={cursorRef} className="cursor-glow" />
      <div className="progress-bar" style={{ transform: `scaleX(${scrollProgress})` }} />

      {/* ─── NAV ─── */}
      <nav className={`nav ${navVisible ? 'visible' : 'hidden'} ${navScrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="logo" onClick={() => go('home')}>
            <span className="logo-mark">SA</span>
            <span className="logo-text">Syeda Arisha</span>
          </div>
          <div className="nav-links">
            {['home', 'about', 'projects', 'contact'].map(s => (
              <button key={s} className={`nbtn ${active === s ? 'act' : ''}`} onClick={() => go(s)}>{s}</button>
            ))}
          </div>
          <button className="mobbtn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className={`mobmenu ${menuOpen ? 'open' : ''}`}>
          {['home', 'about', 'projects', 'contact'].map(s => (
            <button key={s} className="moblink" onClick={() => go(s)}>{s}</button>
          ))}
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="home" className="hero">
        <ConstellationCanvas />
        <div className={`hero-content ${heroReady ? 'hero-anim' : ''}`}>
          <div className="hero-left">
            <h2 className="hero-greeting">Hi There,</h2>
            <h1 className="hero-name">I'm Syeda <em>Arisha</em></h1>
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
              <a className="soc-link" href="https://www.linkedin.com/in/sayedaarisha1218" target="_blank" rel="noreferrer" title="LinkedIn"><Linkedin size={18} /></a>
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
                <img src="/portfolio/avatar.png" alt="Syeda Arisha" />
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
            <h2 className="sh">Building at the intersection<br />of software & intelligence</h2>
          </FadeIn>
          <div className="agrid">
            <FadeIn delay={100}>
              <p className="ap">I'm <strong>Syeda Arisha</strong>, a Software Engineer with a broad foundation across AI, systems programming, mobile development, and web technologies.</p>
              <p className="ap">My work spans <strong>machine learning pipelines</strong>, <strong>real-time 3D web experiences</strong>, <strong>embedded systems</strong>, and <strong>full-stack mobile apps</strong>. I approach every project with a focus on clean architecture and thoughtful design.</p>
              <p className="ap">From a DDoS detection system  to a voice-responsive embedded assistant,Each project reflects a commitment to technical depth and practical impact.</p>
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
              <FadeIn key={p.title} delay={i * 100}>
                <div className="pcard" onMouseMove={handleCardMouse}>
                  <div className="pidx">{String(i + 1).padStart(2, '0')}</div>
                  {p.sem && <div className="psem">{p.sem}</div>}
                  <div className="ptitle">{p.title}</div>
                  <div className="pdesc">{p.desc}</div>
                  <ul className="phigh">{p.highlights.map(h => <li key={h}>{h}</li>)}</ul>
                  <div className="ptags">{p.tech.map(t => <span className="ptag" key={t}>{t}</span>)}</div>
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
                <a className="clink" href="https://www.linkedin.com/in/sayedaarisha1218" target="_blank" rel="noreferrer"><div className="cicon"><Linkedin size={15} /></div>linkedin.com/in/sayedaarisha1218</a>
                <a className="clink" href="https://github.com/Arisha18-glitch" target="_blank" rel="noreferrer"><div className="cicon"><Github size={15} /></div>github.com/Arisha18-glitch</a>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="fbox">
                <div className="frow"><label className="flbl">Name</label><input className="finp" placeholder="Your name" /></div>
                <div className="frow"><label className="flbl">Email</label><input className="finp" type="email" placeholder="your@email.com" /></div>
                <div className="frow"><label className="flbl">Subject</label><input className="finp" placeholder="What is this regarding?" /></div>
                <div className="frow"><label className="flbl">Message</label><textarea className="farea" placeholder="Your message" /></div>
                <button className="bgold" style={{ width: '100%', justifyContent: 'center' }}>Send Message <ArrowUpRight size={15} /></button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">© {new Date().getFullYear()} <em>Syeda Arisha</em> — Software Engineer</footer>
    </div>
  )
}