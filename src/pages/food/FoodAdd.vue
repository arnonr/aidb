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
            <!-- <Calendar
              class="w-full"
              id="dateRange"
              v-model="form.StartDate"
              :showButtonBar="true"
              :showIcon="true"
              :class="{ 'p-invalid': !form.StartDate && valid }"
            /> -->

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
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
              <template #year-overlay="{ value }">
                {{ value + 543 }}
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
            <!-- <Calendar
              class="w-full"
              id="dateRange"
              v-model="form.EndDate"
              :manualInput="false"
              :showButtonBar="true"
              :showIcon="true"
            /> -->
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
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
              <template #year-overlay="{ value }">
                {{ value + 543 }}
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
              เจ้าหน้าที่ผู้รับผิดชอบ<span class="text-red-500"> *</span></label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <Dropdown
                class="w-full"
                :options="data.Staff"
                optionLabel="Fullname"
                optionValue="StaffID"
                placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
                :virtualScrollerOptions="{
                  lazy: true,

                  itemSize: 38,
                  showLoader: true,
                  loading: loading,
                  delay: 250,
                }"
                :filter="true"
                :showClear="true"
                v-model="form.ResponsibilityStaffID"
                :class="{ 'p-invalid': !form.ResponsibilityStaffID && valid }"
              >
                <template v-slot:loader="{ options }">
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
                </template>
              </Dropdown>
              <!-- <InputNumber
                type="text"
                class="w-full"
                v-model="form.StaffID"
                id="officerCode"
              /> -->
            </span>
          </div>
        </div>
      </div>
      <div class="card" v-if="form.FeedProgramName && form.StartDate">
        <div>
          <form>
            <DataTable
              class="text-sm"
              :value="data.animal"
              :loading="isLoading"
              v-model:filters="search"
              :rows="10"
              :paginator="true"
              v-model:selection="form.Animal"
              @sort="sort($event)"
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
                selectionMode="multiple"
                :exportable="false"
                class="text-center"
              ></Column>
              <!-- <Column
                field="StartWeight"
                header="น้ำหนักเริ่มต้น"
                class="text-center"
              >
                <template #body="slotProps">
                  <InputNumber
                    class="w-full p-inputtext-sm"
                    v-model="slotProps.data.StartWeight"
                    @blur="getweight($event)"
                    placeholder="น้ำหนักเริ่มต้น"
                  />
                </template>
              </Column>
            -->
              <!-- <Column header="ความคืบหน้า" class="text-center">
                <template #body="slotProps">
                  <Button icon="pi pi-external-link text-xl" class="p-button-text"
                    @click="linkProgress(slotProps.data.AnimalID)" />
                </template>
              </Column> -->
              <Column
                field="AnimalEarID"
                header="หมายเลขสัตว์"
                :sortable="true"
                class="text-center"
              ></Column>
              <Column
                field="AnimalName"
                header="ชื่อสัตว์ "
                :sortable="true"
                class="text-center"
              ></Column>
              <Column
                field="ThaiAnimalBirthDate"
                header="วัน/เดือน/ปีเกิด"
                :sortable="true"
                class="text-center"
              ></Column>
              <Column
                field="AnimalAge"
                header="อายุ"
                :sortable="true"
                class="text-center"
              ></Column>
              <Column
                field="AnimalBreedAll"
                header="สายพันธุ์"
                :sortable="true"
                class="text-center"
              ></Column>
              <Column
                field="AnimalStatus.AnimalStatusName"
                header="สถานะ"
                :sortable="true"
                class="text-center"
              ></Column>
              <template #empty> ไม่พบข้อมูล </template>
              <template #loading>
                <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
              </template>
            </DataTable>
          </form>
          <div class="grid">
            <div class="col-12 text-center mt-5">
              <Button label="บันทึกข้อมูล" @click="submit" icon="pi pi-save" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { reactive, ref } from "vue";
// import { useRouter } from "vue-router";
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
    lastfeed() {
      let item = this.data.feed.slice(-1)[0];
      // console.log(item.FeedProgramID);
      return item.FeedProgramID;
    },
    ...mapGetters({
      user: "user",
      animal_id: "animal_id",
      AnimalID: "AnimalID",
    }),
    // lastFarmer() {
    //   let item = this.data.farmer.slice(-1)[0];
    //   // console.log(item.FarmerID);
    //   return item.FarmerID;
    // },
  },
  data() {
    return {
      breadcrumb: [
        { label: "เจ้าหน้าที่ผสมเทียม", to: "/activity/farm_info" },
        { label: "การจัดเก็บข้อมูลการขุน/อาหาร", to: "/activity/food" },
      ],
      data: [],
      url: [],
      form: {
        isActive: 1,
        FarmID: this.$route.params.id,
      },
      filtered: [],

      params: {
        AnimalTypeID: null,
        isActive: 1,
        FarmID: this.$route.params.id,
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
    this.url.main = "/feed-program";
    this.form.ResponsibilityStaffID = this.user.StaffID;
  },
  watch: {
    "search.FarmID"(val) {
      this.filtered.FarmID = val;
      this.load();
    },
    ...mapGetters({
      user: "user",
      animal_id: "animal_id",
      AnimalID: "AnimalID",
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
    linkProgress(id) {
      this.$router.push("/activity/food/progress/" + id);
    },
    sort($event) {
      if ($event.sortField !== "show_id") {
        if ($event.sortOrder == 1) {
          this.sortOrder = "asc";
        } else {
          this.sortOrder = "desc";
        }
        this.sortField = $event.sortField;
        this.load();
      }
    },
    // page change
    page($event) {
      this.curpage = $event.page + 1;
      this.load();
    },
    // getweight($event) {
    //   this.form.StartWeight = $event;
    // },
    // fillweight($event, $id) {
    //   this.form = {
    //     StartWeight: this.form.StartWeight.value,
    //     EndWeight: $event.value,
    //     AnimalID: $id,
    //     FeedProgramID: this.lastfeed,
    //   };

    //   axios
    //     .post("/feed-program-detail", this.form)
    //     .then(() => {
    //       this.$toast.add({
    //         severity: "success",
    //         summary: "สำเร็จ",
    //         detail: "ข้อมูลถูกบันทึก",
    //         // detail: "เพิ่มข้อมูลเสร็จสิ้น",
    //         life: 5000,
    //       });
    //     })
    //     .catch((err) => {
    //       this.$toast.add({
    //         severity: "error",
    //         summary: "ล้มเหลว",
    //         detail: err.response.data.error.message,
    //         life: 5000,
    //       });
    //     });
    // },
    load() {
      this.isLoading = true;

      // this.url.farm = "/farm";
      this.url.animal = "/animal";
      this.url.staff = "/staff?isActive=1";
      let url = this.url.animal;

      if (this.animal_id == 1) {
        this.params.AnimalTypeID = "[1,2]";
      } else if (this.animal_id == 2) {
        this.params.AnimalTypeID = "[3,4]";
      } else if (this.animal_id == 3) {
        this.params.AnimalTypeID = "[17,18]";
      }

      axios
        .get(url, { params: this.params, signal: this.controller.signal })
        .then((response) => {
          this.data.animal = response.data.rows;

          for (let i = 0; i < this.data.animal.length; i++) {
            this.data.animal[i].show_id = i + 1;
          }
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(this.url.staff, { signal: this.controller.signal })
        .then((response) => {
          this.data.Staff = response.data.rows.map((item) => {
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
    submit() {
      if (this.validation() == false) {
        return;
      }

      if (this.animal_id == 1) {
        this.form.AnimalTypeID = [1, 2];
      } else if (this.animal_id == 2) {
        this.form.AnimalTypeID = [3, 4];
      } else if (this.animal_id == 3) {
        this.form.AnimalTypeID = [17, 18];
      }

      axios
        .post(this.url.main, this.form)
        .then((res) => {
          let FeedProgramID = res.data.FeedProgramID;
          for (let i = 0; i < this.form.Animal.length; i++) {
            let formData = {
              FeedProgramID: FeedProgramID,
              AnimalID: this.form.Animal[i].AnimalID,
              isActive: 1,
            };

            this.insertAnimal(formData);
          }
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 3000,
          });
          this.$router.push("/activity/food");
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
    async insertAnimal(formData) {
      return await new Promise(() => {
        axios
          .post("/feed-program-animal", formData)
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
