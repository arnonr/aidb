<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="ตะกร้า" :pages="breadcrumb" />
      <!-- <div class="card bg-primary pb-6 mb-4">
        <h1 class="text-center text-white">ค้นหา</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />
          <InputText
            type="text"
            class="w-full"
            placeholder="ค้นหา"
            v-model="search['global'].value"
          />
        </span>
      </div> -->

      <div class="card">
        <div class="grid mb-5">
          <div class="col-12">
            <h1 class="text-2xl mb-0 text-600">
              ข้อมูลสัตว์ในตะกร้าทั้งหมด {{ `${this.data.length || "0"}` }} ตัว
            </h1>
          </div>
        </div>
        <div>
          <DataTable
            class="text-sm"
            :value="data"
            :paginator="true"
            :rows="10"
            :loading="isLoading"
            :filterField="true"
            :exportable="true"
            v-model:filters="search"
            ref="dt"
            :rowHover="true"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
            <template #header>
              <div class="flex justify-content-end align-items-right">
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="search['global'].value"
                    placeholder="ค้นหา"
                  />
                </span>
              </div>
            </template>
            <template #empty> ไม่พบข้อมูล </template>
            <template #loading> กรุณารอสักครู่... </template>
            <!-- <Column
              field="show_id"
              header="ลำดับ"
              :sortable="true"
              style="width: 20px"
            ></Column> -->
            <Column
              field="FarmName"
              header="ชื่อฟาร์ม"
              :sortable="true"
            ></Column>
            <Column
              field="AnimalEarID"
              header="เลขทะเบียนสัตว์"
              :sortable="true"
            ></Column>
            <Column
              field="AnimalName"
              header="ชื่อสัตว์"
              :sortable="true"
            ></Column>
            <Column
              field="AnimalBreedAll"
              header="สายพันธุ์"
              :sortable="true"
              style="width: 100px"
            ></Column>
            <Column
              field="AnimalAge"
              header="อายุ (ปี)"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="AnimalStatus"
              header="สถานะสัตว์"
              :sortable="true"
            ></Column>
            <Column
              field="TimeNo"
              header="ครั้งที่ผสม"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="ThaiAIDate"
              header="วันที่ผสม"
              :sortable="true"
            ></Column>
            <Column
              field="PregnancyStatus"
              header="ตรวจท้อง"
              :sortable="true"
            ></Column>
            <Column
              header="แจ้งเตือน"
              field="Notification"
              style="width: 150px"
              :sortable="true"
            >
              <template #body="slotProps">
                <span class="text-red-500">
                  - {{ formatArray(slotProps.data.Notification) }}</span
                >
              </template>

              <!-- <template #body="slotProp">
                <span
                  v-for="item in slotProp.data.Notification"
                  :key="item.id"
                  class="text-red-500"
                >
                  <br />- {{ `${item}` }}
                </span>
              </template> -->
            </Column>
            <Column field="cart" header="ตะกร้า">
              <template #body="slotProps">
                <Button
                  class="p-button-sm p-button-danger"
                  label="ลบตะกร้า"
                  icon="pi pi-times"
                  @click="delCart(slotProps.data.AnimalID)"
                />
              </template>
            </Column>
            <Column header="จัดการ">
              <template #body="slotProps">
                <!-- <router-link :to="{ name: 'creature_info' }"> -->
                <SplitButton
                  label="กิจกรรม"
                  icon="pi pi-eye"
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
                <!-- </router-link> -->
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import { mapGetters } from "vuex";
import store from "@/service/Vuex";
import { FilterMatchMode } from "primevue/api";
import axios from "axios";
export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      farmDataItem: "farmDataItem",
      animalInfo: "animalInfo",
    }),
  },
  setup() {
    const breadcrumb = ref([{ label: "ตะกร้า", to: "/cart" }]);

    return {
      breadcrumb,
    };
  },
  data() {
    return {
      apiCart: "/cart",
      animal_url: "/animal/get-by-farm-id",
      data: [],
      controller: new AbortController(),

      loader: false,
      search: {
        FarmID: "",
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },

      isLoading: false,
      total: 0,
      params: {
        page: 1,
        size: 10,
        IsActive: null,
      },
    };
  },

  mounted() {
    this.load();
  },
  unmounted() {
    this.controller.abort();
  },
  methods: {
    load() {
      axios
        .get(this.apiCart, {
          signal: this.controller.signal,
        })
        .then((res) => {
          // this.animal = res.data.rows;
          // console.log(res.data.total);
          this.total = res.data.total;

          if (this.animal_id == 1) {
            this.data = res.data.rows.filter(
              (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
            );
          } else if (this.animal_id == 2) {
            this.data = res.data.rows.filter(
              (item) => item.AnimalTypeID === 3 || item.AnimalTypeID === 4
            );
          } else if (this.animal_id == 3) {
            this.data = res.data.rows.filter(
              (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
            );
          }

          for (let i = 0; i < this.data.length; i++) {
            this.data[i].show_id = i + 1;
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openAnimal(id, earid) {
      let data = {
        AnimalEarID: earid,
      };
      store.dispatch("animalInfo", data);
      this.$router.push("/activity/creature_info");
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
        {
          label: "พิมพ์ประวัติ",
          icon: "pi pi-print",
          command: () => {
            window.open("../../pdf/Animal.pdf", "_blank");
          },
        },
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
            this.$router.push("/activity/creature_info");
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
            this.$router.push("/activity/creature_info");
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
            this.$router.push("/activity/creature_info");
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
            this.$router.push("/activity/creature_info");
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
            this.$router.push("/activity/creature_info");
          },
        });
      }
      if (menu.includes(7) && this.animal_id != 3) {
        items.push({
          label: "ตรวจระบบสืบพันธุ์",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 5,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.$router.push("/activity/creature_info");
          },
        });
      }
      if (menu.includes(8)) {
        items.push({
          label: "ติดตามลูกหลังคลอด",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 6,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.$router.push("/activity/creature_info");
          },
        });
      }
      if (menu.includes(9)) {
        items.push({
          label: "หย่านม",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 7,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.$router.push("/activity/creature_info");
          },
        });
      }
      if (menu.includes(1)) {
        items.push({
          label: "คัดจำหน่าย",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 10,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.$router.push("/activity/creature_info");
            // this.$router.push("/creature/edit/" + id);
          },
        });
      }

      return items;
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    formatArray(value) {
      return value.toLocaleString();
    },
    delCart(id) {
      //! กรณีเป็น method delete เวลาส่ง json ต้องถูกครอบด้วย data อีกที
      let data = {
        data: {
          AnimalID: id,
        },
      };

      axios
        .delete("/cart/", data)
        .then(() => {
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ลบข้อมูลเสร็จสิ้น",
            life: 5000,
          });

          this.loadAnimal();
        })
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },
  },
};
</script>
