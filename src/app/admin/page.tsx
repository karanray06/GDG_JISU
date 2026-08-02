"use client";

import { useSession } from "next-auth/react";
import { Users, Calendar, TrendingUp, Search, MoreHorizontal, UserPlus } from "lucide-react";
import { UserRole } from "@/models/User";
import { redirect } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div className="p-10 text-center">Loading...</div>;
  
  const role = (session?.user as any)?.role;
  if (!session || (role !== UserRole.CORE && role !== UserRole.LEAD)) {
    redirect("/dashboard");
  }

  const stats = [
    { name: "Active Members", value: "1,042", change: "+12%", icon: Users },
    { name: "Total Events", value: "24", change: "+4", icon: Calendar },
    { name: "Avg Attendance", value: "84%", change: "+5%", icon: TrendingUp },
  ];

  const recentRegistrations = [
    { name: "Aria Sharma", email: "aria.s@university.edu", role: "Member", joined: "2 hours ago" },
    { name: "Ishaan Gupta", email: "ishaan.g@university.edu", role: "Member", joined: "5 hours ago" },
    { name: "Kavya Iyer", email: "kavya.i@university.edu", role: "Member", joined: "1 day ago" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-500">Manage your GDG chapter and view analytics.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2 bg-[#EA4335] text-white rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-sm">
            Broadcast Announcement
          </button>
          <button className="px-5 py-2 btn-google-blue">
            Create Event
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.name} className="google-card">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-gray-50 rounded-lg text-blue-600">
                <stat.icon size={24} />
              </div>
              <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Member Directory Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="google-card !p-0 overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/50">
              <h2 className="font-bold text-gray-800">Recent Registrations</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search members..." 
                  className="pl-10 pr-4 py-1.5 rounded-full border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b bg-white">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {recentRegistrations.map((user) => (
                  <tr key={user.email} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{user.name}</div>
                      <div className="text-gray-400 text-xs">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{user.joined}</td>
                    <td className="px-6 py-4">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <MoreHorizontal size={18} className="text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 bg-white border-t text-center">
              <button className="text-blue-600 text-sm font-semibold hover:underline">View All Members</button>
            </div>
          </div>
        </div>

        {/* Quick Actions / Tools */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Admin Tools</h2>
          <div className="google-card space-y-4">
            <Link 
              href="/admin/scanner" 
              className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-blue-200 bg-blue-50/30 hover:bg-blue-50 transition-colors group"
            >
              <div className="p-3 bg-blue-600 text-white rounded-lg group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <div>
                <p className="font-bold text-blue-900">QR Check-in Scanner</p>
                <p className="text-xs text-blue-700">Scan member codes at the door</p>
              </div>
            </Link>
            
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <UserPlus size={20} className="text-gray-500" />
                <span className="text-sm font-medium">Manage Waitlists</span>
              </div>
              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">12</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
