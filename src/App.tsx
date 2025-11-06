import { useState } from 'react';
import type { ViewType, Recipe, UserProgress } from './types';
import { Header } from './components/layout/Header';
import { RecipesView } from './views/RecipesView';
import { SandboxView } from './views/SandboxView';
import { ChallengesView } from './views/ChallengesView';
import { CommunityView } from './views/CommunityView';
import { RecipeModal } from './components/recipes/RecipeModal';
import { useBookmarks } from './hooks/useBookmarks';
import { useLikes } from './hooks/useLikes';
import { recipes } from './constants/recipes';
import { challenges } from './constants/challenges';
import { communityPosts } from './constants/community';
function App() {

  const [activeTab, setActiveTab] = useState('all');
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [activeView, setActiveView] = useState<ViewType>('recipes');
    const [sandboxCode, setSandboxCode] = useState('');
    const [sandboxOutput, setSandboxOutput] = useState('');
    const [userProgress] = useState<UserProgress>({
      completed: 12,
      inProgress: 3,
      points: 1250
    });
  
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const { isLiked, toggleLike } = useLikes();
  
    const runSandbox = () => {
      setSandboxOutput('✅ Code compiled successfully!\n\n🚀 Output:\nHello, World!\nBlackbox AI is amazing!');
    };
  
    const handleRecipeView = (recipe: Recipe) => {
      setSelectedRecipe(recipe);
    };
  
    const handleCloseModal = () => {
      setSelectedRecipe(null);
    };
  
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header 
          activeView={activeView}
          userProgress={userProgress}
          onViewChange={setActiveView}
        />
  
        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeView === 'recipes' && (
            <RecipesView
              recipes={recipes}
              activeTab={activeTab}
              isBookmarked={isBookmarked}
              isLiked={isLiked}
              onTabChange={setActiveTab}
              onBookmark={toggleBookmark}
              onLike={toggleLike}
              onView={handleRecipeView}
              onViewChange={setActiveView}
            />
          )}
  
          {activeView === 'sandbox' && (
            <SandboxView
              code={sandboxCode}
              output={sandboxOutput}
              onCodeChange={setSandboxCode}
              onGenerate={runSandbox}
              onExport={() => {}}
            />
          )}
  
          {activeView === 'challenges' && (
            <ChallengesView
              challenges={challenges}
              userProgress={userProgress}
              onJoinChallenge={() => {}}
            />
          )}
  
          {activeView === 'community' && (
            <CommunityView
              posts={communityPosts}
            />
          )}
        </div>
  
        <RecipeModal
          recipe={selectedRecipe}
          isOpen={selectedRecipe !== null}
          isBookmarked={selectedRecipe ? isBookmarked(selectedRecipe.id) : false}
          onClose={handleCloseModal}
          onBookmark={toggleBookmark}
        />
      </div>
    );

}

export default App