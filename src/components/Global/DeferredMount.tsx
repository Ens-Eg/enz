"use client";

import { useInViewMount } from "@/hooks/useInViewMount";

type DeferredMountProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  minHeight?: string;
};

export default function DeferredMount({
  children,
  fallback = null,
  rootMargin,
  minHeight = "420px",
}: DeferredMountProps) {
  const { ref, mounted } = useInViewMount(rootMargin);

  return (
    <div ref={ref} style={{ minHeight: mounted ? undefined : minHeight }}>
      {mounted ? children : fallback}
    </div>
  );
}
