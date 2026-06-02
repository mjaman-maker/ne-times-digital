import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchStories } from "@/lib/api";
import type { Story } from "@/data/mock";
import { Clock } from "lucide-react";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [results, setResults] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      const data = await searchStories(query);
      setResults(data);
      setLoading(false);
    }
    fetchResults();
  }, [query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="text-3xl font-black tracking-tight">
          Search Results for: <span className="text-breaking">"{query}"</span>
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">
          Found {results.length} results
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[30vh]">Loading results...</div>
      ) : results.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No stories match your search query.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-4xl">
          {results.map((s, i) => (
            <Link key={i} to={`/story/${s.slug}`} className="group flex flex-col sm:flex-row gap-5 border border-border rounded-lg p-4 hover:border-breaking/50 transition-colors bg-card">
              <div className="sm:w-1/3 overflow-hidden rounded-md bg-muted aspect-[4/3] shrink-0">
                <img
                  src={s.img}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-breaking mb-2">
                  {s.tag}
                </span>
                <h3 className="font-bold text-xl leading-snug group-hover:text-breaking transition-colors">
                  {s.title}
                </h3>
                {s.excerpt && (
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{s.excerpt}</p>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
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
