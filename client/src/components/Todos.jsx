import { TodoItem } from "./TodoItem"

export function Todos({ todos, onTodoUpdated, onTodoDeleted }) {
  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-500">Add your first task above to get started!</p>
      </div>
    )
  }

  const pendingTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      {pendingTodos.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Pending ({pendingTodos.length})
              </h3>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {pendingTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} onTodoUpdated={onTodoUpdated} onTodoDeleted={onTodoDeleted} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTodos.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Completed ({completedTodos.length})
              </h3>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {completedTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} onTodoUpdated={onTodoUpdated} onTodoDeleted={onTodoDeleted} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
