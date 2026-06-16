import { useState, useEffect } from 'react'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todo-tasks')
    return saved ? JSON.parse(saved) : []
  })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks))
  }, [tasks])

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

  // Filter logic
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true // 'all'
  })

  // Counts for filter buttons
  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <TaskInput onAddTask={addTask} />
        <FilterBar filter={filter} setFilter={setFilter} taskCounts={taskCounts} />
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </main>
    </div>
  )
}

export default App