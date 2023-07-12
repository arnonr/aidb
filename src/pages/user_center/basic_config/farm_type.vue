<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="ประเภทฟาร์ม" :pages="breadcrumb" />

      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหา</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />
          <InputText
            class="w-full"
            type="text"
            v-model="search['global'].value"
            placeholder="ค้นหา"
          />
        </span>
      </div>
      <div class="mt-5 card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">ประเภทฟาร์ม</h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button
              @click="open_add"
              label="เพิ่มข้อมูล"
              icon="pi pi-plus"
              class="p-button-primary"
            />
          </div>
        </div>
        <DataTable
          class="text-sm"
          :value="data"
          :paginator="true"
          :rows="10"
          v-model:filters="search"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column
            field="show_id"
            header="ลำดับ"
            class="text-center"
            :sortable="true"
          >
          </Column>

          <Column
            field="code"
            header="รหัสประเภทฟาร์ม"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="name"
            header="ชื่อประเภทฟาร์ม"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="is_active"
            header="สถานะ"
            class="text-center"
            :sortable="true"
          >
            <template #body="slotProps">
              <div
                v-if="
                  slotProps.data.is_active == '1' ||
                  slotProps.data.is_active == status[0]
                "
              >
                <Tag class="w-full" severity="success">เปิดการใช้งาน</Tag>
              </div>
              <div v-else>
                <Tag class="w-full bg-gray-500">ปิดการใช้งาน</Tag>
              </div>
            </template>
          </Column>
          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <Button
                label="แก้ไข"
                icon="pi pi-pencil"
                class="p-button-sm p-button-outlined p-button-warning mb-2"
                @click="open_edit(slotProps.data.id)"
              />
              <br />
              <Button
                label="ลบ"
                icon="pi pi-trash"
                class="p-button-sm p-button-outlined p-button-danger mt-2"
                @click="open_delete(slotProps.data.id, slotProps.data.show_id)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <!-- end main page -->
    <!-- Add Dialog -->
    <Dialog
      header="เพิ่มประเภทฟาร์ม"
      v-model:visible="display_add"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสประเภทฟาร์ม</label
              >
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.code && valid }"
                v-model="form.code"
              />
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อประเภทฟาร์ม
              </label>
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.name && valid }"
                v-model="form.name"
              />
            </div>
            <div class="field col-12 sm:col-12 lg:col-12">
              <div class="text-xl">สถานะ</div>
              <div
                v-for="is_active of status"
                :key="is_active.key"
                class="field-radiobutton"
              >
                <RadioButton
                  :id="is_active.key"
                  name="category"
                  :value="is_active"
                  v-model="form.is_active"
                />
                <label :for="is_active.key">{{ is_active.name }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="close_add"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="add"
          />
        </div>
      </form>
    </Dialog>
    <!-- End Add Dialog -->
    <!-- EDIT Dialog -->
    <Dialog
      header="แก้ไขประเภทฟาร์ม"
      v-model:visible="display_edit"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสประเภทฟาร์ม</label
              >
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.code && valid }"
                v-model="form.code"
              />
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อประเภทฟาร์ม
              </label>
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.code && valid }"
                v-model="form.name"
              />
            </div>
            <div class="field col-12 sm:col-12 lg:col-12">
              <div class="text-xl">สถานะ</div>
              <div
                v-for="is_active of status"
                :key="is_active.key"
                class="field-radiobutton"
              >
                <RadioButton
                  :id="is_active.key"
                  name="category"
                  :value="is_active"
                  v-model="form.is_active"
                />
                <label :for="is_active.key">{{ is_active.name }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="close_edit"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="update"
          />
        </div>
      </form>
    </Dialog>
    <!-- End EDIT Dialog -->
    <!-- Start Delete Dialog -->
    <Dialog
      header="ตรวจสอบข้อมูล"
      v-model:visible="display_delete"
      :style="{ width: '350px' }"
      :modal="true"
    >
      <div class="confirmation-content text-center">
        <i class="pi pi-trash" style="font-size: 5rem" />
        <br />
        <span class="text-xl"
          >คุณต้องการลบประเภทฟาร์มลำดับที่ {{ form.show_id }} ใช่หรือไม่</span
        >
      </div>
      <template #footer>
        <div class="col-12 text-center flex justify-content-between">
          <Button
            label="ยกเลิก"
            @click="close_delete"
            class="p-button-secondary w-full mr-3"
          />
          <Button
            label="ยืนยัน"
            @click="remove"
            class="p-button-danger w-full ml-3"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    PageTitle,
  },

  data() {
    return {
      url: "/farm-type",
      breadcrumb: [
        { label: "ข้อมูลพื้นฐานระบบ", to: "/user_center/dashboard" },
        { label: "ประเภทฟาร์ม", to: "" },
      ],
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },

      // load
      data: [],
      // form
      total: [],
      valid: false,
      form: {
        id: "",
        code: "",
        name: "",
        is_active: "",
      },
      selectid: null,
      form_add: {
        code: "",
        name: "",
        is_active: 1,
      },

      status: [
        { name: "เปิดการใช้งาน", key: "A", value: 1 },
        { name: "ปิดการใช้งาน", key: "B", value: 0 },
      ],
      selectedCategory: null,
      // Modal
      display_add: false,
      display_edit: false,
      display_delete: false,
      onIndexTemplate: 0,
    };
  },

  mounted() {
    this.load();
    this.form.is_active = this.status[0];
  },

  methods: {
    clear() {
      this.form = {
        id: "",
        code: "",
        name: "",
        is_active: this.status[0],
      };
      this.valid = false;
    },

    load() {
      axios.get(this.url).then((data) => {
        this.data = data.data.rows;
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].show_id = i + 1;
        }
      });
    },

    validation() {
      if (!this.form.code || !this.form.name) {
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
    add() {
      if (this.validation() == false) {
        return;
      }
      // change data
      this.form.is_active = this.form.is_active.value;
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
        .catch(() => {
          this.form.is_active = this.status[0];
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: "ข้อมูลมีอยู่แล้ว",
            life: 5000,
          });
        });
    },

    update() {
      // validation
      if (this.validation() == false) {
        return;
      }
      // change data
      this.form.is_active = this.form.is_active.value;
      axios
        .put(this.url + "/" + this.form.id, this.form)
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
        .catch(() => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: "ข้อมูลมีอยู่แล้ว",
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
      id = this.data.find((x) => x.id == id);
      if (id.is_active == 0) {
        id.is_active = this.status[1];
      } else if (id.is_active == 1) {
        id.is_active = this.status[0];
      }
      this.form = {
        id: id.id,
        code: id.code,
        name: id.name,
        show_id: id.show_id,
        is_active: id.is_active,
      };
      this.display_edit = true;
    },
    close_edit() {
      this.display_edit = false;
    },
    open_delete(id, show_id) {
      this.form.show_id = show_id;

      id = this.data.find((x) => x.id == id);
      this.form.id = id.id;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
