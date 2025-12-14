/**
 * App Entry Point
 * Using the modular framework architecture
 */

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./framework";
import { BottomNav } from "./framework/components/layout";
import { appConfig } from "./config/app.config";
import { IconShowcasePage } from "./pages/IconShowcasePage";
import { CreateGoalModal } from "./components/CreateGoalModal";
import { useGiftApp } from "./hooks/useGiftApp";

export default function App() {
  const [isCreateGoalModalOpen, setIsCreateGoalModalOpen] = useState(false);
  const { addTask, state } = useGiftApp();

  const handleCreateGoal = (goal: {
    title: string;
    emoji: string;
    duration: number;
    rewardTitle: string;
    rewardDescription: string;
    rewardImageUrl: string;
    witnessIds: string[];
    note?: string;
  }) => {
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    
    addTask(goal.title, {
      note: goal.note,
      type: "recurring",
      recurringGoal: {
        totalDays: goal.duration,
        startDate: startDate,
        reward: {
          title: goal.rewardTitle,
          description: goal.rewardDescription,
          imageUrl: goal.rewardImageUrl,
        },
        witnessIds: goal.witnessIds,
      },
      completionHistory: [],
    });
  };

  return (
    <AppProvider config={appConfig}>
      <Routes>
        {appConfig.routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
        
        {/* Legacy route redirects */}
        <Route path="/room" element={<Navigate to="/space" replace />} />
        <Route path="/memory" element={<Navigate to="/moments" replace />} />
        <Route path="/settings" element={<Navigate to="/me" replace />} />
        
        {/* Hidden showcase route */}
        <Route path="/showcase" element={<IconShowcasePage />} />
        
        {/* 404 - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <BottomNav 
        routes={appConfig.routes} 
        onAddGoal={() => setIsCreateGoalModalOpen(true)}
      />
      
      <CreateGoalModal
        isOpen={isCreateGoalModalOpen}
        onClose={() => setIsCreateGoalModalOpen(false)}
        onCreateGoal={handleCreateGoal}
        friends={state.friends || []}
      />
    </AppProvider>
  );
}