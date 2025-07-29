export function Header({ totalTasks, completedTasks }) {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600 mb-4">Stay organized and get things done</p>

          {totalTasks > 0 && (
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>
                  {completedTasks} of {totalTasks} completed
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
