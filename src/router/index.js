import { createRouter, createWebHashHistory } from 'vue-router';

import { ROUTES_NAMES, GAME_ROUTES } from '@/enums/routesEnums';
import PageViewSkeleton from '@/components/skeletons/PageViewSkeleton';

const gameRoutes = GAME_ROUTES.map(({ name }) => {
    const path = name.replace('wm.route.', '');

    return {
        name,
        path: `/${path}`,
        component: PageViewSkeleton,
        props: { viewPath: path },
    };
});

const routes = [
    {
        path: '/',
        name: ROUTES_NAMES.HOME,
        component: PageViewSkeleton,
        props: { viewPath: 'home' },
    },

    ...gameRoutes,

    {
        path: '/:pathMatch(.*)*',
        name: ROUTES_NAMES.NOT_FOUND,
        component: PageViewSkeleton,
        props: { viewPath: 'not-found' },
    },
];

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.NODE_ENV === 'production' ? '/pgw/' : '/'),
});

export default router;
