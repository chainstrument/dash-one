import { useState } from 'react'
import Widget from './Widget'

export default function ToDoWidget() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  function handleAddTodo(event) {
    event.preventDefault()
    if (input.trim().length === 0) return

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false
    }

    setTodos([...todos, newTodo])
    setInput('')
  }

  function handleToggleTodo(id) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <Widget title="Widget To-Do">
      <div className="todo-widget">
        <form className="todo-form" onSubmit={handleAddTodo}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ajouter une tâche..."
            autoFocus
          />
          <button type="submit" className="btn btn-primary">
            Ajouter
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="todo-empty">Aucune tâche. Commence à en ajouter !</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span>{todo.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Widget>
  )
}
