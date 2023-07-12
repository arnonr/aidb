<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="กลุ่มผู้เข้าใช้งาน" :pages="breadcrumb" />
      <div class="card">
        <h1 class="text-xl mb-4 text-500">
          เครื่องมือช่วยค้นหากลุ่มผู้เข้าใช้งาน
        </h1>
        <div class="grid">
          <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2"
              >ระบุกลุ่มผู้ใช้งาน</label
            >
            <InputText
              class="w-full"
              type="text"
              v-model="params.GroupName"
              placeholder="ค้นหาชื่อกลุ่ม"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">สถานะ</label>
            <Dropdown
              class="w-full"
              placeholder="ทั้งหมด"
              :options="status"
              optionLabel="label"
              optionValue="value"
              v-model="params.IsActive"
              @change="load()"
            />
          </div>
        </div>
      </div>

      <div class="mt-5 card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">กลุ่มผู้เข้าใช้งาน</h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button
              @click="openModal()"
              label="เพิ่มกลุ่มผู้เข้าใช้งาน"
              icon="pi pi-plus"
              class="p-button-primary"
            />
          </div>
        </div>
        <DataTable
          class="text-sm"
          :value="groups"
          :paginator="true"
          v-model:rows="params.size"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          :totalRecords="table.total"
          @page="load"
          :loading="loading"
          lazy
        >
          <Column
            field="GroupCode"
            header="รหัสกลุ่มผู้ใช้"
            class="text-center"
          ></Column>
          <Column field="GroupName" header="ชื่อกลุ่ม"></Column>
          <Column field="GroupDescription" header="คำอธิบาย"></Column>
          <Column
            field="IsActive"
            header="กำหนดสิทธ์ใช้งาน"
            class="text-center"
          >
            <template #body="slotProps">
              <Button
                class="p-button-text"
                icon="pi pi-lock"
                @click="authorize(slotProps.data.GroupID)"
              />
            </template>
          </Column>
          <Column field="status" header="สถานะ" class="text-center">
            <template #body="slotProps">
              <Tag
                v-if="slotProps.data.isActive == 1"
                class="w-full"
                severity="success"
                >เปิดใช้งาน
              </Tag>

              <Tag v-else class="w-full bg-gray-500">ปิดใช้งาน</Tag>
            </template>
          </Column>
          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <SplitButton
                label="แก้ไข"
                icon="pi pi-pencil"
                @click="openModal(slotProps.data.GroupID)"
                class="p-button-sm p-button-outlined p-button-warning"
                :model="split_group(slotProps.data.GroupID)"
              >
              </SplitButton>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <!-- end main page -->
    <!-- Add Dialog -->
    <Dialog
      :header="dialog_header"
      v-model:visible="displayModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2" @submit.prevent="save">
        <div class="col-12 lg:col-12">
          <div class="grid">
            <div class="col-12 lg:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสกลุ่มผู้ใช้</label
              >
              <InputText v-model="group_form.GroupCode" class="w-full" />
            </div>
            <div class="col-12 lg:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อกลุ่มผู้ใช้งาน</label
              >
              <InputText v-model="group_form.GroupName" class="w-full" />
            </div>
            <div class="col-12 lg:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                คำอธิบาย
              </label>
              <InputText v-model="group_form.GroupDescription" class="w-full" />
            </div>
            <div class="text-xl">สถานะ</div>
            <div class="field col-12 sm:col-12 lg:col-12">
              <div class="field-radiobutton">
                <div
                  v-for="IsActive of statusIsActive"
                  :key="IsActive.key"
                  class="field-radiobutton"
                >
                  <RadioButton
                    :id="IsActive.key"
                    name="category"
                    :value="IsActive"
                    v-model="group_form.isActive"
                  />
                  <label :for="IsActive.key" class="mr-2">{{
                    IsActive.name
                  }}</label>
                </div>
                <!-- <RadioButton :value="1" v-model="group_form.isActive" />
                <label class="mr-5">เปิดการใช้งาน</label>
                <RadioButton
                  :value="0"
                  v-model="group_form.isActive"
                  class="ml-5"
                />
                <label>ปิดการใช้งาน</label> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="displayModal = false"
          />
          <Button
            type="submit"
            label="บันทึกข้อมูล"
            class="ml-3 bg-blue-600 w-full"
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

import PageTitle from "@/components/PageTitle.vue";
import router from "../../router";
import axios from "axios";
import _ from "lodash";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      dialog_header: "เพิ่มกลุ่มผู้เข้าใช้งาน",
      displayModal: false,
      deleteModal: false,
      group_form: {
        GroupCode: "",
        GroupName: "",
        GroupDescription: "",
        DataAccessLevelID: 1,
        IsActive: "",
      },
      group_id: null,
      groups: [],
      params: {
        page: 1,
        size: 10,
        GroupName: null,
        IsActive: null,
        orderByField: "GroupCode",
        orderBy: "asc",
      },
      table: {
        total: 0,
        last_page: 0,
      },
      loading: false,
      statusIsActive: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],
    };
  },
  mounted() {
    this.load();
    this.group_form.isActive = this.statusIsActive[0];
  },
  watch: {
    "params.GroupName": _.debounce(function () {
      this.load();
    }, 500),
  },
  methods: {
    async load(event) {
      this.loading = true;
      if (event) {
        this.params.page = event.page + 1;
      }
      await axios
        .get("/group", {
          params: this.params,
        })
        .then((response) => {
          let data = response.data;
          this.params.page = data.currPage;
          this.table.total = data.total;
          this.table.last_page = data.lastPage;
          this.groups = data.rows;
        });
      this.loading = false;
    },
    async save() {
      if (this.group_id) {
        this.group_form.isActive = this.group_form.isActive.value;
        await axios.put(`/group/${this.group_id}`, this.group_form).then(() => {
          this.load();
        });
      } else {
        this.group_form.isActive = this.group_form.isActive.value;
        await axios.post("/group", this.group_form).then(() => {
          this.load();
        });
      }
      this.displayModal = false;
    },
    authorize(id) {
      if (id) {
        router.push({ name: "group_authorizes", params: { group_id: id } });
      }
    },
    async openModal(id = null) {
      if (id) {
        this.dialog_header = "แก้ไขกลุ่มผู้เข้าใช้งาน";
        await axios.get(`/group/${id}`).then((response) => {
          let data = response.data;
          this.group_form.GroupCode = data.GroupCode;
          this.group_form.GroupName = data.GroupName;
          this.group_form.GroupDescription = data.GroupDescription;
          // this.group_form.isActive = data.IsActive;

          if (data.isActive == 0) {
            this.group_form.isActive = this.statusIsActive[1];
          } else if (data.isActive == 1) {
            this.group_form.isActive = this.statusIsActive[0];
          }

          this.group_id = id;
        });
      } else {
        this.dialog_header = "เพิ่มกลุ่มผู้เข้าใช้งาน";
        this.group_form.GroupCode = null;
        this.group_form.GroupName = null;
        this.group_form.GroupDescription = null;
        // this.group_form.isActive = null;
        this.group_id = null;
      }

      this.displayModal = true;
    },
    openDeleteModal(id) {
      this.$confirm.require({
        message: "หากลบข้อมูลแล้วจะไม่สามารถกู้คืนได้อีก",
        header: "ยืนยันการลบข้อมูล",
        accept: () => {
          axios.delete(`/group/${id}`).then(() => {
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
    split_group(id) {
      return [
        {
          label: "ลบ",
          icon: "pi pi-trash",
          command: () => {
            this.openDeleteModal(id);
          },
        },
      ];
    },
  },
  setup() {
    const breadcrumb = ref([
      { label: "ปรับปรุงระบบ", to: "/" },
      { label: "กลุ่มผู้เข้าใช้งาน", to: "/setting/Group" },
    ]);
    const status = ref([
      {
        label: "เปิดการใช้งาน",
        value: 1,
      },
      {
        label: "ปิดการใช้งาน",
        value: 0,
      },
    ]);
    const search = reactive({
      main: null,
      status: null,
      duty: null,
      date: null,
    });
    return {
      status,
      search,
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
