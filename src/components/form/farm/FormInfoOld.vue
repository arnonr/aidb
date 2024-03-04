<template>
  <div class="mb-5">
    <h1 class="text-xl mb-2 font-light">ข้อมูลฟาร์มๅๅๅ</h1>
    <p class="p-0 m-0 text-500">ป้อนรายละเอียดฟาร์ม</p>
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
            @change="filterProvince($event)"
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
            :options="province_tmp"
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
            :options="organization_tmp"
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
            v-if="farm_type.length != 0"
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
          <!-- <InputText
            type="text"
            v-model="form.ResidenceLatitude"
            class="w-full"
            placeholder="กรอกละติจูด เช่น 16.4322"
          /> -->

          <InputNumber
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
          <!-- <InputText
            type="text"
            v-model="form.ResidenceLongitude"
            class="w-full"
            placeholder="กรอกลองจิจูด เช่น 102.8236"
          /> -->
          <InputNumber
            v-model="form.ResidenceLongitude"
            class="w-full"
            :format="false"
            mode="decimal"
            :maxFractionDigits="20"
            placeholder="กรอกละติจูด เช่น 16.4322"
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
            v-if="project.length != 0"
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

        <div class="field col-12 sm:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ชนิดสัตว์<span class="text-red-500"> *</span></label
          >
          <MultiSelect
            v-model="form.selectAnimalType"
            class="w-full"
            :options="animalTypes"
            optionLabel="label"
            optionValue="id"
            placeholder="เลือกชนิดสัตว์"
            display="chip"
          />
        </div>
      </div>
    </div>
    <div class="col-12 text-center mt-5 flex justify-content-between">
      <Button
        label="ย้อนกลับ"
        @click="prevPage()"
        icon="pi pi-angle-left"
        class="p-button-outlined p-button-secondary"
      />
      <Button
        label="บันทึก"
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
      user: "user",
      animal_id: "animal_id",
      AnimalID: "AnimalID",
      farmItem: "farmItem",
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
      organization: [],
      organization_tmp: [],
      organizationZone: [],

      animalTypes: [
        { id: 1, label: "โค" },
        { id: 2, label: "กระบือ" },
        { id: 3, label: "แพะ" },
      ],
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

      formFarm: [],

      // End Organization Load

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

      province_tmp: {
        data: [],
        temp: [],
      },

      // Form
      valid: false,
      loading: false,
      form: {
        selectAnimalType: null,
        // FarmRegisterDate: null,
        // selectProject: null,
      },
    };
  },
  loadLazyTimeout: null,

  watch: {
    "form.OrganizationZoneID"(val) {
      this.province_tmp = this.province.filter((item) => {
        return item.OrganizationZoneID == val;
      });
    },
    "form.FarmType"(val) {
      console.log(val);
    },
    "form.FarmProvinceID"(val) {
      if (this.province_tmp.filter) {
        let getAIZone = this.province_tmp.filter((item) => {
          return item.ProvinceID == val;
        });

        if (getAIZone[0]) {
          this.form.AIZoneID = getAIZone[0].AIZoneID;
          this.form.OrganizationZoneID = getAIZone[0].OrganizationZoneID;
        }

        this.organization_tmp = this.organization.filter((item) => {
          return (
            item.OrganizationProvinceID == val &&
            (item.OrganizationTypeID == "2" || item.OrganizationTypeID == "11")
          );
        });
      }
      // OrganizationProvinceID
    },
    "form.FarmAmphurID"(val) {
      this.organization_tmp = this.organization.filter((item) => {
        return (
          item.OrganizationAmphurID == val &&
          (item.OrganizationTypeID == "2" || item.OrganizationTypeID == "11")
        );
      });
      // OrganizationProvinceID
    },
  },
  mounted() {
    this.load();
    // console.log(this.farmItem);
    this.form.FarmType = "ฟาร์มมาตรฐาน";
    console.log(this.animal_id);
    this.form.selectAnimalType = [parseInt(this.animal_id)];
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
      // console.log($event);
      let val = $event.value;
      if (val) {
        axios
          .get(
            "/farm/generate-number?ProvinceID=" +
              this.form.FarmProvinceID +
              "&AmphurID=" +
              this.form.FarmAmphurID +
              "&TumbolID=" +
              this.form.FarmTumbolID,
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
        // let temp = this.organization.filter(
        //   (item) => item.OrganizationID == val
        // );
        // this.form.OrganizationZoneID = temp[0].OrganizationZoneID;
      }
    },
    filterProvince() {
      this.form.FarmAmphurID = null;
      this.form.FarmTumbolID = null;
      this.form.AIZoneID = null;
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
      console.log(val);
      // if (val) {
      //   this.form.FarmZipCode = this.tumbol.temp[val].Zipcode;
      // } else {
      //   this.form.FarmZipCode = "";
      // }
    },
    validation() {
      if (
        !this.form.FarmIdentificationNumber ||
        !this.form.FarmName ||
        !this.form.OrganizationID ||
        !this.form.FarmProvinceID ||
        !this.form.FarmAmphurID ||
        !this.form.FarmTumbolID ||
        !this.form.OrganizationZoneID ||
        !this.form.AIZoneID ||
        !this.form.FarmStatusID ||
        !this.form.FarmRegisterDate ||
        !this.form.selectAnimalType
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
        this.urlProject += "&ProjectLevel=FARM&AnimalTypeID=[1,2,41,42]";
      } else if (this.animal_id == 2) {
        this.urlProject += "&ProjectLevel=FARM&AnimalTypeID=[3,4,43,44]";
      } else if (this.animal_id == 3) {
        this.urlProject += "&ProjectLevel=FARM&AnimalTypeID=[17,18,45,46]";
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
          this.organization_tmp = this.organization = res.data.rows;
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
          this.province_tmp = this.province = res.data.rows;
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

          if (this.farmItem) {
            // this.form.OrganizationZoneID =
            //   this.farmItem.Province.OrganizationZoneID;
            this.form.FarmProvinceID = this.farmItem.HouseProvinceID;
            this.form.FarmAmphurID = this.farmItem.HouseAmphurID;
            this.form.FarmTumbolID = this.farmItem.HouseTumbolID;
            this.form.FarmZipCode = this.farmItem.HouseZipCode;
            this.form.FarmAddress = this.farmItem.HouseBuildingNumber;
            this.form.FarmMoo = this.farmItem.HouseMoo;
            this.form.FarmStreet = this.farmItem.HouseStreet;
            this.form.ResidenceLatitude = this.farmItem.HouseLatitude;
            this.form.ResidenceLongitude = this.farmItem.HouseLongitude;
            this.form.FarmMobilePhoneNumber = this.farmItem.MobilePhoneNumber;
          }
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

      this.form.FarmStatusID = 1;

      // console.log(this.form);
    },

    prevPage() {
      this.$emit("prev-page", { pageIndex: 1 });
    },
    nextPage() {
      if (this.validation() == false) {
        return;
      }
      if (this.farmItem.FarmerID) {
        axios
          .put("/farmer/" + this.farmItem.FarmerID, this.farmItem, {
            signal: this.controller.signal,
          })
          .then(() => {})
          // error
          .catch((err) => {
            this.$toast.add({
              severity: "error",
              summary: "ล้มเหลว",
              detail: err.response.data.error.message,
              life: 5000,
            });
          });

        this.form.FarmerID = this.farmItem.FarmerID;
      }
      // console.log(this.form);

      (this.form.FarmAnimalType = this.form.selectAnimalType),
        axios
          .post("/farm", { ...this.form, ProjectID: this.form.selectProject })
          .then(() => {
            this.$toast.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "ข้อมูลฟาร์มถูกบันทึก",
              // detail: "เพิ่มข้อมูลเสร็จสิ้น",
              life: 5000,
            });

            setTimeout(() => {
              this.$router.push("/agency/farm");
            }, 2500);
            // axios
            //   .post(
            //     "/farm",
            //     {},
            //     {
            //       signal: this.controller.signal,
            //     }
            //   )
            //   .then(() => {
            //     this.load();
            //     this.$toast.add({
            //       severity: "success",
            //       summary: "สำเร็จ",
            //       detail: "ข้อมูลฟาร์มถูกบันทึก",
            //       // detail: "เพิ่มข้อมูลเสร็จสิ้น",
            //       life: 5000,
            //     });
            //     this.$emit("next-page", {
            //       pageIndex: 0,
            //     });
            //   })
            //   // error
            //   .catch((err) => {
            //     this.$toast.add({
            //       severity: "error",
            //       summary: "ล้มเหลว",
            //       detail: err.response.data.error.message,
            //       life: 5000,
            //     });
            //   })
            //   .finally(() => {
            //     this.isLoading = false;
            //   });
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
