<script>
export default {
    name: 'PageViewSkeleton',
};
</script>

<script setup>
import { defineAsyncComponent, h } from 'vue';
import { useRoute } from 'vue-router';

import Spinner from '@/components/Spinner';

defineProps({
    viewPath: {
        type: String,
        required: true,
    },
});

const route = useRoute();

/*-----------------------------------------------------------------
                          Component state
-----------------------------------------------------------------*/

const viewComponents = import.meta.glob('@/views/**/*.vue');

/**
 * @param viewPath {String}
 *
 * @return {Object}
 */
const getViewComponent = (viewPath) => {
    const importCallback = viewComponents[`/src/views/${viewPath}/index.vue`];

    if (!importCallback) {
        throw new Error(`Unknown view path: ${viewPath}`);
    }

    return defineAsyncComponent({
        loader: importCallback,
        loadingComponent: h(Spinner, { isAbsolute: true }),
        delay: 250,
    });
};
</script>

<template>
    <transition
        appear
        name="slide-down"
        type="transition"
        mode="out-in"
    >
        <component
            :is="getViewComponent(viewPath)"
            v-bind="route.params"
        />
    </transition>
</template>

<style lang="scss" scoped>
.wm-spinner--absolute {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
