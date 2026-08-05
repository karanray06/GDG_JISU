import { Metadata } from "next";
import dbConnect from "@/lib/db";
import User, { UserRole } from "@/models/User";
import TeamContent from "@/components/pages/TeamContent";

export const metadata: Metadata = {
  title: "Team Protocol",
  description: "Personnel registry for the GDG JIS University core intelligence units.",
};

async function getTeam() {
  await dbConnect();
  const team = await User.find({
    role: { $in: [UserRole.CORE, UserRole.LEAD] }
  }).sort({ role: 1, name: 1 });

  return JSON.parse(JSON.stringify(team));
}

export default async function TeamPage() {
  const teamMembers = await getTeam();

  return (
    <div className="min-h-screen relative">
      <TeamContent teamMembers={teamMembers} />
      
      {/* Join the Team Section */}
      <section className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass-panel p-16 space-y-10 border-primary/20">
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">Need for_Speed?</h2>
            <p className="text-white/40 max-w-xl mx-auto font-light leading-relaxed">
              We are consistently seeking high-bandwidth talent to optimize the community core. 
              Synchronize with our development cycle.
            </p>
            <div className="pt-4">
               <a
                href="/resources"
                className="btn-neon text-xs"
              >
                Join_The_Ranks
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
