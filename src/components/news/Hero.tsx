import heroImg from "@/assets/hero-assam.jpg";
import politicsImg from "@/assets/news-politics.jpg";
import northeastImg from "@/assets/news-northeast.jpg";
import educationImg from "@/assets/news-education.jpg";
import { Clock } from "lucide-react";

const side = [
  { tag: "Politics", title: "New Delhi summit: Northeast CMs push for infrastructure parity", time: "12m", img: politicsImg },
  { tag: "Northeast", title: "Brahmaputra erosion displaces 4,000 in Majuli — relief delayed", time: "38m", img: northeastImg },
  { tag: "Education", title: "Assam to introduce coding curriculum from Class 6 next session", time: "1h", img: educationImg },
];

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid lg:grid-cols-3 gap-5">
        <article className="lg:col-span-2 relative group overflow-hidden rounded-md bg-navy">
          <img
            src={heroImg}
            alt="Tea garden workers at sunrise in Assam"
            width={1536}
            height={1024}
            className="w-full h-[320px] sm:h-[460px] lg:h-[560px] object-cover opacity-90 group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/40 to-transparent" />
          <div className="absolute left-0 right-0 bottom-0 p-5 sm:p-8 text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-breaking text-breaking-foreground px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                Lead Story
              </span>
              <span className="text-xs uppercase tracking-widest opacity-80">Assam · Ground Report</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-[1.05] max-w-3xl">
              In the hills of Upper Assam, tea workers wait for a wage that never comes
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/80 max-w-2xl">
              A six-month NE Time Digital investigation into the bonus crisis across 80 tea estates of Dibrugarh and Tinsukia.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-white/70">
              <span className="font-semibold">By Pranab Hazarika</span>
              <span className="inline-flex items-center gap-1"><Clock size={12} /> 2h ago</span>
            </div>
          </div>
        </article>

        <div className="flex flex-col gap-4">
          {side.map((s) => (
            <a key={s.title} href="#" className="group grid grid-cols-[110px_1fr] gap-3 bg-card border border-border rounded-md overflow-hidden hover:border-breaking transition-colors">
              <img src={s.img} alt="" width={400} height={300} loading="lazy" className="h-full w-full object-cover" />
              <div className="py-3 pr-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-breaking">{s.tag}</span>
                <h3 className="mt-1 text-sm sm:text-base font-bold leading-snug group-hover:text-breaking transition-colors">
                  {s.title}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock size={11} /> {s.time}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
