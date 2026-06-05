"use client";

import React, { useEffect, useState } from 'react';
import { PlayCircle, SkipBack, SkipForward, Shuffle, Repeat, Mic2, ListMusic, MonitorSpeaker, Volume2, Maximize2, PauseCircle, Heart } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function NowPlayingBar() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [trackName, setTrackName] = useState("Frontend Developer");
  const [trackSubtext, setTrackSubtext] = useState("Brandon Lim");
  const [trackImage, setTrackImage] = useState("/images/brandon-profile.jpg");
  const [trackDuration, setTrackDuration] = useState("3:45");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Create scroll trigger on the main scroll container
    const mainContainer = document.getElementById("main-scroll-area");
    
    if (mainContainer) {
      ScrollTrigger.create({
        scroller: mainContainer,
        trigger: "#content-wrapper",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setProgress(self.progress * 100);
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Listen for track play events from other components
  useEffect(() => {
    const handlePlayTrack = (e: Event) => {
      const customEvent = e as CustomEvent<{
        name: string;
        subtext: string;
        image?: string;
        duration?: string;
      }>;
      if (customEvent.detail) {
        setTrackName(customEvent.detail.name);
        setTrackSubtext(customEvent.detail.subtext);
        if (customEvent.detail.image) {
          setTrackImage(customEvent.detail.image);
        } else {
          setTrackImage("/images/brandon-profile.jpg");
        }
        if (customEvent.detail.duration) {
          setTrackDuration(customEvent.detail.duration);
        }
        setIsPlaying(true);
      }
    };

    window.addEventListener('play-track', handlePlayTrack);
    return () => {
      window.removeEventListener('play-track', handlePlayTrack);
    };
  }, []);

  // Notify other components of playing state changes
  useEffect(() => {
    const event = new CustomEvent('track-changed', {
      detail: { name: trackName, isPlaying }
    });
    window.dispatchEvent(event);
    // Store globally as well for immediate check
    if (typeof window !== 'undefined') {
      (window as any).__currentPlayingTrack = trackName;
      (window as any).__currentIsPlaying = isPlaying;
    }
  }, [trackName, isPlaying]);

  return (
    <div className="h-24 bg-[#181818] border-t border-[#282828] w-full flex items-center justify-between px-4 select-none z-50 fixed bottom-0 left-0 right-0">
      {/* Inject Vinyl Keyframe */}
      <style jsx global>{`
          @keyframes spin-vinyl-disc {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
              animation: spin-vinyl-disc 8s linear infinite;
          }
      `}</style>

      {/* Left: Track Info */}
      <div className="flex items-center gap-4 w-[30%] min-w-[240px]">
        {/* Album + Vinyl Wrapper */}
        <div className="relative flex-shrink-0 w-20 h-14 flex items-center">
          {/* Square Album Cover */}
          <div className="w-14 h-14 bg-zinc-800 rounded overflow-hidden relative shadow-lg z-10">
            <Image
              src={trackImage}
              alt={trackName}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          
          {/* Vinyl Record */}
          <div 
            className={`absolute top-1 left-0 w-12 h-12 rounded-full bg-black border border-zinc-800 shadow-md flex items-center justify-center transition-all duration-700 ease-out z-0 ${
              isPlaying ? "translate-x-6" : "translate-x-0 opacity-0"
            }`}
            style={{ 
              boxShadow: "inset 0 0 10px rgba(255,255,255,0.15), 0 4px 6px rgba(0,0,0,0.5)"
            }}
          >
            {/* Spinning Disc container */}
            <div className={`w-full h-full rounded-full relative flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
              {/* Grooves (Concentric Circles) */}
              <div className="absolute inset-1 rounded-full border border-zinc-900/80 opacity-60" />
              <div className="absolute inset-2.5 rounded-full border border-zinc-800/60 opacity-40" />
              <div className="absolute inset-4 rounded-full border border-zinc-900/80 opacity-60" />
              
              {/* Center Label */}
              <div className="w-4 h-4 rounded-full overflow-hidden bg-zinc-700 relative border border-zinc-900 flex-shrink-0">
                <Image
                  src={trackImage}
                  alt=""
                  fill
                  className="object-cover opacity-80"
                  sizes="16px"
                />
                {/* Spindle hole */}
                <div className="w-1.5 h-1.5 rounded-full bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col min-w-0 max-w-[120px] md:max-w-[160px] ml-1">
          <span className="text-white text-sm font-semibold hover:underline cursor-pointer truncate">
            {trackName}
          </span>
          <span className="text-xs text-muted-foreground hover:underline cursor-pointer truncate">
            {trackSubtext}
          </span>
        </div>
        <Heart 
          className={`w-4 h-4 cursor-pointer transition-colors ml-2 hidden sm:block ${isLiked ? 'text-primary fill-primary' : 'text-muted-foreground hover:text-white'}`}
          onClick={() => setIsLiked(!isLiked)} 
        />
      </div>

      {/* Center: Playback Controls */}
      <div className="flex flex-col items-center max-w-[40%] w-full">
        <div className="flex items-center gap-6 mb-2">
          <Shuffle className="w-4 h-4 text-muted-foreground hover:text-white cursor-pointer hidden sm:block" />
          <SkipBack className="w-5 h-5 text-muted-foreground hover:text-white cursor-pointer" />
          {isPlaying ? (
            <PauseCircle className="w-8 h-8 text-white hover:scale-105 transition-transform cursor-pointer" onClick={() => setIsPlaying(false)} />
          ) : (
            <PlayCircle className="w-8 h-8 text-white hover:scale-105 transition-transform cursor-pointer" onClick={() => setIsPlaying(true)} />
          )}
          <SkipForward className="w-5 h-5 text-muted-foreground hover:text-white cursor-pointer" />
          <Repeat className="w-4 h-4 text-muted-foreground hover:text-white cursor-pointer hidden sm:block" />
        </div>
        <div className="flex items-center gap-2 w-full text-xs text-muted-foreground font-mono">
          <span>0:00</span>
          <div className="h-1 bg-[#4d4d4d] rounded-full w-full flex-1 relative group cursor-pointer">
            <div 
              className="h-full bg-white group-hover:bg-primary rounded-full relative"
              style={{ width: `${Math.max(0, progress)}%` }}
            >
              <div className="w-3 h-3 bg-white rounded-full absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 shadow"></div>
            </div>
          </div>
          <span>{trackDuration}</span>
        </div>
      </div>

      {/* Right: Volume & Extra Controls */}
      <div className="flex items-center justify-end gap-3 w-[30%] text-muted-foreground hidden md:flex">
        <Mic2 className="w-4 h-4 hover:text-white cursor-pointer" />
        <ListMusic className="w-4 h-4 hover:text-white cursor-pointer" />
        <MonitorSpeaker className="w-4 h-4 hover:text-white cursor-pointer" />
        <div className="flex items-center gap-2 w-24">
          <Volume2 className="w-4 h-4 hover:text-white cursor-pointer" />
          <div className="h-1 bg-[#4d4d4d] rounded-full w-full relative group cursor-pointer">
            <div className="h-full bg-white group-hover:bg-primary rounded-full w-2/3 relative">
               <div className="w-3 h-3 bg-white rounded-full absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 shadow"></div>
            </div>
          </div>
        </div>
        <Maximize2 className="w-4 h-4 hover:text-white cursor-pointer" />
      </div>
    </div>
  );
}
