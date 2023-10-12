<template>
  <div class="grid">
    <!-- start main page -->

    <div class="col-12">
      <div class="card">
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
              placeholder="-- โปรดเลือกศูนย์วิจัย --"
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
              placeholder="-- เลือกเขตพื้นที่ปศุสัตว์ --"
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

    <div class="col-12">
      <div class="card">
        <div class="grid align-items-center mb-6 xl:px-8">
          <div class="col-12 md:col-6 xl:col-8">
            <h1 class="text-2xl sm:text-4xl mb-0 text-indigo-800 font-semibold">
              แจ้งเตือนเหตุการณ์รายวัน
            </h1>
          </div>
          <div class="col-12 md:col-6 xl:col-4">
            <label class="block text-600 text-sm font-bold mb-2"
              >เรียงตาม</label
            >
            <Dropdown
              class="w-full"
              placeholder="เลือก"
              :options="sort"
              optionLabel="text"
              optionValue="value"
              v-model="sortby"
            />
          </div>
        </div>
        <div class="grid align-items-center">
          <div class="col-12">
            <div class="grid">
              <div
                v-for="item in noti"
                :key="item.id"
                class="col-12 xl:col-10 mx-auto"
              >
                <DailyAlertItem
                  v-if="
                    (item.id == 10 && animal_id == 3) ||
                    (item.id == 9 && animal_id == 1) ||
                    (item.id == 4 && animal_id != 3)
                  "
                  :title="item.title"
                  :alert="item.alert"
                  :image="item.image"
                  @click="
                    setAlert_AnimalID(
                      item.AnimalID,
                      item.tab_index,
                      item.title,
                      item.noti
                    )
                  "
                />

                <DailyAlertItem
                  v-else-if="item.id != 9 && item.id != 10 && item.id != 4"
                  :title="item.title"
                  :alert="item.alert"
                  :image="item.image"
                  @click="
                    setAlert_AnimalID(
                      item.AnimalID,
                      item.tab_index,
                      item.title,
                      item.noti
                    )
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end main page -->
  </div>
</template>

<script>
import DailyAlertItem from "@/components/DailyAlertItem";
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/service/Vuex";
export default {
  components: {
    DailyAlertItem,
  },
  data() {
    return {
      sortby: null,
      sort: [
        {
          text: "เรียงจากมากไปน้อย",
          value: "desc",
        },
        {
          text: "เรียงจากน้อยไปมาก",
          value: "asc",
        },
      ],
      noti: [
        {
          id: 1,
          title: "ครบกำหนดคลอด",
          alert: 0,
          AnimalID: null,
          tab_index: 4,
          image: "/images/daily-alert/1.png",
        },
        {
          id: 2,
          title: "ครบกำหนดตรวจท้อง",
          alert: 0,
          tab_index: 2,
          AnimalID: null,
          image: "/images/daily-alert/2.png",
        },
        {
          id: 3,
          title: "ติดตามลูกเกิดหลังคลอด",
          alert: 0,
          AnimalID: null,
          tab_index: 5,
          image: "/images/daily-alert/3.png",
        },
        {
          id: 4,
          title: "ตรวจระบบสืบพันธุ์หลังคลอด",
          alert: 5,
          tab_index: 11,
          AnimalID: null,
          image: "/images/daily-alert/4.png",
        },
        {
          id: 5,
          title: "อายุมากกว่ากำหนดแล้วยังไม่ได้ผสม",
          alert: 0,
          tab_index: 0,
          AnimalID: null,
          image: "/images/daily-alert/6.png",
        },
        {
          id: 6,
          title: "ไม่กลับสัดหลังผสมมากกว่า 90 วัน",
          alert: 0,
          tab_index: 0,
          AnimalID: null,
          image: "/images/daily-alert/5.png",
        },

        {
          id: 7,
          title: "ผสมซ้ำเกิน 3 ครั้งในรอบการตั้งท้องปัจจุบัน",
          alert: 0,
          tab_index: 0,
          AnimalID: null,
          image: "/images/daily-alert/7.png",
        },
        {
          id: 8,
          title: "เลยกำหนดคลอด",
          alert: 0,
          tab_index: 4,
          AnimalID: null,
          image: "/images/daily-alert/8.png",
        },
        {
          id: 9,
          title: "โครงการไทยแบล็ค",
          alert: 0,
          tab_index: 12,
          AnimalID: null,
          image: "/images/daily-alert/12.png",
        },
        {
          id: 10,
          title: "โครงการแดงสุราษฏร์",
          alert: 0,
          tab_index: 11,
          AnimalID: null,
          image: "/images/daily-alert/13.png",
        },
      ],
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
        getByFarmID: "/animal/get-by-farm-id-1",
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
      controller: new AbortController(),
    };
  },
  watch: {
    //sort function
    sortby: function (val) {
      this.noti.sort((a, b) => {
        if (val == "desc") {
          return b.alert - a.alert;
        } else {
          return a.alert - b.alert;
        }
      });
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
          this.fetchAnimal();
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
          this.fetchAnimal();
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
      this.fetchAnimal();

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
      this.fetchAnimal();

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
      this.fetchAnimal();

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
      this.fetchAnimal();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.FarmID"() {
      this.fetchAnimal();
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.ProjectIDArray"() {
      this.fetchAnimal();
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "dropdown.Provinces"() {
      let p = this.dropdown.Provinces.find((x) => {
        return (
          x.ProvinceID ==
          store.state.user.Staff.Organization.OrganizationProvinceID
        );
      });

      this.search.AIZoneID = p.AIZoneID;
      this.search.ProvinceID =
        store.state.user.Staff.Organization.OrganizationProvinceID;

      this.search.OrganizationID =
        store.state.user.Staff.Organization.OrganizationID;
    },
  },
  mounted() {
    this.loadDefault();
    this.load();

    //
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
    }),
  },
  methods: {
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
    },

    async load() {
      this.fetchAnimal();
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
      let params = { includeAll: false, isActive: 1 };
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
    async fetchAnimal() {
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        return;
      }

      let params = { includeAll: false };

      if (this.animal_id == 1) {
        params["AnimalTypeID"] = "[1,2,41,42]";
      } else if (this.animal_id == 2) {
        params["AnimalTypeID"] = "[3,4,43,44]";
      } else if (this.animal_id == 3) {
        params["AnimalTypeID"] = "[17,18,45,46]";
      }

      params["FarmAnimalType"] = this.animal_id;

      // Province IN AIZOne
      if (this.search.AIZoneID != null) {
        params["FarmAIZoneID"] = this.search.AIZoneID;
      }

      if (this.search.OrganizationZoneID != null) {
        params["FarmOrganizationZoneID"] = this.search.OrganizationZoneID;
      }

      if (this.search.ProvinceID != null) {
        params["FarmProvinceID"] = this.search.ProvinceID;
      }

      if (this.search.AmphurID != null) {
        params["FarmAmphurID"] = this.search.AmphurID;
      }

      if (this.search.TumbolID != null) {
        params["FarmTumbolID"] = this.search.TumbolID;
      }

      if (this.search.OrganizationID != null) {
        params["FarmOrganizationID"] = this.search.OrganizationID;
      }

      if (this.search.ProjectIDArray) {
        params["ProjectID"] = JSON.stringify(this.search.ProjectIDArray);
      }

      await axios
        .get(this.url.getByFarmID, {
          params: params,
          signal: this.controller.signal,
        })
        .then((response) => {
          this.noti[0].alert = response.data.noti.noti1;
          this.noti[0].AnimalID = response.data.noti.noti1Animal;
          this.noti[1].alert = response.data.noti.noti2;
          this.noti[1].AnimalID = response.data.noti.noti2Animal;
          this.noti[2].alert = response.data.noti.noti3;
          this.noti[2].AnimalID = response.data.noti.noti3Animal;
          this.noti[3].alert = response.data.noti.noti4;
          this.noti[3].AnimalID = response.data.noti.noti4Animal;
          this.noti[4].alert = response.data.noti.noti5;
          this.noti[4].AnimalID = response.data.noti.noti5Animal;
          this.noti[5].alert = response.data.noti.noti6;
          this.noti[5].AnimalID = response.data.noti.noti6Animal;
          this.noti[6].alert = response.data.noti.noti7;
          this.noti[6].AnimalID = response.data.noti.noti7Animal;
          this.noti[7].alert = response.data.noti.noti8;
          this.noti[7].AnimalID = response.data.noti.noti8Animal;
          for (let i in this.noti) {
            if (this.noti[i].alert == null) {
              this.noti[i].alert = 0;
            }
          }
          this.sortby = "desc";
        });
    },

    setAlert_AnimalID(id, title, name) {
      let data = {
        id: id,
        title: title,
        name: name,
      };
      store.dispatch("Alert_AnimalID", data);
    },
  },
};
</script>
