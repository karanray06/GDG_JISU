"use client";

import { useSession } from "next-auth/react";
import { Trophy, Calendar, CheckCircle, Clock, Star } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function Dashboard() {
  const { data: session } = useSession();
  
  // Mock data for initial layout
  const stats = [
    { name: "Total Points", value: (session?.user as any)?.points || 0, icon: Star, color: "text-yellow-500" },
    { name: "Events Attended", value: 4, icon: CheckCircle, color: "text-green-500" },
    { name: "Global Rank", value: "#12", icon: Trophy, color: "text-blue-500" },
  ];

  const upcomingEvents = [
    { title: "Google I/O Extended 2024", date: "June 15, 2024", type: "Offline", token: "mock-token-1" },
    { title: "Cloud Study Jam: GenAI", date: "June 22, 2024", type: "Online", token: "mock-token-2" },
  ];

  if (!session) return <div className="p-10 text-center">Please sign in to view your dashboard.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 relative z-10 font-sans">
      <div className="mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/20 bg-primary/5 rounded text-[10px] font-display font-bold tracking-[0.3em] text-primary uppercase">
          Auth_Secure // Session_Verified
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">
          CONTROL <span className="text-gradient hover:shadow-[0_0_30px_rgba(0,243,255,0.3)] transition-all">CENTER</span>
        </h1>
        <p className="text-white/40 font-light tracking-wide">Welcome back, {session.user?.name}. Synchronizing your GDG telemetry...</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-panel p-8 flex items-center space-x-6 group hover:border-primary/40 transition-all">
            <div className={`p-4 rounded-xl bg-white/5 border border-white/10 ${stat.color} group-hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all`}>
              <stat.icon size={32} />
            </div>
            <div>
              <p className="text-[10px] text-white/30 font-display font-bold tracking-[0.2em] uppercase mb-1">{stat.name}</p>
              <p className="text-3xl font-display font-black text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Upcoming RSVPs */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-xl font-display font-bold text-white uppercase tracking-widest flex items-center gap-4">
            <Calendar size={20} className="text-primary" /> Active_Missions
          </h2>
          
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="glass-panel p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group">
                <div className="space-y-4">
                  <span className={`text-[10px] font-display font-bold px-3 py-1 rounded border border-white/10 uppercase tracking-[0.2em] ${event.type === 'Offline' ? 'text-primary' : 'text-secondary'}`}>
                    {event.type}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors">{event.title}</h3>
                  <div className="flex items-center text-white/30 text-xs font-light gap-3">
                    <Clock size={16} /> {event.date}
                  </div>
                </div>
                
                {/* QR Code section */}
                {event.type === 'Offline' && (
                  <div className="text-center p-4 bg-white/[0.03] rounded-xl border border-white/10 group-hover:border-primary/30 transition-all">
                    <div className="bg-white p-2 rounded-lg">
                       <QRCodeSVG value={event.token} size={80} />
                    </div>
                    <p className="text-[8px] mt-3 text-primary font-display font-bold tracking-[0.2em]">ACCESS_KEY</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Gamification / Badges */}
        <div className="space-y-8">
          <h2 className="text-xl font-display font-bold text-white uppercase tracking-widest flex items-center gap-4">
            <Trophy size={20} className="text-accent" /> Achievements
          </h2>
          <div className="glass-panel p-8">
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center p-4 relative group">
                  <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity border-dashed">
                    <Star size={24} className="text-white/20" />
                  </div>
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-[8px] font-display font-bold text-white/20 mt-3 tracking-widest uppercase text-center">Locked_Hash_{i}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-center text-white/20 mt-8 font-display italic tracking-widest uppercase">Increase_Rank_To_Unlock</p>
          </div>
        </div>
      </div>
    </div>
  );
}
