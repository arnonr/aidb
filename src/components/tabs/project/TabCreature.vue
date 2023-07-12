<template>
  <div class="grid flex align-items-center mt-3 mb-5">
    <div class="col-12 md:col-6">
      <h1 class="text-2xl mb-0 text-600">
        มีรายการสัตว์ในโครงการทั้งหมด 4 รายการ
      </h1>
    </div>
    <div class="col-12 md:col-6 md:text-right">
      <router-link to="/project/creature/add">
        <Button
          label="เพิ่มสัตว์เข้าโครงการ"
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
    <Column field="creature_id" header="หมายเลขโค" class="text-center"></Column>
    <Column field="name" header="ชื่อโค" class="text-center"></Column>
    <Column field="date" header="วัน/เดือน/ปีเกิด" class="text-center"></Column>
    <Column field="age" header="อายุ" class="text-center"></Column>
    <Column field="Breed" header="Breed" class="text-center"></Column>
    <Column field="status" header="สถานะ" class="text-center"></Column>
    <!-- <Column field="pregrant" header="ตรวจท้อง" class="text-center"></Column>
    <Column field="born" header="วันคลอด" class="text-center"></Column>
    <Column field="result" header="ผล" class="text-center"></Column> -->
    <!-- <Column
      field="opid"
      header="รหัสเจ้าหน้าที่ผู้ผสมเทียม"
      class="text-center"
    ></Column>
    <Column
      field="opname"
      header="ชื่อเจ้าหน้าที่ผู้ผสมเทียม"
      class="text-center"
    ></Column> -->
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
        creature_id: "151605349",
        name: "สนธยา",
        date: "01/05/2565",
        age: "6-10",
        Breed: "6-10",
        status: "แม่โค",
      },
      {
        id: "2",
        creature_id: "151605349",
        name: "สนธยา",
        date: "01/05/2565",
        age: "6-10",
        Breed: "6-10",
        status: "แม่โค",
      },
      {
        id: "3",
        creature_id: "151605349",
        name: "สนธยา",
        date: "01/05/2565",
        age: "6-10",
        Breed: "6-10",
        status: "แม่โค",
      },
      {
        id: "4",
        creature_id: "151605349",
        name: "สนธยา",
        date: "01/05/2565",
        age: "6-10",
        Breed: "6-10",
        status: "แม่โค",
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
