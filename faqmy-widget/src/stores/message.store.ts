import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Observable, of, switchMap, tap } from "rxjs";
import type { Message } from "@/resource/message/message";
import messageResource from "@/resource/message/message.resource";
import { useStackConversationStore } from "@/stores/stack.store";

export const useMessageStore = defineStore("messages", () => {
  const messages = ref<Message[]>([]);

  const scStore = useStackConversationStore();

  const typingBot = computed<boolean>(() => {
    const cntMessageBot = messages.value.filter((item) => item.isBot).length;
    const cntMessageUser = messages.value.filter((item) => !item.isBot).length;
    return cntMessageUser !== cntMessageBot;
  });

  function fetchMessages(): Observable<Message[]> {
    if (
      scStore.conversation !== null &&
      scStore.conversation.stack_id === scStore.stack?.id
    ) {
      return messageResource
        .messages(scStore.conversation.id, scStore.conversation.password)
        .pipe(
          tap((data) => {
            if (data.length >= messages.value.length) {
              messages.value = data;
            }
          })
        );
    }
    return of([]);
  }
  function createMessage(text: string): Observable<Message | null> {
    if (scStore.conversation === null) return of(null);
    return messageResource.createMessage(scStore.conversation.id, text);
  }
  function sendMessage(text: string): Observable<Message | null> {
    if (
      scStore.conversation === null ||
      scStore.conversation.stack_id !== scStore.stack?.id
    ) {
      return scStore.initConversation().pipe(
        switchMap(() => {
          return createMessage(text);
        })
      );
    }
    return createMessage(text);
  }

  function $reset() {
    messages.value = [];
  }

  return {
    messages,
    typingBot,
    fetchMessages,
    sendMessage,
    $reset,
  };
});
