import './App.css'

function App() {
  return (
    <>
      <header className="app-header">
        <div className="logo">Personal Dashboard</div>
        <nav className="app-nav">
          <a href="#">Accueil</a>
          <a href="#">Widgets</a>
          <a href="#">À propos</a>
        </nav>
      </header>

      <main className="dashboard-shell">
        <section className="hero">
          <div>
            <p className="eyebrow">Bienvenue</p>
            <h1>Ton dashboard personnel</h1>
            <p>Un espace simple et responsive pour regrouper tes widgets du quotidien.</p>
          </div>
          <div className="hero-actions">
            <button className="btn btn-primary">Ajouter un widget</button>
            <button className="btn">Voir les exemples</button>
          </div>
        </section>

        <section className="dashboard-grid" aria-label="Zone dashboard principale">
          <article className="widget widget-large">
            <h2>Widget Horloge</h2>
            <p>Affiche l'heure et la date en temps réel.</p>
          </article>
          <article className="widget">
            <h2>Widget Météo</h2>
            <p>Affiche la météo locale et les conditions actuelles.</p>
          </article>
          <article className="widget">
            <h2>Widget Citation</h2>
            <p>Une citation inspirante du jour.</p>
          </article>
          <article className="widget">
            <h2>Widget To-Do</h2>
            <p>Gère tes tâches quotidiennes rapidement.</p>
          </article>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2026 Personal Dashboard</p>
      </footer>
    </>
  )
}

export default App
