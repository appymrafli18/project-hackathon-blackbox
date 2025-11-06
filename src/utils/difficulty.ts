import type { Difficulty } from '../types';

export const getDifficultyColor = (difficulty: Difficulty): string => {
  switch(difficulty) {
    case 'Pemula': return 'bg-green-100 text-green-700';
    case 'Menengah': return 'bg-yellow-100 text-yellow-700';
    case 'Lanjut': return 'bg-purple-100 text-purple-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

