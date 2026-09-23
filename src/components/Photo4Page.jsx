export default function Photo4Page({ onNext }) {
  return (
    <div className="screen">
      <div className="card story-card">
        <img className="memory-photo" src="/wedding.jpeg" alt="Memory with Akka" />
        <p>“Watching you begin a new chapter was beautiful, but letting you go into it wasn’t easy.” 🤍</p>

        <button type="button" className="btn" onClick={onNext}>
          Next →
        </button>
      </div>
    </div>
  )
}
