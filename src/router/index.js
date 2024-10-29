import { createRouter, createWebHistory } from 'vue-router';

import { ROUTES_NAMES } from '@/enums/routesEnums';
import PageViewSkeleton from '@/components/skeletons/PageViewSkeleton';

const routes = [
    {
        path: '/',
        name: ROUTES_NAMES.HOME,
        component: PageViewSkeleton,
        props: { viewPath: 'home' },
    },

    {
        path: '/tic-tac-toe',
        name: ROUTES_NAMES.TIC_TAC_TOE,
        component: PageViewSkeleton,
        props: { viewPath: 'tic-tac-toe' },
    },

    {
        path: '/:pathMatch(.*)*',
        name: ROUTES_NAMES.NOT_FOUND,
        component: PageViewSkeleton,
        props: { viewPath: 'not-found' },
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
