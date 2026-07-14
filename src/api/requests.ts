import { useAxios, type UseAxiosOptions } from "@vueuse/integrations/useAxios";
import type { AxiosInstance, AxiosProgressEvent } from "axios";
import type { ApiResponse, CustomRequestConfig } from "./client";
import {
  baseInstance,
  cpsInstance,
  erpNInstance,
  salesInstance,
  scmInstance,
} from "./client";

export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type ApiOptions = UseAxiosOptions;

// Helper to type-cast options safely
interface ExtraConfigParams {
  uri?: string;
  Orgid?: number;
  isLocalJson?: boolean;
  localJsonPath?: string;
  showGlobalAlert?: boolean;
}

// ============================================================================
// Composition API Hooks (useAxios wrappers for UI Components)
// ============================================================================
function apiHookFactory(axiosInstance: AxiosInstance) {
  return function <T>(
    url: string,
    method: ApiMethod,
    options?: ApiOptions & ExtraConfigParams,
    onUploadProgress?: (event: AxiosProgressEvent) => void,
  ) {
    const {
      uri,
      Orgid,
      isLocalJson,
      localJsonPath,
      showGlobalAlert,
      ...useAxiosOpts
    } = options || {};

    return useAxios<T>(
      url,
      {
        method,
        uri,
        Orgid,
        isLocalJson,
        localJsonPath,
        showGlobalAlert,
        onUploadProgress,
      } as any,
      axiosInstance,
      { immediate: false, ...useAxiosOpts },
    );
  };
}

export const useBaseApi = apiHookFactory(baseInstance);
export const useScmApi = apiHookFactory(scmInstance);
export const useErpNApi = apiHookFactory(erpNInstance);
export const useCpsApi = apiHookFactory(cpsInstance);
export const useSalesApi = apiHookFactory(salesInstance);

// ============================================================================
// Promise-based Requests (for Pinia stores or outside component setups)
// ============================================================================
function promiseRequestFactory(axiosInstance: AxiosInstance) {
  return async function <T>(
    url: string,
    method: ApiMethod,
    data?: any,
    config?: Partial<CustomRequestConfig> & ExtraConfigParams,
  ): Promise<ApiResponse<T>> {
    const response = await axiosInstance.request<ApiResponse<T>>({
      url,
      method,
      data,
      ...config,
    });
    return response.data;
  };
}

export const api = {
  base: promiseRequestFactory(baseInstance),
  scm: promiseRequestFactory(scmInstance),
  erp: promiseRequestFactory(erpNInstance),
  cps: promiseRequestFactory(cpsInstance),
  sales: promiseRequestFactory(salesInstance),
};
