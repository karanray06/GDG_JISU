"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Send, Users, MessageSquare, Video, ShieldAlert } from "lucide-react";

export default function LiveSessionPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [chatMessage, setChatMessage] = useState("");
  const [chat, setChat] = useState([
    { user: "Admin", text: "Welcome to the GDG Study Jam! We'll start in 5 minutes.", type: "admin" },
    { user: "Karan", text: "Can we get the slides early?", type: "member" },
    { user: "Sarah", text: "Super excited for this!", type: "member" },
  ]);

  if (!session) return <div className="p-20 text-center flex flex-col items-center gap-4">
    <ShieldAlert size={48} className="text-red-500" />
    <h1 className="text-2xl font-bold">Access Denied</h1>
    <p>Please sign in to join the live session.</p>
  </div>;

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChat([...chat, { user: session.user?.name || "Member", text: chatMessage, type: "member" }]);
    setChatMessage("");
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col lg:flex-row overflow-hidden bg-black">
      {/* Video Stream Area */}
      <div className="flex-grow flex flex-col relative group">
        <div className="flex-grow bg-gray-900 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
            {/* Embedded Iframe Placeholder */}
            <iframe 
               width="100%" 
               height="100%" 
               src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
               title="Live Stream" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Video Overlay Controls */}
        <div className="absolute top-6 left-6 flex items-center gap-3">
          <div className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold animate-pulse">LIVE</div>
          <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2">
            <Users size={14} /> 124 watching
          </div>
        </div>
        
        <div className="p-6 bg-gray-900 border-t border-white/5 flex justify-between items-center text-white">
          <div>
            <h1 className="text-xl font-bold">Cloud Study Jam: Generative AI on Vertex AI</h1>
            <p className="text-sm text-gray-400">GDG Chapter • Hosted by Karan Ray</p>
          </div>
          <div className="flex gap-4">
             <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><MessageSquare size={20} /></button>
             <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><Video size={20} /></button>
          </div>
        </div>
      </div>

      {/* Side Chat Interface */}
      <div className="w-full lg:w-96 bg-zinc-900 border-l border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10 font-bold text-white flex justify-between items-center">
          <span>Live Chat</span>
          <MessageSquare size={18} className="text-blue-500" />
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {chat.map((msg, i) => (
            <div key={i} className="text-sm">
              <span className={`font-bold mr-2 ${msg.type === 'admin' ? 'text-blue-400' : 'text-gray-400'}`}>
                {msg.user}:
              </span>
              <span className="text-gray-200">{msg.text}</span>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="p-4 bg-zinc-800 border-t border-white/10 flex gap-2">
          <input 
            type="text" 
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Say something nice..." 
            className="flex-grow bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          />
          <button type="submit" className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
