<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="กิจกรรมการติดตามหลังคลอด" :pages="breadcrumb" />
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
          <div class="text-xl">ข้อมูลเนื้อหมายเลข {{ search }}</div>
          <div class="grid pt-5">
            <div class="col-12 sm:col lg:col">
              <div>ชื่อสัตว์ : ปางแก้ว</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>อายุ : 6-10</div>
            </div>
          </div>
          <div class="text-xl pt-3">ข้อมูลฟาร์ม</div>
          <div class="grid pt-5">
            <div class="col-12 sm:col lg:col">
              <div>หมายเลขทะเบียนฟาร์ม :9911002233</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ชื่อฟาร์ม : สมหมาย จินดาเพ็ง(วีระ)</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>วันที่ขึ้นทะเบียนฟาร์ม : 20/4/2550</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ชื่อเจ้าของฟาร์ม :สมหมาย จินดาเพ็ง</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>สถานะฟาร์ม : Masterbull</div>
            </div>
          </div>
        </div>
        <div class="mt-5 card">
          <div class="flex justify-content-between">
            <div class="text-xl pb-5">ประวัติลูกหลังคลอด</div>
            <Button
              label="เพิ่มกิจกรรม"
              icon="pi pi-plus"
              class="p-button-raised p-button-info"
              @click="openAddModal"
            />
            <!-- Add Dialog -->
            <Dialog
              header="เพิ่มกิจกรรมติดตามลูกหลังคลอด"
              v-model:visible="displayAddModal"
              :style="{ width: '50vw' }"
              :modal="true"
            >
              <form class="grid mt-2">
                <div class="col-12 lg:col-12">
                  <div class="formgrid grid">
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        วันที่ติดตาม
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
                        น้ำหนัก
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
                      <InputText type="text" class="w-full" />
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
              header="แก้ไขกิจกรรมติดตามลูกหลังคลอด"
              v-model:visible="displayEditModal"
              :style="{ width: '50vw' }"
              :modal="true"
            >
              <form class="grid mt-2">
                <div class="col-12 lg:col-12">
                  <div class="formgrid grid">
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        วันที่ติดตาม
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
                        น้ำหนัก
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
                      <InputText type="text" class="w-full" />
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
              field="farm"
              header="รอบการให้นมที่"
              class="text-center"
            ></Column>
            <Column
              field="province"
              header="วันที่คลอด"
              class="text-center"
            ></Column>
            <Column
              field="district"
              header="หมายเลขประจำตัวลูก"
              class="text-center"
            ></Column>
            <Column
              field="sub_district"
              header="ชื่อลูก"
              class="text-center"
            ></Column>
            <Column field="group" header="เพศ" class="text-center"></Column>
            <Column
              field="fid"
              header="หมายเลขประจำตัวพ่อ"
              class="text-center"
            ></Column>
            <Column field="status" header="สถานะ" class="text-center"></Column>
            <Column
              field="weight"
              header="น้ำหนัก"
              class="text-center"
            ></Column>
            <Column
              field="pid"
              header="เจ้าหน้าที่"
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
      { label: "กิจกรรมการติดตามหลังคลอด", to: "" },
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
    const data = reactive([
      {
        id: "1",
        farm: 7,
        province: "09/01/2564",
        district: "12345",
        sub_district: "ทอง",
        group: "ผู้",
        fid: "84742",
        status: "ลงทะเบียนแล้ว",
        weight: "78",
        pid: "น่าน สุทธหลวง",
      },
      {
        id: "2",
        farm: "4",
        province: "11/5/2565",
        district: "12312",
        sub_district: "ขนุน",
        group: "เมีย",
        fid: "84742",
        status: "ลงทะเบียนแล้ว",
        weight: "67",
        pid: "น่าน สุทธหลวง",
      },
    ]);
    const search = ref();
    return {
      data,
      search,
      breadcrumb,
      openAddModal,
      closeAddModal,
      displayAddModal,
      openEditModal,
      closeEditModal,
      displayEditModal,
    };
  },
};
</script>
<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
