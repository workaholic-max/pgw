<script>
export default {
    name: 'NotFoundView',
};
</script>

<template>
    <div class="wm-not-found">
        <p>The page you're looking for doesn't exist</p>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.wm-not-found > p {
    padding: vars.$space * 2 vars.$space;
    border: 1px solid vars.$secondary-color;
    border-radius: vars.$base-border-radius;
    text-align: center;
}
</style>
