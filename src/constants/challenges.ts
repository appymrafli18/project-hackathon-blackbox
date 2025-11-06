import type { Challenge } from '../types';

export const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Chrome Extension Builder Challenge',
    description: 'Build a functional Chrome extension in under 5 minutes',
    reward: 500,
    participants: 1234,
    deadline: '3 days',
    difficulty: 'Menengah',
    status: 'active'
  },
  {
    id: 2,
    title: 'Bug Bounty Week',
    description: 'Fix 5 different types of bugs using AI Debugging',
    reward: 750,
    participants: 892,
    deadline: '5 days',
    difficulty: 'Lanjut',
    status: 'active'
  },
  {
    id: 3,
    title: 'Landing Page Sprint',
    description: 'Create a pixel-perfect landing page from a sketch',
    reward: 300,
    participants: 2341,
    deadline: 'Completed',
    difficulty: 'Pemula',
    status: 'completed'
  }
];

