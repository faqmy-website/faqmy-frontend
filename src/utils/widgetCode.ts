import { WIDGET_URL } from "@/variables";

export function widgetCode(sid: string): string {
  return `<script src="${WIDGET_URL}"></script>
<faqmy-widget sid="${sid}"></faqmy-widget>`;
}
