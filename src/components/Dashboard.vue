<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">จำนวนโค</span>
            <div class="text-900 font-medium text-xl">230,000 ตัว</div>
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
            <span class="block text-500 font-medium mb-3">แม่โค</span>
            <div class="text-900 font-medium text-xl">100,000 ตัว</div>
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
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">โคสาว</span>
            <div class="text-900 font-medium text-xl">100,000 ตัว</div>
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
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">ลูกโค</span>
            <div class="text-900 font-medium text-xl">30,000 ตัว</div>
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
            @click="test()"
            class="p-button-success mr-3"
          />
        </div>
        <h5>สรุปจำนวนฟาร์ม</h5>
        <DataTable
          class="text-sm"
          :value="data"
          :paginator="true"
          :rows="10"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column field="1" header="ศูนย์วิจัย" class="text-center"></Column>
          <Column field="2" header="จังหวัด" class="text-center"></Column>
          <Column field="3" header="จำนวนฟาร์ม" class="text-center"></Column>
          <Column
            field="4"
            header="จำนวนการผสมเทียม"
            class="text-center"
          ></Column>
          <Column
            field="5"
            header="จำนวนย้ายฝากตัวอ่อน"
            class="text-center"
          ></Column>
          <Column field="6" header="จำนวนตั้งท้อง" class="text-center"></Column>
          <Column field="7" header="จำนวนคลอด" class="text-center"></Column>
          <Column field="8" header="จำนวนแท้ง" class="text-center"></Column>
          <Column field="9" header="จำนวนลูกเกิด" class="text-center"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/AppEventBus";
import ProductService from "../service/ProductService";

export default {
  data() {
    return {
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
      data: [
        {
          1: "ศูนย์วิจัยฯ 01",
          2: "สุโขทัย",
          3: "20",
          4: "1,000",
          5: "250",
          6: "1,150",
          7: "1,120",
          8: "30",
          9: "2,000",
        },
        {
          1: "ศูนย์วิจัยฯ 02",
          2: "สุโขทัย",
          3: "20",
          4: "1,000",
          5: "250",
          6: "1,150",
          7: "1,120",
          8: "30",
          9: "2,000",
        },
        {
          1: "ศูนย์วิจัยฯ 03",
          2: "สุโขทัย",
          3: "20",
          4: "1,000",
          5: "250",
          6: "1,150",
          7: "1,120",
          8: "30",
          9: "2,000",
        },
        {
          1: "ศูนย์วิจัยฯ 04",
          2: "สุโขทัย",
          3: "20",
          4: "1,000",
          5: "250",
          6: "1,150",
          7: "1,120",
          8: "30",
          9: "2,000",
        },
        {
          1: "ศูนย์วิจัยฯ 05",
          2: "สุโขทัย",
          3: "20",
          4: "1,000",
          5: "250",
          6: "1,150",
          7: "1,120",
          8: "30",
          9: "2,000",
        },
        {
          1: "ศูนย์วิจัยฯ 06",
          2: "สุโขทัย",
          3: "20",
          4: "1,000",
          5: "250",
          6: "1,150",
          7: "1,120",
          8: "30",
          9: "2,000",
        },
        {
          1: "ศูนย์วิจัยฯ 07",
          2: "สุโขทัย",
          3: "20",
          4: "1,000",
          5: "250",
          6: "1,150",
          7: "1,120",
          8: "30",
          9: "2,000",
        },
        {
          1: "ศูนย์วิจัยฯ 08",
          2: "สุโขทัย",
          3: "20",
          4: "1,000",
          5: "250",
          6: "1,150",
          7: "1,120",
          8: "30",
          9: "2,000",
        },
        {
          1: "ศูนย์วิจัยฯ 09",
          2: "สุโขทัย",
          3: "20",
          4: "1,000",
          5: "250",
          6: "1,150",
          7: "1,120",
          8: "30",
          9: "2,000",
        },
        {
          1: "ศูนย์วิจัยฯ 10",
          2: "สุโขทัย",
          3: "20",
          4: "1,000",
          5: "250",
          6: "1,150",
          7: "1,120",
          8: "30",
          9: "2,000",
        },
        {
          1: "ศูนย์วิจัยฯ 11",
          2: "สุโขทัย",
          3: "20",
          4: "1,000",
          5: "250",
          6: "1,150",
          7: "1,120",
          8: "30",
          9: "2,000",
        },
      ],
    };
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
  },
};
</script>
