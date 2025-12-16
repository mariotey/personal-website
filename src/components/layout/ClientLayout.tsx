"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";
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