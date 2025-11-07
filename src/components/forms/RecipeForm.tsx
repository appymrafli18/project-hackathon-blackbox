import { useState, useEffect } from 'react';
import Select from 'react-select';
import { supabase } from '../../lib/supabaseClient';
import { Send, FileText, Tag, Clock, Star, Upload } from 'lucide-react';

export const RecipeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        prompt: '',
        categoryIds: [] as string[],
        difficultyId: '',
        toolId: '',
        time: '',
        description: '',
        tags: '',
    });

    const [categories, setCategories] = useState<any[]>([]);
    const [difficulties, setDifficulties] = useState<any[]>([]);
    const [tools, setTools] = useState<any[]>([]);
    const [userId, setUserId] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            const [{ data: cat }, { data: diff }, { data: tool }] = await Promise.all([
                supabase.from('categories').select('*').order('id'),
                supabase.from('difficulties').select('*').order('id'),
                supabase.from('tools').select('*').order('id'),
            ]);
            setCategories(cat ?? []);
            setDifficulties(diff ?? []);
            setTools(tool ?? []);
        };

        supabase.auth.getSession().then(({ data }) => {
            setUserId(data.session?.user.id || '');
        });

        fetchInitialData();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!formData.title || !formData.description || formData.categoryIds.length === 0) {
            alert('Harap isi semua field wajib!');
            return;
        }

        try {
            setLoading(true);

            const { data: recipeData, error: recipeError } = await supabase
                .from('recipes')
                .insert([
                    {
                        title: formData.title,
                        prompt: formData.prompt,
                        description: formData.description,
                        estimation: Number(formData.time) || 1,
                        difficulty_id: formData.difficultyId || null,
                        tool_id: formData.toolId || null,
                        user_id: userId,
                    },
                ])
                .select('id')
                .single();

            if (recipeError) throw recipeError;
            const recipeId = recipeData.id;

            // 2️⃣ Simpan kategori banyak
            for (const catId of formData.categoryIds) {
                await supabase.from('recipe_categories').insert([
                    { recipe_id: recipeId, category_id: catId }
                ]);
            }

            const parsedTags = formData.tags
                .split(',')
                .map((t) => t.trim().toLowerCase())
                .filter((t) => t.length > 0);

            for (const tagName of parsedTags) {
                const { data: existingTag } = await supabase
                    .from('tags')
                    .select('id')
                    .eq('name', tagName)
                    .maybeSingle();

                let tagId = existingTag?.id;

                if (!tagId) {
                    const { data: newTag, error: insertError } = await supabase
                        .from('tags')
                        .insert([{ name: tagName }])
                        .select('id')
                        .single();
                    if (insertError) throw insertError;
                    tagId = newTag.id;
                }

                const { data: exists } = await supabase
                    .from('recipe_tags')
                    .select('recipe_id')
                    .eq('recipe_id', recipeId)
                    .eq('tag_id', tagId)
                    .maybeSingle();

                if (!exists) {
                    await supabase.from('recipe_tags').insert([{ recipe_id: recipeId, tag_id: tagId }]);
                }
            }

            alert('Resep berhasil disimpan!');
            window.location.href = '/';
            setFormData({
                title: '',
                categoryIds: [] as string[],
                difficultyId: '',
                toolId: '',
                time: '',
                description: '',
                tags: '',
                prompt: '',
            });
        } catch (err: any) {
            alert(err.message ?? 'Terjadi error saat menyimpan resep');
        } finally {
            setLoading(false);
        }
    };

    // 🔽 buat opsi untuk react-select
    const categoryOptions = categories.map((c) => ({
        value: c.id,
        label: c.name,
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center py-12 px-4 sm:px-6">
            <div className="max-w-3xl w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Submit Your Recipe</h2>
                <p className="text-gray-400 text-center mb-8 text-sm sm:text-base">
                    Bagikan resep AI-mu untuk membantu developer lain!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Judul */}
                    <div>
                        <label className="text-white font-medium flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-purple-400" /> Judul Resep
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Contoh: Migrasi Python 2 ke Python 3 dalam 3 Detik"
                            className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                        />
                    </div>

                    {/* Prompt */}
                    <div>
                        <label className="text-white font-medium flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-purple-400" /> Prompt
                        </label>
                        <textarea
                            name="prompt"
                            value={formData.prompt}
                            onChange={handleChange}
                            placeholder="Tuliskan prompt lengkap untuk resep ini..."
                            className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-4 text-white resize-none placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                        />
                    </div>

                    {/* Kategori dan waktu */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-white font-medium flex items-center gap-2 mb-2">
                                <Tag className="w-5 h-5 text-pink-400" /> Kategori
                            </label>

                            <Select
                                isMulti
                                options={categoryOptions}
                                classNamePrefix="select"
                                placeholder="Pilih kategori..."
                                value={categoryOptions.filter(opt =>
                                    formData.categoryIds.includes(opt.value)
                                )}
                                onChange={(selectedOptions) => {
                                    const selectedValues = selectedOptions.map(opt => opt.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        categoryIds: selectedValues,
                                    }));
                                }}
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        borderColor: state.isFocused ? 'rgba(168,85,247,0.8)' : 'rgba(255,255,255,0.2)',
                                        borderWidth: '1px',
                                        borderRadius: '0.75rem',
                                        padding: '4px',
                                        minHeight: '56px',
                                        color: 'white',
                                        boxShadow: state.isFocused ? '0 0 0 2px rgba(168,85,247,0.5)' : 'none',
                                        '&:hover': {
                                            borderColor: 'rgba(168,85,247,0.8)',
                                        },
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        backgroundColor: 'rgba(30,30,40,0.95)',
                                        borderRadius: '0.75rem',
                                        color: 'white',
                                        zIndex: 9999,
                                    }),
                                    multiValue: (base) => ({
                                        ...base,
                                        backgroundColor: 'rgba(168,85,247,0.3)',
                                        borderRadius: '0.5rem',
                                    }),
                                    multiValueLabel: (base) => ({
                                        ...base,
                                        color: 'white',
                                    }),
                                    multiValueRemove: (base) => ({
                                        ...base,
                                        color: 'white',
                                        ':hover': {
                                            backgroundColor: 'rgba(168,85,247,0.5)',
                                            color: 'white',
                                        },
                                    }),
                                    placeholder: (base) => ({
                                        ...base,
                                        color: 'rgba(255,255,255,0.5)',
                                    }),
                                    input: (base) => ({
                                        ...base,
                                        color: 'white',
                                    }),
                                }}
                            />

                        </div>

                        <div>
                            <label className="text-white font-medium flex items-center gap-2 mb-2">
                                <Clock className="w-5 h-5 text-blue-400" /> Estimasi Waktu (menit)
                            </label>
                            <input
                                type="number"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                placeholder="5"
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>
                    </div>

                    {/* Kesulitan & Tools */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-white font-medium flex items-center gap-2 mb-2">
                                <Star className="w-5 h-5 text-yellow-400" /> Tingkat Kesulitan
                            </label>
                            <select
                                name="difficultyId"
                                value={formData.difficultyId}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                            >
                                <option value="" className="text-black">
                                    Pilih tingkat
                                </option>
                                {difficulties.map((d) => (
                                    <option key={d.id} value={d.id} className="text-black">
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-white font-medium flex items-center gap-2 mb-2">
                                <Upload className="w-5 h-5 text-green-400" /> Tools
                            </label>
                            <select
                                name="toolId"
                                value={formData.toolId}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                            >
                                <option value="" className="text-black">
                                    Pilih tool
                                </option>
                                {tools.map((t) => (
                                    <option key={t.id} value={t.id} className="text-black">
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="text-white font-medium flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-purple-400" /> Deskripsi
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Tuliskan penjelasan singkat tentang resep dan manfaatnya..."
                            className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-4 text-white resize-none placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="text-white font-medium flex items-center gap-2 mb-2">
                            <Tag className="w-5 h-5 text-pink-400" /> Tags (pisahkan dengan koma)
                        </label>
                        <input
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="React, API, Performance"
                            className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                        />
                    </div>

                    <div className="pt-6 text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 cursor-pointer w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 mx-auto"
                        >
                            <Send className="w-5 h-5" />
                            {loading ? 'Menyimpan...' : 'Submit Recipe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
