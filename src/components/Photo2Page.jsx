export default function Photo2Page({ onNext }) {
  return (
    <div className="screen">
      <div className="card story-card">
        <img className="memory-photo photo-one-image" src="/photo2.jpeg" alt="Photo memory 2" />
        <p>Wish I could hear this laugh again!!!!</p>

        <button type="button" className="btn" onClick={onNext}>
          Next →
        </button>
      </div>
    </div>
  )
}
