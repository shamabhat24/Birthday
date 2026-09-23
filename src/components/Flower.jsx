export function CornerFlower({ position = 'tl' }) {
  return (
    <svg className={`corner ${position}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 32C32 32 20 8 8 14C-4 20 14 34 32 32Z" fill="#F3B9C6" opacity="0.9" />
      <path d="M32 32C32 32 44 8 56 14C68 20 50 34 32 32Z" fill="#F5C7A0" opacity="0.9" />
      <circle cx="32" cy="30" r="6" fill="#D98A98" />
      {position === 'tl' && (
        <path d="M20 40C24 44 28 50 26 58" stroke="#A9BE8C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
    </svg>
  )
}

export function EyebrowFlower() {
  return (
    <div className="eyebrow-flower">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="10" r="5" fill="#F3B9C6" />
        <circle cx="17" cy="24" r="5" fill="#F3B9C6" />
        <circle cx="10" cy="17" r="5" fill="#F5C7A0" />
        <circle cx="24" cy="17" r="5" fill="#F5C7A0" />
        <circle cx="17" cy="17" r="4.5" fill="#D98A98" />
      </svg>
    </div>
  )
}

export function LoadingFlower() {
  return (
    <svg className="loading-flower" viewBox="0 0 70 70" fill="none">
      <circle cx="35" cy="18" r="9" fill="#F3B9C6" />
      <circle cx="35" cy="52" r="9" fill="#F3B9C6" />
      <circle cx="18" cy="35" r="9" fill="#F5C7A0" />
      <circle cx="52" cy="35" r="9" fill="#F5C7A0" />
      <circle cx="35" cy="35" r="9" fill="#D98A98" />
    </svg>
  )
}
