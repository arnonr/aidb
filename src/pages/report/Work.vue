<template>
    <div class="grid">
        <div class="col-12">
            <PageTitle :title="title" />

            <div v-if="loader" class="card mb-5">
                <h1 class="text-xl mb-4 text-500">เครื่องมือช่วยค้นหา</h1>
                <div class="grid">
                    <div class="col-12 sm:col-6 lg:col-6">
                        <label
                            for="AIZoneID"
                            class="block text-600 text-sm font-bold mb-2"
                        >
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
                    <div class="col-3 sm:col-3 lg:col-3">
                        <label
                            for="dateRange"
                            class="block text-600 text-sm font-bold mb-2"
                        >
                            ช่วงวันที่รายงาน</label
                        >
                        <Datepicker
                            v-model="search.StartDate"
                            :disabled="isSelectDayDisabled"
                            id="dateRange1"
                            locale="th"
                            :format="format"
                            utc
                            :enableTimePicker="false"
                            cancelText="ยกเลิก"
                            selectText="ยืนยัน"
                            placeholder="ตั้งแต่วันที่"
                            autoApply
                        >
                            <template #year-overlay-value="{ text }">
                                {{ parseInt(text) + 543 }}
                            </template>
                            <template #year="{ year }">
                                {{ year + 543 }}
                            </template>
                        </Datepicker>
                    </div>

                    <div class="col-3 sm:col-3 lg:col-3">
                        <label
                            for="dateRange"
                            class="block text-600 text-sm font-bold mb-2"
                        >
                            ถึงวันที่</label
                        >
                        <Datepicker
                            v-model="search.EndDate"
                            :disabled="isSelectDayDisabled"
                            id="dateRange2"
                            locale="th"
                            :format="format"
                            utc
                            :enableTimePicker="false"
                            cancelText="ยกเลิก"
                            selectText="ยืนยัน"
                            placeholder="จนถึงวันที่"
                            autoApply
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
                            สถานะบุคลากร</label
                        >
                        <Dropdown
                            :showClear="true"
                            class="w-full"
                            optionLabel="name"
                            optionValue="value"
                            :virtualScrollerOptions="{ itemSize: 38 }"
                            :options="[
                                { name: 'เปิดการใช้งาน', value: 1 },
                                { name: 'ปิดการใช้งาน', value: 0 },
                            ]"
                            :filter="true"
                            v-model="search.isActive"
                        />
                    </div>

                    <div class="col-12 sm:col-12 lg:col-6">
                        <label
                            for="searchStaffID"
                            class="block text-600 text-sm font-bold mb-2"
                        >
                            สถานะการปฏิบัติงาน</label
                        >
                        <Dropdown
                            :showClear="true"
                            class="w-full"
                            optionLabel="name"
                            optionValue="name"
                            :options="[
                                { name: 'ปฏิบัติงานอยู่' },
                                { name: 'เกษียณ' },
                                { name: 'ลาออก' },
                            ]"
                            :filter="true"
                            v-model="search.StaffStatus"
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

                    <!-- <div class="col-12 sm:col-6 lg:col-6">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              ช่วงวันที่ผสม</label
            >
            <Datepicker
              v-model="search.day"
              range
              :disabled="isSelectDayDisabled"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="ตั้งแต่วันที่ - จนถึงวันที่"
              autoApply
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div> -->

                    <div class="col-12 sm:col-12 lg:col-12">
                        <hr />
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
                <h5 class="text-center">รายงานการปฏิบัติงานเจ้าหน้าที่</h5>
                <h6 class="text-center">{{ head_detail.date_label }}</h6>

                <!-- :frozenValue="locked1" -->
                <DataTable
                    class="text-sm"
                    :value="data.main"
                    :paginator="true"
                    :exportable="true"
                    ref="dt"
                    :rows="20"
                    :loading="isLoading"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    :rowsPerPageOptions="[10, 20, 50]"
                    responsiveLayout="scroll"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                >
                    <Column
                        field="StaffNumber"
                        header="รหัสเจ้าหน้าที่"
                        class="text-center"
                        style="width: 10%"
                    >
                    </Column>
                    <Column
                        field="StaffFullName"
                        header="ชื่อ"
                        class="text-center"
                        style="width: 20%"
                    >
                    </Column>
                    <Column
                        field="StaffOrganization"
                        header="หน่วยงาน"
                        class="text-center"
                        style="width: 20%"
                    >
                    </Column>
                    <Column
                        field="r1"
                        header="จำนวนที่ผสม (ตัว)"
                        class="text-center"
                        style="width: 20%"
                    >
                    </Column>
                    <Column
                        field="r2"
                        header="จำนวนที่ผสม (ครั้ง)"
                        class="text-center"
                        style="width: 20%"
                    >
                    </Column>
                    <Column
                        field="r3"
                        header="ผ.ท.1 (ตัว)"
                        class="text-center"
                        style="width: 10%"
                    >
                    </Column>
                    <Column
                        field="r4"
                        header="ตรวจท้อง(ตัว)"
                        class="text-center"
                        style="width: 20%"
                    >
                    </Column>
                    <Column
                        field="r5"
                        header="ท้อง(ตัว)"
                        class="text-center"
                        style="width: 20%"
                    >
                    </Column>
                    <!-- <Column
                        field="percent"
                        header="อัตราการผสมติด"
                        class="text-center"
                        style="width: 20%"
                    >
                    </Column> -->
                    <Column
                        field="childM"
                        header="จำนวนลูกเกิด (ผู้)"
                        class="text-center"
                        style="width: 20%"
                    >
                    </Column>
                    <Column
                        field="childF"
                        header="จำนวนลูกเกิด (เมีย)"
                        class="text-center"
                        style="width: 20%"
                    >
                    </Column>
                    <Column
                        field="childT"
                        header="จำนวนลูกเกิด (รวม)"
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
import axios from "axios";
import { mapGetters } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import dayjs from "dayjs";
import { format } from "date-fns";
import { th } from "date-fns/locale";
// import dayjs from "dayjs";
// import { ref } from "vue";

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
            head_detail: {
                date_label: "",
            },
            locked1: [],
            title: "รายงานการปฏิบัติงานเจ้าหน้าที่",
            data: [],
            url: {
                AIZone: "/ai-zone/selection?includeAll=false&isActive=1",
                OrganizationZone:
                    "/organization-zone/selection?includeAll=false&isActive=1",
                Province: "/province/selection?includeAll=false&isActive=1",
                Amphur: "/amphur/selection?includeAll=false&isActive=1",
                Tumbol: "/tumbol/selection?includeAll=false&isActive=1",
                OrganizationType:
                    "/organization-type/selection?includeAll=false&isActive=1",
                Organization:
                    "/organization/selection?includeAll=false&isActive=1",
                Farm: "/farm/selection?includeAll=false&isActive=1",
                Project: "/project/selection?includeAll=false&isActive=1",
                Report: "/report/report3",
                Staff: "/staff/selection?includeAll=false",
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
                isActive: 1,
            },
            isSelectAIZoneDisabled: false,
            isSelectOrganizationZoneDisabled: false,
            isSelectDayDisabled: false,
            isSelectCreatedDayDisabled: false,
            isSelectAIDayDisabled: false,
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
        // ค้นหา

        "data.main"() {},
        "search.created_day"(val) {
            if (val) {
                // this.search.day = null;
                this.isSelectDayDisabled = true;
                this.isSelectCreatedDayDisabled = false;
            } else {
                this.isSelectDayDisabled = false;
                this.isSelectCreatedDayDisabled = false;
            }

            //   this.fetchReport();

            if (this.isLoading == false) {
                // this.isLoading = true;
                setTimeout(() => {
                    this.loadDefault();
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.day"(val) {
            if (val) {
                // this.search.created_day = null;
                this.isSelectDayDisabled = false;
                this.isSelectCreatedDayDisabled = true;
            } else {
                this.isSelectDayDisabled = false;
                this.isSelectCreatedDayDisabled = false;
            }

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
            this.locked1.push(data);
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
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
        },
        load() {
            this.isLoading = true;
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
                params["OrganizationProvinceID"] = this.search.ProvinceID;
            }

            if (this.search.AmphurID != null) {
                params["OrganizationAmphurID"] = this.search.AmphurID;
            }

            if (this.search.TumbolID != null) {
                params["OrganizationTumbolID"] = this.search.TumbolID;
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
                                item.OrganizationCode +
                                ", " +
                                item.OrganizationName,
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
            this.isLoading = true;
            let params = {};

            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null
            ) {
                params["AIZoneID"] =
                    this.user.Staff.Organization.OrganizationAiZoneID ||
                    undefined;
                return;
            }

            if (this.search.AIZoneID != null) {
                params["AIZoneID"] = this.search.AIZoneID;
            }

            if (this.search.OrganizationZoneID != null) {
                params["OrganizationZoneID"] = this.search.OrganizationZoneID;
            }

            if (this.search.ProvinceID) {
                params["ProvinceID"] = this.search.ProvinceID;
            }

            if (this.search.AmphurID) {
                params["AmphurID"] = this.search.AmphurID;
            }
            if (this.search.TumbolID) {
                params["TumbolID"] = this.search.TumbolID;
            }

            if (this.search.OrganizationID) {
                params["OrganizationID"] = this.search.OrganizationID;
            }

            if (this.search.StaffID) {
                params["StaffID"] = this.search.StaffID;
            }

            if (this.search.OrganizationTypeID) {
                params["OrganizationTypeID"] = this.search.OrganizationTypeID;
            }
            console.log(this.search.StaffStatus);
            if (this.search.StaffStatus) {
                params["StaffStatus"] = this.search.StaffStatus;
            }

            params["StartDate"] = this.search.StartDate
                ? dayjs(this.search.StartDate).format("YYYY-MM-DD")
                : undefined;
            params["EndDate"] = this.search.EndDate
                ? dayjs(this.search.EndDate).format("YYYY-MM-DD")
                : undefined;

            if (this.animal_id == 1) {
                params["AnimalTypeID"] = "[1,2,41,42]";
                this.localAnimal = "โค";
            } else if (this.animal_id == 2) {
                params["AnimalTypeID"] = "[3,4,43,44]";
                this.localAnimal = "กระบือ";
            } else if (this.animal_id == 3) {
                params["AnimalTypeID"] = "[17,18,45,46]";
            }

            if (this.search.isActive != null) {
                params["StaffIsActive"] = this.search.isActive;
            } else {
                params["StaffIsActive"] = 1;
            }

            axios
                .get(this.url.Report, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    console.log(res);
                    if (this.search.created_day) {
                        this.head_detail.date_label =
                            "ช่วงวันที่ " +
                            dayjs(this.search.created_day[0])
                                .locale("th")
                                .format("DD/MM/YYYY") +
                            " - " +
                            dayjs(this.search.created_day[1])
                                .locale("th")
                                .format("DD/MM/YYYY");
                    }
                    this.data.main = res.data;
                })
                .finally(() => {
                    this.isLoading = false;
                    this.loader = true;
                });
        },
        format(date) {
            const dayStart = date.getDate();
            const monthStart = date.getMonth();
            const yearStart = date.getFullYear() + 543;
            const formatStart = format(
                new Date(yearStart, monthStart, dayStart),
                "dd/MM/yyyy",
                {
                    locale: th,
                }
            );
            return `${formatStart}`;
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
