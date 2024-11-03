<script>
export default {
    name: 'App',
};
</script>

<script setup>
import Header from './partials/Header';
</script>

<template>
    <div class="wm-layout">
        <Header />

        <router-view />
    </div>
</template>

<style lang="scss">
@use '@/assets/styles/variables' as vars;

.wm-layout {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    max-width: vars.$mobile-lg-breakpoint;
    width: 100%;
    margin: 0 auto;
    padding: vars.$space;
}
</style>
