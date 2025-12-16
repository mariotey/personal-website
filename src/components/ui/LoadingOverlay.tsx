"use client";

import { useLoading } from "@/context/LoadingContext";

export default function LoadingOverlay() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-10 w-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-sm tracking-wide">Loading…</p>
      </div>
    </div>
  );
}
