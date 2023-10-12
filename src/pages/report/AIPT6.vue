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
      <div v-else class="grid">
        <div class="col-12">
          <Skeleton width="320px" height="32px" class="mb-4"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="80px" class="mb-2"></Skeleton>
          <Skeleton height="32px"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="80px" class="mb-2"></Skeleton>
          <Skeleton height="32px"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="80px" class="mb-2"></Skeleton>
          <Skeleton height="32px"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="80px" class="mb-2"></Skeleton>
          <Skeleton height="32px"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="80px" class="mb-2"></Skeleton>
          <Skeleton height="32px"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="80px" class="mb-2"></Skeleton>
          <Skeleton height="32px"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="80px" class="mb-2"></Skeleton>
          <Skeleton height="32px"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="80px" class="mb-2"></Skeleton>
          <Skeleton height="32px"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="80px" class="mb-2"></Skeleton>
          <Skeleton height="32px"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="80px" class="mb-2"></Skeleton>
          <Skeleton height="32px"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="80px" class="mb-2"></Skeleton>
          <Skeleton height="32px"></Skeleton>
        </div>
        <div class="col-12">
          <div class="grid">
            <div class="col-12">
              <Skeleton width="80px" class="mb-2"></Skeleton>
              <Skeleton height="32px" class="mb-2"></Skeleton>
            </div>
          </div>
        </div>
      </div>
      <div class="grid" style="width">
        <div class="col-12 xl:col-6">
          <div class="card">
            <h5>จำนวนครั้ง</h5>
            <Chart
              type="pie"
              :data="Chart1"
              :options="pieOptions"
              class="w-full"
            />
          </div>
        </div>
        <div class="col-12 xl:col-6">
          <div class="card">
            <h5>จำนวนตัว</h5>
            <Chart
              type="pie"
              :data="Chart2"
              :options="pieOptions"
              class="w-full"
            />
          </div>
        </div>
        <div class="col-12 xl:col-6">
          <div class="card">
            <h5>กลุ่มพันธุ์ที่ได้รับการผสม Top3 (Leader Board)</h5>
            <DataTable :value="data.sub2" :rows="10" responsiveLayout="scroll">
              <Column
                field="key"
                header="#"
                class="text-center"
                style="width: 35%"
              >
              </Column>
              <Column
                field="value"
                header="ชื่อพันธุ์"
                class="text-center"
                style="width: 35%"
              >
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loader" class="col-12 grid">
      <div class="col-12 lg:col-6 xl:col-6">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">ทั้งหมด</span>
              <div class="text-900 font-medium text-xl">
                {{ data.Total + " ตัว" }}
              </div>
            </div>
            <!-- <div
            class="
              flex
              align-items-center
              justify-content-center
              bg-blue-100
              border-round
            "
            style="width: 40px; height: 40px"
          ></div> -->
          </div>
        </div>
      </div>
      <div class="col-12 lg:col-6 xl:col-6">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">ไม่พบข้อมูล</span>
              <div class="text-900 font-medium text-xl">
                {{ data.preg4 + " ตัว" }}
              </div>
            </div>
            <!-- <div
            class="
              flex
              align-items-center
              justify-content-center
              bg-blue-100
              border-round
            "
            style="width: 40px; height: 40px"
          ></div> -->
          </div>
        </div>
      </div>
      <div class="col-12 lg:col-6 xl:col-4">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">ท้อง</span>
              <div class="text-900 font-medium text-xl">
                {{ data.preg1 + " ตัว" }}
              </div>
            </div>
            <!-- <div
            class="
              flex
              align-items-center
              justify-content-center
              bg-orange-100
              border-round
            "
            style="width: 40px; height: 40px"
          ></div> -->
          </div>
        </div>
      </div>
      <div class="col-12 lg:col-6 xl:col-4">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">ไม่ท้อง</span>
              <div class="text-900 font-medium text-xl">
                {{ data.preg2 + " ตัว" }}
              </div>
            </div>
            <!-- <div
            class="
              flex
              align-items-center
              justify-content-center
              bg-cyan-100
              border-round
            "
            style="width: 40px; height: 40px"
          ></div> -->
          </div>
        </div>
      </div>
      <div class="col-12 lg:col-6 xl:col-4">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">รอตรวจซ้ำ</span>
              <div class="text-900 font-medium text-xl">
                {{ data.preg3 + " ตัว" }}
              </div>
            </div>
            <!-- <div
            class="
              flex
              align-items-center
              justify-content-center
              bg-purple-100
              border-round
            "
            style="width: 40px; height: 40px"
          ></div> -->
          </div>
        </div>
      </div>
    </div>
    <div v-else class="col-12 grid">
      <div class="col-12">
        <Skeleton width="320px" height="32px" class="mb-4"></Skeleton>
      </div>
      <div class="col-12 lg:col-6 xl:col-6">
        <Skeleton width="80px" class="mb-2"></Skeleton>
        <Skeleton height="32px"></Skeleton>
      </div>
      <div class="col-12 lg:col-6 xl:col-6">
        <Skeleton width="80px" class="mb-2"></Skeleton>
        <Skeleton height="32px"></Skeleton>
      </div>
      <div class="col-12 lg:col-6 xl:col-4">
        <Skeleton width="80px" class="mb-2"></Skeleton>
        <Skeleton height="32px"></Skeleton>
      </div>
      <div class="col-12 lg:col-6 xl:col-4">
        <Skeleton width="80px" class="mb-2"></Skeleton>
        <Skeleton height="32px"></Skeleton>
      </div>
      <div class="col-12 lg:col-6 xl:col-4">
        <Skeleton width="80px" class="mb-2"></Skeleton>
        <Skeleton height="32px"></Skeleton>
      </div>
    </div>

    <div class="col-12 xl:col-12">
      <div class="card">
        <div class="col-12 text-right">
          <Button
            label="Export To Excel"
            @click="exportCSV($event)"
            class="p-button-success mr-3"
          />
        </div>
        <h5 class="text-center">{{ title }}</h5>

        <DataTable
          class="text-sm"
          :value="data.main"
          :paginator="true"
          :exportable="true"
          ref="dt"
          :rows="10"
          :loading="isLoading"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column
            field="AnimalEarID"
            header="หมายเลขเบอร์หู"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="AnimalName"
            header="ชื่อโค"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="pregnancyCheckup"
            header="สถานะ"
            :sortable="true"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="FarmName"
            header="ชื่อฟาร์ม"
            :sortable="true"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="AmphurName"
            header="อำเภอ"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
          <Column
            field="ProvinceName"
            header="จังหวัด"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
          <Column
            field="Par"
            header="ท้องที่"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
          <Column
            field="TimeNo"
            header="ครั้งที่ผสม"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
          <Column
            field="ThaiAIDate"
            header="วันที่ผสม"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
          <Column
            field="SemenNumber"
            header="น้ำเชื้อ"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
          <Column
            field="ResponsibilityStaffName"
            header="เจ้าหน้าที่"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
          <template #empty> ไม่พบข้อมูล </template>
          <template #loading>
            <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
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
      title: "รายงานการผสมเทียม ผท.6",
      data: [],
      provinceAITime: [],
      provinceAICount: [],
      url: {
        AIZone: "/ai-zone",
        OrganizationZone: "/organization-zone",
        Province: "/province",
        Amphur: "/amphur",
        Tumbol: "/tumbol",
        OrganizationType: "/organization-type",
        Organization: "/organization",
        Farm: "/farm",
        Report: "/report/report13",
        Project: "/project",
      },
      dropdown: {
        AIZones: [],
        OrganizationZones: [],
        Provinces: [],
        Amphurs: [],
        Tumbols: [],
        OrganizationTypes: [],
        Organizations: [],
        Farms: [],
        Projects: [],
      },
      search: {
        AIZoneID: null,
        OrganizationZoneID: null,
        ProvinceID: null,
        AmphurID: null,
        TumbolID: null,
        OrganizationTypeID: null,
        OrganizationID: null,
        FarmID: null,
      },
      isSelectAIZoneDisabled: false,
      isSelectOrganizationZoneDisabled: false,
      isLoading: false,
      loader: false,
      total: null,
      selection: false,
      loading: false,
      curpage: 0,
      Chart1: {
        labels: [],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
          },
        ],
      },
      Chart2: {
        labels: [],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
          },
        ],
      },
      controller: new AbortController(),
    };
  },
  loadLazyTimeout: null,
  mounted() {
    this.loadDefault();
    // this.load();
  },

  watch: {
    // ค้นหา
    "search.day"() {
      this.fetchReport();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.loadDefault();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.AIZoneID"(val) {
      if (val) {
        this.search.OrganizationZoneID = null;
        this.isSelectAIZoneDisabled = false;
        this.isSelectOrganizationZoneDisabled = true;
      } else {
        this.isSelectAIZoneDisabled = false;
        this.isSelectOrganizationZoneDisabled = false;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.fetchProvince();
          this.fetchOrganization();
          this.fetchFarm();
          this.fetchReport();
          this.dropdown.Amphurs = [];
          this.dropdown.Tumbols = [];
          this.search.AmphurID = null;
          this.search.TumbolID = null;
          //   this.search.OrganizationTypeID = null;
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.OrganizationZoneID"(val) {
      if (val) {
        this.search.AIZoneID = null;
        this.isSelectAIZoneDisabled = true;
        this.isSelectOrganizationZoneDisabled = false;
      } else {
        this.isSelectAIZoneDisabled = false;
        this.isSelectOrganizationZoneDisabled = false;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.fetchProvince();
          this.fetchOrganization();
          this.fetchFarm();
          this.fetchReport();
          this.search.AmphurID = null;
          this.search.TumbolID = null;
          //   this.search.OrganizationTypeID = null;
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.ProvinceID"() {
      this.fetchAmphur();
      this.fetchOrganization();
      this.fetchFarm();
      this.fetchReport();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.search.AmphurID = null;
          this.search.TumbolID = null;
          //   this.search.OrganizationTypeID = null;
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.AmphurID"() {
      this.fetchTumbol();
      this.fetchOrganization();
      this.fetchFarm();
      this.fetchReport();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.search.TumbolID = null;
          //   this.search.OrganizationTypeID = null;
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.TumbolID"() {
      this.fetchOrganization();
      this.fetchFarm();
      this.fetchReport();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.OrganizationTypeID"() {
      this.fetchOrganization();
      this.fetchReport();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.OrganizationID"() {
      //   this.fetchReport();
      this.fetchFarm();
      this.fetchReport();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.FarmID"() {
      this.fetchReport();
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.ProjectIDArray"() {
      this.fetchReport();
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
  },

  methods: {
    exportCSV() {
      this.$refs.dt.exportCSV();
    },

    loadDefault() {
      this.isLoading = true;
      this.fetchAIZone();
      this.fetchOrganizationZone();
      this.fetchProject();
      this.fetchProvince();
      this.fetchAmphur();
      this.fetchTumbol();
      this.fetchOrganizationType();
      this.fetchOrganization();
      this.fetchFarm();
      this.fetchReport();
    },

    load() {
      this.isLoading = true;

      let ai = this.user.Staff.Organization.OrganizationAiZoneID || 1;

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
        .get(this.url.ai_zone, { signal: this.controller.signal })
        .then((res) => {
          this.dropdown.ai_zone = res.data.rows;
          this.dropdown.ai_zone_total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(this.url.province, { signal: this.controller.signal })
        .then((res) => {
          this.dropdown.provinceTemp = res.data.rows;

          if (this.search.AIZoneID != null) {
            this.dropdown.province = res.data.rows.filter((x) => {
              return x.AIZoneID == this.search.AIZoneID;
            });
          }

          if (this.search.OrganizationZoneID != null) {
            console.log(this.dropdown.province);
            this.dropdown.province = res.data.rows.filter((x) => {
              return x.OrganizationZoneID == this.search.OrganizationZoneID;
            });
          }

          this.dropdown.province_total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });

      let url = "/report/report13";

      if (this.animal_id == 1) {
        url += "?AnimalTypeID=[1,2,41,42]";
        this.localAnimal = "โค";
      } else if (this.animal_id == 2) {
        url += "?AnimalTypeID=[3,4,43,44]";
        this.localAnimal = "กระบือ";
      } else if (this.animal_id == 3) {
        url += "?AnimalTypeID=[17,18,45,46]";
        this.localAnimal = "แพะ";
      }

      this.mom = "แม่" + this.localAnimal;
      this.young = this.localAnimal + "สาว";
      this.child = "ลูก" + this.localAnimal;

      if (this.search.ProvinceID) {
        url += "&ProvinceID=" + this.search.ProvinceID;
      }

      if (this.search.AmphurID) {
        url += "&AmphurID=" + this.search.AmphurID;
      }
      if (this.search.TumbolID) {
        url += "&TumbolID=" + this.search.TumbolID;
      }
      if (this.search.SemenNumber) {
        url += "&SemenNumber=" + this.search.SemenNumber;
      }
      if (this.search.OrganizationID) {
        url += "&OrganizationID=" + this.search.OrganizationID;
      }
      if (this.search.dateStart) {
        url += "&StartDate=" + this.search.dateStart;
      }
      if (this.search.dateEnd) {
        url += "&EndDate=" + this.search.dateEnd;
      }

      axios
        .get(url + "&AIZoneID=" + ai, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.Total = res.data.Total;
          this.data.preg1 = res.data.preg1;
          this.data.preg2 = res.data.preg2;
          this.data.preg3 = res.data.preg3;
          this.data.preg4 = res.data.preg4;
          this.data.farm = res.data.Farm;
          this.data.main = res.data.ai;

          //   this.data.animal = res.data.ai.filter((value, index, array) => {
          //     return array.indexOf(value) === index;
          //   });

          //   this.data.countAnimal = this.data.animal.length;

          //   this.data.pregnancy1 = this.data.animal.filter(
          //     (value, index, array) => {
          //       return array.indexOf(value) === index;
          //     }
          //   );

          //   this.data.countPregnancy1 = this.data.animal.filter(
          //     (value, index, array) => {
          //       return array.indexOf(value) === index ;
          //     }
          //   );

          // this.data.countPregnancy2 = ;
          // this.data.countPregnancy3 = ;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
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
        .get("/farm", { signal: this.controller.signal, FarmAnimalType: 2 })
        .then((res) => {
          // this.Farm.data = res.data.rows;
          this.Farm.total = res.data.total;
          this.Farm.data = res.data.rows
            .sort((a, b) =>
              a.Province.ProvinceName.localeCompare(b.Province.ProvinceName)
            )
            .map((item) => {
              let name = item.Farmer ? item.Farmer.FullName : "- ";
              let number = item.FarmIdentificationNumber
                ? item.FarmIdentificationNumber
                : "- ";
              let province = item.Province ? item.Province.ProvinceName : "- ";
              let Organization = item.OrganizationZone
                ? item.OrganizationZone.OrganizationZoneName
                : "- ";

              return {
                FarmID: item.FarmID,
                FarmName: item.FarmName,
                FarmIdentificationNumber: item.FarmIdentificationNumber,
                Fullname:
                  "ฟาร์ม " +
                  item.FarmName +
                  " (" +
                  number +
                  ")" +
                  " | เจ้าของฟาร์ม " +
                  name +
                  " | จังหวัด " +
                  province +
                  " | " +
                  Organization,
                OrganizationZoneName: Organization,
              };
            });
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });
    },

    fetchAIZone() {
      let params = { includeAll: false };
      //  Fetch AIZone
      axios
        .get(this.url.AIZone, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.AIZones = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchOrganizationZone() {
      let params = { includeAll: false,isActive: 1 };
      //  Fetch OrganizationZone
      axios
        .get(this.url.OrganizationZone, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.OrganizationZones = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchProject() {
      let params = { includeAll: false };

      if (this.animal_id == 1) {
        params["AnimalTypeID"] = "[1,2,41,42]";
      } else if (this.animal_id == 2) {
        params["AnimalTypeID"] = "[3,4,43,44]";
      } else if (this.animal_id == 3) {
        params["AnimalTypeID"] = "[17,18,45,46]";
      }

      axios
        .get(this.url.Project, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.Projects = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });
    },
    fetchProvince() {
      //  Fetch Province
      let params = { includeAll: false };

      if (this.search.AIZoneID != null) {
        params["AIZoneID"] = this.search.AIZoneID;
        // this.dropdown.Provinces = res.data.rows.filter((x) => {
        //   return x.AIZoneID == this.search.AIZoneID;
        // });
      }

      if (this.search.OrganizationZoneID != null) {
        params["OrganizationZoneID"] = this.search.OrganizationZoneID;
        // this.dropdown.Provinces = res.data.rows.filter((x) => {
        //   return x.OrganizationZoneID == this.search.OrganizationZoneID;
        // });
      }
      axios
        .get(this.url.Province, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.Provinces = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });
    },
    fetchAmphur() {
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null &&
        this.search.ProvinceID == null
      ) {
        return;
      }

      let params = { includeAll: false };

      if (this.search.ProvinceID != null) {
        params["ProvinceID"] = this.search.ProvinceID;
      }

      axios
        .get(this.url.Amphur, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.Amphurs = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });
    },
    fetchTumbol() {
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null &&
        this.search.ProvinceID == null
      ) {
        return;
      }

      let params = { includeAll: false };

      if (this.search.AmphurID != null) {
        params["AmphurID"] = this.search.AmphurID;
      }

      axios
        .get(this.url.Tumbol, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.Tumbols = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });
    },
    fetchOrganizationType() {
      let params = { includeAll: false };

      axios
        .get(this.url.OrganizationType, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.OrganizationTypes = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });
    },
    fetchOrganization() {
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        return;
      }

      let params = { includeAll: false };

      if (this.search.OrganizationTypeID != null) {
        params["OrganizationTypeID"] = this.search.OrganizationTypeID;
      }

      // Province IN AIZOne
      if (this.search.AIZoneID != null) {
        params["OrganizationAiZoneID"] = this.search.AIZoneID;
      }

      if (this.search.OrganizationZoneID != null) {
        params["OrganizationZoneID"] = this.search.OrganizationZoneID;
      }

      if (this.search.ProvinceID != null) {
        params["ProvinceID"] = this.search.ProvinceID;
      }

      if (this.search.AmphurID != null) {
        params["AmphurID"] = this.search.AmphurID;
      }

      if (this.search.TumbolID != null) {
        params["TumbolID"] = this.search.TumbolID;
      }

      axios
        .get(this.url.Organization, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.Organizations = res.data.rows.map((item) => {
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
    },

    fetchFarm() {
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        return;
      }

      let params = {
        // includeAll: false,
      };

      params["FarmAnimalType"] = this.animal_id;

      // Province IN AIZOne
      if (this.search.AIZoneID != null) {
        params["AIZoneID"] = this.search.AIZoneID;
      }

      if (this.search.OrganizationZoneID != null) {
        params["OrganizationZoneID"] = this.search.OrganizationZoneID;
      }

      if (this.search.ProvinceID != null) {
        params["ProvinceID"] = this.search.ProvinceID;
      }

      if (this.search.AmphurID != null) {
        params["AmphurID"] = this.search.AmphurID;
      }

      if (this.search.TumbolID != null) {
        params["TumbolID"] = this.search.TumbolID;
      }

      if (this.search.OrganizationID != null) {
        params["OrganizationID"] = this.search.OrganizationID;
      }

      axios
        .get(this.url.Farm, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.Farms = res.data.rows
            .sort((a, b) =>
              a.Province.ProvinceName.localeCompare(b.Province.ProvinceName)
            )
            .map((item) => {
              let name = item.Farmer ? item.Farmer.FullName : "- ";
              let number = item.FarmIdentificationNumber
                ? item.FarmIdentificationNumber
                : "- ";
              let province = item.Province ? item.Province.ProvinceName : "- ";
              let Organization = item.OrganizationZone
                ? item.OrganizationZone.OrganizationZoneName
                : "- ";

              return {
                FarmID: item.FarmID,
                FarmName: item.FarmName,
                FarmIdentificationNumber: item.FarmIdentificationNumber,
                Fullname:
                  "ฟาร์ม " +
                  item.FarmName +
                  " (" +
                  number +
                  ")" +
                  " | เจ้าของฟาร์ม " +
                  name +
                  " | จังหวัด " +
                  province +
                  " | " +
                  Organization,
                OrganizationZoneName: Organization,
              };
            });
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });
    },

    fetchReport() {
      //  Fetch Report
      let params = {};

      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        params["AIZoneID"] =
          this.user.Staff.Organization.OrganizationAiZoneID || 1;
      }

      if (this.search.AIZoneID != null) {
        params["AIZoneID"] = this.search.AIZoneID;
      }

      if (this.search.OrganizationZoneID != null) {
        params["OrganizationZoneID"] = this.search.OrganizationZoneID;
      }

      if (this.animal_id == 1) {
        this.localAnimal = "โค";
        params["AnimalTypeID"] = "[1,2,41,42]";
      } else if (this.animal_id == 2) {
        params["AnimalTypeID"] = "[3,4,43,44]";
        this.localAnimal = "กระบือ";
      } else if (this.animal_id == 3) {
        params["AnimalTypeID"] = "[17,18,45,46]";
        this.localAnimal = "แพะ";
      }

      this.mom = "แม่" + this.localAnimal;
      this.young = this.localAnimal + "สาว";
      this.child = "ลูก" + this.localAnimal;

      if (this.search.ProvinceID) {
        params["ProvinceID"] = this.search.ProvinceID;
      }

      if (this.search.AmphurID) {
        params["AmphurID"] = this.search.AmphurID;
      }
      if (this.search.TumbolID) {
        params["TumbolID"] = this.search.TumbolID;
      }

      if (this.search.SemenNumber) {
        params["SemenNumber"] = this.search.SemenNumber;
      }

      if (this.search.OrganizationID) {
        params["OrganizationID"] = this.search.OrganizationID;
      }

      if (this.search.day) {
        params["AIStartDate"] = this.search.day[0];
        params["AIEndDate"] = this.search.day[1];
      }

      //   if (this.search.dateStart) {
      //     params["StartDate"] = this.search.dateStart;
      //   }
      //   if (this.search.dateEnd) {
      //     params["EndDate"] = this.search.dateEnd;
      //   }

      if (this.search.ProjectIDArray) {
        //
        params["Projects"] = JSON.stringify(this.search.ProjectIDArray);
      }

      axios
        .get(this.url.Report, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.data.Total = res.data.Total;
          this.data.preg1 = res.data.preg1;
          this.data.preg2 = res.data.preg2;
          this.data.preg3 = res.data.preg3;
          this.data.preg4 = res.data.preg4;
          this.data.farm = res.data.Farm;
          this.data.main = res.data.ai;

          this.provinceAITime = [];
          this.provinceAICount = [];

          res.data.ai.forEach((x) => {
            let isProvince1 = this.provinceAITime.findIndex((e) => {
              return e.ProvinceName == x.ProvinceName;
            });
            if (isProvince1 == "-1") {
              let randomColor = Math.floor(Math.random() * 16777215).toString(
                16
              );
              let randomColor1 = "#" + randomColor;

              this.provinceAITime.push({
                ProvinceName: x.ProvinceName,
                count: 1,
                color: randomColor1,
              });
            } else {
              this.provinceAITime[isProvince1].count =
                this.provinceAITime[isProvince1].count + 1;
            }

            this.provinceAICount = [...this.provinceAITime];

            let isProvince2 = this.provinceAICount.findIndex((e) => {
              return e.ProvinceName == x.ProvinceName;
            });

            if (isProvince2 == "-1") {
              let randomColor = Math.floor(Math.random() * 16777215).toString(
                16
              );
              let randomColor1 = "#" + randomColor;

              this.provinceAICount.push({
                ProvinceName: x.ProvinceName,
                count: 1,
                color: randomColor1,
              });
            } else {
              this.provinceAICount[isProvince2].count =
                this.provinceAICount[isProvince2].count + 1;
            }
          });

          let labels1 = [];
          let datas1 = [];
          let colors1 = [];

          this.provinceAITime.forEach((x) => {
            labels1.push(x.ProvinceName);
            datas1.push(x.count);
            colors1.push(x.color);
          });

          this.Chart1 = {
            labels: labels1,
            datasets: [
              {
                data: datas1,
                backgroundColor: colors1,
              },
            ],
          };

          //
          let labels2 = [];
          let datas2 = [];
          let colors2 = [];

          this.provinceAICount.forEach((x) => {
            labels2.push(x.ProvinceName);
            datas2.push(x.count);
            colors2.push(x.color);
          });

          this.Chart2 = {
            labels: labels2,
            datasets: [
              {
                data: datas2,
                backgroundColor: colors2,
              },
            ],
          };
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
