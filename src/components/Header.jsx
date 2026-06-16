function Header() {
    return (
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-2xl mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">✅</span>
            <div>
              <h1 className="text-2xl font-bold text-white">
                My <span className="text-cyan-400">Todo</span> App
              </h1>
              <p className="text-gray-400 text-sm">
                Stay organized, stay productive
              </p>
            </div>
          </div>
        </div>
      </header>
    )
  }
  
  export default Header