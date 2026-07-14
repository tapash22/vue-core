import type { InternalAxiosRequestConfig } from "axios";

// Extend Axios configuration options to accept custom metadata flags
export interface CustomRequestConfig extends InternalAxiosRequestConfig {
  /** Set to true if you want to bypass the server API and fetch a local public mock JSON file instead */
  isLocalJson?: boolean;
  /** Path to the local JSON file relative to public directory (e.g., '/mock/sales.json') */
  localJsonPath?: string;
  /** Set to false if you want to catch errors manually in your component instead of showing global toast alerts */
  showGlobalAlert?: boolean;
}

// Custom structure for standardized backend responses
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}
