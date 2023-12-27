<script lang="ts" setup>
import pageTitle from "@/utils/title";
import { onMounted, ref } from "vue";
import type { Stack } from "@/resource/stack/stack";
import stackResource from "@/resource/stack/stack.resource";
import { useRouter } from "vue-router";
import {
  DEFAULT_STACK_DESCRIPTION,
  DEFAULT_STACK_INITIAL_QUESTION,
  DEFAULT_STACK_NAME,
  DEFAULT_STACK_WIDGET_COLOR,
  DEFAULT_STACK_WIDGET_DELAY,
  INITIAL_CARDS,
} from "@/variables";
import { concat, map, switchMap, toArray } from "rxjs";
import cardResource from "@/resource/card/card.resource";
import { useBillingStore } from "@/store/billing.store";
import DialogAlertPlan from "@/components/billing/DialogAlertPlan.vue";
import { computed} from "vue";

pageTitle.value = "Designer";

const billingStore = useBillingStore();

const stackList = ref<Stack[]>([]);

const openDialog = ref(false);
const openDialogStackId = ref<string | null>(null);
const openDialogPlan = ref(false);

const loadingDialog = ref(false);

const router = useRouter();

const loading = ref(true);
const loadingCreate = ref(false);

const stackUsage = computed(() => {
  if (billingStore.currentPlan) {
    return `${stackList.value.length}/${billingStore.currentPlan.planStacksCount}`;
  } else {
    return "You are currently not signed up for a plan, head to billing to sign up for a plan.";
  }
});

const messageCount = computed(() => {
  if (billingStore.currentPlan) {
    return billingStore.currentPlan.planMessagesCount;
  } else {
    return "No plan found.";
  }
});

function createStack() {
  if (!billingStore.currentPlan) {
    router.push({ name: "billing" });
    return;
  }

  if (
    !(
      billingStore.currentPlan &&
      billingStore.currentPlan.planStacksCount > stackList.value.length
    )
  ) {
    openDialogPlan.value = true;
    return;
  }

  loadingCreate.value = true;

  stackResource
    .create({
      name: DEFAULT_STACK_NAME,
      description: DEFAULT_STACK_DESCRIPTION,
      initial_question: DEFAULT_STACK_INITIAL_QUESTION,
      color: DEFAULT_STACK_WIDGET_COLOR,
      widget_delay: DEFAULT_STACK_WIDGET_DELAY,
    })
    .pipe(
      switchMap((dataStack) => {
        // return zip(
        //   INITIAL_CARDS.map((item) => {
        //     return cardResource.create(
        //       dataStack.id,
        //       item.question,
        //       item.answer
        //     );
        //   })
        // ).pipe(map(() => dataStack));
        return concat(
          ...INITIAL_CARDS.map((item) => {
            return cardResource.create(
              dataStack.id,
              item.question,
              item.answer
            );
          })
        ).pipe(
          toArray(),
          map(() => dataStack)
        );
      })
    )
    .subscribe({
      next(data) {
        loadingCreate.value = false;
        router.push({ name: "stack", params: { id: data.id } });
      },
      error() {
        loadingCreate.value = false;
      },
    });
}

function confirmRemove(id: string) {
  openDialog.value = true;
  openDialogStackId.value = id;
}

function remove() {
  loadingDialog.value = true;
  if (openDialogStackId.value) {
    stackResource.remove(openDialogStackId.value).subscribe(() => {
      const cardIndex = stackList.value.findIndex(
        (item) => item.id === openDialogStackId.value
      );
      if (cardIndex > -1) {
        stackList.value.splice(cardIndex, 1);
      }
      openDialog.value = false;
      openDialogStackId.value = null;
      loadingDialog.value = false;
    });
  }
}

onMounted(() => {
  stackResource.list().subscribe((data) => {
    stackList.value = data;
    loading.value = false;
  });
});
</script>
<template lang="pug">
.mb-4
  VBtn(
    variant="flat",
    color="primary",
    prepend-icon="$plus",
    :loading="loadingCreate",
    @click="createStack"
  ) Create AI Chatbot
  div(style="margin-top: 10px") 
    span AI Chatbots: {{ stackUsage }} 
    span(style="margin-left: 20px") Message Count: {{ messageCount }}

VCard(:loading="loading")
  VTable(hover)
    template(v-if="!stackList.length && !loading", #bottom)
      .text-center.py-4 No result
    thead
      tr
        th.text-left Name
        th.text-left Description
        th.text-left Date Created
        th
    tbody
      tr(
        v-for="item in stackList",
        :key="item.id",
        @click="router.push({ name: 'stack', params: { id: item.id } })"
      )
        td {{ item.name }}
        td {{ item.description }}
        td {{ item.createdAt.toLocaleString() }}
        td.action.text-right
          VBtn(
            icon="$trash",
            size="small",
            variant="text",
            title="Delete",
            color="primary",
            @click.stop="confirmRemove(item.id)"
          )
VDialog(v-model="openDialog", max-width="300")
  VCard(
    title="Delete",
    text="Are you sure you want to delete this AI chatbot and its contents?"
  )
    VCardActions
      VSpacer
      VBtn(
        variant="text",
        @click="openDialog = false; openDialogStackId = null"
      ) No
      VBtn(
        variant="text",
        color="error",
        :loading="loadingDialog",
        @click="remove"
      ) Yes
DialogAlertPlan(
  v-model="openDialogPlan",
  type-limit="stack",
  :current-value="stackList.length"
)
</template>
<style lang="scss" scoped>
tr {
  cursor: pointer;
  .action .v-btn {
    visibility: hidden;
  }

  &:hover {
    .action .v-btn {
      visibility: visible;
    }
  }
}
</style>
