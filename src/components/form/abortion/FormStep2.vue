<template>
  <div class="mb-5">
    <h1 class="text-xl mb-2 font-light">ข้อมูลการแท้ง</h1>
    <p class="p-0 m-0 text-500">ป้อนรายละเอียดของคุณ</p>
  </div>
  <form class="grid">
    <div class="col-12 lg:col-12">
      <div class="formgrid grid">
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
      <Button
        label="ย้อนกลับ"
        @click="prevPage()"
        icon="pi pi-angle-left"
        class="p-button-outlined p-button-secondary"
      />
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
export default {
  emits: ["next-page", "prev-page"],
  setup(_, { emit }) {
    const nextPage = () => {
      emit("next-page", { pageIndex: 0 });
    };

    const prevPage = () => {
      emit("prev-page", { pageIndex: 1 });
    };

    return {
      nextPage,
      prevPage,
    };
  },
  data() {
    return {
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
};
</script>

<style lang="scss" scoped></style>
