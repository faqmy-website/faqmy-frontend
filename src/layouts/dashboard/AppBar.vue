<script lang="ts" setup>
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "vue-router";
import authResource from "@/resource/auth/auth.resource";
import logo from "@/assets/images/logo.png";
import { useUserStore } from "@/store/user.store";
import { useDisplay } from "vuetify";

const emit = defineEmits<{
  (e: "clickVAppBarNavIcon"): void;
}>();

const { mobile } = useDisplay();

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();
function logout() {
  authResource.logout().subscribe(() => {
    authStore.logout();
    router.push({ name: "signIn" });
  });
}
//
</script>
<template lang="pug">
VAppBar(flat, color="primary")
  VAppBarNavIcon(
    v-if="mobile",
    variant="flat",
    @click.stop="emit('clickVAppBarNavIcon')"
  )
  RouterLink.d-inline-block.me-2(
    :to="{ name: 'designer' }",
    :class="{ 'ms-4': !mobile }"
  )
    VImg(:src="logo", :width="mobile ? '180px' : '225px'")
  template(#append)
    VBtn#user-menu-activator.font-weight-regular(
      v-if="!mobile",
      append-icon="$accountCircle",
      variant="flat",
      color="primary"
    ) {{ userStore.info?.name || userStore.info?.email }}
    VBtn#user-menu-activator.font-weight-regular(
      v-else,
      icon="$accountCircle",
      variant="flat",
      color="primary"
    )
    VMenu(activator="#user-menu-activator")
      VList
        VListItem(title="Settings", :to="{ name: 'profileSettings' }")
        VListItem(title="Billing", :to="{ name: 'billing' }")
        VDivider
        VListItem(@click="logout") Logout
</template>
<style lang="scss" scoped>
#user-menu-activator {
  text-transform: initial;
}
</style>
