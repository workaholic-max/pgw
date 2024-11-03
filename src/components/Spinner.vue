<script>
export default {
    name: 'Spinner',
};
</script>

<script setup>
defineProps({
    isAbsolute: {
        type: Boolean,
        default: false,
    },
    isFullSize: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <transition
        appear
        name="scale"
        type="transition"
    >
        <div
            class="wm-spinner"
            :class="{
                'wm-spinner--absolute': isAbsolute,
                'wm-spinner--full-size': isFullSize,
            }"
        />
    </transition>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.wm-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: progress;

    &::after {
        content: ' ';
        display: block;
        width: auto;
        height: 100%;
        aspect-ratio: 1/1;
        border-radius: 50%;
        border: 3px solid;
        border-color: vars.$white transparent vars.$white transparent;
        animation: spinner-animation 0.8s ease-out infinite;
    }

    &--absolute {
        background-color: rgba(vars.$background-color, 0.5);
        position: absolute;
        inset: 0;
        border-radius: inherit;
    }

    &--full-size {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        z-index: 3;

        &::after {
            height: 75%;
            max-width: 30px;
            max-height: 30px;
        }
    }
}

@keyframes spinner-animation {
    0% {
        transform: rotate(0deg);
        border-color: vars.$white transparent vars.$white transparent;
    }
    100% {
        transform: rotate(360deg);
        border-color: vars.$primary-color transparent vars.$primary-color transparent;
    }
}
</style>
