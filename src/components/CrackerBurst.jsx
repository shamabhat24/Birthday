import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

export default function CrackerBurst({ active }) {
  const hasFiredRef = useRef(false)
  const launches = [
    { x: '16%', y: '31%', rise: '190px', delay: '0ms' },
    { x: '34%', y: '27%', rise: '220px', delay: '90ms' },
    { x: '50%', y: '24%', rise: '250px', delay: '140ms' },
    { x: '68%', y: '28%', rise: '220px', delay: '190ms' },
    { x: '84%', y: '32%', rise: '195px', delay: '250ms' },
  ]
  const balloons = [
    { x: '12%', delay: '0ms', drift: '-6px', colorA: '#f0c36c', colorB: '#c38a2b' },
    { x: '30%', delay: '150ms', drift: '7px', colorA: '#f099ae', colorB: '#b34767' },
    { x: '50%', delay: '90ms', drift: '-5px', colorA: '#88c4df', colorB: '#386f9f' },
    { x: '70%', delay: '210ms', drift: '8px', colorA: '#b6a4e8', colorB: '#6e56b3' },
    { x: '88%', delay: '120ms', drift: '-6px', colorA: '#9dc9ad', colorB: '#4f8f67' },
  ]

  const sprinklePalette = ['#f4c56e', '#e9a6b9', '#a5cbe1', '#b8ace9', '#a8ceb6', '#fff2d2']

  const sprinkles = Array.from({ length: 26 }).map((_, index) => ({
    id: index,
    x: `${4 + ((index * 97) % 92)}%`,
    delay: `${(index % 10) * 120}ms`,
    duration: `${2100 + (index % 5) * 220}ms`,
    color: sprinklePalette[index % sprinklePalette.length],
    drift: `${((index % 7) - 3) * 9}px`,
  }))

  useEffect(() => {
    if (!active || hasFiredRef.current) return
    hasFiredRef.current = true

    const t = setTimeout(() => {
      launches.forEach((launch, index) => {
        setTimeout(() => {
          confetti({
            particleCount: 52,
            spread: 76,
            startVelocity: 39,
            origin: { x: Number.parseFloat(launch.x) / 100, y: 0.72 },
            scalar: 0.95,
            gravity: 1,
            drift: 0.08,
            colors: ['#f4c56e', '#e9a6b9', '#a5cbe1', '#b8ace9', '#a8ceb6', '#fff2d2'],
            zIndex: 30,
          })
        }, index * 70)
      })
    }, 640)

    return () => {
      clearTimeout(t)
    }
  }, [active, launches])

  if (!active) return null

  return (
    <div className="cracker-layer" aria-hidden="true">
      <div className="balloon-cloud">
        {balloons.map((balloon) => (
          <div
            key={`balloon-${balloon.x}`}
            className="celebration-balloon"
            style={{
              '--balloon-x': balloon.x,
              '--balloon-delay': balloon.delay,
              '--balloon-drift': balloon.drift,
              '--balloon-color-a': balloon.colorA,
              '--balloon-color-b': balloon.colorB,
            }}
          >
          </div>
        ))}
      </div>

      <div className="sprinkle-rain">
        {sprinkles.map((sprinkle) => (
          <span
            key={`sprinkle-${sprinkle.id}`}
            className="sprinkle-piece"
            style={{
              '--sprinkle-x': sprinkle.x,
              '--sprinkle-delay': sprinkle.delay,
              '--sprinkle-duration': sprinkle.duration,
              '--sprinkle-color': sprinkle.color,
              '--sprinkle-drift': sprinkle.drift,
            }}
          />
        ))}
      </div>

      {launches.map((launch) => (
        <div key={`rocket-${launch.x}`}>
          <div
            className="cracker-rocket"
            style={{
              '--launch-x': launch.x,
              '--launch-rise': launch.rise,
              '--launch-delay': launch.delay,
            }}
          />
          <div
            className="cracker-burst"
            style={{
              '--burst-x': launch.x,
              '--burst-y': launch.y,
              '--launch-delay': launch.delay,
            }}
          >
            {Array.from({ length: 18 }).map((_, index) => (
              <span
                key={`ray-${launch.x}-${index}`}
                className="cracker-ray"
                style={{
                  '--ray-angle': `${index * 20}deg`,
                  '--ray-length': `${48 + (index % 6) * 8}px`,
                }}
              />
            ))}
            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={`spark-${launch.x}-${index}`}
                className="cracker-spark"
                style={{
                  '--spark-angle': `${index * 36}deg`,
                  '--spark-distance': `${34 + (index % 4) * 10}px`,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
