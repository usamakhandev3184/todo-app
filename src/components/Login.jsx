import { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth'

function Login({ onLoginSuccess, switchToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await axios.post(`${API_URL}/login`, { email, password })
      onLoginSuccess(res.data.token, res.data.user)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-1 text-center">
          Welcome Back 👋
        </h1>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Login to manage your tasks
        </p>

        {error && (
          <div className="bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg px-4 py-2 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full bg-gray-700 text-white placeholder-gray-500 
                         border border-gray-600 rounded-lg px-4 py-2.5
                         focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-gray-700 text-white placeholder-gray-500 
                         border border-gray-600 rounded-lg px-4 py-2.5
                         focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50
                       text-gray-900 font-bold py-2.5 rounded-lg transition-colors"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-gray-400 text-center text-sm mt-6">
          Don't have an account?{' '}
          <button
            onClick={switchToRegister}
            className="text-cyan-400 hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login