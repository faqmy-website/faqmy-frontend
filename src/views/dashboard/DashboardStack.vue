<script lang="ts" setup>
import pageTitle from "@/utils/title";
import { useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";
import stackResource from "@/resource/stack/stack.resource";
import SettingsWidget from "@/components/stack/SettingsWidget.vue";
import StackForm from "@/components/stack/StackForm.vue";
import type { Stack } from "@/resource/stack/stack";
import CardList from "@/components/card/CardList.vue";
import ScanUrl from "@/components/stack/ScanUrl.vue";
import ScanFile from "@/components/stack/ScanFile.vue";
import PreviewWidget from "@/components/stack/PreviewWidget.vue";
import DialogAlertPlan from "@/components/billing/DialogAlertPlan.vue";
import { useBillingStore } from "@/store/billing.store";

pageTitle.value = "Stack";

const route = useRoute();
const billingStore = useBillingStore();

const stack = ref<Stack | null>(null);

const savingForm = ref(false);
const openDialogPlan = ref(false);
const cntLearnedCards = ref(0);

const isCreateNewLearnedCard = computed<boolean>(() => {
  return !!(
    billingStore.currentPlan &&
    billingStore.currentPlan.planCardsCount > cntLearnedCards.value
  );
});

onMounted(() => {
  stackResource.stack(route.params.id as string).subscribe((data) => {
    stack.value = data;
    pageTitle.value = data?.name || "Stack";
  });
});
</script>
<template lang="pug">
VRow(v-if="stack !== null")
  VCol(:cols="12", :md="8")
    VCard.mb-6
      VCardText
        StackForm(:stack="stack", @saving="savingForm = $event")
    VCard.mb-6(title="Cards")
      VCardText
        CardList(
          :sid="stack.id",
          :is-create-new-learned-card="isCreateNewLearnedCard",
          @open-dialog="openDialogPlan = $event",
          @update-cnt-learned="cntLearnedCards = $event"
        )
  VCol(:cols="12", :md="4")
    VCard.mb-6(title="Preview", :loading="savingForm")
      PreviewWidget(:sid="stack.id", :loading="savingForm")
    VCard.mb-6(title="Embed on Website")
      VCardText
        SettingsWidget(:sid="stack.id")
    VCard.mb-6(title="Scan Website")
      VCardText
        ScanUrl(
          :sid="stack.id",
          :is-create-new-learned-card="isCreateNewLearnedCard",
          @plan-blocked="openDialogPlan = true"
        )
    VCard.mb-6(title="Upload document (pdf, docx, txt)")
      VCardText
        ScanFile(
          :sid="stack.id",
          :is-create-new-learned-card="isCreateNewLearnedCard",
          @plan-blocked="openDialogPlan = true"
        )

DialogAlertPlan(
  v-model="openDialogPlan",
  type-limit="card",
  :current-value="cntLearnedCards"
)
</template>
<style scoped></style>
