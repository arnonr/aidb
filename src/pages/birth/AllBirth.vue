//Ref -> 1.2.5 เมนูคลอด
<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ค้นหาและจัดการข้อมูลคลอด" :pages="breadcrumb" />
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
              <div>ชื่อสัตว์ :</div>
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
            <div class="text-xl">ประวัติการคลอด</div>
            <Button
              label="เพิ่มกิจกรรม"
              icon="pi pi-plus"
              class="p-button-raised p-button-info"
              @click="openAddModal"
            />
            <!-- Add Dialog -->
            <Dialog
              header="เพิ่มการคลอด"
              v-model:visible="displayAddModal"
              :style="{ width: '50vw' }"
              :modal="true"
            >
              <form class="grid mt-2">
                <div class="col-12 lg:col-12">
                  <div class="formgrid grid">
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        วันที่คลอด</label
                      >

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
                        ภาวะการคลอด
                      </label>
                      <Dropdown class="w-full" placeholder="เลือก" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        วิธีการช่วยคลอด
                      </label>
                      <Dropdown class="w-full" placeholder="เลือก" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        ผลการคลอด
                      </label>
                      <Dropdown class="w-full" placeholder="เลือก" />
                    </div>

                    <div class="field col-12 sm:col-12">
                      <label class="block text-600 text-sm font-bold mb-2">
                        เจ้าหน้าที่ผู้รับผิดชอบการคลอด
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
                    <template v-for="item in birth" :key="item.id">
                      <!-- <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                          สัตว์ {{ item.id }}
                        </label>
                        <Dropdown
                          class="w-full"
                          placeholder="เลือก"
                          v-model="item.problem"
                          :options="user"
                        />
                      </div> -->
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                          เพศ
                        </label>
                        <Dropdown
                          class="w-full"
                          placeholder="เลือก"
                          v-model="item.problem"
                        />
                      </div>

                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                          น้ำหนักแรกเกิด
                        </label>
                        <InputText
                          type="text"
                          class="w-full"
                          v-model="item.problem"
                        />
                      </div>
                      <div class="field col-12 sm:col-12">
                        <label class="block text-600 text-sm font-bold mb-2">
                          สถานะ
                        </label>
                        <Dropdown
                          class="w-full"
                          placeholder="เลือก"
                          v-model="item.problem"
                        />
                      </div>
                    </template>
                    <div
                      class="field col-12 sm:col-12 flex justify-content-between"
                    >
                      <Button
                        label="เพิ่มลูก"
                        class="p-button-lg"
                        icon="pi pi-plus"
                        @click="addbirth"
                      />
                      <Button
                        label="ลบลูก"
                        class="p-button-lg p-button-danger"
                        icon="pi pi-minus"
                        @click="deletebirth"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12 text-right mt-5">
                  <Button
                    label="ยกเลิก"
                    icon="pi pi-times"
                    @click="closeEditModal"
                    class="p-button-text mx-2"
                  />
                  <Button
                    label="บันทึกข้อมูล"
                    icon="pi pi-save"
                    @click="closeEditModal"
                    autofocus
                  />
                </div>
              </form>
              <template #footer> </template>
            </Dialog>
            <!-- End Add Dialog -->

            <!-- EDIT Dialog -->
            <Dialog
              header="แก้ไขการคลอด"
              v-model:visible="displayEditModal"
              :style="{ width: '50vw' }"
              :modal="true"
            >
              <form class="grid mt-2">
                <div class="col-12 lg:col-12">
                  <div class="formgrid grid">
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        วันที่คลอด</label
                      >
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
                        ภาวะการคลอด
                      </label>
                      <Dropdown class="w-full" placeholder="เลือก" />
                    </div>

                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        วิธีการช่วยคลอด
                      </label>
                      <Dropdown class="w-full" placeholder="เลือก" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        ผลการคลอด
                      </label>
                      <Dropdown class="w-full" placeholder="เลือก" />
                    </div>

                    <div class="field col-12 sm:col-12">
                      <label class="block text-600 text-sm font-bold mb-2">
                        เจ้าหน้าที่ผู้รับผิดชอบการคลอด
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
                    <template v-for="item in birth" :key="item.id">
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                          เพศ
                        </label>
                        <Dropdown
                          class="w-full"
                          placeholder="เลือก"
                          v-model="item.problem"
                        />
                      </div>

                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                          น้ำหนักแรกเกิด
                        </label>
                        <InputText
                          type="text"
                          class="w-full"
                          v-model="item.problem"
                        />
                      </div>
                      <div class="field col-12 sm:col-12">
                        <label class="block text-600 text-sm font-bold mb-2">
                          สถานะ
                        </label>
                        <Dropdown
                          class="w-full"
                          placeholder="เลือก"
                          v-model="item.problem"
                        />
                      </div>
                    </template>
                    <div
                      class="field col-12 sm:col-12 flex justify-content-between"
                    >
                      <Button
                        label="เพิ่มลูก"
                        class="p-button-lg"
                        icon="pi pi-plus"
                        @click="addbirth"
                      />
                      <Button
                        label="ลบลูก"
                        class="p-button-lg p-button-danger"
                        icon="pi pi-minus"
                        @click="deletebirth"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12 text-right mt-5">
                  <Button
                    label="ยกเลิก"
                    icon="pi pi-times"
                    @click="closeEditModal"
                    class="p-button-text mx-2"
                  />
                  <Button
                    label="บันทึกข้อมูล"
                    icon="pi pi-save"
                    @click="closeEditModal"
                    autofocus
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
                  >คุณต้องการลบข้อมูลการคลอดครั้งที่ 2 ใช่หรือไม่</span
                >
              </div>
              <template #footer>
                <div class="col-12 text-center flex justify-content-between">
                  <Button
                    label="ยกเลิก"
                    @click="closemodaldelete"
                    class="p-button-secondary w-full mr-3"
                  />
                  <Button
                    label="ยืนยัน"
                    @click="closemodaldelete"
                    class="p-button-danger w-full ml-3"
                  />
                </div>
              </template>
            </Dialog>
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
                field="birth"
                header="วันที่คลอด"
                class="text-center"
              ></Column>
              <Column
                field="total"
                header="จำนวนลูก"
                class="text-center"
              ></Column>
              <Column field="sex" header="เพศ" class="text-center"></Column>
              <Column field="bcs" header="BCS" class="text-center"></Column>
              <Column
                field="opname"
                header="ชื่อเจ้าหน้าที่"
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

      birth: [
        {
          id: 1,
        },
      ],
    };
  },
  methods: {
    addbirth() {
      this.birth.push({
        id: this.birth.length + 1,
        problem: "",
        how: "",
        user: this.selecteduser,
      });
    },
    deletebirth() {
      this.birth.splice(this.birth.length - 1, 1);
    },
  },
  setup() {
    const breadcrumb = ref([
      { label: "เมนูคลอด", to: "/activity/abortion/all" }, ///activity/abortion/all
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
        times: "1",
        date: "07/01/2561",
        type: "AI",
        birth: "27/09/2561",
        total: "1",
        sex: "M",
        bcs: "5",
        opname: "น่าน สุทธหลวง",
      },
      {
        id: "2",
        times: "2",
        date: "18/02/2563	",
        type: "AI",
        birth: "",
        total: "",
        sex: "",
        bcs: "",
        opname: "น่าน สุทธหลวง",
      },
    ]);
    const dateRange = ref();
    const items = ref([
      {
        label: "ลบ",
        icon: "pi pi-trash",
        command: () => {
          openmodaldelete();
        },
      },
    ]);
    const search = ref("");
    const displaydelete = ref(false);
    const openmodaldelete = () => {
      displaydelete.value = true;
    };
    const closemodaldelete = () => {
      displaydelete.value = false;
    };

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
      openmodaldelete,
      closemodaldelete,
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
