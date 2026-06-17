import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import Login from './components/Login'
import Register from './components/Register'

const API_URL = 'https://todo-backend-t8lt.onrender.com/api/tasks'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  const [token, setToken] = useState(localStorage.getItem('todo-token') || null)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('todo-user')
    return saved ? JSON.parse(saved) : null
  })
  const [authPage, setAuthPage] = useState('login')

  useEffect(() => {
    if (token) {
      fetchTasks()
    }
  }, [token])

  const authHeaders = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(API_URL, authHeaders)
      setTasks(res.data)
    } catch (err) {
      console.error('Error fetching tasks:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginSuccess = (newToken, newUser) => {
    localStorage.setItem('todo-token', newToken)
    localStorage.setItem('todo-user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  const handleLogout = () => {
    localStorage.removeItem('todo-token')
    localStorage.removeItem('todo-user')
    setToken(null)
    setUser(null)
    setTasks([])
  }

  const addTask = async ({ text, priority }) => {
    try {
      const res = await axios.post(API_URL, { text, priority }, authHeaders)
      setTasks([res.data, ...tasks])
    } catch (err) {
      console.error('Error adding task:', err)
    }
  }

  const toggleTask = async (id) => {
    const task = tasks.find(t => t._id === id)
    try {
      const res = await axios.put(`${API_URL}/${id}`, { completed: !task.completed }, authHeaders)
      setTasks(tasks.map(t => t._id === id ? res.data : t))
    } catch (err) {
      console.error('Error updating task:', err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, authHeaders)
      setTasks(tasks.filter(t => t._id !== id))
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  const editTask = async (id, newText) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, { text: newText }, authHeaders)
      setTasks(tasks.map(t => t._id === id ? res.data : t))
    } catch (err) {
      console.error('Error editing task:', err)
    }
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

  if (!token) {
    return authPage === 'login' ? (
      <Login
        onLoginSuccess={handleLoginSuccess}
        switchToRegister={() => setAuthPage('register')}
      />
    ) : (
      <Register
        onLoginSuccess={handleLoginSuccess}
        switchToLogin={() => setAuthPage('login')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header user={user} onLogout={handleLogout} />
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