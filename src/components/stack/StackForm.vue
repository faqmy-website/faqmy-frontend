<script lang="ts" setup>
import { ref, watch } from "vue";
import { DEFAULT_WIDGET_LIST_COLOR } from "@/variables";
import type { Stack } from "@/resource/stack/stack";
import stackResource from "@/resource/stack/stack.resource";

const props = defineProps<{
  stack: Stack;
}>();

const emit = defineEmits<{
  (e: "saving", value: boolean): void;
}>();

const form = ref<Stack>({
  ...props.stack,
  widgetDelay: props.stack.widgetDelay / 1000,
});
const loading = ref(false);

function save() {
  loading.value = true;
  stackResource
    .updateStack(props.stack.id, {
      initial_question: form.value.initialQuestion,
      widget_delay: form.value.widgetDelay * 1000,
      name: form.value.name,
      description: form.value.description,
      color: form.value.color,
    })
    .subscribe(() => {
      loading.value = false;
    });
}

watch(loading, (value) => {
  emit("saving", value);
});
</script>

<template lang="pug">
VForm(:disabled="loading")
  VTextField(v-model="form.name", label="Name")
  VTextField(v-model="form.description", label="Description")
  .text-subtitle-1.my-2 Widget Settings
  .form-item-color
    div Color:
    #color-picker-activator.color(:style="{ backgroundColor: form.color }")
    VMenu(activator="#color-picker-activator", :close-on-content-click="false")
      VColorPicker(
        v-model="form.color",
        mode="hex",
        :modes="['hex']",
        show-swatches,
        :swatches="DEFAULT_WIDGET_LIST_COLOR"
      )
  VTextField(v-model="form.initialQuestion", label="Initial Question")
  VTextField(
    v-model="form.widgetDelay",
    type="number",
    label="Widget Delay",
    hint="Seconds"
  )
  VBtn(variant="flat", color="primary", :disabled="loading", @click="save") Save
</template>
<style lang="scss" scoped>
.color {
  width: 50px;
  height: 20px;
  cursor: pointer;
}
.form-item-color {
  display: flex;
  gap: 20px;
  padding: 20px 16px;
}
</style>
