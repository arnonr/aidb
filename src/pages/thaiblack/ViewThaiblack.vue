<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ดูรายละเอียดข้อมูลตรวจโรค" :pages="breadcrumb" />

      <div class="card">
        <h1 class="text-2xl text-600 mb-5">
          ดูรายละเอียดข้อมูลตรวจโรค
        </h1>
        <div class="formgrid grid mb-3">
          <div class="field col-12 sm:col-12">
            <label class="block text-600 text-sm font-bold mb-2">
              ฟาร์ม<span class="text-red-500"> *</span>
            </label>
            <InputText class="w-full" v-model="form.FullName" disabled />
          </div>
          <div class="field col-12 sm:col-6">
            <label for="diseaseexamined" class="block text-600 text-sm font-bold mb-2">โรคที่ทำการตรวจ</label>
            <InputText class="w-full" type="text" v-model="form.DiseaseName" readonly />
          </div>
          <div class="field col-6 sm:col-6">
            <label for="chooseinspection" class="block text-600 text-sm font-bold mb-2">วิธีการตรวจ</label>
            <InputText class="w-full" type="text" v-model="form.DiseaseMethod" readonly />
          </div>

          <div class="field col-6 sm:col-6">
            <label for="other" class="block text-600 text-sm font-bold mb-2">วิธีอื่น ๆ</label>
            <InputText type="text" v-model="form.Remark" class="w-full" placeholder="วิธีอื่น ๆ"
              :class="{ 'p-invalid': !form.Remark && valid }" readonly />
          </div>
          <div class="field col-12 sm:col-6" />

          <div class="field col-12 sm:col-6">
            <label for="date" class="block text-600 text-sm font-bold mb-2">วันที่ตรวจ</label>
            <InputText type="text" v-model="form.ThaiDiseaseActivityDate" class="w-full" placeholder="วันที่ตรวจ"
              :class="{ 'p-invalid': !form.ThaiDiseaseActivityDate && valid }" readonly />
          </div>
          <div class="field col-6 sm:col-6">
            <label for="nexttime" class="block text-600 text-sm font-bold mb-2">วันที่ตรวจครั้งถัดไป</label>
            <InputText type="text" v-model="form.ThaiDiseaseNextDate" class="w-full" placeholder="วันที่ตรวจครั้งถัดไป"
              :class="{ 'p-invalid': !form.ThaiDiseaseNextDate && valid }" readonly />
          </div>

          <div class="field col-12 sm:col-6">
            <label for="codeofficer" class="block text-600 text-sm font-bold mb-2">รหัสเจ้าหน้าที่</label>
            <InputText type="text" v-model="form.ResponsibilityStaffName" class="w-full" placeholder="วิธีอื่น ๆ"
              :class="{ 'p-invalid': !form.ResponsibilityStaffName && valid }" readonly />
          </div>

          <div class="field col-12 sm:col-6">
            <label for="inspectionagency" class="block text-600 text-sm font-bold mb-2">หน่วยงานที่ตรวจ</label>
            <InputText type="text" v-model="form.OrganizationName" class="w-full" placeholder="วิธีอื่น ๆ"
              :class="{ 'p-invalid': !form.OrganizationName && valid }" readonly />

          </div>
        </div>

        <div v-if="form.FarmID" class="mt-5">
          <h4 class="text-2xl text-600 mb-5">
            จำนวนสัตว์ที่ตรวจ : {{ data.length }} ตัว
          </h4>

          <DataTable class="text-sm" :value="data" :loading="isLoading" rows="20" paginator="true"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            responsiveLayout="scroll" currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
            @sort="sort($event)">
            <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field" class="text-center"
              :sortable="true">
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import PageTitle from "@/components/PageTitle.vue";

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
          header: "หมายเลขโค",
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
        {
          field: "DiseaseResultName",
          header: "ผลการตรวจ",
        },
      ],

      isLoading: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,
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

  mounted() {
    this.field();

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

      await axios
        .get(this.putDiseaseActivity, { signal: this.controller.signal })
        .then((res) => {
          let item = res.data;

          // console.log(item);
          this.form = {
            DiseaseActivityDate: item.DiseaseActivityDate,
            FarmID: item.FarmID,
            FarmIdentificationNumber: item.FarmIdentificationNumber,
            DiseaseID: item.DiseaseID,
            DiseaseName: item.DiseaseName,
            ThaiDiseaseActivityDate: item.ThaiDiseaseActivityDate,
            ThaiDiseaseNextDate: item.ThaiDiseaseNextDate,
            DiseaseNextDate: item.DiseaseNextDate,
            DiseaseMethodID: item.DiseaseMethodID,
            DiseaseMethod: item.DiseaseMethod,
            DiseaseResultID: item.DiseaseResultID,
            ResponsibilityStaffName: item.ResponsibilityStaffName,
            OrganizationName: item.OrganizationName,
            OrganizationID: item.OrganizationID,
            ResponsibilityStaffID: item.ResponsibilityStaffName,
            Remark: item.Remark,
            isActive: item.isActive,
          };
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
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
          this.itemDisease.diseasemethod = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });

      // axios
      //   .get(this.urlPersonal, {
      //     signal: this.controller.signal,
      //   })
      //   .then((response) => {
      //     this.personal = response.data.rows;
      //   })
      //   .finally(() => {
      //     this.isLoading = false;
      //   });

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
