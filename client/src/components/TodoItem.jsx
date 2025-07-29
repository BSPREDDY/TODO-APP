// "use client"

// import { useState } from "react"

// export function TodoItem({ todo, onTodoUpdated, onTodoDeleted }) {
//   const [loading, setLoading] = useState(false)
//   const [editing, setEditing] = useState(false)
//   const [editTitle, setEditTitle] = useState(todo.title)
//   const [editDescription, setEditDescription] = useState(todo.description)

//   const toggleComplete = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch(`http://localhost:3000/update/${todo._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           completed: !todo.completed,
//         }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.msg || "Failed to update todo")
//       }

//       onTodoUpdated(data.todo)
//     } catch (error) {
//       console.error("Error updating todo:", error)
//       alert("Failed to update task")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteTodo = async () => {
//     if (!confirm("Are you sure you want to delete this task?")) {
//       return
//     }

//     try {
//       setLoading(true)
//       const response = await fetch(`http://localhost:3000/todo/${todo._id}`, {
//         method: "DELETE",
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.msg || "Failed to delete todo")
//       }

//       onTodoDeleted(todo._id)
//     } catch (error) {
//       console.error("Error deleting todo:", error)
//       alert("Failed to delete task")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const saveEdit = async () => {
//     if (!editTitle.trim() || !editDescription.trim()) {
//       alert("Please fill in both title and description")
//       return
//     }

//     try {
//       setLoading(true)
//       const response = await fetch(`http://localhost:3000/todo/${todo._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: editTitle.trim(),
//           description: editDescription.trim(),
//         }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.msg || "Failed to update todo")
//       }

//       onTodoUpdated(data.todo)
//       setEditing(false)
//     } catch (error) {
//       console.error("Error updating todo:", error)
//       alert("Failed to update task")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const cancelEdit = () => {
//     setEditTitle(todo.title)
//     setEditDescription(todo.description)
//     setEditing(false)
//   }

//   if (editing) {
//     return (
//       <div className="p-6 bg-blue-50">
//         <div className="space-y-4">
//           <input
//             type="text"
//             value={editTitle}
//             onChange={(e) => setEditTitle(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//             disabled={loading}
//             placeholder="Task title"
//           />
//           <textarea
//             value={editDescription}
//             onChange={(e) => setEditDescription(e.target.value)}
//             rows="2"
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
//             disabled={loading}
//             placeholder="Task description"
//           />
//           <div className="flex gap-2">
//             <button
//               onClick={saveEdit}
//               disabled={loading}
//               className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium transition-colors"
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//             <button
//               onClick={cancelEdit}
//               disabled={loading}
//               className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 text-sm font-medium transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="p-6 hover:bg-gray-50 transition-colors">
//       <div className="flex items-start gap-4">
//         {/* Checkbox */}
//         <button onClick={toggleComplete} disabled={loading} className="flex-shrink-0 mt-1">
//           <div
//             className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
//               todo.completed ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-green-400"
//             }`}
//           >
//             {todo.completed && (
//               <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             )}
//           </div>
//         </button>

//         {/* Content */}
//         <div className="flex-1 min-w-0">
//           <h3
//             className={`text-base font-medium transition-all ${
//               todo.completed ? "text-gray-500 line-through" : "text-gray-900"
//             }`}
//           >
//             {todo.title}
//           </h3>
//           <p
//             className={`text-sm mt-1 transition-all ${todo.completed ? "text-gray-400 line-through" : "text-gray-600"}`}
//           >
//             {todo.description}
//           </p>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//           {!todo.completed && (
//             <button
//               onClick={() => setEditing(true)}
//               disabled={loading}
//               className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//               title="Edit task"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                 />
//               </svg>
//             </button>
//           )}

//           <button
//             onClick={deleteTodo}
//             disabled={loading}
//             className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//             title="Delete task"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState } from "react"

export function TodoItem({ todo, onTodoUpdated, onTodoDeleted }) {
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description)

  const toggleComplete = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3000/update/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.msg || "Failed to update todo")
      }

      onTodoUpdated(data.todo)
    } catch (error) {
      console.error("Error updating todo:", error)
      alert("Failed to update task")
    } finally {
      setLoading(false)
    }
  }

  const deleteTodo = async () => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3000/todo/${todo._id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.msg || "Failed to delete todo")
      }

      onTodoDeleted(todo._id)
    } catch (error) {
      console.error("Error deleting todo:", error)
      alert("Failed to delete task")
    } finally {
      setLoading(false)
    }
  }

  const saveEdit = async () => {
    if (!editTitle.trim() || !editDescription.trim()) {
      alert("Please fill in both title and description")
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3000/todo/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle.trim(),
          description: editDescription.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.msg || "Failed to update todo")
      }

      onTodoUpdated(data.todo)
      setEditing(false)
    } catch (error) {
      console.error("Error updating todo:", error)
      alert("Failed to update task")
    } finally {
      setLoading(false)
    }
  }

  const cancelEdit = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="p-6 bg-blue-50">
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            disabled={loading}
            placeholder="Task title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            disabled={loading}
            placeholder="Task description"
          />
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium transition-colors"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={cancelEdit}
              disabled={loading}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors group">
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button onClick={toggleComplete} disabled={loading} className="flex-shrink-0 mt-1">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              todo.completed ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-green-400"
            }`}
          >
            {todo.completed && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-base font-medium transition-all ${
              todo.completed ? "text-gray-500 line-through" : "text-gray-900"
            }`}
          >
            {todo.title}
          </h3>
          <p
            className={`text-sm mt-1 transition-all ${todo.completed ? "text-gray-400 line-through" : "text-gray-600"}`}
          >
            {todo.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {!todo.completed && (
            <button
              onClick={() => setEditing(true)}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          )}

          <button
            onClick={deleteTodo}
            disabled={loading}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
