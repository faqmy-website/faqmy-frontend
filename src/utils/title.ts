import { useTitle } from "@vueuse/core";
const pageTitle = useTitle("", {
  titleTemplate: "%s | Faq My Website",
});

export default pageTitle;
