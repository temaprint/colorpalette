import { getAllColors } from './colors';

export interface Palette {
  id: string;
  name: string;
  description: string;
  colors: string[];
  tags: string[];
}

export async function getAllPalettes(): Promise<Palette[]> {
  const colors = await getAllColors();
  
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
  
  // Create a palette for each tag group with at least 2 colors
  return Array.from(tagGroups.entries())
    .filter(([_, colorSlugs]) => colorSlugs.length >= 2)
    .map(([tag, colorSlugs]) => ({
      id: tag.toLowerCase().replace(/\s+/g, '-'),
      name: `${tag.charAt(0).toUpperCase()}${tag.slice(1)} Collection`,
      description: `A curated collection of ${tag.toLowerCase()} colors`,
      colors: colorSlugs.slice(0, 4), // Limit to 4 colors per palette
      tags: [tag],
    }));
}

export async function getPaletteById(id: string): Promise<Palette | null> {
  const palettes = await getAllPalettes();
  return palettes.find(p => p.id === id) || null;
}