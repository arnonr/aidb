<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="เพิ่มเตรียมแม่ตัวให้ (Donor ET)" :pages="breadcrumb" />

      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหาฟาร์ม</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />
          <Dropdown
            class="w-full"
            :options="farm"
            optionLabel="Fullname"
            optionValue="FarmID"
            placeholder="เลือกฟาร์ม"
            v-model="search.FarmID"
            :filter="true"
            :virtualScrollerOptions="{ itemSize: 38 }"
          />
        </span>
      </div>
      <div class="mt-5 card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">เตรียมแม่ตัวให้ (Donor ET)</h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button
              label="เตรียมโปรแกรม"
              icon="pi pi-plus"
              class="p-button-raised p-button-raised p-button-info"
              @click="add()"
            />
          </div>
        </div>
        <DataTable
          class="text-sm"
          :value="data"
          :paginator="true"
          :rows="10"
          :loading="isLoading"
          v-model:selection="selection"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink
                        LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column selectionMode="multiple" class="text-center"></Column>
          <Column
            field="show_id"
            header="ลำดับ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="AnimalIdentificationID"
            header="หมายเลขโค"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="AnimalName"
            header="ชื่อโค"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="AnimalBirthDate"
            header="วัน/เดือน/ปีเกิด"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="AnimalAge"
            header="อายุ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="AnimalBreedAll"
            header="สายพันธุ์"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="AnimalStatus.AnimalStatusName"
            header="สถานะ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="AnimalType.AnimalTypeName"
            header="ชนิด"
            class="text-center"
            :sortable="true"
          ></Column>
        </DataTable>
      </div>
    </div>
    <!-- end main page -->
    <!-- Add Dialog -->
    <!-- <Dialog header="เพิ่มกิจกรรมย้ายฝากตัวอ่อน" v-model:visible="displayAddModal" :style="{ width: '50vw' }"
            :modal="true">
            <form class="grid mt-2">
                <div class="col-12 lg:col-12">
                    <div class="formgrid grid">
                        <div class="field col-12 sm:col-6">
                            <label class="block text-600 text-sm font-bold mb-2">
                                รอบการให้นม</label>
                            <InputText type="text" class="w-full" />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label class="block text-600 text-sm font-bold mb-2">
                                ครั้งที่ผสม
                            </label>
                            <InputText type="text" class="w-full" />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label class="block text-600 text-sm font-bold mb-2">
                                วันที่ผสม
                            </label>
                            <Calendar class="w-full" id="date" v-model="date" :manualInput="false" placeholder=""
                                :showIcon="true" />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label class="block text-600 text-sm font-bold mb-2">
                                หมายเลขทะเบียนตัวอ่อน
                            </label>
                            <InputText type="text" class="w-full" />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label class="block text-600 text-sm font-bold mb-2">
                                รหัสเจ้าหน้าที่ผู้ผสมเทียม
                            </label>
                            <Dropdown class="w-full" v-model="selecteduser" :options="user" optionLabel="name"
                                :filter="true" :showClear="true" placeholder="ค้นหาและเลือกรหัสเจ้าหน้าที่">
                                <template #value="slotProps">
                                    <div class="country-item country-item-value" v-if="slotProps.value">
                                        <div>{{ slotProps.value.name }}</div>
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                            </Dropdown>
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label class="block text-600 text-sm font-bold mb-2">
                                ชื่อเจ้าหน้าที่ผู้ผสมเทียม
                            </label>
                            <InputText type="text" class="w-full" />
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center mt-5 flex justify-content-between">
                    <Button label="ยกเลิก" class="p-button-secondary w-full mr-3" @click="closeAddModal" />
                    <Button label="บันทึกข้อมูล" class="ml-3 p-button-info w-full" @click="closeAddModal" />
                </div>
            </form>
        </Dialog> -->
    <!-- End Add Dialog -->
    <!-- EDIT Dialog -->
    <!-- <Dialog header="แก้ไขกิจกรรมย้ายฝากตัวอ่อน" v-model:visible="displayEditModal" :style="{ width: '50vw' }"
            :modal="true">
            <form class="grid mt-2">
                <div class="col-12 lg:col-12">
                    <div class="formgrid grid">
                        <div class="field col-12 sm:col-6">
                            <label class="block text-600 text-sm font-bold mb-2">
                                รอบการให้นม</label>
                            <InputText type="text" class="w-full" />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label class="block text-600 text-sm font-bold mb-2">
                                ครั้งที่ผสม
                            </label>
                            <InputText type="text" class="w-full" />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label class="block text-600 text-sm font-bold mb-2">
                                วันที่ผสม
                            </label>
                            <Calendar class="w-full" id="date" v-model="date" :manualInput="false" placeholder=""
                                :showIcon="true" />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label class="block text-600 text-sm font-bold mb-2">
                                หมายเลขทะเบียนตัวอ่อน
                            </label>
                            <InputText type="text" class="w-full" />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label class="block text-600 text-sm font-bold mb-2">
                                รหัสเจ้าหน้าที่ผู้ผสมเทียม
                            </label>
                            <Dropdown class="w-full" v-model="selecteduser" :options="user" optionLabel="name"
                                :filter="true" :showClear="true" placeholder="ค้นหาและเลือกรหัสเจ้าหน้าที่">
                                <template #value="slotProps">
                                    <div class="country-item country-item-value" v-if="slotProps.value">
                                        <div>{{ slotProps.value.name }}</div>
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                            </Dropdown>
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label class="block text-600 text-sm font-bold mb-2">
                                ชื่อเจ้าหน้าที่ผู้ผสมเทียม
                            </label>
                            <InputText type="text" class="w-full" />
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center mt-5 flex justify-content-between">
                    <Button label="ยกเลิก" class="p-button-secondary w-full mr-3" @click="closeAddModal" />
                    <Button label="บันทึกข้อมูล" class="ml-3 p-button-info w-full" @click="closeAddModal" />
                </div>
            </form>
        </Dialog> -->
    <!-- End EDIT Dialog -->
    <!-- Start Delete Dialog -->
    <!-- <Dialog
      header="ตรวจสอบข้อมูล"
      v-model:visible="displaydelete"
      :style="{ width: '350px' }"
      :modal="true"
    >
      <div class="confirmation-content text-center">
        <i class="pi pi-trash" style="font-size: 5rem" />
        <br />
        <span class="text-xl"
          >คุณต้องการลบรายการเตรียมแม่ตัวให้ลำดับ 2 ใช่หรือไม่</span
        >
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
    </Dialog> -->
  </div>
</template>

<script>
import { ref } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import axios from "axios";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { mapGetters } from "vuex";
import store from "@/service/Vuex";
// import { createStore } from "vuex";
export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      selectItem: "selectItem",
    }),
  },
  setup() {
    const breadcrumb = ref([
      // { label: "ระบบย้ายฝากตัวอ่อน", to: "/embryo" },
      // { label: "เตรียมแม่ตัวให้ (Donor ET)", to: "/embryo/donor" },
      { label: "เพิ่มเตรียมแม่ตัวให้ (Donor ET)", to: "" },
    ]);

    const items = ref([
      {
        label: "ลบ",
        icon: "pi pi-trash",
        command: () => {
          opendisplaydelete();
        },
      },
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
    const selection = ref();
    return {
      selection,
      date_range,

      items,
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
  data() {
    return {
      url: "/animal",
      apiFarm: "/farm?isActive=1",

      isLoading: false,
      valid: false,
      search: {
        FarmID: "",
      },
      filtered: {
        FarmID: "",
      },

      form: {
        isActive: "",
      },
      data: [],
      formDay: [],
      farm: [],
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
      personal: [],
      organization: [],
      activity: [],
      animaltype: [],

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
    // console.log(this.selectItem);
    axios
      .get(this.apiFarm, {
        signal: this.controller.signal,
      })
      .then((response) => {
        this.farm = response.data.rows.map((item) => {
          return {
            FarmID: item.FarmID,
            FarmName: item.FarmName,
            Fullname: item.FarmIdentificationNumber + ", " + item.FarmName,
            OrganizationZoneName: item.OrganizationZone.OrganizationZoneName,
          };
        });
      });
  },
  watch: {
    // ค้นหา
    "search.FarmID"(val) {
      this.filtered.FarmID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
  },

  methods: {
    // Axios
    load() {
      this.isLoading = true;
      let url = this.url + "?size=";
      if (this.filtered.FarmID) {
        url += "&FarmID=" + this.filtered.FarmID;
      }
      // console.log(url);

      if (this.animal_id == 1) {
        url += "&AnimalTypeID=[1,2]";
      } else if (this.animal_id == 2) {
        url += "&AnimalTypeID=[3,4]";
      } else if (this.animal_id == 3) {
        url += "&AnimalTypeID=[17,18]";
      }

      axios
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.total = response.data.total;
          // เงื่อนไขเลือกเฉพาะตัวเป็นสาวและแม่พันธุ์
          if (this.animal_id == 1) {
            this.data = response.data.rows.filter(
              (item) => item.AnimalStatusID === 3 || item.AnimalStatusID === 5
            );
          } else if (this.animal_id == 2) {
            this.data = response.data.rows.filter(
              (item) => item.AnimalStatusID === 8 || item.AnimalStatusID === 10
            );
          } else if (this.animal_id == 3) {
            this.data = response.data.rows.filter(
              (item) => item.AnimalStatusID === 13 || item.AnimalStatusID === 15
            );
          }

          dayjs.extend(buddhistEra);
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].show_id = i + 1;

            if (this.data[i].AnimalBirthDate != null) {
              // หาจำนวนเดือน
              var today = new Date();
              const date1 = dayjs(this.data[i].AnimalBirthDate);
              this.data[i].AnimalAge = date1.diff(today, "month");

              // แปลงเป็น ปี และ เดือน
              let countyear = this.data[i].AnimalAge / 12;
              let countmonth = this.data[i].AnimalAge % 12;

              // ถ้าปีน้อยกว่า 0 ไม่ต้องแสดง
              if (Math.abs(countyear) < 1) {
                if (Math.abs(Math.ceil(countmonth)) != 0) {
                  this.data[i].AnimalAge =
                    Math.abs(Math.ceil(countmonth)) + " เดือน ";
                } else {
                  this.data[i].AnimalAge = "-";
                }
              } else {
                this.data[i].AnimalAge =
                  Math.abs(Math.ceil(countyear)) +
                  " ปี " +
                  Math.abs(Math.ceil(countmonth)) +
                  " เดือน ";
              }

              // แปลงวันเกิด
              if (this.data[i].AnimalBirthDate != null) {
                this.data[i].AnimalBirthDate = dayjs(
                  this.data[i].AnimalBirthDate
                )
                  .add(543, "year")
                  .format("DD/MM/YYYY");
              }
              // .AnimalBirthDate.add(543, "year")
              // รวมสายพันธุ์
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    add() {
      if (this.selection) {
        // เก็บค่าใน vuex แทนการส่งข้ามหน้า
        store.dispatch("selectItem", this.selection);
        this.$router.push({
          name: "donor2",
          params: {
            id: this.search.FarmID,
          },
        });
      } else {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "คุณยังไม่เลือกรายการ",
          life: 5000,
        });
      }
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
