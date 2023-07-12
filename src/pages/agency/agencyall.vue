<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle :title="name" :pages="breadcrumb" />
      <div>
        <div class="card mb-5">
          <div class="grid">
            <div class="col-12">
              <h1 class="text-xl mb-4 text-500">
                เครื่องมือช่วยค้นหาทะเบียนหน่วยงาน
              </h1>
            </div>
            <div class="col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                ค้นหา</label
              >
              <InputText
                class="w-full"
                type="text"
                v-model="search.OrganizationName"
                placeholder="ชื่อหน่วยงาน"
              />
            </div>
            <!-- <Dropdown
              class="w-full"
              placeholder="เลือกภายใต้หน่วยงาน"
              optionLabel="fullname"
              optionValue="id"
              v-model="search.ParentOrganizationID"
              :options="child"
              :filter="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
            /> -->
            <div class="col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                เขตหน่วยงาน</label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="ทั้งหมด"
                :options="selection.OrganizationZone.data"
                optionLabel="OrganizationZoneName"
                optionValue="OrganizationZoneID"
                v-model="search.OrganizationZone"
              />
            </div>
            <div class="col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                ประเภทหน่วยงาน</label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="ทั้งหมด"
                :options="selection.OrganizationType.data"
                optionLabel="OrganizationTypeName"
                optionValue="OrganizationTypeID"
                v-model="search.OrganizationType"
              />
            </div>

            <div class="col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                ภายใต้หน่วยงาน</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกภายใต้หน่วยงาน"
                optionLabel="fullname"
                optionValue="id"
                v-model="search.ParentOrganizationID"
                :options="child"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
              />
            </div>
            <!-- <div class="col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                จังหวัด</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกจังหวัด"
                optionLabel="ProvinceName"
                optionValue="ProvinceID"
                v-model="search.OrganizationProvinceID"
                :options="selection.Province.data"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
                @change="filterAmphur($event)"
              />
            </div> -->
            <div class="col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                สถานะ</label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="ทั้งหมด"
                :options="isActive"
                optionLabel="label"
                optionValue="value"
                v-model="search.isActive"
              />
            </div>
          </div>
        </div>
        <div class="card">
          <div class="grid flex align-items-center mb-5">
            <div class="col-12 md:col-6">
              <h1 class="text-2xl mb-0 text-600">{{ name }}</h1>
            </div>
            <div class="col-12 md:col-6 md:text-right">
              <Button
                label="เพิ่มข้อมูล"
                icon="pi pi-plus"
                class="mb-3 mr-1 p-button-raised p-button-raised p-button-info"
                @click="open()"
              />

              <Button
                label="ดาวน์โหลด"
                icon="pi pi-download"
                class="mb-3 p-button-raised p-button-raised p-button-success"
                @click="exportCSV($event)"
              />
            </div>
          </div>
          <DataTable
            class="text-sm"
            :value="data"
            :rowHover="true"
            :exportable="true"
            ref="dt"
            :loading="isLoading"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            responsiveLayout="scroll"
            currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
            @sort="sort($event)"
          >
            <Column
              v-for="col of columns"
              :field="col.field"
              :header="col.header"
              :key="col.field"
              class="text-center"
              :sortable="true"
              exportFooter="&#8203;"
            >
            </Column>

            <Column
              field="isActive"
              header="สถานะ"
              class="text-center"
              :sortable="true"
              exportFooter="&#8203;"
            >
              <template #body="slotProps">
                <div
                  v-if="
                    slotProps.data.isActive == '1' ||
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
                  type="button"
                  icon="pi pi-ellipsis-v"
                  @click="toggle($event, slotProps.index)"
                  class="p-button-text"
                />
                <Menu ref="menu" :model="items" :popup="true">
                  <template #item="{ item }">
                    <Button
                      v-if="item.label == 'แก้ไข'"
                      :label="item.label"
                      :icon="item.icon"
                      class="p-button-text w-full text-left"
                      @click="edit()"
                    />
                    <Button
                      v-if="item.label == 'ลบ'"
                      :label="item.label"
                      :icon="item.icon"
                      class="p-button-text w-full text-left"
                      @click="open_delete()"
                    />
                  </template>
                </Menu>
              </template>
            </Column>
            <template #empty> ไม่พบข้อมูล </template>
            <template #loading>
              <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
            </template>
          </DataTable>
          <Paginator
            @page="page($event)"
            :rows="15"
            :totalRecords="total"
          ></Paginator>
        </div>
      </div>
    </div>
    <Dialog
      :header="formheader + name"
      v-model:visible="display"
      :style="{ width: '50vw' }"
      :modal="true"
      v-on:hide="clear()"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="grid">
            <div class="field col-6 sm:col-6 lg:col-6">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                รหัสหน่วยงาน
              </label>
              <InputText
                v-model="data[index].OrganizationCode"
                class="w-full"
                :class="{ 'p-invalid': !data[index].OrganizationCode && valid }"
              />
            </div>
            <div class="field col-6 sm:col-6 lg:col-6">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                ชื่อหน่วยงาน
              </label>
              <InputText
                v-model="data[index].OrganizationName"
                class="w-full"
                :class="{ 'p-invalid': !data[index].OrganizationName && valid }"
              />
            </div>
            <div class="field col-6 sm:col-6 lg:col-6">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                ประเภทหน่วยงาน
              </label>
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                v-model="data[index].OrganizationTypeID"
                optionLabel="OrganizationTypeName"
                optionValue="OrganizationTypeID"
                :options="selection.OrganizationType.data"
                class="w-full"
                placeholder="เลือกประเภทหน่วยงาน"
                :class="{
                  'p-invalid': !data[index].OrganizationTypeID && valid,
                }"
              >
              </Dropdown>
            </div>
            <div class="field col-6 sm:col-6 lg:col-6">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                เขตปุศสัตว์
              </label>
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                v-model="data[index].OrganizationZoneID"
                optionLabel="OrganizationZoneName"
                optionValue="OrganizationZoneID"
                :options="selection.OrganizationZone.data"
                class="w-full"
                placeholder="เลือกเขตปุศสัตว์"
                :class="{
                  'p-invalid': !data[index].OrganizationZoneID && valid,
                }"
              >
              </Dropdown>
            </div>
            <div class="field col-6 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ภายใต้หน่วยงาน</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกภายใต้หน่วยงาน"
                optionLabel="fullname"
                optionValue="id"
                v-model="data[index].ParentOrganizationID"
                :options="child"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
                :class="{
                  'p-invalid': !data[index].ParentOrganizationID && valid,
                }"
              />
            </div>
            <div class="field col-6 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ที่อยู่</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].OrganizationAddress"
                :class="{
                  'p-invalid': !data[index].OrganizationAddress && valid,
                }"
              />
            </div>

            <div class="field col-6 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จังหวัด</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกจังหวัด"
                optionLabel="ProvinceName"
                optionValue="ProvinceID"
                v-model="data[index].OrganizationProvinceID"
                :options="selection.Province.data"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
                @change="filterAmphur($event)"
                :class="{
                  'p-invalid': !data[index].OrganizationProvinceID && valid,
                }"
              />
            </div>

            <div class="field col-6 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                อำเภอ/เขต</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกอำเภอ/เขต"
                optionLabel="AmphurName"
                optionValue="AmphurID"
                v-model="data[index].OrganizationAmphurID"
                :options="selection.Amphur.data"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
                @change="filterTumbol($event)"
                :class="{
                  'p-invalid': !data[index].OrganizationAmphurID && valid,
                }"
              />
            </div>
            <div class="field col-6 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำบล/แขวง</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกตำบล/แขวง"
                optionLabel="TumbolName"
                optionValue="TumbolID"
                v-model="data[index].OrganizationTumbolID"
                :options="selection.Tumbol.data"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
                @change="filterZipcode($event)"
                :class="{
                  'p-invalid': !data[index].OrganizationTumbolID && valid,
                }"
              />
            </div>
            <div class="field col-6 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสไปรษณีย์</label
              >
              <InputText
                type="text"
                class="w-full"
                maxlength="5"
                v-model="data[index].OrganizationZipCode"
                :class="{
                  'p-invalid': !data[index].OrganizationZipCode && valid,
                }"
              />
            </div>
            <div class="field col-6 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เบอร์โทรศัพท์</label
              >
              <InputText
                type="text"
                class="w-full"
                maxlength="10"
                v-model="data[index].OrganizationTelNo"
                :class="{
                  'p-invalid': !data[index].OrganizationTelNo && valid,
                }"
              />
            </div>
            <div class="field col-6 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                แฟกซ์</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].OrganizationFaxNo"
                :class="{
                  'p-invalid': !data[index].OrganizationFaxNo && valid,
                }"
              />
            </div>
            <div class="field col-6 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เบอร์มือถือ</label
              >
              <InputText
                type="text"
                class="w-full"
                maxlength="10"
                v-model="data[index].OrganizationMobileNo"
                :class="{
                  'p-invalid': !data[index].OrganizationMobileNo && valid,
                }"
              />
            </div>
            <div class="field col-6 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เว็บไซต์</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].OrganizationWebsite"
                :class="{
                  'p-invalid': !data[index].OrganizationWebsite && valid,
                }"
              />
            </div>
            <div class="field col-6 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                อีเมล</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].OrganizationEmailAddress"
                :class="{
                  'p-invalid': !data[index].OrganizationEmailAddress && valid,
                }"
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
                  name="isActive"
                  :value="isActive.value"
                  v-model="data[this.index].isActive"
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
            @click="close()"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="add()"
          />
        </div>
      </form>
    </Dialog>
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
          >คุณต้องการลบ{{ name }}ลำดับที่
          {{ data[index].show_id }} ใช่หรือไม่</span
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
import PageTitle from "@/components/PageTitle.vue";
export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      // API
      url: "/organization",
      getOrganizationZone: "/organization-zone",
      getOrganizationType: "/organization-type",

      getProvince: "/province",
      getAmphur: "/amphur",
      getTumbol: "/tumbol",
      // ID
      id: "OrganizationID",
      // Name
      name: "ทะเบียนหน่วยงาน",

      // Table Field
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
        {
          field: "OrganizationCode",
          header: "รหัสหน่วยงาน",
        },
        {
          field: "OrganizationName",
          header: "ชื่อหน่วยงาน",
        },
        {
          field: "OrganizationAddress",
          header: "ที่อยู่",
        },
        {
          field: "OrganizationZone.OrganizationZoneName",
          header: "เขต",
        },
        {
          field: "Amphur.AmphurName",
          header: "อำเภอ",
        },
        {
          field: "Tumbol.TumbolName",
          header: "ตำบล",
        },
        {
          field: "Province.ProvinceName",
          header: "จังหวัด",
        },
      ],

      // Selection

      selection: {
        OrganizationZone: {
          data: [],
          form: [],
          Search: "",
        },
        OrganizationType: {
          data: [],
          form: [],
          Search: "",
        },
        Amphur: {
          data: [],
          temp: [],
        },
        Tumbol: {
          data: [],
          temp: [],
        },
        Province: {
          data: [],
          temp: [],
        },
      },

      // Search

      isSearch: false,
      isSelection: false,
      search: {
        OrganizationZone: "",
        OrganizationType: "",
        OrganizationName: "",
        isActive: "",
      },
      filtered: {
        OrganizationName: "",
        Organization: "",
        Username: "",

        OrganizationZone: "",
        OrganizationType: "",
        isActive: "",
      },

      // Static Data

      isLoading: false,
      total: null,
      data: [],
      valid: false,
      index: null,
      display: false,
      display_delete: false,
      temp: null,
      curpage: 0,
      formheader: "",
      sortField: "",
      sortOrder: "",
      child: [],
      isActive: [
        {
          label: "ทั้งหมด",
          value: "",
        },
        {
          label: "ใช้งาน",
          value: "1",
        },
        {
          label: "ไม่ใช้งาน",
          value: "0",
        },
      ],

      // uneditable

      items: [
        {
          label: "แก้ไข",
          icon: "pi pi-pencil",
        },
        {
          label: "ลบ",
          icon: "pi pi-times",
        },
      ],
      breadcrumb: [
        { label: "ข้อมูลพื้นฐานระบบ", to: "/user_center/dashboard" },
        { label: "", to: "" },
      ],
      status: [
        { name: "เปิดการใช้งาน", key: "A", value: 1 },
        { name: "ปิดการใช้งาน", key: "B", value: 0 },
      ],
      approve: [
        { name: "อนุมัติ", key: "A", value: 1 },
        { name: "ไม่อนุมัติ", key: "B", value: 2 },
      ],
      controller: new AbortController(),
    };
  },
  mounted() {
    this.load();
    this.load_selection();
    this.breadcrumb[1].label = this.name;
  },
  watch: {
    // ค้นหา
    "search.OrganizationZone"(val) {
      this.filtered.OrganizationZone = val;
      this.load();
    },
    "search.OrganizationType"(val) {
      this.filtered.OrganizationType = val;
      this.load();
    },
    "search.OrganizationName"(val) {
      this.filtered.OrganizationName = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.ParentOrganizationID"(val) {
      this.filtered.ParentOrganizationID = val;
      this.load();
    },

    // "search.ProvinceID"(val) {
    //   this.filtered.ProvinceID = val;
    //   this.load();
    // },

    "search.isActive"(val) {
      this.filtered.isActive = val;
      this.load();
    },

    "data[index].OrganizationProvinceID"(val) {
      if (val) {
        this.selection.Amphur.data = this.selection.Amphur.temp;
        this.selection.Amphur.data = this.selection.Amphur.data.filter(
          (item) => item.ProvinceID == val
        );
      } else {
        this.selection.Amphur.data = this.selection.Amphur.temp;
      }
    },
    "data[index].OrganizationAmphurID"(val) {
      if (val) {
        this.selection.Tumbol.data = this.selection.Tumbol.temp;
        this.selection.Tumbol.data = this.selection.Tumbol.data.filter(
          (item) => item.TumbolID == val
        );
      } else {
        this.selection.Tumbol.data = this.selection.Tumbol.temp;
      }
    },
  },
  methods: {
    filterAmphur($event) {
      let val = $event.value;
      if (val) {
        this.selection.Amphur.data = this.selection.Amphur.temp;
        this.selection.Amphur.data = this.selection.Amphur.data.filter(
          (item) => item.ProvinceID == val
        );
      } else {
        this.selection.Amphur.data = this.selection.Amphur.temp;
      }
    },
    filterTumbol($event) {
      let val = $event.value;
      if (val) {
        this.selection.Tumbol.data = this.selection.Tumbol.temp;
        this.selection.Tumbol.data = this.selection.Tumbol.data.filter(
          (item) => item.AmphurID == val
        );
      } else {
        this.selection.Tumbol.data = this.selection.Tumbol.temp;
      }
    },
    filterZipcode($event) {
      let val = $event.value;
      if (val) {
        this.data[this.index].OrganizationZipCode =
          this.selection.Tumbol.temp[val].Zipcode;
      } else {
        this.data[this.index].OrganizationZipCode = "";
      }
    },
    // แสดงปุ่ม
    toggle(event, index) {
      try {
        this.$refs.menu.toggle(event);
        this.index = index;
      } catch (e) {
        window.location.reload();
      }
    },

    // sort table
    sort($event) {
      if ($event.sortField !== "show_id") {
        if ($event.sortOrder == 1) {
          this.sortOrder = "asc";
        } else {
          this.sortOrder = "desc";
        }
        this.sortField = $event.sortField;
        this.load();
      }
    },
    // page change
    page($event) {
      this.curpage = $event.page + 1;
      this.load();
    },
    // on modal hide
    clear() {
      if (
        this.index == this.data.length - 1 &&
        !this.data[this.index].CreatedUserID
      ) {
        this.data.splice(this.index, 1);
      } else {
        this.data[this.index] = this.temp;
        this.temp = null;
      }
      this.valid = false;
    },
    // validate
    validation() {
      if (
        !this.data[this.index].OrganizationCode ||
        !this.data[this.index].OrganizationName ||
        !this.data[this.index].OrganizationProvinceID ||
        !this.data[this.index].OrganizationAmphurID ||
        !this.data[this.index].OrganizationTumbolID ||
        !this.data[this.index].OrganizationZipCode ||
        !this.data[this.index].OrganizationAddress
      ) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "กรุณากรอกข้อมูล",
          life: 5000,
        });
        this.valid = true;
        return false;
      }
      this.data[this.index].OrganizationRegisterDate = Date.now();
      return true;
    },
    //load selection
    load_selection() {
      axios
        .get(this.getOrganizationType, { signal: this.controller.signal })
        .then((response) => {
          this.selection.OrganizationType.data = response.data.rows;
        });
      axios
        .get(this.getOrganizationZone, { signal: this.controller.signal })
        .then((response) => {
          this.selection.OrganizationZone.data = response.data.rows;
        });
      axios
        .get(this.getProvince, { signal: this.controller.signal })
        .then((response) => {
          this.selection.Province.data = response.data.rows;
        });
      axios
        .get(this.getAmphur, { signal: this.controller.signal })
        .then((response) => {
          this.selection.Amphur.data = response.data.rows;
          this.selection.Amphur.temp = this.selection.Amphur.data;
        });
      axios
        .get(this.getTumbol, { signal: this.controller.signal })
        .then((response) => {
          this.selection.Tumbol.data = response.data.rows;
          this.selection.Tumbol.temp = this.selection.Tumbol.data;
        });
    },
    // main load
    load() {
      this.isLoading = true;
      let url = this.url + "?size=15";
      url += "&page=";
      if (this.curpage) {
        url += this.curpage;
      }
      if (this.filtered.OrganizationZone) {
        url += "&OrganizationZoneID=" + this.filtered.OrganizationZone;
      }
      if (this.filtered.OrganizationType) {
        url += "&OrganizationTypeID=" + this.filtered.OrganizationType;
      }
      if (this.filtered.OrganizationName) {
        url += "&OrganizationName=" + this.filtered.OrganizationName;
      }

      if (this.filtered.ParentOrganizationID) {
        url += "&ParentOrganizationID=" + this.filtered.ParentOrganizationID;
      }

      // if (this.filtered.ProvinceID) {
      //   url += "&ProvinceID=" + this.filtered.ProvinceID;
      // }

      if (this.filtered.isActive) {
        url += "&isActive=" + this.filtered.isActive;
      }
      if (this.sortField && this.sortOrder) {
        url += "&sortField=" + this.sortField + "&sortOrder=" + this.sortOrder;
      }
      axios
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.total = response.data.total;
          this.data = response.data.rows;

          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
            }
          } else {
            let start = (this.curpage - 1) * 15;
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1 + start;
            }
          }

          this.data.child = this.data.map((item) => {
            return {
              id: item.OrganizationID,
              fullname: item.OrganizationCode + " | " + item.OrganizationName,
            };
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get("/organization", { signal: this.controller.signal })
        .then((response) => {
          this.child = response.data.rows;
          this.child = this.child.map((item) => {
            return {
              id: item.OrganizationID,
              fullname: item.OrganizationCode + " | " + item.OrganizationName,
            };
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // create or update data
    add() {
      if (this.validation() == false) {
        return;
      }
      if (
        this.index == this.data.length - 1 &&
        this.data[this.index].CreatedUserID == ""
      ) {
        //create data
        this.data[this.index].isActive = 1;
        axios
          .post(this.url, this.data[this.index])
          .then(() => {
            this.close();
            this.load();
            this.$toast.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "เพิ่มข้อมูลเสร็จสิ้น",
              life: 5000,
            });
          })
          .catch((err) => {
            this.data[this.index].isActive = 1;
            this.$toast.add({
              severity: "error",
              summary: "ล้มเหลว",
              detail: err.response.data.error.message,
              life: 5000,
            });
          });
      }
      // update data
      else if (this.index < this.data.length) {
        if (this.validation() == false) {
          return;
        }

        axios
          .put(
            this.url + "/" + this.data[this.index][this.id],
            this.data[this.index]
          )
          .then(() => {
            this.close();
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
      }
    },
    // remove data
    remove() {
      axios.delete(this.url + "/" + this.data[this.index][this.id]).then(() => {
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
    // form open add
    open() {
      this.index = this.data.length;
      this.formheader = "เพิ่ม";
      this.data.push({});
      for (let i in this.data[0]) {
        this.data[this.index][i] = "";
      }
      this.data[this.index].isActive = 1;
      this.display = true;
    },
    //form open edit
    edit() {
      this.formheader = "แก้ไข";
      this.temp = JSON.parse(JSON.stringify(this.data[this.index]));
      this.display = true;
    },
    close() {
      this.display = false;
    },
    open_delete() {
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>
