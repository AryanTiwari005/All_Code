import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/auth-context'
import toast from 'react-hot-toast'

const Header = () => {
  const { user, logout, updateUserName } = useAuthContext()
  const navigate = useNavigate()

  const displayName = user?.firstName || user?.name || user?.email?.split('@')[0] || 'User'
  const [isEditing, setIsEditing] = useState(false)
  const [nameInput, setNameInput] = useState('')

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const handleSave = (e) => {
    e?.preventDefault()
    if (!nameInput.trim()) {
      toast.error('Username cannot be empty.')
      return
    }
    if (updateUserName) {
      updateUserName(nameInput.trim())
      toast.success('Username updated successfully!')
    }
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <p className="text-zinc-400 text-xs sm:text-sm font-medium">Welcome back</p>

        {isEditing ? (
          <form onSubmit={handleSave} className="flex items-center gap-2 mt-1">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter username"
              autoFocus
              className="bg-zinc-800 border border-zinc-700 text-white font-semibold text-lg sm:text-2xl px-3 py-1 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setNameInput(displayName)
                setIsEditing(false)
              }}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2.5 mt-0.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-white capitalize">
              Hello <span className="text-indigo-400">{displayName}</span> 👋
            </h1>
            <button
              onClick={() => {
                setNameInput(displayName)
                setIsEditing(true)
              }}
              title="Edit your username"
              aria-label="Edit username"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm md:text-base font-medium text-white px-3.5 sm:px-5 py-2 rounded-lg transition-colors cursor-pointer shrink-0 self-start sm:self-end"
      >
        Log out
      </button>
    </div>
  )
}

export default Header