"use client"

import { useState, useEffect } from "react"
import { CreateTodo } from "./components/CreateTodo"
import { Todos } from "./components/Todos"
import { LoadingSpinner } from "./components/LoadingSpinner"
import { ErrorMessage } from "./components/ErrorMessage"
import { Header } from "./components/Header"

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("http://localhost:3000/todos")

      if (!response.ok) {
        throw new Error("Failed to fetch todos")
      }

      const data = await response.json()
      setTodos(data.todos)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching todos:", err)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  const updateTodo = (updatedTodo) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)))
  }

  const deleteTodo = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId))
  }

  if (loading) {
    return <LoadingSpinner />
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header totalTasks={totalCount} completedTasks={completedCount} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

        <div className="space-y-8">
          <CreateTodo onTodoAdded={addTodo} />
          <Todos todos={todos} onTodoUpdated={updateTodo} onTodoDeleted={deleteTodo} />
        </div>
      </main>
    </div>
  )
}

export default App
