import { Book, Code, Zap, Award, TrendingUp, Layers } from 'lucide-react';
import type { Category } from '../types';

export const categories: Category[] = [
  { id: 'all', name: 'All Recipes', icon: Book, count: 250 },
  { id: 'frontend', name: 'Frontend', icon: Code, count: 89 },
  { id: 'backend', name: 'Backend', icon: Zap, count: 67 },
  { id: 'debugging', name: 'Debugging', icon: Award, count: 45 },
  { id: 'migration', name: 'Migration', icon: TrendingUp, count: 34 },
  { id: 'fullstack', name: 'Full-Stack', icon: Layers, count: 15 }
];

