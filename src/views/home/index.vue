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
    <div class="wm-home">
        <GameCard
            v-for="game in GAME_ROUTES"
            :game="game"
        />
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.wm-home {
    display: flex;
    flex-direction: column;
    gap: vars.$space--half;
}
</style>
