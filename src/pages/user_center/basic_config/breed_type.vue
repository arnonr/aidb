<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="ประเภทสายพันธุ์" :pages="breadcrumb" />

        <div class="card row col bg-primary pb-6">
          <h1 class="text-center text-white">ค้นหา</h1>
          <span class="p-input-icon-right w-full px-5">
            <i class="pi pi-search px-5" />
            <InputText class="w-full" type="text" v-model="search['global'].value" placeholder="ค้นหา" />
          </span>
        </div>
        <div class="mt-5 card">
          <div class="grid flex align-items-center mb-5">
            <div class="col-12 md:col-6">
              <h1 class="text-2xl mb-0 text-600">ประเภทสายพันธุ์</h1>
            </div>
            <div class="col-12 md:col-6 md:text-right">
              <Button @click="open_add" label="เพิ่มข้อมูล" icon="pi pi-plus" class="p-button-primary" />
            </div>
          </div>

          <DataTable class="text-sm" :value="data" :paginator="true" :rows="10" v-model:filters="search"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="show_id" header="ลำดับ" class="text-center" :sortable="true"></Column>
            <Column field="AnimalBreedCode" header="รหัสสายพันธุ์" class="text-center" :sortable="true"></Column>
            <Column field="AnimalBreedShortName" header="ชื่อย่อสายพันธุ์" class="text-center" :sortable="true">
            </Column>
            <Column field="AnimalBreedName" header="ชื่อประเภทสายพันธุ์ (TH)" class="text-center" :sortable="true">
            </Column>
            <Column field="AnimalBreedNameEN" header="ชื่อประเภทสายพันธุ์ (EN)" class="text-center" :sortable="true">
            </Column>
            <Column field="AnimalType.AnimalTypeName" header="ประเภทสัตว์" class="text-center" :sortable="true">
            </Column>
            <Column field="isActive" header="สถานะ" class="text-center">
              <template #body="slotProps">
                <div v-if="
                  slotProps.data.isActive == '1' ||
                  slotProps.data.isActive == status[0]
                ">
                  <Tag class="w-full" severity="success">เปิดการใช้งาน</Tag>
                </div>
                <div v-else>
                  <Tag class="w-full bg-gray-500">ปิดการใช้งาน</Tag>
                </div>
              </template>
            </Column>
            <Column header="จัดการ" class="text-center">
              <template #body="slotProps">
                <Button label="แก้ไข" icon="pi pi-pencil" class="p-button-warning text-center mr-1"
                  @click="open_edit(slotProps.data.AnimalBreedID)" />
                <Button label="ลบ" icon="pi pi-trash" class="p-button-danger text-center ml-1" @click="
                  open_delete(
                    slotProps.data.AnimalBreedID,
                    slotProps.data.show_id
                  )
                " />
              </template>
            </Column>
          </DataTable>
        </div>

    </div>
    <!-- end main page -->
    <!-- Add Dialog -->
    <Dialog :header="title" v-model:visible="display_add" :style="{ width: '50vw' }" :modal="true">
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสสายพันธุ์</label>
              <InputText type="text" class="w-full" :class="{ 'p-invalid': !form.AnimalBreedCode && valid }"
                v-model="form.AnimalBreedCode" />
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อย่อสายพันธุ์</label>
              <InputText type="text" class="w-full" :class="{ 'p-invalid': !form.AnimalBreedShortName && valid }"
                v-model="form.AnimalBreedShortName" />
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อประเภทสายพันธุ์ (TH)
              </label>
              <InputText type="text" class="w-full" :class="{ 'p-invalid': !form.AnimalBreedName && valid }"
                v-model="form.AnimalBreedName" />
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อประเภทสายพันธุ์ (EN)
              </label>
              <InputText type="text" class="w-full" :class="{ 'p-invalid': !form.AnimalBreedNameEN && valid }"
                v-model="form.AnimalBreedNameEN" />
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ประเภทสัตว์
              </label>
              <Dropdown v-model="form.AnimalTypeID" :options="dropdown" optionLabel="AnimalTypeName"
                optionValue="AnimalTypeID" placeholder="เลือกประเภทสัตว์ที่อ้างอิง" class="w-full" />
            </div>
            <div class="field col-12 sm:col-12 lg:col-12">
              <div class="text-xl">สถานะ</div>
              <div v-for="isActive of status" :key="isActive.key" class="field-radiobutton">
                <RadioButton :id="isActive.key" item="category" :value="isActive" v-model="form.isActive" />
                <label :for="isActive.key">{{ isActive.item }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button label="ยกเลิก" class="p-button-secondary w-full mr-3" @click="close_add" />
          <Button label="บันทึกข้อมูล" class="ml-3 p-button-info w-full" @click="add" />
        </div>
      </form>
    </Dialog>
    <!-- End Add Dialog -->
    <!-- EDIT Dialog -->
    <Dialog :header="title" v-model:visible="display_edit" :style="{ width: '50vw' }" :modal="true">
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสสายพันธุ์</label>
              <InputText type="text" class="w-full" :class="{ 'p-invalid': !form.AnimalBreedCode && valid }"
                v-model="form.AnimalBreedCode" />
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อย่อสายพันธุ์</label>
              <InputText type="text" class="w-full" :class="{ 'p-invalid': !form.AnimalBreedShortName && valid }"
                v-model="form.AnimalBreedShortName" />
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อประเภทสายพันธุ์ (TH)
              </label>
              <InputText type="text" class="w-full" :class="{ 'p-invalid': !form.AnimalBreedName && valid }"
                v-model="form.AnimalBreedName" />
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อประเภทสายพันธุ์ (EN)
              </label>
              <InputText type="text" class="w-full" :class="{ 'p-invalid': !form.AnimalBreedNameEN && valid }"
                v-model="form.AnimalBreedNameEN" />
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ประเภทสัตว์
              </label>
              <Dropdown v-model="form.AnimalTypeID" :options="dropdown" optionLabel="AnimalTypeName"
                optionValue="AnimalTypeID" placeholder="เลือกประเภทสัตว์ที่อ้างอิง" class="w-full" />
            </div>
            <div class="field col-12 sm:col-12 lg:col-12">
              <div class="text-xl">สถานะ</div>
              <div v-for="isActive of status" :key="isActive.key" class="field-radiobutton">
                <RadioButton :id="isActive.key" item="category" :value="isActive" v-model="form.isActive" />
                <label :for="isActive.key">{{ isActive.item }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button label="ยกเลิก" class="p-button-secondary w-full mr-3" @click="close_edit" />
          <Button label="บันทึกข้อมูล" class="ml-3 p-button-info w-full" @click="update" />
        </div>
      </form>
    </Dialog>
    <!-- End EDIT Dialog -->
    <!-- Start Delete Dialog -->
    <Dialog header="ตรวจสอบข้อมูล" v-model:visible="display_delete" :style="{ width: '350px' }" :modal="true">
      <div class="confirmation-content text-center">
        <i class="pi pi-trash" style="font-size: 5rem" />
        <br />
        <span class="text-xl">คุณต้องการลบประเภทสายพันธุ์ลำดับที่
          {{ form.show_id }} ใช่หรือไม่</span>
      </div>
      <template #footer>
        <div class="col-12 text-center flex justify-content-between">
          <Button label="ยกเลิก" @click="close_delete" class="p-button-secondary w-full mr-3" />
          <Button label="ยืนยัน" @click="remove" class="p-button-danger w-full ml-3" />
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
      url: "/animal-breed",
      url_type: "/animal-type",
      breadcrumb: [
        { label: "ข้อมูลพื้นฐานระบบ", to: "/user_center/dashboard" },
        { label: "ประเภทสายพันธุ์", to: "" },
      ],
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },

      // load
      data: null,
      isLoading: false,

      //  cancel requests

      controller: new AbortController(),

      // form
      title: null,
      total: null,
      valid: false,
      form: {
        AnimalBreedID: "",
        AnimalBreedCode: "",
        AnimalBreedShortName: "",
        AnimalBreedName: "",
        AnimalBreedNameEN: "",
        AnimalTypeID: "",
        isActive: "",
      },
      selectid: null,

      status: [
        { item: "เปิดการใช้งาน", key: "A", value: 1 },
        { item: "ปิดการใช้งาน", key: "B", value: 0 },
      ],
      selectedCategory: null,
      // Modal
      display_add: false,
      display_edit: false,
      display_delete: false,

      dropdown: [],
    };
  },
  mounted() {
    this.load();
    this.form.isActive = this.status[0];
  },
  methods: {
    clear() {
      this.form = {
        AnimalBreedID: "",
        AnimalBreedCode: "",
        AnimalBreedShortName: "",
        AnimalBreedName: "",
        AnimalBreedNameEN: "",
        AnimalTypeID: "",
        isActive: this.status[0],
      };
      this.valid = false;
    },

    load() {
      axios
        .get(this.url, {
          //  cancel requests
          signal: this.controller.signal,
        })
        .then((data) => {
          this.data = data.data.rows;
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].show_id = i + 1;
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios.get(this.url_type).then((res) => (this.dropdown = res.data.rows));
    },

    validation() {
      if (
        !this.form.AnimalBreedCode ||
        !this.form.AnimalBreedShortName ||
        !this.form.AnimalBreedName ||
        !this.form.AnimalBreedNameEN ||
        !this.form.AnimalTypeID
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
    add() {
      if (this.validation() == false) {
        return;
      }
      // change data
      this.form.isActive = this.form.isActive.value;
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
          this.form.isActive = this.status[0];
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
      // console.log(this.form.id);
      if (this.validation() == false) {
        return;
      }
      // change data
      this.form.isActive = this.form.isActive.value;
      axios
        .put(this.url + "/" + this.form.AnimalBreedID, this.form)
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
      axios.delete(this.url + "/" + this.form.AnimalBreedID).then(() => {
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
      // console.log(this.dropdown);
      this.title = "เพิ่มประเภทสายพันธุ์";
      this.clear();
      this.display_add = true;
    },
    close_add() {
      this.display_add = false;
    },
    open_edit(id) {
      // console.log(id);
      this.title = "แก้ไขประเภทสายพันธุ์";

      id = this.data.find((x) => x.AnimalBreedID == id);

      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }
      this.form = {
        AnimalBreedID: id.AnimalBreedID,
        AnimalBreedCode: id.AnimalBreedCode,
        AnimalBreedShortName: id.AnimalBreedShortName,
        AnimalBreedName: id.AnimalBreedName,
        AnimalBreedNameEN: id.AnimalBreedNameEN,
        AnimalTypeID: id.AnimalTypeID,
        isActive: id.isActive,
      };
      this.display_edit = true;
    },
    close_edit() {
      this.display_edit = false;
    },
    open_delete(id, show_id) {
      this.form.show_id = show_id;
      id = this.data.find((x) => x.AnimalBreedID == id);
      this.form.AnimalBreedID = id.AnimalBreedID;
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
