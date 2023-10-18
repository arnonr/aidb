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
        <router-link :to="{ name: 'login' }">
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
    <div
      class="grid justify-content-center p-2 lg:p-0 mt-6"
      style="min-width: 100%"
    >
      <div class="col-12 lg:col-8 xl:col-6">
        <Card
          class="pt-4 pb-4 pl-2 pr-2 sm:pt-4 sm:pb-4 sm:pl-7 sm:pr-7 border-round-2xl mx-auto relative z-1"
          style="max-width: 5000px"
        >
          <template #title>
            <div
              class="text-center text-3xl sm:text-4xl mb-5 text-black-alpha-90"
            >
              สมัครสมาชิกระบบ AIDM
            </div>
            <Steps :model="steps" :readonly="true" />
          </template>
          <template #content>
            <router-view
              v-slot="{ Component }"
              @prevPage="prevPage($event)"
              @nextPage="nextPage($event)"
            >
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>

            <div
              class="text-lg text-center mt-5 relative z-1 text-900 xl:text-black"
            >
              กรณีที่ไม่มีรหัสบุคลากร
              <router-link
                to="/register-personnel"
                class="text-900 xl:text-black underline cursor-pointer"
              >
                สมัครบัญชี
              </router-link>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <img class="bg-login" src="/images/bg/bg-login.png" alt="bg" />
  </div>
</template>

<script>
// import { ref } from "vue";
// import RegisterForm from "../components/form/register/register1.vue";

// export default {
//   components: { RegisterForm },
// setup() {
//   const isRegister = ref(false);

//   const handleSwitchForm = (val) => {
//     isRegister.value = val;
//   };

//   return {
//     isRegister,
//     handleSwitchForm,
//   };
// }
// }
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const steps = ref([
      {
        label: "รหัสบุคลากร ",
        to: "/register",
      },
      {
        label: "ข้อมูลบุคลากร",
        to: "/register/personal",
      },
      {
        label: "ลงทะเบียน",
        to: "/register/info",
      },
    ]);
    const nextPage = (event) => {
      router.push(steps.value[event.pageIndex + 1].to);
    };
    const prevPage = (event) => {
      router.push(steps.value[event.pageIndex - 1].to);
    };
    return {
      router,
      steps,
      nextPage,
      prevPage,
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

.btn-reg.p-button-shadow {
  box-shadow: 0px 4px 12px rgba(68, 126, 242, 0.7);
}
</style>
