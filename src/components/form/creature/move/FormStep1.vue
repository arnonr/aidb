<template>
  <div class="mb-5">
    <h1 class="text-xl mb-2 font-light">เลือกหน่วยและฟาร์ม</h1>
    <p class="p-0 m-0 text-500">ย้ายทะเบียนสัตว์โคเนื้อ (ผท.1)</p>
  </div>
  <form class="grid">
    <div class="col-12 lg:col-12">
      <div class="formgrid grid">
        <!-- <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            หมายเลขทะเบียนฟาร์ม</label
          >
          <InputText type="text" class="w-full" />
        </div> -->
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            เลือกหน่วยต้นทาง</label
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
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            เลือกฟาร์มต้นทาง</label
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
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            เลือกหน่วยปลายทาง</label
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
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            เลือกฟาร์มปลายทาง</label
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
    <div class="col-12 text-right mt-5 text-right">
      <!-- <Button label="ย้อนกลับ" @click="prevPage()" icon="pi pi-angle-left"
                class="p-button-outlined p-button-secondary" /> -->
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
import { reactive, ref } from "vue";
export default {
  emits: ["next-page", "prev-page"],
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
  setup(_, { emit }) {
    const nextPage = () => {
      emit("next-page", {
        pageIndex: 1,
      });
    };
    const prevPage = () => {
      emit("prev-page", { pageIndex: 0 });
    };
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
    const birthdate = ref();
    const date = ref();
    return {
      prevPage,
      nextPage,
      birthdate,
      date,
      data,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>