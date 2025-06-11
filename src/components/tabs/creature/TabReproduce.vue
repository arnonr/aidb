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
                @click="open_add()"
                v-if="
                    AnimalSecretStatus.includes(7) &&
                    permit[0].IsAdd &&
                    this.animalInfo.isActive == 1
                "
            />
        </div>
    </div>
    <DataTable
        class="text-sm"
        :value="data"
        :paginator="true"
        :rowHover="true"
        :rows="10"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 20, 50]"
        responsiveLayout="scroll"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    >
        <Column field="show_id" header="ลำดับ" class="text-center"></Column>
        <Column
            field="ThaiReproduceDate"
            header="วันที่ตรวจ"
            class="text-center"
            :sortable="true"
        ></Column>
        <Column
            field="ThaiStandingHeatDate"
            header="วันที่เป็นสัดครั้งแรก"
            class="text-center"
            :sortable="true"
        ></Column>
        <Column
            field="HeatTypeName"
            header="อาการเป็นสัด"
            class="text-center"
            :sortable="true"
        ></Column>
        <Column
            field="HeatCircleID"
            header="วงรอบการเป็นสัด"
            class="text-center"
            :sortable="true"
        ></Column>
        <Column
            field="FarmerRemark"
            header="อาการผิดปกติที่พบ"
            class="text-center"
            :sortable="true"
        ></Column>
        <Column
            field="BCSName"
            header="คะแนนร่างกาย"
            class="text-center"
            :sortable="true"
        ></Column>

        <Column
            field="ResponsibilityStaffName"
            header="ชื่อเจ้าหน้าที่"
            class="text-center"
            :sortable="true"
        ></Column>
        <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
                <SplitButton
                    v-if="
                        slotProps.index + 1 == total || this.user.GroupID == 1
                    "
                    label="แก้ไข"
                    icon="pi pi-pencil"
                    @click="edit(slotProps.data.ReproduceID)"
                    class="p-button-sm p-button-outlined p-button-warning"
                    :model="getItems(slotProps.data.ReproduceID)"
                    :disabled="this.animalInfo.isActive == 0"
                >
                </SplitButton>
            </template>
        </Column>
    </DataTable>

    <!-- Add Dialog -->
    <Dialog
        header="เพิ่มกิจกรรมตรวจระบบสืบพันธุ์"
        v-model:visible="displayAddModal"
        :style="{ width: '75vw' }"
        :modal="true"
        v-on:after-hide="clear()"
    >
        <form class="grid mt-2">
            <div class="col-12 lg:col-12">
                <div class="formgrid grid">
                    <h4 class="field col-12">ประวัติทั่วไป</h4>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            วันที่เป็นสัด (ในรอบปัจจุบัน)<span
                                class="text-red-500"
                            >
                                *</span
                            >
                        </label>
                        <Datepicker
                            v-model="form.StandingHeatDate"
                            :class="{
                                'p-invalid': !form.StandingHeatDate && valid,
                            }"
                            id="dateRange"
                            locale="th"
                            :format="format"
                            utc
                            :enableTimePicker="false"
                            :maxDate="new Date()"
                            cancelText="ยกเลิก"
                            selectText="ยืนยัน"
                            placeholder="วันที่เป็นสัด"
                        >
                            <template #year-overlay-value="{ text }">
                                {{ parseInt(text) + 543 }}
                            </template>
                            <template #year="{ year }">
                                {{ year + 543 }}
                            </template>
                        </Datepicker>
                        <!-- <Calendar
              class="w-full"
              id="dateRange"
              v-model="form.StandingHeatDate"
              :maxDate="new Date()"
              :manualInput="false"
              placeholder=""
              :showIcon="true"
              :class="{
                'p-invalid': !form.StandingHeatDate && valid,
              }"
            /> -->
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            อาการเป็นสัด
                        </label>
                        <Dropdown
                            :virtualScrollerOptions="{ itemSize: 38 }"
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            optionLabel="HeatTypeName"
                            optionValue="HeatTypeID"
                            :options="selection.HeatType"
                            v-model="form.HeatTypeID"
                            :filter="true"
                            placeholder="เลือกอาการเป็นสัด"
                            :showClear="true"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            วงรอบการเป็นสัด
                        </label>
                        <Dropdown
                            :virtualScrollerOptions="{ itemSize: 38 }"
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            optionLabel="HeatCircleName"
                            optionValue="HeatCircleID"
                            :options="selection.HeatCircle"
                            v-model="form.HeatCircleID"
                            :filter="true"
                            placeholder="เลือกวงรอบการเป็นสัด"
                            :showClear="true"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            อาการอื่น ๆ ที่เกษตรกรตรวจพบ
                        </label>
                        <InputText
                            class="w-full"
                            v-model="form.FarmerRemark"
                            type="text"
                        />
                    </div>
                    <h4 class="field col-12">การวินิจฉัย</h4>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยปากช่องคลอด
                        </label>
                        <div class="flex">
                            <div class="mr-3">
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="intumesceDiagnoseVulva"
                                        name="diagnoseVulva"
                                        value="INTUMESCE"
                                        v-model="form.DiagnoseVulva"
                                    />
                                    <label for="intumesceDiagnoseVulva"
                                        >บวม</label
                                    >
                                </div>
                            </div>
                            <div>
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="normalDiagnoseVulva"
                                        name="diagnoseVulva"
                                        value="NORMAL"
                                        v-model="form.DiagnoseVulva"
                                    />
                                    <label for="normalDiagnoseVulva"
                                        >ไม่บวม</label
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยช่องคลอด
                        </label>
                        <div class="flex">
                            <div class="mr-3">
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="intumesceDiagnoseVagina"
                                        name="diagnoseVagina"
                                        value="INTUMESCE"
                                        v-model="form.DiagnoseVagina"
                                    />
                                    <label for="intumesceDiagnoseVagina"
                                        >บวม</label
                                    >
                                </div>
                            </div>
                            <div>
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="normalDiagnoseVagina"
                                        name="diagnoseVagina"
                                        value="NORMAL"
                                        v-model="form.DiagnoseVagina"
                                    />
                                    <label for="normalDiagnoseVagina"
                                        >ไม่บวม</label
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยลักษณะเมือกช่องคลอด
                        </label>
                        <div class="flex">
                            <div class="mr-3">
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="yesDiagnoseVaginaMucilage"
                                        name="diagnoseVaginaMucilage"
                                        value="YES"
                                        v-model="form.DiagnoseVaginaMucilage"
                                    />
                                    <label for="yesDiagnoseVaginaMucilage"
                                        >มีเมือก</label
                                    >
                                </div>
                            </div>
                            <div>
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="noDiagnoseVagina"
                                        name="diagnoseVaginaMucilage"
                                        value="NO"
                                        v-model="form.DiagnoseVaginaMucilage"
                                    />
                                    <label for="noDiagnoseVagina"
                                        >ไม่มีเมือก</label
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-12">
                        <div class="formgrid grid">
                            <div class="field col-12 sm:col-6">
                                <label
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    การวินิจฉัยคอมดลูก ขนาด (ซม.)
                                </label>
                                <InputText
                                    class="w-full"
                                    type="number"
                                    v-model="form.CervixSize"
                                />
                            </div>
                            <div class="field col-12 sm:col-6">
                                <label
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    การวินิจฉัยคอมดลูก ความยาว (ซม.)
                                </label>
                                <InputText
                                    class="w-full"
                                    type="number"
                                    v-model="form.CervixLength"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยลักษณะคอมดลูก
                        </label>
                        <div class="flex">
                            <div class="mr-3">
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="curveCervixType"
                                        name="cervixType"
                                        value="CURVE"
                                        v-model="form.CervixType"
                                    />
                                    <label for="curveCervixType">คด</label>
                                </div>
                            </div>
                            <div>
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="normalCervixType"
                                        name="cervixType"
                                        value="NORMAL"
                                        v-model="form.CervixType"
                                    />
                                    <label for="normalCervixType">ไม่คด</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยลักษณะปากมดลูก
                        </label>
                        <div class="flex">
                            <div class="mr-3">
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="openCervical"
                                        name="cervical"
                                        value="OPEN"
                                        v-model="form.Cervical"
                                    />
                                    <label for="openCervical">เปิด</label>
                                </div>
                            </div>
                            <div>
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="closeCervical"
                                        name="cervical"
                                        value="CLOSE"
                                        v-model="form.Cervical"
                                    />
                                    <label for="closeCervical">ปิด</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยปีกมดลูก ขนาด (ซม.)
                        </label>
                        <InputText
                            class="w-full"
                            type="number"
                            v-model="form.AdnexaSize"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยลักษณะปีกมดลูก
                        </label>
                        <div class="flex">
                            <div class="mr-3">
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="equalCervical"
                                        name="AdnexaType"
                                        value="EQUAL"
                                        v-model="form.AdnexaType"
                                    />
                                    <label for="equalCervical">เท่ากัน</label>
                                </div>
                            </div>
                            <div>
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="unEqualCervical"
                                        name="AdnexaType"
                                        value="UNEQUAL"
                                        v-model="form.AdnexaType"
                                    />
                                    <label for="unEqualCervical"
                                        >ไม่เท่ากัน</label
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            Tone
                        </label>
                        <Dropdown
                            :virtualScrollerOptions="{ itemSize: 38 }"
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            optionLabel="word"
                            optionValue="val"
                            :options="selection.AdnexaTone"
                            v-model="form.AdnexaTone"
                            placeholder="เลือก Tone"
                            :showClear="true"
                        />
                    </div>
                    <h4 class="field col-12">ปัญหาที่พบ</h4>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ปัญหาที่พบของรังไข่ข้างซ้าย
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกปัญหาที่พบของรังไข่ข้างซ้าย"
                            display="chip"
                            optionLabel="OvarySymptomName"
                            optionValue="OvarySymptomID"
                            :options="selection.LeftOvarySymptom"
                            v-model="form.LeftOvarySymptomID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุปัญหาที่พบของรังไข่ข้างซ้าย (ถ้ามี)"
                            v-model="form.LeftOvarySymptomRemark"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ปัญหาที่พบของรังไข่ข้างขวา
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกปัญหาที่พบของรังไข่ข้างซ้าย"
                            display="chip"
                            optionLabel="OvarySymptomName"
                            optionValue="OvarySymptomID"
                            :options="selection.RightOvarySymptom"
                            v-model="form.RightOvarySymptomID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุปัญหาที่พบของรังไข่ข้างซ้าย (ถ้ามี)"
                            v-model="form.RightOvarySymptomRemark"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ปัญหาที่พบของมดลูก/ช่องคลอด
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกปัญหาที่พบของมดลูก/ช่องคลอด"
                            display="chip"
                            optionLabel="VaginaSymptomName"
                            optionValue="VaginaSymptomID"
                            :options="selection.VaginaSymptom"
                            v-model="form.VaginaSymptomID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุปัญหาที่พบของมดลูก/ช่องคลอด (ถ้ามี)"
                            v-model="form.VaginaSymptomRemark"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ปัญหาที่พบอื่น ๆ
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกปัญหาที่พบอื่น ๆ"
                            display="chip"
                            optionLabel="OtherSymptomName"
                            optionValue="OtherSymptomID"
                            :options="selection.OtherSymptom"
                            v-model="form.OtherSymptomID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุปัญหาที่พบอื่น ๆ (ถ้ามี)"
                            v-model="form.OtherSymptomRemark"
                        />
                    </div>
                    <h4 class="field col-12">สาเหตุโน้มนำ</h4>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            สาเหตุโน้มนำด้านตัวสัตว์
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกสาเหตุโน้มนำด้านตัวสัตว์"
                            display="chip"
                            optionLabel="CauseAnimalName"
                            optionValue="CauseAnimalID"
                            :options="selection.CauseAnimal"
                            v-model="form.CauseAnimalID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุโน้มนำด้านตัวสัตว์ (ถ้ามี)"
                            v-model="form.CauseAnimalRemark"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            สาเหตุโน้มนำด้านสิ่งแวดล้อม
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกสาเหตุโน้มนำด้านสิ่งแวดล้อม"
                            display="chip"
                            optionLabel="CauseEnvironmentName"
                            optionValue="CauseEnvironmentID"
                            :options="selection.CauseEnvironment"
                            v-model="form.CauseEnvironmentID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุโน้มนำด้านสิ่งแวดล้อม (ถ้ามี)"
                            v-model="form.CauseEnvironmentRemark"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            สาเหตุโน้มนำด้านการเลี้ยงและการจัดการ
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกสาเหตุโน้มนำด้านการเลี้ยงและการจัดการ"
                            display="chip"
                            optionLabel="CauseFeederName"
                            optionValue="CauseFeederID"
                            :options="selection.CauseFeeder"
                            v-model="form.CauseFeederID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุโน้มนำด้านการเลี้ยงและการจัดการ (ถ้ามี)"
                            v-model="form.CauseFeederRemark"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            สาเหตุโน้มนำด้านสุขภาพ
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกสาเหตุโน้มนำด้านสุขภาพ"
                            display="chip"
                            optionLabel="CauseHealthName"
                            optionValue="CauseHealthID"
                            :options="selection.CauseHealth"
                            v-model="form.CauseHealthID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุโน้มนำด้านสุขภาพ (ถ้ามี)"
                            v-model="form.CauseHealthRemark"
                        />
                    </div>
                    <h4 class="field col-12">การรักษา</h4>
                    <div class="field col-12">
                        <div class="field-checkbox">
                            <Checkbox
                                value="1"
                                id="cureByHormone"
                                v-model="form.CureByHormone"
                            />
                            <label for="cureByHormone">รักษาโดยฮอร์โมน</label>
                        </div>
                        <div v-if="form.CureByHormone == 1">
                            <!-- <label class="block text-600 text-sm font-bold mb-2">
                เลือกฮอร์โมน
              </label>
              <MultiSelect
                class="w-full"
                placeholder="เลือกฮอร์โมน"
                display="chip"
                optionLabel="CureHormoneName"
                optionValue="CureHormoneID"
                :options="selection.CureHormone"
                v-model="form.CureHormoneID"
              /> -->
                            <template
                                v-for="item in cureByHormoneSettings"
                                :key="item.id"
                            >
                                <div class="formgrid grid">
                                    <div class="field col-6">
                                        <label
                                            class="block text-600 text-sm font-bold mb-2"
                                        >
                                            เลือกฮอร์โมน
                                        </label>
                                        <!-- v-model="form.CureHormoneID[item.id - 1][item.id - 1]" -->

                                        <Dropdown
                                            class="w-full"
                                            :filter="true"
                                            :showClear="true"
                                            optionLabel="CureHormoneName"
                                            optionValue="CureHormoneID"
                                            :options="selection.CureHormone"
                                            v-model="
                                                form.CureHormoneName[
                                                    item.id - 1
                                                ]
                                            "
                                        />
                                    </div>
                                    <div class="field col-6">
                                        <label
                                            class="block text-600 text-sm font-bold mb-2"
                                        >
                                            ระบุปริมาณที่ใช้
                                        </label>
                                        <!-- v-model="form.CureHormoneID[item.id - 1][item.id]" -->
                                        <InputNumber
                                            id="minmaxfraction"
                                            v-model="
                                                form.CureHormoneValue[
                                                    item.id - 1
                                                ]
                                            "
                                            mode="decimal"
                                            :minFractionDigits="2"
                                            :maxFractionDigits="5"
                                            class="w-full"
                                        />
                                    </div>
                                </div>
                            </template>
                            <div class="field flex justify-content-between">
                                <Button
                                    label="เพิ่ม"
                                    class="p-button-sm"
                                    icon="pi pi-plus"
                                    @click="addCureByHormone"
                                />
                                <Button
                                    label="ลบ"
                                    class="p-button-sm p-button-danger"
                                    icon="pi pi-minus"
                                    @click="deleteCureByHormone"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="field col-12">
                        <div class="field-checkbox">
                            <Checkbox
                                value="1"
                                id="cureByAntibiotic"
                                v-model="form.CureByAntibiotic"
                            />
                            <label for="cureByAntibiotic"
                                >รักษาโดยยาปฏิชีวนะ</label
                            >
                        </div>
                        <div v-if="form.CureByAntibiotic == 1">
                            <!-- <label class="block text-600 text-sm font-bold mb-2">
                เลือกยาปฏิชีวนะ
              </label>
              <MultiSelect class="w-full" placeholder="เลือกยาปฏิชีวนะ" display="chip" optionLabel="CureAntibioticName"
                optionValue="CureAntibioticID" :options="selection.CureAntibiotic" v-model="form.CureAntibioticID" /> -->
                            <template
                                v-for="item in cureAntibioticSettings"
                                :key="item.id"
                            >
                                <div class="formgrid grid">
                                    <div class="field col-6">
                                        <label
                                            class="block text-600 text-sm font-bold mb-2"
                                        >
                                            เลือกยาปฏิชีวนะ
                                        </label>

                                        <Dropdown
                                            class="w-full"
                                            :filter="true"
                                            :showClear="true"
                                            optionLabel="CureAntibioticName"
                                            optionValue="CureAntibioticID"
                                            :options="selection.CureAntibiotic"
                                            v-model="
                                                form.CureAntibioticName[
                                                    item.id - 1
                                                ]
                                            "
                                        />
                                    </div>
                                    <div class="field col-6">
                                        <label
                                            class="block text-600 text-sm font-bold mb-2"
                                        >
                                            ระบุปริมาณที่ใช้
                                        </label>

                                        <InputNumber
                                            id="minmaxfraction"
                                            v-model="
                                                form.CureAntibioticValue[
                                                    item.id - 1
                                                ]
                                            "
                                            mode="decimal"
                                            :minFractionDigits="2"
                                            :maxFractionDigits="5"
                                            class="w-full"
                                        />
                                    </div>
                                </div>
                            </template>
                            <div class="field flex justify-content-between">
                                <Button
                                    label="เพิ่ม"
                                    class="p-button-sm"
                                    icon="pi pi-plus"
                                    @click="addCureAntibiotic"
                                />
                                <Button
                                    label="ลบ"
                                    class="p-button-sm p-button-danger"
                                    icon="pi pi-minus"
                                    @click="deleteCureAntibiotic"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="field col-12">
                        <div class="field-checkbox">
                            <Checkbox
                                value="1"
                                id="cureByVitamin"
                                v-model="form.CureByVitamin"
                            />
                            <label for="cureByVitamin">รักษาโดยวิตามิน</label>
                        </div>
                        <div v-if="form.CureByVitamin == 1">
                            <!-- <label class="block text-600 text-sm font-bold mb-2">
                เลือกวิตามิน
              </label>
              <MultiSelect class="w-full" placeholder="เลือกวิตามิน" display="chip" optionLabel="CureVitaminName"
                optionValue="CureVitaminID" :options="selection.CureVitamin" v-model="form.CureVitaminID" /> -->
                            <template
                                v-for="item in cureVitaminSettings"
                                :key="item.id"
                            >
                                <div class="formgrid grid">
                                    <div class="field col-6">
                                        <label
                                            class="block text-600 text-sm font-bold mb-2"
                                        >
                                            เลือกยาวิตามิน
                                        </label>
                                        <Dropdown
                                            class="w-full"
                                            :filter="true"
                                            :showClear="true"
                                            optionLabel="CureVitaminName"
                                            optionValue="CureVitaminID"
                                            :options="selection.CureVitamin"
                                            v-model="
                                                form.CureVitaminName[
                                                    item.id - 1
                                                ]
                                            "
                                        />
                                        <!-- <Dropdown
                      class="w-full"
                      v-model="item.name"
                      :filter="true"
                      :showClear="true"
                      optionLabel="name"
                    /> -->
                                    </div>
                                    <div class="field col-6">
                                        <label
                                            class="block text-600 text-sm font-bold mb-2"
                                        >
                                            ระบุปริมาณที่ใช้
                                        </label>

                                        <InputNumber
                                            id="minmaxfraction"
                                            v-model="
                                                form.CureVitaminValue[
                                                    item.id - 1
                                                ]
                                            "
                                            mode="decimal"
                                            :minFractionDigits="2"
                                            :maxFractionDigits="5"
                                            class="w-full"
                                        />
                                        <!-- <InputNumber class="w-full" v-model="item.number" /> -->
                                    </div>
                                </div>
                            </template>
                            <div class="field flex justify-content-between">
                                <Button
                                    label="เพิ่ม"
                                    class="p-button-sm"
                                    icon="pi pi-plus"
                                    @click="addCureVitamin"
                                />
                                <Button
                                    label="ลบ"
                                    class="p-button-sm p-button-danger"
                                    icon="pi pi-minus"
                                    @click="deleteCureVitamin"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="field col-12">
                        <div class="field-checkbox">
                            <Checkbox
                                value="1"
                                id="cureByCleanUterus"
                                v-model="form.CureByCleanUterus"
                            />
                            <label for="cureByCleanUterus"
                                >รักษาโดยชะล้างมดลูก</label
                            >
                        </div>
                        <div v-if="form.CureByCleanUterus == 1">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                หมายเหตุชะล้างมดลูก
                                <span class="text-yellow-500">(ถ้ามี)</span>
                            </label>
                            <InputText
                                class="w-full"
                                type="text"
                                placeholder="หมายเหตุชะล้างมดลูก (ถ้ามี)"
                                v-model="form.CureCleanUterusRemark"
                            />
                            <!-- <template
                v-for="item in cureByCleanUterusSettings"
                :key="item.id"
              >
                <div class="formgrid grid">
                  <div class="field col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      เลือกยาชะล้างมดลูก
                    </label>
                    <Dropdown
                      class="w-full"
                      v-model="item.name"
                      :filter="true"
                      :showClear="true"
                      optionLabel="name"
                    />
                  </div>
                  <div class="field col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      จำนวน
                    </label>
                    <InputNumber class="w-full" v-model="item.number" />
                  </div>
                </div>
              </template>
              <div class="field flex justify-content-between">
                <Button
                  label="เพิ่ม"
                  class="p-button-sm"
                  icon="pi pi-plus"
                  @click="addCureByCleanUterus"
                />
                <Button
                  label="ลบ"
                  class="p-button-sm p-button-danger"
                  icon="pi pi-minus"
                  @click="deleteCureByCleanUterus"
                />
              </div> -->
                        </div>
                    </div>
                    <div class="field col-12">
                        <div class="field-checkbox">
                            <Checkbox
                                value="1"
                                id="CureByOther"
                                v-model="form.CureByOther"
                            />
                            <label for="CureByOther">รักษาโดยวิธีอื่น ๆ</label>
                        </div>
                        <div v-if="form.CureByOther == 1">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                หมายเหตุการรักษาโดยวิธีอื่น ๆ
                                <span class="text-yellow-500">(ถ้ามี)</span>
                            </label>
                            <InputText
                                class="w-full"
                                type="text"
                                placeholder="หมายเหตุการรักษาโดยวิธีอื่น ๆ (ถ้ามี)"
                                v-model="form.CureByOtherRemark"
                            />
                            <!-- <template v-for="item in cureByOtherSettings" :key="item.id">
                <div class="formgrid grid">
                  <div class="field col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      เลือกยาชะล้างมดลูก
                    </label>
                    <Dropdown
                      class="w-full"
                      v-model="item.name"
                      :filter="true"
                      :showClear="true"
                      optionLabel="name"
                    />
                  </div>
                  <div class="field col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      จำนวน
                    </label>
                    <InputNumber class="w-full" v-model="item.number" />
                  </div>
                </div>
              </template>
              <div class="field flex justify-content-between">
                <Button
                  label="เพิ่ม"
                  class="p-button-sm"
                  icon="pi pi-plus"
                  @click="addCureByOther"
                />
                <Button
                  label="ลบ"
                  class="p-button-sm p-button-danger"
                  icon="pi pi-minus"
                  @click="deleteCureByOther"
                />
              </div> -->
                        </div>
                    </div>
                    <h4 class="field col-12">เจ้าหน้าที่ผู้รับผิดชอบ</h4>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            คำแนะนำ
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกคำแนะนำ"
                            display="chip"
                            optionLabel="ReproduceSuggestionName"
                            optionValue="ReproduceSuggestionID"
                            :options="selection.ReproduceSuggestion"
                            v-model="form.ReproduceSuggestionID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุ (ถ้ามี)"
                            v-model="form.ReproduceSuggestionRemark"
                        />
                    </div>
                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            คะแนนร่างกาย (BCS)</label
                        >
                        <Dropdown
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            placeholder="เลือกคะแนนร่างกาย"
                            optionLabel="BCSName"
                            optionValue="BCSID"
                            v-model="form.BCSID"
                            :options="selection.BCS"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            วันที่ตรวจ<span class="text-red-500"> *</span>
                        </label>
                        <!-- <Calendar
              class="w-full"
              id="dateRange"
              v-model="form.ReproduceDate"
              :manualInput="false"
              :maxDate="new Date()"
              placeholder=""
              :showIcon="true"
              :class="{
                'p-invalid': !form.ReproduceDate && valid,
              }"
            /> -->
                        <Datepicker
                            v-model="form.ReproduceDate"
                            :class="{
                                'p-invalid': !form.ReproduceDate && valid,
                            }"
                            id="dateRange"
                            locale="th"
                            :format="format"
                            utc
                            :enableTimePicker="false"
                            :maxDate="new Date()"
                            cancelText="ยกเลิก"
                            selectText="ยืนยัน"
                            placeholder="วันที่ตรวจ"
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
                            เจ้าหน้าที่ผู้วินิจฉัย<span class="text-red-500">
                                *</span
                            >
                        </label>
                        <Dropdown
                            :virtualScrollerOptions="{ itemSize: 38 }"
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            optionLabel="StaffFullName"
                            optionValue="StaffID"
                            :options="selection.Staff"
                            v-model="form.ResponsibilityStaffID"
                            :filter="true"
                            placeholder="เลือกเจ้าหน้าที่ผู้วินิจฉัย"
                            :showClear="true"
                            :class="{
                                'p-invalid':
                                    !form.ResponsibilityStaffID && valid,
                            }"
                        />
                    </div>
                </div>
            </div>
            <div class="col-12 text-center mt-5 flex justify-content-between">
                <Button
                    label="ยกเลิก"
                    class="p-button-secondary w-full mr-3"
                    @click="closeAddModal"
                />
                <Button
                    label="บันทึกข้อมูล"
                    class="ml-3 p-button-info w-full"
                    @click="add()"
                />
            </div>
        </form>
    </Dialog>
    <!-- End Add Dialog -->
    <!-- EDIT Dialog -->
    <Dialog
        header="แก้ไขกิจกรรมตรวจระบบสืบพันธุ์"
        v-model:visible="displayEditModal"
        :style="{ width: '75vw' }"
        :modal="true"
    >
        <form class="grid mt-2">
            <div class="col-12 lg:col-12">
                <div class="formgrid grid">
                    <h4 class="field col-12">ประวัติทั่วไป</h4>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            วันที่เป็นสัด (ในรอบปัจจุบัน)<span
                                class="text-red-500"
                            >
                                *</span
                            >
                        </label>
                        <!-- <Calendar
              class="w-full"
              id="dateRange"
              v-model="form.StandingHeatDate"
              :manualInput="false"
              :maxDate="new Date()"
              placeholder=""
              :showIcon="true"
              :class="{
                'p-invalid': !form.StandingHeatDate && valid,
              }"
            /> -->
                        <Datepicker
                            v-model="form.StandingHeatDate"
                            :class="{
                                'p-invalid': !form.StandingHeatDate && valid,
                            }"
                            id="dateRange"
                            locale="th"
                            :format="format"
                            utc
                            :enableTimePicker="false"
                            :maxDate="new Date()"
                            cancelText="ยกเลิก"
                            selectText="ยืนยัน"
                            placeholder="วันที่เป็นสัด"
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
                            อาการเป็นสัด
                        </label>
                        <Dropdown
                            :virtualScrollerOptions="{ itemSize: 38 }"
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            optionLabel="HeatTypeName"
                            optionValue="HeatTypeID"
                            :options="selection.HeatType"
                            v-model="form.HeatTypeID"
                            :filter="true"
                            placeholder="เลือกอาการเป็นสัด"
                            :showClear="true"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            วงรอบการเป็นสัด
                        </label>
                        <Dropdown
                            :virtualScrollerOptions="{ itemSize: 38 }"
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            optionLabel="HeatCircleName"
                            optionValue="HeatCircleID"
                            :options="selection.HeatCircle"
                            v-model="form.HeatCircleID"
                            :filter="true"
                            placeholder="เลือกวงรอบการเป็นสัด"
                            :showClear="true"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            อาการอื่น ๆ ที่เกษตรกรตรวจพบ
                        </label>
                        <InputText
                            class="w-full"
                            v-model="form.FarmerRemark"
                            type="text"
                        />
                    </div>
                    <h4 class="field col-12">การวินิจฉัย</h4>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยปากช่องคลอด
                        </label>
                        <div class="flex">
                            <div class="mr-3">
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="intumesceDiagnoseVulva"
                                        name="diagnoseVulva"
                                        value="INTUMESCE"
                                        v-model="form.DiagnoseVulva"
                                    />
                                    <label for="intumesceDiagnoseVulva"
                                        >บวม</label
                                    >
                                </div>
                            </div>
                            <div>
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="normalDiagnoseVulva"
                                        name="diagnoseVulva"
                                        value="NORMAL"
                                        v-model="form.DiagnoseVulva"
                                    />
                                    <label for="normalDiagnoseVulva"
                                        >ไม่บวม</label
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยช่องคลอด
                        </label>
                        <div class="flex">
                            <div class="mr-3">
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="intumesceDiagnoseVagina"
                                        name="diagnoseVagina"
                                        value="INTUMESCE"
                                        v-model="form.DiagnoseVagina"
                                    />
                                    <label for="intumesceDiagnoseVagina"
                                        >บวม</label
                                    >
                                </div>
                            </div>
                            <div>
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="normalDiagnoseVagina"
                                        name="diagnoseVagina"
                                        value="NORMAL"
                                        v-model="form.DiagnoseVagina"
                                    />
                                    <label for="normalDiagnoseVagina"
                                        >ไม่บวม</label
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยลักษณะเมือกช่องคลอด
                        </label>
                        <div class="flex">
                            <div class="mr-3">
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="yesDiagnoseVaginaMucilage"
                                        name="diagnoseVaginaMucilage"
                                        value="YES"
                                        v-model="form.DiagnoseVaginaMucilage"
                                    />
                                    <label for="yesDiagnoseVaginaMucilage"
                                        >มีเมือก</label
                                    >
                                </div>
                            </div>
                            <div>
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="noDiagnoseVagina"
                                        name="diagnoseVaginaMucilage"
                                        value="NO"
                                        v-model="form.DiagnoseVaginaMucilage"
                                    />
                                    <label for="noDiagnoseVagina"
                                        >ไม่มีเมือก</label
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-12">
                        <div class="formgrid grid">
                            <div class="field col-12 sm:col-6">
                                <label
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    การวินิจฉัยคอมดลูก ขนาด (ซม.)
                                </label>
                                <InputText
                                    class="w-full"
                                    type="number"
                                    v-model="form.CervixSize"
                                />
                            </div>
                            <div class="field col-12 sm:col-6">
                                <label
                                    class="block text-600 text-sm font-bold mb-2"
                                >
                                    การวินิจฉัยคอมดลูก ความยาว (ซม.)
                                </label>
                                <InputText
                                    class="w-full"
                                    type="number"
                                    v-model="form.CervixLength"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยลักษณะคอมดลูก
                        </label>
                        <div class="flex">
                            <div class="mr-3">
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="curveCervixType"
                                        name="cervixType"
                                        value="CURVE"
                                        v-model="form.CervixType"
                                    />
                                    <label for="curveCervixType">คด</label>
                                </div>
                            </div>
                            <div>
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="normalCervixType"
                                        name="cervixType"
                                        value="NORMAL"
                                        v-model="form.CervixType"
                                    />
                                    <label for="normalCervixType">ไม่คด</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยลักษณะปากมดลูก
                        </label>
                        <div class="flex">
                            <div class="mr-3">
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="openCervical"
                                        name="cervical"
                                        value="OPEN"
                                        v-model="form.Cervical"
                                    />
                                    <label for="openCervical">เปิด</label>
                                </div>
                            </div>
                            <div>
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="closeCervical"
                                        name="cervical"
                                        value="CLOSE"
                                        v-model="form.Cervical"
                                    />
                                    <label for="closeCervical">ปิด</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยปีกมดลูก ขนาด (ซม.)
                        </label>
                        <InputText
                            class="w-full"
                            type="number"
                            v-model="form.AdnexaSize"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-3">
                            การวินิจฉัยลักษณะปีกมดลูก
                        </label>
                        <div class="flex">
                            <div class="mr-3">
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="equalCervical"
                                        name="AdnexaType"
                                        value="EQUAL"
                                        v-model="form.AdnexaType"
                                    />
                                    <label for="equalCervical">เท่ากัน</label>
                                </div>
                            </div>
                            <div>
                                <div class="field-radiobutton">
                                    <RadioButton
                                        id="unEqualCervical"
                                        name="AdnexaType"
                                        value="UNEQUAL"
                                        v-model="form.AdnexaType"
                                    />
                                    <label for="unEqualCervical"
                                        >ไม่เท่ากัน</label
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            Tone
                        </label>
                        <Dropdown
                            :virtualScrollerOptions="{ itemSize: 38 }"
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            optionLabel="word"
                            optionValue="val"
                            :options="selection.AdnexaTone"
                            v-model="form.AdnexaTone"
                            placeholder="เลือก Tone"
                            :showClear="true"
                        />
                    </div>
                    <h4 class="field col-12">ปัญหาที่พบ</h4>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ปัญหาที่พบของรังไข่ข้างซ้าย
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกปัญหาที่พบของรังไข่ข้างซ้าย"
                            display="chip"
                            optionLabel="OvarySymptomName"
                            optionValue="OvarySymptomID"
                            :options="selection.LeftOvarySymptom"
                            v-model="form.LeftOvarySymptomID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุปัญหาที่พบของรังไข่ข้างซ้าย (ถ้ามี)"
                            v-model="form.LeftOvarySymptomRemark"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ปัญหาที่พบของรังไข่ข้างขวา
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกปัญหาที่พบของรังไข่ข้างซ้าย"
                            display="chip"
                            optionLabel="OvarySymptomName"
                            optionValue="OvarySymptomID"
                            :options="selection.RightOvarySymptom"
                            v-model="form.RightOvarySymptomID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุปัญหาที่พบของรังไข่ข้างซ้าย (ถ้ามี)"
                            v-model="form.RightOvarySymptomRemark"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ปัญหาที่พบของมดลูก/ช่องคลอด
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกปัญหาที่พบของมดลูก/ช่องคลอด"
                            display="chip"
                            optionLabel="VaginaSymptomName"
                            optionValue="VaginaSymptomID"
                            :options="selection.VaginaSymptom"
                            v-model="form.VaginaSymptomID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุปัญหาที่พบของมดลูก/ช่องคลอด (ถ้ามี)"
                            v-model="form.VaginaSymptomRemark"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            ปัญหาที่พบอื่น ๆ
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกปัญหาที่พบอื่น ๆ"
                            display="chip"
                            optionLabel="OtherSymptomName"
                            optionValue="OtherSymptomID"
                            :options="selection.OtherSymptom"
                            v-model="form.OtherSymptomID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุปัญหาที่พบอื่น ๆ (ถ้ามี)"
                            v-model="form.OtherSymptomRemark"
                        />
                    </div>
                    <h4 class="field col-12">สาเหตุโน้มนำ</h4>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            สาเหตุโน้มนำด้านตัวสัตว์
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกสาเหตุโน้มนำด้านตัวสัตว์"
                            display="chip"
                            optionLabel="CauseAnimalName"
                            optionValue="CauseAnimalID"
                            :options="selection.CauseAnimal"
                            v-model="form.CauseAnimalID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุโน้มนำด้านตัวสัตว์ (ถ้ามี)"
                            v-model="form.CauseAnimalRemark"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            สาเหตุโน้มนำด้านสิ่งแวดล้อม
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกสาเหตุโน้มนำด้านสิ่งแวดล้อม"
                            display="chip"
                            optionLabel="CauseEnvironmentName"
                            optionValue="CauseEnvironmentID"
                            :options="selection.CauseEnvironment"
                            v-model="form.CauseEnvironmentID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุโน้มนำด้านสิ่งแวดล้อม (ถ้ามี)"
                            v-model="form.CauseEnvironmentRemark"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            สาเหตุโน้มนำด้านการเลี้ยงและการจัดการ
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกสาเหตุโน้มนำด้านการเลี้ยงและการจัดการ"
                            display="chip"
                            optionLabel="CauseFeederName"
                            optionValue="CauseFeederID"
                            :options="selection.CauseFeeder"
                            v-model="form.CauseFeederID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุโน้มนำด้านการเลี้ยงและการจัดการ (ถ้ามี)"
                            v-model="form.CauseFeederRemark"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            สาเหตุโน้มนำด้านสุขภาพ
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกสาเหตุโน้มนำด้านสุขภาพ"
                            display="chip"
                            optionLabel="CauseHealthName"
                            optionValue="CauseHealthID"
                            :options="selection.CauseHealth"
                            v-model="form.CauseHealthID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุโน้มนำด้านสุขภาพ (ถ้ามี)"
                            v-model="form.CauseHealthRemark"
                        />
                    </div>
                    <h4 class="field col-12">การรักษา</h4>
                    <div class="field col-12">
                        <div class="field-checkbox">
                            <Checkbox
                                :binary="true"
                                v-model="form.CureByHormone"
                            />
                            <label for="cureByHormone">รักษาโดยฮอร์โมน</label>
                        </div>
                        <div v-if="form.CureByHormone">
                            <!-- <label class="block text-600 text-sm font-bold mb-2">
                เลือกฮอร์โมน
              </label>
              <MultiSelect
                class="w-full"
                placeholder="เลือกฮอร์โมน"
                display="chip"
                optionLabel="CureHormoneName"
                optionValue="CureHormoneID"
                :options="selection.CureHormone"
                v-model="form.CureHormoneID"
              /> -->
                            <template
                                v-for="item in cureByHormoneEdit"
                                :key="item"
                            >
                                <div class="formgrid grid">
                                    <div class="field col-6">
                                        <label
                                            class="block text-600 text-sm font-bold mb-2"
                                        >
                                            เลือกฮอร์โมน
                                        </label>
                                        <!-- v-model="form.CureHormoneID[item.id - 1][item.id - 1]" -->

                                        <!-- v-model="form.CureHormoneName[item - 1]" -->
                                        <Dropdown
                                            class="w-full"
                                            :filter="true"
                                            :showClear="true"
                                            optionLabel="CureHormoneName"
                                            optionValue="CureHormoneID"
                                            :options="selection.CureHormone"
                                            v-model="
                                                form.CureHormoneName[item - 1]
                                            "
                                        />
                                    </div>
                                    <div class="field col-6">
                                        <label
                                            class="block text-600 text-sm font-bold mb-2"
                                        >
                                            ระบุปริมาณที่ใช้
                                        </label>
                                        <!-- v-model="form.CureHormoneID[item.id - 1][item.id]" -->
                                        <!-- v-model="form.CureHormoneValue[item - 1]" -->

                                        <InputNumber
                                            id="minmaxfraction"
                                            v-model="
                                                form.CureHormoneValue[item - 1]
                                            "
                                            mode="decimal"
                                            :minFractionDigits="2"
                                            :maxFractionDigits="5"
                                            class="w-full"
                                        />
                                    </div>
                                </div>
                            </template>
                            <div class="field flex justify-content-between">
                                <Button
                                    label="เพิ่ม"
                                    class="p-button-sm"
                                    icon="pi pi-plus"
                                    @click="addCureByHormoneEdit"
                                />
                                <Button
                                    label="ลบ"
                                    class="p-button-sm p-button-danger"
                                    icon="pi pi-minus"
                                    @click="deleteCureByHormoneEdit"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="field col-12">
                        <div class="field-checkbox">
                            <Checkbox
                                :binary="true"
                                v-model="form.CureByAntibiotic"
                            />
                            <label for="cureByAntibiotic"
                                >รักษาโดยยาปฏิชีวนะ</label
                            >
                        </div>
                        <div v-if="form.CureByAntibiotic">
                            <!-- <label class="block text-600 text-sm font-bold mb-2">
                เลือกยาปฏิชีวนะ
              </label>
              <MultiSelect class="w-full" placeholder="เลือกยาปฏิชีวนะ" display="chip" optionLabel="CureAntibioticName"
                optionValue="CureAntibioticID" :options="selection.CureAntibiotic" v-model="form.CureAntibioticID" /> -->
                            <template
                                v-for="item in cureByAntibioticEdit"
                                :key="item"
                            >
                                <div class="formgrid grid">
                                    <div class="field col-6">
                                        <label
                                            class="block text-600 text-sm font-bold mb-2"
                                        >
                                            เลือกยาปฏิชีวนะ
                                        </label>

                                        <Dropdown
                                            class="w-full"
                                            :filter="true"
                                            :showClear="true"
                                            optionLabel="CureAntibioticName"
                                            optionValue="CureAntibioticID"
                                            :options="selection.CureAntibiotic"
                                            v-model="
                                                form.CureAntibioticName[
                                                    item - 1
                                                ]
                                            "
                                        />
                                    </div>
                                    <div class="field col-6">
                                        <label
                                            class="block text-600 text-sm font-bold mb-2"
                                        >
                                            ระบุปริมาณที่ใช้
                                        </label>

                                        <InputNumber
                                            id="minmaxfraction"
                                            v-model="
                                                form.CureAntibioticValue[
                                                    item - 1
                                                ]
                                            "
                                            mode="decimal"
                                            :minFractionDigits="2"
                                            :maxFractionDigits="5"
                                            class="w-full"
                                        />
                                    </div>
                                </div>
                            </template>
                            <div class="field flex justify-content-between">
                                <Button
                                    label="เพิ่ม"
                                    class="p-button-sm"
                                    icon="pi pi-plus"
                                    @click="addCureAntibioticEdit"
                                />
                                <Button
                                    label="ลบ"
                                    class="p-button-sm p-button-danger"
                                    icon="pi pi-minus"
                                    @click="deleteCureAntibioticEdit"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="field col-12">
                        <div class="field-checkbox">
                            <Checkbox
                                :binary="true"
                                v-model="form.CureByVitamin"
                            />
                            <label for="cureByVitamin">รักษาโดยวิตามิน</label>
                        </div>
                        <div v-if="form.CureByVitamin">
                            <!-- <label class="block text-600 text-sm font-bold mb-2">
                เลือกวิตามิน
              </label>
              <MultiSelect class="w-full" placeholder="เลือกวิตามิน" display="chip" optionLabel="CureVitaminName"
                optionValue="CureVitaminID" :options="selection.CureVitamin" v-model="form.CureVitaminID" /> -->
                            <template
                                v-for="item in cureByVitaminEdit"
                                :key="item"
                            >
                                <div class="formgrid grid">
                                    <div class="field col-6">
                                        <label
                                            class="block text-600 text-sm font-bold mb-2"
                                        >
                                            เลือกยาวิตามิน
                                        </label>
                                        <Dropdown
                                            class="w-full"
                                            :filter="true"
                                            :showClear="true"
                                            optionLabel="CureVitaminName"
                                            optionValue="CureVitaminID"
                                            :options="selection.CureVitamin"
                                            v-model="
                                                form.CureVitaminName[item - 1]
                                            "
                                        />
                                        <!-- <Dropdown
                      class="w-full"
                      v-model="item.name"
                      :filter="true"
                      :showClear="true"
                      optionLabel="name"
                    /> -->
                                    </div>
                                    <div class="field col-6">
                                        <label
                                            class="block text-600 text-sm font-bold mb-2"
                                        >
                                            ระบุปริมาณที่ใช้
                                        </label>

                                        <InputNumber
                                            id="minmaxfraction"
                                            v-model="
                                                form.CureVitaminValue[item - 1]
                                            "
                                            mode="decimal"
                                            :minFractionDigits="2"
                                            :maxFractionDigits="5"
                                            class="w-full"
                                        />

                                        <!-- <InputNumber class="w-full" v-model="item.number" /> -->
                                    </div>
                                </div>
                            </template>
                            <div class="field flex justify-content-between">
                                <Button
                                    label="เพิ่ม"
                                    class="p-button-sm"
                                    icon="pi pi-plus"
                                    @click="addCureVitaminEdit"
                                />
                                <Button
                                    label="ลบ"
                                    class="p-button-sm p-button-danger"
                                    icon="pi pi-minus"
                                    @click="deleteCureVitaminEdit"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="field col-12">
                        <div class="field-checkbox">
                            <Checkbox
                                value="1"
                                id="cureByCleanUterus"
                                v-model="form.CureByCleanUterus"
                            />
                            <label for="cureByCleanUterus"
                                >รักษาโดยชะล้างมดลูก</label
                            >
                        </div>
                        <div v-if="form.CureByCleanUterus == 1">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                หมายเหตุชะล้างมดลูก
                                <span class="text-yellow-500">(ถ้ามี)</span>
                            </label>
                            <InputText
                                class="w-full"
                                type="text"
                                placeholder="หมายเหตุชะล้างมดลูก (ถ้ามี)"
                                v-model="form.CureCleanUterusRemark"
                            />
                        </div>
                    </div>
                    <div class="field col-12">
                        <div class="field-checkbox">
                            <Checkbox
                                value="1"
                                id="cureByCleanUterus"
                                v-model="form.CureByOther"
                            />
                            <label for="cureByCleanUterus"
                                >รักษาโดยวิธีอื่น ๆ</label
                            >
                        </div>
                        <div v-if="form.CureByOther == 1">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                หมายเหตุการรักษาโดยวิธีอื่น ๆ
                                <span class="text-yellow-500">(ถ้ามี)</span>
                            </label>
                            <InputText
                                class="w-full"
                                type="text"
                                placeholder="หมายเหตุการรักษาโดยวิธีอื่น ๆ (ถ้ามี)"
                                v-model="form.CureByOtherRemark"
                            />
                        </div>
                    </div>
                    <h4 class="field col-12">เจ้าหน้าที่ผู้รับผิดชอบ</h4>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            คำแนะนำ
                        </label>
                        <MultiSelect
                            class="w-full"
                            placeholder="เลือกคำแนะนำ"
                            display="chip"
                            optionLabel="ReproduceSuggestionName"
                            optionValue="ReproduceSuggestionID"
                            :options="selection.ReproduceSuggestion"
                            v-model="form.ReproduceSuggestionID"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            หมายเหตุ
                            <span class="text-yellow-500">(ถ้ามี)</span>
                        </label>
                        <InputText
                            class="w-full"
                            type="text"
                            placeholder="หมายเหตุ (ถ้ามี)"
                            v-model="form.ReproduceSuggestionRemark"
                        />
                    </div>
                    <div class="col-12 lg:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            คะแนนร่างกาย (BCS)</label
                        >
                        <Dropdown
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            placeholder="เลือกคะแนนร่างกาย"
                            optionLabel="BCSName"
                            optionValue="BCSID"
                            v-model="form.BCSID"
                            :options="selection.BCS"
                        />
                    </div>
                    <div class="field col-12 sm:col-6">
                        <label class="block text-600 text-sm font-bold mb-2">
                            วันที่ตรวจ<span class="text-red-500"> *</span>
                        </label>
                        <!-- <Calendar
              class="w-full"
              id="dateRange"
              v-model="form.ReproduceDate"
              :manualInput="false"
              :maxDate="new Date()"
              placeholder=""
              :showIcon="true"
              :class="{
                'p-invalid': !form.ReproduceDate && valid,
              }"
            /> -->

                        <Datepicker
                            v-model="form.ReproduceDate"
                            :class="{
                                'p-invalid': !form.ReproduceDate && valid,
                            }"
                            id="dateRange"
                            locale="th"
                            :format="format"
                            utc
                            :enableTimePicker="false"
                            :maxDate="new Date()"
                            cancelText="ยกเลิก"
                            selectText="ยืนยัน"
                            placeholder="วันที่ตรวจ"
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
                            เจ้าหน้าที่ผู้วินิจฉัย<span class="text-red-500">
                                *</span
                            >
                        </label>
                        <Dropdown
                            :virtualScrollerOptions="{ itemSize: 38 }"
                            emptyMessage="ไม่มีข้อมูล"
                            emptyFilterMessage="ไม่พบข้อมูล"
                            class="w-full"
                            optionLabel="StaffFullName"
                            optionValue="StaffID"
                            :options="selection.Staff"
                            v-model="form.ResponsibilityStaffID"
                            :filter="true"
                            placeholder="เลือกเจ้าหน้าที่ผู้วินิจฉัย"
                            :showClear="true"
                            :class="{
                                'p-invalid':
                                    !form.ResponsibilityStaffID && valid,
                            }"
                        />
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
            <span class="text-xl">คุณต้องการลบข้อมูลข้อมูลใช่หรือไม่</span>
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
</template>

<script>
import { ref } from "vue";
import { mapGetters } from "vuex";
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import Swal from "sweetalert2";
export default {
    emits: ["refresh_secret_status", "onclear_display"],
    props: {
        permit: {
            type: Array,
            required: true,
        },
        display_prop: {
            type: Boolean,
            required: false,
            default: false,
        },
        animalInfo: {
            type: Object,
            required: false,
            default: null,
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
    setup() {
        const displayAddModal = ref(false);
        // const openAddModal = () => {
        //   displayAddModal.value = true;
        // };
        const closeAddModal = () => {
            displayAddModal.value = false;
        };

        const displayEditModal = ref(false);

        const closeEditModal = () => {
            displayEditModal.value = false;
        };
        const displaydelete = ref(false);
        const opendisplaydelete = () => {
            displaydelete.value = true;
        };
        const closeConfirmation = () => {
            displaydelete.value = false;
        };

        return {
            displayAddModal,
            // openAddModal,
            closeAddModal,
            displayEditModal,

            closeEditModal,
            displaydelete,
            opendisplaydelete,
            closeConfirmation,
        };
    },
    data() {
        return {
            // API
            url: "/reproduce",
            animal_url: "/animal/get-by-farm-id",
            // ID
            id: "ReproduceID",
            // Name
            name: "ตรวจระบบสืบพันธุ์",
            checked: null,
            //load_selection
            LoadSelection: {
                Staff: "/staff/selection?includeAll=false&isActive=1",
                HeatType: "/heat-type",
                HeatCircle: "/heat-circle",
                LeftOvarySymptom: "/ovary-symptom",
                RightOvarySymptom: "/ovary-symptom",
                VaginaSymptom: "/vagina-symptom",
                OtherSymptom: "/other-symptom",
                CauseAnimal: "/cause-animal",
                CauseEnvironment: "/cause-environment",
                CauseFeeder: "/cause-feeder",
                CauseHealth: "/cause-health",
                CureHormone: "/cure-hormone",
                CureAntibiotic: "/cure-antibiotic",
                CureVitamin: "/cure-vitamin",
                ReproduceSuggestion: "/reproduce-suggestion",
                BCS: "/bcs",
            },
            cureAntibioticSettings: [],
            cureByHormoneSettings: [],
            cureVitaminSettings: [],
            cureByCleanUterusSettings: [],
            cureByOtherSettings: [],
            ChildAnimal: [],
            // Selection

            selection: {
                // Staff: null,
                BCSID: null,
                // GiveBirthHelpID: null,
                DiagnoseVulva: [
                    {
                        val: "INTUMESCE",
                        word: "บวม",
                    },
                    {
                        val: "NORMAL",
                        word: "ไม่บวม",
                    },
                ],
                DiagnoseVagina: [
                    {
                        val: "INTUMESCE",
                        word: "บวม",
                    },
                    {
                        val: "NORMAL",
                        word: "ไม่บวม",
                    },
                ],
                DiagnoseVaginaMucilage: [
                    {
                        val: "YES",
                        word: "มีเมือก",
                    },
                    {
                        val: "NO",
                        word: "ไม่มีเมือก",
                    },
                ],
                CervixType: [
                    {
                        val: "CURVE",
                        word: "คด",
                    },
                    {
                        val: "NORMAL",
                        word: "ไม่คด",
                    },
                ],
                Cervical: [
                    {
                        val: "CLOSE",
                        word: "ปิด",
                    },
                    {
                        val: "OPEN",
                        word: "เปิด",
                    },
                ],
                AdnexaType: [
                    {
                        val: "EQUAL",
                        word: "เท่ากัน",
                    },
                    {
                        val: "UNEQUAL",
                        word: "ไม่เท่ากัน",
                    },
                ],
                AdnexaTone: [
                    {
                        val: "1",
                        word: "+",
                    },
                    {
                        val: "2",
                        word: "++",
                    },
                    {
                        val: "3",
                        word: "+++",
                    },
                    {
                        val: "4",
                        word: "++++",
                    },
                ],
            },

            // Search
            isSearch: false,
            isSelection: false,

            // Static Data
            total: null,
            isLoading: false,
            data: [],
            // CureVitamin
            form: {
                CureHormoneID: [],
                CureHormoneName: [],
                CureHormoneValue: [],
                CureVitaminID: [],
                CureVitaminName: [],
                CureVitaminValue: [],
                CureAntibioticID: [],
                CureAntibioticName: [],
                CureAntibioticValue: [],
            },

            cureByHormoneEdit: 0,
            cureByVitaminEdit: 0,
            cureByAntibioticEdit: 0,

            valid: false,
            index: null,
            display: false,
            display_delete: false,
            temp: {},
            curpage: 0,
            formheader: "",
            sortField: "",
            sortOrder: "",
            // uneditable

            controller: new AbortController(),
        };
    },
    async mounted() {
        await this.load();
        await this.load_selection();
        if (
            this.display_prop &&
            this.AnimalSecretStatus.includes(7) &&
            this.permit[0].IsAdd
        ) {
            this.open_add();
        }
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
        // on modal hide
        clear() {
            if (
                this.index == this.data.length - 1 &&
                !this.data[this.index].CreatedUserID
            ) {
                this.data.splice(this.index, 1);
            } else {
                this.data[this.index] = this.temp;
            }
            this.formheader = "";
            this.index = null;
            this.valid = false;
            this.$emit("onclear_display");
        },
        // validate templates
        validation() {
            if (
                !this.form.ResponsibilityStaffID ||
                !this.form.StandingHeatDate ||
                !this.form.ReproduceDate
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
        //load selection
        load_selection() {
            return new Promise((resolve) => {
                var index = 0;
                if (this.isSelection == false) {
                    this.isSelection = true;
                    for (let i in this.LoadSelection) {
                        if (this.LoadSelection[i] == "/staff") {
                            this.LoadSelection[i] =
                                this.LoadSelection[i] +
                                "?StaffOrganizationID=" +
                                this.user.Staff.StaffOrganizationID +
                                "&includeAll=false&isActive=1";
                        }

                        axios
                            .get(this.LoadSelection[i], {
                                signal: this.controller.signal,
                            })
                            .then((response) => {
                                this.selection[i] = response.data.rows;
                                index++;
                            })
                            .catch(() => {
                                //refresh pages
                                Swal.fire({
                                    icon: "warning",
                                    title: "กำลังโหลดข้อมูล",
                                    text: "กรุณารอซักครู่",
                                });

                                setTimeout(() => {
                                    this.$router.go(0);
                                }, 2000);
                            })
                            .finally(() => {
                                if (
                                    Object.keys(this.LoadSelection).length ==
                                    index
                                ) {
                                    resolve();
                                }
                            });
                    }
                }
                resolve();
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
                        resolve();
                    });
            });
        },
        // create or update data
        add() {
            this.form.AnimalID = this.AnimalID;
            for (let i = 0; i < this.form.CureHormoneName.length; i++) {
                this.form.CureHormoneID[i] = [
                    this.form.CureHormoneName[i],
                    this.form.CureHormoneValue[i],
                ];
            }
            for (let i = 0; i < this.form.CureAntibioticName.length; i++) {
                this.form.CureAntibioticID[i] = [
                    this.form.CureAntibioticName[i],
                    this.form.CureAntibioticValue[i],
                ];
            }
            for (let i = 0; i < this.form.CureVitaminName.length; i++) {
                this.form.CureVitaminID[i] = [
                    this.form.CureVitaminName[i],
                    this.form.CureVitaminValue[i],
                ];
            }

            delete this.form.CureHormoneName;
            delete this.form.CureHormoneValue;
            delete this.form.CureAntibioticName;
            delete this.form.CureAntibioticValue;
            delete this.form.CureVitaminName;
            delete this.form.CureVitaminValue;

            if (this.validation() == false) {
                return;
            }

            //create data
            axios
                .post(this.url, this.form)
                .then(() => {
                    this.checkMethod = 0;
                    this.form = {};
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
            //   this.$emit("refresh_secret_status");
        },
        // remove data
        remove() {
            axios.delete(this.url + "/" + this.index).then(() => {
                this.close_delete();
                this.load();
                this.$toast.add({
                    severity: "success",
                    summary: "สำเร็จ",
                    detail: "ลบข้อมูลเสร็จสิ้น",
                    life: 5000,
                });
            });
            //   this.$emit("refresh_secret_status");
        },

        open_add() {
            this.form = {
                CureHormoneID: [],
                CureHormoneName: [],
                CureHormoneValue: [],
                CureVitaminID: [],
                CureVitaminName: [],
                CureVitaminValue: [],
                CureAntibioticID: [],
                CureAntibioticName: [],
                CureAntibioticValue: [],
                ResponsibilityStaffID: this.user.StaffID,
            };
            this.displayAddModal = true;
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
            this.cureByHormoneEdit = 0;
            this.cureByVitaminEdit = 0;
            this.cureByAntibioticEdit = 0;

            id = this.data.find((x) => x.ReproduceID == id);
            this.form = id;
            // console.log(this.form);

            // console.log(this.form.CureHormoneID[0][0]);
            // console.log(this.form.CureHormoneID[0][1]);
            // console.log(this.form.CureHormoneID[1][0]);
            // console.log(this.form.CureHormoneID[1][1]);
            // console.log(this.form.CureHormoneID.length);
            // console.log(this.form.CureVitaminID.length);
            // console.log(this.form.CureAntibioticID.length);

            this.form.CureHormoneName = [];
            this.form.CureHormoneValue = [];

            this.form.CureVitaminName = [];
            this.form.CureVitaminValue = [];

            this.form.CureAntibioticName = [];
            this.form.CureAntibioticValue = [];

            if (this.form.CureHormoneID) {
                for (let i = 0; i < this.form.CureHormoneID.length; i++) {
                    this.cureByHormoneEdit += 1;

                    this.form.CureHormoneName[i] =
                        this.form.CureHormoneID[i][0];
                    this.form.CureHormoneValue[i] =
                        this.form.CureHormoneID[i][1];
                }
            }
            if (this.form.CureVitaminID) {
                for (let i = 0; i < this.form.CureVitaminID.length; i++) {
                    this.cureByVitaminEdit += 1;
                    this.form.CureVitaminName[i] =
                        this.form.CureVitaminID[i][0];
                    this.form.CureVitaminValue[i] =
                        this.form.CureVitaminID[i][1];
                }
            }
            if (this.form.CureAntibioticID) {
                for (let i = 0; i < this.form.CureAntibioticID.length; i++) {
                    this.cureByAntibioticEdit += 1;
                    this.form.CureAntibioticName[i] =
                        this.form.CureAntibioticID[i][0];
                    this.form.CureAntibioticValue[i] =
                        this.form.CureAntibioticID[i][1];
                }
            }

            this.form.CureByHormone =
                this.form.CureByHormone == 1 ? true : false;
            this.form.CureByVitamin =
                this.form.CureByVitamin == 1 ? true : false;
            this.form.CureByAntibiotic =
                this.form.CureByAntibiotic == 1 ? true : false;

            // console.log(this.form.CureByHormone);
            // console.log(this.form.CureByVitamin);
            // console.log(this.form.CureByAntibiotic);
            // console.log(this.cureByHormoneEdit);
            // console.log(this.cureByVitaminEdit);
            // console.log(this.cureByAntibioticEdit);

            // console.log(this.form);

            this.displayEditModal = true;
        },
        close() {
            this.displayAddModal = false;
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
        async update() {
            // validation
            if (this.validation() == false) {
                return;
            }

            // console.log(this.form);

            this.form.CureByHormone = this.form.CureByHormone == true ? 1 : 0;
            this.form.CureByVitamin = this.form.CureByVitamin == true ? 1 : 0;
            this.form.CureByAntibiotic =
                this.form.CureByAntibiotic == true ? 1 : 0;

            this.form.AnimalID = this.AnimalID;
            for (let i = 0; i < this.form.CureHormoneName.length; i++) {
                this.form.CureHormoneID[i] = [
                    this.form.CureHormoneName[i],
                    this.form.CureHormoneValue[i],
                ];
            }
            for (let i = 0; i < this.form.CureAntibioticName.length; i++) {
                this.form.CureAntibioticID[i] = [
                    this.form.CureAntibioticName[i],
                    this.form.CureAntibioticValue[i],
                ];
            }
            for (let i = 0; i < this.form.CureVitaminName.length; i++) {
                this.form.CureVitaminID[i] = [
                    this.form.CureVitaminName[i],
                    this.form.CureVitaminValue[i],
                ];
            }

            delete this.form.CureHormoneName;
            delete this.form.CureHormoneValue;
            delete this.form.CureAntibioticName;
            delete this.form.CureAntibioticValue;
            delete this.form.CureVitaminName;
            delete this.form.CureVitaminValue;

            axios
                .put(this.url + "/" + this.form.ReproduceID, this.form)
                .then(() => {
                    this.checkMethod = 0;
                    this.form = {};
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
        },

        close_delete() {
            this.display_delete = false;
        },
        close_edit() {
            this.displayEditModal = false;
        },
        addCureByHormone() {
            this.form.CureHormoneName.push([]);
            this.form.CureHormoneValue.push([]);
            this.cureByHormoneSettings.push({
                id: this.cureByHormoneSettings.length + 1,
                name: null,
                number: null,
            });
        },
        deleteCureByHormone() {
            this.cureByHormoneSettings.splice(
                this.cureByHormoneSettings.length - 1,
                1
            );
        },
        addCureAntibiotic() {
            this.form.CureAntibioticName.push([]);
            this.form.CureAntibioticValue.push([]);
            this.cureAntibioticSettings.push({
                id: this.cureAntibioticSettings.length + 1,
                name: null,
                number: null,
            });
        },
        deleteCureAntibiotic() {
            this.cureAntibioticSettings.splice(
                this.cureAntibioticSettings.length - 1,
                1
            );
        },
        addCureVitamin() {
            this.form.CureVitaminName.push([]);
            this.form.CureVitaminValue.push([]);
            this.cureVitaminSettings.push({
                id: this.cureVitaminSettings.length + 1,
                name: null,
                number: null,
            });
        },
        deleteCureVitamin() {
            this.cureVitaminSettings.splice(
                this.cureVitaminSettings.length - 1,
                1
            );
        },
        addCureByCleanUterus() {
            this.cureByCleanUterusSettings.push({
                id: this.cureByCleanUterusSettings.length + 1,
                name: null,
                number: null,
            });
        },
        deleteCureByCleanUterus() {
            this.cureByCleanUterusSettings.splice(
                this.cureByCleanUterusSettings.length - 1,
                1
            );
        },
        addCureByOther() {
            this.cureByOtherSettings.push({
                id: this.cureByOtherSettings.length + 1,
                name: null,
                number: null,
            });
        },
        deleteCureByOther() {
            this.cureByOtherSettings.splice(
                this.cureByOtherSettings.length - 1,
                1
            );
        },

        addCureByHormoneEdit() {
            this.form.CureHormoneName.push([]);
            this.form.CureHormoneValue.push([]);
            this.cureByHormoneEdit += 1;
        },
        deleteCureByHormoneEdit() {
            this.cureByHormoneEdit -= 1;
        },
        addCureAntibioticEdit() {
            this.form.CureAntibioticName.push([]);
            this.form.CureAntibioticValue.push([]);
            this.cureByAntibioticEdit += 1;
        },
        deleteCureAntibioticEdit() {
            this.cureByAntibioticEdit -= 1;
        },
        addCureVitaminEdit() {
            this.form.CureVitaminName.push([]);
            this.form.CureVitaminValue.push([]);
            this.cureByVitaminEdit += 1;
        },
        deleteCureVitaminEdit() {
            this.cureByVitaminEdit -= 1;
        },
    },
    unmounted() {
        this.controller.abort();
    },
};
</script>
