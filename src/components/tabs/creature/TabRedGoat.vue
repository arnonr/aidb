<template>
  <div class="grid flex align-items-center mt-3 mb-5">
    <div class="col-12 md:col-6">
      <h1 class="text-2xl mb-0 text-600">โครงการพัฒนาแพะพันธุ์แดงสุราษฎร์</h1>
    </div>
    <div class="col-12 md:col-6 md:text-right">
      <Button
        label="เพิ่มข้อมูล"
        icon="pi pi-plus"
        class="mb-3 p-button-raised p-button-raised p-button-info"
        @click="open_add"
        v-if="permit[0].IsAdd"
      />
    </div>
  </div>
  <DataTable
    class="text-sm"
    :value="data"
    :paginator="true"
    :rows="10"
    :loading="isLoading"
    v-model:filters="search"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 50]"
    responsiveLayout="scroll"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
  >
    <Column
      field="show_id"
      :sortable="true"
      header="ลำดับ"
      class="text-center"
    ></Column>
    <!-- <Column
              field="RedGoatID"
              header="รหัสอ้างอิง"
              class="text-center"
              :sortable="true"
            ></Column> -->
    <!-- <Column
      field="Fullname"
      header="ข้อมูลสัตว์"
      class="text-center"
      :sortable="true"
    ></Column> -->
    <Column
      field="RedGoatRound_Temp"
      header="รอบการบันทึก"
      class="text-center"
      :sortable="true"
    ></Column>
    <Column
      field="ThaiRedGoatDate"
      header="วันที่บันทึก"
      class="text-center"
      :sortable="true"
    ></Column>
    <Column
      field="ShoulderHeight"
      header="ความสูงหัวไหล่ (ซม.)"
      class="text-center"
      :sortable="true"
    ></Column>
    <Column
      field="ShoulderWidth"
      header="ความกว้างหัวไหล่ (ซม.)"
      class="text-center"
      :sortable="true"
    ></Column>
    <Column
      field="BodyLength"
      header="ความยาวลำตัว (ซม.)"
      class="text-center"
      :sortable="true"
    ></Column>
    <Column
      field="WaistScore"
      header="ความแข็งแรงของหลัง (ส่วนเอว) คะแนน"
      class="text-center"
      :sortable="true"
    ></Column>
    <Column
      field="PelvisWidth"
      header="ความกว้างเชิงกราน (ซม.)"
      class="text-center"
      :sortable="true"
    ></Column>
    <Column
      field="HipCurve"
      header="มุมสะโพกมุมเฉียง (ซม.)"
      class="text-center"
      :sortable="true"
    ></Column>
    <Column
      field="HipLength"
      header="ความยาวสะโพก (ซม.)"
      class="text-center"
      :sortable="true"
    ></Column>
    <!-- <Column
      field="TestisLength"
      header="เส้นรอบวงอัณฑะ (ซม.) เฉพาะเพศผู้"
      class="text-center"
      :sortable="true"
    ></Column> -->
    <!-- <Column
              field="LegHindScore"
              header="ลักษณะขาหลังด้านหลัง(คะแนน)"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="LegSideScore"
              header="ลักษณะขาหลังด้านข้าง(คะแนน)"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="WalkingScore"
              header="ลักษณะการเดิน(คะแนน)"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="ChestWidth"
              header="ความกว้างช่องอก(ซม.)"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="BodyDeep"
              header="ความลึกลำตัว(ซม.)"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="RibWidth"
              header="ความกางของกระดูกซี่โครง(คะแนน)"
              class="text-center"
              :sortable="true"
            ></Column> -->
    <!-- <Column
              field="BreastFrontScore"
              header="การยึดเกาะของเต้านมด้านหน้า(คะแนน) เฉพาะเพศเมีย"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="BreastHeight"
              header="ความสูงของเนื้อเยื่อเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="BreastWidth"
              header="ความกว้างของเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="BreastLigament"
              header="ความแข็งแรงของเอ็นยึดเต้านม(ซม.) เฉพาะเพศเมีย"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="BreastDeep"
              header="ความลึกของเต้านม(ซม.) เฉพาะเพศเมีย"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="BreastHindScore"
              header="ตำแหน่งของหัวนมด้านหลัง(คะแนน) เฉพาะเพศเมีย"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="BreastSideScore"
              header="ตำแหน่งของหัวนมด้านข้าง(คะแนน) เฉพาะเพศเมีย"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="BreastLength"
              header="ลักษณะของหัวนม(คะแนน) เฉพาะเพศเมีย"
              class="text-center"
              :sortable="true"
            ></Column> -->
    <!-- <Column
              field="TitsScore"
              header="ความแข็งแรงของหลัง(ส่วนเอว)(คะแนน)"
              class="text-center"
              :sortable="true"
            ></Column> -->
    <Column
      field="Staff.StaffGivenName"
      header="รหัสเจ้าหน้าที่ผู้ตรวจ"
      class="text-center"
      :sortable="true"
    ></Column>

    <Column header="จัดการ" class="text-center">
      <template #body="slotProps">
        <SplitButton
          label="แก้ไข"
          icon="pi pi-pencil"
          @click="open_edit(slotProps.data.RedGoatID)"
          class="p-button-sm p-button-outlined p-button-warning"
          :model="getItems(slotProps.data.RedGoatID)"
        >
        </SplitButton>
      </template>
    </Column>
  </DataTable>
  <!-- Add Dialog -->
  <Dialog
    header="เพิ่มกิจกรรมโครงการพัฒนาแพะพันธุ์แดงสุราษฎร์"
    v-model:visible="display_add"
    :style="{ width: '50vw' }"
    :modal="true"
    v-on:after-hide="clear_form()"
  >
    <form class="grid mt-2">
      <div class="col-12 lg:col-12">
        <div class="formgrid grid">
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              รอบการบันทึก<span class="text-red-500"> *</span></label
            >

            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              id="selectedScheme"
              placeholder="รอบการบันทึก"
              :options="project_level"
              optionLabel="name"
              :class="{ 'p-invalid': !form.RedGoatRound && valid }"
              v-model="form.RedGoatRound"
              :disabled="checkSex == '1'"
            />
          </div>

          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่บันทึก<span class="text-red-500">*</span></label
            >
            <!-- <Calendar
              class="w-full"
              placeholder="วันที่บันทึก"
              :maxDate="new Date()"
              :showButtonBar="true"
              :showIcon="true"
              v-model="form.RedGoatDate"
              :class="{ 'p-invalid': !form.RedGoatDate && valid }"
            /> -->

            <Datepicker
              v-model="form.RedGoatDate"
              :class="{ 'p-invalid': !form.RedGoatDate && valid }"
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
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              เจ้าหน้าที่ผู้รับผิดชอบ<span class="text-red-500">*</span></label
            >
            <Dropdown
              class="w-full"
              id="selectedstatus"
              :options="personal"
              optionLabel="Fullname"
              optionValue="StaffID"
              placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
              :filter="true"
              v-model="form.ResponsibilityStaffID"
              :class="{ 'p-invalid': !form.ResponsibilityStaffID && valid }"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความสูงหัวไหล่ (ซม.)</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.ShoulderHeight"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความกว้างหัวไหล่ (ซม.)</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.ShoulderWidth"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความยาวลำตัว (ซม.)</label
            >
            <InputText type="number" class="w-full" v-model="form.BodyLength" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความแข็งแรงของหลัง (ส่วนเอว) (คะแนน)</label
            >
            <InputText type="number" class="w-full" v-model="form.WaistScore" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความกว้างเชิงกราน (ซม.)</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.PelvisWidth"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              มุมสะโพกมุมเฉียง (ซม.)</label
            >
            <InputText type="number" class="w-full" v-model="form.HipCurve" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความยาวสะโพก (ซม.)</label
            >
            <InputText type="number" class="w-full" v-model="form.HipLength" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '1'">
            <label class="block text-600 text-sm font-bold mb-2">
              เส้นรอบวงอัณฑะ (ซม.) เฉพาะเพศผู้</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.TestisLength"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ลักษณะขาหลังด้านหลัง (คะแนน)</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.LegHindScore"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ลักษณะขาหลังด้านข้าง (คะแนน)</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.LegSideScore"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ลักษณะการเดิน (คะแนน)</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.WalkingScore"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความกว้างช่องอก (ซม.)</label
            >
            <InputText type="number" class="w-full" v-model="form.ChestWidth" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความลึกลำตัว (ซม.)</label
            >
            <InputText type="number" class="w-full" v-model="form.BodyDeep" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความกางของกระดูกซี่โครง (คะแนน)</label
            >
            <InputText type="number" class="w-full" v-model="form.RibWidth" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              การยึดเกาะของเต้านมด้านหน้า (คะแนน) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastFrontScore"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ความสูงของเนื้อเยื่อเต้านมด้านหลัง (ซม.) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastHeight"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ความกว้างของเต้านมด้านหลัง (ซม.) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastWidth"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ความแข็งแรงของเอ็นยึดเต้านม (ซม.) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastLigament"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ความลึกของเต้านม (ซม.) เฉพาะเพศเมีย</label
            >
            <InputText type="number" class="w-full" v-model="form.BreastDeep" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ตำแหน่งของหัวนมด้านหลัง (คะแนน) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastHindScore"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ตำแหน่งของหัวนมด้านข้าง (คะแนน) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastSideScore"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ลักษณะของหัวนม (คะแนน) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastLength"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความแข็งแรงของหลัง (ส่วนเอว) (คะแนน)</label
            >
            <InputText type="number" class="w-full" v-model="form.TitsScore" />
          </div>
        </div>
      </div>
      <div class="col-12 text-center mt-5 flex justify-content-between">
        <Button
          label="ยกเลิก"
          class="p-button-secondary w-full mr-3"
          @click="close_add()"
        />
        <Button
          label="บันทึกข้อมูล"
          class="ml-3 p-button-info w-full"
          @click="add()"
        />
      </div>
    </form>
    <template #footer> </template>
  </Dialog>
  <!-- End Add Dialog -->

  <!-- EDIT Dialog -->
  <Dialog
    header="แก้ไขโครงการพัฒนาแพะพันธุ์แดงสุราษฎร์"
    v-model:visible="display_edit"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <form class="grid mt-2">
      <div class="col-12 lg:col-12">
        <div class="formgrid grid">
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              รอบการบันทึก<span class="text-red-500">*</span></label
            >

            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              id="selectedScheme"
              placeholder="รอบการบันทึก"
              :options="project_level"
              optionLabel="name"
              :class="{ 'p-invalid': !form.RedGoatRound && valid }"
              v-model="form.RedGoatRound"
              :disabled="checkSex == '1'"
            />
          </div>

          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่บันทึก<span class="text-red-500">*</span></label
            >
            <Calendar
              class="w-full"
              placeholder="วันที่บันทึก"
              :maxDate="new Date()"
              :showButtonBar="true"
              :showIcon="true"
              v-model="form.RedGoatDate"
              :class="{ 'p-invalid': !form.RedGoatDate && valid }"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              เจ้าหน้าที่ผู้รับผิดชอบ<span class="text-red-500">*</span></label
            >
            <Dropdown
              class="w-full"
              id="selectedstatus"
              :options="personal"
              optionLabel="Fullname"
              optionValue="StaffID"
              placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
              :filter="true"
              v-model="form.ResponsibilityStaffID"
              :class="{ 'p-invalid': !form.ResponsibilityStaffID && valid }"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความสูงหัวไหล่ (ซม.)</label
            >
            <InputText
              type="number"
              class="w-full"
              :class="{ 'p-invalid': !form.ShoulderHeight && valid }"
              v-model="form.ShoulderHeight"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความกว้างหัวไหล่ (ซม.)</label
            >
            <InputText
              type="number"
              class="w-full"
              :class="{ 'p-invalid': !form.ShoulderWidth && valid }"
              v-model="form.ShoulderWidth"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความยาวลำตัว (ซม.)</label
            >
            <InputText
              type="number"
              class="w-full"
              :class="{ 'p-invalid': !form.BodyLength && valid }"
              v-model="form.BodyLength"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความแข็งแรงของหลัง (ส่วนเอว) (คะแนน)</label
            >
            <InputText
              type="number"
              class="w-full"
              :class="{ 'p-invalid': !form.WaistScore && valid }"
              v-model="form.WaistScore"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความกว้างเชิงกราน (ซม.)</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.PelvisWidth"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              มุมสะโพกมุมเฉียง (ซม.)</label
            >
            <InputText type="number" class="w-full" v-model="form.HipCurve" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความยาวสะโพก (ซม.)</label
            >
            <InputText type="number" class="w-full" v-model="form.HipLength" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '1'">
            <label class="block text-600 text-sm font-bold mb-2">
              เส้นรอบวงอัณฑะ (ซม.) เฉพาะเพศผู้</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.TestisLength"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ลักษณะขาหลังด้านหลัง (คะแนน)</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.LegHindScore"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ลักษณะขาหลังด้านข้าง (คะแนน)</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.LegSideScore"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ลักษณะการเดิน (คะแนน)</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.WalkingScore"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความกว้างช่องอก (ซม.)</label
            >
            <InputText type="number" class="w-full" v-model="form.ChestWidth" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความลึกลำตัว (ซม.)</label
            >
            <InputText type="number" class="w-full" v-model="form.BodyDeep" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความกางของกระดูกซี่โครง (คะแนน)</label
            >
            <InputText type="number" class="w-full" v-model="form.RibWidth" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              การยึดเกาะของเต้านมด้านหน้า (คะแนน) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastFrontScore"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ความสูงของเนื้อเยื่อเต้านมด้านหลัง (ซม.) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastHeight"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ความกว้างของเต้านมด้านหลัง (ซม.) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastWidth"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ความแข็งแรงของเอ็นยึดเต้านม (ซม.) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastLigament"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ความลึกของเต้านม (ซม.) เฉพาะเพศเมีย</label
            >
            <InputText type="number" class="w-full" v-model="form.BreastDeep" />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ตำแหน่งของหัวนมด้านหลัง (คะแนน) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastHindScore"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ตำแหน่งของหัวนมด้านข้าง (คะแนน) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastSideScore"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
            <label class="block text-600 text-sm font-bold mb-2">
              ลักษณะของหัวนม (คะแนน) เฉพาะเพศเมีย</label
            >
            <InputText
              type="number"
              class="w-full"
              v-model="form.BreastLength"
            />
          </div>
          <div class="field col-12 sm:col-6 md:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ความแข็งแรงของหลัง (ส่วนเอว) (คะแนน)</label
            >
            <InputText type="number" class="w-full" v-model="form.TitsScore" />
          </div>
        </div>
      </div>
      <div class="col-12 text-center mt-5 flex justify-content-between">
        <Button
          label="ยกเลิก"
          class="p-button-secondary w-full mr-3"
          @click="close_edit()"
        />
        <Button
          label="บันทึกข้อมูล"
          class="ml-3 p-button-info w-full"
          @click="update()"
        />
      </div>
    </form>
    <template #footer> </template>
  </Dialog>
  <!-- End EDIT Dialog -->
  <!-- Start Delete Dialog -->
  <Dialog
    header="ตรวจสอบข้อมูล"
    v-model:visible="display_delete"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="confirmation-content text-center">
      <i class="pi pi-trash" style="font-size: 5rem" />
      <br />
      <span class="text-xl">คุณต้องการลบข้อมูลใช่หรือไม่</span>
    </div>
    <template #footer>
      <div class="col-12 text-center flex justify-content-between">
        <Button
          label="ยกเลิก"
          @click="closeConfirmation"
          class="p-button-secondary w-full mr-3"
        />
        <Button
          label="ยืนยัน"
          @click="closeConfirmation"
          class="p-button-danger w-full ml-3"
        />
      </div>
    </template>
  </Dialog>

  <!-- View Dialog -->
  <Dialog
    header="รายละเอียด"
    v-model:visible="display_view"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <form class="grid mt-2">
      <div class="formgrid grid">
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            รอบการบันทึก<span class="text-red-500">*</span></label
          >

          <Dropdown
            emptyMessage="ไม่มีข้อมูล"
            emptyFilterMessage="ไม่พบข้อมูล"
            class="w-full"
            id="selectedScheme"
            placeholder="รอบการบันทึก"
            :options="project_level"
            optionLabel="name"
            :class="{ 'p-invalid': !form.RedGoatRound && valid }"
            v-model="form.RedGoatRound"
            :disabled="checkSex == '1'"
          />
        </div>

        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            วันที่บันทึก<span class="text-red-500">*</span></label
          >
          <!-- <Calendar
            class="w-full"
            placeholder="วันที่บันทึก"
            :maxDate="new Date()"
            :showButtonBar="true"
            :showIcon="true"
            v-model="form.RedGoatDate"
            :class="{ 'p-invalid': !form.RedGoatDate && valid }"
          /> -->

          <Datepicker
            v-model="form.RedGoatDate"
            :class="{ 'p-invalid': !form.RedGoatDate && valid }"
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
            <template #year="{ year }">
              {{ year + 543 }}
            </template>
            <template #year-overlay="{ value }">
              {{ value + 543 }}
            </template>
          </Datepicker>
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            เจ้าหน้าที่ผู้รับผิดชอบ<span class="text-red-500">*</span></label
          >
          <Dropdown
            class="w-full"
            id="selectedstatus"
            :options="personal"
            optionLabel="Fullname"
            optionValue="StaffID"
            placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
            :filter="true"
            v-model="form.ResponsibilityStaffID"
            :class="{ 'p-invalid': !form.ResponsibilityStaffID && valid }"
          />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ความสูงหัวไหล่(ซม.)</label
          >
          <InputText
            type="number"
            class="w-full"
            :class="{ 'p-invalid': !form.ShoulderHeight && valid }"
            v-model="form.ShoulderHeight"
          />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ความกว้างหัวไหล่(ซม.)</label
          >
          <InputText
            type="number"
            class="w-full"
            :class="{ 'p-invalid': !form.ShoulderWidth && valid }"
            v-model="form.ShoulderWidth"
          />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ความยาวลำตัว(ซม.)</label
          >
          <InputText
            type="number"
            class="w-full"
            :class="{ 'p-invalid': !form.BodyLength && valid }"
            v-model="form.BodyLength"
          />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ความแข็งแรงของหลัง(ส่วนเอว)(คะแนน)</label
          >
          <InputText
            type="number"
            class="w-full"
            :class="{ 'p-invalid': !form.WaistScore && valid }"
            v-model="form.WaistScore"
          />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ความกว้างเชิงกราน(ซม.)</label
          >
          <InputText type="number" class="w-full" v-model="form.PelvisWidth" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            มุมสะโพกมุมเฉียง(ซม.)</label
          >
          <InputText type="number" class="w-full" v-model="form.HipCurve" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ความยาวสะโพก(ซม.)</label
          >
          <InputText type="number" class="w-full" v-model="form.HipLength" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '1'">
          <label class="block text-600 text-sm font-bold mb-2">
            เส้นรอบวงอัณฑะ(ซม.) เฉพาะเพศผู้</label
          >
          <InputText type="number" class="w-full" v-model="form.TestisLength" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ลักษณะขาหลังด้านหลัง(คะแนน)</label
          >
          <InputText type="number" class="w-full" v-model="form.LegHindScore" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ลักษณะขาหลังด้านข้าง(คะแนน)</label
          >
          <InputText type="number" class="w-full" v-model="form.LegSideScore" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ลักษณะการเดิน(คะแนน)</label
          >
          <InputText type="number" class="w-full" v-model="form.WalkingScore" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ความกว้างช่องอก(ซม.)</label
          >
          <InputText type="number" class="w-full" v-model="form.ChestWidth" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ความลึกลำตัว(ซม.)</label
          >
          <InputText type="number" class="w-full" v-model="form.BodyDeep" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ความกางของกระดูกซี่โครง(คะแนน)</label
          >
          <InputText type="number" class="w-full" v-model="form.RibWidth" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
          <label class="block text-600 text-sm font-bold mb-2">
            การยึดเกาะของเต้านมด้านหน้า(คะแนน) เฉพาะเพศเมีย</label
          >
          <InputText
            type="number"
            class="w-full"
            v-model="form.BreastFrontScore"
          />
        </div>
        <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
          <label class="block text-600 text-sm font-bold mb-2">
            ความสูงของเนื้อเยื่อเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย</label
          >
          <InputText type="number" class="w-full" v-model="form.BreastHeight" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
          <label class="block text-600 text-sm font-bold mb-2">
            ความกว้างของเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย</label
          >
          <InputText type="number" class="w-full" v-model="form.BreastWidth" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
          <label class="block text-600 text-sm font-bold mb-2">
            ความแข็งแรงของเอ็นยึดเต้านม(ซม.) เฉพาะเพศเมีย</label
          >
          <InputText
            type="number"
            class="w-full"
            v-model="form.BreastLigament"
          />
        </div>
        <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
          <label class="block text-600 text-sm font-bold mb-2">
            ความลึกของเต้านม(ซม.) เฉพาะเพศเมีย</label
          >
          <InputText type="number" class="w-full" v-model="form.BreastDeep" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
          <label class="block text-600 text-sm font-bold mb-2">
            ตำแหน่งของหัวนมด้านหลัง(คะแนน) เฉพาะเพศเมีย</label
          >
          <InputText
            type="number"
            class="w-full"
            v-model="form.BreastHindScore"
          />
        </div>
        <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
          <label class="block text-600 text-sm font-bold mb-2">
            ตำแหน่งของหัวนมด้านข้าง(คะแนน) เฉพาะเพศเมีย</label
          >
          <InputText
            type="number"
            class="w-full"
            v-model="form.BreastSideScore"
          />
        </div>
        <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
          <label class="block text-600 text-sm font-bold mb-2">
            ลักษณะของหัวนม(คะแนน) เฉพาะเพศเมีย</label
          >
          <InputText type="number" class="w-full" v-model="form.BreastLength" />
        </div>
        <div class="field col-12 sm:col-6 md:col-6">
          <label class="block text-600 text-sm font-bold mb-2">
            ความแข็งแรงของหลัง(ส่วนเอว)(คะแนน)</label
          >
          <InputText type="number" class="w-full" v-model="form.TitsScore" />
        </div>
      </div>
    </form>
    <template #footer></template>
  </Dialog>
  <!-- End View Dialog -->
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
// import PageTitle from "@/components/PageTitle.vue";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { FilterMatchMode } from "primevue/api";
import { format } from "date-fns";
import { th } from "date-fns/locale";

export default {
  emits: ["refresh_secret_status", "onclear_display"],
  props: {
    permit: {
      type: Array,
      required: true,
    },
  },
  components: {},
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      AnimalID: "AnimalID",
      user: "user",
    }),
  },
  data() {
    return {
      url: "/red-goat",
      urlAnimal: "/animal/",
      urlOrganization: "/organization",
      apiAnimalFatherID: "/animal?isActive=1",
      apiPersonal: "/staff?isActive=1",
      breadcrumb: [
        { label: "ระบบโครงการ", to: "/project/all" },
        { label: "ข้อมูลพื้นฐานโครงการ RedGoat", to: "" },
      ],

      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      items: [],
      // load
      data: [],
      animal: [],
      isLoading: false,
      animalfather: [],
      personal: [],
      // form
      valid: false,
      form: {
        RedGoatID: "",
        ProjectCode: "",
        ProjectName: "",
        ProjectNameEN: "",
        StartDate: "",
        EndDate: "",
        OrganizationID: "",
        AnimalTypeID: "",
        AnimalTypeIDTmp: "",
        IsExtend: "",
        ProjectLevel: "",
        isActive: "",
      },

      project_level: [
        {
          id: "1",
          name: "หลังคลอดท้องแรก",
        },
        {
          id: "2",
          name: " รอบ 1 ปี",
        },
      ],

      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],

      //  cancel requests
      controller: new AbortController(),

      // Search
      isSearch: false,
      isSelection: false,

      //
      checkSex: 0,

      filtered: {
        ProjectCode: "",
        ProjectName: "",
        ProjectLevel: "",
        isActive: "",
        StartDate: "",
        EndDate: "",
      },

      // Modal
      display_add: false,
      display_edit: false,
      display_view: false,
      display_delete: false,
    };
  },
  mounted() {
    this.load();
    this.form.isActive = this.status[0];

    dayjs.extend(buddhistEra);

    // this.animalfather = response.data.rows.map((item) => {
    //   return {
    //     AnimalID: item.AnimalID,
    //     AnimalIdentificationID: item.AnimalIdentificationID,
    //     Fullname: item.AnimalIdentificationID + ", " + item.AnimalName,
    //   };
    // });

    axios.get(this.apiAnimalFatherID).then((response) => {
      if (this.animal_id == 1) {
        this.animalfather = response.data.rows.filter(
          (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
        );

        this.animalfather = this.animalfather.map((item) => {
          return {
            AnimalID: item.AnimalID,
            AnimalIdentificationID: item.AnimalIdentificationID,
            Fullname: item.AnimalIdentificationID + ", " + item.AnimalName,
          };
        });
      } else if (this.animal_id == 2) {
        this.animalfather = response.data.rows.filter(
          (item) => item.AnimalTypeID === 3 || item.AnimalTypeID === 4
        );
        this.animalfather = this.animalfather.map((item) => {
          return {
            AnimalID: item.AnimalID,
            AnimalIdentificationID: item.AnimalIdentificationID,
            Fullname: item.AnimalIdentificationID + ", " + item.AnimalName,
          };
        });
      } else if (this.animal_id == 3) {
        this.animalfather = response.data.rows.filter(
          (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
        );
        this.animalfather = this.animalfather.map((item) => {
          return {
            AnimalID: item.AnimalID,
            AnimalIdentificationID: item.AnimalIdentificationID,
            Fullname: item.AnimalIdentificationID + ", " + item.AnimalName,
          };
        });
      }
    });
    axios.get(this.apiPersonal).then((response) => {
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
    // ประเภทหน่วยงาน
    axios.get(this.urlOrganization).then((response) => {
      this.organization = response.data.rows;
    });
  },
  watch: {
    // ค้นหา
    "search.ProjectCode"(val) {
      this.filtered.ProjectCode = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    // ค้นหา
    "search.ProjectName"(val) {
      this.filtered.ProjectName = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.ProjectLevel"(val) {
      this.filtered.ProjectLevel = val.id;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.isActive"(val) {
      this.filtered.isActive = val.id;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.StartDate"(val) {
      // แปลงเป็น 2022-02-02
      let date = JSON.stringify(val);
      this.filtered.StartDate = date.slice(1, 11);

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.EndDate"(val) {
      // แปลงเป็น 2022-02-02
      let date = JSON.stringify(val);
      this.filtered.EndDate = date.slice(1, 11);

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
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
    clear_form() {
      this.$emit("onclear_display");
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

    // Axios
    load() {
      this.isLoading = true;
      let url = this.url + "?size=15";
      // url += "&page=";
      // if (this.curpage) {
      //   url += this.curpage;
      // }
      if (this.filtered.ProjectCode) {
        url += "&ProjectCode=" + this.filtered.ProjectCode;
      }
      if (this.filtered.ProjectName) {
        url += "&ProjectName=" + this.filtered.ProjectName;
      }
      if (this.filtered.ProjectLevel) {
        url += "&ProjectLevel=" + this.filtered.ProjectLevel;
      }
      if (this.filtered.isActive) {
        url += "&isActive=" + this.filtered.isActive;
      }
      if (this.filtered.StartDate) {
        url += "&StartDate=" + this.filtered.StartDate;
      }
      if (this.filtered.EndDate) {
        url += "&EndDate=" + this.filtered.EndDate;
      }

      axios
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.total = response.data.total;
          this.data = response.data.rows;
          dayjs.extend(buddhistEra);
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].show_id = i + 1;
            this.data[i].Fullname =
              this.data[i].Animal.AnimalIdentificationID +
              ", " +
              this.data[i].Animal.AnimalName;

            if (this.data[i].RedGoatRound == "1") {
              this.data[i].RedGoatRound_Temp = "หลังคลอดท้องแรก";
            } else if (this.data[i].RedGoatRound == "2") {
              this.data[i].RedGoatRound_Temp = "รอบ 1 ปี";
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(this.urlAnimal + this.AnimalID, {
          signal: this.controller.signal,
        })
        .then((response) => {
          // console.log(this.response);
          this.animal = response;

          if (this.animal.data.AnimalSexID == 1) {
            this.checkSex = 1;
          } else {
            this.checkSex = 2;
          }

          if (this.checkSex == "1") {
            this.form = {
              RedGoatRound: this.project_level[1],
            };
          }
        });
    },
    validation() {
      this.form.AnimalID = this.AnimalID;
      if (
        !this.form.AnimalID ||
        !this.form.RedGoatRound ||
        !this.form.RedGoatDate ||
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
    add() {
      // validation
      if (this.validation() == false) {
        return;
      }

      // change data
      this.form.isActive = this.form.isActive.value;
      this.form.RedGoatRound = this.form.RedGoatRound.id;
      // post
      axios
        .post(this.url, this.form)
        .then(() => {
          this.close_add();
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });
        })
        // error
        .catch((err) => {
          this.form.isActive = this.status[0];
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
      this.$emit("refresh_secret_status");
    },
    update() {
      // validation
      if (this.validation() == false) {
        return;
      }

      // change data
      this.form.isActive = this.form.isActive.value;
      this.form.RedGoatRound = this.form.RedGoatRound.id;

      axios
        .put(this.url + "/" + this.form.RedGoatID, this.form)
        .then(() => {
          this.close_edit();
          this.load();
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
      this.$emit("refresh_secret_status");
    },
    remove() {
      axios.delete(this.url + "/" + this.form.id).then(() => {
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
    // Modal
    open_add() {
      this.clear();
      this.form.ResponsibilityStaffID = this.user.StaffID;
      this.display_add = true;
    },
    close_add() {
      this.display_add = false;
      this.display_view = false;
    },
    open_edit(id) {
      if (this.permit[0].IsUpdate == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์แก้ไข",
          life: 5000,
        });
        return;
      }

      id = this.data.find((x) => x.RedGoatID == id);
      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      let idtmp = [];

      if (id.RedGoatRound == "1") {
        idtmp.RedGoatRound = this.project_level[0];
      } else if (id.RedGoatRound == "2") {
        idtmp.RedGoatRound = this.project_level[1];
      }
      this.form = {
        RedGoatID: id.RedGoatID,
        AnimalID: id.AnimalID,
        RedGoatRound: idtmp.RedGoatRound,
        RedGoatDate: id.RedGoatDate,
        ShoulderHeight: id.ShoulderHeight,
        ShoulderWidth: id.ShoulderWidth,
        BodyLength: id.BodyLength,
        WaistScore: id.WaistScore,
        PelvisWidth: id.PelvisWidth,
        HipCurve: id.HipCurve,
        HipLength: id.HipLength,
        TestisLength: id.TestisLength,
        LegHindScore: id.LegHindScore,
        LegSideScore: id.LegSideScore,
        WalkingScore: id.WalkingScore,
        ChestWidth: id.ChestWidth,
        BodyDeep: id.BodyDeep,
        RibWidth: id.RibWidth,
        BreastFrontScore: id.BreastFrontScore,
        BreastHeight: id.BreastHeight,
        BreastWidth: id.BreastWidth,
        BreastLigament: id.BreastLigament,
        BreastDeep: id.BreastDeep,
        BreastHindScore: id.BreastHindScore,
        BreastSideScore: id.BreastSideScore,
        BreastLength: id.BreastLength,
        TitsScore: id.TitsScore,
        ResponsibilityStaffID: id.ResponsibilityStaffID,

        show_id: id.show_id,
        isActive: id.isActive,
      };

      this.display_edit = true;
    },
    close_edit() {
      this.display_edit = false;
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
      this.form.id = id;
      // this.form.show_id = show_id;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },
    open_view(id) {
      id = this.data.find((x) => x.RedGoatID == id);
      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      let idtmp = [];

      if (id.RedGoatRound == "1") {
        idtmp.RedGoatRound = this.project_level[0];
      } else if (id.RedGoatRound == "2") {
        idtmp.RedGoatRound = this.project_level[1];
      }
      this.form = {
        RedGoatID: id.RedGoatID,
        AnimalID: id.AnimalID,
        RedGoatRound: idtmp.RedGoatRound,
        RedGoatDate: id.RedGoatDate,
        ShoulderHeight: id.ShoulderHeight,
        ShoulderWidth: id.ShoulderWidth,
        BodyLength: id.BodyLength,
        WaistScore: id.WaistScore,
        PelvisWidth: id.PelvisWidth,
        HipCurve: id.HipCurve,
        HipLength: id.HipLength,
        TestisLength: id.TestisLength,
        LegHindScore: id.LegHindScore,
        LegSideScore: id.LegSideScore,
        WalkingScore: id.WalkingScore,
        ChestWidth: id.ChestWidth,
        BodyDeep: id.BodyDeep,
        RibWidth: id.RibWidth,
        BreastFrontScore: id.BreastFrontScore,
        BreastHeight: id.BreastHeight,
        BreastWidth: id.BreastWidth,
        BreastLigament: id.BreastLigament,
        BreastDeep: id.BreastDeep,
        BreastHindScore: id.BreastHindScore,
        BreastSideScore: id.BreastSideScore,
        BreastLength: id.BreastLength,
        TitsScore: id.TitsScore,
        ResponsibilityStaffID: id.ResponsibilityStaffID,
        show_id: id.show_id,
        isActive: id.isActive,
      };

      this.display_view = true;
    },
    close_view() {
      this.display_view = false;
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
