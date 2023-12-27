export interface StackResource {
  id: string;
  initial_question: string | null;
  widget_delay: number | null;
  color: string | null;
}

export interface Stack {
  id: string;
  initialQuestion: string | null;
  widgetDelay: number;
  color: string;
  invertColor: string;
}
