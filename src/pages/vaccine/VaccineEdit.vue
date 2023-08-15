<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="แก้ไขข้อมูลฉีดวัคซีน" :pages="breadcrumb" />
      <div class="card">
        <form>
          <div class="mb-5">
            <h1 class="text-2xl mb-0 text-600">แก้ไขข้อมูลฉีดวัคซีน</h1>
          </div>

          <div v-if="loader" class="col-12 lg:col-12">
            <div class="formgrid grid">
              <div class="field col-12 sm:col-12">
                <!-- <label class="block text-600 text-sm font-bold mb-2">
                    หมายเลขฟาร์ม
                  </label> -->
                <label class="block text-600 text-sm font-bold mb-2">
                  ฟาร์ม<span class="text-red-500"> *</span>
                </label>
                <InputText class="w-full" v-model="form.FullName" disabled />
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  จุดประสงค์การฉีดวัคซีน
                </label>
                <Dropdown
                  class="w-full"
                  :options="itemsVaccine.VaccineObjective"
                  optionLabel="VaccineObjectiveName"
                  optionValue="VaccineObjectiveID"
                  placeholder="เลือกจุดประสงค์"
                  :showClear="true"
                  :filter="true"
                  v-model="form.VaccineObjectiveID"
                  :class="{ 'p-invalid': !form.VaccineObjectiveID && valid }"
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  ชนิดวัคซีน
                </label>
                <Dropdown
                  class="w-full"
                  v-model="form.VaccineID"
                  :options="itemsVaccine.Vaccine"
                  optionLabel="VaccineName"
                  optionValue="VaccineID"
                  :class="{ 'p-invalid': !form.VaccineID && valid }"
                  :showClear="true"
                  placeholder="เลือกชนิด"
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  LOT
                </label>
                <InputText
                  class="w-full"
                  type="text"
                  v-model="form.Lot"
                  placeholder="ใส่ตัวเลข เช่น 1"
                  :class="{ 'p-invalid': !form.Lot && valid }"
                />
              </div>
              <div class="field col-12 sm:col-6"></div>

              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  วันที่ฉีด
                </label>
                <Datepicker
                  v-model="form.VaccineActivityDate"
                  :class="{ 'p-invalid': !form.VaccineActivityDate && valid }"
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
                  วันที่การฉีดครั้งต่อไป
                </label>
                <Datepicker
                  v-model="form.VaccineNextDate"
                  :class="{ 'p-invalid': !form.VaccineNextDate && valid }"
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
                  รหัสเจ้าหน้าที่รับผิดชอบ
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

                <!-- <Dropdown
                    class="w-full"
                    v-model="form.ResponsibilityStaffID"
                    :options="personal"
                    optionLabel="StaffFullName"
                    optionValue="StaffID"
                    :class="{
                      'p-invalid': !form.ResponsibilityStaffID && valid,
                    }"
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
                    placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
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
                          >{{ slotProps.option.StaffFullName }} |
                          {{ slotProps.option.StaffNumber }}
                        </span>
                      </div>
                    </template>
                  </Dropdown> -->
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
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  หมายเหตุ
                </label>
                <InputText class="w-full" type="text" v-model="form.Remark" />
              </div>
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
              :paginator="true"
              :rows="10"
              :loading="isLoading"
              :dataKey="id"
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
                @click="submit()"
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
import dayjs from "dayjs";
import axios from "axios";
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
      url: {
        animal: "/animal",
        apiPersonal: "/staff?isActive=1",
        putVaccineActivity: "/vaccine-activity/" + this.$route.params.id,
        VaccineObjective: "/vaccine-objective",
        Vaccine: "/vaccine",
      },

      id: "AnimalID",
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
      ],
      isLoading: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,
      loader: false,
      valid: false,
      form: {
        Animal: [],
        AnimalID: [],
      },
      itemsVaccine: [],
      data: [],
      Farm: [],
      animal_status: [],
      breadcrumb: [
        { label: "ข้อมูลสุขภาพ : ฉีดวัคซีน", to: "/activity/vaccine" },
        { label: "", to: "" },
      ],
      controller: new AbortController(),
      urlOrganization: "/organization",
    };
  },
  loadLazyTimeout: null,
  mounted() {
    this.field();
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
      let url = this.url.putVaccineActivity + "?size=15";
      url += "&page=";
      if (this.curpage) {
        url += this.curpage;
      }
      await axios
        .get(this.url.putVaccineActivity, { signal: this.controller.signal })
        .then((res) => {
          let item = res.data;
          // console.log(item);
          this.form = {
            VaccineActivityDate: item.VaccineActivityDate,
            FarmID: item.FarmID,
            VaccineID: item.VaccineID,
            Lot: item.Lot,
            VaccineNextDate: item.VaccineNextDate,
            VaccineObjectiveID: item.VaccineObjectiveID,
            OrganizationID: item.OrganizationID,
            ResponsibilityStaffID: item.ResponsibilityStaffID,
            Remark: item.Remark,
            isActive: item.isActive,
          };
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.apiPersonal, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.personal = response.data.rows;
        })
        .finally(() => {
          this.loader = true;
        });
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

      // axios
      //   .get("/farm", { signal: this.controller.signal })
      //   .then((res) => {
      //     this.Farm.data = res.data.rows;
      //     this.Farm.total = res.data.total;
      //   })
      //   .finally(() => {
      //     this.isLoading = false;
      //   });
      axios
        .get("/animal-status", { signal: this.controller.signal })
        .then((res) => {
          this.animal_status.data = res.data.rows;
          this.animal_status.total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.VaccineObjective, { signal: this.controller.signal })
        .then((res) => {
          this.itemsVaccine.VaccineObjective = res.data.rows;
        })
        .finally(() => {
          // this.isLoading = false;
          this.loader = true;
        });
      axios
        .get(this.url.Vaccine, { signal: this.controller.signal })
        .then((res) => {
          this.itemsVaccine.Vaccine = res.data.rows;
        })
        .finally(() => {
          // this.isLoading = false;
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
    },
    validation() {
      if (
        !this.form.VaccineID ||
        !this.form.VaccineObjectiveID ||
        !this.form.Lot ||
        !this.form.VaccineActivityDate ||
        !this.form.VaccineNextDate ||
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
    submit() {
      if (this.validation() == false) {
        return;
      }
      axios
        .put(this.url.putVaccineActivity, this.form)
        .then(() => {
          // field();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ข้อมูลฟาร์มถูกบันทึก",
            // detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 2000,
          });
          setTimeout(() => {
            this.$router.push("/activity/vaccine");
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
