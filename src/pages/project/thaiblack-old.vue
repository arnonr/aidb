<template>
  <div class="grid">ss
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="โครงการ ThaiBlack" :pages="breadcrumb" />

      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหา</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />
          <InputText
            class="w-full"
            type="text"
            v-model="search['global'].value"
            placeholder="ค้นหา"
          />
        </span>
      </div>

      <div class="mt-5 card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h4 class="text-2xl mb-0 text-600">
              รายการโครงการ ThaiBlack ทั้งหมด
            </h4>
          </div>
          <!-- <div class="col-12 md:col-6 md:text-right">
            <Button
              label="เพิ่มข้อมูล"
              icon="pi pi-plus"
              class="p-button-raised p-button-raised p-button-info"
              @click="open_add"
            />
          </div> -->
        </div>
        <DataTable
          class="text-sm"
          :value="data"
          :paginator="true"
          :rows="10"
          :loading="isLoading"
          v-model:filters="search"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column
            field="show_id"
            :sortable="true"
            header="ลำดับ"
            class="text-center"
          ></Column>
          <Column
            field="Fullname"
            header="ข้อมูลสัตว์"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ThaiblackRound_Temp"
            header="รอบการบันทึก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ThaiThaiblackDate"
            header="วันที่บันทึก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Section"
            header="พื้นที่หน้าตัด(นิ้ว)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="FatThick"
            header="ความหนาไขมัน(T12-13)นิ้ว"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="FatInserted"
            header="ไขมันแทรกเนื้อ(%)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="FatThickHip"
            header="ความหนาไขมันสะโพก(นิ้ว)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Height"
            header="ความสูง(ซ.ม.)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Length"
            header="ความยาว(ซ.ม.)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Width"
            header="รอบอก(ซ.ม.)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Weigth"
            header="ประมาณน้ำหนัก(กก.)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Remark"
            header="หมายเหตุ"
            class="text-center"
            :sortable="true"
          ></Column>

          <Column
            field="ResponsibilityStaffName"
            header="รหัสเจ้าหน้าที่ผู้ตรวจ"
            class="text-center"
            :sortable="true"
          >
          </Column>

          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <SplitButton
                label="แก้ไข"
                icon="pi pi-pencil"
                @click="open_edit(slotProps.data.ThaiblackID)"
                class="p-button-sm p-button-outlined p-button-warning"
                :model="getItems(slotProps.data.ThaiblackID)"
              >
              </SplitButton>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Dialog
      header="แก้ไข"
      v-model:visible="display_edit"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                สัตว์<span class="text-red-500"> *</span></label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                :options="animalfather"
                optionLabel="Fullname"
                optionValue="AnimalID"
                placeholder="เลือกสัตว์"
                :showClear="true"
                :filter="true"
                v-model="form.AnimalID"
                :disabled="true"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รอบการบันทึก<span class="text-red-500"> *</span></label
              >

              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                id="selectedScheme"
                placeholder="รอบการบันทึก"
                :options="project_level"
                optionLabel="name"
                :class="{ 'p-invalid': !form.ThaiblackRound && valid }"
                v-model="form.ThaiblackRound"
              />
            </div>

            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่บันทึก<span class="text-red-500"> *</span></label
              >
              <!-- <Calendar
                class="w-full"
                placeholder="วันที่บันทึก"
                :showButtonBar="true"
                :showIcon="true"
                v-model="form.ThaiblackDate"
                :class="{ 'p-invalid': !form.ThaiblackDate && valid }"
              /> -->

              <Datepicker
                v-model="form.ThaiblackDate"
                :class="{ 'p-invalid': !form.ThaiblackDate && valid }"
                id="dateRange"
                locale="th"
                :format="format"
                utc
                :enableTimePicker="false"
                :maxDate="new Date()"
                cancelText="ยกเลิก"
                selectText="ยืนยัน"
                placeholder="วันที่บันทึก"
              >
                <template #year-overlay-value="{ text }">
                  {{ parseInt(text) + 543 }}
                </template>
                <template #year="{ year }">
                  {{ year + 543 }}
                </template>
              </Datepicker>
            </div>

            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                พื้นที่หน้าตัด(นิ้ว)</label
              >
              <InputText type="number" class="w-full" v-model="form.Section" />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความหนาไขมัน(T12-13)นิ้ว</label
              >
              <InputText type="number" class="w-full" v-model="form.FatThick" />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ไขมันแทรกเนื้อ(%)</label
              >
              <InputText
                type="number"
                class="w-full"
                v-model="form.FatInserted"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความหนาไขมันสะโพก(นิ้ว)</label
              >
              <InputText
                type="number"
                class="w-full"
                v-model="form.FatThickHip"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความสูง(ซ.ม.)</label
              >
              <InputText type="number" class="w-full" v-model="form.Height" />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความยาว(ซ.ม.)</label
              >
              <InputText type="number" class="w-full" v-model="form.Length" />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รอบอก(ซ.ม.)</label
              >
              <InputText type="number" class="w-full" v-model="form.Width" />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ประมาณน้ำหนัก(กก.)</label
              >
              <InputText type="number" class="w-full" v-model="form.Weigth" />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเหตุ (ถ้ามี)</label
              >
              <InputText type="text" class="w-full" v-model="form.Remark" />
            </div>

            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เจ้าหน้าที่ผู้รับผิดชอบ</label
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
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="close_add()"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="update()"
          />
        </div>
      </form>
      <template #footer></template>
    </Dialog>
    <!-- End EDIT Dialog -->

    <!-- Start Delete Dialog -->
    <Dialog
      header="ตรวจสอบข้อมูล"
      v-model:visible="display_delete"
      :style="{ width: '350px' }"
      :modal="true"
    >
      <div class="confirmation-content text-center">
        <i class="pi pi-trash" style="font-size: 5rem" />
        <br />
        <span class="text-xl">คุณต้องการลบข้อมูลใช่หรือไม่</span>
      </div>
      <template #footer>
        <div class="col-12 text-center flex justify-content-between">
          <Button
            label="ยกเลิก"
            @click="close_delete()"
            class="p-button-secondary w-full mr-3"
          />
          <Button
            label="ยืนยัน"
            @click="remove()"
            class="p-button-danger w-full ml-3"
          />
        </div>
      </template>
    </Dialog>

    <!-- View Dialog -->
    <Dialog
      header="รายละเอียด"
      v-model:visible="display_view"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                สัตว์</label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                :options="animalfather"
                optionLabel="Fullname"
                optionValue="AnimalID"
                placeholder="เลือกสัตว์"
                :showClear="true"
                :filter="true"
                v-model="form.AnimalID"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รอบการบันทึก</label
              >

              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                id="selectedScheme"
                placeholder="รอบการบันทึก"
                :options="project_level"
                optionLabel="name"
                :class="{ 'p-invalid': !form.ThaiblackRound && valid }"
                v-model="form.ThaiblackRound"
              />
            </div>

            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่บันทึก</label
              >
              <Calendar
                class="w-full"
                placeholder="วันที่บันทึก"
                :showButtonBar="true"
                :showIcon="true"
                v-model="form.ThaiblackDate"
                :class="{ 'p-invalid': !form.ThaiblackDate && valid }"
              />
            </div>

            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                พื้นที่หน้าตัด(นิ้ว)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.Section && valid }"
                v-model="form.Section"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความหนาไขมัน(T12-13)นิ้ว</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.FatThick && valid }"
                v-model="form.FatThick"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ไขมันแทรกเนื้อ(%)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.FatInserted && valid }"
                v-model="form.FatInserted"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความหนาไขมันสะโพก(นิ้ว)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.FatThickHip && valid }"
                v-model="form.FatThickHip"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความสูง(ซ.ม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.Height && valid }"
                v-model="form.Height"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความยาว(ซ.ม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.Length && valid }"
                v-model="form.Length"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รอบอก(ซ.ม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.Width && valid }"
                v-model="form.Width"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ประมาณน้ำหนัก(กก.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.Weigth && valid }"
                v-model="form.Weigth"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเหตุ (ถ้ามี)</label
              >
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.Remark && valid }"
                v-model="form.Remark"
              />
            </div>

            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เจ้าหน้าที่ผู้รับผิดชอบ</label
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
      <template #footer></template>
    </Dialog>
    <!-- End View Dialog -->
  </div>
</template>

<script>
import axios from "axios";

import PageTitle from "@/components/PageTitle.vue";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      url: "/thaiblack",
      urlAnimalType: "/animal-type",
      urlOrganization: "/organization",
      apiAnimalFatherID: "/animal?isActive=1",
      apiPersonal: "/staff?isActive=1",
      breadcrumb: [
        { label: "ระบบโครงการ", to: "/project/all" },
        { label: "ข้อมูลพื้นฐานโครงการ ThaiฺBlack", to: "" },
      ],

      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      items: [],
      // load
      data: [],
      animal: [],
      isLoading: false,
      animalfather: [],
      personal: [],
      // form
      valid: false,
      form: {
        isActive: "",
      },

      project_level: [
        {
          id: "1",
          name: "210 วัน",
        },
        {
          id: "2",
          name: "400 วัน",
        },
        {
          id: "3",
          name: "600 วัน",
        },
        {
          id: "4",
          name: "800 วัน",
        },
      ],

      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],

      //  cancel requests
      controller: new AbortController(),

      // Search

      isSearch: false,
      isSelection: false,

      filtered: {
        ProjectCode: "",
        ProjectName: "",
        ProjectLevel: "",
        isActive: "",
        StartDate: "",
        EndDate: "",
      },

      // Modal
      display_add: false,
      display_edit: false,
      display_view: false,
      display_delete: false,
    };
  },
  mounted() {
    this.load();
    this.form.isActive = this.status[0];

    dayjs.extend(buddhistEra);
    // data.start_week = dayjs(data.start_week).locale("th").format("DD MMM BB");

    // ประเภทสัตว์
    axios
      .get(this.urlAnimalType, { signal: this.controller.signal })
      .then((response) => {
        this.animal = response.data.rows;
      });

    axios
      .get(this.apiAnimalFatherID, { signal: this.controller.signal })
      .then((response) => {
        this.animalfather = response.data.rows.map((item) => {
          return {
            AnimalID: item.AnimalID,
            AnimalIdentificationID: item.AnimalIdentificationID,
            Fullname: item.AnimalIdentificationID + ", " + item.AnimalName,
          };
        });
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
    // ประเภทหน่วยงาน
    axios
      .get(this.urlOrganization, { signal: this.controller.signal })
      .then((response) => {
        this.organization = response.data.rows;
      });
  },
  watch: {},
  methods: {
    format(date) {
      const dayStart = date.getDate();
      const monthStart = date.getMonth();
      const yearStart = date.getFullYear() + 543;
      const formatStart = format(
        new Date(yearStart, monthStart, dayStart),
        "dd/MM/yyyy",
        {
          locale: th,
        }
      );
      return `${formatStart}`;
    },
    clear() {
      this.form = {
        isActive: this.status[0],
      };
      this.valid = false;
    },
    getItems(id) {
      const items = [
        {
          label: "รายละเอียด",
          icon: "pi pi-eye",
          command: () => {
            this.open_view(id);
          },
        },
        {
          label: "ลบ",
          icon: "pi pi-trash",
          command: () => {
            this.open_delete(id);
          },
        },
      ];
      return items;
    },
    // Axios
    load() {
      this.isLoading = true;
      let url = this.url + "?size=15";
      // url += "&page=";
      // if (this.curpage) {
      //   url += this.curpage;
      // }

      axios
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.data = response.data.rows;
          dayjs.extend(buddhistEra);
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].show_id = i + 1;
            this.data[i].Fullname =
              this.data[i].Animal.AnimalIdentificationID +
              ", " +
              this.data[i].Animal.AnimalName;
            if (this.data[i].ThaiblackRound == "1") {
              this.data[i].ThaiblackRound_Temp = "210 วัน";
            } else if (this.data[i].ThaiblackRound == "2") {
              this.data[i].ThaiblackRound_Temp = "400 วัน";
            } else if (this.data[i].ThaiblackRound == "3") {
              this.data[i].ThaiblackRound_Temp = "600 วัน";
            } else if (this.data[i].ThaiblackRound == "4") {
              this.data[i].ThaiblackRound_Temp = "800 วัน";
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    validation() {
      if (
        !this.form.AnimalID ||
        !this.form.ThaiblackRound ||
        !this.form.ThaiblackDate ||
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
    add() {
      // validation
      if (this.validation() == false) {
        return;
      }
      // change data
      this.form.isActive = this.form.isActive.value;
      this.form.ThaiblackRound = this.form.ThaiblackRound.id;
      // post
      axios
        .post(this.url, this.form)
        .then(() => {
          this.close_add();
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });
        })
        // error
        .catch((err) => {
          this.form.isActive = this.status[0];
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },
    update() {
      // validation
      if (this.validation() == false) {
        return;
      }

      // change data
      this.form.isActive = this.form.isActive.value;
      this.form.ThaiblackRound = this.form.ThaiblackRound.id;

      axios
        .put(this.url + "/" + this.form.ThaiblackID, this.form)
        .then(() => {
          this.close_edit();
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "แก้ไขข้อมูลเสร็จสิ้น",
            life: 5000,
          });
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
    remove() {
      axios.delete(this.url + "/" + this.form.id).then(() => {
        this.close_delete();
        this.load();
        this.$toast.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "ลบข้อมูลเสร็จสิ้น",
          life: 5000,
        });
      });
    },
    // Modal
    open_add() {
      this.clear();
      this.display_add = true;
    },
    close_add() {
      this.display_add = false;
    },
    open_edit(id) {
      id = this.data.find((x) => x.ThaiblackID == id);
      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      let idtmp = [];

      if (id.ThaiblackRound == "1") {
        idtmp.ThaiblackRound = this.project_level[0];
      } else if (id.ThaiblackRound == "2") {
        idtmp.ThaiblackRound = this.project_level[1];
      } else if (id.ThaiblackRound == "3") {
        idtmp.ThaiblackRound = this.project_level[1];
      } else if (id.ThaiblackRound == "4") {
        idtmp.ThaiblackRound = this.project_level[1];
      }

      this.form = {
        ThaiblackID: id.ThaiblackID,
        AnimalID: id.AnimalID,
        ThaiblackRound: idtmp.ThaiblackRound,
        ThaiblackDate: id.ThaiblackDate,
        Section: id.Section,
        FatThick: id.FatThick,
        FatInserted: id.FatInserted,
        FatThickHip: id.FatThickHip,
        Height: id.Height,
        Length: id.Length,
        Width: id.Width,
        Weigth: id.Weigth,
        Remark: id.Remark,
        ResponsibilityStaffID: id.ResponsibilityStaffID,
        show_id: id.show_id,
        isActive: id.isActive,
      };
      this.display_edit = true;
    },
    close_edit() {
      this.display_edit = false;
    },
    open_delete(id) {
      this.form.id = id;
      // this.form.show_id = show_id;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },
    open_view(id) {
      id = this.data.find((x) => x.ThaiblackID == id);
      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      let idtmp = [];

      if (id.ThaiblackRound == "1") {
        idtmp.ThaiblackRound = this.project_level[0];
      } else if (id.ThaiblackRound == "2") {
        idtmp.ThaiblackRound = this.project_level[1];
      } else if (id.ThaiblackRound == "3") {
        idtmp.ThaiblackRound = this.project_level[1];
      } else if (id.ThaiblackRound == "4") {
        idtmp.ThaiblackRound = this.project_level[1];
      }

      this.form = {
        ThaiblackID: id.ThaiblackID,
        AnimalID: id.AnimalID,
        ThaiblackRound: idtmp.ThaiblackRound,
        ThaiblackDate: id.ThaiblackDate,
        Section: id.Section,
        FatThick: id.FatThick,
        FatInserted: id.FatInserted,
        FatThickHip: id.FatThickHip,
        Height: id.Height,
        Length: id.Length,
        Width: id.Width,
        Weigth: id.Weigth,
        Remark: id.Remark,
        ResponsibilityStaffID: id.ResponsibilityStaffID,
        show_id: id.show_id,
        isActive: id.isActive,
      };

      this.display_view = true;
    },
    close_view() {
      this.display_view = false;
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
