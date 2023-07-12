<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="จัดการโครงการ" :pages="breadcrumb" />

      <div class="card">
        <h1 class="text-xl mb-4 text-500">เครื่องมือช่วยค้นหาโครงการ</h1>
        <div class="grid">
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="codeNumber"
              class="block text-600 text-sm font-bold mb-2"
            >
              รหัสโครงการ</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <InputText
                type="text"
                :showClear="true"
                class="w-full"
                id="codeNumber"
                v-model="search.ProjectCode"
              />
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="projectName"
              class="block text-600 text-sm font-bold mb-2"
            >
              ชื่อโครงการ</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <InputText
                type="text"
                :showClear="true"
                class="w-full"
                id="projectName"
                v-model="search.ProjectName"
              />
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedScheme"
              class="block text-600 text-sm font-bold mb-2"
            >
              ระดับของโครงการ
            </label>
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              id="selectedScheme"
              placeholder="ทั้งหมด"
              :options="project_level"
              optionLabel="name"
              v-model="search.ProjectLevel"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedScheme"
              class="block text-600 text-sm font-bold mb-2"
            >
              สถานะโครงการ</label
            >
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              id="selectedScheme"
              placeholder="ทั้งหมด"
              :options="stage"
              optionLabel="name"
              v-model="search.isActive"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              แสดงตั้งแต่วันที่</label
            >
            <Calendar
              class="w-full"
              :showClear="true"
              v-model="search.StartDate"
              placeholder="ตั้งแต่วันที่เริ่มโครงการ"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              แสดงจนถึงวันที่</label
            >
            <Calendar
              class="w-full"
              :showClear="true"
              v-model="search.EndDate"
              placeholder="จนถึงวันที่สิ้นสุดโครงการ"
            />
          </div>
        </div>
      </div>
      <div class="mt-5 card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">รายการโครงการทั้งหมด</h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button
              @click="open_add"
              label="เพิ่มข้อมูล"
              icon="pi pi-plus"
              class="p-button-primary"
            />
          </div>
        </div>
        <DataTable
          class="text-sm"
          :value="data"
          :paginator="true"
          :rows="10"
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
          <Column
            field="ProjectCode"
            header="รหัสโครงการ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ProjectName"
            header="ชื่อโครงการ (ภาษาไทย)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ProjectNameEN"
            header="ชื่อโครงการ (ภาษาอังกฤษ)"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="StartDate"
            header="วันที่เริ่มโครงการ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="EndDate"
            header="วันที่สิ้นสุดโครงการ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Organization.OrganizationName"
            header="หน่วยงานเจ้าภาพ"
            class="text-center"
            :sortable="true"
          >
          </Column>
          <Column header="ชนิดสัตว์" class="text-center">
            <template #body="slotProp">
              <span v-for="item in slotProp.data.AnimalTypes" :key="item.id">
                {{ item }} {{}}
              </span>
            </template>
          </Column>

          <Column
            field="IsExtend"
            header="โครงการต่อเนื่อง"
            :sortable="true"
            class="text-center"
          >
            <template #body="slotProps">
              <div
                v-if="
                  slotProps.data.isActive == 1 ||
                  slotProps.data.isActive == status[0]
                "
              >
                <Tag class="w-full" severity="info">ขยาย</Tag>
              </div>
              <div v-else>
                <Tag class="w-full" severity="warning">ไม่ขยาย</Tag>
              </div>
            </template>
          </Column>

          <Column field="isActive" header="สถานะ" class="text-center">
            <template #body="slotProps">
              <div
                v-if="
                  slotProps.data.isActive == 1 ||
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
              <SplitButton
                label="แก้ไข"
                icon="pi pi-pencil"
                @click="open_edit(slotProps.data.ProjectID)"
                class="p-button-sm p-button-outlined p-button-warning"
                :model="getItems(slotProps.data.ProjectID)"
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
                รหัสโครงการ</label
              >
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.ProjectCode && valid }"
                v-model="form.ProjectCode"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโครงการ (ภาษาไทย)</label
              >
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.ProjectName && valid }"
                v-model="form.ProjectName"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโครงการ (ภาษาอังกฤษ)</label
              >
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.ProjectNameEN && valid }"
                v-model="form.ProjectNameEN"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่เริ่มโครงการ</label
              >
              <Calendar
                class="w-full"
                placeholder="วันที่เริ่มโครงการ"
                :showButtonBar="true"
                :showIcon="true"
                v-model="form.StartDate"
                :class="{ 'p-invalid': !form.StartDate && valid }"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่สิ้นสุดโครงการ</label
              >
              <Calendar
                class="w-full"
                placeholder="วันที่สิ้นสุดโครงการ"
                :showButtonBar="true"
                :showIcon="true"
                v-model="form.EndDate"
                :class="{ 'p-invalid': !form.EndDate && valid }"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                หน่วยงานเจ้าภาพ</label
              >
              <Dropdown
                class="w-full"
                :options="organization"
                optionLabel="OrganizationName"
                optionValue="OrganizationID"
                placeholder="เลือกหน่วยงานเจ้าภาพ"
                v-model="form.OrganizationID"
                :class="{ 'p-invalid': !form.OrganizationID && valid }"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ระดับของโครงการ</label
              >
              <Dropdown
                class="w-full"
                :options="project_level"
                optionLabel="name"
                placeholder="เลือกระดับของโครงการ"
                v-model="form.ProjectLevel"
                :class="{ 'p-invalid': !form.ProjectLevel && valid }"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชนิดสัตว์</label
              >
              <MultiSelect
                class="w-full"
                :options="animal"
                optionLabel="AnimalTypeName"
                optionValue="AnimalTypeID"
                placeholder="เลือกชนิดสัตว์"
                display="chip"
                v-model="form.AnimalTypeID"
                :class="{ 'p-invalid': !form.AnimalTypeID && valid }"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                โครงการต่อเนื่อง</label
              >
              <Dropdown
                class="w-full"
                :options="extend"
                optionLabel="name"
                placeholder="เลือกโครงการต่อเนื่อง"
                v-model="form.IsExtend"
                :class="{ 'p-invalid': !form.IsExtend && valid }"
              />
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
                />
                <label :for="isActive.key">{{ isActive.name }}</label>
              </div>
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
                รหัสโครงการ</label
              >
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.ProjectCode && valid }"
                v-model="form.ProjectCode"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโครงการ (ภาษาไทย)</label
              >
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.ProjectName && valid }"
                v-model="form.ProjectName"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโครงการ (ภาษาอังกฤษ)</label
              >
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.ProjectNameEN && valid }"
                v-model="form.ProjectNameEN"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่เริ่มโครงการ</label
              >
              <Calendar
                class="w-full"
                placeholder="วันที่เริ่มโครงการ"
                :showButtonBar="true"
                :showIcon="true"
                v-model="form.StartDate"
                :class="{ 'p-invalid': !form.StartDate && valid }"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่สิ้นสุดโครงการ</label
              >
              <Calendar
                class="w-full"
                placeholder="วันที่สิ้นสุดโครงการ"
                :showButtonBar="true"
                :showIcon="true"
                v-model="form.EndDate"
                :class="{ 'p-invalid': !form.EndDate && valid }"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                หน่วยงานเจ้าภาพ</label
              >
              <Dropdown
                class="w-full"
                :options="organization"
                optionLabel="OrganizationName"
                optionValue="OrganizationID"
                placeholder="เลือกหน่วยงานเจ้าภาพ"
                v-model="form.OrganizationID"
                :class="{ 'p-invalid': !form.OrganizationID && valid }"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ระดับของโครงการ</label
              >
              <Dropdown
                class="w-full"
                :options="project_level"
                optionLabel="name"
                placeholder="เลือกระดับของโครงการ"
                v-model="form.ProjectLevel"
                :class="{ 'p-invalid': !form.ProjectLevel && valid }"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชนิดสัตว์</label
              >

              <!-- <Dropdown
                class="w-full"
                :options="animal"
                optionLabel="AnimalTypeName"
                optionValue="AnimalTypeID"
                placeholder="เลือกชนิดสัตว์"
                v-model="form.AnimalTypeID"
                :class="{ 'p-invalid': !form.AnimalTypeID && valid }"
              /> -->
              <MultiSelect
                class="w-full"
                :options="animal"
                optionLabel="AnimalTypeName"
                optionValue="AnimalTypeID"
                placeholder="เลือกชนิดสัตว์"
                display="chip"
                v-model="form.AnimalTypeID"
                :class="{ 'p-invalid': !form.AnimalTypeID && valid }"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                โครงการต่อเนื่อง</label
              >
              <Dropdown
                class="w-full"
                :options="extend"
                optionLabel="name"
                placeholder="เลือกโครงการต่อเนื่อง"
                v-model="form.IsExtend"
                :class="{ 'p-invalid': !form.IsExtend && valid }"
              />
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
                />
                <label :for="isActive.key">{{ isActive.name }}</label>
              </div>
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
      header="รายละเอียดโครงการ"
      v-model:visible="display_view"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสโครงการ</label
              >
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.ProjectCode && valid }"
                v-model="form.ProjectCode"
                :readonly="true"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโครงการ (ภาษาไทย)</label
              >
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.ProjectName && valid }"
                v-model="form.ProjectName"
                :readonly="true"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโครงการ (ภาษาอังกฤษ)</label
              >
              <InputText
                type="text"
                class="w-full"
                :class="{ 'p-invalid': !form.ProjectNameEN && valid }"
                v-model="form.ProjectNameEN"
                :readonly="true"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่เริ่มโครงการ</label
              >
              <Calendar
                class="w-full"
                placeholder="วันที่เริ่มโครงการ"
                :showButtonBar="true"
                :showIcon="true"
                v-model="form.StartDate"
                :readonly="true"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่สิ้นสุดโครงการ</label
              >
              <Calendar
                class="w-full"
                placeholder="วันที่สิ้นสุดโครงการ"
                :showButtonBar="true"
                :showIcon="true"
                v-model="form.EndDate"
                :readonly="true"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                หน่วยงานเจ้าภาพ</label
              >
              <Dropdown
                class="w-full"
                :options="organization"
                optionLabel="OrganizationName"
                optionValue="OrganizationID"
                placeholder="เลือกหน่วยงานเจ้าภาพ"
                v-model="form.OrganizationID"
                :readonly="true"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ระดับของโครงการ</label
              >
              <Dropdown
                class="w-full"
                :options="project_level"
                optionLabel="name"
                placeholder="เลือกระดับของโครงการ"
                v-model="form.ProjectLevel"
                :readonly="true"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชนิดสัตว์</label
              >
              <MultiSelect
                class="w-full"
                :options="animal"
                optionLabel="AnimalTypeName"
                optionValue="AnimalTypeID"
                placeholder="เลือกชนิดสัตว์"
                display="chip"
                v-model="form.AnimalTypeID"
                :readonly="true"
              />
            </div>
            <div class="field col-12 sm:col-12 md:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                โครงการต่อเนื่อง</label
              >
              <Dropdown
                class="w-full"
                :options="extend"
                optionLabel="name"
                placeholder="เลือกโครงการต่อเนื่อง"
                v-model="form.IsExtend"
                :readonly="true"
              />
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
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="close_view()"
          />
        </div>
      </form>
      <template #footer></template>
    </Dialog>
    <!-- End View Dialog -->
  </div>
</template>

<script>
import axios from "axios";

import PageTitle from "@/components/PageTitle.vue";
import dayjs from "dayjs";
import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      url: "/project",
      urlAnimalType: "/animal-type",
      urlOrganization: "/organization",
      breadcrumb: [
        { label: "ระบบโครงการ", to: "/project/all" },
        { label: "ข้อมูลพื้นฐานข้อมูลการ", to: "" },
      ],
      items: [],
      // load
      data: [],
      animal: [],
      isLoading: false,
      // form
      valid: false,
      form: {
        ProjectID: "",
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
          id: 0,
          name: "ทั้งหมด",
        },
        {
          id: "ANIMAL",
          name: "สัตว์",
        },
        {
          id: "AI",
          name: "ผสมเทียม",
        },
        {
          id: "FARM",
          name: "ฟาร์ม",
        },
      ],
      extend: [
        {
          id: 1,
          name: "ขยาย",
        },
        {
          id: 0,
          name: "ไม่ขยาย",
        },
      ],
      stage: [
        {
          id: 0,
          name: "ทั้งหมด",
        },
        {
          id: "1",
          name: "เปิดใช้งาน",
        },
        {
          id: "0",
          name: "ปิดใช้งาน",
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
      search: {
        ProjectCode: "",
        ProjectName: "",
        ProjectLevel: "",
        isActive: "",
        StartDate: "",
        EndDate: "",
      },
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
      .get(this.urlAnimalType, {
        signal: this.controller.signal,
      })
      .then((response) => {
        this.animal = response.data.rows;
      });

    // ประเภทหน่วยงาน
    axios
      .get(this.urlOrganization, {
        signal: this.controller.signal,
      })
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
    validation() {
      if (
        !this.form.ProjectCode ||
        !this.form.ProjectName ||
        !this.form.StartDate ||
        !this.form.AnimalTypeID ||
        !this.form.ProjectLevel ||
        !this.form.IsExtend
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

            if (this.data[i].StartDate != null) {
              this.data[i].StartDate = dayjs(this.data[i].StartDate)
                .locale(locale)
                .format("DD MMM BB");
            }
            if (this.data[i].EndDate != null) {
              this.data[i].EndDate = dayjs(this.data[i].EndDate)
                .locale(locale)
                .format("DD MMM BB");
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    add() {
      // validation
      // if (this.validation() == false) {
      //   return;
      // }
      // change data
      this.form.isActive = this.form.isActive.value;
      this.form.ProjectLevel = this.form.ProjectLevel.id;
      this.form.IsExtend = this.form.IsExtend.id;

      // console.log(this.form.AnimalTypeID);
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

      this.form.isActive = this.form.isActive.value;
      this.form.ProjectLevel = this.form.ProjectLevel.id;
      this.form.IsExtend = this.form.IsExtend.id;

      axios
        .put(this.url + "/" + this.form.ProjectID, this.form)
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
      this.display_add = true;
    },
    close_add() {
      this.display_add = false;
    },
    open_edit(id) {
      id = this.data.find((x) => x.ProjectID == id);
      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      if (id.IsExtend == 0) {
        id.IsExtend = this.extend[1];
      } else if (id.IsExtend == 1) {
        id.IsExtend = this.extend[0];
      }

      if (id.ProjectLevel == "ANIMAL") {
        id.ProjectLevel = this.project_level[0];
      } else if (id.ProjectLevel == "AI") {
        id.ProjectLevel = this.project_level[1];
      } else {
        id.ProjectLevel = this.project_level[2];
      }
      this.form = {
        ProjectID: id.ProjectID,
        ProjectCode: id.ProjectCode,
        ProjectName: id.ProjectName,
        ProjectNameEN: id.ProjectNameEN,
        StartDate: id.StartDate,
        EndDate: id.EndDate,
        OrganizationID: id.OrganizationID,
        AnimalTypeID: id.AnimalTypeID,
        IsExtend: id.IsExtend,
        ProjectLevel: id.ProjectLevel,
        AnimalTypes: id.AnimalTypes,
        show_id: id.show_id,
        isActive: id.isActive,
      };

      // console.log(this.form);
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
      id = this.data.find((x) => x.ProjectID == id);
      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      if (id.IsExtend == 0) {
        id.IsExtend = this.extend[1];
      } else if (id.IsExtend == 1) {
        id.IsExtend = this.extend[0];
      }

      if (id.ProjectLevel == "ANIMAL") {
        id.ProjectLevel = this.project_level[0];
      } else if (id.ProjectLevel == "AI") {
        id.ProjectLevel = this.project_level[1];
      } else {
        id.ProjectLevel = this.project_level[2];
      }
      this.form = {
        ProjectID: id.ProjectID,
        ProjectCode: id.ProjectCode,
        ProjectName: id.ProjectName,
        ProjectNameEN: id.ProjectNameEN,
        StartDate: id.StartDate,
        EndDate: id.EndDate,
        OrganizationID: id.OrganizationID,
        AnimalTypeID: id.AnimalTypeID,
        IsExtend: id.IsExtend,
        ProjectLevel: id.ProjectLevel,
        AnimalTypes: id.AnimalTypes,
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
