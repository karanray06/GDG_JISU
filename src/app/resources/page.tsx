"use client";

import { FileText, Github, Youtube, ExternalLink, Download, Search, Filter } from "lucide-react";
import { useState } from "react";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const resources = [
    { title: "Introduction to Generative AI", type: "Slides", category: "AI/ML", link: "#", date: "May 2024" },
    { title: "Building Scalable Backends with Node.js", type: "Repo", category: "Web Dev", link: "https://github.com", date: "April 2024" },
    { title: "Flutter UI Challenge: E-commerce App", type: "Video", category: "Mobile", link: "#", date: "March 2024" },
    { title: "Cloud Fundamentals & GCP Credits", type: "Doc", category: "Cloud", link: "#", date: "February 2024" },
  ];

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Resource Gallery</h1>
        <p className="text-gray-500 text-lg">Access study materials, code templates, and event recordings shared by the community.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="flex-grow relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search resources by topic or title..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-white border border-gray-200 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          <Filter size={20} /> Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res, i) => (
          <div key={i} className="google-card group cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl ${
                res.type === 'Slides' ? 'bg-orange-50 text-orange-600' :
                res.type === 'Repo' ? 'bg-gray-100 text-gray-900' :
                res.type === 'Video' ? 'bg-red-50 text-red-600' :
                'bg-blue-50 text-blue-600'
              }`}>
                {res.type === 'Slides' && <FileText size={24} />}
                {res.type === 'Repo' && <Github size={24} />}
                {res.type === 'Video' && <Youtube size={24} />}
                {res.type === 'Doc' && <Download size={24} />}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{res.date}</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{res.title}</h3>
            <div className="flex items-center gap-2 mb-6">
               <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs font-medium">{res.category}</span>
               <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs font-medium">{res.type}</span>
            </div>

            <div className="flex gap-2">
              <a href={res.link} className="flex-grow flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">
                 View Resource <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
           <p className="text-gray-400 font-medium">No resources found matching your search.</p>
        </div>
      )}
    </div>
  );
}
