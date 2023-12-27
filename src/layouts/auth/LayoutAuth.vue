<script lang="ts" setup>
import AppBar from "@/layouts/auth/AppBar.vue";
</script>

<template lang="pug">
VApp
  AppBar
  VMain
    VContainer.fill-height
      VResponsive.d-flex.align-center.fill-height
        RouterView
</template>

<style scoped></style>
