import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    description: string;
    startDate: string;
    location: string;
    type: string;
    rsvpCount: number;
    capacity: number;
    coverImage: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const isFull = event.rsvpCount >= event.capacity;

  return (
    <div className="google-card overflow-hidden !p-0 flex flex-col h-full hover:-translate-y-1 transition-transform">
      <div className="h-48 w-full bg-gray-100 relative">
        <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold google-shadow">
          {event.type}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-blue-600 text-xs font-bold gap-2 mb-2 uppercase tracking-widest">
          <Calendar size={14} /> {new Date(event.startDate).toLocaleDateString()}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10">{event.description}</p>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center text-gray-500 text-sm gap-2">
            <MapPin size={16} /> <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm gap-2">
            <Users size={16} /> <span>{event.rsvpCount} / {event.capacity} Joined</span>
          </div>
          
          <Link 
            href={`/events/${event._id}`} 
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
              isFull 
              ? "bg-gray-100 text-gray-500 cursor-not-allowed" 
              : "bg-[#4285F4] text-white hover:bg-blue-600 shadow-md"
            }`}
          >
            {isFull ? "Join Waitlist" : "RSVP Now"} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
