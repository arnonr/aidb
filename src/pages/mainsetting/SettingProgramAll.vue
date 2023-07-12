<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle
        title="กำหนดโปรแกรมสำหรับแม่ตัวให้/ตัวรับ"
        :pages="breadcrumb"
      />
      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหาโปรแกรม</h1>
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
              รายการโปรแกรมสำหรับแม่ตัวให้/ตัวรับ
            </h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button
              label="เพิ่มโปรแกรม"
              icon="pi pi-plus"
              class="p-button-raised p-button-raised p-button-info"
              @click="openAddModal"
            />
          </div>
        </div>
        <DataTable
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
            header="ครั้งที่"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="PresetCode"
            header="รหัสโปรแกรม"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="PresetName"
            header="ชื่อโปรแกรม"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="PresetFor"
            header="โปรแกรมสำหรับ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Organization.OrganizationName"
            header="หน่วยงานที่กำหนดโปรแกรม"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Fullname"
            header="เจ้าหน้าที่ที่ดำเนินการ"
            class="text-center"
          ></Column>
          <!-- <Column field="isActive" header="สถานะ" class="text-center">
              <template #body="slotProps">
                <div
                  v-if="
                    slotProps.data.isActive == 1 ||
                    slotProps.data.isActive == status[0]
                  "
                >
                  <Tag class="w-full" severity="success">เปิดใช้งาน</Tag>
                </div>
                <div v-else>
                  <Tag class="w-full bg-gray-500">ปิดใช้งาน</Tag>
                </div>
              </template>
            </Column> -->
          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <SplitButton
                label="แก้ไข"
                icon="pi pi-pencil"
                @click="open_edit(slotProps.data.PresetID)"
                class="p-button-sm p-button-outlined p-button-warning"
                :model="getItems(slotProps.data.PresetID)"
              >
              </SplitButton>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <!-- end main page -->

    <!-- Add Dialog -->
    <Dialog
      header="เพิ่มกำหนดโปรแกรมสำหรับแม่ตัวให้/ตัวรับ"
      v-model:visible="displayAddModal"
      :style="{ width: '75vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสโปรแกรมเหนี่ยวนำการเป็นสัด<span class="text-red-500">
                  *</span
                ></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.PresetCode"
                :class="{ 'p-invalid': !form.PresetCode && valid }"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโปรแกรม<span class="text-red-500"> *</span></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.PresetName"
                :class="{ 'p-invalid': !form.PresetName && valid }"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                โปรแกรมสำหรับ<span class="text-red-500"> *</span>
              </label>
              <Dropdown
                class="w-full"
                :options="PresetFor"
                optionLabel="name"
                :showClear="true"
                :filter="true"
                placeholder="เลือกโปรแกรมสำหรับ"
                v-model="form.PresetFor"
                :class="{ 'p-invalid': !form.PresetFor && valid }"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"
                >ชนิดสัตว์<span class="text-red-500"> *</span></label
              >
              <Dropdown
                class="w-full"
                :options="animaltype"
                optionLabel="AnimalTypeName"
                optionValue="AnimalTypeID"
                placeholder="เลือกชนิดสัตว์"
                :showClear="true"
                :filter="true"
                v-model="form.AnimalTypeID"
                :class="{ 'p-invalid': !form.AnimalTypeID && valid }"
              >
              </Dropdown>
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หน่วยงานที่กำหนดโปรแกรม<span class="text-red-500">
                  *</span
                ></label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                :options="organization"
                optionLabel="OrganizationName"
                optionValue="OrganizationID"
                placeholder="เลือกหน่วยงานที่กำหนดโปรแกรม"
                :showClear="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
                :filter="true"
                v-model="form.OrganizationID"
                :class="{ 'p-invalid': !form.OrganizationID && valid }"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เจ้าหน้าที่ผู้รับผิดชอบ<span class="text-red-500"> *</span>
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
                v-model="form.ResponsibilityStaffID"
                :class="{ 'p-invalid': !form.ResponsibilityStaffID && valid }"
              />
            </div>

            <template v-for="(item, index) in setting" :key="item.id">
              <div class="field col-12 sm:col-12">
                <hr />
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  วันที่<span class="text-red-500"> *</span>
                </label>
                <Dropdown
                  class="w-full"
                  :options="day"
                  optionLabel="name"
                  :showClear="true"
                  :filter="true"
                  placeholder="เลือกวันที่"
                  v-model="item.Day"
                  :key="index"
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  เวลา<span class="text-red-500"> *</span>
                </label>
                <Calendar
                  class="w-full"
                  v-model="item.Time"
                  :key="index"
                  placeholder="เลือกเวลา"
                  :showTime="true"
                  :timeOnly="true"
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  กิจกรรม<span class="text-red-500"> *</span>
                </label>

                <Dropdown
                  class="w-full"
                  id="selectedstatus"
                  :options="activity"
                  optionLabel="PresetActivityName"
                  optionValue="PresetActivityID"
                  placeholder="เลือกกิจกรรม"
                  :showClear="true"
                  :filter="true"
                  v-model="item.PresetActivityID"
                  :key="index"
                />
              </div>

              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  รายละเอียดกิจกรรม
                </label>
                <InputText
                  type="text"
                  class="w-full"
                  v-model="item.Description"
                  :key="index"
                />
              </div>
            </template>
            <div class="field col-12 sm:col-12 flex justify-content-between">
              <Button
                label="เพิ่มวัน"
                class="p-button-lg p-button-success"
                icon="pi pi-plus"
                @click="addsetting"
              />
              <Button
                label="ลบวัน"
                class="p-button-lg p-button-danger"
                icon="pi pi-minus"
                @click="deletesetting"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeAddModal"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="add()"
          />
        </div>
      </form>
    </Dialog>
    <!-- End Add Dialog -->

    <!-- EDIT Dialog -->
    <Dialog
      header="แก้ไขกำหนดโปรแกรมสำหรับแม่ตัวให้/ตัวรับ"
      v-model:visible="displayEditModal"
      :style="{ width: '75vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสโปรแกรมเหนี่ยวนำการเป็นสัด<span class="text-red-500">
                  *</span
                ></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.PresetCode"
                :class="{ 'p-invalid': !form.PresetCode && valid }"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโปรแกรม<span class="text-red-500"> *</span></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.PresetName"
                :class="{ 'p-invalid': !form.PresetName && valid }"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                โปรแกรมสำหรับ<span class="text-red-500"> *</span>
              </label>
              <Dropdown
                class="w-full"
                :options="PresetFor"
                optionLabel="name"
                :showClear="true"
                :filter="true"
                placeholder="เลือกโปรแกรมสำหรับ"
                v-model="form.PresetFor"
                :class="{ 'p-invalid': !form.PresetFor && valid }"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"
                >ชนิดสัตว์<span class="text-red-500"> *</span></label
              >
              <Dropdown
                class="w-full"
                :options="animaltype"
                optionLabel="AnimalTypeName"
                optionValue="AnimalTypeID"
                placeholder="เลือกชนิดสัตว์"
                :showClear="true"
                :filter="true"
                v-model="form.AnimalTypeID"
                :class="{ 'p-invalid': !form.AnimalTypeID && valid }"
              >
              </Dropdown>
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หน่วยงานที่กำหนดโปรแกรม<span class="text-red-500">
                  *</span
                ></label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                :options="organization"
                optionLabel="OrganizationName"
                optionValue="OrganizationID"
                placeholder="เลือกหน่วยงานที่กำหนดโปรแกรม"
                :showClear="true"
                :filter="true"
                v-model="form.OrganizationID"
                :class="{ 'p-invalid': !form.OrganizationID && valid }"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เจ้าหน้าที่ผู้รับผิดชอบ<span class="text-red-500"> *</span>
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
                v-model="form.ResponsibilityStaffID"
                :class="{ 'p-invalid': !form.ResponsibilityStaffID && valid }"
              />
            </div>

            <template v-for="(item, index) in setting" :key="item.id">
              <div class="field col-12 sm:col-12">
                <hr />
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  วันที่<span class="text-red-500"> *</span>
                </label>
                <Dropdown
                  class="w-full"
                  :options="day"
                  optionLabel="name"
                  :showClear="true"
                  :filter="true"
                  placeholder="เลือกวันที่"
                  v-model="item.Day"
                  :key="index"
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  เวลา<span class="text-red-500"> *</span>
                </label>
                <Calendar
                  class="w-full"
                  v-model="item.Time"
                  :key="index"
                  placeholder="เลือกเวลา"
                  :showTime="true"
                  :timeOnly="true"
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  กิจกรรม<span class="text-red-500"> *</span>
                </label>

                <Dropdown
                  class="w-full"
                  id="selectedstatus"
                  :options="activity"
                  optionLabel="PresetActivityName"
                  optionValue="PresetActivityID"
                  placeholder="เลือกกิจกรรม"
                  :showClear="true"
                  :filter="true"
                  v-model="item.PresetActivityID"
                  :key="index"
                />
              </div>

              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  รายละเอียดกิจกรรม
                </label>
                <InputText
                  type="text"
                  class="w-full"
                  v-model="item.Description"
                  :key="index"
                />
              </div>
            </template>
            <div class="field col-12 sm:col-12 flex justify-content-between">
              <Button
                label="เพิ่มวัน"
                class="p-button-lg p-button-success"
                icon="pi pi-plus"
                @click="addsetting"
              />
              <Button
                label="ลบวัน"
                class="p-button-lg p-button-danger"
                icon="pi pi-minus"
                @click="deletesetting"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="close_edit()"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="update()"
          />
        </div>
      </form>
    </Dialog>
    <!-- End EDIT Dialog -->

    <!-- Start Details Dialog -->
    <Dialog
      header="รายละเอียดโปรแกรม"
      v-model:visible="displayDetailsModal"
      :style="{ width: '40vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสโปรแกรม
              </label>
              {{ this.codeProgram }}
              <!-- โปรแกรมเหนี่ยวนำการเป็นสัด Donor 01 -->
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโปรแกรม
              </label>
              {{ this.nameProgram }}
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                โปรแกรมสำหรับ
              </label>
              {{ this.forProgram }}
            </div>

            <div class="field col-12 sm:col-10">
              <Timeline :value="presetDetail">
                <template #content="slotProps">
                  วันที่ {{ slotProps.item.Day }} เวลา {{ slotProps.item.Time }}
                  <br />
                  กิจกรรม {{ slotProps.item.PresetActivity.PresetActivityName }}
                  <br />
                  รายละเอียด {{ slotProps.item.Description }}
                </template>
              </Timeline>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
    <!-- End Detail -->

    <!-- Start Delete Dialog -->
    <Dialog
      header="ตรวจสอบข้อมูล"
      v-model:visible="displaydelete"
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
            @click="closeConfirmation"
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
    <!-- End Delete Dialog -->
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
import { FilterMatchMode } from "primevue/api";
import { mapGetters } from "vuex";
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
    const breadcrumb = ref([
      { label: "ระบบย้ายฝากตัวอ่อน", to: "/embryo" },
      { label: "กำหนดโปรแกรมสำหรับแม่ตัวให้/ตัวรับ", to: "" },
    ]);

    const displayAddModal = ref(false);
    // const openAddModal = () => {
    //   displayAddModal.value = true;
    // };
    const closeAddModal = () => {
      displayAddModal.value = false;
    };

    const displayEditModal = ref(false);
    const openEditModal = () => {
      displayEditModal.value = true;
    };
    const closeEditModal = () => {
      displayEditModal.value = false;
    };
    const displayDetailsModal = ref(false);
    const openyDetailsModal = () => {
      displayDetailsModal.value = true;
    };

    const displaydelete = ref(false);
    const opendisplaydelete = () => {
      displaydelete.value = true;
    };
    const closeConfirmation = () => {
      displaydelete.value = false;
    };

    return {
      breadcrumb,
      displayAddModal,
      // openAddModal,
      closeAddModal,
      displayEditModal,
      openEditModal,
      closeEditModal,
      displaydelete,
      opendisplaydelete,
      closeConfirmation,
      displayDetailsModal,
      openyDetailsModal,
    };
  },
  data() {
    return {
      url: "/preset",
      urlDetail: "/preset-detail",
      apiPersonal: "/staff?isActive=1",
      apiOrganizationID: "/organization?isActive=1",
      apiActivity: "/preset-activity?isActive=1",
      apiAnimalTypeID: "/animal-type?isActive=1",
      data: [],
      isLoading: false,
      valid: false,
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      form: {
        isActive: "",
      },
      formTemp: {
        isActive: "",
      },
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
      activity_temp: [],
      animaltype: [],
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

      params: { orderByField: "PresetID", orderBy: "desc" },
      codeProgram: "",
      nameProgram: "",
      forProgram: "",

      presetDetail: [],
      getItemDelete: [],
      //  cancel requests
      controller: new AbortController(),

      // Modal
      display_add: false,
      display_edit: false,
      display_delete: false,
    };
  },
  mounted() {
    this.load();
    this.form.isActive = this.status[0];

    if (this.animal_id == 1) {
      this.form.AnimalTypeID = 1;
    } else if (this.animal_id == 2) {
      this.form.AnimalTypeID = 3;
    } else if (this.animal_id == 3) {
      this.form.AnimalTypeID = 17;
    }

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

        axios
          .get(this.apiAnimalTypeID, {
            signal: this.controller.signal,
          })
          .then((response) => {
            this.animaltype = response.data.rows.filter(
              (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
            );

            if (this.animal_id == 1) {
              this.animaltype = response.data.rows.filter(
                (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
              );
            } else if (this.animal_id == 2) {
              this.animaltype = response.data.rows.filter(
                (item) => item.AnimalTypeID === 3 || item.AnimalTypeID === 4
              );
            } else if (this.animal_id == 3) {
              this.animaltype = response.data.rows.filter(
                (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
              );
            }
          });
      });
    axios
      .get(this.apiOrganizationID, {
        signal: this.controller.signal,
      })
      .then((response) => {
        this.organization = response.data.rows;
      });

    if (this.animal_id == 1) {
      this.apiActivity += "&AnimalTypeID=[1,2]";
    } else if (this.animal_id == 2) {
      this.apiActivity += "&AnimalTypeID=[3,4]";
    } else if (this.animal_id == 3) {
      this.apiActivity += "&AnimalTypeID=[17,18]";
    }

    axios
      .get(this.apiActivity, {
        signal: this.controller.signal,
      })
      .then((response) => {
        // console.log(response);
        this.activity_temp = this.activity = response.data.rows;
        // console.log(this.activity);
      });

    this.form.ResponsibilityStaffID = this.user.StaffID;

    this.formTemp = this.form;
  },
  watch: {
    // ค้นหา
    "form.PresetFor"(val) {
      if (val) {
        this.activity = this.activity_temp.filter(
          (item) =>
            item.PresetActivityFor == val.id || item.PresetActivityFor == "D,R"
        );
      }
      // this.load();
    },
  },
  methods: {
    getItems(id) {
      const items = [
        {
          label: "รายละเอียด",
          icon: "pi pi-eye",
          command: () => {
            this.open_view(id);
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
    validation() {
      if (
        !this.form.PresetCode ||
        !this.form.PresetName ||
        !this.form.PresetFor ||
        !this.form.OrganizationID ||
        !this.form.ResponsibilityStaffID
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
    // Axios
    load() {
      this.isLoading = true;
      axios
        .get(this.url, {
          //  cancel requests
          params: this.params,
          signal: this.controller.signal,
        })
        .then((response) => {
          this.data = response.data.rows;

          if (this.animal_id == 1) {
            this.data = response.data.rows.filter(
              (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
            );
          } else if (this.animal_id == 2) {
            this.data = response.data.rows.filter(
              (item) => item.AnimalTypeID === 3 || item.AnimalTypeID === 4
            );
          } else if (this.animal_id == 3) {
            this.data = response.data.rows.filter(
              (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
            );
          }

          for (let i = 0; i < this.data.length; i++) {
            this.data[i].show_id = i + 1;
            this.data[i].PresetFor =
              this.data[i].PresetFor == "D"
                ? "ตัวให้ (Donor)"
                : "ตัวรับ (Recipient)";
            this.data[i].Fullname =
              this.data[i].Staff.StaffNumber +
              ", " +
              this.data[i].Staff.StaffGivenName +
              " " +
              this.data[i].Staff.StaffSurname;
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    async add() {
      if (this.validation() == false) {
        return;
      }

      this.form.PresetFor = this.form.PresetFor.id;
      this.form.isActive = 1;

      await axios
        .post(this.url, this.form)
        .then((res) => {
          if (this.setting) {
            for (let i = 0; i < this.setting.length; i++) {
              this.setting[i].PresetID = res.data.PresetID;
              this.setting[i].isActive = 1;

              this.uploadDetail(this.setting[i]);
            }
          }
          this.form = [];
          this.setting = [
            {
              id: 1,
            },
          ];
          this.close_add();
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });
        })
        // error
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },

    openAddModal() {
      this.form = {};
      this.setting = [
        {
          id: 1,
        },
      ];
      this.form = this.formTemp;
      this.form.PresetCode = null;
      this.form.PresetName = null;
      this.displayAddModal = true;
    },
    close_add() {
      this.displayAddModal = false;
    },
    open_edit(id) {
      id = this.data.find((x) => x.PresetID == id);
      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      let idtmp = [];

      if (id.PresetFor == "ตัวให้ (Donor)") {
        idtmp.PresetFor = this.PresetFor[0];
      } else if (id.PresetFor == "ตัวรับ (Recipient)") {
        idtmp.PresetFor = this.PresetFor[1];
      }

      this.form = {
        PresetID: id.PresetID,
        PresetCode: id.PresetCode,
        PresetName: id.PresetName,
        PresetFor: idtmp.PresetFor,
        OrganizationID: id.OrganizationID,
        ResponsibilityStaffID: id.ResponsibilityStaffID,
        AnimalTypeID: id.AnimalTypeID,
        show_id: id.show_id,
        isActive: id.isActive,
      };

      axios
        // ค้นหาเฉพาะตัวที่ แก้ไข
        .get(this.urlDetail + "?PresetID=" + id.PresetID)
        .then((response) => {
          // เรียงลำดับวันที่
          this.setting = response.data.rows.sort((a, b) => {
            return a.Day - b.Day;
          });

          for (let i = 0; i < this.setting.length; i++) {
            this.setting[i].Time = this.setting[i].Time.substring(0, 5);

            // เก็บค่า ID ของเดิมไว้
            this.getItemDelete.push({ id: this.setting[i].PresetDetailID });

            // Map New Data Day
            if (this.setting[i].Day == "1") {
              this.setting[i].Day = this.day[0];
            } else if (this.setting[i].Day == "2") {
              this.setting[i].Day = this.day[1];
            } else if (this.setting[i].Day == "3") {
              this.setting[i].Day = this.day[2];
            } else if (this.setting[i].Day == "4") {
              this.setting[i].Day = this.day[3];
            } else if (this.setting[i].Day == "5") {
              this.setting[i].Day = this.day[4];
            } else if (this.setting[i].Day == "6") {
              this.setting[i].Day = this.day[5];
            } else if (this.setting[i].Day == "7") {
              this.setting[i].Day = this.day[6];
            } else if (this.setting[i].Day == "8") {
              this.setting[i].Day = this.day[7];
            } else if (this.setting[i].Day == "9") {
              this.setting[i].Day = this.day[8];
            } else if (this.setting[i].Day == "10") {
              this.setting[i].Day = this.day[9];
            } else if (this.setting[i].Day == "11") {
              this.setting[i].Day = this.day[10];
            } else if (this.setting[i].Day == "12") {
              this.setting[i].Day = this.day[11];
            } else if (this.setting[i].Day == "13") {
              this.setting[i].Day = this.day[12];
            } else if (this.setting[i].Day == "14") {
              this.setting[i].Day = this.day[13];
            } else if (this.setting[i].Day == "15") {
              this.setting[i].Day = this.day[14];
            } else if (this.setting[i].Day == "16") {
              this.setting[i].Day = this.day[15];
            } else if (this.setting[i].Day == "17") {
              this.setting[i].Day = this.day[16];
            } else if (this.setting[i].Day == "18") {
              this.setting[i].Day = this.day[17];
            } else if (this.setting[i].Day == "19") {
              this.setting[i].Day = this.day[18];
            } else if (this.setting[i].Day == "20") {
              this.setting[i].Day = this.day[19];
            } else if (this.setting[i].Day == "21") {
              this.setting[i].Day = this.day[20];
            } else if (this.setting[i].Day == "22") {
              this.setting[i].Day = this.day[21];
            } else if (this.setting[i].Day == "23") {
              this.setting[i].Day = this.day[22];
            } else if (this.setting[i].Day == "24") {
              this.setting[i].Day = this.day[23];
            } else if (this.setting[i].Day == "25") {
              this.setting[i].Day = this.day[24];
            } else if (this.setting[i].Day == "26") {
              this.setting[i].Day = this.day[25];
            } else if (this.setting[i].Day == "27") {
              this.setting[i].Day = this.day[26];
            } else if (this.setting[i].Day == "28") {
              this.setting[i].Day = this.day[27];
            } else if (this.setting[i].Day == "29") {
              this.setting[i].Day = this.day[28];
            } else if (this.setting[i].Day == "30") {
              this.setting[i].Day = this.day[29];
            } else {
              this.setting[i].Day = this.day[30];
            }
          }

          // Map Data ใหม่ให้ตรง Format โดยลบ PresetDetailID ไม่งั้นมันเพิ่มข้อมูลไม่ได้
          this.setting = this.setting.map((item) => {
            return {
              id: this.setting.length + 1,
              // PresetDetailID: item.PresetDetailID,
              PresetID: item.PresetID,
              Day: item.Day,
              Time: item.Time,
              PresetActivityID: item.PresetActivityID,
              Description: item.Description,
              setting: this.selectesetting,
            };
          });
        });

      this.displayEditModal = true;
    },

    close_edit() {
      this.form = {};
      this.setting = [
        {
          id: 1,
        },
      ];
      this.displayEditModal = false;
    },

    async update() {
      if (this.validation() == false) {
        return;
      }

      this.form.PresetFor = this.form.PresetFor.id;
      this.form.isActive = 1;

      // อัพเดทข้อมูล Preset
      await axios
        .put(this.url + "/" + this.form.PresetID, this.form)
        .then(() => {
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

      if (this.setting) {
        // สำหรับเพิ่มข้อมูลใหม่
        for (let i = 0; i < this.setting.length; i++) {
          this.setting[i].PresetID = this.form.PresetID;
          this.setting[i].isActive = 1;
          this.uploadDetail(this.setting[i]);
        }

        // สำหรับลบข้อมูลเก่า
        for (let i = 0; i < this.getItemDelete.length; i++) {
          this.deleteOldDay(this.getItemDelete[i].id);
        }

        this.form = [];
        this.setting = [
          {
            id: 1,
          },
        ];
      }
      this.load();
      this.close_edit();
    },
    async uploadDetail(formData) {
      formData.Day = formData.Day.name;

      // ตรวจสอบว่าเป็น เวลามั้ย
      if (formData.Time instanceof Date) {
        formData.Time =
          formData.Time.getHours() + ":" + formData.Time.getMinutes();
      }
      // console.log(formData);
      await axios
        .post(this.urlDetail, formData)
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

    // ลบข้อมูลใน Preset Detail
    async deleteOldDay(id) {
      // console.log(id);
      await axios.delete(this.urlDetail + "/" + id).then(() => {});
    },

    open_view(id) {
      let info = this.data.find((x) => x.PresetID == id);
      this.codeProgram = info.PresetCode;
      this.nameProgram = info.PresetName;
      this.forProgram = info.PresetFor;

      axios
        // ค้นหาเฉพาะตัวที่ แก้ไข
        .get(this.urlDetail + "?PresetID=" + id, {
          signal: this.controller.signal,
        })
        .then((response) => {
          // เรียงลำดับวันที่
          this.presetDetail = response.data.rows.sort((a, b) => {
            return a.Day - b.Day;
          });

          for (let i = 0; i < this.presetDetail.length; i++) {
            this.presetDetail[i].Time = this.presetDetail[i].Time.substring(
              0,
              5
            );
          }
        });
      this.displayDetailsModal = true;
    },

    open_delete(id) {
      this.form.id = id;
      // this.form.show_id = show_id;
      this.displaydelete = true;
    },
    remove() {
      axios.delete(this.url + "/" + this.form.id).then(() => {
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
    close_delete() {
      this.displaydelete = false;
    },
    addsetting() {
      this.setting.push({
        id: this.setting.length + 1,
        PresetID: "",
        Day: "",
        Time: "",
        PresetActivityID: "",
        Description: "",
        setting: this.selectesetting,
      });
    },
    deletesetting() {
      this.setting.splice(this.setting.length - 1, 1);
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
