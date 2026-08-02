import EventCard from "@/components/features/EventCard";
import dbConnect from "@/lib/db";
import Event, { EventStatus } from "@/models/Event";

async function getEvents() {
  await dbConnect();
  // In a real app, you'd also cache this with Redis
  const events = await Event.find({ status: EventStatus.PUBLISHED }).sort({ startDate: 1 });
  return JSON.parse(JSON.stringify(events));
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Event Hub</h1>
          <p className="text-gray-500 mt-2 text-lg">Join study jams, hackathons, and community meetups.</p>
        </div>
        <div className="flex gap-2">
          {["All", "Workshops", "Hackathons", "Study Jams"].map((tab) => (
            <button key={tab} className="px-5 py-2 rounded-full border border-gray-200 text-sm font-medium hover:border-blue-400 hover:text-blue-600 transition-colors">
              {tab}
            </button>
          ))}
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
          <p className="text-gray-400 text-xl font-medium">No events scheduled yet. Check back soon!</p>
          <p className="text-sm text-gray-400 mt-1">Or follow us on social media for updates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: any) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
