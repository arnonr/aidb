<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="กิจกรรมหย่านม" :pages="breadcrumb" />
      <div class="card">
        <!-- <h1 class="text-xl mb-5 text-center">หมายเลขประจำตัวสัตว์</h1>
        <div class="grid px-6">
          <div class="col-12 sm:col-12 lg:col-12">
             <label class="block text-600 text-sm font-bold mb-2">
              หมายเลขประจำตัวสัตว์</label
            > 
             <InputText
              type="text"
              class="w-full"
              placeholder="สาเหตุ"
            /> 
            <InputText
              class="w-full"
              type="text"
              v-model="search"
              placeholder="กรอกหมายเลขประจำตัวสัตว์"
            />
          </div>
        </div> -->
        <div class="card row col bg-primary pb-6">
          <h1 class="text-center text-white">หมายเลขประจำตัวสัตว์</h1>
          <span class="p-input-icon-right w-full px-5">
            <i class="pi pi-search px-5" />
            <InputText
              class="w-full"
              type="text"
              v-model="search"
              placeholder="ค้นหา"
            />
          </span>
        </div>
        <div class="card" v-if="search">
          <div class="text-xl">ข้อมูลหมายเลข {{ search }}</div>
          <div class="grid">
            <div class="col-12 sm:col lg:col">
              <div>ชื่อ : ปางแก้ว</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>อายุ : 6-11</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>หมายเลขข้างหู :232331</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>เลขอ้างอิง RFID :1232352</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>สถานะ : แม่โค</div>
            </div>
          </div>
          <div class="grid">
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 1 : -</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 1: 100%
            </div>
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 2 : -</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 2: -
            </div>
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 3 : -</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 3: -
            </div>
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 4 : -</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 4: -
            </div>

            <div class="col-12 sm:col lg:col">
              <div>รอบการให้นมครั้งที่ : 4</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ครั้งที่ผสม : 3</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>คะแนนความสมบูรณ์ร่างกาย : -</div>
            </div>
          </div>
        </div>
        <!-- datatable -->
        <div class="card mt-5">
          <div class="grid">
            <div class="col-6 sm:col-6 lg:col-6 text-left">
              <h1 class="text-xl mb-5">ประวัติการหย่านม</h1>
            </div>
            <div class="col-6 sm:col-6 lg:col-6 text-right">
              <Button
                label="เพิ่มกิจกรรม"
                icon="pi pi-plus"
                class="mb-3 p-button-raised p-button-raised"
                @click="openAddModal"
              />
            </div>
          </div>

          <DataTable
            class="text-sm"
            :value="data"
            :paginator="true"
            :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
            <Column field="id" header="ครั้งที่" class="text-center"></Column>
            <Column field="date" header="วันผสม" class="text-center"></Column>
            <Column
              field="type"
              header="ประเภทการผสม"
              class="text-center"
            ></Column>
            <Column
              field="officer"
              header="วันที่หย่านม"
              class="text-center"
            ></Column>
            <Column
              field="species"
              header="จำนวนวันให้นม"
              class="text-center"
            ></Column>
            <Column
              field="animal_name"
              header="สาเหตุ"
              class="text-center"
            ></Column>
            <Column
              field="family"
              header="ปริมาณน้ำนม ณ วันหย่านม"
              class="text-center"
            ></Column>

            <Column
              field="project"
              header="รหัสเจ้าหน้าที่"
              class="text-center"
            ></Column>
            <Column header="จัดการ" class="text-center">
              <template #body>
                <SplitButton
                  label="แก้ไข"
                  icon="pi pi-pencil"
                  class="p-button-sm p-button-outlined p-button-warning"
                  @click="openEditModal"
                  :model="items"
                >
                </SplitButton>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <!-- enddatatable -->
    </div>
    <!-- Add Dialog -->
    <Dialog
      header="เพิ่มกิจกรรมหย่านม"
      v-model:visible="displayAddModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลำดับลูกตัวที่
              </label>
              <InputText type="number" class="w-full" placeholder="" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่หย่านม
              </label>
              <Calendar
                class="w-full"
                id="dateformat"
                v-model="preg_date"
                placeholder="mm-dd-yy"
                dateFormat="mm-dd-yy"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เจ้าหน้าที่
              </label>
              <!-- <InputText
              type="text"
              class="w-full"
              placeholder="กรอกเจ้าหน้าที่ผู้รับผสมเทียม"
            /> -->
              <Dropdown
                class="w-full"
                v-model="selecteduser"
                :options="user"
                optionLabel="name"
                :filter="true"
                :showClear="true"
                placeholder="ค้นหาและเลือกรหัสเจ้าหน้าที่"
              >
                <template #value="slotProps">
                  <div
                    class="country-item country-item-value"
                    v-if="slotProps.value"
                  >
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
              </Dropdown>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <!-- <Button label="บันทึก" icon="pi pi-save" iconPos="left" /> -->
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeAddModal"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 w-full"
            @click="closeAddModal"
          />
        </div>
      </form>
      <template #footer> </template>
    </Dialog>
    <!-- End Add Dialog -->

    <!-- EDIT Dialog -->
    <Dialog
      header="แก้ไขการหย่านม"
      v-model:visible="displayEditModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลำดับลูกตัวที่
              </label>
              <InputText type="number" class="w-full" placeholder="" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่หย่านม
              </label>
              <Calendar
                class="w-full"
                id="dateformat"
                v-model="preg_date"
                placeholder="mm-dd-yy"
                dateFormat="mm-dd-yy"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เจ้าหน้าที่
              </label>
              <!-- <InputText
              type="text"
              class="w-full"
              placeholder="กรอกเจ้าหน้าที่ผู้รับผสมเทียม"
            /> -->
              <Dropdown
                class="w-full"
                v-model="selecteduser"
                :options="user"
                optionLabel="name"
                :filter="true"
                :showClear="true"
                placeholder="ค้นหาและเลือกรหัสเจ้าหน้าที่"
              >
                <template #value="slotProps">
                  <div
                    class="country-item country-item-value"
                    v-if="slotProps.value"
                  >
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
              </Dropdown>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <!-- <Button label="บันทึก" icon="pi pi-save" iconPos="left" /> -->
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeAddModal"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 w-full"
            @click="closeAddModal"
          />
        </div>
      </form>
      <template #footer> </template>
    </Dialog>
    <!-- End EDIT Dialog -->
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
        <span class="text-xl"
          >คุณต้องการลบข้อมูลย้ายฝากตัวอ่อนครั้งที่ 2 ใช่หรือไม่</span
        >
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
            @click="closeConfirmation"
            class="p-button-danger w-full ml-3"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      display: false,
      selecteduser: null,
      user: [
        { name: "996018, นายณัฐกานต์ จันใส", code: "996018" },
        { name: "996130, นายอานนท์ รักจักร", code: "996130" },
      ],
    };
  },
  setup() {
    const breadcrumb = ref([
      // { label: "ทะเบียนสัตว์", to: "/" },
      { label: "ตรวจการตั้งท้อง", to: "/activity/weaning" },
    ]);
    const data = reactive([
      {
        id: "1",
        // farm: "",
        date: "10/8/2556",
        type: "AI",
        animal_name: "ครบกำหนด",
        rfid: "บางพูด",
        species: 60,
        officer: "25/4/2565",
        family: "",
        // "pid": "-",
        project: "1568423",
        status: "ลงทะเบียนแล้ว",
      },
      {
        id: "2",
        // farm: "",
        date: "10/8/2556",
        type: "AI",
        animal_name: "ครบกำหนด",
        rfid: "บางพูด",
        species: 60,
        officer: "25/4/2565",
        family: "",
        // "pid": "-",
        project: "1568423",
        status: "ลงทะเบียนแล้ว",
      },
      {
        id: "3",
        // farm: "",
        date: "10/8/2556",
        type: "AI",
        animal_name: "ครบกำหนด",
        rfid: "บางพูด",
        species: 60,
        officer: "25/4/2565",
        family: "",
        // "pid": "-",
        project: "1568423",
        status: "ลงทะเบียนแล้ว",
      },
      {
        id: "4",
        // farm: "",
        date: "10/8/2556",
        type: "AI",
        animal_name: "ครบกำหนด",
        rfid: "บางพูด",
        species: 60,
        officer: "25/4/2565",
        family: "",
        // "pid": "-",
        project: "1568423",
        status: "ลงทะเบียนแล้ว",
      },
      {
        id: "5",
        // farm: "",
        date: "10/8/2556",
        type: "AI",
        animal_name: "นมหมดก่อนกำหนด",
        rfid: "บางพูด",
        species: 50,
        officer: "25/4/2565",
        family: "",
        // "pid": "-",
        project: "1568423",
        status: "ลงทะเบียนแล้ว",
      },
      {
        id: "6",
        // farm: "",
        date: "10/8/2556",
        type: "AI",
        animal_name: "นมหมดก่อนกำหนด",
        rfid: "บางพูด",
        species: 65,
        officer: "",
        family: "",
        // "pid": "-",
        project: "1568423",
        status: "ลงทะเบียนแล้ว",
      },
      {
        id: "7",
        // farm: "",
        date: "10/8/2556",
        type: "AI",
        animal_name: "ครบกำหนด",
        rfid: "บางพูด",
        species: 65,
        officer: "",
        family: "",
        // "pid": "-",
        project: "1568423",
        status: "ลงทะเบียนแล้ว",
      },
    ]);
    const dateRange = ref();
    const preg_data = ref();
    const items = ref([
      {
        label: "ลบ",
        icon: "pi pi-trash",
        command: () => {
          opendisplaydelete();
        },
      },
      // {
      //   label: "ย้าย",
      //   icon: "pi pi-send",
      //   command: () => {},
      // },
      // {
      //   label: "ผท.2",
      //   icon: "pi pi-list",
      //   command: () => {},
      // },
      // {
      //   label: "ผท.9",
      //   icon: "pi pi-sync",
      //   command: () => {},
      // },
    ]);
    const displayAddModal = ref(false);
    const openAddModal = () => {
      displayAddModal.value = true;
    };
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
    const displaydelete = ref(false);
    const opendisplaydelete = () => {
      displaydelete.value = true;
    };
    const closeConfirmation = () => {
      displaydelete.value = false;
    };
    const search = ref("");

    return {
      search,
      dateRange,
      data,
      preg_data,
      items,
      breadcrumb,
      openAddModal,
      closeAddModal,
      displayAddModal,
      openEditModal,
      closeEditModal,
      displayEditModal,
      displaydelete,
      opendisplaydelete,
      closeConfirmation,
    };
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
