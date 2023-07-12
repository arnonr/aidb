<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="จังหวัด" :pages="breadcrumb" />

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
            <h1 class="text-2xl mb-0 text-600">จังหวัด</h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button @click="open_add" label="เพิ่มข้อมูล" icon="pi pi-plus" class="p-button-primary" />
          </div>
        </div>
        <DataTable class="text-sm" :value="data" :paginator="true" :rows="10" :loading="isLoading"
          v-model:filters="search"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
          currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}">
          <Column field="show_id" header="ลำดับ" class="text-center" :sortable="true"></Column>
          <Column field="ProvinceCode" header="รหัสจังหวัด" class="text-center" :sortable="true"></Column>
          <Column field="ProvinceName" header="ชื่อจังหวัด (ภาษาไทย)" class="text-center" :sortable="true"></Column>
          <Column field="ProvinceNameEN" header="ชื่อจังหวัด (ภาษาอังกฤษ)" class="text-center" :sortable="true">
          </Column>
          <Column field="Region.RegionName" header="ภูมิภาค" class="text-center" :sortable="true"></Column>
          <Column field="OrganizationZone.OrganizationZoneName" header="เขตพื้นที่" class="text-center"
            :sortable="true"></Column>
          <Column field="AIZone.AIZoneName" header="ศูนย์วิจัย" class="text-center" :sortable="true"></Column>

          <Column field="isActive" header="สถานะ" class="text-center">
            <template #body="slotProps">
              <div v-if="
                slotProps.data.isActive == 1 ||
                slotProps.data.isActive == status[0]
              ">
                <Tag class="w-full" severity="success">เปิดใช้งาน</Tag>
              </div>
              <div v-else>
                <Tag class="w-full bg-gray-500">ปิดใช้งาน</Tag>
              </div>
            </template>
          </Column>
          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <Button label="แก้ไข" icon="pi pi-pencil" class="p-button-warning text-center mb-2 w-full"
                @click="open_edit(slotProps.data.ProvinceID)" />
              <Button label="ลบ" icon="pi pi-trash" class="p-button-danger text-center w-full" @click="
                open_delete(
                  slotProps.data.ProvinceID,
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
    <Dialog header="เพิ่มข้อมูล" v-model:visible="display_add" :style="{ width: '50vw' }" :modal="true">
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">รหัสจังหวัด</label>
              <InputText type="text" class="w-full" :class="{ 'p-invalid': !form.ProvinceCode && valid }"
                v-model="form.ProvinceCode" />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">
                ชื่อจังหวัด (ภาษาไทย)
              </label>
              <InputText type="text" class="w-full" v-model="form.ProvinceName"
                :class="{ 'p-invalid': !form.ProvinceName && valid }" />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">
                ชื่อจังหวัด (ภาษาอังกฤษ)
              </label>
              <InputText type="text" class="w-full" v-model="form.ProvinceNameEN"
                :class="{ 'p-invalid': !form.ProvinceNameEN && valid }" />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">ภูมิภาค</label>
              <Dropdown class="w-full" placeholder="เลือกภูมิภาค" optionLabel="RegionName" optionValue="RegionID"
                v-model="form.RegionID" :class="{ 'p-invalid': !form.RegionID && valid }" :options="regione"
                :filter="true" />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">ศูนย์วิจัย</label>
              <Dropdown class="w-full" placeholder="เลือกศูนย์วิจัย" optionLabel="AIZoneName" optionValue="AIZoneID"
                v-model="form.AIZoneID" :class="{ 'p-invalid': !form.AIZoneID && valid }" :options="aizone"
                :filter="true" />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">เขตพื้นที่</label>
              <Dropdown class="w-full" placeholder="เลือกเขตพื้นที่" optionLabel="OrganizationZoneName"
                optionValue="OrganizationZoneID" v-model="form.OrganizationZoneID"
                :class="{ 'p-invalid': !form.OrganizationZoneID && valid }" :options="organizationzone"
                :filter="true" />
            </div>

            <div class="field col-12 sm:col-12 lg:col-12">
              <div class="text-xl">สถานะ</div>
              <div v-for="isActive of status" :key="isActive.key" class="field-radiobutton">
                <RadioButton :id="isActive.key" name="category" :value="isActive" v-model="form.isActive" />
                <label :for="isActive.key">{{ isActive.name }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button label="ยกเลิก" class="p-button-secondary w-full mr-3" @click="close_add()" />
          <Button label="บันทึกข้อมูล" class="ml-3 p-button-info w-full" @click="add()" />
        </div>
      </form>
    </Dialog>
    <!-- End Add Dialog -->
    <!-- EDIT Dialog -->
    <Dialog header="แก้ไข" v-model:visible="display_edit" :style="{ width: '50vw' }" :modal="true">
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">รหัสจังหวัด</label>
              <InputText type="text" class="w-full" :class="{ 'p-invalid': !form.ProvinceCode && valid }"
                v-model="form.ProvinceCode" />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">
                ชื่อจังหวัด (ภาษาไทย)
              </label>
              <InputText type="text" class="w-full" v-model="form.ProvinceName"
                :class="{ 'p-invalid': !form.ProvinceName && valid }" />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">
                ชื่อจังหวัด (ภาษาอังกฤษ)
              </label>
              <InputText type="text" class="w-full" v-model="form.ProvinceNameEN"
                :class="{ 'p-invalid': !form.ProvinceNameEN && valid }" />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">ภูมิภาค</label>
              <Dropdown class="w-full" placeholder="เลือกภูมิภาค" optionLabel="RegionName" optionValue="RegionID"
                v-model="form.RegionID" :class="{ 'p-invalid': !form.RegionID && valid }" :options="regione"
                :filter="true" />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">ศูนย์วิจัย</label>
              <Dropdown class="w-full" placeholder="เลือกศูนย์วิจัย" optionLabel="AIZoneName" optionValue="AIZoneID"
                v-model="form.AIZoneID" :class="{ 'p-invalid': !form.AIZoneID && valid }" :options="aizone"
                :filter="true" />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">เขตพื้นที่</label>
              <Dropdown class="w-full" placeholder="เลือกเขตพื้นที่" optionLabel="OrganizationZoneName"
                optionValue="OrganizationZoneID" v-model="form.OrganizationZoneID"
                :class="{ 'p-invalid': !form.OrganizationZoneID && valid }" :options="organizationzone"
                :filter="true" />
            </div>

            <div class="field col-12 sm:col-12 lg:col-12">
              <div class="text-xl">สถานะ</div>
              <div v-for="isActive of status" :key="isActive.key" class="field-radiobutton">
                <RadioButton :id="isActive.key" name="category" :value="isActive" v-model="form.isActive" />
                <label :for="isActive.key">{{ isActive.name }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button label="ยกเลิก" class="p-button-secondary w-full mr-3" @click="close_edit()" />
          <Button label="บันทึกข้อมูล" class="ml-3 p-button-info w-full" @click="update()" />
        </div>
      </form>
    </Dialog>
    <!-- End EDIT Dialog -->
    <!-- Start Delete Dialog -->
    <Dialog header="ตรวจสอบข้อมูล" v-model:visible="display_delete" :style="{ width: '350px' }" :modal="true">
      <div class="confirmation-content text-center">
        <i class="pi pi-trash" style="font-size: 5rem" />
        <br />
        <span class="text-xl">คุณต้องการลบข้อมูลลำดับที่ {{ form.show_id }} ใช่หรือไม่</span>
      </div>
      <template #footer>
        <div class="col-12 text-center flex justify-content-between">
          <Button label="ยกเลิก" @click="close_delete()" class="p-button-secondary w-full mr-3" />
          <Button label="ยืนยัน" @click="remove()" class="p-button-danger w-full ml-3" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import { FilterMatchMode } from "primevue/api";
import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      url: "/province",
      getRegione: "/region",
      getOrganizationZone: "/organization-zone",
      getAIZone: "/ai-zone",
      breadcrumb: [
        { label: "ข้อมูลพื้นฐานระบบ", to: "/user_center/dashboard" },
        { label: "จังหวัด", to: "" },
      ],
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },

      // load
      data: [],
      isLoading: false,

      // form
      valid: false,
      form: {
        ProvinceID: "",
        ProvinceCode: "",
        ProvinceName: "",
        ProvinceNameEN: "",
        RegionID: "",
        OrganizationZoneID: "",
        AIZoneID: "",
        isActive: "",
      },

      regione: [],
      organizationzone: [],
      aizone: [],

      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],

      //  cancel requests
      controller: new AbortController(),

      // Modal
      display_add: false,
      display_edit: false,
      display_delete: false,
    };
  },
  mounted() {
    this.load();
    this.form.isActive = this.status[0];
  },
  methods: {
    clear() {
      this.form = {
        ProvinceID: "",
        ProvinceCode: "",
        ProvinceName: "",
        ProvinceNameEN: "",
        RegionID: "",
        OrganizationZoneID: "",
        AIZoneID: "",
        isActive: this.status[0],
      };
      this.valid = false;
    },
    validation() {
      if (
        !this.form.ProvinceCode ||
        !this.form.ProvinceName ||
        !this.form.RegionID ||
        !this.form.OrganizationZoneID ||
        !this.form.AIZoneID
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
      axios
        .get(this.url, {
          //  cancel requests
          signal: this.controller.signal,
        })
        .then((response) => {
          this.data = response.data.rows;
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].show_id = i + 1;
          }
        })
        .finally(() => {
          this.isLoading = false;
        });

      // ดึงข้อมูลภูมิภาค
      axios.get(this.getRegione).then((response) => {
        this.regione = response.data.rows;
      });

      // ดึงข้อมูลเขตพื้นที่
      axios.get(this.getOrganizationZone).then((response) => {
        this.organizationzone = response.data.rows;
      });

      // ดึงข้อมูลศูนย์วิจัย
      axios.get(this.getAIZone).then((response) => {
        this.aizone = response.data.rows;
      });
    },
    add() {
      // validation
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

      // change data
      this.form.isActive = this.form.isActive.value;
      axios
        .put(this.url + "/" + this.form.ProvinceID, this.form)
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
      id = this.data.find((x) => x.ProvinceID == id);
      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      this.form = {
        ProvinceID: id.ProvinceID,
        ProvinceCode: id.ProvinceCode,
        ProvinceName: id.ProvinceName,
        ProvinceNameEN: id.ProvinceNameEN,
        AIZoneID: id.AIZoneID,
        RegionID: id.RegionID,
        OrganizationZoneID: id.OrganizationZoneID,
        show_id: id.show_id,
        isActive: id.isActive,
      };
      this.display_edit = true;
    },
    close_edit() {
      this.display_edit = false;
    },
    open_delete(id, show_id) {
      this.form.show_id = show_id;
      this.form.id = id;
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
