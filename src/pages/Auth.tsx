// src/pages/Auth.tsx
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      alert('Berhasil login!')
    } catch (err: any) {
      alert(err.message ?? 'Terjadi error')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: displayName } } })

      const user = data.user
      if (user) {
        const { error: insertError } = await supabase.from('profiles').insert([
          {
            id: user.id, 
            avatar_url: null,
          },
        ])
        if (insertError) throw insertError
      }

      if (error) throw error
      alert('Akun dibuat. Cek email untuk verifikasi (jika diaktifkan).')
    } catch (err: any) {
      alert(err.message ?? 'Terjadi error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      <h2>Login / Register</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="mt-2">
        <button onClick={handleLogin} disabled={loading}>Login</button>
        <button onClick={handleRegister} disabled={loading}>Register</button>
      </div>
    </div>
  )
}
