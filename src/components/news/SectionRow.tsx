import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { Story } from "@/data/mock";

export function SectionRow({
  id,
  title,
  accent,
  stories,
}: {
  id: string;
  title: string;
  accent?: boolean;
  stories: Story[];
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-10 border-t border-border">
      <div className="flex items-end justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className={`h-7 w-1.5 ${accent ? "bg-breaking" : "bg-navy dark:bg-foreground"}`} />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{title}</h2>
        </div>
        <Link
          to={`/category/${id}`}
          className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-breaking inline-flex items-center gap-1"
        >
          View all <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
              <h3 className="mt-1 font-bold text-base leading-snug group-hover:text-breaking transition-colors">
                {s.title}
              </h3>
              {s.excerpt && (
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{s.excerpt}</p>
              )}
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock size={11} /> {s.time}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
