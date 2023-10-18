<template>
  <form>
    <h3>ข้อมูลบุคลากร</h3>
    <div class="formgrid grid text-base">
      <div class="field col-12">
        <label for="idcard"
          ><span class="font-bold">เลขบัตรประจำตัวประชาชน</span>

          {{ staff.StaffIdentificationNumberTemp }}
        </label>
        <!-- <InputText id="Email" type="text" class="
                  surface-overlay surface-border
                  border-round
                  appearance-none
                  outline-none
                  focus:border-primary
                  w-full
                " /> -->
      </div>
      <div class="field col-12">
        <label for="Email"
          ><span class="font-bold">ชื่อ</span>
          {{
            `${staff.Title.TitleShortName}${staff.StaffGivenName} ${staff.StaffSurname}`
          }}
        </label>
      </div>
      <div class="field col-12">
        <label for="Email"
          ><span class="font-bold">ที่อยู่</span>
          {{ Address }}
        </label>
      </div>

      <div class="field col-12">
        <label for="Email"
          ><span class="font-bold">ตำแหน่ง</span>
          {{ staff.Position.PositionName }}
          <span class="font-bold" v-if=" staff.Organization">หน่วยงาน</span>
          <span v-if=" staff.Organization">{{ staff.Organization.OrganizationName }}</span>
         
        </label
        >
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
          label="ดำเนินการต่อไป"
          class="p-3 w-full text-lg border-round-xl p-button-shadow"
          @click="nextPage()"
        ></Button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      staff: "staff",
    }),
  },
  data() {
    return {
      Address: "",
    };
  },
  watch: {
    staff() {
      this.Address = "";
      this.load();
    },
  },

  mounted() {
    console.log(this.staff)
    // console.log(this.staff.StaffIdentificationNumber);

    if (this.staff.StaffIdentificationNumber) {
      this.staff.StaffIdentificationNumberTemp =
        this.staff.StaffIdentificationNumber.replace(/.{0,4}$/, "") + "XXXX";
    }
  },
  methods: {
    load() {
      let a = "";
      let b = "";
      let c = "";
      let d = "";
      let e = "";
      let f = "";
      let g = "";

      if (this.staff.StaffAddress) {
        a = this.staff.StaffAddress;
      }
      if (this.staff.StaffMoo) {
        b = this.staff.StaffMoo;
      }
      if (this.staff.StaffStreet) {
        c = this.staff.StaffStreet;
      }
      if (this.staff.StaffTumbolID) {
        d = this.staff.Tumbol.TumbolName;
      }
      if (this.staff.StaffAmphurID) {
        e = this.staff.Amphur.AmphurName;
      }
      if (this.staff.StaffProvinceID) {
        f = this.staff.Province.ProvinceName;
      }
      if (this.staff.StaffZipCode) {
        g = this.staff.StaffZipCode;
      }
      this.Address = `${a} ${b} ${c} ${d} ${e} ${f} ${g}`;
    },
  },
  emits: ["switch", "next-page", "prev-page", "StaffID"],
  setup(_, { emit }) {
    const nextPage = () => {
      emit("next-page", { pageIndex: 1 });
    };

    const prevPage = () => {
      emit("prev-page", { pageIndex: 1 });
    };
    const email = ref("");
    const password = ref("");
    const checked = ref(false);
    const cities = ref([]);

    return {
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
