export default function LandingPage({ onStart }) {
  return (
    <div className="landing-page">
      <div className="landing-torches">
        <div className="torch torch--left">
          <div className="torch__flame">{'\u{1F525}'}</div>
          <div className="torch__pole">|</div>
        </div>
        <div className="torch torch--right">
          <div className="torch__flame">{'\u{1F525}'}</div>
          <div className="torch__pole">|</div>
        </div>
      </div>

      <div className="landing-tiki-scene">
        <div className="landing-tiki-float tiki-float-1">{'\u{1F334}'}</div>
        <div className="landing-tiki-float tiki-float-2">{'\u{1F525}'}</div>
        <div className="landing-tiki-main">{'\u{1F5FF}'}</div>
        <div className="landing-tiki-float tiki-float-3">{'\u{1F334}'}</div>
        <div className="landing-tiki-float tiki-float-4">{'\u{2728}'}</div>
      </div>

      <h1 className="landing-title">Find Your Spiritual Tiki Drink</h1>
      <p className="landing-subtitle">
        Embark on a spiritual journey to find the true tiki beverage that lives within you.
      </p>

      <div className="landing-decor-row">
        <span className="landing-decor-item decor-sway">{'\u{1F965}'}</span>
        <span className="landing-decor-item decor-hula">{'\u{1F3B6}'}</span>
        <span className="landing-decor-item decor-sway">{'\u{1F34D}'}</span>
        <span className="landing-decor-item decor-hula">{'\u{1F378}'}</span>
        <span className="landing-decor-item decor-sway">{'\u{1F30A}'}</span>
      </div>

      <button className="tiki-button" onClick={onStart}>
        {'\u{1F943}'} Begin Your Journey
      </button>

      <p className="landing-footer">
        A celebration of tiki culture, from Don the Beachcomber and Trader Vic
        to the modern tiki revival at Smuggler{'\u2019'}s Cove and beyond. Mahalo!
      </p>

      <div className="landing-bottom-decor">
        <span>{'\u{1F334}'}</span>
        <span>{'\u{1F41A}'}</span>
        <span>{'\u{1F3D6}'}</span>
        <span>{'\u{1F41A}'}</span>
        <span>{'\u{1F334}'}</span>
      </div>
    </div>
  );
}
