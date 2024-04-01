<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle :title="title" />

      <div v-if="loader" class="card mb-5">
        <h1 class="text-xl mb-4 text-500">เครื่องมือช่วยค้นหา</h1>
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
              placeholder="ทั้งหมด"
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
              placeholder="ทั้งหมด"
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
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              ช่วงวันที่รายงาน</label
            >
            <Datepicker
              v-model="search.day"
              range
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="ตั้งแต่วันที่ - จนถึงวันที่"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>

          <div class="col-12 sm:col-12 lg:col-6">
            <label
              for="searchStaffID"
              class="block text-600 text-sm font-bold mb-2"
            >
              บุคลากร</label
            >
            <Dropdown
              :showClear="true"
              class="w-full"
              placeholder="ทั้งหมด"
              optionLabel="StaffFullName"
              optionValue="StaffID"
              :virtualScrollerOptions="{ itemSize: 38 }"
              :options="dropdown.Staffs"
              :filter="true"
              v-model="search.StaffID"
            />
          </div>

          <div class="col-12 sm:col-12 lg:col-12">
            <label
              for="searchSubDistrict"
              class="block text-600 text-sm font-bold mb-2"
            >
              ฟาร์มโครงการ</label
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
            <Button
              @click="fetchReport()"
              label="ค้นหา"
              icon=""
              style="width: 100%"
              class="mr-2 mb-3"
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
        <h5 class="text-center">{{ title }}</h5>
        <div class="grid flex" style="margin-bottom: 2em; margin-top: 2em">
          <div
            v-if="data.head_detail && data.head_detail.ai_zone_name != ''"
            class="col-4"
          >
            <span class="font-bold"
              >ศูนย์วิจัย : {{ data.head_detail.ai_zone_name }}</span
            >
          </div>

          <div
            v-if="
              data.head_detail && data.head_detail.organization_zone_name != ''
            "
            class="col-4"
          >
            <span class="font-bold"
              >เขตพื้นที่ปศุสัตว์ :
              {{ data.head_detail.organization_zone_name }}</span
            >
          </div>

          <div
            v-if="data.head_detail && data.head_detail.province_name != ''"
            class="col-4"
          >
            <span class="font-bold"
              >จังหวัด : {{ data.head_detail.province_name }}</span
            >
          </div>

          <div
            v-if="data.head_detail && data.head_detail.amphur_name != ''"
            class="col-4"
          >
            <span class="font-bold"
              >อำเภอ : {{ data.head_detail.amphur_name }}</span
            >
          </div>

          <div
            v-if="data.head_detail && data.head_detail.tumbol_name != ''"
            class="col-4"
          >
            <span class="font-bold"
              >ตำบล : {{ data.head_detail.tumbol_name }}</span
            >
          </div>

          <div
            v-if="data.head_detail && data.head_detail.organization_name != ''"
            class="col-4"
          >
            <span class="font-bold"
              >หน่วยงาน : {{ data.head_detail.organization_name }}</span
            >
          </div>

          <div
            v-if="data.head_detail && data.head_detail.staff_name != ''"
            class="col-4"
          >
            <span class="font-bold"
              >เจ้าหน้าที่ : {{ data.head_detail.staff_name }}</span
            >
          </div>

          <div
            v-if="data.head_detail && data.head_detail.projects != ''"
            class="col-4"
          >
            <span class="font-bold"
              >โครงการ : {{ data.head_detail.projects }}</span
            >
          </div>

          <div
            v-if="data.head_detail && data.head_detail.date != ''"
            class="col-4"
          >
            <span class="font-bold"
              >ช่วงวันที่ : {{ data.head_detail.date }}</span
            >
          </div>
          <!-- <div class="col-12">
            <span class="font-bold"
              >จำนวนแม่ที่คลอด : {{ totalStatus.all }} ตัว</span
            >,
            <span class="font-bold">จำนวนลูก : {{ totalStatus.child }} ตัว</span
            >,
            <span class="font-bold">เพศผู้ : {{ totalStatus.male }} ตัว</span>,
            <span class="font-bold">เพศเมีย : {{ totalStatus.female }} ตัว</span
            >,
          </div> -->
        </div>

        <DataTable
          class="text-sm"
          :value="data.main"
          :frozenValue="locked1"
          :paginator="true"
          :exportable="true"
          ref="dt"
          :rows="10"
          :loading="isLoading"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column
            field="AnimalBreedName"
            header="สายพันธุ์"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <!-- <Column
            field="AnimalRealCount"
            header="จำนวนครั้ง"
            class="text-center"
            exportFooter="&#8203;"
          ></Column> -->
          <Column
            field="AnimalCount"
            :header="'จำนวนตัว'"
            class="text-center"
            exportFooter="&#8203;"
          >
            <template #header="slotProps"> {{ slotProps.data }}</template>
          </Column>
          <Column
            field="Child"
            header="จำนวนลูก"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="Male"
            header="เพศผู้"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="Female"
            header="เพศเมีย"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="FarmCount"
            header="จำนวนฟาร์ม"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>

          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <!-- <SplitButton
                v-if="slotProps.data.show_id == total || this.user.GroupID == 1"
                label="แก้ไข"
                icon="pi pi-pencil"
                @click="edit(slotProps.data.show_id - 1)"
                class="p-button-sm p-button-outlined p-button-warning"
                :model="getItems(slotProps.data.show_id - 1)"
              >
              </SplitButton> -->
              <Button
                label="ดูข้อมูล"
                class="w-full md:w-auto"
                @click="fetchReportAnimal(slotProps.data.AnimalID)"
              />
            </template>
          </Column>

          <!--  <Column
              field="AnimalName"
              header="ชื่อโค"
              class="text-center"
              exportFooter="&#8203;"
            ></Column>
            <Column
              field="pregnancyCheckup"
              header="สถานะ"
              :sortable="true"
              class="text-center"
              exportFooter="&#8203;"
            ></Column>
            <Column
              field="FarmName"
              header="ชื่อฟาร์ม"
              :sortable="true"
              class="text-center"
              exportFooter="&#8203;"
            ></Column>
            <Column
              field="AmphurName"
              header="อำเภอ"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="ProvinceName"
              header="จังหวัด"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="Par"
              header="ท้องที่"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="TimeNo"
              header="ครั้งที่ผสม"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="ThaiAIDate"
              header="วันที่ผสม"
              class="text-center"
              exportFooter="&#8203;"
              :sortable="true"
            ></Column>
            <Column
              field="SemenNumber"
              header="น้ำเชื้อ"
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
            ></Column> -->
          <template #empty> ไม่พบข้อมูล </template>
          <template #loading>
            <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
          </template>
        </DataTable>
      </div>
    </div>

    <div class="col-12 xl:col-12">
      <div class="card">
        <div class="col-12 text-right">
          <Button
            label="Export To Excel"
            @click="exportCSV2($event)"
            class="p-button-success mr-3"
          />
        </div>
        <h5 class="text-center">รายการสัตว์</h5>

        <DataTable
          class="text-sm"
          :value="data.animal_main"
          :paginator="true"
          :exportable="true"
          ref="dt2"
          :rows="10"
          :loading="isLoading"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column
            field="FarmIdentificationNumber"
            header="ทะเบียนฟาร์ม"
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
            field="AnimalEarID"
            header="หมายเลขโค"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="AnimalName"
            header="ชื่อโค"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="AnimalStatusName"
            header="สถานะโค"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="AnimalPar"
            header="ท้องที่"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="AIDate"
            header="วันผสม"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="SemenNumber"
            header="น้ำเชื้อ"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>

          <Column
            field="SemenBreedAll"
            header="สายพันธุ์น้ำเชื้อ"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="GiveBirthDate"
            header="วันที่คลอด"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="Amount"
            header="จำนวนลูก"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="BetweenDate1"
            header="จำนวนวัน"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="ResponsibilityStaffName"
            header="เจ้าหน้าที่"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>

          <template #empty> ไม่พบข้อมูล </template>
          <template #loading>
            <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import dayjs from "dayjs";
import { ref } from "vue";

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
      totalStatus: {
        all: 0,
        status1: 0,
        status2: 0,
        status3: 0,
      },
      locked1: [],
      title: "รายงานสรุปผลการติดตามลูกเกิด",
      data: [],
      provinceAITime: [],
      provinceAICount: [],
      url: {
        AIZone: "/ai-zone/selection?includeAll=false&isActive=1",
        OrganizationZone:
          "/organization-zone/selection?includeAll=false&isActive=1",
        Province: "/province/selection?includeAll=false&isActive=1",
        Amphur: "/amphur/selection?includeAll=false&isActive=1",
        Tumbol: "/tumbol/selection?includeAll=false&isActive=1",
        OrganizationType:
          "/organization-type/selection?includeAll=false&isActive=1",
        Organization: "/organization/selection?includeAll=false&isActive=1",
        Farm: "/farm/selection?includeAll=false&isActive=1",
        Report: "/report/report17",
        Project: "/project/selection?includeAll=false&isActive=1",
        Staff: "/staff/selection?includeAll=false&isActive=1",
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
      },
      search: {
        AIZoneID: null,
        OrganizationZoneID: null,
        ProvinceID: null,
        AmphurID: null,
        TumbolID: null,
        OrganizationTypeID: null,
        OrganizationID: null,
        FarmID: null,
      },
      isSelectAIZoneDisabled: false,
      isSelectOrganizationZoneDisabled: false,
      isLoading: false,
      loader: false,
      total: null,
      selection: false,
      loading: false,
      curpage: 0,
      controller: new AbortController(),
    };
  },
  loadLazyTimeout: null,
  mounted() {
    this.loadDefault();
  },

  watch: {
    "data.main"() {
      //   if (this.data.main.length != 0) {
      //     this.totalStatus.all = 0;
      //     this.totalStatus.child = 0;
      //     this.totalStatus.male = 0;
      //     this.totalStatus.female = 0;
      //     this.data.main.forEach((x) => {
      //       x.AnimalID.forEach((e) => {
      //         this.totalStatus.all = this.totalStatus.all + 1;
      //         this.totalStatus.child = this.totalStatus.child + e.Amount;
      //         if (e.ChildGender.includes("M")) {
      //           this.totalStatus.male = this.totalStatus.male + 1;
      //         }
      //         if (e.ChildGender.includes("F")) {
      //           this.totalStatus.female = this.totalStatus.female + 1;
      //         }
      //       });
      //     });
      //   }
    },
    // ค้นหา
    "search.day"() {
      //   this.fetchReport();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.loadDefault();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.AIZoneID"(val) {
      if (val) {
        this.search.OrganizationZoneID = null;
        this.isSelectAIZoneDisabled = false;
        this.isSelectOrganizationZoneDisabled = true;
      } else {
        this.isSelectAIZoneDisabled = false;
        this.isSelectOrganizationZoneDisabled = false;
      }

      this.search.ProvinceID = null;
      this.search.AmphurID = null;
      this.search.TumbolID = null;

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.fetchProvince();
          this.fetchOrganization();
          //   this.fetchStaff();
          //   this.fetchReport();
          this.dropdown.Amphurs = [];
          this.dropdown.Tumbols = [];
          this.search.ProvinceID = null;
          this.search.AmphurID = null;
          this.search.TumbolID = null;
          //   this.search.OrganizationTypeID = null;
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
      this.search.ProvinceID = null;
      this.search.AmphurID = null;
      this.search.TumbolID = null;

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.fetchProvince();
          this.fetchOrganization();
          //   this.fetchStaff();
          //   this.fetchReport();
          this.search.ProvinceID = null;
          this.search.AmphurID = null;
          this.search.TumbolID = null;
          //   this.search.OrganizationTypeID = null;
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.ProvinceID"() {
      this.fetchAmphur();
      this.fetchOrganization();
      this.fetchStaff();
      //   this.fetchReport();

      if (this.isLoading == false) {
        // this.isLoading = true;
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
      this.fetchStaff();
      //   this.fetchReport();

      if (this.isLoading == false) {
        // this.isLoading = true;
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
      this.fetchStaff();
      //   this.fetchReport();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.OrganizationTypeID"() {
      this.fetchOrganization();
      //   this.fetchReport();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.OrganizationID"() {
      //   this.fetchReport();
      this.fetchStaff();
      //   this.fetchReport();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          //   this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.FarmID"() {
      //   this.fetchReport();
      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.ProjectIDArray"() {
      //   this.fetchReport();
      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.StaffID"() {
      //   this.fetchReport();
      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
  },

  methods: {
    toggleLock(data) {
      this.locked1 = [];
      this.locked1.push(data);
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    exportCSV2() {
      this.$refs.dt2.exportCSV();
    },

    loadDefault() {
      this.isLoading = true;
      this.fetchAIZone();
      this.fetchOrganizationZone();
      this.fetchProject();
      this.fetchProvince();
      this.fetchAmphur();
      this.fetchTumbol();
      this.fetchOrganizationType();
      this.fetchOrganization();
      this.fetchStaff();
      //   this.fetchReport();
    },

    load() {
      this.isLoading = true;

      let ai = this.user.Staff.Organization.OrganizationAiZoneID || 1;

      axios
        .get(this.url.OrganizationZone, { signal: this.controller.signal })
        .then((res) => {
          this.dropdown.OrganizationZones = res.data.rows;
          this.dropdown.organization_zone_total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(this.url.AIZone, { signal: this.controller.signal })
        .then((res) => {
          this.dropdown.AIZones = res.data.rows;
          this.dropdown.ai_zone_total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(this.url.Province, { signal: this.controller.signal })
        .then((res) => {
          this.dropdown.provinceTemp = res.data.rows;

          if (this.search.AIZoneID != null) {
            this.dropdown.Provinces = res.data.rows.filter((x) => {
              return x.AIZoneID == this.search.AIZoneID;
            });
          }

          if (this.search.OrganizationZoneID != null) {
            this.dropdown.Provinces = res.data.rows.filter((x) => {
              return x.OrganizationZoneID == this.search.OrganizationZoneID;
            });
          }

          this.dropdown.province_total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });

      let url = "/report/report15";

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
      this.child = "ลูก" + this.localAnimal;

      if (this.search.ProvinceID) {
        url += "&ProvinceID=" + this.search.ProvinceID;
      }

      if (this.search.AmphurID) {
        url += "&AmphurID=" + this.search.AmphurID;
      }
      if (this.search.TumbolID) {
        url += "&TumbolID=" + this.search.TumbolID;
      }
      if (this.search.SemenNumber) {
        url += "&SemenNumber=" + this.search.SemenNumber;
      }
      if (this.search.OrganizationID) {
        url += "&OrganizationID=" + this.search.OrganizationID;
      }
      if (this.search.dateStart) {
        url += "&StartDate=" + this.search.dateStart;
      }
      if (this.search.dateEnd) {
        url += "&EndDate=" + this.search.dateEnd;
      }

      axios
        .get(url + "&AIZoneID=" + ai, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.Total = res.data.Total;
          this.data.preg1 = res.data.preg1;
          this.data.preg2 = res.data.preg2;
          this.data.preg3 = res.data.preg3;
          this.data.preg4 = res.data.preg4;
          this.data.farm = res.data.Farm;
          this.data.main = [];

          //   this.data.animal = res.data.ai.filter((value, index, array) => {
          //     return array.indexOf(value) === index;
          //   });

          //   this.data.countAnimal = this.data.animal.length;

          //   this.data.pregnancy1 = this.data.animal.filter(
          //     (value, index, array) => {
          //       return array.indexOf(value) === index;
          //     }
          //   );

          //   this.data.countPregnancy1 = this.data.animal.filter(
          //     (value, index, array) => {
          //       return array.indexOf(value) === index ;
          //     }
          //   );

          // this.data.countPregnancy2 = ;
          // this.data.countPregnancy3 = ;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });

      axios
        .get(this.url.Amphur, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.amphur.data = res.data.rows;
          this.amphur.temp = this.amphur.data;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });
      axios
        .get(this.url.Tumbol, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.tumbol.data = res.data.rows;
          this.tumbol.temp = this.tumbol.data;
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });

      // /organization
      axios
        .get("/organization", {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.Organization.data = res.data.rows.map((item) => {
            return {
              OrganizationID: item.OrganizationID,
              OrganizationFull:
                item.OrganizationCode + ", " + item.OrganizationName,
            };
          });
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });

      axios
        .get("/farm", { signal: this.controller.signal, FarmAnimalType: 2 })
        .then((res) => {
          // this.Farm.data = res.data.rows;
          this.Farm.total = res.data.total;
          this.Farm.data = res.data.rows
            .sort((a, b) =>
              a.Province.ProvinceName.localeCompare(b.Province.ProvinceName)
            )
            .map((item) => {
              let name = item.Farmer ? item.Farmer.FullName : "- ";
              let number = item.FarmIdentificationNumber
                ? item.FarmIdentificationNumber
                : "- ";
              let province = item.Province ? item.Province.ProvinceName : "- ";
              let Organization = item.OrganizationZone
                ? item.OrganizationZone.OrganizationZoneName
                : "- ";

              return {
                FarmID: item.FarmID,
                FarmName: item.FarmName,
                FarmIdentificationNumber: item.FarmIdentificationNumber,
                Fullname:
                  "ฟาร์ม " +
                  item.FarmName +
                  " (" +
                  number +
                  ")" +
                  " | ชื่อฟาร์ม " +
                  name +
                  " | จังหวัด " +
                  province +
                  " | " +
                  Organization,
                OrganizationZoneName: Organization,
              };
            });
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
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
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchOrganizationZone() {
      let params = { isActive: 1 };
      //  Fetch OrganizationZone
      axios
        .get(this.url.OrganizationZone, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.OrganizationZones = res.data.rows;
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
          this.loader = true;
        });
    },
    fetchProvince() {
      //  Fetch Province
      let params = {};

      if (this.search.AIZoneID != null) {
        params["AIZoneID"] = this.search.AIZoneID;
        // this.dropdown.Provinces = res.data.rows.filter((x) => {
        //   return x.AIZoneID == this.search.AIZoneID;
        // });
      }

      if (this.search.OrganizationZoneID != null) {
        params["OrganizationZoneID"] = this.search.OrganizationZoneID;
        // this.dropdown.Provinces = res.data.rows.filter((x) => {
        //   return x.OrganizationZoneID == this.search.OrganizationZoneID;
        // });
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
          this.loader = true;
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
          this.loader = true;
        });
    },
    fetchTumbol() {
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null &&
        this.search.ProvinceID == null
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
          this.loader = true;
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
          this.loader = true;
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
        params["AmphurID"] = this.search.AmphurID;
      }

      if (this.search.TumbolID != null) {
        params["TumbolID"] = this.search.TumbolID;
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
          this.loader = true;
        });
    },
    fetchStaff() {
      // Staffs
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        return;
      }

      let params = { includeOrganization: true };

      // Province IN AIZOne
      //   if (this.search.AIZoneID != null) {
      //     params["OrganizationAiZoneID"] = this.search.AIZoneID;
      //   }

      //   if (this.search.OrganizationZoneID != null) {
      //     params["OrganizationZoneID"] = this.search.OrganizationZoneID;
      //   }

      if (this.search.ProvinceID != null) {
        params["StaffProvinceID"] = this.search.ProvinceID;
      }

      if (this.search.AmphurID != null) {
        params["StaffAmphurID"] = this.search.AmphurID;
      }

      if (this.search.TumbolID != null) {
        params["StaffTumbolID"] = this.search.TumbolID;
      }

      if (this.search.OrganizationID != null) {
        params["OrganizationID"] = this.search.OrganizationID;
      }

      axios
        .get(this.url.Staff, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.Staffs = res.data.rows.map((item) => {
            return {
              StaffID: item.StaffID,
              StaffFullName: item.StaffFullName,
            };
          });
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
        });
    },

    fetchReport() {
      //  Fetch Report
      let params = {};

      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        params["AIZoneID"] =
          this.user.Staff.Organization.OrganizationAiZoneID || undefined;
        return;
      }

      if (this.search.AIZoneID != null) {
        params["AIZoneID"] = this.search.AIZoneID;
      }

      if (this.search.OrganizationZoneID != null) {
        params["OrganizationZoneID"] = this.search.OrganizationZoneID;
      }

      if (this.animal_id == 1) {
        this.localAnimal = "โค";
        params["AnimalTypeID"] = "[1,2,41,42]";
      } else if (this.animal_id == 2) {
        params["AnimalTypeID"] = "[3,4,43,44]";
        this.localAnimal = "กระบือ";
      } else if (this.animal_id == 3) {
        params["AnimalTypeID"] = "[17,18,45,46]";
        this.localAnimal = "แพะ";
      }

      this.mom = "แม่" + this.localAnimal;
      this.young = this.localAnimal + "สาว";
      this.child = "ลูก" + this.localAnimal;

      if (this.search.ProvinceID) {
        params["ProvinceID"] = this.search.ProvinceID;
      }

      if (this.search.AmphurID) {
        params["AmphurID"] = this.search.AmphurID;
      }
      if (this.search.TumbolID) {
        params["TumbolID"] = this.search.TumbolID;
      }

      if (this.search.SemenNumber) {
        params["SemenNumber"] = this.search.SemenNumber;
      }

      if (this.search.OrganizationID) {
        params["OrganizationID"] = this.search.OrganizationID;
      }

      if (this.search.StaffID) {
        params["StaffID"] = this.search.StaffID;
      }

      if (this.search.day) {
        params["StartDate"] = this.search.day[0];
        params["EndDate"] = this.search.day[1];
      }

      //   if (this.search.dateStart) {
      //     params["StartDate"] = this.search.dateStart;
      //   }
      //   if (this.search.dateEnd) {
      //     params["EndDate"] = this.search.dateEnd;
      //   }

      if (this.search.ProjectIDArray) {
        //
        params["Projects"] = JSON.stringify(this.search.ProjectIDArray);
      }

      axios
        .get(this.url.Report, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.data.main = [];
          let animalCount = 0;
          this.data.main = res.data.data.map((x) => {
            let child = 0;
            let male = 0;
            let female = 0;
            animalCount = animalCount + x.AnimalCount;

            x.AnimalID.forEach((e) => {
              child = child + e.Amount;
              if (e.ChildGender.includes("M")) {
                male = male + 1;
              }
              if (e.ChildGender.includes("F")) {
                female = female + 1;
              }
            });

            x.Child = child;
            x.Male = male;
            x.Female = female;
            return x;
          });

          this.totalStatus.all = 0;
          this.totalStatus.child = 0;
          this.totalStatus.male = 0;
          this.totalStatus.female = 0;
          this.totalStatus.farm = 0;
          let AnimalIDAll = [];

          if (this.data.main.length != 0) {
            this.data.main.forEach((x) => {
              this.totalStatus.farm = this.totalStatus.farm + x.FarmCount;
              x.AnimalID.forEach((e) => {
                AnimalIDAll.push(e);
                this.totalStatus.all = this.totalStatus.all + 1;
                this.totalStatus.child = this.totalStatus.child + e.Amount;

                if (e.ChildGender.includes("M")) {
                  this.totalStatus.male = this.totalStatus.male + 1;
                }
                if (e.ChildGender.includes("F")) {
                  this.totalStatus.female = this.totalStatus.female + 1;
                }
              });
            });
          }
          this.totalStatus.all = animalCount;
          this.toggleLock({
            id: 0,
            AnimalBreedName: "สายพันธุ์ทั้งหมด",
            AnimalCount: this.totalStatus.all,
            Child: this.totalStatus.child,
            Male: this.totalStatus.male,
            Female: this.totalStatus.female,
            FarmCount: this.totalStatus.farm,
            AnimalID: AnimalIDAll,
          });

          let e = this.dropdown.AIZones.find((x) => {
            return x.AIZoneID == this.search.AIZoneID;
          });

          let z = this.dropdown.OrganizationZones.find((x) => {
            return x.OrganizationZoneID == this.search.OrganizationZoneID;
          });

          let p = this.dropdown.Provinces.find((x) => {
            return x.ProvinceID == this.search.ProvinceID;
          });

          let a = this.dropdown.Amphurs.find((x) => {
            return x.AmphurID == this.search.AmphurID;
          });

          let t = this.dropdown.Tumbols.find((x) => {
            return x.TumbolID == this.search.TumbolID;
          });

          let o = this.dropdown.Organizations.find((x) => {
            return x.OrganizationID == this.search.OrganizationID;
          });

          let s = null;
          if (this.dropdown.Staffs) {
            s = this.dropdown.Staffs.find((x) => {
              return x.StaffID == this.search.StaffID;
            });
          }

          this.data.head_detail = {
            ai_zone_name: e ? e.AIZoneName : "", //this.search.AIZoneID,
            organization_zone_name: z ? z.OrganizationZoneName : "",
            province_name: p ? p.ProvinceName : "",
            amphur_name: a ? a.AmphurName : "",
            tumbol_name: t ? t.TumbolName : "",
            organization_name: o ? o.OrganizationFull : "",
            date: this.search.day
              ? dayjs(this.search.day[0]).locale("th").format("DD/MM/YYYY") +
                " - " +
                dayjs(this.search.day[1]).locale("th").format("DD/MM/YYYY")
              : "",
            staff_name: s ? s.StaffFullName : "",
            projects: "",
          };
          this.data.animal_main = [];
        })
        .finally(() => {
          this.isLoading = false;
          this.loader = true;
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

    fetchReportAnimal(AnimalID) {
      this.data.animal_main = AnimalID;
    },
  },

  unmounted() {
    this.controller.abort();
  },
  setup() {
    const expandedRows = ref([]);
    const onRowExpand = () => {};
    const onRowCollapse = () => {};
    const expandAll = () => {};
    const collapseAll = () => {};

    return {
      expandedRows,
      onRowExpand,
      onRowCollapse,
      expandAll,
      collapseAll,
    };
  },
};
</script>

<style lang="css">
.p-datatable-frozen-tbody > tr {
  background-color: #aaa !important;
  font-weight: bold;
}
</style>
