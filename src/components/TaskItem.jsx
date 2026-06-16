import { useState } from 'react'

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

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

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-3 border border-gray-700 
                     flex items-center gap-3 group hover:border-gray-600 transition-colors">

      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center 
                    flex-shrink-0 transition-colors
                    ${task.completed 
                      ? 'bg-cyan-500 border-cyan-500' 
                      : 'border-gray-500 hover:border-cyan-400'}`}
      >
        {task.completed && <span className="text-gray-900 text-xs">✓</span>}
      </button>

      {/* Task Text — Edit Mode vs View Mode */}
      <div className="flex-1">
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
            <p className={`text-white ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.text}
            </p>
            <span className="text-gray-500 text-xs">{task.createdAt}</span>
          </>
        )}
      </div>

      {/* Priority Badge */}
      {!isEditing && (
        <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
          {priorityEmoji[task.priority]} {task.priority}
        </span>
      )}

      {/* Action Buttons */}
      {isEditing ? (
        <>
          <button
            onClick={handleSave}
            className="text-green-400 hover:text-green-300 transition-colors px-2"
          >
            ✓
          </button>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-red-400 transition-colors px-2"
          >
            ✕
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-cyan-400 transition-colors px-2"
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-500 hover:text-red-400 transition-colors px-2"
          >
            ✕
          </button>
        </>
      )}

    </div>
  )
}

export default TaskItem