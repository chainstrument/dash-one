import { useState, useEffect, useRef } from 'react'
import './App.css'
import Widget from './components/Widget'
import ClockWidget from './components/ClockWidget'
import WeatherWidget from './components/WeatherWidget'
import QuoteWidget from './components/QuoteWidget'
import ToDoWidget from './components/ToDoWidget'

const DEFAULT_WIDGETS = [
  { id: 'clock',   label: 'Horloge',   visible: true },
  { id: 'weather', label: 'Météo',     visible: true },
  { id: 'quote',   label: 'Citation',  visible: true },
  { id: 'todo',    label: 'To-Do',     visible: true },
]

function loadWidgets() {
  try {
    const saved = localStorage.getItem('widgetVisibility')
    if (!saved) return DEFAULT_WIDGETS
    const savedMap = JSON.parse(saved)
    return DEFAULT_WIDGETS.map(w => ({ ...w, visible: savedMap[w.id] ?? w.visible }))
  } catch {
    return DEFAULT_WIDGETS
  }
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [widgets, setWidgets] = useState(loadWidgets)
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const map = Object.fromEntries(widgets.map(w => [w.id, w.visible]))
    localStorage.setItem('widgetVisibility', JSON.stringify(map))
  }, [widgets])

  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setPanelOpen(false)
      }
    }
    if (panelOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [panelOpen])

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  function toggleWidget(id) {
    setWidgets(ws => ws.map(w => w.id === id ? { ...w, visible: !w.visible } : w))
  }

  const isVisible = id => widgets.find(w => w.id === id)?.visible

  return (
    <>
      <header className="app-header">
        <div className="logo">Personal Dashboard</div>
        <nav className="app-nav">
          <a href="#">Accueil</a>
          <a href="#">Widgets</a>
          <a href="#">À propos</a>
        </nav>
        <div className="header-controls" ref={panelRef}>
          <button
            className="btn theme-toggle"
            onClick={() => setPanelOpen(o => !o)}
            title="Gérer les widgets"
          >
            ⚙️
          </button>
          {panelOpen && (
            <div className="widget-panel">
              <p className="widget-panel-title">Widgets affichés</p>
              {widgets.map(w => (
                <label key={w.id} className="widget-panel-item">
                  <input
                    type="checkbox"
                    checked={w.visible}
                    onChange={() => toggleWidget(w.id)}
                  />
                  {w.label}
                </label>
              ))}
            </div>
          )}
          <button className="btn theme-toggle" onClick={toggleTheme} title="Changer de thème">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
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
          {isVisible('clock')   && <ClockWidget />}
          {isVisible('weather') && <WeatherWidget />}
          {isVisible('quote')   && <QuoteWidget />}
          {isVisible('todo')    && <ToDoWidget />}
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2026 Personal Dashboard</p>
      </footer>
    </>
  )
}

export default App
