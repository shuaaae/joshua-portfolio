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
  const navigate = useNavigate()

  return (
    <div className="app light">
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
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3>{cert.title}</h3>
              <p>{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Certifications

