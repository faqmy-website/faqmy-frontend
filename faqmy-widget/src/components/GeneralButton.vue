<script lang="ts" setup>
import IconMessage from "@/components/icons/IconMessage.vue";
import IconUp from "@/components/icons/IconUp.vue";
import { useStackConversationStore } from "@/stores/stack.store";

const stackStore = useStackConversationStore();

const props = defineProps<{
  open: boolean | null;
}>();
</script>
<template lang="pug">
.faqmy-general-button(:style="{color: stackStore.stack?.invertColor, backgroundColor: stackStore.stack?.color}")
  IconUp(v-if="props.open")
  IconMessage(v-else)
</template>
