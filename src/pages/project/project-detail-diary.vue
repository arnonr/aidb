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
              :options="Projects"
              optionLabel="ProjectName"
              optionValue="ProjectID"
              :filter="true"
              v-model="search.Project"
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
          <!-- <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="codeNumber"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลขทะเบียนฟาร์ม</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <InputText
                type="number"
                class="w-full"
                v-model="search.FarmIdentificationNumber"
              />
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label for="farmName" class="block text-600 text-sm font-bold mb-2">
              ชื่อฟาร์ม</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <InputText type="text" class="w-full" v-model="search.FarmName" />
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
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

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedScheme"
              class="block text-600 text-sm font-bold mb-2"
            >
              ศูนย์วิจัย</label
            >
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="ทั้งหมด"
              :options="selection.AIZone.data"
              optionLabel="AIZoneName"
              optionValue="AIZoneID"
              v-model="search.AIZone"
              @change="filterProvince($event)"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedScheme"
              class="block text-600 text-sm font-bold mb-2"
            >
              เขตพื้นที่ปศุสัตว์</label
            >
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="ทั้งหมด"
              :options="selection.OrganizationZone.data"
              optionLabel="OrganizationZoneName"
              optionValue="OrganizationZoneID"
              v-model="search.OrganizationZone"
              @change="filterProvince($event)"
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
              :showClear="true"
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              :options="selection.Province.data"
              optionLabel="ProvinceName"
              optionValue="ProvinceID"
              :filter="true"
              v-model="search.FarmProvinceID"
              :virtualScrollerOptions="{ itemSize: 38 }"
              @change="filterAmphur($event)"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchDistrict"
              class="block text-600 text-sm font-bold mb-2"
            >
              อำเภอ</label
            >
            <Dropdown
              :showClear="true"
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              :options="selection.Amphur.data"
              optionLabel="AmphurName"
              optionValue="AmphurID"
              :filter="true"
              v-model="search.FarmAmphurID"
              :virtualScrollerOptions="{ itemSize: 38 }"
              @change="filterTumbol($event)"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchSubDistrict"
              class="block text-600 text-sm font-bold mb-2"
            >
              ตำบล</label
            >
            <Dropdown
              :showClear="true"
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              :options="selection.Tumbol.data"
              optionLabel="TumbolName"
              optionValue="TumbolID"
              :filter="true"
              v-model="search.FarmTumbolID"
              :virtualScrollerOptions="{ itemSize: 38 }"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedScheme"
              class="block text-600 text-sm font-bold mb-2"
            >
              หน่วยงาน
            </label>
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="ทั้งหมด"
              :options="selection.Organization.data"
              optionLabel="OrganizationName"
              optionValue="OrganizationID"
              v-model="search.Organization"
              :filter="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
            />
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
      url: "/farm",
      getFarm: "/farmer",
      getOrganization: "/organization?includeAll=false",
      getOrganizationZone: "/organization-zone?isActive=1",
      getOrganizationType: "/organization-type?isActive=1",
      getProvince: "/province?includeAll=false",
      getAmphur: "/amphur?includeAll=false",
      getTumbol: "/tumbol?includeAll=false",
      getTitle: "/title?isActive=1",
      getAIZone: "/ai-zone?isActive=1",
      getGender: "/gender?isActive=1",
      urlFarmStatus: "/farm-status?isActive=1",
      sortby: null,
      Projects: [],
      loader: false,
      search: {
        Project: [],
        FarmIdentificationNumber: "",
        FarmName: "",
        FarmerFullName: "",
        dateRange: null,
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
    "search.FarmIdentificationNumber"(val) {
      this.filtered.FarmIdentificationNumber = val;
      this.load();
    },
    "search.FarmName"(val) {
      this.filtered.FarmName = val;
      this.load();
    },
    "search.FarmerFullName"(val) {
      this["search.FarmerFullName"] = val;
      this.load();
    },
    "search.Organization"(val) {
      this.filtered.FarmOrganizationID = val;
      this.load();
    },
    "search.OrganizationZone"(val) {
      this.filtered.FarmOrganizationZoneID = val;
      this.load();
    },
    "filtered.FarmStatusID"(val) {
      this.filtered.FarmStatusID = val;
      this.load();
    },
    "filtered.ProjectID"(val) {
      this.filtered.ProjectID = val;
      this.load();
    },
    "search.Project"() {
      this.load();
      //   if (val) {
      //     this.params.ProjectID = val;
      //   } else {
      //     this.params.ProjectID = null;
      //   }
      //   if (this.isLoading == false) {
      //     this.isLoading = true;
      //     setTimeout(() => {
      //       this.load();
      //       this.isLoading = false;
      //     }, 1000);
      //   }
    },
    "search.AIZone"() {
      this.load();
    },
    "search.dateRange"(val) {
      this["search.dateRange"] = val;
      this.load();
    },
    "search.FarmProvinceID"(val) {
      this.filtered.FarmProvinceID = val;
      this.load();
      //   if (this.isLoading == false) {
      //     this.isLoading = true;
      //     setTimeout(() => {
      //       this.load();
      //       this.isLoading = false;
      //     }, 1000);
      //   }
    },
    "search.FarmAmphurID"(val) {
      this.filtered.FarmAmphurID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.FarmTumbolID"(val) {
      this.filtered.FarmTumbolID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
  },
  mounted() {
    if (this.$route.query.projects) {
      if (
        this.$route.query.projects != null &&
        this.$route.query.projects != "null" &&
        this.$route.query.projects != "undefined" &&
        this.$route.query.projects != ""
      ) {
        console.log(this.$route.query.projects + "FREEDOM1");
        let pj = this.$route.query.projects.split(",");
        this.search.Project = pj.map((e) => {
          return parseInt(e);
        });

      } else if (
        this.$route.query.projects == "null" ||
        this.$route.query.projects == ""
      ) {
        this.search.Project = [];
      } else {
        this.search.Project = [];
      }
    }

    this.search.Organization = this.user.Staff.StaffOrganizationID;
    this.filtered.FarmOrganizationID = this.user.Staff.StaffOrganizationID;
    this.load_selectionAdvance();
    this.load();
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      user: "user",
    }),
  },
  methods: {
    load_selectionAdvance() {
      axios
        .get(this.getOrganization, {
          signal: this.controller.signal,
        })
        .then((res) => (this.selection.Organization.data = res.data.rows));
      axios
        .get(this.getAIZone, {
          signal: this.controller.signal,
        })
        .then((res) => (this.selection.AIZone.data = res.data.rows));
      axios
        .get(this.getOrganizationZone, {
          signal: this.controller.signal,
        })
        .then((res) => (this.selection.OrganizationZone.data = res.data.rows));

      axios
        .get(this.getOrganizationType, {
          signal: this.controller.signal,
        })
        .then((res) => (this.selection.OrganizationType.data = res.data.rows));

      axios
        .get(this.getProvince, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.selection.Province.temp = this.selection.Province.data =
            res.data.rows;
        });

      axios
        .get(this.getAmphur, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.selection.Amphur.temp = this.selection.Amphur.data =
            res.data.rows;
        });

      axios
        .get(this.getTumbol, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.selection.Tumbol.temp = this.selection.Tumbol.data =
            res.data.rows;
        });

      axios
        .get(this.urlFarmStatus, {
          signal: this.controller.signal,
        })
        .then((res) => (this.selection.farmStatus = res.data.rows));

      axios
        .get(this.getGender, {
          signal: this.controller.signal,
        })
        .then((res) => (this.selection.Gender.data = res.data.rows));

      // Promise.all()
    },
    async load() {
      this.isLoading = true;
      let search = null;
      if (this.animal_id == 1) {
        search = [1, 2];
      } else if (this.animal_id == 2) {
        search = [3, 4];
      } else if (this.animal_id == 3) {
        search = [17, 18];
      }

      await axios
        .get(this.urlProject, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.Projects = res.data.rows;
          console.log(this.Projects);
        });

      let url = "";

      if (this.search.AIZone) {
        url += "&FarmAIZoneID=" + this.search.AIZone;
      }

      if (this.filtered.FarmProvinceID) {
        url += "&FarmProvinceID=" + this.filtered.FarmProvinceID;
      }

      if (this.filtered.FarmAmphurID) {
        url += "&FarmAmphurID=" + this.filtered.FarmAmphurID;
      }

      if (this.filtered.FarmTumbolID) {
        url += "&FarmTumbolID=" + this.filtered.FarmTumbolID;
      }

      if (this.filtered.FarmOrganizationID) {
        url += "&FarmOrganizationID=" + this.filtered.FarmOrganizationID;
      }

      if (this.filtered.FarmOrganizationZoneID) {
        url +=
          "&FarmOrganizationZoneID=" + this.filtered.FarmOrganizationZoneID;
      }

      if (this.search.Project) {
        if (typeof this.search.Project !== "string") {
          let projects = JSON.stringify(this.search.Project);
          url += "&ProjectID=" + projects;
        }
      }

      await axios
        .get(`/animal/get-by-farm-id-1?AnimalTypeID=[${search}]${url}`, {
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
    filterProvince($event) {
      let val = $event.value;
      if (val) {
        this.selection.Province.data = this.selection.Province.temp;
        this.selection.Province.data = this.selection.Province.data.filter(
          (item) => item.AIZoneID == val
        );
      } else {
        this.selection.Province.data = this.selection.Province.temp;
      }
    },
    filterAmphur($event) {
      let val = $event.value;
      if (val) {
        this.selection.Amphur.data = this.selection.Amphur.temp;
        this.selection.Amphur.data = this.selection.Amphur.data.filter(
          (item) => item.ProvinceID == val
        );
      } else {
        this.selection.Amphur.data = this.selection.Amphur.temp;
      }
    },
    filterTumbol($event) {
      let val = $event.value;
      if (val) {
        this.selection.Tumbol.data = this.selection.Tumbol.temp;
        this.selection.Tumbol.data = this.selection.Tumbol.data.filter(
          (item) => item.AmphurID == val
        );
      } else {
        this.selection.Tumbol.data = this.selection.Tumbol.temp;
      }
    },
  },
};
</script>
