import { useMemo } from 'react'

const PETAL_COLORS = ['#F3B9C6', '#F5C7A0', '#EAD9C9']
const PETAL_COUNT = 14

export default function BackgroundPetals() {
  const petals = useMemo(() => {
    return Array.from({ length: PETAL_COUNT }).map((_, i) => ({
      id: i,
      size: 10 + Math.random() * 14,
      left: Math.random() * 100,
      duration: 14 + Math.random() * 12,
      delay: Math.random() * -20,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
    }))
  }, [])

  return (
    <div className="bg-petals" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}vw`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="9" fill={p.color} />
          </svg>
        </div>
      ))}
    </div>
  )
}
