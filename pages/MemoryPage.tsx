/**
 * Memory Page
 * AI-generated memory recaps
 */

import React from "react";
import { Shell, PageHeader, Card, Badge, EmptyState } from "../framework";
import { Images } from "lucide-react";
import { useGiftApp } from "../hooks/useGiftApp";

export function MemoryPage() {
  const { state } = useGiftApp();

  return (
    <Shell>
      <PageHeader
        subtitle="AI Memory"
        title="A gentle recap."
        badges={
          <Badge variant="info">
            <Images size={14} />
            {state.moments.length} moments
          </Badge>
        }
      />

      <div className="mt-6 space-y-4">
        <Card>
          <div className="font-semibold">Memory generation</div>
          <div className="text-black/60 text-sm mt-1">
            Collect at least 5 moments to generate an AI recap.
          </div>
        </Card>

        <Card>
          <EmptyState
            icon={<Images size={48} />}
            title="No memories yet"
            description="Keep adding moments to unlock AI-generated recaps"
          />
        </Card>
      </div>
    </Shell>
  );
}
