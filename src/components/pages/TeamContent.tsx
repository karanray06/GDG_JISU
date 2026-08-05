"use client";

import { motion } from "framer-motion";
import { Users, Terminal, Globe, Mail, Crown, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface TeamMember {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
}

export default function TeamContent({ teamMembers }: { teamMembers: TeamMember[] }) {
  return (
    <div className="py-24 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 border border-primary/20 bg-primary/5 rounded text-[10px] font-display font-bold tracking-[0.4em] text-primary uppercase"
          >
            Personnel_Registry
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter"
          >
            THE <span className="text-gradient hover:shadow-[0_0_30px_rgba(0,243,255,0.3)] transition-all">ARCHITECTS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-2xl mx-auto font-light leading-relaxed"
          >
            The core intelligence units driving the GDG protocol. Synchronized for maximum innovation output and community growth.
          </motion.p>
        </div>

        {teamMembers.length === 0 ? (
          <div className="text-center py-24 glass-panel border-2 border-dashed border-white/10">
            <p className="text-white/30 font-display font-bold tracking-widest uppercase">No_Active_Nodes_Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-10 text-center relative group overflow-hidden"
              >
                {/* Profile Ring */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                  <div className={`absolute inset-0 rounded-full border-2 border-dashed ${member.role === 'LEAD' ? 'border-primary' : 'border-secondary'} animate-spin-slow opacity-30 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="absolute inset-2 rounded-full border border-white/10 group-hover:border-primary/50 transition-colors"></div>
                  <div className="absolute inset-3 rounded-full overflow-hidden bg-black/40 flex items-center justify-center border border-white/5">
                    {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                        <Users size={40} className="text-white/20 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  
                  {/* Rank Badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-3 py-0.5 rounded text-[8px] font-display font-bold tracking-widest uppercase group-hover:border-primary transition-colors">
                    {member.role === 'LEAD' ? (
                        <span className="text-primary flex items-center gap-1.5"><Crown size={10} /> Lead_Unit</span>
                    ) : (
                        <span className="text-secondary flex items-center gap-1.5"><ShieldCheck size={10} /> Core_Node</span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-2 tracking-wider group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-[10px] font-display font-bold text-white/40 tracking-[0.2em] uppercase mb-8">{member.role} TEAM</p>
                
                <div className="flex justify-center gap-6">
                  <a href={`mailto:${member.email}`} className="text-white/20 hover:text-primary transition-all hover:scale-125">
                    <Mail size={18} />
                  </a>
                  <Link href="#" className="text-white/20 hover:text-primary transition-all hover:scale-125">
                    <Terminal size={18} />
                  </Link>
                  <Link href="#" className="text-white/20 hover:text-primary transition-all hover:scale-125">
                    <Globe size={18} />
                  </Link>
                </div>

                {/* Technical Overlay */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
