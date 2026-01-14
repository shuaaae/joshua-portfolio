import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Certifications from './pages/Certifications.tsx'
import TechStackPage from './pages/Tech-Stack.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/tech-stack" element={<TechStackPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
