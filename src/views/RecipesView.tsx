import { useEffect, useMemo, useState } from 'react';
import type { Recipe, ViewType } from '../types';
import { Zap, Book, Users, CheckCircle, Sparkles } from 'lucide-react';
import { SearchBar } from '../components/common/SearchBar';
import { StatCard } from '../components/common/StatCard';
import { CategoryTabs } from '../components/recipes/CategoryTabs';
import { RecipeGrid } from '../components/recipes/RecipeGrid';
import { categories } from '../constants/categories';
import { supabase } from '../lib/supabaseClient';

interface RecipesViewProps {
  recipes: any[];
  activeTab: string;
  isBookmarked: (id: number) => boolean;
  isLiked: (id: number) => boolean;
  onTabChange: (tabId: string) => void;
  onBookmark: (id: number) => void;
  onLike: (id: number) => void;
  onView: (recipe: Recipe) => void;
  onViewChange: (view: ViewType) => void;
}

export const RecipesView = ({
  recipes,
  activeTab,
  isBookmarked,
  isLiked,
  onTabChange,
  onBookmark,
  onLike,
  onView,
  onViewChange,
}: RecipesViewProps) => {
  const [categoriesData, setCategoriesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*, recipe_categories(id)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Gagal mengambil data kategori:', error.message);
        return;
      }

      // Hitung jumlah resep per kategori
      const withCount = (data || []).map(cat => ({
        ...cat,
        count: cat.recipe_categories ? cat.recipe_categories.length : 0,
      }));

      // Tambahkan kategori "All" dengan total semua resep
      const totalCount = withCount.reduce((acc, cat) => acc + cat.count, 0);
      const allCategory = { id: 'all', name: 'All', count: totalCount, icon: Book };

      setCategoriesData([allCategory, ...withCount]);
    };

    fetchCategories();
  }, []);

  const filteredRecipes = useMemo(() => {
    return activeTab === 'all'
      ? recipes
      : recipes.filter(r =>
          r.recipe_categories
            .map((rc: { categories: { id: any } }) => rc.categories.id)
            .includes(activeTab)
        );
  }, [recipes, activeTab]);

  return (
    <>
      {/* Hero Section */}
      <div className="mb-12 text-center px-2 sm:px-0">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm mb-4">
          <Zap className="w-4 h-4" />
          <span>Weekly Challenge: Build a Chrome Extension in 5 Minutes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Master AI-Powered Development
        </h2>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
          Koleksi resep praktis untuk memaksimalkan setiap fitur Blackbox AI
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mt-8">
          <SearchBar placeholder="Cari resep berdasarkan teknologi, masalah, atau fitur..." />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard
          icon={Book}
          value="250+"
          label="Resep Tersedia"
          iconColor="text-purple-400"
        />
        <StatCard
          icon={Users}
          value="15K+"
          label="Developer Aktif"
          iconColor="text-blue-400"
        />
        <StatCard
          icon={CheckCircle}
          value="98%"
          label="Success Rate"
          iconColor="text-green-400"
        />
        <StatCard
          icon={Sparkles}
          value="2.5M"
          label="Lines Generated"
          iconColor="text-yellow-400"
        />
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        categories={categoriesData.length > 0 ? categoriesData : categories}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      {/* Recipe Grid */}
      <RecipeGrid
        recipes={filteredRecipes}
        isBookmarked={isBookmarked}
        isLiked={isLiked}
        onBookmark={onBookmark}
        onLike={onLike}
        onView={onView}
      />

      {/* Community CTA */}
      <div className="mt-12 bg-linear-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-500/30 rounded-2xl px-4 py-8 sm:p-8 text-center">
        <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Join Our Community
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
          Bagikan resep Anda, beri rating, dan kolaborasi dengan ribuan
          developer lainnya
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onViewChange('community')}
            className="px-6 py-3 bg-white/10 backdrop-blur border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all"
          >
            Browse Community
          </button>
          <button
            className="px-6 py-3 cursor-pointer w-full sm:w-auto bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
            onClick={() => alert("Under development!")}
          >
            Watch Tutorial
          </button>
        </div>
      </div>
    </>
  );
};
