import { colors } from './colors';

export interface Palette {
  id: string;
  name: string;
  description: string;
  colors: string[]; // Array of color slugs
  tags: string[];
}

// Create palettes based on color tags
const tagGroups = new Map<string, string[]>();

// Group colors by tags
colors.forEach(color => {
  color.tags.forEach(tag => {
    if (!tagGroups.has(tag)) {
      tagGroups.set(tag, []);
    }
    tagGroups.get(tag)?.push(color.slug);
  });
});

// Create palettes from tag groups
export const palettes: Palette[] = Array.from(tagGroups.entries())
  .filter(([_, colorSlugs]) => colorSlugs.length >= 2) // Only create palettes with 2 or more colors
  .map(([tag, colorSlugs]) => ({
    id: tag.toLowerCase().replace(/\s+/g, '-'),
    name: `${tag.charAt(0).toUpperCase()}${tag.slice(1)} Collection`,
    description: `A curated collection of ${tag.toLowerCase()} colors`,
    colors: colorSlugs,
    tags: [tag],
  }));