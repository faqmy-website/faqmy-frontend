<script lang="ts" setup>
import AppBar from "@/layouts/dashboard/AppBar.vue";
import NavigationDrawer from "@/layouts/dashboard/NavigationDrawer.vue";
import pageTitle from "@/utils/title";
import { ref } from "vue";

const drawer = ref(true);
</script>

<template lang="pug">
VApp
  AppBar(@click-v-app-bar-nav-icon="drawer = !drawer")
  NavigationDrawer(:drawer="drawer", @update-drawer="drawer = $event")
  VMain
    VContainer(fluid)
      .text-h4.mb-4 {{ pageTitle }}
      RouterView
</template>

<style scoped></style>
