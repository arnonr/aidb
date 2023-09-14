<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ติดตามโครงการ" :pages="breadcrumb" />

      <div class="card">
        <div class="grid">

          <div class="col-12 sm:col-6 lg:col-12">
            <label
              for="selectedScheme"
              class="block text-600 text-sm font-bold mb-2"
            >
              โครงการ<span class="text-red-500"> *</span></label
            >
            <MultiSelect
              display="chip"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="ทั้งหมด"
              :options="selectOptions.projects"
              optionLabel="ProjectName"
              optionValue="ProjectID"
              :filter="true"
              v-model="search.ProjectID"
              :virtualScrollerOptions="{ itemSize: 38 }"
            />
          </div>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12">
        <Button severity="primary" label="ทะเบียนฟาร์ม" />
        <Button severity="secondary" label="ทะเบียนสัตว์" class="ml-2" />
        <Button severity="secondary" label="กิจกรรมแจ้งเตือน" class="ml-2" />
      </div>

      <!-- Search -->
      <div class="card mb-5">
        <div class="grid">
          <div class="col-12">
            <h1 class="text-xl mb-4 text-500">
              เครื่องมือช่วยค้นหาทะเบียนฟาร์ม
            </h1>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="codeNumber"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลขทะเบียนฟาร์ม</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <InputText
                type="number"
                class="w-full"
                v-model="search.FarmIdentificationNumber"
              />
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label for="farmName" class="block text-600 text-sm font-bold mb-2">
              ชื่อฟาร์ม</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <InputText type="text" class="w-full" v-model="search.FarmName" />
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="FarmerFullName"
              class="block text-600 text-sm font-bold mb-2"
            >
              ชื่อนามสกุลเกษตรกร
            </label>
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <InputText
                type="text"
                class="w-full"
                v-model="search.FarmerFullName"
              />
            </span>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div>
          <div class="grid flex align-items-center mb-5">
            <div class="col-12 md:col-6">
              <h1 class="text-2xl mb-0 text-600">รายการฟาร์ม</h1>
            </div>
          </div>
          <div class="mt-3">

            <DataTable
              class="text-sm"
              :value="data"
              :exportable="true"
              ref="dt"
              :rowHover="true"
              :loading="isWating"
              :paginator="true"
              v-model:rows="this.rowPerPage"
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              :rowsPerPageOptions="[10, 20, 50]"
              responsiveLayout="scroll"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              :totalRecords="total"
              @page="load"
              @sort="sort($event)"
              lazy
            >
              <Column
                field="FarmIdentificationNumber"
                header="หมายเลขฟาร์ม"
                :sortable="true"
                style="width: 200px"
                exportFooter="&#8203;"
              >
                <template #body="slotProps">
                  <div
                    class="cursor-pointer"
                    @click="openDetail(slotProps.data.FarmID)"
                  >
                    <span class="text-blue-400">
                      <u>{{ slotProps.data.FarmIdentificationNumber }}</u>
                    </span>
                  </div>
                </template>
              </Column>
              <Column
                v-for="col of columns"
                :field="col.field"
                :header="col.header"
                :key="col.field"
                :sortable="true"
                style="width: 150px"
                exportFooter="&#8203;"
              >
              </Column>
              <Column
                field="FarmStatusID"
                header="สถานะ"
                :sortable="true"
                exportFooter="&#8203;"
              >
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
              <Column header="จัดการ" style="width: 200px">
                <template #body="slotProps">
                  <SplitButton
                    label="แก้ไข"
                    icon="pi pi-pencil"
                    @click="edit(slotProps.data.FarmID)"
                    class="p-button-sm p-button-outlined p-button-warning"
                    :model="getItems(slotProps.data.FarmID)"
                  >
                  </SplitButton>
                </template>
              </Column>
              <template #empty> ไม่พบข้อมูล </template>
              <template #loading>
                <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
              </template>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
    <!-- end main page -->
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
import dayjs from "dayjs";
import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { mapGetters } from "vuex";
import { ref } from "vue";

export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
    }),
  },
  data() {
    return {
      url: "/project",
      urlProject: "/project?includeAll=false",
      urlAnimalType: "/animal-type",
      urlOrganization: "/organization?includeAll=false",
      breadcrumb: [
        { label: "ระบบโครงการ", to: "/project/all" },
        { label: "ข้อมูลพื้นฐาน", to: "" },
      ],
      items: [],
      // load
      data: [],
      animal: [],
      isLoading: false,
      // form
      valid: false,
      form: {
        ProjectID: "",
        ProjectCode: "",
        ProjectName: "",
        ProjectNameEN: "",
        StartDate: "",
        EndDate: "",
        OrganizationID: "",
        AnimalTypeID: "",
        AnimalTypeIDTmp: "",
        IsExtend: "",
        ProjectLevel: "",
        isActive: "",
      },

      project_level: [
        {
          id: "ANIMAL",
          name: "สัตว์",
        },
        {
          id: "AI",
          name: "ผสมเทียม",
        },
        {
          id: "FARM",
          name: "ฟาร์ม",
        },
      ],
      extend: [
        {
          id: 1,
          name: "ขยาย",
        },
        {
          id: 0,
          name: "ไม่ขยาย",
        },
      ],
      stage: [
        {
          id: 0,
          name: "ทั้งหมด",
        },
        {
          id: "1",
          name: "เปิดใช้งาน",
        },
        {
          id: "0",
          name: "ปิดใช้งาน",
        },
      ],
      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],

      //  cancel requests
      controller: new AbortController(),

      // Search

      isSearch: false,
      isSelection: false,
      search: {
        ProjectCode: "",
        ProjectName: "",
        ProjectLevel: "",
        isActive: "",
        StartDate: "",
        EndDate: "",
      },
      filtered: {
        ProjectCode: "",
        ProjectName: "",
        ProjectLevel: "",
        isActive: "",
        StartDate: "",
        EndDate: "",
      },

      // Modal
      display_add: false,
      display_edit: false,
      display_view: false,
      display_delete: false,
    };
  },
  mounted() {
    this.load();
    this.form.isActive = this.status[0];

    dayjs.extend(buddhistEra);

    // ประเภทสัตว์
    axios
      .get(this.urlAnimalType, {
        signal: this.controller.signal,
      })
      .then((response) => {
        this.animal = response.data.rows;
      });

    // ประเภทหน่วยงาน
    axios
      .get(this.urlOrganization, {
        signal: this.controller.signal,
      })
      .then((response) => {
        this.organization = response.data.rows;
      });
  },
  watch: {
    // ค้นหา
    "search.ProjectCode"(val) {
      this.filtered.ProjectCode = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    // ค้นหา
    "search.ProjectName"(val) {
      this.filtered.ProjectName = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.ProjectLevel"(val) {
      this.filtered.ProjectLevel = val.id;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.isActive"(val) {
      this.filtered.isActive = val.id;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.StartDate"(val) {
      // แปลงเป็น 2022-02-02
      let date = JSON.stringify(val);
      this.filtered.StartDate = date.slice(1, 11);

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.EndDate"(val) {
      // แปลงเป็น 2022-02-02
      let date = JSON.stringify(val);
      this.filtered.EndDate = date.slice(1, 11);

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
  },
  methods: {
    clear() {
      this.form = {
        isActive: this.status[0],
      };
      this.valid = false;
    },
    getItems(id) {
      const items = [
        {
          label: "รายละเอียด",
          icon: "pi pi-eye",
          command: () => {
            this.open_view(id);
          },
        },
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
    validation() {
      if (
        !this.form.ProjectCode ||
        !this.form.ProjectName ||
        !this.form.StartDate ||
        !this.form.AnimalTypeID ||
        !this.form.ProjectLevel ||
        !this.form.IsExtend
      ) {
        this.valid = true;
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "กรุณากรอกข้อมูล",
          life: 5000,
        });
        return false;
      } else {
        return true;
      }
    },
    // Axios
    load() {
      this.isLoading = true;
      let url = this.urlProject;
      // url += "&page=";
      // if (this.curpage) {
      //   url += this.curpage;
      // }
      if (this.filtered.ProjectCode) {
        url += "&ProjectCode=" + this.filtered.ProjectCode;
      }
      if (this.filtered.ProjectName) {
        url += "&ProjectName=" + this.filtered.ProjectName;
      }
      if (this.filtered.ProjectLevel) {
        url += "&ProjectLevel=" + this.filtered.ProjectLevel;
      }
      if (this.filtered.isActive) {
        url += "&isActive=" + this.filtered.isActive;
      }
      if (this.filtered.StartDate) {
        url += "&StartDate=" + this.filtered.StartDate;
      }
      if (this.filtered.EndDate) {
        url += "&EndDate=" + this.filtered.EndDate;
      }

      // console.log(url);

      if (this.animal_id == 1) {
        url += "?AnimalTypeID=[1,2]";
      } else if (this.animal_id == 2) {
        url += "?AnimalTypeID=[3,4]";
      } else if (this.animal_id == 3) {
        url += "?AnimalTypeID=[17,18]";
      }

      axios
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.total = response.data.total;
          this.data = response.data.rows;
          dayjs.extend(buddhistEra);
          for (let i = 0; i < this.data.length; i++) {
            // this.data[i].show_id = i + 1;

            if (this.data[i].StartDate != null) {
              this.data[i].StartDate = dayjs(this.data[i].StartDate)
                .locale(locale)
                .format("DD/MM/YY");
            }
            if (this.data[i].EndDate != null) {
              this.data[i].EndDate = dayjs(this.data[i].EndDate)
                .locale(locale)
                .format("DD/MM/YY");
            }

            if (this.data[i].ProjectLevel == "ANIMAL") {
              this.data[i].level = "สัตว์";
            } else if (this.data[i].ProjectLevel == "FARM") {
              this.data[i].level = "ฟาร์ม";
            } else {
              this.data[i].level = "ผสมเทียม";
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    add() {
      // change data
      this.form.isActive = this.form.isActive.value;
      this.form.ProjectLevel = this.form.ProjectLevel.id;
      this.form.IsExtend = this.form.IsExtend.id;

      // console.log(this.form.AnimalTypeID);
      // post
      axios
        .post(this.url, this.form)
        .then(() => {
          this.close_add();
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });
        })
        // error
        .catch((err) => {
          this.form.isActive = this.status[0];
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },
    update() {
      // validation
      if (this.validation() == false) {
        return;
      }

      this.form.isActive = this.form.isActive.value;
      this.form.ProjectLevel = this.form.ProjectLevel.id;
      this.form.IsExtend = this.form.IsExtend.id;

      //   console.log(this.form.StartDate)

      if (this.form.StartDate) {
        let date = this.form.StartDate.split("/");
        this.form.StartDate = "20" + date[2] + "-" + date[1] + "-" + date[0];
      }

      if (this.form.EndDate) {
        let date = this.form.EndDate.split("/");

        this.form.EndDate = "20" + date[2] + "-" + date[1] + "-" + date[0];
      }

      console.log(this.form.EndDate);

      //   if (this.form.EndDate) {
      //     this.form.StartDate = dayjs(this.data[i].StartDate)
      //       .locale(locale)
      //       .format("DD/MM/YY");
      //   }

      axios
        .put(this.url + "/" + this.form.ProjectID, this.form)
        .then(() => {
          this.close_edit();
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "แก้ไขข้อมูลเสร็จสิ้น",
            life: 5000,
          });
        })
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },
    remove() {
      axios.delete(this.url + "/" + this.form.id).then(() => {
        this.close_delete();
        this.load();
        this.$toast.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "ลบข้อมูลเสร็จสิ้น",
          life: 5000,
        });
      });
    },
    // Modal
    open_add() {
      this.clear();
      this.display_add = true;
    },
    close_add() {
      this.display_add = false;
    },
    open_edit(id) {
      id = this.data.find((x) => x.ProjectID == id);
      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      if (id.IsExtend == 0) {
        id.IsExtend = this.extend[1];
      } else if (id.IsExtend == 1) {
        id.IsExtend = this.extend[0];
      }

      // console.log(id.ProjectLevel);

      // if (id.ProjectLevel == "ANIMAL") {
      //   id.ProjectLevel = this.project_level[1].id;
      // } else if (id.ProjectLevel == "AI") {
      //   id.ProjectLevel = this.project_level[2].id;
      // } else {
      //   id.ProjectLevel = this.project_level[3].id;
      // }
      this.form = {
        ProjectID: id.ProjectID,
        ProjectCode: id.ProjectCode,
        ProjectName: id.ProjectName,
        ProjectNameEN: id.ProjectNameEN,
        StartDate: id.StartDate,
        EndDate: id.EndDate,
        OrganizationID: id.OrganizationID,
        AnimalTypeID: id.AnimalTypeID,
        IsExtend: id.IsExtend,
        ProjectLevel: id.ProjectLevel,
        AnimalTypes: id.AnimalTypes,
        show_id: id.show_id,
        isActive: id.isActive,
      };

      // console.log(this.form);
      this.display_edit = true;
    },
    close_edit() {
      this.display_edit = false;
    },
    open_delete(id) {
      this.form.id = id;
      // this.form.show_id = show_id;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },
    open_view(id) {
      id = this.data.find((x) => x.ProjectID == id);
      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      if (id.IsExtend == 0) {
        id.IsExtend = this.extend[1];
      } else if (id.IsExtend == 1) {
        id.IsExtend = this.extend[0];
      }

      if (id.ProjectLevel == "ANIMAL") {
        id.ProjectLevel = this.project_level[0];
      } else if (id.ProjectLevel == "AI") {
        id.ProjectLevel = this.project_level[1];
      } else {
        id.ProjectLevel = this.project_level[2];
      }
      this.form = {
        ProjectID: id.ProjectID,
        ProjectCode: id.ProjectCode,
        ProjectName: id.ProjectName,
        ProjectNameEN: id.ProjectNameEN,
        StartDate: id.StartDate,
        EndDate: id.EndDate,
        OrganizationID: id.OrganizationID,
        AnimalTypeID: id.AnimalTypeID,
        IsExtend: id.IsExtend,
        ProjectLevel: id.ProjectLevel,
        AnimalTypes: id.AnimalTypes,
        show_id: id.show_id,
        isActive: id.isActive,
      };
      this.display_view = true;
    },
    close_view() {
      this.display_view = false;
    },
  },
};
</script>

<script setup>
const url_project = "/project?includeAll=false";
const selectOptions = ref({
  projects: [],
});
const search = ref({
  ProjectID: null,
});
const isWating = ref(false);

const fetchProjects = async () => {
  isWating.value = true;
  await axios
    .get(url_project, {})
    .then((response) => {
      selectOptions.value.projects = response.data.rows;

      //   for (let i = 0; i < this.data.length; i++) {

      //     if (this.data[i].StartDate != null) {
      //       this.data[i].StartDate = dayjs(this.data[i].StartDate)
      //         .locale(locale)
      //         .format("DD/MM/YY");
      //     }
      //     if (this.data[i].EndDate != null) {
      //       this.data[i].EndDate = dayjs(this.data[i].EndDate)
      //         .locale(locale)
      //         .format("DD/MM/YY");
      //     }

      //     if (this.data[i].ProjectLevel == "ANIMAL") {
      //       this.data[i].level = "สัตว์";
      //     } else if (this.data[i].ProjectLevel == "FARM") {
      //       this.data[i].level = "ฟาร์ม";
      //     } else {
      //       this.data[i].level = "ผสมเทียม";
      //     }
      //   }
    })
    .finally(() => {
      isWating.value = false;
    });
};

fetchProjects();
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
