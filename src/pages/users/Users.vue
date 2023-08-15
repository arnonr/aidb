<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle :title="'จัดการ' + name" :pages="breadcrumb" />
      <div>
        <div class="card">
          <h1 class="text-xl mb-4 text-500">เครื่องมือช่วยค้นหาผู้ใช้งาน</h1>
          <div class="grid">
            <div class="col-12 sm:col-6 lg:col-3">
              <label
                for="selectedUnit"
                class="block text-600 text-sm font-bold mb-2"
              >
                ค้นหา</label
              >
              <InputText
                class="w-full"
                type="text"
                v-model="search.User"
                placeholder="อีเมลหรือ ชื่อบุคลากร"
              />
            </div>
            <div class="col-12 sm:col-6 lg:col-3">
              <label
                for="selectedFarm"
                class="block text-600 text-sm font-bold mb-2"
              >
                กลุ่มผู้ใช้งาน</label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="ทั้งหมด"
                :options="selection.Group.data"
                optionLabel="GroupName"
                optionValue="GroupID"
                v-model="search.Group"
              />
            </div>
            <div class="col-12 sm:col-6 lg:col-3">
              <label
                for="animal_id"
                class="block text-600 text-sm font-bold mb-2"
              >
                ยืนยันตัวตน</label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="ทั้งหมด"
                :options="IsApprove"
                optionLabel="label"
                optionValue="value"
                v-model="search.IsApprove"
              />
            </div>
            <div class="col-12 sm:col-6 lg:col-3">
              <label
                for="animal_id"
                class="block text-600 text-sm font-bold mb-2"
              >
                สถานะ</label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="ทั้งหมด"
                :options="isActive"
                optionLabel="label"
                optionValue="value"
                v-model="search.isActive"
              />
            </div>
          </div>
        </div>
        <div class="mt-5 card">
          <div class="grid flex align-items-center mb-5">
            <div class="col-12 md:col-6">
              <h1 class="text-2xl mb-0 text-600">{{ "จัดการ" + name }}</h1>
            </div>
            <div class="col-12 md:col-6 md:text-right">
              <Button
                @click="open()"
                label="เพิ่มข้อมูล"
                icon="pi pi-plus"
                class="p-button-primary"
              />
            </div>
          </div>
          <DataTable
            class="text-sm"
            :value="data"
            :loading="isLoading"
            :rows="10"
            :paginator="true"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
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
              field="IsApprove"
              header="ยืนยันตัวตน"
              class="text-center"
              :sortable="true"
            >
              <template #body="slotProps">
                <div v-if="slotProps.data.IsApprove == 1">
                  <Tag class="w-full" severity="success" icon="pi pi-check"
                    >อนุมัติ</Tag
                  >
                </div>
                <div v-else-if="slotProps.data.IsApprove == 0">
                  <Tag
                    class="w-full"
                    severity="warning"
                    icon="pi pi-exclamation-circle"
                  >
                    รออนุมัติ</Tag
                  >
                </div>
                <div v-else>
                  <Tag
                    class="w-full"
                    severity="danger"
                    icon="pi pi-exclamation-triangle"
                  >
                    ไม่อนุมัติ</Tag
                  >
                </div>
              </template>
            </Column>
            <Column
              field="isActive"
              header="สถานะ"
              class="text-center"
              :sortable="true"
            >
              <template #body="slotProps">
                <div
                  v-if="
                    slotProps.data.isActive == '1' ||
                    slotProps.data.isActive == status[0]
                  "
                >
                  <Tag class="w-full" severity="success">เปิดใช้งาน</Tag>
                </div>
                <div v-else>
                  <Tag class="w-full bg-gray-500">ปิดใช้งาน</Tag>
                </div>
              </template>
            </Column>
            <Column header="จัดการ" class="text-center">
              <template #body="slotProps">
                <Button
                  type="button"
                  icon="pi pi-ellipsis-v"
                  @click="toggle($event, slotProps.data.UserID)"
                  class="p-button-text"
                />
                <Menu ref="menu" :model="items" :popup="true">
                  <template #item="{ item }">
                    <Button
                      v-if="item.label == 'แก้ไข'"
                      :label="item.label"
                      :icon="item.icon"
                      class="p-button-text w-full text-left"
                      @click="edit()"
                    />
                    <Button
                      v-if="item.label == 'ลบ'"
                      :label="item.label"
                      :icon="item.icon"
                      class="p-button-text w-full text-left"
                      @click="open_delete()"
                    />
                  </template>
                </Menu>
              </template>
            </Column>
            <template #empty> ไม่พบข้อมูล </template>
            <template #loading>
              <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
            </template>
          </DataTable>
          <!-- <Paginator
            @page="page($event)"
            :rows="15"
            :totalRecords="total"
          ></Paginator> -->
        </div>
      </div>
    </div>
    <Dialog
      :header="formheader + name"
      v-model:visible="display"
      :style="{ width: '50vw' }"
      :modal="true"
      v-on:after-hide="clear()"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="grid">
            <div class="col-12 lg:col-12">
              <label class="block text-600 text-sm font-bold mb-1">
                ชื่อบุคลากร</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกบุคลากร"
                optionLabel="StaffFullName"
                optionValue="StaffID"
                v-model="data[index].StaffID"
                :filter="true"
                @filter="filterstaff($event)"
                :options="selection.Staff.data"
                filterPlaceholder="รหัส หรือ ชื่อบุคลากร"
                :class="{ 'p-invalid': !data[index].StaffID && valid }"
              />
            </div>
            <div class="col-4">
              <label class="block text-600 text-sm font-bold mb-2">
                &nbsp;</label
              >
              <Button
                label="ตรวจสอบ"
                class="p-button-secondary w-full mr-3"
                @click="display_view = true"
              />
            </div>
            <div class="col-4">
              <label class="block text-600 text-sm font-bold mb-2">
                &nbsp;</label
              >
              <Button
                label="แก้ไขข้อมูล"
                class="p-button-primary w-full mr-3"
                @click="gotoPersonal()"
              />
              <!-- <a
                href="https://codingbeautydev.com/blog"
                target="_blank"
                rel="noreferrer"
              >
                Coding Beauty Blog
              </a> -->

              <!-- @click="display_view = true" -->
            </div>
            <div class="col-12 sm:col-12 lg:col-6">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                อีเมล
              </label>
              <InputText
                autocomplete="username"
                v-model="data[index].Username"
                class="w-full"
                :class="{ 'p-invalid': !data[index].Username && valid }"
              />
            </div>
            <div class="col-2 sm:col-12 lg:col-6 field p-fluid">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสผ่าน
              </label>
              <Password
                autocomplete="current-password"
                :feedback="false"
                v-model="data[index].Password"
                toggleMask
                :class="{ 'p-invalid': !data[index].Password && valid }"
              />
            </div>
            <div class="col-2 sm:col-12 lg:col-6">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                กลุ่มผู้ใช้งาน
              </label>
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                v-model="data[index].GroupID"
                optionLabel="GroupName"
                optionValue="GroupID"
                :options="selection.Group.form"
                class="w-full"
                placeholder="เลือกกลุ่มผู้ใช้งาน"
                :class="{ 'p-invalid': !data[index].GroupID && valid }"
              >
              </Dropdown>
            </div>
            <div class="col-2 sm:col-12 lg:col-6">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                ประเภทสัตว์
              </label>

              <MultiSelect
                v-model="data[index].AnimalTypeID"
                :options="selection.Animal.data"
                optionLabel="label"
                optionValue="value"
                placeholder="เลือกประเภทสัตว์"
                display="chip"
                class="w-full"
                :class="{ 'p-invalid': !data[index].AnimalTypeID && valid }"
              />
            </div>
            <div class="col">
              <div class="field col-12 sm:col-12 lg:col-12">
                <div class="text-xl">สถานะ</div>
                <div
                  v-for="isActive of status"
                  :key="isActive.key"
                  class="field-radiobutton"
                >
                  <RadioButton
                    name="isActive"
                    :value="isActive.value"
                    v-model="data[this.index].isActive"
                  />
                  <label :for="isActive.key">{{ isActive.name }}</label>
                </div>
              </div>
              <div class="field col-12 sm:col-12 lg:col-12">
                <div class="text-xl">ยืนยันตัวตน</div>
                <div class="text-red-500 text-m mb-2">
                  * เลือกประเภทเจ้าหน้าที่เพื่ออนุมัติข้อมูล *
                </div>
                <div
                  v-for="IsApprove of approve"
                  :key="IsApprove.key"
                  class="field-radiobutton"
                >
                  <RadioButton
                    :id="IsApprove.key"
                    name="approve"
                    :value="IsApprove.value"
                    v-model="data[this.index].IsApprove"
                  />
                  <label :for="IsApprove.key">{{ IsApprove.name }}</label>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="field col-12 sm:col-12 lg:col-12">
                <label for="farm" class="block text-600 text-sm font-bold mb-2">
                  หมายเหตุ
                </label>
                <InputText v-model="data[index].Remark" class="w-full" />
              </div>
              <div class="field col-12 sm:col-12 lg:col-12" v-if="isCard == 0">
                <div class="text-xl">ประเภทเจ้าหน้าที่</div>
                <div class="text-red-500 text-m mb-2">
                  * เลือกประเภทเจ้าหน้าที่เพื่อสร้างรหัสบุคคลากร *
                </div>
                <div
                  v-for="type of staff_type"
                  :key="type.key"
                  class="field-radiobutton"
                >
                  <RadioButton
                    :id="type.key"
                    name="approve"
                    :value="type.value"
                    v-model="data[index].Staff.isCard"
                  />
                  <label :for="type.key">{{ type.name }}</label>
                </div>
              </div>
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
            v-if="data[index].Staff.isCard"
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="add()"
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
    <!-- Start View Dialog -->
    <Dialog
      header="รายละเอียดบุคลากร"
      v-model:visible="display_view"
      :style="{ width: '75vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="grid">
            <div class="col-12 sm:col-12 lg:col-8 grid">
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  รหัสบุคลากร <span class="text-red-500">*</span></label
                >
                <InputText
                  type="text"
                  class="w-full"
                  v-model="data[index].Staff.StaffNumber"
                  readonly
                />
              </div>

              <div class="field col-12 sm:col-6">
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  ประเภทบุคลากร<span class="text-red-500"> *</span></label
                >
                <Dropdown
                  class="w-full"
                  optionLabel="PositionTypeName"
                  optionValue="PositionTypeID"
                  v-model="data[index].Staff.StaffPositionTypeID"
                  disabled
                  :options="PositionType"
                  :filter="true"
                />
              </div>

              <div class="field col-12 sm:col-6">
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  ตำแหน่งงาน<span class="text-red-500"> *</span></label
                >
                <Dropdown
                  class="w-full"
                  optionLabel="PositionName"
                  optionValue="PositionID"
                  v-model="data[index].Staff.StaffPositionID"
                  disabled
                  :options="Position"
                  :filter="true"
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  สถานะบุคลากร<span class="text-red-500"> *</span></label
                >
                <Dropdown
                  class="w-full"
                  optionLabel="name"
                  optionValue="id"
                  v-model="data[index].Staff.StaffStatus"
                  disabled
                  :options="StatusAlive"
                  :filter="true"
                />
              </div>

              <div class="field col-12 sm:col-12">
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  หน่วยงานที่สังกัด <span class="text-red-500">*</span></label
                >
                <Dropdown
                  class="w-full"
                  optionLabel="OrganizationName"
                  optionValue="OrganizationID"
                  v-model="data[index].Staff.StaffOrganizationID"
                  disabled
                  :virtualScrollerOptions="{ itemSize: 38 }"
                  :options="Organization"
                  :filter="true"
                />
              </div>

              <div class="field col-12 sm:col-6">
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  วันที่เริ่มงาน<span class="text-red-500"> *</span></label
                >
                <!-- <Calendar
                  class="w-full"
                  :showButtonBar="true"
                  :showIcon="true"
                  v-model="form.StaffStartDate"
                  :class="{ 'p-invalid': !form.StaffStartDate && valid }"
                /> -->

                <Datepicker
                  v-model="data[index].Staff.StaffStartDate"
                  readonly
                  id="dateRange"
                  locale="th"
                  :format="format"
                  utc
                  :enableTimePicker="false"
                  cancelText="ยกเลิก"
                  selectText="ยืนยัน"
                  placeholder="วันที่เริ่มงาน"
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
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  วันที่สิ้นสุดการทำงาน</label
                >
                <!-- <Calendar
                  class="w-full"
                  :showButtonBar="true"
                  :showIcon="true"
                  v-model="form.StaffEndDate"
                /> -->

                <Datepicker
                  v-model="data[index].Staff.StaffEndDate"
                  readonly
                  id="dateRange"
                  locale="th"
                  :format="format"
                  utc
                  :enableTimePicker="false"
                  cancelText="ยกเลิก"
                  selectText="ยืนยัน"
                  placeholder="วันที่สิ้นสุดการทำงาน"
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
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  วันที่ออกบัตร</label
                >
                <!-- <Calendar
                  class="w-full"
                  :showButtonBar="true"
                  :showIcon="true"
                  v-model="form.CardStartDate"
                /> -->

                <Datepicker
                  v-model="data[index].Staff.CardStartDate"
                  readonly
                  id="dateRange"
                  locale="th"
                  :format="format"
                  utc
                  :enableTimePicker="false"
                  cancelText="ยกเลิก"
                  selectText="ยืนยัน"
                  placeholder="วันที่ออกบัตร"
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
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  วันที่บัตรหมดอายุ</label
                >
                <!-- <Calendar
                  class="w-full"
                  :showButtonBar="true"
                  :showIcon="true"
                  v-model="form.CardExpireDate"
                /> -->

                <Datepicker
                  v-model="data[index].Staff.CardExpireDate"
                  readonly
                  id="dateRange"
                  locale="th"
                  :format="format"
                  utc
                  :enableTimePicker="false"
                  cancelText="ยกเลิก"
                  selectText="ยืนยัน"
                  placeholder="วันที่บัตรหมดอายุ"
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
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  หน้าที่ความรับผิดชอบ</label
                >
                <InputText
                  type="text"
                  class="w-full"
                  placeholder=""
                  v-model="data[index].Staff.StaffResponsible"
                  readonly
                />
              </div>
            </div>
          </div>

          <hr />
          <div class="text-xl">ประวัติบุคลากร</div>
          <div class="formgrid grid mt-2">
            <div class="field col-12 sm:col-2">
              <label class="block text-600 text-sm font-bold mb-2">
                คำนำหน้า<span class="text-red-500"> *</span></label
              >
              <Dropdown
                class="w-full"
                optionLabel="TitleName"
                optionValue="TitleID"
                v-model="data[index].Staff.StaffTitleID"
                disabled
                :options="Title"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
              />
            </div>
            <div class="field col-12 sm:col-5">
              <label class="block text-600 text-sm font-bold mb-2"
                >ชื่อ<span class="text-red-500"> *</span></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffGivenName"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-5">
              <label class="block text-600 text-sm font-bold mb-2">
                นามสกุล<span class="text-red-500"> *</span></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffSurname"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-2">
              <label class="block text-600 text-sm font-bold mb-2"
                >เพศ<span class="text-red-500"> *</span></label
              >
              <Dropdown
                class="w-full"
                optionLabel="GenderName"
                optionValue="GenderID"
                v-model="data[index].Staff.StaffGenderID"
                disabled
                :options="Gender"
                :filter="true"
              />
            </div>

            <div class="field col-12 sm:col-5">
              <label class="block text-600 text-sm font-bold mb-2">
                เลขบัตรประจำตัวประชาชน<span class="text-red-500">
                  *</span
                ></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffIdentificationNumberTemp"
                readonly
              />
              <!-- <InputMask
                class="w-full"
                mask="9-9999-99999-99-9"
                v-model="form.StaffIdentificationNumberTemp"
                :class="{
                  'p-invalid': !form.StaffIdentificationNumberTemp && valid,
                }"
              /> -->
            </div>
            <div class="field col-12 sm:col-5">
              <label class="block text-600 text-sm font-bold mb-2">
                วัน-เดือน-ปี (เกิด)</label
              >
              <Datepicker
                v-model="data[index].Staff.StaffBirthDate"
                readonly
                id="dateRange"
                locale="th"
                :format="format"
                utc
                :maxDate="new Date()"
                :enableTimePicker="false"
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
                อีเมล<span class="text-red-500"> *</span></label
              >
              <InputText
                type="email"
                class="w-full"
                v-model="data[index].Staff.StaffEmail"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เบอร์โทรศัพท์ (มือถือ)<span class="text-red-500">
                  *</span
                ></label
              >
              <InputMask
                class="w-full"
                mask="999-999-9999"
                v-model="data[index].Staff.StaffMobilePhone"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ระดับการศึกษา</label
              >
              <Dropdown
                class="w-full"
                optionLabel="EducationName"
                optionValue="EducationID"
                v-model="data[index].Staff.StaffEducationID"
                disabled
                :virtualScrollerOptions="{ itemSize: 38 }"
                :options="Education"
                :filter="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สาขาวิชา</label
              >
              <Dropdown
                class="w-full"
                optionLabel="MajorName"
                optionValue="MajorID"
                v-model="data[index].Staff.StaffMajorID"
                disabled
                :virtualScrollerOptions="{ itemSize: 38 }"
                :options="Major"
                :filter="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปีที่สำเร็จการศึกษา</label
              >
              <InputText
                type="number"
                class="w-full"
                v-model="data[index].Staff.StaffGraduatedYear"
                readonly
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สถานภาพการสมรส</label
              >
              <Dropdown
                class="w-full"
                optionLabel="MarriedStatusName"
                optionValue="MarriedStatusID"
                v-model="data[index].Staff.StaffMarriedStatusID"
                disabled
                :options="MariedStatus"
                :filter="true"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เบอร์โทรศัพท์</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffTelephone"
                readonly
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขโทรสาร</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffFax"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ไอดีไลน์ (ID Line)</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffIDLine"
                readonly
              />
            </div>
          </div>
          <hr />
          <div class="text-xl">ที่อยู่บุคลากร</div>
          <div class="formgrid grid mt-2">
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                เลขที่บ้าน</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffAddress"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                หมู่ที่</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffMoo"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อหมู่บ้าน/อาคาร</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffVillageName"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2"> ชั้น</label>
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffFloor"
                readonly
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ถนน</label>
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffStreet"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ตรอก</label>
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffSubLane"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ซอย</label>
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffLane"
                readonly
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จังหวัด</label
              >
              <Dropdown
                class="w-full"
                optionLabel="ProvinceName"
                optionValue="ProvinceID"
                v-model="data[index].Staff.StaffProvinceID"
                disabled
                :options="Province"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                อำเภอ/เขต</label
              >
              <Dropdown
                class="w-full"
                optionLabel="Fullname"
                optionValue="AmphurID"
                v-model="data[index].Staff.StaffAmphurID"
                disabled
                :options="Amphur"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำบล/แขวง</label
              >
              <Dropdown
                class="w-full"
                optionLabel="Fullname"
                optionValue="TumbolID"
                v-model="data[index].Staff.StaffTumbolID"
                disabled
                :options="Tumbol"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
                @change="filterZipcode($event)"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสไปรษณีย์</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data[index].Staff.StaffZipCode"
                readonly
                maxlength="5"
                minlength="5"
              />
            </div>
          </div>
        </div>
      </form>
    </Dialog>
    <!-- End View Dialog -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      user: "user",
      UserId: "UserID",
    }),
  },
  data() {
    return {
      // API
      url: "/user",
      getstaff: "/staff",
      getgroup: "/group",
      // ID
      id: "UserID",
      // Name
      name: "ผู้ใช้งาน",
      display_view: false,
      // Table Field
      urlTitle: "/title?isActive=1",
      urlGender: "/gender?isActive=1",
      urlMariedStatus: "/married-status?isActive=1",
      urlOrganization: "/organization?isActive=1",
      urlPositionType: "/position-type?isActive=1",
      urlPosition: "/position?isActive=1",
      urlTumbol: "/tumbol?isActive=1",
      urlAmphur: "/amphur?isActive=1",
      urlProvince: "/province?isActive=1",
      urlEducation:
        "/education?isActive=1&orderByField=EducationCode&orderBy=asc",
      urlMajor: "/major?isActive=1",
      staff_type: [
        { name: "เจ้าหน้าที่ทั่วไป", value: 1, key: "A" },
        { name: "เจ้าหน้าที่มีบัตร", value: 2, key: "B" },
      ],
      columns: [
        {
          field: "show_id",
          header: "ลำดับที่",
        },
        {
          field: "Username",
          header: "อีเมล",
        },
        {
          field: "Staff.StaffFullName",
          header: "ชื่อ - นามสกุล",
        },
        {
          field: "Group.GroupName",
          header: "กลุ่มผู้ใช้งาน",
        },
        {
          field: "ThaiRegisterDate",
          header: "วันที่สมัคร",
        },
        {
          field: "ThaiLastLogin",
          header: "วันที่ใช้งานล่าสุด",
        },
      ],
      Title: [],
      Gender: [],
      MariedStatus: [],
      Organization: [],
      PositionType: [],
      Position: [],
      Tumbol: [],
      Amphur: [],
      Province: [],
      Education: [],
      Major: [],
      isCard: null,
      // Selection
      load_form: false,
      selection: {
        Staff: {
          data: [],
          Search: "",
        },
        Group: {
          data: [],
          form: [],
          Search: "",
        },
        Animal: {
          data: [
            {
              value: 1,
              label: "โคเนื้อ",
              key: "A",
            },
            {
              value: 2,
              label: "กระบือ",
              key: "B",
            },
            {
              value: 3,
              label: "แพะ",
              key: "B",
            },
          ],
        },
      },

      // Search

      isSearch: false,
      isSelection: false,
      search: {
        User: "",
        Staff: "",
        Group: "",
        isActive: "",
        IsApprove: "",
      },
      filtered: {
        User: "",
        Username: "",
        Staff: "",
        Group: "",
        isActive: "",
        IsApprove: "",
        StaffID: "",
      },

      // Static Data

      isLoading: false,
      total: null,
      data: [],
      valid: false,
      index: null,
      display: false,
      display_delete: false,
      temp: null,
      curpage: 0,
      formheader: "",
      sortField: "",
      sortOrder: "",
      IsApprove: [
        {
          label: "ทั้งหมด",
          value: "",
        },
        {
          label: "อนุมัติ",
          value: "1",
        },
        {
          label: "รออนุมัติ",
          value: "0",
        },
        {
          label: "ไม่อนุมัติ",
          value: "2",
        },
      ],
      isActive: [
        {
          label: "ทั้งหมด",
          value: "",
        },
        {
          label: "ใช้งาน",
          value: "1",
        },
        {
          label: "ไม่ใช้งาน",
          value: "0",
        },
      ],
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
      breadcrumb: [
        { label: "ข้อมูลพื้นฐานระบบ", to: "/user_center/dashboard" },
        { label: "", to: "" },
      ],
      StatusAlive: [
        {
          id: "ปฏิบัติงานอยู่",
          name: "ปฏิบัติงานอยู่",
        },
        {
          id: "เกษียณ",
          name: "เกษียณ",
        },
        {
          id: "ลาออก",
          name: "ลาออก",
        },
      ],

      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],
      approve: [
        { name: "รออนุมัติ", value: 0 },
        { name: "อนุมัติ", value: 1 },
        { name: "ไม่อนุมัติ", value: 2 },
      ],
      controller: new AbortController(),
    };
  },
  mounted() {
    this.load();
    this.load_selection();
    this.loadsection();
    this.breadcrumb[1].label = "จัดการ" + this.name;
  },
  watch: {
    // ค้นหา
    "search.Group"(val) {
      this.filtered.Group = val;
      this.load();
    },
    "search.User"(val) {
      this.filtered.User = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.filtered.StaffID = "";
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.IsApprove"(val) {
      this.filtered.IsApprove = val;
      this.load();
    },
    "search.isActive"(val) {
      this.filtered.isActive = val;
      this.load();
    },
    //ค้นหา selection
    "selection.Staff.Search"(val) {
      this.selection.Staff.Search = val;
      if (this.isSelection == false) {
        this.isSelection = true;
        setTimeout(() => {
          this.loadstaff();
          this.isSelection = false;
        }, 1000);
      }
    },
  },

  methods: {
    // แสดงปุ่ม
    gotoPersonal() {
      console.log(this.data[this.index].StaffID);

      let route = this.$router.resolve({ path: "/personnel" });
      localStorage.setItem("staffID", this.data[this.index].StaffID);
      window.open(route.href);

      // @click="this.$router.push({ name: 'personnel' })"
    },
    toggle(event, index) {
      try {
        //find array offet
        let offset = this.data.findIndex((x) => x.UserID == index);
        this.$refs.menu.toggle(event);
        this.index = offset;
        this.delete_id = offset;
      } catch (e) {
        window.location.reload();
      }
    },
    // filter Staff selection
    filterstaff($event) {
      this.selection.Staff.Search = $event.value;
      if (this.isSelection == false) {
        this.isSelection = true;
        setTimeout(() => {
          this.loadstaff();
          this.isSelection = false;
        }, 1000);
      }
    },
    //filter Staff selection
    async loadstaff() {
      let url = this.getstaff;
      if (this.selection.Staff.Search) {
        url += "?size=15&StaffNumber=" + this.selection.Staff.Search;
      }
      await axios
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.selection.Staff.data = response.data.data;
        });
      if (!this.selection.Staff.data) {
        await axios
          .get(
            `${this.getstaff}?size=15&StaffGivenName=${this.selection.Staff.Search}`,
            {
              signal: this.controller.signal,
            }
          )
          .then((response) => {
            this.selection.Staff.data = response.data.rows;
          });
      }
    },
    // sort table
    sort($event) {
      if ($event.sortField !== "show_id") {
        if ($event.sortOrder == 1) {
          this.sortOrder = "asc";
        } else {
          this.sortOrder = "desc";
        }
        if ($event.sortField == "ThaiRegisterDate") {
          $event.sortField = "RegisterDate";
        } else if ($event.sortField == "ThaiLastLogin") {
          $event.sortField = "LastLogin";
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
    // on modal hide
    clear() {
      if (this.temp) {
        // console.log(this.data[this.index], this.temp)
        this.data[this.index] = this.temp;
        this.temp = null;
      } else if (!this.data[this.index].CreatedDatetime) {
        this.data.splice(this.index, 1);
      }
      this.valid = false;
    },
    // validate
    validation() {
      if (
        !this.data[this.index].StaffID ||
        !this.data[this.index].Username ||
        !this.data[this.index].AnimalTypeID ||
        !this.data[this.index].GroupID
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
      return true;
    },
    loadsection() {
      const getTitle = axios.get(this.urlTitle, {
        signal: this.controller.signal,
      });

      const getGender = axios.get(this.urlGender, {
        signal: this.controller.signal,
      });

      const getMariedStatus = axios.get(this.urlMariedStatus, {
        signal: this.controller.signal,
      });

      const getOrganization = axios.get(this.urlOrganization, {
        signal: this.controller.signal,
      });

      const getPositionType = axios.get(this.urlPositionType, {
        signal: this.controller.signal,
      });

      const getPosition = axios.get(this.urlPosition, {
        signal: this.controller.signal,
      });

      Promise.all([
        getTitle,
        getGender,
        getMariedStatus,
        getOrganization,
        getPositionType,
        getPosition,
      ])
        .then((values) => {
          this.Title = values[0].data.rows;
          this.Gender = values[1].data.rows;
          this.MariedStatus = values[2].data.rows;
          this.Organization = values[3].data.rows;
          this.PositionType = values[4].data.rows;
          this.Position = values[5].data.rows;

          for (let i = 0; i < this.Organization.length; i++) {
            // this.Organization[i].show_id = i + 1;
            this.Organization[i].OrganizationFull =
              this.Organization[i].OrganizationCode +
              ", " +
              this.Organization[i].OrganizationName;
          }
        })
        .finally(() => {
          this.loader = true;
          // console.log(this.Title);
        });

      // ตำบล
      axios
        .get(this.urlTumbol, { signal: this.controller.signal })
        .then((response) => {
          this.Tumbol = response.data.rows.map((item) => {
            return {
              TumbolID: item.TumbolID,
              AmphurID: item.AmphurID,
              TumbolCode: item.TumbolCode,
              ProvinceID: item.ProvinceID,
              TumbolName: item.TumbolName,
              Zipcode: item.Zipcode,
              Fullname:
                item.TumbolCode.substring(0, 6) + ", " + item.TumbolName,
            };
          });
          this.TempTumbol = this.Tumbol;
        });
      // อำเภอ
      axios
        .get(this.urlAmphur, { signal: this.controller.signal })
        .then((response) => {
          this.Amphur = response.data.rows.map((item) => {
            return {
              AmphurID: item.AmphurID,
              ProvinceID: item.ProvinceID,
              AmphurCode: item.AmphurCode,
              AmphurName: item.AmphurName,
              Fullname:
                item.AmphurCode.substring(0, 4) + ", " + item.AmphurName,
            };
          });
          this.TempAmphur = this.Amphur;
        });
      // จังหวัด
      axios
        .get(this.urlProvince, { signal: this.controller.signal })
        .then((response) => {
          this.Province = response.data.rows;
        });
      // ระดับการศึกษา
      axios
        .get(this.urlEducation, { signal: this.controller.signal })
        .then((response) => {
          this.Education = response.data.rows;
        });
      // สาขา
      axios
        .get(this.urlMajor, { signal: this.controller.signal })
        .then((response) => {
          this.Major = response.data.rows;
        });
    },
    //load selection
    async load_selection() {
      axios
        .get(this.getgroup, { signal: this.controller.signal })
        .then((response) => {
          this.selection.Group.data = response.data.rows;
          this.selection.Group.data.splice(0, 0, {
            GroupID: "",
            GroupName: "ทั้งหมด",
          });
        });
      axios
        .get(this.getgroup, { signal: this.controller.signal })
        .then((response) => {
          if (this.user.GroupID != 1) {
            this.selection.Group.form = response.data.rows.filter(
              (item) => item.GroupCode != "01"
            );
          } else {
            this.selection.Group.form = response.data.rows;
          }
        });
    },
    // main load
    async load() {
      this.isLoading = true;
      let url = this.url + "?size=";
      // url += "&page=";
      // if (this.curpage) {
      //   url += this.curpage;
      // }
      if (this.filtered.User && this.filtered.StaffID == "") {
        url += "&Username=" + this.filtered.User;
      }
      if (this.filtered.Group) {
        url += "&GroupID=" + this.filtered.Group;
      }
      if (this.filtered.StaffID) {
        url += "&StaffID=" + this.filtered.StaffID;
      }
      if (this.filtered.IsApprove) {
        url += "&IsApprove=" + this.filtered.IsApprove;
      }
      if (this.filtered.isActive) {
        url += "&isActive=" + this.filtered.isActive;
      }
      if (this.sortField && this.sortOrder) {
        url += "&sortField=" + this.sortField + "&sortOrder=" + this.sortOrder;
      }
      do {
        await axios
          .get(url, { signal: this.controller.signal })
          .then((response) => {
            this.total = response.data.total;
            this.data = response.data.rows;

            // console.log(this.data);

            var c = false;
            if (this.filtered.StaffID) {
              c = true;
            }

            // function search user
            if (response.data.rows.length == 0 && c == false) {
              if (this.filtered.User) {
                axios
                  .get(
                    this.getstaff + "&StaffGivenName=" + this.filtered.User,
                    {
                      signal: this.controller.signal,
                    }
                  )
                  .then((response) => {
                    if (response.data.rows.length > 0) {
                      this.filtered.StaffID = response.data.rows[0].StaffID;
                      this.load();
                    } else {
                      axios
                        .get(
                          this.getstaff + "&StaffSurname=" + this.filtered.User,
                          {
                            signal: this.controller.signal,
                          }
                        )
                        .then((response) => {
                          if (response.data.rows.length > 0) {
                            this.filtered.StaffID =
                              response.data.rows[0].StaffID;
                            this.load();
                          }
                        });
                    }
                  });
              }
            }
            // end function search user
            if (this.curpage == 0 || this.curpage == 1) {
              for (let i = 0; i < this.data.length; i++) {
                this.data[i].show_id = i + 1;
              }
            } else {
              let start = (this.curpage - 1) * 15;
              for (let i = 0; i < this.data.length; i++) {
                this.data[i].show_id = i + 1 + start;
              }
            }
          });
      } while (!this.data);
      this.isLoading = false;
    },
    // create or update data
    add() {
      if (this.validation() == false) {
        return;
      }

      let form = {};
      form.StaffID = this.data[this.index].StaffID;
      form.Username = this.data[this.index].Username;
      form.Password = this.data[this.index].Password;
      form.IsApprove = this.data[this.index].IsApprove;
      form.isActive = this.data[this.index].isActive;
      form.AnimalTypeID = this.data[this.index].AnimalTypeID;
      form.GroupID = this.data[this.index].GroupID;
      form.Remark = this.data[this.index].Remark;

      if (
        this.data[this.index].IsApprove == 1 &&
        !this.data[this.index].ApproveDatetime
      ) {
        form.ApproveByStaffID = this.UserId;
        form.ApproveDatetime = Date.now();
      }
      form.RegisterDate = Date.now();

      if (
        this.index == this.data.length - 1 &&
        this.data[this.index].CreatedUserID == ""
      ) {
        //create data

        axios
          .post(this.url, form)
          .then(() => {
            this.close();
            this.load();
            this.$toast.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "เพิ่มข้อมูลเสร็จสิ้น",
              life: 5000,
            });
          })
          .catch((err) => {
            this.data[this.index].isActive = 1;
            this.data[this.index].IsApprove = 1;
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

        if (this.isCard == 0) {
          // Edit
          let form_staff = {};
          if (
            this.data[this.index].Staff.StaffNumber == "" ||
            this.data[this.index].Staff.StaffNumber == null
          ) {
            axios
              .get(
                "/staff/generate-staff-number?StaffID=" +
                  this.data[this.index].StaffID +
                  "&isCard=" +
                  this.data[this.index].Staff.isCard
              )
              .then((response) => {
                form_staff.StaffNumber = response.data.StaffNumber;
              });
          }

          form_staff.isCard = this.data[this.index].Staff.isCard;
          axios.put("/staff/" + this.data[this.index].StaffID, form_staff);
        }

        axios
          .put(this.url + "/" + this.data[this.index][this.id], form)
          .then(() => {
            this.close();
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
      }
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
    },
    // form open add
    async open() {
      if (this.load_form == false) {
        this.load_form = true;
        await axios
          .get(`${this.getstaff}?size=15`, { signal: this.controller.signal })
          .then((response) => {
            for (let i = 0; i < response.data.rows.length; i++) {
              response.data.rows[i].StaffGivenName =
                response.data.rows[i].StaffNumber +
                ", " +
                response.data.rows[i].StaffGivenName +
                " " +
                response.data.rows[i].StaffSurname;
            }
            this.selection.Staff.data = response.data.rows;
          });
        // console.log(this.selection.Staff.data);
        this.load_form = false;
        this.index = this.data.length;
        this.formheader = "เพิ่ม";
        this.data.push({});
        for (let i in this.data[0]) {
          this.data[this.index][i] = "";
        }
        this.data[this.index].isActive = 1;
        this.data[this.index].IsApprove = 1;
        this.display = true;
      }
    },
    //form open edit
    async edit() {
      if (this.load_form == false) {
        this.load_form = true;
        await axios
          .get(`${this.getstaff}?StaffID=${this.data[this.index].StaffID}`, {
            signal: this.controller.signal,
          })
          .then((response) => {
            this.selection.Staff.data = response.data.rows;
          });
        this.load_form = false;
        this.formheader = "แก้ไข";
        this.temp = JSON.parse(JSON.stringify(this.data[this.index]));
        this.display = true;
        this.isCard = this.data[this.index].IsApprove;
      }
    },
    close() {
      this.display = false;
    },
    open_delete() {
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
