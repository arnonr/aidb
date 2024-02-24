<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="เพิ่มข้อมูลการรักษา" :pages="breadcrumb" />
      <div class="card">
        <form>
          <div class="mb-5">
            <h1 class="text-2xl mb-0 text-600">เพิ่มข้อมูลการรักษา</h1>
          </div>
          <div v-if="loader" class="formgrid grid">
            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ฟาร์ม<span class="text-red-500"> *</span>
              </label>
              <InputText class="w-full" v-model="form.FullName" disabled />
              <!-- <Dropdown
                  v-if="form.FarmID == null"
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

            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                เลือกสัตว์<span class="text-red-500"> *</span>
              </label>
              <Dropdown
                class="w-full"
                :options="itemsAnimal.Animal"
                optionLabel="AnimalName"
                optionValue="AnimalID"
                placeholder="เลือกสัตว์"
                :showClear="true"
                :filter="true"
                v-model="form.AnimalChoose"
                :class="{ 'p-invalid': !form.AnimalChoose && valid }"
              />
            </div>
            <!-- <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ชื่อฟาร์ม
                  </label>
                  <InputText class="w-full" type="text" v-model="value1" />
                </div> -->
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                โรคที่ทำการรักษา<span class="text-red-500"> *</span>
              </label>
              <Dropdown
                class="w-full"
                :options="itemsDisease.Disease"
                optionLabel="DiseaseName"
                optionValue="DiseaseID"
                placeholder="เลือกโรคที่ทำการรักษา"
                :showClear="true"
                :filter="true"
                v-model="form.DiseaseID"
                :class="{ 'p-invalid': !form.DiseaseID && valid }"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เลือกวิธีการรักษา<span class="text-red-500"> *</span>
              </label>
              <Dropdown
                class="w-full"
                v-model="form.CureMethodID"
                :options="itemsCureMethod.CureMethod"
                optionLabel="CureMethodName"
                optionValue="CureMethodID"
                :class="{ 'p-invalid': !form.CureMethodID && valid }"
                :showClear="true"
                placeholder="เลือกชนิด"
              />
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
                วันที่รักษา<span class="text-red-500"> *</span>
              </label>
              <Datepicker
                v-model="form.CureActivityDate"
                :class="{ 'p-invalid': !form.VaccineActivityDate && valid }"
                id="dateRange"
                locale="th"
                :format="format"
                utc
                :enableTimePicker="false"
                :maxDate="new Date()"
                cancelText="ยกเลิก"
                selectText="ยืนยัน"
                placeholder="วันที่รักษา"
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
              <label class="block text-600 text-sm font-bold mb-2">
                ระยะห่างการตรวจครั้งต่อไป
              </label>
              <Dropdown
                class="w-full"
                v-model="form.CureNextMonth"
                :options="CureNextMonth"
                optionLabel="label"
                optionValue="id"
                :class="{ 'p-invalid': valid }"
                :showClear="true"
                placeholder="ระยะห่างการตรวจครั้งต่อไป"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่นัดตรวจครั้งถัดไป<span class="text-red-500"> *</span>
              </label>
              <!-- <Calendar
                class="w-full"
                v-model="form.VaccineNextDate"
                dateFormat="dd/mm/yy"
                :manualInput="false"
                :class="{ 'p-invalid': !form.VaccineNextDate && valid }"
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
                placeholder="วันที่บันทึก"
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
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสเจ้าหน้าที่รับผิดชอบ<span class="text-red-500"> *</span>
              </label>

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
                  'p-invalid': !form.StaffID && valid,
                }"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หน่วยงานที่ตรวจ<span class="text-red-500"> *</span>
              </label>
              <Dropdown
                class="w-full"
                v-model="form.OrganizationID"
                :options="organization"
                optionLabel="OrganizationName"
                optionValue="OrganizationID"
                :filter="true"
                :showClear="true"
                placeholder="เลือกหน่วยงาน"
              />
            </div>

            <div class="field col-12 sm:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ผลการรักษา
              </label>
              <InputText class="w-full" type="text" v-model="form.Remark" />
            </div>

            <div
              class="field col-12 sm:col-12 grid"
              v-for="i in antibiotic"
              :key="i"
            >
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  ยาที่ใช้รักษา {{ i }}<span class="text-red-500"> *</span>
                </label>
                <Dropdown
                  class="w-full"
                  :options="itemsCureAntibiotic.CureAntibiotic"
                  optionLabel="CureAntibioticName"
                  optionValue="CureAntibioticID"
                  placeholder="เลือกยาที่ใช้รักษา"
                  :showClear="true"
                  :filter="true"
                  v-model="form.CureAntibioticID[i - 1][0]"
                  :class="{ 'p-invalid': !form.CureAntibioticID && valid }"
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  ปริมาณที่ใช้<span class="text-red-500"> *</span>
                </label>
                <InputText
                  class="w-full"
                  type="text"
                  v-model="form.CureAntibioticID[i - 1][1]"
                  placeholder="ระบุปริมาณที่ใช้"
                />
              </div>
            </div>

            <div class="field col-12 sm:col-12">
              <Button
                label="เพิ่มยา"
                icon="pi pi-plus"
                @click="plus_antibiotic()"
              />
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
            <DataTable
              class="text-sm"
              :value="animal"
              :loading="isLoading"
              v-model:selection="form.Animal"
              :dataKey="id"
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
            </DataTable>
            <Paginator
              @page="page($event)"
              :rows="15"
              :totalRecords="total"
            ></Paginator>
            <div class="col-12 text-center mt-5">
              <router-link to="/activity/vaccine">
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
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import { mapGetters } from "vuex";
// import  _  from "lodash";
import PageTitle from "@/components/PageTitle.vue";
import { format } from "date-fns";
import { th } from "date-fns/locale";
export default {
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      user: "user",
    }),
  },
  components: {
    PageTitle,
  },
  data() {
    return {
      key: this.$route.params.id,
      url: "/animal?FarmID=" + this.$route.params.id,
      apiPersonal: "/staff/selection?includeAll=false",
      postCureActivity: "/cure-activity",
      urlDisease: "/disease",
      urlCureAntibiotic: "/cure-antibiotic",

      urlOrganization: "/organization/selection?includeAll=false",
      CureNextMonth: [
        { label: "1 เดือน", id: 1 },
        { label: "2 เดือน", id: 2 },
        { label: "3 เดือน", id: 3 },
        { label: "6 เดือน", id: 6 },
      ],

      id: "AnimalID",
      columns: [
        // {
        //   field: "show_id",
        //   header: "ลำดับ",
        // },
        {
          field: "AnimalEarID",
          header: "หมายเลขสัตว์",
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
      ],
      isLoading: false,
      loader: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,
      valid: false,
      form: {
        isActive: 1,
        Animal: [],
        AnimalID: [],
        FarmID: this.$route.params.id,
        FarmIdentificationNumber: this.$route.params.farm,
        CureNextMonth: [],
        CureAntibioticID: [[]],
      },
      itemsCureMethod: [],
      itemsCureAntibiotic: [],
      itemsDisease: [],
      itemsAnimal: [],
      antibiotic: 1,
      data: [],
      animal: [],
      Farm: [],
      breadcrumb: [
        { label: "ข้อมูลสุขภาพ : การรักษา", to: "/activity/vaccine" },
        { label: "", to: "" },
      ],
      dropdown: {
        Diseases: [],
        CureMethods: [],
        Organizations: [],
        FarmAnimalTypes: [
          { name: "โค", id: 1 },
          { name: "กระบือ", id: 2 },
          { name: "แพะ", id: 3 },
          { name: "ทุกประเภทสัตว์", id: 99 },
          { name: "ยังไม่ได้เลือกชนิดสัตว์", id: 98 },
        ],
        CureAnitibioticTypes: [
          { name: "ยา", id: 1 },
          { name: "ฮอร์โมน", id: 2 },
          { name: "แพะ", id: 3 },
          { name: "ทุกประเภทสัตว์", id: 99 },
          { name: "ยังไม่ได้เลือกชนิดสัตว์", id: 98 },
        ],
      },
      controller: new AbortController(),
    };
  },
  loadLazyTimeout: null,
  watch: {
    "form.Animal"() {
      let val = [];
      let res = [];

      val = this.form.Animal;
      for (let index = 0; index < val.length; index++) {
        res[index] = val[index].AnimalID;
      }
      this.form.AnimalID = res;
      return this.form.AnimalID;
    },

    "form.AnimalChoose"() {
      let res = [];

      res[0] = this.form.AnimalChoose;
      this.form.AnimalID = res;

      this.animal = this.data.filter((x) => {
        return x.AnimalID == this.form.AnimalChoose;
      });

      return this.form.AnimalID;
    },

    "form.CureNextMonth"() {
      if (this.form.CureNextMonth == 1) {
        this.form.CureNextDate = dayjs(this.form.CureActivityDate)
          .add(1, "month")
          .format("YYYY-MM-DD");
      } else if (this.form.CureNextMonth == 2) {
        this.form.CureNextDate = dayjs(this.form.CureActivityDate)
          .add(2, "month")
          .format("YYYY-MM-DD");
      } else if (this.form.CureNextMonth == 3) {
        this.form.CureNextDate = dayjs(this.form.CureActivityDate)
          .add(3, "month")
          .format("YYYY-MM-DD");
      } else if (this.form.CureNextMonth == 6) {
        this.form.CureNextDate = dayjs(this.form.CureActivityDate)
          .add(6, "month")
          .format("YYYY-MM-DD");
      } else {
        console.log("ERROR");
      }
    },
  },
  async mounted() {
    await axios
      .get("/staff/selection?includeAll=false", {
        signal: this.controller.signal,
      })
      .then((response) => {
        this.personal = response.data.rows.map((item) => {
          return {
            StaffID: item.StaffID,
            // StaffNumber: item.StaffNumber,
            StaffFullName: item.StaffFullName,
          };
        });
      })
      .finally(() => {
        this.loader = true;
      });
    this.load();

    this.breadcrumb[1].label = this.name;
    this.form.ResponsibilityStaffID = this.user.StaffID;
    this.form.OrganizationID = this.user.Staff.StaffOrganizationID;
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

    plus_antibiotic() {
      this.antibiotic += 1;
      this.form.CureAntibioticID.push([]);
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
    async load() {
      this.isLoading = true;
      let url = this.url + "&isRemove=0&size=500";
      url += "&page=";
      if (this.curpage) {
        url += this.curpage;
      }
      if (this.form.FarmID) {
        url += "&FarmID=" + this.form.FarmID;
      }
      if (this.animal_id == 1) {
        url += "&AnimalTypeID=" + "[1,2,41,42]";
        // this.data = response.data.rows.filter(
        //   (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
        // );
      } else if (this.animal_id == 2) {
        url += "&AnimalTypeID=" + "[3,4,43,44]";

        // this.data = response.data.rows.filter(
        //   (item) => item.AnimalTypeID === 3 || item.AnimalTypeID === 4
        // );
      } else if (this.animal_id == 3) {
        url += "&AnimalTypeID=" + "[17,18,45,46]";

        // this.data = response.data.rows.filter(
        //   (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
        // );
      }
      axios
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.total = response.data.total;
          this.data = response.data.rows;

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

          this.animal = [];
          this.itemsAnimal.Animal = [...this.data];
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get("/cure-method", {
          signal: this.controller.signal,
          params: { AnimalTypeID: "[1]" },
        })
        .then((res) => {
          this.itemsCureMethod.CureMethod = res.data.rows;

          //   this.itemsCureMethod.CureMethod = res.data.rows.filter((x) => {
          //     return x == true
          //   });
        })
        .finally(() => {
          this.loader = true;
        });

      axios
        .get("/cure-antibiotic", {
          signal: this.controller.signal,
          params: { AnimalTypeID: "[1]" },
        })
        .then((res) => {
          this.itemsCureAntibiotic.CureAntibiotic = res.data.rows;
        })
        .finally(() => {
          this.loader = true;
        });

      axios
        .get("/disease", { signal: this.controller.signal })
        .then((res) => {
          this.itemsDisease.Disease = res.data.rows;
        })
        .finally(() => {
          this.loader = true;
        });

      await axios
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
            this.$route.params.farm +
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
    },
    validation() {
      if (
        !this.form.CureMethodID ||
        !this.form.CureActivityDate ||
        !this.form.CureNextDate ||
        !this.form.ResponsibilityStaffID ||
        !this.form.OrganizationID ||
        !this.form.AnimalID
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

      console.log(this.form)

      axios
        .post(
          "/cure-activity",
          {
            CureActivityDate: this.form.CureActivityDate,
            AnimalID: this.form.AnimalID[0],
            DiseaseID: this.form.DiseaseID,
            CureMethodID: this.form.CureMethodID,
            CureMethodOther: this.form.CureMethodOther,
            CureNextDate: this.form.CureNextDate,
            CureAntibioticID: this.form.CureAntibioticID,
            OrganizationID: this.form.OrganizationID,
            ResponsibilityStaffID: this.form.ResponsibilityStaffID,
            Remark: this.form.Remark,
            // DiseaseActivityDate: this.form.DiseaseActivityDate,
            // CureNextDateOption: this.form.CureNextDateOption,
            // FarmID: this.form.FarmID,
            // VaccineID: this.form.VaccineID,
          },
        )
        .then(() => {
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ข้อมูลการรักษาถูกบันทึก",
            life: 2000,
          });
          setTimeout(() => {
            this.$router.push("/activity/treatment");
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
    // onLazyLoad() {
    //   this.loading = true;

    //   if (this.loadLazyTimeout) {
    //     clearTimeout(this.loadLazyTimeout);
    //   }

    //   this.loadLazyTimeout = setTimeout(() => {
    //     this.loading = false;
    //   }, Math.random() * 1000 + 250);
    // },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>
