<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle :title="name" :pages="breadcrumb" />

      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหา</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />
          <InputText class="w-full" type="text" v-model="search" :placeholder="'ค้นหาด้วยชื่อ' + name" />
        </span>
      </div>
      <div class="mt-5 card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">{{ name }}</h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button @click="open()" label="เพิ่มข้อมูล" icon="pi pi-plus" class="p-button-primary" />
          </div>
        </div>
        <DataTable class="text-sm" :value="data" :loading="isLoading"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          responsiveLayout="scroll" currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
          @sort="sort($event)">
          <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field" class="text-center"
            :sortable="true">
          </Column>
          <Column field="isActive" header="สถานะ" class="text-center" :sortable="true">
            <template #body="slotProps">
              <div v-if="
                slotProps.data.isActive == '1' ||
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
              <Button label="แก้ไข" icon="pi pi-pencil" class="p-button-warning text-center mr-1"
                @click="edit(slotProps.index + 1)" />
              <Button label="ลบ" icon="pi pi-trash" class="p-button-danger text-center ml-1"
                @click="open_delete(slotProps.index + 1)" />
            </template>
          </Column>
        </DataTable>
        <Paginator @page="page($event)" :rows="15" :totalRecords="total"></Paginator>
      </div>

    </div>
    <Dialog :header="formheader + name" v-model:visible="display" :style="{ width: '50vw' }" :modal="true"
      v-on:hide="clear()">
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <!-- เปลี่ยน Field -->
            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">รหัสอำเภอ</label>
              <InputText type="text" class="w-full" :class="{ 'p-invalid': !data[index].AmphurCode && valid }"
                v-model="data[index].AmphurCode" />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">
                ชื่ออำเภอ (ภาษาไทย)
              </label>
              <InputText type="text" class="w-full" v-model="data[index].AmphurName"
                :class="{ 'p-invalid': !data[index].AmphurName && valid }" />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">
                ชื่ออำเภอ (ภาษาอังกฤษ)
              </label>
              <InputText type="text" class="w-full" v-model="data[index].AmphurNameEN"
                :class="{ 'p-invalid': !data[index].AmphurNameEN && valid }" />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-sm font-bold mb-2">จังหวัด</label>
              <Dropdown class="w-full" placeholder="เลือกจังหวัด" optionLabel="ProvinceName" optionValue="ProvinceID"
                v-model="data[index].ProvinceID" :class="{ 'p-invalid': !data[index].ProvinceID && valid }"
                :options="province" :filter="true" @filter="filterprovince($event)" />
            </div>

            <!-- สิ้นสุด -->
            <div class="field col-12 sm:col-12 lg:col-12">
              <div class="text-xl">สถานะ</div>
              <div v-for="isActive of status" :key="isActive.key" class="field-radiobutton">
                <RadioButton :id="isActive.key" name="isActive" :value="isActive" v-model="data[this.index].isActive" />
                <label :for="isActive.key">{{ isActive.name }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button label="ยกเลิก" class="p-button-secondary w-full mr-3" @click="close()" />
          <Button label="บันทึกข้อมูล" class="ml-3 p-button-info w-full" @click="add()" />
        </div>
      </form>
    </Dialog>
    <Dialog header="ตรวจสอบข้อมูล" v-model:visible="display_delete" :style="{ width: '350px' }" :modal="true">
      <div class="confirmation-content text-center">
        <i class="pi pi-trash" style="font-size: 5rem" />
        <br />
        <span class="text-xl">คุณต้องการลบ{{ name }}ลำดับที่
          {{ data[index].show_id }} ใช่หรือไม่</span>
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
import PageTitle from "@/components/PageTitle.vue";
export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      // เปลี่ยน API
      url: "/amphur",
      getprovince: "/province",
      // เปลี่ยน ID
      id: "AmphurID",
      // เปลี่ยน ชื่อ
      name: "อำเภอ",
      // เปลี่ยน Field
      columns: [
        {
          field: "show_id",
          header: "ลำดับที่",
        },
        {
          field: "AmphurCode",
          header: "รหัสอำเภอ",
        },
        {
          field: "AmphurName",
          header: "ชืออำเภอ(ภาษาไทย)",
        },
        {
          field: "AmphurNameEN",
          header: "ชื่ออำเภอ(ภาษาอังกฤษ)",
        },
        {
          field: "Province.ProvinceName",
          header: "จังหวัด",
        },
      ],
      // เปลี่ยน selection
      province: [],

      // Static Data
      breadcrumb: [
        { label: "ข้อมูลพื้นฐานระบบ", to: "/user_center/dashboard" },
        { label: "", to: "" },
      ],
      status: [
        { name: "เปิดการใช้งาน", key: "A", value: 1 },
        { name: "ปิดการใช้งาน", key: "B", value: 0 },
      ],
      isLoading: false,
      search: "",
      total: null,
      data: [],
      valid: false,
      index: null,
      controller: new AbortController(),
      display: false,
      display_delete: false,
      start: false,
      temp: null,
      curpage: 0,
      formheader: "",
      isSearch: false,
      sortField: "",
      sortOrder: "",
      //เปลี่ยน เช็คselection กับ selection search
      isprovince: false,
      searchprovince: "",
    };
  },
  mounted() {
    this.load();
    this.breadcrumb[1].label = this.name;
  },
  watch: {
    search() {
      if (this.isSearch == false) {
        this.isSearch = true;
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isSearch = false;
        }, 1500);
      }
    },
  },
  methods: {
    //เปลี่ยน ค้นหา province
    filterprovince($event) {
      this.searchprovince = $event.value;
      if (this.isprovince == false) {
        this.isprovince = true;
        setTimeout(() => {
          this.loadprovince();
          this.isprovince = false;
        }, 1500);
      }
    },
    //เปลี่ยน ดึงข้อมูลค้นหา province
    loadprovince() {
      axios
        .get(this.getprovince + "?ProvinceName=" + this.searchprovince)
        .then((response) => {
          this.province = response.data.rows;
        });
    },
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
    page($event) {
      this.curpage = $event.page + 1;
      this.load();
    },
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
      //เปลี่ยน ล้างค่า search selection
      this.searchprovince = "";
    },
    validation() {
      for (let x in this.columns) {
        if (this.data[this.index][this.columns[x].field] == "" && x != 0) {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: "กรุณากรอกข้อมูล",
            life: 5000,
          });
          this.valid = true;
          return false;
        }
      }
      return true;
    },
    load_selection() {
      // เปลี่ยน ดึงข้อมูลเมื่อกดปุ่มเพิ่มเท่านั้น
      axios
        .get(this.getprovince, { signal: this.controller.signal })
        .then((response) => {
          this.province = response.data.rows;
        });
    },
    load() {
      this.isLoading = true;
      let url = this.url + "?size=15";
      url += "&page=";
      if (this.curpage) {
        url += this.curpage;
      } else if (this.search) {
        // เปลี่ยน field ที่ส่งไปค้นหา
        url += "&AmphurName=" + this.search;
      } else if (this.sortField && this.sortOrder) {
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
        })
        .finally(() => {
          this.isLoading = false;
          this.start = true;
        });
    },
    add() {
      if (this.validation() == false) {
        return;
      }
      if (
        this.index == this.data.length - 1 &&
        this.data[this.index].CreatedUserID == ""
      ) {
        this.data[this.index].isActive = this.data[this.index].isActive.value;
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
            this.data[this.index].isActive = this.status[0];
            this.$toast.add({
              severity: "error",
              summary: "ล้มเหลว",
              detail: err.response.data.error.message,
              life: 5000,
            });
          });
      } else if (this.index < this.data.length) {
        if (this.validation() == false) {
          return;
        }
        this.data[this.index].isActive = this.data[this.index].isActive.value;
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
    open() {
      this.load_selection();
      this.index = this.data.length;
      this.formheader = "เพิ่มข้อมูล";
      this.data.push({});
      for (let i in this.data[0]) {
        this.data[this.index][i] = "";
      }
      this.data[this.index]["isActive"] = this.status[0];
      this.display = true;
    },
    edit(id) {
      this.load_selection();
      this.index = id - 1;
      this.formheader = "แก้ไขข้อมูล";
      this.temp = JSON.parse(JSON.stringify(this.data[this.index]));
      if (this.data[this.index].isActive == 0) {
        this.data[this.index].isActive = this.status[1];
      } else if (this.data[this.index].isActive == 1) {
        this.data[this.index].isActive = this.status[0];
      }
      this.display = true;
    },
    close() {
      this.display = false;
    },
    open_delete(id) {
      this.index = id - 1;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>