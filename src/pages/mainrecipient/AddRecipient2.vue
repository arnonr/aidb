<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="เพิ่มเตรียมแม่ตัวรับ (Recipient)" :pages="breadcrumb" />
      <div class="card mb-5">
        <div class="mb-5">
          <h1 class="text-2xl mb-0 text-600">ข้อมูลแม่ตัวรับ (Recipient)</h1>
        </div>
        <DataTable
          class="text-sm"
          :value="selectItem"
          responsiveLayout="scroll"
        >
          <Column field="show_id" header="ลำดับ" class="text-center"></Column>
          <Column
            field="AnimalIdentificationID"
            header="หมายเลขโค"
            class="text-center"
          ></Column>
          <Column
            field="AnimalName"
            header="ชื่อโค"
            class="text-center"
          ></Column>
          <Column
            field="AnimalBirthDate"
            header="วัน/เดือน/ปีเกิด"
            class="text-center"
          ></Column>
          <Column field="AnimalAge" header="อายุ" class="text-center"></Column>
          <Column
            field="AnimalBreedAll"
            header="สายพันธุ์"
            class="text-center"
          ></Column>
          <Column
            field="AnimalStatus.AnimalStatusName"
            header="สถานะ"
            class="text-center"
          ></Column>
          <Column
            field="AnimalType.AnimalTypeName"
            header="ชนิด"
            class="text-center"
          ></Column>
        </DataTable>
      </div>
      <div class="card">
        <div class="mb-5">
          <h4 class="text-2xl mb-0 text-600">
            เลือกโปรแกรมให้ตัวรับ (Recipient)
          </h4>
        </div>
        <form class="grid col-12">
          <div class="col-12 lg:col-12">
            <div class="grid">
              <div class="col-12 lg:col-8">
                <label for="farm" class="block text-600 text-sm font-bold mb-2">
                  โปรแกรม<span class="text-red-500"> *</span></label
                >
                <Dropdown
                  class="w-full"
                  :options="program"
                  optionLabel="Fullname"
                  optionValue="PresetID"
                  placeholder="เลือกโปรแกรม"
                  :showClear="true"
                  :filter="true"
                  v-model="form.PresetID"
                  :class="{ 'p-invalid': !form.PresetID && valid }"
                >
                </Dropdown>
              </div>
              <div class="col-12 lg:col-4">
                <label for="farm" class="block text-600 text-sm font-bold mb-2">
                  วันที่ย้ายฝาก<span class="text-red-500"> *</span></label
                >
                <Calendar
                  class="w-full"
                  id="datebirth"
                  :showButtonBar="true"
                  :showIcon="true"
                  v-model="form.StartDate"
                  :class="{ 'p-invalid': !form.StartDate && valid }"
                />
              </div>
              <div class="col-12 lg:col-8">
                <label for="farm" class="block text-600 text-sm font-bold mb-2">
                  รหัสเจ้าหน้าที่รับผิดชอบ<span class="text-red-500">
                    *</span
                  ></label
                >
                <Dropdown
                  class="w-full"
                  id="selectedstatus"
                  :options="personal"
                  optionLabel="Fullname"
                  optionValue="StaffID"
                  placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
                  :showClear="true"
                  :filter="true"
                  v-model="form.ResponsibilityStaffID"
                  :class="{ 'p-invalid': !form.ResponsibilityStaffID && valid }"
                />
              </div>
            </div>
          </div>
        </form>
        <div class="mb-5 mt-5">
          <h4 class="text-2xl mb-0 text-600">
            เลือกโปรแกรมให้ตัวรับ (Recipient)
          </h4>
        </div>
        <DataTable
          class="text-sm"
          :value="setting"
          :paginator="true"
          :rows="10"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column field="newDate" header="วันที่" class="text-center"></Column>
          <Column field="Detail" header="กิจกรรม" class="text-center"></Column>
          <Column
            field="Description"
            header="รายละเอียด"
            class="text-center"
          ></Column>
          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <SplitButton
                label="แก้ไข"
                icon="pi pi-pencil"
                @click="open_edit(slotProps)"
                class="p-button-sm p-button-outlined p-button-warning"
              >
              </SplitButton>
            </template>
          </Column>
        </DataTable>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeAddModal"
          />
          <Button label="บันทึกข้อมูล" class="ml-3 w-full" @click="add()" />
        </div>
      </div>
    </div>
    <!-- EDIT Dialog -->
    <Dialog
      header="แก้ไขกิจกรรมของโปรแกรม"
      v-model:visible="displayEditModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="grid">
            <div class="col-12 lg:col-12">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                วันที่</label
              >
              <Calendar
                class="w-full"
                id="date"
                v-model="formModel.setDate"
                :manualInput="false"
                placeholder=""
                :showIcon="true"
              />
            </div>
            <div class="col-12 lg:col-12">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                กิจกรรม</label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                :options="activity"
                optionLabel="PresetActivityName"
                optionValue="PresetActivityID"
                placeholder="เลือกกิจกรรม"
                :showClear="true"
                :filter="true"
                v-model="formModel.PresetActivityID"
                :key="index"
              />
            </div>
            <div class="col-12 lg:col-12">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                รายละเอียด
              </label>
              <InputText
                v-model="formModel.Description"
                id="farm"
                class="w-full"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeEditModal"
          />
          <Button label="บันทึกข้อมูล" class="ml-3 w-full" @click="update()" />
        </div>
      </form>
    </Dialog>
    <!-- End EDIT Dialog -->
    <!-- Start Delete Dialog -->
    <Dialog
      header="ตรวจสอบข้อมูล"
      v-model:visible="displaydelete"
      :style="{ width: '350px' }"
      :modal="true"
    >
      <div class="confirmation-content text-center">
        <i class="pi pi-trash" style="font-size: 5rem" />
        <br />
        <span class="text-xl">คุณต้องการลบรายการเตรียมแม่ตัวรับใช่หรือไม่</span>
      </div>
      <template #footer>
        <div class="col-12 text-center flex justify-content-between">
          <Button
            label="ยกเลิก"
            @click="closeConfirmation"
            class="p-button-secondary w-full mr-3"
          />
          <Button
            label="ยืนยัน"
            @click="closeConfirmation"
            class="p-button-danger w-full ml-3"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import axios from "axios";
import { useRoute } from "vue-router";
export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      selectItem: "selectItem",
      user: "user",
    }),
  },
  data() {
    return {
      url: "/preset",
      urlDonor: "/recipient",
      urlDonorAct: "/recipient-activity",
      urlDetail: "/preset-detail",
      apiPersonal: "/staff?isActive=1",
      apiOrganizationID: "/organization?isActive=1",
      apiActivity: "/preset-activity?isActive=1",
      apiAnimalTypeID: "/animal-type?isActive=1",
      data: [],
      isLoading: false,
      valid: false,

      farmid: "",
      form: {
        isActive: "",
      },

      formModel: {
        isActive: "",
      },

      formDay: [],
      PresetFor: [
        {
          id: "D",
          name: "ตัวให้ (Donor)",
        },
        {
          id: "R",
          name: "ตัวรับ (Recipient)",
        },
      ],
      program: [],
      personal: [],
      organization: [],
      activity: [],
      animaltype: [],
      day: [
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 },
        { name: 5 },
        { name: 6 },
        { name: 7 },
        { name: 8 },
        { name: 9 },
        { name: 10 },
        { name: 11 },
        { name: 12 },
        { name: 13 },
        { name: 14 },
        { name: 15 },
        { name: 16 },
        { name: 17 },
        { name: 18 },
        { name: 19 },
        { name: 20 },
        { name: 21 },
        { name: 22 },
        { name: 23 },
        { name: 24 },
        { name: 25 },
        { name: 26 },
        { name: 27 },
        { name: 28 },
        { name: 29 },
        { name: 30 },
        { name: 31 },
      ],
      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],
      setting: [
        {
          id: 1,
        },
      ],

      codeProgram: "",
      nameProgram: "",
      forProgram: "",

      formdata: [],

      presetDetail: [],
      getItemDelete: [],
      //  cancel requests
      controller: new AbortController(),

      // Modal
      display_add: false,
      display_edit: false,
      display_delete: false,
    };
  },
  mounted() {
    const route = useRoute();
    // console.log(route.params.id);

    this.farmid = route.params.id;
    this.isLoading = true;

    axios
      .get(this.url, {
        signal: this.controller.signal,
      })
      .then((response) => {
        if (this.animal_id == 1) {
          this.program = response.data.rows.filter(
            (item) =>
              item.PresetFor === "R" &&
              (item.AnimalTypeID === 1 || item.AnimalTypeID === 2)
          );
        } else if (this.animal_id == 2) {
          this.program = response.data.rows.filter(
            (item) =>
              item.PresetFor === "R" &&
              (item.AnimalTypeID === 3 || item.AnimalTypeID === 4)
          );
        } else if (this.animal_id == 3) {
          this.program = response.data.rows.filter(
            (item) =>
              item.PresetFor === "R" &&
              (item.AnimalTypeID === 17 || item.AnimalTypeID === 18)
          );
        }
        for (let i = 0; i < this.program.length; i++) {
          this.program[i].show_id = i + 1;
          this.program[i].Fullname =
            this.program[i].PresetCode + ", " + this.program[i].PresetName;
          this.program[i].PresetFor =
            this.program[i].PresetFor == "D"
              ? "ตัวให้ (Donor)"
              : "ตัวรับ (Recipient)";
        }

        // console.log(this.program);
      })
      .finally(() => {
        this.isLoading = false;
      });

    axios
      .get(this.apiPersonal, { signal: this.controller.signal })
      .then((response) => {
        this.personal = response.data.rows.map((item) => {
          return {
            StaffID: item.StaffID,
            StaffNumber: item.StaffNumber,
            Fullname:
              item.StaffNumber +
              ", " +
              item.StaffGivenName +
              " " +
              item.StaffSurname,
          };
        });
      });

    axios
      .get(this.apiActivity, { signal: this.controller.signal })
      .then((response) => {
        this.activity = response.data.rows;
      });
    this.form.ResponsibilityStaffID = this.user.StaffID;
  },

  setup() {
    const breadcrumb = ref([
      { label: "เตรียมแม่ตัวรับ (Recipient)", to: "/embryo/recipient" },
      { label: "เพิ่มเตรียมแม่ตัวรับ (Recipient)", to: "" },
    ]);

    const displayAddModal = ref(false);
    const openAddModal = () => {
      displayAddModal.value = true;
    };
    const closeAddModal = () => {
      displayAddModal.value = false;
    };

    const displayEditModal = ref(false);
    const openEditModal = () => {
      displayEditModal.value = true;
    };
    const closeEditModal = () => {
      displayEditModal.value = false;
    };
    const displaydelete = ref(false);
    const opendisplaydelete = () => {
      displaydelete.value = true;
    };
    const closeConfirmation = () => {
      displaydelete.value = false;
    };
    const date_range = ref();
    const search = ref();
    const selection = ref();
    return {
      selection,
      date_range,
      search,
      breadcrumb,
      displayAddModal,
      openAddModal,
      closeAddModal,
      displayEditModal,
      openEditModal,
      closeEditModal,
      displaydelete,
      opendisplaydelete,
      closeConfirmation,
    };
  },
  watch: {
    // ค้นหา
    "form.PresetID"() {
      this.load();
    },
    "form.StartDate"() {
      // console.log(this.form.StartDate);
      this.load();
    },
  },
  methods: {
    // Axios
    load() {
      this.isLoading = true;
      let url = this.urlDetail + "?size=";
      if (this.form.PresetID && this.form.StartDate) {
        url += "&PresetID=" + this.form.PresetID;

        // console.log(url);
        axios
          .get(url, { signal: this.controller.signal })
          .then((res) => {
            // console.log(res.data.rows);

            this.setting = res.data.rows.sort((a, b) => {
              return a.Day - b.Day;
            });

            dayjs.extend(buddhistEra);
            var today = this.form.StartDate;
            var total = this.setting.length - 1;
            for (let i = 0; i < this.setting.length; i++) {
              const date1 = dayjs(today);
              this.setting[i].newDate = dayjs(
                date1.subtract(
                  this.setting[total].Day - this.setting[i].Day,
                  "day"
                )
              ).format("DD/MM/YYYY");

              // this.seting[i].setDate = this.setting[i].newDate;

              this.setting[i].Detail =
                this.setting[i].PresetActivity.PresetActivityName;
              this.setting[i].oldDate = dayjs(
                date1.add(this.setting[i].Day - this.setting[total].Day, "day")
              );
            }
          })
          .finally(() => {});
      }
    },
    validation() {
      if (
        !this.form.PresetID ||
        !this.form.StartDate ||
        !this.form.ResponsibilityStaffID
      ) {
        this.valid = true;
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "กรุณากรอกข้อมูล",
          life: 5000,
        });
        return false;
      } else {
        return true;
      }
    },
    async add() {
      if (this.validation() == false) {
        return;
      }
      this.form.FarmID = this.farmid;
      this.form.isActive = 1;

      // this.setting = this.setting.sort(function (a, b) {
      //   return new Date(a.ActivityDate) - new Date(b.ActivityDate);
      // });

      // console.log(this.form);

      await axios
        .post(this.urlDonor, this.form)
        .then((res) => {
          let recipientid = res.data.RecipientID;

          // console.log(recipientid);
          for (let i = 0; i < this.selectItem.length; i++) {
            let animalid = this.selectItem[i].AnimalID;

            for (let i = 0; i < this.setting.length; i++) {
              // console.log(this.setting[i].oldDate);

              let formData = {
                RecipientID: recipientid,
                AnimalID: animalid,
                ActivityDate: this.setting[i].oldDate,
                Day: this.setting[i].Day,
                Time: this.setting[i].Time,
                PresetActivityID: this.setting[i].PresetActivityID,
                ResponsibilityStaffID: this.form.ResponsibilityStaffID,
                Description: this.setting[i].Description,
                IsDone: 0,
                IsExclude: "",
                ExcludeRemark: "",
                InseminationTime: "",
              };

              // console.log(formData);

              this.updateActivity(formData);
            }
          }

          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });
          this.$router.push("/embryo/Recipient");
        })

        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },

    async update() {
      axios
        // ค้นหาเฉพาะตัวที่ แก้ไข
        .get(
          this.apiActivity +
            "&PresetActivityID=" +
            this.formModel.PresetActivityID
        )
        .then((res) => {
          this.formModel.Detail = res.data.rows[0].PresetActivityName;
        });

      this.setting.find((item) => {
        if (item.PresetDetailID === this.formModel.PresetDetailID) {
          item.newDate = dayjs(this.formModel.setDate)
            .locale(locale)
            .format("DD/MM/YYYY");
          item.oldDate = this.formModel.setDate
            ? this.formModel.setDate
            : this.formModel.oldDate;
          item.PresetActivityID = this.formModel.PresetActivityID;
          item.Detail = this.formModel.Detail;
          item.Description = this.formModel.Description;
        }
      });

      this.displayEditModal = false;
    },

    async updateActivity(formData) {
      await axios
        .post(this.urlDonorAct, formData)
        .then(() => {})
        // error
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },

    open_edit(id) {
      this.formModel = this.setting.find(
        (x) => x.PresetDetailID == id.data.PresetDetailID
      );

      this.displayEditModal = true;
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
