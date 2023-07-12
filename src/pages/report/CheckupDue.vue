<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle :title="title" />
      
      <div v-if="loader" class="card mb-5">
        <h1 class="text-xl mb-4 text-500">เครื่องมือช่วยค้นหา</h1>
        <div class="grid">
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchProvince"
              class="block text-600 text-sm font-bold mb-2"
            >
              จังหวัด</label
            >
            <Dropdown
              class="w-full"
              v-model="search.ProvinceID"
              :options="dropdown.province"
              optionLabel="ProvinceName"
              optionValue="ProvinceID"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
              @change="filterResidenceAmphur($event)"
            >
            </Dropdown>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchDistrict"
              class="block text-600 text-sm font-bold mb-2"
            >
              อำเภอ</label
            >
            <Dropdown
              class="w-full"
              v-model="search.AmphurID"
              :options="amphur.data"
              optionLabel="AmphurName"
              optionValue="AmphurID"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
              @change="filterResidenceTumbol($event)"
            >
            </Dropdown>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchSubDistrict"
              class="block text-600 text-sm font-bold mb-2"
            >
              ตำบล</label
            >
            <Dropdown
              class="w-full"
              v-model="search.TumbolID"
              :options="tumbol.data"
              optionLabel="TumbolName"
              optionValue="TumbolID"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
            >
            </Dropdown>
          </div>

          <!-- <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchSubDistrict"
              class="block text-600 text-sm font-bold mb-2"
            >
              หน่วยผสมเทียม</label
            >
            <Dropdown
              class="w-full"
              v-model="search.tumbol"
              :options="tumbol.data"
              optionLabel="TumbolName"
              optionValue="TumbolID"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
            >
            </Dropdown>
          </div> -->
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
              :options="Farm.data"
              optionLabel="Fullname"
              optionValue="FarmID"
              :filter="true"
              :showClear="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
              placeholder="เลือกหมายเลขฟาร์ม"
            >
            </Dropdown>
          </div>
          <div class="col-12 sm:col-12 lg:col-6">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลขหน่วยงาน</label
            >
            <Dropdown
              :showClear="true"
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              optionLabel="OrganizationFull"
              optionValue="OrganizationID"
              :virtualScrollerOptions="{ itemSize: 38 }"
              :options="Organization.data"
              :filter="true"
              v-model="search.OrganizationID"
            />
          </div>
        </div>
      </div>
      <div v-else class="grid">
        <div class="col-12">
          <Skeleton width="20rem" height="2rem" class="mb-4"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem"></Skeleton>
        </div>
        <div class="col-12 sm:col-6 lg:col-4">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem"></Skeleton>
        </div>
        <div class="col-12">
          <div class="grid">
            <div class="col-12">
              <Skeleton width="5rem" class="mb-2"></Skeleton>
              <Skeleton height="2rem" class="mb-2"></Skeleton>
            </div>
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
            field="no"
            header="ลำดับ"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
          <Column
            field="FarmIdentificationNumber"
            header="เลขประจำตัวโค"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="FarmName"
            header="ชื่อโค"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="mom"
            header="สถานะ"
            :sortable="true"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="young"
            header="หมายเลขฟาร์ม"
            :sortable="true"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="child"
            header="ชื่อเกษตรกร"
            :sortable="true"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="total"
            header="ตำบล"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
          <Column
            field="total"
            header="อำเภอ"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
          <Column
            field="total"
            header="จังหวัด"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>

          <Column
            field="total"
            header="ครั้งที่ผสม"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
          <Column
            field="total"
            header="วันที่ผสม"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
          <Column
            field="total"
            header="น้ำเชื้อ"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
          <Column
            field="total"
            header="เจ้าหน้าที่"
            class="text-center"
            exportFooter="&#8203;"
            :sortable="true"
          ></Column>
           <Column
            field="total"
            header="จำนวนวันหลังผสม"
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
      title: "รายงานครบกำหนดตรวจท้อง",
      data: [],
      url: {
        organization_zone: "/organization-zone",
        province: "/province",
        amphur: "/amphur",
        tumbol: "/tumbol",
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
      Farm: [],
      isLoading: false,
      loader: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,
      Chart1: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
          },
        ],
      },
      Chart2: {
        labels: ["A", "B", "C"],
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

      let url = "/report/report13";

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
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
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

      axios
        .get("/farm", { signal: this.controller.signal })
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
