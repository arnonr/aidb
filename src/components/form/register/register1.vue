<template>
  <form>
    <div class="grid flex align-items-end">
      <div class="col-12">
        <Message severity="error" v-if="error" class="w-full">{{
          error
        }}</Message>
      </div>

      <div class="col-9">
        <label
          for="idcard"
          class="block text-700 text-sm uppercase font-bold mb-2"
        >
          กรอกรหัสบุคลากร
        </label>
        <!-- <router-link :to="{ name: 'gateway' }"> สมัครสมาชิก </router-link> -->
        <InputText
          id="idcard"
          v-model="idcard"
          type="text"
          class="w-full"
          style="padding: 1rem"
        />
      </div>
      <div class="col-3">
        <!-- <router-link :to="{ name: 'gateway' }"> -->
        <Button
          label="ตรวจสอบ"
          class="w-full p-3 text-lg border-round-xl p-button-shadow"
          @click="submit()"
        ></Button>

        <!-- </router-link> -->
      </div>
    </div>
  </form>
</template>

<script>
import store from "@/service/Vuex";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      staff: "staff",
    }),
  },
  data() {
    return {
      error: null,
      idcard: null,
      //  cancel requests
      controller: new AbortController(),
    };
  },

  methods: {
    async submit() {
      if (this.idcard) {
        this.error = null;
        await store
          .dispatch("registercheck", this.idcard)
          .then(() => {
            // this.nextPage();
            console.log(this.staff)
            if (this.staff.StaffOrganizationID == null) {
              this.error = "ข้อมูลหน่วยงานไม่ถูกต้อง กรุณาแก้ไขข้อมูลส่วนตัวที่ระบบทะเบียนกลาง";
            }else{
                this.nextPage();
            }
          })
          .catch((errors) => {
            this.error = errors;
          });
      }
    },
  },
  emits: ["next-page", "prev-page"],
  setup(_, { emit }) {
    const nextPage = () => {
      emit("next-page", {
        pageIndex: 0,
      });
    };
    return {
      nextPage,
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
