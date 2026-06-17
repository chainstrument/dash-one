import { useEffect, useState } from 'react'
import Widget from './Widget'

const QUOTE_API = 'https://api.quotable.io/random'

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
      const response = await fetch(QUOTE_API)
      if (!response.ok) {
        throw new Error('Impossible de récupérer la citation')
      }

      const data = await response.json()
      setQuote({ text: data.content, author: data.author })
    } catch (err) {
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
