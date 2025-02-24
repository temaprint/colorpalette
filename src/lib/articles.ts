import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';

export interface Article {
  slug: string;
  title: string;
  date: string;
  hexCode: string;
  description: string;
  content: string;
  featured: boolean;
}

const ARTICLES_DIR = path.join(process.cwd(), 'src/content/articles');

export async function getAllArticles(): Promise<Article[]> {
  const files = await readdir(ARTICLES_DIR);
  const articles = await Promise.all(
    files
      .filter(filename => filename.endsWith('.md'))
      .map(async (filename) => {
        const filePath = path.join(ARTICLES_DIR, filename);
        const fileContent = await readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        
        return {
          slug: data.slug,
          title: data.title,
          date: data.date,
          hexCode: data.hexCode,
          description: data.description,
          content: marked(content),
          featured: data.featured || false,
        };
      })
  );
  
  // Sort articles by date, newest first
  return articles.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
    const fileContent = await readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    return {
      slug: data.slug,
      title: data.title,
      date: data.date,
      hexCode: data.hexCode,
      description: data.description,
      content: marked(content),
      featured: data.featured || false,
    };
  } catch {
    return null;
  }
}