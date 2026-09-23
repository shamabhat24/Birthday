export default function Photo3Page({ onNext }) {
  return (
    <div className="screen">
      <div className="card story-card">
        <img className="memory-photo photo-one-image" src="/photo3.jpeg" alt="Photo memory 3" />
        <p>
          Of course I miss you taking me to the pub even when I was underage…
          <br />
          <br />
          but but but!!
          <br />
          <br />
          NOW I&apos;M NOT UNDERAGE 😌😂
        </p>

        <button type="button" className="btn" onClick={onNext}>
          Next →
        </button>
      </div>
    </div>
  )
}
