// import {CreateTodo} from './components/CreateTodo'
// import './App.css'
// import { Todos } from './components/Todos'
// import { useState } from 'react'

// function App() {
// const [todos,setTodos] = useState([]);
// // it goes to infinite loop
// fetch("http://localhost:3000/todos")
// .then(async function(res) {
//   const json =await res.json();
//   setTodos(json.todos)
// })
//   return (
//     <div> 
//       <CreateTodo/>
//       <Todos todos={todo}/>
//     </div>
//   )
// }

// export default App

// import { useState } from 'react'
// import {CreateTodo} from './components/CreateTodo'
// import { Todos } from './components/Todos'

// function App() {
// const [todos,setTodos] = useState([])
//   return (
//     <div> 
//       <CreateTodo/>
//       <Todos todos={todos}/>
//     </div>
//   )
// }

// export default App


// "use client"

// import { useState, useEffect } from "react"
// import { CreateTodo } from "./components/CreateTodo"
// import { Todos } from "./components/Todos"
// import { LoadingSpinner } from "./components/LoadingSpinner"
// import { ErrorMessage } from "./components/ErrorMessage"

// function App() {
//   const [todos, setTodos] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   // Fetch todos on component mount
//   useEffect(() => {
//     fetchTodos()
//   }, [])

//   const fetchTodos = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       const response = await fetch("http://localhost:3000/todos")

//       if (!response.ok) {
//         throw new Error("Failed to fetch todos")
//       }

//       const data = await response.json()
//       setTodos(data.todos)
//     } catch (err) {
//       setError(err.message)
//       console.error("Error fetching todos:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const addTodo = (newTodo) => {
//     setTodos((prevTodos) => [...prevTodos, newTodo])
//   }

//   const updateTodo = (updatedTodo) => {
//     setTodos((prevTodos) => prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)))
//   }

//   const deleteTodo = (todoId) => {
//     setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId))
//   }

//   if (loading) {
//     return <LoadingSpinner />
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo App</h1>
//           <p className="text-gray-600">Manage your tasks efficiently</p>
//         </div>

//         {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

//         <div className="max-w-4xl mx-auto">
//           <CreateTodo onTodoAdded={addTodo} />
//           <Todos todos={todos} onTodoUpdated={updateTodo} onTodoDeleted={deleteTodo} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default App


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
