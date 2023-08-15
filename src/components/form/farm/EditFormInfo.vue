<template>
  <div class="mb-5">
    <h1 class="text-xl mb-2 font-light">ข้อมูลฟาร์ม</h1>
    <p class="p-0 m-0 text-500">ป้อนรายละเอียดฟาร์ม1</p>
  </div>
  <form class="grid">
    <div class="col-12 lg:col-12">
      <div class="formgrid grid">
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            พื้นที่เขตปศุสัตว์<span class="text-red-500"> *</span></label
          >
          <Dropdown
            class="w-full"
            v-model="form.OrganizationZoneID"
            :options="organizationZone"
            optionLabel="OrganizationZoneName"
            optionValue="OrganizationZoneID"
            :filter="true"
            :showClear="true"
            placeholder="เลือกพื้นที่เขตปศุสัตว์"
            :class="{ 'p-invalid': !form.OrganizationZoneID && valid }"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
          <!-- <InputText
            type="text"
            class="w-full"
            placeholder="01, เขตปศุสัตว์ที่ 1"
            readonly
          /> -->
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            จังหวัด<span class="text-red-500"> *</span></label
          >
          <Dropdown
            class="w-full"
            v-model="form.FarmProvinceID"
            :options="province"
            optionLabel="ProvinceName"
            optionValue="ProvinceID"
            :filter="true"
            :showClear="true"
            :virtualScrollerOptions="{ itemSize: 38 }"
            placeholder="เลือกจังหวัด"
            @change="filterAmphur($event)"
            :class="{ 'p-invalid': !form.FarmProvinceID && valid }"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            อำเภอ<span class="text-red-500"> *</span></label
          >
          <Dropdown
            class="w-full"
            v-model="form.FarmAmphurID"
            :options="amphur.data"
            optionLabel="AmphurName"
            optionValue="AmphurID"
            :virtualScrollerOptions="{ itemSize: 38 }"
            :filter="true"
            :showClear="true"
            placeholder="เลือกอำเภอ"
            @change="filterTumbol($event)"
            :class="{ 'p-invalid': !form.FarmAmphurID && valid }"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ตำบล<span class="text-red-500"> *</span></label
          >
          <Dropdown
            class="w-full"
            v-model="form.FarmTumbolID"
            :options="tumbol.data"
            optionLabel="TumbolName"
            optionValue="TumbolID"
            :virtualScrollerOptions="{ itemSize: 38 }"
            :filter="true"
            :showClear="true"
            placeholder="เลือกตำบล"
            @change="filterZipcode($event)"
            :class="{ 'p-invalid': !form.FarmTumbolID && valid }"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            รหัสไปรษณีย์</label
          >
          <InputText
            type="text"
            v-model="form.FarmZipCode"
            class="w-full"
            readonly
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ศูนย์วิจัย<span class="text-red-500"> *</span></label
          >
          <Dropdown
            class="w-full"
            v-model="form.AIZoneID"
            :options="aizone"
            optionLabel="AIZoneName"
            optionValue="AIZoneID"
            :filter="true"
            :showClear="true"
            placeholder="เลือกศูนย์วิจัย"
            disabled
            :class="{ 'p-invalid': !form.AIZoneID && valid }"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            หน่วยงาน<span class="text-red-500"> *</span>
          </label>
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
            :virtualScrollerOptions="{ itemSize: 38 }"
            @change="gennumber($event)"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
        </div>

        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ประเภทหน่วยงาน<span class="text-red-500"> *</span></label
          >
          <InputText
            v-model="form.OrganizationType"
            type="text"
            class="w-full"
            readonly
          />
        </div>

        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            เลขทะเบียนฟาร์ม<span class="text-red-500"> *</span></label
          >
          <InputText
            v-model="form.FarmIdentificationNumber"
            class="w-full"
            :class="{ 'p-invalid': !form.FarmIdentificationNumber && valid }"
            readonly
            placeholder="เลือกหน่วยงานเพื่อสร้างเลขทะเบียนฟาร์ม"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ชื่อฟาร์ม<span class="text-red-500"> *</span></label
          >
          <InputText
            type="text"
            v-model="form.FarmName"
            class="w-full"
            :class="{ 'p-invalid': !form.FarmName && valid }"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            วันที่ขึ้นทะเบียนฟาร์ม<span class="text-red-500"> *</span></label
          >
          <!-- <Calendar
            class="w-full"
            v-model="form.FarmRegisterDate"
            :manualInput="false"
            placeholder="เลือกวันที่"
            :class="{ 'p-invalid': !form.FarmRegisterDate && valid }"
          /> -->

          <Datepicker
            v-model="form.FarmRegisterDate"
            id="dateRange"
            locale="th"
            :format="format"
            utc
            :enableTimePicker="false"
            cancelText="ยกเลิก"
            selectText="ยืนยัน"
            placeholder="เลือกวันที่"
            :maxDate="new Date()"
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
            ประเภทฟาร์ม<span class="text-red-500"> *</span></label
          >
          <Dropdown
            class="w-full"
            v-model="form.FarmType"
            :options="farm_type"
            optionLabel="name"
            optionValue="id"
            :virtualScrollerOptions="{ itemSize: 38 }"
            :filter="true"
            :showClear="true"
            placeholder="เลือกประเภทฟาร์ม"
            :class="{ 'p-invalid': !form.FarmType && valid }"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            สถานะฟาร์ม<span class="text-red-500"> *</span></label
          >
          <Dropdown
            class="w-full"
            v-model="form.FarmStatusID"
            :options="farm_status"
            optionLabel="FarmStatusName"
            optionValue="FarmStatusID"
            :virtualScrollerOptions="{ itemSize: 38 }"
            :filter="true"
            :showClear="true"
            placeholder="เลือกสถานะฟาร์ม"
            :class="{ 'p-invalid': !form.FarmStatusID && valid }"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> ที่อยู่</label>
          <InputText type="text" v-model="form.FarmAddress" class="w-full" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> หมู่</label>
          <InputText type="text" v-model="form.FarmMoo" class="w-full" />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> ถนน</label>
          <InputText type="text" v-model="form.FarmStreet" class="w-full" />
        </div>

        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> ละติจูด</label>
          <InputText
            type="text"
            v-model="form.ResidenceLatitude"
            class="w-full"
            :format="false"
            mode="decimal"
            :maxFractionDigits="20"
            placeholder="กรอกละติจูด เช่น 16.4322"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> ลองจิจูด</label>
          <InputText
            type="text"
            v-model="form.ResidenceLongitude"
            class="w-full"
            :format="false"
            mode="decimal"
            :maxFractionDigits="20"
            placeholder="กรอกลองจิจูด เช่น 102.8236"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ลิงก์จาก Google Map</label
          >
          <InputText
            type="url"
            v-model="form.FarmLinkGoogleMap"
            class="w-full"
            placeholder="กรอกลิงก์จาก Google Map เช่น https://www.google.co.th/maps/@13.87487,100........"
          />
        </div>
        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2"> โครงการ</label>
          <MultiSelect
            v-model="form.selectProject"
            class="w-full"
            :options="project"
            optionLabel="ProjectName"
            optionValue="ProjectID"
            placeholder="เลือกโครงการ"
            display="chip"
          />
        </div>

        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            เบอร์โทรศัพท์</label
          >
          <InputMask
            type="text"
            v-model="form.FarmMobilePhoneNumber"
            class="w-full"
            placeholder="เบอร์โทรศัพท์มือถือที่ติดต่อได้"
            mask="999-999-9999"
          />
        </div>
      </div>
    </div>
    <div class="col-12 text-center mt-5 flex justify-content-between">
      <router-link to="/agency/farm">
        <Button
          label="ย้อนกลับ"
          icon="pi pi-angle-left"
          class="p-button-secondary"
        />
      </router-link>
      <Button
        label="ต่อไป"
        @click="nextPage()"
        icon="pi pi-angle-right"
        iconPos="right"
      />
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { format } from "date-fns";
import { th } from "date-fns/locale";
export default {
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
    }),
  },
  data() {
    return {
      // Organization Load
      urlOrganization: "/organization?includeAll=false",
      urlOrganizationZone: "/organization-zone",
      urlProvince: "/province?includeAll=false",
      urlTumbol: "/tumbol?includeAll=false",
      urlAmphur: "/amphur?includeAll=false",
      urlAIZone: "/ai-zone",
      urlProject: "/project?includeAll=false",
      urlFarmStatus: "/farm-status",
      urlFarm: "/farm",
      organization: [],
      organizationZone: [],

      aizone: [],
      project: [],
      farm_type: [
        {
          id: "ฟาร์มมาตรฐาน",
          name: "ฟาร์มมาตรฐาน",
        },
        {
          id: "ฟาร์มในโครงการกรมปศุสัตว์",
          name: "ฟาร์มในโครงการกรมปศุสัตว์",
        },
        {
          id: "ฟาร์มสาธิต",
          name: "ฟาร์มสาธิต",
        },
      ],
      farm_status: [],
      isLoading: false,
      controller: new AbortController(),

      // End Organization Load
      data: [],
      valid: false,

      amphur: {
        data: [],
        temp: [],
      },
      tumbol: {
        data: [],
        temp: [],
      },
      province: {
        data: [],
        temp: [],
      },

      // Form
      loading: false,
      form: [
        {
          FarmRegisterDate: null,
          selectProject: null,
        },
      ],
    };
  },
  loadLazyTimeout: null,

  mounted() {
    this.load();
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
    gennumber($event) {
      let val = $event.value;
      if (val) {
        axios
          .get(
            "/farm/generate-number?OrganizationID=" + this.form.OrganizationID,
            {
              signal: this.controller.signal,
            }
          )
          .then((res) => {
            this.form.FarmIdentificationNumber = res.data.FarmNumberGenerate;
            axios
              .get("/organization/" + this.form.OrganizationID, {
                signal: this.controller.signal,
              })
              .then((res) => {
                let item = res.data.OrganizationType;
                this.form.OrganizationType = item.OrganizationTypeName;
              })
              .finally(() => {
                this.isLoading = false;
              });
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    filterAmphur($event) {
      let val = $event.value;
      if (val) {
        this.amphur.data = this.amphur.temp;
        this.amphur.data = this.amphur.data.filter(
          (item) => item.ProvinceID == val
        );
      } else {
        this.amphur.data = this.amphur.temp;
      }
    },
    filterTumbol($event) {
      let val = $event.value;
      if (val) {
        this.tumbol.data = this.tumbol.temp;
        this.tumbol.data = this.tumbol.data.filter(
          (item) => item.AmphurID == val
        );
      } else {
        this.tumbol.data = this.tumbol.temp;
      }
    },
    filterZipcode($event) {
      let val = $event.value;
      if (val) {
        this.form.FarmZipCode = this.tumbol.temp[val].Zipcode;
      } else {
        this.form.FarmZipCode = "";
      }
    },
    validation() {
      if (
        !this.form.FarmIdentificationNumber ||
        !this.form.FarmName ||
        !this.form.FarmProvinceID ||
        !this.form.FarmAmphurID ||
        !this.form.FarmTumbolID ||
        !this.form.OrganizationID ||
        !this.form.OrganizationZoneID ||
        !this.form.AIZoneID ||
        !this.form.FarmStatusID ||
        !this.form.FarmRegisterDate
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

    load() {
      // farm status
      axios
        .get(this.urlFarmStatus, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.farm_status = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      // project

      if (this.animal_id == 1) {
        this.urlProject += "&ProjectLevel=FARM&AnimalTypeID=[1,2]";
      } else if (this.animal_id == 2) {
        this.urlProject += "&ProjectLevel=FARM&AnimalTypeID=[3,4]";
      } else if (this.animal_id == 3) {
        this.urlProject += "&ProjectLevel=FARM&AnimalTypeID=[17,18]";
      }
      axios
        .get(this.urlProject, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.project = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      // Organization
      axios
        .get(this.urlOrganization, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.organization = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });

      // OrganizationZone
      axios
        .get(this.urlOrganizationZone, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.organizationZone = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(this.urlProvince, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.province = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(this.urlTumbol, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.tumbol.data = res.data.rows;
          this.tumbol.temp = this.tumbol.data;
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(this.urlAmphur, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.amphur.data = res.data.rows;
          this.amphur.temp = this.amphur.data;
        })
        .finally(() => {
          this.isLoading = false;
        });

      // aizone
      axios
        .get(this.urlAIZone, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.aizone = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(this.urlFarm + "?FarmID=" + this.$route.params.id, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data = res.data.rows[0];
          // this.data = res.data.rows.find(
          //   (item) => item.FarmID == this.$route.params.id
          // );

          if (this.data.FarmType == "ฟาร์มมาตรฐาน") {
            this.data.FarmType = "ฟาร์มมาตรฐาน";
          } else if (this.data.FarmType == "ฟาร์มในโครงการกรมปศุสัตว์") {
            this.data.FarmType = "ฟาร์มในโครงการกรมปศุสัตว์";
          } else if (this.data.FarmType == "ฟาร์มสาธิต") {
            this.data.FarmType = "ฟาร์มสาธิต";
          }

          this.form = {
            FarmIdentificationNumber: this.data.FarmIdentificationNumber,
            FarmName: this.data.FarmName,
            FarmAddress: this.data.FarmAddress,
            FarmMoo: this.data.FarmMoo,
            FarmStreet: this.data.FarmStreet,
            FarmType: this.data.FarmType,
            FarmTumbolID: this.data.FarmTumbolID,
            FarmAmphurID: this.data.FarmAmphurID,
            FarmProvinceID: this.data.FarmProvinceID,
            FarmZipCode: this.data.FarmZipCode,
            FarmLinkGoogleMap: this.data.FarmLinkGoogleMap,
            ResidenceLatitude: this.data.ResidenceLatitude,
            ResidenceLongitude: this.data.ResidenceLongitude,
            OrganizationID: this.data.OrganizationID,
            OrganizationZoneID: this.data.OrganizationZoneID,
            AIZoneID: this.data.AIZoneID,
            FarmStatusID: this.data.FarmStatusID,
            FarmTelephoneNumber: this.data.FarmTelephoneNumber,
            FarmRegisterDate: this.data.FarmRegisterDate,
            ProjectID: this.data.ProjectID,
          };
          axios
            .get("/organization/" + this.form.OrganizationID, {
              signal: this.controller.signal,
            })
            .then((res) => {
              let item = res.data.OrganizationType;
              this.form.OrganizationType = item.OrganizationTypeName;
            })
            .finally(() => {
              this.isLoading = false;
            });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    nextPage() {
      // validation
      if (this.validation() == false) {
        return;
      }

      axios
        .put(
          "/farm/" + this.$route.params.id,
          {
            FarmIdentificationNumber: this.form.FarmIdentificationNumber,
            FarmName: this.form.FarmName,
            FarmAddress: this.form.FarmAddress,
            FarmMoo: this.form.FarmMoo,
            FarmStreet: this.form.FarmStreet,
            FarmTumbolID: this.form.FarmTumbolID,
            FarmAmphurID: this.form.FarmAmphurID,
            FarmProvinceID: this.form.FarmProvinceID,
            FarmZipCode: this.form.FarmZipCode,
            FarmLinkGoogleMap: this.form.FarmLinkGoogleMap,
            ResidenceLatitude: this.form.ResidenceLatitude,
            ResidenceLongitude: this.form.ResidenceLongitude,
            OrganizationID: this.form.OrganizationID,
            OrganizationZoneID: this.form.OrganizationZoneID,
            AIZoneID: this.form.AIZoneID,
            FarmStatusID: this.form.FarmStatusID,
            FarmTelephoneNumber: this.form.FarmTelephoneNumber,
            FarmMobilePhoneNumber: this.form.FarmMobilePhoneNumber,
            FarmRegisterDate: this.form.FarmRegisterDate,
            ProjectID: this.form.ProjectID,
            IsActive: "1",
          },
          {
            signal: this.controller.signal,
          }
        )
        .then(() => {
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ข้อมูลฟาร์มถูกบันทึก",
            // detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 2000,
          });
          this.$emit("next-page", {
            pageIndex: 0,
          });
        })
        // error
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
    emits: ["next-page", "prev-page"],
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
};
</script>

<style lang="scss" scoped></style>
