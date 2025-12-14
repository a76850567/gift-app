/**
 * Framework Entry Point
 * Export all framework modules
 */

// Core
export { AppProvider, useAppContext } from "./core/AppProvider";
export { Router } from "./core/Router";

// Types
export type {
  AppConfig,
  Route,
  Theme,
  ThemeColor,
  BaseEntity,
  EntityStatus,
  StorageAdapter,
  AsyncState,
  DeepPartial,
} from "./types";

// Utils
export {
  generateId,
  getDayKey,
  getYesterdayKey,
  formatDate,
  clamp,
  randomInt,
  percentage,
  truncate,
  capitalize,
  slugify,
  groupBy,
  sortBy,
  uniqueBy,
  deepClone,
  isEmpty,
  localStorage,
  classNames,
  cn,
  readFileAsDataURL,
  downloadJSON,
  isEmail,
  isURL,
  debounce,
  throttle,
} from "./utils";

// Hooks
export {
  useLocalStorage,
  useTheme,
  useDebounce,
  useMediaQuery,
  useOnClickOutside,
} from "./hooks";

// UI Components
export {
  Card,
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Badge,
  Divider,
  EmptyState,
  Loading,
  Modal,
  Container,
  Grid,
} from "./components/ui";

// Layout Components
export {
  Shell,
  PageHeader,
  BottomNav,
  TopNav,
  Section,
  SidebarLayout,
  Stack,
  Spacer,
} from "./components/layout";
