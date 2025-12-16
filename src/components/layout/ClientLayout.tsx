"use client";

import LoadingOverlay from "@/components/ui/LoadingOverlay";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingOverlay />
      {children}
    </>
  );
}