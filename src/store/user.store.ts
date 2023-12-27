import { defineStore } from "pinia";
import { ref } from "vue";
import { Observable, tap } from "rxjs";
import userResource from "@/resource/user/user.resource";
import type { UserInfo } from "@/resource/user/user";

export const useUserStore = defineStore("user", () => {
  const info = ref<UserInfo | null>(null);

  function fetchUser(): Observable<UserInfo> {
    return userResource.me().pipe(
      tap((data) => {
        info.value = data;
      })
    );
  }
  function updateUser(name: string, phone: string): Observable<UserInfo> {
    return userResource.editProfile({ name, phone }).pipe(
      tap((data) => {
        info.value = data;
      })
    );
  }

  function $reset() {
    info.value = null;
  }

  return {
    info,
    fetchUser,
    updateUser,
    $reset,
  };
});
