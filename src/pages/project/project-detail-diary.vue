<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="ติดตามโครงการ" :pages="breadcrumb" />

      <div class="card">
        <div class="grid">
          <div class="col-12 sm:col-6 lg:col-12">
            <label
              for="selectedScheme"
              class="block text-600 text-sm font-bold mb-2"
            >
              โครงการ</label
            >
            <MultiSelect
              display="chip"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="ทั้งหมด"
              :options="dropdown.Projects"
              optionLabel="ProjectName"
              optionValue="ProjectID"
              :filter="true"
              v-model="search.ProjectIDArray"
              :virtualScrollerOptions="{ itemSize: 38 }"
            />
            <!-- v-model="filtered.ProjectID" -->
          </div>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12">
        <router-link :to="'/project/detail?projects=' + search.Project">
          <Button severity="secondary" label="ทะเบียนฟาร์ม" />
        </router-link>
        <router-link :to="'/project/detail-animal?projects=' + search.Project">
          <Button severity="secondary" label="ทะเบียนสัตว์" class="ml-2" />
        </router-link>
        <router-link :to="'/project/detail-diary?projects=' + search.Project">
          <Button severity="primary" label="กิจกรรมแจ้งเตือน" class="ml-2" />
        </router-link>
      </div>

      <div class="card mb-5">
        <div v-if="!loader" class="grid">
          <div class="col-12">
            <h1 class="text-xl mb-4 text-500">เครื่องมือช่วยค้นหา</h1>
          </div>
          <!--  -->
          <div class="grid">
            <div class="col-12 sm:col-6 lg:col-6">
              <label
                for="AIZoneID"
                class="block text-600 text-sm font-bold mb-2"
              >
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
            <!-- 
            <div class="col-12 sm:col-6 lg:col-6">
              <label
                for="FarmerFullName"
                class="block text-600 text-sm font-bold mb-2"
              >
                ชื่อนามสกุลเกษตรกร
              </label>
              <span class="p-input-icon-right w-full">
                <i class="pi pi-search" />
                <InputText
                  type="text"
                  class="w-full"
                  v-model="search.FarmerFullName"
                />
              </span>
            </div> -->

            <div class="col-12 sm:col-6 lg:col-6">
              <label
                for="selectedStatus"
                class="block text-600 text-sm font-bold mb-2"
              >
                ชนิดของสัตว์ที่อยู่ในฟาร์ม</label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="ยังไม่ได้เลือกชนิดสัตว์"
                :options="dropdown.FarmAnimalTypes"
                optionLabel="name"
                optionValue="id"
                v-model="search.FarmAnimalType"
              />
            </div>

            <div class="col-12 sm:col-6 lg:col-6">
              <label
                for="searchFarmStatus"
                class="block text-600 text-sm font-bold mb-2"
              >
                สถานะฟาร์ม</label
              >
              <Dropdown
                class="w-full"
                v-model="search.FarmStatusID"
                :options="dropdown.FarmStatuses"
                optionLabel="FarmStatusName"
                optionValue="FarmStatusID"
                :filter="true"
                :showClear="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
                placeholder="เลือกสถานะฟาร์ม"
              >
              </Dropdown>
            </div>
          </div>
        </div>

        <!--  -->
        <!--  -->
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
          <div class="col-12">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12">
            <Skeleton height="2rem" class="mb-2"></Skeleton>
          </div>
        </div>
      </div>

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
      isLoading: false,
      urlProject: "/project?includeAll=false&isActive=1",
      getFarm: "/farmer?includeAll=false&isActive=1",
      getOrganization: "/organization/selection?includeAll=false&isActive=1",
      getOrganizationZone:
        "/organization-zone/selection?includeAll=false&isActive=1",
      getOrganizationType:
        "/organization-type/selection?includeAll=false&isActive=1",
      getProvince: "/province/selection?includeAll=false&isActive=1",
      getAmphur: "/amphur/selection?includeAll=false&isActive=1",
      getTumbol: "/tumbol/selection?includeAll=false&isActive=1",
      getTitle: "/title?isActive=1",
      getAIZone: "/ai-zone/selection?includeAll=false&isActive=1",
      getGender: "/gender?isActive=1",
      urlFarmStatus: "/farm-status/selection?isActive=1",

      url: {
        Farm: "/farm",
        SelectionFarm: "/farm/selection?isActive=1",
        getFarm: "/farmer/selection?includeAll=false&isActive=1",
        ExportFarm: "/farm/export-excel?isActive=1",
        FarmStatus: "/farm-status/selection?isActive=1",
        AIZone: "/ai-zone/selection?isActive=1",
        OrganizationZone: "/organization-zone/selection?isActive=1",
        Province: "/province/selection?isActive=1",
        Amphur: "/amphur/selection?isActive=1",
        Tumbol: "/tumbol/selection?isActive=1",
        OrganizationType: "/organization-type/selection?isActive=1",
        Organization: "/organization/selection?isActive=1",
        Project: "/project/selection?includeAll=false&isActive=1",
        Title: "/title?isActive=1",
      },

      sortby: null,
      Projects: [],
      loader: false,
      search: {
        FarmIdentificationNumber: "",
        FarmName: "",
        FarmerFullName: "",
        dateRange: null,
        AIZoneID: null,
        OrganizationZoneID: null,
        ProvinceID: null,
        AmphurID: null,
        TumbolID: null,
        OrganizationTypeID: null,
        OrganizationID: null,
        FarmID: null,
        FarmAnimalType: null,
        ProjectID: null,
      },
      filtered: {
        FarmIdentificationNumber: "",
        FarmName: "",
        FarmStatusID: null,
        FarmOrganizationID: null,
        ProjectID: null,
        FarmOrganizationZoneID: null,
      },
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
      selection: {
        Organization: [],
        OrganizationZone: [],
        OrganizationType: [],
        AIZone: [],
        Province: [],
        Amphur: [],
        Tumbol: [],
        Projects: [],
        farmStatus: [],
        TitleName: [],
        Gender: [],
      },
      dropdown: {
        AIZones: [],
        OrganizationZones: [],
        Organizations: [],
        OrganizationTypes: [],
        Provinces: [],
        Amphurs: [],
        Tumbols: [],
        Projects: [],
        FarmStatuses: [],
        Farms: [],
        FarmAnimalTypes: [
          { name: "โค", id: 1 },
          { name: "กระบือ", id: 2 },
          { name: "แพะ", id: 3 },
          { name: "ทุกประเภทสัตว์", id: 99 },
          { name: "ยังไม่ได้เลือกชนิดสัตว์", id: 98 },
        ],
      },
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

      this.dropdown.Provinces = [];
      this.dropdown.Amphurs = [];
      this.dropdown.Tumbols = [];
      this.dropdown.Organizations = [];
      this.dropdown.Farms = [];
      this.data = [];

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.fetchProvince();
          this.fetchOrganization();
          this.fetchFarm();
          this.load();
          this.search.AmphurID = null;
          this.search.TumbolID = null;
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

      this.dropdown.Provinces = [];
      this.dropdown.Amphurs = [];
      this.dropdown.Tumbols = [];
      this.dropdown.Organizations = [];
      this.dropdown.Farms = [];
      this.data = [];

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.fetchProvince();
          this.fetchOrganization();
          this.fetchFarm();
          this.load();
          this.search.AmphurID = null;
          this.search.TumbolID = null;
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
      this.load();
      this.dropdown.Amphurs = [];
      this.dropdown.Tumbols = [];

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
      this.load();
      this.dropdown.Tumbols = [];

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
      this.load();

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
      this.load();

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
      this.fetchFarm();
      this.load();

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
      this.fetchFarm();
      this.load();
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.ProjectIDArray"() {
      this.fetchFarm();
      this.load();
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.FarmAnimalType"() {
      this.fetchFarm();
      this.load();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.FarmerFullName"() {
      this.fetchFarm();
      this.load();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.FarmStatusID"() {
      this.fetchFarm();
      this.load();
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
  },
  mounted() {
    if (this.search.FarmAnimalType == null) {
      this.search.FarmAnimalType = parseInt(this.animal_id);
    }

    this.dropdown.FarmAnimalTypes = this.dropdown.FarmAnimalTypes.filter(
      (x) => {
        return x.id == this.animal_id || x.id == 98 || x.id == 99;
      }
    );

    if (this.$route.query.projects) {
      if (
        this.$route.query.projects != null &&
        this.$route.query.projects != "null" &&
        this.$route.query.projects != "undefined" &&
        this.$route.query.projects != ""
      ) {
        let pj = this.$route.query.projects.split(",");
        this.search.ProjectID = pj.map((e) => {
          return parseInt(e);
        });
      } else if (
        this.$route.query.projects == "null" ||
        this.$route.query.projects == ""
      ) {
        this.search.ProjectID = [];
      } else {
        this.search.ProjectID = [];
      }
    }

    this.loadDefault();
    this.load();

    if (store.state.user.Staff.Organization.OrganizationZoneID) {
      this.search.OrganizationZoneID =
        store.state.user.Staff.Organization.OrganizationZoneID;
    }
  },
  computed: {
    ...mapGetters({
      AnimalID: "AnimalID",
      animal_id: "animal_id",
      user: "user",
    }),
  },
  methods: {
    async load() {
      this.isLoading = true;
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        this.isLoading = false;
        return;
      }

      let params = {
        ...this.params,
        size: undefined,
        page: 1,
        orderByField: "FarmID",
        orderBy: "desc",
        // includeAll: false,
      };

      if (this.search.FarmAnimalType == null) {
        this.search.FarmAnimalType = parseInt(this.animal_id);
        params["FarmAnimalType"] = this.search.FarmAnimalType;
      } else {
        params["FarmAnimalType"] = this.search.FarmAnimalType;
      }

      if (this.animal_id == 1) {
        params["AnimalTypeID"] = "[1, 2, 41, 42]";
      } else if (this.animal_id == 2) {
        params["AnimalTypeID"] = "[3, 4, 43, 44]";
      } else if (this.animal_id == 3) {
        params["AnimalTypeID"] = "[17, 18, 45, 46]";
      }

     
      if (this.search.AIZoneID != null) {
        if (this.search.AIZoneID != 99) {
          params["FarmAIZoneID"] = this.search.AIZoneID;
        }
      }
      if (this.search.OrganizationZoneID != null) {
        if (this.search.OrganizationZoneID != 99) {
          params["FarmOrganizationZoneID"] = this.search.OrganizationZoneID;
        }
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

      if (this.search.FarmID) {
        params["FarmID"] = this.search.FarmID;
      }

      await axios
        .get(`/animal/get-by-farm-id-1`, {
          signal: this.controller.signal,
          params: params,
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

          this.isLoading = false;
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
      this.fetchFarmStatus();
      this.fetchFarm();
    },

    fetchAIZone() {
      let params = {};
      //  Fetch AIZone
      axios
        .get(this.url.AIZone, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.AIZones = res.data.rows;

          this.dropdown.AIZones.push({
            AIZoneID: 99,
            AIZoneName: "ทั้งหมด",
          });

          console.log(this.dropdown.AIZones);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchOrganizationZone() {
      let params = {};
      //  Fetch OrganizationZone
      axios
        .get(this.url.OrganizationZone, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.OrganizationZones = res.data.rows;
          this.dropdown.OrganizationZones.push({
            OrganizationZoneID: 99,
            OrganizationZoneName: "ทั้งหมด",
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchProject() {
      let params = {};

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
        });
    },
    fetchProvince() {
      //  Fetch Province
      let params = {};

      if (this.search.AIZoneID != null) {
        params["AIZoneID"] = this.search.AIZoneID;
      }

      if (this.search.OrganizationZoneID != null) {
        params["OrganizationZoneID"] = this.search.OrganizationZoneID;
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

      let params = {};

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
        });
    },
    fetchTumbol() {
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null &&
        this.search.AmphurID == null
      ) {
        return;
      }

      let params = {};

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
        });
    },
    fetchOrganizationType() {
      let params = {};

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
        });
    },
    fetchOrganization() {
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        return;
      }

      let params = {};

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
        params["FarmAmphurID"] = this.search.AmphurID;
      }

      if (this.search.TumbolID != null) {
        params["FarmTumbolID"] = this.search.TumbolID;
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
        });
    },

    fetchFarmStatus() {
      //  Fetch Province
      let params = {};
      axios
        .get(this.url.FarmStatus, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.FarmStatuses = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    fetchFarm() {
      this.isLoading = true;
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        this.isLoading = false;
        return;
      }

      let params = {
        size: this.rowPerPage,
        page: this.currentPage,
        orderByField: "FarmID",
        orderBy: "desc",
        // includeAll: false,
      };

      if (this.search.FarmAnimalType == null) {
        this.search.FarmAnimalType = parseInt(this.AnimalID);
        params["FarmAnimalType"] = this.search.FarmAnimalType;
      } else {
        params["FarmAnimalType"] = this.search.FarmAnimalType;
      }

      // Province IN AIZOne
      if (this.search.AIZoneID != null) {
        if (this.search.AIZoneID != 99) {
          params["AIZoneID"] = this.search.AIZoneID;
        }
      }

      if (this.search.OrganizationZoneID != null) {
        if (this.search.OrganizationZoneID != 99) {
          params["OrganizationZoneID"] = this.search.OrganizationZoneID;
        }
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
        params["OrganizationID"] = this.search.OrganizationID;
      }

      if (this.search.OrganizationID != null) {
        params["OrganizationID"] = this.search.OrganizationID;
      }

      if (this.search.ProjectIDArray) {
        params["ProjectID"] = JSON.stringify(this.search.ProjectIDArray);
      }

      if (this.search.FarmerFullName) {
        params["FullName"] = this.search.FarmerFullName;
      }

      if (this.search.FarmID) {
        params["FarmID"] = this.search.FarmID;
      }

      if (this.search.FarmStatusID) {
        params["FarmStatusID"] = this.search.FarmStatusID;
      }

      //
      axios
        .get(this.url.SelectionFarm, {
          signal: this.controller.signal,
          params: { ...params, size: undefined, page: 1 },
        })
        .then((res) => {
          this.dropdown.Farms = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });

      // if (this.search.FarmerFullName) {
      //   url += "&FullName=" + this.search.FarmerFullName;
      //   urlExcel += "&FullName=" + this.search.FarmerFullName;
      // }
    },
  },
};
</script>
