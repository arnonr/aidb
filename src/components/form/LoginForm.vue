<template>
  <div class="fadeindown animation-duration-1000 animation-linear">
    <Card
      class="pt-4 pb-4 pl-2 pr-2 sm:pt-4 sm:pb-4 sm:pl-7 sm:pr-7 border-round-2xl mx-auto relative z-1"
      style="max-width: 480px"
    >
      <template #title>
        <div class="text-center text-3xl sm:text-4xl mb-5 text-black-alpha-90">
          ยินดีต้อนรับสู่ระบบ AIDM
        </div>
      </template>
      <template #content>
        <form @submit.prevent="submit">
          <label
            for="username"
            class="block text-700 text-sm uppercase font-bold mb-2"
          >
            อีเมล หรือเบอร์โทรศัพท์ (มือถือ)</label
          >
          <InputText
            id="username"
            v-model="form.Username"
            type="text"
            class="w-full mb-5"
            placeholder="โปรดกรอกอีเมล หรือเบอร์โทรศัพท์ (มือถือ)"
            style="padding: 1rem"
          />

          <label
            for="password"
            class="block text-700 font-bold text-sm uppercase mb-2"
            >รหัสผ่าน</label
          >
          <Password
            id="password"
            v-model="form.Password"
            placeholder="โปรดกรอกรหัสผ่าน"
            :toggleMask="true"
            :feedback="false"
            class="w-full mb-2"
            inputClass="w-full"
            inputStyle="padding:1rem"
          ></Password>

          <div class="mb-5">
            <router-link
              to="/reset-password"
              class="font-bold no-underline ml-2 text-right cursor-pointer"
              style="color: #3b82f6"
            >
              ลืมรหัสผ่าน?
            </router-link>
          </div>
          <Button
            type="submit"
            label="ลงชื่อเข้าใช้งาน"
            class="w-full p-3 text-lg border-round-xl p-button-shadow"
          ></Button>
          <div class="my-4 block text-center">
            <span class="text-sm font-bold text-black-alpha-60"
              >หรือคุณจะสมัครบัญชีด้วย</span
            >
          </div>
          <!-- <div class="mb-3">
            <Button
              type="button"
              class="p-3 w-full p-button-outlined p-button-secondary border-black-alpha-20 border-round-xl flex align-items-center justify-content-center"
              @click="handleSignIn"
            >
              <img
                class="max-w-2rem"
                src="@/assets/images/icons/icon-google.png"
                alt="google"
              />
              <span class="ml-2 font-bold text-black-alpha-90"
                >สมัครบัญชีด้วย Google</span
              >
            </Button>
          </div> -->
        </form>

        <div
          class="text-lg text-center mt-5 relative z-1 text-900 lg:text-black"
        >
          ระบบสมัครสมาชิกอยู่ระหว่างปรับปรุง
        </div>

        <div
          class="text-lg text-center mt-5 relative z-1 text-900 lg:text-black"
        >
          คุณยังไม่มีบัญชีเข้าใช้งาน?
          <router-link
            to="/register"
            class="text-900 lg:text-black underline cursor-pointer"
          >
            สมัครบัญชี
          </router-link>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import store from "@/service/Vuex";
import router from "@/router";
import { inject } from "vue";
// };
export default {
  data() {
    return {
      form: {
        Username: "",
        Password: "",
      },
    };
  },
  setup() {
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    return {
      Vue3GoogleOauth,
    };
  },
  mounted() {},
  methods: {
    async handleSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();

        if (!googleUser) {
          return null;
        }
        this.user = googleUser.getBasicProfile().getEmail();
        store.dispatch("SetGoogleMail", this.user);
        this.$router.push("/register");

        // console.log(this.user);
      } catch (error) {
        // console.log(error);
        return null;
      }
    },
    async submit() {
      await store
        .dispatch("login", this.form)
        .then(() => {
          // console.log(res);
          router.push({ name: "gateway" });
        })
        .finally(() => {
          this.form.Password = "";
        });
    },
  },
};
</script>

<style scoped>
.p-card {
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.12);
}

.p-button-shadow {
  box-shadow: 0px 4px 12px rgba(68, 126, 242, 0.7);
}

.p-button {
  background: #3b82f6;
  border: 1px solid #3b82f6;
}

.p-button:enabled:hover {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.p-button:enabled:active {
  background: #1d4ed8;
  color: #ffffff;
  border-color: #1d4ed8;
}
</style>
