<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="โครงการ Thai Black" :pages="breadcrumb" />
      <div class="card mb-5">
        <div class="card bg-gray-100">
          <h1 class="text-3xl mb-4 text-800">รายละเอียดโครงการ Thai Black</h1>
          <div class="grid p-6">
            <div class="col-12 sm:col-6 lg:col-3">
              <span class="w-full"> วันที่โครงการเริ่ม : 1/01/65 </span>
            </div>
            <div class="col-12 sm:col-6 lg:col-3">
              <span class="w-full"> วันที่สิ้นสุดโครงการ : 1/01/66 </span>
            </div>
            <div class="col-12 sm:col-6 lg:col-3">
              <span class="w-full"> ระยะเวลา : 365 วัน </span>
            </div>
            <div class="col-12 sm:col-6 lg:col-3">
              <span class="w-full"> ระดับของโครงการ : AI </span>
            </div>
          </div>
        </div>
      </div>

      <div class="card p-0">
        <DataTable
          class="text-sm"
          :value="data"
          :paginator="true"
          :rows="10"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          v-model:selection="selected"

        >
          <Column selectionMode="multiple" class="text-center"></Column>
          <Column field="id" header="ลำดับ" class="text-center"></Column>
          <Column
            field="farm_id"
            header="ทะเบียนฟาร์ม"
            class="text-center"
          ></Column>
          <Column
            field="famr_name"
            header="ชื่อฟาร์ม"
            class="text-center"
          ></Column>
          <Column field="city" header="จังหวัด" class="text-center"></Column>
          <Column field="district" header="อำเภอ" class="text-center"></Column>
          <Column
            field="sub_district"
            header="ตำบล"
            class="text-center"
          ></Column>
          <Column
            field="date"
            header="วันที่ขึ้นทะเบียนฟาร์ม"
            class="text-center"
          ></Column>
          <Column field="status" header="สถานะ" class="text-center">
            <template #body="slotProps">
              <div v-if="slotProps.data.status === 'ดำเนินการ'">
                <Badge :value="slotProps.data.status" severity="success">
                </Badge>
              </div>
              <div v-else>
                <Badge :value="slotProps.data.status"> </Badge>
              </div>
            </template>
          </Column>
         
        </DataTable>

        <div class="col-12 text-center flex justify-content-center">
          <Button label="ยกเลิก" class="p-button-secondary mx-3" />
          <Button label="ยืนยัน" class="p-button-primary mx-3" />
        </div>
      </div>
    </div>
    <!-- Delete Dialog -->
    <Dialog
      header="ตรวจสอบข้อมูล"
      v-model:visible="displayDeleteModal"
      :style="{ width: '350px' }"
      :modal="true"
    >
      <div class="confirmation-content text-center">
        <i class="pi pi-trash" style="font-size: 5rem" />
        <br />
        <span class="text-xl"
          >คุณต้องการลบโครงการ <br />ไทยแบล็ค ( Thai Black )
          <br />ใช่หรือไม่</span
        >
      </div>
      <template #footer>
        <div class="col-12 text-center flex justify-content-between">
          <Button label="ยกเลิก" class="p-button-secondary w-full mr-3" />
          <Button label="ยืนยัน" class="p-button-danger w-full ml-3" />
        </div>
      </template>
    </Dialog>
    <!-- End Delete Dialog -->
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      creature: [
        {
          id: 1,
        },
      ],
    };
  },
  setup() {
    const router = useRouter();
    const breadcrumb = ref([
      { label: "ระบบโครงการ", to: "/project/all" },
      { label: "โครงการ Thai Black", to: "/project/view" },
    ]);

    const data = reactive([
      {
        id: "1",
        farm_id: "7105000390",
        famr_name: "สมหมาย จินดาเพ็ง (วีระ)",
        city: "กาญจนบุรี",
        district: "ท่ามะกา",
        sub_district: "ยางม่วง",
        date: "01/01/64",
        status: "ดำเนินการ",
      },
      {
        id: "2",
        farm_id: "7105000390",
        famr_name: "สมหมาย จินดาเพ็ง (วีระ)",
        city: "กาญจนบุรี",
        district: "ท่ามะกา",
        sub_district: "ยางม่วง",
        date: "01/01/64",
        status: "ดำเนินการ",
      },
      {
        id: "3",
        farm_id: "7105000390",
        famr_name: "สมหมาย จินดาเพ็ง (วีระ)",
        city: "กาญจนบุรี",
        district: "ท่ามะกา",
        sub_district: "ยางม่วง",
        date: "01/01/64",
        status: "ดำเนินการ",
      },
      {
        id: "4",
        farm_id: "7105000390",
        famr_name: "สมหมาย จินดาเพ็ง (วีระ)",
        city: "กาญจนบุรี",
        district: "ท่ามะกา",
        sub_district: "ยางม่วง",
        date: "01/01/64",
        status: "ดำเนินการ",
      },
      {
        id: "5",
        farm_id: "7105000390",
        famr_name: "สมหมาย จินดาเพ็ง (วีระ)",
        city: "กาญจนบุรี",
        district: "ท่ามะกา",
        sub_district: "ยางม่วง",
        date: "01/01/64",
        status: "ดำเนินการ",
      },
    ]);
    const dateRange = ref();
    const start_date = ref();
    const end_date = ref();
    const items = ref([
      {
        label: "ดูรายละเอียด",
        icon: "pi pi-eye",
        command: () => {
          return router.push("/farm/info");
        },
      },
      {
        label: "ลบ",
        icon: "pi pi-trash",
        command: () => {
          return openDeleteModal();
        },
      },
    ]);
    const status = ref();
    const selected = ref();
    const displayDeleteModal = ref(false);
    const openDeleteModal = () => {
      displayDeleteModal.value = true;
    };
    const closeDeleteModal = () => {
      displayDeleteModal.value = false;
    };
    return {
      dateRange,
      start_date,
      end_date,
      data,
      items,
      breadcrumb,

      displayDeleteModal,
      openDeleteModal,
      closeDeleteModal,
      status,
      selected,
    };
  },
  methods: {
    addcreature() {
      this.creature.push({
        id: this.creature.length + 1,
        breed_detail: "",
        breed: "",
      });
    },
    deletecreature() {
      this.creature.splice(this.creature.length - 1, 1);
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
