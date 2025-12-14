/**
 * Application Configuration
 * Configure your app using the framework
 */

import type { AppConfig } from "../framework";
import { 
  TodayIcon, 
  MomentsIcon, 
  SpaceIcon,
  MeIcon
} from "../components/icons";

// Import your pages
import { TodayPage } from "../pages/TodayPage";
import { MomentsPage } from "../pages/MomentsPage";
import { SpacePage } from "../pages/SpacePage";
import { MePage } from "../pages/MePage";

export const appConfig: AppConfig = {
  name: "Gift App",
  version: "1.0.0",
  
  storage: {
    key: "gift_app_v1",
    adapter: {
      get: async (key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      },
      set: async (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
      },
      remove: async (key) => {
        localStorage.removeItem(key);
      },
      clear: async () => {
        localStorage.clear();
      },
    },
  },
  
  theme: {
    default: {
      accent: "pink",
      reduceMotion: false,
      darkMode: false,
    },
    colors: ["pink", "orange", "blue", "purple", "green"],
  },
  
  routes: [
    {
      path: "/",
      label: "Today",
      icon: TodayIcon,
      component: TodayPage,
    },
    {
      path: "/moments",
      label: "Moment",
      icon: MomentsIcon,
      component: MomentsPage,
    },
    {
      path: "/space",
      label: "Space",
      icon: SpaceIcon,
      component: SpacePage,
    },
    {
      path: "/me",
      label: "Me",
      icon: MeIcon,
      component: MePage,
    },
  ],
  
  features: {
    analytics: false,
    notifications: false,
    offline: true,
  },
};