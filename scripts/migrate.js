import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import * as dotenv from "dotenv";
import { readFileSync } from "fs";

// Load environment variables from .env or .env.local
try {
  const envConfig = dotenv.parse(readFileSync(".env.local"));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
} catch (e) {
  console.log("Could not load .env.local, ensure variables are set.");
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// We need to redefine mock data here because importing it in Node might fail due to image imports (like import img from './assets...')
const mockStories = [
  {
    tag: "Top Story",
    title: "Cabinet clears 12 new highway projects across Northeast worth ₹18,000 cr",
    time: "26m",
    img: "https://images.unsplash.com/photo-1590496793907-444458f370e7?w=800&q=80",
    excerpt: "Connectivity push targets Arunachal and Manipur border districts in next 18 months.",
    slug: "cabinet-clears-12-new-highway-projects",
    content: "The Union Cabinet has approved a massive infrastructure push for the Northeast..."
  },
  {
    tag: "Investigation",
    title: "Inside the Majuli erosion crisis: a river that takes a village every year",
    time: "1h",
    img: "https://images.unsplash.com/photo-1518182170546-076616fd46bc?w=800&q=80",
    excerpt: "Satellite data shows 33% land loss in two decades.",
    slug: "inside-the-majuli-erosion-crisis",
    content: "A detailed investigation into the shrinking landmass of Majuli island..."
  },
  {
    tag: "Education",
    title: "Assam announces free coaching for 50,000 students aiming JEE & NEET",
    time: "2h",
    img: "https://images.unsplash.com/photo-1427504494785-319ce8372ac0?w=800&q=80",
    excerpt: "Programme to begin from January in district headquarters.",
    slug: "assam-announces-free-coaching",
    content: "In a major boost to medical and engineering aspirants..."
  },
  {
    tag: "Ground Report",
    title: "Why Upper Assam's tea workers haven't received their festival bonus",
    time: "3h",
    img: "https://images.unsplash.com/photo-1565451999268-07e0c436b761?w=800&q=80",
    excerpt: "Six-month NE Time Digital investigation.",
    slug: "why-upper-assams-tea-workers-havent-received-bonus",
    content: "Thousands of tea garden workers in Upper Assam are facing a bleak festival season..."
  },
  {
    tag: "Politics",
    title: "New Delhi summit: Northeast CMs push for infrastructure parity",
    time: "12m",
    img: "https://images.unsplash.com/photo-1590496793907-444458f370e7?w=800&q=80",
    slug: "new-delhi-summit-northeast-cms-push",
    content: "Chief Ministers from the Northeast gathered in New Delhi today..."
  }
];

async function migrate() {
  console.log("Starting migration to Firestore...");
  const storiesRef = collection(db, "stories");
  
  for (const story of mockStories) {
    try {
      await addDoc(storiesRef, {
        ...story,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log(`Migrated: ${story.title}`);
    } catch (error) {
      console.error(`Failed to migrate: ${story.title}`, error);
    }
  }
  
  console.log("Migration complete! You can press Ctrl+C to exit.");
  process.exit(0);
}

migrate();
