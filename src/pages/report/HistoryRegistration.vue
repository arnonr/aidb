<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle :title="'ประวัติแม่' + localAnimal + 'รายตัว'" />
      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">หมายเลขประจำตัวสัตว์</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />
          <Dropdown
            class="w-full"
            :options="animals"
            optionLabel="AnimalFullname"
            optionValue="AnimalID"
            placeholder="เลือกสัตว์"
            v-model="search.AnimalID"
            :filter="true"
            :virtualScrollerOptions="{ itemSize: 38 }"
            emptyMessage="ไม่มีข้อมูล"
            emptyFilterMessage="ไม่พบข้อมูล"
          />

          <!-- <InputText
            class="w-full"
            type="text"
            v-model="search"
            placeholder="ค้นหา"
          /> -->
        </span>
      </div>

      <div v-if="search" class="grid">
        <div class="col-12 xl:col-6">
          <div class="card">
            <h5>ข้อมูลทั่วไป</h5>
            <DataTable :value="data.general" responsiveLayout="scroll">
              <Column field="key" class="text-center" style="width: 35%" />
              <Column field="value" class="text-center" style="width: 35%" />
            </DataTable>
          </div>
        </div>
        <div class="grid col-12 xl:col-6">
          <div class="col-12 xl:col-12">
            <div class="card">
              <h5>สายพันธุ์{{ localAnimal }}</h5>
              <DataTable :value="data.breed" responsiveLayout="scroll">
                <Column field="key" class="text-center" style="width: 35%">
                </Column>
                <Column field="value" class="text-center" style="width: 35%">
                </Column>
              </DataTable>
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
                <h5 class="text-center">ข้อมูลการผสม</h5>
                <!-- <h6 class="text-center">วันที่ 01/01/2565 - 05/30/2565</h6> -->
              </div>
            </div>
            <DataTable
              class="text-sm"
              :value="data.ai"
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
                field="PAR"
                header="รอบที่"
                class="text-center"
                exportFooter="&#8203;"
              ></Column>
              <Column
                field="TimeNo"
                header="ครั้งที่ผสม"
                class="text-center"
                exportFooter="&#8203;"
              ></Column>
              <Column
                field="ThaiAIDate"
                header="วันผสม"
                :sortable="true"
                class="text-center"
                exportFooter="&#8203;"
              ></Column>
              <Column
                field="SemenNumber"
                header="น้ำเชื้อ"
                :sortable="true"
                class="text-center"
                exportFooter="&#8203;"
              ></Column>
              <Column
                field="Dose"
                header="Dose"
                :sortable="true"
                class="text-center"
                exportFooter="&#8203;"
              ></Column>
              <Column
                field="AIStatusName"
                header="ผลการผสมเทียม"
                class="text-center"
                exportFooter="&#8203;"
                :sortable="true"
              ></Column>
              <Column
                field="PregnancyCheckup"
                header="ตรวจท้อง"
                class="text-center"
                exportFooter="&#8203;"
                :sortable="true"
              ></Column>
              <Column
                field="ThaiGiveBirthDate"
                header="วันคลอด"
                class="text-center"
                exportFooter="&#8203;"
                :sortable="true"
              ></Column>
              <Column
                field="ChildGender"
                header="เพศลูก"
                class="text-center"
                exportFooter="&#8203;"
                :sortable="true"
              ></Column>
              <Column
                field="ResponsibilityStaffName"
                header="เจ้าหน้าที่"
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

      <!-- <div class="card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-12">
            <div class="col-12 text-right">
              <Button
                label="Export To Excel"
                @click="exportCSV($event)"
                class="p-button-success mr-3"
              />
            </div>
            <h5 class="text-center">
              สรุปภาพรวมของรายงานทะเบียนติดตามงาน(ผท.6)
            </h5>
            <h6 class="text-center">วันที่ 01/01/2565 - 05/30/2565</h6>

            <span>
              ผลการติดตาม บราห์มันแดง: 114 รายการ | บราห์มันเทา: 86 รายการ |
              ชาโรเลห์: 1 รายการ | แองกัส 24 รายการ<br />
              จำนวนทะเบียนติดตามงาน 235 รายการ | ผลการติดตาม ท้อง: 7 รายการ |
              ไม่ท้อง: 1 รายการ | ผสมซ้ำ 5 รายการ | ไม่พบข้อมูล : 219 รายการ
            </span>
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
            <Column field="s2" header="รหัสอำเภอ" class="text-center"></Column>
            <Column field="s3" header="ตำบล" class="text-center"></Column>
            <Column
              field="gender1"
              header="หมายเลข"
              class="text-center"
            ></Column>
            <Column
              field="gender2"
              header="ชื่อสัตว์"
              class="text-center"
            ></Column>
            <Column
              field="gender3"
              header="ชนิดสัตว์"
              class="text-center"
            ></Column>
            <Column
              field="gender4"
              header="วันผสมเทียม"
              class="text-center"
            ></Column>
            <Column
              field="gender5"
              header="ท้องที่"
              class="text-center"
            ></Column>
            <Column
              field="gender6"
              header="ครั้งที่"
              class="text-center"
            ></Column>
            <Column
              field="gender7"
              header="น้ำเชื้อ"
              class="text-center"
            ></Column>
            <Column
              field="gender8"
              header="วันที่บันทึกข้อมูล"
              class="text-center"
            ></Column>
            <Column
              field="gender9"
              header="ชื่อเจ้าหน้าที่"
              class="text-center"
            ></Column>
            <Column
              field="gender10"
              header="ผลการติดตาม"
              class="text-center"
            ></Column>
          </DataTable>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import _ from "lodash";

export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      animalInfo: "animalInfo",
      tabAnimal: "tabAnimal",
      permission: "get_permission",
    }),
  },
  data() {
    return {
      data: [],
      animals: [],

      search: {
        AnimalID: null,
      },
      url: {
        report2: "/report/report2",
      },
      localAnimal: null,
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
    this.fetchAnimal();
    this.load();
  },
  watch: {
    search: _.debounce(function () {
      this.load();
    }, 500),
    "search.AnimalID"(val) {
      if (val) {
        this.load();
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
  },
  methods: {
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    load() {
      let url = "/report/report2";

      console.log(this.search.AnimalID);

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
          params: {
            AnimalID: this.search.AnimalID,
          },
          signal: this.controller.signal,
        })
        .then((res) => {
          if (this.search) {
            // console.log(res.data);
            if (res.data != null) {
              let i = 1;
              let item = res.data;

              this.data.ai = res.data.ai.map((key) => {
                if (key.PAR == null) {
                  key.PAR = "-";
                }
                return {
                  PAR: key.PAR,
                  TimeNo: key.TimeNo || "-",
                  ThaiAIDate: key.ThaiAIDate || "-",
                  SemenNumber: key.SemenNumber || "-",
                  Dose: key.Dose || "-",
                  AIStatusName: key.AIStatusName || "-",
                  PregnancyCheckup: key.PregnancyCheckup || "-",
                  ThaiGiveBirthDate: key.ThaiGiveBirthDate || "-",
                  ChildGender: key.ChildGender || "-",
                  ResponsibilityStaffName: key.ResponsibilityStaffName || "-",
                  no: i++,
                };
              });
              console.log(this.data.ai);

              this.data.general = [
                {
                  key: "หมายเลข" + this.localAnimal,
                  value: item.AnimalEarID || "-",
                },
                {
                  key: "RFID",
                  value: item.AnimalMicrochip || "-",
                },
                {
                  key: "ชื่อ" + this.localAnimal,
                  value: item.AnimalName || "-",
                },
                {
                  key: "วันเกิด",
                  value: item.ThaiAnimalBirthDate || "-",
                },
                {
                  key: "สถานะ" + this.localAnimal,
                  value: item.AnimalStatus || "-",
                },
                {
                  key: "สถานะการผลิต",
                  value: item.ProductionStatus || "-",
                },
                {
                  key: "รอบที่ปัจจุบัน",
                  value: item.AnimalPar || "-",
                },
                // {
                //   key: "รอบการให้นมปัจจุบัน",
                //   value: item.AnimalSource || "-",
                // },
                {
                  key: "แหล่งที่มา",
                  value: item.AnimalSource || "-",
                },
                // {
                //   key: "วันที่เข้าฝูง",
                //   value: item.Mom,
                // },
                {
                  key: "ฟาร์ม",
                  value: item.FarmName || "-",
                },
                {
                  key: "ทะเบียนฟาร์ม",
                  value: item.FarmIdentificationNumber || "-",
                },
              ];

              this.data.breed = [
                {
                  key: "สายพันธุ์",
                  value: item.AnimalBreedAll || "-",
                },
                {
                  key: "พ่อ",
                  value: item.AnimalFatherEarID || "-",
                },
                {
                  key: "พันธุ์",
                  value: item.AnimalFatherBreedAll || "-",
                },
                {
                  key: "แม่",
                  value: item.AnimalMotherEarID || "-",
                },
                {
                  key: "พันธุ์",
                  value: item.AnimalMotherBreedAll || "-",
                },
              ];
            }
          } else {
            this.data = [];
          }
        })
        .catch(() => {
          this.data = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    fetchAnimal() {
      //   AnimalAll
      let urlAnimal = "/animal";
      let AnimalTypeID = "";

      if (this.animal_id == 1) {
        AnimalTypeID = "[1,2,41,42]";
        this.localAnimal = "โค";
      } else if (this.animal_id == 2) {
        AnimalTypeID = "[3,4,43,44]";
        this.localAnimal = "กระบือ";
      } else if (this.animal_id == 3) {
        AnimalTypeID = "[17,18,45,46]";
        this.localAnimal = "แพะ";
      }

      axios
        .get(urlAnimal, {
          params: {
            includeAll: false,
            AnimalSexID: 2,
            AnimalTypeID: AnimalTypeID,
          },
          signal: this.controller.signal,
        })
        .then((res) => {
          console.log(res.data.rows);
          this.animals = res.data.rows.map((x) => {
            return {
              AnimalID: x.AnimalID,
              AnimalFullname: x.AnimalEarID + ", " + x.AnimalName,
            };
          });
        })
        .catch(() => {
          this.data = [];
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
