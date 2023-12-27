import { defineStore } from "pinia";
import { ref } from "vue";
import { Observable, of, tap } from "rxjs";
import type { Stack } from "@/resource/stack/stack";
import type { ConversationResource } from "@/resource/conversations/conversation";
import { KEY_SS_CONVERSATION, KEY_SS_STACK } from "@/variables";
import stackResource from "@/resource/stack/stack.resource";
import conversationResource from "@/resource/conversations/conversation.resource";

function getSS<T>(
  key: typeof KEY_SS_STACK | typeof KEY_SS_CONVERSATION
): T | null {
  try {
    const data = sessionStorage.getItem(key);
    if (data === null) return null;
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

function setSS(
  data: Stack | ConversationResource,
  key: typeof KEY_SS_STACK | typeof KEY_SS_CONVERSATION
): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch {
    return;
  }
}

function removeSS(key: typeof KEY_SS_STACK | typeof KEY_SS_CONVERSATION) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    return;
  }
}

export const useStackConversationStore = defineStore("sc", () => {
  const stack = ref<Stack | null>(getSS<Stack>(KEY_SS_STACK));
  const conversation = ref<ConversationResource | null>(
    getSS<ConversationResource>(KEY_SS_CONVERSATION)
  );
  const preview = ref(false);

  function initStack(sid: string): Observable<Stack> {
    if (stack.value !== null && stack.value.id === sid) {
      return of(stack.value);
    }
    stack.value = null;
    conversation.value = null;
    return stackResource.get(sid).pipe(
      tap((data) => {
        stack.value = data;
        if (!preview.value) {
          setSS(data, KEY_SS_STACK);
        }
      })
    );
  }
  function initConversation(): Observable<ConversationResource | null> {
    if (stack.value === null) return of(null);
    return conversationResource.create(stack.value.id).pipe(
      tap((data) => {
        conversation.value = data;
        if (!preview.value) {
          setSS(data, KEY_SS_CONVERSATION);
        }
      })
    );
  }

  function $reset() {
    stack.value = null;
    conversation.value = null;
    removeSS(KEY_SS_CONVERSATION);
    removeSS(KEY_SS_STACK);
  }

  return {
    stack,
    conversation,
    preview,
    initStack,
    initConversation,
    $reset,
  };
});
