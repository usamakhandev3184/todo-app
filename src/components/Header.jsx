function Header({ user, onLogout }) {
  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-700">
      <div className="max-w-2xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">✅</span>
          <div>
            <h1 className="text-2xl font-bold text-white">
              My <span className="text-cyan-400">Todo</span> App
            </h1>
            <p className="text-gray-400 text-sm">
              {user ? `Hi, ${user.username}! 👋` : 'Stay organized, stay productive'}
            </p>
          </div>
        </div>

        {user && (
          <button
            onClick={onLogout}
            className="text-gray-400 hover:text-red-400 text-sm font-medium 
                       border border-gray-700 hover:border-red-400/50 
                       rounded-lg px-3 py-2 transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  )
}

export default Header