import { allStories, topStories, assamStories, northeastStories, indiaStories, type Story } from '../data/mock';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getTopStories(): Promise<Story[]> {
  await delay(500);
  return topStories;
}

export async function getAssamStories(): Promise<Story[]> {
  await delay(500);
  return assamStories;
}

export async function getNortheastStories(): Promise<Story[]> {
  await delay(500);
  return northeastStories;
}

export async function getIndiaStories(): Promise<Story[]> {
  await delay(500);
  return indiaStories;
}

export async function getStoriesByCategory(category: string): Promise<Story[]> {
  await delay(500);
  if (!category) return allStories;
  
  const lowerCategory = category.toLowerCase();
  
  if (lowerCategory === 'assam') return assamStories;
  if (lowerCategory === 'northeast') return northeastStories;
  if (lowerCategory === 'india' || lowerCategory === 'politics') return indiaStories;
  if (lowerCategory === 'sports') return allStories.filter(s => s.tag.toLowerCase() === 'sports');
  
  return allStories.filter(s => s.tag.toLowerCase() === lowerCategory);
}

export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  await delay(500);
  return allStories.find(s => s.slug === slug);
}

export async function searchStories(query: string): Promise<Story[]> {
  await delay(500);
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return allStories.filter(s => 
    s.title.toLowerCase().includes(lowerQuery) || 
    (s.excerpt && s.excerpt.toLowerCase().includes(lowerQuery)) ||
    s.tag.toLowerCase().includes(lowerQuery)
  );
}
