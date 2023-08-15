//Ref -> 1.2.5 เมนูคลอด
<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="การจัดเก็บข้อมูลการขุน/อาหาร" :pages="breadcrumb" />
      <div class="card mb-5">
        <h1 class="text-xl mb-4 text-500">รายละเอียดโปรแกรมการขุน/อาหาร</h1>
        <div class="grid">
          <div class="col-12">
            <div class="grid">
              <div class="col-12 sm:col-6 lg:col-6 xl:col-6">
                <label for="name" class="block text-600 text-sm font-bold mb-2">
                  ชื่อโปรแกรม<span class="text-red-500"> *</span>
                </label>
                <InputText
                  class="w-full"
                  id="name"
                  v-model="form.FeedProgramName"
                  :class="{ 'p-invalid': !form.FeedProgramName && valid }"
                />
              </div>
            </div>
          </div>
          <div class="col-12 sm:col-6 lg:col-6 xl:col-6">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              วันที่เริ่มขุน<span class="text-red-500"> *</span></label
            >
            <Datepicker
              v-model="form.StartDate"
              :class="{ 'p-invalid': !form.StartDate && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="วันที่เริ่มขุน"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>
          <div class="col-12 sm:col-6 lg:col-6 xl:col-6">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              วันที่สิ้นสุด</label
            >
            <Datepicker
              v-model="form.EndDate"
              :class="{ 'p-invalid': !form.EndDate && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="วันที่สิ้นสุด"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>
          <div class="col-12 sm:col-6 lg:col-6 xl:col-6">
            <label
              for="weightGoal"
              class="block text-600 text-sm font-bold mb-2"
            >
              น้ำหนักเป้าหมาย (กก.)</label
            >
            <InputNumber
              class="w-full"
              id="weightGoal"
              placeholder="น้ำหนักเป้าหมาย"
              v-model="form.WeightGoal"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-6 xl:col-6">
            <label
              for="officerCode"
              class="block text-600 text-sm font-bold mb-2"
            >
              รหัสเจ้าหน้าที่</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <Dropdown
                class="w-full"
                :options="data.Staff"
                optionLabel="Fullname"
                optionValue="StaffID"
                placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
                :filter="true"
                v-model="form.ResponsibilityStaffID"
                :class="{ 'p-invalid': !form.ResponsibilityStaffID && valid }"
              >
                <!-- <template v-slot:loader="{ options }">
                  <div class="flex align-items-center p-2" style="height: 38px">
                    <Skeleton
                      :width="options.even ? '60%' : '50%'"
                      height="1rem"
                    />
                  </div>
                </template>
                <template #option="slotProps">
                  <div class="p-dropdown-car-option">
                    <span>{{
                      slotProps.option.StaffNumber +
                      " | " +
                      slotProps.option.StaffGivenName +
                      " " +
                      slotProps.option.StaffSurname
                    }}</span>
                  </div>
                </template> -->
              </Dropdown>
            </span>
          </div>
        </div>
        <div class="grid">
          <div class="col-12 text-center mt-5">
            <Button label="แก้ไขข้อมูล" @click="update" icon="pi pi-save" />
          </div>
        </div>
      </div>
      <div class="card">
        <div>
          <form>
            <DataTable
              class="text-sm"
              :value="data.animal"
              :loading="isLoading"
              v-model:filters="search"
              :rows="10"
              :paginator="true"
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink
                        LastPageLink RowsPerPageDropdown"
              :rowsPerPageOptions="[10, 20, 50]"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              responsiveLayout="scroll"
            >
              <template #header>
                <div class="flex justify-content-end align-items-right">
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText
                      v-model="search['global'].value"
                      placeholder="ค้นหา"
                    />
                  </span>
                </div>
              </template>

              <Column
                field="Animal.AnimalEarID"
                header="หมายเลขสัตว์"
                :sortable="true"
                class="text-center"
              >
              </Column>
              <Column
                field="Animal.AnimalName"
                header="ชื่อสัตว์ "
                class="text-center"
              ></Column>
              <Column
                field="Animal.ThaiAnimalBirthDate"
                header="วัน/เดือน/ปีเกิด"
                class="text-center"
              ></Column>
              <Column
                field="Animal.AnimalAge"
                header="อายุ"
                class="text-center"
              ></Column>
              <Column
                field="Animal.AnimalBreedAll"
                header="สายพันธุ์"
                :sortable="true"
                class="text-center"
              ></Column>
              <Column
                field="StartWeight"
                header="น้ำหนักเริ่มต้น"
                class="text-center"
              >
                <template #body="slotProps">
                  <InputNumber
                    class="w-full p-inputtext-sm"
                    placeholder="น้ำหนักเริ่มต้น"
                    mode="decimal"
                    showButtons
                    :minFractionDigits="2"
                    :maxFractionDigits="2"
                    v-model="slotProps.data.StartWeight"
                    @blur="
                      setStartWeight($event, slotProps.data.FeedProgramAnimalID)
                    "
                  />
                </template>
              </Column>
              <template #empty> ไม่พบข้อมูล </template>
              <template #loading>
                <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
              </template>
            </DataTable>

            <div class="grid">
              <div class="col-12 text-center mt-5">
                <router-link to="/activity/food">
                  <Button label="กลับหน้าหลัก" icon="pi pi-times" />
                </router-link>
                <!-- <Button label="บันทึกข้อมูล" icon="pi pi-save" /> -->
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
import { format } from "date-fns";
import { th } from "date-fns/locale";
export default {
  components: {
    PageTitle,
  },

  computed: {
    ...mapGetters({
      user: "user",
      animal_id: "animal_id",
      AnimalID: "AnimalID",
    }),
  },
  data() {
    return {
      breadcrumb: [
        { label: "เจ้าหน้าที่ผสมเทียม", to: "/activity/farm_info" },
        { label: "การจัดเก็บข้อมูลการขุน/อาหาร", to: "/activity/food" },
      ],
      data: [],
      url: [],
      form: [],
      filtered: [],

      params: {
        isActive: 1,
        FeedProgramID: this.$route.params.id,
      },
      search: {
        FarmID: "",
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      controller: new AbortController(),
      curpage: 0,
      sortField: "",
      sortOrder: "",
      selectedAnimal: null,
    };
  },
  mounted() {
    this.load();
    // this.loadform();
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
    setStartWeight($event, $id) {
      let form = {
        StartWeight: $event.value,
      };
      axios
        .put("/feed-program-animal/" + $id, form)
        .then(() => {
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ข้อมูลถูกบันทึก",
            // detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 500,
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

    load() {
      axios
        .get("feed-program/" + this.params.FeedProgramID, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.form = res.data;
        })
        .finally(() => {
          this.isLoading = false;
        });

      this.url.staff = "/staff?isActive=1";
      axios
        .get(this.url.staff, { signal: this.controller.signal })
        .then((response) => {
          this.data.Staff = response.data.rows.map((item) => {
            return {
              StaffID: item.StaffID,
              StaffNumber: item.StaffNumber,
              Fullname: item.StaffNumber + ", " + item.StaffFullName,
            };
          });
        })
        .finally(() => {
          this.isLoading = false;
        });

      this.url.feed = "/feed-program-animal";

      axios
        .get(this.url.feed, {
          params: this.params,
          signal: this.controller.signal,
        })
        .then((response) => {
          this.data.animal = response.data.rows;

          for (let i = 0; i < this.data.animal.length; i++) {
            this.data.animal[i].show_id = i + 1;
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    validation() {
      if (
        !this.form.FeedProgramName ||
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
    update() {
      axios
        .put("feed-program/" + this.params.FeedProgramID, this.form, {
          signal: this.controller.signal,
        })
        .then(() => {
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "แก้ไขข้อมูลเสร็จสิ้น",
            life: 3000,
          });
        })
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}

.header {
  font-weight: 700;
  color: #ffa726;
}
</style>
