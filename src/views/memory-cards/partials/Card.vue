<script>
export default {
    name: 'Card',
};
</script>

<script setup>
defineProps({
    type: {
        type: String,
        required: true,
    },
    isFlipped: {
        type: Boolean,
        default: false,
    },
    isMatched: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div
        role="button"
        class="wm-card"
        :class="{
            [`wm-card--${type}`]: isFlipped,
            'wm-card--flipped': isFlipped,
            'wm-card--matched': isMatched,
        }"
    >
        <transition
            name="scale"
            type="transition"
            mode="out-in"
        >
            <span v-if="isFlipped" />

            <b v-else>?</b>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as mixins;

.wm-card {
    flex: 0 1 calc((100% / 3) - 2 / 3 * #{vars.$space--half});
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
    background-color: vars.$tertiary-color;
    border: 1px solid vars.$tertiary-color;
    border-radius: vars.$base-border-radius;
    transition: vars.$base-transition;

    > b {
        font-size: 36px;
        user-select: none;
    }

    &:not(&--flipped) {
        cursor: pointer;

        @include mixins.hover() {
            background-color: vars.$secondary-color;
            border-color: vars.$secondary-color;
        }
    }

    &:is(&--leaf, &--square, &--circle) > span {
        width: 50%;
        height: 50%;
        background-color: vars.$primary-color;
    }

    &--square > span {
        border-radius: vars.$base-border-radius;
    }

    &--circle > span {
        border-radius: 50%;
    }

    &--leaf > span {
        border-radius: 0 75%;
    }

    &--flipped {
        border-color: vars.$primary-color;
        transform: scale(0.9);
    }

    &--matched {
        transform: none;
    }
}
</style>
