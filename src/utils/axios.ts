import Axios from "axios-observable";
import { FM_API_URL } from "@/variables";
import { useAuthStore } from "@/store/auth.store";
import router from "@/router";

const fmAPI = Axios.create({
  baseURL: FM_API_URL,
});

fmAPI.interceptors.request.use((request) => {
  const authStore = useAuthStore();
  if (request.headers) {
    if (authStore.tokenForAuthorization) {
      request.headers.Authorization = authStore.tokenForAuthorization;
    }
  }
  return request;
});

fmAPI.interceptors.response.use(
  (res) => res,
  (error) => {
    interceptorError(error);
    return Promise.reject(error);
  }
);

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function interceptorError(error: any): void {
  if (error.response) {
    // const dataError = error.response.data as HttpValidationError | ErrorModel | string;
    const authStore = useAuthStore();
    switch (error.response.status) {
      case 401:
        authStore.logout();
        router.push({ name: "signIn" }).then();
        break;
      default:
        break;
    }
  } else if (!error.request) {
    // ElMessage({ type: "error", message: error.message });
  }
}

export { fmAPI };
