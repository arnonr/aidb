<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle :title="Alert_AnimalID.name" :pages="breadcrumb" />

      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหา</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />
          <InputText
            class="w-full"
            type="text"
            v-model="search['global'].value"
            placeholder="ค้นหา"
          />
        </span>
      </div>

      <div class="card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">รายชื่อสัตว์</h1>
          </div>
          <!-- <div class="col-12 md:col-6 md:text-right">
            <Button
              label="PRINT"
              icon="pi pi-print"
              class="mx-1 bg-cyan-500 w-full md:w-auto"
            />
          </div> -->
        </div>
        <div class="mt-5">
          <DataTable
            class="text-sm"
            :value="data"
            :paginator="true"
            :rows="10"
            v-model:filters="search"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            responsiveLayout="scroll"
            currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
          >
            <Column
              v-for="col of columns"
              :field="col.field"
              :header="col.header"
              :key="col.field"
              class="text-center"
              :sortable="true"
            >
              <template #body="slotProps" v-if="col.header == 'แจ้งเตือน'">
                <span :class="'text-red-500'">{{
                  slotProps.data.Notifications
                }}</span>
              </template>
            </Column>
            <Column header="จัดการ" class="text-center">
              <template #body="slotProps">
                <!-- <Button
                  icon="pi pi-pencil"
                  iconPos="right"
                  class="p-button-raised p-button-rounded"
                  @click="edit(slotProps.data.AnimalEarID)"
                /> -->
                <!--  -->
                <SplitButton
                  label="กิจกรรม"
                  @click="
                    openAnimal(
                      slotProps.data.AnimalID,
                      slotProps.data.AnimalEarID
                    )
                  "
                  class="p-button-sm p-button-outlined p-button-warning"
                  :model="
                    getItems(
                      slotProps.data.AnimalID,
                      slotProps.data.AnimalSecretStatus,
                      slotProps.data.AnimalEarID
                    )
                  "
                >
                </SplitButton>
                <!--  -->
              </template>
            </Column>
            <template #empty> ไม่พบข้อมูล </template>
            <template #loading>
              <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
            </template>
          </DataTable>
        </div>
      </div>
    </div>
    <Dialog
      header="กิจกรรม"
      v-model:visible="displaytab"
      :draggable="false"
      :style="{ width: '75vw' }"
      :modal="false"
      :dismissableMask="true"
    >
      <VueCreatureInfo :display="true" v-if="displaytab" />
    </Dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import store from "@/service/Vuex";
import PageTitle from "@/components/PageTitle.vue";
import router from "../../router";
import axios from "axios";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
import VueCreatureInfo from "@/pages/farm_info/creature_info.vue";
export default {
  components: {
    PageTitle,
    VueCreatureInfo,
  },
  setup() {
    const breadcrumb = ref([
      { label: "แจ้งเตือนรายวัน", to: "/activity/daily-alert" },
      { label: "", to: "/activity/daily-alert/show" },
    ]);
    return {
      breadcrumb,
    };
  },
  computed: {
    ...mapGetters({
      Alert_AnimalID: "Alert_AnimalID",
      animal_id: "animal_id",
    }),
  },
  data() {
    return {
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      data: null,
      displaytab: false,
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
        {
          field: "AnimalEarID",
          header: "หมายเลขสัตว์",
        },
        {
          field: "AnimalName",
          header: "ชื่อสัตว์",
        },
        {
          field: "AnimalAge",
          header: "อายุ",
        },
        {
          field: "AnimalStatus.AnimalStatusName",
          header: "สถานะ",
        },
        {
          field: "AnimalFarm.FarmName",
          header: "ฟาร์ม",
        },
        {
          field: "Notifications",
          header: "แจ้งเตือน",
        },
      ],
      controller: new AbortController(),
    };
  },
  mounted() {
    this.breadcrumb[1].label = this.Alert_AnimalID.name;
    this.load();
  },
  methods: {
    edit(eid) {
      let id = {
        AnimalEarID: eid,
      };
      let data = {
        id: this.Alert_AnimalID.title,
        animal_id: this.animal_id,
      };
      store.dispatch("tabAnimal", data);
      store.dispatch("animalInfo", id);
      router.push("/activity/creature_info");
    },
    async load() {
      // ป้องกันค้นหาเลขสัตว์อื่นแล้วเจอ
      let search = null;
      if (this.animal_id == 1) {
        search = [1,2,41,42];
      } else if (this.animal_id == 2) {
        search = [3,4,43,44];
      } else if (this.animal_id == 3) {
        search = [17,18,45,46];
      }

      if (this.Alert_AnimalID) {
        await axios
          .get(
            `/animal/get-by-farm-id-1?AnimalTypeID=[${search}]&AnimalIDArray=[${this.Alert_AnimalID.id}]`,
            {
              signal: this.controller.signal,
            }
          )
          .then((response) => {
            //ตรวจสอบ animal id ให้ตรงกับ noti

            console.log(response.data.rows);
            this.data = response.data.rows;
            // this.data = response.data.rows.filter((val) => {
            //   for (let i in this.Alert_AnimalID.id) {
            //     if (val.AnimalID == this.Alert_AnimalID.id[i]) {
            //       return val;
            //     }
            //   }
            // });
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
            }
          });
      }
    },
    openAnimal(id, earid) {
      let data = {
        AnimalEarID: earid,
      };
      store.dispatch("animalInfo", data);
      // this.displaytab = true;

      this.$router.push("/activity/creature_info_detail");
      // setTimeout(() => {
      // }, 1000);
    },

    getItems(id, menu, earid) {
      let data = {
        AnimalEarID: earid,
      };
      const items = [
        // {
        //   label: "แก้ไข",
        //   icon: "pi pi-pencil",
        //   command: () => {
        //     this.$router.push("/creature/edit/" + id);
        //   },
        // },
        // {
        //   label: "พิมพ์ประวัติ",
        //   icon: "pi pi-print",
        //   command: async () => {
        //     // window.open("../../pdf/Animal.pdf", "_blank");
        //     await ArtificialReport();
        //   },
        // },
      ];

      if (menu.includes(2)) {
        items.push({
          label: "ผสมเทียม",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 0,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(3)) {
        items.push({
          label: "ย้ายฝากตัวอ่อน",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 1,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(4)) {
        items.push({
          label: "ตรวจการตั้งท้อง",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 2,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(5)) {
        items.push({
          label: "แท้ง",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 3,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(6)) {
        items.push({
          label: "คลอด",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 4,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(7) && this.animal_id != 3) {
        items.push({
          label: "ตรวจระบบสืบพันธุ์",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 11,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(8)) {
        items.push({
          label: "ติดตามลูกหลังคลอด",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 5,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(9)) {
        items.push({
          label: "หย่านม",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 6,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(1)) {
        items.push({
          label: "คัดจำหน่าย",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 9,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;

            // this.$router.push("/creature/edit/" + id);
          },
        });
      }
      return items;
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
