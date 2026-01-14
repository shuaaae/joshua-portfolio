import { useState, useRef, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { HiX, HiArrowRight } from 'react-icons/hi'
import profileImage from '../assets/Profile.jpg'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
}

function Chatbot({ isOpen, onClose, darkMode }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Joshua. Feel free to ask me anything about my work, experience, or projects. What would you like to know?"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const MAX_CHARACTERS = 1000

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading || input.length > MAX_CHARACTERS) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Get API key from environment variable or use a default (user should set this)
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''

      if (!apiKey) {
        throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.')
      }

      const genAI = new GoogleGenerativeAI(apiKey)

      // Create context - AI responds as Joshua himself
      const context = `You are Joshua Godalle. Respond naturally and conversationally as if the user is talking directly to you. Use first person (I, me, my) throughout your responses. Be friendly, professional, and authentic.

      About you (Joshua):
      - Full Name: Joshua Godalle
      - Birthday: September 21, 2004
      - Location: Bulan, Sorsogon, Philippines
      - You are a Full Stack Web Developer from Bulan Sorsogon
      - You're currently a 4th year college student
      - You're pursuing a Bachelor of Science in Information Technology (BSIT)
      - Your school is Sorsogon State University - Bulan Campus (SorSU - Bulan Campus)
      - You started in 2022 and are currently in your 4th year (2022-Present)
      
      Professional Skills & Experience:
      - Your technical skills include: Laravel, PHP, JavaScript, Node.js, React.js, Vue.js, Next.js, React Native, HTML, CSS, Tailwind, MySQL, Firebase, PostgreSQL, MongoDB
      - Your work experience: You worked with MGTech IT Solutions as a Backend Developer (2024), and as a Web Developer (2025)
      - Your projects include: Coach Data Statistics, Dynamic Trike, TODA App, SorSU SMS
      - Your achievements: Multiple Dean's Lister and President's Lister awards
      - Your email: supershuaaa@gmail.com
      
      Talents & Hobbies:
      - You are a singer - you enjoy singing and have talent in it
      - You are a dancer - you love dancing and have skills in various dance styles
      - You do theater - you're involved in theater performances and acting
      - These creative pursuits are important parts of your life alongside your tech career
      
      Language Capabilities:
      - You can speak and understand Tagalog (Filipino) fluently
      - You can speak and understand Bicol (Bikol) fluently, as you're from Sorsogon
      - You can also speak English
      - When users communicate in Tagalog or Bicol, respond naturally in the same language
      - Feel free to mix languages if it feels more natural (code-switching is common in the Philippines)
      
      Respond as Joshua would - be conversational, helpful, and authentic. Share about both your technical work and your creative passions (singing, dancing, theater). 
      
      Handling Off-Topic Questions:
      - If asked about something completely unrelated to you (like general knowledge, other people, unrelated topics), politely redirect the conversation
      - You can say something like: "I'd love to chat about that, but I'm here to answer questions about my work, experience, projects, or interests. Is there anything you'd like to know about me?"
      - Be friendly and conversational, but gently guide the conversation back to topics about you
      - If it's a general question that you can briefly answer while relating it to your experience, that's fine too`

      const prompt = `${context}\n\nUser: ${userMessage.content}\n\nAssistant:`

      // First, try to list available models to find one that works
      let availableModel: string | null = null
      let modelListError: Error | null = null

      try {
        // Try to get available models using the REST API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`)
        if (response.ok) {
          const data = await response.json()
          if (data.models && data.models.length > 0) {
            // Find a model that supports generateContent
            const generateContentModel = data.models.find((m: any) =>
              m.supportedGenerationMethods?.includes('generateContent')
            )
            if (generateContentModel) {
              availableModel = generateContentModel.name.replace('models/', '')
              console.log('Found available model:', availableModel)
            }
          }
        }
      } catch (err) {
        modelListError = err instanceof Error ? err : new Error(String(err))
        console.log('Could not list models, will try default models:', modelListError.message)
      }

      // Try multiple model names in order of preference
      const modelNames = availableModel
        ? [availableModel, 'gemini-1.5-flash-001', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro']
        : ['gemini-1.5-flash-001', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro']

      let lastError: Error | null = null
      let text = ''

      for (const modelName of modelNames) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName })
          const result = await model.generateContent(prompt)
          const response = await result.response
          text = response.text()
          lastError = null
          console.log(`Successfully used model: ${modelName}`)
          break // Success, exit the loop
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err))
          console.log(`Model ${modelName} failed:`, err)

          // If SDK fails, try direct REST API as fallback
          if (err instanceof Error && err.message.includes('404')) {
            try {
              const restResponse = await fetch(
                `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    contents: [{
                      parts: [{ text: prompt }]
                    }]
                  })
                }
              )

              if (restResponse.ok) {
                const restData = await restResponse.json()
                if (restData.candidates && restData.candidates[0]?.content?.parts?.[0]?.text) {
                  text = restData.candidates[0].content.parts[0].text
                  lastError = null
                  console.log(`Successfully used model via REST API: ${modelName}`)
                  break
                }
              }
            } catch (restErr) {
              console.log(`REST API fallback also failed for ${modelName}`)
            }
          }
          continue // Try next model
        }
      }

      if (lastError || !text) {
        // Provide more helpful error message
        let errorMsg = 'All model attempts failed. '
        if (lastError?.message.includes('404')) {
          errorMsg += 'Your API key may not have access to these models, or they may not be available in your region.\n\n'
          errorMsg += 'Troubleshooting steps:\n'
          errorMsg += '1. Verify your API key is valid at https://makersuite.google.com/app/apikey\n'
          errorMsg += '2. Check if your region supports Gemini API (free tier may not be available in all regions)\n'
          errorMsg += '3. Try creating a new API key\n'
          errorMsg += '4. Make sure you have enabled the Gemini API in your Google Cloud project\n'
          errorMsg += '5. Check the browser console for detailed error messages'
        } else {
          errorMsg += lastError?.message || 'Unknown error occurred.'
        }
        throw new Error(errorMsg)
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: text
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)

      // Fallback message for any connection/API errors
      const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again later."
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className={`chatbot-container ${darkMode ? 'dark' : 'light'}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <div className="chatbot-profile-section">
              <div className="chatbot-profile-image">
                <img src={profileImage} alt="Joshua Godalle" />
              </div>
              <div className="chatbot-header-text">
                <h3>Chat with Joshua</h3>
                <div className="chatbot-status">
                  <span className="chatbot-online-dot"></span>
                  <span className="chatbot-online-text">Online</span>
                </div>
              </div>
            </div>
          </div>
          <button className="chatbot-close" onClick={onClose} aria-label="Close chat">
            <HiX />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chatbot-message-wrapper ${message.role === 'user' ? 'user-message-wrapper' : 'assistant-message-wrapper'}`}
            >
              {message.role === 'assistant' && (
                <div className="message-avatar">
                  <img src={profileImage} alt="Joshua" />
                </div>
              )}
              <div
                className={`chatbot-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                <div className="message-content">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chatbot-message-wrapper assistant-message-wrapper">
              <div className="message-avatar">
                <img src={profileImage} alt="Joshua" />
              </div>
              <div className="chatbot-message assistant-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-container">
          <div className="chatbot-input-wrapper">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARACTERS) {
                  setInput(e.target.value)
                }
              }}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              maxLength={MAX_CHARACTERS}
            />
            <button
              className="chatbot-send"
              onClick={sendMessage}
              disabled={isLoading || !input.trim() || input.length > MAX_CHARACTERS}
              aria-label="Send message"
            >
              <HiArrowRight />
            </button>
          </div>

          <div className="chatbot-input-footer">
            <p className="chatbot-input-hint">Ask me about my work, experience, or projects!</p>
            <div className="chatbot-char-count" aria-live="polite">{input.length}/{MAX_CHARACTERS}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chatbot

