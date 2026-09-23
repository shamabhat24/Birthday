import { useEffect, useState } from 'react'
import { LoadingFlower } from './Flower.jsx'
import { LOADING_STEPS, LOADING_STEP_DURATION } from '../config.js'

export default function LoadingScreen({ onDone, showSuccessStep }) {
  const [stepIndex, setStepIndex] = useState(0)
  const activeSteps = showSuccessStep ? LOADING_STEPS : LOADING_STEPS.slice(0, 2)

  useEffect(() => {
    if (stepIndex >= activeSteps.length - 1) {
      const finalTimer = setTimeout(onDone, LOADING_STEP_DURATION + 300)
      return () => clearTimeout(finalTimer)
    }
    const timer = setTimeout(() => setStepIndex((i) => i + 1), LOADING_STEP_DURATION)
    return () => clearTimeout(timer)
  }, [stepIndex, onDone, activeSteps])

  return (
    <div className="screen">
      <div className="card loading-card">
        <LoadingFlower />
        <div className="loading-text">{activeSteps[stepIndex]}</div>
      </div>
    </div>
  )
}
