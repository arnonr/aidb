<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ข้อมูลสุขภาพ : การรักษา" :pages="breadcrumb" />
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
            :virtualScrollerOptions="{
              itemSize: 38,
              showLoader: true,
              loading: loading,
            }"
            :filter="true"
            :="true"
            placeholder="เลือกหมายเลขฟาร์ม"
            @change="load"
          >
            <!-- <template v-slot:loader="{ options }">
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
            </template> -->
          </Dropdown>
        </span>
      </div>
    </div>
    <div class="col-12">
      <div v-if="this.form.FarmID" class="card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">
              รายการข้อมูลสุขภาพ : การรักษา
            </h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <!-- <router-link to="/activity/diagnose/add"> -->
            <Button
              label="เพิ่มข้อมูลรักษาโรค"
              icon="pi pi-plus"
              class="w-full md:w-auto"
              @click="add"
            />
            <!-- </router-link> -->
          </div>
        </div>

        <div class="mt-5">
          <DataTable
            class="text-sm"
            :value="data"
            :loading="isLoading"
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
                  @click="edit(slotProps.data.CureActivityID)"
                  label="แก้ไข"
                  icon="pi pi-pencil"
                  class="p-button-sm p-button-outlined p-button-warning"
                  :model="getItems(slotProps.data.CureActivityID)"
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
        <!-- EDIT Dialog -->
        <Dialog
          header="แก้ไขข้อมูล"
          v-model:visible="display_edit"
          :style="{ width: '50vw' }"
          :modal="true"
        >
          <form class="grid mt-2">
            <div class="col-12 lg:col-12">
              <div class="formgrid grid mb-3">
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2"
                    >โรคที่ทำการรักษา<span class="text-red-500"> *</span></label
                  >
                  <Dropdown
                    class="w-full"
                    v-model="form_edit.DiseaseID"
                    :class="{
                      'p-invalid': !form_edit.DiseaseID && valid,
                    }"
                    :options="itemDisease.disease"
                    optionLabel="DiseaseName"
                    optionValue="DiseaseID"
                    :virtualScrollerOptions="{
                      itemSize: 38,
                      showLoader: true,
                      loading: loading,
                      delay: 250,
                    }"
                    :filter="true"
                    :="true"
                    placeholder="เลือกหรือค้นหาโรคที่ทำการรักษา"
                  >
                    <template v-slot:loader="{ options }">
                      <div
                        class="flex align-items-center p-2"
                        style="height: 38px"
                      >
                        <Skeleton
                          :width="options.even ? '60%' : '50%'"
                          height="1rem"
                        />
                      </div>
                    </template>
                  </Dropdown>
                </div>
                <div class="field col-6 sm:col-6">
                  <label
                    for="chooseinspection"
                    class="block text-600 text-sm font-bold mb-2"
                    >เลือกวิธีการรักษา<span class="text-red-500">
                      *</span
                    ></label
                  >
                  <Dropdown
                    class="w-full"
                    v-model="form_edit.CureMethodID"
                    :class="{
                      'p-invalid': !form_edit.CureMethodID && valid,
                    }"
                    :options="itemDisease.diseasemethod"
                    optionLabel="CureMethodName"
                    optionValue="CureMethodID"
                    :virtualScrollerOptions="{
                      itemSize: 38,
                      showLoader: true,
                      loading: loading,
                      delay: 250,
                    }"
                    :filter="true"
                    :="true"
                    placeholder="เลือกหรือค้นหาวิธีการรักษา"
                  >
                    <template v-slot:loader="{ options }">
                      <div
                        class="flex align-items-center p-2"
                        style="height: 38px"
                      >
                        <Skeleton
                          :width="options.even ? '60%' : '50%'"
                          height="1rem"
                        />
                      </div>
                    </template>
                  </Dropdown>
                </div>

                <div class="field col-6 sm:col-6">
                  <label
                    for="other"
                    class="block text-600 text-sm font-bold mb-2"
                    >วิธีอื่น ๆ</label
                  >
                  <InputText
                    type="text"
                    v-model="form_edit.CureMethodOther"
                    class="w-full"
                    placeholder="วิธีอื่น ๆ"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    อาการ/ผลการรักษา
                  </label>
                  <InputText class="w-full" v-model="form_edit.Remark" />
                </div>

                <div class="field col-12 sm:col-6">
                  <label
                    for="date"
                    class="block text-600 text-sm font-bold mb-2"
                    >วันที่รักษา<span class="text-red-500"> *</span></label
                  >
                  <!-- <Calendar
                    class="w-full"
                    v-model="form_edit.CureActivityDate"
                    :maxDate="new Date()"
                    :class="{
                      'p-invalid': !form_edit.CureActivityDate && valid,
                    }"
                    :manualInput="false"
                    dateFormat="dd/mm/yy"
                    placeholder="เลือกวันที่"
                  /> -->

                  <Datepicker
                    v-model="form_edit.CureActivityDate"
                    :class="{
                      'p-invalid': !form_edit.CureActivityDate && valid,
                    }"
                    id="dateRange"
                    locale="th"
                    :format="format"
                    utc
                    :enableTimePicker="false"
                    :maxDate="new Date()"
                    cancelText="ยกเลิก"
                    selectText="ยืนยัน"
                    placeholder="เลือกวันที่"
                    autoApply
                  >
                    <template #year-overlay-value="{ text }">
                      {{ parseInt(text) + 543 }}
                    </template>
                    <template #year="{ year }">
                      {{ year + 543 }}
                    </template>
                  </Datepicker>
                </div>
                <div class="field col-6 sm:col-6">
                  <label
                    for="nexttime"
                    class="block text-600 text-sm font-bold mb-2"
                    >นัดตรวจครั้งถัดไป<span class="text-red-500">
                      *</span
                    ></label
                  >
                  <Dropdown
                    class="w-full"
                    :options="CureNextDateOption"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="เลือกนัดตรวจครั้งถัดไป"
                    :showClear="true"
                    v-model="form_edit.CureNextDateOption"
                  />
                </div>
                <div class="field col-6 sm:col-6">
                  <label
                    for="nexttime"
                    class="block text-600 text-sm font-bold mb-2"
                    >วันที่ตรวจครั้งถัดไป<span class="text-red-500">
                      *</span
                    ></label
                  >
                  <!-- <Calendar
                    class="w-full"
                    v-model="form_edit.CureNextDate"
                    :class="{
                      'p-invalid': !form_edit.CureNextDate && valid,
                    }"
                    :manualInput="false"
                    dateFormat="dd/mm/yy"
                    placeholder="เลือกวันที่"
                  /> -->

                  <Datepicker
                    v-model="form_edit.CureNextDate"
                    :class="{ 'p-invalid': !form_edit.CureNextDate && valid }"
                    id="dateRange"
                    locale="th"
                    :format="format"
                    utc
                    :enableTimePicker="false"
                    :maxDate="new Date()"
                    cancelText="ยกเลิก"
                    selectText="ยืนยัน"
                    placeholder="เลือกวันที่"
                    autoApply
                  >
                    <template #year-overlay-value="{ text }">
                      {{ parseInt(text) + 543 }}
                    </template>
                    <template #year="{ year }">
                      {{ year + 543 }}
                    </template>
                  </Datepicker>
                </div>

                <div class="field col-12 sm:col-6">
                  <label
                    for="codeofficer"
                    class="block text-600 text-sm font-bold mb-2"
                    >รหัสเจ้าหน้าที่<span class="text-red-500"> *</span></label
                  >
                  <Dropdown
                    class="w-full"
                    :options="personal"
                    optionLabel="StaffFullName"
                    optionValue="StaffID"
                    placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
                    :="true"
                    :filter="true"
                    v-model="form_edit.ResponsibilityStaffID"
                    :class="{
                      'p-invalid': !form_edit.ResponsibilityStaffID && valid,
                    }"
                  />
                </div>

                <div class="field col-12 sm:col-6">
                  <label
                    for="inspectionagency"
                    class="block text-600 text-sm font-bold mb-2"
                    >หน่วยงานที่ตรวจ<span class="text-red-500"> *</span></label
                  >
                  <Dropdown
                    class="w-full"
                    v-model="form_edit.OrganizationID"
                    :options="organization"
                    optionLabel="OrganizationName"
                    optionValue="OrganizationID"
                    :virtualScrollerOptions="{
                      itemSize: 38,
                      showLoader: true,
                      loading: loading,
                      delay: 250,
                    }"
                    :filter="true"
                    :="true"
                    placeholder="เลือกหน่วยงาน"
                  >
                    <template v-slot:loader="{ options }">
                      <div
                        class="flex align-items-center p-2"
                        style="height: 38px"
                      >
                        <Skeleton
                          :width="options.even ? '60%' : '50%'"
                          height="1rem"
                        />
                      </div>
                    </template>
                  </Dropdown>
                </div>
                <div
                  class="field col-12 sm:col-12 grid"
                  v-for="i in vaccine"
                  :key="i"
                >
                  <div class="col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2"
                      >วัคซีน {{ i }}<span class="text-red-500"> *</span></label
                    >
                    <Dropdown
                      class="w-full"
                      v-model="form_edit.VaccineID[i - 1][i - 1]"
                      :options="itemDisease.vaccince"
                      optionLabel="VaccineName"
                      optionValue="VaccineID"
                      :virtualScrollerOptions="{
                        itemSize: 38,
                        showLoader: true,
                        loading: loading,
                        delay: 250,
                      }"
                      :filter="true"
                      :="true"
                      placeholder="เลือกวัคซีน"
                    />
                  </div>
                  <div class="col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2"
                      >ปริมาณที่ใช้<span class="text-red-500"> *</span></label
                    >
                    <InputNumber
                      class="w-full"
                      v-model="form_edit.VaccineID[i - 1][i]"
                      placeholder="ระบุปริมาณที่ใช้"
                    />
                  </div>
                </div>
                <div class="field col-12 sm:col-12">
                  <Button
                    label="เพิ่มวัคซีน"
                    icon="pi pi-plus"
                    @click="plus_vaccine()"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 text-center mt-5 flex justify-content-between">
              <Button
                label="ยกเลิก"
                class="p-button-secondary w-full mr-3"
                @click="display_edit = false"
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
// import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import router from "../../router";
import store from "@/service/Vuex";
import { FilterMatchMode } from "primevue/api";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import PageTitle from "@/components/PageTitle.vue";

import { mapGetters } from "vuex";
export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      url: "/cure-activity",
      id: "CureActivityID",
      name: "การรักษา",
      itemDisease: [],
      loading: false,
      CureNextDateOption: [
        {
          label: "1 เดือน",
          value: 1,
        },
        {
          label: "2 เดือน",
          value: 2,
        },
        {
          label: "3 เดือน",
          value: 3,
        },
        {
          label: "6 เดือน",
          value: 6,
        },
      ],
      vaccine: 1,
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
        {
          field: "Animal.AnimalEarID",
          header: "หมายเลขสัตว์",
        },
        {
          field: "Animal.AnimalName",
          header: "ชื่อสัตว์",
        },
        {
          field: "ThaiCureActivityDate",
          header: "วันที่รักษา",
        },
        {
          field: "DiseaseName",
          header: "โรคที่รักษา",
        },
        {
          field: "Remark",
          header: "ผลการรักษา",
        },
        {
          field: "ThaiCureNextDate",
          header: "วันที่ตรวจครั้งถัดไป",
        },
        {
          field: "ResponsibilityStaffName",
          header: "เจ้าหน้าที่",
        },
      ],
      urlDisease: "/disease",
      urlDiseaseMethod: "/cure-method",
      urlPersonal: "/staff?isActive=1",
      urlOrganization: "/organization",
      urlVaccine: "/vaccine",
      animal_status: [],
      Farm: [],
      data: null,
      form: [],
      form_edit: null,
      isLoading: false,
      curpage: 0,
      total: 0,
      display_edit: false,
      display_view: false,
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      display_delete: false,
      breadcrumb: [{ label: "", to: "" }],

      controller: new AbortController(),
    };
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      permission: "get_permission",
    }),
    set_farm() {
      return store.state.SetFarmDiagnose;
    },
  },
  async mounted() {
    await dayjs.extend(buddhistEra);
    this.breadcrumb[0].label = this.name;
    await axios
      .get("/farm", { signal: this.controller.signal })
      .then((res) => {
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
        this.Farm.total = res.data.total;
      })
      .finally(() => {
        this.isLoading = false;
      });
    if (this.set_farm != null) {
      this.form.FarmID = this.set_farm.id;
      this.load();
    }
    this.permit = this.permission.filter((item) => {
      return item.MenuID == 26;
    });
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
    plus_vaccine() {
      this.vaccine += 1;
      this.form_edit.VaccineID.push([]);
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
    load() {
      this.isLoading = true;
      let url = this.url + "?size=15";
      url += "&page=";
      if (this.curpage) {
        url += this.curpage;
      }
      if (this.form.FarmID) {
        url += "&FarmID=" + this.form.FarmID;
      }
      if (this.set_farm) {
        url += "&FarmID=" + this.form.FarmID;
      }

      axios
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.total = response.data.total;
          this.data = response.data.rows;

          this.data.sort(
            (first, last) =>
              new Date(last.DiseaseActivityDate) -
              new Date(first.DiseaseActivityDate)
          );

          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
              // if (this.data[i].DiseaseActivityDate != null) {
              //   this.data[i].DiseaseActivityDate = dayjs(
              //     this.data[i].DiseaseActivityDate
              //   )
              //     .locale(locale)
              //     .format("DD MMM BB");
              // }
              // if (this.data[i].DiseaseNextDate != null) {
              //   this.data[i].DiseaseNextDate = dayjs(
              //     this.data[i].DiseaseNextDate
              //   )
              //     .locale(locale)
              //     .format("DD MMM BB");
              // }
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

      store.dispatch("FarmDiagnose", {
        id: this.form.FarmID,
      });
      axios
        .get(this.urlDisease, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.itemDisease.disease = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(this.urlDiseaseMethod, {
          signal: this.controller.signal,
        })
        .then((res) => {
          if (this.animal_id == 1) {
            this.itemDisease.diseasemethod = res.data.rows.filter((item) =>
              item.AnimalTypeID.includes(1 || 2)
            );
          } else if (this.animal_id == 2) {
            this.itemDisease.diseasemethod = res.data.rows.filter((item) =>
              item.AnimalTypeID.includes(3 || 4)
            );
          } else if (this.animal_id == 3) {
            this.itemDisease.diseasemethod = res.data.rows.filter((item) =>
              item.AnimalTypeID.includes(17 || 18)
            );
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.urlVaccine, {
          signal: this.controller.signal,
        })
        .then((res) => {
          if (this.animal_id == 1) {
            this.itemDisease.vaccince = res.data.rows.filter((item) =>
              item.AnimalTypeID.includes(1 || 2)
            );
          } else if (this.animal_id == 2) {
            this.itemDisease.vaccince = res.data.rows.filter((item) =>
              item.AnimalTypeID.includes(3 || 4)
            );
          } else if (this.animal_id == 3) {
            this.itemDisease.vaccince = res.data.rows.filter((item) =>
              item.AnimalTypeID.includes(17 || 18)
            );
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.urlPersonal, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.personal = response.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.urlOrganization, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.organization = response.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async update() {
      await axios
        .put("cure-activity/" + this.form_edit.CureActivityID, this.form_edit, {
          signal: this.controller.signal,
        })
        .then(() => {
          this.load();
          this.display_edit = false;
        })
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            // detail: err.response.data.error.message,
            detail: err.response.data.error.message,
            life: 5000,
          });
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
      this.form_edit = this.data.find((item) => item.CureActivityID == id);
      this.vaccine = this.form_edit.VaccineID.length;
      this.display_edit = true;
    },
    getItems(id) {
      const items = [
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
    //   id = this.data.find((x) => x.DiseaseActivityID == id);

    //   this.form = {
    //     DiseaseActivityID: id.DiseaseActivityID,
    //     AnimalIdentificationID: id.Animal.AnimalIdentificationID,
    //     DiseaseResultName: id.DiseaseResult.DiseaseResultName,
    //     StaffGivenName: id.Staff.StaffGivenName,
    //     DiseaseNextDate: id.DiseaseNextDate,
    //     AnimalName: id.Animal.AnimalName,
    //     OrganizationName: id.Organization.OrganizationName,

    //     // AnimalFarmName: id.Animal.AnimalFarmName,
    //   };
    //   this.display_view = true;
    // },

    close() {
      this.display_edit = false;
    },

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
    add() {
      if (this.permit[0].IsAdd == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์เพิ่ม",
          life: 5000,
        });
        return;
      }
      const id = this.form.FarmID;
      let item = this.Farm.data.find((id) => id.FarmID == this.form.FarmID);

      const farm = item.FarmIdentificationNumber;
      router.push({ name: "add-treatment", params: { id, farm } });
    },
    remove() {
      axios.delete("cure-activity/" + this.data.id).then(() => {
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
  },

  unmounted() {
    this.controller.abort();
  },
};
</script>
