function FilterBar({ filter, setFilter, taskCounts }) {
    const filters = [
      { key: 'all', label: 'All', count: taskCounts.all },
      { key: 'active', label: 'Active', count: taskCounts.active },
      { key: 'completed', label: 'Completed', count: taskCounts.completed }
    ]
  
    return (
      <div className="flex gap-2 mb-4">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${filter === f.key
                          ? 'bg-cyan-500 text-gray-900'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'}`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>
    )
  }
  
  export default FilterBar