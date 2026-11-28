import { Link } from 'react-router-dom';

import {
  FolderCode,
  BriefcaseBusiness,
  Mail,
  ArrowUpRight
} from 'lucide-react';

import profile from '../data/profile';

function Home({ mode }) {
  const isExperience = mode === 'experience';

  return (
    <main className="home">
      <section className="hero">

        {/* Personal information */}
        <div className="hero-content">

          {profile.openToWork && (
            <div className="availability">
              <span className="status-dot" />
              Open to internships
            </div>
          )}

          <div className="mode-status">
            {isExperience ? 'IDENTITY // 001' : 'HELLO, I AM'}
          </div>

          <h1 className="hero-name">
            Logachandran
            <span>Hirukshanan</span>
          </h1>

          <h2 className="hero-role">
            {profile.role}
          </h2>

          <div className="hero-education">
            {profile.university}
            <br />
            {profile.degree}
          </div>

          <p className="hero-tagline">
            {profile.tagline}
          </p>

          <p className="hero-introduction">
            {profile.introduction}
          </p>

          <div className="hero-actions">
            <Link to="/projects" className="primary-button">
              View Projects
              <ArrowUpRight size={18} />
            </Link>

            <Link to="/contact" className="secondary-button">
              Contact Me
            </Link>
          </div>

          <div className="social-links">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <FolderCode size={22} />
            </a>

            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <BriefcaseBusiness size={22} />
            </a>

            <a
              href={`mailto:${profile.social.email}`}
              aria-label="Email"
              title="Email"
            >
              <Mail size={22} />
            </a>
          </div>

        </div>

        {/* Profile picture section */}
        <div className="hero-visual">
          <div className="portrait-frame">

            {isExperience && (
              <>
                <div className="hud-corner top-left" />
                <div className="hud-corner top-right" />
                <div className="hud-corner bottom-left" />
                <div className="hud-corner bottom-right" />

                <span className="hud-text hud-top-left">
                  IDENTITY // 001
                </span>

                <span className="hud-text hud-top-right">
                  ● ONLINE
                </span>

                <span className="hud-text hud-bottom-left">
                  AI / ML
                </span>

                <span className="hud-text hud-bottom-right">
                  SYSTEM ACTIVE
                </span>

                <div className="scan-line" />
              </>
            )}

            <div className="portrait-ring">
              <img
                src={`${import.meta.env.BASE_URL}profile.jpg`}
                alt={profile.name}
                className="profile-image"
              />
            </div>

            {isExperience && (
              <div className="portrait-label">
                ENG.DARK // IDENTITY
              </div>
            )}
          </div>
        </div>

      </section>
    </main>
  );
}

export default Home;