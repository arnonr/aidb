<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="เตรียมแม่ตัวรับ (Recipient)" :pages="breadcrumb" />
      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหาเตรียมแม่ตัวรับ (Recipient)</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />
          <InputText
            class="w-full"
            type="text"
            v-model="search['global'].value"
            placeholder="ค้นหา"
          />
        </span>
      </div>

      <div class="mt-5 card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">
              รายการเตรียมแม่ตัวรับ (Recipient)
            </h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <router-link to="/embryo/recipient/add">
              <Button
                label="เพิ่ม Recipient"
                icon="pi pi-plus"
                class="p-button-raised p-button-raised p-button-info"
              />
            </router-link>
          </div>
        </div>
        <DataTable
          v-if="animal_id != 3"
          class="text-sm"
          :value="data"
          :loading="isLoading"
          v-model:filters="search"
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
            :sortable="true"
          ></Column>
          <Column
            field="AnimalEarID"
            header="หมายเลขสัตว์"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="AnimalName"
            header="ชื่อสัตว์"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="FarmName"
            header="ชื่อฟาร์ม"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column header="ใส่ CIDR-B" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity1"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="PG" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity2"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="ถอด CIDR-B" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity3"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="Standing Heat" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity4"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>

          <Column header="ย้ายฝากตัวอ่อน" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity5"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>

          <Column
            field="IsExcludeName"
            header="สถานะ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ExcludeRemark"
            header="เหตุผลคัดออก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ThaiExcludeDate"
            header="วันที่คัดออก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ExcludeResponsibilityStaffID"
            header="เจ้าหน้าที่คัดออก"
            class="text-center"
            :sortable="true"
          >
          </Column>

          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <SplitButton
                label="บันทึกปฏิบัติงาน"
                icon="pi pi-pencil"
                @click="
                  open_detail(
                    slotProps.data.RecipientID,
                    slotProps.data.AnimalID
                  )
                "
                class="p-button-sm p-button-outlined p-button-warning"
                :model="
                  getItems(slotProps.data.RecipientID, slotProps.data.AnimalID)
                "
              >
              </SplitButton>
            </template>
          </Column>
        </DataTable>

        <DataTable
          v-if="animal_id == 3"
          class="text-sm"
          :value="data"
          :loading="isLoading"
          v-model:filters="search"
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
            :sortable="true"
          ></Column>
          <Column
            field="AnimalEarID"
            header="หมายเลขสัตว์"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="AnimalName"
            header="ชื่อสัตว์"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="FarmName"
            header="ชื่อฟาร์ม"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column header="ใส่ CIDR-G" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity1"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="PG" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity2"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>

          <Column header="ถอด CIDR-G" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity3"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="Standing Heat" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity4"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>

          <Column header="ย้ายฝากตัวอ่อน" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity5"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column
            field="IsExcludeName"
            header="สถานะ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ExcludeRemark"
            header="เหตุผลคัดออก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ThaiExcludeDate"
            header="วันที่คัดออก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ExcludeResponsibilityStaffID"
            header="เจ้าหน้าที่คัดออก"
            class="text-center"
            :sortable="true"
          >
          </Column>

          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <SplitButton
                label="บันทึกปฏิบัติงาน"
                icon="pi pi-pencil"
                @click="
                  open_detail(
                    slotProps.data.RecipientID,
                    slotProps.data.AnimalID
                  )
                "
                class="p-button-sm p-button-outlined p-button-warning"
                :model="
                  getItems(slotProps.data.RecipientID, slotProps.data.AnimalID)
                "
              >
              </SplitButton>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <!-- end main page -->
    <!-- Start Details Dialog -->
    <Dialog
      header="เตรียมแม่ตัวรับ (Recipient)"
      v-model:visible="displayDetail"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '60vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="grid surface-200 border-round-lg text-700 p-2">
            <div class="col-7 text-md">
              <span class="font-medium mr-3">หมายเลข</span
              >{{ this.animal.AnimalEarID }}
              {{ " (" + this.animal.AnimalName + ")" }}
            </div>
            <div class="col-5 text-md">
              <span class="font-medium mr-3">สถานะ</span>
              {{ this.AnimalStatusName }}
              <!-- {{ this.animal.AnimalStatus.AnimalStatusName }} -->
            </div>
            <div class="col-7 text-md">
              <span class="font-medium mr-3">สายพันธุ์</span>
              {{ this.animal.AnimalBreedAll }}
            </div>

            <div class="col-5 text-md">
              <span class="font-medium mr-3">อายุ</span
              >{{ this.animal.AnimalAge }}
            </div>

            <div class="col-12 text-md">
              <span class="font-medium mr-3">ฟาร์ม</span
              >{{ this.farm.FarmIdentificationNumber }} ,
              {{ this.farm.FarmName }}
            </div>
          </div>
        </div>
        <div class="col-12">
          <Button
            icon="pi pi-download"
            label="ดาวน์โหลด"
            class="p-button-success"
            @click="exportCSV($event)"
          />
        </div>
        <div class="col-12">
          <DataTable
            class="text-sm p-datatable-sm"
            :value="listActivity"
            :loading="isLoading"
            :rowHover="true"
            :exportable="true"
            ref="dt"
            :rowClass="rowClass"
            responsiveLayout="scroll"
          >
            <Column
              field="ActivityDate"
              header="วันที่ตามโปรแกรม"
              class="text-center"
            ></Column>
            <Column
              field="Time"
              header="เวลาตามโปรแกรม"
              class="text-center"
            ></Column>
            <!-- <Column field="Time" header="เวลา" class="text-center"></Column> -->
            <Column
              field="PresetActivity.PresetActivityName"
              header="กิจกรรม"
              class="text-center"
            ></Column>
            <Column
              field="Description"
              header="รายละเอียด"
              class="text-center"
            ></Column>
            <Column field="WorkActivityDate" header="วันที่ปฎิบัติการ (ว-ด-ป)">
              <template #body="slotProps">
                <div class="grid">
                  <div class="col-6">
                    <Calendar
                      dateFormat="dd-mm-yy"
                      class="p-inputtext-sm w-full"
                      v-model="slotProps.data.WorkActivityDate"
                      @date-select="
                        fillDate($event, slotProps.data.RecipientActivityID)
                      "
                      autocomplete="off"
                    />
                  </div>
                  <div class="col-6">
                    <Calendar
                      class="p-inputtext-sm w-full"
                      v-model="slotProps.data.WorkTime"
                      @blur="
                        fillTime($event, slotProps.data.RecipientActivityID)
                      "
                      :timeOnly="true"
                      hourFormat="24"
                    />
                  </div>
                </div>
              </template>
            </Column>
            <Column field="IsDone" header="ดำเนินการเรียบร้อย">
              <template #body="slotProps">
                <div class="field-checkbox flex justify-content-center">
                  <Checkbox
                    :binary="true"
                    v-model="slotProps.data.IsDone"
                    @input="
                      fillDone($event, slotProps.data.RecipientActivityID)
                    "
                  />
                </div>
              </template>
            </Column>
            <!-- <Column header="จัดการ" class="text-center">
              <template #body="slotProps">
                <Button
                  v-if="slotProps.data.check"
                  label="เพิ่มรายละเอียด"
                  icon="pi pi-edit"
                  iconPos="right"
                  class="p-button-sm p-button-outlined p-button-warning"
                  @click="open_update(slotProps.data.RecipientActivityID)"
                />
              </template>
            </Column> -->
          </DataTable>
        </div>
      </form>
    </Dialog>
    <!-- End Details Dialog -->
    <!-- Start Delete Dialog -->
    <Dialog
      header="การคัดออก"
      v-model:visible="displaydelete"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เหตุผลการคัดออก</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="formData.ExcludeRemark"
                :class="{ 'p-invalid': !formData.ExcludeRemark && valid }"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่คัดออก</label
              >
              <Calendar
                class="w-full"
                :showButtonBar="true"
                :showIcon="true"
                :touchUI="true"
                v-model="formData.ExcludeDate"
                :class="{ 'p-invalid': !formData.ExcludeDate && valid }"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เจ้าหน้าที่ผู้รับผิดชอบการคัดออก
              </label>
              <Dropdown
                class="w-full"
                id="selectedstatus"
                :options="personal"
                optionLabel="Fullname"
                optionValue="StaffID"
                placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
                :showClear="true"
                :filter="true"
                v-model="formData.ExcludeResponsibilityStaffID"
                :class="{
                  'p-invalid': !formData.ExcludeResponsibilityStaffID && valid,
                }"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="close_exclude()"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="exclude()"
          />
        </div>
      </form>
    </Dialog>
    <!-- End Delete Dialog -->
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      user: "user",
    }),
  },
  setup() {
    const breadcrumb = ref([{ label: "เตรียมแม่ตัวรับ (Recipient)", to: "" }]);

    const displayDetail = ref(false);
    const displaydelete = ref(false);

    const openDisplayDetail = () => {
      displayDetail.value = true;
    };

    const closeDisplayDetail = () => {
      displayDetail.value = false;
    };

    const opendisplaydelete = () => {
      displaydelete.value = true;
    };

    const closeConfirmation = () => {
      displaydelete.value = false;
    };
    const date_range = ref();

    return {
      date_range,
      breadcrumb,
      displaydelete,
      opendisplaydelete,
      displayDetail,
      openDisplayDetail,
      closeDisplayDetail,
      closeConfirmation,
    };
  },
  data() {
    return {
      url: "/preset",
      urlDetail: "/preset-detail",
      apiPersonal: "/staff?isActive=1",
      apiOrganizationID: "/organization?isActive=1",
      apiActivity: "/preset-activity?isActive=1",

      apiDetailActivity: "/donor-activity",
      apiDonorActivity: "/donor-activity/find-donor",

      apiRecipientActivity: "/recipient-activity/find-recipient",
      apiDetailRecipientActivity: "/recipient-activity",

      apiAnimal: "/animal",

      data: [],
      formData: {},

      isLoading: false,
      valid: false,
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      form: {},

      formDay: [],
      PresetFor: [
        {
          id: "D",
          name: "ตัวให้ (Donor)",
        },
        {
          id: "R",
          name: "ตัวรับ (Recipient)",
        },
      ],
      personal: [],
      organization: [],
      activity: [],
      animaltype: [],
      checkMethod: 0,

      FatherAnimal: [],
      animal: [],
      DonorActivityID: null,
      items: [],
      farm: [],
      AnimalStatusName: "",
      listActivity: [
        {
          check: false,
        },
      ],
      day: [
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 },
        { name: 5 },
        { name: 6 },
        { name: 7 },
        { name: 8 },
        { name: 9 },
        { name: 10 },
        { name: 11 },
        { name: 12 },
        { name: 13 },
        { name: 14 },
        { name: 15 },
        { name: 16 },
        { name: 17 },
        { name: 18 },
        { name: 19 },
        { name: 20 },
        { name: 21 },
        { name: 22 },
        { name: 23 },
        { name: 24 },
        { name: 25 },
        { name: 26 },
        { name: 27 },
        { name: 28 },
        { name: 29 },
        { name: 30 },
        { name: 31 },
      ],
      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],
      setting: [
        {
          id: 1,
        },
      ],
      getAnimalID: null,
      codeProgram: "",
      nameProgram: "",
      forProgram: "",
      Semen: null,
      presetDetail: [],
      getItemDelete: [],
      controller: new AbortController(),

      value: null,
      // Modal
      display_add: false,
      display_edit: false,
      display_delete: false,
      displayUpdateModal: false,
      displayUpdateCowModal: false,
    };
  },
  mounted() {
    this.load();
    axios
      .get(this.apiPersonal, {
        signal: this.controller.signal,
      })
      .then((response) => {
        this.personal = response.data.rows.map((item) => {
          return {
            StaffID: item.StaffID,
            StaffNumber: item.StaffNumber,
            Fullname:
              item.StaffNumber +
              ", " +
              item.StaffGivenName +
              " " +
              item.StaffSurname,
          };
        });
      });
  },

  methods: {
    load() {
      if (this.animal_id == 1) {
        this.apiRecipientActivity += "?AnimalTypeID=[1,2]";
      } else if (this.animal_id == 2) {
        this.apiRecipientActivity += "?AnimalTypeID=[3,4]";
      } else if (this.animal_id == 3) {
        this.apiRecipientActivity += "?AnimalTypeID=[17,18]";
      }

      axios
        .get(this.apiRecipientActivity, { signal: this.controller.signal })
        .then((response) => {
          this.data = response.data.rows;
          // dayjs.extend(buddhistEra);
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].show_id = i + 1;

            if (this.data[i].IsDone == 1) {
              this.data[i].IsDone = true;
            } else {
              this.data[i].IsDone = false;
            }
          }

          this.apiRecipientActivity = "/recipient-activity/find-recipient";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getItems(donorid, animalid) {
      const items = [
        {
          label: "คัดออก",
          icon: "pi pi-trash",
          command: () => {
            this.open_delete(donorid, animalid);
          },
        },
        {
          label: "นำกลับ",
          icon: "pi pi-undo",
          command: () => {
            this.undo(donorid, animalid);
          },
        },
      ];
      return items;
    },
    rowClass(data) {
      return data.done ? "done" : "pending";
    },
    // เปิดรายการปฏิบัติงาน
    open_detail(donorid, animalid) {
      axios
        .get(
          this.apiDetailRecipientActivity +
            "?RecipientID=" +
            donorid +
            "&AnimalID=" +
            animalid,
          {
            signal: this.controller.signal,
          }
        )
        .then((response) => {
          this.listActivity = response.data.rows.sort(function (a, b) {
            var c = new Date(a.ActivityDate);
            var d = new Date(b.ActivityDate);
            return c - d;
          });
          dayjs.extend(buddhistEra);
          for (let i = 0; i < this.listActivity.length; i++) {
            this.listActivity[i].show_id = i + 1;
            this.getAnimalID = this.listActivity[i].AnimalID;

            this.listActivity[i].Time = this.listActivity[i].Time.substring(
              0,
              5
            );

            if (this.listActivity[i].IsDone == 1) {
              this.listActivity[i].IsDone = true;
            } else {
              this.listActivity[i].IsDone = false;
            }
          }

          axios
            .get(this.apiAnimal + "?AnimalID=" + this.getAnimalID, {
              signal: this.controller.signal,
            })
            .then((res) => {
              this.animal = res.data.rows[0];
              this.AnimalStatusName = this.animal.AnimalStatus.AnimalStatusName;
              this.farm = this.animal.AnimalFarm;
            });

          this.displayDetail = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    // เปิด modal คัดออก
    open_delete(donorid, animalid) {
      this.formData.ExcludeResponsibilityStaffID = this.user.StaffID;
      this.form.recipientid = donorid;
      this.form.animalid = animalid;

      this.displaydelete = true;
    },
    undo(donorid, animalid) {
      // console.log(animalid);
      this.formData.AnimalID = animalid;
      axios
        .put("/recipient-activity/include-recipient/" + donorid, this.formData)
        .then(() => {
          this.data.SemenID = null;
          this.formData = {};
          this.load();
          this.close_delete();

          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "นำกลับสำเร็จ",
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
    },
    // ปิด modal คัดออก
    close_delete() {
      this.displaydelete = false;
    },
    // คัดออก
    exclude() {
      // this.form.id
      let id = this.data.find(
        (x) =>
          x.RecipientID == this.form.recipientid &&
          x.AnimalID == this.form.animalid
      );

      this.formData.IsExclude = 1;
      this.formData.AnimalID = id.AnimalID;

      axios
        .put(
          "/recipient-activity/exclude-recipient/" + this.form.recipientid,
          this.formData
        )
        .then(() => {
          this.data.SemenID = null;
          this.formData = {};
          this.load();
          this.close_delete();

          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "คัดออกสำเร็จ",
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

      // this.formData.AnimalID =
    },

    close_exclude() {
      this.displaydelete = false;
    },
    // ลงวันที่
    fillDate($event, $id) {
      this.form = {
        WorkActivityDate: $event,
      };

      // console.log(this.apiRecipientActivity + "/" + $id);

      axios
        .put(this.apiDetailRecipientActivity + "/" + $id, this.form)
        .then(() => {})
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },
    // ลงเวลา
    fillTime($event, $id) {
      // console.log($event);
      this.form = {
        WorkTime: $event.value,
      };

      // console.log(this.form);
      axios
        .put(this.apiDetailRecipientActivity + "/" + $id, this.form)
        .then(() => {})
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },
    // สถานะการปฏิบัติงาน
    fillDone($event, $id) {
      this.form = {
        IsDone: $event,
      };
      axios
        .put(this.apiDetailRecipientActivity + "/" + $id, this.form)
        .then(() => {})
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },
    // Excel
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
  },
};
</script>

<style scoped>
::v-deep(.done) {
  background-color: rgba(34, 197, 94, 0.2) !important;
}
</style>
