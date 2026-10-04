import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuthContext } from '../../context/auth-context'
import toast from 'react-hot-toast'
const Login = () => {
  const { user, login } = useAuthContext()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showDemoBanner, setShowDemoBanner] = useState(true)
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace />
  }
  const handleQuickFill = (roleEmail, rolePass) => {
    setEmail(roleEmail)
    setPassword(rolePass)
    setErrorMessage('')
  }
  const submitHandler = (e) => {
    e.preventDefault()
    setErrorMessage('')
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please provide both your email address and password.')
      return
    }
    setIsLoading(true)
    // Brief delay for button loading animation
    setTimeout(() => {
      const ok = login(email, password)
      setIsLoading(false)
      if (ok) {
        toast.success('Signed in successfully!')
        const adminRaw = localStorage.getItem('admin')
        const isAdmin =
          adminRaw &&
          JSON.parse(adminRaw).some((a) => a.email === email && a.password === password)
        navigate(isAdmin ? '/admin' : '/employee', { replace: true })
      } else {
        setErrorMessage('Invalid email or password. Please verify your credentials.')
      }
    }, 350)
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 px-4 py-8 relative overflow-hidden text-zinc-100">
      {/* ── Ambient Background Lighting ── */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      {/* ── Login Card Container ── */}
      <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-xl relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-11 w-11 rounded-xl bg-indigo-600 items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-600/30 mb-1">
            E
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Sign in to your Employee Management workspace
          </p>
        </div>
        {/* Inline Error Alert */}
        {errorMessage && (
          <div
            role="alert"
            className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm transition-all"
          >
            <svg
              className="w-5 h-5 shrink-0 text-rose-400 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1 font-medium">{errorMessage}</div>
            <button
              type="button"
              onClick={() => setErrorMessage('')}
              className="text-rose-400 hover:text-rose-200 cursor-pointer p-0.5"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        )}
        {/* Quick Demo Credentials Box */}
        {showDemoBanner && (
          <div className="p-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-xs text-zinc-300 flex items-start justify-between gap-2">
            <div className="space-y-2 flex-1">
              <span className="font-semibold text-zinc-200 block text-[11px] uppercase tracking-wider">
                ⚡ Quick Demo Credentials
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin@example.com', '123')}
                  className="flex-1 bg-zinc-700/60 hover:bg-zinc-700 border border-zinc-600/80 text-zinc-200 px-2.5 py-1.5 rounded-lg font-medium text-xs transition-colors cursor-pointer text-left"
                >
                  👑 <span className="font-semibold">Admin</span> (123)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('employee1@example.com', '123')}
                  className="flex-1 bg-zinc-700/60 hover:bg-zinc-700 border border-zinc-600/80 text-zinc-200 px-2.5 py-1.5 rounded-lg font-medium text-xs transition-colors cursor-pointer text-left"
                >
                  👷 <span className="font-semibold">Employee</span> (123)
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowDemoBanner(false)}
              className="text-zinc-500 hover:text-zinc-300 cursor-pointer p-1 text-xs"
              aria-label="Dismiss demo note"
            >
              ✕
            </button>
          </div>
        )}
        {/* Login Form */}
        <form onSubmit={submitHandler} className="space-y-4">
          
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              tabIndex={1}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full bg-zinc-800/90 border border-zinc-700/80 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                tabIndex={2}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full bg-zinc-800/90 border border-zinc-700/80 rounded-xl px-4 py-2.5 sm:py-3 pr-11 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <button
                type="button"
                tabIndex={3}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 focus:outline-none p-1 rounded-md cursor-pointer transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1 text-zinc-400">
            <label className="flex items-center gap-2 cursor-pointer select-none hover:text-zinc-300">
              <input
                type="checkbox"
                tabIndex={4}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer h-4 w-4"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              tabIndex={5}
              onClick={() => toast('Password reset link has been dispatched to your email.')}
              className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer transition-colors"
            >
              Forgot password?
            </button>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            tabIndex={6}
            disabled={isLoading}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
export default Login
