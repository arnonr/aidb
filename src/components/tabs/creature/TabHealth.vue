<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ข้อมูลสุขภาพ : ฉีดวัคซีน" :pages="breadcrumb" />
      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหาหมายเลขฟาร์ม</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />

          <Dropdown
            class="w-full"
            v-model="form.FarmID"
            :options="Farm.data"
            optionLabel="FarmIdentificationNumber"
            optionValue="FarmID"
            :virtualScrollerOptions="{
              lazy: true,
              onLazyLoad: onLazyLoad,
              itemSize: Farm.total,
              showLoader: true,
              loading: loading,
              delay: 250,
            }"
            :filter="true"
            :showClear="true"
            placeholder="เลือกหมายเลขฟาร์ม"
            @change="load"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>

            <template #option="slotProps">
              <div class="p-dropdown-car-option">
                <span
                  >{{ slotProps.option.FarmIdentificationNumber }} |
                  {{ slotProps.option.FarmName }}
                </span>
              </div>
            </template>
          </Dropdown>
        </span>
      </div>
    </div>
    <div class="col-12">
      <div v-if="this.form.FarmID" class="card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">
              รายการข้อมูลสุขภาพ : ฉีดวัคซีน
            </h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button
              label="เพิ่มข้อมูลฉีดวัคซีน"
              icon="pi pi-plus"
              class="w-full md:w-auto"
              @click="add"
            />
          </div>
        </div>

        <div class="mt-5">
          <DataTable
            class="text-sm"
            :value="data"
            :loading="isLoading"
            @sort="sort($event)"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            responsiveLayout="scroll"
            currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
          >
            <Column
              v-for="col of columns"
              :field="col.field"
              :header="col.header"
              :key="col.field"
              class="text-center"
              :sortable="true"
            >
            </Column>

            <Column header="จัดการ" class="text-center">
              <template #body="slotProps">
                <SplitButton
                  @click="edit(slotProps.data.VaccineActivityID)"
                  label="แก้ไข"
                  icon="pi pi-pencil"
                  class="p-button-sm p-button-outlined p-button-warning"
                  :model="getItems(slotProps.data.VaccineActivityID)"
                >
                </SplitButton>
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
            <span class="text-xl">คุณต้องการลบข้อมูลใช่หรือไม่</span>
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
        <!-- End Delete Dialog -->
      </div>
    </div>
    <!-- Start Details Dialog -->
    <Dialog
      header="รายละเอียดการฉีดวัคซีน"
      v-model:visible="display_view"
      :style="{ width: '60vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-4">
              <!-- <label class="block text-600 text-sm font-bold mb-2">
                    หมายเลขทะเบียนฟาร์ม: , สมหมายจินดาเพ็ง(วีระ) 
                  </label> -->

              <span class="inline pr-2">รหัสฟาร์ม :</span>
              {{ form.FarmIdentificationNumber }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2"> ชื่อฟาร์ม :</span>
              {{ form.FarmName }}
            </div>

            <div class="field col-12 sm:col-4">
              <span class="inline pr-2"> รหัสวัคซีน :</span>
              {{ form.VaccineCode }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2"> ชนิดวัคซีน :</span>
              {{ form.VaccineName }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2"> Lot ที่ :</span>
              {{ form.Lot }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2">จุดประสงค์การฉีดวัคซีน :</span>
              {{ form.VaccineObjectiveName }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2">วันที่ฉีด :</span>
              {{ form.VaccineActivityDate }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2">วันที่ฉีดครั้งต่อไป :</span>

              {{ form.VaccineNextDate }}
            </div>
            <div class="field col-12 sm:col-4">
              <span class="inline pr-2"> ผู้ฉีดวัคซีน :</span>
              {{ form.StaffGivenName }}
            </div>

            <!-- <div class="field col-12 sm:col-4">
                  <span class="inline pr-2"> ชื่อฟาร์ม :</span>
                     {{  form.AnimalFarmName }}
                </div> -->

            <div class="field col-12 sm:col-12">
              <h4>จำนวนสัตว์ที่ทำรายการ {{ view.length }} ตัว</h4>
              <div class="mt-5">
                <DataTable
                  class="text-sm"
                  :value="view"
                  :paginator="true"
                  :rows="10"
                  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  :rowsPerPageOptions="[10, 20, 50]"
                  responsiveLayout="scroll"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                >
                  <Column
                    field="show_id"
                    header="ลำดับ"
                    class="text-center"
                  ></Column>
                  <Column
                    field="AnimalEarID"
                    header="หมายเลขสัตว์"
                    class="text-center"
                  ></Column>
                  <Column
                    field="AnimalName"
                    header="ชื่อสัตว์"
                    class="text-center"
                  ></Column>
                  <Column
                    field="AnimalBirthDate"
                    header="วัน/เดือน/ปีเกิด"
                    class="text-center"
                  ></Column>
                  <Column
                    field="AnimalAge"
                    header="อายุ"
                    class="text-center"
                  ></Column>
                  <Column
                    field="AnimalBreedAll"
                    header="สายพันธุ์"
                    class="text-center"
                  ></Column>
                  <Column
                    field="AnimalStatusID"
                    header="สถานะ"
                    class="text-center"
                    :sortable="true"
                  >
                    <template #body="slotProps">
                      <div v-for="item in animal_status.data" :key="item.id">
                        <div
                          v-if="
                            item.AnimalStatusID == slotProps.data.AnimalStatusID
                          "
                        >
                          {{ item.AnimalStatusName }}
                        </div>
                      </div>
                    </template>
                  </Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </form>
      <template #footer> </template>
    </Dialog>
    <!-- End Details Dialog -->
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import router from "../../router";
import { FilterMatchMode } from "primevue/api";

import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      url: "/vaccine-activity",
      id: "VaccineActivityID",
      name: "วัคซีน",
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },

        {
          field: "VaccineActivityDate",
          header: "วันที่ฉีดวัคซีน",
        },
        {
          field: "Vaccine.VaccineName",
          header: "ชนิดวัคซีน",
        },
        {
          field: "Lot",
          header: "Lot",
        },
        {
          field: "VaccineObjectiveName",
          header: "วัตถุประสงค์การฉีด",
        },
        {
          field: "VaccineNextDate",
          header: "วันที่ฉีดครั้งต่อไป",
        },
        {
          field: "Animal.length",
          header: "จำนวนสัตว์ที่ฉีดวัคซีน",
        },
      ],

      // items: [
      //   {
      //     label: "ดูข้อมูลฟาร์ม",
      //     icon: "pi pi-eye",
      //   },

      //   {
      //     label: "ลบ",
      //     icon: "pi pi-times",
      //   },
      // ],
      isLoading: false,
      curpage: 0,
      display_view: false,
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },

      // total: null,
      // data: [],
      // valid: false,
      // index: null,
      // display: false,
      display_delete: false,
      // temp: [],
      // formheader: "",
      // sortField: "",
      // sortOrder: "",
      view: [],
      breadcrumb: [{ label: "", to: "" }],
      animal_status: [],
      Farm: [],
      form: [],
      controller: new AbortController(),
    };
  },
  mounted() {
    this.load();

    dayjs.extend(buddhistEra);
    this.breadcrumb[0].label = this.name;
    axios
      .get("/farm", { signal: this.controller.signal })
      .then((res) => {
        this.Farm.data = res.data.rows;
        this.Farm.total = res.data.total;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  watch: {},
  methods: {
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
    load() {
      this.isLoading = true;
      let url = this.url + "?size=15";
      url += "&page=";
      if (this.curpage) {
        url += this.curpage;
      }
      if (this.form.FarmID) {
        url += "&FarmID=" + this.form.FarmID;
        // console.log(url);
      }

      axios
        .get(url, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.total = response.data.total;
          this.data = response.data.rows;
          this.data.show = response.data.rows;
          // console.log(this.data);
          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
              if (this.data[i].VaccineActivityDate != null) {
                this.data[i].VaccineActivityDate = dayjs(
                  this.data[i].VaccineActivityDate
                )
                  .locale(locale)
                  .format("DD MMM BB");
              }
              if (this.data[i].VaccineNextDate != null) {
                this.data[i].VaccineNextDate = dayjs(
                  this.data[i].VaccineNextDate
                )
                  .locale(locale)
                  .format("DD MMM BB");
              }
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
        });
    },
    edit(id) {
      let getID = this.data.find((item) => item.VaccineActivityID == id);
      router.push({
        path: `/activity/vaccine/edit/${getID.VaccineActivityID}`,
      });
    },
    getItems(id) {
      const items = [
        {
          label: "รายละเอียด",
          icon: "pi pi-eye",
          command: () => {
            // this.open_view(id);
            this.$router.push("/activity/vaccine/view/" + id);
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
    open_view(id) {
      id = this.data.find((x) => x.VaccineActivityID == id);
      // id = data.find((x) => x.VaccineActivityID == id);
      this.view = id.Animal;
      // console.log(this.view);
      for (let i = 0; i < id.Animal.length; i++) {
        id.Animal[i].show_id = i + 1;
      }

      axios
        .get("/animal-status", { signal: this.controller.signal })
        .then((res) => {
          this.animal_status.data = res.data.rows;
          this.animal_status.total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
        });
      this.form = {
        VaccineActivityID: id.VaccineActivityID,
        VaccineCode: id.Vaccine.VaccineCode,
        VaccineObjectiveName: id.VaccineObjective.VaccineObjectiveName,
        AnimalIdentificationID: id.Animal.AnimalIdentificationID,
        VaccineActivityDate: id.VaccineActivityDate,
        VaccineNextDate: id.VaccineNextDate,
        VaccineName: id.Vaccine.VaccineName,
        StaffGivenName: id.Staff.StaffGivenName,
        Lot: id.Lot,
        AnimalName: id.Animal.AnimalName,

        FarmIdentificationNumber: id.Farm.FarmIdentificationNumber,
        FarmName: id.Farm.FarmName,

        // AnimalFarmName: id.Animal.AnimalFarmName,
      };

      this.display_view = true;
    },
    close_view() {
      this.display_view = false;
    },

    open_delete(id) {
      this.data.id = id;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },

    remove() {
      axios.delete("vaccine-activity/" + this.data.id).then(() => {
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
    add() {
      // if (this.form.FarmID == null) {

      //   router.push("/activity/vaccine/add");

      // }

      const id = this.form.FarmID;

      let item = this.data.find((id) => id.FarmID == this.form.FarmID);
      const farm = item.Farm.FarmIdentificationNumber;
      // this.$router.push({
      //   name: "vaccuineadd",
      //   params: { id },
      // });vaccuineaddnoid

      router.push({ name: "vaccuineadd", params: { id, farm } });
    },
    // addbirth() {
    //   this.birth.push({
    //     id: this.birth.length + 1,
    //     problem: "",
    //     how: "",
    //     user: this.selecteduser,
    //   });
    // },
    // deletebirth() {
    //   this.birth.splice(this.birth.length - 1, 1);
    // },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>
