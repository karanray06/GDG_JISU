import { ArrowRight, Calendar, Users, Zap, Shield, Globe } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    { title: "Event Management", description: "Seamless RSVP system with real-time capacity and waitlist management.", icon: Calendar, color: "bg-blue-50 text-blue-600" },
    { title: "QR Check-ins", description: "Swift check-ins at offline events using secure, unique QR codes.", icon: Zap, color: "bg-yellow-50 text-yellow-600" },
    { title: "Gamification", description: "Earn points and badges for community participation and attending sessions.", icon: Shield, color: "bg-green-50 text-green-600" },
    { title: "Resource Hub", description: "Centralized repository for slides, code, and session recordings.", icon: Globe, color: "bg-red-50 text-red-600" },
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="relative z-10 space-y-8 animate-fadeIn">
          <div className="inline-flex items-center gap-3 px-6 py-2 border border-primary/20 bg-primary/5 rounded-full text-xs font-display font-bold tracking-[0.3em] text-primary uppercase">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            Connection_Established // GDG_PROTOCOL
          </div>
          
          <h1 className="text-6xl md:text-9xl font-display font-black text-white leading-[0.9] tracking-tighter">
            BUILD THE <br />
            <span className="text-gradient">FUTURE</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-sans font-light leading-relaxed">
            The neural interface for developers. Synchronize with the community, 
            master Google technology, and architect a recursive reality.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 font-display">
            <Link href="/events" className="btn-neon min-w-[240px]">
              Explore_Events
            </Link>
            <Link href="/dashboard" className="text-white/40 hover:text-secondary text-xs font-bold tracking-[0.2em] transition-all flex items-center gap-2 group">
              Access_Dashboard <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>
      </section>

      {/* Features Grid */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter">System_Modules</h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
            <p className="text-white/40 max-w-xl mx-auto font-light text-sm">Scale your capabilities with our specialized development protocols.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={feature.title} className="glass-panel p-10 flex flex-col items-center text-center group hover:-translate-y-2 transition-all">
                <div className={`p-4 rounded-xl mb-8 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all bg-white/5 border border-white/10`}>
                  <feature.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-4 tracking-wider uppercase">{feature.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section (Telemetry) */}
      <section className="py-24 relative z-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div className="space-y-2">
            <p className="text-5xl font-display font-black text-primary">1,000+</p>
            <p className="text-[10px] text-white/30 font-display font-bold uppercase tracking-[0.3em]">Synced_Members</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl font-display font-black text-secondary">25+</p>
            <p className="text-[10px] text-white/30 font-display font-bold uppercase tracking-[0.3em]">Events_Logged</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl font-display font-black text-accent">5,000+</p>
            <p className="text-[10px] text-white/30 font-display font-bold uppercase tracking-[0.3em]">Data_Points</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl font-display font-black text-primary">15+</p>
            <p className="text-[10px] text-white/30 font-display font-bold uppercase tracking-[0.3em]">Core_Units</p>
          </div>
        </div>
      </section>

      {/* Decorative Wave Separator */}
      <div className="h-24 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}
