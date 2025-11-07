import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [estimatedTime, setEstimatedTime] = useState<number | ''>('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [userId, setUserId] = useState<string>('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [categories, setCategories] = useState<any[]>([])
  const [difficultyId, setDifficultyId] = useState<string>('')
  const [difficulties, setDifficulties] = useState<any[]>([])
  const [toolId, setToolId] = useState<string>('')
  const [tools, setTools] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*').order('id')
      if (error) {
        console.error('Gagal ambil kategori:', error.message)
      } else {
        setCategories(data ?? [])
      }
    }

    const fetchDifficulties = async () => {
      const { data, error } = await supabase.from('difficulties').select('*').order('id')
      if (error) {
        console.error('Gagal ambil difficulty:', error.message)
      } else {
        setDifficulties(data ?? [])
      }
    }

    const fetchTools = async () => {
      const { data, error } = await supabase.from('tools').select('*').order('id')
      if (error) {
        console.error('Gagal ambil tools:', error.message)
      } else {
        setTools(data ?? [])
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id || '')
    })

    fetchDifficulties()
    fetchCategories()
    fetchTools()
  }, [])

  const handleSubmit = async () => {
    try {
      setLoading(true)

      // --- Validasi dasar
      if (!title || !description || !categoryId) {
        alert('Harap isi semua field wajib')
        setLoading(false)
        return
      }


      // --- 1️⃣ Tambahkan data resep
      const { data: recipeData, error: recipeError } = await supabase
        .from('recipes')
        .insert([
          {
            title,
            description,
            estimation: estimatedTime || 1,
            category_id: categoryId,
            difficulty_id: difficultyId || null,
            tool_id: toolId || null,
            user_id: userId
          }
        ])
        .select('id') // ambil id resep baru
        .single()

      if (recipeError) throw recipeError
      const recipeId = recipeData.id

      // --- 2️⃣ Proses tags
      const parsedTags = tags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter((t) => t.length > 0)

      for (const tagName of parsedTags) {
        console.log(tagName)
        // Cek apakah tag sudah ada
        const { data: existingTag, error: checkError } = await supabase
          .from('tags')
          .select('id')
          .eq('name', tagName)
          .maybeSingle()

        if (checkError) throw checkError

        let tagId = existingTag?.id

        // Jika belum ada, buat baru
        if (!tagId) {
          const { data: newTag, error: insertError } = await supabase
            .from('tags')
            .insert([{ name: tagName }])
            .select('id')
            .single()
          if (insertError) throw insertError
          tagId = newTag.id
        }

        // --- 3️⃣ Hubungkan ke tabel penghubung recipe_tags
        const { data: exists, error: linkError } = await supabase
          .from('recipe_tags')
          .select('recipe_id')
          .eq('recipe_id', recipeId)
          .eq('tag_id', tagId)
          .maybeSingle();

        if (!exists) {
          await supabase.from('recipe_tags').insert([{ recipe_id: recipeId, tagId }]);
        }

        if (linkError) throw linkError
      }

      alert('Resep dan tag berhasil disimpan!')

      // --- Reset form
      setTitle('')
      setDescription('')
      setEstimatedTime('')
      setTags('')
      setCategoryId('')
      setDifficultyId('')
      setToolId('')
    } catch (err: any) {
      alert(err.message ?? 'Terjadi error saat menyimpan resep')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="p-4">
      <h2>Create Recipe</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <input type="numeric" placeholder='Estimasi waktu' value={estimatedTime} onChange={(e) => setEstimatedTime(Number(e.target.value) || '')} />

      <input type="text" placeholder='Tags (pisahkan dengan koma)' value={tags} onChange={(e) => setTags(e.target.value)} />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">-- Pilih Kategori --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        value={difficultyId}
        onChange={(e) => setDifficultyId(e.target.value)}
      >
        <option value="">-- Tingkat Kesulitan --</option>
        {difficulties.map((diff) => (
          <option key={diff.id} value={diff.id}>
            {diff.name}
          </option>
        ))}
      </select>

      <select
        value={toolId}
        onChange={(e) => setToolId(e.target.value)}
      >
        <option value="">-- Tools yang Digunakan --</option>
        {tools.map((tool) => (
          <option key={tool.id} value={tool.id}>
            {tool.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <div className="mt-2">
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan Resep'}
        </button>
      </div>
    </div>
  )
}
