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
        v-if="AnimalSecretStatus.includes(4) && permit[0].IsAdd"
      />
    </div>
  </div>
  <DataTable
    class="text-sm"
    :value="data"
    :paginator="true"
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
    />
    <Column header="จัดการ" class="text-center">
      <template #body="slotProps">
        <SplitButton
          v-if="slotProps.data.show_id == total || this.user.GroupID == 1"
          label="แก้ไข"
          icon="pi pi-pencil"
          @click="edit(slotProps.data.show_id - 1)"
          class="p-button-sm p-button-outlined p-button-warning"
          :model="getItems(slotProps.data.show_id - 1)"
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
    <div class="grid">
      <div class="col-12">หมายเลขสัตว์ : {{ show.id }}</div>
      <div class="col-12">ชื่อ : {{ show.name }}</div>
      <div class="col-12">ฟาร์ม : {{ show.farm }}</div>
    </div>
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
              ประเภทการผสม</label
            >
            <InputText v-model="show.type" class="w-full" :disabled="true" />
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
              ครั้งที่ผสม</label
            >
            <InputText v-model="show.TimeNo" class="w-full" :disabled="true" />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ครั้งที่ตรวจท้อง</label
            >
            <!-- TimeNo = PregnancyCheckupTimeNo -->
            <InputNumber
              v-if="formheader == 'เพิ่ม'"
              v-model="data[index].TimeNo"
              class="w-full"
              :disabled="true"
              :class="{
                'p-invalid': !data[index].TimeNo && valid,
              }"
            />
            <InputNumber
              v-if="formheader == 'แก้ไข'"
              v-model="data[index].PregnancyCheckupTimeNo"
              class="w-full"
              :disabled="true"
              :class="{
                'p-invalid': !data[index].PregnancyCheckupTimeNo && valid,
              }"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่ตรวจท้อง<span class="text-red-500"> *</span></label
            >
            <!-- <Calendar
              :manualInput="false"
              :maxDate="new Date()"
              v-model="data[index].CheckupDate"
              dateFormat="dd/mm/yy"
              class="w-full"
              :class="{
                'p-invalid': !data[index].CheckupDate && valid,
              }"
            /> -->

            <Datepicker
              v-model="data[index].CheckupDate"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              :minDate="lastdate"
              :maxDate="new Date()"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="วันที่ตรวจท้อง"
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
              วิธีการตรวจการตั้งท้อง<span class="text-red-500"> *</span></label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกวิธีการตรวจการตั้งท้อง"
              optionLabel="PregnancyCheckMethodName"
              optionValue="PregnancyCheckMethodID"
              v-model="data[index].PregnancyCheckMethodID"
              :options="selection.PregnancyCheckMethodID"
              :class="{
                'p-invalid': !data[index].PregnancyCheckMethodID && valid,
              }"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ผลการตรวจการตั้งท้อง<span class="text-red-500"> *</span></label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกผลการตรวจการตั้งท้อง"
              optionLabel="PregnancyCheckStatusName"
              optionValue="PregnancyCheckStatusID"
              v-model="data[index].PregnancyCheckStatusID"
              :options="selection.PregnancyCheckStatusID"
              :class="{
                'p-invalid': !data[index].PregnancyCheckStatusID && valid,
              }"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              คะแนนร่างกาย</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกคะแนนร่างกาย"
              optionLabel="BCSName"
              optionValue="BCSID"
              v-model="data[index].BCSID"
              :options="selection.BCS"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              หมายเหตุ</label
            >
            <InputText v-model="data[index].Remark" class="w-full" />
          </div>
        </div>
      </div>
      <div class="col-12 text-center mt-5 flex justify-content-between">
        <Button
          label="ยกเลิก"
          class="p-button-secondary w-full mr-3"
          @click="close()"
        />
        <Button
          label="บันทึกข้อมูล"
          class="ml-3 p-button-info w-full"
          @click="add()"
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
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import Swal from "sweetalert2";
import dayjs from "dayjs";
export default {
  emits: ["refresh_secret_status", "onclear_display"],
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
      url: "/pregnancy-checkup",
      // ID
      id: "PregnancyCheckupID",
      // Name
      name: "ตรวจการตั้งท้อง",

      //load_selection
      LoadSelection: {
        BCS: "/bcs",

        Staff: "/staff/selection?includeAll=false&isActive=1",
        PregnancyCheckMethodID: "/pregnancy-check-method",
        PregnancyCheckStatusID: "/pregnancy-check-status",
      },

      // Selection
      total: null,
      selection: {
        Staff: null,
        BCS: null,

        PregnancyCheckMethodID: null,
        PregnancyCheckStatusID: null,
      },
      show: {},
      // Table Field
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
        {
          field: "PAR",
          header: "ท้องที่",
        },
        {
          field: "TimeNo",
          header: "ครั้งที่ผสม",
        },
        {
          field: "ThaiDate",
          header: "วันที่ผสม",
        },
        // {
        //   field: "Type",
        //   header: "ประเภทการผสม",
        // },
        {
          field: "ThaiCheckupDate",
          header: "วันที่ตรวจท้อง",
        },
        {
          field: "PregnancyCheckupTimeNo",
          header: "ครั้งที่ตรวจ",
        },
        {
          field: "PregnancyCheckStatusName",
          header: "ผลการตรวจ",
        },
        {
          field: "BCSName",
          header: "คะแนนร่างกาย",
        },
        {
          field: "ResponsibilityStaffName",
          header: "เจ้าหน้าที่",
        },
      ],
      lastdate: null,
      // Search
      isSelection: false,

      // Static Data

      isLoading: false,
      data: [
        {
          AI: {},
        },
      ],
      valid: false,
      index: null,
      display: false,
      display_delete: false,
      temp: null,
      formheader: "",
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
      this.AnimalSecretStatus.includes(4) &&
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
        !this.data[this.index].TimeNo ||
        !this.data[this.index].CheckupDate ||
        !this.data[this.index].PregnancyCheckMethodID ||
        !this.data[this.index].PregnancyCheckStatusID
      ) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "กรุณากรอกข้อมูล",
          life: 5000,
        });
        this.valid = true;
        return false;
      } else {
        // let $d1 = this.show.date;
        // let $d2 = 400;

        var $d1 = dayjs(this.data[this.index].CheckupDate).diff(this.show.date, "day");

        if ($d1 < 21 || $d1 > 310) {
          Swal.fire({
            icon: "error",
            text: "วันที่ตรวจท้อง ต้องอยู่ภายในระยะเวลา 21-310 วัน หลังจากผสมเทียม",
          });
          return false;
        }
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
        resolve();
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
            this.data = response.data.rows.filter(
              (item) => item.AnimalID === this.AnimalID
            );
            this.total = this.data.length;

            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
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
      if (
        this.index == this.data.length - 1 &&
        !this.data[this.index].CreatedUserID
      ) {
        //create data
        axios
          .post(this.url, this.data[this.index])
          .then(() => {
            setTimeout(() => {
              this.load();
            }, 1500);
            this.close();
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
    //   this.$emit("refresh_secret_status");
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
    //   this.$emit("refresh_secret_status");
    },
    // form open add
    async open() {
      this.index = this.data.length;
      this.formheader = "เพิ่ม";
      this.data.push({
        AnimalID: this.AnimalID,
      });

      this.data[this.index].ResponsibilityStaffID = this.user.StaffID;
      await axios
        .get(`animal?AnimalID=${this.AnimalID}`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.show.id = response.data.rows[0].AnimalEarID;
          this.show.name = response.data.rows[0].AnimalName;
          this.show.farm = `${response.data.rows[0].AnimalFarm.FarmIdentificationNumber}, ${response.data.rows[0].AnimalFarm.FarmName} `;
        });

      await axios
        .get(`animal/get-by-farm-id?AnimalID=${this.AnimalID}`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.data[this.index].TimeNo =
            response.data.rows[0].PregnancyTimeNo + 1;
          this.show.TimeNo = response.data.rows[0].TimeNo;
          this.data[this.index].PAR = response.data.rows[0].PAR;
          if (response.data.rows[0].AIID) {
            this.show.type = "ผสมเทียม";
            this.show.date = response.data.rows[0].AIDate;
            this.data[this.index].AIID = response.data.rows[0].AIID;
          } else if (response.data.rows[0].TransferEmbryoID) {
            this.show.type = "ย้ายฝากตัวอ่อน";
            this.show.date = response.data.rows[0].EmbryoDate;
            this.data[this.index].TransferEmbryoID =
              response.data.rows[0].TransferEmbryoID;
          }
        });
      this.lastdate = this.data[this.data.length - 2]?.CheckupDate;
      this.display = true;
    },
    //form open edit
    async edit(id) {
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
      axios
        .get(`animal?AnimalID=${this.AnimalID}`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.show.id = response.data.rows[0].AnimalEarID;
          this.show.name = response.data.rows[0].AnimalName;
          this.show.farm = `${response.data.rows[0].AnimalFarm.FarmIdentificationNumber}, ${response.data.rows[0].AnimalFarm.FarmName} `;
        });
      if (this.data[this.index].Type == "AI") {
        this.show.type = "ผสมเทียม";
      } else if (this.data[this.index].Type == "Embryo") {
        this.show.type = "ย้ายฝากตัวอ่อน";
      } else {
        this.show.type = "ธรรมชาติ";
      }
      await axios
        .get(`animal/get-by-farm-id?AnimalID=${this.AnimalID}`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.data[this.index].TimeNo =
            response.data.rows[0].PregnancyTimeNo + 1;
          this.show.TimeNo = response.data.rows[0].TimeNo;
          this.data[this.index].PAR = response.data.rows[0].PAR;
          if (response.data.rows[0].AIID) {
            this.show.type = "ผสมเทียม";

            this.data[this.index].AIID = response.data.rows[0].AIID;
          } else if (response.data.rows[0].TransferEmbryoID) {
            this.show.type = "ย้ายฝากตัวอ่อน";
            this.show.date = response.data.rows[0].EmbryoDate;
            this.data[this.index].TransferEmbryoID =
              response.data.rows[0].TransferEmbryoID;
          }
        });
      this.lastdate = this.data[this.data.length - 1].CheckupDate;
      this.show.date = this.data[this.index].AI.AIDate;
      this.display = true;
    },
    close() {
      this.display = false;
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
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>

<style>
.swal2-container.swal2-top,
.swal2-container.swal2-center,
.swal2-container.swal2-bottom {
  z-index: 9999999 !important;
}
</style>
