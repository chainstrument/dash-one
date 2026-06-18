import { useState, useEffect } from 'react'
import './App.css'
import Widget from './components/Widget'
import ClockWidget from './components/ClockWidget'
import WeatherWidget from './components/WeatherWidget'
import QuoteWidget from './components/QuoteWidget'
import ToDoWidget from './components/ToDoWidget'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <header className="app-header">
        <div className="logo">Personal Dashboard</div>
        <nav className="app-nav">
          <a href="#">Accueil</a>
          <a href="#">Widgets</a>
          <a href="#">À propos</a>
        </nav>
        <button className="btn theme-toggle" onClick={toggleTheme} title="Changer de thème">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
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
          <ClockWidget />
          <WeatherWidget />
          <QuoteWidget />
          <ToDoWidget />
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2026 Personal Dashboard</p>
      </footer>
    </>
  )
}

export default App
