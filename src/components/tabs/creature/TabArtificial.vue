<template>
  <div class="grid flex align-items-center mt-3 mb-5">
    <div class="col-12 md:col-6">
      <h1 class="text-2xl mb-0 text-600">{{ name }}</h1>
    </div>
    <div class="col-12 md:col-6 md:text-right">
      <Button
        label="เพิ่มกิจกรรม"
        icon="pi pi-plus"
        class="w-full md:w-auto"
        @click="open"
        v-if="
          AnimalSecretStatus.includes(2) &&
          permit[0].IsAdd &&
          this.animalInfo.ProductionStatusID != 6
        "
      />
    </div>
  </div>
  <DataTable
    class="text-sm"
    :value="data"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    responsiveLayout="scroll"
    currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
  >
    <Column
      v-for="col of columns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      class="text-center"
      :sortable="true"
    />
    <Column header="จัดการ" class="text-center">
      <template #body="slotProps">
        <SplitButton
          v-if="slotProps.data.show_id == total || this.user.GroupID == 1"
          label="แก้ไข"
          icon="pi pi-pencil"
          @click="edit(slotProps.data.show_id - 1)"
          class="p-button-sm p-button-outlined p-button-warning"
          :model="getItems(slotProps.data.show_id - 1)"
        >
        </SplitButton>
      </template>
    </Column>
    <template #empty> ไม่พบข้อมูล </template>
    <template #loading>
      <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
    </template>
  </DataTable>
  <Dialog
    :draggable="false"
    :header="formheader + name"
    v-model:visible="display"
    :style="{ width: '50vw' }"
    :modal="true"
    v-on:after-hide="clear()"
  >
    <div class="grid">
      <div class="col-12">หมายเลขสัตว์ : {{ show.id }}</div>
      <div class="col-12">ชื่อ : {{ show.name }}</div>
      <div class="col-12">ฟาร์ม : {{ show.farm }}</div>
    </div>
    <form class="grid mt-2" v-if="animal_id == 3">
      <div class="col-12 lg:col-12">
        <div class="grid">
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              รหัสเจ้าหน้าที่ผสมเทียม<span class="text-red-500"> *</span></label
            >
            <Dropdown
              :show-clear="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกรหัสเจ้าหน้าที่ผสมเทียม"
              optionLabel="StaffFullName"
              optionValue="StaffID"
              v-model="data[index].ResponsibilityStaffID"
              :options="selection.Staff"
              :filterFields="['StaffNumber', 'StaffGivenName', 'StaffSurname']"
              :filter="true"
              filterPlaceholder="รหัสเจ้าหน้าที่ผสมเทียม"
              :class="{
                'p-invalid': !data[index].ResponsibilityStaffID && valid,
              }"
            >
            </Dropdown>
          </div>

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              โครงการ</label
            >
            <Dropdown
              :show-clear="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกโครงการ"
              optionLabel="ProjectName"
              optionValue="ProjectID"
              v-model="data[index].ProjectID"
              :options="selection.Project"
              :filter="true"
            />
          </div>

          <!-- <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่ผสมล่าสุด
            </label>
            <InputText
              text="number"
              v-model="data[index].EstimateBirthDate"
              class="w-full"
              placeholder="18 ม.ค 2565"
              readonly
            />
          <Calendar
              class="w-full"
              id="date"
              v-model="data[index].EstimateBirthDate"
              :manualInput="false"
              placeholder=""
              :showIcon="true"
              readonly
              :class="{
                'p-invalid': !data[index].EstimateBirthDate && valid,
              }"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันคลอดล่าสุด
            </label>
            <InputText
              text="number"
              v-model="data[index].EstimateBirthDate"
              class="w-full"
              placeholder="11 พ.ค 2565"
              readonly
            />
          <Calendar
              class="w-full"
              id="date"
              v-model="data[index].BirthDate"
              :manualInput="false"
              placeholder=""
              readonly
              :showIcon="true"
              :class="{
                'p-invalid': !data[index].BirthDate && valid,
              }"
            />
          </div> -->

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ท้องที่<span class="text-red-500"> *</span></label
            >
            <InputText
              text="number"
              v-model="data[index].PAR"
              class="w-full"
              readonly
            />
          </div>

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ผสมครั้งที่<span class="text-red-500"> *</span></label
            >
            <InputNumber
              :min="show.TimeNo"
              v-model="data[index].TimeNo"
              class="w-full"
              :class="{
                'p-invalid': !data[index].TimeNo && valid,
              }"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ประมาณการวันคลอด</label
            >
            <!-- <Calendar
              v-model="data[index].EstimateBirthDate"
              dateFormat="dd/mm/yy"
              class="w-full"
              :disabled="true"
            /> -->
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              คะแนนร่างกาย</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกคะแนนร่างกาย"
              optionLabel="BCSName"
              optionValue="BCSID"
              v-model="data[index].BCSID"
              :options="selection.BCS"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วิธีการผสม<span class="text-red-500"> *</span></label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกวิธีการผสม"
              optionLabel="name"
              optionValue="val"
              v-model="data[index].GoatAIMethodID"
              @change="fillname($event)"
              :options="selection.GoatAIMethodID"
              :class="{
                'p-invalid': !data[index].GoatAIMethodID && valid,
              }"
            />
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="checkMethod == 3 || checkMethod == 4"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              น้ำเชื้อ <span class="text-red-500"> *</span></label
            >
            <Dropdown
              :show-clear="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกน้ำเชื้อ"
              optionLabel="SemenNumber"
              optionValue="SemenID"
              v-model="data[index].SemenID"
              :options="selection.Semen"
              :filter="true"
            />
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="checkMethod == 3 || checkMethod == 4"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              จำนวนโด๊ส</label
            >
            <InputNumber
              v-model="data[index].Dose"
              mode="decimal"
              showButtons
              :min="1"
              :max="3"
              class="w-full"
            />
          </div>
          <div class="col-12 lg:col-6" v-if="checkMethod == 3">
            <label class="block text-600 text-sm font-bold mb-2">
              การเป็นสัด<span class="text-red-500"> *</span></label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกการเป็นสัด"
              optionLabel="GoatEstralActivityName"
              optionValue="GoatEstralActivityID"
              v-model="data[index].GoatEstralActivityID"
              :options="selection.Estral"
              :filter="true"
              :class="{
                'p-invalid': !data[index].GoatEstralActivityID && valid,
              }"
            />
          </div>

          <div
            class="col-12 lg:col-12"
            v-if="checkMethod == 1 || checkMethod == 2"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              พ่อพันธุ์<span class="text-red-500"> *</span></label
            >
            <Dropdown
              :show-clear="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกพ่อพันธุ์"
              optionLabel="Fullname"
              optionValue="AnimalID"
              v-model="data[index].BreederAnimalID"
              :options="selection.Animal"
              :filter="true"
              :class="{
                'p-invalid': !data[index].BreederAnimalID && valid,
              }"
            />
          </div>
          <div class="col-12 lg:col-6" v-if="checkMethod == 4">
            <label class="block text-600 text-sm font-bold mb-2">
              จำนวนครั้งที่ผสม (ครั้ง)<span class="text-red-500">
                *</span
              ></label
            >
            <InputText
              v-model="data[index].InseminationTime"
              class="w-full"
              :class="{
                'p-invalid': !data[index].InseminationTime && valid,
              }"
              readonly
            />
          </div>
          <div class="col-12 lg:col-6" v-if="checkMethod == 3">
            <label class="block text-600 text-sm font-bold mb-2">
              จำนวนครั้งที่ผสม (ครั้ง)<span class="text-red-500">
                *</span
              ></label
            >
            <InputText
              v-model="data[index].InseminationTime"
              class="w-full"
              :class="{
                'p-invalid': !data[index].InseminationTime && valid,
              }"
            />
          </div>

          <h5 class="col-12" v-if="this.data[this.index].InseminationTime > 0">
            ผสมครั้งที่ 1
          </h5>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 0"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่ผสมครั้งที่ 1</label
            >

            <!-- <Calendar
              :manualInput="false"
              :maxDate="new Date()"
              v-model="data[index].AIDate1"
              dateFormat="dd/mm/yy"
              class="w-full"
              :class="{
                'p-invalid': !data[index].AIDate1 && valid,
              }"
              @update:model-value="date()"
            /> -->

            <Datepicker
              v-model="data[index].AIDate1"
              :class="{ 'p-invalid': !data[index].AIDate1 && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              :maxDate="new Date()"
              :minDate="olddate"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              @update:model-value="date()"
              placeholder="วันที่ผสม"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 0"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              เวลาที่ผสมครั้งที่ 1</label
            >

            <Calendar
              v-model="data[index].AITime1"
              :showTime="true"
              :timeOnly="true"
              class="w-full"
              :class="{
                'p-invalid': !data[index].AITime1 && valid,
              }"
            />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 0"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ชุดน้ำเชื้อ</label
            >
            <InputText
              v-model="data[index].SemenLot1"
              class="w-full"
              :class="{
                'p-invalid': !data[index].SemenLot1 && valid,
              }"
            />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 0"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ปริมาณเมือก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปริมาณเมือก"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].MucilageQuantity1"
              :options="selection.MucilageQuantity"
              :class="{
                'p-invalid': !data[index].MucilageQuantity1 && valid,
              }"
            />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 0"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              สีของเมือก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปริมาณเมือก"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].MucilageQuality1"
              :options="selection.MucilageQuality"
              :class="{
                'p-invalid': !data[index].MucilageQuality1 && valid,
              }"
            />
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 0"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ปืนสอดลึก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปืนสอดลึก"
              optionLabel="GunDepthName"
              optionValue="GunDepthID"
              v-model="data[index].GunDepthID1"
              :options="selection.GunDepth"
              :class="{
                'p-invalid': !data[index].GunDepthID1 && valid,
              }"
            />
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 0"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              น้ำเชื้อเข้า</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกน้ำเชื้อเข้า"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].SemenEnter1"
              :options="selection.SemenEnter"
              :class="{
                'p-invalid': !data[index].SemenEnter1 && valid,
              }"
            />
          </div>
          <h5 class="col-12" v-if="this.data[this.index].InseminationTime > 1">
            ผสมครั้งที่ 2
          </h5>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 1"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่ผสมครั้งที่ 2</label
            >
            <Datepicker
              v-model="data[index].AIDate2"
              :class="{ 'p-invalid': !data[index].AIDate2 && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              :maxDate="new Date()"
              :minDate="olddate"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              @update:model-value="date()"
              placeholder="วันที่ผสม"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
            <!-- 
            <Calendar
              :manualInput="false"
              :maxDate="new Date()"
              v-model="data[index].AIDate2"
              dateFormat="dd/mm/yy"
              class="w-full"
            /> -->
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 1"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              เวลาที่ผสมครั้งที่ 2</label
            >

            <Calendar
              v-model="data[index].AITime2"
              :showTime="true"
              :timeOnly="true"
              class="w-full"
            />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 1"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ชุดน้ำเชื้อ</label
            >
            <InputText v-model="data[index].SemenLot2" class="w-full" />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 1"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ปริมาณเมือก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปริมาณเมือก"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].MucilageQuantity2"
              :options="selection.MucilageQuantity"
            />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 1"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              สีของเมือก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปริมาณเมือก"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].MucilageQuality2"
              :options="selection.MucilageQuality"
            />
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 1"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ปืนสอดลึก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปืนสอดลึก"
              optionLabel="GunDepthName"
              optionValue="GunDepthID"
              v-model="data[index].GunDepthID2"
              :options="selection.GunDepth"
            />
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 1"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              น้ำเชื้อเข้า</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกน้ำเชื้อเข้า"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].SemenEnter2"
              :options="selection.SemenEnter"
            />
          </div>
          <h5 class="col-12" v-if="this.data[this.index].InseminationTime > 2">
            ผสมครั้งที่ 3
          </h5>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 2"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่ผสมครั้งที่ 3</label
            >
            <Datepicker
              v-model="data[index].AIDate3"
              :class="{ 'p-invalid': !data[index].AIDate3 && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              :maxDate="new Date()"
              :minDate="olddate"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              @update:model-value="date()"
              placeholder="วันที่ผสม"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>

            <!-- <Calendar
              :manualInput="false"
              :maxDate="new Date()"
              v-model="data[index].AIDate3"
              dateFormat="dd/mm/yy"
              class="w-full"
            /> -->
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 2"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              เวลาที่ผสมครั้งที่ 3</label
            >

            <Calendar
              v-model="data[index].AITime3"
              :showTime="true"
              :timeOnly="true"
              class="w-full"
            />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 2"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ชุดน้ำเชื้อ</label
            >
            <InputText v-model="data[index].SemenLot3" class="w-full" />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 2"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ปริมาณเมือก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปริมาณเมือก"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].MucilageQuantity3"
              :options="selection.MucilageQuantity"
            />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 2"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              สีของเมือก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปริมาณเมือก"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].MucilageQuality3"
              :options="selection.MucilageQuality"
            />
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 2"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ปืนสอดลึก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปืนสอดลึก"
              optionLabel="GunDepthName"
              optionValue="GunDepthID"
              v-model="data[index].GunDepthID3"
              :options="selection.GunDepth"
            />
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 2"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              น้ำเชื้อเข้า</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกน้ำเชื้อเข้า"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].SemenEnter3"
              :options="selection.SemenEnter"
            />
          </div>
          <h5 class="col-12" v-if="this.data[this.index].InseminationTime > 3">
            ผสมครั้งที่ 4
          </h5>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 3"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่ผสมครั้งที่ 4</label
            >
            <Datepicker
              v-model="data[index].AIDate4"
              :class="{ 'p-invalid': !data[index].AIDate4 && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              :maxDate="new Date()"
              :minDate="olddate"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              @update:model-value="date()"
              placeholder="วันที่ผสม"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>

            <!-- <Calendar
              :manualInput="false"
              :maxDate="new Date()"
              v-model="data[index].AIDate4"
              dateFormat="dd/mm/yy"
              class="w-full"
            /> -->
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 3"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              เวลาที่ผสมครั้งที่ 4</label
            >

            <Calendar
              v-model="data[index].AITime4"
              :showTime="true"
              :timeOnly="true"
              class="w-full"
            />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 3"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ชุดน้ำเชื้อ</label
            >
            <InputText v-model="data[index].SemenLot4" class="w-full" />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 3"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ปริมาณเมือก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปริมาณเมือก"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].MucilageQuantity4"
              :options="selection.MucilageQuantity"
            />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 3"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              สีของเมือก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปริมาณเมือก"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].MucilageQuality4"
              :options="selection.MucilageQuality"
            />
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 3"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ปืนสอดลึก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปืนสอดลึก"
              optionLabel="GunDepthName"
              optionValue="GunDepthID"
              v-model="data[index].GunDepthID4"
              :options="selection.GunDepth"
            />
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 3"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              น้ำเชื้อเข้า</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกน้ำเชื้อเข้า"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].SemenEnter4"
              :options="selection.SemenEnter"
            />
          </div>
          <h5 class="col-12" v-if="this.data[this.index].InseminationTime > 4">
            ผสมครั้งที่ 5
          </h5>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 4"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่ผสมครั้งที่ 5</label
            >

            <Datepicker
              v-model="data[index].AIDate5"
              :class="{ 'p-invalid': !data[index].AIDate5 && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              :minDate="olddate"
              :maxDate="new Date()"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              @update:model-value="date()"
              placeholder="วันที่ผสม"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
            <!-- <Calendar
              :manualInput="false"
              :maxDate="new Date()"
              v-model="data[index].AIDate5"
              dateFormat="dd/mm/yy"
              class="w-full"
            /> -->
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 4"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              เวลาที่ผสมครั้งที่ 2</label
            >

            <Calendar
              v-model="data[index].AITime5"
              :showTime="true"
              :timeOnly="true"
              class="w-full"
            />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 4"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ชุดน้ำเชื้อ</label
            >
            <InputText v-model="data[index].SemenLot5" class="w-full" />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 4"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ปริมาณเมือก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปริมาณเมือก"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].MucilageQuantity5"
              :options="selection.MucilageQuantity"
            />
          </div>
          <div
            class="col-12 lg:col-4"
            v-if="this.data[this.index].InseminationTime > 4"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              สีของเมือก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปริมาณเมือก"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].MucilageQuality5"
              :options="selection.MucilageQuality"
            />
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 4"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ปืนสอดลึก</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกปืนสอดลึก"
              optionLabel="GunDepthName"
              optionValue="GunDepthID"
              v-model="data[index].GunDepthID5"
              :options="selection.GunDepth"
            />
          </div>
          <div
            class="col-12 lg:col-6"
            v-if="this.data[this.index].InseminationTime > 4"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              น้ำเชื้อเข้า</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกน้ำเชื้อเข้า"
              optionLabel="label"
              optionValue="val"
              v-model="data[index].SemenEnter5"
              :options="selection.SemenEnter"
            />
          </div>
        </div>
      </div>
      <div class="col-12 text-center mt-5 flex justify-content-between">
        <Button
          label="ยกเลิก"
          class="p-button-secondary w-full mr-3"
          @click="close()"
        />
        <Button
          label="บันทึกข้อมูล"
          class="ml-3 p-button-info w-full"
          @click="add()"
        />
      </div>
    </form>

    <form class="grid mt-2" v-else>
      <div class="col-12 lg:col-12">
        <div class="grid">
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              รหัสเจ้าหน้าที่ผสมเทียม<span class="text-red-500"> *</span></label
            >
            <Dropdown
              :show-clear="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกรหัสเจ้าหน้าที่ผสมเทียม"
              optionLabel="StaffFullName"
              optionValue="StaffID"
              v-model="data[index].ResponsibilityStaffID"
              :options="selection.Staff"
              :filterFields="['StaffNumber', 'StaffGivenName', 'StaffSurname']"
              :filter="true"
              filterPlaceholder="รหัสเจ้าหน้าที่ผสมเทียม"
              :class="{
                'p-invalid': !data[index].ResponsibilityStaffID && valid,
              }"
            >
            </Dropdown>
          </div>

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              น้ำเชื้อ <span class="text-red-500"> *</span></label
            >
            <Dropdown
              :show-clear="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกน้ำเชื้อ"
              optionLabel="SemenNumber"
              optionValue="SemenID"
              v-model="data[index].SemenID"
              :options="selection.Semen"
              :filter="true"
              :class="{
                'p-invalid': !data[index].SemenID && valid,
              }"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              จำนวนโด๊ส</label
            >
            <!-- <InputNumber
              v-model="data[index].Dose"
              class="w-full"
              :class="{
                'p-invalid': !data[index].Dose && valid,
              }"
            /> -->

            <InputNumber
              v-model="data[index].Dose"
              mode="decimal"
              showButtonsdate
              :min="1"
              :max="2"
              class="w-full"
            />
          </div>

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่ผสม<span class="text-red-500"> *</span></label
            >

            <!-- <Calendar
              :showIcon="true"
              :manualInput="false"
              :maxDate="new Date()"
              v-model="data[index].AIDate"
              dateFormat="dd/mm/yy"
              class="w-full"
              @update:model-value="date()"
              :class="{
                'p-invalid': !data[index].AIDate && valid,
              }"
            /> -->

            <Datepicker
              v-model="data[index].AIDate"
              :class="{ 'p-invalid': !data[index].AIDate && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              :minDate="olddate"
              :maxDate="new Date()"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              @update:model-value="date()"
              placeholder="วันที่ผสม"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ประมาณการวันคลอด</label
            >
            <!-- <Calendar
              v-model="data[index].EstimateBirthDate"
              dateFormat="dd/mm/yy"
              class="w-full"
              :disabled="true"
            /> -->

            <Datepicker
              v-model="data[index].EstimateBirthDate"
              :class="{ 'p-invalid': !data[index].EstimateBirthDate && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              :maxDate="new Date()"
              :minDate="olddate"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              @update:model-value="date()"
              placeholder="ประมาณการ"
              readonly
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ท้องที่<span class="text-red-500"> *</span></label
            >
            <InputNumber
              :disabled="true"
              v-model="data[index].PAR"
              class="w-full"
              :class="{
                'p-invalid': !data[index].PAR && valid,
              }"
            />
          </div>

          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ผสมครั้งที่<span class="text-red-500"> *</span></label
            >
            <InputNumber
              :min="show.TimeNo"
              v-model="data[index].TimeNo"
              class="w-full"
              :class="{
                'p-invalid': !data[index].TimeNo && valid,
              }"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              โครงการ</label
            >
            <Dropdown
              :show-clear="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกโครงการ"
              optionLabel="ProjectName"
              optionValue="ProjectID"
              v-model="data[index].ProjectID"
              :options="selection.Project"
              :filter="true"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              คะแนนร่างกาย</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกคะแนนร่างกาย"
              optionLabel="BCSName"
              optionValue="BCSID"
              v-model="data[index].BCSID"
              :options="selection.BCS"
            />
          </div>
        </div>
      </div>
      <div class="col-12 text-center mt-5 flex justify-content-between">
        <Button
          label="ยกเลิก"
          class="p-button-secondary w-full mr-3"
          @click="close()"
        />
        <Button
          label="บันทึกข้อมูล"
          class="ml-3 p-button-info w-full"
          @click="confirm_ma()"
        />
      </div>
    </form>
  </Dialog>
  <Dialog
    header="ตรวจสอบข้อมูล"
    v-model:visible="display_delete"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="confirmation-content text-center">
      <i class="pi pi-trash" style="font-size: 5rem" />
      <br />
      <span class="text-xl"
        >คุณต้องการลบ{{ name }}ลำดับที่
        {{ data[index].show_id }} ใช่หรือไม่</span
      >
    </div>
    <template #footer>
      <div class="col-12 text-center flex justify-content-between">
        <Button
          label="ยกเลิก"
          @click="close_delete()"
          class="p-button-secondary w-full mr-3"
        />
        <Button
          label="ยืนยัน"
          @click="remove()"
          class="p-button-danger w-full ml-3"
        />
      </div>
    </template>
  </Dialog>
  <Dialog
    header="ตรวจสอบข้อมูลอีกครั้ง"
    v-model:visible="display_confirm_ma"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '60vw' }"
    :modal="true"
  >
    <div class="mt-2 grid align-items-center">
      <h1 class="mb-2 lg:mb-0 mr-2 text-md p-2">
        วันที่ผสมเทียมครั้งล่าสุดน้อยกว่า 30 วัน คุณต้องการผสมเทียมหรือไม่?
      </h1>
    </div>
    <div class="mt-2 grid align-items-center">
      <!-- <h2 class="mb-2 lg:mb-0 mr-2 text-md p-2">
        <span class="text-red-600"> dddd </span>
      </h2> -->
    </div>
    <div class="col-12 text-center mt-5 flex justify-content-between">
      <Button
        label="ยกเลิก"
        class="p-button-secondary w-full mr-3"
        @click="closeAlertMA()"
      />
      <!-- <Button
          label="บันทึกข้อมูล"
          class="ml-3 p-button-info w-full"
          @click="add()"
        /> -->
      <Button
        label="บันทึกข้อมูล"
        class="ml-3 p-button-info w-full"
        @click="add()"
      />
    </div>
  </Dialog>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import dayjs from "dayjs";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import Swal from "sweetalert2";
import { setupCache } from "axios-cache-adapter";

export default {
  emits: ["refresh_secret_status", "onclear_display"],
  props: {
    permit: {
      type: Array,
      required: true,
    },
    animalInfo: {
      required: true,
    },
    display_prop: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      // API
      url: "/ai",
      // ID
      id: "AIID",
      // Name
      name: "ผสมเทียม",
      cache: null,
      api: null,
      display_birth: false,
      display_abort: false,

      //load_selection
      LoadSelection: {
        Staff: "/staff",
        Project: "/project",
        // Animal: "/animal",
        Semen: "/semen",
        BCS: "/bcs",
        Estral: "/goat-estral-activity",
        GunDepth: "/gun-depth",
      },
      total: null,
      // Selection
      show: {},
      selection: {
        Animal: null,
        Staff: null,
        Project: null,
        Semen: null,
        BCS: null,
        Estral: null,
        MucilageQuantity: [
          {
            val: 1,
            label: "มาก",
          },
          {
            val: 2,
            label: "น้อย",
          },
        ],
        MucilageQuality: [
          {
            val: 1,
            label: "ขุ่น",
          },
          {
            val: 2,
            label: "ใส",
          },
        ],
        SemenEnter: [
          {
            val: 1,
            label: "100%",
          },
          {
            val: 2,
            label: "ย้อนกลับ",
          },
        ],
        GoatAIMethodID: [
          // {
          //   val: "NI",
          // },
          {
            val: "Buck",
            name: "ผสมพันธุ์โดยใช้พ่อพันธุ์ (Buck)",
          },
          {
            val: "VAI",
            name: "ผสมเทียมโดยการเหนี่ยวนำ (V-AI)",
          },
          {
            val: "LAI",
            name: "ผสมเทียมโดยผ่าตัดผ่านช่องท้อง (L-AI)",
          },
        ],
        GunDepth: null,
      },

      // Table Field
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
        {
          field: "PAR",
          header: "ท้องที่",
        },
        {
          field: "TimeNo",
          header: "ครั้งที่ผสม",
        },
        {
          field: "ThaiAIDate",
          header: "วันที่ผสม",
        },
        {
          field: "SemenNumber",
          header: "น้ำเชื้อ",
        },
        {
          field: "Dose",
          header: "จำนวนโด๊ส",
        },
        {
          field: "BCSName",
          header: "คะแนนร่างกาย",
        },

        {
          field: "AIStatusName",
          header: "ผล",
        },
        {
          field: "ResponsibilityStaffName",
          header: "เจ้าหน้าที่",
        },
      ],
      data_animal: [],
      // Search
      isSelection: false,

      checkMethod: 0,
      // Static Data
      isLoading: false,
      data: [],
      valid: false,
      index: null,
      display: false,
      display_delete: false,
      display_confirm_ma: false,
      temp: null,
      olddate: null,
      olddate1: null,
      formheader: "",
      date_last_event: null,
      // uneditable
      items: [
        {
          label: "แก้ไข",
          icon: "pi pi-pencil",
        },
        {
          label: "ลบ",
          icon: "pi pi-times",
        },
      ],
      controller: new AbortController(),
    };
  },
  async mounted() {
    // console.log(this.user.Staff.StaffOrganizationID);
    // =============================================== //
    // สร้าง cache instance
    this.cache = setupCache({
      maxAge: 15 * 60 * 1000, // แต่งเวลาให้ข้อมูลอยู่ใน cache 15 นาที
    });
    axios.create({
      adapter: this.cache.adapter,
    });

    // =============================================== //

    // if (this.animal_id == 3) {
    //   this.LoadSelection.Animal =
    //     "/animal?AnimalTypeID=[17,18]&isActive=1&AnimalSexID=1";
    // }

    await this.load();
    await this.load_selection();
    if (
      this.display_prop &&
      this.AnimalSecretStatus.includes(2) &&
      this.permit[0].IsAdd
    ) {
      this.open();
    }
  },
  watch: {
    AnimalID(val) {
      if (val) {
        this.load();
      } else {
        this.data = [];
      }
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
      AnimalID: "AnimalID",
      animal_id: "animal_id",
      AnimalSecretStatus: "AnimalSecretStatus",
    }),
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
    // ประมาณการวันคลอด
    date() {
      var x = null;
      if (this.animal_id == 1) {
        x = 280;
      } else if (this.animal_id == 2) {
        x = 310;
      } else if (this.animal_id == 3) {
        x = 150;
        this.data[this.index].AIDate = this.data[this.index].AIDate1;
      }
      this.data[this.index].EstimateBirthDate = new Date(
        dayjs(this.data[this.index].AIDate).add(x, "day")
      );
    },
    fillname($event) {
      this.checkMethod = $event.value;

      if ($event.value == "NI") {
        this.data[this.index].InseminationTime = 0;
        this.checkMethod = 1;
      } else if ($event.value == "Buck") {
        this.data[this.index].InseminationTime = 0;
        this.checkMethod = 2;
      } else if ($event.value == "VAI") {
        this.checkMethod = 3;
        this.data[this.index].InseminationTime = 2;
      } else if ($event.value == "LAI") {
        this.checkMethod = 4;
        this.data[this.index].InseminationTime = 1;
      }
    },
    doseAuto() {
      this.data[this.index].Dose = 1;
    },
    getItems(id) {
      const items = [
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
    // ตรวจสอบ AnimalBirthDate ภายใน 365 วัน
    async checkBirthDate() {
      var month = 0;
      var month_text = "";
      if (this.animal_id == 1) {
        month = 12;
        month_text = "12";
      } else if (this.animal_id == 2) {
        month = 13;
        month_text = "13";
      } else if (this.animal_id == 3) {
        month = 6;
        month_text = "6";
      }
      await axios
        .get("/animal?AnimalID=" + this.AnimalID, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data_animal = res.data;
        });
      if (
        dayjs().diff(this.data_animal.rows[0].AnimalBirthDate, "month") < month
      ) {
        await Swal.fire({
          title: `อายุน้อยกว่า ${month_text} เดือน ต้องการบันทึกผสมเทียมหรือไม่`,
          showDenyButton: true,
          confirmButtonText: "ต้องการ",
          denyButtonText: "ยกเลิก",
          allowOutsideClick: false,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.display_birth = true;
          } else if (result.isDenied) {
            this.clear();
          }
        });
      } else {
        this.display_birth = true;
      }
    },
    async checkabort() {
      var abort = [];
      var birth = [];
      await axios
        .get(`/abort-checkup?AnimalID=${this.AnimalID}`)
        .then((res) => {
          abort = res.data;
        });
      await axios.get(`/give-birth?AnimalID=${this.AnimalID}`).then((res) => {
        birth = res.data;
      });

      if (abort.rows.length > 0 || birth.rows.length > 0) {
        console.log(abort.rows[0])
        var $d1 = dayjs().diff(abort.rows[0]?.AbortDate, "day");
        var $d2 = dayjs().diff(birth.rows[0]?.GiveBirthDate, "day");

        if ($d1 > $d2) {
          this.olddate1 = abort.rows[0]?.AbortDate;
        } else {
          this.olddate1 = birth.rows[0]?.GiveBirthDate;
        }

        if ($d1 == 0) {
          $d1 = 100;
        }
        if ($d2 == 0) {
          $d2 = 100;
        }
        if ($d1 <= 30 || $d2 <= 30) {
          await Swal.fire({
            title:
              "จำนวนวันคลอด/แท้ง ถึงวันที่ผสมเทียม น้อยกว่า 30 วัน ต้องการบันทึกผสมเทียมหรือไม่",
            showDenyButton: true,
            confirmButtonText: "ต้องการ",
            denyButtonText: "ยกเลิก",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              // this.date_last_event diff abort and birth last AbortDate and GiveBirthDate
              if (abort.rows.length > 0 && birth.rows.length > 0) {
                if (abort.rows[0].AbortDate > birth.rows[0].GiveBirthDate) {
                  this.date_last_event = abort.rows[0].AbortDate;
                } else {
                  this.date_last_event = birth.rows[0].GiveBirthDate;
                }
              } else if (abort.rows.length > 0) {
                this.date_last_event = abort.rows[0].AbortDate;
              } else if (birth.rows.length > 0) {
                this.date_last_event = birth.rows[0].GiveBirthDate;
              }
              this.display_abort = true;
            } else if (result.isDenied) {
              return this.clear();
            }
          });
        } else {
          this.display_abort = true;
        }
      } else {
        this.display_abort = true;
      }
    },

    // on modal hide
    clear() {
      if (
        this.index == this.data.length - 1 &&
        !this.data[this.index].CreatedUserID
      ) {
        this.data.splice(this.index, 1);
      } else {
        this.data[this.index] = this.temp;
        this.temp = null;
      }
      this.formheader = "";
      this.index = null;
      this.valid = false;
      this.$emit("onclear_display");
    },
    // validate
    validation() {
      if (this.animal_id == 3) {
        if (
          !this.data[this.index].ResponsibilityStaffID ||
          !this.data[this.index].TimeNo ||
          !this.data[this.index].GoatAIMethodID
        ) {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: "กรุณากรอกข้อมูล",
            life: 5000,
          });
          this.valid = true;
          return false;
        }
      } else if (this.animal_id == 1 || this.animal_id == 2) {
        if (
          !this.data[this.index].ResponsibilityStaffID ||
          !this.data[this.index].AIDate ||
          // !this.data[this.index].PAR ||
          !this.data[this.index].SemenID ||
          !this.data[this.index].TimeNo ||
          !this.data[this.index].EstimateBirthDate
        ) {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: "กรุณากรอกข้อมูล",
            life: 5000,
          });
          this.valid = true;
          return false;
        }
      }

      return true;
    },
    //load selection
    load_selection() {
      return new Promise((resolve) => {
        var index = 0;

        if (this.isSelection == false) {
          this.isSelection = true;

          // ตั้งค่า ดึงข้อมูลแพะพ่อพัน
          if (this.animal_id == 3) {
            this.LoadSelection.Animal =
              "/animal?AnimalTypeID=[17,18]&isActive=1&AnimalSexID=1";
          }
          for (let i in this.LoadSelection) {
            if (this.LoadSelection[i] == "/project") {
              this.LoadSelection[i] =
                this.LoadSelection[i] +
                "?ProjectLevel=AI&includeAll=false&isActive=1";
            }

            if (this.LoadSelection[i] == "/staff") {
              this.LoadSelection[i] =
                this.LoadSelection[i] +
                "?StaffOrganizationID=" +
                this.user.Staff.StaffOrganizationID +
                "&includeAll=false&isActive=1";
            }
            // console.log(555);
            if (this.LoadSelection[i] == "/semen") {
              if (this.animal_id == 1) {
                this.LoadSelection.Semen +=
                  "?AnimalTypeID=[1,2,41,42]&includeAll=false&isActive=1";
              } else if (this.animal_id == 2) {
                this.LoadSelection.Semen +=
                  "?AnimalTypeID=[3,4,43,44]&includeAll=false&isActive=1";
              } else if (this.animal_id == 3) {
                this.LoadSelection.Semen +=
                  "?AnimalTypeID=[17,18,45,46]&includeAll=false&isActive=1";
              }
            }

            axios
              .get(this.LoadSelection[i], {
                signal: this.controller.signal,
              })
              .then((response) => {
                if (
                  this.LoadSelection[i] ==
                  "/animal?AnimalTypeID=[17,18]&isActive=1&AnimalSexID=1"
                ) {
                  // console.log(111);
                  this.selection[i] = response.data.rows;
                  // console.log(this.selection[i]);

                  this.selection[i] = this.selection[i].map((item) => {
                    return {
                      AnimalID: item.AnimalID,
                      AnimalIdentificationID: item.AnimalIdentificationID,
                      Fullname:
                        item.AnimalIdentificationID + ", " + item.AnimalName,
                    };
                  });
                  // console.log(this.selection[i]);
                } else if (
                  this.LoadSelection[i] == "/project?ProjectLevel=AI"
                ) {
                  this.selection[i] = response.data.rows;
                } else {
                  this.selection[i] = response.data.rows;
                }
                index++;
              })
              .catch(() => {
                //refresh pages
                Swal.fire({
                  icon: "warning",
                  title: "กำลังโหลดข้อมูล",
                  text: "กรุณารอซักครู่",
                });

                // setTimeout(() => {
                //   this.$router.go(0);
                // }, 2000);
              })
              .finally(() => {
                if (Object.keys(this.LoadSelection).length == index) {
                  resolve();
                }
              });
            //if loop last
          }
        }
      });
    },
    // main load
    load() {
      return new Promise((resolve) => {
        this.isLoading = true;
        axios
          .get(`${this.url}?AnimalID=${this.AnimalID}`, {
            signal: this.controller.signal,
          })
          .then((response) => {
            this.data = response.data.rows.filter(
              (item) => item.AnimalID === this.AnimalID
            );
            this.total = this.data.length;
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
        axios
          .get(`animal?AnimalID=${this.AnimalID}`, {
            signal: this.controller.signal,
          })
          .then((response) => {
            this.show.id = response.data.rows[0].AnimalEarID;
            this.show.name = response.data.rows[0].AnimalName;
            this.show.farm = `${response.data.rows[0].AnimalFarm.FarmIdentificationNumber}, ${response.data.rows[0].AnimalFarm.FarmName} `;
            this.show.AnimalBirthDate = response.data.rows[0].AnimalBirthDate;
          });
        resolve();
      });
    },
    // create or update data

    confirm_ma() {
      if (this.validation() == false) {
        return;
      }

      if (this.data[this.index - 1]) {
        let dateDiffMA = dayjs(this.data[this.index].AIDate).diff(
          this.data[this.index - 1].AIDate,
          "day"
        );

        if (dateDiffMA < 30) {
          this.display_confirm_ma = true;

          //
        } else {
          this.add();
        }
      } else {
        this.add();
      }
    },

    add() {
      this.display_confirm_ma = false;

      if (this.animal_id == 3) {
        this.data[this.index].AIDate = this.data[this.index].AIDate1;
        for (let i = 1; i < 5; i++) {
          if (this.data[this.index][`AITime${i}`]) {
            let x = new Date(this.data[this.index][`AITime${i}`]);
            x = dayjs(x).format("HH:mm:ss");
            this.data[this.index][`AITime${i}`] = x;
          }
        }
      }
      if (
        this.index == this.data.length - 1 &&
        !this.data[this.index].CreatedUserID
      ) {
        //create data

        axios
          .post(this.url, this.data[this.index])
          .then(() => {
            this.checkMethod = 0;
            setTimeout(() => {
              this.load();
            }, 1500);
            this.close();
            this.$toast.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "เพิ่มข้อมูลเสร็จสิ้น",
              life: 5000,
            });
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
      // update data
      else if (this.index < this.data.length) {
        if (this.validation() == false) {
          return;
        }
        delete this.data[this.index].Animal;
        delete this.data[this.index].Staff;
        delete this.data[this.index].Project;
        delete this.data[this.index].GoatEstralActivity;
        delete this.data[this.index].BreederAnimal;
        delete this.data[this.index].BCS;
        delete this.data[this.index].show_id;
        axios
          .put(
            this.url + "/" + this.data[this.index][this.id],
            this.data[this.index]
          )
          .then(() => {
            this.close();
            setTimeout(() => {
              this.load();
            }, 1500);
            this.$toast.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "แก้ไขข้อมูลเสร็จสิ้น",
              life: 5000,
            });
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
      this.$emit("refresh_secret_status");
    },
    // remove data
    remove() {
      axios.delete(this.url + "/" + this.data[this.index][this.id]).then(() => {
        this.close_delete();
        this.load();
        this.$toast.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "ลบข้อมูลเสร็จสิ้น",
          life: 5000,
        });
      });
      this.$emit("refresh_secret_status");
    },
    // form open add
    async open() {
      this.display_abort = false;
      this.display_birth = false;
      this.index = this.data.length;

      this.formheader = "เพิ่ม";
      this.data.push({
        AnimalID: this.AnimalID,
      });
      var animal = null;

      this.data[this.index].ResponsibilityStaffID = this.user.StaffID;
      var date = null;
      await axios
        .get(`animal/get-by-farm-id?AnimalID=${this.AnimalID}`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          // console.log(response.data.rows[0].PAR);

          if (response.data.rows[0].PAR != null) {
            this.data[this.index].PAR = response.data.rows[0].PAR;

            // console.log(1);
          } else if (animal != null) {
            this.data[this.index].PAR = animal.PAR;
            // console.log(2);
          } else {
            this.data[this.index].PAR = 1;
            // console.log(3);
          }
          if (response.data.rows[0].TimeNo) {
            this.data[this.index].TimeNo = response.data.rows[0].TimeNo + 1;
          } else {
            this.data[this.index].TimeNo = 1;
          }
          this.show.TimeNo = response.data.rows[0].TimeNo + 1;
          date = response.data.rows[0].AIDate;
        });
      this.data[this.index].AIDate = this.olddate;

      this.doseAuto();

      await this.checkabort();
      if (this.display_abort == true) {
        await this.checkBirthDate();

        if (this.display_birth == true) {
          if (this.date_last_event > date) {
            this.olddate = this.date_last_event;
            // if (this.index == 0) {
            //     this.olddate = this.date_last_event;
            // }
          } else {
            if (date == null) {
              this.olddate = this.show.AnimalBirthDate;
            } else {
              this.olddate = date;
            }
          }

          let test = dayjs(this.olddate).isBefore(dayjs(this.olddate1));
          if (test == true) {
            this.olddate = this.olddate1;
          }

          this.display = true;
        }
      }
    },
    //form open edit
    edit(id) {
      if (this.permit[0].IsUpdate == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์แก้ไข",
          life: 5000,
        });
        return;
      }
      this.index = id;
      this.formheader = "แก้ไข";

      this.temp = JSON.parse(JSON.stringify(this.data[this.index]));
      this.display = true;
    },
    close() {
      this.display = false;
    },
    closeAlertMA() {
      this.display_confirm_ma = false;
      return;
    },
    open_delete(id) {
      if (this.permit[0].IsDelete == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์ลบ",
          life: 5000,
        });
        return;
      }

      this.index = id;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>
