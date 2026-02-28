"use client";

import dynamic from "next/dynamic";

const MouseFollower = dynamic(
  () => import("@/components/3d/mouse-follower").then((mod) => mod.MouseFollower),
  { ssr: false }
);

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MouseFollower />
      {children}
    </>
  );
}
