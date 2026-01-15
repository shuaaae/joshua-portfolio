import { useState, useEffect } from 'react'
import {
  HiMail,
  HiBriefcase,
  HiCog,
  HiFolder,
  HiSun,
  HiMoon,
  HiChat,
  HiLocationMarker,
  HiBookOpen,
  HiClock,
  HiPhotograph,
  HiDocumentText
} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import profileImage from './assets/Profile.jpg'
import shyImage from './assets/shy-type.png'
import blueBadge from './assets/blue_badge.png'
import joshuaIcon from '/joshua-icon.jpeg'
import Chatbot from './components/Chatbot'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme')
    return stored === 'dark'
  })
  const [isProfileHovered, setIsProfileHovered] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [profileClickedIcon, setProfileClickedIcon] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  const allCertificates = [
    {
      title: '2024-2025 Second Semester Dean\'s Lister',
      issuer: 'Sorsogon State University - Bulan Campus'
    },
    {
      title: '2024-2025 First Semester Dean\'s Lister',
      issuer: 'Sorsogon State University - Bulan Campus'
    },
    {
      title: '2023-2024 Second Semester Dean\'s Lister',
      issuer: 'Sorsogon State University - Bulan Campus'
    },
    {
      title: '2023-2024 First Semester President\'s Lister',
      issuer: 'Sorsogon State University - Bulan Campus'
    },
    {
      title: '2022-2023 First Semester Dean\'s Lister',
      issuer: 'Sorsogon State University - Bulan Campus'
    },
    {
      title: 'Certificate of Participation - Project DRIVEN Webinar Series',
      issuer: 'Sorsogon State University - Bulan Campus & SKMF of Bulan | October 4, 2022'
    }
  ]

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/Joshua-Godalle-Resume.pdf'
    link.download = 'Joshua-Godalle-Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSendEmail = () => {
    const confirmed = window.confirm('Do you want to open Gmail to send an email?')
    if (confirmed) {
      window.open('https://mail.google.com/mail/?view=cm&to=supershuaaa@gmail.com', '_blank')
    }
  }

  // Observe footer visibility to avoid floating chat covering it on small screens
  useEffect(() => {
    const footer = document.querySelector('.footer') as HTMLElement | null
    if (!footer) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.documentElement.classList.add('footer-in-view')
          const height = Math.ceil(entry.boundingClientRect.height || footer.getBoundingClientRect().height)
          document.documentElement.style.setProperty('--footer-height', `${height}px`)
        } else {
          document.documentElement.classList.remove('footer-in-view')
          document.documentElement.style.removeProperty('--footer-height')
        }
      })
    }, { root: null, threshold: 0.01 })

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  // Mobile-only: auto-scroll the certificate gallery but allow user drag to pause it
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 640px)')
    if (!mq.matches) return

    const gallery = document.querySelector('.certificate-gallery') as HTMLElement | null
    if (!gallery) return

    let rafId: number | null = null
    let lastTime = performance.now()
    let isUserInteracting = false
    const speed = 30 // pixels per second

    function step(now: number) {
      if (!gallery) return
      const dt = (now - lastTime) / 1000
      lastTime = now
      if (!isUserInteracting) {
        gallery.scrollLeft += speed * dt
        if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth) {
          // loop back smoothly
          gallery.scrollLeft = 0
        }
      }
      rafId = requestAnimationFrame(step)
    }

    // Pause auto-scroll while user touches/drags; resume after interaction ends
    const onPointerDown = () => {
      isUserInteracting = true
    }
    const resumeAfterDelay = () => {
      // small delay to avoid immediate resuming while momentum scrolling
      isUserInteracting = false
      lastTime = performance.now()
    }

    gallery.addEventListener('pointerdown', onPointerDown)
    gallery.addEventListener('touchstart', onPointerDown, { passive: true })
    gallery.addEventListener('pointerup', resumeAfterDelay)
    gallery.addEventListener('touchend', resumeAfterDelay)
    gallery.addEventListener('touchcancel', resumeAfterDelay)

    rafId = requestAnimationFrame(step)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      gallery.removeEventListener('pointerdown', onPointerDown)
      gallery.removeEventListener('touchstart', onPointerDown)
      gallery.removeEventListener('pointerup', resumeAfterDelay)
      gallery.removeEventListener('touchend', resumeAfterDelay)
      gallery.removeEventListener('touchcancel', resumeAfterDelay)
    }
  }, [])

  // Sequential reveal for header + children of .main-content on initial load
  useEffect(() => {
    const header = document.querySelector('header') as HTMLElement | null
    const container = document.querySelector('.main-content') as HTMLElement | null
    if (!container) return

    const mainChildren = Array.from(container.children) as HTMLElement[]
    const nodes: HTMLElement[] = []
    if (header) nodes.push(header)
    nodes.push(...mainChildren)

    // Add base class to each node
    nodes.forEach((el) => el.classList.add('reveal-item'))

    // Stagger reveal with a slightly longer gap for a smooth entrance
    const STAGGER = 160 // ms
    nodes.forEach((el, idx) => {
      const delay = idx * STAGGER
      el.style.setProperty('--reveal-delay', `${delay}ms`)
      window.setTimeout(() => el.classList.add('visible'), delay + 80)
    })

    return () => {
      nodes.forEach((el) => {
        el.classList.remove('reveal-item', 'visible')
        el.style.removeProperty('--reveal-delay')
      })
    }
  }, [])


  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light'
    localStorage.setItem('theme', theme)
  }, [darkMode])

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <div className="profile-section">
            <div
              className="profile-image"
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => {
                setIsProfileHovered(false)
                setProfileClickedIcon(false)
              }}
              onClick={() => {
                if (isProfileHovered) setProfileClickedIcon(true)
              }}
            >
              <img
                src={isProfileHovered ? (profileClickedIcon ? shyImage : profileImage) : joshuaIcon}
                alt="Joshua Godalle"
                className="profile-photo"
              />
            </div>
            <div className="profile-info">
              <h1 className="name">
                Joshua Godalle
                <img src={blueBadge} alt="Verified" className="verified-badge" />
              </h1>
              <p className="location">
                <HiLocationMarker className="location-icon" />
                Bulan Sorsogon
              </p>
              <p className="roles">Full Stack Web Developer \ Mobile App Developer</p>
              <div className="cta-buttons">
                <button className="cta-btn-primary" onClick={handleDownloadResume}>
                  <HiDocumentText className="cta-icon" />
                  Download Resume
                </button>
                <button className="cta-btn-secondary" onClick={handleSendEmail}>
                  <HiMail className="cta-icon" />
                  Send Email
                </button>
              </div>
            </div>
          </div>
          <div
            className="theme-toggle-wrapper"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            <div className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}>
              <div className="theme-toggle-slider">
                {darkMode ? <HiSun className="theme-icon" /> : <HiMoon className="theme-icon" />}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-grid">
          {/* Left Column */}
          <div className="left-column">
            {/* About Section */}
            <div className="section-container">
              <section className="section">
                <h2 className="section-title">
                  <HiBriefcase className="section-icon" />
                  About
                </h2>
                <div className="section-text-group">
                  <p className="section-text">
                    I'm a full-stack developer specializing in developing end-to-end solutions with Laravel, PHP, JavaScript, and Node.js.
                    I work on web applications, building RESTful APIs, creating responsive front-end interfaces, and managing database
                    systems using MySQL and Firebase.
                  </p>
                  <p className="section-text">
                    Currently pursuing a Bachelor of Science in Information Technology at Sorsogon State University - Bulan Campus.
                    I have experience working with MGTech IT Solutions, where I developed and maintained full-stack infrastructure for
                    real-time applications, including an Election Vote Count System for the 2024 Senatorial Elections.
                  </p>
                  <p className="section-text">
                    I'm skilled in front-end technologies like React.js, Vue.js, Next.js, React Native, HTML, CSS, and Tailwind, as well
                    as back-end frameworks including Laravel and Node.js. I'm passionate about creating efficient, secure, and scalable
                    full-stack solutions that deliver exceptional user experiences.
                  </p>
                </div>
              </section>
            </div>

            {/* Tech Stack Section */}
            <div className="section-container">
              <section className="section">
                <div className="section-header">
                  <h2 className="section-title">
                    <HiCog className="section-icon" />
                    Tech Stack
                  </h2>
                  <Link to="/tech-stack" className="view-all">
                    View All <span className="arrow">&gt;</span>
                  </Link>
                </div>
                <div className="tech-categories">
                  <div className="tech-category">
                    <h3>Frontend</h3>
                    <div className="tech-tags">
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/javascript.svg" alt="JavaScript" className="tech-icon tech-icon-js" />
                        JavaScript
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg" alt="TypeScript" className="tech-icon tech-icon-ts" />
                        TypeScript
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg" alt="React" className="tech-icon tech-icon-react" />
                        React
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg" alt="Next.js" className="tech-icon tech-icon-next" />
                        Next.js
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vuedotjs.svg" alt="Vue.js" className="tech-icon tech-icon-vue" />
                        Vue.js
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg" alt="Tailwind CSS" className="tech-icon tech-icon-tailwind" />
                        Tailwind CSS
                      </span>
                    </div>
                  </div>
                  <div className="tech-category">
                    <h3>Backend</h3>
                    <div className="tech-tags">
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg" alt="Node.js" className="tech-icon tech-icon-node" />
                        Node.js
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg" alt="Python" className="tech-icon tech-icon-python" />
                        Python
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/php.svg" alt="PHP" className="tech-icon tech-icon-php" />
                        PHP
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/laravel.svg" alt="Laravel" className="tech-icon tech-icon-laravel" />
                        Laravel
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mysql.svg" alt="MySQL" className="tech-icon tech-icon-mysql" />
                        MySQL
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postgresql.svg" alt="PostgreSQL" className="tech-icon tech-icon-postgres" />
                        PostgreSQL
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/firebase.svg" alt="Firebase" className="tech-icon tech-icon-firebase" />
                        Firebase
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/pocketbase.svg" alt="PocketBase" className="tech-icon tech-icon-pocketbase" />
                        PocketBase
                      </span>
                    </div>
                  </div>
                  <div className="tech-category">
                    <h3>Mobile Development</h3>
                    <div className="tech-tags">
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flutter.svg" alt="Flutter" className="tech-icon tech-icon-flutter" />
                        Flutter
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/dart.svg" alt="Dart" className="tech-icon tech-icon-dart" />
                        Dart
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg" alt="React Native" className="tech-icon tech-icon-react" />
                        React Native
                      </span>
                      <span className="tech-tag">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/expo.svg" alt="Expo" className="tech-icon tech-icon-expo" />
                        Expo
                      </span>
                    </div>
                  </div>
                  {/* Developer Tools intentionally omitted on homepage — shown on /tech-stack */}
                </div>
              </section>
            </div>

            {/* Recent Projects Section */}
            <div className="section-container">
              <section className="section">
                <h2 className="section-title">
                  <HiFolder className="section-icon" />
                  Recent Projects
                </h2>
                <div className="projects-grid">
                  <a
                    className="project-card"
                    href="https://coachdatastatistics.site"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3>Coach Data Statistics</h3>
                    <p>Analytics platform for tracking and visualizing Mobile Legends coaching performance data.</p>
                    <span className="project-url">coachdatastatistics.site</span>
                  </a>
                  <a
                    className="project-card"
                    href="https://github.com/shuaaae/Dynamic-Trike"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3>Dynamic Trike</h3>
                    <p>Ride-hailing app built with TypeScript for trike transportation services with real-time tracking and booking.</p>
                    <span className="project-url">github.com/shuaaae/Dynamic-Trike</span>
                  </a>
                  <a
                    className="project-card"
                    href="https://github.com/crisvin03/BuMo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3>TODA App</h3>
                    <p>Flutter-based ride-hailing app for TODA in Bulan with real-time maps, messaging, and Firebase integration.</p>
                    <span className="project-url">github.com/crisvin03/BuMo</span>
                  </a>
                  <div className="project-card">
                    <h3>SorSU SMS</h3>
                    <p>SMS notification system for sending alerts, announcements, and important updates to all registered students in the university.</p>
                    <span className="project-url">Sorsogon State University</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Experience Section */}
            <div className="section-container">
              <section className="section">
                <h2 className="section-title">
                  <HiBriefcase className="section-icon" />
                  Experience
                </h2>
                <div className="experience-timeline">
                  <div className="timeline-line"></div>
                  <div className="timeline-item">
                    <div className="timeline-dot active"></div>
                    <div className="timeline-year">2025</div>
                    <div className="timeline-content">
                      <h3>Web Developer (Project Contributor)</h3>
                      <p>Barangay South Triangle Website - MGTech IT Solutions</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-year">2024</div>
                    <div className="timeline-content">
                      <h3>Backend Developer</h3>
                      <p>MGTech IT Solutions</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-year">2023</div>
                    <div className="timeline-content">
                      <h3>Freelancing</h3>
                      <p>Started doing Projects from clients</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-year">2022</div>
                    <div className="timeline-content">
                      <h3>Hello World! 👋</h3>
                      <p>Wrote my first line of code</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Education Section */}
            <div className="section-container">
              <section className="section">
                <h2 className="section-title">
                  <HiBookOpen className="section-icon" />
                  Education
                </h2>
                <div className="experience-timeline">
                  <div className="timeline-line"></div>
                  <div className="timeline-item">
                    <div className="timeline-dot active"></div>
                    <div className="timeline-year">2022 - Present</div>
                    <div className="timeline-content">
                      <h3>Bachelor of Science in Information Technology</h3>
                      <p>Sorsogon State University - Bulan Campus</p>
                      <ul className="credentials-list">
                        <li>2022-2023 First Semester Dean's Lister</li>
                        <li>2023-2024 First Semester President's Lister</li>
                        <li>2023-2024 Second Semester Dean's Lister</li>
                        <li>2024-2025 First Semester Dean's Lister</li>
                        <li>2024-2025 Second Semester Dean's Lister</li>
                      </ul>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-year">2020</div>
                    <div className="timeline-content">
                      <h3>Science, Technology, Engineering, and Mathematics (STEM)</h3>
                      <p>Bulan National High School</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Recent Certifications Section */}
            <div className="section-container">
              <section className="section">
                <div className="section-header">
                  <h2 className="section-title">
                    <HiClock className="section-icon" />
                    Certificates
                  </h2>
                  <Link to="/certifications" className="view-all">
                    View All <span className="arrow">&gt;</span>
                  </Link>
                </div>
                <div className="certifications-list">
                  {allCertificates.slice(0, 4).map((cert, index) => (
                    <div key={index} className="certification-item">
                      <h3>{cert.title}</h3>
                      <p>{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Certificate Gallery - Full Width spanning both columns */}
        <div className="content-grid">
          <div className="full-width-section">
            <div className="section-container certificate-gallery-container">
              <section className="section">
                <h2 className="section-title">
                  <HiPhotograph className="section-icon" />
                  Certificate Gallery
                </h2>
                <div className="certificate-gallery">
                  <div className="certificate-gallery-track">
                    {/* First set of certificates */}
                    <div className="certificate-card" onClick={() => setSelectedImage('/certificates/2024-2025-second-semester-deans-lister.jpg')}>
                      <div className="certificate-image-container">
                        <img
                          src="/certificates/2024-2025-second-semester-deans-lister.jpg"
                          alt="2024-2025 Second Semester Dean's Lister"
                          className="certificate-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('certificate-placeholder');
                          }}
                        />
                      </div>
                      <div className="certificate-info">
                        <h3>2024-2025 Second Semester Dean's Lister</h3>
                        <p>Sorsogon State University - Bulan Campus</p>
                      </div>
                    </div>
                    <div className="certificate-card" onClick={() => setSelectedImage('/certificates/2024-2025-first-semester-deans-lister.PNG')}>
                      <div className="certificate-image-container">
                        <img
                          src="/certificates/2024-2025-first-semester-deans-lister.PNG"
                          alt="2024-2025 First Semester Dean's Lister"
                          className="certificate-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('certificate-placeholder');
                          }}
                        />
                      </div>
                      <div className="certificate-info">
                        <h3>2024-2025 First Semester Dean's Lister</h3>
                        <p>Sorsogon State University - Bulan Campus</p>
                      </div>
                    </div>
                    <div className="certificate-card" onClick={() => setSelectedImage('/certificates/2023-2024-second-semester-deans-lister.jpg')}>
                      <div className="certificate-image-container">
                        <img
                          src="/certificates/2023-2024-second-semester-deans-lister.jpg"
                          alt="2023-2024 Second Semester Dean's Lister"
                          className="certificate-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('certificate-placeholder');
                          }}
                        />
                      </div>
                      <div className="certificate-info">
                        <h3>2023-2024 Second Semester Dean's Lister</h3>
                        <p>Sorsogon State University - Bulan Campus</p>
                      </div>
                    </div>
                    <div className="certificate-card" onClick={() => setSelectedImage('/certificates/2023-2024-first-semester-presidents-lister.jpeg')}>
                      <div className="certificate-image-container">
                        <img
                          src="/certificates/2023-2024-first-semester-presidents-lister.jpeg"
                          alt="2023-2024 First Semester President's Lister"
                          className="certificate-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('certificate-placeholder');
                          }}
                        />
                      </div>
                      <div className="certificate-info">
                        <h3>2023-2024 First Semester President's Lister</h3>
                        <p>Sorsogon State University - Bulan Campus</p>
                      </div>
                    </div>
                    <div className="certificate-card" onClick={() => setSelectedImage('/certificates/2022-2023-first-semester-deans-lister.PNG')}>
                      <div className="certificate-image-container">
                        <img
                          src="/certificates/2022-2023-first-semester-deans-lister.PNG"
                          alt="2022-2023 First Semester Dean's Lister"
                          className="certificate-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('certificate-placeholder');
                          }}
                        />
                      </div>
                      <div className="certificate-info">
                        <h3>2022-2023 First Semester Dean's Lister</h3>
                        <p>Sorsogon State University - Bulan Campus</p>
                      </div>
                    </div>
                    <div className="certificate-card" onClick={() => setSelectedImage('/certificates/project-driven-certificate.png')}>
                      <div className="certificate-image-container">
                        <img
                          src="/certificates/project-driven-certificate.png"
                          alt="Certificate of Participation - Project DRIVEN Webinar Series"
                          className="certificate-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('certificate-placeholder');
                          }}
                        />
                      </div>
                      <div className="certificate-info">
                        <h3>Certificate of Participation - Project DRIVEN</h3>
                        <p>Sorsogon State University - Bulan Campus & SKMF of Bulan</p>
                      </div>
                    </div>
                    {/* Duplicated set for seamless loop */}
                    <div className="certificate-card" onClick={() => setSelectedImage('/certificates/2024-2025-second-semester-deans-lister.jpg')}>
                      <div className="certificate-image-container">
                        <img
                          src="/certificates/2024-2025-second-semester-deans-lister.jpg"
                          alt="2024-2025 Second Semester Dean's Lister"
                          className="certificate-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('certificate-placeholder');
                          }}
                        />
                      </div>
                      <div className="certificate-info">
                        <h3>2024-2025 Second Semester Dean's Lister</h3>
                        <p>Sorsogon State University - Bulan Campus</p>
                      </div>
                    </div>
                    <div className="certificate-card" onClick={() => setSelectedImage('/certificates/2024-2025-first-semester-deans-lister.PNG')}>
                      <div className="certificate-image-container">
                        <img
                          src="/certificates/2024-2025-first-semester-deans-lister.PNG"
                          alt="2024-2025 First Semester Dean's Lister"
                          className="certificate-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('certificate-placeholder');
                          }}
                        />
                      </div>
                      <div className="certificate-info">
                        <h3>2024-2025 First Semester Dean's Lister</h3>
                        <p>Sorsogon State University - Bulan Campus</p>
                      </div>
                    </div>
                    <div className="certificate-card" onClick={() => setSelectedImage('/certificates/2023-2024-second-semester-deans-lister.jpg')}>
                      <div className="certificate-image-container">
                        <img
                          src="/certificates/2023-2024-second-semester-deans-lister.jpg"
                          alt="2023-2024 Second Semester Dean's Lister"
                          className="certificate-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('certificate-placeholder');
                          }}
                        />
                      </div>
                      <div className="certificate-info">
                        <h3>2023-2024 Second Semester Dean's Lister</h3>
                        <p>Sorsogon State University - Bulan Campus</p>
                      </div>
                    </div>
                    <div className="certificate-card" onClick={() => setSelectedImage('/certificates/2023-2024-first-semester-presidents-lister.jpeg')}>
                      <div className="certificate-image-container">
                        <img
                          src="/certificates/2023-2024-first-semester-presidents-lister.jpeg"
                          alt="2023-2024 First Semester President's Lister"
                          className="certificate-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('certificate-placeholder');
                          }}
                        />
                      </div>
                      <div className="certificate-info">
                        <h3>2023-2024 First Semester President's Lister</h3>
                        <p>Sorsogon State University - Bulan Campus</p>
                      </div>
                    </div>
                    <div className="certificate-card" onClick={() => setSelectedImage('/certificates/2022-2023-first-semester-deans-lister.PNG')}>
                      <div className="certificate-image-container">
                        <img
                          src="/certificates/2022-2023-first-semester-deans-lister.PNG"
                          alt="2022-2023 First Semester Dean's Lister"
                          className="certificate-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('certificate-placeholder');
                          }}
                        />
                      </div>
                      <div className="certificate-info">
                        <h3>2022-2023 First Semester Dean's Lister</h3>
                        <p>Sorsogon State University - Bulan Campus</p>
                      </div>
                    </div>
                    <div className="certificate-card" onClick={() => setSelectedImage('/certificates/project-driven-certificate.png')}>
                      <div className="certificate-image-container">
                        <img
                          src="/certificates/project-driven-certificate.png"
                          alt="Certificate of Participation - Project DRIVEN Webinar Series"
                          className="certificate-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add('certificate-placeholder');
                          }}
                        />
                      </div>
                      <div className="certificate-info">
                        <h3>Certificate of Participation - Project DRIVEN</h3>
                        <p>Sorsogon State University - Bulan Campus & SKMF of Bulan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-divider"></div>
        <p className="footer-text">© 2025 Joshua Godalle. All rights reserved.</p>
      </footer>

      {/* Floating Chat Button */}
      <button className="floating-chat" onClick={() => setIsChatbotOpen(true)}>
        <HiChat className="chat-icon" />
        Chat with Joshua
      </button>

      {/* Chatbot Component */}
      <Chatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        darkMode={darkMode}
      />

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setSelectedImage(null)}>
              ×
            </button>
            <img src={selectedImage} alt="Certificate" className="image-modal-image" />
          </div>
        </div>
      )}
    </div>
  )
}

export default App

