<script>
export default {
    name: 'HomeView',
};
</script>

<script setup>
import { ROUTES_NAMES } from '@/enums/routesEnums';
import GameCard from '@/components/GameCard';
</script>

<template>
    <transition
        appear
        name="fade"
        type="transition"
    >
        <div
            class="wm-home"
            style="transition-delay: 300ms"
        >
            <GameCard
                name="Tic Tac Toe"
                :link-to="{ name: ROUTES_NAMES.TIC_TAC_TOE }"
            />
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.wm-home {
    display: flex;
    flex-direction: column-reverse;
    gap: vars.$space;
    margin-top: vars.$space--half;
}
</style>
