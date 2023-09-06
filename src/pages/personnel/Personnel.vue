<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="ทะเบียนบุคลากร" :pages="breadcrumb" />
      <div class="card mb-5">
        <div v-if="loader" class="grid">
          <div class="col-12">
            <h1 class="text-xl mb-4 text-500">
              เครื่องมือช่วยค้นหาทะเบียนบุคลากร
            </h1>
          </div>
          <div class="col-12 sm:col-12 lg:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              รหัสบุคลากร</label
            >
            <InputText
              class="w-full"
              type="text"
              v-model="search.StaffNumber"
            />
          </div>
          <div class="col-12 sm:col-12 lg:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              ชื่อ</label
            >
            <InputText
              class="w-full"
              type="text"
              v-model="search.StaffGivenName"
            />
          </div>
          <div class="col-12 sm:col-12 lg:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              นามสกุล</label
            >
            <InputText
              class="w-full"
              type="text"
              v-model="search.StaffSurname"
            />
          </div>

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              เลขบัตรประจำตัวประชาชน</label
            >
            <InputMask
              class="w-full"
              mask="9-9999-99999-99-9"
              v-model="search.StaffIdentificationNumber"
            />
          </div>

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              จังหวัด</label
            >
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              optionLabel="ProvinceName"
              optionValue="ProvinceID"
              :options="Province"
              :filter="true"
              v-model="search.StaffProvinceID"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="animal_id"
              class="block text-600 text-sm font-bold mb-2"
            >
              อำเภอ</label
            >
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              optionLabel="AmphurName"
              optionValue="AmphurID"
              :options="Amphur"
              :filter="true"
              v-model="search.StaffAmphurID"
              :virtualScrollerOptions="{ itemSize: 38 }"
            />
          </div>

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              ตำบล</label
            >
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              optionLabel="TumbolName"
              optionValue="TumbolID"
              :options="Tumbol"
              :filter="true"
              v-model="search.StaffTumbolID"
              :virtualScrollerOptions="{ itemSize: 38 }"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              แสดงตั้งแต่วันที่เริ่มงาน</label
            >
            <Datepicker
              v-model="search.StaffStartDate"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="ตั้งแต่วันที่เริ่มทำงาน"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              จนถึงวันที่สิ้นสุดการทำงาน</label
            >

            <Datepicker
              v-model="search.StaffEndDate"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="จนถึงวันที่สิ้นสุดการทำงาน"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              ตำแหน่งงาน</label
            >
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="ทั้งหมด"
              :options="Position"
              optionLabel="PositionName"
              optionValue="PositionID"
              v-model="search.StaffPositionID"
              :filter="true"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-8">
            <label
              for="animal_id"
              class="block text-600 text-sm font-bold mb-2"
            >
              หน่วยงานที่สังกัด</label
            >
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="ทั้งหมด"
              :options="Organization"
              optionLabel="OrganizationName"
              optionValue="OrganizationID"
              v-model="search.StaffOrganizationID"
              :filter="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
            />
          </div>
        </div>

        <div v-else class="grid">
          <div class="col-12">
            <Skeleton width="20rem" height="2rem" class="mb-4"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12">
            <div class="grid">
              <div class="col-12">
                <Skeleton width="5rem" class="mb-2"></Skeleton>
                <Skeleton height="2rem" class="mb-2"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">ทะเบียนบุคลากร</h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button
              label="เพิ่มข้อมูล"
              icon="pi pi-plus"
              class="mb-3 mr-1 p-button-raised p-button-raised p-button-info"
              @click="open_add"
            />

            <!-- <Button
              label="ดาวน์โหลด"
              icon="pi pi-download"
              class="mb-3 p-button-raised p-button-raised p-button-success"
              @click="exportCSV($event)"
            /> -->
            <json-excel :data="json_data" style="display: inline-block" class="mb-3">
              <Button
                label="ดาวน์โหลด"
                icon="pi pi-download"
                class="p-button-raised p-button-raised p-button-success"
              />
            </json-excel>
          </div>
        </div>

        <DataTable
          class="text-sm"
          :value="data"
          :paginator="true"
          :exportable="true"
          ref="dt"
          :rowHover="true"
          :rows="10"
          :loading="isLoading"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column
            field="StaffNumber"
            header="รหัสบุคลากร"
            class="text-center cursor-pointer"
            exportFooter="&#8203;"
            :sortable="true"
          >
            <template #body="slotProps">
              <div>
                <span
                  class="text-blue-400"
                  @click="open_view(slotProps.data.StaffID)"
                  ><u>{{ slotProps.data.StaffNumber }}</u></span
                >
              </div>
            </template>
          </Column>

          <Column
            field="StaffGivenName"
            header="ชื่อ"
            class="text-center"
            :sortable="true"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="StaffSurname"
            header="นามสกุล"
            class="text-center"
            :sortable="true"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="Organization.OrganizationName"
            header="หน่วยงานที่สังกัด"
            class="text-center"
            :sortable="true"
            exportFooter="&#8203;"
          >
          </Column>
          <Column
            field="PositionType.PositionTypeName"
            header="ประเภทบุคลากร"
            class="text-center"
            :sortable="true"
            exportFooter="&#8203;"
          >
          </Column>
          <Column
            field="Position.PositionName"
            header="ตำแหน่งงาน"
            class="text-center"
            :sortable="true"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="StaffEmail"
            header="อีเมล"
            class="text-center"
            :sortable="true"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="StaffStartDateThai"
            header="วันที่เริ่มงาน"
            class="text-center"
            :sortable="true"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="StaffEndDateThai"
            header="วันที่สิ้นสุดการทำงาน"
            class="text-center"
            :sortable="true"
            exportFooter="&#8203;"
          >
          </Column>
          <Column
            field="CardStatus"
            header="สถานะบัตร"
            class="text-center"
            exportFooter="&#8203;"
          >
            <template #body="slotProps">
              <div v-if="slotProps.data.CardStatus === 'ใช้งานอยู่'">
                <Tag severity="success">{{ slotProps.data.CardStatus }}</Tag>
              </div>
              <div v-else-if="slotProps.data.CardStatus === 'ยกเลิกใช้งาน'">
                <Tag severity="danger">{{ slotProps.data.CardStatus }}</Tag>
              </div>
              <div v-else-if="slotProps.data.CardStatus === 'หมดอายุ'">
                <Tag severity="warning">{{ slotProps.data.CardStatus }}</Tag>
              </div>
              <div v-else>
                <Tag severity="primary">{{ slotProps.data.CardStatus }}</Tag>
              </div>
            </template>
          </Column>

          <Column
            header="ส่งเรื่องขอมีบัตร"
            class="text-center"
            exportFooter="&#8203;"
          >
            <template #body="slotProps">
              <div
                class="field-checkbox flex justify-content-center"
                v-if="slotProps.data.CardRequestLog"
              >
                <Checkbox
                  v-if="
                    slotProps.data.CardRequestLog.IsApprove !== 'รออนุมัติ' &&
                    slotProps.data.CardStatus != 'ยกเลิกใช้งาน'
                  "
                  :binary="true"
                  v-model="slotProps.data.IsDone"
                  @input="fillDone($event, slotProps.data.StaffID)"
                />
              </div>
              <div class="field-checkbox flex justify-content-center" v-else>
                <Checkbox
                  :binary="true"
                  v-model="slotProps.data.IsDone"
                  @input="fillDone($event, slotProps.data.StaffID)"
                />
              </div>
            </template>
          </Column>

          <Column
            header="สถานะขอมีบัตร"
            class="text-center"
            exportFooter="&#8203;"
          >
            <template #body="slotProps">
              <div v-if="slotProps.data.CardRequestLog">
                <div
                  v-if="slotProps.data.CardRequestLog.IsApprove === 'อนุมัติ'"
                >
                  <span class="text-green-500">{{
                    `${slotProps.data.CardRequestLog.IsApprove || ""}`
                  }}</span>
                </div>
                <div
                  v-else-if="
                    slotProps.data.CardRequestLog.IsApprove === 'ไม่อนุมัติ'
                  "
                >
                  <span class="text-red-500"
                    >{{ `${slotProps.data.CardRequestLog.IsApprove || ""}` }}
                    {{
                      "(" +
                      `${slotProps.data.CardRequestLog.Remark || ""}` +
                      ")"
                    }}</span
                  >
                </div>
                <div
                  v-else-if="
                    slotProps.data.CardRequestLog.IsApprove === 'รออนุมัติ'
                  "
                >
                  <span class="text-yellow-500">{{
                    `${slotProps.data.CardRequestLog.IsApprove || ""}`
                  }}</span>
                </div>
                <div v-else>
                  <span severity="primary">{{
                    `${slotProps.data.CardRequestLog.IsApprove || ""}`
                  }}</span>
                </div>
              </div>
            </template>
          </Column>

          <Column header="จัดการ" class="text-center" exportFooter="&#8203;">
            <template #body="slotProps">
              <SplitButton
                label="แก้ไข"
                icon="pi pi-pencil"
                @click="open_edit(slotProps.data.StaffID)"
                class="p-button-sm p-button-outlined p-button-warning"
                :model="getItems(slotProps.data.StaffID)"
              >
              </SplitButton>
            </template>
          </Column>
          <template #empty> ไม่พบข้อมูล </template>
          <template #loading>
            <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
          </template>
        </DataTable>
      </div>
    </div>
    <!-- end main page -->

    <!-- Start Add Dialog -->
    <Dialog
      header="เพิ่มทะเบียนบุคลากร"
      v-model:visible="display_add"
      :style="{ width: '75vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="grid">
            <div class="col-12 sm:col-12 lg:col-4 text-center">
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
                src="images/widgets/user-card.png"
              >
              </Image>

              <FileUpload
                mode="basic"
                :customUpload="true"
                @select="preview"
                accept="image/*"
                v-model="form.StaffImage"
              />
            </div>
            <div class="col-12 sm:col-12 lg:col-8 grid">
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  รหัสบุคลากร <span class="text-red-500">*</span></label
                >
                <InputText
                  type="text"
                  class="w-full"
                  v-model="form.StaffNumber"
                  :class="{ 'p-invalid': !form.StaffNumber && valid }"
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
                  placeholder="เลือกประเภทบุคลากร"
                  optionLabel="PositionTypeName"
                  optionValue="PositionTypeID"
                  v-model="form.StaffPositionTypeID"
                  :class="{ 'p-invalid': !form.StaffPositionTypeID && valid }"
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
                  placeholder="เลือกตำแหน่งงาน"
                  optionLabel="PositionName"
                  optionValue="PositionID"
                  v-model="form.StaffPositionID"
                  :class="{ 'p-invalid': !form.StaffPositionID && valid }"
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
                  placeholder="เลือกสถานะบุคลากร"
                  optionLabel="name"
                  optionValue="id"
                  v-model="form.StaffStatus"
                  :class="{ 'p-invalid': !form.StaffStatus && valid }"
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
                  placeholder="เลือกหน่วยงานที่สังกัด"
                  optionLabel="OrganizationName"
                  optionValue="OrganizationID"
                  v-model="form.StaffOrganizationID"
                  :class="{ 'p-invalid': !form.StaffOrganizationID && valid }"
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
                  v-model="form.StaffStartDate"
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
                  v-model="form.StaffEndDate"
                  id="dateRange"
                  locale="th"
                  :format="format"
                  utc
                  :class="{ 'p-invalid': !form.StaffEndDate && valid }"
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
                  v-model="form.CardStartDate"
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
                  v-model="form.CardExpireDate"
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
                  v-model="form.StaffResponsible"
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
                placeholder="เลือกคำนำหน้า"
                optionLabel="TitleName"
                optionValue="TitleID"
                v-model="form.StaffTitleID"
                :class="{ 'p-invalid': !form.StaffTitleID && valid }"
                :options="Title"
                :filter="true"
              />
            </div>
            <div class="field col-12 sm:col-5">
              <label class="block text-600 text-sm font-bold mb-2"
                >ชื่อ<span class="text-red-500"> *</span></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffGivenName"
                :class="{ 'p-invalid': !form.StaffGivenName && valid }"
              />
            </div>
            <div class="field col-12 sm:col-5">
              <label class="block text-600 text-sm font-bold mb-2">
                นามสกุล<span class="text-red-500"> *</span></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffSurname"
                :class="{ 'p-invalid': !form.StaffSurname && valid }"
              />
            </div>
            <div class="field col-12 sm:col-2">
              <label class="block text-600 text-sm font-bold mb-2"
                >เพศ<span class="text-red-500"> *</span></label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกเพศ"
                optionLabel="GenderName"
                optionValue="GenderID"
                v-model="form.StaffGenderID"
                :class="{ 'p-invalid': !form.StaffGenderID && valid }"
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
              <InputMask
                class="w-full"
                mask="9-9999-99999-99-9"
                v-model="form.StaffIdentificationNumber"
                :class="{
                  'p-invalid': !form.StaffIdentificationNumber && valid,
                }"
              />
            </div>
            <div class="field col-12 sm:col-5">
              <label class="block text-600 text-sm font-bold mb-2">
                วัน-เดือน-ปี (เกิด)</label
              >
              <Datepicker
                v-model="form.StaffBirthDate"
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
                v-model="form.StaffEmail"
                :class="{
                  'p-invalid': !form.StaffEmail && valid,
                }"
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
                v-model="form.StaffMobilePhone"
                :class="{ 'p-invalid': !form.StaffMobilePhone && valid }"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ระดับการศึกษา</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกระดับการศึกษา"
                optionLabel="EducationName"
                optionValue="EducationID"
                v-model="form.StaffEducationID"
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
                placeholder="เลือกสาขาวิชา"
                optionLabel="MajorName"
                optionValue="MajorID"
                v-model="form.StaffMajorID"
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
                v-model="form.StaffGraduatedYear"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สถานภาพการสมรส</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกสถานภาพการสมรส"
                optionLabel="MarriedStatusName"
                optionValue="MarriedStatusID"
                v-model="form.StaffMarriedStatusID"
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
                v-model="form.StaffTelephone"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขโทรสาร</label
              >
              <InputText type="text" class="w-full" v-model="form.StaffFax" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ไอดีไลน์ (ID Line)</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffIDLine"
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
                v-model="form.StaffAddress"
              />
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                หมู่ที่</label
              >
              <InputText type="text" class="w-full" v-model="form.StaffMoo" />
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อหมู่บ้าน/อาคาร</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffVillageName"
              />
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2"> ชั้น</label>
              <InputText type="text" class="w-full" v-model="form.StaffFloor" />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ถนน</label>
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffStreet"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ตรอก</label>
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffSubLane"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ซอย</label>
              <InputText type="text" class="w-full" v-model="form.StaffLane" />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จังหวัด</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกจังหวัด"
                optionLabel="ProvinceName"
                optionValue="ProvinceID"
                v-model="form.StaffProvinceID"
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
                placeholder="เลือกอำเภอ/เขต"
                optionLabel="Fullname"
                optionValue="AmphurID"
                v-model="form.StaffAmphurID"
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
                placeholder="เลือกตำบล/แขวง"
                optionLabel="Fullname"
                optionValue="TumbolID"
                v-model="form.StaffTumbolID"
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
                v-model="form.StaffZipCode"
                maxlength="5"
                minlength="5"
              />
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
              />
              <label :for="isActive.key">{{ isActive.name }}</label>
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
            class="ml-3 p-button-success w-full"
            @click="add()"
          />
        </div>
      </form>
    </Dialog>
    <!-- End Add Dialog -->

    <!-- Start EDIT Dialog -->
    <Dialog
      header="แก้ไขทะเบียนบุคลากร"
      v-model:visible="display_edit"
      :style="{ width: '75vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="grid">
            <div class="col-12 sm:col-12 lg:col-4 text-center">
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
                src="images/widgets/user-card.png"
              >
              </Image>

              <FileUpload
                mode="basic"
                :customUpload="true"
                @select="preview"
                accept="image/*"
                v-model="form.StaffImage"
              />
            </div>
            <div class="col-12 sm:col-12 lg:col-8 grid">
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  รหัสบุคลากร <span class="text-red-500">*</span></label
                >
                <InputText
                  type="text"
                  class="w-full"
                  v-model="form.StaffNumber"
                  :class="{ 'p-invalid': !form.StaffNumber && valid }"
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
                  placeholder="เลือกประเภทบุคลากร"
                  optionLabel="PositionTypeName"
                  optionValue="PositionTypeID"
                  v-model="form.StaffPositionTypeID"
                  :class="{ 'p-invalid': !form.StaffPositionTypeID && valid }"
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
                  placeholder="เลือกตำแหน่งงาน"
                  optionLabel="PositionName"
                  optionValue="PositionID"
                  v-model="form.StaffPositionID"
                  :class="{ 'p-invalid': !form.StaffPositionID && valid }"
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
                  placeholder="เลือกสถานะบุคลากร"
                  optionLabel="name"
                  optionValue="id"
                  v-model="form.StaffStatus"
                  :class="{ 'p-invalid': !form.StaffStatus && valid }"
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
                  placeholder="เลือกหน่วยงานที่สังกัด"
                  optionLabel="OrganizationName"
                  optionValue="OrganizationID"
                  v-model="form.StaffOrganizationID"
                  :class="{ 'p-invalid': !form.StaffOrganizationID && valid }"
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
                  v-model="form.StaffStartDate"
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
                  v-model="form.StaffEndDate"
                  id="dateRange"
                  locale="th"
                  :format="format"
                  utc
                  :class="{ 'p-invalid': !form.StaffEndDate && valid }"
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
                  v-model="form.CardStartDate"
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
                  v-model="form.CardExpireDate"
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
                  v-model="form.StaffResponsible"
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
                placeholder="เลือกคำนำหน้า"
                optionLabel="TitleName"
                optionValue="TitleID"
                v-model="form.StaffTitleID"
                :class="{ 'p-invalid': !form.StaffTitleID && valid }"
                :options="Title"
                :filter="true"
              />
            </div>
            <div class="field col-12 sm:col-5">
              <label class="block text-600 text-sm font-bold mb-2"
                >ชื่อ<span class="text-red-500"> *</span></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffGivenName"
                :class="{ 'p-invalid': !form.StaffGivenName && valid }"
              />
            </div>
            <div class="field col-12 sm:col-5">
              <label class="block text-600 text-sm font-bold mb-2">
                นามสกุล<span class="text-red-500"> *</span></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffSurname"
                :class="{ 'p-invalid': !form.StaffSurname && valid }"
              />
            </div>
            <div class="field col-12 sm:col-2">
              <label class="block text-600 text-sm font-bold mb-2"
                >เพศ<span class="text-red-500"> *</span></label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกเพศ"
                optionLabel="GenderName"
                optionValue="GenderID"
                v-model="form.StaffGenderID"
                :class="{ 'p-invalid': !form.StaffGenderID && valid }"
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
              <InputMask
                class="w-full"
                mask="9-9999-99999-99-9"
                v-model="form.StaffIdentificationNumber"
                :class="{
                  'p-invalid': !form.StaffIdentificationNumber && valid,
                }"
              />
            </div>
            <div class="field col-12 sm:col-5">
              <label class="block text-600 text-sm font-bold mb-2">
                วัน-เดือน-ปี (เกิด)</label
              >
              <Datepicker
                v-model="form.StaffBirthDate"
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
                v-model="form.StaffEmail"
                :class="{
                  'p-invalid': !form.StaffEmail && valid,
                }"
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
                v-model="form.StaffMobilePhone"
                :class="{ 'p-invalid': !form.StaffMobilePhone && valid }"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ระดับการศึกษา</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกระดับการศึกษา"
                optionLabel="EducationName"
                optionValue="EducationID"
                v-model="form.StaffEducationID"
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
                placeholder="เลือกสาขาวิชา"
                optionLabel="MajorName"
                optionValue="MajorID"
                v-model="form.StaffMajorID"
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
                v-model="form.StaffGraduatedYear"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สถานภาพการสมรส</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกสถานภาพการสมรส"
                optionLabel="MarriedStatusName"
                optionValue="MarriedStatusID"
                v-model="form.StaffMarriedStatusID"
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
                v-model="form.StaffTelephone"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขโทรสาร</label
              >
              <InputText type="text" class="w-full" v-model="form.StaffFax" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ไอดีไลน์ (ID Line)</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffIDLine"
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
                v-model="form.StaffAddress"
              />
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                หมู่ที่</label
              >
              <InputText type="text" class="w-full" v-model="form.StaffMoo" />
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อหมู่บ้าน/อาคาร</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffVillageName"
              />
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2"> ชั้น</label>
              <InputText type="text" class="w-full" v-model="form.StaffFloor" />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ถนน</label>
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffStreet"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ตรอก</label>
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffSubLane"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ซอย</label>
              <InputText type="text" class="w-full" v-model="form.StaffLane" />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จังหวัด</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกจังหวัด"
                optionLabel="ProvinceName"
                optionValue="ProvinceID"
                v-model="form.StaffProvinceID"
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
                placeholder="เลือกอำเภอ/เขต"
                optionLabel="Fullname"
                optionValue="AmphurID"
                v-model="form.StaffAmphurID"
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
                placeholder="เลือกตำบล/แขวง"
                optionLabel="Fullname"
                optionValue="TumbolID"
                v-model="form.StaffTumbolID"
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
                v-model="form.StaffZipCode"
                maxlength="5"
                minlength="5"
              />
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
              />
              <label :for="isActive.key">{{ isActive.name }}</label>
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
            <div class="col-12 sm:col-12 lg:col-4 text-center">
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
                src="images/widgets/user-card.png"
              >
              </Image>

              <FileUpload
                mode="basic"
                :customUpload="true"
                @select="preview"
                accept="image/*"
                v-model="form.StaffImage"
              />
            </div>
            <div class="col-12 sm:col-12 lg:col-8 grid">
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  รหัสบุคลากร <span class="text-red-500">*</span></label
                >
                <InputText
                  type="text"
                  class="w-full"
                  v-model="form.StaffNumber"
                  :class="{ 'p-invalid': !form.StaffNumber && valid }"
                  disabled
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
                  placeholder="เลือกประเภทบุคลากร"
                  optionLabel="PositionTypeName"
                  optionValue="PositionTypeID"
                  v-model="form.StaffPositionTypeID"
                  :class="{ 'p-invalid': !form.StaffPositionTypeID && valid }"
                  :options="PositionType"
                  :filter="true"
                  disabled
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
                  placeholder="เลือกตำแหน่งงาน"
                  optionLabel="PositionName"
                  optionValue="PositionID"
                  v-model="form.StaffPositionID"
                  :class="{ 'p-invalid': !form.StaffPositionID && valid }"
                  :options="Position"
                  :filter="true"
                  disabled
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
                  placeholder="เลือกสถานะบุคลากร"
                  optionLabel="name"
                  optionValue="id"
                  v-model="form.StaffStatus"
                  :class="{ 'p-invalid': !form.StaffStatus && valid }"
                  :options="StatusAlive"
                  :filter="true"
                  disabled
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
                  placeholder="เลือกหน่วยงานที่สังกัด"
                  optionLabel="OrganizationName"
                  optionValue="OrganizationID"
                  v-model="form.StaffOrganizationID"
                  :class="{ 'p-invalid': !form.StaffOrganizationID && valid }"
                  :virtualScrollerOptions="{ itemSize: 38 }"
                  :options="Organization"
                  :filter="true"
                  disabled
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
                  v-model="form.StaffStartDate"
                  id="dateRange"
                  locale="th"
                  :format="format"
                  utc
                  :enableTimePicker="false"
                  cancelText="ยกเลิก"
                  selectText="ยืนยัน"
                  placeholder="วันที่เริ่มงาน"
                  disabled
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
                  v-model="form.StaffEndDate"
                  id="dateRange"
                  locale="th"
                  :format="format"
                  utc
                  :class="{ 'p-invalid': !form.StaffEndDate && valid }"
                  :enableTimePicker="false"
                  cancelText="ยกเลิก"
                  selectText="ยืนยัน"
                  placeholder="วันที่สิ้นสุดการทำงาน"
                  disabled
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
                  v-model="form.CardStartDate"
                  id="dateRange"
                  locale="th"
                  :format="format"
                  utc
                  :enableTimePicker="false"
                  cancelText="ยกเลิก"
                  selectText="ยืนยัน"
                  placeholder="วันที่ออกบัตร"
                  disabled
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
                  v-model="form.CardExpireDate"
                  id="dateRange"
                  locale="th"
                  :format="format"
                  utc
                  :enableTimePicker="false"
                  cancelText="ยกเลิก"
                  selectText="ยืนยัน"
                  placeholder="วันที่บัตรหมดอายุ"
                  disabled
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
                  v-model="form.StaffResponsible"
                  disabled
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
                placeholder="เลือกคำนำหน้า"
                optionLabel="TitleName"
                optionValue="TitleID"
                v-model="form.StaffTitleID"
                :class="{ 'p-invalid': !form.StaffTitleID && valid }"
                :options="Title"
                :filter="true"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-5">
              <label class="block text-600 text-sm font-bold mb-2"
                >ชื่อ<span class="text-red-500"> *</span></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffGivenName"
                :class="{ 'p-invalid': !form.StaffGivenName && valid }"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-5">
              <label class="block text-600 text-sm font-bold mb-2">
                นามสกุล<span class="text-red-500"> *</span></label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffSurname"
                :class="{ 'p-invalid': !form.StaffSurname && valid }"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-2">
              <label class="block text-600 text-sm font-bold mb-2"
                >เพศ<span class="text-red-500"> *</span></label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกเพศ"
                optionLabel="GenderName"
                optionValue="GenderID"
                v-model="form.StaffGenderID"
                :class="{ 'p-invalid': !form.StaffGenderID && valid }"
                :options="Gender"
                :filter="true"
                disabled
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
                v-model="form.StaffIdentificationNumberTemp"
                disabled
                :class="{
                  'p-invalid': !form.StaffIdentificationNumberTemp && valid,
                }"
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
                v-model="form.StaffBirthDate"
                id="dateRange"
                locale="th"
                :format="format"
                utc
                :maxDate="new Date()"
                :enableTimePicker="false"
                cancelText="ยกเลิก"
                selectText="ยืนยัน"
                placeholder="วัน-เดือน-ปี (เกิด)"
                disabled
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
                v-model="form.StaffEmail"
                disabled
                :class="{
                  'p-invalid': !form.StaffEmail && valid,
                }"
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
                v-model="form.StaffMobilePhone"
                disabled
                :class="{ 'p-invalid': !form.StaffMobilePhone && valid }"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ระดับการศึกษา</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกระดับการศึกษา"
                optionLabel="EducationName"
                optionValue="EducationID"
                v-model="form.StaffEducationID"
                :options="Education"
                :filter="true"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สาขาวิชา</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกสาขาวิชา"
                optionLabel="MajorName"
                optionValue="MajorID"
                v-model="form.StaffMajorID"
                :options="Major"
                :filter="true"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปีที่สำเร็จการศึกษา</label
              >
              <InputText
                type="number"
                class="w-full"
                v-model="form.StaffGraduatedYear"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สถานภาพการสมรส</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกสถานภาพการสมรส"
                optionLabel="MarriedStatusName"
                optionValue="MarriedStatusID"
                v-model="form.StaffMarriedStatusID"
                :options="MariedStatus"
                :filter="true"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เบอร์โทรศัพท์</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffTelephone"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขโทรสาร</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffFax"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ไอดีไลน์ (ID Line)</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffIDLine"
                disabled
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
                v-model="form.StaffAddress"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                หมู่ที่</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffMoo"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อหมู่บ้าน/อาคาร</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffVillageName"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2"> ชั้น</label>
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffFloor"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ถนน</label>
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffStreet"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ตรอก</label>
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffSubLane"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ซอย</label>
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffLane"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จังหวัด</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกจังหวัด"
                optionLabel="ProvinceName"
                optionValue="ProvinceID"
                v-model="form.StaffProvinceID"
                :options="Province"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                อำเภอ/เขต</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกอำเภอ/เขต"
                optionLabel="Fullname"
                optionValue="AmphurID"
                v-model="form.StaffAmphurID"
                :options="Amphur"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำบล/แขวง</label
              >
              <Dropdown
                class="w-full"
                placeholder="เลือกตำบล/แขวง"
                optionLabel="Fullname"
                optionValue="TumbolID"
                v-model="form.StaffTumbolID"
                :options="Tumbol"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
                @change="filterZipcode($event)"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสไปรษณีย์</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.StaffZipCode"
                maxlength="5"
                minlength="5"
                disabled
              />
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
                disabled
              />
              <label :for="isActive.key">{{ isActive.name }}</label>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
    <!-- End View Dialog -->

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
    <!-- End Delete Dialog -->
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { mapGetters } from "vuex";
import JsonExcel from "vue-json-excel3";
export default {
  components: {
    PageTitle,
    JsonExcel,
  },
  computed: {
    ...mapGetters({
      user: "user",
      permission: "get_permission",
    }),
  },
  data() {
    return {
      url: "/staff",
      urlTitle: "/title?isActive=1",
      urlGender: "/gender?isActive=1",
      urlMariedStatus: "/married-status?isActive=1",
      urlOrganization: "/organization?isActive=1",
      urlPositionType: "/position-type?isActive=1",
      urlPosition: "/position?isActive=1",
      urlTumbol: "/tumbol?isActive=1",
      urlAmphur: "/amphur?isActive=1",
      urlProvince: "/province?isActive=1&includeAll=false",
      urlEducation:
        "/education?isActive=1&orderByField=EducationCode&orderBy=asc",
      urlMajor: "/major?isActive=1",
      apiRequest: "/card-request-log",
      breadcrumb: [
        { label: "หน้าหลัก", to: "/" },
        { label: "ทะเบียนบุคลากร", to: "/agency/all" },
      ],

      path: null,

      // load
      data: [],
      json_data: [],
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

      isLoading: false,

      loader: false,
      // form
      valid: false,
      form: {
        isActive: "",
      },

      search: {
        StaffNumber: "",
        StaffGivenName: "",
        StaffSurname: "",
        StaffIdentificationNumber: "",
        StaffOrganizationID: "",
        StaffPositionID: "",
        StaffProvinceID: "",
        StaffAmphurID: "",
        StaffTumbolID: "",
        StaffStartDate: "",
        StaffEndDate: "",
      },

      filtered: {
        StaffNumber: "",
        StaffGivenName: "",
        StaffSurname: "",
        StaffIdentificationNumber: "",
        StaffOrganizationID: "",
        StaffPositionID: "",
        StaffProvinceID: "",
        StaffAmphurID: "",
        StaffTumbolID: "",
        StaffStartDate: "",
        StaffEndDate: "",
      },

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

      permit: null,

      //  cancel requests
      controller: new AbortController(),

      // Modal
      display_add: false,
      display_edit: false,
      display_view: false,
      display_delete: false,
    };
  },
  mounted() {
    this.form.isActive = this.status[0];
    this.permit = this.permission.filter((item) => {
      return item.MenuID == 25;
    });

    if (this.permit[0].IsPreview == 0) {
      this.$toast.add({
        severity: "error",
        summary: "ล้มเหลว",
        detail: "ไม่มีสิทธิ์ดูข้อมูล",
        life: 5000,
      });
      return;
    } else {
      this.load();
      this.loadsection();
    }

    // if (localStorage.getItem("staffID") !== null) {
    //   this.getItems(localStorage.getItem("staffID"));
    //   this.open_edit(localStorage.getItem("staffID"));
    // }
  },
  watch: {
    "form.StaffTitleID"(val) {
      // console.log(val);

      // ชาย 1 หญิง 2
      // นาย
      if (val == 3) {
        this.form.StaffGenderID = 1;
        // console.log(11);
      } else if (val == 4) {
        this.form.StaffGenderID = 2;
      } else if (val == 5) {
        this.form.StaffGenderID = 2;
      }
    },

    "form.StaffProvinceID"(val) {
      if (val) {
        this.Amphur = this.TempAmphur;
        this.Amphur = this.Amphur.filter((item) => item.ProvinceID == val);
      } else {
        this.Amphur = this.TempAmphur;
      }
    },

    "form.StaffAmphurID"(val) {
      if (val) {
        this.Tumbol = this.TempTumbol;
        this.Tumbol = this.Tumbol.filter((item) => item.AmphurID == val);
      } else {
        this.Tumbol = this.TempTumbol;
      }
    },

    "search.StaffNumber"(val) {
      this.filtered.StaffNumber = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.StaffGivenName"(val) {
      this.filtered.StaffGivenName = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.StaffSurname"(val) {
      this.filtered.StaffSurname = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.StaffIdentificationNumber"(val) {
      this.filtered.StaffIdentificationNumber = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.StaffOrganizationID"(val) {
      this.filtered.StaffOrganizationID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.StaffPositionID"(val) {
      this.filtered.StaffPositionID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.StaffProvinceID"(val) {
      this.filtered.StaffProvinceID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.StaffAmphurID"(val) {
      this.filtered.StaffAmphurID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.StaffTumbolID"(val) {
      this.filtered.StaffTumbolID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.StaffStartDate"(val) {
      // แปลงเป็น 2022-02-02
      let date = JSON.stringify(val);
      this.filtered.StaffStartDate = date.slice(1, 11);

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.StaffEndDate"(val) {
      // แปลงเป็น 2022-02-02
      let date = JSON.stringify(val);
      this.filtered.StaffEndDate = date.slice(1, 11);

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "form.CardStartDate"(val) {
      if (this.form.StaffPositionTypeID && val) {
        // กรณีเป็นตำแหน่งราชการให้หมดอายุ auto 5 ปี
        if (this.form.StaffPositionTypeID == 1) {
          const date1 = dayjs(val);
          this.form.CardExpireDate = date1.add(5, "year");
        } else if (this.form.StaffPositionTypeID == 2) {
          const date1 = dayjs(val);
          this.form.CardExpireDate = date1.add(3, "year");
        } else if (this.form.StaffPositionTypeID == 3) {
          const date1 = dayjs(val);
          this.form.CardExpireDate = date1.add(3, "year");
        }
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
    clear() {
      this.form = {
        isActive: this.status[0],
      };
      this.path = null;
      this.valid = false;
    },
    chkDigitPid(p_iPID) {
      var total = 0;
      var iPID;
      var chk;
      var Validchk;
      iPID = p_iPID.replace(/-/g, "");
      Validchk = iPID.substr(12, 1);
      var j = 0;
      var pidcut;
      for (var n = 0; n < 12; n++) {
        pidcut = parseInt(iPID.substr(j, 1));
        total = total + pidcut * (13 - n);
        j++;
      }

      chk = 11 - (total % 11);

      if (chk == 10) {
        chk = 0;
      } else if (chk == 11) {
        chk = 1;
      }
      if (chk == Validchk) {
        // alert("ระบุหมายเลขประจำตัวประชาชนถูกต้อง");

        return true;
      } else {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "กรุณาระบุหมายเลขประจำตัวประชาชนให้ถูกต้อง",
          life: 5000,
        });
        // alert("ระบุหมายเลขประจำตัวประชาชนไม่ถูกต้อง");
        return false;
      }
    },
    validation() {
      if (
        !this.form.StaffNumber ||
        !this.form.StaffIdentificationNumber ||
        !this.form.StaffTitleID ||
        !this.form.StaffGivenName ||
        !this.form.StaffSurname ||
        !this.form.StaffGenderID ||
        !this.form.StaffOrganizationID ||
        !this.form.StaffPositionTypeID ||
        !this.form.StaffPositionID ||
        !this.form.StaffStartDate ||
        !this.form.StaffStatus ||
        !this.form.StaffEmail ||
        !this.form.StaffMobilePhone
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
      let url = this.url + "?size=";
      if (this.filtered.StaffNumber) {
        url += "&StaffNumber=" + this.filtered.StaffNumber;
      }
      if (this.filtered.StaffGivenName) {
        url += "&StaffGivenName=" + this.filtered.StaffGivenName;
      }
      if (this.filtered.StaffSurname) {
        url += "&StaffSurname=" + this.filtered.StaffSurname;
      }
      if (this.filtered.StaffIdentificationNumber) {
        url +=
          "&StaffIdentificationNumber=" +
          this.filtered.StaffIdentificationNumber;
      }
      if (this.filtered.StaffOrganizationID) {
        url += "&StaffOrganizationID=" + this.filtered.StaffOrganizationID;
      }
      if (this.filtered.StaffPositionID) {
        url += "&StaffPositionID=" + this.filtered.StaffPositionID;
      }
      if (this.filtered.StaffProvinceID) {
        url += "&StaffProvinceID=" + this.filtered.StaffProvinceID;
      }
      if (this.filtered.StaffAmphurID) {
        url += "&StaffAmphurID=" + this.filtered.StaffAmphurID;
      }
      if (this.filtered.StaffTumbolID) {
        url += "&StaffTumbolID=" + this.filtered.StaffTumbolID;
      }
      if (this.filtered.StaffStartDate) {
        url += "&StaffStartDate=" + this.filtered.StaffStartDate;
      }
      if (this.filtered.StaffEndDate) {
        url += "&StaffEndDate=" + this.filtered.StaffEndDate;
      }
      axios
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.total = response.data.total;
          this.data = response.data.rows;

          dayjs.extend(buddhistEra);
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].show_id = i + 1;

            if (this.data[i].StaffStartDate != null) {
              this.data[i].StaffStartDateThai = dayjs(
                this.data[i].StaffStartDate
              )
                .add(543, "year")
                .format("DD/MM/YYYY");
            }

            if (this.data[i].StaffEndDate != null) {
              this.data[i].StaffEndDateThai = dayjs(this.data[i].StaffEndDate)
                .add(543, "year")
                .format("DD/MM/YYYY");
            }
          }


          this.json_data = this.data;
        })
        .finally(() => {
          this.isLoading = false;
          if (localStorage.getItem("staffID") !== null) {
            this.open_edit(localStorage.getItem("staffID"));
            localStorage.removeItem("staffID");
          }
        });
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
    add() {
      // validation
      if (this.validation() == false) {
        return;
      }

      if (!this.chkDigitPid(this.form.StaffIdentificationNumber)) {
        // console.log(1111);
        return false;
      } else {
        // console.log(2222);
      }

      // change data
      this.form.isActive = this.form.isActive.value;
      let formData = new FormData();
      formData.append("photo_url", this.form.StaffImages);

      if (this.form.StaffIdentificationNumber) {
        this.form.StaffIdentificationNumber =
          this.form.StaffIdentificationNumber.replaceAll("-", "");
      }
      if (this.form.StaffMobilePhone) {
        this.form.StaffMobilePhone = this.form.StaffMobilePhone.replaceAll(
          "-",
          ""
        );
      }

      // ใช้ Debug ดูข้อมูลใน formData
      // for (let [key, value] of formData) {
      //   console.log(`${key}: ${value}`);
      // }

      // post
      axios
        .post(this.url, this.form)
        .then((res) => {
          // ในกรณีที่สามารถเพิ่มข้อมูลได้ ให้เพิ่มรูปต่อ

          if (this.form.StaffImages !== undefined) {
            this.uploadPhoto(res.data.StaffID, formData);
          }

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
    async update() {
      // validation
      if (this.validation() == false) {
        return;
      }

      let formData = new FormData();
      formData.append("photo_url", this.form.StaffImages);

      if (this.form.StaffIdentificationNumber) {
        this.form.StaffIdentificationNumber =
          this.form.StaffIdentificationNumber.replaceAll("-", "");
      }
      if (this.form.StaffMobilePhone) {
        this.form.StaffMobilePhone = this.form.StaffMobilePhone.replaceAll(
          "-",
          ""
        );
      }

      // change data
      this.form.isActive = this.form.isActive.value;
      axios
        .put(this.url + "/" + this.form.StaffID, this.form)
        .then(() => {
          this.load();
          this.close_edit();

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

      // เช็คว่ามีรูปมั้ย
      if (this.form.StaffImages !== undefined) {
        this.uploadPhoto(this.form.StaffID, formData);
      }
    },

    async uploadPhoto(id, formData) {
      await axios
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
      if (this.permit[0].IsAdd == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์เพิ่มข้อมูล",
          life: 5000,
        });
        return;
      } else {
        this.clear();

        this.form.StaffStatus = "ปฏิบัติงานอยู่";
        this.form.StaffOrganizationID = this.user.Staff.StaffOrganizationID;

        this.display_add = true;
      }
    },
    close_add() {
      this.display_add = false;
    },
    open_edit(id) {
      console.log(id);
      id = this.data.find((x) => x.StaffID == id);
      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      if (id.StaffStatus == "ปฏิบัติงานอยู่") {
        id.StaffStatus = "ปฏิบัติงานอยู่";
      } else if (id.StaffStatus == "เกษียณ") {
        id.StaffStatus = "เกษียณ";
      } else if (id.StaffStatus == "ลาออก") {
        id.StaffStatus = "ลาออก";
      }

      this.path = id.StaffImage;
      this.form = {
        StaffID: id.StaffID,
        StaffNumber: id.StaffNumber,
        StaffIdentificationNumber: id.StaffIdentificationNumber,
        StaffTitleID: id.StaffTitleID,
        StaffGivenName: id.StaffGivenName,
        StaffSurname: id.StaffSurname,
        StaffGenderID: id.StaffGenderID,
        StaffBirthDate: id.StaffBirthDate,
        StaffMarriedStatusID: id.StaffMarriedStatusID,
        StaffOrganizationID: id.StaffOrganizationID,
        StaffPositionTypeID: id.StaffPositionTypeID,
        StaffPositionID: id.StaffPositionID,
        StaffResponsible: id.StaffResponsible,
        StaffStartDate: id.StaffStartDate,
        StaffEndDate: id.StaffEndDate,
        StaffAddress: id.StaffAddress,
        StaffMoo: id.StaffMoo,
        StaffVillageName: id.StaffVillageName,
        StaffFloor: id.StaffFloor,
        StaffStreet: id.StaffStreet,
        StaffSubLane: id.StaffSubLane,
        StaffLane: id.StaffLane,
        StaffTumbolID: id.StaffTumbolID,
        StaffAmphurID: id.StaffAmphurID,
        StaffProvinceID: id.StaffProvinceID,
        StaffZipCode: id.StaffZipCode,
        StaffEmail: id.StaffEmail,
        StaffTelephone: id.StaffTelephone,
        StaffMobilePhone: id.StaffMobilePhone,
        StaffFax: id.StaffFax,
        StaffIDLine: id.StaffIDLine,
        StaffEducationID: id.StaffEducationID,
        StaffMajorID: id.StaffMajorID,
        StaffGraduatedYear: id.StaffGraduatedYear,
        StaffImage: id.StaffImage,
        CardStartDate: id.CardStartDate,
        CardExpireDate: id.CardExpireDate,
        StaffStatus: id.StaffStatus,
        show_id: id.show_id,
        isActive: id.isActive,
      };

      if (this.permit[0].IsUpdate == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์แก้ไขข้อมูล",
          life: 5000,
        });
        return;
      } else {
        this.display_edit = true;
      }
    },
    close_edit() {
      this.display_edit = false;
    },
    open_delete(id, show_id) {
      this.form.id = id;
      this.form.show_id = show_id;

      if (this.permit[0].IsDelete == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์ลบข้อมูล",
          life: 5000,
        });
        return;
      } else {
        this.display_delete = true;
      }
    },
    close_delete() {
      this.display_delete = false;
    },
    open_view(id) {
      id = this.data.find((x) => x.StaffID == id);
      if (id.isActive == 0) {
        id.isActive = this.status[1];
      } else if (id.isActive == 1) {
        id.isActive = this.status[0];
      }

      if (id.StaffStatus == "ปฏิบัติงานอยู่") {
        id.StaffStatus = "ปฏิบัติงานอยู่";
      } else if (id.StaffStatus == "เกษียณ") {
        id.StaffStatus = "เกษียณ";
      } else if (id.StaffStatus == "ลาออก") {
        id.StaffStatus = "เกษียณ";
      }

      this.path = id.StaffImage;
      this.form = {
        StaffID: id.StaffID,
        StaffNumber: id.StaffNumber,
        StaffIdentificationNumber: id.StaffIdentificationNumber,
        StaffTitleID: id.StaffTitleID,
        StaffGivenName: id.StaffGivenName,
        StaffSurname: id.StaffSurname,
        StaffGenderID: id.StaffGenderID,
        StaffBirthDate: id.StaffBirthDate,
        StaffMarriedStatusID: id.StaffMarriedStatusID,
        StaffOrganizationID: id.StaffOrganizationID,
        StaffPositionTypeID: id.StaffPositionTypeID,
        StaffPositionID: id.StaffPositionID,
        StaffResponsible: id.StaffResponsible,
        StaffStartDate: id.StaffStartDate,
        StaffEndDate: id.StaffEndDate,
        StaffAddress: id.StaffAddress,
        StaffMoo: id.StaffMoo,
        StaffVillageName: id.StaffVillageName,
        StaffFloor: id.StaffFloor,
        StaffStreet: id.StaffStreet,
        StaffSubLane: id.StaffSubLane,
        StaffLane: id.StaffLane,
        StaffTumbolID: id.StaffTumbolID,
        StaffAmphurID: id.StaffAmphurID,
        StaffProvinceID: id.StaffProvinceID,
        StaffZipCode: id.StaffZipCode,
        StaffEmail: id.StaffEmail,
        StaffTelephone: id.StaffTelephone,
        StaffMobilePhone: id.StaffMobilePhone,
        StaffFax: id.StaffFax,
        StaffIDLine: id.StaffIDLine,
        StaffEducationID: id.StaffEducationID,
        StaffMajorID: id.StaffMajorID,
        StaffGraduatedYear: id.StaffGraduatedYear,
        StaffImage: id.StaffImage,
        CardStartDate: id.CardStartDate,
        CardExpireDate: id.CardExpireDate,
        StaffStatus: id.StaffStatus,
        CreatedUserID: id.CreatedUserID,
        createdAt: id.createdAt,
        UpdatedUserID: id.UpdatedUserID,
        updatedAt: id.updatedAt,
        show_id: id.show_id,
        isActive: id.isActive,
      };

      this.form.StaffIdentificationNumberTemp =
        this.form.StaffIdentificationNumber.replace(/.{0,4}$/, "") + "XXXX";
      this.display_view = true;
    },
    close_view() {
      this.display_view = false;
    },
    preview(e) {
      const file = e.files[0];
      this.path = URL.createObjectURL(file);
      this.form.StaffImages = file;
    },
    filterZipcode($event) {
      let val = $event.value;
      if (val) {
        this.form.StaffZipCode = this.TempTumbol[val].Zipcode;
      } else {
        this.form.StaffZipCode = "";
      }
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    fillDone($event, $id) {
      let data = this.data.find((x) => x.StaffID == $id);
      var today = new Date();
      let form = {
        RequestDate: today,
        StaffID: data.StaffID,
        CardStartDate: data.CardStartDate,
        CardExpireDate: data.CardExpireDate,
      };
      axios
        .post(this.apiRequest, form)
        .then(() => {
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });
          this.load();
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
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
