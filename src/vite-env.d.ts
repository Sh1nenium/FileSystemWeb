/// <reference types="vite/client" />

export interface ImportMetaEnv {
  VITE_BACKEND_URL: 'string';
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}