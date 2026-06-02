import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import type { Story } from '../data/mock';

// We map Firestore docs to Story type
const fetchStoriesQuery = async (q: any): Promise<Story[]> => {
  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data() as Record<string, any>;
      return {
        tag: data.tag,
        title: data.title,
        time: data.time,
        img: data.img,
        excerpt: data.excerpt,
        slug: data.slug,
        content: data.content,
      } as Story;
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return [];
  }
};

export async function getTopStories(): Promise<Story[]> {
  const q = query(collection(db, "stories"), orderBy("createdAt", "desc"), limit(4));
  return fetchStoriesQuery(q);
}

export async function getAssamStories(): Promise<Story[]> {
  const q = query(collection(db, "stories"), where("tag", "==", "Assam"), orderBy("createdAt", "desc"), limit(4));
  return fetchStoriesQuery(q);
}

export async function getNortheastStories(): Promise<Story[]> {
  const q = query(collection(db, "stories"), where("tag", "in", ["Northeast", "Manipur", "Mizoram", "Meghalaya", "Arunachal"]), orderBy("createdAt", "desc"), limit(4));
  return fetchStoriesQuery(q);
}

export async function getIndiaStories(): Promise<Story[]> {
  const q = query(collection(db, "stories"), where("tag", "in", ["India", "Politics", "Sports"]), orderBy("createdAt", "desc"), limit(4));
  return fetchStoriesQuery(q);
}

export async function getStoriesByCategory(category: string): Promise<Story[]> {
  if (!category) return [];
  const lowerCategory = category.toLowerCase();
  
  let q;
  if (lowerCategory === 'assam') {
    q = query(collection(db, "stories"), where("tag", "==", "Assam"), orderBy("createdAt", "desc"));
  } else if (lowerCategory === 'northeast') {
    q = query(collection(db, "stories"), where("tag", "in", ["Northeast", "Manipur", "Mizoram", "Meghalaya", "Arunachal"]), orderBy("createdAt", "desc"));
  } else if (lowerCategory === 'india' || lowerCategory === 'politics') {
    q = query(collection(db, "stories"), where("tag", "in", ["India", "Politics", "Sports"]), orderBy("createdAt", "desc"));
  } else {
    // For specific matches like 'sports', 'education'
    // Firebase doesn't do case-insensitive exactly easily without a dedicated search, so we query carefully
    // Since tags are capitalized in CMS, we assume exactly that
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    q = query(collection(db, "stories"), where("tag", "==", capitalizedCategory), orderBy("createdAt", "desc"));
  }
  
  return fetchStoriesQuery(q);
}

export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  const q = query(collection(db, "stories"), where("slug", "==", slug), limit(1));
  const stories = await fetchStoriesQuery(q);
  return stories.length > 0 ? stories[0] : undefined;
}

export async function searchStories(searchQuery: string): Promise<Story[]> {
  if (!searchQuery) return [];
  // Note: Firebase doesn't support full-text search out of the box easily.
  // We'll fetch the latest and filter client-side for simplicity in this MVP.
  const q = query(collection(db, "stories"), orderBy("createdAt", "desc"), limit(50));
  const all = await fetchStoriesQuery(q);
  
  const lowerQuery = searchQuery.toLowerCase();
  return all.filter(s => 
    s.title.toLowerCase().includes(lowerQuery) || 
    (s.excerpt && s.excerpt.toLowerCase().includes(lowerQuery)) ||
    s.tag.toLowerCase().includes(lowerQuery)
  );
}
