/**
 * Settings Page
 * App configuration and preferences
 */

import React from "react";
import { Shell, PageHeader, Card, Button, Checkbox } from "../framework";
import { useTheme } from "../framework/hooks";
import { useGiftApp } from "../hooks/useGiftApp";
import type { ThemeColor } from "../framework";

const COLOR_OPTIONS: Array<{ value: ThemeColor; label: string }> = [
  { value: "pink", label: "Pink" },
  { value: "orange", label: "Orange" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "green", label: "Green" },
];

export function SettingsPage() {
  const { resetAll } = useGiftApp();
  const { theme, setAccent, setReduceMotion } = useTheme({
    accent: "pink",
    reduceMotion: false,
  });

  return (
    <Shell>
      <PageHeader subtitle="Settings" title="Make it yours." />

      <div className="mt-6 space-y-4">
        {/* Theme */}
        <Card>
          <div className="font-semibold">Theme color</div>
          <div className="text-black/60 text-sm mt-1">Choose your accent color</div>
          <div className="mt-4 flex gap-2 flex-wrap">
            {COLOR_OPTIONS.map((color) => (
              <Button
                key={color.value}
                variant={theme.accent === color.value ? "primary" : "secondary"}
                size="sm"
                onClick={() => setAccent(color.value)}
              >
                {color.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Accessibility */}
        <Card>
          <div className="font-semibold">Accessibility</div>
          <div className="text-black/60 text-sm mt-1">Customize your experience</div>
          <div className="mt-4">
            <Checkbox
              checked={theme.reduceMotion}
              onChange={setReduceMotion}
              label="Reduce animations"
            />
          </div>
        </Card>

        {/* Danger zone */}
        <Card>
          <div className="font-semibold">Danger zone</div>
          <div className="text-black/60 text-sm mt-1">
            Reset all data (this cannot be undone)
          </div>
          <div className="mt-4">
            <Button
              variant="danger"
              onClick={() => {
                if (window.confirm("Are you sure? This will delete all your data.")) {
                  resetAll();
                }
              }}
            >
              Reset all data
            </Button>
          </div>
        </Card>
      </div>
    </Shell>
  );
}
