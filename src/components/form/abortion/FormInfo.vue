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
      </div>
    </div>
    <div class="col-12 text-right mt-5">
      <Button
        label="ต่อไป"
        @click="nextPage()"
        icon="pi pi-angle-right"
        iconPos="right"
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
