import { useState } from 'react';

export default function AudioPlayer({ isPlaying, onToggle }) {
  const [hintDismissed, setHintDismissed] = useState(false);

  const handleClick = () => {
    setHintDismissed(true);
    onToggle();
  };

  return (
    <div className="audio-player">
      {!isPlaying && !hintDismissed && (
        <div className="audio-player__hint">
          Tap for ambiance {'\u{1F3B6}'}
          <span className="audio-player__hint-arrow">{'\u2192'}</span>
        </div>
      )}
      <button
        className={`audio-player__button ${isPlaying ? 'playing' : ''}`}
        onClick={handleClick}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? '\u{1F50A}' : '\u{1F507}'}
      </button>
    </div>
  );
}
