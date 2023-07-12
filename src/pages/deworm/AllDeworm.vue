<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ข้อมูลสุขภาพ : ถ่ายพยาธิ" :pages="breadcrumb" />
      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหาหมายเลขฟาร์ม</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />
          <Dropdown
            class="w-full"
            v-model="form.FarmID"
            :options="Farm.data"
            optionLabel="Fullname"
            optionValue="FarmID"
            :filter="true"
            :showClear="true"
            placeholder="เลือกหมายเลขฟาร์ม"
            @change="load"
            :virtualScrollerOptions="{ itemSize: 38 }"
          />
        </span>
      </div>
    </div>
    <div class="col-12">
      <div v-if="this.form.FarmID" class="card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">
              รายการข้อมูลสุขภาพ : ถ่ายพยาธิ
            </h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button
              label="เพิ่มข้อมูลถ่ายพยาธิ"
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
                  @click="edit(slotProps.data.DewormActivityID)"
                  label="แก้ไข"
                  icon="pi pi-pencil"
                  class="p-button-sm p-button-outlined p-button-warning"
                  :model="getItems(slotProps.data.DewormActivityID)"
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
        <!-- Start Details Dialog -->
        <!-- <Dialog
          header="รายละเอียดการถ่ายพยาธิ"
          v-model:visible="display_view"
          :style="{ width: '60vw' }"
          :modal="true"
        >
          <form class="grid mt-2">
            <div class="col-12 lg:col-12">
              <div class="formgrid grid">
                <div class="field col-12 sm:col-4">
                  <label class="block text-600 text-sm font-bold mb-2">
                    หมายเลขทะเบียนฟาร์ม: , สมหมายจินดาเพ็ง(วีระ) 
                  </label>

                  <span class="inline pr-2">รหัสสัตว์ :</span>
                  {{ form.AnimalIdentificationID }}
                </div>
                <div class="field col-12 sm:col-4">
                  <span class="inline pr-2"> ชื่อสัตว์ :</span>
                  {{ form.AnimalName }}
                </div>

                <div class="field col-12 sm:col-4">
                  <span class="inline pr-2"> ยาถ่ายพยาธิที่ใช้ :</span>
                  {{ form.DewormMedicineName }}
                </div>

                <div class="field col-12 sm:col-4">
                  <span class="inline pr-2"> วันที่ตรวจครั้งต่อไป :</span>
                  {{ form.DewormNextDate }}
                </div>

                <div class="field col-12 sm:col-4">
                  <span class="inline pr-2"> เจ้าหน้าที่ :</span>
                  {{ form.StaffGivenName }}
                </div>

                <div class="field col-12 sm:col-4">
                  <span class="inline pr-2"> หน่วยงาน :</span>
                  {{ form.OrganizationName }}
                </div>

                <div class="field col-12 sm:col-12">
                  <h4>จำนวนสัตว์ที่ทำรายการ.....ตัว</h4>
                  <div class="mt-5">
                    <DataTable
                      class="text-sm"
                      :value="data"
                      :paginator="true"
                      :rows="10"
                      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      :rowsPerPageOptions="[10, 20, 50]"
                      responsiveLayout="scroll"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    >
                      <Column
                        field="number"
                        header="ลำดับ"
                        class="text-center"
                      ></Column>
                      <Column
                        field="animal_number"
                        header="หมายเลขสัตว์"
                        class="text-center"
                      ></Column>
                      <Column
                        field="animal_name"
                        header="ชื่อสัตว์"
                        class="text-center"
                      ></Column>
                      <Column
                        field="animal_birthday"
                        header="วัน/เดือน/ปีเกิด"
                        class="text-center"
                      ></Column>
                      <Column
                        field="animal_age"
                        header="อายุ"
                        class="text-center"
                      ></Column>
                      <Column
                        field="animal_breed"
                        header="Breed"
                        class="text-center"
                      ></Column>
                      <Column
                        field="animal_status"
                        header="สถานะ"
                        class="text-center"
                      ></Column>
                    </DataTable>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <template #footer> </template>
        </Dialog> -->

        <!-- End Details Dialog -->

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
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import router from "../../router";
import store from "@/service/Vuex";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";

import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      url: "/deworm-activity",
      id: "DewormActivityID",
      name: "ถ่ายพยาธิ",
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },

        {
          field: "ThaiDewormActivityDate",
          header: "วันที่ถ่ายพยาธิ",
        },
        {
          field: "DewormMedicineName",
          header: "ยาถ่ายพยาธิที่ใช้",
        },
        {
          field: "ThaiDewormNextDate",
          header: "วันที่ถ่ายพยาธิครั้งต่อไป",
        },
        {
          field: "OrganizationName",
          header: "หน่วยงานที่ตรวจ",
        },
        {
          field: "Animal.length",
          header: "จำนวนสัตว์ที่ถ่ายพยาธิ",
        },
        {
          field: "ResponsibilityStaffName",
          header: "เจ้าหน้าที่",
        },
      ],

      isLoading: false,
      curpage: 0,
      display_view: false,
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      display_delete: false,
      breadcrumb: [{ label: "", to: "" }],
      animal_status: [],
      Farm: [],
      form: [],
      permit: null,
      controller: new AbortController(),
    };
  },
  computed: {
    ...mapGetters({
      permission: "get_permission",
    }),
    set_farm() {
      return store.state.SetFarmDeworm;
    },
  },
  async mounted() {
    await dayjs.extend(buddhistEra);
    this.breadcrumb[0].label = this.name;
    await axios
      .get("/farm", { signal: this.controller.signal })
      .then((res) => {
        // this.Farm.data = res.data.rows;
        this.Farm.total = res.data.total;
        this.Farm.data = res.data.rows
          .sort((a, b) =>
            a.Province.ProvinceName.localeCompare(b.Province.ProvinceName)
          )
          .map((item) => {
            let name = item.Farmer ? item.Farmer.FullName : "- ";
            let number = item.FarmIdentificationNumber
              ? item.FarmIdentificationNumber
              : "- ";
            let province = item.Province ? item.Province.ProvinceName : "- ";
            let Organization = item.OrganizationZone
              ? item.OrganizationZone.OrganizationZoneName
              : "- ";

            return {
              FarmID: item.FarmID,
              FarmName: item.FarmName,
              FarmIdentificationNumber: item.FarmIdentificationNumber,
              Fullname:
                "ฟาร์ม " +
                item.FarmName +
                " (" +
                number +
                ")" +
                " | เจ้าของฟาร์ม " +
                name +
                " | จังหวัด " +
                province +
                " | " +
                Organization,
              OrganizationZoneName: Organization,
            };
          });
      })
      .finally(() => {
        this.isLoading = false;
      });
    if (this.set_farm != null) {
      this.form.FarmID = this.set_farm.id;
      this.load();
    }
    this.permit = this.permission.filter((item) => {
      return item.MenuID == 17;
    });
  },

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
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.total = response.data.total;
          this.data = response.data.rows;
          this.data.sort(
            (first, last) =>
              new Date(last.DewormActivityDate) -
              new Date(first.DewormActivityDate)
          );
          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
              if (this.data[i].DewormNextDate != null) {
                this.data[i].DewormNextDate = dayjs(this.data[i].DewormNextDate)
                  .locale(locale)
                  .format("DD MMM BB");
              }
              if (this.data[i].DewormActivityDate != null) {
                this.data[i].DewormActivityDate = dayjs(
                  this.data[i].DewormActivityDate
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
      store.dispatch("FarmDeworm", {
        id: this.form.FarmID,
      });
    },
    async edit(id) {
      if (this.permit[0].IsUpdate == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์แก้ไข",
          life: 5000,
        });
        return;
      }
      let getID = this.data.find((item) => item.DewormActivityID == id);
      await router.push({
        path: `/activity/deworm/edit/${getID.DewormActivityID}`,
      });
    },
    getItems(id) {
      const items = [
        {
          label: "รายละเอียด",
          icon: "pi pi-eye",
          command: () => {
            this.$router.push("/activity/deworm/view/" + id);
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
    // open_view(id) {
    //   id = this.data.find((x) => x.DewormActivityID == id);

    //   this.form = {
    //     DewormActivityID: id.DewormActivityID,
    //     AnimalIdentificationID: id.Animal.AnimalIdentificationID,
    //     DewormMedicineName: id.DewormMedicine.DewormMedicineName,
    //     StaffGivenName: id.Staff.StaffGivenName,
    //     DewormNextDate: id.DewormNextDate,
    //     AnimalName: id.Animal.AnimalName,
    //     OrganizationName: id.Organization.OrganizationName,

    //     // AnimalFarmName: id.Animal.AnimalFarmName,
    //   };
    //   this.display_view = true;
    // },
    // close_view() {
    //   this.display_view = false;
    // },

    open_delete(id) {
      if (this.permit[0].IsDelete == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์ลบ",
          life: 5000,
        });
        return;
      }
      this.data.id = id;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },

    remove() {
      axios.delete("deworm-activity/" + this.data.id).then(() => {
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
      const id = this.form.FarmID;
      let item = this.Farm.data.find((id) => id.FarmID == this.form.FarmID);
      const farm = item.FarmIdentificationNumber;
      router.push({ name: "add-deworm", params: { id, farm } });
    },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>
