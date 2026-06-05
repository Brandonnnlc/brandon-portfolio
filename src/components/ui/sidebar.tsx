import React from 'react';
import Link from 'next/link';
import { Home, Search, Library, Plus, ListFilter, Heart } from 'lucide-react';
import Image from 'next/image';

export default function Sidebar() {
  const libraryItems = [
    {
      title: "Selected Works",
      type: "Playlist",
      creator: "Brandon Lim",
      tracks: "8 tracks",
      href: "#projects",
      image: "/images/memo-showcase.jpg", // We can use the memo screenshot
      iconColor: "from-emerald-500 to-green-600"
    },
    {
      title: "Experience Mix",
      type: "Album",
      creator: "Brandon Lim",
      tracks: "6 tracks",
      href: "#timeline",
      image: "/images/brandon-profile.jpg",
      iconColor: "from-blue-500 to-indigo-600"
    },
    {
      title: "Top Skills 2026",
      type: "Playlist",
      creator: "Brandon Lim",
      tracks: "10 skills",
      href: "#skills",
      image: null,
      iconColor: "from-green-400 to-blue-500"
    },
    {
      title: "About Artist",
      type: "Artist",
      creator: "Brandon",
      tracks: "Verified Artist",
      href: "#about",
      image: "/images/brandon-profile.jpg",
      iconColor: "from-zinc-700 to-zinc-900"
    },
    {
      title: "Contact & Booking",
      type: "Single",
      creator: "Brandon Lim",
      tracks: "1 track",
      href: "#contact",
      image: null,
      iconColor: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <aside className="w-64 bg-black flex-shrink-0 flex flex-col gap-2 p-2 hidden md:flex h-full text-muted-foreground select-none">
      {/* Card 1: Navigation */}
      <div className="bg-[#121212] rounded-lg p-5 flex flex-col gap-4">
        <div className="text-white font-bold text-xl tracking-tighter flex items-center gap-1.5 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          Brandon Lim
        </div>
        
        <nav className="space-y-4">
          <Link href="/#hero" className="flex items-center gap-5 text-white hover:text-white transition-colors duration-200">
            <Home className="w-6 h-6" />
            <span className="font-bold text-sm">Home</span>
          </Link>
          <Link href="/#about" className="flex items-center gap-5 hover:text-white transition-colors duration-200">
            <Search className="w-6 h-6" />
            <span className="font-bold text-sm">About Artist</span>
          </Link>
        </nav>
      </div>
      
      {/* Card 2: Library */}
      <div className="bg-[#121212] rounded-lg p-5 flex-1 flex flex-col overflow-hidden gap-4">
        {/* Library Header */}
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer duration-200">
            <Library className="w-6 h-6" />
            <span className="font-bold text-sm">Your Library</span>
          </div>
          <button className="hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors duration-200">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Library Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 text-xs">
          <span className="px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#343434] transition-colors rounded-full text-white font-medium cursor-pointer whitespace-nowrap">Playlists</span>
          <span className="px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#343434] transition-colors rounded-full text-white font-medium cursor-pointer whitespace-nowrap">Albums</span>
          <span className="px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#343434] transition-colors rounded-full text-white font-medium cursor-pointer whitespace-nowrap">Artists</span>
        </div>

        {/* Search & Recents */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <button className="hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 hover:text-white transition-colors">
            <span>Recents</span>
            <ListFilter className="w-4 h-4" />
          </button>
        </div>

        {/* Library Content (Scrollable List) */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {libraryItems.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.href}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 group transition-colors duration-200 block"
            >
              {/* Graphic Thumbnail */}
              <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 relative bg-zinc-800 shadow">
                {item.image ? (
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className={`object-cover group-hover:scale-105 transition-transform duration-300 ${item.type === 'Artist' ? 'rounded-full' : ''}`}
                    sizes="48px"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${item.iconColor} opacity-90 flex items-center justify-center`}>
                    {item.title === 'Top Skills 2026' ? (
                      <Heart className="w-5 h-5 text-white fill-white" />
                    ) : (
                      <span className="text-white font-bold text-sm">{item.title.charAt(0)}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground truncate font-medium">
                  {item.type} <span className="mx-1">•</span> {item.tracks}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
