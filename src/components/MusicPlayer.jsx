export default function MusicPlayer({
  songs,
  selectedSongIndex,
  isPlaying,
  expanded,
  onToggleExpanded,
  onPlay,
  onPause,
  onSelectSong,
}) {
  const currentSong = selectedSongIndex !== null ? songs[selectedSongIndex] : null

  return (
    <div className="music-player-shell">
      <div className="music-player-pill">
        <span className="music-player-icon" aria-hidden="true">
          ♪
        </span>

        <button type="button" className="music-title-btn" onClick={onToggleExpanded}>
          {currentSong ? currentSong.title : 'No song selected'}
        </button>

        <button
          type="button"
          className="music-toggle-btn"
          onClick={isPlaying ? onPause : onPlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
      </div>

      {expanded && (
        <div className="music-dropdown">
          {songs.map((song, index) => {
            const isCurrent = index === selectedSongIndex
            return (
              <button
                key={song.id}
                type="button"
                className={`music-option ${isCurrent ? 'current' : ''}`}
                onClick={() => onSelectSong(index)}
              >
                <span className="music-option-text">
                  {song.artist ? `${song.title} - ${song.artist}` : song.title}
                </span>
                {isCurrent && <span className="music-option-check">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
