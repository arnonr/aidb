<template>
  <div class="layout-topbar surface-ground h-6rem">
    <img alt="Logo" src="../assets/images/logo.png" class="max-w-4rem mr-3" />
    <span class="text-4xl font-bold">AIDM</span>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <router-link to="/login">
          <Button
            label="เข้าสู่ระบบ"
            class="btn-reg p-button-info p-button-shadow w-full"
          />
        </router-link>
      </li>
    </ul>
  </div>
  <div
    class="flex align-items-center justify-content-center min-h-screen max-h-screen overflow-hidden relative"
  >
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 100%">
      <div class="col-12 lg:col-8 xl:col-6">
        <resetPassword />
      </div>
    </div>
    <img class="bg-login" src="/images/bg/bg-login.png" alt="bg" />
  </div>
</template>

<script>
import { ref } from "vue";
import resetPassword from "../components/form/reset-password/resetpwd1.vue";

export default {
  components: { resetPassword },
  setup() {
    const isRegister = ref(false);

    return {
      isRegister,
    };
  },
};
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

.bg-login {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 0;
}
</style>
