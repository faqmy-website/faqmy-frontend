<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import type { CardResource } from "@/resource/card/card";
import cardResource from "@/resource/card/card.resource";
import { interval, Observable, Subscription, tap } from "rxjs";
import CardItem from "@/components/card/CardItem.vue";
import CreateCard from "@/components/card/CreateCard.vue";

const props = defineProps<{
  sid: string;
  isCreateNewLearnedCard: boolean;
}>();

const emit = defineEmits<{
  (e: "openDialog", value: boolean): void;
  (e: "updateCntLearned", value: number): void;
}>();

const cardList = ref<CardResource[]>([]);
let intervalSubscription: Subscription | null = null;

const notLearned = computed<CardResource[]>(() => {
  return cardList.value.filter((item) => !item.learned);
});

const learned = computed<CardResource[]>(() => {
  return cardList.value.filter((item) => item.learned);
});

const openCreateForm = ref(false);
const openCreateLearnedForm = ref(false);

function editCard(data: CardResource): void {
  const card = cardList.value.find((item) => item.id === data.id);
  if (card) {
    card.learned = data.learned;
    card.answer = data.answer;
    card.question = data.question;
  }
}
function removeCard(id: string): void {
  const cardIndex = cardList.value.findIndex((item) => item.id === id);
  if (cardIndex > -1) {
    cardList.value.splice(cardIndex, 1);
  }
}

function fetchCardList(): Observable<CardResource[]> {
  return cardResource.list(props.sid).pipe(
    tap((data) => {
      cardList.value = data;
    })
  );
}

function newCard(data: CardResource): void {
  cardList.value.unshift(data);
}

function openedCreateLearnedForm() {
  if (props.isCreateNewLearnedCard) {
    openCreateLearnedForm.value = true;
  } else {
    emit("openDialog", true);
  }
}

onMounted(() => {
  fetchCardList().subscribe();
  intervalSubscription = interval(3000)
    .pipe(
      tap(() => {
        fetchCardList().subscribe();
      })
      // switchMap(() => {
      //   return fetchCardList();
      // })
    )
    .subscribe();
});

onUnmounted(() => {
  intervalSubscription?.unsubscribe();
});

watch(
  () => learned.value.length,
  (value) => {
    emit("updateCntLearned", value);
  }
);
</script>

<template lang="pug">
VRow(v-if="notLearned && learned")
  VCol(md="6")
    .d-flex.text-h6.mb-4
      div Not learned({{ notLearned.length }})
      .ml-auto
        VBtn(
          prepend-icon="$plus",
          variant="text",
          color="primary",
          @click="openCreateForm = true"
        ) Add

    CreateCard.mb-4(
      v-if="openCreateForm",
      :sid="props.sid",
      @new-card="newCard",
      @cancel="openCreateForm = false"
    )
    .mb-4(v-for="item in notLearned", :key="item.id")
      CardItem(
        :card="item",
        :sid="props.sid",
        :is-create-new-learned-card="isCreateNewLearnedCard",
        @edit="editCard",
        @remove="removeCard(item.id)",
        @plan-blocked="emit('openDialog', true)"
      )
  VDivider(vertical)
  VCol(md="6")
    .d-flex.text-h6.mb-4
      div Learned({{ learned.length }})
      .ml-auto
        VBtn(
          prepend-icon="$plus",
          variant="text",
          color="primary",
          @click="openedCreateLearnedForm"
        ) Add
    CreateCard.mb-4(
      v-if="openCreateLearnedForm",
      :sid="props.sid",
      learned,
      @new-card="newCard",
      @cancel="openCreateLearnedForm = false"
    )
    .mb-4(v-for="item in learned", :key="item.id")
      CardItem(
        :card="item",
        :sid="props.sid",
        @edit="editCard",
        @remove="removeCard(item.id)"
      )
</template>

<style lang="scss" scoped></style>
