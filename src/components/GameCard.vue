<script>
export default {
    name: 'GameCard',
};
</script>

<script setup>
import { useRouter } from 'vue-router';

import ButtonUI from '@/components/UI/ButtonUI';
import LaunchIcon from '@/components/icons/LaunchIcon';

defineProps({
    game: {
        type: Object,
        required: true,
    },
});

const router = useRouter();
</script>

<template>
    <div class="wm-game-card">
        <span>
            {{ game.title }}
        </span>

        <ButtonUI @click="router.push({ name: game.name })">
            Launch

            <LaunchIcon
                :width="18"
                :height="18"
            />
        </ButtonUI>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as mixins;

.wm-game-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: vars.$space--half;
    padding-left: vars.$space;
    background-color: rgba(vars.$tertiary-color, 0.5);
    border: 1px solid vars.$primary-color;
    border-radius: vars.$base-border-radius;

    > span {
        color: vars.$white;
        font-size: 18px;
        line-height: 1;
    }

    > .wm-btn {
        gap: vars.$space;
        font-size: 15px;
    }
}
</style>
