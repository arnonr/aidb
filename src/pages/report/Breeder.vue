<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="ทะเบียนประวัติพ่อพันธุ์" />

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

      <div class="card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 text-right">
            <Button
              label="Export To Excel"
              @click="exportCSV($event)"
              class="p-button-success mr-3"
            />
          </div>
          <div class="col-12 md:col-12">
            <h5 class="text-center">รวมจำนวนพ่อพันธุ์ {{ data.length }} ตัว</h5>
            <!-- <h6 class="text-center">วันที่ 01/01/2565 - 05/30/2565</h6> -->
          </div>
        </div>
        <div class="mt-5">
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
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="AnimalEarID"
              header="หมายเลขพ่อพันธุ์"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="SemenNumber"
              header="หมายเลขน้ำเชื้อ"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="AnimalName"
              header="ชื่อ"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="AnimalBreedAll"
              header="สายเลือด"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="ThaiAnimalBirthDate"
              header="วันเกิด"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="AnimalWeight"
              header="น้ำหนัก"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="AnimalHeight"
              header="ส่วนสูง"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="AnimalFather"
              header="หมายเลขพ่อ"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="AnimalMother"
              header="หมายเลขแม่"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="AnimalStatusName"
              header="สถานะภาพ"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="AnimalSource"
              header="แหล่งที่มา"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import PageTitle from "@/components/PageTitle.vue";

export default {
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
        province: "/province",
        amphur: "/amphur",
        tumbol: "/tumbol",
        report: "/report/report4",
      },
      Farm: [],
      dropdown: [],
      search: {},
      amphur: [],
      Organization: [],
      tumbol: [],
      filtered: {},
      isLoading: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,
      // สถานะการโหลด
      loader: false,
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
    "search.FarmID"(val) {
      this.filtered.FarmID = val;
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

      let url = this.url.report;
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
      if (this.filtered.FarmID) {
        url += "&FarmID=" + this.filtered.FarmID;
      }
      if (this.filtered.OrganizationID) {
        url += "&OrganizationID=" + this.filtered.OrganizationID;
      }

      axios
        .get(url + "&AIZoneID=" + ai, {
          signal: this.controller.signal,
        })
        .then((response) => {
          let i = 1;
          this.data = response.data.map((item) => {
            return {
              id: i++,
              AnimalEarID: item.AnimalEarID,
              SemenNumber: item.SemenNumber,
              AnimalName: item.AnimalName,
              AnimalBreedAll: item.AnimalBreedAll,
              ThaiAnimalBirthDate: item.ThaiAnimalBirthDate,
              AnimalWeight: item.AnimalWeight,
              AnimalHeight: item.AnimalHeight,
              AnimalFather: item.AnimalFather,
              AnimalMother: item.AnimalMother,
              AnimalStatusName: item.AnimalStatusName,
              AnimalSource: item.AnimalSource,
            };
          });
        })
        .finally(() => {
          // console.log(this.data);
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
        .get(this.url.province, { signal: this.controller.signal })
        .then((res) => {
          this.dropdown.province = res.data.rows;
          this.dropdown.province_total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });

      // /ai-zone

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
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
