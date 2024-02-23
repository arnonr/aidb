<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ดูรายละเอียดข้อมูลฉีดวัคซีน" :pages="breadcrumb" />
      <div class="card">
        <form>

          <div class="mb-5">
            <h1 class="text-2xl mb-0 text-600">
              ดูรายละเอียดข้อมูลฉีดวัคซีน
            </h1>
          </div>

          <div v-if="loader" class="col-12 lg:col-12">
            <div class="formgrid grid">
              <div class="field col-12 sm:col-12">
                <label class="block text-600 text-sm font-bold mb-2">
                  ฟาร์ม
                </label>
                <InputText class="w-full" v-model="form.FullName" disabled />

                <!-- <Dropdown
                    class="w-full"
                    v-model="form.FarmID"
                    :options="Farm.data"
                    optionLabel="FarmIdentificationNumber"
                    optionValue="FarmID"
                    :filter="true"
                    :showClear="true"
                    @change="load"
                    disabled
                  >
                  </Dropdown> -->
              </div>

              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  จุดประสงค์การฉีดวัคซีน
                </label>
                <InputText class="w-full" v-model="form.VaccineObjectiveName" disabled />

                <!-- <Dropdown
                    class="w-full"
                    :options="itemsVaccine.VaccineObjective"
                    optionLabel="VaccineObjectiveName"
                    optionValue="VaccineObjectiveID"
                    :showClear="true"
                    :filter="true"
                    v-model="form.VaccineObjectiveID"
                    disabled
                  /> -->
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  ชนิดวัคซีน
                </label>
                <InputText class="w-full" type="text" v-model="form.VaccineName" disabled />
                <!-- <Dropdown
                    class="w-full"
                    v-model="form.VaccineID"
                    :options="itemsVaccine.Vaccine"
                    optionLabel="VaccineName"
                    optionValue="VaccineID"
                    :showClear="true"
                    disabled
                  /> -->
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  LOT
                </label>
                <InputText class="w-full" type="text" v-model="form.Lot" disabled />
              </div>
              <div class="field col-12 sm:col-6" />
              <div class="field col-12 sm:col-6">

                <label class="block text-600 text-sm font-bold mb-2">
                  วันที่ฉีด
                </label>
                <Calendar class="w-full" v-model="form.ThaiVaccineActivityDate" dateFormat="dd/mm/yy"
                  :manualInput="false" disabled />
              </div>

              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  วันที่การฉีดครั้งต่อไป
                </label>
                <Calendar class="w-full" v-model="form.ThaiVaccineNextDate" dateFormat="dd/mm/yy" :manualInput="false"
                  disabled />

              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  เจ้าหน้าที่ผู้รับผิดชอบ
                </label>
                <InputText class="w-full" type="text" v-model="form.ResponsibilityStaffName" disabled />
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  หน่วยงานที่รับผิดชอบ
                </label>
                <InputText class="w-full" type="text" v-model="form.OrganizationName" disabled />
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  หมายเหตุ
                </label>
                <InputText class="w-full" type="text" v-model="form.Remark" disabled />
              </div>
            </div>
          </div>

          <div class="mt-5">
            <div class="mb-5">
              <h4 class="text-2xl mb-0 text-600">
                จำนวนสัตว์ที่ฉีดวัคซีน : {{ data.length }}
              </h4>
            </div>
            <DataTable class="text-sm" :value="data" :paginator="true" :rows="10" :loading="isLoading" :dataKey="id"
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
              responsiveLayout="scroll" currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
              @sort="sort($event)">
              <!-- <Column selectionMode="multiple" class="text-center"></Column> -->
              <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"
                class="text-center" :sortable="true">
              </Column>
              <Column field="AnimalStatusID" header="สถานะ" class="text-center" :sortable="true">
                <template #body="slotProps">
                  <div v-for="item in animal_status.data" :key="item.id">
                    <div v-if="
                      item.AnimalStatusID == slotProps.data.AnimalStatusID
                    ">
                      {{ item.AnimalStatusName }}
                    </div>
                  </div>
                </template>
              </Column>
            </DataTable>
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

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      key: this.$route.params.id,
      url: {
        animal: "/animal",
        apiFarm: "/farm",
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
      loader: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,
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
    };
  },
  loadLazyTimeout: null,

  mounted() {
    this.field();

    // axios
    //   .get(this.url.apiFarm, {
    //     signal: this.controller.signal,
    //   })
    //   .then((response) => {
    //     this.farm = response.data.rows;
    //   });
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
            ThaiVaccineActivityDate: item.ThaiVaccineActivityDate,
            FarmID: item.FarmID,
            VaccineName: item.VaccineName,
            Lot: item.Lot,
            ThaiVaccineNextDate: item.ThaiVaccineNextDate,
            VaccineObjectiveName: item.VaccineObjectiveName,

            OrganizationName: item.Organization.OrganizationName ?? '-',
            ResponsibilityStaffName: item.ResponsibilityStaffName,
            Remark: item.Remark,
            isActive: item.isActive,
          };
        })
        .finally(() => {
          this.isLoading = false;
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
