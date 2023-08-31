<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ข้อมูลสัตว์" :pages="breadcrumb" />

      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">หมายเลขประจำตัวสัตว์</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />
          <InputText
            class="w-full"
            type="text"
            v-model="search"
            placeholder="ค้นหา"
          />
        </span>
      </div>
      <div class="card" v-if="data.AnimalName">
        <div>
          <h4 class="text-xl mb-0 text-600">ข้อมูลหมายเลข {{ search }}</h4>
        </div>
        <div class="grid mt-3">
          <div class="col-12 sm:col-4 lg:col-4">
            <div>ชื่อ : {{ data.AnimalName }}</div>
          </div>
          <div class="col-12 sm:col-4 lg:col-4">
            <div>อายุ : {{ data.AnimalAge }} ปี</div>
          </div>
          <div class="col-12 sm:col-4 lg:col-4">
            <div>หมายเลขใบหู : {{ data.AnimalEarID }}</div>
          </div>
          <div class="col-12 sm:col-4 lg:col-4">
            <div>หมายเลข NID : {{ data.AnimalNationalID }}</div>
          </div>
          <div class="col-12 sm:col-4 lg:col-4">
            <div>หมายเลข RFID : {{ data.AnimalMicrochip }}</div>
          </div>
          <div class="col-12 sm:col-4 lg:col-4" v-if="data.AnimalStatus">
            <div>
              สถานะ :
              <span
                >{{ data.AnimalStatus.AnimalStatusName }} ({{
                  data.AnimalSex.AnimalSexName
                }})</span
              >
            </div>
          </div>
          <!-- <div class="col-12 sm:col-4 lg:col-4" v-if="data.AnimalType">
            <div>ประเภทสัตว์ : {{ data.AnimalType.AnimalTypeName }}</div>
          </div> -->
          <div class="col-12 sm:col-4 lg:col-4" v-if="data.AnimalBreedAll">
            <div>สายพันธุ์ : {{ data.AnimalBreedAll }}</div>
          </div>
        </div>
        <div class="grid mt-2">
          <!-- <div class="col-12 sm:col-6 lg:col-4" v-if="data.AnimalBreed1">
            พันธุ์ที่ 1 :
            <span>
              {{ data.AnimalBreed1.AnimalBreedName }}
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-8" v-if="data.AnimalBreed1">
            สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 1:
            {{ data.AnimalBreedPercent1 }}
          </div>
          <div class="col-12 sm:col-6 lg:col-4" v-if="data.AnimalBreed2">
            พันธุ์ที่ 2 :
            <span>
              {{ data.AnimalBreed2.AnimalBreedName }}
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-8" v-if="data.AnimalBreed2">
            สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 2:
            {{ data.AnimalBreedPercent2 }}
          </div>
          <div class="col-12 sm:col-6 lg:col-4" v-if="data.AnimalBreed3">
            พันธุ์ที่ 3 :
            <span>
              {{ data.AnimalBreed3.AnimalBreedName }}
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-8" v-if="data.AnimalBreed3">
            สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 3:
            {{ data.AnimalBreedPercent3 }}
          </div>
          <div class="col-12 sm:col-6 lg:col-4" v-if="data.AnimalBreed4">
            พันธุ์ที่ 4 :
            <span>
              {{ data.AnimalBreed4.AnimalBreedName }}
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-8" v-if="data.AnimalBreed4">
            สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 4:
            {{ data.AnimalBreedPercent4 }}
          </div>
          <div class="col-12 sm:col-6 lg:col-4" v-if="data.AnimalBreed5">
            พันธุ์ที่ 5 :
            <span>
              {{ data.AnimalBreed5.AnimalBreedName }}
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-8" v-if="data.AnimalBreed5">
            สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 5:
            {{ data.AnimalBreedPercent5 }}
          </div> -->

          <div class="col-12 sm:col-6 lg:col-8" v-if="data.Projects">
            โครงการ :
            <span v-for="item in data.Projects" :key="item.id">
              <br />- {{ `${item}` }}
            </span>
          </div>
        </div>
        <div class="mt-5">
          <h4 class="text-xl mb-0 text-600">ข้อมูลฟาร์ม</h4>
        </div>
        <div class="grid mt-2">
          <div class="col-12 sm:col-6 lg:col-4">
            <div>
              หมายเลขทะเบียนฟาร์ม :
              <span v-if="data.AnimalFarm">
                {{ data.AnimalFarm.FarmIdentificationNumber }}
              </span>
            </div>
          </div>
          <div class="col-12 sm:col-6 lg:col-8">
            <div>
              ชื่อฟาร์ม :
              <span v-if="data.AnimalFarm">
                {{ data.AnimalFarm.FarmName }}
              </span>
            </div>
          </div>
        </div>

        <!-- <div class="mt-5">
          <h4 class="text-xl mb-0 text-600">ข้อมูลอื่น ๆ</h4>
        </div>
        <div class="grid mt-2">
          <div class="col-12 sm:col-6 lg:col-4">
            <div>
              หน่วยงาน :
              <span v-if="data.Organization">
                {{ data.Organization.OrganizationName }}
              </span>
            </div>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <div>
              เขตพื้นที่ปศุสัตว์ :
              <span v-if="data.OrganizationZone">
                {{ data.OrganizationZone.OrganizationZoneName }}
              </span>
            </div>
          </div>
        </div> -->
      </div>
      <div class="card p-1" v-if="data.AnimalName">
        <TabView
          ref="tabview"
          :scrollable="true"
          :lazy="true"
          v-model:activeIndex="active"
        >
          <TabPanel header="ผสมเทียม">
            <TabArtificial
              :permit="permit"
              @refresh_secret_status="refresh_secret_status"
              :display_prop="display"
              @onclear_display="clear_display"
            />
          </TabPanel>
          <TabPanel header="ย้ายฝากตัวอ่อน">
            <TabEmbryoTransfer
              :permit="permit"
              @refresh_secret_status="refresh_secret_status"
              :display_prop="display"
              @onclear_display="clear_display"
            />
          </TabPanel>
          <TabPanel header="ตรวจการตั้งท้อง">
            <TabPregnancyCheck
              :permit="permit"
              @refresh_secret_status="refresh_secret_status"
              :display_prop="display"
              @onclear_display="clear_display"
            />
          </TabPanel>
          <TabPanel header="แท้ง">
            <TabAbortion
              :permit="permit"
              @refresh_secret_status="refresh_secret_status"
              :display_prop="display"
              @onclear_display="clear_display"
            />
          </TabPanel>
          <TabPanel header="คลอด">
            <TabBirth
              :permit="permit"
              @refresh_secret_status="refresh_secret_status"
              :display_prop="display"
              @onclear_display="clear_display"
            />
          </TabPanel>
          <TabPanel header="ติดตามลูกหลังคลอด">
            <TabFollowAfterBirth
              :permit="permit"
              @refresh_secret_status="refresh_secret_status"
              :display_prop="display"
              :FarmName="data.AnimalFarm.FarmName"
              @onclear_display="clear_display"
            />
          </TabPanel>
          <TabPanel header="หย่านม">
            <TabWeaning
              :permit="permit"
              @refresh_secret_status="refresh_secret_status"
              :display_prop="display"
              @onclear_display="clear_display"
            />
          </TabPanel>
          <TabPanel header="บันทึกการเจริญเติบโต">
            <TabProgress
              :permit="permit"
              @refresh_secret_status="refresh_secret_status"
              :display_prop="display"
              @onclear_display="clear_display"
            />
          </TabPanel>
          <TabPanel header="ข้อมูลสุขภาพ">
            <TabVaccine />
          </TabPanel>
          <TabPanel header="การคัดจำหน่าย">
            <TabDistribution
              :permit="permit"
              @refresh_secret_status="refresh_secret_status"
              :display_prop="display"
              @onclear_display="clear_display"
            />
          </TabPanel>
          <TabPanel header="คะแนนร่างกาย">
            <TabBCS
              :permit="permit"
              @refresh_secret_status="refresh_secret_status"
              :display_prop="display"
              @onclear_display="clear_display"
            />
          </TabPanel>
          <TabPanel header="ตรวจระบบสืบพันธุ์" v-if="this.animal_id != 3">
            <TabReproduce
              :permit="permit"
              @refresh_secret_status="refresh_secret_status"
              :display_prop="display"
              @onclear_display="clear_display"
            />
          </TabPanel>
          <TabPanel
            header="ไทยแบล็ค"
            v-if="this.animal_id == 1 && this.isProjectThaiBlack"
          >
            <TabThaiBlack
              :permit="permit"
              @refresh_secret_status="refresh_secret_status"
              :display_prop="display"
              @onclear_display="clear_display"
            />
          </TabPanel>
          <TabPanel
            header="แดงสุราษฎร์"
            v-if="this.animal_id == 3 && this.isProjectRedGoat"
          >
            <TabRedGoat
              :permit="permit"
              @refresh_secret_status="refresh_secret_status"
              :display_prop="display"
              @onclear_display="clear_display"
            />
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/service/Vuex";
import { ref } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import TabArtificial from "@/components/tabs/creature/TabArtificial";
import TabEmbryoTransfer from "@/components/tabs/creature/TabEmbryoTransfer";
import TabPregnancyCheck from "@/components/tabs/creature/TabPregnancyCheck";
import TabAbortion from "@/components/tabs/creature/TabAbortion";
import TabBirth from "@/components/tabs/creature/TabBirth";
import TabReproduce from "@/components/tabs/creature/TabReproduce";
import TabFollowAfterBirth from "@/components/tabs/creature/TabFollowAfterBirth";
import TabWeaning from "@/components/tabs/creature/TabWeaning";
import TabVaccine from "@/components/tabs/creature/TabVaccine";
// import TabHealth from "@/components/tabs/creature/TabHealth";
import TabDistribution from "@/components/tabs/creature/TabDistribution";
import TabProgress from "@/components/tabs/creature/TabProgress";
import TabThaiBlack from "@/components/tabs/creature/TabThaiBlack";
import TabRedGoat from "@/components/tabs/creature/TabRedGoat";
import TabBCS from "@/components/tabs/creature/TabBCS";
import axios from "axios";
export default {
  emits: ["refresh_secret_status", "whenClear_display"],
  components: {
    TabBCS,
    PageTitle,
    TabArtificial,
    TabEmbryoTransfer,
    TabPregnancyCheck,
    TabAbortion,
    TabBirth,
    TabReproduce,
    TabFollowAfterBirth,
    TabWeaning,
    TabVaccine,
    TabProgress,
    // TabHealth,
    TabDistribution,
    TabThaiBlack,
    TabRedGoat,
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      animalInfo: "animalInfo",
      tabAnimal: "tabAnimal",
      permission: "get_permission",
    }),
  },
  setup() {
    const breadcrumb = ref([
      { label: "ข้อมูลฟาร์ม", to: "/activity/farm_info" },
      { label: "ข้อมูลสัตว์", to: "/activity/creature_info" },
    ]);
    const search = ref();
    return {
      search,
      breadcrumb,
    };
  },
  mounted() {
    if (this.animalInfo) {
      this.search = this.animalInfo.AnimalEarID;
    }
    if (this.tabAnimal.animal_id != this.animal_id) {
      this.active = 0;
    } else {
      this.active = this.tabAnimal.id;
    }
    this.permit = this.permission.filter((item) => {
      return item.MenuID == 12;
    });

    // if (this.tabAnimal.id >= 10) {
    //   let x = 0;
    //   this.updateLastTab(x);
    //   this.active = x;
    // } else if (this.tabAnimal.id >= 5 && this.animal_id == 3) {
    //   let x = this.tabAnimal.id - 1;
    //   this.updateLastTab(x);
    //   this.active = x;
    // } else if (this.tabAnimal.id >= 5 && this.animal_id != 3) {
    //   let x = this.tabAnimal.id + 1;
    //   this.updateLastTab(x);
    //   this.active = x;
    // } else {
    //   this.active = this.tabAnimal.id;
    // }
  },
  data() {
    return {
      data: {
        AnimalBreed1: {},
        AnimalBreed2: {},
        AnimalBreed3: {},
        AnimalBreed4: {},
        AnimalFarm: {},
      },
      permit: null,
      active: 0,
      isProjectThaiBlack: false,
      isProjectRedGoat: false,
      IsSearch: false,
      controller: new AbortController(),
    };
  },
  watch: {
    search(value) {
      this.search = value;
      if (this.IsSearch == false) {
        this.IsSearch = true;
        setTimeout(() => {
          this.load();
        }, 1500);
      }
    },
    active(val) {
      this.updateLastTab(val);
      this.load();
    },
  },
  props: {
    display: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async load() {
      await axios
        .get("/animal?AnimalEarID=" + this.search, {
          signal: this.controller.signal,
        })
        .then((response) => {
          if (response.data.total > 0) {
            if (this.search == response.data.rows[0].AnimalEarID) {
              this.data = response.data.rows[0];

              // ป้องกันค้นหาเลขสัตว์อื่นแล้วเจอ
              if (this.animal_id == 1) {
                if (
                  !(this.data.AnimalTypeID == 1 || this.data.AnimalTypeID == 2)
                ) {
                  this.data = {};
                }
              } else if (this.animal_id == 2) {
                if (
                  !(this.data.AnimalTypeID == 3 || this.data.AnimalTypeID == 4)
                ) {
                  this.data = {};
                }
              } else if (this.animal_id == 3) {
                if (
                  !(
                    this.data.AnimalTypeID == 17 || this.data.AnimalTypeID == 18
                  )
                ) {
                  this.data = {};
                }
              }

              store.dispatch(
                "selectAnimalSecretStatus",
                this.data.AnimalSecretStatus
              );
              store.dispatch("selectAnimalID", this.data.AnimalID);
            } else {
              this.data = {};
              store.dispatch("selectAnimalID", null);
              store.dispatch("selectAnimalSecretStatus", null);
            }
          } else {
            this.data = {};
            store.dispatch("selectAnimalID", null);
            store.dispatch("selectAnimalSecretStatus", null);
          }

          store.dispatch("animalInfo", this.data);
        })
        .finally(() => {
          this.IsSearch = false;
          this.checkProject();
        });
    },
    clear_display() {
      this.$emit("whenClear_display");
    },
    async refresh_secret_status() {
      await axios
        .get("/animal?AnimalEarID=" + this.search, {
          signal: this.controller.signal,
        })
        .then((response) => {
          if (response.data.total > 0) {
            if (this.search == response.data.rows[0].AnimalEarID) {
              this.data = response.data.rows[0];

              // ป้องกันค้นหาเลขสัตว์อื่นแล้วเจอ
              if (this.animal_id == 1) {
                if (
                  !(this.data.AnimalTypeID == 1 || this.data.AnimalTypeID == 2)
                ) {
                  this.data = {};
                }
              } else if (this.animal_id == 2) {
                if (
                  !(this.data.AnimalTypeID == 3 || this.data.AnimalTypeID == 4)
                ) {
                  this.data = {};
                }
              } else if (this.animal_id == 3) {
                if (
                  !(
                    this.data.AnimalTypeID == 17 || this.data.AnimalTypeID == 18
                  )
                ) {
                  this.data = {};
                }
              }

              store.dispatch(
                "selectAnimalSecretStatus",
                this.data.AnimalSecretStatus
              );
              store.dispatch("selectAnimalID", this.data.AnimalID);
            } else {
              this.data = {};
              store.dispatch("selectAnimalID", null);
              store.dispatch("selectAnimalSecretStatus", null);
            }
          } else {
            this.data = {};
            store.dispatch("selectAnimalID", null);
            store.dispatch("selectAnimalSecretStatus", null);
          }

          store.dispatch("animalInfo", this.data);
        });
    },
    checkProject() {
      if (this.data.Projects) {
        for (let i = 0; i < this.data.Projects.length; i++) {
          if (this.data.Projects[i] == "โครงการสร้างโคเนื้อคุณภาพสูง") {
            this.isProjectThaiBlack = true;
          }
          if (this.data.Projects[i] == "โครงการพัฒนาแพะพันธุ์แดงสุราษฎร์") {
            this.isProjectRedGoat = true;
          }
        }
      }
    },
    updateLastTab(id) {
      let data = {
        id: id,
        animal_id: this.animal_id,
      };

      store.dispatch("tabAnimal", data);
    },
  },

  unmounted() {
    this.controller.abort();
    store.dispatch("selectAnimalID", null);
  },
};
</script>
