import { Award, TrendingUp, CheckCircle } from 'lucide-react';

interface Contributor {
  name: string;
  points: number;
}

interface CommunitySidebarProps {
  contributors: Contributor[];
  trendingTopics: string[];
}

export const CommunitySidebar = ({
  contributors,
  trendingTopics
}: CommunitySidebarProps) => {
  return (
    <div className="space-y-4">
      {/* Top Contributors */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Top Contributors
        </h3>
        <div className="space-y-3">
          {contributors.map((contributor, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                  {idx + 1}
                </div>
                <div>
                  <div className="text-white font-medium">{contributor.name}</div>
                  <div className="text-xs text-gray-400">{contributor.points} points</div>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-blue-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-400" />
          Trending Topics
        </h3>
        <div className="space-y-2">
          {trendingTopics.map((tag, idx) => (
            <button key={idx} className="w-full text-left px-3 py-2 bg-white/5 rounded-lg text-purple-300 hover:bg-white/10 transition-all">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

