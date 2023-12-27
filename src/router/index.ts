// Composables
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth.store";
import LayoutAuth from "@/layouts/auth/LayoutAuth.vue";
import SignIn from "@/views/auth/SignIn.vue";
import SignUp from "@/views/auth/SignUp.vue";
import ForgotPassword from "@/views/auth/ForgotPassword.vue";
import ResetPassword from "@/views/auth/ResetPassword.vue";
import LayoutDashboard from "@/layouts/dashboard/LayoutDashboard.vue";
import DashboardDesigner from "@/views/dashboard/DashboardDesigner.vue";
import DashboardStack from "@/views/dashboard/DashboardStack.vue";
import DashboardConversations from "@/views/dashboard/DashboardConversations.vue";
import ProfileSettings from "@/views/account/ProfileSettings.vue";
import Billing from "@/views/account/Billing.vue";
import VerifyEmail from "@/views/auth/VerifyEmail.vue";

const routes = [
  {
    path: "/",
    component: LayoutAuth,
    meta: { requiresAnon: true },
    children: [
      {
        path: "sign-in",
        name: "signIn",
        component: SignIn,
      },
      {
        path: "sign-up",
        name: "signUp",
        component: SignUp,
      },
      {
        path: "forgot-password",
        name: "forgotPassword",
        component: ForgotPassword,
      },
      {
        path: "reset-password/:token",
        component: ResetPassword,
      },
      {
        path: "verify-email/:token",
        component: VerifyEmail,
        meta: { requiresAnon: false },
      },
    ],
  },
  {
    path: "/dashboard",
    component: LayoutDashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "designer",
        name: "designer",
        component: DashboardDesigner,
      },
      {
        path: "stack/:id",
        name: "stack",
        component: DashboardStack,
      },
      {
        path: "conversations",
        name: "conversations",
        component: DashboardConversations,
      },
      {
        path: "/account/settings",
        name: "profileSettings",
        component: ProfileSettings,
      },
      {
        path: "/account/billing",
        name: "billing",
        component: Billing,
      },
    ],
  },
  {
    path: "",
    redirect: { name: "signIn" },
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "signIn" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuth) {
    return {
      name: "signIn",
    };
  }
  if (to.meta.requiresAnon && authStore.isAuth) {
    return {
      name: "designer",
    };
  }
});

export default router;
