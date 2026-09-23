import { useEffect, useRef, useState } from 'react'
import MatchboxAnimation from './MatchboxAnimation.jsx'
import Cupcake from './Cupcake.jsx'
import CrackerBurst from './CrackerBurst.jsx'

const STRIKE_TOLERANCE = 12
const WICK_TOLERANCE = 34

export default function MatchLightingSequence({ onDone }) {
  const [sequence, setSequence] = useState({
    matchboxVisible: false,
    matchLit: false,
    candleLit: false,
    crackerBurst: false,
    messageShown: false,
  })
  const [stickPos, setStickPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  const areaRef = useRef(null)
  const stickRef = useRef(null)
  const strikeZoneRef = useRef(null)
  const wickRef = useRef(null)
  const pointerRef = useRef({ active: false, id: null, dx: 0, dy: 0 })

  useEffect(() => {
    setSequence((prev) => ({ ...prev, matchboxVisible: true }))
  }, [])

  useEffect(() => {
    function placeInitialStick() {
      const area = areaRef.current
      if (!area) return
      const rect = area.getBoundingClientRect()
      setStickPos({
        x: Math.max(18, rect.width * 0.5 - 95),
        y: Math.max(24, rect.height * 0.2),
      })
    }

    placeInitialStick()
    window.addEventListener('resize', placeInitialStick)
    return () => {
      window.removeEventListener('resize', placeInitialStick)
    }
  }, [])

  useEffect(() => {
    if (!sequence.candleLit) return

    const burstTimer = setTimeout(() => {
      setSequence((prev) => ({ ...prev, crackerBurst: true }))
    }, 250)

    const messageTimer = setTimeout(() => {
      setSequence((prev) => ({ ...prev, messageShown: true }))
    }, 250)

    const doneTimer = setTimeout(() => {
      if (typeof onDone === 'function') {
        onDone()
      }
    }, 4300)

    return () => {
      clearTimeout(burstTimer)
      clearTimeout(messageTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone, sequence.candleLit])

  function updateStickPosition(clientX, clientY) {
    const area = areaRef.current
    const stick = stickRef.current
    if (!area || !stick) return

    const areaRect = area.getBoundingClientRect()
    const stickRect = stick.getBoundingClientRect()

    const nextX = clientX - areaRect.left - pointerRef.current.dx
    const nextY = clientY - areaRect.top - pointerRef.current.dy

    const minX = 8
    const minY = 8
    const maxX = areaRect.width - stickRect.width - 8
    const maxY = areaRect.height - stickRect.height - 8

    setStickPos({
      x: Math.min(Math.max(nextX, minX), Math.max(maxX, minX)),
      y: Math.min(Math.max(nextY, minY), Math.max(maxY, minY)),
    })
  }

  function isPointInsideRect(pointX, pointY, rect, tolerance = 0) {
    return (
      pointX >= rect.left - tolerance &&
      pointX <= rect.right + tolerance &&
      pointY >= rect.top - tolerance &&
      pointY <= rect.bottom + tolerance
    )
  }

  function checkCollisions() {
    const stick = stickRef.current
    if (!stick) return

    const stickRect = stick.getBoundingClientRect()
    const tipX = stickRect.right - 6
    const tipY = stickRect.top + stickRect.height * 0.5

    if (!sequence.matchLit && strikeZoneRef.current) {
      const strikeRect = strikeZoneRef.current.getBoundingClientRect()
      if (isPointInsideRect(tipX, tipY, strikeRect, STRIKE_TOLERANCE)) {
        setSequence((prev) => ({ ...prev, matchLit: true }))
      }
    }

    if (sequence.matchLit && !sequence.candleLit && wickRef.current) {
      const wickRect = wickRef.current.getBoundingClientRect()
      const wickX = wickRect.left + wickRect.width / 2
      const wickY = wickRect.top + wickRect.height / 2
      const distance = Math.hypot(tipX - wickX, tipY - wickY)

      if (distance <= WICK_TOLERANCE) {
        setSequence((prev) => ({ ...prev, candleLit: true }))
      }
    }
  }

  function handlePointerDown(event) {
    const stick = stickRef.current
    if (!stick) return

    event.preventDefault()
    const rect = stick.getBoundingClientRect()

    pointerRef.current = {
      active: true,
      id: event.pointerId,
      dx: event.clientX - rect.left,
      dy: event.clientY - rect.top,
    }

    setDragging(true)

    if (stick.setPointerCapture) {
      stick.setPointerCapture(event.pointerId)
    }
  }

  function handlePointerMove(event) {
    if (!pointerRef.current.active || event.pointerId !== pointerRef.current.id) return
    event.preventDefault()

    updateStickPosition(event.clientX, event.clientY)
  }

  function handlePointerUp(event) {
    if (event.pointerId !== pointerRef.current.id) return

    pointerRef.current.active = false
    pointerRef.current.id = null
    setDragging(false)
  }

  useEffect(() => {
    checkCollisions()
  }, [stickPos, sequence.matchLit, sequence.candleLit])

  return (
    <div className="screen match-sequence-screen">
      <div ref={areaRef} className="match-sequence-area">
        <MatchboxAnimation
          visible={sequence.matchboxVisible && !sequence.candleLit}
          strikeZoneRef={strikeZoneRef}
        />

        <Cupcake candleLit={sequence.candleLit} wickRef={wickRef} />

        <button
          ref={stickRef}
          type="button"
          className={`matchstick ${dragging ? 'dragging' : ''} ${sequence.matchLit ? 'lit' : ''} ${
            sequence.candleLit ? 'spent' : ''
          }`}
          style={{ transform: `translate(${stickPos.x}px, ${stickPos.y}px)` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          aria-label={sequence.matchLit ? 'Lit matchstick' : 'Unlit matchstick'}
        >
          <span className="matchstick-body" />
          <span className="matchstick-tip" />
          {sequence.matchLit && !sequence.candleLit && <span className="matchstick-flame" />}
        </button>

        <CrackerBurst active={sequence.crackerBurst} />

        {sequence.messageShown && (
          <div className="birthday-message" aria-label="Happy Birthday Chinniii">
            <span className="birthday-line birthday-line-top">Happy Birthday</span>
            <span className="birthday-line birthday-line-bottom">
              Chinniii <span className="birthday-heart">♥</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
