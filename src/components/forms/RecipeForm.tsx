import { useState } from 'react';
import { Send, FileText, Tag, Clock, Star, CheckCircle, Upload } from 'lucide-react';

export const RecipeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        difficulty: '',
        time: '',
        description: '',
        feature: '',
        tags: '',
        author: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Submitted Recipe:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center py-12 px-6">
            <div className="max-w-3xl w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Submit Your Recipe</h2>
                <p className="text-gray-400 text-center mb-8">Bagikan resep AI-mu untuk membantu developer lain!</p>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-white font-medium flex items-center gap-2 mb-2">
                                <Tag className="w-5 h-5 text-pink-400" /> Kategori
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                            >
                                <option value="" className='text-black'>Pilih kategori</option>
                                <option value="frontend" className='text-black'>Frontend</option>
                                <option value="backend" className='text-black'>Backend</option>
                                <option value="debugging" className='text-black'>Debugging</option>
                                <option value="migration" className='text-black'>Migration</option>
                                <option value="fullstack" className='text-black'>Fullstack</option>
                            </select>
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

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-white font-medium flex items-center gap-2 mb-2">
                                <Star className="w-5 h-5 text-yellow-400" /> Tingkat Kesulitan
                            </label>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                            >
                                <option value="" className='text-black'>Pilih tingkat</option>
                                <option value="Pemula" className='text-black'>Pemula</option>
                                <option value="Menengah" className='text-black'>Menengah</option>
                                <option value="Lanjut" className='text-black'>Lanjut</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-white font-medium flex items-center gap-2 mb-2">
                                <Upload className="w-5 h-5 text-green-400" /> Fitur / Tool yang Digunakan
                            </label>
                            <input
                                name="feature"
                                value={formData.feature}
                                onChange={handleChange}
                                placeholder="Contoh: AI Debugging, Image-to-App, CLI Agent"
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>
                    </div>

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

                    <div className="grid md:grid-cols-2 gap-6">
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

                        <div>
                            <label className="text-white font-medium flex items-center gap-2 mb-2">
                                <CheckCircle className="w-5 h-5 text-green-400" /> Penulis / Author
                            </label>
                            <input
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Nama Anda"
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>
                    </div>

                    <div className="pt-6 text-center">
                        <button
                            type="submit"
                            className="px-8 py-3 cursor-pointer w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 mx-auto"
                        >
                            <Send className="w-5 h-5" /> Submit Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
