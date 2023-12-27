<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import pageTitle from "@/utils/title";
import { useUserStore } from "@/store/user.store";
import { computed } from "vue";
import { useBillingStore } from "@/store/billing.store";

pageTitle.value = "Settings";

const userStore = useUserStore();
const billingStore = useBillingStore();
const name = ref<string>("");
const phone = ref<string>("");
const email = ref<string>("");
const loading = ref(false);

function submit() {
  loading.value = true;
  userStore.updateUser(name.value, phone.value).subscribe(() => {
    loading.value = false;
  });
}

const currentPlan = computed(() => {
  return billingStore.currentPlan?.name || "No current plan";  // update this line based on the structure of your plan object
});

onMounted(() => {
  if (userStore.info) {
    name.value = userStore.info.name;
    phone.value = userStore.info.phone;
    email.value = userStore.info.email;
  }
});

watch(
  () => userStore.info,
  () => {
    if (userStore.info) {
      name.value = userStore.info.name;
      phone.value = userStore.info.phone;
      email.value = userStore.info.email;
    }
  }
);
</script>

<template lang="pug">
VRow
  VCol(cols="12", md="6", lg="4")
    VCard(:loading="loading || userStore.info === null")
      VCardText
        //- h1.title(style="font-family: Shrikhand;") Settings
        VForm(@submit.prevent="false")
          VTextField(v-model="name", label="Name")
          VTextField(v-model="email", label="Email", readonly)
          VTextField(v-model="phone", label="Phone")
          //- Shows user's current plan by name
          VTextField(v-model="currentPlan", label="Current Plan", readonly)
          VBtn(
            variant="flat",
            color="primary",
            :disabled="loading",
            @click="submit"
          ) Save
    //VBtn(@click="rv") to v
</template>

<style scoped>
/* @import url('../styles/fonts.css');
h1.title {
  font-family: 'Shrikhand', cursive;
} */
</style>