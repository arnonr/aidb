<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle :title="title" />
      <div v-if="loader" class="card mb-5">
        <h1 class="text-xl mb-4 text-500">เครื่องมือช่วยค้นหา</h1>
        <div class="grid">
          <div class="col-12 sm:col-6 lg:col-6">
            <label for="AIZoneID" class="block text-600 text-sm font-bold mb-2">
              ศูนย์วิจัย</label
            >
            <Dropdown
              class="w-full"
              v-model="search.AIZoneID"
              :options="dropdown.AIZones"
              optionLabel="AIZoneName"
              optionValue="AIZoneID"
              :disabled="isSelectAIZoneDisabled"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
            >
            </Dropdown>
          </div>

          <div class="col-12 sm:col-6 lg:col-6">
            <label
              for="searchOrganizationZoneID"
              class="block text-600 text-sm font-bold mb-2"
            >
              เขตพื้นที่ปศุสัตว์</label
            >
            <Dropdown
              class="w-full"
              v-model="search.OrganizationZoneID"
              :options="dropdown.OrganizationZones"
              optionLabel="OrganizationZoneName"
              optionValue="OrganizationZoneID"
              :disabled="isSelectOrganizationZoneDisabled"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
            >
            </Dropdown>
          </div>

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchProvinceID"
              class="block text-600 text-sm font-bold mb-2"
            >
              จังหวัด</label
            >
            <Dropdown
              class="w-full"
              v-model="search.ProvinceID"
              :options="dropdown.Provinces"
              optionLabel="ProvinceName"
              optionValue="ProvinceID"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
            >
            </Dropdown>
          </div>

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchAmphurID"
              class="block text-600 text-sm font-bold mb-2"
            >
              อำเภอ</label
            >
            <Dropdown
              class="w-full"
              v-model="search.AmphurID"
              :options="dropdown.Amphurs"
              optionLabel="AmphurName"
              optionValue="AmphurID"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
            >
            </Dropdown>
          </div>

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchTumbolID"
              class="block text-600 text-sm font-bold mb-2"
            >
              ตำบล</label
            >
            <Dropdown
              class="w-full"
              v-model="search.TumbolID"
              :options="dropdown.Tumbols"
              optionLabel="TumbolName"
              optionValue="TumbolID"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
            >
            </Dropdown>
          </div>

          <div class="col-12 sm:col-12 lg:col-6">
            <label
              for="searchOrganizationID"
              class="block text-600 text-sm font-bold mb-2"
            >
              ประเภทหน่วยงาน</label
            >
            <Dropdown
              :showClear="true"
              class="w-full"
              placeholder="ทั้งหมด"
              optionLabel="OrganizationTypeName"
              optionValue="OrganizationTypeID"
              :virtualScrollerOptions="{ itemSize: 38 }"
              :options="dropdown.OrganizationTypes"
              :filter="true"
              v-model="search.OrganizationTypeID"
            />
          </div>

          <div class="col-12 sm:col-12 lg:col-6">
            <label
              for="searchOrganizationID"
              class="block text-600 text-sm font-bold mb-2"
            >
              หน่วยงาน</label
            >
            <Dropdown
              :showClear="true"
              class="w-full"
              placeholder="ทั้งหมด"
              optionLabel="OrganizationFull"
              optionValue="OrganizationID"
              :virtualScrollerOptions="{ itemSize: 38 }"
              :options="dropdown.Organizations"
              :filter="true"
              v-model="search.OrganizationID"
            />
          </div>

          <div class="col-12 sm:col-6 lg:col-6">
            <label
              for="searchSubDistrict"
              class="block text-600 text-sm font-bold mb-2"
            >
              ฟาร์ม</label
            >
            <Dropdown
              class="w-full"
              v-model="search.FarmID"
              :options="dropdown.Farms"
              optionLabel="Fullname"
              optionValue="FarmID"
              :filter="true"
              :showClear="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
              placeholder="เลือกหมายเลขฟาร์ม"
            >
            </Dropdown>
          </div>

          <div class="col-12 sm:col-6 lg:col-6">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              ช่วงวันที่รายงาน</label
            >
            <Datepicker
              v-model="search.day"
              range
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="ตั้งแต่วันที่ - จนถึงวันที่"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>

          <div class="col-12 sm:col-12 lg:col-12">
            <label
              for="searchSubDistrict"
              class="block text-600 text-sm font-bold mb-2"
            >
              โครงการ</label
            >
            <MultiSelect
              v-model="search.ProjectIDArray"
              class="w-full"
              :options="dropdown.Projects"
              optionLabel="ProjectName"
              optionValue="ProjectID"
              placeholder="เลือกโครงการ"
              display="chip"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 xl:col-12">
      <div class="card">
        <div class="col-12 text-right">
          <Dropdown
            v-model="search.day"
            :options="dropdown"
            optionLabel="label"
            optionValue="value"
            placeholder="จำนวนวัน"
            class="mr-3"
          />
          <Button
            label="Export To Excel"
            @click="exportCSV($event)"
            class="p-button-success mr-3"
          />
        </div>
        <h5 class="text-center">รายงานตรวจท้อง {{ data.total }}</h5>
        <!-- <h6 v-if="search.dateStart && search.dateEnd" class="text-center">
          วันที่ {{ search.dateStart.toLocaleDateString("th-TH") }} -
          {{ search.dateEnd.toLocaleDateString("th-TH") }}
        </h6> -->
        <!-- <DataTable
          class="text-sm"
          :value="data"
          :paginator="true"
          :rows="10"
          :exportable="true"
          ref="dt"
          :loading="isLoading"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
        </DataTable> -->

        <DataTable
          :value="data.farm"
          v-model:expandedRows="expandedRows"
          dataKey="FarmID"
          @rowExpand="onRowExpand"
          @rowCollapse="onRowCollapse"
          responsiveLayout="scroll"
          :rows="10"
          :exportable="true"
          :lazy="true"
          :paginator="true"
          :loading="isLoading"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <!-- <template #header>
            <div class="table-header-container">
              <Button
                icon="pi pi-plus"
                label="Expand All"
                @click="expandAll"
                class="mr-2"
              />
              <Button
                icon="pi pi-minus"
                label="Collapse All"
                @click="collapseAll"
              />
            </div>
          </template> -->
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="FarmName" header="ชื่อฟาร์ม"></Column>
          <Column field="AmphurName" header="อำเภอ"></Column>
          <Column field="ProvinceName" header="จังหวัด"></Column>

          <template #expansion="slotProps">
            <div class="orders-subtable">
              <h5>ฟาร์ม : {{ slotProps.data.FarmName }}</h5>

              <DataTable :value="slotProps.data.AI" responsiveLayout="scroll">
                <Column
                  field="AnimalEarID"
                  header="หมายเลขใบหู"
                  sortable
                ></Column>
                <Column field="AnimalName" header="ชื่อสัตว์" sortable></Column>
                <Column field="Par" header="ท้องที่" sortable></Column>
                <Column field="TimeNo" header="ครั้งที่" sortable></Column>
                <Column
                  field="SemenNumber"
                  header="หมายเลขน้ำเชื้อ"
                  sortable
                ></Column>
                <Column
                  field="ThaiAIDate"
                  header="วันที่ผสมเทียม"
                  sortable
                ></Column>
                <Column field="Day" header="จำนวนวัน" sortable></Column>
                <Column field="ProjectName" header="โครงการ" sortable></Column>
                <Column
                  field="ThaipregnancyCheckupDate"
                  header="วันที่ตรวจ"
                  sortable
                ></Column>
                <Column
                  field="pregnancyCheckup"
                  header="ผลการตรวจ"
                  sortable
                ></Column>
                <Column
                  field="ResponsibilityStaffName"
                  header="ผู้ตรวจ"
                  sortable
                ></Column>
              </DataTable>
            </div>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
// import _ from "lodash";
import { ref } from "vue";
export default {
  themeChangeListener: null,
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      permission: "get_permission",
      animal_id: "animal_id",
      user: "user",
    }),
  },
  data() {
    return {
      title: "รายงานตรวจท้อง",
      data: [],
      url: {
        organization_zone: "/organization-zone/selection?includeAll=false&isActive=1",
        province: "/province/selection?includeAll=false&isActive=1",
        amphur: "/amphur/selection?includeAll=false&isActive=1",
        tumbol: "/tumbol/selection?includeAll=false&isActive=1",
      },
      amphur: [],
      Organization: [],
      tumbol: [],
      dropdown: [
        {
          label: 35,
          value: 35,
        },
        {
          label: 60,
          value: 60,
        },
        {
          label: 90,
          value: 90,
        },
      ],
      search: {},
      filtered: {},

      isLoading: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,

      controller: new AbortController(),
    };
  },
  loadLazyTimeout: null,

  mounted() {
    this.load();
  },

  watch: {
    // ค้นหา
    "search.OrganizationID"(val) {
      if (val) {
        this.filtered.OrganizationID = val;
      } else {
        this.filtered.OrganizationID = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.day"(val) {
      if (val) {
        this.filtered.day = val;
      } else {
        this.filtered.day = null;
      }
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
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    filterResidenceAmphur($event) {
      let val = $event.value;
      if (val) {
        this.amphur.data = this.amphur.temp;
        this.amphur.data = this.amphur.data.filter(
          (item) => item.ProvinceID == val
        );
      } else {
        this.amphur.data = this.amphur.temp;
      }
    },
    filterResidenceTumbol($event) {
      let val = $event.value;
      if (val) {
        this.tumbol.data = this.tumbol.temp;
        this.tumbol.data = this.tumbol.data.filter(
          (item) => item.AmphurID == val
        );
      } else {
        this.tumbol.data = this.tumbol.temp;
      }
    },
    load() {
      this.isLoading = true;

      let ai = this.user.Staff.Organization.OrganizationAiZoneID || 1;

      let url = "/report/report9";

      if (this.animal_id == 1) {
        url += "?AnimalTypeID=[1,2]";
        this.localAnimal = "โค";
        this.mom = "แม่" + this.localAnimal;
        this.young = "สาว" + this.localAnimal;
        this.child = "ลูก" + this.localAnimal;
      } else if (this.animal_id == 2) {
        url += "?AnimalTypeID=[3,4]";
        this.localAnimal = "กระบือ";
        this.mom = "แม่" + this.localAnimal;
        this.young = "สาว" + this.localAnimal;
        this.child = "ลูก" + this.localAnimal;
      } else if (this.animal_id == 3) {
        url += "?AnimalTypeID=[17,18]";
        this.localAnimal = "แพะ";
        this.mom = "แม่" + this.localAnimal;
        this.young = "สาว" + this.localAnimal;
        this.child = "ลูก" + this.localAnimal;
      }
      if (this.filtered.ProvinceID) {
        url += "&ProvinceID=" + this.filtered.ProvinceID;
      }

      let day;
      if (this.filtered.day) {
        day = this.filtered.day;
      } else {
        day = 35;
      }
      if (this.filtered.AmphurID) {
        url += "&AmphurID=" + this.filtered.AmphurID;
      }
      if (this.filtered.TumbolID) {
        url += "&TumbolID=" + this.filtered.TumbolID;
      }
      if (this.filtered.SemenNumber) {
        url += "&SemenNumber=" + this.filtered.SemenNumber;
      }
      if (this.filtered.OrganizationID) {
        url += "&OrganizationID=" + this.filtered.OrganizationID;
      }
      if (this.filtered.dateStart) {
        url += "&StartDate=" + this.filtered.dateStart;
      }
      if (this.filtered.dateEnd) {
        url += "&EndDate=" + this.filtered.dateEnd;
      }

      axios
        .get(url + "&AIZoneID=" + ai + "&day=" + day, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.total = res.data.Total;
          this.data.farm = res.data.Farm;
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(this.url.organization_zone, { signal: this.controller.signal })
        .then((res) => {
          this.dropdown.organization_zone = res.data.rows;
          this.dropdown.organization_zone_total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.amphur, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.amphur.data = res.data.rows;
          this.amphur.temp = this.amphur.data;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });
      axios
        .get(this.url.tumbol, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.tumbol.data = res.data.rows;
          this.tumbol.temp = this.tumbol.data;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });

      // /organization
      axios
        .get("/organization", {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.Organization.data = res.data.rows.map((item) => {
            return {
              OrganizationID: item.OrganizationID,
              OrganizationFull:
                item.OrganizationCode + ", " + item.OrganizationName,
            };
          });
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });

      axios
        .get(this.url.province, { signal: this.controller.signal })
        .then((res) => {
          this.dropdown.province = res.data.rows;
          this.dropdown.province_total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });
    },

    onLazyLoad() {
      this.loading = true;

      if (this.loadLazyTimeout) {
        clearTimeout(this.loadLazyTimeout);
      }

      this.loadLazyTimeout = setTimeout(() => {
        this.loading = false;
      }, Math.random() * 1000 + 250);
    },
  },

  unmounted() {
    this.controller.abort();
  },
  setup() {
    const expandedRows = ref([]);
    const onRowExpand = () => {};
    const onRowCollapse = () => {};
    const expandAll = () => {};
    const collapseAll = () => {};

    return {
      expandedRows,
      onRowExpand,
      onRowCollapse,
      expandAll,
      collapseAll,
    };
  },
};
</script>
