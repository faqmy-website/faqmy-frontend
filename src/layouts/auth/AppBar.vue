<script lang="ts" setup>
import logo from "@/assets/images/logo.png";
</script>
<template lang="pug">
VAppBar(flat, color="white")
  RouterLink.d-inline-block.ms-4.me-2(:to="{ name: 'signIn' }")
    VImg(:src="logo", width="300px")
</template>
