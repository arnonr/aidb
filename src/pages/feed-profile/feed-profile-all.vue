<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ค้นหาและจัดการข้อมูลการขุนอาหาร" :pages="breadcrumb" />

      <div class="card">
        <h1 class="text-xl mb-5">
          เครื่องมือช่วยค้นหาข้อมูลการขุนอาหาร
          <div class="col-12 sm:col-6 lg:col-4">
            <router-link to="/activity/feed-profile/add">
              <Button
                label="เพิ่มข้อมูล"
                icon="pi pi-plus"
                class="p-button-sm p-button p-button-Primary"
              >
              </Button>
            </router-link>
          </div>
        </h1>

        <div class="grid">
          <!-- <div class="col-12 sm:col-6 lg:col-4"> -->
          <!-- <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              เลือกหน่วย</label
            >
            <Dropdown
              class="w-full"
              id="selectedUnit"
              placeholder="เลือกหน่วย"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              เลือกฟาร์ม</label
            >
            <Dropdown
              class="w-full"
              id="selectedFarm"
              placeholder="เลือกฟาร์ม"
            />
          </div> -->
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="animal_id"
              class="block text-600 text-sm font-bold mb-2"
            >
              ระบุหมายเลขทะเบียนสัตว์</label
            >
            <InputText type="text" class="w-full" id="pid" />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="start_weight"
              class="block text-600 text-sm font-bold mb-2"
            >
              น้ำหนักเข้าขุน/อาหาร</label
            >
            <InputText type="text" class="w-full" id="start_weight" />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              รูปแบบการขุน</label
            >
            <Dropdown
              class="w-full"
              id="selectedFarm"
              placeholder="รูปแบบการขุน"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              รูปแบบอาหาร
            </label>
            <Dropdown
              class="w-full"
              id="selectedFarm"
              placeholder="รูปแบบอาหาร"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              แสดงตั้งแต่วันที่ - จนถึงวันที่</label
            >
            <Calendar
              class="w-full"
              id="dateRange"
              v-model="dateRange"
              selectionMode="range"
              :manualInput="false"
              placeholder="ตั้งแต่วันที่ - จนถึงวันที่"
            />
          </div>
        </div>
        <div class="mt-5">
          <DataTable
            class="text-sm"
            :value="data"
            :paginator="true"
            :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
            <!-- <Column field="id" header="หน่วย" class="text-center"></Column> -->
            <!-- <Column field="farm" header="ฟาร์ม" class="text-center"></Column> -->
            <Column
              field="animal_id"
              header="หมายเลขสัตว์"
              class="text-center"
            ></Column>
            <Column
              field="animal_name"
              header="ชื่อสัตว์"
              class="text-center"
            ></Column>
            <Column field="rfid" header="RFID" class="text-center"> </Column>
            <!-- <Column
              field="species"
              header="พันธ์ุ"
              class="text-center"
            ></Column> -->
            <Column
              field="start_weight"
              header="น้ำหนักเข้าขุน/อาหาร"
              class="text-center"
            ></Column>
            <!-- <Column field="family" header="Family" class="text-center"></Column> -->
            <Column
              field="end_weight"
              header="น้ำหนักหลังเข้าขุน/อาหาร"
              class="text-center"
            ></Column>
            <Column
              field="start_date"
              header="วันที่เข้าขุน/อาหาร"
              class="text-center"
            ></Column>
            <Column
              field="end_date"
              header="วันที่สิ้นสุดขุน/อาหาร"
              class="text-center"
            ></Column>
            <Column
              field="goal"
              header="น้ำหนักเป้าหมาย (kg)"
              class="text-center"
            ></Column>
            <Column
              field="feed_description"
              header="รูปแบบการขุน"
              class="text-center"
            ></Column>
            <Column
              field="food_type"
              header="รูปแบบอาหาร"
              class="text-center"
            ></Column>

            <!-- <Column field="status" header="สถานะ" class="text-center">
              <template #body="slotProps">
                <div v-if="slotProps.data.status === 'ลงทะเบียนแล้ว'">
                  <Badge :value="slotProps.data.status" severity="success">
                  </Badge>
                </div>
                <div v-else>
                  <Badge :value="slotProps.data.status"> </Badge>
                </div>
              </template>
            </Column> -->
            <Column header="จัดการ" class="text-center">
              <template #body>
                <SplitButton
                  label="แก้ไข"
                  icon="pi pi-pencil"
                  class="p-button-sm p-button-outlined p-button-warning"
                  :model="items"
                >
                </SplitButton>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {
    PageTitle,
  },
  setup() {
    const breadcrumb = ref([
      // { label: "ข้อมูลการขุนอาหาร", to: "/" },
      {
        label: "ค้นหาและจัดการข้อมูลการขุนอาหาร",
        to: "/activity/feed-profile/all",
      },
    ]);
    const data = reactive([
      {
        id: "000001",
        // farm: "626 , น่าน สุทธหลวง",
        animal_id: "1",
        animal_name: "ปากเกร็ด",
        rfid: "1",
        // species: 9,
        // officer: "บ้านนี้สีดำ",
        start_weight: 99,
        end_weight: 99,
        start_date: "10/20/2000",
        end_date: "10/20/2000",
        // "pid": "-",
        project: "0899999999",
        status: "ลงทะเบียนแล้ว",
      },
      {
        id: "000002",
        // farm: "626 , น่าน สุทธหลวง",
        animal_id: "1",
        animal_name: "ปากเกร็ด",
        rfid: "1",
        // species: 9,
        // officer: "บ้านนี้สีดำ",
        start_weight: 99,
        end_weight: 99,
        start_date: "10/20/2000",
        end_date: "10/20/2000",
        // "pid": "-",
        project: "0899999999",
        status: "ยังไม่ลงทะเบียน",
      },
    ]);
    const dateRange = ref();
    const items = ref([
      {
        label: "ลบ",
        icon: "pi pi-trash",
        command: () => {},
      },
      {
        label: "ย้าย",
        icon: "pi pi-send",
        command: () => {},
      },
      {
        label: "ผท.2",
        icon: "pi pi-list",
        command: () => {},
      },
      {
        label: "ผท.9",
        icon: "pi pi-sync",
        command: () => {},
      },
    ]);

    return {
      dateRange,
      data,
      items,
      breadcrumb,
    };
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
