import * as Icons  from 'lucide-react';

export const CategoryTabs = ({ 
  categories, 
  activeTab, 
  onTabChange 
}: any) => {
  console.log(categories)
  return (
    <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
      {categories.map((cat:any) => {
        const Icon = (Icons as any)[cat.icon] || Icons.Brain;

        return (
          <button
            key={cat.id}
            onClick={() => onTabChange(cat.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === cat.id
                ? 'bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Icon className="w-4 h-4" />
            {cat.name}
            <span className="text-xs opacity-75">({cat.count})</span>
          </button>
        );
      })}
    </div>
  );
};

