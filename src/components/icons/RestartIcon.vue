<script>
export default {
    name: 'RestartIcon',
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
});
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        :width="width"
        :height="height"
    >
        <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
        />
    </svg>
</template>
