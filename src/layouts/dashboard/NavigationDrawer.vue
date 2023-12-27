<script lang="ts" setup>
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();

const props = defineProps<{
  drawer: boolean;
}>();

const emit = defineEmits<{
  (e: "updateDrawer", drawer: boolean): void;
}>();
</script>

<template lang="pug">
VNavigationDrawer(
  :model-value="props.drawer",
  theme="dark",
  :permanent="!mobile",
  :temporary="mobile",
  @update:model-value="emit('updateDrawer', $event)"
)
  VList
    VListItem(
      prepend-icon="$pencilRuler",
      title="Designer",
      :to="{ name: 'designer' }"
    )
    VListItem(
      prepend-icon="$message",
      title="Conversations",
      :to="{ name: 'conversations' }"
    )
    VListItem(
      prepend-icon="$cog",
      title="Settings",
      :to="{ name: 'profileSettings' }"
    )
    VListItem(
      prepend-icon="$invoice",
      title="Billing",
      :to="{ name: 'billing' }"
    )
</template>

<style scoped></style>
