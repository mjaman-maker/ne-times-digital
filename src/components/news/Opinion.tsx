const ops = [
  { author: "Dr. Ranjita Bora", role: "Political analyst", quote: "The Northeast is no longer a footnote in Delhi's policy memos — it is the chapter being written right now." },
  { author: "Hiren Gohain", role: "Senior columnist", quote: "If Assam's youth migration is the question, dignified local employment is the only honest answer." },
  { author: "Mary Kom", role: "Guest column", quote: "Sport gave the Northeast its first national stage. The next stage must be built by the state, not the athlete." },
];

const trending = [
  "Bihu 2026 dates",
  "Manipur peace talks",
  "Assam HSLC results",
  "Guwahati Metro tender",
  "Brahmaputra flood alert",
  "Rongali Mahotsav lineup",
];

export function Opinion() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 grid lg:grid-cols-3 gap-10 border-t border-border">
      <div className="lg:col-span-2" id="opinion">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-7 w-1.5 bg-navy dark:bg-foreground" />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Opinion</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {ops.map((o) => (
            <article key={o.author} className="bg-card border border-border rounded-md p-5 hover:border-navy dark:hover:border-foreground transition-colors">
              <span className="text-4xl text-breaking font-serif leading-none">"</span>
              <p className="mt-1 text-sm leading-relaxed font-medium">{o.quote}</p>
              <div className="mt-5 pt-4 border-t border-border">
                <div className="font-bold text-sm">{o.author}</div>
                <div className="text-xs text-muted-foreground">{o.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside id="trending">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-7 w-1.5 bg-breaking" />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Trending</h2>
        </div>
        <ol className="space-y-3">
          {trending.map((t, i) => (
            <li key={t} className="flex gap-3 items-start group cursor-pointer">
              <span className="text-3xl font-black text-breaking/30 group-hover:text-breaking transition-colors leading-none w-9">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold group-hover:text-breaking pt-1.5 transition-colors">
                {t}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-8 bg-navy text-white p-5 rounded-md">
          <div className="text-xs uppercase tracking-widest text-white/60 font-semibold">Newsletter</div>
          <h3 className="mt-1 font-black text-lg leading-tight">The Northeast Morning Brief</h3>
          <p className="mt-1 text-xs text-white/70">7 stories, every weekday at 7 AM IST.</p>
          <form className="mt-3 flex gap-2">
            <input type="email" placeholder="your@email.com"
              className="flex-1 bg-navy-deep border border-white/15 text-sm px-3 py-2 rounded-sm placeholder:text-white/40 focus:outline-none focus:border-breaking" />
            <button className="bg-breaking text-breaking-foreground px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:opacity-90">
              Join
            </button>
          </form>
        </div>
      </aside>
    </section>
  );
}
