import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'

export default function TechStackPage() {
  const [darkMode] = useState(() => {
    const stored = localStorage.getItem('theme')
    return stored === 'dark'
  })
  const navigate = useNavigate()

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll('.techstack-animate')
    ) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const idx = Number(el.dataset.index ?? '0')
          el.style.setProperty('--card-delay', `${idx * 120}ms`)
          el.classList.add('is-visible')
          observer.unobserve(el)
        })
      },
      { threshold: 0.2 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    document.documentElement.classList.toggle('light', !darkMode)
  }, [darkMode])

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="certificates-page certificates-page--techstack">
        <div className="certificates-page-header">
          <button className="back-button" onClick={() => navigate('/')}>
            <HiArrowLeft className="back-icon" />
            Back to Home
          </button>
          <h1 className="certificates-page-title">Tech Stack</h1>
        </div>

        <div className="techstack-sections">
          <section
            className="techstack-inline-section techstack-animate"
            data-index={0}
          >
            <h2 className="techstack-section-title">Frontend</h2>
            <div className="tech-tags" style={{ marginTop: 12 }}>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/javascript.svg" alt="JavaScript" className="tech-icon tech-icon-js" /> JavaScript</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg" alt="TypeScript" className="tech-icon tech-icon-ts" /> TypeScript</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg" alt="React" className="tech-icon tech-icon-react" /> React</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg" alt="Next.js" className="tech-icon tech-icon-next" /> Next.js</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vuedotjs.svg" alt="Vue.js" className="tech-icon tech-icon-vue" /> Vue.js</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg" alt="Tailwind CSS" className="tech-icon tech-icon-tailwind" /> Tailwind CSS</span>
            </div>
          </section>

          <section
            className="techstack-inline-section techstack-animate"
            data-index={1}
          >
            <h2 className="techstack-section-title">Backend</h2>
            <div className="tech-tags" style={{ marginTop: 12 }}>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg" alt="Node.js" className="tech-icon tech-icon-node" /> Node.js</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg" alt="Python" className="tech-icon tech-icon-python" /> Python</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/php.svg" alt="PHP" className="tech-icon tech-icon-php" /> PHP</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/laravel.svg" alt="Laravel" className="tech-icon tech-icon-laravel" /> Laravel</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mysql.svg" alt="MySQL" className="tech-icon tech-icon-mysql" /> MySQL</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postgresql.svg" alt="PostgreSQL" className="tech-icon tech-icon-postgres" /> PostgreSQL</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/firebase.svg" alt="Firebase" className="tech-icon tech-icon-firebase" /> Firebase</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/pocketbase.svg" alt="PocketBase" className="tech-icon tech-icon-pocketbase" /> PocketBase</span>
            </div>
          </section>

          <section
            className="techstack-inline-section techstack-animate"
            data-index={2}
          >
            <h2 className="techstack-section-title">Mobile Development</h2>
            <div className="tech-tags" style={{ marginTop: 12 }}>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flutter.svg" alt="Flutter" className="tech-icon tech-icon-flutter" /> Flutter</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/dart.svg" alt="Dart" className="tech-icon tech-icon-dart" /> Dart</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg" alt="React Native" className="tech-icon tech-icon-react" /> React Native</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/expo.svg" alt="Expo" className="tech-icon tech-icon-expo" /> Expo</span>
            </div>
          </section>

          <section
            className="techstack-inline-section techstack-animate"
            data-index={3}
          >
            <h2 className="techstack-section-title">Developer Tools</h2>
            <div className="tech-tags" style={{ marginTop: 12 }}>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/git.svg" alt="Git" className="tech-icon tech-icon-git" /> Git</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg" alt="GitHub" className="tech-icon tech-icon-github" /> GitHub</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gitlab.svg" alt="GitLab" className="tech-icon tech-icon-gitlab" /> GitLab</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/bitbucket.svg" alt="Bitbucket" className="tech-icon tech-icon-bitbucket" /> Bitbucket</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/visualstudiocode.svg" alt="VS Code" className="tech-icon tech-icon-vscode" /> VS Code</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/trello.svg" alt="Trello" className="tech-icon tech-icon-trello" /> Trello</span>
              <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jira.svg" alt="Jira" className="tech-icon tech-icon-jira" /> Jira</span>
            </div>
          </section>
        </div>

        <footer className="footer">
          <div className="footer-divider"></div>
          <p className="footer-text">© 2025 Joshua Godalle. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
