<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="โครงการ RedGoat" :pages="breadcrumb" />

      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหา</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />
          <InputText
            class="w-full"
            type="text"
            v-model="search['global'].value"
            placeholder="ค้นหา"
          />
        </span>
      </div>

      <div class="mt-5 card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h4 class="text-2xl mb-0 text-600">
              รายการโครงการ RedGoat ทั้งหมด
            </h4>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button
              label="เพิ่มข้อมูล"
              icon="pi pi-plus"
              class="p-button-raised p-button-raised p-button-info"
              @click="open_add"
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
          <Column
            field="Fullname"
            header="ข้อมูลสัตว์"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="RedGoatRound"
            header="รอบการบันทึก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="RedGoatDate"
            header="วันที่บันทึก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ShoulderHeight"
            header="ความสูงหัวไหล่(ซม.)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ShoulderWidth"
            header="ความกว้างหัวไหล่(ซม.)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="BodyLength"
            header="ความยาวลำตัว(ซม.)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="WaistScore"
            header="ความแข็งแรงของหลัง(ส่วนเอว)(คะแนน)"
            class="text-center"
            :sortable="true"
          >
          </Column>
          <Column
            field="PelvisWidth"
            header="ความกว้างเชิงกราน(ซม."
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="HipCurve"
            header="มุมสะโพกมุมเฉียง(ซม.)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="HipLength"
            header="ความยาวสะโพก(ซม.)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="TestisLength"
            header="เส้นรอบวงอัณฑะ(ซม.) เฉพาะเพศผู้"
            class="text-center"
            :sortable="true"
          >
          </Column>
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
          <!-- <Column
              field="Staff.StaffGivenName"
              header="รหัสเจ้าหน้าที่ผู้ตรวจ"
              class="text-center"
              :sortable="true"
            ></Column> -->

          <Column
            field="Staff.StaffGivenName"
            header="เจ้าหน้าที่ที่รับผิดชอบ"
            class="text-center"
          >
            <template #body="slotProps">
              <div>
                {{
                  slotProps.data.Staff.StaffNumber +
                  ", " +
                  slotProps.data.Staff.StaffGivenName +
                  " " +
                  slotProps.data.Staff.StaffSurname
                }}
              </div>
            </template>
          </Column>

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
      </div>
    </div>
    <!-- end main page -->
    <!-- Add Dialog -->
    <Dialog
      header="เพิ่มโครงการ"
      v-model:visible="display_add"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                สัตว์<span class="text-red-500"> *</span></label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                :options="animalfather"
                optionLabel="Fullname"
                optionValue="AnimalID"
                placeholder="เลือกสัตว์"
                :showClear="true"
                :filter="true"
                v-model="form.AnimalID"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รอบการบันทึก<span class="text-red-500"> *</span></label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                id="selectedScheme"
                placeholder="รอบการบันทึก"
                :options="project_level"
                optionLabel="name"
                :class="{ 'p-invalid': !form.RedGoatRound && valid }"
                v-model="form.RedGoatRound"
              />
            </div>

            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่บันทึก<span class="text-red-500"> *</span></label
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
                เจ้าหน้าที่ผู้รับผิดชอบ<span class="text-red-500">
                  *</span
                ></label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                :options="personal"
                optionLabel="Fullname"
                optionValue="StaffID"
                placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
                :showClear="true"
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
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.PelvisWidth && valid }"
                v-model="form.PelvisWidth"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                มุมสะโพกมุมเฉียง(ซม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.HipCurve && valid }"
                v-model="form.HipCurve"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความยาวสะโพก(ซม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.HipLength && valid }"
                v-model="form.HipLength"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '1'">
              <label class="block text-600 text-sm font-bold mb-2">
                เส้นรอบวงอัณฑะ(ซม.) เฉพาะเพศผู้</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.TestisLength && valid }"
                v-model="form.TestisLength"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะขาหลังด้านหลัง(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.LegHindScore && valid }"
                v-model="form.LegHindScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะขาหลังด้านข้าง(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.LegSideScore && valid }"
                v-model="form.LegSideScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะการเดิน(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.WalkingScore && valid }"
                v-model="form.WalkingScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความกว้างช่องอก(ซม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.ChestWidth && valid }"
                v-model="form.ChestWidth"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความลึกลำตัว(ซม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BodyDeep && valid }"
                v-model="form.BodyDeep"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความกางของกระดูกซี่โครง(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.RibWidth && valid }"
                v-model="form.RibWidth"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                การยึดเกาะของเต้านมด้านหน้า(คะแนน) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastFrontScore && valid }"
                v-model="form.BreastFrontScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ความสูงของเนื้อเยื่อเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastHeight && valid }"
                v-model="form.BreastHeight"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ความกว้างของเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastWidth && valid }"
                v-model="form.BreastWidth"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ความแข็งแรงของเอ็นยึดเต้านม(ซม.) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastLigament && valid }"
                v-model="form.BreastLigament"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ความลึกของเต้านม(ซม.) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastDeep && valid }"
                v-model="form.BreastDeep"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำแหน่งของหัวนมด้านหลัง(คะแนน) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastHindScore && valid }"
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
                :class="{ 'p-invalid': !form.BreastSideScore && valid }"
                v-model="form.BreastSideScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะของหัวนม(คะแนน) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastLength && valid }"
                v-model="form.BreastLength"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความแข็งแรงของหลัง(ส่วนเอว)(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.TitsScore && valid }"
                v-model="form.TitsScore"
              />
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
      <template #footer></template>
    </Dialog>
    <!-- End Add Dialog -->
    <!-- EDIT Dialog -->
    <Dialog
      header="แก้ไข"
      v-model:visible="display_edit"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                สัตว์<span class="text-red-500"> *</span></label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                :options="animalfather"
                optionLabel="Fullname"
                optionValue="AnimalID"
                placeholder="เลือกสัตว์"
                :showClear="true"
                :filter="true"
                v-model="form.AnimalID"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รอบการบันทึก<span class="text-red-500"> *</span></label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                id="selectedScheme"
                placeholder="รอบการบันทึก"
                :options="project_level"
                optionLabel="name"
                :class="{ 'p-invalid': !form.RedGoatRound && valid }"
                v-model="form.RedGoatRound"
              />
            </div>

            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่บันทึก<span class="text-red-500"> *</span></label
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
                เจ้าหน้าที่ผู้รับผิดชอบ<span class="text-red-500">
                  *</span
                ></label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                :options="personal"
                optionLabel="Fullname"
                optionValue="StaffID"
                placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
                :showClear="true"
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
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.PelvisWidth && valid }"
                v-model="form.PelvisWidth"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                มุมสะโพกมุมเฉียง(ซม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.HipCurve && valid }"
                v-model="form.HipCurve"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความยาวสะโพก(ซม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.HipLength && valid }"
                v-model="form.HipLength"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '1'">
              <label class="block text-600 text-sm font-bold mb-2">
                เส้นรอบวงอัณฑะ(ซม.) เฉพาะเพศผู้</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.TestisLength && valid }"
                v-model="form.TestisLength"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะขาหลังด้านหลัง(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.LegHindScore && valid }"
                v-model="form.LegHindScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะขาหลังด้านข้าง(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.LegSideScore && valid }"
                v-model="form.LegSideScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะการเดิน(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.WalkingScore && valid }"
                v-model="form.WalkingScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความกว้างช่องอก(ซม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.ChestWidth && valid }"
                v-model="form.ChestWidth"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความลึกลำตัว(ซม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BodyDeep && valid }"
                v-model="form.BodyDeep"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความกางของกระดูกซี่โครง(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.RibWidth && valid }"
                v-model="form.RibWidth"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                การยึดเกาะของเต้านมด้านหน้า(คะแนน) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastFrontScore && valid }"
                v-model="form.BreastFrontScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ความสูงของเนื้อเยื่อเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastHeight && valid }"
                v-model="form.BreastHeight"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ความกว้างของเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastWidth && valid }"
                v-model="form.BreastWidth"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ความแข็งแรงของเอ็นยึดเต้านม(ซม.) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastLigament && valid }"
                v-model="form.BreastLigament"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ความลึกของเต้านม(ซม.) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastDeep && valid }"
                v-model="form.BreastDeep"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำแหน่งของหัวนมด้านหลัง(คะแนน) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastHindScore && valid }"
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
                :class="{ 'p-invalid': !form.BreastSideScore && valid }"
                v-model="form.BreastSideScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะของหัวนม(คะแนน) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastLength && valid }"
                v-model="form.BreastLength"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความแข็งแรงของหลัง(ส่วนเอว)(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.TitsScore && valid }"
                v-model="form.TitsScore"
              />
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
            @click="update()"
          />
        </div>
      </form>
      <template #footer></template>
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

    <!-- View Dialog -->
    <Dialog
      header="รายละเอียด"
      v-model:visible="display_view"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                สัตว์<span class="text-red-500"> *</span></label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                :options="animalfather"
                optionLabel="Fullname"
                optionValue="AnimalID"
                placeholder="เลือกสัตว์"
                :showClear="true"
                :filter="true"
                v-model="form.AnimalID"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รอบการบันทึก<span class="text-red-500"> *</span></label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                id="selectedScheme"
                placeholder="รอบการบันทึก"
                :options="project_level"
                optionLabel="name"
                :class="{ 'p-invalid': !form.RedGoatRound && valid }"
                v-model="form.RedGoatRound"
              />
            </div>

            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่บันทึก<span class="text-red-500"> *</span></label
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
                เจ้าหน้าที่ผู้รับผิดชอบ<span class="text-red-500">
                  *</span
                ></label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                :options="personal"
                optionLabel="Fullname"
                optionValue="StaffID"
                placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ"
                :showClear="true"
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
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.PelvisWidth && valid }"
                v-model="form.PelvisWidth"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                มุมสะโพกมุมเฉียง(ซม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.HipCurve && valid }"
                v-model="form.HipCurve"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความยาวสะโพก(ซม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.HipLength && valid }"
                v-model="form.HipLength"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '1'">
              <label class="block text-600 text-sm font-bold mb-2">
                เส้นรอบวงอัณฑะ(ซม.) เฉพาะเพศผู้</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.TestisLength && valid }"
                v-model="form.TestisLength"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะขาหลังด้านหลัง(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.LegHindScore && valid }"
                v-model="form.LegHindScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะขาหลังด้านข้าง(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.LegSideScore && valid }"
                v-model="form.LegSideScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะการเดิน(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.WalkingScore && valid }"
                v-model="form.WalkingScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความกว้างช่องอก(ซม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.ChestWidth && valid }"
                v-model="form.ChestWidth"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความลึกลำตัว(ซม.)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BodyDeep && valid }"
                v-model="form.BodyDeep"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความกางของกระดูกซี่โครง(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.RibWidth && valid }"
                v-model="form.RibWidth"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                การยึดเกาะของเต้านมด้านหน้า(คะแนน) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastFrontScore && valid }"
                v-model="form.BreastFrontScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ความสูงของเนื้อเยื่อเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastHeight && valid }"
                v-model="form.BreastHeight"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ความกว้างของเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastWidth && valid }"
                v-model="form.BreastWidth"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ความแข็งแรงของเอ็นยึดเต้านม(ซม.) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastLigament && valid }"
                v-model="form.BreastLigament"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ความลึกของเต้านม(ซม.) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastDeep && valid }"
                v-model="form.BreastDeep"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำแหน่งของหัวนมด้านหลัง(คะแนน) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastHindScore && valid }"
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
                :class="{ 'p-invalid': !form.BreastSideScore && valid }"
                v-model="form.BreastSideScore"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6" v-if="checkSex == '2'">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะของหัวนม(คะแนน) เฉพาะเพศเมีย</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.BreastLength && valid }"
                v-model="form.BreastLength"
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความแข็งแรงของหลัง(ส่วนเอว)(คะแนน)</label
              >
              <InputText
                type="number"
                class="w-full"
                :class="{ 'p-invalid': !form.TitsScore && valid }"
                v-model="form.TitsScore"
              />
            </div>
          </div>
        </div>
      </form>
      <template #footer></template>
    </Dialog>
    <!-- End View Dialog -->
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import dayjs from "dayjs";
import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      user: "user",
      animal_id: "animal_id",
      AnimalID: "AnimalID",
    }),
  },
  data() {
    return {
      url: "/red-goat",
      urlAnimalType: "/animal-type",
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
    // data.start_week = dayjs(data.start_week).locale("th").format("DD MMM BB");

    // ประเภทสัตว์
    axios
      .get(this.urlAnimalType, { signal: this.controller.signal })
      .then((response) => {
        this.animal = response.data.rows;
      });

    axios
      .get(this.apiAnimalFatherID, { signal: this.controller.signal })
      .then((response) => {
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
    // ประเภทหน่วยงาน
    axios
      .get(this.urlOrganization, { signal: this.controller.signal })
      .then((response) => {
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

    // เลือกสัตว์
    "form.AnimalID"(val) {
      if (val) {
        axios
          .get(this.urlAnimal + val, {
            signal: this.controller.signal,
          })
          .then((response) => {
            // console.log(this.response);
            this.animal = response;

            if (this.animal.data.AnimalSexID) {
              if (this.animal.data.AnimalSexID == 1) {
                this.checkSex = 1;
              } else {
                this.checkSex = 2;
              }

              if (this.checkSex == "1") {
                this.form.RedGoatRound = this.project_level[1];
              }
            } else if (this.animal.data.AnimalSexID == "3") {
              this.form.RedGoatRound = null;
            } else {
              this.form.RedGoatRound = null;
            }
          });
      }
    },
  },
  methods: {
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
            if (this.data[i].StartDate != null) {
              this.data[i].StartDate = dayjs(this.data[i].StartDate)
                .locale(locale)
                .format("DD/MM/YY");
            }
            if (this.data[i].EndDate != null) {
              this.data[i].EndDate = dayjs(this.data[i].EndDate)
                .locale(locale)
                .format("DD/MM/YY");
            }
            if (this.data[i].RedGoatDate != null) {
              this.data[i].RedGoatDate = dayjs(this.data[i].RedGoatDate)
                .locale(locale)
                .format("DD/MM/YYYY");
            }
            // if (this.data[i].RedGoatDate != null) {
            //   this.data[i].RedGoatDate = dayjs(this.data[i].RedGoatDate)
            //     .locale(locale)
            //     .format("DD/MM/YYYY");
            // }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    validation() {
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
    },
    // Modal
    open_add() {
      this.clear();

      this.form.ResponsibilityStaffID = this.user.StaffID;

      this.display_add = true;
    },
    close_add() {
      this.display_add = false;
    },
    open_edit(id) {
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
