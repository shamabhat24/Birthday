export default function StoryPage() {
  return (
    <div className="screen">
      <div className="card story-card">
        <h1>For you, Chinnu 🌷</h1>

        {/* EDIT ME: replace this placeholder with your real birthday
            message, memories, or photos. Add more <p> tags, images,
            or swap this whole component for whatever you're building next. */}
        <p>
          This is where your actual birthday surprise goes — the letter, the
          memories, the photos, whatever you've been planning. 🌸
        </p>
        <p>
          Right now it's just a placeholder so the "verification" flow works
          end to end. Come back and swap this section in whenever you're
          ready.
        </p>

        <div className="note">
          🌱 Dev note (delete before sending): edit{' '}
          <code>src/components/StoryPage.jsx</code> to add your real message.
        </div>
      </div>
    </div>
  )
}
