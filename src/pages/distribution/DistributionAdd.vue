<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="เพิ่มข้อมูลคัดจำหน่ายแบบหลายตัว" :pages="breadcrumb" />

      <div class="card">
        <h1 class="text-2xl font-normal text-600 mb-4">เพิ่มข้อมูลคัดจำหน่ายแบบหลายตัว</h1>
        <div class="formgrid grid mb-3">
          <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              หมายเลขฟาร์ม<span class="text-red-500"> *</span>
            </label>
            <InputText
              v-if="form.FarmIdentificationNumber != null"
              class="w-full"
              v-model="form.FarmIdentificationNumber"
              disabled
            />
            <Dropdown
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
            </Dropdown>
          </div>
          <div class="field col-12 sm:col-6">
            <label
              for="distributionexamined"
              class="block text-600 text-sm font-bold mb-2"
              >ประเภทการคัดจำหน่าย<span class="text-red-500"> *</span></label
            >
            <Dropdown
              class="w-full"
              v-model="form.DistributionType"
              :options="itemDistributionType"
              optionLabel="name"
              optionValue="value"
              :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: onLazyLoad,
                itemSize: 38,
                showLoader: true,
                loading: loading,
                delay: 250,
              }"
              :class="{ 'p-invalid': !form.DistributionType && valid }"
              :filter="true"
              :showClear="true"
              placeholder="เลือกหรือค้นหาประเภทการคัดจำหน่าย"
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
              >สาเหตุที่คัดจำหน่าย</label
            >
            <Dropdown
              class="w-full"
              :options="itemDistribution.DistributionReason"
              optionLabel="DistributionReasonName"
              optionValue="DistributionReasonID"
              v-model="form.DistributionReasonID"
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
              placeholder="เลือกหรือค้นหา"
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

         <div class="field col-12 sm:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ฟาร์มปลายทางที่คัดจำหน่าย<span class="text-red-500"> *</span>
            </label>
            <Dropdown
              class="w-full"
              v-model="form.DestinationFarmID"
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
              placeholder="เลือกหมายเลขฟาร์มปลายทาง"
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
            </Dropdown>
          </div>
         <div class="field col-12 sm:col-6">
            <label
              for="inspectionagency"
              class="block text-600 text-sm font-bold mb-2"
              >หน่วยงานที่ตรวจ</label
            >
            <Dropdown
              class="w-full"
              v-model="form.DestinationOrganizationID"
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

             <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  สถานที่ปลายทางที่คัดจำหน่าย<span class="text-red-500"> </span>
                </label>
                <InputText
                  class="w-full"
                  type="text"
                  v-model="form.DestinationPlace"
                  placeholder="ใส่ชื่อสถานที่"
                  :class="{ 'p-invalid': !form.DestinationPlace && valid }"
                />
           </div>
             <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  วันที่คัดจำหน่าย<span class="text-red-500"> *</span>
                </label>
                <Calendar
                  class="w-full"
                  v-model="form.DistributionDate"
                  dateFormat="dd/mm/yy"
                  :manualInput="false"
                  :class="{ 'p-invalid': !form.DistributionDate && valid }"
                />
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
              showClear="true"
              :filter="true"
              v-model="form.ResponsibilityStaffID"
              :class="{
                'p-invalid': !form.ResponsibilityStaffID && valid,
              }"
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
            <router-link to="/activity/distribution">
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

export default {
  computed: {
    ...mapGetters({
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
      urlDistribution: "/distribution",
      urlDistributionReason: "/distribution-reason",
      urlPersonal: "/staff?isActive=1",
      urlOrganization: "/organization",
      postDistribution: "/distribution",

      id: "AnimalID",
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
        {
          field: "AnimalIdentificationID",
          header: "หมายลขโค",
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
     itemDistributionType: [
        { name: "ตาย", value: "DEATH" },
        { name: "ขาย",  value: "SALE" },
        { name: "คัดทิ้ง",  value: "DROP" },
        { name: "ย้าย",  value: "TRANSFER" },
      ],

      isLoading: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,
      valid: false,
      sortBy: [],
      Farm: [],

      controller: new AbortController(),
      itemDistribution: [],

      form: {
        isActive: 1,
        Animal: [],
        AnimalID: [],
        FarmID: this.$route.params.id,
        FarmIdentificationNumber: this.$route.params.farm,
      },

      breadcrumb: [
        { label: "คัดจำหน่ายแบบหลายตัว", to: "/activity/distribution" },
        { label: "", to: "" },
      ],
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
  mounted() {
    this.load();

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
        .get(this.urlDistributionReason, { signal: this.controller.signal })
        .then((res) => {
          this.itemDistribution.DistributionReason = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.urlDisease, {
          signal: this.controller.signal,
        })
        .then((res) => {
          // console.log(res);
          this.itemDistribution.distribution = res.data.rows;
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
        !this.form.DestinationPlace ||
        !this.form.DistributionDate ||
        !this.form.DistributionType ||
        !this.form.DistributionReasonID ||
        !this.form.DestinationFarmID ||
        !this.form.DestinationOrganizationID ||
        !this.form.ResponsibilityStaffID ||
        !this.form.FarmID ||
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
    add() {
      if (this.validation() == false) {
        return;
      }

      axios
        .post(this.postDistribution, this.form)
        .then(() => {
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ข้อมูลฟาร์มถูกบันทึก",
            life: 5000,
          });
          setTimeout(() => {
            this.$router.push("/activity/distribution");
          }, 500);
        })

        .catch((err) => {
          // console.log(this.form.AnimalID);
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
