<script>
export default {
    name: 'Header',
};
</script>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { ROUTES_NAMES, GAME_ROUTES } from '@/enums/routesEnums';
import ButtonUI from '@/components/UI/ButtonUI';
import ArrowIcon from '@/components/icons/ArrowIcon';

const router = useRouter();
const route = useRoute();

/*-----------------------------------------------------------------
                           General state
-----------------------------------------------------------------*/

const navigateHome = () => router.push({ name: ROUTES_NAMES.HOME });

const currentGameTitle = computed(() => {
    if (route.name === ROUTES_NAMES.NOT_FOUND) {
        return '404';
    }

    const { title } = GAME_ROUTES.find(({ name }) => route.name === name) || {};

    return title || null;
});
</script>

<template>
    <header class="wm-header">
        <transition
            name="slide-down"
            type="transition"
            mode="out-in"
        >
            <template v-if="currentGameTitle !== null">
                <div
                    :key="`game title: ${currentGameTitle}`"
                    class="wm-header__wrapper"
                >
                    <ButtonUI @click="navigateHome">
                        <ArrowIcon
                            direction="left"
                            :width="18"
                            :height="18"
                        />

                        PGW
                    </ButtonUI>

                    <h2>{{ currentGameTitle }}</h2>
                </div>
            </template>

            <h2 v-else>Pure Gaming World</h2>
        </transition>
    </header>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.wm-header {
    margin-bottom: vars.$space;

    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: vars.$space;

        > .wm-btn {
            padding-left: vars.$space--half;
            font-weight: 700;
        }
    }

    > h2 {
        padding: vars.$space;
        background-color: vars.$secondary-color;
        border-radius: 100px;
        text-align: center;
    }
}
</style>
