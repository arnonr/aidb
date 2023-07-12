<template>
  <div class="mb-5">
    <h1 class="text-xl mb-2 font-light">ข้อมูลรายละเอียดผสมเทียม</h1>
    <p class="p-0 m-0 text-500">ป้อนรายละเอียดผสมเทียม</p>
  </div>
  <form class="grid">
    <div class="col-12 lg:col-12">
      <div class="formgrid grid">
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            รอบการให้นม</label
          >
          <InputText
            type="text"
            class="w-full"
            placeholder="กรอกไอดีอ้างอิงฟาร์ม"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ครั้งที่ผสม</label
          >
          <InputText
            type="text"
            class="w-full"
            placeholder="กรอกทะเบียนฟาร์ม"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            วันที่ผสม</label
          >
          <InputText type="text" class="w-full" placeholder="กรอกชื่อฟาร์ม" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            โครงการ</label
          >
          <InputText type="text" class="w-full" placeholder="กรอกที่ตั้ง" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            หมายเลขน้ำเชื้อที่ใช้</label
          >
          <InputText type="text" class="w-full" placeholder="กรอกที่ตั้ง" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            จำนวนโด๊ส</label
          >
          <InputText type="text" class="w-full" placeholder="กรอกที่ตั้ง" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            รหัสเจ้าหน้าที่ผู้ผสมเทียม</label
          >
          <InputText type="text" class="w-full" placeholder="กรอกที่ตั้ง" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ชื่อเจ้าหน้าที่ผู้ผสมเทียม</label
          >
          <InputText type="text" class="w-full" placeholder="กรอกที่ตั้ง" />
        </div>
        <!-- <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> ถนน</label>
          <InputText type="text" class="w-full" placeholder="กรอกถนน" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> ตำบล</label>
          <InputText type="text" class="w-full" placeholder="เลือกตำบล" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> อำเภอ</label>
          <InputText type="text" class="w-full" placeholder="เลือกอำเภอ" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> จังหวัด</label>
          <InputText type="text" class="w-full" placeholder="เลือกจังหวัด" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            รหัสไปรษณีย์</label
          >
          <InputText type="text" class="w-full" placeholder="กรอกไปรษณีย์" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> ละติจูด</label>
          <InputText type="text" class="w-full" placeholder="กรอกละติจูด" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> ลองจิจูด</label>
          <InputText type="text" class="w-full" placeholder="กรอกลองจิจูด" />
        </div> -->
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
export default {
  emits: ["next-page", "prev-page"],
  setup(_, { emit }) {
    const nextPage = () => {
      emit("next-page", { pageIndex: 1 });
    };

    const prevPage = () => {
      emit("prev-page", { pageIndex: 2 });
    };

    return {
      nextPage,
      prevPage,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>