<script setup lang="ts">
import { computed } from "vue";
import { useBillingStore } from "@/store/billing.store";

const props = defineProps<{
  modelValue: boolean;
  typeLimit: "card" | "message" | "stack";
  currentValue: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const billingStore = useBillingStore();

const open = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const message = computed(() => {
  if (!billingStore.currentPlan) return "";
  switch (props.typeLimit) {
    case "card":
      return `Fact card limit hit ${props.currentValue}/${billingStore.currentPlan.planCardsCount}.`;
    case "stack":
      return `Stack limit hit ${props.currentValue}/${billingStore.currentPlan.planStacksCount}.`;
    default:
      return "";
  }
});
</script>

<template lang="pug">
VDialog(v-model="open", :max-width="400")
  VCard
    VCardItem.text-center
      VIcon(icon="$invoice", :size="50")
    VCardText.text-center
      div {{ message }} Please upgrade #[RouterLink(:to="{ name: 'billing' }") plan]
</template>

<style scoped></style>
