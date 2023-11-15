<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="เพิ่มทะเบียนสัตว์" :pages="breadcrumb" />
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
                      ฟาร์ม <span class="text-red-500">*</span></label
                    >
                    <Dropdown
                      class="w-full"
                      :options="farm"
                      optionLabel="Fullname"
                      optionValue="FarmID"
                      placeholder="เลือกฟาร์ม"
                      :virtualScrollerOptions="{ itemSize: 38 }"
                      v-model="form.FarmID"
                      :showClear="true"
                      :filter="true"
                      :class="{ 'p-invalid': !form.FarmID && valid }"
                    />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      วัน-เดือน-ปี (เกิด)
                      <span class="text-red-500">*</span></label
                    >
                    <!-- <Calendar
                      class="w-full"
                      id="datebirth"
                      :showButtonBar="true"
                      :showIcon="true"
                      v-model="form.AnimalBirthDate"
                      :class="{ 'p-invalid': !form.AnimalBirthDate && valid }"
                    /> -->
                    <Datepicker
                      v-model="form.AnimalBirthDate"
                      :class="{ 'p-invalid': !form.AnimalBirthDate && valid }"
                      id="dateRange"
                      locale="th"
                      :format="format"
                      utc
                      :enableTimePicker="false"
                      :maxDate="new Date()"
                      cancelText="ยกเลิก"
                      selectText="ยืนยัน"
                      placeholder="วัน-เดือน-ปี (เกิด)"
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
                      หน่วยงาน/สถานีที่ฟาร์มสังกัด
                      <span class="text-red-500"> *</span></label
                    >
                    <Dropdown
                      class="w-full"
                      id="selectedstatus"
                      :options="organization"
                      optionLabel="OrganizationName"
                      optionValue="OrganizationID"
                      placeholder="เลือกหน่วยงาน/สถานีที่ฟาร์มสังกัด"
                      :filter="true"
                      v-model="form.OrganizationID"
                      :class="{ 'p-invalid': !form.OrganizationID && valid }"
                    />
                  </div>

                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      เขตพื้นที่ที่ฟาร์มสังกัด<span class="text-red-500">
                        *</span
                      ></label
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
                      เลขอ้างอิงสัตว์ <span class="text-red-500">*</span></label
                    >
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
                    <label class="block text-600 text-sm font-bold mb-2"
                      >ชนิดสัตว์ <span class="text-red-500">*</span></label
                    >
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
                      หมายเลขเบอร์หู
                      <span class="text-red-500"> **หมายเลขประจำตัวใด ๆ</span>
                    </label>
                    <InputText
                      type="text"
                      class="w-full"
                      placeholder=""
                      v-model="form.AnimalEarID"
                    />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      หมายเลข NID</label
                    >
                    <!-- <InputText
                      type="text"
                      class="w-full"
                      placeholder=""
                      v-model="form.AnimalNationalID"
                    /> -->

                    <InputMask
                      class="w-full"
                      v-model="form.AnimalNationalID"
                      mask="999999Na99999"
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
                      >สถานะ <span class="text-red-500">*</span></label
                    >
                    <Dropdown
                      class="w-full"
                      :options="animalstatus"
                      optionLabel="AnimalStatusName"
                      optionValue="AnimalStatusID"
                      placeholder="เลือกสถานะ"
                      :showClear="true"
                      :filter="true"
                      v-model="form.AnimalStatusID"
                      :class="{ 'p-invalid': !form.AnimalStatusID && valid }"
                    >
                    </Dropdown>
                  </div>

                  <!-- <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2"
                      >ชนิดสัตว์ <span class="text-red-500">*</span></label
                    >
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
                  </div> -->
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      น้ำหนักแรกเกิด (กก.)</label
                    >
                    <InputText
                      type="number"
                      class="w-full"
                      v-model="form.AnimalBornWeight"
                      min="0"
                    />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      ท้องที่</label
                    >

                    <InputNumber
                      :readonly="checkPregrancy"
                      v-model="form.AnimalPar"
                      class="w-full"
                      min="0"
                      showButtons
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
                      :virtualScrollerOptions="{ itemSize: 38 }"
                      :showClear="true"
                      :filter="true"
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
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      วันที่เข้าฝูง
                      <span class="text-red-500">*</span></label
                    >
                    <Datepicker
                      v-model="form.AnimalDateJoin"
                      :class="{ 'p-invalid': !form.AnimalDateJoin && valid }"
                      id="dateRange"
                      locale="th"
                      :format="format"
                      utc
                      :enableTimePicker="false"
                      :maxDate="new Date()"
                      cancelText="ยกเลิก"
                      selectText="ยืนยัน"
                      placeholder="วัน-เดือน-ปี"
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
                    <label class="block text-600 text-sm font-bold mb-2"
                      >ตั้งต้นสายเลือด<span class="text-red-500">
                        *</span
                      ></label
                    >
                    <Dropdown
                      class="w-full"
                      :options="FirstBreed"
                      optionLabel="name"
                      :showClear="true"
                      :filter="true"
                      placeholder="เลือกตั้งต้นสายเลือด"
                      v-model="form.AnimalFirstBreed"
                      :class="{ 'p-invalid': !form.AnimalFirstBreed && valid }"
                    />
                  </div>

                  <div class="col-12" v-if="checkFirst == '0'">
                    <div class="formgrid grid">
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                          หมายเลขพ่อ<span class="text-red-500"> *</span></label
                        >

                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalfather"
                          optionLabel="AnimalEarIDAndName"
                          optionValue="AnimalID"
                          placeholder="เลือกหมายเลขพ่อ"
                          :showClear="true"
                          :filter="true"
                          :virtualScrollerOptions="{ itemSize: 38 }"
                          v-model="form.AnimalFatherID"
                        />
                      </div>

                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                          หมายเลขแม่<span class="text-red-500"> *</span></label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalmother"
                          optionLabel="AnimalEarIDAndName"
                          optionValue="AnimalID"
                          placeholder="เลือกหมายเลขแม่"
                          :showClear="true"
                          :filter="true"
                          :virtualScrollerOptions="{ itemSize: 38 }"
                          v-model="form.AnimalMotherID"
                        />
                      </div>
                    </div>
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
                          placeholder="สายพันธุ์ที่ 1"
                          :showClear="true"
                          :filter="true"
                          :disabled="true"
                          v-model="form.AnimalBreedID1"
                        />
                      </div>
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สัดส่วนสายพันธุ์ที่ 1 (%)</label
                        >

                        <!-- <InputNumber
                          inputId="minmax"
                          class="w-full"
                          v-model="form.AnimalBreedPercent1"
                          mode="decimal"
                          :min="0"
                          :max="100"
                          readonly
                        /> -->

                        <Dropdown
                          class="w-full"
                          :options="Percent"
                          optionLabel="name"
                          optionValue="id"
                          placeholder="เลือกสัดส่วน"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalBreedPercent1"
                          :class="{
                            'p-invalid': !form.AnimalBreedPercent1 && valid,
                          }"
                          readonly
                        >
                        </Dropdown>
                      </div>
                      <div
                        class="field col-12 sm:col-6"
                        v-if="form.AnimalBreedPercent1 != 100"
                      >
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 2</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          optionLabel="Fullname"
                          optionValue="AnimalBreedID"
                          placeholder="สายพันธุ์ที่ 2"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalBreedID2"
                          :disabled="true"
                        />
                      </div>
                      <div
                        class="field col-12 sm:col-6"
                        v-if="form.AnimalBreedPercent1 != 100"
                      >
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สัดส่วนสายพันธุ์ที่ 2 (%)</label
                        >
                        <InputNumber
                          inputId="minmax"
                          class="w-full"
                          v-model="form.AnimalBreedPercent2"
                          mode="decimal"
                          :minFractionDigits="2"
                          :min="0"
                          :max="100"
                          readonly
                        />
                      </div>
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 3</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalbreedDefault"
                          optionLabel="Fullname"
                          optionValue="AnimalBreedID"
                          placeholder="สายพันธุ์ที่ 3"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalBreedID3"
                          :disabled="true"
                        />
                      </div>
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สัดส่วนสายพันธุ์ที่ 3 (%)</label
                        >
                        <InputNumber
                          inputId="minmax"
                          class="w-full"
                          v-model="form.AnimalBreedPercent3"
                          mode="decimal"
                          :minFractionDigits="2"
                          :min="0"
                          :max="100"
                          readonly
                        />
                      </div>
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 4</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalbreedDefault"
                          optionLabel="Fullname"
                          optionValue="AnimalBreedID"
                          placeholder="สายพันธุ์ที่ 4"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalBreedID4"
                          :disabled="true"
                        />
                      </div>
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สัดส่วนสายพันธุ์ที่ 4 (%)</label
                        >
                        <InputNumber
                          inputId="minmax"
                          class="w-full"
                          v-model="form.AnimalBreedPercent4"
                          mode="decimal"
                          :minFractionDigits="2"
                          :min="0"
                          :max="100"
                          readonly
                        />
                      </div>
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 5</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalbreedDefault"
                          optionLabel="Fullname"
                          optionValue="AnimalBreedID"
                          placeholder="สายพันธุ์ที่ 5"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalBreedID5"
                          :disabled="true"
                        />
                      </div>
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สัดส่วนสายพันธุ์ที่ 5 (%)</label
                        >
                        <InputNumber
                          inputId="minmax"
                          class="w-full"
                          v-model="form.AnimalBreedPercent5"
                          mode="decimal"
                          :minFractionDigits="2"
                          :min="0"
                          :max="100"
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-12" v-else-if="checkFirst == '1'">
                    <div class="formgrid grid">
                      <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 1<span class="text-red-500">
                            *</span
                          ></label
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
                          >สัดส่วนสายพันธุ์ที่ 1 (%)<span class="text-red-500">
                            *</span
                          ></label
                        >

                        <Dropdown
                          v-if="
                            form.AnimalSexID == 2 &&
                            user.GroupID != 1 &&
                            user.GroupID != 16 &&
                            user.GroupID != 15
                          "
                          class="w-full"
                          :options="Percent"
                          optionLabel="name"
                          optionValue="id"
                          placeholder="เลือกสัดส่วน"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalBreedPercent1"
                          :class="{
                            'p-invalid': !form.AnimalBreedPercent1 && valid,
                          }"
                        >
                        </Dropdown>

                        <InputNumber
                          v-if="
                            form.AnimalSexID == 2 &&
                            (user.GroupID == 1 ||
                              user.GroupID == 16 ||
                              user.GroupID == 15)
                          "
                          inputId="minmax"
                          class="w-full"
                          v-model="form.AnimalBreedPercent1"
                          mode="decimal"
                          :minFractionDigits="2"
                          :min="0"
                          :max="100"
                        />

                        <InputNumber
                          v-if="form.AnimalSexID == 1"
                          inputId="minmax"
                          class="w-full"
                          v-model="form.AnimalBreedPercent1"
                          mode="decimal"
                          :minFractionDigits="2"
                          :min="0"
                          :max="100"
                        />
                        <!-- 
                        <InputNumber
                          inputId="minmax"
                          class="w-full"
                          v-model="form.AnimalBreedPercent1"
                          mode="decimal"
                          :min="0"
                          :max="100"
                        /> -->
                      </div>
                      <div
                        class="field col-12 sm:col-6"
                        v-if="form.AnimalBreedPercent1 != 100"
                      >
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 2</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalbreedDefault"
                          optionLabel="Fullname"
                          optionValue="AnimalBreedID"
                          placeholder="เลือกสายพันธุ์ที่"
                          :showClear="true"
                          :filter="true"
                          v-model="form.AnimalBreedID2"
                        />
                      </div>
                      <div
                        class="field col-12 sm:col-6"
                        v-if="form.AnimalBreedPercent1 != 100"
                      >
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สัดส่วนสายพันธุ์ที่ 2 (%)</label
                        >
                        <InputNumber
                          inputId="minmax"
                          class="w-full"
                          v-model="form.AnimalBreedPercent2"
                          mode="decimal"
                          :minFractionDigits="2"
                          :min="0"
                          :max="100"
                        />
                      </div>
                      <div class="field col-12 sm:col-6" v-if="checkAnimal > 2">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 3</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalbreedDefault"
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
                        <InputNumber
                          inputId="minmax"
                          class="w-full"
                          v-model="form.AnimalBreedPercent3"
                          mode="decimal"
                          :minFractionDigits="2"
                          :min="0"
                          :max="100"
                        />
                      </div>
                      <div class="field col-12 sm:col-6" v-if="checkAnimal > 3">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 4</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalbreedDefault"
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
                        <InputNumber
                          inputId="minmax"
                          class="w-full"
                          v-model="form.AnimalBreedPercent4"
                          mode="decimal"
                          :minFractionDigits="2"
                          :min="0"
                          :max="100"
                        />
                      </div>
                      <div class="field col-12 sm:col-6" v-if="checkAnimal > 4">
                        <label class="block text-600 text-sm font-bold mb-2"
                          >สายพันธุ์ที่ 5</label
                        >
                        <Dropdown
                          class="w-full"
                          id="selectedstatus"
                          :options="animalbreedDefault"
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
                        <InputNumber
                          inputId="minmax"
                          class="w-full"
                          v-model="form.AnimalBreedPercent5"
                          :minFractionDigits="2"
                          mode="decimal"
                          :min="0"
                          :max="100"
                        />
                      </div>
                      <div
                        class="field col-12 sm:col-12 flex justify-content-between"
                        v-if="form.AnimalBreedPercent1 != 100"
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

                  <!-- <div class="field col-12 sm:col-12 lg:col-12">
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
                  </div> -->
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
    <!-- <Dialog
      header=""
      v-model:visible="displayConfirmModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <div class="text-center text-teal-700 py-8">
        <img src="..\..\assets\images\check-circle-fill.svg" alt="icons" />
        <h1>ลงทะเบียนสัตว์สำเร็จ</h1>
      </div>
    </Dialog> -->
    <!-- End Move Dialog -->
  </div>
</template>
<script>
import axios from "axios";

import PageTitle from "@/components/PageTitle.vue";
import dayjs from "dayjs";
// import locale from "dayjs/locale/th";
// import buddhistEra from "dayjs/plugin/buddhistEra";
import { mapGetters } from "vuex";
import { format } from "date-fns";
import { th } from "date-fns/locale";

export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      bornItem: "bornItem",
      user: "user",
    }),
  },
  data() {
    return {
      url: "/animal",
      urlNumber: "/animal/generate-number",
      apiFarm: "/farm?includeAll=false&isActive=1",
      apiPersonal: "/staff?isActive=1",
      apiAnimalSex: "/animal-sex?isActive=1",
      apiAnimalFatherID: "/animal/id-and-name?isActive=1",
      apiAnimalMotherID: "/animal/id-and-name?isActive=1",
      apiAnimalBreedID: "/animal-breed?includeAll=false&isActive=1",
      apiOrganizationID: "/organization?includeAll=false&isActive=1",
      apiOrganizationZoneID: "/organization-zone?isActive=1",
      apiProject: "/project?includeAll=false&isActive=1",
      apiAnimalStatusID: "/animal-status?isActive=1",
      apiAnimalTypeID: "/animal-type?isActive=1",
      apiCheckBreed: "/animal/generate-breed",
      breadcrumb: [
        { label: "ทะเบียนสัตว์ (ผท.1)", to: "/agency/creature" },
        { label: "เพิ่มทะเบียนสัตว์", to: "" },
      ],

      // load
      data: [],
      farm: [],
      isLoading: false,
      animalstatus: [],
      animalstatusDefault: [],
      animalsex: [],
      personal: [],
      organization: [],
      organizationzone: [],
      animalfather: [],
      animaltype: [],
      gennumber: [],
      animalbreedDefault: [],
      OrganizationZone: [],
      project: [],

      checkFirst: null,
      checkMother: null,
      checkFather: null,
      checkPregrancy: true,
      numberPregrancy: 0,
      // form
      valid: false,
      path: null,

      form: {
        isActive: "",
        AnimalNationalID: null,
        AnimalEarID: null,
        AnimalMicrochip: null,
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
        {
          id: "BUY",
          name: "ซื้อมา",
        },
        {
          id: "TRANSFER",
          name: "ย้ายมา",
        },
      ],
      FirstBreed: [
        {
          id: "1",
          name: "สายเลือดตั้งต้น",
        },
        {
          id: "0",
          name: "สายเลือดครอบครัว",
        },
      ],

      Percent: [
        {
          id: 50,
          name: "50.00",
        },
        {
          id: 75,
          name: "75.00",
        },
        {
          id: 100,
          name: "100.00",
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

    this.form.isActive = this.status[0];
    this.form.AnimalAlive = this.alive[0];

    if (this.animal_id == 1) {
      //   this.form.AnimalTypeID = 1;
    } else if (this.animal_id == 2) {
      //   this.form.AnimalTypeID = 3;
    } else if (this.animal_id == 3) {
      //   this.form.AnimalTypeID = 17;
    }

    this.load();
    if (this.bornItem) {
      this.form.AnimalFirstBreed = this.bornItem.AnimalFirstBreed;
      this.form.AnimalMotherID = this.bornItem.AnimalID;
      this.form.GiveBirthSelfID = this.bornItem.GiveBirthID;
      this.form.checkBorn = this.bornItem.checkBorn;
      this.form.AnimalBirthDate = this.bornItem.AnimalBirthDate;
      this.form.FarmID = this.bornItem.FarmID;
      this.form.OrganizationZoneID = this.bornItem.OrganizationZoneID;
      this.form.OrganizationID = this.bornItem.OrganizationID;
      this.filtered.FarmID = this.bornItem.FarmID;
      this.filtered.AnimalBirthDate = this.bornItem.AnimalBirthDate;
    }

    this.form.AnimalSexID = 2;
  },
  watch: {
    "form.FarmID"(val) {
      //  console.log(this.farm)
      if (Array.isArray(this.farm) && this.farm.length) {
        // console.log(this.farm);
        let temp = this.farm.filter((item) => item.FarmID == val);
        this.form.OrganizationZoneID = temp[0].OrganizationZoneID;
        this.form.OrganizationID = temp[0].OrganizationID;
        this.form.AIZoneID = temp[0].AIZoneID;
        this.filtered.FarmID = temp[0].FarmID;

        // console.log(this.form.OrganizationZoneID);
        this.callGennumber();
      }
    },

    "form.AnimalFirstBreed"(val) {
      this.checkFirst = val.id;
      this.checkAnimal = 2;
    },

    "form.AnimalBirthDate"(val) {
      this.filtered.AnimalBirthDate = val;
      this.callGennumber();
      this.callStatus();
      this.callStatus1();
    },

    "form.AnimalTypeID"(val) {
      this.filtered.AnimalTypeID = val;
      if (this.animalbreedDefault != undefined) {
        let animalbreedFind = this.animalbreedDefault.filter((x) => {
          return x.AnimalTypeID == this.filtered.AnimalTypeID;
        });
        this.animalbreed = [...animalbreedFind];
      }

      this.callGennumber();

      //

      //   console.log(this.animalbreed);
      //   console.log(this.animalbreedDefault);

      //   console.log("FREEDOM8")

      // this.callGennumber();
    },
    "form.AnimalSexID"(val) {
      this.filtered.AnimalSexID = val;
      this.callStatus();
      this.callStatus1();

      //   this.animalstatusDefault =
      // AnimalSexID
      // this.callGennumber();
    },

    // "form.OrganizationID"(val) {
    //   console.log(555);
    //   if (val) {
    //     let temp = this.organization.filter(
    //       (item) => item.OrganizationID == val
    //     );
    //     if (Array.isArray(temp) && temp.length) {
    //       this.form.OrganizationZoneID = temp[0].OrganizationZoneID;
    //     }
    //   } else {
    //     this.form.OrganizationZoneID = null;
    //   }
    //   console.log(this.form.OrganizationZoneID);
    // },

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
    "form.AnimalBreedPercent1"(val) {
      // console.log(val);

      if (val == 100) {
        this.form.AnimalBreedID2 = null;
        this.form.AnimalBreedID3 = null;
        this.form.AnimalBreedID4 = null;
        this.form.AnimalBreedID5 = null;

        this.form.AnimalBreedPercent2 = 0;
        this.form.AnimalBreedPercent3 = 0;
        this.form.AnimalBreedPercent4 = 0;
        this.form.AnimalBreedPercent5 = 0;
      }
      // if (this.checkFather) {
      //   this.callCheckBreed();
      // }
    },

    "form.AnimalStatusID"(val) {
      // โคเนื้อ
      if (val == 1) {
        // this.form.AnimalSexID = 2;
        this.checkPregrancy = true;
        this.form.AnimalPar = null;
      } else if (val == 2) {
        // this.form.AnimalSexID = 1;
        this.checkPregrancy = true;
        this.form.AnimalPar = null;
      } else if (val == 3) {
        // this.form.AnimalSexID = 2;
        this.checkPregrancy = true;
        this.form.AnimalPar = 0;
      } else if (val == 4) {
        // this.form.AnimalSexID = 1;
        this.checkPregrancy = true;
        this.form.AnimalPar = null;
      } else if (val == 5) {
        // this.form.AnimalSexID = 2;
        this.checkPregrancy = false;
        this.form.AnimalPar = 1;
      }
      // กระบือ
      else if (val == 6) {
        // this.form.AnimalSexID = 2;
        this.checkPregrancy = true;
        this.form.AnimalPar = null;
      } else if (val == 7) {
        // this.form.AnimalSexID = 1;
        this.checkPregrancy = true;
        this.form.AnimalPar = null;
      } else if (val == 8) {
        // this.form.AnimalSexID = 2;
        this.checkPregrancy = true;
        this.form.AnimalPar = 0;
      } else if (val == 9) {
        // this.form.AnimalSexID = 1;
        this.checkPregrancy = true;
        this.form.AnimalPar = null;
      } else if (val == 10) {
        // this.form.AnimalSexID = 2;
        this.checkPregrancy = false;
        this.form.AnimalPar = 1;
      }
      // แพะ
      else if (val == 11) {
        // this.form.AnimalSexID = 2;
        this.checkPregrancy = true;
        this.form.AnimalPar = null;
      } else if (val == 12) {
        // this.form.AnimalSexID = 1;
        this.checkPregrancy = true;
        this.form.AnimalPar = null;
      } else if (val == 13) {
        // this.form.AnimalSexID = 2;
        this.checkPregrancy = true;
        this.form.AnimalPar = 0;
      } else if (val == 14) {
        // this.form.AnimalSexID = 1;
        this.checkPregrancy = true;
        this.form.AnimalPar = null;
      } else if (val == 15) {
        // this.form.AnimalSexID = 2;
        this.checkPregrancy = false;
        this.form.AnimalPar = 1;
      }
    },

    "form.AnimalPar"(val) {
      if (val == 0) {
        if (this.animal_id == 1) {
          this.form.AnimalStatusID = 3;
        } else if (this.animal_id == 2) {
          this.form.AnimalStatusID = 8;
        } else if (this.animal_id == 3) {
          this.form.AnimalStatusID = 13;
        }
      }
    },
  },
  methods: {
    format(date) {
      const dayStart = date.getDate();
      const monthStart = date.getMonth();
      const yearStart = date.getFullYear() + 543;

      //   return `${dayStart} ${monthStart} ${yearStart}`;

      const formatStart = format(
        new Date(yearStart, monthStart, dayStart),
        "dd/MM/yyyy",
        {
          locale: th,
        }
      );
      return `${formatStart}`;
    },
    callCheckBreed() {
      console.log(this.checkMother);
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
            // console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
              if (i == 0) {
                this.form.AnimalBreedID1 = response.data[i].AnimalBreedID;
                // this.form.AnimalBreedID1 = 7;
                // this.form.AnimalBreedID1 = 50;

                if (response.data[i].AnimalBreedPercent == "50.000") {
                  this.form.AnimalBreedPercent1 = 50;
                } else if (response.data[i].AnimalBreedPercent == "75.000") {
                  this.form.AnimalBreedPercent1 = 75;
                } else if (response.data[i].AnimalBreedPercent == "100.000") {
                  this.form.AnimalBreedPercent1 = 100;
                }
                // console.log(this.form.AnimalBreedID1);
                // this.form.AnimalBreedPercent1 =
                //   response.data[i].AnimalBreedPercent;

                // console.log(this.form.AnimalBreedPercent1);
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
        !this.form.AnimalFirstBreed ||
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
        .get(this.apiFarm + "&FarmAnimalType=[" + this.animal_id + "]", {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.farm = response.data.rows.map((item) => {
            return {
              FarmID: item.FarmID,
              FarmName: item.FarmName,
              OrganizationID: item.OrganizationID,
              OrganizationZoneID: item.OrganizationZoneID,
              AIZoneID: item.AIZoneID,
              Fullname: item.FarmIdentificationNumber + ", " + item.FarmName,
              // OrganizationZoneName: item.OrganizationZone.OrganizationZoneName,
            };
          });
        });
      axios
        .get(this.apiAnimalSex, { signal: this.controller.signal })
        .then((response) => {
          this.animalsex = response.data.rows;
        });
      // axios
      //   .get(this.apiPersonal, { signal: this.controller.signal })
      //   .then((response) => {
      //     this.personal = response.data.rows.map((item) => {
      //       return {
      //         StaffID: item.StaffID,
      //         StaffNumber: item.StaffNumber,
      //         Fullname:
      //           item.StaffNumber +
      //           ", " +
      //           item.StaffGivenName +
      //           " " +
      //           item.StaffSurname,
      //       };
      //     });
      //   });

      if (this.animal_id == 1) {
        this.apiAnimalMotherID += "&AnimalTypeID=[1,2,42]";
      } else if (this.animal_id == 2) {
        this.apiAnimalMotherID += "&AnimalTypeID=[3,4,44]";
      } else if (this.animal_id == 3) {
        this.apiAnimalMotherID += "&AnimalTypeID=[17,18,46]";
      }

      axios
        .get(this.apiAnimalMotherID, { signal: this.controller.signal })
        .then((response) => {
          //   console.log(response.data.rows);
          this.animalmother = response.data.rows.filter(
            (item) => item.AnimalSexID === 2
          );
          this.animalfather = response.data.rows.filter(
            (item) => item.AnimalSexID === 1
          );
        })
        .finally(() => {
          // console.log(this.form.AnimalMotherID);
          //   console.log(this.animalmother);
          //   console.log(this.animalfather);
          //   console.log("FREEDOM");
        });

      // if (this.animal_id == 1) {
      //   this.apiAnimalFatherID += "&AnimalTypeID=[1,2]&isActive=1";
      // } else if (this.animal_id == 2) {
      //   this.apiAnimalFatherID += "&AnimalTypeID=[3,4,42]&isActive=1";
      // } else if (this.animal_id == 3) {
      //   this.apiAnimalFatherID += "&AnimalTypeID=[17,18]&isActive=1";
      // }

      // axios
      //   .get(this.apiAnimalFatherID+"&AnimalSexID=1", { signal: this.controller.signal })
      //   .then((response) => {
      //     this.animalfather = response.data.rows;
      //       // .filter((item) => item.AnimalSexID === 1)
      //       // .map((item) => {
      //       //   return {
      //       //     AnimalID: item.AnimalID,
      //       //     AnimalIdentificationID: item.AnimalIdentificationID,
      //       //     Fullname: item.AnimalEarID + ", " + item.AnimalName,
      //       //   };
      //       // });
      //   });

      // if (this.animal_id == 1) {
      //   this.apiAnimalMotherID += "&AnimalTypeID=[1,2]";
      // } else if (this.animal_id == 2) {
      //   this.apiAnimalMotherID += "&AnimalTypeID=[3,4,42]";
      // } else if (this.animal_id == 3) {
      //   this.apiAnimalMotherID += "&AnimalTypeID=[17,18]";
      // }
      // axios
      //   .get(this.apiAnimalMotherID+"&AnimalSexID=2", { signal: this.controller.signal })
      //   .then((response) => {

      //     this.animalmother = response.data.rows

      //       // .filter((item) => item.AnimalSexID === 2)
      //       // .map((item) => {
      //       //   return {
      //       //     AnimalID: item.AnimalID,
      //       //     AnimalIdentificationID: item.AnimalIdentificationID,
      //       //     Fullname: item.AnimalEarID + ", " + item.AnimalName,
      //       //   };
      //       // });
      //   });

      axios
        .get(this.apiAnimalBreedID, { signal: this.controller.signal })
        .then((response) => {
          if (this.animal_id == 1) {
            this.animalbreed = response.data.rows
              .filter(
                (item) =>
                  item.AnimalTypeID === 1 ||
                  item.AnimalTypeID === 2 ||
                  item.AnimalTypeID === 41 ||
                  item.AnimalTypeID === 42
              )
              .map((item) => {
                return {
                  AnimalBreedID: item.AnimalBreedID,
                  AnimalBreedCode: item.AnimalBreedCode,
                  Fullname: item.AnimalBreedCode + ", " + item.AnimalBreedName,
                  AnimalTypeID: item.AnimalTypeID,
                };
              });

            this.animalbreedDefault = this.animalbreed;
            // console.log(this.animalbreed)
            console.log(this.animalbreedDefault);

            // console.log(this.animalbreedDefault);
          } else if (this.animal_id == 2) {
            this.animalbreed = response.data.rows
              .filter(
                (item) =>
                  item.AnimalTypeID === 3 ||
                  item.AnimalTypeID === 4 ||
                  item.AnimalTypeID === 43 ||
                  item.AnimalTypeID === 44
              )
              .map((item) => {
                return {
                  AnimalBreedID: item.AnimalBreedID,
                  AnimalBreedCode: item.AnimalBreedCode,
                  Fullname: item.AnimalBreedCode + ", " + item.AnimalBreedName,
                  AnimalTypeID: item.AnimalTypeID,
                };
              });

            this.animalbreedDefault = [...this.animalbreed];
          } else if (this.animal_id == 3) {
            this.animalbreed = response.data.rows
              .filter(
                (item) =>
                  item.AnimalTypeID === 17 ||
                  item.AnimalTypeID === 18 ||
                  item.AnimalTypeID === 45 ||
                  item.AnimalTypeID === 46
              )
              .map((item) => {
                return {
                  AnimalBreedID: item.AnimalBreedID,
                  AnimalBreedCode: item.AnimalBreedCode,
                  Fullname: item.AnimalBreedCode + ", " + item.AnimalBreedName,
                  AnimalTypeID: item.AnimalTypeID,
                };
              });

            this.animalbreedDefault = [...this.animalbreed];
          }

          // this.animalbreed = response.data.rows.map((item) => {
          //   return {
          //     AnimalBreedID: item.AnimalBreedID,
          //     AnimalBreedCode: item.AnimalBreedCode,
          //     Fullname: item.AnimalBreedCode + ", " + item.AnimalBreedName,
          //   };
          // });
        });
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
                item.AnimalStatusID === 5 ||
                item.AnimalStatusID === 17
            );
            this.animalstatusDefault = [...this.animalstatus];

            this.callStatus1();
          } else if (this.animal_id == 2) {
            this.animalstatus = response.data.rows.filter(
              (item) =>
                item.AnimalStatusID === 6 ||
                item.AnimalStatusID === 7 ||
                item.AnimalStatusID === 8 ||
                item.AnimalStatusID === 9 ||
                item.AnimalStatusID === 10 ||
                item.AnimalStatusID === 18
            );
            this.animalstatusDefault = [...this.animalstatus];
            this.callStatus1();
          } else if (this.animal_id == 3) {
            this.animalstatus = response.data.rows.filter(
              (item) =>
                item.AnimalStatusID === 11 ||
                item.AnimalStatusID === 12 ||
                item.AnimalStatusID === 13 ||
                item.AnimalStatusID === 14 ||
                item.AnimalStatusID === 15 ||
                item.AnimalStatusID === 19
            );
            this.animalstatusDefault = [...this.animalstatus];
            this.callStatus1();
          }
        });
      axios
        .get(this.apiAnimalTypeID, { signal: this.controller.signal })
        .then((response) => {
          this.animaltype = response.data.rows.filter(
            (item) =>
              item.AnimalTypeID === 1 ||
              //   item.AnimalTypeID === 2 ||
              //   item.AnimalTypeID === 41 ||
              item.AnimalTypeID === 42
          );

          if (this.animal_id == 1) {
            this.animaltype = response.data.rows.filter(
              (item) =>
                item.AnimalTypeID === 1 ||
                // item.AnimalTypeID === 2 ||
                // item.AnimalTypeID === 41 ||
                item.AnimalTypeID === 42
            );
          } else if (this.animal_id == 2) {
            this.animaltype = response.data.rows.filter(
              (item) =>
                item.AnimalTypeID === 3 ||
                item.AnimalTypeID === 4 ||
                item.AnimalTypeID === 43 ||
                item.AnimalTypeID === 44
            );
          } else if (this.animal_id == 3) {
            this.animaltype = response.data.rows.filter(
              (item) =>
                item.AnimalTypeID === 17 ||
                item.AnimalTypeID === 18 ||
                item.AnimalTypeID === 45 ||
                item.AnimalTypeID === 46
            );
          }
        });
    },
    callGennumber() {
      if (this.filtered.AnimalBirthDate && this.filtered.AnimalTypeID) {
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
          this.filtered.AnimalTypeID;

        axios
          .get(this.urlNumber, { signal: this.controller.signal })
          .then((response) => {
            this.form.AnimalIdentificationID =
              response.data.AnimalNumberGenerate;

            // console.log(response.data);
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
    callStatus() {
      if (this.filtered.AnimalBirthDate && this.filtered.AnimalSexID) {
        let date = JSON.stringify(this.filtered.AnimalBirthDate);
        let AnimalBirthDate = date.slice(1, 11);

        const date1 = dayjs();
        const date2 = dayjs(AnimalBirthDate);
        // นับอายุสัตว์
        let total = date1.diff(date2, "month");
        // let totalday = date1.diff(date2, "day");
        // เงื่อนไขการกำหนดสถานะสัตว์
        // โคเนื้อ
        if (this.animal_id == 1) {
          if (total < 4) {
            // ลูกโค
            this.form.AnimalStatusID = 1;
          } else if (total >= 24 && this.form.AnimalSexID == 1) {
            // โคพ่อพันธุ์
            this.form.AnimalStatusID = 4;
          } else if (total >= 12 && this.form.AnimalSexID == 1) {
            // โคพ่อพันธุ์
            this.form.AnimalStatusID = 17;
          } else if (total >= 24 && this.form.AnimalSexID == 2) {
            // โคแม่พันธุ์
            this.form.AnimalStatusID = 5;
          } else if (total >= 12 && this.form.AnimalSexID == 2) {
            // โคสาว
            this.form.AnimalStatusID = 3;
          } else if (total > 4) {
            // โครุ่น
            this.form.AnimalStatusID = 2;
          }

          if (this.form.AnimalSexID == 1) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              console.log(x.AnimalStatusName);
              return (
                x.AnimalStatusName !== "โคสาว" &&
                x.AnimalStatusName !== "โคแม่พันธุ์"
              );
            });
          } else {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return (
                x.AnimalStatusName !== "โครุ่น" &&
                x.AnimalStatusName !== "โคพ่อพันธุ์" &&
                x.AnimalStatusName !== "โคหนุ่ม"
              );
            });
          }
        } else if (this.animal_id == 2) {
          if (total < 6) {
            // ลูกกระบือ
            this.form.AnimalStatusID = 6;
          } else if (total >= 36 && this.form.AnimalSexID == 1) {
            // กระบือพ่อพันธุ์
            this.form.AnimalStatusID = 9;
          } else if (total >= 13 && this.form.AnimalSexID == 1) {
            // กระบือหนุ่ม
            this.form.AnimalStatusID = 18;
          } else if (total >= 36 && this.form.AnimalSexID == 2) {
            // กระบือแม่พันธุ์
            this.form.AnimalStatusID = 10;
          } else if (total >= 13 && this.form.AnimalSexID == 2) {
            // กระบือโคสาว
            this.form.AnimalStatusID = 8;
          } else if (total >= 6) {
            // กระบือรุ่น
            this.form.AnimalStatusID = 7;
          }

          if (this.form.AnimalSexID == 1) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              console.log(x.AnimalStatusName);
              return (
                x.AnimalStatusName !== "กระบือสาว" &&
                x.AnimalStatusName !== "กระบือแม่พันธุ์"
              );
            });
          } else {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              console.log(x.AnimalStatusName);
              return (
                x.AnimalStatusName !== "กระบือรุ่น" &&
                x.AnimalStatusName !== "กระบือพ่อพันธุ์" &&
                x.AnimalStatusName !== "กระบือหนุ่ม"
              );
            });
          }
        } else if (this.animal_id == 3) {
          if (total < 4) {
            // ลูกแพะ
            this.form.AnimalStatusID = 11;
          } else if (total >= 12 && this.form.AnimalSexID == 1) {
            // แพะพ่อพันธุ์
            this.form.AnimalStatusID = 14;
          } else if (total >= 6 && this.form.AnimalSexID == 1) {
            // แพะหนุ่ม
            this.form.AnimalStatusID = 19;
          } else if (total >= 12 && this.form.AnimalSexID == 2) {
            // แพะแม่พันธุ์
            this.form.AnimalStatusID = 15;
          } else if (total >= 6 && this.form.AnimalSexID == 2) {
            // แพะโคสาว
            this.form.AnimalStatusID = 13;
          } else if (total >= 4) {
            // แพะรุ่น
            this.form.AnimalStatusID = 12;
          }

          if (this.form.AnimalSexID == 1) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              console.log(x.AnimalStatusName);
              return (
                x.AnimalStatusName !== "แพะสาว" &&
                x.AnimalStatusName !== "แพะแม่พันธุ์"
              );
            });
          } else {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              console.log(x.AnimalStatusName);
              return (
                x.AnimalStatusName !== "แพะรุ่น" &&
                x.AnimalStatusName !== "แพะพ่อพันธุ์" &&
                x.AnimalStatusName !== "แพะหนุ่ม"
              );
            });
          }
        }
      }
      // post
    },

    callStatus1() {
      let date = JSON.stringify(this.filtered.AnimalBirthDate);
      let AnimalBirthDate = date.slice(1, 11);
      const date1 = dayjs();
      const date2 = dayjs(AnimalBirthDate);
      let totalday = date1.diff(date2, "day");

      if (this.animal_id == 1) {
        if (this.form.AnimalSexID == 1) {
          if (totalday < 30 * 4) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "ลูกโค";
            });
          } else if (totalday < 30 * 12) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "โครุ่น";
            });
          } else if (totalday < 30 * 24) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "โคหนุ่ม";
            });
          } else {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return (
                x.AnimalStatusName === "โคพ่อพันธุ์"
                // x.AnimalStatusName !== "โคสาว" &&
                // x.AnimalStatusName !== "โคแม่พันธุ์" &&
                // x.AnimalStatusName !== "ลูกโค"
              );
            });
          }
        } else {
          if (totalday < 30 * 4) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "ลูกโค";
            });
          } else if (totalday < 30 * 12) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "โครุ่น";
            });
          } else {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return (
                x.AnimalStatusName !== "โครุ่น" &&
                x.AnimalStatusName !== "โคหนุ่ม" &&
                x.AnimalStatusName !== "โคพ่อพันธุ์" &&
                x.AnimalStatusName !== "ลูกโค"
              );
            });
          }
        }
      }
      if (this.animal_id == 2) {
        if (this.form.AnimalSexID == 1) {
          if (totalday < 30 * 6) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "ลูกกระบือ";
            });
          } else if (totalday < 30 * 13) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "กระบือรุ่น";
            });
          } else if (totalday < 30 * 36) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "กระบือหนุ่ม";
            });
          } else {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return (
                x.AnimalStatusName === "กระบือพ่อพันธุ์"
                // x.AnimalStatusName !== "กระบือสาว" &&
                // x.AnimalStatusName !== "กระบือแม่พันธุ์" &&
                // x.AnimalStatusName !== "ลูกกระบือ"
              );
            });
          }
        } else {
          console.log(totalday);
          if (totalday < 30 * 6) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "ลูกกระบือ";
            });
          } else if (totalday < 30 * 13) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "กระบือรุ่น";
            });
          } else {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return (
                x.AnimalStatusName !== "กระบือรุ่น" &&
                x.AnimalStatusName !== "กระบือพ่อพันธุ์" &&
                x.AnimalStatusName !== "ลูกกระบือ" &&
                x.AnimalStatusName !== "กระบือหนุ่ม"
              );
            });
          }
        }
      }
      if (this.animal_id == 3) {
        if (this.form.AnimalSexID == 1) {
          if (totalday < 30 * 4) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "ลูกแพะ";
            });
          } else if (totalday < 30 * 6) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "แพะรุ่น";
            });
          } else if (totalday < 30 * 12) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "แพะหนุ่ม";
            });
          } else {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return (
                x.AnimalStatusName === "แพะพ่อพันธุ์"
                // x.AnimalStatusName !== "แพะสาว" &&
                // x.AnimalStatusName !== "แพะแม่พันธุ์" &&
                // x.AnimalStatusName !== "ลูกแพะ"
              );
            });
          }
          //
        } else {
          if (totalday < 30 * 4) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "ลูกแพะ";
            });
          } else if (totalday < 30 * 6) {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return x.AnimalStatusName === "แพะรุ่น";
            });
          } else {
            this.animalstatus = this.animalstatusDefault.filter((x) => {
              return (
                x.AnimalStatusName !== "แพะรุ่น" &&
                x.AnimalStatusName !== "แพะพ่อพันธุ์" &&
                x.AnimalStatusName !== "ลูกแพะ" &&
                x.AnimalStatusName !== "แพะหนุ่ม"
              );
            });
          }
        }
      }
    },
    add() {
      // validation
      // if (this.validation() == false) {
      //   return;
      // }
      let total = 0.0;

      if (this.form.AnimalBreedPercent1) {
        total += parseFloat(this.form.AnimalBreedPercent1);
      }
      if (this.form.AnimalBreedPercent2) {
        total += parseFloat(this.form.AnimalBreedPercent2);
      }
      if (this.form.AnimalBreedPercent3) {
        total += parseFloat(this.form.AnimalBreedPercent3);
      }
      if (this.form.AnimalBreedPercent4) {
        total += parseFloat(this.form.AnimalBreedPercent4);
      }
      if (this.form.AnimalBreedPercent5) {
        total += parseFloat(this.form.AnimalBreedPercent5);
      }

      // console.log(
      //   this.form.AnimalBreedPercent2 + this.form.AnimalBreedPercent3
      // );
      // console.log(this.form.AnimalBreedPercent2);
      // console.log(total);

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
        console.log(total);
        this.valid = true;
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "สัดส่วนสายพันธุ์ไม่ถึง 100 %",
          life: 5000,
        });
        return false;
      }

      // check not match breed

      if (this.form.AnimalBreedPercent1 || this.form.AnimalBreedID1) {
        if (
          this.form.AnimalBreedPercent1 == null ||
          this.form.AnimalBreedID1 == null
        ) {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: "กรุณากรอกข้อมูลสายพันธุ์และสัดส่วนที่ 1 ให้ครบ",
            life: 5000,
          });
          return false;
        }
      }

      if (this.form.AnimalBreedPercent2 || this.form.AnimalBreedID2) {
        if (
          this.form.AnimalBreedPercent2 == null ||
          this.form.AnimalBreedID2 == null
        ) {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: "กรุณากรอกข้อมูลสายพันธุ์และสัดส่วนที่ 2 ให้ครบ",
            life: 5000,
          });
          return false;
        }
      }
      if (this.form.AnimalBreedPercent3 || this.form.AnimalBreedID3) {
        if (
          this.form.AnimalBreedPercent3 == null ||
          this.form.AnimalBreedID3 == null
        ) {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: "กรุณากรอกข้อมูลสายพันธุ์และสัดส่วนที่ 3 ให้ครบ",
            life: 5000,
          });
          return false;
        }
      }
      if (this.form.AnimalBreedPercent4 || this.form.AnimalBreedID4) {
        if (
          this.form.AnimalBreedPercent4 == null ||
          this.form.AnimalBreedID4 == null
        ) {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: "กรุณากรอกข้อมูลสายพันธุ์และสัดส่วนที่ 4 ให้ครบ",
            life: 5000,
          });
          return false;
        }
      }
      if (this.form.AnimalBreedPercent5 || this.form.AnimalBreedID5) {
        if (
          this.form.AnimalBreedPercent5 == null ||
          this.form.AnimalBreedID5 == null
        ) {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: "กรุณากรอกข้อมูลสายพันธุ์และสัดส่วนที่ 5 ให้ครบ",
            life: 5000,
          });
          return false;
        }
      }

      // change data
      this.form.isActive = this.form.isActive.value;
      this.form.AnimalAlive = this.form.AnimalAlive.value;

      if (this.form.AnimalFirstBreed) {
        this.form.AnimalFirstBreed = this.form.AnimalFirstBreed.id;
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
            this.$router.push("/activity/creature_info");
          } else {
            // this.$router.push("/agency/creature?AIZoneID"+aizoneID);
            this.$router.push(
              "/agency/creature?AIZoneID=" + this.form.AIZoneID
            );
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
        // console.log(555);
        // console.log(this.checkAnimal);

        // เคลียร์ค่าเวลาลบกล่อง
        if (this.checkAnimal == 3) {
          this.form.AnimalBreedID3 = null;

          this.form.AnimalBreedPercent3 = 0;
        } else if (this.checkAnimal == 4) {
          this.form.AnimalBreedID4 = null;
          this.form.AnimalBreedPercent4 = 0;
        } else if (this.checkAnimal == 5) {
          this.form.AnimalBreedID5 = null;
          this.form.AnimalBreedPercent5 = 0;
        }
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
