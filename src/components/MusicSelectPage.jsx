export default function MusicSelectPage({
  songs,
  selectedSongIndex,
  isPlaying,
  onSelectSong,
  onContinue,
}) {
  return (
    <div className="screen">
      <div className="card music-select-card">
        <h1 className="headline">Pick a song, Chinni ♡</h1>
        <p className="sub">
          Choose your background track. It will keep playing through all the memories.
        </p>

        <div className="track-list" role="listbox" aria-label="Song selection">
          {songs.map((song, index) => {
            const isSelected = selectedSongIndex === index
            return (
              <button
                key={song.id}
                type="button"
                className={`track-item ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectSong(index)}
                aria-selected={isSelected}
              >
                <div className="track-meta">
                  <span className="track-title">{song.title}</span>
                  {song.artist ? <span className="track-artist">{song.artist}</span> : null}
                </div>
                <div className="track-state">
                  {isSelected ? (
                    <>
                      <span className="track-check">✓</span>
                      <span className="track-playing">{isPlaying ? '▶ Playing...' : 'Paused'}</span>
                    </>
                  ) : (
                    <span className="track-playing">Tap to play</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        <button
          type="button"
          className="verify-button"
          onClick={onContinue}
          disabled={selectedSongIndex === null}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
