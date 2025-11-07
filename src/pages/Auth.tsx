// src/pages/Auth.tsx
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Mail, Lock, User, Loader2, LogIn, UserPlus } from 'lucide-react'
import { useToast } from '../contexts/ToastContext'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useToast()

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      showSuccess('Berhasil login!')
      window.location.href = "/"
    } catch (err: any) {
      showError(err.message ?? 'Terjadi error')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      const user = data.user
      if (user) {
        const { error: insertError } = await supabase.from('profiles').insert([
          { id: user.id, avatar_url: 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(displayName), display_name: displayName},
        ])
        if (insertError) throw insertError
      }

      if (error) throw error
      showSuccess('Akun berhasil dibuat! Cek email untuk verifikasi (jika diaktifkan).')
      window.location.reload();
    } catch (err: any) {
      showError(err.message ?? 'Terjadi error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {isLogin ? 'Welcome Back 👋' : 'Create an Account ✨'}
        </h2>

        {/* Tab Switch */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 font-medium rounded-l-xl transition-all ${isLogin
                ? 'bg-purple-500 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 font-medium rounded-r-xl transition-all ${!isLogin
                ? 'bg-pink-500 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          {/* Display Name (Only Register) */}
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
              <input
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50"
              />
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-4">
            {isLogin ? (
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/40 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
                Login
              </button>
            ) : (
              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-pink-500/40 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
                Register
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <p className="text-center text-sm text-gray-400 mt-6">
          {isLogin ? (
            <>
              Belum punya akun?{' '}
              <button
                className="text-purple-400 hover:text-pink-400 font-medium"
                onClick={() => setIsLogin(false)}
              >
                Daftar sekarang
              </button>
            </>
          ) : (
            <>
              Sudah punya akun?{' '}
              <button
                className="text-pink-400 hover:text-purple-400 font-medium"
                onClick={() => setIsLogin(true)}
              >
                Login di sini
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
