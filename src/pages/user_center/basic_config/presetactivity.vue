<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="กิจกรรม" :pages="breadcrumb" />

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
            <h1 class="text-2xl mb-0 text-600">กิจกรรม</h1>
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
          currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
        >
          <Column
            field="show_id"
            header="ลำดับ"
            class="text-center"
            :sortable="true"
          ></Column>
          <!-- <Column
              field="PresetActivityID"
              header="รหัสกิจกรรม"
              class="text-center"
              :sortable="true"
            ></Column> -->
          <Column
            field="PresetActivityName"
            header="ชื่อกิจกรรม"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="PresetActivityFor"
            header="กิจกรรมสำหรับ"
            class="text-center"
            :sortable="true"
          ></Column>
          <!-- <Column
              field="AnimalTypes.AnimalTypeName"
              header="ชนิดสัตว์"
              class="text-center"
              :sortable="true"
            ></Column> -->
          <Column header="ชนิดสัตว์" class="text-center">
            <template #body="slotProp">
              <span v-for="item in slotProp.data.AnimalTypes" :key="item.id">
                {{ item }} {{}}
              </span>
            </template>
          </Column>

          <Column field="isActive" header="สถานะ" class="text-center">
            <template #body="slotProps">
              <div
                v-if="
                  slotProps.data.isActive == 1 ||
                  slotProps.data.isActive == status[0]
                "
              >
                <Tag class="w-full" severity="success">เปิดใช้งาน</Tag>
              </div>
              <div v-else>
                <Tag class="w-full bg-gray-500">ปิดใช้งาน</Tag>
              </div>
            </template>
          </Column>
          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <Button
                label="แก้ไข"
                icon="pi pi-pencil"
                class="p-button-warning text-center mr-1"
                @click="open_edit(slotProps.data.PresetActivityID)"
              />
              <Button
                label="ลบ"
                icon="pi pi-trash"
                class="p-button-danger text-center ml-1"
                @click="
                  open_delete(
                    slotProps.data.PresetActivityID,
                    slotProps.data.show_id
                  )
                "
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <!-- end main page -->
    <!-- Add Dialog -->
    <Dialog
      header="เพิ่มข้อมูล"
      v-model:visible="display_add"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2"> ชื่อกิจกรรม </label>
              <InputText
                type="text"
                class="w-full"
                v-model="form.PresetActivityName"
                :class="{ 'p-invalid': !form.PresetActivityName && valid }"
              />
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                โปรแกรมสำหรับ
              </label>
              <Dropdown
                class="w-full"
                :options="PresetActivityFor"
                optionLabel="name"
                :showClear="true"
                :filter="true"
                placeholder="เลือกโปรแกรมสำหรับ"
                v-model="form.PresetActivityFor"
                :class="{ 'p-invalid': !form.PresetActivityFor && valid }"
              />

              <!-- <MultiSelect
                class="w-full"
                :options="PresetActivityFor"
                optionLabel="name"
                placeholder="เลือกโปรแกรมสำหรับ"
                display="chip"
                v-model="form.PresetActivityFor"
                :class="{ 'p-invalid': !form.PresetActivityFor && valid }"
              /> -->
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2"
                >ชนิดสัตว์</label
              >

              <MultiSelect
                class="w-full"
                :options="animaltype"
                optionLabel="AnimalTypeName"
                optionValue="AnimalTypeID"
                placeholder="เลือกชนิดสัตว์"
                display="chip"
                v-model="form.AnimalTypeID"
                :class="{ 'p-invalid': !form.AnimalTypeID && valid }"
              />
            </div>

            <div class="field col-12 sm:col-12 lg:col-12">
              <div class="text-xl">สถานะ</div>
              <div
                v-for="isActive of status"
                :key="isActive.key"
                class="field-radiobutton"
              >
                <RadioButton
                  :id="isActive.key"
                  name="category"
                  :value="isActive"
                  v-model="form.isActive"
                />
                <label :for="isActive.key">{{ isActive.name }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="close_add()"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="add()"
          />
        </div>
      </form>
    </Dialog>
    <!-- End Add Dialog -->
    <!-- EDIT Dialog -->
    <Dialog
      header="แก้ไข"
      v-model:visible="display_edit"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <!-- <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">รหัสกิจกรรม</label>
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.GiveBirthHelpCode && valid }"
                v-model="form.GiveBirthHelpCode"
              />
            </div> -->

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2"> ชื่อกิจกรรม </label>
              <InputText
                type="text"
                class="w-full"
                v-model="form.PresetActivityName"
                :class="{ 'p-invalid': !form.PresetActivityName && valid }"
              />
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                โปรแกรมสำหรับ
              </label>
              <Dropdown
                class="w-full"
                :options="PresetActivityFor"
                optionLabel="name"
                :showClear="true"
                :filter="true"
                placeholder="เลือกโปรแกรมสำหรับ"
                v-model="form.PresetActivityFor"
                :class="{ 'p-invalid': !form.PresetActivityFor && valid }"
              />

              <!-- <MultiSelect
                class="w-full"
                :options="PresetActivityFor"
                optionLabel="name"
                placeholder="เลือกโปรแกรมสำหรับ"
                display="chip"
                v-model="form.PresetActivityFor"
                :class="{ 'p-invalid': !form.PresetActivityFor && valid }"
              /> -->
            </div>
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2"
                >ชนิดสัตว์</label
              >

              <MultiSelect
                class="w-full"
                :options="animaltype"
                optionLabel="AnimalTypeName"
                optionValue="AnimalTypeID"
                placeholder="เลือกชนิดสัตว์"
                display="chip"
                v-model="form.AnimalTypeID"
                :class="{ 'p-invalid': !form.AnimalTypeID && valid }"
              />
            </div>
            <div class="field col-12 sm:col-12 lg:col-12">
              <div class="text-xl">สถานะ</div>
              <div
                v-for="isActive of status"
                :key="isActive.key"
                class="field-radiobutton"
              >
                <RadioButton
                  :id="isActive.key"
                  name="category"
                  :value="isActive"
                  v-model="form.isActive"
                />
                <label :for="isActive.key">{{ isActive.name }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="close_edit()"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="update()"
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
          >คุณต้องการลบข้อมูลลำดับที่ {{ form.show_id }} ใช่หรือไม่</span
        >
      </div>
      <template #footer>
        <div class="col-12 text-center flex justify-content-between">
          <Button
            label="ยกเลิก"
            @click="close_delete()"
            class="p-button-secondary w-full mr-3"
          />
          <Button
            label="ยืนยัน"
            @click="remove()"
            class="p-button-danger w-full ml-3"
          />
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
      url: "/preset-activity",
      apiAnimalTypeID: "/animal-type?isActive=1",
      breadcrumb: [
        { label: "ข้อมูลพื้นฐานระบบ", to: "/user_center/dashboard" },
        { label: "กิจกรรม", to: "" },
      ],
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      animaltype: [],
      PresetActivityFor: [
        {
          id: "D",
          name: "ตัวให้ (Donor)",
        },
        {
          id: "R",
          name: "ตัวรับ (Recipient)",
        },
      ],

      // load
      data: [],
      isLoading: false,
      // form
      valid: false,
      form: {
        isActive: "",
      },

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

    axios.get(this.apiAnimalTypeID).then((response) => {
      this.animaltype = response.data.rows;
    });
  },
  methods: {
    clear() {
      this.form = {
        isActive: this.status[0],
      };
      this.valid = false;
    },
    validation() {
      if (
        !this.form.PresetActivityName ||
        !this.form.AnimalTypeID ||
        !this.form.PresetActivityFor
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
      axios.get(this.url).then((response) => {
        this.data = response.data.rows;
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].show_id = i + 1;
        }
      });
    },
    add() {
      // validation
      if (this.validation() == false) {
        return;
      }
      // change data
      this.form.isActive = this.form.isActive.value;

      // for (let i = 0; i < this.form.PresetActivityFor.length; i++) {
      //   this.form.PresetActivityFor[i] = this.form.PresetActivityFor[i].id;
      // }
      this.form.PresetActivityFor = this.form.PresetActivityFor.id;

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
        .put(this.url + "/" + this.form.PresetActivityID, this.form)
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
      id = this.data.find((x) => x.PresetActivityID == id);
      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      let idtmp = [];

      if (id.PresetActivityFor == "D") {
        idtmp.PresetActivityFor = this.PresetActivityFor[0];
      } else if (id.PresetActivityFor == "R") {
        idtmp.PresetActivityFor = this.PresetActivityFor[1];
      }

      // console.log(id.PresetActivityFor);
      // console.log(this.PresetActivityFor[0]);
      // console.log(this.PresetActivityFor[1]);
      // console.log(idtmp.PresetActivityFor);

      this.form = {
        PresetActivityID: id.PresetActivityID,
        PresetActivityName: id.PresetActivityName,
        PresetActivityFor: idtmp.PresetActivityFor,
        AnimalTypeID: id.AnimalTypeID,
        show_id: id.show_id,
        isActive: id.isActive,
      };
      this.display_edit = true;
    },
    close_edit() {
      this.display_edit = false;
    },
    open_delete(id, show_id) {
      //console.log(id + " " + show_id);
      this.form.id = id;
      this.form.show_id = show_id;
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
