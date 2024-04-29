<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="เพิ่มข้อมูลคัดจำหน่าย" :pages="breadcrumb" />
      <div class="card">
        <form>
          <div class="mb-5">
            <h1 class="text-2xl mb-0 text-600">เพิ่มข้อมูลการคัดจำหน่าย</h1>
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
            <!-- <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ชื่อฟาร์ม
                  </label>
                  <InputText class="w-full" type="text" v-model="value1" />
                </div> -->

            <div class="field col-12 sm:col-4">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่คัดจำหน่าย<span class="text-red-500"> *</span>
              </label>

              <Datepicker
                v-model="form.DistributionDate"
                :class="{ 'p-invalid': !form.DistributionDate && valid }"
                id="dateRange"
                locale="th"
                :format="format"
                utc
                :enableTimePicker="false"
                :maxDate="new Date()"
                cancelText="ยกเลิก"
                selectText="ยืนยัน"
                placeholder="วันที่คัดจำหน่าย"
              >
                <template #year-overlay-value="{ text }">
                  {{ parseInt(text) + 543 }}
                </template>
                <template #year="{ year }">
                  {{ year + 543 }}
                </template>
              </Datepicker>
            </div>
            <div class="field col-12 sm:col-4">
              <label class="block text-600 text-sm font-bold mb-2">
                ประเภทการคัดจำหน่าย<span class="text-red-500"> *</span>
              </label>
              <Dropdown
                class="w-full"
                v-model="form.DistributionType"
                :options="itemDistributionType"
                optionLabel="name"
                optionValue="value"
                :showClear="true"
                :filter="true"
                :virtualScrollerOptions="{
                  lazy: true,
                  onLazyLoad: onLazyLoad,
                  itemSize: 38,
                  showLoader: true,
                  loading: loading,
                  delay: 250,
                }"
                :class="{ 'p-invalid': !form.DistributionType && valid }"
              />
            </div>
            <div class="field col-12 sm:col-4">
              <label class="block text-600 text-sm font-bold mb-2">
                สาเหตุที่คัดจำหน่าย<span class="text-red-500"> *</span>
              </label>
              <Dropdown
                class="w-full"
                :options="itemDistribution.DistributionReason"
                optionLabel="DistributionReasonName"
                optionValue="DistributionReasonID"
                v-model="form.DistributionReasonID"
                :showClear="true"
              />
            </div>
            <div
              class="field col-12 sm:col-4"
              v-if="
                form.DistributionType == 'SALE' ||
                form.DistributionType == 'TRANSFER'
              "
            >
              <label class="block text-600 text-sm font-bold mb-2">
                ฟาร์มปลายทางที่คัดจำหน่าย<span class="text-red-500"> *</span>
              </label>
              <v-select
                v-model="form.DestinationFarmID"
                :options="selections.DestinationFarmIDFilter"
                @search="fetchDestinationFarmOptions"
                label="Fullname"
                value="FarmID"
                class="w-full"
                placeholder="เลือกฟาร์มปลายทาง (พิมพ์ 3 ตัวอักษรเพื่อค้นหา)"
              ></v-select>
            </div>
            <div class="field col-12 sm:col-4">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสเจ้าหน้าที่รับผิดชอบ<span class="text-red-500"> *</span>
              </label>

              <Dropdown
                :virtualScrollerOptions="{ itemSize: 38 }"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกรหัสเจ้าหน้าที่ผสมเทียม"
                optionLabel="StaffFullName"
                optionValue="StaffID"
                v-model="form.ResponsibilityStaffID"
                :options="selections.Staff"
                :filterFields="[
                  'StaffNumber',
                  'StaffGivenName',
                  'StaffSurname',
                ]"
                :filter="true"
                filterPlaceholder="รหัสเจ้าหน้าที่ผสมเทียม"
                :class="{
                  'p-invalid': !form.StaffID && valid,
                }"
              >
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
          <div class="mt-5">
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
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      user: "user",
    }),
  },
  components: {
    PageTitle,
    vSelect,
  },
  data() {
    return {
      key: this.$route.params.id,
      url: "/animal?FarmID=" + this.$route.params.id,
      apiPersonal: "/staff/selection?includeAll=false",
      postDistribution: "/distribution/post-all",
      urlOrganization: "/organization/selection?includeAll=false",
      urlDistribution: "/distribution",
      urlDistributionReason: "/distribution-reason",
      id: "AnimalID",
      itemDistribution: [],
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
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
      itemDistributionType: [
        { name: "ตาย", value: "DEATH" },
        { name: "ขาย", value: "SALE" },
        { name: "คัดทิ้ง", value: "DROP" },
        { name: "ย้าย", value: "TRANSFER" },
      ],
      isLoading: false,
      loader: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,
      valid: false,
      selections: {
        Staff: null,
        DistributionReasonID: null,
        DestinationFarmID: null,
        DestinationFarmIDFilter: [],
        DistributionType: [
          {
            header: "ตาย",
            val: "DEATH",
          },
          {
            header: "ขาย",
            val: "SALE",
          },
          {
            header: "คัดทิ้ง",
            val: "DROP",
          },
          //   {
          //     header: "ย้าย",
          //     val: "TRANSFER",
          //   },
        ],
      },
      form: {
        isActive: 1,
        Animal: [],
        AnimalID: [],
        FarmID: this.$route.params.id,
        FarmIdentificationNumber: this.$route.params.farm,
        VaccineNextMonth: [],
      },
      itemsVaccine: [],

      data: [],
      Farm: [],
      DestinationFarmID: "/farm/selection?includeAll=false&isActive=1",

      breadcrumb: [
        { label: "คัดจำหน่ายแบบหลายตัว", to: "/activity/distribution" },
        { label: "", to: "" },
      ],

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
  },
  async mounted() {
    await axios
      .get("/staff/selection?includeAll=false", {
        signal: this.controller.signal,
      })
      .then((response) => {
        this.selections.Staff = response.data.rows.map((item) => {
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
      let url = this.url + "&size=15";
      url += "&page=";
      if (this.curpage) {
        url += this.curpage;
      }
      if (this.form.FarmID) {
        url += "&FarmID=" + this.form.FarmID;
      }
      if (this.animal_id == 1) {
        url += "&AnimalTypeID=" + "[1, 2]";
        // this.data = response.data.rows.filter(
        //   (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
        // );
      } else if (this.animal_id == 2) {
        url += "&AnimalTypeID=" + "[3, 4]";

        // this.data = response.data.rows.filter(
        //   (item) => item.AnimalTypeID === 3 || item.AnimalTypeID === 4
        // );
      } else if (this.animal_id == 3) {
        url += "&AnimalTypeID=" + "[17, 18]";

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
        })
        .finally(() => {
          this.isLoading = false;
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

      this.fetchDistributionReason();
    },
    fetchDistributionReason() {
      axios
        .get(this.urlDistributionReason, { signal: this.controller.signal })
        .then((res) => {
          this.itemDistribution.DistributionReason = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async fetchDestinationFarmOptions(search) {
      if (search.length < 3) {
        this.selections.DestinationFarmIDFilter = [];
        return;
        // this.selection.DestinationFarmIDFilter =
        //   this.selection.DestinationFarmID.filter((x) => {
        //     return x.Fullname.includes(search); //|| x.FarmIdentificationNumber.includes(search);
        //   });
      } else {
        let params = {};

        params["Fullname"] = search;

        await axios
          .get(this.DestinationFarmID, {
            signal: this.controller.signal,
            params: {
              ...params,
              size: undefined,
              page: 1,
            },
          })
          .then((response) => {
            this.selections.DestinationFarmIDFilter = response.data.rows;
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    validation() {
      if (
        !this.form.DistributionReasonID ||
        !this.form.DistributionType ||
        !this.form.DistributionDate ||
        !this.form.ResponsibilityStaffID
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
    add() {
      if (this.validation() == false) {
        return;
      }
      // this.form.VaccineActivityDate = new Date(
      //   this.form.VaccineActivityDate
      // ).toLocaleDateString();
      // this.form.VaccineNextDate = new Date(
      //   this.form.VaccineNextDate
      // ).toLocaleDateString();
      console.log(this.form);
      console.log("FREEDOM");

      if (this.form.DistributionType == "SALE") {
        let DesFarmID = this.form.DestinationFarmID.FarmID;
        this.form.DestinationFarmID = DesFarmID;
      }

      axios
        .post(this.postDistribution, this.form, {
          signal: this.controller.signal,
        })
        .then(() => {
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ข้อมูลการคัดจำหน่ายถูกบันทึก",
            life: 2000,
          });
          setTimeout(() => {
            this.$router.push("/activity-distributions");
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
<style>
.vs__search {
  padding: 6px !important;
}
</style>
