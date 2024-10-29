<script>
export default {
    name: 'GameCard',
};
</script>

<script setup>
defineProps({
    name: {
        type: String,
        required: true,
    },
    linkTo: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <router-link
        class="wm-game-card"
        :to="linkTo"
    >
        {{ name }}
    </router-link>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as mixins;

.wm-game-card {
    padding: vars.$space;
    border: 1px solid vars.$tertiary-color;
    border-radius: vars.$base-border-radius;
    font-size: 20px;
    color: vars.$white;
    text-align: center;
    transition: vars.$base-transition;

    @include mixins.hover() {
        background-color: vars.$tertiary-color;
    }
}
</style>
