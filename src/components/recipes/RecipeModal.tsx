import { Modal } from '../common/Modal';
import { CheckCircle, Clock, Eye, Heart, Zap, GitBranch, Play, Bookmark, Share2 } from 'lucide-react';

interface RecipeModalProps {
  recipe: any;
  isOpen: boolean;
  isBookmarked: boolean;
  onClose: () => void;
  onBookmark: (id: number) => void;
}

export const RecipeModal = ({
  recipe,
  isOpen,
  isBookmarked,
  onClose,
  onBookmark
}: RecipeModalProps) => {
  if (!recipe) return null;

  const steps = [
    { title: 'Input ke Blackbox', desc: 'Masukkan prompt yang spesifik atau upload gambar wireframe' },
    { title: 'Proses AI', desc: 'Blackbox AI menganalisis, menghasilkan, dan memperbaiki kode' },
    { title: 'Output Blackbox', desc: 'Dapatkan kode yang siap digunakan dengan syntax highlighting' },
    { title: 'Verifikasi', desc: 'Test kode dan pastikan berjalan sesuai ekspektasi' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h2 className="text-2xl font-bold text-white">{recipe.title}</h2>
            <CheckCircle className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-gray-400 mb-3">{recipe.description}</p>
          <div className="flex items-center gap-2">
            <img
              src={
                `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(recipe.author || 'User')}`
              }
              alt={recipe.author}
              className="w-8 h-8 rounded-full object-cover border border-white/10"
            />
            <span className="text-sm text-gray-300">by {recipe.profiles.display_name || 'Unknown'}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center"
        >
          ×
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {recipe.recipe_categories.map((tag: any, idx: number) => (
          <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-lg">
            {tag.categories.name}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
          <Clock className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <div className="text-sm text-white font-semibold">{recipe.estimation} min</div>
          <div className="text-xs text-gray-400">Duration</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
          <Eye className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <div className="text-sm text-white font-semibold">5678</div>
          <div className="text-xs text-gray-400">Views</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
          <Heart className="w-5 h-5 text-pink-400 mx-auto mb-1" />
          <div className="text-sm text-white font-semibold">1234</div>
          <div className="text-xs text-gray-400">Likes</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
          <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-1" />
          <div className="text-sm text-white font-semibold">982</div>
          <div className="text-xs text-gray-400">Completed</div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            Bahan-bahan (Tools)
          </h3>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 text-purple-300">
              <span className="font-medium">{recipe.tools.name}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-green-400" />
            Langkah-langkah
          </h3>
          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-3">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="font-semibold text-white mb-1">{step.title}</div>
                  <p className="text-sm text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 py-4 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
            <Play className="w-5 h-5" />
            Try This Recipe
          </button>
          <button
            onClick={() => onBookmark(recipe.id)}
            className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center"
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`} />
          </button>
          <button className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

