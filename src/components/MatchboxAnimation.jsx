export default function MatchboxAnimation({ visible, strikeZoneRef }) {
  return (
    <div className={`matchbox-wrap ${visible ? 'visible' : ''}`}>
      <div className="matchbox-body" aria-hidden="true">
        <div className="matchbox-tray" />
        <div className="matchbox-sleeve">
          <span className="matchbox-brand">Safety Matches</span>
          <span className="matchbox-mark" />
        </div>
        <div ref={strikeZoneRef} className="matchbox-strike-zone" />
      </div>
    </div>
  )
}
