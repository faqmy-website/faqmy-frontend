<script lang="ts" setup>
import { computed, ref } from "vue";
import type { CardResource } from "@/resource/card/card";
import cardResource from "@/resource/card/card.resource";

const props = defineProps<{
  card: CardResource;
  sid: string;
  isCreateNewLearnedCard?: boolean;
}>();

const emit = defineEmits<{
  (e: "edit", card: CardResource): void;
  (e: "remove"): void;
  (e: "planBlocked"): void;
}>();

const loading = ref(false);
const loadingSave = ref(false);
const loadingRemove = ref(false);
const editing = ref(false);

const question = ref("");
const answer = ref("");

const openDialog = ref(false);

function toLearn(): void {
  if (!props.isCreateNewLearnedCard) {
    emit("planBlocked");
    return;
  }
  loading.value = true;
  cardResource.learn(props.card.id).subscribe({
    next() {
      emit("edit", {
        ...props.card,
        learned: true,
      });
    },
    complete() {
      loading.value = false;
    },
  });
}

function toEdit(): void {
  editing.value = true;
  question.value = props.card.question;
  answer.value = props.card.answer;
}

function save(): void {
  loadingSave.value = true;
  cardResource
    .edit(props.card.id, props.sid, question.value, answer.value)
    .subscribe({
      next() {
        loadingSave.value = false;
        editing.value = false;
        emit("edit", {
          ...props.card,
          answer: answer.value,
          question: question.value,
        });
      },
      error() {
        loadingSave.value = false;
      },
    });
}
function remove(): void {
  loadingRemove.value = true;
  cardResource.remove(props.card.id).subscribe(() => {
    openDialog.value = false;
    emit("remove");
    loadingRemove.value = false;
  });
}

const isMore = ref(false);

const page = ref(1);
const pageSize = 50;
const showTextAnswer = computed<string>(() => {
  return (
    props.card.answer
      .split(" ")
      .slice((page.value - 1) * pageSize, pageSize * page.value)
      .join(" ") + "..."
  );
});
const totalPage = computed<number>(() => {
  return Math.ceil(props.card.answer.split(" ").length / pageSize);
});
</script>

<template lang="pug">
VCard(variant="outlined")
  template(v-if="editing")
    VCardTitle Edit
    VCardText
      VTextarea(v-model="question", label="Question", auto-grow, :rows="1")
      VTextarea(v-model="answer", label="Answer", auto-grow, :rows="1")
    VCardActions
      VBtn(variant="text", color="info", @click="editing = false") Cancel
      VBtn(
        variant="text",
        color="success",
        :loading="loadingSave",
        @click="save"
      ) Save
  template(v-else)
    VCardText
      .text-h6 {{ card.question }}
      .text-body-1(
        v-text="isMore || totalPage === 1 ? props.card.answer : showTextAnswer"
      )
    VCardActions
      VSpacer
      VBtn(
        v-if="totalPage > 1",
        variant="text",
        color="info",
        @click="isMore = !isMore"
      ) More
      //VPagination(v-if="totalPage > 1",      v-model="page",        :length="totalPage",        density="compact",        :total-visible="2"      )
    VCardActions
      VBtn(variant="text", color="success", @click="toEdit") Edit
      VBtn(variant="text", color="error", @click="openDialog = true") Delete
      VSpacer
      VBtn(
        v-if="!card.learned",
        variant="text",
        color="primary",
        :loading="loading",
        @click="toLearn"
      ) To learn
  VDialog(v-model="openDialog", max-width="300")
    VCard(title="Delete", text="Are you sure you want to delete the card?")
      VCardActions
        VSpacer
        VBtn(variant="text", @click="openDialog = false") No
        VBtn(
          variant="text",
          color="error",
          :loading="loadingRemove",
          @click="remove"
        ) Yes
</template>

<style lang="scss" scoped></style>
