import { Code, Trophy } from "lucide-react";
import type { ViewType, UserProgress } from "../../types";
import { Link } from "react-router-dom";

interface HeaderProps {
  activeView: ViewType;
  userProgress: UserProgress;
  onViewChange: (view: ViewType) => void;
}

export const Header = ({ activeView, userProgress, onViewChange }: HeaderProps) => {
  return (
    <header className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Blackbox AI</h1>
              <p className="text-sm text-purple-300">Recipe Codex</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => onViewChange("recipes")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === "recipes"
                  ? "bg-purple-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Recipes
            </button>
            <button
              onClick={() => onViewChange("sandbox")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === "sandbox"
                  ? "bg-purple-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Sandbox
            </button>
            <button
              onClick={() => onViewChange("challenges")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === "challenges"
                  ? "bg-purple-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Challenges
            </button>
            <button
              onClick={() => onViewChange("community")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === "community"
                  ? "bg-purple-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Community
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* User Progress */}
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <div className="text-sm">
                <div className="text-white font-semibold">
                  {userProgress.points} pts
                </div>
                <div className="text-gray-400 text-xs">
                  {userProgress.completed} completed
                </div>
              </div>
            </div>
            <Link to="/submit-recipe" className="px-6 py-2.5 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all">
              Submit Recipe
            </Link>
            <button className="px-6 py-2.5 bg-transparent border border-purple-400 text-purple-300 rounded-lg font-medium hover:bg-purple-500/20 hover:text-white transition-all">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
