<template>
  <div class="grid">
    <PageTitle title="ข้อมูลคัดจำหน่าย : รายฝูง" :pages="breadcrumb" />
    <!--  -->
    <div class="card mb-5">
      <div class="grid">
        <div class="col-12">
          <h1 class="text-xl mb-4 text-500">
            เครื่องมือช่วยค้นหาข้อมูลคัดจำหน่าย (รายฝูง)
          </h1>
        </div>
        <!--  -->
        <div class="grid">
          <div class="col-12 sm:col-6 lg:col-6">
            <label for="AIZoneID" class="block text-600 text-sm font-bold mb-2">
              ศูนย์วิจัย</label
            >
            <Dropdown
              class="w-full"
              v-model="search.AIZoneID"
              :options="dropdown.AIZones"
              optionLabel="AIZoneName"
              optionValue="AIZoneID"
              :disabled="isSelectAIZoneDisabled"
              :filter="true"
              :showClear="true"
              placeholder="-- โปรดเลือกศูนย์วิจัย --"
            >
            </Dropdown>
          </div>

          <div class="col-12 sm:col-6 lg:col-6">
            <label
              for="searchOrganizationZoneID"
              class="block text-600 text-sm font-bold mb-2"
            >
              เขตพื้นที่ปศุสัตว์</label
            >
            <Dropdown
              class="w-full"
              v-model="search.OrganizationZoneID"
              :options="dropdown.OrganizationZones"
              optionLabel="OrganizationZoneName"
              optionValue="OrganizationZoneID"
              :disabled="isSelectOrganizationZoneDisabled"
              :filter="true"
              :showClear="true"
              placeholder="-- เลือกเขตพื้นที่ปศุสัตว์ --"
            >
            </Dropdown>
          </div>

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchProvinceID"
              class="block text-600 text-sm font-bold mb-2"
            >
              จังหวัด</label
            >
            <Dropdown
              class="w-full"
              v-model="search.ProvinceID"
              :options="dropdown.Provinces"
              optionLabel="ProvinceName"
              optionValue="ProvinceID"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
            >
            </Dropdown>
          </div>

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchAmphurID"
              class="block text-600 text-sm font-bold mb-2"
            >
              อำเภอ</label
            >
            <Dropdown
              class="w-full"
              v-model="search.AmphurID"
              :options="dropdown.Amphurs"
              optionLabel="AmphurName"
              optionValue="AmphurID"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
            >
            </Dropdown>
          </div>

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchTumbolID"
              class="block text-600 text-sm font-bold mb-2"
            >
              ตำบล</label
            >
            <Dropdown
              class="w-full"
              v-model="search.TumbolID"
              :options="dropdown.Tumbols"
              optionLabel="TumbolName"
              optionValue="TumbolID"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
            >
            </Dropdown>
          </div>

          <div class="col-12 sm:col-12 lg:col-6">
            <label
              for="searchOrganizationID"
              class="block text-600 text-sm font-bold mb-2"
            >
              ประเภทหน่วยงาน</label
            >
            <Dropdown
              :showClear="true"
              class="w-full"
              placeholder="ทั้งหมด"
              optionLabel="OrganizationTypeName"
              optionValue="OrganizationTypeID"
              :virtualScrollerOptions="{ itemSize: 38 }"
              :options="dropdown.OrganizationTypes"
              :filter="true"
              v-model="search.OrganizationTypeID"
            />
          </div>

          <div class="col-12 sm:col-12 lg:col-6">
            <label
              for="searchOrganizationID"
              class="block text-600 text-sm font-bold mb-2"
            >
              หน่วยงาน</label
            >
            <Dropdown
              :showClear="true"
              class="w-full"
              placeholder="ทั้งหมด"
              optionLabel="OrganizationFull"
              optionValue="OrganizationID"
              :virtualScrollerOptions="{ itemSize: 38 }"
              :options="dropdown.Organizations"
              :filter="true"
              v-model="search.OrganizationID"
            />
          </div>

      
          <div class="col-12 sm:col-6 lg:col-6">
            <label
              for="FarmerFullName"
              class="block text-600 text-sm font-bold mb-2"
            >
              ชื่อนามสกุลเกษตรกร
            </label>
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <InputText
                type="text"
                class="w-full"
                v-model="search.FarmerFullName"
              />
            </span>
          </div>

         


          <!-- 
            <div class="col-12 sm:col-6 lg:col-6">
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
                :options="selection.farmStatus"
                optionLabel="FarmStatusName"
                optionValue="FarmStatusID"
                v-model="filtered.FarmStatusID"
              />
            </div> -->

          <div class="col-6 sm:col-6 lg:col-6">
            <label
              for="searchSubDistrict"
              class="block text-600 text-sm font-bold mb-2"
            >
              โครงการ</label
            >
            <MultiSelect
              v-model="search.ProjectIDArray"
              class="w-full"
              :options="dropdown.Projects"
              optionLabel="ProjectName"
              optionValue="ProjectID"
              placeholder="เลือกโครงการ"
              display="chip"
            />
          </div>

          <div class="col-12 sm:col-12 lg:col-12">
            <label
              for="searchSubDistrict"
              class="block text-600 text-sm font-bold mb-2"
            >
              ฟาร์ม</label
            >
            <Dropdown
              class="w-full"
              v-model="search.FarmID"
              :options="dropdown.Farms"
              optionLabel="Fullname"
              optionValue="FarmID"
              :filter="true"
              :showClear="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
              placeholder="เลือกหมายเลขฟาร์ม"
            >
            </Dropdown>
          </div>

          <!-- <div class="col-12 sm:col-6 lg:col-6">
            <label
              for="searchFarmStatus"
              class="block text-600 text-sm font-bold mb-2"
            >
              สถานะฟาร์ม</label
            >
            <Dropdown
              class="w-full"
              v-model="search.FarmStatusID"
              :options="dropdown.FarmStatuses"
              optionLabel="FarmStatusName"
              optionValue="FarmStatusID"
              :filter="true"
              :showClear="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
              placeholder="เลือกสถานะฟาร์ม"
            >
            </Dropdown>
          </div> -->
        </div>
      </div>
    </div>

    <!--  -->
    <div class="col-12">
      <div v-if="this.search.FarmID" class="card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">
              รายการข้อมูลสุขภาพ : ฉีดวัคซีน
            </h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <!-- <Button label="เพิ่มข้อมูลฉีดวัคซีน" icon="pi pi-plus" class="w-full md:w-auto" 
            @click="add" 
            v-if="permit[0].IsAdd"/> -->
            <Button
              label="เพิ่มข้อมูลฉีดวัคซีน"
              icon="pi pi-plus"
              class="w-full md:w-auto"
              @click="add"
            />
          </div>
        </div>

        <div class="mt-5">
          <DataTable
            class="text-sm"
            :value="data"
            :loading="isLoading"
            @sort="sort($event)"
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
            </Column>

            <Column header="จัดการ" class="text-center">
              <template #body="slotProps">
                <SplitButton
                  @click="edit(slotProps.data.VaccineActivityID)"
                  label="แก้ไข"
                  icon="pi pi-pencil"
                  class="p-button-sm p-button-outlined p-button-warning"
                  :model="getItems(slotProps.data.VaccineActivityID)"
                >
                </SplitButton>
              </template>
            </Column>
            <template #empty> ไม่พบข้อมูล </template>
            <template #loading>
              <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
            </template>
          </DataTable>
          <Paginator
            @page="page($event)"
            :rows="15"
            :totalRecords="total"
          ></Paginator>
        </div>

        <!-- Start Delete Dialog -->
        <Dialog
          header="ตรวจสอบข้อมูล"
          v-model:visible="display_delete"
          :style="{ width: '350px' }"
          :modal="true"
        >
          <div class="confirmation-content text-center">
            <i class="pi pi-trash" style="font-size: 5rem" />
            <br />
            <span class="text-xl">คุณต้องการลบข้อมูลใช่หรือไม่</span>
          </div>
          <template #footer>
            <div class="col-12 text-center flex justify-content-between">
              <Button
                label="ยกเลิก"
                @click="close_delete"
                class="p-button-secondary w-full mr-3"
              />
              <Button
                label="ยืนยัน"
                @click="remove"
                class="p-button-danger w-full ml-3"
              />
            </div>
          </template>
        </Dialog>
        <!-- End Delete Dialog -->
      </div>
    </div>
    <!-- Start Details Dialog -->
    <!-- <Dialog
      header="รายละเอียดการฉีดวัคซีน"
      v-model:visible="display_view"
      :style="{ width: '60vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-4">
            
              <span class="inline pr-2">รหัสฟาร์ม :</span>
              {{ form.FarmIdentificationNumber }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2"> ชื่อฟาร์ม :</span>
              {{ form.FarmName }}
            </div>

            <div class="field col-12 sm:col-4">
              <span class="inline pr-2"> รหัสวัคซีน :</span>
              {{ form.VaccineCode }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2"> ชนิดวัคซีน :</span>
              {{ form.VaccineName }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2"> Lot ที่ :</span>
              {{ form.Lot }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2">จุดประสงค์การฉีดวัคซีน :</span>
              {{ form.VaccineObjectiveName }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2">วันที่ฉีด :</span>
              {{ form.VaccineActivityDate }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2">วันที่ฉีดครั้งต่อไป :</span>

              {{ form.VaccineNextDate }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2"> ผู้ฉีดวัคซีน :</span>
              {{ form.StaffGivenName }}
            </div>
            <div class="field col-12 sm:col-12">
              <h4>จำนวนสัตว์ที่ทำรายการ {{ view.length }} ตัว</h4>
              <div class="mt-5">
                <DataTable
                  class="text-sm"
                  :value="view"
                  :paginator="true"
                  :rows="10"
                  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  :rowsPerPageOptions="[10, 20, 50]"
                  responsiveLayout="scroll"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                >
                  <Column
                    field="show_id"
                    header="ลำดับ"
                    class="text-center"
                  ></Column>
                  <Column
                    field="AnimalEarID"
                    header="หมายเลขสัตว์"
                    class="text-center"
                  ></Column>
                  <Column
                    field="AnimalName"
                    header="ชื่อสัตว์"
                    class="text-center"
                  ></Column>
                  <Column
                    field="AnimalBirthDate"
                    header="วัน/เดือน/ปีเกิด"
                    class="text-center"
                  ></Column>
                  <Column
                    field="AnimalAge"
                    header="อายุ"
                    class="text-center"
                  ></Column>
                  <Column
                    field="AnimalBreedAll"
                    header="สายพันธุ์"
                    class="text-center"
                  ></Column>
                  <Column
                    field="AnimalStatusID"
                    header="สถานะ"
                    class="text-center"
                    :sortable="true"
                  >
                    <template #body="slotProps">
                      <div v-for="item in animal_status.data" :key="item.id">
                        <div
                          v-if="
                            item.AnimalStatusID == slotProps.data.AnimalStatusID
                          "
                        >
                          {{ item.AnimalStatusName }}
                        </div>
                      </div>
                    </template>
                  </Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </form>
      <template #footer> </template>
    </Dialog> -->
    <!-- End Details Dialog -->
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
// import locale from "dayjs/locale/th";

import buddhistEra from "dayjs/plugin/buddhistEra";
import router from "../../router";
import store from "@/service/Vuex";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
// import _ from "lodash";

import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      url: {
        vaccine: "/vaccine-activity",
        // Farm: "/farm",
        // AIZone: "/ai-zone",
        FarmStatus: "/farm-status",

        AIZone: "/ai-zone/selection?includeAll=false",
        Farm: "/farm/selection?includeAll=false",

        OrganizationZone: "/organization-zone/selection?includeAll=false",
        Province: "/province/selection?includeAll=false",
        Amphur: "/amphur/selection?includeAll=false",
        Tumbol: "/tumbol/selection?includeAll=false",
        OrganizationType: "/organization-type/selection?includeAll=false",
        Organization: "/organization/selection?includeAll=false",
        Project: "/project/selection?includeAll=false",
      },
      dropdown: {
        AIZones: [],
        OrganizationZones: [],
        Provinces: [],
        Amphurs: [],
        Tumbols: [],
        OrganizationTypes: [],
        Organizations: [],
        Farms: [],
        Projects: [],
        FarmStatuses: [],
      },
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        FarmIdentificationNumber: "",
        FarmName: "",
        FarmerFullName: "",
        dateRange: null,
        AIZoneID: null,
        OrganizationZoneID: null,
        ProvinceID: null,
        AmphurID: null,
        TumbolID: null,
        OrganizationTypeID: null,
        OrganizationID: null,
        FarmID: null,
      },
      id: "VaccineActivityID",
      name: "คัดจำหน่าย",
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },

        {
          field: "ThaiVaccineActivityDate",
          header: "วันที่ฉีดวัคซีน",
        },
        {
          field: "VaccineName",
          header: "ชื่อวัคซีน",
        },
        {
          field: "Lot",
          header: "Lot",
        },
        {
          field: "Organization.OrganizationName",
          header: "หน่วยงานที่ฉีด",
        },
        {
          field: "VaccineObjectiveName",
          header: "วัตถุประสงค์การฉีด",
        },
        {
          field: "ThaiVaccineNextDate",
          header: "วันที่ฉีดครั้งต่อไป",
        },
        {
          field: "Animal.length",
          header: "จำนวนสัตว์ที่ฉีดวัคซีน",
        },
        {
          field: "ResponsibilityStaffName",
          header: "เจ้าหน้าที่ผู้รับผิดชอบ",
        },
      ],
      isLoading: false,
      curpage: 0,
      display_view: false,
      display_delete: false,
      view: [],
      breadcrumb: [{ label: "", to: "" }],
      animal_status: [],
      Farm: [],
      form: [],
      permit: null,
      controller: new AbortController(),
    };
  },
  computed: {
    ...mapGetters({
      permission: "get_permission",
      animal_id: "animal_id",
    }),
    set_farm() {
      return store.state.SetFarmVaccine;
    },
  },
  async mounted() {
    // this.load();
    this.loadDefault();
    dayjs.extend(buddhistEra);
    this.breadcrumb[0].label = this.name;
    // await axios
    //   .get("/farm", { signal: this.controller.signal })
    //   .then((res) => {
    //     // this.Farm.data = res.data.rows;
    //     this.Farm.total = res.data.total;
    //     this.Farm.data = res.data.rows
    //       .sort((a, b) =>
    //         a.Province.ProvinceName.localeCompare(b.Province.ProvinceName)
    //       )
    //       .map((item) => {
    //         let name = item.Farmer ? item.Farmer.FullName : "- ";
    //         let number = item.FarmIdentificationNumber
    //           ? item.FarmIdentificationNumber
    //           : "- ";
    //         let province = item.Province ? item.Province.ProvinceName : "- ";
    //         let Organization = item.OrganizationZone
    //           ? item.OrganizationZone.OrganizationZoneName
    //           : "- ";

    //         return {
    //           FarmID: item.FarmID,
    //           FarmName: item.FarmName,
    //           FarmIdentificationNumber: item.FarmIdentificationNumber,
    //           Fullname:
    //             "ฟาร์ม " +
    //             item.FarmName +
    //             " (" +
    //             number +
    //             ")" +
    //             " | เจ้าของฟาร์ม " +
    //             name +
    //             " | จังหวัด " +
    //             province +
    //             " | " +
    //             Organization,
    //           OrganizationZoneName: Organization,
    //         };
    //       });
    //   })
    //   .finally(() => {
    //     this.isLoading = false;
    //   });

    this.permit = this.permission.filter((item) => {
      return item.MenuID == 15;
    });
  },

  watch: {
    "search.AIZoneID"(val) {
      if (val) {
        this.search.OrganizationZoneID = null;
        this.isSelectAIZoneDisabled = false;
        this.isSelectOrganizationZoneDisabled = true;
      } else {
        this.isSelectAIZoneDisabled = false;
        this.isSelectOrganizationZoneDisabled = false;
      }

      this.dropdown.Provinces = [];
      this.dropdown.Amphurs = [];
      this.dropdown.Tumbols = [];
      this.dropdown.Organizations = [];
      this.dropdown.Farms = [];
      this.data = [];

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.fetchProvince();
          this.fetchOrganization();
          this.fetchFarm();
          this.search.ProvinceID = null;
          this.search.AmphurID = null;
          this.search.TumbolID = null;
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.OrganizationZoneID"(val) {
      if (val) {
        this.search.AIZoneID = null;
        this.isSelectAIZoneDisabled = true;
        this.isSelectOrganizationZoneDisabled = false;
      } else {
        this.isSelectAIZoneDisabled = false;
        this.isSelectOrganizationZoneDisabled = false;
      }

      this.dropdown.Provinces = [];
      this.dropdown.Amphurs = [];
      this.dropdown.Tumbols = [];
      this.dropdown.Organizations = [];
      this.dropdown.Farms = [];
      this.data = [];

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.fetchProvince();
          this.fetchOrganization();
          this.fetchFarm();
          this.search.ProvinceID = null;
          this.search.AmphurID = null;
          this.search.TumbolID = null;
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.ProvinceID"() {
      this.fetchAmphur();
      this.fetchOrganization();
      this.fetchFarm();
      this.dropdown.Amphurs = [];
      this.dropdown.Tumbols = [];

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.search.AmphurID = null;
          this.search.TumbolID = null;
          //   this.search.OrganizationTypeID = null;
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.AmphurID"() {
      this.fetchTumbol();
      this.fetchOrganization();
      this.fetchFarm();
      this.dropdown.Tumbols = [];

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.search.TumbolID = null;
          //   this.search.OrganizationTypeID = null;
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.TumbolID"() {
      this.fetchOrganization();
      this.fetchFarm();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.OrganizationTypeID"() {
      this.fetchOrganization();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.OrganizationID"() {
      this.fetchFarm();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.FarmID"() {
      //   this.fetchFarm();
      this.load();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.ProjectIDArray"() {
      this.fetchFarm();
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.FarmerFullName"() {
      this.fetchFarm();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.FarmStatusID"() {
      this.fetchFarm();
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
  },

  methods: {
    // sort table
    sort($event) {
      if ($event.sortField !== "show_id") {
        if ($event.sortOrder == 1) {
          this.sortOrder = "asc";
        } else {
          this.sortOrder = "desc";
        }
        this.sortField = $event.sortField;
        this.load();
      }
    },
    // page change
    page($event) {
      this.curpage = $event.page + 1;
      this.load();
    },
    loadDefault() {
      this.isLoading = true;
      this.fetchAIZone();
      this.fetchOrganizationZone();
      this.fetchProject();
      //   this.fetchProvince();
      //   this.fetchAmphur();
      //   this.fetchTumbol();
      this.fetchOrganizationType();
      //   this.fetchOrganization();
      //   this.fetchFarmStatus();
      //   this.fetchFarm();
    },
    load() {
      this.isLoading = true;
      let url = this.url.vaccine + "?size=15";
      url += "&page=";
      if (this.curpage) {
        url += this.curpage;
      }
      if (this.search.FarmID) {
        url += "&FarmID=" + this.search.FarmID;
      } else if (this.set_farm) {
        url += "&FarmID=" + this.search.FarmID;
      }
      axios
        .get(url, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.total = response.data.total;
          this.data = response.data.rows;
          this.data.sort(
            (first, last) =>
              new Date(last.ThaiVaccineActivityDate) -
              new Date(first.ThaiVaccineActivityDate)
          );
          this.data.show = response.data.rows;
          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
            }
          } else {
            let start = (this.curpage - 1) * 15;
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1 + start;
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
      store.dispatch("FarmVaccine", {
        id: this.search.FarmID,
      });
    },

    fetchAIZone() {
      let params = {};
      //  Fetch AIZone
      axios
        .get(this.url.AIZone, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.AIZones = res.data.rows;

          this.dropdown.AIZones.push({
            AIZoneID: 99,
            AIZoneName: "ทั้งหมด",
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchOrganizationZone() {
      let params = {};
      //  Fetch OrganizationZone
      axios
        .get(this.url.OrganizationZone, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.OrganizationZones = res.data.rows;
          this.dropdown.OrganizationZones.push({
            OrganizationZoneID: 99,
            OrganizationZoneName: "ทั้งหมด",
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchProject() {
      let params = {};

      if (this.animal_id == 1) {
        params["AnimalTypeID"] = "[1,2,41,42]";
      } else if (this.animal_id == 2) {
        params["AnimalTypeID"] = "[3,4,43,44]";
      } else if (this.animal_id == 3) {
        params["AnimalTypeID"] = "[17,18,45,46]";
      } else {
        console.log(this.animal_id);
      }

      axios
        .get(this.url.Project, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.Projects = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchProvince() {
      //  Fetch Province
      let params = {};

      if (this.search.AIZoneID != null) {
        params["AIZoneID"] = this.search.AIZoneID;
      }

      if (this.search.OrganizationZoneID != null) {
        params["OrganizationZoneID"] = this.search.OrganizationZoneID;
      }
      axios
        .get(this.url.Province, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.Provinces = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchAmphur() {
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null &&
        this.search.ProvinceID == null
      ) {
        return;
      }

      let params = {};

      if (this.search.ProvinceID != null) {
        params["ProvinceID"] = this.search.ProvinceID;
      }

      axios
        .get(this.url.Amphur, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.Amphurs = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchTumbol() {
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null &&
        this.search.AmphurID == null
      ) {
        return;
      }

      let params = {};

      if (this.search.AmphurID != null) {
        params["AmphurID"] = this.search.AmphurID;
      }

      axios
        .get(this.url.Tumbol, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.Tumbols = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchOrganizationType() {
      let params = {};

      axios
        .get(this.url.OrganizationType, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.OrganizationTypes = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchOrganization() {
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        return;
      }

      let params = {};

      if (this.search.OrganizationTypeID != null) {
        params["OrganizationTypeID"] = this.search.OrganizationTypeID;
      }

      // Province IN AIZOne
      if (this.search.AIZoneID != null) {
        params["OrganizationAiZoneID"] = this.search.AIZoneID;
      }

      if (this.search.OrganizationZoneID != null) {
        params["OrganizationZoneID"] = this.search.OrganizationZoneID;
      }

      if (this.search.ProvinceID != null) {
        params["ProvinceID"] = this.search.ProvinceID;
      }

      if (this.search.AmphurID != null) {
        params["FarmAmphurID"] = this.search.AmphurID;
      }

      if (this.search.TumbolID != null) {
        params["FarmTumbolID"] = this.search.TumbolID;
      }

      axios
        .get(this.url.Organization, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.Organizations = res.data.rows.map((item) => {
            return {
              OrganizationID: item.OrganizationID,
              OrganizationFull:
                item.OrganizationCode + ", " + item.OrganizationName,
            };
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    fetchFarmStatus() {
      //  Fetch Province
      let params = {};
      axios
        .get(this.url.FarmStatus, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.FarmStatuses = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    fetchFarm() {
      this.isLoading = true;
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        this.isLoading = false;
        return;
      }

      let params = {
        size: this.rowPerPage,
        page: this.currentPage,
        orderByField: "FarmID",
        orderBy: "desc",
        // includeAll: false,
      };

      // Province IN AIZOne
      if (this.search.AIZoneID != null) {
        if (this.search.AIZoneID != 99) {
          params["AIZoneID"] = this.search.AIZoneID;
        }
      }

      if (this.search.OrganizationZoneID != null) {
        if (this.search.OrganizationZoneID != 99) {
          params["OrganizationZoneID"] = this.search.OrganizationZoneID;
        }
      }

      if (this.search.ProvinceID != null) {
        params["FarmProvinceID"] = this.search.ProvinceID;
      }

      if (this.search.AmphurID != null) {
        params["FarmAmphurID"] = this.search.AmphurID;
      }

      if (this.search.TumbolID != null) {
        params["FarmTumbolID"] = this.search.TumbolID;
      }

      if (this.search.OrganizationID != null) {
        params["OrganizationID"] = this.search.OrganizationID;
      }

      if (this.search.OrganizationID != null) {
        params["OrganizationID"] = this.search.OrganizationID;
      }

      if (this.search.ProjectIDArray) {
        params["ProjectID"] = JSON.stringify(this.search.ProjectIDArray);
      }

      if (this.search.FarmerFullName) {
        params["FullName"] = this.search.FarmerFullName;
      }

      if (this.search.FarmID) {
        params["FarmID"] = this.search.FarmID;
      }

      if (this.search.FarmStatusID) {
        params["FarmStatusID"] = this.search.FarmStatusID;
      }

      //   axios
      //     .get(this.url.Farm, {
      //       signal: this.controller.signal,
      //       params: params,
      //     })
      //     .then((res) => {
      //       this.data = res.data.rows
      //         .sort((a, b) =>
      //           a.Province.ProvinceName.localeCompare(b.Province.ProvinceName)
      //         )
      //         .map((item) => {
      //           item.FarmRegisterDate = dayjs(item.FarmRegisterDate)
      //             .locale(locale)
      //             .format("DD/MM/YYYY");
      //           return item;
      //         });
      //       this.totalPage = res.data.totalPage;
      //       this.totalItems = res.data.totalData;
      //       this.total = res.data.total;
      //     })
      //     .finally(() => {
      //       this.isLoading = false;
      //     });

      //
      axios
        .get(this.url.Farm, {
          signal: this.controller.signal,
          params: {
            ...params,
            size: 10000,
            page: 1,
            FarmID: undefined,
          },
        })
        .then((res) => {
          this.dropdown.Farms = res.data.rows;
        //   res.data.rows
        //     .sort((a, b) =>
        //       a.Province.ProvinceName.localeCompare(b.Province.ProvinceName)
        //     )
        //     .map((item) => {
        //       let name = item.Farmer ? item.Farmer.FullName : "- ";
        //       let number = item.FarmIdentificationNumber
        //         ? item.FarmIdentificationNumber
        //         : "- ";
        //       let province = item.Province ? item.Province.ProvinceName : "- ";
        //       let Organization = item.OrganizationZone
        //         ? item.OrganizationZone.OrganizationZoneName
        //         : "- ";

        //       return {
        //         FarmID: item.FarmID,
        //         FarmName: item.FarmName,
        //         FarmIdentificationNumber: item.FarmIdentificationNumber,
        //         Fullname:
        //           "ฟาร์ม " +
        //           item.FarmName +
        //           " (" +
        //           number +
        //           ")" +
        //           " | เจ้าของฟาร์ม " +
        //           name +
        //           " | จังหวัด " +
        //           province +
        //           " | " +
        //           Organization,
        //         OrganizationZoneName: Organization,
        //       };
        //     });
          //
        })
        .finally(() => {
          this.isLoading = false;
        });

      //   if (this.search.FarmerFullName) {
      //     url += "&FullName=" + this.search.FarmerFullName;
      //     urlExcel += "&FullName=" + this.search.FarmerFullName;
      //   }
    },

    async edit(id) {
      if (this.permit[0].IsUpdate == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์แก้ไข",
          life: 5000,
        });
        return;
      }
      // store.dispatch("FarmVaccine", {
      //   id: this.form.FarmID,
      // });
      let getID = this.data.find((item) => item.VaccineActivityID == id);
      await router.push({
        path: `/activity/vaccine/edit/${getID.VaccineActivityID}`,
      });
    },
    getItems(id) {
      const items = [
        {
          label: "รายละเอียด",
          icon: "pi pi-eye",
          command: () => {
            // this.open_view(id);
            this.$router.push("/activity/vaccine/view/" + id);
          },
        },
        {
          label: "ลบ",
          icon: "pi pi-trash",
          command: () => {
            this.open_delete(id);
          },
        },
      ];
      return items;
    },

    open_delete(id) {
      if (this.permit[0].IsDelete == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์ลบ",
          life: 5000,
        });
        return;
      }
      this.data.id = id;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },

    remove() {
      axios.delete("vaccine-activity/" + this.data.id).then(() => {
        this.close_delete();
        this.load();
        this.$toast.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "ลบข้อมูลเสร็จสิ้น",
          life: 5000,
        });
      });
    },
    add() {
      if (this.permit[0].IsAdd == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์เพิ่ม",
          life: 5000,
        });
        return;
      } else {
        const id = this.search.FarmID;
        // let item = this.Farm.data.find((id) => id.FarmID == this.form.FarmID);
        let item = this.dropdown.Farms.find(
          (id) => id.FarmID == this.search.FarmID
        );

        const farm = item.FarmIdentificationNumber;

        router.push({ name: "vaccuineadd", params: { id, farm } });
      }
    },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>
