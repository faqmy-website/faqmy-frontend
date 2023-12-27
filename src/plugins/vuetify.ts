/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "vuetify/styles";
import { md3 } from "vuetify/blueprints";

// Composables
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import customAliases from "@/iconsets/customAliases";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      ...customAliases,
    },
    sets: {
      mdi,
    },
  },
  blueprint: md3,
  theme: {
    themes: {
      light: {
        // colors: {
        //   primary: '#1867C0',
        //   secondary: '#5CBBF6',
        // },
      },
    },
  },
});
