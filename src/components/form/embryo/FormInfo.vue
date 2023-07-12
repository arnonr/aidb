<template>
  <div class="mb-5">
    <h1 class="text-xl mb-2 font-light">ข้อมูลโคเนื้อ</h1>
    <p class="p-0 m-0 text-500">ป้อนรายละเอียดโคเนื้อของคุณ</p>
  </div>
  <form class="grid">
    <div class="col-12 lg:col-12">
      <div class="formgrid grid">
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            หมายเลขประจำตัวโค</label
          >
          <InputText type="text" class="w-full" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> ชื่อโค</label>
          <InputText type="text" class="w-full" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> สถานะโค</label>
          <InputText type="text" class="w-full" />
        </div>
        <div class="field col-12 sm:col-6">
          <label for="dateRange" class="block text-600 text-sm font-bold mb-2">
            วัน-เดือน-ปีเกิด (อายุ)</label
          >
          <Calendar
            class="w-full"
            id="dateRange"
            v-model="birthdate"
            :manualInput="false"
            placeholder=""
            :showIcon="true"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> พันธุ์</label>
          <InputText type="text" class="w-full" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            สถานภาพการผลิต</label
          >
          <InputText type="text" class="w-full" />
        </div>
        <div class="field col-12 sm:col-6">
          <label for="dateRange" class="block text-600 text-sm font-bold mb-2">
            ลูกตัวสุดท้ายตัวที่</label
          >
          <InputText type="text" class="w-full" />
        </div>
        <div class="field col-12 sm:col-6">
          <label for="dateRange" class="block text-600 text-sm font-bold mb-2">
            คลอดลูกครั้งสุดท้ายวันที่
          </label>
          <Calendar
            class="w-full"
            id="dateRange"
            v-model="date"
            :manualInput="false"
            placeholder=""
            :showIcon="true"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label for="dateRange" class="block text-600 text-sm font-bold mb-2">
            ผสมครั้งสุดท้ายวันที่</label
          >
          <Calendar
            class="w-full"
            id="dateRange"
            v-model="date"
            :manualInput="false"
            placeholder=""
            :showIcon="true"
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
        pageIndex: 1,
      });
    };
    const birthdate = ref();
    const date = ref();
    return {
      nextPage,
      birthdate,
      date,
    };
  },
};
</script>

<style lang="scss" scoped></style>
