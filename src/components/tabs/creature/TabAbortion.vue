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
                v-if="
                    AnimalSecretStatus.includes(5) &&
                    permit[0].IsAdd &&
                    this.animalInfo.isActive == 1
                "
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
        />
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
                            ประเภทการผสม</label
                        >
                        <InputText
                            v-model="show.type"
                            class="w-full"
                            :disabled="true"
                        />
                    </div>
                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            วันที่ผสม</label
                        >
                        <InputText
                            v-model="show.date"
                            class="w-full"
                            :disabled="true"
                        />
                    </div>

                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ท้องที่</label
                        >
                        <InputText
                            v-model="data[index].PAR"
                            class="w-full"
                            :disabled="true"
                        />
                    </div>
                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ครั้งที่ผสม</label
                        >
                        <InputText
                            v-model="show.TimeNo"
                            class="w-full"
                            :disabled="true"
                        />
                    </div>
                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            วันที่แท้ง<span class="text-red-500">
                                *</span
                            ></label
                        >
                        <!-- <Calendar
              :maxDate="new Date()"
              :manualInput="false"
              v-model="data[index].AbortDate"
              dateFormat="dd/mm/yy"
              class="w-full"
              :class="{
                'p-invalid': !data[index].AbortDate && valid,
              }"
              @update:model-value="date()"
            /> -->

                        <Datepicker
                            v-model="data[index].AbortDate"
                            :class="{
                                'p-invalid': !data[index].AbortDate && valid,
                            }"
                            id="dateRange"
                            locale="th"
                            :format="format"
                            utc
                            :enableTimePicker="false"
                            :maxDate="new Date()"
                            cancelText="ยกเลิก"
                            selectText="ยืนยัน"
                            @update:model-value="date()"
                            placeholder="วันที่แท้ง"
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
                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ลักษณะการแท้ง<span class="text-red-500">
                                *</span
                            ></label
                        >
                        <Dropdown
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            placeholder="เลือกลักษณะการแท้ง"
                            optionLabel="AbortResultName"
                            optionValue="AbortResultID"
                            v-model="data[index].AbortResultID"
                            :options="selection.AbortResultID"
                            :class="{
                                'p-invalid':
                                    !data[index].AbortResultID && valid,
                            }"
                        />
                    </div>

                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ระยะการแท้ง (วัน)</label
                        >
                        <InputText
                            v-model="data[index].AbortDay"
                            class="w-full"
                            :disabled="true"
                        />
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
                            :options="selection.BCS"
                        />
                    </div>
                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ</label
                        >
                        <InputText
                            v-model="data[index].Remark"
                            class="w-full"
                        />
                    </div>
                </div>
            </div>
            <div class="col-12 text-center mt-5 flex justify-content-between">
                <Button
                    label="ยกเลิก"
                    class="p-button-secondary w-full mr-3"
                    @click="close()"
                />
                <Button
                    label="บันทึกข้อมูล"
                    class="ml-3 p-button-info w-full"
                    @click="add()"
                    :disabled="this.isLoading == false ? false : true"
                />
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
import dayjs from "dayjs";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import Swal from "sweetalert2";
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
            url: "/abort-checkup",
            // ID
            id: "AbortCheckupID",
            // Name
            name: "แท้ง",

            //load_selection
            LoadSelection: {
                Staff: "/staff/selection?includeAll=false&isActive=1",
                BCS: "/bcs",
                AbortResultID: "/abort-result",
            },

            // Selection

            selection: {
                Staff: null,
                BCS: null,
                AbortResultID: null,
            },
            show: {},
            // Table Field
            columns: [
                {
                    field: "show_id",
                    header: "ลำดับ",
                },
                {
                    field: "PAR",
                    header: "ท้องที่",
                },
                {
                    field: "TimeNo",
                    header: "ครั้งที่ผสม",
                },
                {
                    field: "ThaiDate",
                    header: "วันที่ผสม",
                },

                // {
                //   field: "Type",
                //   header: "ประเภทการผสม",
                // },

                {
                    field: "ThaiAbortDate",
                    header: "วันที่แท้ง",
                },
                {
                    field: "AbortResultName",
                    header: "ลักษณะการแท้ง",
                },
                {
                    field: "AbortDay",
                    header: "ระยะการแท้ง (วัน)",
                },
                {
                    field: "ResponsibilityStaffName",
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
        await this.load().then(() => {
            this.load_selection();
        });

        if (
            this.display_prop &&
            this.AnimalSecretStatus.includes(5) &&
            this.permit[0].IsAdd
        ) {
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
            AnimalID: "AnimalID",
            animal_id: "animal_id",
            AnimalSecretStatus: "AnimalSecretStatus",
            user: "user",
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
        date() {
            let date1 = dayjs(this.show.datecal);
            let date2 = dayjs(this.data[this.index].AbortDate);
            this.data[this.index].AbortDay = date2.diff(date1, "day");
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
                !this.data[this.index].AbortDate ||
                !this.data[this.index].AbortResultID
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
                var index = 0;
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
                                index++;
                            })
                            .catch(() => {
                                //refresh pages
                                Swal.fire({
                                    icon: "warning",
                                    title: "กำลังโหลดข้อมูล",
                                    text: "กรุณารอซักครู่",
                                });

                                setTimeout(() => {
                                    this.$router.go(0);
                                }, 2000);
                            })
                            .finally(() => {
                                if (
                                    Object.keys(this.LoadSelection).length ==
                                    index
                                ) {
                                    resolve();
                                }
                            });
                    }
                }
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
                        this.total = response.data.total;
                        this.data = response.data.rows;
                        for (let i = 0; i < this.data.length; i++) {
                            this.data[i].show_id = i + 1;
                        }
                    })
                    .finally(() => {
                        this.isLoading = false;
                        resolve();
                    });
            });
        },
        // create or update data
        add() {
            this.isLoading = true;
            if (this.validation() == false) {
                this.isLoading = false;
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
                        this.isLoading = false;
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
                        this.isLoading = false;
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
                        this.isLoading = false;
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
                        this.isLoading = false;
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
        async open() {
            this.index = this.data.length;
            this.formheader = "เพิ่ม";
            this.data.push({
                AnimalID: this.AnimalID,
            });
            this.data[this.index].ResponsibilityStaffID = this.user.StaffID;
            await axios
                .get(`animal?AnimalID=${this.AnimalID}`, {
                    signal: this.controller.signal,
                })
                .then((response) => {
                    this.show.id = response.data.rows[0].AnimalEarID;
                    this.show.name = response.data.rows[0].AnimalName;
                    this.show.farm = `${response.data.rows[0].AnimalFarm.FarmIdentificationNumber}, ${response.data.rows[0].AnimalFarm.FarmName} `;
                    this.show.isActive = response.data.rows[0].isActive;
                });
            await axios
                .get(`animal/get-by-farm-id?AnimalID=${this.AnimalID}`, {
                    signal: this.controller.signal,
                })
                .then((response) => {
                    this.show.TimeNo = response.data.rows[0].TimeNo;
                    this.data[this.index].PAR = response.data.rows[0].PAR;
                    if (response.data.rows[0].AIID) {
                        this.show.type = "ผสมเทียม";
                        this.show.date = response.data.rows[0].ThaiAIDate;
                        this.show.datecal = response.data.rows[0].AIDate;
                        this.data[this.index].AIID = response.data.rows[0].AIID;
                    } else if (response.data.rows[0].TransferEmbryoID) {
                        this.show.type = "ย้ายฝากตัวอ่อน";
                        this.show.date = response.data.rows[0].ThaiEmbryoDate;
                        this.show.datecal = response.data.rows[0].EmbryoDate;

                        this.data[this.index].TransferEmbryoID =
                            response.data.rows[0].TransferEmbryoID;
                    }
                });
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
            axios
                .get(`animal?AnimalID=${this.AnimalID}`, {
                    signal: this.controller.signal,
                })
                .then((response) => {
                    this.show.id = response.data.rows[0].AnimalEarID;
                    this.show.name = response.data.rows[0].AnimalName;
                    this.show.farm = `${response.data.rows[0].AnimalFarm.FarmIdentificationNumber}, ${response.data.rows[0].AnimalFarm.FarmName} `;
                    this.show.isActive = response.data.rows[0].isActive;
                });
            if (this.data[this.index].Type == "AI") {
                this.show.type = "ผสมเทียม";
            } else if (this.data[this.index].Type == "Embryo") {
                this.show.type = "ย้ายฝากตัวอ่อน";
            } else {
                this.show.type = "ธรรมชาติ";
            }
            this.show.date = this.data[this.index].ThaiDate;
            this.show.TimeNo = this.data[this.index].TimeNo;

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
