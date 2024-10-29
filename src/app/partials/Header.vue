<script>
export default {
    name: 'Header',
};
</script>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { ROUTES_NAMES, GAME_TITLE_BY_ROUTE } from '@/enums/routesEnums';
import ButtonUI from '@/components/UI/ButtonUI';
import ArrowIcon from '@/components/icons/ArrowIcon';

const router = useRouter();
const route = useRoute();

/*-----------------------------------------------------------------
                           General state
-----------------------------------------------------------------*/

const isAnimationActive = ref(false);

const navigateHome = () => router.push({ name: ROUTES_NAMES.HOME });

const currentGameTitle = computed(() => GAME_TITLE_BY_ROUTE[route.name] || null);
</script>

<template>
    <header
        class="wm-header"
        :class="{
            'wm-header--animated': isAnimationActive,
        }"
    >
        <transition
            name="scale"
            type="transition"
            mode="out-in"
            @before-enter="isAnimationActive = true"
            @before-leave="isAnimationActive = true"
            @after-enter="isAnimationActive = false"
            @after-leave="isAnimationActive = false"
        >
            <template v-if="currentGameTitle !== null">
                <div class="wm-header__wrapper">
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
    position: relative;
    min-height: 35px;
    padding-bottom: vars.$space--half;

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        top: auto;
        height: 0;
        background-color: vars.$tertiary-color;
        transition: vars.$base-transition;

        @media screen and (max-width: vars.$mobile-lg-breakpoint) {
            left: vars.$space * -1;
            right: vars.$space * -1;
        }
    }

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
        text-align: center;
    }

    &--animated::after {
        height: calc(100% + #{vars.$space});
    }

    &:not(&--animated) > h2 {
        position: relative;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: vars.$space * -1;
            bottom: vars.$space * -1;
            background-color: vars.$tertiary-color;
            transition: vars.$base-transition;
            z-index: -1;

            @media screen and (max-width: vars.$mobile-lg-breakpoint) {
                left: vars.$space * -1;
                right: vars.$space * -1;
            }
        }
    }
}
</style>
