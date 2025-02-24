import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface Color {
  slug: string;
  name: string;
  hexCode: string;
  content: string;
  tags: string[];
}

// Read and parse all color markdown files
const COLORS_DIR = path.join(process.cwd(), 'src/content/colors');

const colors: Color[] = readdirSync(COLORS_DIR)
  .filter(filename => filename.endsWith('.md'))
  .map(filename => {
    const filePath = path.join(COLORS_DIR, filename);
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    return {
      slug: data.slug,
      name: data.name,
      hexCode: data.hexCode,
      content,
      tags: data.tags || [],
    };
  });

// Get unique tags from all colors
export const tags = Array.from(
  new Set(colors.flatMap(color => color.tags))
).map(tag => ({
  id: tag,
  name: tag,
  description: `Collection of colors with the "${tag}" characteristic`
}));

export { colors };