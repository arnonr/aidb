<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="กิจกรรมย้ายฝากตัวอ่อน" :pages="breadcrumb" />
      <div class="card">
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
          <div class="grid pt-5">
            <div class="col-12 sm:col lg:col">
              <div>ชื่อ :</div>
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
              <div>สถานภาพการผลิต :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ลูกตัวสุดท้ายตัวที่ :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>คลอดลูกครั้งสุดท้ายวันที่ :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ผสมครั้งสุดท้ายวันที่ :</div>
            </div>
          </div>
          <div class="text-xl pt-3">ข้อมูลฟาร์ม</div>
          <div class="grid pt-5">
            <div class="col-12 sm:col lg:col">
              <div>หมายเลขทะเบียนฟาร์ม :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ชื่อฟาร์ม :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>วันที่ขึ้นทะเบียนฟาร์ม :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ชื่อเจ้าของฟาร์ม :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>สถานะฟาร์ม :</div>
            </div>
          </div>
        </div>
        <div class="mt-5 card">
          <div class="flex justify-content-between">
            <div class="text-xl">ประวัติการย้ายฝากตัวอ่อน</div>
            <Button
              label="เพิ่มกิจกรรม"
              icon="pi pi-plus"
              class="mb-3 p-button-raised p-button-raised p-button-info"
              @click="openAddModal"
            />
          </div>
          <DataTable
            class="text-sm"
            :value="data"
            :paginator="true"
            :rows="10"
            :rowHover="true"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
            <Column field="id" header="ครั้งที่" class="text-center"></Column>
            <Column
              field="farm"
              header="รอบการให้นม"
              class="text-center"
            ></Column>
            <Column
              field="province"
              header="วันเวลาที่ผสม"
              class="text-center"
            ></Column>
            <Column
              field="district"
              header="หมายเลขทะเบียนตัวอ่อน"
              class="text-center"
            ></Column>
            <Column
              field="sub_district"
              header="รหัสเจ้าหน้าที่ผู้ผสมเทียม"
              class="text-center"
            ></Column>
            <Column
              field="group"
              header="ชื่อเจ้าหน้าที่ผู้ผสมเทียม"
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
    </div>
    <!-- end main page -->
    <!-- Add Dialog -->
    <Dialog
      header="เพิ่มกิจกรรมย้ายฝากตัวอ่อน"
      v-model:visible="displayAddModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รอบการให้นม</label
              >
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ครั้งที่ผสม
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผสม
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
                หมายเลขทะเบียนตัวอ่อน
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสเจ้าหน้าที่ผู้ผสมเทียม
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
                ชื่อเจ้าหน้าที่ผู้ผสมเทียม
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
      header="แก้ไขกิจกรรมย้ายฝากตัวอ่อน"
      v-model:visible="displayEditModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รอบการให้นม</label
              >
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ครั้งที่ผสม
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผสม
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
                หมายเลขทะเบียนตัวอ่อน
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสเจ้าหน้าที่ผู้ผสมเทียม
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
                ชื่อเจ้าหน้าที่ผู้ผสมเทียม
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
  setup() {
    const breadcrumb = ref([
      { label: "กิจกรรม", to: "/" },
      { label: "กิจกรรมย้ายฝากตัวอ่อน", to: "" },
    ]);
    const data = reactive([
      {
        id: "1",
        farm: "1",
        province: "11/01/2564",
        district: "32136",
        sub_district: "000021",
        group: "น่าน สุทธหลวง",
      },
      {
        id: "2",
        farm: "4",
        province: "11/01/2564",
        district: "00012",
        sub_district: "000021",
        group: "น่าน สุทธหลวง",
      },
    ]);
    const items = ref([
      {
        label: "ลบ",
        icon: "pi pi-trash",
        command: () => {
          opendisplaydelete();
        },
      },
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
    const search = ref();
    return {
      data,
      search,
      items,
      breadcrumb,
      displayAddModal,
      openAddModal,
      closeAddModal,
      displayEditModal,
      openEditModal,
      closeEditModal,
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
