import { useState, useEffect } from 'react'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Load tasks from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem('todo-tasks')
    if (saved) {
      setTasks(JSON.parse(saved))
    }
    // Small delay so loading state is visible (feels intentional, not broken)
    setTimeout(() => setIsLoading(false), 400)
  }, [])

  // Save tasks whenever they change (skip the very first load)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todo-tasks', JSON.stringify(tasks))
    }
  }, [tasks, isLoading])

  const addTask = ({ text, priority }) => {
    const newTask = {
      id: Date.now(),
      text,
      priority,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    }
    setTasks([newTask, ...tasks])
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
        <TaskInput onAddTask={addTask} />
        <FilterBar filter={filter} setFilter={setFilter} taskCounts={taskCounts} />

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-3 border-gray-700 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        )}
      </main>
    </div>
  )
}

export default App