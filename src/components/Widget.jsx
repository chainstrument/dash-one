export default function Widget({ title, children, large = false }) {
  return (
    <article className={`widget ${large ? 'widget-large' : ''}`}>
      <h2>{title}</h2>
      <div className="widget-content">
        {children}
      </div>
    </article>
  )
}
