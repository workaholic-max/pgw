<script>
export default {
    name: 'ButtonUI',
};
</script>

<script setup>
defineProps({
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg'].includes(value),
    },
});
</script>

<template>
    <button
        type="button"
        class="wm-btn"
        :class="{
            [`wm-btn--${size}`]: true,
        }"
    >
        <slot />
    </button>
</template>

<style lang="scss">
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as mixins;

.wm-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: vars.$space--half;
    padding: vars.$space--half vars.$space;
    background-color: vars.$tertiary-color;
    border: 1px solid vars.$primary-color;
    border-radius: vars.$base-border-radius;
    line-height: 1;
    transition: vars.$base-transition;

    @include mixins.hover(true) {
        background-color: vars.$secondary-color;
        border-color: transparent;
    }

    &--lg {
        padding: vars.$space vars.$space * 4;
        font-size: 18px;
    }
}
</style>
