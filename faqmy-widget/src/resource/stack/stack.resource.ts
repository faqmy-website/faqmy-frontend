import { map, Observable } from "rxjs";
import type { Stack, StackResource } from "@/resource/stack/stack";
import { fmAPI } from "@/utils/axios";
import { DEFAULT_STACK_COLOR, DEFAULT_STACK_DELAY } from "@/variables";
import { invertColor } from "@/utils/color";

function stackResourceToStack(data: StackResource): Stack {
  return {
    id: data.id,
    color: data.color || DEFAULT_STACK_COLOR,
    initialQuestion: data.initial_question,
    widgetDelay:
      data.widget_delay === null ? DEFAULT_STACK_DELAY : data.widget_delay,
    invertColor: invertColor(data.color || DEFAULT_STACK_COLOR, true),
  };
}

const stackResource = {
  get(id: string): Observable<Stack> {
    return fmAPI
      .get<StackResource>(`/client/stacks/${id}`)
      .pipe(map((data) => stackResourceToStack(data.data)));
  },
};

export default stackResource;
