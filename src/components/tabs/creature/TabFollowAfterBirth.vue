<template>
    <div class="grid flex align-items-center mt-3 mb-5">
        <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">{{ name }}</h1>
        </div>
        <!-- <div class="col-12 md:col-6 md:text-right">
      <Button
        label="เพิ่มกิจกรรม"
        icon="pi pi-plus"
        class="w-full md:w-auto"
        @click="open"
      />
    </div> -->
    </div>
    <DataTable
        class="text-sm"
        :value="data"
        :rows="10"
        :paginator="true"
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
                <!-- here -->
                <SplitButton
                    v-if="!slotProps.data.FollowDate"
                    label="แก้ไข"
                    icon="pi pi-pencil"
                    @click="edit(slotProps.data.show_id - 1)"
                    class="p-button-sm p-button-outlined p-button-warning"
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
                        <!-- 
            <Calendar
              :manualInput="false"
              :maxDate="new Date()"
              v-model="data[index].FollowDate"
              dateFormat="dd/mm/yy"
              class="w-full"
              :class="{
                'p-invalid': !data[index].FollowDate && valid,
              }"
            /> -->
                        <Datepicker
                            v-model="data[index].FollowDate"
                            :class="{
                                'p-invalid': !data[index].FollowDate && valid,
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
                            น้ำหนัก(กก.)<span class="text-red-500"> *</span>
                        </label>
                        <InputNumber
                            :maxFractionDigits="2"
                            mode="decimal"
                            v-model="data[index].Weight"
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
        FarmName: {
            type: String,
            required: false,
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
            url: "/yearling",

            // ID
            id: "YearlingID",
            // Name
            name: "ติดตามลูกหลังคลอด",

            //load_selection
            LoadSelection: {
                Staff: "/staff/selection?includeAll=false&isActive=1",
                BCSID: "/bcs",
                Animal: "/animal",
            },

            // Selection

            selection: {
                Staff: null,
                BCSID: null,
                Animal: null,
            },
            gender: null,
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
                    field: "AnimalEarID",
                    header: "หมายเลขลูก",
                },
                {
                    field: "AnimalName",
                    header: "ชื่อลูก",
                },
                {
                    field: "AnimalSexName",
                    header: "เพศ",
                },
                {
                    field: "Weight",
                    header: "น้ำหนัก (กิโลกรัม)",
                },
                {
                    field: "ThaiFollowDate",
                    header: "วันที่ติดตาม",
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
        await this.load();
        await this.load_selection();
        // this.open();
        // if (
        //   this.display_prop &&
        //   this.permit[0].IsAdd
        // ) {
        //   this.open();
        // }
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
                !this.data[this.index].FollowDate ||
                !this.data[this.index].Weight
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
                        if (this.LoadSelection[i] == "/animal") {
                            // axios
                            //   .get(this.LoadSelection[i], {
                            //     signal: this.controller.signal,
                            //   })
                            //   .then((response) => {
                            //     if (this.LoadSelection[i] == "/animal") {
                            //       if (this.animal_id == 1) {
                            //         this.selection[i] = response.data.rows.filter(
                            //           (item) =>
                            //             item.AnimalTypeID === 1 || item.AnimalTypeID === 2
                            //         );
                            //         this.selection[i] = this.selection[i].map((item) => {
                            //           return {
                            //             AnimalID: item.AnimalID,
                            //             AnimalIdentificationID: item.AnimalIdentificationID,
                            //             Fullname:
                            //               item.AnimalIdentificationID +
                            //               ", " +
                            //               item.AnimalName,
                            //           };
                            //         });
                            //       } else if (this.animal_id == 2) {
                            //         this.selection[i] = response.data.rows.filter(
                            //           (item) =>
                            //             item.AnimalTypeID === 3 || item.AnimalTypeID === 4
                            //         );
                            //         this.selection[i] = this.selection[i].map((item) => {
                            //           return {
                            //             AnimalID: item.AnimalID,
                            //             AnimalIdentificationID: item.AnimalIdentificationID,
                            //             Fullname:
                            //               item.AnimalIdentificationID +
                            //               ", " +
                            //               item.AnimalName,
                            //           };
                            //         });
                            //       } else if (this.animal_id == 3) {
                            //         this.selection[i] = response.data.rows.filter(
                            //           (item) =>
                            //             item.AnimalTypeID === 17 || item.AnimalTypeID === 18
                            //         );
                            //         this.selection[i] = this.selection[i].map((item) => {
                            //           return {
                            //             AnimalID: item.AnimalID,
                            //             AnimalIdentificationID: item.AnimalIdentificationID,
                            //             Fullname:
                            //               item.AnimalIdentificationID +
                            //               ", " +
                            //               item.AnimalName,
                            //           };
                            //         });
                            //       }
                            //     }
                            //     index++;
                            //     if (Object.keys(this.LoadSelection).length == index) {
                            //       resolve();
                            //     }
                            //   });
                        } else {
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
                                .finally(() => {
                                    if (
                                        Object.keys(this.LoadSelection)
                                            .length == index
                                    ) {
                                        resolve();
                                    }
                                });
                        }
                    }
                }
            });
        },
        // main load
        load() {
            return new Promise((resolve) => {
                this.isLoading = true;
                axios
                    .get(`${this.url}?MotherAnimalID=${this.AnimalID}`, {
                        signal: this.controller.signal,
                    })
                    .then((response) => {
                        this.data = response.data.rows;
                        console.log(this.data);
                        this.total = this.data.length;
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
                    //   console.log("FREEDOM1123");
                    this.show.id = response.data.rows[0].AnimalEarID;
                    this.show.name = response.data.rows[0].AnimalName;
                    this.show.farm = `${response.data.rows[0].AnimalFarm.FarmIdentificationNumber}, ${response.data.rows[0].AnimalFarm.FarmName} `;
                    this.show.isActive = response.data.rows[0].isActive;
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
            this.show.id = this.data[this.index].AnimalEarID;
            this.show.name = this.data[this.index].AnimalName;
            this.show.farm = this.FarmName;

            this.formheader = "แก้ไข";
            this.temp = JSON.parse(JSON.stringify(this.data[this.index]));
            this.data[this.index].ResponsibilityStaffID = this.user.StaffID;
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
