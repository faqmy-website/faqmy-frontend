<script lang="ts" setup>
import { WIDGET_URL } from "@/variables";
import { onMounted } from "vue";

const props = defineProps<{
  sid: string;
  loading: boolean;
}>();

onMounted(() => {
  const widgetJS = document.createElement("script");
  widgetJS.setAttribute("src", WIDGET_URL);
  if (!document.querySelector(`script[src="${WIDGET_URL}"]`)) {
    document.body.appendChild(widgetJS);
  }
});
</script>

<template lang="pug">
.widget
  faqmy-widget(v-if="!props.loading", .sid="sid", preview)
</template>
<style lang="scss" scoped>
.widget {
  position: relative;
  min-height: 500px;
}
</style>
