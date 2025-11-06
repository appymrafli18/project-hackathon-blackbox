import type { Recipe } from '../../types';
import { TrendingUp, Bookmark, CheckCircle, Star, Eye, Heart, Share2, ChevronRight } from 'lucide-react';
import { getDifficultyColor } from '../../utils/difficulty';

interface RecipeCardProps {
  recipe: Recipe;
  isBookmarked: boolean;
  isLiked: boolean;
  onBookmark: (id: number) => void;
  onLike: (id: number) => void;
  onView: (recipe: Recipe) => void;
}

export const RecipeCard = ({
  recipe,
  isBookmarked,
  isLiked,
  onBookmark,
  onLike,
  onView
}: RecipeCardProps) => {
  return (
    <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <div>
          {recipe.trending && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-linear-to-r from-orange-500 to-pink-500 rounded-full text-white text-xs font-medium mb-2">
              <TrendingUp className="w-3 h-3" />
              Trending
            </div>
          )}
        </div>
        <button 
          onClick={() => onBookmark(recipe.id)}
          className="p-2 hover:bg-white/10 rounded-lg transition-all"
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
        </button>
      </div>
      
      <div 
        onClick={() => onView(recipe)}
        className="cursor-pointer"
      >
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {recipe.title}
        </h3>
        <p className="text-sm text-gray-400 mb-3">{recipe.description}</p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-linear-to-br from-purple-400 to-pink-400 rounded-full"></div>
        <span className="text-sm text-gray-300">{recipe.author}</span>
        {recipe.verified && (
          <CheckCircle className="w-4 h-4 text-blue-400" />
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {recipe.tags.slice(0, 3).map((tag, idx) => (
          <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
          {recipe.difficulty}
        </span>
        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">{recipe.rating}</span>
          <span className="text-xs text-gray-400">({recipe.reviews})</span>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          {recipe.views}
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="w-4 h-4" />
          {recipe.completions}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onLike(recipe.id)}
            className="flex items-center gap-1 text-sm hover:text-pink-400 transition-colors"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-400 text-pink-400' : 'text-gray-400'}`} />
            <span className={isLiked ? 'text-pink-400' : 'text-gray-400'}>
              {recipe.likes + (isLiked ? 1 : 0)}
            </span>
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        <button 
          onClick={() => onView(recipe)}
          className="flex items-center gap-1 text-purple-400 font-medium hover:gap-2 transition-all"
        >
          View
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

