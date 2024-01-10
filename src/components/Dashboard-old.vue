<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >จำนวน{{ localAnimal }}</span
            >
            <div class="text-900 font-medium text-xl">{{ data.Total }} ตัว</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-star-fill text-blue-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >{{ localAnimal }}แม่พันธุ์</span
            >
            <div class="text-900 font-medium text-xl">{{ data.Mom }} ตัว</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-star text-orange-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 lg:col-6 xl:col-2">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >{{ localAnimal }}สาว</span
            >
            <div class="text-900 font-medium text-xl">{{ data.Young }} ตัว</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-circle text-cyan-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-2">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >{{ localAnimal }}รุ่น</span
            >
            <div class="text-900 font-medium text-xl">
              {{ data.Child2 }} ตัว
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-circle text-cyan-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-2">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >ลูก{{ localAnimal }}</span
            >
            <div class="text-900 font-medium text-xl">{{data.Child}} ตัว</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-purple-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-circle-fill text-purple-500 text-xl"></i>
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
        <h5>สรุปจำนวนฟาร์ม</h5>
        <DataTable
          class="text-sm"
          :value="data.main"
          :paginator="true"
          :rows="10"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column
            field="AIZoneName"
            header="ศูนย์วิจัย"
            class="text-center"
          ></Column>
          <Column
            field="countFarm"
            header="จำนวนฟาร์ม"
            class="text-center"
          ></Column>
          <Column
            field="countAI"
            header="จำนวนการผสมเทียม"
            class="text-center"
          ></Column>
          <Column
            field="countTransferEmbryo"
            header="จำนวนย้ายฝากตัวอ่อน"
            class="text-center"
          ></Column>
          <Column
            field="countPregnancy"
            header="จำนวนตั้งท้อง"
            class="text-center"
          ></Column>
          <Column
            field="countGiveBirth"
            header="จำนวนคลอด"
            class="text-center"
          ></Column>
          <Column
            field="countAbort"
            header="จำนวนแท้ง"
            class="text-center"
          ></Column>
          <Column
            field="countGiveBirthAmount"
            header="จำนวนลูกเกิด"
            class="text-center"
          ></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/AppEventBus";
import ProductService from "../service/ProductService";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      data: [],
      localAnimal: null,
      curpage: 0,
      isLoading: false,
      valid: false,
      mom: null,
      young: null,
      child: null,
      child2: null,
      // Params
      params: {
        page: 1,
        size: 10,
      },
      table: {
        total: 0,
        last_page: 0,
      },
      permit: null,
      controller: new AbortController(),
      // products: null,
      // lineData: {
      // 	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      // 	datasets: [
      // 		{
      // 			label: 'Revenue',
      // 			data: [65, 59, 80, 81, 56, 55, 40],
      // 			fill: false,
      // 			backgroundColor: '#2f4860',
      // 			borderColor: '#2f4860',
      // 			tension: 0.4
      // 		},
      // 		{
      // 			label: 'Sales',
      // 			data: [28, 48, 40, 19, 86, 27, 90],
      // 			fill: false,
      // 			backgroundColor: '#00bb7e',
      // 			borderColor: '#00bb7e',
      // 			tension: 0.4
      // 		}
      // 	]
      // },
      // items: [
      // 	{ label: 'Add New', icon: 'pi pi-fw pi-plus' },
      // 	{ label: 'Remove', icon: 'pi pi-fw pi-minus' }
      // ],
      // lineOptions: null,
      //   data: [
      //     {
      //       1: "ศูนย์วิจัยฯ 01",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 02",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 03",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 04",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 05",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 06",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 07",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 08",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 09",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 10",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 11",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //   ],
    };
  },
  computed: {
    ...mapGetters({
      permission: "get_permission",
      animal_id: "animal_id",
      user: "user",
    }),
  },
  // productService: null,
  // themeChangeListener: null,
  mounted() {
    this.productService
      .getProductsSmall()
      .then((data) => (this.products = data));

    this.themeChangeListener = (event) => {
      if (event.dark) this.applyDarkTheme();
      else this.applyLightTheme();
    };
    EventBus.on("change-theme", this.themeChangeListener);

    if (this.isDarkTheme()) {
      this.applyDarkTheme();
    } else {
      this.applyLightTheme();
    }

    this.load();
  },
  beforeUnmount() {
    EventBus.off("change-theme", this.themeChangeListener);
  },
  created() {
    this.productService = new ProductService();
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    isDarkTheme() {
      return this.$appState.darkTheme === true;
    },
    applyLightTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      };
    },
    applyDarkTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: "#ebedef",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "rgba(160, 167, 181, .3)",
            },
          },
          y: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "rgba(160, 167, 181, .3)",
            },
          },
        },
      };
    },
    async load(event) {
      this.isLoading = true;
      // สำหรับเปลี่ยนหน้า
      if (event) {
        this.params.page = event.page + 1;
      }
      // กำหนด parameter
      // this.setParam();
      let url = "/report/report14";
      if (this.animal_id == 1) {
        url += "?AnimalTypeID=[1,2,41,42]";
        this.localAnimal = "โค";
      } else if (this.animal_id == 2) {
        url += "?AnimalTypeID=[3,4,43,44]";
        this.localAnimal = "กระบือ";
      } else if (this.animal_id == 3) {
        url += "?AnimalTypeID=[17,18,45,46]";
        this.localAnimal = "แพะ";
      }

      this.mom = "แม่" + this.localAnimal;
      this.young = this.localAnimal + "สาว";
      this.child2 = this.localAnimal + "รุ่น";
      this.child = "ลูก" + this.localAnimal;

      axios
        .get(url, {
          signal: this.controller.signal,
        })
        .then((response) => {
          let item = response.data;
          console.log(item);
          this.data = response.data;
          this.data.main = response.data.AiZone;
          //   this.data.main = response.data.Farms;
          //   this.data.sub = [
          //     {
          //       key: this.mom,
          //       value: item.Mom,
          //     },
          //     {
          //       key: this.young,
          //       value: item.Young,
          //     },
          //     {
          //       key: this.child2,
          //       value: item.Child2,
          //     },
          //     {
          //       key: this.child,
          //       value: item.Child,
          //     },
          //     {
          //       key: "รวม",
          //       value: item.Total,
          //     },
          //   ];
          //   let i = 1;

          //   this.data.main = this.data.main.map((key) => {
          //     return {
          //       FarmIdentificationNumber: key.FarmIdentificationNumber,
          //       FarmName: key.FarmName,
          //       mom: key.mom,
          //       young: key.young,
          //       child2: key.child2,
          //       child: key.child,
          //       total: key.total,
          //       no: i++,
          //     };
          //   });

          //   this.Chart.datasets = [
          //     {
          //       data: [item.Mom, item.Young, item.Child],
          //       backgroundColor: ["#FF6384", "#FFCE56", "#42A5F5"],
          //       hoverBackgroundColor: ["#FF6384", "#FFCE56", "#42A5F5"],
          //     },
          //   ];

          //   this.data.FarmCount = this.data.main.length;
        })
        .finally(() => {
          // console.log(this.data);
          this.isLoading = false;
        });
    },

    exportCSV() {
      this.$refs.dt.exportCSV();
    },
  },
};
</script>
