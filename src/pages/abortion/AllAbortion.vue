<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ค้นหาและจัดการข้อมูลเมนูแท้ง" :pages="breadcrumb" />
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
          <div class="grid">
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
        <div class="card">
          <div class="flex justify-content-between">
            <div class="text-xl">ประวัติการแท้ง</div>
            <!-- <Button
              label="เพิ่มกิจกรรม"
              icon="pi pi-plus"
              class="p-button-raised p-button-info"
              @click="openAddModal"
            /> -->

            <!-- Add Dialog -->
            <Dialog
              header="เพิ่มกิจกรรมข้อมูลการแท้ง"
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
                      <InputText type="text" class="w-full" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        รอบการให้นม</label
                      >
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
                        โครงการ
                      </label>
                      <InputText type="text" class="w-full" />
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
                      <InputText type="text" class="w-full" />
                    </div>
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
                  </div>
                </div>
                <div
                  class="col-12 text-center mt-5 flex justify-content-between"
                >
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
              header="แก้ไขกิจกรรมข้อมูลการแท้ง"
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
                      <InputText
                        type="text"
                        placeholder="1"
                        class="w-full"
                        readonly
                      />
                    </div>

                    <!-- <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขทะเบียนตัวอ่อน
              </label>
              <InputText type="text" class="w-full" />
            </div> -->

                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        ลักษณะการแท้ง
                      </label>
                      <Dropdown
                        class="w-full"
                        id="selectedstatus"
                        placeholder="เลือกข้อมูล"
                      />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        วันที่ตรวจแท้ง
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
                        ระยะการแท้ง(วัน)
                      </label>
                      <InputText
                        type="text"
                        placeholder="212"
                        class="w-full"
                        readonly
                      />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        หมายเหตุ
                      </label>
                      <InputText type="text" class="w-full" />
                    </div>

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
                      <InputText type="text" class="w-full" readonly />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        BCS
                      </label>
                      <Dropdown
                        class="w-full"
                        id="selectedstatus"
                        placeholder="เลือกข้อมูล"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="col-12 text-center mt-5 flex justify-content-between"
                >
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
            <!-- End Delete Dialog -->
          </div>
          <div class="mt-5">
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
              <Column field="id" header="	ครั้งที่" class="text-center"></Column>
              <Column
                field="code"
                header="วันที่พบการแท้ง"
                class="text-center"
              ></Column>
              <Column
                field="name"
                header="ลักษณะการแท้ง "
                class="text-center"
              ></Column>
              <Column
                field="status"
                header=" ระยะการแท้ง "
                class="text-center"
              ></Column>
              <Column
                field="birthdate"
                header="รหัสเจ้าหน้าที่ผู้ผสมเทียม"
                class="text-center"
              ></Column>
              <Column
                field="breed_1_id"
                header="ชื่อเจ้าหน้าที่ผู้ผสมเทียม"
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
      </div>
    </div>
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
      selecteduser: null,
      user: [
        { name: "996018, นายณัฐกานต์ จันใส", code: "996018" },
        { name: "996130, นายอานนท์ รักจักร", code: "996130" },
      ],
    };
  },
  setup() {
    const breadcrumb = ref([
      { label: "เมนูแท้ง", to: "/activity/abortion/all" }, ///activity/abortion/all
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

    const data = reactive([
      {
        id: "1",
        code: "09/01/2564",
        name: "รกออก",
        status: "3 เดือน",
        birthdate: "000021",
        breed_1_id: "น่าน สุทธหลวง",
      },
      {
        id: "2",
        code: "11/5/2565",
        name: "รกออก",
        status: "3 เดือน",
        birthdate: "000021",
        breed_1_id: "น่าน สุทธหลวง",
      },
    ]);
    const dateRange = ref();
    const items = ref([
      {
        label: "ลบ",
        icon: "pi pi-trash",
        command: () => {
          opendisplaydelete();
        },
      },
    ]);
    const search = ref("");

    return {
      search,
      dateRange,
      data,
      items,
      breadcrumb,
      openAddModal,
      closeAddModal,
      displayAddModal,
      openEditModal,
      closeEditModal,
      displayEditModal,
      displaydelete,
    };
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}

.header {
  font-weight: 700;
  color: #ffa726;
}
</style>
