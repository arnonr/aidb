<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="แก้ไขข้อมูลตรวจโรค" :pages="breadcrumb" />

      <div class="card">
        <h1 class="text-2xl text-600 mb-5">แก้ไขข้อมูลตรวจโรค</h1>
        <div v-if="loader" class="formgrid grid mb-3">
          <div class="field col-12 sm:col-12">
            <label class="block text-600 text-sm font-bold mb-2">
              ฟาร์ม<span class="text-red-500"> *</span>
            </label>
            <!-- <InputText
              v-if="form.FarmIdentificationNumber != null"
              class="w-full"
              v-model="form.FarmIdentificationNumber"
              disabled
            /> -->
            <InputText class="w-full" v-model="form.FullName" disabled />
            <!-- <Dropdown
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
              disabled
            >
              <template v-slot:loader="{ options }">
                <div class="flex align-items-center p-2" style="height: 38px">
                  <Skeleton
                    :width="options.even ? '60%' : '50%'"
                    height="1rem"
                  />
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
            </Dropdown> -->
          </div>
          <div class="field col-12 sm:col-6">
            <label
              for="diseaseexamined"
              class="block text-600 text-sm font-bold mb-2"
              >โรคที่ทำการตรวจ</label
            >

            <Dropdown
              class="w-full"
              v-model="form.DiseaseID"
              :options="itemDisease.disease"
              optionLabel="DiseaseName"
              optionValue="DiseaseID"
              :class="{ 'p-invalid': !form.DiseaseID && valid }"
              :filter="true"
              :showClear="true"
              placeholder="เลือกหรือค้นหาโรคที่ตรวจ"
            >
            </Dropdown>
          </div>
          <div class="field col-6 sm:col-6">
            <label
              for="chooseinspection"
              class="block text-600 text-sm font-bold mb-2"
              >เลือกวิธีการตรวจ</label
            >
            <Dropdown
              class="w-full"
              v-model="form.DiseaseMethodID"
              :options="itemDisease.diseasemethod"
              optionLabel="DiseaseMethodName"
              optionValue="DiseaseMethodID"
              :class="{ 'p-invalid': !form.DiseaseMethodID && valid }"
              :filter="true"
              :showClear="true"
              placeholder="เลือกหรือค้นหาวิธีการตรวจ"
            >
            </Dropdown>
          </div>
          <div class="field col-6 sm:col-6">
            <label for="other" class="block text-600 text-sm font-bold mb-2"
              >วิธีอื่น ๆ</label
            >
            <InputText
              type="text"
              v-model="form.Remark"
              class="w-full"
              placeholder="วิธีอื่น ๆ"
            />
          </div>
          <!-- <div class="field col-12 sm:col-6">
            <label
              for="diseaseexamined"
              class="block text-600 text-sm font-bold mb-2"
              >ผลการตรวจ</label
            >

            <Dropdown
              class="w-full"
              v-model="form.DiseaseResultID"
              :options="itemDisease.diseaseresult"
              optionLabel="DiseaseResultName"
              optionValue="DiseaseResultID"
              :class="{ 'p-invalid': !form.DiseaseResultID && valid }"
              :showClear="true"
              placeholder="เลือกหรือค้นหาโรคที่ตรวจ"
            >
            </Dropdown>
          </div> -->
          <div class="field col-12 sm:col-6" />
          <div class="field col-12 sm:col-6">
            <label for="date" class="block text-600 text-sm font-bold mb-2"
              >วันที่ตรวจ</label
            >
            <Datepicker
              v-model="form.DiseaseActivityDate"
              :class="{ 'p-invalid': !form.DiseaseActivityDate && valid }"
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
            <label for="nexttime" class="block text-600 text-sm font-bold mb-2"
              >วันที่ตรวจครั้งถัดไป</label
            >
            <Datepicker
              v-model="form.DiseaseNextDate"
              :class="{ 'p-invalid': !form.DiseaseNextDate && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
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
              >รหัสเจ้าหน้าที่</label
            >
            <Dropdown
              class="w-full"
              :options="personal"
              optionLabel="StaffFullName"
              optionValue="StaffID"
              placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
              showClear="true"
              :filter="true"
              v-model="form.ResponsibilityStaffID"
              :class="{
                'p-invalid': !form.ResponsibilityStaffID && valid,
              }"
            />
          </div>

          <div class="field col-12 sm:col-6">
            <label
              for="inspectionagency"
              class="block text-600 text-sm font-bold mb-2"
              >หน่วยงานที่ตรวจ</label
            >
            <Dropdown
              class="w-full"
              v-model="form.OrganizationID"
              :options="organization"
              optionLabel="OrganizationName"
              optionValue="OrganizationID"
              :class="{ 'p-invalid': !form.OrganizationID && valid }"
              :filter="true"
              :showClear="true"
              placeholder="เลือกหน่วยงาน"
            >
              <!-- <template v-slot:loader="{ options }">
                <div class="flex align-items-center p-2" style="height: 38px">
                  <Skeleton
                    :width="options.even ? '60%' : '50%'"
                    height="1rem"
                  />
                </div>
              </template> -->
            </Dropdown>
          </div>
        </div>
        <div v-else class="grid">
          <div class="col-12">
            <Skeleton width="20rem" height="2rem" class="mb-4"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12">
            <div class="grid">
              <div class="col-12">
                <Skeleton width="5rem" class="mb-2"></Skeleton>
                <Skeleton height="2rem" class="mb-2"></Skeleton>
              </div>
            </div>
          </div>
        </div>
        <div v-if="form.FarmID" class="mt-5">
          <h4 class="text-2xl text-600 mb-5">
            จำนวนสัตว์ที่ตรวจ : {{ data.length }} ตัว
          </h4>

          <DataTable
            class="text-sm"
            :value="data"
            :loading="isLoading"
            rows="20"
            paginator="true"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            responsiveLayout="scroll"
            currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
            @sort="sort($event)"
          >
            <!-- <Column selectionMode="multiple" class="text-center"></Column> -->
            <Column
              v-for="col of columns"
              :field="col.field"
              :header="col.header"
              :key="col.field"
              class="text-center"
              :sortable="true"
            >
            </Column>
            <Column
              field="AnimalID"
              header="ผลการตรวจ"
              class="text-center"
              :sortable="true"
            >
              <template #body="slotProps">
                <div>
                  <!-- <InputNumber
                    
                    v-model="form.Animal"
                    :value="slotProps.data.AnimalID"
                  /> -->
                  <Dropdown
                    v-model="slotProps.data.DiseaseResultID"
                    :options="itemDisease.diseaseresult"
                    optionLabel="DiseaseResultName"
                    optionValue="DiseaseResultID"
                    class="w-full"
                    :class="{ 'p-invalid': !form.DiseaseResultID && valid }"
                    :showClear="true"
                    placeholder="ผลการตรวจ"
                    @change="
                      selected($event, slotProps.data.DiseaseActivityAnimalID)
                    "
                    id="test"
                  >
                  </Dropdown>
                </div>
              </template>
            </Column>
          </DataTable>
          <!-- <Paginator
            @page="page($event)"
            :rows="15"
            :totalRecords="total"
          ></Paginator> -->
          <div class="col-12 text-center mt-5">
            <router-link to="/activity/diagnose">
              <Button
                label="ยกเลิก"
                icon="pi pi-times"
                class="p-button-text mx-2"
              />
            </router-link>
            <Button
              label="บันทึกข้อมูล"
              icon="pi pi-save"
              @click="submit()"
              autofocus
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import PageTitle from "@/components/PageTitle.vue";
import { format } from "date-fns";
import { th } from "date-fns/locale";
export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      key: this.$route.params.id,
      url: "/animal",
      urlDisease: "/disease",
      urlDiseaseMethod: "/disease-method",
      urlPersonal: "/staff?isActive=1",
      urlOrganization: "/organization",
      putDiseaseActivity: "/disease-activity/" + this.$route.params.id,

      id: "AnimalID",
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
          field: "Animal.AnimalAge",
          header: "อายุ",
        },
        {
          field: "Animal.AnimalSex",
          header: "เพศ",
        },
      ],

      isLoading: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,
      loader: false,
      valid: false,
      sortBy: [],
      Farm: [],

      itemDisease: [],

      form: {
        Animal: [],
        AnimalID: [],
      },
      data: [],

      breadcrumb: [
        { label: "ข้อมูลสุขภาพ : ตรวจโรค", to: "/activity/diagnose" },
        { label: "", to: "" },
      ],
      controller: new AbortController(),
    };
  },
  loadLazyTimeout: null,
  watch: {
    // "form.Animal"() {
    //   let val = [];
    //   // let res = [];
    //   val = this.form.Animal;
    //   console.table(val);
    //   if (val) {
    //     for (let index = 0; index < val.length; index++) {
    //       this.form.AnimalID[index] = val[index].AnimalID;
    //     }
    //   }
    // console.table(this.form.AnimalID);
    // this.form.AnimalID = res;
    // return this.form.AnimalID;
    // },
  },
  mounted() {
    this.field();

    // axios
    //   .get(this.apiPersonal, {
    //     signal: this.controller.signal,
    //   })
    //   .then((response) => {
    //     this.personal = response.data.rows.map((item) => {
    //       return {
    //         StaffID: item.StaffID,
    //         StaffNumber: item.StaffNumber,
    //         Fullname:
    //           item.StaffNumber +
    //           ", " +
    //           item.StaffGivenName +
    //           " " +
    //           item.StaffSurname,
    //       };
    //     });
    //   });
    this.isLoading = true;
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
    // sort table
    sort($event) {
      if ($event.sortField !== "show_id") {
        if ($event.sortOrder == 1) {
          this.sortOrder = "asc";
        } else {
          this.sortOrder = "desc";
        }
        this.sortField = $event.sortField;
        this.field();
      }
    },
    // page change
    page($event) {
      this.curpage = $event.page + 1;
      this.field();
    },
    async field() {
      this.isLoading = true;
      // let url = this.putDiseaseActivity + "?size=15";
      // url += "&page=";
      // if (this.curpage) {
      //   url += this.curpage;
      // }
      // if (this.sortBy.FarmID) {
      //   url += "&FarmID=" + this.sortBy.FarmID;
      // }

      axios
        .get(this.urlPersonal, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.personal = response.data.rows;
        })
        .finally(() => {
          this.loader = true;
        });

      axios
        .get(this.urlOrganization, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.organization = response.data.rows;
        })
        .finally(() => {
          this.loader = true;
        });
      await axios
        .get(this.putDiseaseActivity, { signal: this.controller.signal })
        .then((res) => {
          let item = res.data;
          // console.log(item);
          this.form = {
            DiseaseActivityDate: item.DiseaseActivityDate,
            FarmID: item.FarmID,
            DiseaseID: item.DiseaseID,
            DiseaseNextDate: item.DiseaseNextDate,
            DiseaseMethodID: item.DiseaseMethodID,
            DiseaseResultID: item.DiseaseResultID,
            OrganizationID: item.OrganizationID,
            ResponsibilityStaffID: item.ResponsibilityStaffID,
            Remark: item.Remark,
            isActive: item.isActive,
          };
        })
        .finally(() => {
          this.loader = false;
        });
      await axios
        .get("/disease-activity-animal?DiseaseActivityID=" + this.key, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.data = response.data.rows;
          // console.log(this.data);
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].show_id = i + 1;
            if (this.data[i].AnimalBirthDate != null) {
              // หาจำนวนเดือน
              var today = new Date();
              const date1 = dayjs(this.data[i].AnimalBirthDate);
              this.data[i].AnimalAge = date1.diff(today, "month");
              // แปลงเป็น ปี และ เดือน
              let countyear = this.data[i].AnimalAge / 12;
              let countmonth = this.data[i].AnimalAge % 12;
              // ถ้าปีน้อยกว่า 0 ไม่ต้องแสดง
              if (Math.abs(countyear) < 1) {
                if (Math.abs(Math.ceil(countmonth)) != 0) {
                  this.data[i].AnimalAge =
                    Math.abs(Math.ceil(countmonth)) + " เดือน ";
                } else {
                  this.data[i].AnimalAge = "-";
                }
              } else {
                this.data[i].AnimalAge =
                  Math.abs(Math.ceil(countyear)) +
                  " ปี " +
                  Math.abs(Math.ceil(countmonth)) +
                  " เดือน ";
              }
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
      await axios
        .get("/disease-result", {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.itemDisease.diseaseresult = res.data.rows;
        })
        .finally(() => {
          this.loader = true;
        });
      await axios
        .get(this.urlDisease, {
          signal: this.controller.signal,
        })
        .then((res) => {
          // console.log(res);
          this.itemDisease.disease = res.data.rows;
        })
        .finally(() => {
          this.loader = true;
        });

      await axios
        .get(this.urlDiseaseMethod, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.itemDisease.diseasemethod = res.data.rows;
        })
        .finally(() => {
          this.loader = true;
        });

      // axios
      //   .get(this.urlPersonal, {
      //     signal: this.controller.signal,
      //   })
      //   .then((response) => {
      //     this.personal = response.data.rows.map((item) => {
      //       return {
      //         StaffID: item.StaffID,
      //         // StaffNumber: item.StaffNumber,
      //         StaffFullName: item.StaffFullName,
      //       };
      //     });
      //   })
      //   .finally(() => {
      //     this.loader = true;
      //   });
      axios
        .get("/farm/" + this.form.FarmID, { signal: this.controller.signal })
        .then((res) => {
          // this.Farm.data = res.data;

          let item = res.data;

          this.form.FarmName = item.FarmName;
          this.form.FarmProvince = item.Province.ProvinceName;
          this.form.FarmOrganizationZone = item.OrganizationZone
            .OrganizationZoneName
            ? item.OrganizationZone.OrganizationZoneName
            : "- ";
          this.form.FarmOwner = item.Farmer ? item.Farmer.FullName : "- ";
          // console.log(this.form.FarmOrganizationZone);

          this.form.FullName =
            "ฟาร์ม " +
            this.form.FarmName +
            " (" +
            item.FarmIdentificationNumber +
            ")" +
            " | เจ้าของฟาร์ม " +
            this.form.FarmOwner +
            " | จังหวัด " +
            this.form.FarmProvince +
            " | " +
            this.form.FarmOrganizationZone;
          return;
        })
        .finally(() => {
          this.loader = true;
        });
      // await axios
      //   .get("/farm", { signal: this.controller.signal })
      //   .then((res) => {
      //     this.Farm.data = res.data.rows;
      //     this.Farm.total = res.data.total;
      //   })
      //   .finally(() => {
      //     this.loader = true;
      //   });
    },
    validation() {
      if (
        !this.form.DiseaseID ||
        !this.form.DiseaseMethodID ||
        !this.form.DiseaseActivityDate ||
        !this.form.DiseaseNextDate ||
        !this.form.ResponsibilityStaffID ||
        !this.form.OrganizationID
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
    submit() {
      if (this.validation() == false) {
        return;
      }

      axios
        .put(this.putDiseaseActivity, this.form)
        .then(() => {
          // console.log(this.form);
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ข้อมูลตรวจโรคถูกบันทึก",
            life: 2000,
          });
          setTimeout(() => {
            this.$router.push("/activity/diagnose");
          }, 2000);
        })
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    selected($event, id) {
      axios
        .put("/disease-activity-animal/" + id, {
          DiseaseResultID: $event.value,
        })
        .then(() => {
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "อัพเดทข้อมูลเรียบร้อย",
            life: 2000,
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    onLazyLoad() {
      this.loading = true;

      if (this.loadLazyTimeout) {
        clearTimeout(this.loadLazyTimeout);
      }

      this.loadLazyTimeout = setTimeout(() => {
        this.loading = false;
      }, Math.random() * 1000 + 250);
    },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>
