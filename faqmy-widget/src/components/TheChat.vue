<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconAnimTyping from "@/components/icons/IconAnimTyping.vue";
import { useMessageStore } from "@/stores/message.store";
import { useStackConversationStore } from "@/stores/stack.store";
import { interval, Subscription, tap } from "rxjs";
import IconSend from "@/components/icons/IconSend.vue";
import { useBillingStore } from "@/stores/billing.store";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const newMessage = ref<string>("");
const loadingFirst = ref<boolean>(true);

const messagesStore = useMessageStore();
const stackStore = useStackConversationStore();
const billingStore = useBillingStore();

let intervalSubscription: Subscription | null = null;

function send() {
  if (newMessage.value) {
    messagesStore.messages.unshift({
      id: "newMessage",
      text: newMessage.value,
      isBot: false,
    });
    messagesStore.sendMessage(newMessage.value).subscribe({
      error() {
        stackStore.$reset();
        messagesStore.$reset();
      },
    });
    newMessage.value = "";
  }
}

watch(
  () => messagesStore.typingBot,
  (value) => {
    if (value) {
      intervalSubscription = interval(1000)
        .pipe(
          tap(() => {
            messagesStore.fetchMessages().subscribe();
          })
          // switchMap(() => {
          //   return messagesStore.fetchMessages();
          // })
        )
        .subscribe();
    } else {
      intervalSubscription?.unsubscribe();
    }
  }
);

onMounted(() => {
  messagesStore.fetchMessages().subscribe(() => {
    loadingFirst.value = false;
  });
});

onUnmounted(() => {
  intervalSubscription?.unsubscribe();
});
</script>
<template lang="pug">
.faqmy-chat
  .faqmy-chat__header(:style="{color: stackStore.stack?.invertColor, backgroundColor: stackStore.stack?.color}")
    .faqmy-chat-close(@click="emit('close')")
      IconClose
  .faqmy-chat__messages
    template(v-if="!loadingFirst && !billingStore.isBlockedChat")
      .faqmy-message.faqmy-message_typing.faqmy-message_bot(v-if="messagesStore.typingBot")
        IconAnimTyping
      .faqmy-message(v-for="message in messagesStore.messages" :key="message.id" :class="{'faqmy-message_bot': message.isBot}" :style="!message.isBot ? {color: stackStore.stack?.invertColor, backgroundColor: stackStore.stack?.color} : {}") {{message.text}}
      .faqmy-message.faqmy-message_bot(v-if="stackStore.stack?.initialQuestion") {{stackStore.stack?.initialQuestion}}

    template(v-if="billingStore.isBlockedChat")
      .faqmy-message.faqmy-message_bot Message limit hit, widget is unactive
  .faqmy-chat__send(v-if="!billingStore.isBlockedChat")
    input.faqmy-input(v-model="newMessage" type="text" placeholder="What's on your mind?" @keyup.enter="send")
    .faqmy-chat-btn-send(:style="{color: stackStore.stack?.color}" @click="send")
      IconSend
</template>
