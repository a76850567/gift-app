/**
 * Framework Core Types
 * Define all shared types for the app framework
 */

// ==================== Storage Types ====================

export type StorageAdapter = {
  get: <T>(key: string) => Promise<T | null>;
  set: <T>(key: string, value: T) => Promise<void>;
  remove: (key: string) => Promise<void>;
  clear: () => Promise<void>;
};

// ==================== Theme Types ====================

export type ThemeColor = "pink" | "orange" | "blue" | "purple" | "green";

export type Theme = {
  accent: ThemeColor;
  reduceMotion: boolean;
  darkMode?: boolean;
};

// ==================== Navigation Types ====================

export type Route = {
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  component: React.ComponentType<any>;
};

// ==================== App Config Types ====================

export type AppConfig = {
  name: string;
  version: string;
  storage: {
    key: string;
    adapter: StorageAdapter;
  };
  theme: {
    default: Theme;
    colors: ThemeColor[];
  };
  routes: Route[];
  features?: {
    analytics?: boolean;
    notifications?: boolean;
    offline?: boolean;
  };
};

// ==================== Common Entity Types ====================

export type BaseEntity = {
  id: string;
  createdAt: number;
  updatedAt: number;
};

export type EntityStatus = "active" | "inactive" | "archived";

// ==================== Utility Types ====================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};
