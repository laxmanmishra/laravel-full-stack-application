import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { RouteName } from 'ziggy-js';
import { route } from '../../vendor/tightenco/ziggy';
import { Ziggy } from '@/ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        /* eslint-disable */
        // @ts-expect-error - provide global route() for client-side
        window.route = (name: RouteName, params?: any, absolute?: boolean) => {
            const p: any = props;
            let ziggy = p?.initialPage?.props?.ziggy ?? p?.ziggy ?? (Ziggy as any);
            if (typeof ziggy === 'function') {
                ziggy = ziggy();
            }
            if (!ziggy) {
                return route(name as any, params as any, absolute as any);
            }
            const locationHref = (ziggy as any).location || (typeof window !== 'undefined' ? window.location.href : 'http://localhost');
            return route(name as any, params as any, absolute as any, {
                ...ziggy,
                location: new URL(locationHref),
            });
        };
        /* eslint-enable */

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
