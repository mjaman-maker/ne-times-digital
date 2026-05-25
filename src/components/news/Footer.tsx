import { Facebook, Youtube, Instagram, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white mt-10">
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center h-10 w-10 bg-breaking text-white font-black text-lg rounded-sm">NE</span>
            <span className="font-black text-2xl">NE Time<span className="text-breaking">.</span></span>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            The modern digital voice of Northeast India. Fast, clean, mobile-first journalism from Assam and beyond.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Youtube, Instagram, Send].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 inline-flex items-center justify-center border border-white/15 rounded-sm hover:bg-breaking hover:border-breaking transition-colors">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {[
          { h: "Sections", l: ["Assam", "Northeast", "India", "Politics", "Education", "Video"] },
          { h: "Company", l: ["About", "Contact", "Advertise With Us", "Join Reporter", "Careers"] },
          { h: "Legal", l: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Editorial Standards"] },
        ].map((c) => (
          <div key={c.h}>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white/50 mb-4">{c.h}</h4>
            <ul className="space-y-2.5">
              {c.l.map((x) => (
                <li key={x}><a href="#" className="text-sm text-white/85 hover:text-breaking">{x}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} NE Time Digital. All rights reserved.</span>
          <span>Published from Guwahati, Assam · India</span>
        </div>
      </div>
    </footer>
  );
}
