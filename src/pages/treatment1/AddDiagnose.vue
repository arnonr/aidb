<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="เพิ่มข้อมูลการรักษา" :pages="breadcrumb" />

      <div class="card">
        <h1 class="text-2xl text-600 mb-5">เพิ่มข้อมูลการรักษา</h1>
        <div class="formgrid grid mb-3">
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              หมายเลขฟาร์ม
            </label>
            <InputText class="w-full" v-model="show" disabled />
          </div>
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2"
              >โรคที่ทำการรักษา<span class="text-red-500"> *</span></label
            >
            <Dropdown
              class="w-full"
              v-model="form.DiseaseID"
              :class="{
                'p-invalid': !form.DiseaseID && valid,
              }"
              :options="itemDisease.disease"
              optionLabel="DiseaseName"
              optionValue="DiseaseID"
              :virtualScrollerOptions="{
                // lazy: true,
                // onLazyLoad: onLazyLoad,
                itemSize: 38,
                // showLoader: true,
                // loading: loading,
                // delay: 250,
              }"
              :filter="true"
              :showClear="true"
              placeholder="เลือกหรือค้นหาโรคที่ทำการรักษา"
            >
              <template v-slot:loader="{ options }">
                <div class="flex align-items-center p-2" style="height: 38px">
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
              >เลือกวิธีการรักษา<span class="text-red-500"> *</span></label
            >
            <Dropdown
              class="w-full"
              v-model="form.CureMethod"
              :class="{
                'p-invalid': !form.CureMethod && valid,
              }"
              :options="itemDisease.diseasemethod"
              optionLabel="CureMethodName"
              optionValue="CureMethodID"
              :virtualScrollerOptions="{
                // lazy: true,
                // onLazyLoad: onLazyLoad,
                itemSize: 38,
                // showLoader: true,
                // loading: loading,
                // delay: 250,
              }"
              :filter="true"
              :showClear="true"
              placeholder="เลือกหรือค้นหาวิธีการรักษา"
            >
              <template v-slot:loader="{ options }">
                <div class="flex align-items-center p-2" style="height: 38px">
                  <Skeleton
                    :width="options.even ? '60%' : '50%'"
                    height="1rem"
                  />
                </div>
              </template>
            </Dropdown>
          </div>

          <div class="field col-6 sm:col-6">
            <label for="other" class="block text-600 text-sm font-bold mb-2"
              >วิธีอื่น ๆ</label
            >
            <InputText
              type="text"
              v-model="form.CureMethodOther"
              class="w-full"
              placeholder="วิธีอื่น ๆ"
            />
          </div>
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              อาการ/ผลการรักษา
            </label>
            <InputText class="w-full" v-model="form.Remark" />
          </div>

          <div class="field col-12 sm:col-6">
            <label for="date" class="block text-600 text-sm font-bold mb-2"
              >วันที่รักษา<span class="text-red-500"> *</span></label
            >
            <!-- <Calendar
              class="w-full"
              v-model="form.CureActivityDate"
              :maxDate="new Date()"
              :class="{
                'p-invalid': !form.CureActivityDate && valid,
              }"
              :manualInput="false"
              dateFormat="dd/mm/yy"
              placeholder="เลือกวันที่"
            /> -->

            <Datepicker
              v-model="form.CureActivityDate"
              :class="{ 'p-invalid': !form.CureActivityDate && valid }"
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
              >นัดตรวจครั้งถัดไป<span class="text-red-500"> *</span></label
            >
            <Dropdown
              class="w-full"
              :options="CureNextDateOption"
              optionLabel="label"
              optionValue="value"
              placeholder="เลือกนัดตรวจครั้งถัดไป"
              :showClear="true"
              v-model="form.CureNextDateOption"
            />
          </div>
          <div class="field col-6 sm:col-6">
            <label for="nexttime" class="block text-600 text-sm font-bold mb-2"
              >วันที่ตรวจครั้งถัดไป<span class="text-red-500"> *</span></label
            >
            <!-- <Calendar
              class="w-full"
              v-model="form.CureNextDate"
              :class="{
                'p-invalid': !form.CureNextDate && valid,
              }"
              :manualInput="false"
              placeholder="เลือกวันที่"
            /> -->

            <Datepicker
              v-model="form.CureNextDate"
              :class="{ 'p-invalid': !form.CureNextDate && valid }"
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
              >รหัสเจ้าหน้าที่<span class="text-red-500"> *</span></label
            >
            <Dropdown
              class="w-full"
              :options="personal"
              optionLabel="StaffFullName"
              optionValue="StaffID"
              placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
              :showClear="true"
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
              >หน่วยงานที่ตรวจ<span class="text-red-500"> *</span></label
            >
            <Dropdown
              class="w-full"
              v-model="form.OrganizationID"
              :options="organization"
              optionLabel="OrganizationName"
              optionValue="OrganizationID"
              :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: onLazyLoad,
                itemSize: 38,
                showLoader: true,
                loading: loading,
                delay: 250,
              }"
              :filter="true"
              :showClear="true"
              placeholder="เลือกหน่วยงาน"
            >
              <template v-slot:loader="{ options }">
                <div class="flex align-items-center p-2" style="height: 38px">
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
                v-model="form.VaccineID[i - 1][0]"
                :options="itemDisease.vaccince"
                optionLabel="VaccineName"
                optionValue="VaccineID"
                :virtualScrollerOptions="{
                  lazy: true,
                  onLazyLoad: onLazyLoad,
                  itemSize: 38,
                  showLoader: true,
                  loading: loading,
                  delay: 250,
                }"
                :filter="true"
                :showClear="true"
                placeholder="เลือกวัคซีน"
              />
            </div>
            <div class="col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"
                >ปริมาณที่ใช้<span class="text-red-500"> *</span></label
              >
              <InputNumber
                class="w-full"
                v-model="form.VaccineID[i - 1][1]"
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

        <div v-if="form.FarmID" class="mt-5">
          <DataTable
            class="text-sm"
            :value="data"
            :loading="isLoading"
            v-model:selection="form.Animal"
            :dataKey="id"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            responsiveLayout="scroll"
            currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
            @sort="sort($event)"
          >
            <Column selectionMode="multiple" class="text-center"></Column>
            <Column
              v-for="col of columns"
              :field="col.field"
              :header="col.header"
              :key="col.field"
              class="text-center"
              :sortable="true"
            >
            </Column>
          </DataTable>
          <Paginator
            @page="page($event)"
            :rows="15"
            :totalRecords="total"
          ></Paginator>
          <div class="col-12 text-center mt-5">
            <router-link to="/activity/treatment">
              <Button
                label="ยกเลิก"
                icon="pi pi-times"
                class="p-button-text mx-2"
              />
            </router-link>
            <Button
              label="บันทึกข้อมูล"
              icon="pi pi-save"
              @click="add()"
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
import { mapGetters } from "vuex";
import { format } from "date-fns";
import { th } from "date-fns/locale";
export default {
  computed: {
    ...mapGetters({
      user: "user",
      animal_id: "animal_id",
    }),
  },
  components: {
    PageTitle,
  },
  data() {
    return {
      key: this.$route.params.id,

      url: "/animal",
      urlDisease: "/disease",
      urlDiseaseMethod: "/cure-method",
      urlPersonal: "/staff?isActive=1",
      urlOrganization: "/organization",
      urlVaccine: "/vaccine",
      postDiseaseActivity: "/disease-activity",
      vaccine: 1,
      id: "AnimalID",
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
        {
          field: "AnimalIdentificationID",
          header: "หมายเลข",
        },
        {
          field: "AnimalName",
          header: "ชื่อสัตว์",
        },
        {
          field: "AnimalAge",
          header: "อายุ",
        },
        {
          field: "AnimalBornType",
          header: "ลักษณะการเกิด",
        },
        {
          field: "AnimalStatus.AnimalStatusName",
          header: "สถานะ",
        },
        {
          field: "AnimalFarm.FarmName",
          header: "สัตว์อยู่ที่ฟาร์ม...",
        },
      ],
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
      data: null,

      isLoading: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,
      valid: false,
      AnimalID: 1,
      sortBy: [],
      Farm: [],
      personal: null,
      organization: null,
      controller: new AbortController(),
      itemDisease: [],
      // index: null,
      // display: false,
      // display_delete: false,
      form: {
        isActive: 1,
        // AnimalID: [1,2],
        Animal: [],
        AnimalID: [],
        FarmID: this.$route.params.id,
        VaccineID: [[]],
      },
      show: this.$route.params.farm,
      Lastactivity: null,
      breadcrumb: [
        { label: "ข้อมูลสุขภาพ : การรักษา", to: "/activity/treatment" },
        { label: "", to: "" },
      ],
    };
  },
  loadLazyTimeout: null,
  watch: {
    "form.Animal"() {
      let val = [];
      // let res = [];
      val = this.form.Animal;

      for (let index = 0; index < val.length; index++) {
        this.form.AnimalID[index] = val[index].AnimalID;
      }

      // console.table(this.form.AnimalID);
      // this.form.AnimalID = res;
      return this.form.AnimalID;
    },
    "form.CureNextDateOption"(val) {
      this.form.CureNextDate = dayjs().add(val, "month");
    },
  },
  mounted() {
    this.load();
    // console.log(this.user.StaffID);
    this.form.ResponsibilityStaffID = this.user.StaffID;
    axios
      .get(this.apiPersonal, {
        signal: this.controller.signal,
      })
      .then((response) => {
        this.personal = response.data.rows.map((item) => {
          return {
            StaffID: item.StaffID,
            StaffNumber: item.StaffNumber,
            Fullname:
              item.StaffNumber +
              ", " +
              item.StaffGivenName +
              " " +
              item.StaffSurname,
          };
        });
      });
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
    plus_vaccine() {
      this.vaccine += 1;
      this.form.VaccineID.push([]);
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
      axios
        .get(this.urlDisease, {
          signal: this.controller.signal,
        })
        .then((res) => {
          // console.log(res);
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
        .get("/disease-result", {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.itemDisease.diseaseresult = res.data.rows;
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
      this.isLoading = true;
      let url = this.url + "?size=15";
      url += "&page=";
      if (this.curpage) {
        url += this.curpage;
      }
      // if (this.sortBy.FarmID) {
      //   url += "&FarmID=" + this.sortBy.FarmID;
      // }
      if (this.form.FarmID) {
        url += "&FarmID=" + this.form.FarmID;
      }

      axios
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.total = response.data.total;
          if (this.animal_id == 1) {
            this.data = response.data.rows.filter(
              (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
            );
          } else if (this.animal_id == 2) {
            this.data = response.data.rows.filter(
              (item) => item.AnimalTypeID === 3 || item.AnimalTypeID === 4
            );
          } else if (this.animal_id == 3) {
            this.data = response.data.rows.filter(
              (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
            );
          }
          if (this.curpage == 0 || this.curpage == 1) {
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
    validation() {
      if (
        !this.form.DiseaseID ||
        !this.form.CureMethod ||
        !this.form.CureActivityDate ||
        !this.form.CureNextDate ||
        !this.form.ResponsibilityStaffID ||
        !this.form.CureNextDateOption ||
        !this.form.VaccineID ||
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
    async add() {
      if (this.validation() == false) {
        return;
      }

      // console.log(this.form);
      let success = false;
      for (let i = 0; i < this.form.AnimalID.length; i++) {
        let next = new Date(this.form.CureNextDate);
        await axios
          .post("/cure-activity", {
            DiseaseID: this.form.DiseaseID,
            CureMethodID: this.form.CureMethod,
            CureActivityDate: this.form.CureActivityDate,
            CureNextDate: next,
            ResponsibilityStaffID: this.form.ResponsibilityStaffID,
            AnimalID: this.form.AnimalID[i],
            DiseaseActivityDate: this.form.DiseaseActivityDate,
            CureNextDateOption: this.form.CureNextDateOption,
            VaccineID: this.form.VaccineID,
            OrganizationID: this.form.OrganizationID,
          })
          .then(() => {
            // this.load();
            if (success == false) {
              success = true;
              this.$toast.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "ข้อมูลถูกบันทึก",
                life: 5000,
              });
            }

            setTimeout(() => {
              this.$router.push("/activity/treatment");
            }, 500);
          })
          .catch((err) => {
            this.$toast.add({
              severity: "error",
              summary: "ล้มเหลว",
              // detail: err.response.data.error.message,
              detail: err.response.data.error.message,
              life: 5000,
            });
            return;
          });
      }
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
