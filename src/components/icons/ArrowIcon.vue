<script>
export default {
    name: 'ArrowIcon',
};
</script>

<script setup>
defineProps({
    width: {
        type: Number,
        default: 24,
    },
    height: {
        type: Number,
        default: 24,
    },
    direction: {
        type: String,
        default: 'bottom',
        validator: (value) => ['left', 'right', 'top', 'bottom'].includes(value),
    },
});
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        :class="`wm-arrow--${direction}`"
        :width="width"
        :height="height"
    >
        <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 9-7 7-7-7"
        />
    </svg>
</template>

<style lang="scss" scoped>
.wm-arrow {
    &--left {
        transform: rotate(90deg);
    }

    &--right {
        transform: rotate(-90deg);
    }

    &--top {
        transform: rotate(180deg);
    }
}
</style>
