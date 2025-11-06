import { useState } from 'react';
import type { CommunityPost as CommunityPostType } from '../types';
import { Users } from 'lucide-react';
import { CommunityPost } from '../components/community/CommunityPost';
import { CommunitySidebar } from '../components/community/CommunitySidebar';
import { topContributors, trendingTopics } from '../constants/community';

interface CommunityViewProps {
  posts: CommunityPostType[];
}

export const CommunityView = ({ posts }: CommunityViewProps) => {
  const [postContent, setPostContent] = useState('');

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm mb-4">
          <Users className="w-4 h-4" />
          <span>Connect with 15,000+ Developers</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-3">Community Hub</h2>
        <p className="text-gray-300">Bagikan pengalaman, tips, dan belajar dari komunitas</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Community Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share your experience with the community..."
              className="w-full h-24 bg-slate-900 border border-white/20 rounded-xl p-4 text-white resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 mb-3"
            />
            <div className="flex justify-end">
              <button className="px-6 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                Post
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

