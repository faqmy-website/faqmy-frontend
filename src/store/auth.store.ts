// Utilities
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { KEY_LS_TOKEN } from "@/variables";
import { map, Observable, switchMap, tap } from "rxjs";
import authResource from "@/resource/auth/auth.resource";
import { useUserStore } from "@/store/user.store";
import { Token } from "@/resource/auth/auth";
import { useBillingStore } from "@/store/billing.store";

function getLSToken(): Token | null {
  const data = localStorage.getItem(KEY_LS_TOKEN);
  if (data) {
    try {
      return JSON.parse(data) as Token;
    } catch {
      setLSToken(null);
      return null;
    }
  } else return null;
}
function setLSToken(value: Token | null): void {
  if (value === null) {
    localStorage.removeItem(KEY_LS_TOKEN);
    return;
  }
  localStorage.setItem(KEY_LS_TOKEN, JSON.stringify(value));
}

export const useAuthStore = defineStore("auth", () => {
  const token = ref<null | Token>(getLSToken());

  const isAuth = computed<boolean>(() => {
    //todo: expired and valid token
    return token.value !== null;
  });

  const tokenForAuthorization = computed<string | null>(() => {
    if (token.value !== null) {
      return `${token.value.tokenType} ${token.value.token}`;
    }
    return null;
  });

  function signUp(email: string, password: string): Observable<null> {
    return authResource.signUp(email, password).pipe(
      switchMap(() => {
        return signIn(email, password);
      })
    );
  }
  function signIn(email: string, password: string): Observable<null> {
    return authResource.singIn(email, password).pipe(
      tap((data) => {
        token.value = data;
        setLSToken(data);
        const userStore = useUserStore();
        userStore.fetchUser().subscribe();
      }),
      switchMap(() => {
        const billingStore = useBillingStore();
        return billingStore.fetchBilling();
      }),
      map(() => {
        return null;
      })
    );
  }

  function logout() {
    setLSToken(null);
    token.value = null;
    const userStore = useUserStore();
    userStore.$reset();
    const billingStore = useBillingStore();
    billingStore.$reset();
  }

  return {
    isAuth,
    tokenForAuthorization,
    signUp,
    signIn,
    logout,
  };
});
