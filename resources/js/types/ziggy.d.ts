import type { RouteName } from 'ziggy-js';

// Global Ziggy runtime config injected by server or bundled file
declare const Ziggy: any;

// Global route() helper provided at runtime in app.tsx
declare function route(
  name: RouteName,
  params?: Record<string, any> | any[] | string | number | null,
  absolute?: boolean
): string;

declare global {
  interface Window {
    route: typeof route;
    Ziggy?: any;
  }
}

export {};
