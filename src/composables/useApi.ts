import { useLocalStorage } from "@vueuse/core";
import { useAxios, type UseAxiosOptions } from "@vueuse/integrations/useAxios";
import axios, {
  type AxiosProgressEvent,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type ApiOptions = UseAxiosOptions;

const host = import.meta.env.VITE_BACKEND_URL;
const loginUrl = "/authenticate";

const token = useLocalStorage("token", "");

export function useApi<T>(
  url: string,
  method: ApiMethod,
  options?: ApiOptions,
  onUploadProgress?: (event: AxiosProgressEvent) => void,
) {
  return useAxios<T>(
    url,
    {
      method,
      baseURL: host,
      headers: {
        ...(token.value && url !== loginUrl
          ? { Authorization: `Bearer ${token.value}` }
          : {}),
      },
      onUploadProgress,
    },
    { immediate: false, ...options },
  );
}

function apiFactory(baseUrl: string) {
  return function <T>(
    url: string,
    method: ApiMethod,
    options?: ApiOptions,
    uri?: string,
    Orgid?: number,
    onUploadProgress?: (event: AxiosProgressEvent) => void,
  ) {
    const axiosApiInstance = axios.create({
      baseURL: baseUrl,
    });

    axiosApiInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers = config.headers || {};

        if (token.value && url !== loginUrl) {
          config.headers.Authorization = `Bearer ${token.value}`;
        }
        if (url === loginUrl) {
          config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if (uri) config.headers["uri"] = uri;
        if (Orgid) config.headers["Orgid"] = String(Orgid);

        if (config.method?.toLowerCase() === "get") {
          const cacheKey = `etag_${config.baseURL}${config.url}`;
          const cachedEtag = localStorage.getItem(cacheKey);

          if (cachedEtag) {
            config.headers["If-None-Match"] = cachedEtag;
          }
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    axiosApiInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.config.method?.toLowerCase() === "get") {
          const headers = response.headers;
          const etag = headers["etag"] || headers["ETag"] || headers["Etag"];

          if (etag) {
            const cacheKey = `etag_${response.config.baseURL}${response.config.url}`;
            const dataKey = `data_${response.config.baseURL}${response.config.url}`;

            localStorage.setItem(cacheKey, etag);
            localStorage.setItem(dataKey, JSON.stringify(response.data));
          }
        }
        return response;
      },
      (error) => {
        if (
          error.response &&
          error.response.status === 304 &&
          error.config.method?.toLowerCase() === "get"
        ) {
          const dataKey = `data_${error.config.baseURL}${error.config.url}`;
          const cachedData = localStorage.getItem(dataKey);

          if (cachedData) {
            return Promise.resolve({
              ...error.response,
              status: 200,
              data: JSON.parse(cachedData),
            });
          }
        }
        return Promise.reject(error);
      },
    );

    return useAxios<T>(url, { method, onUploadProgress }, axiosApiInstance, {
      immediate: false,
      abortPrevious: false,
      ...options,
    });
  };
}

const baseApiUrl = import.meta.env.VITE_SALES_API_URL;
export const useSalesApi = apiFactory(baseApiUrl);

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function useGetPosts(options?: ApiOptions) {
  return useSalesApi<Post[]>("/posts", "GET", options);
}
