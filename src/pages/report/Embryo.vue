<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="รายงานการใช้ตัวอ่อน" />
      <div class="card">
        <h1 class="text-xl mb-5">เครื่องมือกรองรายงาน</h1>
        <div class="grid">
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลขตัวอ่อน</label
            >
            <InputText
              type="text"
              v-model="search.EmbryoNumber"
              class="w-full"
              placeholder="ชื่อหน่วยงาน"
            />
          </div>

          <!--  -->

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="animal_id"
              class="block text-600 text-sm font-bold mb-2"
            >
              พื้นที่เขตปศุสัตว์</label
            >
            <Dropdown
              class="w-full"
              v-model="search.OrganizationZoneID"
              :options="dropdown.organization_zone"
              optionLabel="OrganizationZoneName"
              optionValue="OrganizationZoneID"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
            />
          </div>
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

          <div class="col-12 sm:col-6 lg:col-4">
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
          <div class="col-12 sm:col-6 lg:col-6">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              ตั้งแต่วันที่</label
            >
            <Calendar
              class="w-full"
              v-model="search.dateStart"
              selectionMode="single"
              :manualInput="false"
              placeholder="ตั้งแต่วันที่"
              
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-6">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              ถึงวันที่</label
            >
            <Calendar
              class="w-full"
              v-model="search.dateEnd"
              selectionMode="single"
              dateFormat="dd/mm/yy"
              :manualInput="false"
              placeholder="ถึงวันที่"
              
            />
          </div>
        </div>
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
        <h5 class="text-center">รายงานการใช้ตัวอ่อน</h5>
        <h6 v-if="search.dateStart && search.dateEnd" class="text-center">
          วันที่ {{ search.dateStart.toLocaleDateString("th-TH") }} -
          {{ search.dateEnd.toLocaleDateString("th-TH") }}
        </h6>
        <DataTable
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
          <Column
            field="id"
            header="ลำดับ"
            class="text-center"
            style="width: 10%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
          <Column
            field="EmbryoNumber"
            header="หมายเลขตัวอ่อน"
            class="text-center"
            style="width: 20%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
          <Column
            field="AnimalEarID"
            header="หมายเลขใบหู"
            class="text-center"
            style="width: 20%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
          <Column
            field="AnimalBreedAll"
            header="พันธุ์"
            class="text-center"
            style="width: 20%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
          <Column
            field="ThaiAnimalBirthDate"
            header="วันเกิด"
            class="text-center"
            style="width: 10%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
          <Column
            field="AnimalStatusName"
            header="สถานะ"
            class="text-center"
            style="width: 20%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
          <Column
            field="AnimalFather"
            header="พ่อ"
            class="text-center"
            style="width: 20%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
          <Column
            field="AnimalMother"
            header="แม่"
            class="text-center"
            style="width: 20%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
          <Column
            field="Par"
            header="รอบนม"
            class="text-center"
            style="width: 20%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
          <Column
            field="TimeNo"
            header="ครั้งที่"
            class="text-center"
            style="width: 20%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
          <Column
            field="ThaiAIDate"
            header="วันที่ผสม"
            class="text-center"
            style="width: 20%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
          <Column
            field="Dose"
            header="โด๊ส"
            class="text-center"
            style="width: 20%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
          <Column
            field="AIStatus"
            header="ผลการตรวจ"
            class="text-center"
            style="width: 20%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
          <Column
            field="FarmName"
            header="ฟาร์ม"
            class="text-center"
            style="width: 20%"
            exportFooter="&#8203;"
                :sortable="true"
          >
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import _ from "lodash";

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
          EmbryoType: [
            {
              label: "สด",
              value: "FRESH",
            },
            {
              label: "แช่แข็ง",
              value: "FREEZE",
            },
          ],
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
    "search.EmbryoNumber": _.debounce(function () {
      this.filtered.EmbryoNumber = this.search.EmbryoNumber;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    }, 500),
    "search.ProvinceID"(val) {
      this.filtered.ProvinceID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.AmphurID"(val) {
      this.filtered.AmphurID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.TumbolID"(val) {
      this.filtered.TumbolID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.OrganizationZoneID"(val) {
      this.filtered.OrganizationZoneID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.dateStart"(val) {
      this.filtered.dateStart = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.dateEnd"(val) {
      this.filtered.dateEnd = val;
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

      let url = "/report/report6";

      if (this.animal_id == 1) {
        url += "?AnimalTypeID=[1,2]";
      } else if (this.animal_id == 2) {
        url += "?AnimalTypeID=[3,4]";
      } else if (this.animal_id == 3) {
        url += "?AnimalTypeID=[17,18]";
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
      if (this.filtered.EmbryoNumber) {
        url += "&EmbryoNumber=" + this.filtered.EmbryoNumber;
      }
      if (this.filtered.OrganizationID) {
        url += "&OrganizationID=" + this.filtered.OrganizationID;
      }
      if (this.filtered.OrganizationZoneID) {
        url += "&OrganizationZoneID=" + this.filtered.OrganizationZoneID;
      }
      if (this.filtered.dateStart) {
        url += "&StartDate=" + this.filtered.dateStart;
      }
      if (this.filtered.dateEnd) {
        url += "&EndDate=" + this.filtered.dateEnd;
      }

      axios
        .get(url + "&AIZoneID=" + ai, { signal: this.controller.signal })
        .then((res) => {
          let i = 1;
          this.data = res.data.map((item) => {
            return {
              id: i++,
              AnimalID: item.AnimalID,
              EmbryoNumber: item.EmbryoNumber,
              AnimalEarID: item.AnimalEarID,
              AnimalBreedAll: item.AnimalBreedAll,
              ThaiAnimalBirthDate: item.ThaiAnimalBirthDate,
              AnimalStatusName: item.AnimalStatusName,
              AnimalFather: item.AnimalFather,
              AnimalMother: item.AnimalMother,
              Par: item.Par,
              TimeNo: item.TimeNo,
              ThaiAIDate: item.ThaiAIDate,
              Dose: item.Dose,
              AIStatus: item.AIStatus,
              FarmName: item.FarmName,
            };
          });
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
};
</script>
