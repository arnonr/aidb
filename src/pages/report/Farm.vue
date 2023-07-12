<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="สรุปรายงานทะเบียนฟาร์ม ผท3" />

      <div class="card mb-5">
        <h1 class="text-xl mb-4 text-500">เครื่องมือช่วยค้นหา</h1>
        <div class="grid">
          <div class="col-12 sm:col-6 lg:col-4">
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
                v-model="sortBy.FarmIdentificationNumber"
                class="w-full"
                id="codeNumber"
              />
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label for="farmName" class="block text-600 text-sm font-bold mb-2">
              ชื่อฟาร์ม</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <InputText
                type="text"
                v-model="sortBy.FarmName"
                class="w-full"
                id="farmName"
              />
            </span>
          </div>
          <!-- <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedScheme"
              class="block text-600 text-sm font-bold mb-2"
            >
              ประเภทฟาร์ม</label
            >
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="ทั้งหมด"
              :options="dropdown.farmStatus"
              optionLabel="FarmStatusName"
              optionValue="FarmStatusID"
              v-model="sortBy.FarmStatusID"
            />
          </div> -->
          <div class="col-12 sm:col-6 lg:col-4">
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
              :options="dropdown.project"
              optionLabel="ProjectName"
              optionValue="ProjectID"
              :filter="true"
              v-model="sortBy.ProjectID"
              :virtualScrollerOptions="{ itemSize: 20 }"
            />
            <!-- <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="ทั้งหมด"
              :options="dropdown.project"
              optionLabel="ProjectName"
              optionValue="ProjectID"
              v-model="sortBy.ProjectID"
            /> -->
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchProvince"
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
              @change="filterResidenceAmphur($event)"
            >
              <template v-slot:loader="{ options }">
                <div class="flex align-items-center p-2" style="height: 38px">
                  <Skeleton
                    :width="options.even ? '60%' : '50%'"
                    height="1rem"
                  />
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchDistrict"
              class="block text-600 text-sm font-bold mb-2"
            >
              อำเภอ</label
            >
            <Dropdown
              class="w-full"
              v-model="sortBy.amphur"
              :options="amphur.data"
              optionLabel="AmphurName"
              optionValue="AmphurID"
              :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: onLazyLoad,
                itemSize: 30,
                showLoader: true,
                loading: loading,
                delay: 250,
              }"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
              @change="filterResidenceTumbol($event)"
            >
              <template v-slot:loader="{ options }">
                <div class="flex align-items-center p-2" style="height: 38px">
                  <Skeleton
                    :width="options.even ? '60%' : '50%'"
                    height="1rem"
                  />
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchSubDistrict"
              class="block text-600 text-sm font-bold mb-2"
            >
              ตำบล</label
            >
            <Dropdown
              class="w-full"
              v-model="sortBy.tumbol"
              :options="tumbol.data"
              optionLabel="TumbolName"
              optionValue="TumbolID"
              :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: onLazyLoad,
                itemSize: 30,
                showLoader: true,
                loading: loading,
                delay: 250,
              }"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
            >
              <template v-slot:loader="{ options }">
                <div class="flex align-items-center p-2" style="height: 38px">
                  <Skeleton
                    :width="options.even ? '60%' : '50%'"
                    height="1rem"
                  />
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedStatus"
              class="block text-600 text-sm font-bold mb-2"
            >
              สถานะฟาร์ม</label
            >
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="ทั้งหมด"
              :options="dropdown.farm_status"
              optionLabel="FarmStatusName"
              optionValue="FarmStatusID"
              v-model="sortBy.FarmStatusID"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              ช่วงวันที่ขึ้นทะเบียนฟาร์ม</label
            >
            <Calendar
              class="w-full"
              id="dateRange"
              v-model="dateRange"
              selectionMode="range"
              :manualInput="false"
              placeholder="ตั้งแต่วันที่ - จนถึงวันที่"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              ฟาร์มที่ไม่มีการเคลื่อนไหวข้อมูลมากกว่า (ปี)</label
            >
            <Dropdown
              class="w-full"
              id="selectedFarm"
              placeholder="ฟาร์มที่ไม่มีการเคลื่อนไหวข้อมูลมากกว่า (ปี)"
            />
          </div>
        </div>
      </div>

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
              สรุปภาพรวมของรายงานทะเบียนฟาร์ม ผท3 (จำนวนฟาร์ม : 10)
            </h5>
            <h6 class="text-center">วันที่ 01/01/2565 - 05/30/2565</h6>
          </div>
        </div>
        <div class="mt-5">
          <DataTable
            class="text-sm"
            :value="data"
            :paginator="true"
            :rows="10"
            ref="dt"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
            <Column field="id" header="รหัสฟาร์ม" class="text-center"></Column>
            <Column
              field="code"
              header="ชื่อฟาร์ม"
              class="text-center"
            ></Column>
            <Column
              field="s1"
              header="เจ้าของฟาร์ม"
              class="text-center"
            ></Column>
            <Column
              field="s2"
              header="บ้านเลขที่/หมู่"
              class="text-center"
            ></Column>
            <Column field="s3" header="หมู่บ้าน" class="text-center"></Column>
            <Column field="gender1" header="ตำบล" class="text-center"></Column>
            <Column field="gender2" header="อำเภอ" class="text-center"></Column>
            <Column
              field="gender3"
              header="จังหวัด"
              class="text-center"
            ></Column>
            <Column
              field="gender4"
              header="หน่วยงาน"
              class="text-center"
            ></Column>
            <Column
              field="gender5"
              header="วันที่บันทึกข้อมูล"
              class="text-center"
            ></Column>
            <Column
              field="gender6"
              header="ชื่อเจ้าหน้าที่"
              class="text-center"
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      data: [
        {
          id: "121232343",
          code: "สมบัติ ทองลา",
          s1: "คุณสมร สมเพชร",
          s2: "บ้านบุใหญ่",
          s3: "ทรายทอง",
          gender1: "โพธิ์ทอง",
          gender2: "โพธิ์ทอง",
          gender3: "อ่างทอง",
          gender4: "หน่วยผสมเทียมโพธิ์ทอง",
          gender5: "11/25/2019",
          gender6: "อานนท์",
        },
        {
          id: "121232343",
          code: "สมบัติ ทองลา",
          s1: "คุณสมร สมเพชร",
          s2: "บ้านบุใหญ่",
          s3: "ทรายทอง",
          gender1: "โพธิ์ทอง",
          gender2: "โพธิ์ทอง",
          gender3: "อ่างทอง",
          gender4: "หน่วยผสมเทียมโพธิ์ทอง",
          gender5: "11/25/2019",
          gender6: "อานนท์",
        },
        {
          id: "121232343",
          code: "สมบัติ ทองลา",
          s1: "คุณสมร สมเพชร",
          s2: "บ้านบุใหญ่",
          s3: "ทรายทอง",
          gender1: "โพธิ์ทอง",
          gender2: "โพธิ์ทอง",
          gender3: "อ่างทอง",
          gender4: "หน่วยผสมเทียมโพธิ์ทอง",
          gender5: "11/25/2019",
          gender6: "อานนท์",
        },
        {
          id: "121232343",
          code: "สมบัติ ทองลา",
          s1: "คุณสมร สมเพชร",
          s2: "บ้านบุใหญ่",
          s3: "ทรายทอง",
          gender1: "โพธิ์ทอง",
          gender2: "โพธิ์ทอง",
          gender3: "อ่างทอง",
          gender4: "หน่วยผสมเทียมโพธิ์ทอง",
          gender5: "11/25/2019",
          gender6: "อานนท์",
        },
        {
          id: "121232343",
          code: "สมบัติ ทองลา",
          s1: "คุณสมร สมเพชร",
          s2: "บ้านบุใหญ่",
          s3: "ทรายทอง",
          gender1: "โพธิ์ทอง",
          gender2: "โพธิ์ทอง",
          gender3: "อ่างทอง",
          gender4: "หน่วยผสมเทียมโพธิ์ทอง",
          gender5: "11/25/2019",
          gender6: "อานนท์",
        },
        {
          id: "121232343",
          code: "สมบัติ ทองลา",
          s1: "คุณสมร สมเพชร",
          s2: "บ้านบุใหญ่",
          s3: "ทรายทอง",
          gender1: "โพธิ์ทอง",
          gender2: "โพธิ์ทอง",
          gender3: "อ่างทอง",
          gender4: "หน่วยผสมเทียมโพธิ์ทอง",
          gender5: "11/25/2019",
          gender6: "อานนท์",
        },
        {
          id: "121232343",
          code: "สมบัติ ทองลา",
          s1: "คุณสมร สมเพชร",
          s2: "บ้านบุใหญ่",
          s3: "ทรายทอง",
          gender1: "โพธิ์ทอง",
          gender2: "โพธิ์ทอง",
          gender3: "อ่างทอง",
          gender4: "หน่วยผสมเทียมโพธิ์ทอง",
          gender5: "11/25/2019",
          gender6: "อานนท์",
        },
        {
          id: "121232343",
          code: "สมบัติ ทองลา",
          s1: "คุณสมร สมเพชร",
          s2: "บ้านบุใหญ่",
          s3: "ทรายทอง",
          gender1: "โพธิ์ทอง",
          gender2: "โพธิ์ทอง",
          gender3: "อ่างทอง",
          gender4: "หน่วยผสมเทียมโพธิ์ทอง",
          gender5: "11/25/2019",
          gender6: "อานนท์",
        },
        {
          id: "121232343",
          code: "สมบัติ ทองลา",
          s1: "คุณสมร สมเพชร",
          s2: "บ้านบุใหญ่",
          s3: "ทรายทอง",
          gender1: "โพธิ์ทอง",
          gender2: "โพธิ์ทอง",
          gender3: "อ่างทอง",
          gender4: "หน่วยผสมเทียมโพธิ์ทอง",
          gender5: "11/25/2019",
          gender6: "อานนท์",
        },
        {
          id: "121232343",
          code: "สมบัติ ทองลา",
          s1: "คุณสมร สมเพชร",
          s2: "บ้านบุใหญ่",
          s3: "ทรายทอง",
          gender1: "โพธิ์ทอง",
          gender2: "โพธิ์ทอง",
          gender3: "อ่างทอง",
          gender4: "หน่วยผสมเทียมโพธิ์ทอง",
          gender5: "11/25/2019",
          gender6: "อานนท์",
        },
      ],
      url: {
        province: "/province",
        amphur: "/amphur",
        tumbol: "/tumbol",
        project: "/project",
        farm_status: "/farm-status",
      },
      dropdown: [],
      sortBy: [],
      amphur: [],
      tumbol: [],

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
    filterResidenceAmphur($event) {
      let val = $event.value;
      if (val) {
        this.amphur.data = this.amphur.temp;
        this.amphur.data = this.amphur.data.filter(
          (item) => item.ProvinceID == val
        );
      } else {
        this.amphur.data = this.amphur.temp;
      }
    },
    filterResidenceTumbol($event) {
      let val = $event.value;
      if (val) {
        this.tumbol.data = this.tumbol.temp;
        this.tumbol.data = this.tumbol.data.filter(
          (item) => item.AmphurID == val
        );
      } else {
        this.tumbol.data = this.tumbol.temp;
      }
    },
    load() {
      axios
        .get(this.url.amphur, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.amphur.data = res.data.rows;
          this.amphur.temp = this.amphur.data;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.tumbol, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.tumbol.data = res.data.rows;
          this.tumbol.temp = this.tumbol.data;
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

      axios
        .get(this.url.project, { signal: this.controller.signal })
        .then((res) => {
          this.dropdown.project = res.data.rows;
          this.dropdown.project_total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(this.url.farm_status, { signal: this.controller.signal })
        .then((res) => {
          this.dropdown.farm_status = res.data.rows;
          this.dropdown.farm_status_total = res.data.total;
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
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
