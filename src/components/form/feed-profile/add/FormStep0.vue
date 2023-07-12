<template>
  <div class="mb-5">
    <h1 class="text-xl mb-2 font-light">ข้อมูลการขุน/อาหาร</h1>
    <p class="p-0 m-0 text-500">ป้อนรายละเอียดข้อมูลการขุน/อาหาร</p>
  </div>
  <form class="grid">
    <div class="col-12 lg:col-12">
      <div class="formgrid grid">
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            หมายเลขประจำตัวโค</label
          >
          <InputText
            type="text"
            class="w-full"
            placeholder="กรอกหมายหมายเลขประจำตัวโค"
          />
        </div>

        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            วันที่เข้าขุน/อาหาร
          </label>
          <Calendar
            class="w-full"
            id="dateBreed"
            v-model="dateBreed"
            :manualInput="false"
            placeholder="วันที่เข้าขุน/อาหาร"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            วันที่สิ้นสุดขุน/อาหาร</label
          >

          <Calendar
            class="w-full"
            id="date"
            v-model="date"
            :manualInput="false"
            placeholder="วันที่สิ้นสุดขุน/อาหาร"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            น้ำหนักหลังเข้าขุน/อาหาร
          </label>
          <InputText
            type="text"
            class="w-full"
            placeholder="น้ำหนักหลังเข้าขุน/อาหาร"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            น้ำหนักเป้าหมาย (kg)
          </label>
          <InputText
            type="text"
            class="w-full"
            placeholder="น้ำหนักเป้าหมาย (kg)"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            รูปแบบการขุน
          </label>
          <Dropdown class="w-full" placeholder="เลือกรูปแบบการขุน" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            รูปแบบอาหาร
          </label>
          <Dropdown class="w-full" placeholder="เลือกรูปแบบอาหาร" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            รหัสผู้รับผิดชอบ
          </label>
          <InputText
            type="text"
            class="w-full"
            placeholder="กรอกรหัสผู้รับผิดชอบ"
          />
        </div>
      </div>
    </div>
    <div class="col-12 text-right mt-5">
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
      emit("next-page", { pageIndex: 0 });
    };

    const date = ref();
    const dateBreed = ref();

    return {
      nextPage,
      date,
      dateBreed,
    };
  },
  //   setup() {
  //     const dateRange = ref();
  //     return {
  //       dateRange,
  //     };
  //   },
};
</script>

<style lang="scss" scoped>
</style>