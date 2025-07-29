// import { useState } from "react";

// export function CreateTodo() {
//     const [title, setTitle] = useState("")
//     const [description, setDescription] = useState("")
//     return (
//         <div>
//             <div className="bg-gray-200 flex justify-center items-center min-h-screen">
//                 <div className="border rounded-lg shadow-xl p-6 bg-white w-80 flex flex-col items-center">

//                 <input type="text" placeholder="title" className="w-full mb-2 p-2 border rounded" onChange={function (e) {
//                     const value = e.target.value;
//                     setTitle(e.target.value);
//                 }}
//                 ></input><br />


//                 <input type="text" placeholder="description" className="w-full mb-2 p-2 border rounded" onChange={function (e) {
//                     const value = e.target.value;
//                     setDescription(e.target.value);
//                 }}
//                 ></input><br />



//                 <button className=" bg-blue-600 text-white p-2 w-35 border rounded hover:bg-blue-700 hover:shadow-xl cursor-pointer" onClick={() => {
//                     fetch('http://localhost:3000/todo', {
//                         method: 'POST',
//                         body: JSON.stringify({
//                             title: title,
//                             description: description
//                         }),
//                         headers: {
//                             "content-type": "application/json"
//                         }
//                     })
//                         .then(async function (res) {
//                             const json = await res.json()
//                             alert('todo added')
//                         })
//                 }}>add todo</button>
//             </div>
//             </div> 
//         </div>
//     );
// }


// "use client"

// import { useState } from "react"

// export function CreateTodo({ onTodoAdded }) {
//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!title.trim() || !description.trim()) {
//       setError("Please fill in both title and description")
//       return
//     }

//     try {
//       setLoading(true)
//       setError(null)

//       const response = await fetch("http://localhost:3000/todo", {
//         method: "POST",
//         body: JSON.stringify({
//           title: title.trim(),
//           description: description.trim(),
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.msg || "Failed to create todo")
//       }

//       // Clear form and add todo to list
//       setTitle("")
//       setDescription("")
//       onTodoAdded(data.todo)
//     } catch (err) {
//       setError(err.message)
//       console.error("Error creating todo:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="mb-8">
//       <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add New Task</h2>

//         {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input
//               type="text"
//               placeholder="Task title"
//               value={title}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//               onChange={(e) => setTitle(e.target.value)}
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <textarea
//               placeholder="Task description"
//               value={description}
//               rows="3"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
//               onChange={(e) => setDescription(e.target.value)}
//               disabled={loading}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
//           >
//             {loading ? "Adding Task..." : "Add Task"}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState } from "react"

export function CreateTodo({ onTodoAdded }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      setError("Please fill in both title and description")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch("http://localhost:3000/todo", {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.msg || "Failed to create todo")
      }

      // Clear form and add todo to list
      setTitle("")
      setDescription("")
      onTodoAdded(data.todo)
    } catch (err) {
      setError(err.message)
      console.error("Error creating todo:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Add New Task</h2>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900 placeholder-gray-500"
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <textarea
            placeholder="Add more details..."
            value={description}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none text-gray-900 placeholder-gray-500"
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !title.trim() || !description.trim()}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding Task...
            </span>
          ) : (
            "Add Task"
          )}
        </button>
      </form>
    </div>
  )
}
