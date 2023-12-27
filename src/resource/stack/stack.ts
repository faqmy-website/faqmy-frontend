import {
  DEFAULT_STACK_WIDGET_COLOR,
  DEFAULT_STACK_WIDGET_DELAY,
} from "@/variables";

export interface StackResource {
  id: string;
  name: string | null;
  description: string | null;
  created_at: string;
  initial_question: string | null;
  widget_delay: number | null;
  color: string | null;
}
export interface Stack {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  initialQuestion: string;
  widgetDelay: number;
  color: string;
}

export interface InputStack {
  name?: string;
  description?: string;
  initial_question?: string;
  widget_delay?: number;
  color?: string;
}

export function stackResourceToStack(data: StackResource): Stack {
  return {
    id: data.id,
    name: data.name || "",
    description: data.description || "",
    createdAt: new Date(data.created_at),
    color: data.color || DEFAULT_STACK_WIDGET_COLOR,
    widgetDelay:
      data.widget_delay === null
        ? DEFAULT_STACK_WIDGET_DELAY
        : data.widget_delay,
    initialQuestion: data.initial_question || "",
  };
}
