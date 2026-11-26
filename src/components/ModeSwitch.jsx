import { BriefcaseBusiness, Gamepad2 } from 'lucide-react';

function ModeSwitch({ mode, setMode }) {
  return (
    <div className="mode-switch">

      <button
        className={mode === 'professional' ? 'selected' : ''}
        aria-pressed={mode === 'professional'}
        onClick={() => setMode('professional')}
      >
        <BriefcaseBusiness size={16} />
        <span>Professional</span>
      </button>

      <button
        className={mode === 'experience' ? 'selected' : ''}
        aria-pressed={mode === 'experience'}
        onClick={() => setMode('experience')}
      >
        <Gamepad2 size={16} />
        <span>Experience</span>
      </button>

    </div>
  );
}

export default ModeSwitch;