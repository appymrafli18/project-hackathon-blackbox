import type { CommunityPost as CommunityPostType } from '../../types';
import { Book, Heart, MessageSquare, Share2 } from 'lucide-react';

interface CommunityPostProps {
  post: CommunityPostType;
  onLike?: (id: number) => void;
  onComment?: (id: number) => void;
  onShare?: (id: number) => void;
}

export const CommunityPost = ({
  post,
  onLike,
  onComment,
  onShare
}: CommunityPostProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="text-4xl">{post.avatar}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-semibold text-white">{post.author}</div>
              <div className="text-sm text-gray-400">{post.time}</div>
            </div>
          </div>
          <p className="text-gray-300 mb-3">{post.content}</p>
          {post.recipe && (
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm text-purple-300 mb-3">
              <Book className="w-4 h-4" />
              {post.recipe}
            </div>
          )}
          <div className="flex items-center gap-4 pt-3 border-t border-white/10">
            <button 
              onClick={() => onLike?.(post.id)}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-pink-400 transition-colors"
            >
              <Heart className="w-4 h-4" />
              {post.likes}
            </button>
            <button 
              onClick={() => onComment?.(post.id)}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              {post.comments}
            </button>
            <button 
              onClick={() => onShare?.(post.id)}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-green-400 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

