function Home({ mode }) {
  return (
    <main className="home">

      <div className="mode-status">
        {mode === 'experience'
          ? 'EXPERIENCE MODE // SYSTEM ONLINE'
          : 'PROFESSIONAL MODE'}
      </div>

      <h1>Eng.<span>Dark</span></h1>

      <p>Exploring the Unknown. Engineering the Future.</p>

    </main>
  );
}

export default Home;