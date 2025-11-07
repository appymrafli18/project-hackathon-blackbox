import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Users } from "lucide-react";
import { CommunityPost } from "../components/community/CommunityPost";
import { CommunitySidebar } from "../components/community/CommunitySidebar";
import { topContributors, trendingTopics } from "../constants/community";
import type { CommunityPost as CommunityPostType } from "../types";
import Select from "react-select";

interface CommunityViewProps {
  posts: CommunityPostType[];
}

export const CommunityView = ({ posts: initialPosts }: CommunityViewProps) => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState(initialPosts || []);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const id = data.session?.user.id || null;
      setUserId(id);
    });
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("title, id")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal ambil daftar resep:", error.message);
      } else {
        setRecipes(data || []);
      }
    };

    fetchRecipes();
  }, []);

  const handlePost = async () => {
    if (!userId) {
      alert("Kamu harus login dulu!");
      return;
    }

    if (!postContent.trim()) {
      alert("Tulis sesuatu dulu sebelum posting.");
      return;
    }

    if (!selectedRecipeId) {
      alert("Pilih resep yang ingin kamu komentari.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("communities")
      .insert([
        {
          user_id: userId,
          content: postContent.trim(),
          recipe_id: selectedRecipeId,
        },
      ])
      .select("*, recipes(title)")
      .single();

    setLoading(false);

    if (error) {
      console.error("Gagal buat post:", error.message);
      alert(error.message);
      return;
    }

    setPosts((prev) => [data, ...prev]);
    setPostContent("");
    setSelectedRecipeId("");
  };

  // 🔹 Ubah daftar resep jadi opsi untuk react-select
  const recipeOptions = recipes.map((r) => ({
    value: r.id,
    label: r.title,
  }));

  const selectedOption =
    recipeOptions.find((opt) => opt.value === selectedRecipeId) || null;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8 px-2 sm:px-0">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm mb-4">
          <Users className="w-4 h-4" />
          <span>Connect with 15,000+ Developers</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Community Hub
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">
          Bagikan pengalaman, komentar, dan tips dari resep yang kamu lihat
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="mb-3">
              <Select
                value={selectedOption}
                onChange={(option) =>
                  setSelectedRecipeId(option ? option.value : "")
                }
                options={recipeOptions}
                placeholder="Pilih resep yang ingin dikomentari"
                classNamePrefix="react-select"
                isSearchable
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#0f172a", // bg-slate-900
                    borderColor: state.isFocused
                      ? "#a855f7"
                      : "rgba(255, 255, 255, 0.2)",
                    boxShadow: state.isFocused
                      ? "0 0 0 2px rgba(168, 85, 247, 0.5)"
                      : "none",
                    borderRadius: "0.75rem",
                    padding: "0.25rem",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#d1d5db", // gray-300 untuk nilai yang dipilih
                  }),
                  // **Tambahan untuk warna teks saat mengetik (mencari)**
                  input: (base) => ({
                    ...base,
                    color: "#d1d5db", // gray-300 untuk teks yang diketik
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#1e293b", // menu bg gelap
                    borderRadius: "0.75rem",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "#a855f7"
                      : "transparent",
                    color: state.isFocused ? "white" : "#d1d5db", // gray-300 untuk opsi tidak fokus
                    cursor: "pointer",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#d1d5db", // gray-300 untuk placeholder
                  }),
                }}
              />
            </div>
            {/* <select
              value={selectedRecipeId}
              onChange={(e) => setSelectedRecipeId(e.target.value)}
              className="w-full mb-3 bg-slate-900 border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="">Pilih resep yang ingin dikomentari</option>
              {recipes.map((r) => (
                <option key={r.id} value={r.id} className="text-black">
                  {r.title}
                </option>
              ))}
            </select> */}

            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Tulis komentar atau pendapatmu tentang resep ini..."
              className="w-full h-24 bg-slate-900 border border-white/20 rounded-xl p-4 text-white resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 mb-3"
            />

            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                onClick={handlePost}
                disabled={loading}
                className="px-6 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>

          {posts.map((post) => (
            <CommunityPost key={post.id} post={post} />
          ))}
        </div>

        {/* Sidebar */}
        <CommunitySidebar
          contributors={topContributors}
          trendingTopics={trendingTopics}
        />
      </div>
    </div>
  );
};
