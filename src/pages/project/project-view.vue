<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ตรวจสอบโครงการ" :pages="breadcrumb" />
      <div class="card bg-primary pb-6 mb-5">
        <h1 class="text-center text-white">ค้นหาโครงการ</h1>
        <div class="px-5">
          <Dropdown class="w-full" :placeholder="isLoadingProject ? 'กำลังโหลดข้อมูล...' : 'ค้นหาโครงการ'"
            :showClear="true" emptyMessage="ไม่มีข้อมูล" emptyFilterMessage="ไม่พบข้อมูล" :options="getProjects"
            optionLabel="ProjectName" optionValue="ProjectID" v-model="search" :filter="true"
            :loading="isLoadingProject" :disabled="isLoadingProject" />
        </div>
      </div>
      <div class="card" v-if="search">
        <div v-if="isLoading">
          <div class="text-center py-5">
            <ProgressSpinner style="width:120px;height:120px" strokeWidth="4" fill="var(--surface-ground)" />
          </div>
        </div>
        <div v-else>
          <div v-if="this.projectById.ProjectLevel === 'ANIMAL'">
            <h1 class="text-2xl mb-5 text-600">
              มีรายการสัตว์ในโครงการทั้งหมด {{ data.length }} รายการ
            </h1>
            <DataTable class="text-sm" :value="data" :paginator="true" :rows="10" :rowHover="true"
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
              <Column v-for="col of columnsAnimals" :field="col.field" :header="col.header" :key="col.field"
                :sortable="true" class="text-center">
              </Column>
              <Column field="AnimalBreedAll" header="สายพันธุ์" class="text-center">
                <template #body="slotProps">
                  <div v-if="!slotProps.data.AnimalBreedAll || slotProps.data.AnimalBreedAll == ''">
                    -
                  </div>
                  <div v-else>
                    {{ slotProps.data.AnimalBreedAll }}
                  </div>
                </template>
              </Column>
              <Column field="AnimalAlive" header="Status" class="text-center">
                <template #body="slotProps">
                  <div v-if="
                    slotProps.data.AnimalAlive == 1 ||
                    slotProps.data.AnimalAlive == status[0]
                  ">
                    <Tag class="w-full" severity="success">Active</Tag>
                  </div>
                  <div v-else>
                    <Tag class="w-full bg-gray-500">In Active</Tag>
                  </div>
                </template>
              </Column>
              <template #empty> ไม่พบข้อมูล </template>
            </DataTable>
          </div>
          <div v-else-if="this.projectById.ProjectLevel === 'FARM'">
            <h1 class="text-2xl mb-5 text-600">
              มีรายการฟาร์มในโครงการทั้งหมด {{ data.length }} รายการ
            </h1>
            <DataTable class="text-sm" :value="data" :paginator="true" :rows="10" :rowHover="true"
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
              <Column v-for="col of columnsFarm" :field="col.field" :header="col.header" :key="col.field"
                :sortable="true" class="text-center">
              </Column>
              <Column field="FarmStatusCode" header="สถานะฟาร์ม" class="text-center">
                <template #body="slotProps">
                  <div v-if="slotProps.data.FarmStatusID == [1]">
                    <Tag class="w-full" severity="success">ดำเนินกิจการ</Tag>
                  </div>

                  <div v-else-if="slotProps.data.FarmStatusID == [2]">
                    <Tag class="w-full bg-gray-500">พักกิจการ</Tag>
                  </div>

                  <div v-else>
                    <Tag class="w-full bg-gray-500">ยกเลิกกิจการ</Tag>
                  </div>
                </template>
              </Column>
              <template #empty> ไม่พบข้อมูล </template>
            </DataTable>
          </div>
          <!-- <div v-else-if="this.projectById.ProjectLevel === 'AI'">
            <h1 class="text-2xl mb-5 text-600">
              มีรายการผสมเทียมในโครงการทั้งหมด {{ data.length }} รายการ
            </h1>
            <DataTable class="text-sm" :value="data" :paginator="true" :rows="10"
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
              <Column v-for="col of columnsArtificials" :field="col.field" :header="col.header" :key="col.field"
                :sortable="true" class="text-center">
              </Column>
              <Column field="AnimalBreedAll" header="สายพันธุ์" class="text-center">
                <template #body="slotProps">
                  <div v-if="!slotProps.data.AnimalBreedAll || slotProps.data.AnimalBreedAll == ''">
                    -
                  </div>
                  <div v-else>
                    {{ slotProps.data.AnimalBreedAll }}
                  </div>
                </template>
              </Column>
              <Column field="AnimalAlive" header="สถานะการมีชีวิต" class="text-center">
                <template #body="slotProps">
                  <div v-if="
                    slotProps.data.AnimalAlive == 1 ||
                    slotProps.data.AnimalAlive == status[0]
                  ">
                    <Tag class="w-full" severity="success">มีชีวิต</Tag>
                  </div>
                  <div v-else>
                    <Tag class="w-full bg-gray-500">เสียชีวิต</Tag>
                  </div>
                </template>
              </Column>
              <template #empty> ไม่พบข้อมูล </template>
            </DataTable>
          </div> -->
          <div v-else>
            <div class="text-center">
              ไม่พบข้อมูล
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Dialog -->
    <!-- <Dialog
      header="เพิ่มโครงการ"
      v-model:visible="displayAddModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโครงการ</label
              >
              <InputText type="text" class="w-full" placeholder="ชื่อโครงการ" />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโครงการ (ภาษาอังกฤษ)</label
              >
              <InputText
                type="text"
                class="w-full"
                placeholder="ชื่อโครงการ (ภาษาอังกฤษ)"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโครงการ (ภาษาไทย)</label
              >
              <InputText
                type="text"
                class="w-full"
                placeholder="ชื่อโครงการ (ภาษาไทย)"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่เริ่มโครงการ</label
              >
              <Calendar
                class="w-full"
                placeholder="วันที่เริ่มโครงการ"
                v-model="start_date"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่สิ้นสุดโครงการ</label
              >
              <Calendar
                class="w-full"
                placeholder="วันที่สิ้นสุดโครงการ"
                v-model="end_date"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ระดับของโครงการ</label
              >
              <Dropdown class="w-full" placeholder="ระดับของโครงการ" />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-2xl font-bold mb-2">
                สถานะ
              </label>
              <div class="field-radiobutton">
                <RadioButton
                  id="status1"
                  value="เปิดการใช้งาน"
                  v-model="status"
                />
                <label for="status1" class="mx-2">เปิดการใช้งาน</label>
                <RadioButton
                  id="status2"
                  value="ปิดการใช้งาน"
                  v-model="status"
                />
                <label for="status2" class="mx-2">ปิดการใช้งาน</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeAddModal"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="closeAddModal"
          />
        </div>
      </form>
      <template #footer></template>
    </Dialog> -->
    <!-- End Add Dialog -->
    <!-- Add Dialog -->
    <!-- <Dialog
      header="แก้ไขโครงการ"
      v-model:visible="displayEditModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโครงการ</label
              >
              <InputText type="text" class="w-full" placeholder="ชื่อโครงการ" />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโครงการ (ภาษาอังกฤษ)</label
              >
              <InputText
                type="text"
                class="w-full"
                placeholder="ชื่อโครงการ (ภาษาอังกฤษ)"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโครงการ (ภาษาไทย)</label
              >
              <InputText
                type="text"
                class="w-full"
                placeholder="ชื่อโครงการ (ภาษาไทย)"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่เริ่มโครงการ</label
              >
              <Calendar
                class="w-full"
                placeholder="วันที่เริ่มโครงการ"
                v-model="start_date"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่สิ้นสุดโครงการ</label
              >
              <Calendar
                class="w-full"
                placeholder="วันที่สิ้นสุดโครงการ"
                v-model="end_date"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ระดับของโครงการ</label
              >
              <Dropdown class="w-full" placeholder="ระดับของโครงการ" />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-2xl font-bold mb-2">
                สถานะ
              </label>
              <div class="field-radiobutton">
                <RadioButton
                  id="status1"
                  value="เปิดการใช้งาน"
                  v-model="status"
                />
                <label for="status1" class="mx-2">เปิดการใช้งาน</label>
                <RadioButton
                  id="status2"
                  value="ปิดการใช้งาน"
                  v-model="status"
                />
                <label for="status2" class="mx-2">ปิดการใช้งาน</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeAddModal"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="closeAddModal"
          />
        </div>
      </form>
      <template #footer></template>
    </Dialog> -->
    <!-- End Add Dialog -->
    <!-- Delete Dialog -->
    <!-- <Dialog
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
          <Button
            label="ยกเลิก"
            @click="closeConfirmation"
            class="p-button-secondary w-full mr-3"
          />
          <Button
            label="ยืนยัน"
            @click="closeConfirmation"
            class="p-button-danger w-full ml-3"
          />
        </div>
      </template>
    </Dialog> -->
    <!-- End Delete Dialog -->
  </div>
</template>

<script>
import axios from 'axios'
// import dayjs from "dayjs";
// import locale from "dayjs/locale/th";
// import buddhistEra from "dayjs/plugin/buddhistEra";
import PageTitle from "@/components/PageTitle.vue";
import ProgressSpinner from 'primevue/progressspinner';

export default {
  components: {
    PageTitle,
    ProgressSpinner
  },
  data() {
    return {
      urlProjects: "/project",
      breadcrumb: [
        { label: "ระบบโครงการ", to: "/project/all" },
        { label: "ตรวจสอบโครงการ", to: "/project/view" },
      ],
      isLoadingProject: false,
      isLoading: false,
      getProjects: [],
      projectById: {},
      search: null,
      data: [],
      columnsAnimals: [
        {
          field: "no",
          header: "ลำดับ",
        },
        {
          field: "AnimalIdentificationID",
          header: "หมายเลขสัตว์",
        },
        {
          field: "AnimalName",
          header: "ชื่อสัตว์",
        },
        {
          field: "ThaiAnimalBirthDate",
          header: "วัน/เดือน/ปีเกิด",
        },
        {
          field: "AnimalAge",
          header: "อายุ",
        },
      ],
      // columnsArtificials: [
      //   {
      //     field: "no",
      //     header: "ลำดับ",
      //   },
      // ],
      columnsFarm: [
        {
          field: "no",
          header: "ลำดับ",
        },
        {
          field: "FarmIdentificationNumber",
          header: "ทะเบียนฟาร์ม",
        },
        {
          field: "FarmName",
          header: "ชื่อฟาร์ม",
        },
        // {
        //   field: "Organization.OrganizationName",
        //   header: "หน่วยงาน",
        // },
        // {
        //   field: "OrganizationZone.OrganizationZoneName",
        //   header: "เขตพื้นที่ปศุสัตว์",
        // },
        // {
        //   field: "Province.ProvinceName",
        //   header: "จังหวัด",
        // },
        {
          field: "FarmRegisterDate",
          header: "วันที่ขึ้นทะเบียนฟาร์ม",
        },
      ],
      controller: new AbortController(),
    }
  },
  watch: {
    search(value) {
      if (!value) {
        this.projectById = {}
        this.data = []
      }
      this.getProjectById(value)
    }
  },
  methods: {
    loadProjects() {
      this.isLoadingProject = true;
      axios.get(this.urlProjects, { signal: this.controller.signal }).then(res => {
        const result = res.data.rows;
        this.getProjects = result;
      }).finally(() => this.isLoadingProject = false)
    },
    getProjectById(id) {
      this.isLoading = true
      if (!id) {
        return;
      }
      axios.get(`${this.urlProjects}/${id}`, { signal: this.controller.signal }).then(res => {
        const result = res.data;
        this.projectById = result;
      }).finally(() => {
        this.isLoading = false
        this.loadData()
      })
    },
    loadData() {
      if (this.projectById.ProjectLevel === 'ANIMAL') {
        const animals = this.projectById.Animals
        this.data = animals;
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].no = i + 1;
          // if (this.data[i].ThaiAnimalBirthDate != null) {
          //   this.data[i].ThaiAnimalBirthDate = dayjs(this.data[i].ThaiAnimalBirthDate)
          //     .locale(locale).format("DD/MM/YYYY");
          // }
        }
      } else if (this.projectById.ProjectLevel === 'FARM') {
        const farms = this.projectById.Farms
        this.data = farms;
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].no = i + 1;
          // if (this.data[i].ThaiAnimalBirthDate != null) {
          //   this.data[i].ThaiAnimalBirthDate = dayjs(this.data[i].ThaiAnimalBirthDate)
          //     .locale(locale).format("DD/MM/YYYY");
          // }
        }
      } else {
        this.data = []
      }
      //  else if (this.projectById.ProjectLevel === 'AI') {
      //   const artificials = this.projectById.Animals
      //   this.data = artificials;
      //   for (let i = 0; i < this.data.length; i++) {
      //     this.data[i].no = i + 1;
      //     if (this.data[i].AnimalBirthDate != null) {
      //       this.data[i].AnimalBirthDate = dayjs(this.data[i].AnimalBirthDate)
      //         .locale(locale).format("DD MMM BB");
      //     }
      //   }
      // }
    }
  },
  mounted() {
    this.loadProjects()
    // dayjs.extend(buddhistEra);
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>
<style scoped>
@keyframes p-progress-spinner-color {

  100%,
  0% {
    stroke: #d62d20;
  }

  40% {
    stroke: #0057e7;
  }

  66% {
    stroke: #008744;
  }

  80%,
  90% {
    stroke: #ffa700;
  }
}
</style>