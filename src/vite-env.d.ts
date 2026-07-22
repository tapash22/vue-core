// src/types/env.d.ts
import '@vue/runtime-core';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    [key: string]: Component;
  }
}
