"use client";

export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-black/10 rounded-2xl shadow-inner shadow-black/30 p-3 flex flex-col gap-3">
      {/* Title */}
      <div className="h-6 bg-[var(--dark)]/40 rounded w-3/4"></div>

      {/* Tags row */}
      <div className="flex flex-row gap-3">
        <div className="h-5 w-16 bg-[var(--dark)]/30 rounded-2xl"></div>
        <div className="h-5 w-12 bg-[var(--dark)]/30 rounded-2xl"></div>
        <div className="h-5 w-20 bg-[var(--dark)]/30 rounded-2xl"></div>
      </div>

      {/* Divider */}
      <div className="border-b border-[var(--accent-light)]/30"></div>

      {/* Description */}
      <div className="h-4 bg-[var(--dark)]/30 rounded w-full"></div>
      <div className="h-4 bg-[var(--dark)]/30 rounded w-5/6"></div>

      {/* Links/buttons row */}
      <div className="flex flex-row gap-3 mt-2">
        <div className="h-8 w-20 bg-[var(--dark)]/30 rounded-full"></div>
        <div className="h-8 w-24 bg-[var(--dark)]/30 rounded-full"></div>
      </div>
    </div>
  );
}
