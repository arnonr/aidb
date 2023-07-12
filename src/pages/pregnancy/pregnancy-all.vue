<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="เครื่องมือตรวจการตั้งท้อง" :pages="breadcrumb" />
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
              placeholder="วันที่ตรวจท้อง"
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
              <div>ชื่อ:</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>อายุ :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>หมายเลขข้างหู :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>เลขอ้างอิง RFID :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>สถานะ :</div>
            </div>
          </div>
          <div class="grid">
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 1 :</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 1:
            </div>
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 2 :</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 2:
            </div>
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 3 :</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 3:
            </div>
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 4 :</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 4:
            </div>

            <div class="col-12 sm:col lg:col">
              <div>รอบการให้นมครั้งที่ :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ครั้งที่ผสม :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>คะแนนความสมบูรณ์ร่างกาย :</div>
            </div>
          </div>
        </div>
        <!-- datatable -->
        <div class="card mt-5">
          <div class="grid">
            <div class="col-6 sm:col-6 lg:col-6 text-left">
              <h1 class="text-xl">ประวัติการตรวจการตั้งท้อง</h1>
            </div>
            <div class="col-6 sm:col-6 lg:col-6 text-right">
              <Button
                label="เพิ่มกิจกรรม"
                icon="pi pi-plus"
                class="mb-3 p-button-raised p-button-raised p-button-info"
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
            <Column field="id" header="ลำดับ" class="text-center"></Column>
            <Column
              field="times"
              header="ครั้งที่ผสม"
              class="text-center"
            ></Column>
            <Column
              field="date"
              header="วันที่ผสม"
              class="text-center"
            ></Column>
            <Column
              field="type"
              header="ประเภทการผสม"
              class="text-center"
            ></Column>
            <Column
              field="datepre"
              header="วันที่ตรวจท้อง"
              class="text-center"
            ></Column>
            <Column
              field="check"
              header="ตรวจครั้งที่"
              class="text-center"
            ></Column>
            <Column
              field="result"
              header="ผลการตรวจ"
              class="text-center"
            ></Column>
            <Column field="bcs" header="BCS" class="text-center"></Column>

            <Column
              field="opname"
              header="ชื่อเจ้าหน้าที่ตรวจ"
              class="text-center"
            ></Column>
            <Column header="จัดการ" class="text-center">
              <template #body>
                <SplitButton
                  label="แก้ไข"
                  icon="pi pi-pencil"
                  @click="openEditModal"
                  class="p-button-sm p-button-outlined p-button-warning"
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
      header="เพิ่มกิจกรรมข้อมูลการตรวจการตั้งท้อง"
      v-model:visible="displayAddModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ครั้งที่ผสม
              </label>
              <InputText type="text" class="w-full" placeholder="1" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ตรวจท้อง
              </label>
              <Calendar
                class="w-full"
                id="date"
                v-model="date"
                :manualInput="false"
                placeholder=""
                :showIcon="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วิธีการตรวจ
              </label>
              <Dropdown
                type="text"
                class="w-full"
                placeholder="เลือกวิธีการตรวจ"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ครั้งที่ตรวจ
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ผลการตรวจ
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <!-- <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              โครงการ
            </label>
            <InputText type="text" class="w-full" />
          </div> -->

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสเจ้าหน้าที่
              </label>
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
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อเจ้าหน้าที่
              </label>
              <InputText type="text" class="w-full" />
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
            @click="closeAddModal"
          />
        </div>
      </form>
    </Dialog>
    <!-- End Add Dialog -->
    <!-- EDIT Dialog -->
    <Dialog
      header="แก้ไขกิจกรรมข้อมูลการตรวจการตั้งท้อง"
      v-model:visible="displayEditModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ครั้งที่ผสม
              </label>
              <InputText type="text" class="w-full" placeholder="1" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ตรวจท้อง
              </label>
              <Calendar
                class="w-full"
                id="date"
                v-model="date"
                :manualInput="false"
                placeholder=""
                :showIcon="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วิธีการตรวจ
              </label>
              <Dropdown
                type="text"
                class="w-full"
                placeholder="เลือกวิธีการตรวจ"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ครั้งที่ตรวจ
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ผลการตรวจ
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <!-- <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              โครงการ
            </label>
            <InputText type="text" class="w-full" />
          </div> -->

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสเจ้าหน้าที่
              </label>
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
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อเจ้าหน้าที่
              </label>
              <InputText type="text" class="w-full" />
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
            @click="closeAddModal"
          />
        </div>
      </form>
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
      { label: "ตรวจการตั้งท้อง", to: "/activity/pregnancy" },
    ]);
    const data = reactive([
      {
        id: "1",
        times: "1",
        date: "11/01/2564",
        type: "AI",
        datepre: "04/07/2560",
        check: "1",
        result: "NO",
        bcs: "5",
        opname: "น่าน สุทธหลวง",
      },
      {
        id: "2",
        times: "2",
        date: "06/11/2560",
        type: "AI",
        datepre: "",
        check: "",
        result: "",
        bcs: "",
        opname: "น่าน สุทธหลวง",
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
