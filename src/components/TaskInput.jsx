import { useState } from 'react'

function TaskInput({ onAddTask }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim() === '') return
    onAddTask({ text, priority })
    setText('')
    setPriority('medium')
  }

  return (
    <div className="bg-gray-800 rounded-xl p-5 mb-6 border border-gray-700">
      <h2 className="text-white font-semibold mb-4 text-lg">
        Add New Task
      </h2>
      <form onSubmit={handleSubmit}>

        {/* Task Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you need to do?"
          className="w-full bg-gray-700 text-white placeholder-gray-400 
                     border border-gray-600 rounded-lg px-4 py-3 mb-3
                     focus:outline-none focus:border-cyan-400 transition-colors"
        />

        {/* Priority + Button Row */}
        <div className="flex gap-3">

          {/* Priority Dropdown */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 
                       rounded-lg px-3 py-2 focus:outline-none 
                       focus:border-cyan-400 transition-colors"
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>

          {/* Add Button */}
          <button
            type="submit"
            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-gray-900 
                       font-bold py-2 px-6 rounded-lg transition-colors"
          >
            + Add Task
          </button>

        </div>
      </form>
    </div>
  )
}

export default TaskInput