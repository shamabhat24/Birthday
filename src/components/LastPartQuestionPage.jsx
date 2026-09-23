import { useState } from 'react'

export default function LastPartQuestionPage({ onYes }) {
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 })

  function moveNoButton() {
    const x = Math.round(Math.random() * 180 - 90)
    const y = Math.round(Math.random() * 50 - 25)
    setNoOffset({ x, y })
  }

  function handleNoClick(event) {
    event.preventDefault()
    moveNoButton()
  }

  return (
    <div className="screen">
      <div className="card story-card last-part-card">
        <p className="last-part-tag">One last step</p>
        <h1>Can we move to the last part??</h1>
        <p>
          Just one click more and the final surprise opens.
        </p>

        <div className="last-part-actions">
          <button
            type="button"
            className="btn last-part-no"
            aria-disabled="true"
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onFocus={moveNoButton}
            onClick={handleNoClick}
            style={{ transform: `translate(${noOffset.x}px, ${noOffset.y}px)` }}
          >
            No
          </button>
          <button type="button" className="btn last-part-yes" onClick={onYes}>
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
