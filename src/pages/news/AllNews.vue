<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ข่าวสาร" :pages="breadcrumb" />
      <div class="card mb-5">
        <div class="grid">
          <div class="col-12">
            <h1 class="text-xl mb-4 text-500">เครื่องมือช่วยค้นหาข่าวสาร</h1>
          </div>
          <div class="col-12 sm:col-6 lg:col-8">
            <label
              for="searchTitle"
              class="block text-600 text-sm font-bold mb-2"
            >
              ค้นหาชื่อข่าวสาร
            </label>
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <InputText
                v-model="params.Title"
                type="text"
                class="w-full"
                id="searchTitle"
              />
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchDate"
              class="block text-600 text-sm font-bold mb-2"
            >
              ค้นหาวันที่สร้างข่าวสาร</label
            >
            <Datepicker
              id="searchDate"
              locale="th"
              utc
              :format="format"
              :enableTimePicker="false"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="วันที่"
              v-model="params.DateShow"
            >
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
              <template #year-overlay="{ value }">
                {{ value + 543 }}
              </template>
            </Datepicker>
          </div>
        </div>
      </div>

      <div class="card">
        <div>
          <div class="grid flex align-items-center mb-5">
            <div class="col-12 md:col-6">
              <h1 class="text-2xl mb-0 text-600">ข่าวสาร</h1>
            </div>
            <div class="col-12 md:col-6 md:text-right">
              <Button
                @click="openModal()"
                label="เพิ่มข่าวสาร"
                icon="pi pi-plus"
                class="md:w-auto mr-2"
              />
            </div>
          </div>
          <div class="mt-3">
            <DataTable
              class="text-sm"
              :value="data"
              v-model:rows="params.size"
              :totalRecords="table.total"
              @page="load"
              @sort="sort($event)"
              lazy
              :paginator="true"
              :scrollable="true"
              :exportable="true"
              :rowHover="true"
              scrollDirection="both"
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
              :rowsPerPageOptions="[10, 20, 50]"
              responsiveLayout="scroll"
              currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
            >
              <!-- <Column
                v-for="col of columns"
                :field="col.field"
                :header="col.header"
                :key="col.field"
                :sortable="true"
                style="width: 150px"
              >
              </Column> -->
              <!-- <Column
                field="Projects"
                header="ลำดับ"
                :sortable="true"
                style="width: 200px"
              >
              </Column> -->
              <Column
                field="Title"
                header="ชื่อเรื่องข่าวสาร"
                class="text-center"
                style="width: 500px"
              >
              </Column>
              <Column
                field="ThaiDateShow"
                header="วันที่เผยแพร่"
                class="text-center"
                style="width: 200px"
              >
              </Column>
              <Column
                field="UserTypeTemp"
                class="text-center"
                header="เผยแพร่ถึง"
                style="width: 200px"
              >
              </Column>
              <Column header="จัดการ" class="text-center"
                ><template #body="slotProps">
                  <SplitButton
                    label="แก้ไข"
                    icon="pi pi-pencil"
                    @click="openModal(slotProps.data.NewsID)"
                    class="p-button-sm p-button-outlined p-button-warning"
                    :model="getItems(slotProps.data.NewsID)"
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
        <!-- <div v-else>
          <div class="grid flex align-items-center mb-5">
            <div class="col-12 md:col-6">
              <Skeleton width="10rem" height="2rem"></Skeleton>
            </div>
            <div class="col-12 md:col-6 md:flex md:justify-content-end">
              <Skeleton width="5rem"></Skeleton>
            </div>
          </div>
          <div class="mt-5">
            <DataTable
              class="text-sm"
              :value="data"
              :scrollable="true"
              :paginator="true"
              :rows="10"
              responsiveLayout="scroll"
            >
              <Column
                v-for="col of columns"
                :field="col.field"
                :header="col.header"
                :key="col.field"
                :sortable="true"
                style="width: 150px"
              >
                <template #body>
                  <Skeleton></Skeleton>
                </template>
              </Column>
              <Column
                field="Projects"
                header="โครงการ"
                :sortable="true"
                style="width: 200px"
              >
                <template #body>
                  <Skeleton></Skeleton>
                </template>
              </Column>
              <Column
                field="FarmStatusID"
                header="สถานะ"
                :sortable="true"
                style="width: 200px"
              >
                <template #body>
                  <Skeleton></Skeleton>
                </template>
              </Column>
              <Column header="จัดการ" style="width: 200px">
                <template #body>
                  <Skeleton></Skeleton>
                </template>
              </Column>
            </DataTable>
          </div>
        </div> -->
      </div>
    </div>

    <Dialog
      :header="formheader + name"
      v-model:visible="display"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12">
              <label for="title" class="block text-sm font-bold mb-2">
                ชื่อเรื่องข่าวสาร <span class="text-red-500"> *</span></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.Title"
                id="title"
                :class="{ 'p-invalid': !form.Title && valid }"
              />
            </div>

            <div class="field col-12 sm:col-12">
              <label for="title" class="block text-sm font-bold mb-2">
                รายละเอียดข่าวสาร <span class="text-red-500"> *</span></label
              >
              <Textarea
                class="w-full"
                id="title"
                v-model="form.Detail"
                rows="5"
                :class="{ 'p-invalid': !form.Detail && valid }"
              />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">
                วันที่วันที่เผยแพร่<span class="text-red-500"> *</span>
              </label>
              <Datepicker
                id="date"
                locale="th"
                :format="format"
                utc
                v-model="form.DateShow"
                :enableTimePicker="false"
                cancelText="ยกเลิก"
                selectText="ยืนยัน"
                placeholder="เลือกวันที่เผยแพร่"
              >
                <template #year="{ year }">
                  {{ year + 543 }}
                </template>
                <template #year-overlay="{ value }">
                  {{ value + 543 }}
                </template>
              </Datepicker>
            </div>
            <div class="field col-12 sm:col-12">
              <label for="title" class="block text-sm font-bold mb-2">
                เผยแพร่ถึง <span class="text-red-500"> *</span></label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกกลุ่มผู้ใช้"
                optionLabel="UserTypeName"
                optionValue="UserTypeID"
                v-model="form.UserType"
                :options="UserType"
                :filter="true"
                filterPlaceholder=""
                :class="{ 'p-invalid': !form.UserType && valid }"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeCreated"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="save()"
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import axios from "axios";
import _ from "lodash";
import { format } from "date-fns";
import { th } from "date-fns/locale";
export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      url: "/news",

      display: false,
      breadcrumb: [
        { label: "ข้อมูลพื้นฐานระบบ", to: "/user_center/dashboard" },
        { label: "ข่าวสาร", to: "" },
      ],

      formheader: "",
      name: "ข่าวสาร",

      data: [],

      params: {
        page: 1,
        size: 10,
        orderByField: "NewsID",
        orderBy: "desc",
        IsActive: null,
      },

      form: {
        isActive: "1",
      },

      table: {
        total: 0,
        last_page: 0,
      },

      UserType: [
        {
          UserTypeID: 1,
          UserTypeName: "เจ้าหน้าที่",
        },
        {
          UserTypeID: 2,
          UserTypeName: "เกษตรกร",
        },
        {
          UserTypeID: 3,
          UserTypeName: "ทั้งหมด",
        },
      ],

      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],

      controller: new AbortController(),
    };
  },

  mounted() {
    this.load();
  },
  watch: {
    "params.Title": _.debounce(function () {
      this.load();
    }, 500),
    "params.DateShow": _.debounce(function () {
      this.load();
    }, 500),
  },
  methods: {
    format(date) {
      const dayStart = date.getDate();
      const monthStart = date.getMonth();
      const yearStart = date.getFullYear() + 543;
      const formatStart = format(
        new Date(yearStart, monthStart, dayStart),
        "dd/MM/yyyy",
        {
          locale: th,
        }
      );
      return `${formatStart}`;
    },
    getItems(id) {
      const items = [
        {
          label: "ลบ",
          icon: "pi pi-trash",
          command: () => {
            this.openDeleteModal(id);
          },
        },
      ];
      return items;
    },

    async load(event) {
      // สำหรับเปลี่ยนหน้า
      if (event) {
        this.params.page = event.page + 1;
      }

      await axios
        .get(this.url, { params: this.params, signal: this.controller.signal })
        .then((response) => {
          let data = response.data;
          this.params.page = data.currPage;
          this.table.total = data.total;
          this.table.last_page = data.lastPage;
          this.data = data.rows;

          for (let i = 0; i < this.data.length; i++) {
            // console.log(555);
            this.data[i].show_id = i + 1;

            if (this.data[i].UserType == 1) {
              this.data[i].UserTypeTemp = "เจ้าหน้าที่";
            } else if (this.data[i].UserType == 2) {
              this.data[i].UserTypeTemp = "เกษตรกร";
            } else {
              this.data[i].UserTypeTemp = "ทั้งหมด";
            }
          }

          // UserTypeTemp;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async openModal(id = null) {
      if (id) {
        this.formheader = "แก้ไข";

        this.id = id;
        await axios.get(`/news/${id}`).then((response) => {
          this.form = response.data;
          // this.form.Title = data.Title;
          // this.form.Detail = data.Detail;
          // this.form.UserType = data.UserType;
          // this.form.DateShow = data.DateShow;
        });
      } else {
        this.formheader = "เพิ่ม";
        this.form.Title = null;
        this.form.Detail = null;
        this.form.UserType = 3;
        this.form.DateShow = new Date();
        // console.log(id + "66");
      }
      this.display = true;
    },
    closeCreated() {
      this.display = false;
    },

    async save() {
      if (this.validation() == false) {
        return;
      }

      if (this.id) {
        // this.group_form.isActive = this.group_form.isActive.value;
        await axios.put(`/news/${this.id}`, this.form).then(() => {
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "แก้ไขข้อมูลเสร็จสิ้น",
            life: 5000,
          });
        });
      } else {
        await axios.post("/news", this.form).then(() => {
          this.load();

          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });
        });
      }
      this.display = false;
    },

    openDeleteModal(id) {
      this.$confirm.require({
        message: "หากลบข้อมูลแล้วจะไม่สามารถกู้คืนได้อีก",
        header: "ยืนยันการลบข้อมูล",
        accept: () => {
          axios.delete(`/news/${id}`).then(() => {
            this.$toast.add({
              severity: "success",
              summary: "ลบข้อมูลสำเร็จ",
              life: 3000,
            });
            this.load();
          });
        },
        acceptLabel: "ลบ",
        acceptClass: "p-button-danger",
        rejectLabel: "ยกเลิก",
      });
    },
    validation() {
      if (!this.form.Title || !this.form.Detail) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "กรุณากรอกข้อมูล",
          life: 5000,
        });
        this.valid = true;
        return false;
      }

      return true;
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
