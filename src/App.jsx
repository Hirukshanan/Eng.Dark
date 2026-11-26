import { useState, useEffect } from 'react';

import {
  HashRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Awards from './pages/Awards';
import Gallery from './pages/Gallery';
import DarkX from './pages/DarkX';
import Contact from './pages/Contact';

import './App.css';

function App() {

  const [mode, setMode] = useState(() => {
    return localStorage.getItem('portfolioMode') === 'professional'
      ? 'professional'
      : 'experience';
  });

  useEffect(() => {
    localStorage.setItem('portfolioMode', mode);
  }, [mode]);

  return (
    <HashRouter>

      <div className={`portfolio ${mode}-mode`}>

        <Navbar mode={mode} setMode={setMode} />

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/home" element={<Home mode={mode} />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/darkx" element={<DarkX />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>

      </div>

    </HashRouter>
  );
}

export default App;