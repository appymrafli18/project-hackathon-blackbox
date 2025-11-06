import { useState } from 'react';

export const useBookmarks = () => {
  const [bookmarked, setBookmarked] = useState<number[]>([]);

  const toggleBookmark = (id: number) => {
    setBookmarked(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: number) => bookmarked.includes(id);

  return { bookmarked, toggleBookmark, isBookmarked };
};

