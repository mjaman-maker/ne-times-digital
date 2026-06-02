import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStoryBySlug } from "@/lib/api";
import type { Story } from "@/data/mock";
import { Clock, ArrowLeft } from "lucide-react";

export function StoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStory() {
      setLoading(true);
      const data = await getStoryBySlug(slug || "");
      setStory(data || null);
      setLoading(false);
    }
    fetchStory();
  }, [slug]);

  if (loading) {
    return <div className="flex-1 flex items-center justify-center min-h-[50vh]">Loading story...</div>;
  }

  if (!story) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Story not found</h2>
        <Link to="/" className="text-breaking hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4">
          {story.title}
        </h1>
        <div className="flex items-center justify-between border-y border-border py-3">
          <div className="flex items-center gap-4 text-muted-foreground text-sm font-medium">
            <span className="flex items-center gap-1">
              <Clock size={14} /> {story.time}
            </span>
            <span>By NE Times Desk</span>
          </div>
          <span className="inline-block px-3 py-1 bg-breaking/10 text-breaking font-bold text-xs uppercase tracking-wider rounded-sm">
            {story.tag}
          </span>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-lg bg-muted mb-8 aspect-video">
        <img
          src={story.img}
          alt={story.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {story.excerpt && (
          <p className="text-xl font-medium leading-relaxed text-foreground/80 mb-6">
            {story.excerpt}
          </p>
        )}
        <div className="text-foreground/90 leading-relaxed space-y-4">
          <p>{story.content || "Full article content goes here..."}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </article>
  );
}
