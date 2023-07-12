<template>
  <div class="mb-5">
    <h1 class="text-xl mb-2 font-light">ข้อมูลฟาร์ม</h1>
    <p class="p-0 m-0 text-500">ป้อนรายละเอียดฟาร์ม</p>
  </div>
  <form class="grid">
    <div class="col-12 lg:col-12">
      <div class="formgrid grid">
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            หมายเลขทะเบียนฟาร์ม</label
          >
          <InputText type="text" class="w-full" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ชื่อฟาร์ม</label
          >
          <InputText type="text" class="w-full" />
        </div>
        <div class="field col-12 sm:col-6">
          <label for="dateRange" class="block text-600 text-sm font-bold mb-2">
            วันที่ขึ้นทะเบียนฟาร์ม</label
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
          <label class="block text-600 text-sm font-bold mb-2">
            ชื่อเจ้าของฟาร์ม</label
          >
          <InputText type="text" class="w-full" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            สถานะฟาร์ม</label
          >
          <InputText type="text" class="w-full" />
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
        pageIndex: 2,
      });
    };
    const prevPage = () => {
      emit("prev-page", { pageIndex: 0 });
    };
    const birthdate = ref();
    const date = ref();
    return {
      prevPage,
      nextPage,
      birthdate,
      date,
    };
  },
};
</script>

<style lang="scss" scoped></style>
