import React, { useState } from 'react';
import { Tag as TagIcon } from 'lucide-react';

interface ColorFiltersProps {
  tags: string[];
}

export default function ColorFilters({ tags }: ColorFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev => {
      const newFilters = prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag];

      // Update visibility of color cards
      const colorCards = document.querySelectorAll('#colors-grid > a');
      colorCards.forEach(card => {
        const cardTags = JSON.parse((card as HTMLElement).dataset.tags || '[]');
        const isVisible = newFilters.length === 0 || newFilters.some(filter => cardTags.includes(filter));
        (card as HTMLElement).style.display = isVisible ? 'block' : 'none';
      });

      return newFilters;
    });
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Filter by Tag</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleFilter(tag)}
            className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm transition-colors duration-200 ${
              activeFilters.includes(tag)
                ? 'bg-primary-100 border-primary-200 text-primary-800'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <TagIcon className="h-4 w-4 mr-1.5" />
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}