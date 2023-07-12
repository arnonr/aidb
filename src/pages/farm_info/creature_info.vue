<template>
  <div class="grid">
    <div class="col-12">
      <div class="card p-1" v-if="data.AnimalName">
        <TabView
          ref="tabview"
          :scrollable="true"
          :lazy="true"
          v-model:activeIndex="active"
        >
          <TabPanel header="ผสมเทียม">
            <TabArtificial :permit="permit" />
          </TabPanel>
          <TabPanel header="ย้ายฝากตัวอ่อน">
            <TabEmbryoTransfer :permit="permit" />
          </TabPanel>
          <TabPanel header="ตรวจการตั้งท้อง">
            <TabPregnancyCheck :permit="permit" />
          </TabPanel>
          <TabPanel header="แท้ง">
            <TabAbortion :permit="permit" />
          </TabPanel>
          <TabPanel header="คลอด">
            <TabBirth :permit="permit" />
          </TabPanel>
          <TabPanel header="ติดตามลูกหลังคลอด">
            <TabFollowAfterBirth :permit="permit" />
          </TabPanel>
          <TabPanel header="หย่านม">
            <TabWeaning :permit="permit" />
          </TabPanel>
          <TabPanel header="บันทึกการเจริญเติบโต">
            <TabProgress :permit="permit" />
          </TabPanel>
          <TabPanel header="ข้อมูลสุขภาพ">
            <TabVaccine :permit="permit" />
          </TabPanel>
          <TabPanel header="การคัดจำหน่าย">
            <TabDistribution :permit="permit" />
          </TabPanel>
          <TabPanel header="คะแนนร่างกาย">
            <TabBCS :permit="permit" />
          </TabPanel>
          <TabPanel header="ตรวจระบบสืบพันธุ์" v-if="this.animal_id != 3">
            <TabReproduce :permit="permit" />
          </TabPanel>
          <TabPanel
            header="ไทยแบล็ค"
            v-if="this.animal_id == 1 && this.isProjectThaiBlack"
          >
            <TabThaiBlack :permit="permit" />
          </TabPanel>
          <TabPanel
            header="แดงสุราษฎร์"
            v-if="this.animal_id == 3 && this.isProjectRedGoat"
          >
            <TabRedGoat :permit="permit" />
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
  components: {
    TabBCS,
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
      { label: "กิจกรรม", to: "/" },
      { label: "ข้อมูลสัตว์", to: "/activity/artificial" },
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
