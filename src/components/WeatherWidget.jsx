import { useEffect, useState } from 'react'
import Widget from './Widget'

const weatherCodeMap = {
  0: 'Ciel dégagé',
  1: 'Principalement ensoleillé',
  2: 'Partiellement nuageux',
  3: 'Nuageux',
  45: 'Brouillard',
  48: 'Brouillard givrant',
  51: 'Bruine légère',
  53: 'Bruine modérée',
  55: 'Bruine dense',
  56: 'Verglas',
  57: 'Verglas dense',
  61: 'Pluie légère',
  63: 'Pluie modérée',
  65: 'Pluie forte',
  66: 'Pluie verglaçante',
  67: 'Pluie verglaçante forte',
  71: 'Neige légère',
  73: 'Neige modérée',
  75: 'Neige forte',
  77: 'Grains de neige',
  80: 'Averses légères',
  81: 'Averses modérées',
  82: 'Averses violentes',
  85: 'Averses de neige légères',
  86: 'Averses de neige fortes',
  95: 'Orages',
  96: 'Orages avec grêle légère',
  99: 'Orages avec grêle forte'
}

function formatTemperature(value) {
  return `${Math.round(value)}°C`
}

function loadWeatherPreferences() {
  try {
    const saved = localStorage.getItem('weatherCity')
    return saved || 'Paris'
  } catch (e) {
    console.error('Erreur lors de la lecture des préférences météo:', e)
    return 'Paris'
  }
}

export default function WeatherWidget() {
  const [city, setCity] = useState(loadWeatherPreferences)
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Sauvegarder la ville dans localStorage quand elle change
  useEffect(() => {
    localStorage.setItem('weatherCity', city)
  }, [city])

  useEffect(() => {
    fetchWeather(city)
    setSearch(city)
  }, [city])

  async function fetchWeather(queryCity) {
    setLoading(true)
    setError('')
    setWeather(null)
    setLocation(null)

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(queryCity)}&count=1&language=fr`
      )

      if (!geoRes.ok) {
        throw new Error('Erreur de géocodage')
      }

      const geoData = await geoRes.json()
      const place = geoData.results?.[0]

      if (!place) {
        throw new Error('Ville introuvable')
      }

      const { latitude, longitude, name, country } = place
      setLocation(`${name}, ${country}`)

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=Europe%2FParis`
      )

      if (!weatherRes.ok) {
        throw new Error('Erreur météo')
      }

      const weatherData = await weatherRes.json()
      const current = weatherData.current_weather

      if (!current) {
        throw new Error('Aucune donnée météo disponible')
      }

      setWeather({
        temperature: current.temperature,
        condition: weatherCodeMap[current.weathercode] ?? 'Conditions inconnues',
        windspeed: current.windspeed,
        time: current.time
      })
    } catch (err) {
      setError(err.message || 'Erreur lors de la récupération de la météo')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (search.trim().length < 2) {
      setError('Entrez le nom d’une ville valide')
      return
    }
    setCity(search.trim())
    fetchWeather(search.trim())
  }

  return (
    <Widget title="Widget Météo">
      <form className="weather-form" onSubmit={handleSubmit}>
        <label htmlFor="city-input">Ville</label>
        <div className="weather-row">
          <input
            id="city-input"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Paris, Lyon, Marseille..."
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Chargement...' : 'Rechercher'}
          </button>
        </div>
      </form>

      {error && <div className="weather-error">{error}</div>}

      {weather && (
        <div className="weather-status">
          <div className="weather-location">{location}</div>
          <div className="weather-details">
            <div>
              <span className="weather-label">Température :</span>
              <strong>{formatTemperature(weather.temperature)}</strong>
            </div>
            <div>
              <span className="weather-label">Conditions :</span>
              <strong>{weather.condition}</strong>
            </div>
            <div>
              <span className="weather-label">Vent :</span>
              <strong>{Math.round(weather.windspeed)} km/h</strong>
            </div>
          </div>
        </div>
      )}
    </Widget>
  )
}
