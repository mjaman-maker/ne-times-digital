import { useEffect, useState } from "react";
import { Search, Moon, Sun, Menu, X } from "lucide-react";

const nav = [
  "Top Stories",
  "Assam",
  "Northeast",
  "India",
  "Politics",
  "Education",
  "Video",
  "Trending",
  "Opinion",
];

export function Header() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-3">
          <button
            className="lg:hidden p-2 -ml-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <a href="/" className="flex items-center gap-2 select-none">
            <span className="inline-flex items-center justify-center h-9 w-9 bg-navy text-white font-black text-lg rounded-sm">
              NE
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-black text-xl tracking-tight text-navy dark:text-foreground">
                NE Time<span className="text-breaking">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                Digital · Northeast India
              </span>
            </span>
          </a>

          <div className="flex items-center gap-1">
            <button className="p-2 text-muted-foreground hover:text-foreground" aria-label="search">
              <Search size={18} />
            </button>
            <button
              className="p-2 text-muted-foreground hover:text-foreground"
              aria-label="theme"
              onClick={() => setDark(!dark)}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="#join"
              className="ml-2 hidden sm:inline-flex items-center bg-breaking text-breaking-foreground px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm hover:opacity-90"
            >
              Live TV
            </a>
          </div>
        </div>

        <nav
          className={`${open ? "flex" : "hidden"} lg:flex flex-col lg:flex-row gap-1 lg:gap-6 py-2 lg:py-0 border-t lg:border-t-0 border-border lg:items-center overflow-x-auto`}
        >
          {nav.map((n) => (
            <a
              key={n}
              href={`#${n.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-semibold text-foreground/80 hover:text-breaking py-2 lg:py-3 whitespace-nowrap border-b-2 border-transparent hover:border-breaking transition-colors"
            >
              {n}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
