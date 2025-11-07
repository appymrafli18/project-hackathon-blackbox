import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Auth from './Auth'
import type { Session, User } from '@supabase/supabase-js'
import { useToast } from '../contexts/ToastContext'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [notes, setNotes] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const { showSuccess, showError } = useToast()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess ?? null)
      setUser(sess?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) {
        setNotes([])
        return
      }

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) console.error(error)
      else setNotes(data ?? [])
    }

    fetchNotes()
  }, [user])

  // Ambil avatar dari tabel profiles
  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user) return
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single()

      if (error) console.error('Gagal ambil avatar:', error.message)
      if (data?.avatar_url) setAvatarUrl(data.avatar_url)
    }

    fetchAvatar()
  }, [user])

  // 🔹 Tambah catatan
  const handleAdd = async () => {
    if (!user || !title.trim()) return
    const { error } = await supabase.from('notes').insert([{ title, user_id: user.id }])
    if (error) return showError(error.message)
    setTitle('')
    const { data } = await supabase.from('notes').select('*').eq('user_id', user.id)
    setNotes(data ?? [])
  }

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      const file = e.target.files?.[0]
      if (!file || !user) return

      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload ke storage bucket "avatars"
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })
      if (uploadError) throw uploadError

      // Ambil public URL-nya
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      const publicUrl = data.publicUrl

      // Update avatar_url di tabel profiles
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id)
      if (updateError) throw updateError

      setAvatarUrl(publicUrl)
      showSuccess('Avatar berhasil diupload!')
    } catch (err: any) {
      console.error('Upload error:', err.message)
      showError(err.message)
    } finally {
      setUploading(false)
    }
  }

  if (!session) return <Auth />

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 text-white space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Halo, {user?.email}</h1>
              <p className="text-sm text-purple-200">Senang melihatmu kembali! Kelola profil dan catatanmu di sini.</p>
            </div>
            <button
              onClick={() => supabase.auth.signOut()}
              className="self-start lg:self-auto px-5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm font-medium hover:bg-white/20 transition"
            >
              Logout
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
            <section className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Avatar</h3>
                <p className="text-sm text-gray-300">Unggah avatar terbaikmu untuk tampil lebih profesional.</p>
              </div>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full object-cover border-2 border-purple-400 shadow-lg"
                />
              ) : (
                <div className="w-28 h-28 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center text-sm text-gray-400">
                  Belum ada avatar
                </div>
              )}
              <label className="block">
                <span className={`inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-400/40 rounded-xl text-sm text-purple-200 font-medium transition ${
                  uploading
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-purple-500/30"
                }`}>
                  Upload Avatar
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadAvatar}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              {uploading && <p className="text-xs text-gray-400">Mengunggah avatar...</p>}
            </section>

            <section className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Tambah Catatan</h2>
                <p className="text-sm text-gray-300">Simpan ide, catatan belajar, atau progressmu di Blackbox AI.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Judul catatan"
                  className="flex-1 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/40"
                />
                <button
                  onClick={handleAdd}
                  className="px-5 py-3 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 font-medium hover:shadow-lg hover:shadow-purple-500/40 transition"
                >
                  Simpan
                </button>
              </div>
              <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {notes.length === 0 && (
                  <li className="rounded-xl border border-dashed border-white/20 px-4 py-5 text-sm text-gray-400 text-center">
                    Belum ada catatan. Tambahkan catatan pertamamu!
                  </li>
                )}
                {notes.map((n) => (
                  <li key={n.id} className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm">
                    {n.title}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
