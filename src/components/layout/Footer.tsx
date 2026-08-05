import Link from "next/link";
import { Terminal, Globe, Image, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    community: [
      { name: "About Us", href: "/about" },
      { name: "Meet the Team", href: "/team" },
      { name: "Our Mission", href: "/about#mission" },
      { name: "Resources", href: "/resources" },
    ],
    events: [
      { name: "Upcoming Events", href: "/events" },
      { name: "Past Highlights", href: "/events#past" },
      { name: "Study Jams", href: "/events?tab=Study%20Jams" },
      { name: "Live Sessions", href: "/events/live" }, // Assuming a generic handle for live
    ],
    social: [
      { name: "GitHub", href: "https://github.com", icon: Terminal },
      { name: "LinkedIn", href: "https://linkedin.com", icon: Globe },
      { name: "Instagram", href: "https://instagram.com", icon: Image },
    ],
  };

  return (
    <footer className="bg-black/80 backdrop-blur-xl border-t border-white/10 py-20 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 px-4">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-1 px-3 border border-primary/50 relative">
                <span className="font-display font-black text-2xl text-white">GDG</span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary animate-pulse"></div>
              </div>
              <span className="font-display font-bold text-lg text-white/90">JIS UNIVERSITY</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              Designing the future with Google technology. We are the architects of a recursive reality.
            </p>
            <div className="flex space-x-6">
              {links.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/30 hover:text-primary transition-all hover:scale-125"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-display text-xs font-bold text-white uppercase tracking-[0.3em] mb-10 opacity-40">Section_01</h3>
            <ul className="space-y-5">
              {links.community.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-primary text-sm transition-all flex items-center group font-light">
                    <span className="w-0 group-hover:w-4 transition-all overflow-hidden text-primary">►</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-bold text-white uppercase tracking-[0.3em] mb-10 opacity-40">Section_02</h3>
            <ul className="space-y-5">
              {links.events.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-secondary text-sm transition-all flex items-center group font-light">
                    <span className="w-0 group-hover:w-4 transition-all overflow-hidden text-secondary">►</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-bold text-white uppercase tracking-[0.3em] mb-10 opacity-40">Protocol</h3>
            <ul className="space-y-6">
              <li className="flex items-center space-x-4 text-white/50 text-sm">
                <div className="p-2 bg-accent/10 border border-accent/20 rounded">
                  <Mail size={16} className="text-accent" />
                </div>
                <span className="font-light">terminal@gdgjisu.io</span>
              </li>
              <li className="flex items-center space-x-4 text-white/50 text-sm">
                <div className="p-2 bg-primary/10 border border-primary/20 rounded">
                  <Globe size={16} className="text-primary" />
                </div>
                <span className="font-light">Google_Global_Sync</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-display font-medium tracking-widest text-white/20">
          <p className="uppercase">© {currentYear} CORE_PROTOCOL_INITIATED // ALL_RIGHTS_RESERVED</p>
          <div className="flex space-x-10 mt-6 md:mt-0 uppercase">
            <Link href="#" className="hover:text-primary transition-colors">Privacy_Def</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms_Usage</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
