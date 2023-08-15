<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="เวลาผู้เข้าใช้งาน" :pages="breadcrumb" />
      <div class="card mb-5">
        <div class="grid">
          <div class="col-12">
            <h1 class="text-xl mb-4 text-500">
              เครื่องมือช่วยค้นหาเวลาผู้เข้าใช้งาน
            </h1>
          </div>

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลขไอพี</label
            >
            <InputText
              class="w-full"
              type="text"
              v-model="params.AnimalIdentificationID"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              แสดงตั้งแต่วันที่</label
            >
            <Datepicker
              v-model="search.StaffStartDate"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="ตั้งแต่วันที่"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              จนถึงวันที่สิ้นสุด</label
            >
            <Datepicker
              v-model="search.StaffEndDate"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="จนถึงวันที่สิ้นสุด"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">เวลาผู้เข้าใช้งาน</h1>
          </div>
        </div>
        <DataTable
          class="text-sm"
          :value="data"
          :exportable="true"
          ref="dt"
          :rowHover="true"
          :loading="isLoading"
          :paginator="true"
          v-model:rows="params.size"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          :totalRecords="table.total"
          @page="load"
          @sort="sort($event)"
          lazy
        >
          <Column
            field="StaffFullName"
            header="ชื่อ-นามสกุล"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="User.Username"
            header="อีเมล"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="IPAddress"
            header="หมายเลขไอพี"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="ThaiLoginDatetime"
            header="วันที่เข้าใช้งาน"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>

          <template #empty> ไม่พบข้อมูล </template>
          <template #loading>
            <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
          </template>
        </DataTable>
      </div>
    </div>
    <!-- end main page -->
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
import { mapGetters } from "vuex";
import _ from "lodash";
import { format } from "date-fns";
import { th } from "date-fns/locale";
export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      breadcrumb: [
        { label: "หน้าหลัก", to: "/" },
        { label: "เวลาผู้เข้าใช้งาน", to: "" },
      ],

      // load
      data: [],

      // หน้า page
      curpage: 0,
      isLoading: false,
      valid: false,

      // Params
      params: {
        page: 1,
        size: 10,
        orderByField: "LoginLogID",
        orderBy: "desc",
      },

      table: {
        total: 0,
        last_page: 0,
      },

      // ผูกไว้ทำปุ่มค้นหา
      search: {
        StaffStartDate: "",
        StaffEndDate: "",
      },

      //  cancel requests permit: null,
      permit: null,
      controller: new AbortController(),
    };
  },
  computed: {
    ...mapGetters({
      permission: "get_permission",
      animal_id: "animal_id",
    }),
  },
  mounted() {
    // ข้อมูลหลัก
    this.load();

    this.permit = this.permission.filter((item) => {
      return item.MenuID == 3;
    });
  },
  watch: {
    // ค้นหา
    "search.OrganizationID"(val) {
      if (val) {
        this.params.OrganizationID = val;
      } else {
        this.params.OrganizationID = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.OrganizationZoneID"(val) {
      if (val) {
        this.params.OrganizationZoneID = val;
      } else {
        this.params.OrganizationZoneID = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    // ค้นหา
    "search.FarmID"(val) {
      if (val) {
        this.params.FarmID = val;
      } else {
        this.params.FarmID = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalIdentificationID": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalEarID": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalNationalID": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalMicrochip": _.debounce(function () {
      this.load();
    }, 500),
    "params.FarmName": _.debounce(function () {
      this.load();
    }, 500),
    "params.FarmerName": _.debounce(function () {
      this.load();
    }, 500),

    // ค้นหา
    "search.AnimalSexID"(val) {
      if (val) {
        this.params.AnimalSexID = val;
      } else {
        this.params.AnimalSexID = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.AnimalSource"(val) {
      if (val) {
        this.params.AnimalSource = val.id;
      } else {
        this.params.AnimalSource = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalName": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalAgeStart": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalAgeTo": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID1": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID2": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID3": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID4": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID5": _.debounce(function () {
      this.load();
    }, 500),

    // ค้นหา
    "search.StaffTumbolID"(val) {
      this.filtered.StaffTumbolID = val;
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
    async load(event) {
      this.isLoading = true;

      // สำหรับเปลี่ยนหน้า
      if (event) {
        this.params.page = event.page + 1;
      }

      // กำหนด parameter
      this.setParam();

      await axios
        .get("/login-log", {
          params: this.params,
          signal: this.controller.signal,
        })
        .then((response) => {
          let data = response.data;
          this.params.page = data.currPage;
          this.table.total = data.total;
          this.table.last_page = data.lastPage;
          this.data = data.rows;

          for (let i = 0; i < this.data.length; i++) {
            this.data[i].StaffFullName = this.data[i].User.Staff.StaffFullName;
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    setParam() {},

    // sort table
    sort($event) {
      // console.log($event);
      if ($event.sortField !== "show_id") {
        if ($event.sortOrder == 1) {
          this.params.orderBy = "asc";
        } else {
          this.params.orderBy = "desc";
        }
        this.params.orderByField = $event.sortField;
        this.load();
      }
    },
    // page change
    page($event) {
      this.curpage = $event.page + 1;
      this.load();
    },

    exportCSV() {
      this.$refs.dt.exportCSV();
    },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
