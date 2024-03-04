<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ลงทะเบียนลูกเกิดใหม่" :pages="breadcrumb" />
      <div class="card lg:p-0">
        <div class="grid">
          <div class="col-12 lg:col-12 xl:col-12 lg:p-4">
            <form class="grid">
              <div class="col-12 lg:col-12">
                <div class="field col-12 sm:col-6">
                  <Image
                    width="200"
                    height="200"
                    alt="Image Text"
                    preview
                    v-if="path"
                    :src="path"
                  >
                  </Image>
                  <Image
                    v-else
                    width="200"
                    height="200"
                    alt="Image Text"
                    preview
                    src="https://static.boredpanda.com/blog/wp-content/uploads/2017/11/My-most-popular-pic-since-I-started-dog-photography-5a0b38cbd5e1e__880.jpg"
                  >
                  </Image>

                  <FileUpload
                    mode="basic"
                    :customUpload="true"
                    @select="preview"
                    accept="image/*"
                    v-model="form.AnimalImagePathGen"
                  />
                </div>

                <div class="formgrid grid">
                  <div class="field col-12 sm:col-6 md:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      ฟาร์ม
                    </label>
                    <Dropdown
                      class="w-full"
                      :options="farm"
                      optionLabel="Fullname"
                      optionValue="FarmID"
                      placeholder="เลือกฟาร์ม"
                      v-model="form.FarmID"
                      :showClear="true"
                      :filter="true"
                      :class="{ 'p-invalid': !form.FarmID && valid }"
                    />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      วัน-เดือน-ปี (เกิด)
                    </label>
                    <Calendar
                      class="w-full"
                      id="datebirth"
                      :showButtonBar="true"
                      :disabled="true"
                      :showIcon="true"
                      v-model="showAnimalBirthDate"
                      :class="{ 'p-invalid': !form.AnimalBirthDate && valid }"
                    />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      หน่วยงาน/สถานีที่ฟาร์มสังกัด
                    </label>
                    <Dropdown
                      class="w-full"
                      id="selectedstatus"
                      :options="organization"
                      optionLabel="OrganizationName"
                      optionValue="OrganizationID"
                      placeholder="เลือกหน่วยงาน/สถานีที่ฟาร์มสังกัด"
                      :filter="true"
                      :disabled="true"
                      v-model="form.OrganizationID"
                      :class="{ 'p-invalid': !form.OrganizationID && valid }"
                    />
                  </div>

                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      เขตพื้นที่ที่ฟาร์มสังกัด</label
                    >
                    <Dropdown
                      class="w-full"
                      id="selectedstatus"
                      :options="organizationzone"
                      optionLabel="OrganizationZoneName"
                      optionValue="OrganizationZoneID"
                      placeholder="เลือกเขตพื้นที่ที่ฟาร์มสังกัด"
                      :filter="true"
                      :disabled="true"
                      v-model="form.OrganizationZoneID"
                      :class="{
                        'p-invalid': !form.OrganizationZoneID && valid,
                      }"
                    />
                  </div>
                  <!-- <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      พื้นที่เขตปศุสัตว์<span class="text-red-500">
                        *</span
                      ></label
                    >
                    <InputText
                      type="text"
                      class="w-full"
                      v-model="OrganizationZone"
                      readonly
                    />
                  </div> -->

                  <!-- <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      เลขอ้างอิงสัตว์
                    </label>
                    <InputText
                      type="text"
                      class="w-full"
                      placeholder="กรุณาเลือกฟาร์มและวันเกิดของสัตว์เพื่อแสดงเลขประจำตัวสัตว์"
                      v-model="form.AnimalIdentificationID"
                      :class="{
                        'p-invalid': !form.AnimalIdentificationID && valid,
                      }"
                      readonly
                    />
                  </div> -->
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      หมายเลขใบหู</label
                    >
                    <InputText
                      type="text"
                      class="w-full"
                      placeholder=""
                      v-model="form.AnimalEarID"
                    />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      เลข NID</label
                    >
                    <InputText
                      type="text"
                      class="w-full"
                      placeholder=""
                      v-model="form.AnimalNationalID"
                    />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      เลข RFID</label
                    >
                    <InputText
                      type="text"
                      class="w-full"
                      placeholder=""
                      v-model="form.AnimalMicrochip"
                    />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      ชื่อสัตว์ <span class="text-red-500">*</span></label
                    >
                    <InputText
                      type="text"
                      class="w-full"
                      placeholder=""
                      v-model="form.AnimalName"
                      :class="{ 'p-invalid': !form.AnimalName && valid }"
                    />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2"
                      >สถานะ
                    </label>
                    <Dropdown
                      class="w-full"
                      :options="animalstatus"
                      optionLabel="AnimalStatusName"
                      optionValue="AnimalStatusID"
                      placeholder="เลือกสถานะ"
                      :showClear="true"
                      :filter="true"
                      :disabled="true"
                      v-model="form.AnimalStatusID"
                      :class="{ 'p-invalid': !form.AnimalStatusID && valid }"
                    >
                    </Dropdown>
                  </div>

                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      เพศ <span class="text-red-500">*</span></label
                    >
                    <Dropdown
                      class="w-full"
                      id="selectedstatus"
                      :options="animalsex"
                      optionLabel="AnimalSexName"
                      optionValue="AnimalSexID"
                      placeholder="เลือกเพศ"
                      :filter="true"
                      v-model="form.AnimalSexID"
                      :class="{ 'p-invalid': !form.AnimalSexID && valid }"
                    />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2"
                      >ชนิดสัตว์
                    </label>
                    <Dropdown
                      class="w-full"
                      :options="animaltype"
                      optionLabel="AnimalTypeName"
                      optionValue="AnimalTypeID"
                      placeholder="เลือกชนิดสัตว์"
                      :showClear="true"
                      :filter="true"
                      v-model="form.AnimalTypeID"
                      :class="{ 'p-invalid': !form.AnimalTypeID && valid }"
                    >
                    </Dropdown>
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      น้ำหนักแรกเกิด (กก.)</label
                    >
                    <InputText
                      type="number"
                      class="w-full"
                      v-model="form.AnimalBornWeight"
                      readonly
                    />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      ท้องที่</label
                    >
                    <InputText
                      type="number"
                      class="w-full"
                      v-model="form.AnimalPar"
                      readonly
                    />
                  </div>

                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2"
                      >แหล่งที่มา</label
                    >
                    <Dropdown
                      class="w-full"
                      :options="AnimalSource"
                      optionLabel="name"
                      :filter="true"
                      :disabled="true"
                      placeholder="เลือกแหล่งที่มา"
                      v-model="form.AnimalSource"
                    />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2"
                      >รูปแบบการเกิด</label
                    >
                    <Dropdown
                      class="w-full"
                      :options="BornType"
                      optionLabel="name"
                      :filter="true"
                      :disabled="true"
                      placeholder="เลือกรูปแบบการเกิด"
                      v-model="form.AnimalBornType"
                    />
                  </div>
                  <div class="field col-12 sm:col-6 md:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      ฟาร์มต้นทาง</label
                    >
                    <Dropdown
                      class="w-full"
                      :options="farm"
                      optionLabel="Fullname"
                      optionValue="FarmID"
                      placeholder="เลือกฟาร์ม"
                      v-model="form.SourceFarmID"
                      :showClear="true"
                      :filter="true"
                      :disabled="true"
                    />
                  </div>

                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2"
                      >แหล่งที่มา (ระบุ)</label
                    >
                    <InputText
                      type="text"
                      class="w-full"
                      v-model="form.SourceText"
                      readonly
                    />
                  </div>

                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      โครงการ</label
                    >
                    <MultiSelect
                      class="w-full"
                      :options="project"
                      optionLabel="ProjectName"
                      optionValue="ProjectID"
                      placeholder="เลือกโครงการ"
                      display="chip"
                      v-model="form.ProjectID"
                    />
                  </div>

                  <div class="field col-12 sm:col-12">
                    <label class="block text-600 text-sm font-bold mb-2"
                      >ตั้งต้นสายเลือด</label
                    >
                    <Dropdown
                      class="w-full"
                      :options="FirstBreed"
                      optionLabel="name"
                      :showClear="true"
                      :filter="true"
                      :disabled="true"
                      placeholder="สายเลือดครอบครัว"
                      v-model="form.AnimalFirstBreed"
                      :class="{ 'p-invalid': !form.AnimalFirstBreed && valid }"
                    />
                  </div>

                  <div class="col-12 formgrid grid">
                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        หมายเลขพ่อ<span class="text-red-500"> *</span></label
                      >

                      <InputText
                        type="text"
                        class="w-full"
                        v-model="form.AnimalFatherName"
                        readonly
                      />
                    </div>

                    <div class="field col-12 sm:col-6">
                      <label class="block text-600 text-sm font-bold mb-2">
                        หมายเลขแม่<span class="text-red-500"> *</span></label
                      >

                      <InputText
                        type="text"
                        class="w-full"
                        v-model="form.AnimalMotherName"
                        readonly
                      />

                      <!-- <v-select
                        :options="animalmother_temp"
                        @search="fetchAnimalMotherOptions"
                        label="Fullname"
                        value="AnimalID"
                        :disabled="true"
                        v-model="form.AnimalMotherID"
                        class="w-full"
                        placeholder="เลือกหมายเลขแม่หรือชื่อแม่ (พิมพ์ 3 ตัวอักษรเพื่อค้นหา)"
                      ></v-select> -->

                      <!-- <Select2
                          v-model="myValue"
                          :options="myOptions"
                        /> -->
                    </div>
                  </div>

                  <!-- <div class="col-12">
                    <div class="formgrid grid">
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                          หมายเลขพ่อ</label
                        >

                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalfather"
                          optionLabel="Fullname"
                          optionValue="AnimalID"
                          placeholder="เลือกหมายเลขพ่อ"
                          :disabled="true"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalFatherID"
                        />
                      </div>

                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                          หมายเลขแม่</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalmother"
                          optionLabel="Fullname"
                          optionValue="AnimalID"
                          placeholder="เลือกหมายเลขแม่"
                          :disabled="true"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalMotherID"
                        />
                      </div>
                    </div>
                  </div> -->

                  <div class="col-12" v-if="checkFirst == '1'">
                    <div class="formgrid grid">
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 1</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalbreed"
                          optionLabel="Fullname"
                          optionValue="AnimalBreedID"
                          placeholder="เลือกสายพันธุ์ที่"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalBreedID1"
                        />
                      </div>
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สัดส่วนสายพันธุ์ที่ 1 (%)</label
                        >
                        <InputText
                          type="number"
                          class="w-full"
                          v-model="form.AnimalBreedPercent1"
                          min="0"
                        />
                      </div>
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 2</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalbreed"
                          optionLabel="Fullname"
                          optionValue="AnimalBreedID"
                          placeholder="เลือกสายพันธุ์ที่"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalBreedID2"
                        />
                      </div>
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สัดส่วนสายพันธุ์ที่ 2 (%)</label
                        >
                        <InputText
                          type="number"
                          class="w-full"
                          v-model="form.AnimalBreedPercent2"
                          min="0"
                        />
                      </div>
                      <div class="field col-12 sm:col-6" v-if="checkAnimal > 2">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 3</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalbreed"
                          optionLabel="Fullname"
                          optionValue="AnimalBreedID"
                          placeholder="เลือกสายพันธุ์ที่"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalBreedID3"
                        />
                      </div>
                      <div class="field col-12 sm:col-6" v-if="checkAnimal > 2">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สัดส่วนสายพันธุ์ที่ 3 (%)</label
                        >
                        <InputText
                          type="number"
                          class="w-full"
                          v-model="form.AnimalBreedPercent3"
                          min="0"
                        />
                      </div>
                      <div class="field col-12 sm:col-6" v-if="checkAnimal > 3">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 4</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalbreed"
                          optionLabel="Fullname"
                          optionValue="AnimalBreedID"
                          placeholder="เลือกสายพันธุ์ที่"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalBreedID4"
                        />
                      </div>
                      <div class="field col-12 sm:col-6" v-if="checkAnimal > 3">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สัดส่วนสายพันธุ์ที่ 4 (%)</label
                        >
                        <InputText
                          type="number"
                          class="w-full"
                          v-model="form.AnimalBreedPercent4"
                          min="0"
                        />
                      </div>
                      <div class="field col-12 sm:col-6" v-if="checkAnimal > 4">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 5</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalbreed"
                          optionLabel="Fullname"
                          optionValue="AnimalBreedID"
                          placeholder="เลือกสายพันธุ์ที่"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalBreedID5"
                        />
                      </div>
                      <div class="field col-12 sm:col-6" v-if="checkAnimal > 4">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สัดส่วนสายพันธุ์ที่ 5 (%)</label
                        >
                        <InputText
                          type="number"
                          class="w-full"
                          v-model="form.AnimalBreedPercent5"
                          min="0"
                        />
                      </div>
                      <div
                        class="field col-12 sm:col-12 flex justify-content-between"
                      >
                        <Button
                          label="เพิ่มสายพันธ์ุ"
                          class=""
                          icon="pi pi-plus"
                          @click="addAnimal()"
                        />
                        <Button
                          label="ลบสายพันธ์ุ"
                          class="p-button-danger"
                          icon="pi pi-minus"
                          @click="deleteAnimal()"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="field col-12 sm:col-12 lg:col-12">
                    <div class="text-xl">Status</div>
                    <div
                      v-for="isAlive of alive"
                      :key="isAlive.key"
                      class="field-radiobutton"
                    >
                      <RadioButton
                        :id="isAlive.key"
                        name="category"
                        :value="isAlive"
                        v-model="form.AnimalAlive"
                        :readonly="true"
                      />
                      <label :for="isAlive.key">{{ isAlive.name }}</label>
                    </div>
                  </div>
                  <div class="field col-12 sm:col-12 lg:col-12">
                    <div class="text-xl">สถานะ</div>
                    <div
                      v-for="isActive of status"
                      :key="isActive.key"
                      class="field-radiobutton"
                    >
                      <RadioButton
                        :id="isActive.key"
                        name="category"
                        :value="isActive"
                        v-model="form.isActive"
                        :readonly="true"
                      />
                      <label :for="isActive.key">{{ isActive.name }}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 text-right mt-5 flex justify-content-start">
                <Button
                  label="บันทึกข้อมูล"
                  @click="add()"
                  class="mx-2"
                  iconPos="right"
                /><Button
                  label="ล้าง"
                  @click="clear()"
                  class="p-button-outlined p-button-secondary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Confirm Dialog -->
    <Dialog
      header=""
      v-model:visible="displayConfirmModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <div class="text-center text-teal-700 py-8">
        <img src="..\..\assets\images\check-circle-fill.svg" alt="icons" />
        <h1>ลงทะเบียนสัตว์สำเร็จ</h1>
      </div>
    </Dialog>
    <!-- End Move Dialog -->
  </div>
</template>
<script>
import axios from "axios";

import PageTitle from "@/components/PageTitle.vue";
import dayjs from "dayjs";
// import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { mapGetters } from "vuex";

export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      user: "user",
      animal_id: "animal_id",
      bornItem: "bornItem",
    }),
  },

  data() {
    return {
      url: "/animal",
      urlNumber: "/animal/generate-number",
      apiFarm: "/farm?isActive=1",
      apiPersonal: "/staff?isActive=1",
      apiAnimalSex: "/animal-sex?isActive=1",
      apiAnimalFatherID: "/animal/id-and-name?isActive=1",
      apiAnimalMotherID: "/animal/id-and-name?isActive=1",
      apiAnimalBreedID: "/animal-breed?isActive=1",
      apiOrganizationID: "/organization?isActive=1",
      apiOrganizationZoneID: "/organization-zone?isActive=1",
      apiProject: "/project?includeAll=false&isActive=1",
      apiAnimalStatusID: "/animal-status?isActive=1",
      apiAnimalTypeID: "/animal-type?isActive=1",
      apiCheckBreed: "/animal/generate-breed",
      breadcrumb: [
        { label: "ข้อมูลสัตว์ (การคลอด)", to: "/activity/creature_info" },
        { label: "ลงทะเบียนลูกเกิดใหม่", to: "" },
      ],
      animalmother_temp: [],
      animalfather_temp: [],

      // load
      data: [],
      farm: [],
      isLoading: false,
      animalstatus: [],
      animalsex: [],
      personal: [],
      organization: [],
      organizationzone: [],
      animalfather: [],
      animaltype: [],
      gennumber: [],

      OrganizationZone: [],
      project: [],

      checkFirst: null,
      checkMother: null,
      checkFather: null,
      // form
      valid: false,
      path: null,
      showAnimalBirthDate: null,

      form: {
        isActive: "",
        AnimalNationalID: null,
        AnimalEarID: null,
        AnimalMicrochip: null,
        AnimalFatherName: null,
        AnimalMotherName: null,
        AnimalMotherID: null,
        AnimalFatherID: null,
      },

      BornType: [
        {
          id: "NORMAL",
          name: "ผสมพันธุ์ปกติ",
        },
        {
          id: "AI",
          name: "ผสมเทียม",
        },
        {
          id: "EMBRYO",
          name: "ตัวอ่อน",
        },
      ],

      AnimalSource: [
        {
          id: "BORN",
          name: "เกิดในฟาร์ม",
        },
      ],
      FirstBreed: [
        {
          id: "0",
          name: "สายเลือดครอบครัว",
        },
      ],

      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],

      alive: [
        { name: "Active", key: "A", value: 1 },
        { name: "In Active", key: "B", value: 0 },
      ],

      //  cancel requests
      controller: new AbortController(),

      // Search

      isSearch: false,
      isSelection: false,
      search: {
        ProjectCode: "",
        ProjectName: "",
        ProjectLevel: "",
        isActive: "",
        StartDate: "",
        EndDate: "",
      },
      filtered: {
        FarmID: "",
        AnimalBirthDate: "",
        AnimalTypeID: "",
      },

      checkAnimal: null,

      // Modal
      display_add: false,
      display_edit: false,
      display_view: false,
      display_delete: false,
    };
  },
  mounted() {
    // กรณีส่งค่าจากคลอดลูก
    dayjs.extend(buddhistEra);

    // console.log(this.bornItem);

    this.form.isActive = this.status[0];
    this.form.AnimalAlive = this.alive[0];
    this.form.AnimalPar = 0;

    this.form.AnimalSource = this.AnimalSource[0];

    // if (id.AnimalSource == "BORN") {
    //       id.AnimalSource = this.AnimalSource[0];
    //     } else if (id.AnimalSource == "BUY") {
    //       id.AnimalSource = this.AnimalSource[1];
    //     } else {
    //       id.AnimalSource = this.AnimalSource[2];
    //     }

    if (this.animal_id == 1) {
      this.form.AnimalTypeID = 1;
      this.form.AnimalStatusID = 1;
    } else if (this.animal_id == 2) {
      this.form.AnimalTypeID = 3;
      this.form.AnimalStatusID = 6;
    } else if (this.animal_id == 3) {
      this.form.AnimalTypeID = 17;
      this.form.AnimalStatusID = 11;
    }

    this.load();

    if (this.bornItem) {
      this.form.AnimalFirstBreed = 0;
      // this.form.AnimalMotherID = this.bornItem.AnimalID;
      // this.form.AnimalFatherID = this.bornItem.FatherID;
      this.form.GiveBirthSelfID = this.bornItem.GiveBirthID;
      this.form.checkBorn = this.bornItem.checkBorn;
      this.form.AnimalBirthDate = this.bornItem.AnimalBirthDate;
      //
      this.showAnimalBirthDate = dayjs(this.bornItem.AnimalBirthDate).format(
        "DD/MM/BBBB"
      );
      this.form.FarmID = this.bornItem.FarmID;
      this.form.OrganizationZoneID = this.bornItem.OrganizationZoneID;
      this.form.OrganizationID = this.bornItem.OrganizationID;
      this.filtered.FarmID = this.bornItem.FarmID;
      this.filtered.AnimalBirthDate = this.bornItem.AnimalBirthDate;
    }

    if (this.bornItem.BornType == "EMBRYO") {
      this.form.AnimalBornType = this.BornType[2];
    } else if (this.bornItem.BornType == "AI") {
      this.form.AnimalBornType = this.BornType[1];
    } else {
      this.form.AnimalBornType = this.BornType[0];
    }

    this.checkFirst = 0;
    this.form.AnimalSexID = 2;
  },
  watch: {
    "form.FarmID"(val) {
      if (Array.isArray(this.farm) && this.farm.length) {
        let temp = this.farm.filter((item) => item.FarmID == val);
        this.OrganizationZone = temp[0].OrganizationZoneName;
        this.form.OrganizationID = temp[0].OrganizationID;
        this.filtered.FarmID = temp[0].FarmID;
        this.callGennumber();
      }
    },

    "form.AnimalFirstBreed"(val) {
      this.checkFirst = val.id;
      this.checkAnimal = 0;
    },

    "form.AnimalBirthDate"(val) {
      this.filtered.AnimalBirthDate = val;
      this.callGennumber();
    },

    "form.AnimalTypeID"(val) {
      // console.log(val);
      this.filtered.AnimalTypeID = val;
      // console.log(this.filtered.AnimalTypeID);

      // this.callGennumber();
    },

    "form.OrganizationID"(val) {
      if (val) {
        let temp = this.organization.filter(
          (item) => item.OrganizationID == val
        );
        if (Array.isArray(temp) && temp.length) {
          this.form.OrganizationZoneID = temp[0].OrganizationZoneID;
        }
      } else {
        this.form.OrganizationZoneID = null;
      }
    },

    "form.AnimalFatherID"(val) {
      this.checkFather = val;
      if (this.checkMother) {
        this.callCheckBreed();
      }
    },
    "form.AnimalMotherID"(val) {
      this.checkMother = val;
      if (this.checkFather) {
        this.callCheckBreed();
      }
    },
  },
  methods: {
    fetchAnimalMotherOptions(search, loading) {
      console.log(loading);
      if (search.length > 2) {
        this.animalmother_temp = this.animalmother.filter((x) => {
          return x.AnimalEarIDAndName.includes(search);
        });
      } else {
        this.animalmother_temp = [];
      }
    },
    fetchAnimalFatherOptions(search, loading) {
      console.log(loading);
      if (search.length > 2) {
        this.animalfather_temp = this.animalfather.filter((x) => {
          return x.AnimalEarIDAndName.includes(search);
        });
      } else {
        this.animalfather_temp = [];
      }
    },
    callCheckBreed() {
      if (this.checkMother != null && this.checkFather != null) {
        axios
          .get(
            this.apiCheckBreed +
              "?AnimalFatherID=" +
              this.checkFather +
              "&AnimalMotherID=" +
              this.checkMother,
            { signal: this.controller.signal }
          )
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              if (i == 0) {
                this.form.AnimalBreedID1 = response.data[i].AnimalBreedID;
                this.form.AnimalBreedPercent1 =
                  response.data[i].AnimalBreedPercent;
              } else if (i == 1) {
                this.form.AnimalBreedID2 = response.data[i].AnimalBreedID;
                this.form.AnimalBreedPercent2 =
                  response.data[i].AnimalBreedPercent;
              } else if (i == 2) {
                this.form.AnimalBreedID3 = response.data[i].AnimalBreedID;
                this.form.AnimalBreedPercent3 =
                  response.data[i].AnimalBreedPercent;
              } else if (i == 3) {
                this.form.AnimalBreedID4 = response.data[i].AnimalBreedID;
                this.form.AnimalBreedPercent4 =
                  response.data[i].AnimalBreedPercent;
              } else if (i == 4) {
                this.form.AnimalBreedID5 = response.data[i].AnimalBreedID;
                this.form.AnimalBreedPercent5 =
                  response.data[i].AnimalBreedPercent;
              }
            }
          })
          .catch((err) => {
            this.$toast.add({
              severity: "error",
              summary: "ล้มเหลว",
              detail: err.response.data.error.message,
              life: 5000,
            });
          });
      }
    },
    clear() {
      this.form = {
        isActive: this.status[0],
      };
      this.valid = false;
    },
    getItems(id) {
      const items = [
        {
          label: "รายละเอียด",
          icon: "pi pi-eye",
          command: () => {
            this.open_view(id);
          },
        },
        {
          label: "ลบ",
          icon: "pi pi-trash",
          command: () => {
            this.open_delete(id);
          },
        },
      ];
      return items;
    },
    validation() {
      if (
        !this.form.AnimalIdentificationID ||
        !this.form.AnimalSexID ||
        !this.form.FarmID ||
        !this.form.AnimalName ||
        !this.form.OrganizationID ||
        !this.form.OrganizationZoneID ||
        !this.form.AnimalStatusID ||
        !this.form.isActive ||
        !this.form.AnimalTypeID
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
    // Axios
    load() {
      this.isLoading = true;
      axios
        .get(this.apiFarm, { signal: this.controller.signal })
        .then((response) => {
          this.farm = response.data.rows.map((item) => {
            return {
              FarmID: item.FarmID,
              FarmName: item.FarmName,
              OrganizationID: item.OrganizationID,
              Fullname: item.FarmIdentificationNumber + ", " + item.FarmName,
              OrganizationZoneName: item.OrganizationZone.OrganizationZoneName,
            };
          });
        });
      axios
        .get(this.apiAnimalSex, { signal: this.controller.signal })
        .then((response) => {
          this.animalsex = response.data.rows;
        });

      this.apiPersonal +=
        "&StaffOrganizationID=" +
        this.user.Staff.StaffOrganizationID +
        "&isActive=1";
      axios
        .get(this.apiPersonal, { signal: this.controller.signal })
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

      console.log(this.bornItem);
      if (this.animal_id == 1) {
        this.apiAnimalFatherID +=
          "AnimalSexID=1&AnimalID=" + this.bornItem.FatherID;
      } else if (this.animal_id == 2) {
        this.apiAnimalFatherID +=
          "AnimalSexID=1&AnimalID=" + this.bornItem.FatherID;
      } else if (this.animal_id == 3) {
        this.apiAnimalFatherID +=
          "AnimalSexID=1&AnimalID=" + this.bornItem.FatherID;
      }

      axios
        .get(this.apiAnimalFatherID, { signal: this.controller.signal })
        .then((response) => {
          this.animalfather = response.data.rows;
          if (this.bornItem) {
            this.form.AnimalFatherID = this.bornItem.FatherID;

            let fa = this.animalfather.find((x) => {
              return x.AnimalID == this.form.AnimalFatherID;
            });

            if (fa) {
              this.form.AnimalFatherName = fa.AnimalEarIDAndName;
            }
          }
        });

      if (this.animal_id == 1) {
        this.apiAnimalMotherID +=
          "AnimalSexID=2&AnimalID=" + this.bornItem.AnimalID;
      } else if (this.animal_id == 2) {
        this.apiAnimalMotherID +=
          "AnimalSexID=2&AnimalID=" + this.bornItem.AnimalID;
      } else if (this.animal_id == 3) {
        this.apiAnimalMotherID +=
          "AnimalSexID=2&AnimalID=" + this.bornItem.AnimalID;
      }

      axios
        .get(this.apiAnimalMotherID, { signal: this.controller.signal })
        .then((response) => {
          this.animalmother = response.data.rows;
          if (this.bornItem) {
            this.form.AnimalMotherID = this.bornItem.AnimalID;
            let mo = this.animalmother.find((x) => {
              return x.AnimalID == this.form.AnimalMotherID;
            });

            if (mo) {
              this.form.AnimalMotherName = mo.AnimalEarIDAndName;
            }
          }
        });

      axios
        .get(this.apiAnimalBreedID, { signal: this.controller.signal })
        .then((response) => {
          if (this.animal_id == 1) {
            this.animalbreed = response.data.rows
              .filter(
                (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
              )
              .map((item) => {
                return {
                  AnimalBreedID: item.AnimalBreedID,
                  AnimalBreedCode: item.AnimalBreedCode,
                  Fullname: item.AnimalBreedCode + ", " + item.AnimalBreedName,
                };
              });
          } else if (this.animal_id == 2) {
            this.animalbreed = response.data.rows
              .filter(
                (item) => item.AnimalTypeID === 3 || item.AnimalTypeID === 4
              )
              .map((item) => {
                return {
                  AnimalBreedID: item.AnimalBreedID,
                  AnimalBreedCode: item.AnimalBreedCode,
                  Fullname: item.AnimalBreedCode + ", " + item.AnimalBreedName,
                };
              });
          } else if (this.animal_id == 3) {
            this.animalbreed = response.data.rows
              .filter(
                (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
              )
              .map((item) => {
                return {
                  AnimalBreedID: item.AnimalBreedID,
                  AnimalBreedCode: item.AnimalBreedCode,
                  Fullname: item.AnimalBreedCode + ", " + item.AnimalBreedName,
                };
              });
          }

          // this.animalbreed = response.data.rows.map((item) => {
          //   return {
          //     AnimalBreedID: item.AnimalBreedID,
          //     AnimalBreedCode: item.AnimalBreedCode,
          //     Fullname: item.AnimalBreedCode + ", " + item.AnimalBreedName,
          //   };
          // });
        });

      this.apiOrganizationID +=
        "&OrganizationID=" + this.bornItem.OrganizationID;

      axios
        .get(this.apiOrganizationID, { signal: this.controller.signal })
        .then((response) => {
          this.organization = response.data.rows;
        });
      axios
        .get(this.apiOrganizationZoneID, { signal: this.controller.signal })
        .then((response) => {
          this.organizationzone = response.data.rows;
        });

      if (this.animal_id == 1) {
        this.apiProject += "&ProjectLevel=ANIMAL&AnimalTypeID=[1,2,41,42]";
      } else if (this.animal_id == 2) {
        this.apiProject += "&ProjectLevel=ANIMAL&AnimalTypeID=[3,4,43,44]";
      } else if (this.animal_id == 3) {
        this.apiProject += "&ProjectLevel=ANIMAL&AnimalTypeID=[17,18,45,46]";
      }
      axios
        .get(this.apiProject, { signal: this.controller.signal })
        .then((response) => {
          this.project = response.data.rows;
        });

      axios
        .get(this.apiAnimalStatusID, { signal: this.controller.signal })
        .then((response) => {
          if (this.animal_id == 1) {
            this.animalstatus = response.data.rows.filter(
              (item) =>
                item.AnimalStatusID === 1 ||
                item.AnimalStatusID === 2 ||
                item.AnimalStatusID === 3 ||
                item.AnimalStatusID === 4 ||
                item.AnimalStatusID === 5
            );
          } else if (this.animal_id == 2) {
            this.animalstatus = response.data.rows.filter(
              (item) =>
                item.AnimalStatusID === 6 ||
                item.AnimalStatusID === 7 ||
                item.AnimalStatusID === 8 ||
                item.AnimalStatusID === 9 ||
                item.AnimalStatusID === 10
            );
          } else if (this.animal_id == 3) {
            this.animalstatus = response.data.rows.filter(
              (item) =>
                item.AnimalStatusID === 11 ||
                item.AnimalStatusID === 12 ||
                item.AnimalStatusID === 13 ||
                item.AnimalStatusID === 14 ||
                item.AnimalStatusID === 15
            );
          }
        });
      axios
        .get(this.apiAnimalTypeID, { signal: this.controller.signal })
        .then((response) => {
          this.animaltype = response.data.rows.filter(
            (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
          );

          if (this.animal_id == 1) {
            this.animaltype = response.data.rows.filter(
              (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
            );
          } else if (this.animal_id == 2) {
            this.animaltype = response.data.rows.filter(
              (item) => item.AnimalTypeID === 3 || item.AnimalTypeID === 4
            );
          } else if (this.animal_id == 3) {
            this.animaltype = response.data.rows.filter(
              (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
            );
          }
        });
    },
    callGennumber() {
      if (
        this.filtered.FarmID &&
        this.filtered.AnimalBirthDate &&
        this.form.AnimalTypeID
      ) {
        // console.log(this.urlNumber);
        let date = JSON.stringify(this.filtered.AnimalBirthDate);
        let AnimalBirthDate = date.slice(1, 11);

        axios
          .get(this.apiAnimalSex, { signal: this.controller.signal })
          .then((response) => {
            this.animalsex = response.data.rows;
          });

        this.urlNumber +=
          "?FarmID=" +
          this.filtered.FarmID +
          "&BirthDate=" +
          AnimalBirthDate +
          "&AnimalTypeID=" +
          this.form.AnimalTypeID;

        // console.log(this.urlNumber);

        axios
          .get(this.urlNumber, { signal: this.controller.signal })
          .then((response) => {
            // console.log(response);

            this.form.AnimalIdentificationID =
              response.data.AnimalNumberGenerate;
            this.form.AnimalEarID = response.data.AnimalEarGenerate;
            // this.form.AnimalNationalID = response.data.AnimalNationalID;
            this.urlNumber = "/animal/generate-number";

            this.$toast.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "สร้างเลขทะเบียนสัตว์",
              life: 5000,
            });
          })
          // error
          .catch((err) => {
            this.urlNumber = "/animal/generate-number";
            this.$toast.add({
              severity: "error",
              summary: "ล้มเหลว",
              detail: err.response.data.error.message,
              life: 5000,
            });
          });
      }
      // post
    },
    add() {
      // validation
      if (this.validation() == false) {
        return;
      }

      let total =
        this.form.AnimalBreedPercent1 +
        this.form.AnimalBreedPercent2 +
        this.form.AnimalBreedPercent3 +
        this.form.AnimalBreedPercent4 +
        this.form.AnimalBreedPercent5;

      if (total > 100) {
        this.valid = true;
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "สัดส่วนสายพันธุ์เกิน 100 %",
          life: 5000,
        });
        return false;
      } else if (total < 100) {
        this.valid = true;
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "สัดส่วนสายพันธุ์ไม่ถึง 100 %",
          life: 5000,
        });
        return false;
      }

      // change data
      this.form.isActive = this.form.isActive.value;
      this.form.AnimalAlive = this.form.AnimalAlive.value;

      if (this.form.AnimalFirstBreed) {
        this.form.AnimalFirstBreed = 0;
      }
      if (this.form.AnimalBornType) {
        this.form.AnimalBornType = this.form.AnimalBornType.id;
      }
      if (this.form.AnimalSource) {
        this.form.AnimalSource = this.form.AnimalSource.id;
      }

      let formData = new FormData();
      formData.append("photo_url", this.form.AnimalImagePathGen);

      // post
      axios
        .post(this.url, this.form)
        .then((res) => {
          if (this.form.AnimalImagePathGen !== undefined) {
            this.uploadPhoto(res.data.AnimalID, formData);
          }
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });

          if (this.bornItem) {
            // this.$router.push("/activity/creature_info");

            this.$router.push("/activity/creature_info_detail");
          } else {
            this.$router.push("/agency/creature");
          }
        })
        // error
        .catch((err) => {
          this.form.isActive = this.status[0];
          this.form.AnimalBornType = "BORN";
          this.form.AnimalSource = "BUY";
          this.form.AnimalFirstBreed = 1;
          this.form.AnimalAlive = this.alive[0];
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },
    uploadPhoto(id, formData) {
      axios
        .post(this.url + "/photo/" + id, formData)
        .then(() => {})
        .catch((err) => {
          this.form.isActive = this.status[0];
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },
    // Modal
    preview(e) {
      const file = e.files[0];
      this.path = URL.createObjectURL(file);
      this.form.AnimalImagePathGen = file;
    },
    addAnimal() {
      if (this.checkAnimal < 5) {
        this.checkAnimal += 1;
      }
    },
    deleteAnimal() {
      if (this.checkAnimal > 2) {
        this.checkAnimal -= 1;
      }
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>

<style></style>
