/**
 * Room Page
 * Display unlocked room items
 */

import React from "react";
import { Shell, PageHeader, Card, Badge } from "../framework";
import { FlameIcon } from "../components/icons/FlameIcon";
import { useGiftApp } from "../hooks/useGiftApp";

export function RoomPage() {
  const { state } = useGiftApp();

  return (
    <Shell>
      <PageHeader
        subtitle="Gift Room"
        title="Your space grows."
        badges={
          <Badge variant="warning">
            <FlameIcon size={14} variant="intense" animated />
            Warmth {state.warmth}
          </Badge>
        }
      />

      <div className="mt-6 space-y-4">
        <Card>
          <div className="font-semibold">Room unlocks</div>
          <div className="text-black/60 text-sm mt-1">
            Every 20 warmth points unlocks a new item for your room.
          </div>
          <div className="mt-4 text-center text-black/60">
            Coming soon: Visual room with unlockable items
          </div>
        </Card>
      </div>
    </Shell>
  );
}