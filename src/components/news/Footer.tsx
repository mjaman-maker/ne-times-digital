import { Send } from "lucide-react";
import type { SVGProps } from "react";

// lucide-react v1 removed brand/logo icons, so the social icons are inlined here.
function Facebook({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function Youtube({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M23.5 6.5a3 3 0 0 0-2.1-2.13C19.55 3.9 12 3.9 12 3.9s-7.55 0-9.4.47A3 3 0 0 0 .5 6.5 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.13c1.85.47 9.4.47 9.4.47s7.55 0 9.4-.47a3 3 0 0 0 2.1-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.5ZM9.6 15.5v-7l6.3 3.5-6.3 3.5Z" />
    </svg>
  );
}

function Instagram({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white mt-10">
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center h-10 w-10 bg-breaking text-white font-black text-lg rounded-sm">
              NE
            </span>
            <span className="font-black text-2xl">
              NE Time<span className="text-breaking">.</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            The modern digital voice of Northeast India. Fast, clean, mobile-first journalism from
            Assam and beyond.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Youtube, Instagram, Send].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 inline-flex items-center justify-center border border-white/15 rounded-sm hover:bg-breaking hover:border-breaking transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {[
          { h: "Sections", l: ["Assam", "Northeast", "India", "Politics", "Education", "Video"] },
          {
            h: "Company",
            l: ["About", "Contact", "Advertise With Us", "Join Reporter", "Careers"],
          },
          {
            h: "Legal",
            l: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Editorial Standards"],
          },
        ].map((c) => (
          <div key={c.h}>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white/50 mb-4">
              {c.h}
            </h4>
            <ul className="space-y-2.5">
              {c.l.map((x) => (
                <li key={x}>
                  <a href="#" className="text-sm text-white/85 hover:text-breaking">
                    {x}
                  </a>
                </li>
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
