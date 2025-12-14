/**
 * Icon Showcase Page
 * Display all heart and flame icon variants
 */

import React from "react";
import { Shell, PageHeader, Card, Grid, Badge, Divider } from "../framework";
import { HeartIcon } from "../components/icons/HeartIcon";
import { FlameIcon } from "../components/icons/FlameIcon";
import { DopamineButton } from "../components/DopamineButton";

export function IconShowcase() {
  return (
    <Shell>
      <PageHeader
        subtitle="Icon Gallery"
        title="Hearts & Flames"
      />

      <div className="mt-6 space-y-6">
        {/* Heart Icons */}
        <Card>
          <h2 className="text-2xl font-black uppercase mb-4">Heart Icons ❤️</h2>
          
          <Grid cols={2} gap={4}>
            <div className="text-center p-6 bg-white/50 rounded-2xl border-[3px] border-black/10">
              <HeartIcon size={80} variant="default" animated />
              <div className="mt-3 font-bold uppercase text-sm">Default</div>
              <div className="text-xs text-black/60">Pink → Coral</div>
            </div>

            <div className="text-center p-6 bg-white/50 rounded-2xl border-[3px] border-black/10">
              <HeartIcon size={80} variant="fire" animated />
              <div className="mt-3 font-bold uppercase text-sm">Fire</div>
              <div className="text-xs text-black/60">Red → Orange → Yellow</div>
            </div>

            <div className="text-center p-6 bg-white/50 rounded-2xl border-[3px] border-black/10">
              <HeartIcon size={80} variant="sparkle" animated />
              <div className="mt-3 font-bold uppercase text-sm">Sparkle</div>
              <div className="text-xs text-black/60">With Stars</div>
            </div>

            <div className="text-center p-6 bg-black/80 rounded-2xl border-[3px] border-[var(--fire-yellow)]">
              <HeartIcon size={80} variant="glow" animated />
              <div className="mt-3 font-bold uppercase text-sm text-white">Glow</div>
              <div className="text-xs text-white/60">Radial Gradient</div>
            </div>
          </Grid>
        </Card>

        {/* Flame Icons */}
        <Card>
          <h2 className="text-2xl font-black uppercase mb-4">Flame Icons 🔥</h2>
          
          <Grid cols={2} gap={4}>
            <div className="text-center p-6 bg-white/50 rounded-2xl border-[3px] border-black/10">
              <FlameIcon size={80} variant="default" animated />
              <div className="mt-3 font-bold uppercase text-sm">Default</div>
              <div className="text-xs text-black/60">Yellow → Red</div>
            </div>

            <div className="text-center p-6 bg-black/80 rounded-2xl border-[3px] border-white">
              <FlameIcon size={80} variant="intense" animated />
              <div className="mt-3 font-bold uppercase text-sm text-white">Intense</div>
              <div className="text-xs text-white/60">White Core</div>
            </div>

            <div className="text-center p-6 bg-white/50 rounded-2xl border-[3px] border-black/10">
              <FlameIcon size={80} variant="soft" animated />
              <div className="mt-3 font-bold uppercase text-sm">Soft</div>
              <div className="text-xs text-black/60">Sunshine → Coral</div>
            </div>

            <div className="text-center p-6 bg-black/80 rounded-2xl border-[3px] border-[var(--fire-red)]">
              <FlameIcon size={80} variant="multi" animated />
              <div className="mt-3 font-bold uppercase text-sm text-white">Multi</div>
              <div className="text-xs text-white/60">With Sparkles</div>
            </div>
          </Grid>
        </Card>

        {/* Icon Sizes */}
        <Card>
          <h2 className="text-2xl font-black uppercase mb-4">Size Variants</h2>
          
          <div className="flex items-end justify-around gap-4 p-6 bg-white/50 rounded-2xl border-[3px] border-black/10">
            <div className="text-center">
              <HeartIcon size={16} variant="fire" animated />
              <div className="mt-2 text-xs font-bold">16px</div>
            </div>
            <div className="text-center">
              <HeartIcon size={24} variant="fire" animated />
              <div className="mt-2 text-xs font-bold">24px</div>
            </div>
            <div className="text-center">
              <HeartIcon size={32} variant="fire" animated />
              <div className="mt-2 text-xs font-bold">32px</div>
            </div>
            <div className="text-center">
              <HeartIcon size={48} variant="fire" animated />
              <div className="mt-2 text-xs font-bold">48px</div>
            </div>
            <div className="text-center">
              <HeartIcon size={64} variant="fire" animated />
              <div className="mt-2 text-xs font-bold">64px</div>
            </div>
          </div>

          <Divider />

          <div className="flex items-end justify-around gap-4 p-6 bg-white/50 rounded-2xl border-[3px] border-black/10">
            <div className="text-center">
              <FlameIcon size={16} variant="intense" animated />
              <div className="mt-2 text-xs font-bold">16px</div>
            </div>
            <div className="text-center">
              <FlameIcon size={24} variant="intense" animated />
              <div className="mt-2 text-xs font-bold">24px</div>
            </div>
            <div className="text-center">
              <FlameIcon size={32} variant="intense" animated />
              <div className="mt-2 text-xs font-bold">32px</div>
            </div>
            <div className="text-center">
              <FlameIcon size={48} variant="intense" animated />
              <div className="mt-2 text-xs font-bold">48px</div>
            </div>
            <div className="text-center">
              <FlameIcon size={64} variant="intense" animated />
              <div className="mt-2 text-xs font-bold">64px</div>
            </div>
          </div>
        </Card>

        {/* Dopamine Buttons */}
        <Card>
          <h2 className="text-2xl font-black uppercase mb-4">Dopamine Buttons</h2>
          
          <div className="space-y-4">
            <DopamineButton variant="heart" size="lg" fullWidth>
              Show Love
            </DopamineButton>

            <DopamineButton variant="fire" size="lg" fullWidth>
              Light the Fire
            </DopamineButton>

            <DopamineButton variant="heart-fire" size="lg" fullWidth>
              Burning Heart
            </DopamineButton>
          </div>

          <Divider />

          <div className="grid grid-cols-3 gap-3">
            <DopamineButton variant="heart" size="sm">
              Small
            </DopamineButton>
            <DopamineButton variant="fire" size="md">
              Medium
            </DopamineButton>
            <DopamineButton variant="heart-fire" size="lg">
              Large
            </DopamineButton>
          </div>
        </Card>

        {/* Badges with Icons */}
        <Card>
          <h2 className="text-2xl font-black uppercase mb-4">Badges with Icons</h2>
          
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">
              <HeartIcon size={14} variant="default" animated />
              100 Hearts
            </Badge>

            <Badge variant="warning">
              <FlameIcon size={14} variant="intense" animated />
              Warmth 250
            </Badge>

            <Badge variant="danger">
              <HeartIcon size={14} variant="fire" animated />
              On Fire!
            </Badge>

            <Badge variant="rainbow" sparkle>
              <HeartIcon size={14} variant="sparkle" animated />
              Special
            </Badge>

            <Badge variant="info">
              <FlameIcon size={14} variant="multi" animated />
              Achievement
            </Badge>
          </div>
        </Card>

        {/* Usage Examples */}
        <Card variant="glow">
          <h2 className="text-2xl font-black uppercase mb-4">💡 Usage Tips</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <HeartIcon size={20} variant="fire" animated />
              <div>
                <div className="font-bold">Warmth/Progress Indicators</div>
                <div className="text-black/70">Use fire hearts for progress and achievements</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FlameIcon size={20} variant="intense" animated />
              <div>
                <div className="font-bold">Streak/Active States</div>
                <div className="text-black/70">Use flames to show active streaks and energy</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <HeartIcon size={20} variant="sparkle" animated />
              <div>
                <div className="font-bold">Special Moments</div>
                <div className="text-black/70">Use sparkle hearts for celebrations</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FlameIcon size={20} variant="multi" animated />
              <div>
                <div className="font-bold">High Energy Actions</div>
                <div className="text-black/70">Use multi-flame for maximum impact buttons</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Shell>
  );
}
