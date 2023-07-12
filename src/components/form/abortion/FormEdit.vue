<template>
  <div class="mb-5">
    <h1 class="text-xl mb-2 font-light">ข้อมูล</h1>
    <p class="p-0 m-0 text-500">ป้อนรายละเอียด</p>
  </div>
  <form class="grid">
    <div class="col-12 lg:col-12">
      <div class="formgrid grid">
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            หมายเลขประจำตัว</label
          >
          <InputText
            type="text"
            class="w-full"
            placeholder="กรอกหมายเลขประจำตัวสัตว์"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ชื่อสัตว์</label
          >
          <InputText type="text" class="w-full" placeholder="กรอกชื่อสัตว์" />
        </div>
        <div class="field col-12 sm:col-6">
          <label
            for="selectedstatus"
            class="lock text-600 text-sm font-bold mb-2"
          >
            สถานะ</label
          >
          <Dropdown
            class="w-full"
            id="selectedstatus"
            placeholder="เลือกสถานะ"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label for="date" class="block text-600 text-sm font-bold mb-2">
            วัน-เดือน-ปี-เกิด(อายุ)</label
          >
          <Calendar
            class="w-full"
            id="date"
            v-model="date"
            selectionMode="date"
            :showIcon="true"
            :manualInput="false"
            placeholder="เลือกวันเกิด"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> พันธุ์</label>
          <Dropdown
            class="w-full"
            id="selectedbreed"
            placeholder="เลือกพันธุ์"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            สถานภาพการผลิต</label
          >
          <Dropdown
            class="w-full"
            id="selectedstatuspro"
            placeholder="เลือกสถานภาพการผลิต"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ลูกตัวสุดท้ายตัวที่</label
          >
          <InputText
            type="text"
            class="w-full"
            placeholder="กรอกลูกตัวสุดท้าย ตัวที่... เช่น 2"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            คลอดลูกครั้งสุดท้ายวันที่</label
          >
          <Calendar
            class="w-full"
            id="datelast"
            v-model="datelast"
            selectionMode="datelast"
            :showIcon="true"
            :manualInput="false"
            placeholder="เลือกวันคลอดลูกครั้งสุดท้ายวันที่"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ผสมครั้งสุดท้ายวันที่</label
          >
          <Calendar
            class="w-full"
            id="datelastmating"
            v-model="datelastmating"
            selectionMode="datelastmating"
            :showIcon="true"
            :manualInput="false"
            placeholder="เลือกวันคลอดลูกครั้งสุดท้ายวันที่"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            วันที่พบการแท้ง</label
          >
          <Calendar
            class="w-full"
            id="date"
            v-model="date"
            selectionMode="date"
            :showIcon="true"
            :manualInput="false"
            placeholder="เลือกวันที่พบการแท้ง"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ลักษณะการแท้ง</label
          >
          <Dropdown
            class="w-full"
            id="selectedabortion"
            placeholder="เลือกลักษณะการแท้ง"
          />
        </div>

        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ระยะการแท้ง</label
          >
          <InputText type="text" class="w-full" placeholder="กรอกระยะการแท้ง" />
          <label class="block text-100 text-sm font-bold text-red-400 mb-2">
            กรณีที่ระยะการแท้งมากกว่าหรือเท่ากับ 7
            เดือนระบบจะเริ่มรอบใหม่ให้อัตโนมัติ</label
          >
        </div>

        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"
            >รหัส-ชื่อเจ้าหน้าที่ผู้ผสมเทียม</label
          >
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
    <div class="col-12 text-right mt-5 flex justify-content-between">
      <router-link to="/activity/abortion/all">
        <Button
          label="ย้อนกลับ"
          icon="pi pi-angle-left"
          class="p-button-outlined p-button-secondary"
        />
      </router-link>

      <Button
        label="บันทึก"
        @click="nextPage()"
        icon="pi pi-save"
        iconPos="left"
      />
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["next-page", "prev-page"],
  setup(_, { emit }) {
    const nextPage = () => {
      emit("next-page", {
        pageIndex: 0,
      });
    };
    const date = ref();
    const datelast = ref();
    const datelastmating = ref();

    return {
      nextPage,
      date,
      datelast,
      datelastmating,
    };
  },
};
</script>

<style lang="scss" scoped></style>
