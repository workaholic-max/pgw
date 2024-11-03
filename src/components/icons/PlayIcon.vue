<script>
export default {
    name: 'PlayIcon',
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
        fill="currentColor"
        viewBox="0 0 24 24"
        :width="width"
        :height="height"
    >
        <path
            fill-rule="evenodd"
            d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
            clip-rule="evenodd"
        />
    </svg>
</template>
