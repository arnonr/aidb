<template>
    <div class="grid flex align-items-center mt-3 mb-5">
        <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">{{ name }}</h1>
        </div>
        <div class="col-12 md:col-6 md:text-right">
            <Button
                label="เพิ่มกิจกรรม"
                icon="pi pi-plus"
                class="w-full md:w-auto"
                @click="open"
                v-if="permit[0].IsAdd && animalInfo.isActive == 1"
            />
        </div>
    </div>
    <DataTable
        class="text-sm"
        :value="data"
        :paginator="true"
        :rows="10"
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
                    v-if="
                        slotProps.data.show_id == total ||
                        this.user.GroupID == 1
                    "
                    label="แก้ไข"
                    icon="pi pi-pencil"
                    @click="edit(slotProps.data.show_id - 1)"
                    class="p-button-sm p-button-outlined p-button-warning"
                    :model="getItems(slotProps.data.show_id - 1)"
                    :disabled="this.animalInfo.isActive == 0"
                >
                </SplitButton>
                <!-- <SplitButton
          v-else
          label="แก้ไข"
          icon="pi pi-pencil"
          @click="edit(slotProps.index)"
          class="p-button-sm p-button-outlined p-button-warning"
          :model="getItems(slotProps.index)"
        >
        </SplitButton> -->
            </template>
        </Column>
        <template #empty> ไม่พบข้อมูล </template>
        <template #loading>
            <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
        </template>
    </DataTable>
    <Dialog
        :draggable="false"
        :header="formheader + name"
        v-model:visible="display"
        :style="{ width: '50vw' }"
        :modal="true"
        v-on:after-hide="clear()"
    >
        <div class="grid">
            <div class="col-12">หมายเลขสัตว์ : {{ show.id }}</div>
            <div class="col-12">ชื่อ : {{ show.name }}</div>
            <div class="col-12">ฟาร์ม : {{ show.farm }}</div>
        </div>
        <form class="grid mt-2">
            <div class="col-12 lg:col-12">
                <div class="grid">
                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            รหัสเจ้าหน้าที่ผสมเทียม<span class="text-red-500">
                                *</span
                            ></label
                        >
                        <Dropdown
                            :virtualScrollerOptions="{ itemSize: 38 }"
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            placeholder="เลือกรหัสเจ้าหน้าที่ผสมเทียม"
                            optionLabel="StaffFullName"
                            optionValue="StaffID"
                            v-model="data[index].ResponsibilityStaffID"
                            :options="selection.Staff"
                            :filterFields="[
                                'StaffNumber',
                                'StaffGivenName',
                                'StaffSurname',
                            ]"
                            :filter="true"
                            filterPlaceholder="รหัสเจ้าหน้าที่ผสมเทียม"
                            :class="{
                                'p-invalid':
                                    !data[index].ResponsibilityStaffID && valid,
                            }"
                        >
                        </Dropdown>
                    </div>

                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            วันที่ติดตาม<span class="text-red-500">
                                *</span
                            ></label
                        >
                        <!-- <Calendar
              :manualInput="false"
              :maxDate="new Date()"
              v-model="data[index].CheckupDate"
              dateFormat="dd/mm/yy"
              class="w-full"
              :class="{
                'p-invalid': !data[index].CheckupDate && valid,
              }"
            /> -->

                        <Datepicker
                            v-model="data[index].CheckupDate"
                            :class="{
                                'p-invalid': !data[index].CheckupDate && valid,
                            }"
                            id="dateRange"
                            locale="th"
                            :format="format"
                            utc
                            :enableTimePicker="false"
                            :maxDate="new Date()"
                            cancelText="ยกเลิก"
                            selectText="ยืนยัน"
                            placeholder="วันที่ติดตาม"
                        >
                            <template #year-overlay-value="{ text }">
                                {{ parseInt(text) + 543 }}
                            </template>
                            <template #year="{ year }">
                                {{ year + 543 }}
                            </template>
                        </Datepicker>
                    </div>
                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            คะแนนร่างกาย</label
                        >
                        <Dropdown
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            placeholder="เลือกคะแนนร่างกาย"
                            optionLabel="BCSName"
                            optionValue="BCSID"
                            v-model="data[index].BCSID"
                            :options="selection.BCSID"
                        />
                    </div>
                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            น้ำหนัก(กก.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].Weight"
                            class="w-full"
                        />
                    </div>
                    <div class="col-12 lg:col-6" v-if="animal_id == 2">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ความกว้างช่วงอก (ซม.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].ChestWidth"
                            class="w-full"
                        />
                    </div>
                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            รอบอก(ซม.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].PerimeterChest"
                            class="w-full"
                        />
                    </div>
                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ความยาวลำตัว (ซม.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].BodyLength"
                            class="w-full"
                        />
                    </div>
                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ส่วนสูง(ซม.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].Height"
                            class="w-full"
                        />
                    </div>
                    <div class="col-12 lg:col-6" v-if="show.AnimalSexID == 1">
                        <label class="block text-600 text-sm font-bold mb-2">
                            เส้นรอบวงอัณฑะ (ซม.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].PerimeterBall"
                            class="w-full"
                        />
                    </div>
                    <div class="col-12 lg:col-6" v-if="animal_id == 2">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ความสูงหัวไหล่ (ซม.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].ShoulderHeight"
                            class="w-full"
                        />
                    </div>
                    <div class="col-12 lg:col-6" v-if="animal_id == 2">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ความสูงสะโพก (ซม.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].HipHeight"
                            class="w-full"
                        />
                    </div>
                    <div class="col-12 lg:col-6" v-if="animal_id == 2">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ความยาวรอบอก (ซม.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].HeartGirth"
                            class="w-full"
                        />
                    </div>
                    <div class="col-12 lg:col-6" v-if="animal_id == 2">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ความยาวสะโพก (ซม.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].RumpLength"
                            class="w-full"
                        />
                    </div>
                    <div class="col-12 lg:col-6" v-if="animal_id == 2">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ความกว้างช่วงเชิงกราน (ซม.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].RumpWidth"
                            class="w-full"
                        />
                    </div>
                    <div class="col-12 lg:col-6" v-if="animal_id == 2">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ความกว้างช่วงสะโพก (ซม.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].HipWidth"
                            class="w-full"
                        />
                    </div>
                    <div class="col-12 lg:col-6" v-if="animal_id == 2">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ความยาวโคนขาหลัง (ซม.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].ShoulderLength"
                            class="w-full"
                        />
                    </div>
                    <div class="col-12 lg:col-6" v-if="animal_id == 2">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ความยาวหัวไหล่ (ซม.)
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].RearLegLength"
                            class="w-full"
                        />
                    </div>
                    <div
                        class="col-12 text-center mt-5 flex justify-content-between"
                    >
                        <Button
                            label="ยกเลิก"
                            class="p-button-secondary w-full mr-3"
                            @click="close()"
                        />
                        <Button
                            label="บันทึกข้อมูล"
                            class="ml-3 p-button-info w-full"
                            @click="add()"
                        />
                    </div>
                </div>
            </div>
        </form>
    </Dialog>
    <Dialog
        header="ตรวจสอบข้อมูล"
        v-model:visible="display_delete"
        :style="{ width: '350px' }"
        :modal="true"
    >
        <div class="confirmation-content text-center">
            <i class="pi pi-trash" style="font-size: 5rem" />
            <br />
            <span class="text-xl"
                >คุณต้องการลบ{{ name }}ลำดับที่
                {{ data[index].show_id }} ใช่หรือไม่</span
            >
        </div>
        <template #footer>
            <div class="col-12 text-center flex justify-content-between">
                <Button
                    label="ยกเลิก"
                    @click="close_delete()"
                    class="p-button-secondary w-full mr-3"
                />
                <Button
                    label="ยืนยัน"
                    @click="remove()"
                    class="p-button-danger w-full ml-3"
                />
            </div>
        </template>
    </Dialog>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
export default {
    emits: ["refresh_secret_status", "onclear_display"],
    props: {
        permit: {
            type: Array,
            required: true,
        },
        display_prop: {
            type: Boolean,
            required: false,
            default: false,
        },
        animalInfo: {
            type: Object,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            // API
            url: "/progress-checkup",

            // ID
            id: "ProgressCheckupID",
            // Name
            name: "บันทึกการเจริญเติบโต",

            //load_selection
            LoadSelection: {
                Staff: "/staff/selection?includeAll=false&isActive=1",
                BCSID: "/bcs",
            },

            // Selection
            show: {},
            selection: {
                Staff: null,
                BCSID: null,
            },
            gender: null,
            // Table Field
            columns: [
                {
                    field: "show_id",
                    header: "ลำดับ",
                },
                {
                    field: "ThaiCheckupDate",
                    header: "วันที่ติดตาม",
                },

                {
                    field: "BCS.BCSName",
                    header: "คะแนนร่างกาย",
                },
                {
                    field: "Staff.StaffFullName",
                    header: "เจ้าหน้าที่",
                },
            ],

            // Search
            isSelection: false,

            // Static Data
            total: null,
            isLoading: false,
            data: [],
            valid: false,
            index: null,
            display: false,
            display_delete: false,
            temp: null,
            formheader: "",
            // uneditable
            items: [
                {
                    label: "แก้ไข",
                    icon: "pi pi-pencil",
                },
                {
                    label: "ลบ",
                    icon: "pi pi-times",
                },
            ],
            controller: new AbortController(),
        };
    },
    async mounted() {
        await this.load();
        await this.load_selection();
        if (this.display_prop && this.permit[0].IsAdd) {
            this.open();
        }
    },
    watch: {
        AnimalID(val) {
            if (val) {
                this.load();
            } else {
                this.data = [];
            }
        },
    },
    computed: {
        ...mapGetters({
            user: "user",

            AnimalID: "AnimalID",
            animal_id: "animal_id",
            AnimalSecretStatus: "AnimalSecretStatus",
        }),
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
        getItems(id) {
            const items = [
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
        // on modal hide
        clear() {
            if (
                this.index == this.data.length - 1 &&
                !this.data[this.index].CreatedUserID
            ) {
                this.data.splice(this.index, 1);
            } else {
                this.data[this.index] = this.temp;
                this.temp = null;
            }
            this.formheader = "";
            this.index = null;
            this.valid = false;
            this.$emit("onclear_display");
        },
        // validate templates
        validation() {
            if (
                !this.data[this.index].ResponsibilityStaffID ||
                !this.data[this.index].CheckupDate ||
                !this.data[this.index].AnimalID
            ) {
                this.$toast.add({
                    severity: "error",
                    summary: "ล้มเหลว",
                    detail: "กรุณากรอกข้อมูล",
                    life: 5000,
                });
                this.valid = true;
                return false;
            }

            return true;
        },
        //load selection
        load_selection() {
            return new Promise((resolve) => {
                if (this.isSelection == false) {
                    this.isSelection = true;
                    for (let i in this.LoadSelection) {
                        if (this.LoadSelection[i] == "/staff") {
                            this.LoadSelection[i] =
                                this.LoadSelection[i] +
                                "?StaffOrganizationID=" +
                                this.user.Staff.StaffOrganizationID +
                                "&includeAll=false&isActive=1";
                        }

                        axios
                            .get(this.LoadSelection[i], {
                                signal: this.controller.signal,
                            })
                            .then((response) => {
                                this.selection[i] = response.data.rows;
                            });
                    }
                }
                resolve();
            });
        },
        // main load
        load() {
            return new Promise((resolve) => {
                this.isLoading = true;
                axios
                    .get(`${this.url}?AnimalID=${this.AnimalID}`, {
                        signal: this.controller.signal,
                    })
                    .then((response) => {
                        this.data = response.data.rows.filter(
                            (item) => item.AnimalID === this.AnimalID
                        );
                        this.total = this.data.length;

                        for (let i = 0; i < this.data.length; i++) {
                            this.data[i].show_id = i + 1;
                        }
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
                axios
                    .get(`animal?AnimalID=${this.AnimalID}`, {
                        signal: this.controller.signal,
                    })
                    .then((response) => {
                        this.show.id = response.data.rows[0].AnimalEarID;
                        this.show.name = response.data.rows[0].AnimalName;
                        this.show.AnimalSexID =
                            response.data.rows[0].AnimalSexID;
                        this.show.farm = `${response.data.rows[0].AnimalFarm.FarmIdentificationNumber}, ${response.data.rows[0].AnimalFarm.FarmName} `;
                        this.show.isActive = response.data.rows[0].isActive;
                    });
                resolve();
            });
        },
        // create or update data
        add() {
            if (this.validation() == false) {
                return;
            }
            if (
                this.index == this.data.length - 1 &&
                !this.data[this.index].CreatedUserID
            ) {
                //create data
                axios
                    .post(this.url, this.data[this.index])
                    .then(() => {
                        setTimeout(() => {
                            this.load();
                        }, 1500);
                        this.close();
                        this.$toast.add({
                            severity: "success",
                            summary: "สำเร็จ",
                            detail: "เพิ่มข้อมูลเสร็จสิ้น",
                            life: 5000,
                        });
                    })
                    .catch((err) => {
                        this.$toast.add({
                            severity: "error",
                            summary: "ล้มเหลว",
                            detail: err.response.data.error.message,
                            life: 5000,
                        });
                    });
            }
            // update data
            else if (this.index < this.data.length) {
                if (this.validation() == false) {
                    return;
                }
                delete this.data[this.index].Staff;
                delete this.data[this.index].BCS;
                delete this.data[this.index].show_id;
                axios
                    .put(
                        this.url + "/" + this.data[this.index][this.id],
                        this.data[this.index]
                    )
                    .then(() => {
                        this.close();
                        setTimeout(() => {
                            this.load();
                        }, 1500);
                        this.$toast.add({
                            severity: "success",
                            summary: "สำเร็จ",
                            detail: "แก้ไขข้อมูลเสร็จสิ้น",
                            life: 5000,
                        });
                    })
                    .catch((err) => {
                        this.$toast.add({
                            severity: "error",
                            summary: "ล้มเหลว",
                            detail: err.response.data.error.message,
                            life: 5000,
                        });
                    });
            }
            //   this.$emit("refresh_secret_status");
        },
        // remove data
        remove() {
            axios
                .delete(this.url + "/" + this.data[this.index][this.id])
                .then(() => {
                    this.close_delete();
                    this.load();
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "ลบข้อมูลเสร็จสิ้น",
                        life: 5000,
                    });
                });
            //   this.$emit("refresh_secret_status");
        },
        // form open add
        open() {
            this.index = this.data.length;
            this.formheader = "เพิ่ม";
            this.data.push({
                AnimalID: this.AnimalID,
            });

            this.data[this.index].ResponsibilityStaffID = this.user.StaffID;

            this.display = true;
        },
        //form open edit
        edit(id) {
            if (this.permit[0].IsUpdate == 0) {
                this.$toast.add({
                    severity: "error",
                    summary: "ล้มเหลว",
                    detail: "ไม่มีสิทธิ์แก้ไข",
                    life: 5000,
                });
                return;
            }
            this.index = id;
            this.formheader = "แก้ไข";
            this.temp = JSON.parse(JSON.stringify(this.data[this.index]));
            this.display = true;
        },
        close() {
            this.display = false;
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
            this.index = id;
            this.display_delete = true;
        },
        close_delete() {
            this.display_delete = false;
        },
    },
    unmounted() {
        this.controller.abort();
    },
};
</script>
