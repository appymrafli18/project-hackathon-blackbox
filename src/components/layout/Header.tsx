import { useState } from "react";
import { Code, Trophy, Menu, X } from "lucide-react";
import type { ViewType, UserProgress } from "../../types";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { supabase } from "../../lib/supabaseClient";

interface HeaderProps {
  activeView: ViewType;
  userProgress: UserProgress;
  onViewChange: (view: ViewType) => void;
}

export const Header = ({
  activeView,
  userProgress,
  onViewChange,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const navItems: { id: ViewType; label: string }[] = [
    { id: "recipes", label: "Recipes" },
    { id: "sandbox", label: "Sandbox" },
    { id: "challenges", label: "Challenges" },
    { id: "community", label: "Community" },
  ];

  const handleNavigate = (view: ViewType) => {
    onViewChange(view);
    setIsMenuOpen(false);
  };

  const handleLogout = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      alert("Anda berhasil logout!");
      window.location.reload();
    } catch (err: unknown) {
      alert("Gagal logout.");
    }
  };

  return (
    <header className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
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
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeView === item.id
                    ? "bg-purple-500 text-white cursor-pointer"
                    : "text-gray-300 hover:text-white cursor-pointer"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-end">
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
            <Link
              to="/submit-recipe"
              className="hidden md:block px-6 py-2.5 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Submit Recipe
            </Link>
            {isAuthenticated ? (
              <button
                className="hidden md:block px-6 py-2.5 bg-transparent border border-purple-400 text-purple-300 rounded-lg font-medium hover:bg-purple-500/20 hover:text-white transition-all cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                className="hidden md:block px-6 py-2.5 bg-transparent border border-purple-400 text-purple-300 rounded-lg font-medium hover:bg-purple-500/20 hover:text-white transition-all cursor-pointer"
              >
                Login / Register
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/10 text-white hover:bg-white/10 transition"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden mt-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl transition-[max-height,opacity] duration-300 overflow-x-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all ${
                  activeView === item.id
                    ? "bg-purple-500 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
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
            <Link
              to="/submit-recipe"
              className="text-center block px-6 py-2.5 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Submit Recipe
            </Link>
            {isAuthenticated ? (
              <button
                className="text-center block px-6 py-2.5 bg-transparent border border-purple-400 text-purple-300 rounded-lg font-medium hover:bg-purple-500/20 hover:text-white transition-all"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                className="text-center block px-6 py-2.5 bg-transparent border border-purple-400 text-purple-300 rounded-lg font-medium hover:bg-purple-500/20 hover:text-white transition-all"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
