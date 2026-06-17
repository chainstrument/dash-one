import { useEffect, useState } from 'react'
import Widget from './Widget'

function formatTime(date) {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

function formatDate(date) {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

export default function ClockWidget() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Widget title="Widget Horloge" large>
      <div className="clock-widget">
        <div className="clock-time">{formatTime(now)}</div>
        <div className="clock-date">{formatDate(now)}</div>
      </div>
    </Widget>
  )
}
