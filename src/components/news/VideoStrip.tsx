import videoImg from "@/assets/news-video.jpg";
import sportsImg from "@/assets/news-sports.jpg";
import cultureImg from "@/assets/news-culture.jpg";
import cityImg from "@/assets/news-city.jpg";
import { Play } from "lucide-react";

const clips = [
  {
    title: "Live: Assam Assembly winter session — Day 3 highlights",
    dur: "LIVE",
    img: videoImg,
    live: true,
  },
  { title: "Inside the Bihu rehearsal: 800 dancers, one stage", dur: "06:24", img: cultureImg },
  { title: "Guwahati traffic plan 2026: what changes for commuters", dur: "04:11", img: cityImg },
  { title: "Northeast in IPL — players to watch this season", dur: "03:48", img: sportsImg },
];

export function VideoStrip() {
  return (
    <section id="video" className="bg-navy text-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="h-7 w-1.5 bg-breaking" />
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Video News</h2>
          </div>
          <a
            href="#"
            className="text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white"
          >
            All videos →
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {clips.map((c, i) => (
            <a key={i} href="#" className="group block">
              <div className="relative overflow-hidden rounded-md aspect-video bg-navy-deep">
                <img
                  src={c.img}
                  alt=""
                  width={800}
                  height={450}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent" />
                <div className="absolute top-3 left-3">
                  {c.live ? (
                    <span className="bg-breaking text-breaking-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-white pulse-dot" /> Live
                    </span>
                  ) : (
                    <span className="bg-black/60 backdrop-blur text-white px-2 py-0.5 text-[10px] font-bold tracking-wider">
                      {c.dur}
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="h-12 w-12 rounded-full bg-white/90 text-navy inline-flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={20} className="ml-0.5" fill="currentColor" />
                  </span>
                </div>
              </div>
              <h3 className="mt-3 font-semibold text-sm leading-snug group-hover:text-breaking transition-colors">
                {c.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
