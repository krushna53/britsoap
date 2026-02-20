"use client";

import { useState } from "react";

export default function VideoModal({ videoId }: { videoId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <div
        onClick={() => setOpen(true)}
        className="relative cursor-pointer rounded overflow-hidden group"
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt="Video"
          className="w-full h-56 object-cover"
        />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center">
            ▶
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
