export default function Cupcake({ candleLit, wickRef }) {
  return (
    <div className="cupcake-stage" aria-live="polite">
      <img
        className="cupcake-sticker"
        src="/cupcup.png"
        alt="Cupcake"
      />

      <div className="cupcake-candle" />
      <div ref={wickRef} className="cupcake-wick" />
      {candleLit && <div className="cupcake-flame" />}
    </div>
  )
}
