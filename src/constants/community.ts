import type { CommunityPost } from '../types';

export const communityPosts: CommunityPost[] = [
  {
    id: 1,
    author: 'Jessica Lee',
    avatar: '👩‍💻',
    time: '2 hours ago',
    content: 'Just completed the MERN Authentication recipe! The code quality is amazing. Saved me at least 4 hours of work.',
    likes: 45,
    comments: 12,
    recipe: 'Sistem Authentication Lengkap MERN'
  },
  {
    id: 2,
    author: 'Ryan Park',
    avatar: '👨‍💻',
    time: '5 hours ago',
    content: 'Pro tip: Use the Image-to-App feature with hand-drawn wireframes for rapid prototyping. Works like magic! 🪄',
    likes: 78,
    comments: 23,
    recipe: 'Satu Klik ke MVP Landing Page'
  }
];

export const topContributors = [
  { name: 'Sarah Chen', points: 1500 },
  { name: 'David Kim', points: 1000 },
  { name: 'Emma Davis', points: 500 }
];

export const trendingTopics = [
  '#ReactTips',
  '#AIDebugging',
  '#MERNStack',
  '#PythonMigration'
];

