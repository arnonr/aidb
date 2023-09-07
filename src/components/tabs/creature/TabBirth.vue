<template>
  <div class="grid flex align-items-center mt-3 mb-5">
    <div class="col-12 md:col-6">
      <h1 class="text-2xl mb-0 text-600">{{ name }}</h1>
    </div>
    <div class="col-12 md:col-6 md:text-right">
      <Button
        label="เพิ่มกิจกรรม"
        icon="pi pi-plus"
        class="w-full md:w-auto"
        @click="open"
        v-if="AnimalSecretStatus.includes(6) && permit[0].IsAdd"
      />
    </div>
  </div>
  <DataTable
    class="text-sm"
    :value="data"
    :paginator="true"
    :rowHover="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    responsiveLayout="scroll"
    currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
  >
    <Column
      v-for="col of columns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      class="text-center"
      :sortable="true"
    >
    </Column>
    <Column
      header="ลูกเกิด (ตัว)"
      field="Amount"
      :sortable="true"
      sortField="Amount"
      class="text-center"
    >
      <template #body="slotProps">
        <div class="flex justify-content-center align-items-center">
          <div class="mx-1">
            {{ slotProps.data.CountChildAnimal }}/{{ slotProps.data.Amount }}
          </div>
          <Button
            icon="pi pi-eye p-1"
            class="p-button-success p-button-sm mr-3"
            @click="openViewBaby(slotProps.index)"
          />
        </div>
      </template>
    </Column>
    <Column
      header="ลงทะเบียนลูก"
      field="Amount"
      :sortable="true"
      sortField="Amount"
      class="text-center"
    >
      <template #body="slotProps">
        <div class="flex justify-content-center align-items-center">
          <Button
            label="ลูกเกิด"
            v-if="slotProps.data.CountChildAnimal < slotProps.data.Amount"
            icon="pi pi-plus"
            class="p-button-primary p-button-sm p-2 text-sm"
            @click="
              openRegister(
                slotProps.data.GiveBirthID,
                slotProps.data.GiveBirthDate,
                slotProps.index
              )
            "
          />
        </div>
      </template>
    </Column>
    <Column header="จัดการ" class="text-center">
      <template #body="slotProps">
        <SplitButton
          v-if="slotProps.index + 1 == total || this.user.GroupID == 1"
          label="แก้ไข"
          icon="pi pi-pencil"
          @click="edit(slotProps.index)"
          class="p-button-sm p-button-outlined p-button-warning"
          :model="getItems(slotProps.index)"
        >
        </SplitButton>
      </template>
    </Column>
    <template #empty> ไม่พบข้อมูล </template>
    <template #loading>
      <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
    </template>
  </DataTable>
  <Dialog
    :draggable="false"
    :header="formheader + name"
    v-model:visible="display"
    :style="{ width: '50vw' }"
    :modal="true"
    v-on:after-hide="clear()"
  >
    <form class="grid mt-2">
      <div class="col-12 lg:col-12">
        <div class="grid">
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              รหัสเจ้าหน้าที่ผสมเทียม<span class="text-red-500"> *</span></label
            >
            <Dropdown
              :virtualScrollerOptions="{ itemSize: 38 }"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกรหัสเจ้าหน้าที่ผสมเทียม"
              optionLabel="StaffFullName"
              optionValue="StaffID"
              v-model="data[index].ResponsibilityStaffID"
              :options="selection.Staff"
              :filterFields="['StaffNumber', 'StaffGivenName', 'StaffSurname']"
              :filter="true"
              filterPlaceholder="รหัสเจ้าหน้าที่ผสมเทียม"
              :class="{
                'p-invalid': !data[index].ResponsibilityStaffID && valid,
              }"
            >
            </Dropdown>
          </div>

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่ผสม</label
            >
            <!-- <InputText v-model="show.date" class="w-full" :disabled="true" /> -->

            <Datepicker
              v-model="show.date"
              id="dateRange"
              locale="th"
              :format="format"
              :disabled="true"
              utc
              :enableTimePicker="false"
              :maxDate="new Date()"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="วันที่ผสม"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ท้องที่</label
            >
            <InputText
              v-model="data[index].PAR"
              class="w-full"
              :disabled="true"
            />
          </div>

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              จำนวนที่คลอด (ตัว)<span class="text-red-500"> *</span></label
            >
            <InputNumber
              :min="1"
              v-model="data[index].Amount"
              class="w-full"
              :class="{
                'p-invalid': !data[index].Amount && valid,
              }"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              จำนวนเพศผู้ (ตัว)<span class="text-red-500"> *</span></label
            >
            <InputNumber
              :max="data[index].Amount - data[index].Female"
              :min="0"
              showButtons
              v-model="data[index].Male"
              class="w-full"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              จำนวนเพศเมีย (ตัว)<span class="text-red-500"> *</span></label
            >
            <InputNumber
              :max="data[index].Amount - data[index].Male"
              :min="0"
              showButtons
              v-model="data[index].Female"
              class="w-full"
            />
          </div>

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ภาวะการคลอด<span class="text-red-500"> *</span></label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกภาวะการคลอด"
              optionLabel="word"
              optionValue="val"
              v-model="data[index].GiveBirthState"
              :options="selection.GiveBirthState"
              :class="{
                'p-invalid': !data[index].GiveBirthState && valid,
              }"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วิธีการช่วยคลอด<span class="text-red-500"> *</span></label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกวิธีการช่วยคลอด"
              optionLabel="GiveBirthHelpName"
              optionValue="GiveBirthHelpID"
              v-model="data[index].GiveBirthHelpID"
              :options="selection.GiveBirthHelpID"
              :class="{ 'p-invalid': !data[index].GiveBirthHelpID && valid }"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่คลอด<span class="text-red-500">
                (ระยะห่างจากวันที่คลอดครั้งล่าสุด > 280 วัน)*</span
              ></label
            >
            <Datepicker
              v-model="data[index].GiveBirthDate"
              :class="{ 'p-invalid': !data[index].GiveBirthDate && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              :maxDate="new Date()"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="วันที่คลอด"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              คะแนนร่างกาย (BCS)</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกคะแนนร่างกาย"
              optionLabel="BCSName"
              optionValue="BCSID"
              v-model="data[index].BCSID"
              :options="selection.BCSID"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              หมายเหตุ</label
            >
            <InputText v-model="data[index].Remark" class="w-full" />
          </div>
          <!-- <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ระยะการตั้งท้อง (วัน)</label
            >
            <InputText v-model="data[index].PregnancyDay" class="w-full" />
          </div> -->
        </div>
      </div>
      <div class="col-12 text-center mt-5 flex justify-content-between">
        <Button
          label="ยกเลิก"
          class="p-button-secondary w-full mr-3"
          @click="close()"
        />
        <!-- <Button
          label="บันทึกข้อมูล"
          class="ml-3 p-button-info w-full"
          @click="add()"
        /> -->
        <Button
          label="บันทึกข้อมูล"
          class="ml-3 p-button-info w-full"
          @click="openConfirmBirth"
        />
      </div>
    </form>
  </Dialog>
  <Dialog
    header="ตรวจสอบข้อมูล"
    v-model:visible="display_delete"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="confirmation-content text-center">
      <i class="pi pi-trash" style="font-size: 5rem" />
      <br />
      <span class="text-xl"
        >คุณต้องการลบ{{ name }}ลำดับที่
        {{ data[index].show_id }} ใช่หรือไม่</span
      >
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
  <!-- Modal เพิ่มจำนวนลูกที่คลอด -->
  <Dialog
    header="เพิ่มจำนวนลูกที่คลอด"
    v-model:visible="displayAddBaby"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <form class="grid mt-2">
      <div class="col-12 lg:col-12">
        <div class="grid">
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ชื่อสัตว์
            </label>
            <InputText class="w-full" />
          </div>

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2"> เพศ </label>
            <Dropdown class="w-full" placeholder="เลือกเพศ" :filter="true" />
          </div>

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              สถานะลูกเกิด
            </label>
            <Dropdown
              class="w-full"
              placeholder="เลือกสถานะลูกเกิด"
              :filter="true"
            />
          </div>

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              น้ำหนัก (กก.)
            </label>
            <InputText class="w-full" />
          </div>

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              เลขอ้างอิงสัตว์
            </label>
            <InputText class="w-full" readonly />
          </div>

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              หมายเลขใบหู
            </label>
            <InputText class="w-full" />
          </div>
        </div>
      </div>
      <div class="col-12 text-center mt-5 flex justify-content-between">
        <Button
          label="ยกเลิก"
          class="p-button-secondary w-full mr-3"
          @click="closeAddBaby()"
        />
        <Button label="บันทึกข้อมูล" class="ml-3 p-button-info w-full" />
      </div>
    </form>
  </Dialog>

  <!-- Modal ดูจำนวนลูกที่คลอด -->
  <Dialog
    header="จำนวนลูกที่คลอดทั้งหมด"
    v-model:visible="displayViewBaby"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '60vw' }"
    :modal="true"
  >
    <div class="mt-2 grid align-items-center">
      <div class="col-6">
        <Tag severity="success" class="mb-2 lg:mb-0 mr-2 text-md p-2"
          >ลูกที่เพิ่มข้อมูลมาแล้ว
          {{ `${this.data[this.index].CountChildAnimal}` }} ตัว</Tag
        >
        <Tag class="text-md p-2"
          >ลูกที่คลอดทั้งหมด {{ `${this.data[this.index].Amount}` }} ตัว</Tag
        >
      </div>
      <div class="col-6 text-right">
        {{ `${this.data[this.index].CountChildAnimal}` }}/{{
          `${this.data[this.index].Amount}`
        }}
        ตัว
      </div>
    </div>
    <div class="grid row-gap-3 mt-3">
      <div
        class="col-12 lg:col-12"
        v-for="item in this.data[this.index].ChildAnimal"
        :key="item.id"
      >
        <div class="grid surface-200 border-round-lg text-700 p-2">
          <div class="col-7 text-md">
            <span class="font-medium mr-3">ชื่อสัตว์</span>
            {{ `${item.AnimalName || ""}` }}
          </div>
          <div class="col-5 text-md">
            <span class="font-medium mr-3">วันเกิด</span>
            {{ `${item.ThaiAnimalBirthDate || ""}` }}
          </div>
          <div class="col-7 text-md">
            <span class="font-medium mr-3">อายุ</span>
            {{ `${item.AnimalAge || ""}` }}
          </div>

          <div class="col-5 text-md">
            <span class="font-medium mr-3">น้ำหนัก (กก.)</span>
            {{ `${item.AnimalBornWeight || ""}` }}
          </div>

          <div class="col-7 text-md">
            <span class="font-medium mr-3">เลขอ้างอิงสัตว์</span>
            {{ `${item.AnimalIdentificationID || ""}` }}
          </div>

          <div class="col-5 text-md">
            <span class="font-medium mr-3">เลขใบหู</span>
            {{ `${item.AnimalEarID || ""}` }}
          </div>

          <div class="col-12">
            <Button
              label="แก้ไข"
              icon="pi pi-pencil"
              class="p-button-warning p-button-sm"
              @click="editAnimal(item.AnimalID)"
            />
          </div>
        </div>
      </div>

      <!-- <div class="col-12 lg:col-12">
        <div class="grid surface-200 border-round-lg text-700 p-2">
          <div class="col-7 text-md">
            <span class="font-medium mr-3">ชื่อสัตว์</span> เงิน
          </div>
          <div class="col-5 text-md">
            <span class="font-medium mr-3">เพศ</span> ผู้
          </div>
          <div class="col-7 text-md">
            <span class="font-medium mr-3">สถานะลูกเกิด</span> ขึ้นทะเบียน
          </div>

          <div class="col-5 text-md">
            <span class="font-medium mr-3">น้ำหนัก (กก.)</span> 10
          </div>

          <div class="col-7 text-md">
            <span class="font-medium mr-3">เลขอ้างอิงสัตว์</span> 65416515
          </div>

          <div class="col-5 text-md">
            <span class="font-medium mr-3">เลขใบหู</span> 54656623
          </div>

          <div class="col-12">
            <Button
              label="แก้ไข"
              icon="pi pi-pencil"
              class="p-button-warning p-button-sm"
            />
          </div>
        </div>
      </div> -->
    </div>
  </Dialog>

  <!-- Modal คำนวนเวลาคลอด -->
  <Dialog
    header="ตรวจสอบข้อมูลอีกครั้ง"
    v-model:visible="displayViewConfirmBirth"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '60vw' }"
    :modal="true"
  >
    <div class="mt-2 grid align-items-center">
      <h1 class="mb-2 lg:mb-0 mr-2 text-md p-2">
        {{ this.txtCheck }}
      </h1>
    </div>
    <div class="mt-2 grid align-items-center">
      <h2 class="mb-2 lg:mb-0 mr-2 text-md p-2">
        <span class="text-red-600"> {{ this.txtCon }} </span>
      </h2>
    </div>
    <div class="col-12 text-center mt-5 flex justify-content-between">
      <Button
        label="ยกเลิก"
        class="p-button-secondary w-full mr-3"
        @click="
          () => {
            this.displayViewConfirmBirth = false;
          }
        "
      />
      <!-- <Button
          label="บันทึกข้อมูล"
          class="ml-3 p-button-info w-full"
          @click="add()"
        /> -->
      <Button
        label="บันทึกข้อมูล"
        v-if="btnSubmit"
        class="ml-3 p-button-info w-full"
        @click="add"
      />
    </div>
  </Dialog>
</template>

<script>
import { mapGetters } from "vuex";
import dayjs from "dayjs";
import axios from "axios";
import store from "@/service/Vuex";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import Swal from "sweetalert2";
export default {
  emits: [
    "update:activeIndex",
    "tab-change",
    "tab-click",
    "refresh_secret_status",
    "onclear_display",
  ],
  props: {
    permit: {
      type: Array,
      required: true,
    },
    display_prop: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      // API
      url: "/give-birth",
      animal_url: "/animal/get-by-farm-id",
      // ID
      id: "GiveBirthID",
      // Name
      name: "คลอด",
      show: {
        date: "",
      },
      //load_selection
      LoadSelection: {
        Staff: "/staff",
        GiveBirthHelpID: "/give-birth-help",
        BCSID: "/bcs",
      },

      ChildAnimal: [],
      // Selection

      selection: {
        Staff: null,
        BCSID: null,
        GiveBirthHelpID: null,
        GiveBirthState: [
          {
            val: "NORMAL",
            word: "คลอดปกติ",
          },
          {
            val: "DIFFICULT",
            word: "คลอดยาก",
          },
          {
            val: "SLINK",
            word: "คลอดก่อนกำหนด",
          },
        ],
      },
      // Table Field
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
        // {
        //   field: "AIID",
        //   header: "ผสมครั้งที่",
        // },
        {
          field: "PAR",
          header: "ท้องที่",
        },
        {
          field: "TimeNo",
          header: "ครั้งที่ผสม",
        },
        {
          field: "ThaiAIDate",
          header: "วันที่ผสมเทียม",
        },
        {
          field: "ThaiTransferDate",
          header: "วันที่ย้ายฝาก",
        },
        // {
        //   field: "Type",
        //   header: "ประเภท",
        // },

        {
          field: "PREGPAR",
          header: "คลอดท้องที่",
        },
        {
          field: "ThaiGiveBirthDate",
          header: "วันที่คลอด",
        },
        {
          field: "ThaiGiveBirthState",
          header: "สถานะการคลอด",
        },
        {
          field: "PregnancyDay",
          header: "จำนวนวันตั้งท้อง",
        },

        {
          field: "BCSName",
          header: "คะแนนร่างกาย (BCS)",
        },
        {
          field: "ResponsibilityStaffName",
          header: "เจ้าหน้าที่",
        },
      ],

      // Search
      isSearch: false,
      isSelection: false,

      checkMethod: 0,
      // Static Data
      total: null,
      isLoading: false,
      data: [],

      lastInformation: [],

      valid: false,
      index: null,
      display: false,
      display_delete: false,
      displayAddBaby: false,
      displayViewBaby: false,
      displayViewConfirmBirth: false,
      btnSubmit: true,
      temp: null,
      curpage: 0,
      formheader: "",
      sortField: "",
      sortOrder: "",
      // uneditable
      items: [
        {
          label: "แก้ไข",
          icon: "pi pi-pencil",
        },
        {
          label: "ลบ",
          icon: "pi pi-times",
        },
      ],
      controller: new AbortController(),
    };
  },
  async mounted() {
    await this.load();
    await this.load_selection();
    if (
      this.display_prop &&
      this.AnimalSecretStatus.includes(6) &&
      this.permit[0].IsAdd
    ) {
      this.open();
    }
  },
  watch: {
    AnimalID(val) {
      if (val) {
        this.load();
      } else {
        this.data = [];
      }
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
      AnimalID: "AnimalID",
      animal_id: "animal_id",
      AnimalSecretStatus: "AnimalSecretStatus",
      animalInfo: "animalInfo",
    }),
  },
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
    getItems(id) {
      const items = [
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
    // on modal hide
    clear() {
      if (
        this.index == this.data.length - 1 &&
        !this.data[this.index].CreatedUserID
      ) {
        this.data.splice(this.index, 1);
      } else {
        this.data[this.index] = this.temp;
        this.temp = null;
      }
      this.formheader = "";
      this.index = null;
      this.valid = false;
      this.$emit("onclear_display");
    },
    // validate templates
    validation() {
      if (
        !this.data[this.index].ResponsibilityStaffID ||
        !this.data[this.index].GiveBirthDate ||
        !this.data[this.index].Amount ||
        !this.data[this.index].GiveBirthState
      ) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "กรุณากรอกข้อมูล",
          life: 5000,
        });
        this.valid = true;
        return false;
      }

      return true;
    },
    //load selection
    load_selection() {
      return new Promise((resolve) => {
        var index = 0;
        if (this.isSelection == false) {
          this.isSelection = true;
          for (let i in this.LoadSelection) {
            if (this.LoadSelection[i] == "/staff") {
              this.LoadSelection[i] =
                this.LoadSelection[i] +
                "?StaffOrganizationID=" +
                this.user.Staff.StaffOrganizationID +
                "&includeAll=false&isActive=1";
            }

            axios
              .get(this.LoadSelection[i], {
                signal: this.controller.signal,
              })
              .then((response) => {
                this.selection[i] = response.data.rows;
                index++;
              })
              .catch(() => {
                //refresh pages
                Swal.fire({
                  icon: "warning",
                  title: "กำลังโหลดข้อมูล",
                  text: "กรุณารอซักครู่",
                });

                setTimeout(() => {
                  this.$router.go(0);
                }, 2000);
              })
              .finally(() => {
                if (Object.keys(this.LoadSelection).length == index) {
                  resolve();
                }
              });
          }
        }
      });
    },
    // main load
    load() {
      return new Promise((resolve) => {
        this.isLoading = true;
        axios
          .get(`${this.url}?AnimalID=${this.AnimalID}`, {
            signal: this.controller.signal,
          })
          .then((response) => {
            this.total = response.data.total;
            this.data = response.data.rows;
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
              this.data[i].PREGPAR = this.data[i].PAR + 1;
            }
          })
          .finally(() => {
            this.isLoading = false;
          });

        // this.animal_url +=
        axios
          .get(`${this.animal_url}?AnimalID=${this.AnimalID}`, {
            signal: this.controller.signal,
          })
          .then((response) => {
            this.lastInformation = response.data.rows[0];
            if (this.lastInformation) {
              this.show.date = this.lastInformation.AIDate;
            }
            if (this.lastInformation.PregnancyStatus == "NO") {
              console.log(this.lastInformation);
            }
          })
          .finally(() => {
            this.isLoading = false;
            resolve();
          });
      });
    },
    // create or update data
    add() {
      if (this.validation() == false) {
        return;
      }

      if (this.lastInformation.AIDate) {
        this.data[this.index].aiid = this.lastInformation.AIID;
        const date1 = dayjs(this.data[this.index].GiveBirthDate);
        const date2 = dayjs(this.lastInformation.AIDate);
        this.data[this.index].PregnancyDay = date1.diff(date2, "day");
      } else if (this.lastInformation.EmbryoDate) {
        this.data[this.index].TransferEmbryoID =
          this.lastInformation.TransferEmbryoID;

        const date1 = dayjs(this.data[this.index].GiveBirthDate);
        this.data[this.index].PregnancyDay = date1.diff(
          this.lastInformation.EmbryoDate,
          "day"
        );
      } else {
        this.data[this.index].NormalBreedingID = 1;
      }

      // console.log(this.data[this.index]);

      if (
        this.data[this.index].Male + this.data[this.index].Female !=
        this.data[this.index].Amount
      ) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "กรุณากรอกจำนวนเพศลูกให้เท่ากับจำนวนการคลอด",
          life: 5000,
        });
        return false;
      }

      this.data[this.index].ChildGender = "";

      if (this.data[this.index].Male) {
        for (let i = 0; i < this.data[this.index].Male; i++) {
          this.data[this.index].ChildGender += "M,";
        }
      }

      if (this.data[this.index].Female) {
        for (let i = 0; i < this.data[this.index].Female; i++) {
          this.data[this.index].ChildGender += "F,";
        }
        // console.log(this.data[this.index].Female);

        // this.data[this.index].Female.forEach(function (item) {
        //   console.log(item);
        // });
      }

      if (this.data[this.index].ChildGender) {
        this.data[this.index].ChildGender = this.data[
          this.index
        ].ChildGender.replace(/.$/, "");
      }

      // console.log(this.data[this.index].ChildGender);

      if (
        this.index == this.data.length - 1 &&
        !this.data[this.index].CreatedUserID
      ) {
        // create data
        axios
          .post(this.url, this.data[this.index])
          .then(() => {
            this.checkMethod = 0;
            setTimeout(() => {
              this.load();
            }, 1500);
            this.close();
            this.closeConfirmBirth();
            this.$toast.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "เพิ่มข้อมูลเสร็จสิ้น",
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
      }
      // update data
      else if (this.index < this.data.length) {
        if (this.validation() == false) {
          return;
        }
        delete this.data[this.index].Staff;
        delete this.data[this.index].BCS;
        delete this.data[this.index].show_id;
        axios
          .put(
            this.url + "/" + this.data[this.index][this.id],
            this.data[this.index]
          )
          .then(() => {
            this.close();
            setTimeout(() => {
              this.load();
            }, 1500);
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
      }
      this.$emit("refresh_secret_status");
    },
    // remove data
    remove() {
      axios.delete(this.url + "/" + this.data[this.index][this.id]).then(() => {
        this.close_delete();
        this.load();
        this.$toast.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "ลบข้อมูลเสร็จสิ้น",
          life: 5000,
        });
      });
      this.$emit("refresh_secret_status");
    },
    // form open add
    async open() {
      this.index = this.data.length;
      this.formheader = "เพิ่ม";
      this.data.push({
        AnimalID: this.AnimalID,
      });
      this.data[this.index].ResponsibilityStaffID = this.user.StaffID;
      this.data[this.index].Amount = 1;
      this.data[this.index].Male = 0;
      this.data[this.index].Female = 1;
      await axios
        .get(`${this.animal_url}?AnimalID=${this.AnimalID}`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.data[this.index].PAR = response.data.rows[0].PAR;
          if (response.data.rows[0].AIID) {
            this.data[this.index].AIID = response.data.rows[0].AIID;
          } else if (response.data.rows[0].TransferEmbryoID) {
            this.data[this.index].TransferEmbryoID =
              response.data.rows[0].TransferEmbryoID;
          }
        });
      this.display = true;
    },
    //form open edit
    edit(id) {
      if (this.permit[0].IsUpdate == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์แก้ไข",
          life: 5000,
        });
        return;
      }
      this.index = id;
      this.formheader = "แก้ไข";

      this.temp = JSON.parse(JSON.stringify(this.data[this.index]));

      if (this.data[this.index].ChildGender) {
        this.data[this.index].Male = (
          this.data[this.index].ChildGender.match(new RegExp("M", "g")) || []
        ).length;

        this.data[this.index].Female = (
          this.data[this.index].ChildGender.match(new RegExp("F", "g")) || []
        ).length;
      }

      this.display = true;
    },
    close() {
      this.display = false;
      this.displayViewConfirmBirth = false;
    },
    open_delete(id) {
      if (this.permit[0].IsDelete == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์ลบ",
          life: 5000,
        });
        return;
      }
      this.index = id;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },
    openAddBaby() {
      this.displayAddBaby = true;
    },
    closeAddBaby() {
      this.displayAddBaby = false;
    },
    async openConfirmBirth() {
      // console.log(this.lastInformation.AIDate);

      if (this.animal_id == 1) {
        if (this.data[this.index].GiveBirthDate) {
          let date_1 = new Date(this.lastInformation.AIDate);

          console.log(this.lastInformation.AIDate);

          //

          let dateDiff = dayjs(this.data[this.index].GiveBirthDate).diff(
            date_1,
            "day"
          );

          let res = dateDiff;

          this.txtCheck =
            "จำนวนวันตั้งแต่ผสมครั้งล่าสุด ถึงวันคลอดอยู่ระหว่าง" + res + "วัน";

          let error = 0;
          if (this.data.length != 0) {
            let check = this.data[this.data.length - 2];
            console.log(this.data);

            if (check) {
              let dateDiff1 = dayjs(this.data[this.index].GiveBirthDate).diff(
                check.GiveBirthDate,
                "day"
              );
              if (dateDiff1 < 280) {
                error = 1;
              }
            }
          }

          if (this.data.length != 0) {
            console.log(this.animalInfo.AnimalBirthDate);

            let dateDiff2 = dayjs(this.data[this.index].GiveBirthDate).diff(
              this.animalInfo.AnimalBirthDate,
              "day"
            );

            if (dateDiff2 < 1) {
              error = 2;
            }
          }

          if (error == 2) {
            this.txtCheck = "ไม่สามารถบันทึกคลอดก่อนวันเกิดโคแม่พันธุ์ได้";
            this.displayViewConfirmBirth = true;
            this.btnSubmit = false;
          } else if (error == 1) {
            this.txtCheck =
              "ระยะห่างจากวันที่คลอดครั้งล่าสุดน้อยกว่า 280 วัน ไม่สามารถบันทึกคลอดได้";
            this.displayViewConfirmBirth = true;
            this.btnSubmit = false;
          } else if (this.lastInformation.AIDate == null) {
            this.txtCheck = "เพิ่มข้อมูลการคลอด โดยไม่มีการผสม";
            this.btnSubmit = true;
            this.displayViewConfirmBirth = true;
          } else if (res <= 260) {
            // this.txtCon =
            //   "ระยะเวลาครั้งผสมครั้งล่าสุด ถึงวันคลอดน้อยกว่า 260 วัน ยืนยันคลอดหรือบันทึกแท้ง";
            this.txtCon =
              "ระยะเวลาครั้งผสมครั้งล่าสุด ถึงวันคลอดน้อยกว่า 260 วัน ไม่สามารถบันทึกคลอดได้";
            this.displayViewConfirmBirth = true;
            this.btnSubmit = false;
          } else if (res >= 310) {
            this.txtCon =
              "ระยะเวลาครั้งผสมครั้งล่าสุด ถึงวันคลอดมากกว่า 310 วัน ยืนยันคลอดหรือบันทึกผสมเพิ่มเติม";
            this.btnSubmit = true;
            this.displayViewConfirmBirth = true;
          } else {
            this.displayViewConfirmBirth = false;
            this.btnSubmit = true;
            this.add();
          }
        }
      } else if (this.animal_id == 2) {
        if (this.data[this.index].GiveBirthDate) {
          let date_1 = new Date(this.lastInformation.AIDate);

          console.log(this.lastInformation.AIDate);

          let dateDiff = dayjs(this.data[this.index].GiveBirthDate).diff(
            date_1,
            "day"
          );

          let res = dateDiff;

          this.txtCheck =
            "จำนวนวันตั้งแต่ผสมครั้งล่าสุด ถึงวันคลอดอยู่ระหว่าง" + res + "วัน";

          let error = 0;
          if (this.data.length != 0) {
            let check = this.data[this.data.length - 2];
            console.log(this.data);

            if (check) {
              let dateDiff1 = dayjs(this.data[this.index].GiveBirthDate).diff(
                check.GiveBirthDate,
                "day"
              );
              if (dateDiff1 < 320) {
                error = 1;
              }
            }
          }

          if (this.data.length != 0) {
            console.log(this.animalInfo.AnimalBirthDate);

            let dateDiff2 = dayjs(this.data[this.index].GiveBirthDate).diff(
              this.animalInfo.AnimalBirthDate,
              "day"
            );

            if (dateDiff2 < 1) {
              error = 2;
            }
          }

          if (error == 2) {
            this.txtCheck = "ไม่สามารถบันทึกคลอดก่อนวันเกิดแม่พันธุ์ได้";
            this.displayViewConfirmBirth = true;
            this.btnSubmit = false;
          } else if (error == 1) {
            this.txtCheck =
              "ระยะห่างจากวันที่คลอดครั้งล่าสุดน้อยกว่า 320 วัน ไม่สามารถบันทึกคลอดได้";
            this.displayViewConfirmBirth = true;
            this.btnSubmit = false;
          } else if (this.lastInformation.AIDate == null) {
            this.txtCheck = "เพิ่มข้อมูลการคลอด โดยไม่มีการผสม";
            this.btnSubmit = true;
            this.displayViewConfirmBirth = true;
          } else if (res < 320) {
            this.txtCon =
              "ระยะเวลาครั้งผสมครั้งล่าสุด ถึงวันคลอดน้อยกว่า 320 วัน ไม่สามารถบันทึกคลอดได้";
            // this.btnSubmit = true;
            // this.displayViewConfirmBirth = true;
            this.displayViewConfirmBirth = true;
            this.btnSubmit = false;
          }
          //   else if (res >= 310) {
          //     this.txtCon =
          //       "ระยะเวลาครั้งผสมครั้งล่าสุด ถึงวันคลอดมากกว่า 310 วัน ยืนยันคลอดหรือบันทึกผสมเพิ่มเติม";
          //     this.btnSubmit = true;
          //     this.displayViewConfirmBirth = true;
          //   }
          else {
            this.displayViewConfirmBirth = false;
            this.btnSubmit = true;
            this.add();
          }
        }
      } else {
        console.log("แพะ");
      }

      // this.displayViewConfirmBirth = true;
    },

    // btnConfirm1() {
    //   this.$emit("tab-click", {
    //     originalEvent: event,
    //     index: 4,
    //   });
    // },

    // btnConfirm2(val) {
    //   if (val == "deniedBaby") {
    //     this.props.permit.MenuID = 1;
    //   }
    // },

    closeConfirmBirth() {
      this.displayViewConfirmBirth = false;
    },
    openViewBaby(id) {
      this.index = id;

      // this.data[this.index].ChildAnimal;

      this.displayViewBaby = true;
    },
    closeViewBaby() {
      this.displayViewBaby = false;
    },
    openRegister(id, day, index) {
      this.index = index;
      // console.log(id + day);

      // console.log(this.data[this.index].AI.Semen);
      // console.log(this.data[this.index]);
      let fatherid;
      let borntype;

      if (this.data[this.index].TransferEmbryo) {
        fatherid = this.data[this.index].TransferEmbryo.Embryo.MaleBreederID;

        borntype = "EMBRYO";
      } else if (this.data[this.index].AI) {
        borntype = "AI";
        fatherid = this.data[this.index].AI.Semen.BreederID;
        // fatherid = this.data[this.index].Animal.AnimalID;
      } else {
        borntype = "NORMAL";
      }

      // console.log(this.lastInformation);
      // console.log(this.data[this.index]);
      let item = {
        GiveBirthID: id,
        AnimalID: this.AnimalID,
        AnimalFirstBreed: 1,
        checkBorn: true,
        FarmID: this.animalInfo.AnimalFarm.FarmID,
        OrganizationID: this.animalInfo.OrganizationID,
        OrganizationZoneID: this.animalInfo.OrganizationZone.OrganizationZoneID,
        AnimalBirthDate: day,
        FatherID: fatherid,
        BornType: borntype,
      };

      console.log(item);
      store.dispatch("bornItem", item);
      this.$router.push("/creaturebaby/add");
    },
    editAnimal(id) {
      this.$router.push("/creaturebaby/edit/" + id);
    },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>
