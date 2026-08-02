"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Target, Award, ArrowRight, ShieldCheck } from "lucide-react";

export default function AboutContent() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ memberCount: 1000, eventCount: 24 });

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const values = [
    { title: "Connect", description: "Meet students interested in developer technologies at your university.", icon: Users, color: "text-blue-500" },
    { title: "Learn", description: "Learn about a range of technical topics and gain new skills.", icon: Target, color: "text-red-500" },
    { title: "Grow", description: "Apply your knowledge to build solutions for local problems.", icon: Award, color: "text-green-500" },
  ];

  return (
    <div className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Connection Status Section */}
        <section className="relative mb-32 pt-20">
          <motion.div 
            className="text-center max-w-4xl mx-auto space-y-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="inline-flex items-center gap-4 px-6 py-2 border border-primary/20 bg-primary/5 rounded font-display text-[10px] font-bold tracking-[0.5em] text-primary uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Core_Protocol_Initialized
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-black text-white leading-tight tracking-tighter">
              BEYOND THE <br />
              <span className="text-gradient hover:shadow-[0_0_30px_rgba(0,243,255,0.3)] transition-all">INTERFACE</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-3xl mx-auto">
              Google Developer Groups (GDG) are recursive clusters of explorers. 
              We operate at the intersection of imagination and implementation, 
              building the neural paths for the next generation of architects.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-8 pt-6 font-display">
              {session ? (
                <Link href="/dashboard" className="btn-neon text-xs">
                  Access_Neural_Link
                </Link>
              ) : (
                <button onClick={() => signIn("google")} className="btn-neon text-xs">
                  Initiate_Handshake
                </button>
              )}
            </div>
          </motion.div>
        </section>
        
        {/* Telemetry Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
           {[
             { label: "Active_Nodes", value: stats.memberCount, color: "text-primary" },
             { label: "Events_Logged", value: stats.eventCount, color: "text-secondary" },
             { label: "Core_Units", value: "15+", color: "text-accent" },
             { label: "Sync_Commits", value: "5k+", color: "text-primary" }
           ].map((stat, i) => (
             <motion.div 
               key={stat.label}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="glass-panel p-8 text-center group"
             >
                <p className={`text-4xl font-display font-black text-white mb-2 group-hover:${stat.color} transition-all`}>{stat.value}</p>
                <p className="text-[10px] font-display font-bold text-white/30 tracking-[0.2em] uppercase">{stat.label}</p>
             </motion.div>
           ))}
        </section>

        {/* Mission Grid */}
        <div id="mission" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="space-y-12"
           >
              <div className="space-y-4">
                <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter">Mission_Log</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent"></div>
              </div>
              
              <p className="text-white/60 text-lg font-light leading-relaxed">
                 We bridge the singularity between academic theory and industry reality. 
                 By establishing high-bandwidth local chapters, we foster a peer-to-peer 
                 learning environment where the future is architected line by line.
              </p>
              
              <div className="space-y-6">
                 {[
                   { title: "KNOWLEDGE_TRANSFER", desc: "Recursive learning through technical synthesis.", icon: Target, color: "text-primary" },
                   { title: "SYSTEM_OPTIMIZATION", desc: "Scaling local talent to global standards.", icon: ShieldCheck, color: "text-secondary" }
                 ].map(item => (
                   <div key={item.title} className="flex gap-6 p-6 glass-panel border-l-2 border-primary/30">
                      <item.icon size={24} className={item.color} />
                      <div>
                        <h4 className="font-display font-bold text-white text-sm tracking-widest">{item.title}</h4>
                        <p className="text-white/40 text-xs mt-1 font-light">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </motion.div>

           <div className="grid grid-cols-1 gap-6">
              {values.map((value, idx) => (
                <motion.div 
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel p-10 group hover:border-primary/50 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <value.icon size={80} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-wider uppercase group-hover:text-primary transition-colors">{value.title}</h3>
                  <p className="text-white/40 font-light leading-relaxed text-sm">{value.description}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
