import { useState } from 'react'

export default function VerifyPage({ onSubmit, wrongAttempt }) {
  const [date, setDate] = useState('')
  const [emptyWarning, setEmptyWarning] = useState(false)

  function handleSubmit() {
    if (!date) {
      setEmptyWarning(true)
      return
    }

    setEmptyWarning(false)
    onSubmit(date)
  }

  return (
    <div className="verify-screen">
      <div className="floral-overlay"></div>

      <div className="verify-content">

        <p className="verify-title">Oi Chinniii...... 👀</p>

        <h1 className="verify-subtitle">
          Eneee hange entry aagal bidti maadide?? 😭
        </h1>

        <p className="verify-subtitle">
          First prove me... nande akka heli!!!!!! 😂
        </p>

        <div className="dob-section">
          <label htmlFor="dobInput">
            Enter your date of birth
          </label>

          <input
            id="dobInput"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
              setEmptyWarning(false)
            }}
            className={wrongAttempt ? 'shake' : ''}
          />
        </div>

        <button className="verify-button" onClick={handleSubmit}>
          Continue
        </button>

        <div className="verify-feedback">
          {emptyWarning
            ? 'Please enter your date of birth.'
            : wrongAttempt
            ? 'Akkaaaaaaa correct haake '
            : ''}
        </div>

        <p className="bottom-note">
          Don't overthink it :)
        </p>

      </div>
    </div>
  )
}
