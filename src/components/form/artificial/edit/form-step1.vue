<template>
  <div class="mb-5">
    <h1 class="text-xl mb-2 font-light">ข้อมูลโคเนื้อ</h1>
    <p class="p-0 m-0 text-500">ป้อนรายละเอียดเข้อมูลโคเนื้อ</p>
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
          <label class="block text-600 text-sm font-bold mb-2"> ชื่อโค</label>
          <InputText type="text" class="w-full" placeholder="กรอกชื่อโค" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> สถานะโค</label>
          <!-- <InputText type="text" class="w-full" placeholder="กรอกเลขอ้างอิงโครงการ" /> -->
          <Dropdown class="w-full" placeholder="เลือกสถานะโค" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            วันเดือนปีเกิด</label
          >
          <InputText type="text" class="w-full" placeholder="เลือกคำนำหน้า" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> พันธ์</label>
          <InputText type="text" class="w-full" placeholder="กรอกชื่่อของคุณ" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            สถานภาพการผลิต</label
          >
          <Dropdown class="w-full" placeholder="เลือกสถานภาพการผลิต" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ลูกตัวสุดท้ายตัวที่</label
          >
          <InputText type="text" class="w-full" placeholder="กรอกที่อยู่" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            คลอดลูกครั้งสุดท้ายวันที่</label
          >
          <Calendar
            class="w-full"
            id="dateBreed"
            v-model="dateBreed"
            :manualInput="false"
            placeholder="คลอดลูกครั้งสุดท้ายวันที่"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ผสมครั้งสุดท้ายวันที่</label
          >

          <Calendar
            class="w-full"
            id="date"
            v-model="date"
            :manualInput="false"
            placeholder="ผสมครั้งสุดท้ายวันที่"
          />
        </div>
        <!-- <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> ตำบล</label>
          <InputText type="text" class="w-full" placeholder="กรอกตำบล" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> อำเภอ</label>
          <InputText type="text" class="w-full" placeholder="กรอกอำเภอ" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> จังหวัด</label>
          <InputText type="text" class="w-full" placeholder="กรอกจังหวัด" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            รหัสไปรษณีย์</label
          >
          <InputText
            type="text"
            class="w-full"
            placeholder="กรอกรหัสไปรษณีย์"
          />
        </div> -->
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

<style lang="scss" scoped></style>
