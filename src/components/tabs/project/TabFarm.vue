<template>
  <div class="grid flex align-items-center mt-3 mb-5">
    <div class="col-12 md:col-6">
      <h1 class="text-2xl mb-0 text-600">
        มีรายการฟาร์มในโครงการทั้งหมด 5 รายการ
      </h1>
    </div>
    <div class="col-12 md:col-6 md:text-right">
      <router-link to="/project/farm/add">
        <Button
          label="เพิ่มฟาร์มเข้าโครงการ"
          icon="pi pi-plus"
          class="w-full md:w-auto"
        />
      </router-link>
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
    <Column field="farm_id" header="ทะเบียนฟาร์ม" class="text-center"></Column>
    <Column field="famr_name" header="ชื่อฟาร์ม" class="text-center"></Column>
    <Column field="city" header="จังหวัด" class="text-center"></Column>
    <Column field="district" header="อำเภอ" class="text-center"></Column>
    <Column field="sub_district" header="ตำบล" class="text-center"></Column>
    <Column
      field="date"
      header="วันที่ขึ้นทะเบียนฟาร์ม"
      class="text-center"
    ></Column>
    <Column field="status" header="สถานะ" class="text-center">
      <template #body="slotProps">
        <div v-if="slotProps.data.status === 'ดำเนินการ'">
          <Badge :value="slotProps.data.status" severity="success"> </Badge>
        </div>
        <div v-else>
          <Badge :value="slotProps.data.status"> </Badge>
        </div>
      </template>
    </Column>
    <Column header="จัดการ" class="text-center">
      <template #body>
        <SplitButton
          label="แก้ไข"
          icon="pi pi-pencil"
          class="p-button-sm p-button-outlined p-button-warning"
          :model="items"
        >
        </SplitButton>
      </template>
    </Column>
  </DataTable>

  <!-- Add Dialog -->
  <Dialog
    header="เพิ่มกิจกรรมข้อมูลการผสมเทียม"
    v-model:visible="displayAddModal"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <form class="grid mt-2">
      <div class="col-12 lg:col-12">
        <div class="formgrid grid">
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              หมายเลขทะเบียนสัตว์
            </label>
            <InputText type="text" class="w-full" />
          </div>
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ชื่อสัตว์
            </label>
            <InputText type="text" class="w-full" />
          </div>
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ครั้งที่ผสม
            </label>
            <InputText type="number" class="w-full" />
          </div>

          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่ผสมเทียม
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
              หมายเลขน้ำเชื้อที่ใช้
            </label>
            <InputText type="text" class="w-full" />
          </div>
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              จำนวนโด๊ส
            </label>
            <InputText type="number" class="w-full" />
          </div>
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              รหัสเจ้าหน้าที่ผสมเทียม
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
              ชื่อเจ้าหน้าที่ผสมเทียม
            </label>
            <InputText type="text" class="w-full" readonly />
          </div>
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              โครงการ</label
            >
            <MultiSelect
              v-model="selectedProject"
              class="w-full"
              :options="projects"
              optionLabel="name"
              placeholder="เลือกโครงการ"
              display="chip"
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
          @click="closeAddModal"
        />
      </div>
    </form>
  </Dialog>
  <!-- End Add Dialog -->
  <!-- EDIT Dialog -->
  <Dialog
    header="แก้ไขกิจกรรมข้อมูลการผสมเทียม"
    v-model:visible="displayEditModal"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <form class="grid mt-2">
      <div class="col-12 lg:col-12">
        <div class="formgrid grid">
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              หมายเลขทะเบียนสัตว์
            </label>
            <InputText type="text" class="w-full" />
          </div>
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ชื่อสัตว์
            </label>
            <InputText type="text" class="w-full" />
          </div>
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ครั้งที่ผสม
            </label>
            <InputText type="number" class="w-full" />
          </div>

          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่ผสมเทียม
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
              หมายเลขน้ำเชื้อที่ใช้
            </label>
            <InputText type="text" class="w-full" />
          </div>
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              จำนวนโด๊ส
            </label>
            <InputText type="number" class="w-full" />
          </div>
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              รหัสเจ้าหน้าที่ผสมเทียม
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
              ชื่อเจ้าหน้าที่ผสมเทียม
            </label>
            <InputText type="text" class="w-full" readonly />
          </div>
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              โครงการ</label
            >
            <MultiSelect
              v-model="selectedProject"
              class="w-full"
              :options="projects"
              optionLabel="name"
              placeholder="เลือกโครงการ"
              display="chip"
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
        >คุณต้องการลบข้อมูลข้อมูลการผสมเทียมครั้งที่ 2 ใช่หรือไม่</span
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
</template>

<script>
import { reactive, ref } from "vue";

export default {
  setup() {
    const data = reactive([
      {
        id: "1",
        farm_id: "7105000390",
        famr_name: "สมหมาย จินดาเพ็ง (วีระ)",
        city: "กาญจนบุรี",
        district: "ท่ามะกา",
        sub_district: "ยางม่วง",
        date: "01/01/64",
        status: "ดำเนินการ",
      },
      {
        id: "2",
        farm_id: "7105000390",
        famr_name: "สมหมาย จินดาเพ็ง (วีระ)",
        city: "กาญจนบุรี",
        district: "ท่ามะกา",
        sub_district: "ยางม่วง",
        date: "01/01/64",
        status: "ดำเนินการ",
      },
      {
        id: "3",
        farm_id: "7105000390",
        famr_name: "สมหมาย จินดาเพ็ง (วีระ)",
        city: "กาญจนบุรี",
        district: "ท่ามะกา",
        sub_district: "ยางม่วง",
        date: "01/01/64",
        status: "ดำเนินการ",
      },
      {
        id: "4",
        farm_id: "7105000390",
        famr_name: "สมหมาย จินดาเพ็ง (วีระ)",
        city: "กาญจนบุรี",
        district: "ท่ามะกา",
        sub_district: "ยางม่วง",
        date: "01/01/64",
        status: "ดำเนินการ",
      },
      {
        id: "5",
        farm_id: "7105000390",
        famr_name: "สมหมาย จินดาเพ็ง (วีระ)",
        city: "กาญจนบุรี",
        district: "ท่ามะกา",
        sub_district: "ยางม่วง",
        date: "01/01/64",
        status: "ดำเนินการ",
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
    const selectedProject = ref();
    const projects = ref([
      { name: "โครงการ1", code: "NY" },
      { name: "โครงการ2", code: "RM" },
      { name: "โครงการ3", code: "LDN" },
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

    return {
      data,
      items,
      displayAddModal,
      openAddModal,
      closeAddModal,
      displayEditModal,
      openEditModal,
      closeEditModal,
      displaydelete,
      opendisplaydelete,
      closeConfirmation,
      selectedProject,
      projects,
    };
  },
};
</script>
