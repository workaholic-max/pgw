<script>
export default {
    name: 'HomeView',
};
</script>

<script setup>
import { GAME_ROUTES } from '@/enums/routesEnums';
import GameCard from '@/components/GameCard';
</script>

<template>
    <transition
        appear
        name="slide-down"
        type="transition"
    >
        <div
            class="wm-home"
            style="transition-delay: 250ms"
        >
            <GameCard
                v-for="game in GAME_ROUTES"
                :game="game"
            />
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.wm-home {
    display: flex;
    flex-direction: column;
    gap: vars.$space--half;
}
</style>
