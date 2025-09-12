<template>
    <div class="grid">
        <div class="col-12">
            <PageTitle title="เพิ่มข้อมูลตรวจโรค" :pages="breadcrumb" />

            <div class="card">
                <h1 class="text-2xl text-600 mb-5">เพิ่มข้อมูลตรวจโรค</h1>
                <div v-if="loader" class="formgrid grid mb-3">
                    <div class="field col-12 sm:col-12">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ฟาร์ม<span class="text-red-500"> *</span>
                        </label>
                        <InputText
                            class="w-full"
                            v-model="form.FullName"
                            disabled
                        />
                        <!-- <Dropdown
              v-if="form.FarmID == null"
              class="w-full"
              v-model="form.FarmID"
              :options="Farm.data"
              optionLabel="FarmIdentificationNumber"
              optionValue="FarmID"
              :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: onLazyLoad,
                itemSize: Farm.total,
                showLoader: true,
                loading: loading,
                delay: 250,
              }"
              :filter="true"
              :showClear="true"
              placeholder="เลือกหมายเลขฟาร์ม"
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

              <template #option="slotProps">
                <div class="p-dropdown-car-option">
                  <span
                    >{{ slotProps.option.FarmIdentificationNumber }} |
                    {{ slotProps.option.FarmName }}
                  </span>
                </div>
              </template>
            </Dropdown> -->
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label
                            for="diseaseexamined"
                            class="block text-600 text-sm font-bold mb-2"
                            >โรคที่ทำการตรวจ<span class="text-red-500">
                                *</span
                            ></label
                        >
                        <Dropdown
                            class="w-full"
                            v-model="form.DiseaseID"
                            :options="itemDisease.disease"
                            optionLabel="DiseaseName"
                            optionValue="DiseaseID"
                            :class="{ 'p-invalid': !form.DiseaseID && valid }"
                            :filter="true"
                            :showClear="true"
                            placeholder="เลือกหรือค้นหาโรคที่ตรวจ"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label
                            for="chooseinspection"
                            class="block text-600 text-sm font-bold mb-2"
                            >เลือกวิธีการตรวจ</label
                        >
                        <Dropdown
                            class="w-full"
                            v-model="form.DiseaseMethodID"
                            :options="itemDisease.diseasemethod"
                            optionLabel="DiseaseMethodName"
                            optionValue="DiseaseMethodID"
                            :filter="true"
                            :showClear="true"
                            placeholder="เลือกหรือค้นหาวิธีการตรวจ"
                        >
                        </Dropdown>
                    </div>

                    <div class="field col-12 sm:col-6">
                        <label
                            for="other"
                            class="block text-600 text-sm font-bold mb-2"
                            >วิธีอื่น ๆ</label
                        >
                        <InputText
                            type="text"
                            v-model="form.DiseaseMethodOther"
                            class="w-full"
                            placeholder="วิธีอื่น ๆ"
                        />
                    </div>
                    <!-- <div class="field col-12 sm:col-6" /> -->

                    <div class="field col-12 sm:col-6">
                        <label
                            for="date"
                            class="block text-600 text-sm font-bold mb-2"
                            >วันที่ตรวจ<span class="text-red-500">
                                *</span
                            ></label
                        >

                        <Datepicker
                            v-model="form.DiseaseActivityDate"
                            :class="{
                                'p-invalid': !form.DiseaseActivityDate && valid,
                            }"
                            id="dateRange"
                            locale="th"
                            :format="format"
                            utc
                            :enableTimePicker="false"
                            :maxDate="new Date()"
                            cancelText="ยกเลิก"
                            selectText="ยืนยัน"
                            placeholder="เลือกวันที่"
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

                    <div class="field col-12 sm:col-4">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ระยะห่างการตรวจครั้งต่อไป
                        </label>
                        <Dropdown
                            class="w-full"
                            v-model="form.DiseaseNextMonth"
                            :options="DiseaseNextMonth"
                            optionLabel="label"
                            optionValue="id"
                            :class="{ 'p-invalid': valid }"
                            :showClear="true"
                            placeholder="ระยะห่างการตรวจครั้งต่อไป"
                        />
                    </div>

                    <div class="field col-12 sm:col-4">
                        <label
                            for="nexttime"
                            class="block text-600 text-sm font-bold mb-2"
                            >วันที่ตรวจครั้งถัดไป<span class="text-red-500">
                                *</span
                            ></label
                        >

                        <Datepicker
                            v-model="form.DiseaseNextDate"
                            :class="{
                                'p-invalid': !form.DiseaseNextDate && valid,
                            }"
                            id="dateRange"
                            locale="th"
                            :format="format"
                            utc
                            :enableTimePicker="false"
                            cancelText="ยกเลิก"
                            selectText="ยืนยัน"
                            placeholder="เลือกวันที่"
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

                    <div class="field col-12 sm:col-4">
                        <label
                            for="codeofficer"
                            class="block text-600 text-sm font-bold mb-2"
                            >รหัสเจ้าหน้าที่รับผิดชอบ<span class="text-red-500">
                                *</span
                            ></label
                        >
                        <Dropdown
                            class="w-full"
                            :options="personal"
                            optionLabel="StaffFullName"
                            optionValue="StaffID"
                            placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
                            showClear="true"
                            :filter="true"
                            v-model="form.ResponsibilityStaffID"
                            :class="{
                                'p-invalid': !form.StaffID && valid,
                            }"
                        />
                    </div>

                    <div class="field col-12 sm:col-6">
                        <label
                            for="inspectionagency"
                            class="block text-600 text-sm font-bold mb-2"
                            >หน่วยงานที่ตรวจ</label
                        >
                        <Dropdown
                            class="w-full"
                            v-model="form.OrganizationID"
                            :options="organization"
                            optionLabel="OrganizationName"
                            optionValue="OrganizationID"
                            :filter="true"
                            :showClear="true"
                            placeholder="เลือกหน่วยงาน"
                        />
                    </div>
                    <!-- <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              หมายเหตุ
            </label>
            <InputText class="w-full" type="text" v-model="form.Remark" />
          </div> -->
                </div>
                <div v-else class="grid">
                    <div class="col-12">
                        <Skeleton
                            width="20rem"
                            height="2rem"
                            class="mb-4"
                        ></Skeleton>
                    </div>
                    <div class="col-12 sm:col-6 lg:col-4">
                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                        <Skeleton height="2rem"></Skeleton>
                    </div>
                    <div class="col-12 sm:col-6 lg:col-4">
                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                        <Skeleton height="2rem"></Skeleton>
                    </div>
                    <div class="col-12 sm:col-6 lg:col-4">
                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                        <Skeleton height="2rem"></Skeleton>
                    </div>
                    <div class="col-12 sm:col-6 lg:col-4">
                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                        <Skeleton height="2rem"></Skeleton>
                    </div>
                    <div class="col-12 sm:col-6 lg:col-4">
                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                        <Skeleton height="2rem"></Skeleton>
                    </div>
                    <div class="col-12 sm:col-6 lg:col-4">
                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                        <Skeleton height="2rem"></Skeleton>
                    </div>
                    <div class="col-12 sm:col-6 lg:col-4">
                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                        <Skeleton height="2rem"></Skeleton>
                    </div>
                    <div class="col-12 sm:col-6 lg:col-4">
                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                        <Skeleton height="2rem"></Skeleton>
                    </div>
                    <div class="col-12 sm:col-6 lg:col-4">
                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                        <Skeleton height="2rem"></Skeleton>
                    </div>
                    <div class="col-12 sm:col-6 lg:col-4">
                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                        <Skeleton height="2rem"></Skeleton>
                    </div>
                    <div class="col-12 sm:col-6 lg:col-4">
                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                        <Skeleton height="2rem"></Skeleton>
                    </div>
                    <div class="col-12">
                        <div class="grid">
                            <div class="col-12">
                                <Skeleton width="5rem" class="mb-2"></Skeleton>
                                <Skeleton height="2rem" class="mb-2"></Skeleton>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="form.FarmID" class="mt-5">
                    <DataTable
                        class="text-sm"
                        :value="data"
                        :loading="isLoading"
                        v-model:selection="form.Animal"
                        :dataKey="id"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                        responsiveLayout="scroll"
                        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
                        @sort="sort($event)"
                    >
                        <Column
                            selectionMode="multiple"
                            class="text-center"
                        ></Column>
                        <Column
                            v-for="col of columns"
                            :field="col.field"
                            :header="col.header"
                            :key="col.field"
                            class="text-center"
                            :sortable="true"
                        >
                        </Column>
                        <Column
                            field="AnimalID"
                            header="ผลการตรวจ"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <Dropdown
                                        v-model="slotProps.data.DiseaseResultID"
                                        :options="itemDisease.diseaseresult"
                                        optionLabel="DiseaseResultName"
                                        optionValue="DiseaseResultID"
                                        class="w-full"
                                        :class="{
                                            'p-invalid':
                                                !form.DiseaseResultID && valid,
                                        }"
                                        :showClear="true"
                                        :disabled="
                                            !form.AnimalID.includes(
                                                slotProps.data.AnimalID
                                            )
                                        "
                                        placeholder="ผลการตรวจ"
                                        @change="
                                            selected(
                                                $event,
                                                slotProps.data.AnimalID
                                            )
                                        "
                                        id="test"
                                    >
                                    </Dropdown>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                    <Paginator
                        @page="page($event)"
                        :rows="15"
                        :totalRecords="total"
                    ></Paginator>
                    <div class="col-12 text-center mt-5">
                        <router-link to="/activity/disease">
                            <Button
                                label="ยกเลิก"
                                icon="pi pi-times"
                                class="p-button-text mx-2"
                            />
                        </router-link>
                        <Button
                            label="บันทึกข้อมูล"
                            icon="pi pi-save"
                            @click="add()"
                            autofocus
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import { mapGetters } from "vuex";
// import  _  from "lodash";
import PageTitle from "@/components/PageTitle.vue";
import { format } from "date-fns";
import { th } from "date-fns/locale";
export default {
    computed: {
        ...mapGetters({
            animal_id: "animal_id",
            user: "user",
        }),
    },
    components: {
        PageTitle,
    },
    data() {
        return {
            key: this.$route.params.id,
            url: "/animal?FarmID=" + this.$route.params.id,
            apiPersonal: "/staff/selection?includeAll=false",
            postDiseaseActivity: "/disease-activity",
            urlOrganization: "/organization/selection?includeAll=false",
            urlDisease: "/disease",
            urlDiseaseMethod: "/disease-method",
            DiseaseNextMonth: [
                { label: "1 เดือน", id: 1 },
                { label: "2 เดือน", id: 2 },
                { label: "3 เดือน", id: 3 },
                { label: "6 เดือน", id: 6 },
            ],
            id: "AnimalID",
            columns: [
                {
                    field: "show_id",
                    header: "ลำดับ",
                },
                {
                    field: "AnimalEarID",
                    header: "หมายเลขสัตว์",
                },
                {
                    field: "AnimalName",
                    header: "ชื่อสัตว์",
                },
                {
                    field: "AnimalAge",
                    header: "อายุ",
                },
                {
                    field: "AnimalBornType",
                    header: "ลักษณะการเกิด",
                },
                {
                    field: "AnimalStatus.AnimalStatusName",
                    header: "สถานะ",
                },
                {
                    field: "AnimalFarm.FarmName",
                    header: "สัตว์อยู่ที่ฟาร์ม...",
                },
            ],
            isLoading: false,
            loader: false,
            total: null,
            curpage: 0,
            selection: false,
            loading: false,
            valid: false,
            organization: [],

            form: {
                isActive: 1,
                Animal: [],
                AnimalID: [],
                FarmID: this.$route.params.id,
                FarmIdentificationNumber: this.$route.params.farm,
                DiseaseNextMonth: [],
            },
            itemDisease: [],
            data: [],
            Farm: [],
            Lastactivity: null,
            breadcrumb: [
                { label: "ข้อมูลสุขภาพ : ตรวจโรค", to: "/activity/disease" },
                { label: "", to: "" },
            ],
            controller: new AbortController(),
        };
    },
    loadLazyTimeout: null,
    watch: {
        "form.Animal"() {
            let val = [];
            let res = [];

            val = this.form.Animal;
            for (let index = 0; index < val.length; index++) {
                res[index] = val[index].AnimalID;
            }
            this.form.AnimalID = res;

            //   console.log(this.form.AnimalID.value)

            //   form.Animal.select = 1

            return this.form.AnimalID;
        },
        "form.DiseaseNextMonth"() {
            if (this.form.DiseaseNextMonth == 1) {
                this.form.DiseaseNextDate = dayjs(this.form.DiseaseActivityDate)
                    .add(1, "month")
                    .format("YYYY-MM-DD");
            } else if (this.form.DiseaseNextMonth == 2) {
                this.form.DiseaseNextDate = dayjs(this.form.DiseaseActivityDate)
                    .add(2, "month")
                    .format("YYYY-MM-DD");
            } else if (this.form.DiseaseNextMonth == 3) {
                this.form.DiseaseNextDate = dayjs(this.form.DiseaseActivityDate)
                    .add(3, "month")
                    .format("YYYY-MM-DD");
            } else if (this.form.DiseaseNextMonth == 6) {
                this.form.DiseaseNextDate = dayjs(this.form.DiseaseActivityDate)
                    .add(6, "month")
                    .format("YYYY-MM-DD");
            } else {
                console.log("ERROR");
            }
        },
    },
    async mounted() {
        await axios
            .get("/staff/selection?includeAll=false", {
                signal: this.controller.signal,
            })
            .then((response) => {
                this.personal = response.data.rows.map((item) => {
                    return {
                        StaffID: item.StaffID,
                        // StaffNumber: item.StaffNumber,
                        StaffFullName: item.StaffFullName,
                    };
                });
            })
            .finally(() => {
                this.loader = true;
            });
        this.load();

        this.breadcrumb[1].label = this.name;
        this.form.ResponsibilityStaffID = this.user.StaffID;
        this.form.OrganizationID = this.user.Staff.StaffOrganizationID;
    },

    methods: {
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
        async load() {
            this.isLoading = true;
            let url = this.url + "&size=15";
            url += "&page=";
            if (this.curpage) {
                url += this.curpage;
            }
            if (this.form.FarmID) {
                url += "&FarmID=" + this.form.FarmID;
            }

            if (this.animal_id == 1) {
                url += "&AnimalTypeID=" + "[1,2,41,42]";
            } else if (this.animal_id == 2) {
                url += "&AnimalTypeID=" + "[3,4,43,44]";
            } else if (this.animal_id == 3) {
                url += "&AnimalTypeID=" + "[17,18,45,46]";
            }

            axios
                .get(url, { signal: this.controller.signal })
                .then((response) => {
                    this.total = response.data.total;
                    this.data = response.data.rows;

                    if (this.curpage == 0 || this.curpage == 1) {
                        for (let i = 0; i < this.data.length; i++) {
                            this.data[i].DiseaseResultID = 1;
                            this.data[i].show_id = i + 1;
                            if (this.data[i].AnimalBirthDate != null) {
                                // หาจำนวนเดือน
                                var today = new Date();
                                const date1 = dayjs(
                                    this.data[i].AnimalBirthDate
                                );
                                this.data[i].AnimalAge = date1.diff(
                                    today,
                                    "month"
                                );
                                // แปลงเป็น ปี และ เดือน
                                let countyear = this.data[i].AnimalAge / 12;
                                let countmonth = this.data[i].AnimalAge % 12;
                                // ถ้าปีน้อยกว่า 0 ไม่ต้องแสดง
                                if (Math.abs(countyear) < 1) {
                                    if (Math.abs(Math.ceil(countmonth)) != 0) {
                                        this.data[i].AnimalAge =
                                            Math.abs(Math.ceil(countmonth)) +
                                            " เดือน ";
                                    } else {
                                        this.data[i].AnimalAge = "-";
                                    }
                                } else {
                                    this.data[i].AnimalAge =
                                        Math.abs(Math.ceil(countyear)) +
                                        " ปี " +
                                        Math.abs(Math.ceil(countmonth)) +
                                        " เดือน ";
                                }
                            }
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

            axios
                .get(this.urlDisease, {
                    signal: this.controller.signal,
                })
                .then((res) => {
                    this.itemDisease.disease = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
            axios
                .get(this.urlDiseaseMethod, {
                    signal: this.controller.signal,
                })
                .then((res) => {
                    this.itemDisease.diseasemethod = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
            axios
                .get("/disease-result", {
                    signal: this.controller.signal,
                })
                .then((res) => {
                    this.itemDisease.diseaseresult = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
            await axios
                .get(this.urlOrganization, {
                    signal: this.controller.signal,
                })
                .then((response) => {
                    this.organization = response.data.rows;
                })
                .finally(() => {
                    this.loader = true;
                });

            axios
                .get("/farm/" + this.form.FarmID, {
                    signal: this.controller.signal,
                })
                .then((res) => {
                    // this.Farm.data = res.data;

                    let item = res.data;

                    this.form.FarmName = item.FarmName;
                    this.form.FarmProvince = item.Province.ProvinceName;
                    this.form.FarmOrganizationZone = item.OrganizationZone
                        .OrganizationZoneName
                        ? item.OrganizationZone.OrganizationZoneName
                        : "- ";
                    this.form.FarmOwner = item.Farmer
                        ? item.Farmer.FullName
                        : "- ";
                    // console.log(this.form.FarmOrganizationZone);

                    this.form.FullName =
                        "ฟาร์ม " +
                        this.form.FarmName +
                        " (" +
                        this.$route.params.farm +
                        ")" +
                        " | เจ้าของฟาร์ม " +
                        this.form.FarmOwner +
                        " | จังหวัด " +
                        this.form.FarmProvince +
                        " | " +
                        this.form.FarmOrganizationZone;
                    return;
                })
                .finally(() => {
                    this.loader = true;
                });
        },
        validation() {
            if (
                !this.form.DiseaseID ||
                !this.form.DiseaseActivityDate ||
                !this.form.DiseaseNextDate ||
                !this.form.ResponsibilityStaffID ||
                !this.form.AnimalID
            ) {
                this.valid = true;
                this.$toast.add({
                    severity: "error",
                    summary: "ล้มเหลว",
                    detail: "กรุณากรอกข้อมูล",
                    life: 5000,
                });
                return false;
            } else {
                return true;
            }
        },
        async add() {
            if (this.validation() == false) {
                return;
            }

            await axios
                .post(this.postDiseaseActivity, this.form, {
                    signal: this.controller.signal,
                })
                .then(() => {
                    axios
                        .get(this.postDiseaseActivity)
                        .then((res) => {
                            this.Lastactivity = res.data.rows.slice(-1)[0];

                            for (
                                let i = 0;
                                i < this.form.AnimalID.length;
                                i++
                            ) {
                                let DiseaseResultID = this.form.Animal.find(
                                    (x) => {
                                        return (
                                            x.AnimalID == this.form.AnimalID[i]
                                        );
                                    }
                                );

                                axios
                                    .post("/disease-activity-animal", {
                                        DiseaseActivityID:
                                            this.Lastactivity.DiseaseActivityID,
                                        AnimalID: this.form.AnimalID[i],
                                        DiseaseResultID:
                                            DiseaseResultID.DiseaseResultID,
                                        Remark: this.Lastactivity
                                            .DiseaseMethodOther,
                                        isActive: 1,
                                    })
                                    .then(() => {})

                                    .finally(() => {
                                        this.isLoading = false;
                                    });
                            }

                            //   this.load();
                            this.$toast.add({
                                severity: "success",
                                summary: "สำเร็จ",
                                detail: "ข้อมูลตรวจโรคถูกบันทึก",
                                life: 2000,
                            });
                            setTimeout(() => {
                                this.$router.push("/activity/diagnose");
                            }, 3000);
                        })
                        .finally(() => {
                            this.isLoading = false;
                        });
                })
                .catch((err) => {
                    this.$toast.add({
                        severity: "error",
                        summary: "ล้มเหลว",
                        detail: err.response.data.error.message,
                        life: 5000,
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        selected($event, id) {
            let item = this.form.Animal.find((x) => {
                return x.AnimalID == id;
            });

            item["DiseaseResultID"] = $event.value;

            console.log(this.form.Animal);

            // this.DiseaseActivityAnimalResult = [
            //     {
            //         AnimalID: id,
            //         DiseaseResultID: $event.value,
            //     },
            // ];

            //   axios
            //     .put("/disease-activity-animal/" + id, {
            //       DiseaseResultID: $event.value,
            //     })
            //     .then(() => {
            //       this.$toast.add({
            //         severity: "success",
            //         summary: "สำเร็จ",
            //         detail: "อัพเดทข้อมูลเรียบร้อย",
            //         life: 2000,
            //       });
            //     })
            //     .finally(() => {
            //       this.isLoading = false;
            //     });
        },

        // onLazyLoad() {
        //   this.loading = true;

        //   if (this.loadLazyTimeout) {
        //     clearTimeout(this.loadLazyTimeout);
        //   }

        //   this.loadLazyTimeout = setTimeout(() => {
        //     this.loading = false;
        //   }, Math.random() * 1000 + 250);
        // },
    },
    unmounted() {
        this.controller.abort();
    },
};
</script>
