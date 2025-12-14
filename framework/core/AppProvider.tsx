/**
 * AppProvider
 * Core context provider for the framework
 */

import React, { createContext, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import type { AppConfig } from "../types";

type AppContextValue = {
  config: AppConfig;
};

const AppContext = createContext<AppContextValue | null>(null);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}

type AppProviderProps = {
  config: AppConfig;
  children: React.ReactNode;
};

export function AppProvider({ config, children }: AppProviderProps) {
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ config }}>
        {children}
      </AppContext.Provider>
    </BrowserRouter>
  );
}