import { useEffect, useState } from 'react'
import { HiArrowLeft } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import '../App.css'

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

function Certifications() {
  const [darkMode] = useState(() => {
    const stored = localStorage.getItem('theme')
    return stored === 'dark'
  })
  const navigate = useNavigate()

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll('.certificate-card-animate')
    ) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const cardIndex = Number(el.dataset.index ?? '0')
          el.style.setProperty('--card-delay', `${cardIndex * 120}ms`)
          el.classList.add('is-visible')
          observer.unobserve(el)
        })
      },
      { threshold: 0.2 }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    document.documentElement.classList.toggle('light', !darkMode)
  }, [darkMode])

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="certificates-page">
        <div className="certificates-page-header">
          <button 
            className="back-button" 
            onClick={() => navigate('/')}
          >
            <HiArrowLeft className="back-icon" />
            Back to Home
          </button>
          <h1 className="certificates-page-title">All Certifications</h1>
        </div>
        <div className="certificates-grid">
          {allCertificates.map((cert, index) => (
            <div 
              key={index} 
              className="certificate-card-grid certificate-card-animate"
              data-index={index}
            >
              <h3>{cert.title}</h3>
              <p>{cert.issuer}</p>
            </div>
          ))}
        </div>

        <footer className="footer">
          <div className="footer-divider"></div>
          <p className="footer-text">© 2025 Joshua Godalle. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default Certifications

