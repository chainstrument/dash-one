import { useEffect, useState } from 'react'
import Widget from './Widget'

const QUOTES_API = '/api/quotes'

function pickRandomQuote(quotes) {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

export default function QuoteWidget() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchQuote()
  }, [])

  async function fetchQuote() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(QUOTES_API)
      if (!response.ok) {
        throw new Error('Impossible de récupérer la citation')
      }

      const data = await response.json()
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Aucune citation disponible')
      }

      const randomQuote = pickRandomQuote(data)
      setQuote({ text: randomQuote.text, author: randomQuote.author || 'Anonyme' })
    } catch (err) {
      console.error('QuoteWidget fetch error:', err)
      // Normalize error message for display
      const msg = err && err.message ? err.message : String(err)
      setError(err.message || 'Erreur lors de la récupération de la citation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Widget title="Widget Citation">
      <div className="quote-widget">
        {loading && <p>Chargement de la citation...</p>}
        {error && <div className="quote-error">{error}</div>}
        {quote && (
          <>
            <p className="quote-text">“{quote.text}”</p>
            <p className="quote-author">— {quote.author}</p>
          </>
        )}
        <button className="btn btn-primary" onClick={fetchQuote} disabled={loading}>
          Nouvelle citation
        </button>
      </div>
    </Widget>
  )
}
