import { useEffect, useMemo, useState } from 'react'

const FINAL_NOTE =
  'I will always be your first daughter...\nthe little one who looked up to you, followed you everywhere, and somehow always found her safest place beside you.\nNo matter how much we grow up, a part of me will always be that little girl with you. ❤️'

export default function FinalMessagePage() {
  const [typedLength, setTypedLength] = useState(0)
  const [showMemory, setShowMemory] = useState(false)

  useEffect(() => {
    if (typedLength >= FINAL_NOTE.length) return

    const timer = setTimeout(() => {
      setTypedLength((n) => n + 1)
    }, 34)

    return () => clearTimeout(timer)
  }, [typedLength])

  useEffect(() => {
    if (typedLength < FINAL_NOTE.length) return

    const timer = setTimeout(() => {
      setShowMemory(true)
    }, 900)

    return () => clearTimeout(timer)
  }, [typedLength])

  const typedText = useMemo(() => FINAL_NOTE.slice(0, typedLength), [typedLength])
  const isTyping = typedLength < FINAL_NOTE.length

  return (
    <div className="screen final-frompage-screen">
      <div className="final-frompage-content">
        <p className="final-typed-note" aria-live="polite">
          {typedText}
          {isTyping && <span className="typing-cursor">|</span>}
        </p>

        {showMemory && (
          <div className="final-memory-block">
            <img className="final-memory-image" src="/fromimage.jpeg" alt="Memory with Akka" />
            <p className="final-love-line">I Love u Akka !!</p>
            <p className="final-sign-line">From your Pandu 🐼</p>
          </div>
        )}
      </div>
    </div>
  )
}
