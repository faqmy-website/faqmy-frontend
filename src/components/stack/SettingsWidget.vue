<script lang="ts" setup>
import { computed } from "vue";
import { widgetCode } from "@/utils/widgetCode";
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
  sid: string;
}>();

const copyString = computed<string>(() => {
  return widgetCode(props.sid);
});

const { copy, copied, isSupported } = useClipboard();
</script>

<template lang="pug">
VTextarea(v-model="copyString", readonly)
VBtn(
  v-if="isSupported",
  variant="flat",
  color="primary",
  @click="copy(copyString)"
) {{ copied ? "Copied!" : "Copy" }}
</template>
<style lang="scss" scoped>
.color {
  width: 50px;
  height: 20px;
  cursor: pointer;
}
</style>
