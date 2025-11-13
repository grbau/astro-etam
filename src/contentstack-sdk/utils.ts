import Contentstack from "contentstack";

const isPreview = typeof window !== 'undefined' && 
                  (window.parent !== window || 
                   window.location.search.includes('live_preview'));

export const Stack = Contentstack.Stack({
    api_key: import.meta.env.PUBLIC_CONTENTSTACK_API_KEY,
    delivery_token: isPreview && import.meta.env.PUBLIC_CONTENTSTACK_PREVIEW_TOKEN
        ? import.meta.env.PUBLIC_CONTENTSTACK_PREVIEW_TOKEN
        : import.meta.env.PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
    environment: import.meta.env.PUBLIC_CONTENTSTACK_ENVIRONMENT,
    region: import.meta.env.PUBLIC_CONTENTSTACK_REGION || "EU",
});

Stack.setCachePolicy(Contentstack.CachePolicy.IGNORE_CACHE);

// Debug (vous pouvez retirer après)
console.log('🔑 Contentstack initialisé:', {
    api_key: import.meta.env.PUBLIC_CONTENTSTACK_API_KEY?.substring(0, 8) + '...',
    mode: isPreview ? 'PREVIEW' : 'PRODUCTION',
    environment: import.meta.env.PUBLIC_CONTENTSTACK_ENVIRONMENT,
    region: import.meta.env.PUBLIC_CONTENTSTACK_REGION
});