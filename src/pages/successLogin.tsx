import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Auth from './Auth'
import type { Session, User } from '@supabase/supabase-js'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [notes, setNotes] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

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
    if (error) return alert(error.message)
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
      alert('✅ Avatar berhasil diupload!')
    } catch (err: any) {
      console.error('Upload error:', err.message)
      alert('❌ ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  if (!session) return <Auth />

  return (
    <div style={{ padding: 20 }}>
      <h1>Halo, {user?.email}</h1>

      {/* 🔹 Avatar Upload Section */}
      <div style={{ marginTop: 20 }}>
        <h3>Avatar</h3>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #ccc',
            }}
          />
        ) : (
          <p>Belum ada avatar</p>
        )}
        <input type="file" accept="image/*" onChange={handleUploadAvatar} disabled={uploading} />
      </div>

      <button onClick={() => supabase.auth.signOut()}>Logout</button>

      {/* 🔹 Notes Section */}
      <section style={{ marginTop: 20 }}>
        <h2>Tambah Catatan</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul"
          style={{ marginRight: 10 }}
        />
        <button onClick={handleAdd}>Simpan</button>

        <ul>
          {notes.map((n) => (
            <li key={n.id}>{n.title}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
