import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStoriesByCategory } from "@/lib/api";
import type { Story } from "@/data/mock";
import { Clock } from "lucide-react";

export function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      setLoading(true);
      const data = await getStoriesByCategory(id || "");
      setStories(data);
      setLoading(false);
    }
    fetchStories();
  }, [id]);

  if (loading) {
    return <div className="flex-1 flex items-center justify-center min-h-[50vh]">Loading category...</div>;
  }

  const title = id ? id.charAt(0).toUpperCase() + id.slice(1).replace("-", " ") : "Category";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="text-4xl font-black tracking-tight">{title}</h1>
      </div>
      
      {stories.length === 0 ? (
        <p className="text-muted-foreground">No stories found in this category.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((s, i) => (
            <Link key={i} to={`/story/${s.slug}`} className="group block">
              <div className="overflow-hidden rounded-md bg-muted aspect-[4/3]">
                <img
                  src={s.img}
                  alt=""
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-breaking">
                  {s.tag}
                </span>
                <h3 className="mt-1 font-bold text-lg leading-snug group-hover:text-breaking transition-colors">
                  {s.title}
                </h3>
                {s.excerpt && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{s.excerpt}</p>
                )}
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} /> {s.time}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
