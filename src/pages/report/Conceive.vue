<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="รายงานการตั้งท้อง" />
      <div class="card">
        <h1 class="text-xl mb-5">เครื่องมือกรองรายงาน</h1>
        <div class="grid">
          <!--  -->
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              ชื่อหน่วยงาน</label
            >
            <InputText
              v-model="sortBy.Organization"
              type="text"
              class="w-full"
              placeholder="ชื่อหน่วยงาน"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="animal_id"
              class="block text-600 text-sm font-bold mb-2"
            >
              พื้นที่เขตปศุสัตว์</label
            >
            <Dropdown
              class="w-full"
              v-model="sortBy.organization_zone"
              :options="dropdown.organization_zone"
              optionLabel="OrganizationZoneName"
              optionValue="OrganizationZoneID"
              :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: onLazyLoad,
                itemSize: dropdown.organization_zone_total,
                showLoader: true,
                loading: loading,
                delay: 250,
              }"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
              @change="load"
            >
              <template v-slot:loader="{ options }">
                <div class="flex align-items-center p-2" style="height: 38px">
                  <Skeleton
                    :width="options.even ? '60%' : '50%'"
                    height="1rem"
                  />
                </div>
              </template>

              <!-- <template #option="slotProps">
                <div class="p-dropdown-car-option">
                  <span
                    >{{ slotProps.option.FarmIdentificationNumber }} |
                    {{ slotProps.option.FarmName }}
                  </span>
                </div>
              </template> -->
            </Dropdown>
            <!-- <Dropdown class="w-full" id="selectedFarm" placeholder="ทั้งหมด" /> -->
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              จังหวัด</label
            >
            <Dropdown
              class="w-full"
              v-model="sortBy.province"
              :options="dropdown.province"
              optionLabel="ProvinceName"
              optionValue="ProvinceID"
              :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: onLazyLoad,
                itemSize: dropdown.province_total,
                showLoader: true,
                loading: loading,
                delay: 250,
              }"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
              @change="load"
            >
              <template v-slot:loader="{ options }">
                <div class="flex align-items-center p-2" style="height: 38px">
                  <Skeleton
                    :width="options.even ? '60%' : '50%'"
                    height="1rem"
                  />
                </div>
              </template>

              <!-- <template #option="slotProps">
                <div class="p-dropdown-car-option">
                  <span
                    >{{ slotProps.option.FarmIdentificationNumber }} |
                    {{ slotProps.option.FarmName }}
                  </span>
                </div>
              </template> -->
            </Dropdown>
          </div>

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              ช่วงวันที่</label
            >
            <Calendar
              class="w-full"
              id="dateRange"
              v-model="sortBy.dateRange"
              selectionMode="range"
              :manualInput="false"
              placeholder="ตั้งแต่วันที่ - จนถึงวันที่"
            />
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
        <h5 class="text-center">รายงานการตั้งท้อง (แบ่งตามประเภทหน่วยงาน)</h5>
        <h6 class="text-center">วันที่ 01/01/2565 - 05/30/2565</h6>
        <DataTable
          :value="data"
          :rows="10"
          :paginator="false"
          responsiveLayout="scroll"
          ref="dt"
        >
          <Column
            field="organizationCode"
            header="รหัสหน่วย"
            class="text-center"
            style="width: 10%"
          >
          </Column>
          <Column
            field="organizationName"
            header="ชื่อหน่วย"
            class="text-center"
            style="width: 20%"
          >
          </Column>
          <Column
            field="aiTime"
            header="ระเบียนทั้งหมด"
            class="text-center"
            style="width: 20%"
          >
          </Column>
          <Column
            field="tongTime"
            header="ท้อง"
            class="text-center"
            style="width: 10%"
          >
          </Column>
          <Column
            field="percentTime"
            header="(%)"
            class="text-center"
            style="width: 20%"
          >
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
// import { reactive } from "vue";

import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";

export default {
  themeChangeListener: null,
  components: {
    PageTitle,
  },
  data() {
    return {
      data: [
        {
          organizationCode: "100300",
          organizationName: "หน่วยหนองจอก",
          aiTime: "0",
          tongTime: "0",
          percentTime: "0",
        },
        {
          organizationCode: "100400",
          organizationName: "หน่วยบางเขน",
          aiTime: "371",
          tongTime: "37",
          percentTime: "9.9730458221024",
        },
        {
          organizationCode: "100500",
          organizationName: "หน่วยบางกะปิ",
          aiTime: "63",
          tongTime: "5",
          percentTime: "7.9365079365079",
        },
      ],
      url: {
        organization_zone: "/organization-zone",
        province: "/province",
      },
      dropdown: [],
      sortBy: [],

      isLoading: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,

      controller: new AbortController(),
    };
  },
  loadLazyTimeout: null,

  mounted() {
    this.load();
  },

  methods: {
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    load() {
      axios
        .get(this.url.organization_zone, { signal: this.controller.signal })
        .then((res) => {
          this.dropdown.organization_zone = res.data.rows;
          this.dropdown.organization_zone_total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.province, { signal: this.controller.signal })
        .then((res) => {
          this.dropdown.province = res.data.rows;
          this.dropdown.province_total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    onLazyLoad() {
      this.loading = true;

      if (this.loadLazyTimeout) {
        clearTimeout(this.loadLazyTimeout);
      }

      this.loadLazyTimeout = setTimeout(() => {
        this.loading = false;
      }, Math.random() * 1000 + 250);
    },
  },

  unmounted() {
    this.controller.abort();
  },
  // setup() {
  //   const data = reactive([
  //     {
  //       organizationCode: "100300",
  //       organizationName: "หน่วยหนองจอก",
  //       aiTime: "0",
  //       tongTime: "0",
  //       percentTime: "0",
  //     },
  //     {
  //       organizationCode: "100400",
  //       organizationName: "หน่วยบางเขน",
  //       aiTime: "371",
  //       tongTime: "37",
  //       percentTime: "9.9730458221024",
  //     },
  //     {
  //       organizationCode: "100500",
  //       organizationName: "หน่วยบางกะปิ",
  //       aiTime: "63",
  //       tongTime: "5",
  //       percentTime: "7.9365079365079",
  //     },
  //   ]);
  //   return {
  //     data,
  //   };
  // },
  // data() {
  //   return {
  //     pieData1: {
  //       labels: ["A", "B"],
  //       datasets: [
  //         {
  //           data: [300, 100],
  //           backgroundColor: ["#FF6384", "#FFCE56"],
  //           hoverBackgroundColor: ["#FF6384", "#FFCE56"],
  //         },
  //       ],
  //     },
  //     pieData2: {
  //       labels: ["A", "B"],
  //       datasets: [
  //         {
  //           data: [300, 500],
  //           backgroundColor: ["#FF6384", "#FFCE56"],
  //           hoverBackgroundColor: ["#FF6384", "#FFCE56"],
  //         },
  //       ],
  //     },
  //   };
  // },
};
</script>
