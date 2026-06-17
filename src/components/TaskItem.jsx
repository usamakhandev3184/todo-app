import { useState } from 'react'

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const [isRemoving, setIsRemoving] = useState(false)

  const priorityColors = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-green-500/20 text-green-400 border-green-500/30'
  }

  const priorityEmoji = {
    high: '🔴',
    medium: '🟡',
    low: '🟢'
  }

  const handleSave = () => {
    if (editText.trim() === '') return
    onEdit(task.id, editText)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(task.text)
    setIsEditing(false)
  }

  const handleDelete = () => {
    setIsRemoving(true)
    setTimeout(() => onDelete(task.id), 200)
  }

  return (
    <div
      className={`bg-gray-800 rounded-lg p-4 mb-3 border border-gray-700 
                  flex flex-wrap sm:flex-nowrap items-center gap-3 
                  hover:border-gray-600 transition-all duration-200
                  animate-fadeIn
                  ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
    >

      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center 
                    flex-shrink-0 transition-all duration-200
                    ${task.completed 
                      ? 'bg-cyan-500 border-cyan-500 scale-110' 
                      : 'border-gray-500 hover:border-cyan-400'}`}
      >
        {task.completed && <span className="text-gray-900 text-xs">✓</span>}
      </button>

      {/* Task Text */}
      <div className="flex-1 min-w-0 order-1 sm:order-none w-full sm:w-auto">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave()
              if (e.key === 'Escape') handleCancel()
            }}
            autoFocus
            className="w-full bg-gray-700 text-white border border-cyan-400 
                       rounded px-2 py-1 focus:outline-none"
          />
        ) : (
          <>
            <p className={`text-white break-words transition-all duration-200
                          ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.text}
            </p>
            <span className="text-gray-500 text-xs">{task.createdAt}</span>
          </>
        )}
      </div>

      {/* Priority Badge */}
      {!isEditing && (
        <span className={`text-xs px-2 py-1 rounded-full border whitespace-nowrap ${priorityColors[task.priority]}`}>
          {priorityEmoji[task.priority]} {task.priority}
        </span>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-1 ml-auto sm:ml-0">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-400 hover:text-green-300 transition-colors px-2 py-1"
            >
              ✓
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-red-400 transition-colors px-2 py-1"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-cyan-400 transition-colors px-2 py-1"
            >
              ✎
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-500 hover:text-red-400 transition-colors px-2 py-1"
            >
              ✕
            </button>
          </>
        )}
      </div>

    </div>
  )
}

export default TaskItem