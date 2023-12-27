<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import GeneralButton from "@/components/GeneralButton.vue";
import TheChat from "@/components/TheChat.vue";
import { useStackConversationStore } from "@/stores/stack.store";
import { KEY_SS_OPEN } from "@/variables";
import { useMessageStore } from "@/stores/message.store";
import { useBillingStore } from "@/stores/billing.store";
import { zip } from "rxjs";

const props = defineProps<{
  sid: string;
  preview?: boolean;
}>();

const open = ref<boolean | null>(getSSOpen());

const stackStore = useStackConversationStore();
const messagesStore = useMessageStore();
const billingStore = useBillingStore();

function getSSOpen(): boolean | null {
  if (props.preview) return null;
  try {
    const data = sessionStorage.getItem(KEY_SS_OPEN);
    return data ? (JSON.parse(data) as boolean) : null;
  } catch {
    return null;
  }
}
function setSSOpen(value: boolean): void {
  if (props.preview) return;
  try {
    sessionStorage.setItem(KEY_SS_OPEN, JSON.stringify(value));
  } catch {
    return;
  }
}

function toggleOpen() {
  open.value = !open.value;
  setSSOpen(open.value);
}

onMounted(() => {
  stackStore.preview = props.preview || false;
  zip(
    stackStore.initStack(props.sid),
    billingStore.initBilling(props.sid)
  ).subscribe(([data]) => {
    if (open.value === null) {
      setTimeout(() => {
        if (open.value === null) {
          toggleOpen();
        }
      }, data.widgetDelay);
    }
  });
});

onUnmounted(() => {
  stackStore.$reset();
  messagesStore.$reset();
  billingStore.$reset();
});
</script>
<template lang="pug">
.faqmy-widget(v-if="stackStore.stack !== null")
  TheChat.faqmy-widget__chat(v-if="open" @close="toggleOpen")
  GeneralButton.faqmy-widget__action(:open="open" @click="toggleOpen")
</template>
<style lang="scss">
@use "./src/assets/index";
</style>
