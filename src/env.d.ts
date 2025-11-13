/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_CONTENTSTACK_API_KEY: string;
    readonly PUBLIC_CONTENTSTACK_DELIVERY_TOKEN: string;
    readonly PUBLIC_CONTENTSTACK_PREVIEW_TOKEN?: string;
    readonly PUBLIC_CONTENTSTACK_ENVIRONMENT: string;
    readonly PUBLIC_CONTENTSTACK_REGION: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }