<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle
        :title="'รายงานประวัติ' + localAnimal + 'เพศเมีย'"
        :pages="breadcrumb"
      />

      <div class="grid">
        <div class="col-12 xl:col-6">
          <div class="card">
            <h5>จำนวนประชากร{{ localAnimal }}เพศเมีย</h5>
            <DataTable :value="data.sub" :rows="10" responsiveLayout="scroll">
              <Column
                field="key"
                header="#"
                class="text-center"
                style="width: 35%"
              >
              </Column>
              <Column
                field="value"
                header="ชื่อฟาร์ม"
                class="text-center"
                style="width: 35%"
              >
              </Column>
            </DataTable>
          </div>
        </div>
        <div class="grid col-12 xl:col-6">
          <div class="col-12 xl:col-12">
            <div class="card">
              <h5>จำนวน{{ localAnimal }}</h5>
              <Chart
                type="pie"
                :data="Chart"
                :options="pieOptions"
                style="width: 100%"
                class="w-full"
              />
            </div>
          </div>
        </div>
        <div class="col-12 xl:col-12">
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
                <h5 class="text-center">
                  สรุปภาพรวมของรายงานประวัติโคเพศเมีย (จำนวนฟาร์ม :{{
                    data.FarmCount
                  }})
                </h5>
                <!-- <h6 class="text-center">วันที่ 01/01/2565 - 05/30/2565</h6> -->
              </div>
            </div>
            <DataTable
              class="text-sm"
              :value="data.main"
              :paginator="true"
              :exportable="true"
              ref="dt"
              :rows="10"
              :loading="isLoading"
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              :rowsPerPageOptions="[10, 20, 50]"
              responsiveLayout="scroll"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            >
              <Column
                field="no"
                header="ลำดับ"
                class="text-center"
                exportFooter="&#8203;"
                :sortable="true"
              ></Column>
              <Column
                field="FarmIdentificationNumber"
                header="หมายเลขฟาร์ม"
                class="text-center"
                exportFooter="&#8203;"
              ></Column>
              <Column
                field="FarmName"
                header="ชื่อฟาร์ม"
                class="text-center"
                exportFooter="&#8203;"
              ></Column>
              <Column
                field="mom"
                :header="mom"
                :sortable="true"
                class="text-center"
                exportFooter="&#8203;"
              ></Column>
              <Column
                field="young"
                :header="young"
                :sortable="true"
                class="text-center"
                exportFooter="&#8203;"
              ></Column>
              <Column
                field="child"
                :header="child"
                :sortable="true"
                class="text-center"
                exportFooter="&#8203;"
              ></Column>
              <Column
                field="total"
                header="จำนวนโคทั้งหมด"
                class="text-center"
                exportFooter="&#8203;"
                :sortable="true"
              ></Column>

              <template #empty> ไม่พบข้อมูล </template>
              <template #loading>
                <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
              </template>
            </DataTable>
          </div>
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
  themeChangeListener: null,
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
      Chart: {
        labels: [],
        datasets: [],
        // [
        //   {
        //     data: [300, 100],
        //     backgroundColor: ["#FF6384", "#FFCE56"],
        //     hoverBackgroundColor: ["#FF6384", "#FFCE56"],
        //   },
        // ],
      },
      ChartItem: [],
      data: [],
      // หน้า page
      curpage: 0,
      isLoading: false,
      valid: false,
      mom: null,
      young: null,
      child: null,
      // Params
      params: {
        page: 1,
        size: 10,
      },
      table: {
        total: 0,
        last_page: 0,
      },
      //  cancel requests      permit: null,

      permit: null,
      controller: new AbortController(),
    };
  },

  async mounted() {
    this.load();
  },
  methods: {
    async load(event) {
      this.isLoading = true;
      // สำหรับเปลี่ยนหน้า
      if (event) {
        this.params.page = event.page + 1;
      }
      // กำหนด parameter
      // this.setParam();
      let url = "/report/report1";
      if (this.animal_id == 1) {
        url += "?AnimalTypeID=[1,2]";
        this.localAnimal = "โค";
        this.mom = "แม่" + this.localAnimal;
        this.young = "สาว" + this.localAnimal;
        this.child = "ลูก" + this.localAnimal;
        this.Chart.labels = ["แม่โค", "โคสาว", "ลูกโค"];
      } else if (this.animal_id == 2) {
        url += "?AnimalTypeID=[3,4]";
        this.localAnimal = "กระบือ";
        this.mom = "แม่" + this.localAnimal;
        this.young = "สาว" + this.localAnimal;
        this.child = "ลูก" + this.localAnimal;
        this.Chart.labels = ["แม่กระบือ", "กระบือสาว", "ลูกกระบือ"];
      } else if (this.animal_id == 3) {
        url += "?AnimalTypeID=[17,18]";
        this.localAnimal = "แพะ";
        this.mom = "แม่" + this.localAnimal;
        this.young = "สาว" + this.localAnimal;
        this.child = "ลูก" + this.localAnimal;
        this.Chart.labels = ["แม่แพะ", "แพะสาว", "ลูกแพะ"];
      }

      axios
        .get(url, {
          signal: this.controller.signal,
        })
        .then((response) => {
          let item = response.data;
          this.data.main = response.data.Farms;

          this.data.sub = [
            {
              key: this.mom,
              value: item.Mom,
            },
            {
              key: this.young,
              value: item.Young,
            },
            {
              key: this.child,
              value: item.Child,
            },
            {
              key: "รวม",
              value: item.Total,
            },
          ];
          let i = 1;

          this.data.main = this.data.main.map((key) => {
            return {
              FarmIdentificationNumber: key.FarmIdentificationNumber,
              FarmName: key.FarmName,
              mom: key.mom,
              young: key.young,
              child: key.child,
              total: key.total,
              no: i++,
            };
          });

          this.Chart.datasets = [
            {
              data: [item.Mom, item.Young, item.Child],
              backgroundColor: ["#FF6384", "#FFCE56", "#42A5F5"],
              hoverBackgroundColor: ["#FF6384", "#FFCE56", "#42A5F5"],
            },
          ];

          this.data.FarmCount = this.data.main.length;
        })
        .finally(() => {
          // console.log(this.data);
          this.isLoading = false;
        });
    },

    // sort table
    sort($event) {
      // console.log($event);
      if ($event.sortField !== "show_id") {
        if ($event.sortOrder == 1) {
          this.params.orderBy = "asc";
        } else {
          this.params.orderBy = "desc";
        }
        this.params.orderByField = $event.sortField;
        this.load();
      }
    },
    // page change
    page($event) {
      this.curpage = $event.page + 1;
      this.load();
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    unmounted() {
      this.controller.abort();
    },
  },
};
</script>
