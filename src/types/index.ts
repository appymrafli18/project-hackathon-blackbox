import type { LucideIcon } from 'lucide-react';

export type Difficulty = 'Pemula' | 'Menengah' | 'Lanjut';
export type ChallengeStatus = 'active' | 'completed';
export type ViewType = 'recipes' | 'sandbox' | 'community' | 'challenges';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
}

export interface Recipe {
  id: number;
  title: string;
  category: string;
  difficulty: Difficulty;
  time: string;
  rating: number;
  reviews: number;
  feature: string;
  description: string;
  trending?: boolean;
  likes: number;
  views: number;
  completions: number;
  tags: string[];
  author: string;
  verified?: boolean;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  reward: number;
  participants: number;
  deadline: string;
  difficulty: Difficulty;
  status: ChallengeStatus;
}

export interface CommunityPost {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  recipe?: string;
}

export interface UserProgress {
  completed: number;
  inProgress: number;
  points: number;
}

