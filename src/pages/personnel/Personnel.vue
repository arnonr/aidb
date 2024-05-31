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

                    <div class="col-12 sm:col-6 lg:col-6">
                        <label
                            for="AIZoneID"
                            class="block text-600 text-sm font-bold mb-2"
                        >
                            ศูนย์วิจัย</label
                        >
                        <Dropdown
                            class="w-full"
                            v-model="search.AIZoneID"
                            :options="dropdown.AIZones"
                            optionLabel="AIZoneName"
                            optionValue="AIZoneID"
                            :disabled="isSelectAIZoneDisabled"
                            :filter="true"
                            :showClear="true"
                            placeholder="-- โปรดเลือกศูนย์วิจัย --"
                        >
                        </Dropdown>
                    </div>

                    <div class="col-12 sm:col-6 lg:col-6">
                        <label
                            for="searchOrganizationZoneID"
                            class="block text-600 text-sm font-bold mb-2"
                        >
                            เขตพื้นที่ปศุสัตว์</label
                        >
                        <Dropdown
                            class="w-full"
                            v-model="search.OrganizationZoneID"
                            :options="dropdown.OrganizationZones"
                            optionLabel="OrganizationZoneName"
                            optionValue="OrganizationZoneID"
                            :disabled="isSelectOrganizationZoneDisabled"
                            :filter="true"
                            :showClear="true"
                            placeholder="-- เลือกเขตพื้นที่ปศุสัตว์ --"
                        >
                        </Dropdown>
                    </div>

                    <div class="col-12 sm:col-6 lg:col-4">
                        <label
                            for="searchProvinceID"
                            class="block text-600 text-sm font-bold mb-2"
                        >
                            จังหวัด</label
                        >
                        <Dropdown
                            class="w-full"
                            v-model="search.StaffProvinceID"
                            :options="dropdown.Provinces"
                            optionLabel="ProvinceName"
                            optionValue="ProvinceID"
                            :filter="true"
                            :showClear="true"
                            placeholder="ทั้งหมด"
                        >
                        </Dropdown>
                    </div>

                    <div class="col-12 sm:col-6 lg:col-4">
                        <label
                            for="searchAmphurID"
                            class="block text-600 text-sm font-bold mb-2"
                        >
                            อำเภอ</label
                        >
                        <Dropdown
                            class="w-full"
                            v-model="search.StaffAmphurID"
                            :options="dropdown.Amphurs"
                            optionLabel="AmphurName"
                            optionValue="AmphurID"
                            :filter="true"
                            :showClear="true"
                            placeholder="ทั้งหมด"
                        >
                        </Dropdown>
                    </div>

                    <div class="col-12 sm:col-6 lg:col-4">
                        <label
                            for="searchTumbolID"
                            class="block text-600 text-sm font-bold mb-2"
                        >
                            ตำบล</label
                        >
                        <Dropdown
                            class="w-full"
                            v-model="search.StaffTumbolID"
                            :options="dropdown.Tumbols"
                            optionLabel="TumbolName"
                            optionValue="TumbolID"
                            :filter="true"
                            :showClear="true"
                            placeholder="ทั้งหมด"
                        >
                        </Dropdown>
                    </div>

                    <div class="col-12 sm:col-12 lg:col-12">
                        <label
                            for="searchTumbolID"
                            class="block text-600 text-sm font-bold mb-2"
                        >
                            หน่วยงาน</label
                        >

                        <Dropdown
                            class="w-full"
                            v-model="search.StaffOrganizationID"
                            :options="dropdown.Organizations"
                            optionLabel="OrganizationName"
                            optionValue="OrganizationID"
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            :filter="true"
                            :showClear="true"
                            placeholder="ทั้งหมด"
                            :virtualScrollerOptions="{ itemSize: 38 }"
                        />
                    </div>

                    <div class="col-12 sm:col-6 lg:col-4">
                        <label
                            for="searchTumbolID"
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

                    <div class="col-12 sm:col-6 lg:col-4">
                        <label
                            for="searchTumbolID"
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

                    <div class="col-12 sm:col-6 lg:col-4">
                        <label
                            for="searchTumbolID"
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
                            for="searchTumbolID"
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
                            for="searchAmphurID"
                            class="block text-600 text-sm font-bold mb-2"
                        >
                            สถานะบุคลากร</label
                        >
                        <Dropdown
                            class="w-full"
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            v-model="search.StaffStatus"
                            :options="dropdown.StatusAlives"
                            optionLabel="name"
                            optionValue="id"
                            :filter="true"
                            :showClear="true"
                            placeholder="ทั้งหมด"
                        >
                        </Dropdown>
                    </div>

                    <div class="col-12 sm:col-12 lg:col-12">
                        <Button
                            @click="onSearch"
                            label="ค้นหา"
                            icon=""
                            style="width: 100%"
                            class="mr-2 mb-3"
                        />
                    </div>

                    <!-- <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="searchTumbolID"
              class="block text-600 text-sm font-bold mb-2"
            >
              นามสกุล</label
            >
            <InputText
              class="w-full"
              type="text"
              v-model="search.StaffSurname"
            />
          </div> -->

                    <!--  -->
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

                        <Button
                            @click="onExport()"
                            label="ดาวน์โหลด"
                            icon="pi pi-download"
                            class="mb-3 p-button-raised p-button-raised p-button-success"
                        />
                    </div>
                </div>

                <DataTable
                    class="text-sm"
                    :value="data"
                    :exportable="true"
                    ref="dt"
                    :rowHover="true"
                    :loading="isLoading"
                    :paginator="true"
                    v-model:rows="params.size"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    :rowsPerPageOptions="[10, 20, 50]"
                    responsiveLayout="scroll"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    :totalRecords="table.total"
                    @page="load"
                    @sort="sort($event)"
                    lazy
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
                                    @click="open_detail(slotProps.data.StaffID)"
                                    ><u>{{
                                        slotProps.data.StaffNumber
                                    }}</u></span
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
                            <div
                                v-if="
                                    slotProps.data.CardStatus === 'ใช้งานอยู่'
                                "
                            >
                                <Tag severity="success">{{
                                    slotProps.data.CardStatus
                                }}</Tag>
                            </div>
                            <div
                                v-else-if="
                                    slotProps.data.CardStatus === 'ยกเลิกใช้งาน'
                                "
                            >
                                <Tag severity="danger">{{
                                    slotProps.data.CardStatus
                                }}</Tag>
                            </div>
                            <div
                                v-else-if="
                                    slotProps.data.CardStatus === 'หมดอายุ'
                                "
                            >
                                <Tag severity="warning">{{
                                    slotProps.data.CardStatus
                                }}</Tag>
                            </div>
                            <div v-else>
                                <Tag severity="primary">{{
                                    slotProps.data.CardStatus
                                }}</Tag>
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
                                        slotProps.data.CardRequestLog
                                            .IsApprove !== 'รออนุมัติ' &&
                                        slotProps.data.CardStatus !=
                                            'ยกเลิกใช้งาน'
                                    "
                                    :binary="true"
                                    v-model="slotProps.data.IsDone"
                                    @input="
                                        fillDone($event, slotProps.data.StaffID)
                                    "
                                />
                            </div>
                            <div
                                class="field-checkbox flex justify-content-center"
                                v-else
                            >
                                <Checkbox
                                    :binary="true"
                                    v-model="slotProps.data.IsDone"
                                    @input="
                                        fillDone($event, slotProps.data.StaffID)
                                    "
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
                                    v-if="
                                        slotProps.data.CardRequestLog
                                            .IsApprove === 'อนุมัติ'
                                    "
                                >
                                    <span class="text-green-500">{{
                                        `${
                                            slotProps.data.CardRequestLog
                                                .IsApprove || ""
                                        }`
                                    }}</span>
                                </div>
                                <div
                                    v-else-if="
                                        slotProps.data.CardRequestLog
                                            .IsApprove === 'ไม่อนุมัติ'
                                    "
                                >
                                    <span class="text-red-500"
                                        >{{
                                            `${
                                                slotProps.data.CardRequestLog
                                                    .IsApprove || ""
                                            }`
                                        }}
                                        {{
                                            "(" +
                                            `${
                                                slotProps.data.CardRequestLog
                                                    .Remark || ""
                                            }` +
                                            ")"
                                        }}</span
                                    >
                                </div>
                                <div
                                    v-else-if="
                                        slotProps.data.CardRequestLog
                                            .IsApprove === 'รออนุมัติ'
                                    "
                                >
                                    <span class="text-yellow-500">{{
                                        `${
                                            slotProps.data.CardRequestLog
                                                .IsApprove || ""
                                        }`
                                    }}</span>
                                </div>
                                <div v-else>
                                    <span severity="primary">{{
                                        `${
                                            slotProps.data.CardRequestLog
                                                .IsApprove || ""
                                        }`
                                    }}</span>
                                </div>
                            </div>
                        </template>
                    </Column>

                    <Column
                        header="จัดการ"
                        class="text-center"
                        exportFooter="&#8203;"
                    >
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
                        <h1 class="text-white text-center">
                            กรุณารอสักครู่...
                        </h1>
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
                                <label
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    รหัสบุคลากร
                                    <span class="text-red-500">*</span></label
                                >
                                <InputText
                                    type="text"
                                    class="w-full"
                                    v-model="form.StaffNumber"
                                    :class="{
                                        'p-invalid': !form.StaffNumber && valid,
                                    }"
                                />
                            </div>

                            <div class="field col-12 sm:col-6">
                                <label
                                    for="selectedUnit"
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    ประเภทบุคลากร<span class="text-red-500">
                                        *</span
                                    ></label
                                >
                                <Dropdown
                                    class="w-full"
                                    placeholder="เลือกประเภทบุคลากร"
                                    optionLabel="PositionTypeName"
                                    optionValue="PositionTypeID"
                                    v-model="form.StaffPositionTypeID"
                                    :class="{
                                        'p-invalid':
                                            !form.StaffPositionTypeID && valid,
                                    }"
                                    :options="dropdown.PositionTypes"
                                    :filter="true"
                                />
                            </div>

                            <div class="field col-12 sm:col-6">
                                <label
                                    for="selectedUnit"
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    ตำแหน่งงาน<span class="text-red-500">
                                        *</span
                                    ></label
                                >
                                <Dropdown
                                    class="w-full"
                                    placeholder="เลือกตำแหน่งงาน"
                                    optionLabel="PositionName"
                                    optionValue="PositionID"
                                    v-model="form.StaffPositionID"
                                    :class="{
                                        'p-invalid':
                                            !form.StaffPositionID && valid,
                                    }"
                                    :options="dropdown.Positions"
                                    :filter="true"
                                />
                            </div>
                            <div class="field col-12 sm:col-6">
                                <label
                                    for="selectedUnit"
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    สถานะบุคลากร<span class="text-red-500">
                                        *</span
                                    ></label
                                >
                                <Dropdown
                                    class="w-full"
                                    placeholder="เลือกสถานะบุคลากร"
                                    optionLabel="name"
                                    optionValue="id"
                                    v-model="form.StaffStatus"
                                    :class="{
                                        'p-invalid': !form.StaffStatus && valid,
                                    }"
                                    :options="dropdown.StatusAlives"
                                    :filter="true"
                                />
                            </div>

                            <div class="field col-12 sm:col-12">
                                <label
                                    for="selectedUnit"
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    หน่วยงานที่สังกัด
                                    <span class="text-red-500">*</span></label
                                >
                                <Dropdown
                                    class="w-full"
                                    placeholder="เลือกหน่วยงานที่สังกัด"
                                    optionLabel="OrganizationName"
                                    optionValue="OrganizationID"
                                    v-model="form.StaffOrganizationID"
                                    :class="{
                                        'p-invalid':
                                            !form.StaffOrganizationID && valid,
                                    }"
                                    :virtualScrollerOptions="{ itemSize: 38 }"
                                    :options="dropdown.Organizations1"
                                    :filter="true"
                                />
                            </div>

                            <div class="field col-12 sm:col-6">
                                <label
                                    for="selectedUnit"
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    วันที่เริ่มงาน<span class="text-red-500">
                                        *</span
                                    ></label
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
                                    :class="{
                                        'p-invalid':
                                            !form.StaffEndDate && valid,
                                    }"
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                คำนำหน้า<span class="text-red-500">
                                    *</span
                                ></label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกคำนำหน้า"
                                optionLabel="TitleName"
                                optionValue="TitleID"
                                v-model="form.StaffTitleID"
                                :class="{
                                    'p-invalid': !form.StaffTitleID && valid,
                                }"
                                :options="dropdown.Titles"
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
                                :class="{
                                    'p-invalid': !form.StaffGivenName && valid,
                                }"
                            />
                        </div>
                        <div class="field col-12 sm:col-5">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                นามสกุล<span class="text-red-500">
                                    *</span
                                ></label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffSurname"
                                :class="{
                                    'p-invalid': !form.StaffSurname && valid,
                                }"
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
                                :class="{
                                    'p-invalid': !form.StaffGenderID && valid,
                                }"
                                :options="dropdown.Genders"
                                :filter="true"
                            />
                        </div>

                        <div class="field col-12 sm:col-5">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                เลขบัตรประจำตัวประชาชน<span
                                    class="text-red-500"
                                >
                                    *</span
                                ></label
                            >
                            <InputMask
                                class="w-full"
                                mask="9-9999-99999-99-9"
                                v-model="form.StaffIdentificationNumber"
                                :class="{
                                    'p-invalid':
                                        !form.StaffIdentificationNumber &&
                                        valid,
                                }"
                            />
                        </div>
                        <div class="field col-12 sm:col-5">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                เบอร์โทรศัพท์ (มือถือ)<span
                                    class="text-red-500"
                                >
                                    *</span
                                ></label
                            >
                            <InputMask
                                class="w-full"
                                mask="999-999-9999"
                                v-model="form.StaffMobilePhone"
                                :class="{
                                    'p-invalid':
                                        !form.StaffMobilePhone && valid,
                                }"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ระดับการศึกษา</label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกระดับการศึกษา"
                                optionLabel="EducationName"
                                optionValue="EducationID"
                                v-model="form.StaffEducationID"
                                :options="dropdown.Educations"
                                :filter="true"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                สาขาวิชา</label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกสาขาวิชา"
                                optionLabel="MajorName"
                                optionValue="MajorID"
                                v-model="form.StaffMajorID"
                                :options="dropdown.Majors"
                                :filter="true"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ปีที่สำเร็จการศึกษา</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.StaffGraduatedYear"
                            />
                        </div>

                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                สถานภาพการสมรส</label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกสถานภาพการสมรส"
                                optionLabel="MarriedStatusName"
                                optionValue="MarriedStatusID"
                                v-model="form.StaffMarriedStatusID"
                                :options="dropdown.MariedStatuses"
                                :filter="true"
                            />
                        </div>

                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                เบอร์โทรศัพท์</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffTelephone"
                            />
                        </div>

                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                หมายเลขโทรสาร</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffFax"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                เลขที่บ้าน</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffAddress"
                            />
                        </div>
                        <div class="field col-12 sm:col-3">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                หมู่ที่</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffMoo"
                            />
                        </div>
                        <div class="field col-12 sm:col-3">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ชื่อหมู่บ้าน/อาคาร</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffVillageName"
                            />
                        </div>
                        <div class="field col-12 sm:col-3">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ชั้น</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffFloor"
                            />
                        </div>

                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ถนน</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffStreet"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ตรอก</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffSubLane"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ซอย</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffLane"
                            />
                        </div>

                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                จังหวัด</label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกจังหวัด"
                                optionLabel="ProvinceName"
                                optionValue="ProvinceID"
                                v-model="form.StaffProvinceID"
                                :options="dropdown.Provinces1"
                                :filter="true"
                                :virtualScrollerOptions="{ itemSize: 38 }"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                อำเภอ/เขต</label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกอำเภอ/เขต"
                                optionLabel="AmphurName"
                                optionValue="AmphurID"
                                v-model="form.StaffAmphurID"
                                :options="dropdown.Amphurs1"
                                :filter="true"
                                :virtualScrollerOptions="{ itemSize: 38 }"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ตำบล/แขวง</label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกตำบล/แขวง"
                                optionLabel="TumbolName"
                                optionValue="TumbolID"
                                v-model="form.StaffTumbolID"
                                :options="dropdown.Tumbols1"
                                :filter="true"
                                :virtualScrollerOptions="{ itemSize: 38 }"
                                @change="filterZipcode($event)"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label :for="isActive.key">{{
                                isActive.name
                            }}</label>
                        </div>
                    </div>
                </div>
                <div
                    class="col-12 text-center mt-5 flex justify-content-between"
                >
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
                                <label
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    รหัสบุคลากร
                                    <span class="text-red-500">*</span></label
                                >
                                <InputText
                                    type="text"
                                    class="w-full"
                                    v-model="form.StaffNumber"
                                    :class="{
                                        'p-invalid': !form.StaffNumber && valid,
                                    }"
                                />
                            </div>

                            <div class="field col-12 sm:col-6">
                                <label
                                    for="selectedUnit"
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    ประเภทบุคลากร<span class="text-red-500">
                                        *</span
                                    ></label
                                >
                                <Dropdown
                                    class="w-full"
                                    placeholder="เลือกประเภทบุคลากร"
                                    optionLabel="PositionTypeName"
                                    optionValue="PositionTypeID"
                                    v-model="form.StaffPositionTypeID"
                                    :class="{
                                        'p-invalid':
                                            !form.StaffPositionTypeID && valid,
                                    }"
                                    :options="dropdown.PositionTypes"
                                    :filter="true"
                                />
                            </div>

                            <div class="field col-12 sm:col-6">
                                <label
                                    for="selectedUnit"
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    ตำแหน่งงาน<span class="text-red-500">
                                        *</span
                                    ></label
                                >
                                <Dropdown
                                    class="w-full"
                                    placeholder="เลือกตำแหน่งงาน"
                                    optionLabel="PositionName"
                                    optionValue="PositionID"
                                    v-model="form.StaffPositionID"
                                    :class="{
                                        'p-invalid':
                                            !form.StaffPositionID && valid,
                                    }"
                                    :options="dropdown.Positions"
                                    :filter="true"
                                />
                            </div>
                            <div class="field col-12 sm:col-6">
                                <label
                                    for="selectedUnit"
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    สถานะบุคลากร<span class="text-red-500">
                                        *</span
                                    ></label
                                >
                                <Dropdown
                                    class="w-full"
                                    placeholder="เลือกสถานะบุคลากร"
                                    optionLabel="name"
                                    optionValue="id"
                                    v-model="form.StaffStatus"
                                    :class="{
                                        'p-invalid': !form.StaffStatus && valid,
                                    }"
                                    :options="dropdown.StatusAlives"
                                    :filter="true"
                                />
                            </div>

                            <div class="field col-12 sm:col-12">
                                <label
                                    for="selectedUnit"
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    หน่วยงานที่สังกัด
                                    <span class="text-red-500">*</span></label
                                >
                                <Dropdown
                                    class="w-full"
                                    placeholder="เลือกหน่วยงานที่สังกัด"
                                    optionLabel="OrganizationName"
                                    optionValue="OrganizationID"
                                    v-model="form.StaffOrganizationID"
                                    :class="{
                                        'p-invalid':
                                            !form.StaffOrganizationID && valid,
                                    }"
                                    :virtualScrollerOptions="{ itemSize: 38 }"
                                    :options="dropdown.Organizations1"
                                    :filter="true"
                                />
                            </div>

                            <div class="field col-12 sm:col-6">
                                <label
                                    for="selectedUnit"
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    วันที่เริ่มงาน<span class="text-red-500">
                                        *</span
                                    ></label
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
                                    :class="{
                                        'p-invalid':
                                            !form.StaffEndDate && valid,
                                    }"
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                คำนำหน้า<span class="text-red-500">
                                    *</span
                                ></label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกคำนำหน้า"
                                optionLabel="TitleName"
                                optionValue="TitleID"
                                v-model="form.StaffTitleID"
                                :class="{
                                    'p-invalid': !form.StaffTitleID && valid,
                                }"
                                :options="dropdown.Titles"
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
                                :class="{
                                    'p-invalid': !form.StaffGivenName && valid,
                                }"
                            />
                        </div>
                        <div class="field col-12 sm:col-5">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                นามสกุล<span class="text-red-500">
                                    *</span
                                ></label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffSurname"
                                :class="{
                                    'p-invalid': !form.StaffSurname && valid,
                                }"
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
                                :class="{
                                    'p-invalid': !form.StaffGenderID && valid,
                                }"
                                :options="dropdown.Genders"
                                :filter="true"
                            />
                        </div>

                        <div class="field col-12 sm:col-5">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                เลขบัตรประจำตัวประชาชน<span
                                    class="text-red-500"
                                >
                                    *</span
                                ></label
                            >
                            <InputMask
                                class="w-full"
                                mask="9-9999-99999-99-9"
                                v-model="form.StaffIdentificationNumber"
                                :class="{
                                    'p-invalid':
                                        !form.StaffIdentificationNumber &&
                                        valid,
                                }"
                            />
                        </div>
                        <div class="field col-12 sm:col-5">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                เบอร์โทรศัพท์ (มือถือ)<span
                                    class="text-red-500"
                                >
                                    *</span
                                ></label
                            >
                            <InputMask
                                class="w-full"
                                mask="999-999-9999"
                                v-model="form.StaffMobilePhone"
                                :class="{
                                    'p-invalid':
                                        !form.StaffMobilePhone && valid,
                                }"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ระดับการศึกษา</label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกระดับการศึกษา"
                                optionLabel="EducationName"
                                optionValue="EducationID"
                                v-model="form.StaffEducationID"
                                :options="dropdown.Educations"
                                :filter="true"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                สาขาวิชา</label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกสาขาวิชา"
                                optionLabel="MajorName"
                                optionValue="MajorID"
                                v-model="form.StaffMajorID"
                                :options="dropdown.Majors"
                                :filter="true"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ปีที่สำเร็จการศึกษา</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.StaffGraduatedYear"
                            />
                        </div>

                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                สถานภาพการสมรส</label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกสถานภาพการสมรส"
                                optionLabel="MarriedStatusName"
                                optionValue="MarriedStatusID"
                                v-model="form.StaffMarriedStatusID"
                                :options="dropdown.MariedStatuses"
                                :filter="true"
                            />
                        </div>

                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                เบอร์โทรศัพท์</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffTelephone"
                            />
                        </div>

                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                หมายเลขโทรสาร</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffFax"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                เลขที่บ้าน</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffAddress"
                            />
                        </div>
                        <div class="field col-12 sm:col-3">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                หมู่ที่</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffMoo"
                            />
                        </div>
                        <div class="field col-12 sm:col-3">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ชื่อหมู่บ้าน/อาคาร</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffVillageName"
                            />
                        </div>
                        <div class="field col-12 sm:col-3">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ชั้น</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffFloor"
                            />
                        </div>

                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ถนน</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffStreet"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ตรอก</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffSubLane"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ซอย</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffLane"
                            />
                        </div>

                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                จังหวัด</label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกจังหวัด"
                                optionLabel="ProvinceName"
                                optionValue="ProvinceID"
                                v-model="form.StaffProvinceID"
                                :options="dropdown.Provinces1"
                                :filter="true"
                                :virtualScrollerOptions="{ itemSize: 38 }"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                อำเภอ/เขต</label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกอำเภอ/เขต"
                                optionLabel="AmphurName"
                                optionValue="AmphurID"
                                v-model="form.StaffAmphurID"
                                :options="dropdown.Amphurs1"
                                :filter="true"
                                :virtualScrollerOptions="{ itemSize: 38 }"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ตำบล/แขวง</label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกตำบล/แขวง"
                                optionLabel="TumbolName"
                                optionValue="TumbolID"
                                v-model="form.StaffTumbolID"
                                :options="dropdown.Tumbols1"
                                :filter="true"
                                :virtualScrollerOptions="{ itemSize: 38 }"
                                @change="filterZipcode($event)"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label :for="isActive.key">{{
                                isActive.name
                            }}</label>
                        </div>
                    </div>
                </div>
                <div
                    class="col-12 text-center mt-5 flex justify-content-between"
                >
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
                                <label
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    รหัสบุคลากร
                                    <span class="text-red-500">*</span></label
                                >
                                <InputText
                                    type="text"
                                    class="w-full"
                                    v-model="form.StaffNumber"
                                    :class="{
                                        'p-invalid': !form.StaffNumber && valid,
                                    }"
                                    disabled
                                />
                            </div>

                            <div class="field col-12 sm:col-6">
                                <label
                                    for="selectedUnit"
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    ประเภทบุคลากร<span class="text-red-500">
                                        *</span
                                    ></label
                                >
                                <Dropdown
                                    class="w-full"
                                    placeholder="เลือกประเภทบุคลากร"
                                    optionLabel="PositionTypeName"
                                    optionValue="PositionTypeID"
                                    v-model="form.StaffPositionTypeID"
                                    :class="{
                                        'p-invalid':
                                            !form.StaffPositionTypeID && valid,
                                    }"
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
                                    ตำแหน่งงาน<span class="text-red-500">
                                        *</span
                                    ></label
                                >
                                <Dropdown
                                    class="w-full"
                                    placeholder="เลือกตำแหน่งงาน"
                                    optionLabel="PositionName"
                                    optionValue="PositionID"
                                    v-model="form.StaffPositionID"
                                    :class="{
                                        'p-invalid':
                                            !form.StaffPositionID && valid,
                                    }"
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
                                    สถานะบุคลากร<span class="text-red-500">
                                        *</span
                                    ></label
                                >
                                <Dropdown
                                    class="w-full"
                                    placeholder="เลือกสถานะบุคลากร"
                                    optionLabel="name"
                                    optionValue="name"
                                    v-model="form.StaffStatus"
                                    :class="{
                                        'p-invalid': !form.StaffStatus && valid,
                                    }"
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
                                    หน่วยงานที่สังกัด
                                    <span class="text-red-500">*</span></label
                                >
                                <Dropdown
                                    class="w-full"
                                    placeholder="เลือกหน่วยงานที่สังกัด"
                                    optionLabel="OrganizationName"
                                    optionValue="OrganizationID"
                                    v-model="form.StaffOrganizationID"
                                    :class="{
                                        'p-invalid':
                                            !form.StaffOrganizationID && valid,
                                    }"
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
                                    วันที่เริ่มงาน<span class="text-red-500">
                                        *</span
                                    ></label
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
                                    :class="{
                                        'p-invalid':
                                            !form.StaffEndDate && valid,
                                    }"
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                คำนำหน้า<span class="text-red-500">
                                    *</span
                                ></label
                            >
                            <Dropdown
                                class="w-full"
                                placeholder="เลือกคำนำหน้า"
                                optionLabel="TitleName"
                                optionValue="TitleID"
                                v-model="form.StaffTitleID"
                                :class="{
                                    'p-invalid': !form.StaffTitleID && valid,
                                }"
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
                                :class="{
                                    'p-invalid': !form.StaffGivenName && valid,
                                }"
                                disabled
                            />
                        </div>
                        <div class="field col-12 sm:col-5">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                นามสกุล<span class="text-red-500">
                                    *</span
                                ></label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffSurname"
                                :class="{
                                    'p-invalid': !form.StaffSurname && valid,
                                }"
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
                                :class="{
                                    'p-invalid': !form.StaffGenderID && valid,
                                }"
                                :options="Gender"
                                :filter="true"
                                disabled
                            />
                        </div>

                        <div class="field col-12 sm:col-5">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                เลขบัตรประจำตัวประชาชน<span
                                    class="text-red-500"
                                >
                                    *</span
                                ></label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffIdentificationNumberTemp"
                                disabled
                                :class="{
                                    'p-invalid':
                                        !form.StaffIdentificationNumberTemp &&
                                        valid,
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                เบอร์โทรศัพท์ (มือถือ)<span
                                    class="text-red-500"
                                >
                                    *</span
                                ></label
                            >
                            <InputMask
                                class="w-full"
                                mask="999-999-9999"
                                v-model="form.StaffMobilePhone"
                                disabled
                                :class="{
                                    'p-invalid':
                                        !form.StaffMobilePhone && valid,
                                }"
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ชั้น</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffFloor"
                                disabled
                            />
                        </div>

                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ถนน</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffStreet"
                                disabled
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ตรอก</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffSubLane"
                                disabled
                            />
                        </div>
                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ซอย</label
                            >
                            <InputText
                                type="text"
                                class="w-full"
                                v-model="form.StaffLane"
                                disabled
                            />
                        </div>

                        <div class="field col-12 sm:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
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
                            <label :for="isActive.key">{{
                                isActive.name
                            }}</label>
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
// import store from "@/service/Vuex";
import { mapGetters } from "vuex";

// import ExcelJS from "exceljs";

import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
// import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
// import { format } from "date-fns";
// import { th } from "date-fns/locale";

export default {
    components: {
        PageTitle,
        // vSelect,
    },
    data() {
        return {
            id: "StaffID",
            name: "ทะเบียนบุคลากร",
            breadcrumb: [
                { label: "หน้าหลัก", to: "/" },
                { label: "ทะเบียนบุคลากร", to: "/agency/all" },
            ],
            url: {
                AIZone: "/ai-zone/selection?includeAll=false&isActive=1",
                OrganizationZone:
                    "/organization-zone/selection?includeAll=false&isActive=1",
                Staff: "/staff/all-count",
                Title: "/title?includeAll=false&isActive=1",
                Gender: "/gender?includeAll=false&isActive=1",
                MariedStatus: "/married-status?includeAll=false&isActive=1",
                Organization:
                    "/organization/selection?includeAll=false&isActive=1",
                PositionType: "/position-type?includeAll=false&isActive=1",
                Position: "/position?includeAll=false&isActive=1",
                Province: "/province/selection?includeAll=false&isActive=1",
                Amphur: "/amphur/selection?includeAll=false&isActive=1",
                Tumbol: "/tumbol/selection?includeAll=false&isActive=1",
                Education:
                    "/education?isActive=1&orderByField=EducationCode&orderBy=asc",
                Major: "/major?isActive=1",
                editStaff: "/staff",
                apiRequest: "/card-request-log",
            },
            data: [],
            json_data: [],
            isSelectAIZoneDisabled: false,
            isSelectOrganizationZoneDisabled: false,
            isLoading: false,
            loader: true,
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
            dropdown: {
                AIZones: [],
                OrganizationZones: [],
                Provinces: [],
                Amphurs: [],
                Tumbols: [],
                OrganizationTypes: [],
                Organizations: [],
                Positions: [],
                PositionTypes: [],
                Titles: [],
                Genders: [],
                MariedStatuses: [],
                Educations: [],
                Majors: [],
                StatusAlives: [
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
                statuses: [
                    { name: "เปิดใช้งาน", key: "A", value: 1 },
                    { name: "ปิดใช้งาน", key: "B", value: 0 },
                ],
                Organizations1: [],
                Provinces1: [],
                Amphurs1: [],
                Tumbols1: [],
            },
            permit: null,
            //  cancel requests
            controller: new AbortController(),
            // Modal
            display_add: false,
            display_edit: false,
            display_view: false,
            display_delete: false,
            rowPerPage: 20,
            currentPage: 1,
            totalPage: 1,
            totalItems: 0,

            // Params
            params: {
                page: 1,
                size: 10,
                orderByField: "StaffID",
                orderBy: "desc",
                IsActive: null,
            },
            table: {
                total: 0,
                last_page: 0,
            },
            //   columns: [
            //     {
            //       field: "StaffNumber",
            //       header: "รหัสบุคลากร",
            //     },
            //     {
            //       field: "StaffGivenName",
            //       header: "ชื่อ",
            //     },

            //     {
            //       field: "StaffSurname",
            //       header: "นามสกุล",
            //     },
            //     {
            //       field: "Organization.OrganizationName",
            //       header: "หน่วยงาน",
            //     },
            //     {
            //       field: "PositionType.PositionTypeName",
            //       header: "ประเภทบุคลากร",
            //     },
            //     {
            //       field: "Position.PositionName",
            //       header: "ตำแหน่งงาน",
            //     },
            //     {
            //       field: "StaffEmail",
            //       header: "อีเมล",
            //     },
            //     {
            //       field: "StartDate",
            //       header: "วันที่เริ่มทำงาน",
            //     },
            //     {
            //       field: "EndDate",
            //       header: "วันที่สิ้นสุด",
            //     },

            //     {
            //       field: "StaffEmail",
            //       header: "สถานะบัตร",
            //     },

            //     {
            //       field: "StaffEmail",
            //       header: "ส่งเรื่องขอมีบัตร",
            //     },

            //     {
            //       field: "StaffEmail",
            //       header: "สถานะการส่งเรื่อง",
            //     },
            //   ],
        };
    },
    computed: {
        ...mapGetters({
            permission: "get_permission",
            animal_id: "animal_id",
            user: "user",
        }),
    },
    mounted() {
        this.loadDefault();
        // this.form.isActive = this.status[0];
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
        }
    },
    watch: {
        "search.AIZoneID"(val) {
            if (val) {
                this.search.OrganizationZoneID = null;
                this.isSelectAIZoneDisabled = false;
                this.isSelectOrganizationZoneDisabled = true;
            } else {
                console.log(val);
                this.isSelectAIZoneDisabled = true;
                this.isSelectOrganizationZoneDisabled = false;
            }

            this.dropdown.Provinces = [];
            this.dropdown.Amphurs = [];
            this.dropdown.Tumbols = [];
            this.dropdown.Organizations = [];

            if (this.isLoading == false) {
                setTimeout(() => {
                    this.fetchProvince();
                    this.fetchOrganization();
                    this.search.ProvinceID = null;
                    this.search.AmphurID = null;
                    this.search.TumbolID = null;
                    this.search.OrganizationID = null;

                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.OrganizationZoneID"(val) {
            if (val) {
                this.search.AIZoneID = null;
                this.isSelectAIZoneDisabled = true;
                this.isSelectOrganizationZoneDisabled = false;
            } else {
                this.isSelectAIZoneDisabled = false;
                this.isSelectOrganizationZoneDisabled = true;
            }

            this.dropdown.Provinces = [];
            this.dropdown.Amphurs = [];
            this.dropdown.Tumbols = [];
            this.dropdown.Organizations = [];

            if (this.isLoading == false) {
                setTimeout(() => {
                    this.fetchProvince();
                    this.fetchOrganization();
                    this.search.AmphurID = null;
                    this.search.TumbolID = null;
                    this.search.OrganizationID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.StaffProvinceID"(val) {
            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            }
            if (val) {
                this.dropdown.Amphurs = [];
                this.dropdown.Tumbols = [];
                this.search.AmphurID = null;
                this.search.TumbolID = null;
                this.search.OrganizationID = null;
                this.fetchAmphur();
                this.fetchOrganization();
            }
        },
        "search.StaffAmphurID"(val) {
            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            }
            if (val) {
                this.dropdown.Tumbols = [];
                this.search.TumbolID = null;
                this.search.OrganizationID = null;
                this.fetchTumbol();
                this.fetchOrganization();
            }
        },
        "search.StaffTumbolID"() {
            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            }
        },
        // Form
        "form.StaffProvinceID"(val) {
            if (val) {
                this.dropdown.Amphurs1 = [];
                this.dropdown.Tumbols1 = [];
                this.form.StaffAmphurID = null;
                this.form.StaffTumbolID = null;
                this.fetchAmphur1();
            }
        },
        "form.StaffAmphurID"(val) {
            if (val) {
                this.dropdown.Tumbols1 = [];
                this.form.StaffTumbolID = null;
                this.fetchTumbol1();
            }
        },
        "form.StaffTumbolID"() {},
    },
    methods: {
        // format(date) {
        //   const dayStart = date.getDate();
        //   const monthStart = date.getMonth();
        //   const yearStart = date.getFullYear() + 543;
        //   const formatStart = format(
        //     new Date(yearStart, monthStart, dayStart),
        //     "dd/MM/yyyy",
        //     {
        //       locale: th,
        //     }
        //   );
        //   return `${formatStart}`;
        // },
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
                isActive: this.dropdown.statuses[0],
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
        // Load
        async load(event) {
            if (event) {
                this.currentPage = event.page + 1;
            }
            await this.fetchStaff();
        },
        loadDefault() {
            this.fetchTitle();
            this.fetchGender();
            this.fetchMariedStatus();
            this.fetchPositionType();
            this.fetchPosition();
            this.fetchOrganization();
            this.fetchAIZone();
            this.fetchOrganizationZone();
            this.fetchProvince();
            this.fetchAmphur();
            this.fetchTumbol();
            this.fetchOrganization1();
            this.fetchProvince1();
            this.fetchAmphur1();
            this.fetchTumbol1();
            this.fetchEducation();
            this.fetchMajor();
        },
        async fetchStaff() {
            this.isLoading = true;
            let url = this.url.Staff + "?orderByField=StaffID&orderBy=desc";
            if (this.search.StaffNumber) {
                url += "&StaffNumber=" + this.search.StaffNumber;
            }
            if (this.search.StaffGivenName) {
                url += "&StaffGivenName=" + this.search.StaffGivenName;
            }
            if (this.search.StaffSurname) {
                url += "&StaffSurname=" + this.search.StaffSurname;
            }
            if (this.search.StaffIdentificationNumber) {
                url +=
                    "&StaffIdentificationNumber=" +
                    this.search.StaffIdentificationNumber;
            }
            if (this.search.StaffOrganizationID) {
                url +=
                    "&StaffOrganizationID=" + this.search.StaffOrganizationID;
            }
            if (this.search.OrganizationID) {
                url += "&OrganizationID=" + this.search.OrganizationID;
            }
            if (this.search.StaffPositionID) {
                url += "&StaffPositionID=" + this.search.StaffPositionID;
            }
            if (this.search.StaffProvinceID) {
                url += "&StaffProvinceID=" + this.search.StaffProvinceID;
            }
            if (this.search.StaffAmphurID) {
                url += "&StaffAmphurID=" + this.search.StaffAmphurID;
            }
            if (this.search.StaffTumbolID) {
                url += "&StaffTumbolID=" + this.search.StaffTumbolID;
            }
            if (this.search.StaffStartDate) {
                url += "&StaffStartDate=" + this.search.StaffStartDate;
            }
            if (this.search.StaffEndDate) {
                url += "&StaffEndDate=" + this.search.StaffEndDate;
            }

            if (this.search.StaffStatus) {
                url += "&StaffStatus=" + this.search.StaffStatus;
            }

            if (this.search.AIZoneID) {
                url += "&OrganizationAiZoneID=" + this.search.AIZoneID;
            }

            if (this.search.OrganizationZoneID) {
                url += "&OrganizationZoneID=" + this.search.OrganizationZoneID;
            }

            let params = {
                size: this.rowPerPage,
                page: this.currentPage,
                // includeAll: false,
            };

            await axios
                .get(url, { signal: this.controller.signal, params: params })
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
                            this.data[i].StaffEndDateThai = dayjs(
                                this.data[i].StaffEndDate
                            )
                                .add(543, "year")
                                .format("DD/MM/YYYY");
                        }
                    }
                    this.totalPage = response.data.totalPage;
                    this.totalItems = response.data.totalData;
                    this.total = response.data.total;
                })
                .finally(() => {
                    this.isLoading = false;
                    if (localStorage.getItem("staffID") !== null) {
                        this.open_edit(localStorage.getItem("staffID"));
                        localStorage.removeItem("staffID");
                    }
                });
        },
        // fetch Master Data
        fetchAIZone() {
            let params = {};
            //  Fetch AIZone
            axios
                .get(this.url.AIZone, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.AIZones = res.data.rows;

                    this.dropdown.AIZones.push({
                        AIZoneID: 99,
                        AIZoneName: "ทั้งหมด",
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchOrganizationZone() {
            let params = {};
            //  Fetch OrganizationZone
            axios
                .get(this.url.OrganizationZone, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.OrganizationZones = res.data.rows;
                    this.dropdown.OrganizationZones.push({
                        OrganizationZoneID: 99,
                        OrganizationZoneName: "ทั้งหมด",
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        async fetchTitle() {
            await axios
                .get(this.url.Title, {
                    signal: this.controller.signal,
                })
                .then((res) => {
                    this.dropdown.Titles = res.data.rows;
                });
        },
        async fetchGender() {
            await axios
                .get(this.url.Gender, {
                    signal: this.controller.signal,
                })
                .then((res) => {
                    this.dropdown.Genders = res.data.rows;
                });
        },
        async fetchMariedStatus() {
            await axios
                .get(this.url.MariedStatus, {
                    signal: this.controller.signal,
                })
                .then((res) => {
                    this.dropdown.MariedStatuses = res.data.rows;
                });
        },
        async fetchPositionType() {
            await axios
                .get(this.url.PositionType, {
                    signal: this.controller.signal,
                })
                .then((res) => {
                    this.dropdown.PositionTypes = res.data.rows;
                });
        },
        async fetchPosition() {
            await axios
                .get(this.url.Position, {
                    signal: this.controller.signal,
                })
                .then((res) => {
                    this.dropdown.Positions = res.data.rows;
                });
        },
        async fetchOrganization() {
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null
            ) {
                return;
            }

            let params = {};

            // Province IN AIZOne
            if (this.search.AIZoneID != null) {
                params["OrganizationAiZoneID"] = this.search.AIZoneID;
            }

            if (this.search.OrganizationZoneID != null) {
                params["OrganizationZoneID"] = this.search.OrganizationZoneID;
            }

            if (this.search.StaffProvinceID != null) {
                params["ProvinceID"] = this.search.StaffProvinceID;
            }

            if (this.search.StaffAmphurID != null) {
                params["AmphurID"] = this.search.StaffAmphurID;
            }

            if (this.search.StaffTumbolID != null) {
                params["TumbolID"] = this.search.StaffTumbolID;
            }

            params["includeProvince"] = "true";

            await axios
                .get(this.url.Organization, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Organizations = res.data.rows.map((item) => {
                        return {
                            OrganizationID: item.OrganizationID,
                            OrganizationName:
                                item.OrganizationCode +
                                ", " +
                                item.OrganizationName +
                                " (" +
                                item.ProvinceName +
                                ")",
                        };
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        async fetchProvince() {
            //  Fetch Province
            let params = {};

            if (this.search.AIZoneID != null) {
                params["AIZoneID"] = this.search.AIZoneID;
            }

            if (this.search.OrganizationZoneID != null) {
                params["OrganizationZoneID"] = this.search.OrganizationZoneID;
            }
            await axios
                .get(this.url.Province, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Provinces = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        async fetchAmphur() {
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null &&
                this.search.ProvinceID == null
            ) {
                return;
            }

            let params = {};

            if (this.search.StaffProvinceID != null) {
                params["ProvinceID"] = this.search.StaffProvinceID;
            }

            await axios
                .get(this.url.Amphur, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Amphurs = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        async fetchTumbol() {
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null &&
                this.search.AmphurID == null
            ) {
                return;
            }

            let params = {};

            if (this.search.StaffAmphurID != null) {
                params["AmphurID"] = this.search.StaffAmphurID;
            }

            await axios
                .get(this.url.Tumbol, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Tumbols = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        async fetchEducation() {
            let params = {};

            await axios
                .get(this.url.Education, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Educations = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        async fetchMajor() {
            let params = {};

            await axios
                .get(this.url.Major, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Majors = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        async fetchOrganization1() {
            //  Fetch Province
            let params = {};

            params["includeProvince"] = "true";

            await axios
                .get(this.url.Organization, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Organizations1 = res.data.rows.map((item) => {
                        return {
                            OrganizationID: item.OrganizationID,
                            OrganizationName:
                                item.OrganizationCode +
                                ", " +
                                item.OrganizationName +
                                " (" +
                                item.ProvinceName +
                                ")",
                        };
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        async fetchProvince1() {
            //  Fetch Province
            let params = {};

            await axios
                .get(this.url.Province, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Provinces1 = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        async fetchAmphur1() {
            let params = {};

            if (this.form.StaffProvinceID != null) {
                params["ProvinceID"] = this.form.StaffProvinceID;
            }

            await axios
                .get(this.url.Amphur, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Amphurs1 = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        async fetchTumbol1() {
            let params = {};

            if (this.form.StaffAmphurID != null) {
                params["AmphurID"] = this.form.StaffAmphurID;
            }

            await axios
                .get(this.url.Tumbol, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Tumbols1 = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        // End Fetch Master Data
        // Add
        add() {
            // validation
            //   if (this.validation() == false) {
            //     return;
            //   }

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
                this.form.StaffMobilePhone =
                    this.form.StaffMobilePhone.replaceAll("-", "");
            }

            // ใช้ Debug ดูข้อมูลใน formData
            // for (let [key, value] of formData) {
            //   console.log(`${key}: ${value}`);
            // }

            // post
            axios
                .post(this.url.editStaff, this.form)
                .then((res) => {
                    // ในกรณีที่สามารถเพิ่มข้อมูลได้ ให้เพิ่มรูปต่อ
                    this.close_add();

                    console.log("FREEDOM");

                    if (this.form.StaffImages !== undefined) {
                        this.uploadPhoto(res.data.StaffID, formData);
                    }

                    console.log("FREEDOM1");
                    this.load();

                    console.log("FREEDOM2");
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "เพิ่มข้อมูลเสร็จสิ้น",
                        life: 5000,
                    });
                })
                // error
                .catch((err) => {
                    this.form.isActive = this.dropdown.statuses[0];
                    console.log(err);
                    //   this.$toast.add({
                    //     severity: "error",
                    //     summary: "ล้มเหลว",
                    //     detail: err.response.data.error.message,
                    //     life: 5000,
                    //   });
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
                this.form.StaffMobilePhone =
                    this.form.StaffMobilePhone.replaceAll("-", "");
            }

            // change data
            this.form.isActive = this.form.isActive.value;
            axios
                .put(this.url.editStaff + "/" + this.form.StaffID, this.form)
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
                    this.form.isActive = this.dropdown.statuses[0];
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
                this.form.StaffOrganizationID =
                    this.user.Staff.StaffOrganizationID;

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
                id.isActive = this.dropdown.statuses[1];
            } else if (id.isActive == 1) {
                id.isActive = this.dropdown.statuses[0];
            }

            if (id.isActive == 0) {
                id.isActive = this.dropdown.statuses[1];
            } else if (id.isActive == 1) {
                id.isActive = this.dropdown.statuses[0];
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
        onSearch() {
            this.fetchStaff();
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
                id.isActive = this.dropdown.statuses[1];
            } else if (id.isActive == 1) {
                id.isActive = this.dropdown.statuses[0];
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
                this.form.StaffIdentificationNumber.replace(/.{0,4}$/, "") +
                "XXXX";
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
                this.form.StaffZipCode = val.Zipcode;
            } else {
                this.form.StaffZipCode = "";
            }
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
                .post(this.url.apiRequest, form)
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
