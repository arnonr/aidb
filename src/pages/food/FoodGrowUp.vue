<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="การจัดเก็บข้อมูลการขุน/อาหาร" :pages="breadcrumb" />
      <div class="card">
        <div class="card">
          <div class="flex justify-content-between">
            <div class="text-xl">การบันทึกการเจริญเติบโต</div>
            <!-- <router-link to="/activity/food/add"> -->
            <Button
              label="เพิ่มกิจกรรม"
              icon="pi pi-plus"
              class="p-button-raised p-button-info"
              @click="openAddModal"
            />
            <!-- </router-link> -->

            <!-- Add Dialog -->
            <Dialog
              header="เพิ่มการบันทึกการเจริญเติบโต"
              v-model:visible="displayAddModal"
              :style="{ width: '50vw' }"
              :modal="true"
            >
              <form class="grid mt-2">
                <div class="col-12 lg:col-12">
                  <div class="formgrid grid">
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        วันที่ชั่งน้ำหนัก
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
                        การให้คะแนนร่างกาย</label
                      >
                      <Dropdown
                        v-model="selectedCity"
                        :options="cities"
                        class="w-full"
                        optionLabel="name"
                        placeholder="เลือกคะแนน"
                      />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        น้ำหนัก(กก.)
                      </label>
                      <InputText type="text" class="w-full" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        ความกว้างอก(ซม.)
                      </label>
                      <InputText type="text" class="w-full" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        รอบอก(ซม.)
                      </label>
                      <InputText type="text" class="w-full" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        ส่วนสูง(ซม.)
                      </label>
                      <InputText type="text" class="w-full" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        ความยาวลำตัว(ซม.)
                      </label>
                      <InputText type="text" class="w-full" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        พื้นที่หน้าตัดสันหลัง
                      </label>
                      <InputText type="text" class="w-full" />
                    </div>

                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        รับผิดชอบ
                      </label>
                      <Dropdown
                        class="w-full"
                        v-model="selecteduser"
                        :options="user"
                        optionLabel="name"
                        :filter="true"
                        :showClear="true"
                        placeholder="รหัสผู้ประเมิน"
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
                    @click="closeEditModal"
                  />
                  <Button
                    label="บันทึกข้อมูล"
                    class="ml-3 bg-primary w-full p-button-raised p-button-text p-button-plain"
                    @click="closeEditModal"
                  />
                </div>
              </form>
            </Dialog>
            <!-- End Add Dialog -->
            <!-- EDIT Dialog -->
            <Dialog
              header="แก้ไขการบันทึกการเจริญเติบโต"
              v-model:visible="displayEditModal"
              :style="{ width: '50vw' }"
              :modal="true"
            >
              <form class="grid mt-2">
                <div class="col-12 lg:col-12">
                  <div class="formgrid grid">
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        วันที่ชั่งน้ำหนัก
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
                        การให้คะแนนร่างกาย</label
                      >
                      <Dropdown
                        v-model="selectedCity"
                        :options="cities"
                        class="w-full"
                        optionLabel="name"
                        placeholder="เลือกคะแนน"
                      />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        น้ำหนัก(กก.)
                      </label>
                      <InputText type="text" class="w-full" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        ความกว้างอก(ซม.)
                      </label>
                      <InputText type="text" class="w-full" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        รอบอก(ซม.)
                      </label>
                      <InputText type="text" class="w-full" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        ส่วนสูง(ซม.)
                      </label>
                      <InputText type="text" class="w-full" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        ความยาวลำตัว(ซม.)
                      </label>
                      <InputText type="text" class="w-full" />
                    </div>
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        พื้นที่หน้าตัดสันหลัง
                      </label>
                      <InputText type="text" class="w-full" />
                    </div>

                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        รับผิดชอบ
                      </label>
                      <Dropdown
                        class="w-full"
                        v-model="selecteduser"
                        :options="user"
                        optionLabel="name"
                        :filter="true"
                        :showClear="true"
                        placeholder="รหัสผู้ประเมิน"
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
                    @click="closeEditModal"
                  />
                  <Button
                    label="บันทึกข้อมูล"
                    class="ml-3 bg-primary w-full p-button-raised p-button-text p-button-plain"
                    @click="closeEditModal"
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
                field="farm"
                header="หมายเลขสัตว์"
                class="text-center"
              ></Column>
              <Column
                field="province"
                header="ชื่อสัตว์"
                class="text-center"
              ></Column>
              <Column
                field="district"
                header="เพศ"
                class="text-center"
              ></Column>
              <Column
                field="sub_district"
                header="อายุ"
                class="text-center"
              ></Column>
              <Column
                field="a1"
                header="น้ำหนัก(กก.)"
                class="text-center"
              ></Column>
              <Column
                field="target"
                header="น้ำหนักเป้าหมาย(กก.)"
                class="text-center"
              ></Column>
              <Column
                field="percent"
                header="อัตราความก้าวหน้า"
                class="text-center"
              ></Column>
              <Column
                field="a2"
                header="ความกว้างอก(ซม.)"
                class="text-center"
              ></Column>
              <Column
                field="a3"
                header="รอบอก(ซม.)"
                class="text-center"
              ></Column>
              <Column
                field="a4"
                header="ส่วนสูง(ซม.)"
                class="text-center"
              ></Column>
              <Column
                field="a5"
                header="ความยาวลำตัว(ซม.)"
                class="text-center"
              ></Column>
              <Column
                field="bcs"
                header="คะแนนร่างกาย"
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
import router from "../../router";
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
      { label: "การบันทึกการขุนอาหาร", to: "/activity/farm_info" },
      { label: "การจัดเก็บข้อมูลการขุน/อาหาร", to: "/activity/food" },
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
        farm: "151605349",
        province: "ชมพู่",
        district: "M",
        sub_district: "5",
        village_name: "สมพรพุทธฟาร์ม",
        a1: "250",
        target: "300",
        percent: "80%",
        a2: "100",
        a3: "250",
        a4: "230",
        a5: "300",
        bcs: "4",
        // house_number: 99,
        // pid: "-",
        // phone: "0899999999",
        // status: "เปิดใช้งาน",
      },
      {
        id: "2",
        farm: "151605349",
        province: "ชมพู่",
        district: "M",
        sub_district: "5",
        village_name: "สมพรพุทธฟาร์ม",
        a1: "255",
        target: "300",
        percent: "85%",
        a2: "105",
        a3: "255",
        a4: "235",
        a5: "305",
        bcs: "5",
      },
    ]);
    const dateRange = ref();
    const items = ref([
      {
        label: "การเจริญเติบโต",
        icon: "pi pi-check",
        command: () => {
          return router.push("/activity/creature_info");
        },
      },
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
      selectedCity: null,
      cities: [
        { name: "1", code: "NY" },
        { name: "2", code: "RM" },
        { name: "3", code: "LDN" },
        { name: "4", code: "D" },
        { name: "5", code: "C" },
      ],
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
