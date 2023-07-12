<template>
  <div class="fadeindown animation-duration-1000 animation-linear">
    <Card
      class="
        pt-4
        pb-4
        pl-2
        pr-2
        sm:pt-4 sm:pb-4 sm:pl-7 sm:pr-7
        border-round-2xl
        mx-auto
        relative
        z-1
      "
      style="max-width: 480px"
    >
      <template #title>
        <div class="text-center text-3xl sm:text-4xl mb-5 text-black-alpha-90">
          ลืมรหัสผ่านระบบ AIDM
        </div>
      </template>
      <template #content>
        <form>
          <label
            for="Password"
            class="block text-700 text-sm uppercase font-bold mb-2"
          >
            กรอกรหัสผ่านใหม่</label
          >

          <Password
            id="Password"
            v-model="form.Password"
            :toggleMask="true"
            :feedback="false"
            inputClass="w-full"
            class="w-full mb-5"
            placeholder="กรอกรหัสผ่านใหม่"
          />
          <label
            for="confirmPassword"
            class="block text-700 text-sm uppercase font-bold mb-2"
          >
            ยืนยันรหัสผ่านใหม่</label
          >
          <Password
            id="confirmPassword"
            v-model="form.confirmPassword"
            :toggleMask="true"
            :feedback="false"
            inputClass="w-full"
            class="w-full mb-5"
            placeholder="ยืนยันรหัสผ่านใหม่"
          />
          <!-- <router-link to="/login"> -->
          <label
            v-if="has.error"
            for="confirmPassword"
            class="block text-red-500 text-sm uppercase font-bold mb-2"
          >
            * ยืนยันรหัสผ่านใหม่</label
          >
          <Button
            label="ยืนยันเปลี่ยนรหัสผ่าน"
            class="w-full p-3 text-lg border-round-xl p-button-shadow"
            @click="confirm"
          ></Button>
          <!-- </router-link> -->
        </form>
      </template>
    </Card>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      has: { error: false },
      form: {},
    };
  },
  mounted() {
    console.log(
      "/user?ResetPasswordToken=" + eval(new String(this.$route.query.token))
    );
    this.load();
  },
  methods: {
    load() {
      axios
        .get(
          "/user?ResetPasswordToken=" +
            eval(new String(this.$route.query.token))
        )
        .then((response) => {
          this.data = response.data.rows;
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => console.log(this.data[0].UserID));
    },
    confirm() {
      if (this.form.Password == this.form.confirmPassword) {
        axios
          .put("/user/" + this.data[0].UserID, {
            Password: this.form.Password,
          })
          .then(() => {
            window.location.href = "/login";
          });
      } else {
        this.has.error = true;
      }
    },
  },

  emits: ["switch"],
  setup(_, { emit }) {
    const email = ref("");
    const password = ref("");

    const handleSwitch = () => {
      emit("switch", true);
    };

    return {
      email,
      password,
      handleSwitch,
    };
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
</style>
