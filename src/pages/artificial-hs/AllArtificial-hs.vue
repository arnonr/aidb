<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ประวัติกิจกรรมด้านผสมเทียม" :pages="breadcrumb" />
      <div class="card">
        <div class="card row col bg-primary pb-6">
          <h1 class="text-center text-white">หมายเลขประจำตัวสัตว์</h1>
          <span class="p-input-icon-right w-full px-5">
            <i class="pi pi-search px-5" />
            <InputText
              class="w-full"
              type="text"
              v-model="search"
              placeholder="ค้นหา"
            />
          </span>
        </div>
        <div class="col-12 grid">
          <div class="col-3">
            <div class="card">
              <div class="text-xl mb-5">กิจกรรม</div>
              <div class="field-checkbox">
                <Checkbox :binary="true" v-model="check0" />
                <label>ผสมธรรมชาติ</label>
              </div>
              <div class="field-checkbox">
                <Checkbox :binary="true" v-model="check1" />
                <label>ผสมเทียม</label>
              </div>
              <div class="field-checkbox">
                <Checkbox :binary="true" v-model="check2" />
                <label>ย้ายฝากตัวอ่อน</label>
              </div>
              <div class="field-checkbox">
                <Checkbox :binary="true" v-model="check3" />
                <label>คลอด</label>
              </div>
              <div class="field-checkbox">
                <Checkbox :binary="true" v-model="check4" />
                <label>แท้ง</label>
              </div>
              <div class="field-checkbox">
                <Checkbox :binary="true" v-model="check5" />
                <label>หย่านม</label>
              </div>
            </div>
          </div>
          <div class="col-9">
            <div class="card">
              <div class="text-xl">ข้อมูลหมายเลข {{ search }}</div>
              <div class="grid pt-5">
                <div class="col-12 sm:col lg:col">
                  <div>ชื่อ : ปางแก้ว</div>
                </div>
                <div class="col-12 sm:col lg:col">
                  <div>อายุ : 5-11</div>
                </div>
                <div class="col-12 sm:col lg:col">
                  <div>หมายเลขข้างหู : 1241035</div>
                </div>
                <div class="col-12 sm:col lg:col">
                  <div>เลขอ้างอิง RFID : 155490</div>
                </div>
                <div class="col-12 sm:col lg:col">
                  <div>สถานะ : แม่โค</div>
                </div>
              </div>
            </div>
            <div class="card" v-if="check0">
              <div class="flex justify-content-between">
                <div class="text-xl pb-5">กิจกรรมผสมธรรมชาติ</div>
              </div>
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
                <Column
                  field="farm"
                  header="ครั้งที่"
                  class="text-center"
                ></Column>
                <Column
                  field="district"
                  header="วันที่ผสม"
                  class="text-center"
                ></Column>
                <Column
                  field="sub_district"
                  header="หมายเลขน้ำเชื้อ"
                  class="text-center"
                ></Column>
                <Column
                  field="group"
                  header="จำนวน Dose"
                  class="text-center"
                ></Column>
                <Column
                  field="pid"
                  header="รหัสเจ้าหน้าที่ที่ผสมเทียม"
                  class="text-center"
                ></Column>
                <Column
                  field="pid"
                  header="ชื่อเจ้าหน้าที่"
                  class="text-center"
                ></Column>
              </DataTable>
            </div>
            <div class="card" v-if="check1">
              <div class="flex justify-content-between">
                <div class="text-xl pb-5">กิจกรรมผสมเทียม</div>
              </div>
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
                <Column
                  field="farm"
                  header="ครั้งที่"
                  class="text-center"
                ></Column>
                <Column
                  field="district"
                  header="วันที่ผสม"
                  class="text-center"
                ></Column>
                <Column
                  field="sub_district"
                  header="หมายเลขน้ำเชื้อ"
                  class="text-center"
                ></Column>
                <Column
                  field="group"
                  header="จำนวน Dose"
                  class="text-center"
                ></Column>
                <Column
                  field="pid"
                  header="รหัสเจ้าหน้าที่ที่ผสมเทียม"
                  class="text-center"
                ></Column>
                <Column
                  field="pid"
                  header="ชื่อเจ้าหน้าที่"
                  class="text-center"
                ></Column>
              </DataTable>
            </div>
            <div class="card" v-if="check2">
              <div class="flex justify-content-between">
                <div class="text-xl pb-5">กิจกรรมย้ายฝากตัวอ่อน</div>
              </div>
              <DataTable
                class="text-sm"
                :value="data_m"
                :paginator="true"
                :rows="10"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rowsPerPageOptions="[10, 20, 50]"
                responsiveLayout="scroll"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              >
                <Column
                  field="m_no"
                  header="ลำดับ"
                  class="text-center"
                ></Column>
                <Column
                  field="m_date"
                  header="วันที่ย้ายฝาก"
                  class="text-center"
                ></Column>
                <Column
                  field="m_embryo"
                  header="หมายเลขตัวอ่อน"
                  class="text-center"
                ></Column>
                <Column
                  field="m_type"
                  header="วิธีการย้ายฝาก"
                  class="text-center"
                ></Column>
                <Column field="m_bcs" header="BCS" class="text-center"></Column>
                <Column
                  field="m_milk"
                  header="Milking"
                  class="text-center"
                ></Column>
                <Column
                  field="m_gcl"
                  header="เกรด CL"
                  class="text-center"
                ></Column>
                <Column
                  field="m_wcl"
                  header="ขนาด CL"
                  class="text-center"
                ></Column>
                <Column
                  field="m_wca"
                  header="ขนาด Cavity"
                  class="text-center"
                ></Column>
                <Column
                  field="m_pos"
                  header="ตำแหน่ง"
                  class="text-center"
                ></Column>
                <Column
                  field="m_induction"
                  header="การเหนี่ยวนำ"
                  class="text-center"
                ></Column>
                <Column
                  field="m_pid"
                  header="เจ้าหน้าที่"
                  class="text-center"
                ></Column>
                <!-- <Column field="m_" header="Milking" class="text-center"></Column> -->
              </DataTable>
            </div>
            <div class="card" v-if="check3">
              <div class="flex justify-content-between">
                <div class="text-xl pb-5">กิจกรรมคลอด</div>
              </div>
              <DataTable
                class="text-sm"
                :value="data_b"
                :paginator="true"
                :rows="10"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rowsPerPageOptions="[10, 20, 50]"
                responsiveLayout="scroll"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              >
                <Column
                  field="b_no"
                  header="ลำดับ"
                  class="text-center"
                ></Column>
                <Column
                  field="b_farm"
                  header="ครั้งที่ผสม"
                  class="text-center"
                ></Column>
                <Column
                  field="b_district"
                  header="วันที่ผสม"
                  class="text-center"
                ></Column>
                <Column
                  field="b_sub_district"
                  header="ประเภทการผสม"
                  class="text-center"
                ></Column>
                <Column
                  field="b_date"
                  header="วันที่คลอด"
                  class="text-center"
                ></Column>
                <Column
                  field="b_qty"
                  header="จำนวนลูก"
                  class="text-center"
                ></Column>
                <Column field="b_gd" header="เพศ" class="text-center"></Column>
                <Column
                  field="b_pid"
                  header="เจ้าหน้าที่"
                  class="text-center"
                ></Column>
              </DataTable>
            </div>
            <div class="card" v-if="check4">
              <div class="flex justify-content-between">
                <div class="text-xl pb-5">กิจกรรมแท้ง</div>
              </div>
              <DataTable
                class="text-sm"
                :value="data_a"
                :paginator="true"
                :rows="10"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rowsPerPageOptions="[10, 20, 50]"
                responsiveLayout="scroll"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              >
                <Column
                  field="a_no"
                  header="ลำดับ"
                  class="text-center"
                ></Column>
                <Column
                  field="a_farm"
                  header="ครั้งที่ผสม"
                  class="text-center"
                ></Column>
                <Column
                  field="a_district"
                  header="วันที่ผสม"
                  class="text-center"
                ></Column>
                <Column
                  field="a_sub_district"
                  header="ประเภทการผสม"
                  class="text-center"
                ></Column>
                <Column
                  field="a_date"
                  header="วันที่แท้ง"
                  class="text-center"
                ></Column>
                <Column
                  field="a_qty"
                  header="ลักษณะการแท้ง"
                  class="text-center"
                ></Column>
                <Column
                  field="a_gd"
                  header="ระยะแท้งการแท้ง(วัน)"
                  class="text-center"
                ></Column>
                <Column
                  field="a_pid"
                  header="เจ้าหน้าที่"
                  class="text-center"
                ></Column>
              </DataTable>
            </div>
            <div class="card" v-if="check5">
              <div class="flex justify-content-between">
                <div class="text-xl pb-5">กิจกรรมหย่านม</div>
              </div>
              <DataTable
                class="text-sm"
                :value="data_w"
                :paginator="true"
                :rows="10"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rowsPerPageOptions="[10, 20, 50]"
                responsiveLayout="scroll"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              >
                <Column
                  field="w_no"
                  header="ลำดับ"
                  class="text-center"
                ></Column>
                <Column
                  field="w_id"
                  header="ครั้งที่"
                  class="text-center"
                ></Column>
                <Column
                  field="w_date"
                  header="วันผสม"
                  class="text-center"
                ></Column>
                <Column
                  field="w_type"
                  header="ประเภทการผสม"
                  class="text-center"
                ></Column>
                <Column
                  field="w_officer"
                  header="วันที่หย่านม"
                  class="text-center"
                ></Column>
                <Column
                  field="w_species"
                  header="จำนวนวันให้นม"
                  class="text-center"
                ></Column>
                <Column
                  field="w_animal_name"
                  header="สาเหตุ"
                  class="text-center"
                ></Column>
                <Column
                  field="w_family"
                  header="ปริมาณน้ำนม ณ วันหย่านม"
                  class="text-center"
                ></Column>
                <Column
                  field="w_project"
                  header="รหัสเจ้าหน้าที่"
                  class="text-center"
                ></Column>
              </DataTable>
            </div>
          </div>
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
      { label: "กิจกรรม", to: "/" },
      { label: "ประวัติกิจกรรมด้านผสมเทียม", to: "" },
    ]);
    const data_w = reactive([
      {
        w_no: "1",
        w_id: "2",
        w_date: "07/01/2561",
        w_type: "AI",
        w_officer: "27/09/2561",
        w_species: "100",
        w_animal_name: "ปกติ",
        w_family: "",
        w_project: "",
      },
      {
        w_no: "2",
        w_id: "2",
        w_date: "07/01/2561",
        w_type: "AI",
        w_officer: "27/09/2561",
        w_species: "50",
        w_animal_name: "นมหมดก่อนกำหนด",
        w_family: "",
        w_project: "",
      },
      {
        w_no: "3",
        w_id: "2",
        w_date: "07/01/2561",
        w_type: "AI",
        w_officer: "",
        w_species: "",
        w_animal_name: "",
        w_family: "",
        w_project: "",
      },
    ]);
    const data_a = reactive([
      {
        a_no: "1",
        a_farm: "2",
        a_district: "29/05/2560",
        a_sub_district: "AI",
        a_date: "",
        a_qty: "",
        a_gd: "",
        a_pid: "",
      },
      {
        a_no: "2",
        a_farm: "2",
        a_district: "29/05/2560",
        a_sub_district: "AI",
        a_date: "",
        a_qty: "",
        a_gd: "",
        a_pid: "",
      },
      {
        a_no: "3",
        a_farm: "2",
        a_district: "29/05/2560",
        a_sub_district: "AI",
        a_date: "",
        a_qty: "",
        a_gd: "",
        a_pid: "",
      },
      {
        a_no: "4",
        a_farm: "2",
        a_district: "29/05/2560",
        a_sub_district: "AI",
        a_date: "",
        a_qty: "",
        a_gd: "",
        a_pid: "",
      },
      {
        a_no: "5",
        a_farm: "2",
        a_district: "29/05/2560",
        a_sub_district: "AI",
        a_date: "",
        a_qty: "",
        a_gd: "",
        a_pid: "",
      },
    ]);
    const data_b = reactive([
      {
        b_no: "1",
        b_farm: "2",
        b_district: "29/05/2560",
        b_sub_district: "AI",
        b_date: "27/09/2561",
        b_qty: "1",
        b_gd: "M",
        b_pid: "xxx",
      },
      {
        b_no: "2",
        b_farm: "2",
        b_district: "29/05/2560",
        b_sub_district: "AI",
        b_date: "27/09/2561",
        b_qty: "1",
        b_gd: "M",
        b_pid: "xxx",
      },
      {
        b_no: "3",
        b_farm: "2",
        b_district: "29/05/2560",
        b_sub_district: "AI",
        b_date: "",
        b_qty: "",
        b_gd: "",
        b_pid: "xxx",
      },
      {
        b_no: "4",
        b_farm: "2",
        b_district: "29/05/2560",
        b_sub_district: "AI",
        b_date: "",
        b_qty: "",
        b_gd: "",
        b_pid: "xxx",
      },
      {
        b_no: "5",
        b_farm: "2",
        b_district: "29/05/2560",
        b_sub_district: "AI",
        b_date: "27/09/2561",
        b_qty: "1",
        b_gd: "M",
        b_pid: "xxx",
      },
    ]);
    const data_m = reactive([
      // embryo
      {
        m_no: "1",
        m_date: "29/05/2560",
        m_embryo: "00000",
        m_type: "ย้ายฝากสด",
        m_bcs: "5",
        m_milk: "DR",
        m_gcl: "A",
        m_wcl: "2",
        m_wca: "0.4",
        m_pos: "R",
        m_induction: "I",
        m_pid: "xxx",
      },
      {
        m_no: "2",
        m_date: "29/05/2560",
        m_embryo: "00000",
        m_type: "ย้ายฝากสด",
        m_bcs: "5",
        m_milk: "DR",
        m_gcl: "B",
        m_wcl: "2",
        m_wca: "0.4",
        m_pos: "R",
        m_induction: "I",
        m_pid: "xxx",
      },
      {
        m_no: "3",
        m_date: "29/05/2560",
        m_embryo: "00000",
        m_type: "direct transfer",
        m_bcs: "5",
        m_milk: "DR",
        m_gcl: "B",
        m_wcl: "2",
        m_wca: "0.4",
        m_pos: "R",
        m_induction: "I",
        m_pid: "xxx",
      },
      {
        m_no: "4",
        m_date: "29/05/2560",
        m_embryo: "00000",
        m_type: "direct transfer",
        m_bcs: "5",
        m_milk: "DR",
        m_gcl: "C",
        m_wcl: "2",
        m_wca: "0.4",
        m_pos: "L",
        m_induction: "I",
        m_pid: "xxx",
      },
      {
        m_no: "4",
        m_date: "29/05/2560",
        m_embryo: "00000",
        m_type: "direct transfer",
        m_bcs: "5",
        m_milk: "DR",
        m_gcl: "C",
        m_wcl: "2",
        m_wca: "0.4",
        m_pos: "L",
        m_induction: "I",
        m_pid: "xxx",
      },
    ]);
    const data = reactive([
      {
        id: "1",
        farm: "2",
        province: "นนทบุรี",
        district: "28/4/2562",
        sub_district: "87TH338",
        group: 9,
        village_name: "บ้านนี้สีดำ",
        house_number: 99,
        pid: "-",
        phone: "0899999999",
        status: "เปิดใช้งาน",
      },
      {
        id: "2",
        farm: "3",
        province: "นนทบุรี",
        district: "15/01/2562",
        sub_district: "TH4201",
        group: 9,
        village_name: "บ้านนี้สีดำ",
        house_number: 99,
        pid: "-",
        phone: "0899999999",
        status: "ไม่มีการใช้งาน",
      },
    ]);
    const search_activity = ref("");
    const search = ref();
    const check0 = ref();
    const check1 = ref();
    const check2 = ref();
    const check3 = ref();
    const check4 = ref();
    const check5 = ref();
    return {
      check0,
      check1,
      check2,
      check3,
      check4,
      check5,
      data,
      data_m,
      data_b,
      data_a,
      data_w,
      search,
      breadcrumb,
      search_activity,
    };
  },
};
</script>
<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
