export default function DisclaimerPage({ onContinue }) {
  return (
    <div className="verify-screen disclaimer-screen">
      <div className="floral-overlay"></div>

      <div className="verify-content">
        <h1>⚠️ IMPORTANT DISCLAIMER</h1>
        <p>This website is not copied from Google, Pinterest, or anywhere else. 👀</p>
        <p>
          Every little detail you see here has been thought of, designed, and coded by me —
          especially for you. ♡
        </p>
        <p>
          So yes… I actually used my coding skills for something other than work for once. 😂
        </p>
        <p>
          This website may contain old memories, little surprises, and a lot of sisterly nonsense.
        </p>
        <p>
          <strong>Proceed at your own risk. 😌❤️</strong>
        </p>

        <button className="verify-button" onClick={onContinue}>
          I ACCEPT →
        </button>
      </div>
    </div>
  )
}
