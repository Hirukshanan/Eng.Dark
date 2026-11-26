import ModeSwitch from './ModeSwitch';
import { NavLink } from 'react-router-dom';

import {
  House,
  UserRound,
  FolderCode,
  Network,
  Trophy,
  Images,
  BrainCircuit,
  Mail
} from 'lucide-react';

const navItems = [
  { name: 'Home', icon: House },
  { name: 'About', icon: UserRound },
  { name: 'Projects', icon: FolderCode },
  { name: 'Skills', icon: Network },
  { name: 'Awards', icon: Trophy },
  { name: 'Gallery', icon: Images },
  { name: 'DarkX', icon: BrainCircuit },
  { name: 'Contact', icon: Mail }
];

function Navbar({ mode, setMode }) {
  return (
    <header className="navbar">

      <NavLink className="logo" to="/home">
        Eng.<span>Dark</span>
      </NavLink>

      <nav className="nav-links">
        {navItems.map(({ name, icon: Icon }) => (
          <NavLink
            key={name}
            to={`/${name.toLowerCase()}`}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={22} strokeWidth={1.7} />

            <span>{name}</span>

            <div className="nav-indicator" />
          </NavLink>
        ))}
      </nav>
      <ModeSwitch mode={mode} setMode={setMode} />
    </header>
  );
}

export default Navbar;