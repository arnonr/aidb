<template>
  <form>
    <div class="formgrid grid text-base">
      <div class="col-12">
        <Message severity="error" v-if="error" class="w-full">{{
          error
        }}</Message>
      </div>
      <div class="field col-12">
        <label for="Email">อีเมล</label>
        <InputText
          id="Email"
          type="email"
          :class="{ 'p-invalid': !form.Username && error }"
          class="surface-overlay surface-border border-round appearance-none outline-none focus:border-primary w-full"
          v-model="form.Username"
        />
      </div>
      <div class="field col-12">
        <label for="PASSWORD" class="block">รหัสผ่าน</label>

        <Password
          id="password"
          type="password"
          v-model="form.Password"
          :class="{ 'p-invalid': !form.Password && error }"
          class="w-full"
          inputClass="w-full"
          :toggleMask="true"
        ></Password>
        <!-- <InputText
          v-model="form.Password"
          :class="{ 'p-invalid': !form.Password && error }"
          id="PASSWORD"
          type="password"
          class="surface-overlay surface-border border-round appearance-none outline-none focus:border-primary w-full"
        /> -->
      </div>
      <div class="field col-12">
        <label for="tel">เบอร์โทรศัพท์มือถือ</label>
        <InputText
          v-model="form.StaffMobilePhone"
          :class="{ 'p-invalid': !form.StaffMobilePhone && error }"
          id="tel"
          type="text"
          class="surface-overlay surface-border border-round appearance-none outline-none focus:border-primary w-full"
        />
      </div>
      <div class="field col-12">
        <label for="tel">กลุ่มผู้ใช้งาน</label>
        <Dropdown
          :class="{ 'p-invalid': !form.GroupID && error }"
          @click="load_selection()"
          v-model="form.GroupID"
          :options="Group"
          optionLabel="GroupName"
          optionValue="GroupID"
          placeholder="เลือกกลุ่มผู้ใช้งาน"
          class="surface-overlay surface-border border-round appearance-none outline-none focus:border-primary w-full"
        />
      </div>
      <div class="field col-12">
        <h5>ประเภทสัตว์ที่รับผิดชอบ</h5>
        <label for="farm" class="block text-600 text-sm font-bold mb-2">
          ประเภทสัตว์
        </label>

        <MultiSelect
          :class="{ 'p-invalid': !form.AnimalTypeID && error }"
          v-model="form.AnimalTypeID"
          :options="Animal"
          optionLabel="label"
          optionValue="value"
          placeholder="เลือกประเภทสัตว์"
          display="chip"
          class="w-full"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-6">
        <Button
          label="ย้อนกลับ"
          class="p-3 w-full text-lg border-round-xl p-button-shadow"
          @click="prevPage()"
        ></Button>
      </div>
      <div class="field col-6">
        <Button
          label="สมัครสมาชิก"
          class="p-3 w-full text-lg border-round-xl p-button-shadow"
          @click="submit()"
        ></Button>
      </div>
    </div>
    <!-- Confirm Dialog -->
    <Dialog
      header=""
      v-model:visible="displayConfirmModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <div class="text-center text-teal-700">
        <img src="..\..\..\assets\images\check-circle-fill.svg" alt="icons" />
        <h1>การสมัครสมาชิกสำเร็จ</h1>
      </div>
      <div class="col-12 lg:col-12">
        <div class="formgrid grid">
          <div class="field col-12 sm:col-12 text-center">
            <label class="text-xl block text-600 text-sm font-bold mb-2">
              รอการอนุมัติจากผู้ดูแล
            </label>
            <!-- <InputText type="text" class="w-full" /> -->
          </div>
        </div>
      </div>
      <div class="col-12 text-right mt-5">
        <!-- <Button
            label="ยกเลิก"
            icon="pi pi-times"
            @click="closeConfirmModal"
            class="p-button-text mx-2"
          />
          <Button
            label="บันทึกข้อมูล"
            icon="pi pi-save"
            @click="confirmModal"
            autofocus
          /> -->
      </div>
      <template #footer> </template>
    </Dialog>
  </form>
</template>

<script>
import { ref } from "vue";
import store from "@/service/Vuex";
import { mapGetters } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  computed: {
    ...mapGetters({
      staff: "staff",
      getGoogleMail: "getGoogleMail",
    }),
  },

  data() {
    return {
      load: false,
      Group: [],
      form: {
        Username: "",
        Password: "",
        StaffMobilePhone: "",
        GroupID: "",
        AnimalTypeID: null,
      },
      error: null,
      Animal: [
        {
          value: 1,
          label: "โคเนื้อ",
          key: "A",
        },
        {
          value: 2,
          label: "กระบือ",
          key: "B",
        },
        {
          value: 3,
          label: "แพะ",
          key: "B",
        },
      ],
    };
  },

  mounted() {
    if (this.getGoogleMail) {
      this.form.Username = this.getGoogleMail;
    } else if (this.staff.StaffEmail) {
      this.form.Username = this.staff.StaffEmail;
    }
    if (this.staff.StaffMobilePhone) {
      this.form.StaffMobilePhone = this.staff.StaffMobilePhone;
    }
  },
  methods: {
    load_selection() {
      if (this.load == false) {
        this.load = true;
        axios
          .get("/group", {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiVXNlcklEIjoxLCJVc2VybmFtZSI6ImFybm9uLnJAdGdkZS5rbXV0bmIuYWMudGgiLCJleHAiOjE3NjI4NDUzNzYsImlhdCI6MTY1NzYxMDE3Nn0.ZS2_Mmmn730ZKn4WDpxBNfEFzxFqmG_ZnNXQkhwhyYw`,
            },
          })
          .then((response) => {
            this.Group = response.data.rows.filter(
              (item) => item.GroupCode != "01"
            );
          });
      }
    },
    validataion() {
      if (
        !this.form.Username ||
        !this.form.Password ||
        !this.form.StaffMobilePhone ||
        !this.form.GroupID ||
        !this.form.AnimalTypeID
      ) {
        this.error = "กรุณากรอกข้อมูลให้ครบ";
        return false;
      }
      this.error = null;
      return true;
    },
    async submit() {
      if (this.validataion() == true) {
        await store
          .dispatch("register", this.form)
          .then(() => {
            this.displayConfirmModal = true;

            setTimeout(() => {
              this.nextPage();
            }, 5000);
          })
          .catch((errors) => {
            this.error = errors;
          });
      }
    },
  },
  emits: ["switch", "next-page", "prev-page"],
  setup(_, { emit }) {
    const router = useRouter();

    const nextPage = () => {
      router.push("/login");
    };

    const prevPage = () => {
      emit("prev-page", { pageIndex: 2 });
    };
    const email = ref("");
    const password = ref("");
    const checked = ref(false);
    const cities = ref([]);
    const displayConfirmModal = ref(false);
    const openConfirmModal = () => {
      displayConfirmModal.value = true;
    };
    const closeConfirmModal = () => {
      displayConfirmModal.value = false;
    };
    return {
      openConfirmModal,
      closeConfirmModal,
      displayConfirmModal,
      checked,
      cities,
      email,
      password,
      prevPage,
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
