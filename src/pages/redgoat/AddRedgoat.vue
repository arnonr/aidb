<template>
    <div class="grid">
        <div class="col-12">
            <PageTitle title="เพิ่มข้อมูล" :pages="breadcrumb" />

            <div class="card">
                <h1 class="text-2xl text-600 mb-5">เพิ่มข้อมูล RedGoat</h1>
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
                    </div>
                    <div class="field col-12 sm:col-4">
                        <label
                            for="date"
                            class="block text-600 text-sm font-bold mb-2"
                            >วันที่บันทึก<span class="text-red-500">
                                *</span
                            ></label
                        >

                        <Datepicker
                            v-model="form.RedGoatDate"
                            :class="{
                                'p-invalid': !form.RedGoatDate && valid,
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

                    <div class="field col-12 sm:col-4">
                        <label
                            for="codeofficer"
                            class="block text-600 text-sm font-bold mb-2"
                            >รอบการบันทึก<span class="text-red-500">
                                *</span
                            ></label
                        >
                        <Dropdown
                            :autoOptionFocus="true"
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            id="selectedScheme"
                            placeholder="รอบการบันทึก"
                            :options="project_level"
                            optionLabel="name"
                            :class="{
                                'p-invalid': !form.RedGoatRound && valid,
                            }"
                            v-model="form.RedGoatRound"
                        />
                    </div>
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
                        <!-- <Column
                            field="AnimalID"
                            header="น้ำหนัก(กก.)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.Weigth"
                                    />
                                </div>
                            </template>
                        </Column> -->
                        <Column
                            field="AnimalID"
                            header="ความสูงหัวไหล่(ซม.)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.ShoulderHeight"
                                    />
                                </div>
                            </template>
                        </Column>
                        <Column
                            field="AnimalID"
                            header="ความกว้างหัวไหล่(ซม.)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.ShoulderWidth"
                                    />
                                </div>
                            </template>
                        </Column>
                        <Column
                            field="AnimalID"
                            header="ความยาวลำตัว(ซม.)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.BodyLength"
                                    />
                                </div>
                            </template>
                        </Column>
                        <Column
                            field="AnimalID"
                            header="ความแข็งแรงของหลัง(ส่วนเอว)(คะแนน)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.WaistScore"
                                    />
                                </div>
                            </template>
                        </Column>
                        <Column
                            field="AnimalID"
                            header="ความกว้างเชิงกราน(ซม.)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.PelvisWidth"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="มุมสะโพกมุมเฉียง(ซม.)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.HipCurve"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ความยาวสะโพก(ซม.)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.HipLength"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="เส้นรอบวงอัณฑะ(ซม.) เฉพาะเพศผู้"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.TestisLength"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ลักษณะขาหลังด้านหลัง(คะแนน)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.LegHindScore"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ลักษณะขาหลังด้านข้าง(คะแนน)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.LegSideScore"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ลักษณะการเดิน(คะแนน)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.WalkingScore"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ความกว้างช่องอก(ซม.)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.ChestWidth"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ความลึกลำตัว(ซม.)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.BodyDeep"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ความกางของกระดูกซี่โครง(คะแนน)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.RibWidth"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="การยึดเกาะของเต้านมด้านหน้า(คะแนน) เฉพาะเพศเมีย"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="
                                            slotProps.data.BreastFrontScore
                                        "
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ความสูงของเนื้อเยื่อเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.BreastHeight"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ความกว้างของเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.BreastWidth"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ความแข็งแรงของเอ็นยึดเต้านม(ซม.) เฉพาะเพศเมีย"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.BreastLigament"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ความลึกของเต้านม(ซม.) เฉพาะเพศเมีย"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.BreastDeep"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ตำแหน่งของหัวนมด้านหลัง(คะแนน) เฉพาะเพศเมีย"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.BreastHindScore"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ตำแหน่งของหัวนมด้านข้าง(คะแนน) เฉพาะเพศเมีย"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.BreastSideScore"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ความยาวของหัวนม(ซม.) เฉพาะเพศเมีย"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.BreastLength"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="ลักษณะของหัวนม(คะแนน) เฉพาะเพศเมีย"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.TitsScore"
                                    />
                                </div>
                            </template>
                        </Column>

                        <Column
                            field="AnimalID"
                            header="หมายเหตุ(ถ้ามี)"
                            class="text-center"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <div>
                                    <InputText
                                        class="w-full"
                                        v-model="slotProps.data.Remark"
                                    />
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
            postRedGoat: "/red-goat/multisave",
            urlOrganization: "/organization/selection?includeAll=false",
            urlDisease: "/red-goat",
            urlDiseaseMethod: "/disease-method",
            DiseaseNextMonth: [
                { label: "1 เดือน", id: 1 },
                { label: "2 เดือน", id: 2 },
                { label: "3 เดือน", id: 3 },
                { label: "6 เดือน", id: 6 },
            ],
            id: "AnimalID",
            selectedIds: [],
            project_level: [
                {
                    id: "1",
                    name: "1 เดือน",
                },
                {
                    id: "2",
                    name: "1 ปี",
                },
            ],
            columns: [
                {
                    field: "show_id",
                    header: "ลำดับ",
                },
                {
                    field: "AnimalEarID",
                    header: "หมายเลขใบหู",
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
                    field: "AnimalStatusName",
                    header: "สถานะ",
                },
                // {
                //     field: "AnimalFarm.FarmName",
                //     header: "สัตว์อยู่ที่ฟาร์ม...",
                // },
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
                { label: "ข้อมูล : RedGoat", to: "/activity/disease" },
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

            console.log(this.form.Animal);

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
                    this.data = response.data.rows.map((x) => {
                        return {
                            AnimalID: x.AnimalID,
                            AnimalEarID: x.AnimalEarID,
                            AnimalAge: x.AnimalAge,
                            AnimalName: x.AnimalName,
                            AnimalStatusName: x.AnimalStatus.AnimalStatusName,
                        };
                    });

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
                !this.form.RedGoatDate ||
                !this.form.ResponsibilityStaffID ||
                !this.form.RedGoatRound
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

            let data = [];
            data = this.form.Animal.map((x) => {
                return {
                    RedGoatDate: dayjs(this.form.RedGoatDate).format(
                        "YYYY-MM-DD"
                    ),
                    ResponsibilityStaffID: this.form.ResponsibilityStaffID,
                    CreatedUserID: this.form.ResponsibilityStaffID,
                    CreatedDatetime: dayjs().format("YYYY-MM-DD"),
                    RedGoatRound: this.form.RedGoatRound.id,
                    ...x,
                };
            });

            try {
                await axios.post(this.postRedGoat, {
                    animals: data,
                });

                this.$toast.add({
                    severity: "success",
                    summary: "สำเร็จ",
                    detail: "ข้อมูลถูกบันทึก",
                    life: 2000,
                });
                setTimeout(() => {
                    this.$router.push("/project/redgoat");
                }, 3000);
            } catch (error) {
                console.error("Error saving data:", error);
                this.$toast.add({
                    severity: "error",
                    summary: "ล้มเหลว",
                    detail: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
                    life: 5000,
                });
            } finally {
                this.isLoading = false;
            }
            //
        },
        selected($event, id) {
            console.log(id);
            let item = this.form.Animal.find((x) => {
                return x.AnimalID == id;
            });
            item["DiseaseResultID"] = $event.value;
        },
        onSelectionChange(event) {
            console.log(event);
        },
    },
    unmounted() {
        this.controller.abort();
    },
};
</script>
