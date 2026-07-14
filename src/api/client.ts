import axios from "axios";
// ✅ SEPARATED TYPE IMPORTS: This completely prevents transpiler syntax hiccups!
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Extend Axios configuration options to accept custom metadata flags safely
export interface CustomRequestConfig extends InternalAxiosRequestConfig {
  isLocalJson?: boolean;
  localJsonPath?: string;
  showGlobalAlert?: boolean;
  uri?: string;
  Orgid?: number;
}

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

const loginUrl = "/authenticate";

/**
 * Attaches request and response interceptors to an Axios instance.
 * Keeps interceptor logic completely decoupled from Vue reactivity to prevent memory leaks.
 */
function configureInterceptors(instance: AxiosInstance) {
  // 1. Request Interceptor
  instance.interceptors.request.use(
    (config) => {
      const customConfig = config as CustomRequestConfig;

      // A. Local JSON Overrides
      if (customConfig.isLocalJson === true && customConfig.localJsonPath) {
        customConfig.url = customConfig.localJsonPath;
        customConfig.method = "GET";
        customConfig.baseURL = "";
        return customConfig;
      }

      // B. Inject Auth Bearer Token safely
      const token = localStorage.getItem("token")?.replace(/"/g, "") || "";
      if (token && customConfig.url !== loginUrl) {
        customConfig.headers.Authorization = `Bearer ${token}`;
      }

      // C. Set Content-Type rules for authenticating routes
      if (customConfig.url === loginUrl) {
        customConfig.headers["Content-Type"] =
          "application/x-www-form-urlencoded";
      }

      // D. Attach dynamic custom headers if passed in config options
      if (customConfig.uri) customConfig.headers.uri = customConfig.uri;
      if (customConfig.Orgid) customConfig.headers.Orgid = customConfig.Orgid;

      // E. ETag Check for GET Requests
      if (customConfig.method?.toLowerCase() === "get") {
        const cacheKey = `etag_${customConfig.baseURL}${customConfig.url}`;
        const cachedEtag = localStorage.getItem(cacheKey)?.replace(/"/g, "");
        if (cachedEtag) {
          customConfig.headers["If-None-Match"] = cachedEtag;
        }
      }

      return customConfig;
    },
    (error: unknown) =>
      Promise.reject(error instanceof Error ? error : new Error(String(error))),
  );

  // 2. Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const customConfig = response.config as CustomRequestConfig;

      // Save ETag headers and response data for valid GET requests
      if (customConfig.method?.toLowerCase() === "get") {
        const etag =
          response.headers["etag"] ||
          response.headers["ETag"] ||
          response.headers["Etag"];
        if (etag) {
          const cacheKey = `etag_${customConfig.baseURL}${customConfig.url}`;
          const dataKey = `data_${customConfig.baseURL}${customConfig.url}`;

          localStorage.setItem(cacheKey, JSON.stringify(etag));
          localStorage.setItem(dataKey, JSON.stringify(response.data));
        }
      }
      return response;
    },
    (error: any) => {
      const customConfig = error.config as CustomRequestConfig;
      const showGlobalAlert = customConfig?.showGlobalAlert ?? true;

      // Catch HTTP 304 Not Modified & serve offline cache
      if (
        error.response &&
        error.response.status === 304 &&
        customConfig.method?.toLowerCase() === "get"
      ) {
        const dataKey = `data_${customConfig.baseURL}${customConfig.url}`;
        const cachedRaw = localStorage.getItem(dataKey);

        if (cachedRaw) {
          try {
            return Promise.resolve({
              ...error.response,
              status: 200,
              data: JSON.parse(cachedRaw),
            });
          } catch (e) {
            console.error("Failed to parse cached ETag JSON data", e);
          }
        }
      }

      // Global Server/Authorization Error Handler
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        if (showGlobalAlert) {
          console.error(
            `[API Error ${status}]:`,
            error.response.data || error.message,
          );
        }
      } else if (showGlobalAlert) {
        console.error(
          "[Network Error]: Server could not be reached.",
          error.message,
        );
      }

      return Promise.reject(
        error instanceof Error ? error : new Error(String(error)),
      );
    },
  );
}

// Helper to instantiate singleton instances once globally
const createBaseInstance = (baseURL: string) => {
  const instance = axios.create({ baseURL, timeout: 15000 });
  configureInterceptors(instance);
  return instance;
};

// Dedicated domain endpoints with explicit operational fallbacks to prevent relative local route leaks
export const baseInstance = createBaseInstance(
  import.meta.env.VITE_SALES_API_URL || "https://jsonplaceholder.typicode.com",
);
export const scmInstance = createBaseInstance(
  import.meta.env.VITE_SCM_API_URL || "https://jsonplaceholder.typicode.com",
);
export const erpNInstance = createBaseInstance(
  import.meta.env.VITE_ERPN_API_URL || "https://jsonplaceholder.typicode.com",
);
export const cpsInstance = createBaseInstance(
  import.meta.env.VITE_CPS_API_URL || "https://jsonplaceholder.typicode.com",
);
export const salesInstance = createBaseInstance(
  import.meta.env.VITE_SALES_API_URL || "https://jsonplaceholder.typicode.com",
);
