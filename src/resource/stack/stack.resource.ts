import { map, Observable } from "rxjs";
import type { StackResource, Stack } from "@/resource/stack/stack";
import { fmAPI } from "@/utils/axios";
import { InputStack, stackResourceToStack } from "@/resource/stack/stack";

const stackResource = {
  list(): Observable<Stack[]> {
    return fmAPI.get<StackResource[]>("/dashboard/stacks").pipe(
      map((data) => {
        return data.data.map((item) => {
          return stackResourceToStack(item);
        });
      })
    );
  },
  create(params: InputStack): Observable<Stack> {
    return fmAPI.post<StackResource>("/dashboard/stacks", params).pipe(
      map((data) => {
        return stackResourceToStack(data.data);
      })
    );
  },
  stack(id: string): Observable<Stack | null> {
    return fmAPI.get(`/dashboard/stacks/${id}`).pipe(
      map((data) => {
        return stackResourceToStack(data.data);
      })
    );
  },
  updateStack(id: string, params: InputStack): Observable<Stack> {
    return fmAPI.patch(`/dashboard/stacks/${id}`, params).pipe(
      map((data) => {
        return stackResourceToStack(data.data);
      })
    );
  },
  remove(id: string): Observable<string> {
    return fmAPI
      .delete(`/dashboard/stacks/${id}`)
      .pipe(map((data) => data.data));
  },
};

export default stackResource;
