"use client";

import { useRouter } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function LinkWithLoader({ href, children, className }: Props) {
  const router = useRouter();
  const { startLoading } = useLoading();

  const handleClick = () => {
    startLoading();
    router.push(href);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}
