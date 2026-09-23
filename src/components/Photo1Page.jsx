export default function Photo1Page({ onNext }) {
  return (
    <div className="screen">
      <div className="card story-card">
        <img className="memory-photo photo-one-image" src="/photo1.jpg" alt="Photo memory 1" />
        <p>Found this ancient artifact 💀</p>

        <button type="button" className="btn" onClick={onNext}>
          Next →
        </button>
      </div>
    </div>
  )
}
