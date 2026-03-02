"use client";

import dynamic from "next/dynamic";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ChatWidget } from "@/components/chat-widget";

const MouseFollower = dynamic(
  () => import("@/components/3d/mouse-follower").then((mod) => mod.MouseFollower),
  { ssr: false }
);

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <MouseFollower />
      {children}
      <ChatWidget />
    </SmoothScroll>
  );
}
