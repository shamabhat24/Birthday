export default function AlbumIntroPage({ onNext }) {
  return (
    <div className="screen memory-screen">
      <div className="card story-card memory-card">
        <div className="memory-topbar">
          <span className="memory-label">Memories</span>
          <span className="memory-count">1 / 8</span>
        </div>

        <p className="memory-chapter">Chapter 01</p>
        <h1 className="memory-title">Where it all began</h1>
        <p className="memory-sub">Somehow, we became us.</p>

        <div className="polaroid-wrap">
          <div className="polaroid-card">
            <span className="polaroid-tape" aria-hidden="true"></span>
            <img className="polaroid-image" src="/sticker1.png" alt="Our memory" />
            <p className="polaroid-caption">Little us... big dreams ♡</p>
          </div>
        </div>

        <button type="button" className="memory-next" onClick={onNext} aria-label="Next memory">
          →
        </button>
      </div>
    </div>
  )
}
