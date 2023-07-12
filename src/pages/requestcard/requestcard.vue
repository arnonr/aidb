<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="แจ้งขอมีบัตร" :pages="breadcrumb" />

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
        <div class="flex justify-content-end mb-3">
          <div v-if="!selectUser || selectUser.length == 0">
            <Button
              type="button"
              :disabled="!selectUser || selectUser.length == 0"
              :class="
                !selectUser || selectUser.length == 0 ? 'p-button-text' : ''
              "
              class="mr-2"
            >
              <i class="pi pi-id-card"></i>
              <span class="ml-2 font-bold">กรุณาเลือกบัตรที่ต้องการ</span>
            </Button>
          </div>
          <div v-else>
            <Button type="button" class="mr-2" @click="exportPersonalCard">
              <i class="pi pi-id-card"></i>
              <span class="ml-2 font-bold"
                >ออกบัตร {{ selectUser.length }}/6</span
              >
              <span class="ml-2 font-bold">ใบ</span>
            </Button>
          </div>
          <Button
            type="button"
            @click="selectUser = false"
            :disabled="!selectUser.length"
            :class="
              selectUser.length > 0
                ? 'p-button-danger'
                : 'p-button-danger p-button-text'
            "
          >
            <i class="pi pi-trash"></i>
            <span class="ml-2 font-bold">เคลียร์ใบออกบัตร</span>
          </Button>
        </div>
        <DataTable
          class="text-sm"
          :value="data"
          :paginator="true"
          :rows="10"
          v-model:filters="search"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
        >
          <Column header="เลือก">
            <template #body="slotProps">
              <div v-if="slotProps.data.IsApprove == 'อนุมัติ'">
                <Checkbox
                  :value="slotProps.data.StaffID"
                  v-model="selectUser"
                  :disabled="checkUser"
                />
              </div>
            </template>
          </Column>
          <Column
            field="show_id"
            header="ลำดับ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Staff.StaffNumber"
            header="รหัสบุคลากร"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="CountryName"
            header="ชื่อ-นามสกุล"
            class="text-center"
            :sortable="true"
          >
            <template #body="slotProps">
              <span v-if="slotProps.data.Staff">
                {{
                  `${slotProps.data.Staff.StaffGivenName || ""} ${
                    slotProps.data.Staff.StaffSurname || ""
                  }`
                }}
              </span>
            </template>
          </Column>
          <Column
            field="Staff.Organization.OrganizationName"
            header="หน่วยงานที่สังกัด"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Staff.PositionType.PositionTypeName"
            header="ประเภทบุคลากร"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Staff.Position.PositionName"
            header="หน้าที่ความรับผิดชอบ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ThaiCardStartDate"
            header="วันที่ออกบัตร"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ThaiCardExpireDate"
            header="วันที่บัตรหมดอายุ"
            class="text-center"
            :sortable="true"
          ></Column>

          <Column
            field="IsApprove"
            header="สถานะ"
            class="text-center"
            :sortable="true"
          >
            <template #body="slotProps">
              <div v-if="slotProps.data.IsApprove == 'รออนุมัติ'">
                <Tag class="w-full" severity="warning">รออนุมัติ</Tag>
              </div>
              <div v-else-if="slotProps.data.IsApprove == 'อนุมัติ'">
                <Tag class="w-full" severity="success">อนุมัติ</Tag>
              </div>
              <div v-else>
                <Tag class="w-full" severity="danger">ไม่อนุมัติ</Tag>
              </div>
            </template>
          </Column>
          <Column
            field="ThaiRequestDate"
            header="วันที่ยื่นเรื่อง"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ThaiApproveDatetime"
            header="วันที่อนุมัติ"
            class="text-center"
            :sortable="true"
          ></Column>

          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <SplitButton
                label="ดำเนินการ"
                icon="pi pi-pencil"
                @click="open_edit(slotProps.data.CardRequestID)"
                class="p-button-sm p-button-outlined p-button-warning"
                :model="getItems(slotProps.data.CardRequestID)"
              >
              </SplitButton>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <!-- end main page -->

    <!-- EDIT Dialog -->
    <Dialog
      header="ดำเนินการ"
      v-model:visible="display_edit"
      :style="{ width: '30vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">
                สถานะรายการ <span class="text-red-500"> *</span></label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกสถานะรายการ"
                :options="listApprove"
                optionLabel="name"
                v-model="form.IsApprove"
                :class="{ 'p-invalid': !form.IsApprove && valid }"
              />
            </div>

            <div class="field col-12 sm:col-12" v-if="form.check == 1">
              <label class="block text-sm font-bold mb-2">
                วันที่ออกบัตร<span class="text-red-500"> *</span>
              </label>
              <!-- <Calendar
                class="w-full"
                :showButtonBar="true"
                :showIcon="true"
                dateFormat="dd/mm/yy"
                v-model="form.CardStartDateNew"
                :touchUI="true"
              /> -->

              <Datepicker
                v-model="form.CardStartDateNew"
                id="dateRange"
                locale="th"
                :format="format"
                utc
                :enableTimePicker="false"
                cancelText="ยกเลิก"
                selectText="ยืนยัน"
                placeholder="วันที่ออกบัตร"
              >
                <template #year="{ year }">
                  {{ year + 543 }}
                </template>
                <template #year-overlay="{ value }">
                  {{ value + 543 }}
                </template>
              </Datepicker>
            </div>

            <div class="field col-12 sm:col-12" v-if="form.check == 1">
              <label class="block text-sm font-bold mb-2">
                วันที่บัตรหมดอายุ
              </label>
              <!-- <Calendar
                class="w-full"
                :showButtonBar="true"
                :showIcon="true"
                v-model="form.CardExpireDateNew"
                :touchUI="true"
              /> -->

              <Datepicker
                v-model="form.CardExpireDateNew"
                id="dateRange"
                locale="th"
                :format="format"
                utc
                :enableTimePicker="false"
                cancelText="ยกเลิก"
                selectText="ยืนยัน"
                placeholder="วันที่บัตรหมดอายุ"
              >
                <template #year="{ year }">
                  {{ year + 543 }}
                </template>
                <template #year-overlay="{ value }">
                  {{ value + 543 }}
                </template>
              </Datepicker>
            </div>
            <div class="field col-12 sm:col-12" v-if="form.check == 1">
              <label class="block text-sm font-bold mb-2">
                วันที่อนุมัติ
              </label>
              <!-- <Calendar
                class="w-full"
                :showButtonBar="true"
                :showIcon="true"
                v-model="form.ApproveDatetime"
                :touchUI="true"
              /> -->
              <Datepicker
                v-model="form.ApproveDatetime"
                id="dateRange"
                locale="th"
                :format="format"
                utc
                :maxDate="new Date()"
                :enableTimePicker="false"
                cancelText="ยกเลิก"
                selectText="ยืนยัน"
                placeholder="วันที่อนุมัติ"
              >
                <template #year="{ year }">
                  {{ year + 543 }}
                </template>
                <template #year-overlay="{ value }">
                  {{ value + 543 }}
                </template>
              </Datepicker>
            </div>

            <div class="field col-12 sm:col-12" v-if="form.check == 2">
              <label class="block text-sm font-bold mb-2">
                เหตุผล (ถ้ามี)
              </label>
              <InputText type="text" class="w-full" v-model="form.Remark" />
            </div>

            <div class="col-12 lg:col-12">
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
                v-model="form.ApproveByStaffID"
                :class="{ 'p-invalid': !form.ApproveByStaffID && valid }"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="close_edit()"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="update()"
          />
        </div>
      </form>
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
  </div>
</template>

<script>
import axios from "axios";
import { FilterMatchMode } from "primevue/api";
import PageTitle from "@/components/PageTitle.vue";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import PersonalCard from "./personalCard";

export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  data() {
    return {
      url: "/card-request-log",
      apiCard: "/card-request-log?orderByField=CardRequestID&orderBy=desc",
      apiPersonal: "/staff?isActive=1",
      apiStaff: "/staff",

      breadcrumb: [
        { label: "อนุมัติรายการ", to: "" },
        { label: "แจ้งขอมีบัตร", to: "" },
      ],
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },

      // load
      data: [],
      isLoading: false,
      personal: [],
      // form
      valid: false,
      form: {
        isActive: "",
      },
      selectUser: false,
      checkUser: false,

      listApprove: [
        {
          id: "0",
          name: "รออนุมัติ",
        },
        {
          id: "1",
          name: "อนุมัติ",
        },
        {
          id: "2",
          name: "ไม่อนุมัติ",
        },
      ],

      approve: [
        { name: "รออนุมัติ", key: "A", value: 0 },
        { name: "อนุมัติ", key: "B", value: 1 },
        { name: "ไม่อนุมัติ", key: "C", value: 2 },
      ],
      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],

      //  cancel requests
      controller: new AbortController(),

      // Modal
      display_add: false,
      display_edit: false,
      display_delete: false,
    };
  },
  mounted() {
    this.load();

    axios
      .get(this.apiPersonal, {
        signal: this.controller.signal,
      })
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
  },
  watch: {
    selectUser() {
      if (this.selectUser.length > 5) {
        this.checkUser = true;
      } else {
        this.checkUser = false;
      }
    },
    "form.IsApprove"(val) {
      if (val) {
        this.form.check = val.id;
        this.form.ApproveDatetime = new Date();
      } else {
        this.form.ApproveDatetime = null;
      }
    },
    "form.CardStartDateNew"(val) {
      if (this.form.StaffPositionTypeID && val) {
        // กรณีเป็นตำแหน่งราชการให้หมดอายุ auto 5 ปี
        if (this.form.StaffPositionTypeID == 1) {
          const date1 = dayjs(val);
          this.form.CardExpireDateNew = date1.add(5, "year");
        } else if (this.form.StaffPositionTypeID == 2) {
          const date1 = dayjs(val);
          this.form.CardExpireDateNew = date1.add(3, "year");
        } else if (this.form.StaffPositionTypeID == 3) {
          const date1 = dayjs(val);
          this.form.CardExpireDateNew = date1.add(3, "year");
        }
      }
    },
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
    async exportPersonalCard() {
      await PersonalCard(this.selectUser);
      this.selectUser = false;
    },
    getItems(id) {
      const items = [
        {
          label: "พิมพ์ข้อมูล",
          icon: "pi pi-eye",
          command: async () => {
            await PersonalCard();
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
    clear() {
      this.form = {
        CountryCode: "",
        CountryName: "",
        CountryNameEN: "",
        CountryID: "",
        isActive: this.status[0],
      };
      this.valid = false;
    },
    validation() {
      if (!this.form.IsApprove) {
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
    // Axios
    load() {
      axios.get(this.apiCard).then((response) => {
        this.data = response.data.rows.filter((item) => item.Staff != null);
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].show_id = i + 1;

          // ApproveDatetime
        }
      });
    },
    add() {
      // validation
      if (this.validation() == false) {
        return;
      }

      // change data
      this.form.isActive = this.form.isActive.value;
      this.form.IsApprove = this.form.IsApprove.name;

      if (this.form.IsApprove == "อนุมัติ") {
        if (!this.form.CardStartDate || !this.form.CardExpireDate) {
          this.valid = true;
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: "กรุณากรอกข้อมูลวันออกบัตรและวันหมดอายุบัตร",
            life: 5000,
          });
          return false;
        } else {
          return true;
        }
      }
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
      this.form.IsApprove = this.form.IsApprove.id;

      if (this.form.IsApprove == 1) {
        if (!this.form.CardStartDateNew || !this.form.CardExpireDateNew) {
          this.valid = true;
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: "กรุณากรอกข้อมูลวันออกบัตรและวันหมดอายุบัตร",
            life: 5000,
          });
          return false;
        }
      }

      this.form.CardStartDate = this.form.CardStartDateNew;
      this.form.CardExpireDate = this.form.CardExpireDateNew;

      axios
        .put(this.url + "/" + this.form.CardRequestID, this.form)
        .then(() => {
          if (this.form.IsApprove == 1) {
            let form = {
              StaffID: this.form.StaffID,
              CardStartDate: this.form.CardStartDateNew,
              CardExpireDate: this.form.CardExpireDateNew,
            };

            this.callUpdateStaff(form);
          }

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

    callUpdateStaff(form) {
      axios
        .put(this.apiStaff + "/" + form.StaffID, form)
        .then(() => {
          // this.$toast.add({
          //   severity: "success",
          //   summary: "สำเร็จ",
          //   detail: "แก้ไขข้อมูลเสร็จสิ้น 2",
          //   life: 5000,
          // });
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
    open_edit(id) {
      let data = this.data.find((x) => x.CardRequestID == id);

      this.form = {
        CardRequestID: data.CardRequestID,
        StaffID: data.Staff.StaffID,
        StaffPositionTypeID: data.Staff.StaffPositionTypeID,
        check: 0,
      };
      this.form.ApproveByStaffID = this.user.StaffID;
      this.display_edit = true;
    },
    close_edit() {
      this.display_edit = false;
    },
    open_delete(id, show_id) {
      // //console.log(id + " " + show_id);
      this.form.id = id;
      this.form.show_id = show_id;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
