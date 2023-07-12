<template>
  <div class="fadeindown animation-duration-1000 animation-linear">
    <Card
      class="pt-4 pb-4 pl-2 pr-2 sm:pt-4 sm:pb-4 sm:pl-7 sm:pr-7 border-round-2xl mx-auto relative z-1"
      style="max-width: 480px"
    >
      <template #title>
        <div class="text-center text-3xl sm:text-4xl mb-5 text-black-alpha-90">
          ลืมรหัสผ่านระบบ AIDM
        </div>
      </template>
      <template #content>
        <Message v-if="messageEmailNotFound" severity="error"> อีเมลไม่ถูกต้อง </Message>
        <form @submit.prevent="sendEmail(!v$.$invalid)">
          <label for="email" class="block text-700 text-sm uppercase font-bold mb-2">
            อีเมล
          </label>
          <InputText
            id="email"
            type="email"
            v-model.trim="v$.email.$model"
            placeholder="example@email.com"
            :class="{ 'p-invalid': v$.email.$invalid && submitted }"
            class="surface-overlay border-round appearance-none outline-none focus:border-primary w-full"
            autofocus
            :disabled="loading"
          />
          <span v-if="v$.email.$error && submitted">
            <span
              id="email-error"
              v-for="(error, index) of v$.email.$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
            class="p-error"
          >
            {{ v$.email.required.$message.replace("Value", "Email") }}</small
          >
          <Button
            type="submit"
            label="ส่งข้อมูลไปยังอีเมล"
            class="w-full p-3 text-lg border-round-xl p-button-shadow mt-5"
            :loading="loading"
          />
        </form>
      </template>
    </Card>
  </div>
</template>

<script>
import Message from "primevue/message";
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import Swal from "sweetalert2";
import router from "@/router";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: "",
      loading: false,
      submitted: false,
      messageEmailNotFound: false,
    };
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage("กรุณากรอกอีเมล", required),
        email: helpers.withMessage("กรุณากรอกรูปแบบอีเมลให้ถูกต้อง", email),
      },
    };
  },
  components: { Message },
  watch: {
    email(newValue) {
      if (newValue) {
        this.messageEmailNotFound = false;
      }
    },
  },
  methods: {
    async sendEmail(isValid) {
      this.messageEmailNotFound = false;
      this.submitted = true;
      this.loading = true;

      if (!isValid) {
        this.loading = false;
        return;
      }

      try {
        await axios.post("/user/forgot-password", { email: this.email });
        this.loading = false;
        this.alertSuccess();
        this.email = "";
      } catch (error) {
        this.loading = false;
        this.messageEmailNotFound = true;
      }
    },
    alertSuccess() {
      Swal.fire({
        text: "รหัสผ่านใหม่ได้ถูกส่งไปยังอีเมลของท่านแล้ว",
        icon: "success",
        confirmButtonText: "กลับไปหน้าเข้าสู่ระบบ",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push({ name: "login" });
        }
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.p-card {
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.12);
}

.p-button-shadow {
  box-shadow: 0px 4px 12px rgba(68, 126, 242, 0.7);
}
</style>
