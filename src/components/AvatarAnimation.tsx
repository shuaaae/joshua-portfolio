import { useState, useEffect, useRef } from 'react'
import './AvatarAnimation.css'

interface AvatarAnimationProps {
  darkMode: boolean
}

// Dynamically import all frames
const importAllFrames = () => {
  const wearFrames = import.meta.glob<{ default: string }>('../assets/frames/wear/*.png', { eager: true })
  const removeFrames = import.meta.glob<{ default: string }>('../assets/frames/remove/*.png', { eager: true })
  
  const sortedWear = Object.keys(wearFrames).sort().map((key) => wearFrames[key].default)
  const sortedRemove = Object.keys(removeFrames).sort().map((key) => removeFrames[key].default)
  
  return { wear: sortedWear, remove: sortedRemove }
}

function AvatarAnimation({ darkMode }: AvatarAnimationProps) {
  const [frames, setFrames] = useState<{ wear: string[]; remove: string[] }>({ wear: [], remove: [] })
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentIndexRef = useRef(0)
  const targetIndexRef = useRef(0)
  const animationRef = useRef<number | null>(null)
  const framesRef = useRef<{ wear: string[]; remove: string[] }>({ wear: [], remove: [] })
  const hasInitializedRef = useRef(false)
  
  // Load frames once on mount
  useEffect(() => {
    if (hasInitializedRef.current) return
    hasInitializedRef.current = true
    
    const loaded = importAllFrames()
    framesRef.current = loaded
    setFrames(loaded)
    
    if (loaded.wear.length > 0) {
      // Start at the end frame for the current theme to avoid animation on load
      const initialIndex = darkMode ? loaded.wear.length - 1 : 0
      currentIndexRef.current = initialIndex
      targetIndexRef.current = initialIndex
      setCurrentIndex(initialIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // Update target when darkMode changes
  useEffect(() => {
    if (frames.wear.length === 0) return
    
    const totalFrames = frames.wear.length
    const newTarget = darkMode ? totalFrames - 1 : 0
    targetIndexRef.current = newTarget
  }, [darkMode, frames])
  
  // Frame-by-frame animation loop
  useEffect(() => {
    if (frames.wear.length === 0) return
    
    let lastTime = performance.now()
    const frameInterval = 1000 / 18 // 18fps for slower smooth animation
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - lastTime
      
      if (elapsed >= frameInterval) {
        lastTime = currentTime
        const target = targetIndexRef.current
        const current = currentIndexRef.current
        const diff = target - current
        
        if (Math.abs(diff) > 0) {
          const step = Math.sign(diff)
          const newIndex = current + step
          currentIndexRef.current = newIndex
          setCurrentIndex(newIndex)
        }
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [frames])
  
  if (frames.wear.length === 0) {
    return <div className="avatar-loading">Loading...</div>
  }
  
  const totalFrames = frames.wear.length
  
  // Determine which frame sequence to show
  // In light mode: show remove frames (no glasses) - currentIndex goes 0->40
  // In dark mode: show wear frames (with glasses) - currentIndex goes 40->0
  const isLightMode = !darkMode
  const frameIndex = isLightMode ? currentIndex : totalFrames - 1 - currentIndex
  const frameSource = isLightMode ? frames.remove[frameIndex] : frames.wear[frameIndex]
  
  return (
    <div className="avatar-stack">
      <img
        src={frameSource}
        alt="Avatar"
        className="avatar-frame"
        loading="eager"
      />
    </div>
  )
}

export default AvatarAnimation
