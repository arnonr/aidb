<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="แก้ไขข้อมูลถ่ายพยาธิ" :pages="breadcrumb" />

      <div class="card">
        <h1 class="text-2xl text-600 mb-5">แก้ไขข้อมูลถ่ายพยาธิ</h1>
        <div v-if="loader" class="formgrid grid mb-3">
          <div class="field col-12 sm:col-12">
            <label
              for="farmnumber"
              class="block text-600 text-sm font-bold mb-2"
              >ฟาร์ม<span class="text-red-500"> *</span></label
            >
            <InputText class="w-full" v-model="form.FullName" disabled />
          </div>
          <div class="field col-12 sm:col-6">
            <label for="drug" class="block text-600 text-sm font-bold mb-2"
              >ยาถ่ายพยาธิที่ใช้<span class="text-red-500"> *</span></label
            >
            <Dropdown
              class="w-full"
              :options="items.DewormMedicine"
              optionLabel="DewormMedicineName"
              optionValue="DewormMedicineID"
              placeholder="เลือกยา"
              :showClear="true"
              :filter="true"
              v-model="form.DewormMedicineID"
              :class="{ 'p-invalid': !form.DewormMedicineID && valid }"
            />
          </div>
          <div class="field col-12 sm:col-6">
            <label
              for="otherdrugs"
              class="block text-600 text-sm font-bold mb-2"
              >หมายเหตุ (ถ้ามี<span class="text-red-500"> </span
            ></label>
            <InputText
              id="otherdrugs"
              v-model="form.Remark"
              type="text"
              class="w-full"
            />
          </div>
          <div class="field col-12 sm:col-6">
            <label for="date" class="block text-600 text-sm font-bold mb-2"
              >วันที่ถ่ายพยาธิ<span class="text-red-500"> *</span></label
            >
            <Datepicker
              v-model="form.DewormActivityDate"
              :class="{ 'p-invalid': !form.DewormActivityDate && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              :maxDate="new Date()"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="วันที่บันทึก"
            >
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
              <template #year-overlay="{ value }">
                {{ value + 543 }}
              </template>
            </Datepicker>
          </div>
          <div class="field col-6 sm:col-6">
            <label for="tomorrow" class="block text-600 text-sm font-bold mb-2"
              >วันที่ถ่ายพยาธิครั้งต่อไป<span class="text-red-500">
                *</span
              ></label
            >
            <Datepicker
              v-model="form.DewormNextDate"
              :class="{ 'p-invalid': !form.DewormNextDate && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="วันที่บันทึก"
            >
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
              <template #year-overlay="{ value }">
                {{ value + 543 }}
              </template>
            </Datepicker>
          </div>
          <div class="field col-12 sm:col-6">
            <label for="owner" class="block text-600 text-sm font-bold mb-2"
              >เจ้าหน้าที่ผู้รับผิดชอบ<span class="text-red-500">
                *</span
              ></label
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
              :class="{ 'p-invalid': !form.OrganizationID && valid }"
              :filter="true"
              :showClear="true"
              placeholder="เลือกหน่วยงาน"
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
        <div v-if="form.FarmID" class="mt-5">
          <h4 class="text-2xl text-600 mb-5">
            จำนวนสัตว์ที่ถ่ายพยาธิ : {{ data.length }}
          </h4>

          <DataTable
            class="text-sm"
            :value="data"
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
            >
            </Column>
          </DataTable>
          <Paginator
            @page="page($event)"
            :rows="15"
            :totalRecords="total"
          ></Paginator>
          <div class="col-12 text-center mt-5">
            <router-link to="/activity/deworm">
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
        <!-- <div class="mt-5">
          <DataTable
            class="text-sm"
            :value="data"
            v-model:selection="selectedAnimal"
            dataKey="id"
            :paginator="true"
            :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
            <Column
              selectionMode="multiple"
              :exportable="false"
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
          <div class="col-12 text-center mt-5">
            <router-link to="/activity/deworm">
              <Button
                label="ยกเลิก"
                icon="pi pi-times"
                class="p-button-text mx-2"
              />
            </router-link>
            <Button label="บันทึกข้อมูล" icon="pi pi-save" autofocus />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import { reactive, ref } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import axios from "axios";
import dayjs from "dayjs";
import { format } from "date-fns";
import { th } from "date-fns/locale";
export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      breadcrumb: [
        { label: "กิจกรรม", to: "/" },
        {
          label: "ข้อมูลสุขภาพ : เพิ่มข้อมูลตรวจโรค",
          to: "/activity/diagnose/add",
        },
      ],
      url: "/animal",
      apiPersonal: "/staff?isActive=1",
      putDeworm: "/deworm-activity/" + this.$route.params.id,
      id: "AnimalID",
      isLoading: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,
      loader: false,
      valid: false,
      AnimalID: 1,
      form: {
        isActive: 1,
        // AnimalID: [1,2],
        Animal: [],
        AnimalID: [],
      },
      formdata: [],
      data: [],
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
        // {
        //   field: "AnimalStatus.AnimalStatusName",
        //   header: "สถานะ",
        // },
        // {
        //   field: "AnimalFarm.FarmName",
        //   header: "สัตว์อยู่ที่ฟาร์ม...",
        // },
      ],
      sortBy: [],
      Farm: [],
      items: [],
      controller: new AbortController(),
    };
  },
  loadLazyTimeout: null,

  async mounted() {
    // this.breadcrumb[1].label = this.name;

    await axios
      .get(this.apiPersonal, {
        signal: this.controller.signal,
      })
      .then((response) => {
        this.personal = response.data.rows;
      })
      .finally(() => {
        this.loader = true;
      });
    this.field();
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
        this.load();
      }
    },
    // page change
    page($event) {
      this.curpage = $event.page + 1;
      this.load();
    },
    async field() {
      this.isLoading = true;
      axios
        .get("/organization", {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.organization = response.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });

      let url = this.putDeworm + "?size=15";
      url += "&page=";
      if (this.curpage) {
        url += this.curpage;
      }
      //   console.log(url);
      axios
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.data = response.data.Animal;

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
      axios
        .get("/deworm-medicine", { signal: this.controller.signal })
        .then((res) => {
          this.items.DewormMedicine = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });

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

      await axios
        .get(this.putDeworm, { signal: this.controller.signal })
        .then((res) => {
          let item = res.data;
          // console.log(item);
          this.form = {
            FarmID: item.FarmID,
            DewormActivityDate: item.DewormActivityDate,
            AnimalID: item.AnimalID,
            DewormMedicineID: item.DewormMedicineID,
            DewormNextDate: item.DewormNextDate,
            OrganizationID: item.OrganizationID,
            ResponsibilityStaffID: item.ResponsibilityStaffID,
            Remark: item.Remark,
            isActive: item.isActive,
          };

          //   console.log(this.form.FarmID);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    validation() {
      if (
        !this.form.DewormActivityDate ||
        !this.form.DewormMedicineID ||
        !this.form.DewormNextDate ||
        !this.form.OrganizationID ||
        !this.form.ResponsibilityStaffID ||
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
    submit() {
      if (this.validation() == false) {
        return;
      }

      axios
        .put(this.putDeworm, this.form)
        .then(() => {
          // field();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ข้อมูลถูกบันทึก",
            // detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });
          setTimeout(() => {
            this.$router.push("/activity/deworm");
          }, 4000);
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
