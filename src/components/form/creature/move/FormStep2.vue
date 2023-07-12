<template>
  <div class="mb-5">
    <h1 class="text-xl mb-2 font-light">เลือกสัตว์</h1>
    <p class="p-0 m-0 text-500">ย้ายทะเบียนสัตว์โคเนื้อ (ผท.1)</p>
  </div>
  <form class="grid">
    <div class="col-12 lg:col-12">
      <div class="formgrid grid">
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            หน่วยต้นทาง : 000001 , หน่วยนี้อกหัก ใจผมแตกสลายฮะ</label
          >
          <!-- <InputText type="text" class="w-full" /> -->
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            หน่วยปลายทาง : 000002 , หน่วยนคลั่งน้ำตา เพราะคลั่งรักมากไป</label
          >
          <!-- <InputText type="text" class="w-full" /> -->
        </div>
        <div class="field col-12 sm:col-6">
          <label for="dateRange" class="block text-600 text-sm font-bold mb-2">
            ฟาร์มต้นทาง : 626 , น่าน สุทธหลวง</label
          >
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ฟาร์มปลายทาง : 444 , ธิดา โอบัวหงษ์</label
          >
          <!-- <InputText type="text" class="w-full" /> -->
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            เลือกสัตว์ที่ต้องการย้าย</label
          >
          <Dropdown
            class="w-full"
            v-model="selecteduser"
            :options="user"
            optionLabel="name"
            :filter="true"
            :showClear="true"
            placeholder="ค้นหาและเลือกหน่วยต้นทาง"
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
    <div class="col-12 text-right mt-5 flex justify-content-between">
      <Button
        label="ย้อนกลับ"
        @click="prevPage()"
        icon="pi pi-angle-left"
        class="p-button-outlined p-button-secondary"
      />
      <Button
        label="ย้ายทะเบียนสัตว์"
        @click="openMoveModal()"
        icon="pi pi-angle-right"
        iconPos="right"
      />

      <!-- Move Dialog -->
      <Dialog
        header="เพิ่มกิจกรรมการตรวจการตั้งท้อง"
        v-model:visible="displayMoveModal"
        :style="{ width: '50vw' }"
        :modal="true"
      >
        <form class="grid mt-2">
          <div class="col-12 lg:col-12">
            <div class="formgrid grid">
              <div class="field col-12 sm:col-6">
                <label
                  class="
                    text-xl
                    block
                    text-600 text-sm
                    font-bold
                    mb-2
                    text-left
                  "
                >
                  จาก</label
                >
                <!-- <InputText type="text" class="w-full" /> -->
              </div>
              <div class="field col-12 sm:col-6">
                <label class="text-xl block text-600 text-sm font-bold mb-2">
                  หน่วยต้นทาง : 000001 , หน่วยนี้อกหัก ใจผมแตกสลายฮะ<br />
                  ฟาร์มต้นทาง : 626 , น่าน สุทธหลวง
                </label>
                <!-- <InputText type="text" class="w-full" /> -->
              </div>
              <div class="field col-12 sm:col-6">
                <label
                  for="dateRange"
                  class="text-xl block text-600 text-sm font-bold mb-2"
                >
                  ไปยัง</label
                >
              </div>
              <div class="field col-12 sm:col-6">
                <label class="text-xl block text-600 text-sm font-bold mb-2">
                  หน่วยปลายทาง : 000002 , หน่วยนคลั่งน้ำตา เพราะคลั่งรักมากไป<br />
                  ฟาร์มปลายทาง : 444 , ธิดา โอบัวหงษ์</label
                >
              </div>
              <div class="field col-12 sm:col-6">
                <label class="text-xl block text-600 text-sm font-bold mb-2">
                  สัตว์ที่เลือก</label
                >
              </div>
              <div class="field col-12 sm:col-6">
                <label class="text-xl block text-600 text-sm font-bold mb-2">
                  สนธยา ทิศเหนือ</label
                >
              </div>
            </div>
          </div>
          <div class="col-12 text-right mt-5">
            <Button
              label="ยกเลิก"
              icon="pi pi-times"
              @click="closeMoveModal"
              class="p-button-text mx-2"
            />
            <Button
              label="บันทึกข้อมูล"
              icon="pi pi-save"
              @click="openConfirmMoveModal"
              autofocus
            />
          </div>
        </form>
        <template #footer> </template>
      </Dialog>
      <!-- End Move Dialog -->
      <!-- Confirm Dialog -->
      <Dialog
        header=""
        v-model:visible="displayConfirmMoveModal"
        :style="{ width: '50vw' }"
        :modal="true"
      >
        
        <div class="text-center text-teal-700">
          <img src="..\..\..\..\assets\images\check-circle-fill.svg" alt="icons">
          <h1>ย้ายทะเบียนสัตว์สำเร็จ</h1>
        </div>
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label
                class="text-xl block text-600 text-sm font-bold mb-2 text-left"
              >
                จาก</label
              >
              <!-- <InputText type="text" class="w-full" /> -->
            </div>
            <div class="field col-12 sm:col-6">
              <label class="text-xl block text-600 text-sm font-bold mb-2">
                หน่วยต้นทาง : 000001 , หน่วยนี้อกหัก ใจผมแตกสลายฮะ<br />
                ฟาร์มต้นทาง : 626 , น่าน สุทธหลวง
              </label>
              <!-- <InputText type="text" class="w-full" /> -->
            </div>
            <div class="field col-12 sm:col-6">
              <label
                for="dateRange"
                class="text-xl block text-600 text-sm font-bold mb-2"
              >
                ไปยัง</label
              >
            </div>
            <div class="field col-12 sm:col-6">
              <label class="text-xl block text-600 text-sm font-bold mb-2">
                หน่วยปลายทาง : 000002 , หน่วยนคลั่งน้ำตา เพราะคลั่งรักมากไป<br />
                ฟาร์มปลายทาง : 444 , ธิดา โอบัวหงษ์</label
              >
            </div>
            <div class="field col-12 sm:col-6">
              <label class="text-xl block text-600 text-sm font-bold mb-2">
                สัตว์ที่เลือก</label
              >
            </div>
            <div class="field col-12 sm:col-6">
              <label class="text-xl block text-600 text-sm font-bold mb-2">
                สนธยา ทิศเหนือ</label
              >
            </div>
          </div>
        </div>
        <div class="col-12 text-right mt-5">
          <!-- <Button
            label="ยกเลิก"
            icon="pi pi-times"
            @click="closeConfirmMoveModal"
            class="p-button-text mx-2"
          />
          <Button
            label="บันทึกข้อมูล"
            icon="pi pi-save"
            @click="confirmMoveModal"
            autofocus
          /> -->
        </div>
        <template #footer> </template>
      </Dialog>
      <!-- End Move Dialog -->
    </div>
  </form>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  data() {
    return {
      display: false,
      selecteduser: null,
      user: [
        { name: "นายณัฐกานต์", code: "996018" },
        { name: "นายBrazil", code: "BR" },
        { name: "นายChina", code: "CN" },
        { name: "นายEgypt", code: "EG" },
        { name: "นายFrance", code: "FR" },
        { name: "นายGermany", code: "DE" },
        { name: "นายIndia", code: "IN" },
        { name: "นายJapan", code: "JP" },
        { name: "นายSpain", code: "ES" },
        { name: "นายUnited States", code: "US" },
      ],
    };
  },
  emits: ["next-page", "prev-page"],
  setup(_, { emit }) {
    const data = reactive([
      {
        id: "000001",
        farm: "626 , น่าน สุทธหลวง",
        animal_id: "นนทบุรี",
        animal_name: "ปากเกร็ด",
        rfid: "บางพูด",
        species: 9,
        officer: "บ้านนี้สีดำ",
        family: 99,
        // "pid": "-",
        project: "0899999999",
        status: "ลงทะเบียนแล้ว",
      },
      {
        id: "000002",
        farm: "626 , น่าน สุทธหลวง",
        animal_id: "นนทบุรี",
        animal_name: "ปากเกร็ด",
        rfid: "บางพูด",
        species: 9,
        officer: "บ้านนี้สีดำ",
        family: 99,
        // "pid": "-",
        project: "0899999999",
        status: "ยังไม่ลงทะเบียน",
      },
    ]);
    const nextPage = () => {
      emit("next-page", {
        pageIndex: 2,
      });
    };
    const prevPage = () => {
      emit("prev-page", { pageIndex: 0 });
    };
    const birthdate = ref();
    const date = ref();
    const displayMoveModal = ref(false);
    const openMoveModal = () => {
      displayMoveModal.value = true;
    };
    const closeMoveModal = () => {
      displayMoveModal.value = false;
    };

    const displayConfirmMoveModal = ref(false);
    const openConfirmMoveModal = () => {
      displayMoveModal.value = false;
      displayConfirmMoveModal.value = true;
    };
    const closeConfirmMoveModal = () => {
      displayConfirmMoveModal.value = false;
    };

    return {
      openMoveModal,
      closeMoveModal,
      displayMoveModal,

      openConfirmMoveModal,
      closeConfirmMoveModal,
      displayConfirmMoveModal,
      prevPage,
      nextPage,
      birthdate,
      data,
      date,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>