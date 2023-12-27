import { defineCustomElement } from "vue";
import Widget from "@/components/FaqMyWidget.ce.vue";

import { createPinia, setActivePinia } from "pinia";
setActivePinia(createPinia());

// convert into custom element constructor
const FaqMyWidget = defineCustomElement(Widget);

customElements.define("faqmy-widget", FaqMyWidget);
