import { useState } from 'react';

export const useLikes = () => {
  const [liked, setLiked] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLiked(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isLiked = (id: number) => liked.includes(id);

  return { liked, toggleLike, isLiked };
};

