<template>
  <div class="grid flex align-items-center mt-3 mb-5">
    <div class="col-12 md:col-6">
      <h1 class="text-2xl mb-0 text-600">วัคซีน</h1>
    </div>
  </div>
  <DataTable
    class="text-sm"
    :value="data1"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    responsiveLayout="scroll"
    currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
  >
    <Column
      v-for="col of columns1"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      class="text-center"
      :sortable="true"
    >
    </Column>
    <template #empty> ไม่พบข้อมูล </template>
    <template #loading>
      <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
    </template>
  </DataTable>
  <div class="grid flex align-items-center mt-3 mb-5">
    <div class="col-12 md:col-6">
      <h1 class="text-2xl mb-0 text-600">ตรวจโรค</h1>
    </div>
  </div>
  <DataTable
    class="text-sm"
    :value="data2"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    responsiveLayout="scroll"
    currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
  >
    <Column
      v-for="col of columns2"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      class="text-center"
      :sortable="true"
    >
    </Column>
    <template #empty> ไม่พบข้อมูล </template>
    <template #loading>
      <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
    </template>
  </DataTable>
  <div class="grid flex align-items-center mt-3 mb-5">
    <div class="col-12 md:col-6">
      <h1 class="text-2xl mb-0 text-600">การรักษา</h1>
    </div>
  </div>
  <DataTable
    class="text-sm"
    :value="data4"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    responsiveLayout="scroll"
    currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
  >
    <Column
      v-for="col of columns4"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      class="text-center"
      :sortable="true"
    >
    </Column>
    <template #empty> ไม่พบข้อมูล </template>
    <template #loading>
      <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
    </template>
  </DataTable>
  <div class="grid flex align-items-center mt-3 mb-5">
    <div class="col-12 md:col-6">
      <h1 class="text-2xl mb-0 text-600">ถ่ายพยาธิ</h1>
    </div>
  </div>
  <DataTable
    class="text-sm"
    :value="data3"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    responsiveLayout="scroll"
    currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
  >
    <Column
      v-for="col of columns3"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      class="text-center"
      :sortable="true"
    >
    </Column>
    <template #empty> ไม่พบข้อมูล </template>
    <template #loading>
      <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
    </template>
  </DataTable>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      // API
      url: "/wean-milk",
      animal_url: "animal/get-by-farm-id",

      // ID
      id: "WeanMilkID",
      // Name
      name: "Vaccine",

      //load_selection
      LoadSelection: {
        Staff: "/staff/selection?includeAll=false&isActive=1",
        BCSID: "/bcs",
      },

      // Selection

      selection: {
        Staff: null,
        BCSID: null,
      },
      show: {},
      // Table Field
      columns1: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
        {
          field: "ThaiVaccineActivityDate",
          header: "วันที่ฉีดวัคซีน",
        },
        {
          field: "Vaccine.VaccineName",
          header: "ชนิดวัคซีน",
        },
        {
          field: "Lot",
          header: "Lot",
        },
        {
          field: "VaccineObjectiveName",
          header: "วัตถุประสงค์การฉีด",
        },
        {
          field: "ThaiVaccineNextDate",
          header: "วันที่ฉีดครั้งต่อไป",
        },
      ],
      columns2: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
        {
          field: "DiseaseActivity.ThaiDiseaseActivityDate",
          header: "วันที่ตรวจ",
        },
        {
          field: "DiseaseActivity.DiseaseName",
          header: "โรคที่ตรวจ",
        },
        {
          field: "DiseaseActivity.ThaiDiseaseNextDate",
          header: "วันที่ตรวจครั้งต่อไป",
        },
        {
          field: "DiseaseResultName",
          header: "ผลการตรวจ",
        },
        {
          field: "DiseaseActivity.ResponsibilityStaffName",
          header: "เจ้าหน้าที่",
        },
        {
          field: "DiseaseActivity.OrganizationName",
          header: "หน่วยงาน",
        },
      ],
      columns3: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
        {
          field: "ThaiDewormActivityDate",
          header: "วันที่ถ่ายพยาธิ",
        },
        {
          field: "DewormMedicine.DewormMedicineName",
          header: "ยาถ่ายพยาธิที่ใช้",
        },
        {
          field: "ThaiDewormNextDate",
          header: "วันที่ถ่ายพยาธิครั้งต่อไป",
        },
        {
          field: "ResponsibilityStaffName",
          header: "เจ้าหน้าที่",
        },
        {
          field: "Organization.OrganizationName",
          header: "หน่วยงาน",
        },
      ],
      columns4: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
        {
          field: "ThaiCureActivityDate",
          header: "วันที่รักษา",
        },
        {
          field: "DiseaseName",
          header: "โรคที่รักษา",
        },
        {
          field: "Remark",
          header: "ผลการรักษา",
        },
        {
          field: "ThaiCureNextDate",
          header: "วันที่ตรวจครั้งถัดไป",
        },
        {
          field: "ResponsibilityStaffName",
          header: "เจ้าหน้าที่",
        },
        {
          field: "Organization.OrganizationName",
          header: "หน่วยงาน",
        },
      ],

      // Static Data
      isLoading: false,
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      // uneditable
      controller: new AbortController(),
    };
  },
  mounted() {
    this.load();
  },
  computed: {
    ...mapGetters({
      AnimalID: "AnimalID",
      animal_id: "animal_id",
      AnimalSecretStatus: "AnimalSecretStatus",
    }),
  },
  methods: {
    getItems(id) {
      const items = [
        {
          label: "ลบ",
          icon: "pi pi-trash",
          command: () => {
            this.open_delete(id);
          },
        },
      ];
      return items;
    },
    // main load
    load() {
      this.isLoading = true;
      axios
        .get(`vaccine-activity?AnimalID=${this.AnimalID}`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.data1 = response.data.rows;
          if (this.data1.length > 0) {
            for (let i = 0; i < this.data1.length; i++) {
              this.data1[i].show_id = i + 1;
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(`disease-activity-animal?AnimalID=${this.AnimalID}`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.data2 = response.data.rows;
          if (this.data2.length > 0) {
            for (let i = 0; i < this.data2.length; i++) {
              this.data2[i].show_id = i + 1;
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(`deworm-activity?AnimalID=${this.AnimalID}`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.data3 = response.data.rows;
          if (this.data3.length > 0) {
            for (let i = 0; i < this.data3.length; i++) {
              this.data3[i].show_id = i + 1;
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(`cure-activity?AnimalID=${this.AnimalID}`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.data4 = response.data.rows;
          if (this.data4.length > 0) {
            for (let i = 0; i < this.data4.length; i++) {
              this.data4[i].show_id = i + 1;
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>
