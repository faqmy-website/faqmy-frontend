<script lang="ts" setup>
import { ref } from "vue";
import type { CardResource } from "@/resource/card/card";
import cardResource from "@/resource/card/card.resource";
import { map, of, switchMap } from "rxjs";

const props = defineProps<{
  sid: string;
  learned?: boolean;
}>();

const emit = defineEmits<{
  (e: "newCard", card: CardResource): void;
  (e: "cancel"): void;
}>();

const loading = ref(false);

const question = ref("");
const answer = ref("");

function createCard(): void {
  loading.value = true;
  cardResource
    .create(props.sid, question.value, answer.value)
    .pipe(
      switchMap((data) => {
        if (props.learned) {
          return cardResource.learn(data.id).pipe(
            map(() => {
              return {
                ...data,
                learned: true,
              };
            })
          );
        } else {
          return of(data);
        }
      })
    )
    .subscribe({
      next(data) {
        emit("newCard", data);
        loading.value = false;
        emit("cancel");
      },
      error() {
        loading.value = false;
      },
    });
}
</script>

<template lang="pug">
VCard(variant="outlined")
  VCardTitle Create
  VCardText
    VTextarea(v-model="question", label="Question", auto-grow, :rows="1")
    VTextarea(v-model="answer", label="Answer", auto-grow, :rows="1")
  VCardActions
    VBtn(variant="text", color="info", @click="emit('cancel')") Cancel
    VBtn(
      variant="text",
      color="success",
      :loading="loading",
      @click="createCard"
    ) Create
</template>

<style lang="scss" scoped></style>
