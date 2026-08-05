"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { User, Calendar, LayoutDashboard, ShieldCheck, LogOut, Menu, X, Users, Info } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const role = (session?.user as any)?.role;

  const navLinks = [
    { name: "Events", href: "/events", icon: Calendar },
    { name: "About", href: "/about", icon: Info },
    { name: "Team", href: "/team", icon: Users },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-1 px-3 border border-primary/50 rounded-lg group-hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all">
                <span className="font-display font-black text-2xl text-white">GDG</span>
              </div>
              <span className="font-display font-bold text-lg hidden sm:block tracking-widest text-white/80 group-hover:text-primary transition-colors">
                JIS UNIVERSITY
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6 pr-6 border-r border-white/10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`font-display text-xs font-bold tracking-widest transition-all hover:text-primary ${
                    isActive(link.href) 
                    ? "text-primary shadow-[0_4px_0_-2px_rgba(0,243,255,1)] pb-1" 
                    : "text-white/60"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className={`font-display text-xs font-bold tracking-widest transition-all hover:text-secondary ${
                      isActive('/dashboard')
                      ? "text-secondary"
                      : "text-white/60"
                    }`}
                  >
                    Control Panel
                  </Link>
                  
                  {(role === "CORE" || role === "LEAD") && (
                    <Link 
                      href="/admin" 
                      className={`font-display text-xs font-bold tracking-widest text-accent hover:shadow-[0_0_10px_rgba(255,0,85,0.5)] border border-accent/30 px-3 py-1 rounded transition-all`}
                    >
                      Admin_Sys
                    </Link>
                  )}

                  <div className="flex items-center space-x-4 ml-4 border-l border-white/10 pl-6">
                    <div className="relative group">
                      <img src={session.user?.image || ""} className="h-9 w-9 rounded-full border border-primary/50 group-hover:shadow-[0_0_10px_rgba(0,243,255,0.5)] transition-all" alt="User" />
                    </div>
                    <button onClick={() => signOut()} className="text-white/40 hover:text-accent transition-colors">
                      <LogOut size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={() => signIn("google")}
                  className="btn-neon text-[10px]"
                >
                  Initiate session
                </button>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white/60 hover:text-primary transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 pt-6 pb-12 space-y-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 text-lg font-display font-bold tracking-widest text-white/70 hover:text-primary"
            >
              <link.icon size={20} className="text-primary" /> {link.name}
            </Link>
          ))}
          
          <div className="pt-6 border-t border-white/10 space-y-6">
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 text-lg font-display font-bold tracking-widest text-secondary"
                >
                  <LayoutDashboard size={20} /> Control Panel
                </Link>
                {(role === "CORE" || role === "LEAD") && (
                  <Link 
                    href="/admin" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-lg font-display font-bold tracking-widest text-accent"
                  >
                    <ShieldCheck size={20} /> Admin Access
                  </Link>
                )}
                <button 
                  onClick={() => { signOut(); setIsOpen(false); }} 
                  className="flex items-center gap-4 w-full text-white/40 font-display font-bold tracking-widest"
                >
                  <LogOut size={20} /> Terminate
                </button>
              </>
            ) : (
              <button 
                onClick={() => signIn("google")} 
                className="w-full btn-neon"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
