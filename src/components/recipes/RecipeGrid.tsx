import type { Recipe } from '../../types';
import { RecipeCard } from './RecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
  isBookmarked: (id: number) => boolean;
  isLiked: (id: number) => boolean;
  onBookmark: (id: number) => void;
  onLike: (id: number) => void;
  onView: (recipe: Recipe) => void;
}

export const RecipeGrid = ({
  recipes,
  isBookmarked,
  isLiked,
  onBookmark,
  onLike,
  onView
}: RecipeGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, idx) => (
        <RecipeCard
          index={idx}
          key={recipe.id}
          recipe={recipe}
          isBookmarked={isBookmarked(recipe.id)}
          isLiked={isLiked(recipe.id)}
          onBookmark={onBookmark}
          onLike={onLike}
          onView={onView}
        />
      ))}
    </div>
  );
};

