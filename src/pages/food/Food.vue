<template>
    <div class="grid">
        <div class="col-12">
            <PageTitle
                title="การจัดเก็บข้อมูลการขุน/อาหาร"
                :pages="breadcrumb"
            />
            <div class="card mb-5">
                <div v-if="!loader" class="grid">
                    <div class="col-12">
                        <h1 class="text-xl mb-4 text-500">
                            เครื่องมือช่วยค้นหาข้อมูลการขุน/อาหาร
                        </h1>
                    </div>
                    <!--  -->
                    <div class="grid">
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
                                v-model="search.ProvinceID"
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
                                v-model="search.AmphurID"
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
                                v-model="search.TumbolID"
                                :options="dropdown.Tumbols"
                                optionLabel="TumbolName"
                                optionValue="TumbolID"
                                :filter="true"
                                :showClear="true"
                                placeholder="ทั้งหมด"
                            >
                            </Dropdown>
                        </div>

                        <div class="col-12 sm:col-12 lg:col-6">
                            <label
                                for="searchOrganizationID"
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ประเภทหน่วยงาน</label
                            >
                            <Dropdown
                                :showClear="true"
                                class="w-full"
                                placeholder="ทั้งหมด"
                                optionLabel="OrganizationTypeName"
                                optionValue="OrganizationTypeID"
                                :virtualScrollerOptions="{ itemSize: 38 }"
                                :options="dropdown.OrganizationTypes"
                                :filter="true"
                                v-model="search.OrganizationTypeID"
                            />
                        </div>

                        <div class="col-12 sm:col-12 lg:col-6">
                            <label
                                for="searchOrganizationID"
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                หน่วยงาน</label
                            >
                            <Dropdown
                                :showClear="true"
                                class="w-full"
                                placeholder="ทั้งหมด"
                                optionLabel="OrganizationFull"
                                optionValue="OrganizationID"
                                :virtualScrollerOptions="{ itemSize: 38 }"
                                :options="dropdown.Organizations"
                                :filter="true"
                                v-model="search.OrganizationID"
                            />
                        </div>

                        <div class="col-12 sm:col-6 lg:col-6">
                            <label
                                for="searchSubDistrict"
                                class="block text-600 text-sm font-bold mb-2"
                            >
                            ฟาร์ม (โปรดระบุศูนย์วิจัยหรือเขตพื้นที่ปศุสัตว์ก่อนเลือกฟาร์ม)</label
                            >
                            <Dropdown
                                class="w-full"
                                :disabled="search.OrganizationZoneID == null && search.AIZoneID == null"
                                v-model="search.FarmID"
                                :options="dropdown.Farms"
                                optionLabel="Fullname"
                                optionValue="FarmID"
                                :filter="true"
                                :showClear="true"
                                :virtualScrollerOptions="{ itemSize: 38 }"
                                placeholder="เลือกหมายเลขฟาร์ม"
                            >
                            </Dropdown>
                        </div>

                        <div class="col-6 sm:col-6 lg:col-6">
                            <label
                                for="searchSubDistrict"
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                โครงการ</label
                            >
                            <MultiSelect
                                style="max-width: 900px"
                                v-model="search.ProjectIDArray"
                                class="w-full"
                                :options="dropdown.Projects"
                                optionLabel="ProjectName"
                                optionValue="ProjectID"
                                placeholder="เลือกโครงการ"
                                display="chip"
                            />
                        </div>
                    </div>
                </div>
                <!--  -->
                <div v-else class="grid">
                    <div class="col-12">
                        <Skeleton
                            width="20rem"
                            height="2rem"
                            class="mb-4"
                        ></Skeleton>
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
                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                        <Skeleton height="2rem"></Skeleton>
                    </div>
                    <div class="col-12">
                        <Skeleton height="2rem" class="mb-2"></Skeleton>
                    </div>
                </div>
            </div>
            <div class="card" v-if="this.search.FarmID">
                <div>
                    <div class="grid flex align-items-center mb-5">
                        <div class="col-12 md:col-6">
                            <h1 class="text-2xl mb-0 text-600">
                                รายการข้อมูลการขุน/อาหาร
                            </h1>
                        </div>
                        <div class="col-12 md:col-6 md:text-right">
                            <Button
                                label="เพิ่มข้อมูลการจัดเก็บข้อมูลการขุน/อาหาร"
                                icon="pi pi-plus"
                                class="w-full md:w-auto"
                                @click="add"
                            />
                        </div>
                    </div>
                    <div class="mt-3">
                        <DataTable
                            class="text-sm"
                            :value="data"
                            :exportable="true"
                            ref="dt"
                            :rowHover="true"
                            :loading="isLoading"
                            :paginator="true"
                            v-model:rows="this.rowPerPage"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            :rowsPerPageOptions="[10, 20, 50]"
                            responsiveLayout="scroll"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                            :totalRecords="total"
                            @page="load"
                            @sort="sort($event)"
                            lazy
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

                            <Column header="จัดการ" style="width: 200px">
                                <template #body="slotProps">
                                    <SplitButton
                                        label="จัดการน้ำหนักเริ่มต้น"
                                        icon="pi pi-pencil"
                                        @click="
                                            edit(slotProps.data.FeedProgramID)
                                        "
                                        class="p-button-sm p-button-outlined p-button-warning"
                                        :model="
                                            getItems(
                                                slotProps.data.FeedProgramID
                                            )
                                        "
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
            </div>
        </div>
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
                        @click="close_delete"
                        class="p-button-secondary w-full mr-3"
                    />
                    <Button
                        label="ยืนยัน"
                        @click="remove"
                        class="p-button-danger w-full ml-3"
                    />
                </div>
            </template>
        </Dialog>
        <!-- End Delete Dialog -->

        <!-- modal ความคืบหน้า -->
        <Dialog
            header="ความคืบหน้า"
            v-model:visible="display_progress"
            :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{ width: '80vw' }"
            :modal="true"
        >
            <form class="formgrid grid">
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        เจ้าหน้าที่ผู้รับผิดชอบ
                        <span class="text-red-500"> *</span>
                    </label>
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
                        :class="{
                            'p-invalid': !form.ResponsibilityStaffID && valid,
                        }"
                    />
                </div>
                <div class="field col-12 md:col-6">
                    <label
                        for="date"
                        class="block text-600 text-sm font-bold mb-2"
                        >เลือกวันที่<span class="text-red-500"> *</span></label
                    >

                    <Datepicker
                        v-model="form.FeedProgramProgressDate"
                        id="dateRange"
                        locale="th"
                        :format="format"
                        utc
                        :enableTimePicker="false"
                        cancelText="ยกเลิก"
                        selectText="ยืนยัน"
                        placeholder="เลือกวันที่"
                        :maxDate="new Date()"
                        autoApply
                    >
                        <template #year-overlay-value="{ text }">
                            {{ parseInt(text) + 543 }}
                        </template>
                        <template #year="{ year }">
                            {{ year + 543 }}
                        </template>
                    </Datepicker>
                </div>
                <div class="field col-12 md:col-6">
                    <label
                        for="typeOfFood"
                        class="block text-600 text-sm font-bold mb-2"
                    >
                        เลือกประเภทอาหาร TMR / อาหารข้นหรือหยาบ<span
                            class="text-red-500"
                        >
                            *</span
                        >
                    </label>
                    <Dropdown
                        class="w-full"
                        id="typeOfFood"
                        v-model="form.FeedType"
                        :options="dropdown.typeFood"
                        optionLabel="label"
                        optionValue="id"
                        :filter="true"
                        :showClear="true"
                        placeholder="เลือกประเภทอาหาร"
                    />
                </div>
                <div class="field col-12" v-if="form.FeedType === 'TMR'">
                    <h4 class="text-xl mb-4 mt-3 text-600">อาหาร TMR</h4>
                    <div class="formgrid grid">
                        <div class="field col-12 md:col-6 xl:col-3">
                            <label
                                for="totalQuantityTMR"
                                class="block text-600 text-sm font-bold mb-2"
                                >ปริมาณอาหาร/วัน (กก.)</label
                            >

                            <InputNumber
                                class="w-full p-inputtext-sm"
                                mode="decimal"
                                :minFractionDigits="2"
                                :maxFractionDigits="2"
                                v-model="form.TotalTMR"
                            />
                        </div>
                        <div class="field col-12 md:col-6 xl:col-3">
                            <label
                                for="proteinPercentageTMR"
                                class="block text-600 text-sm font-bold mb-2"
                                >โปรตีน (%)</label
                            >
                            <InputNumber
                                class="w-full p-inputtext-sm"
                                mode="decimal"
                                :minFractionDigits="2"
                                :maxFractionDigits="2"
                                v-model="form.ProteinPercentage"
                            />
                        </div>
                        <div class="field col-12 md:col-6 xl:col-3">
                            <label
                                for="caloriePercentageTMR"
                                class="block text-600 text-sm font-bold mb-2"
                                >พลังงาน (%)</label
                            >
                            <InputNumber
                                class="w-full p-inputtext-sm"
                                mode="decimal"
                                :minFractionDigits="2"
                                :maxFractionDigits="2"
                                v-model="form.CaloriePercentage"
                            />
                        </div>
                        <div class="field col-12 md:col-6 xl:col-3">
                            <label
                                for="costTMR"
                                class="block text-600 text-sm font-bold mb-2"
                                >ต้นทุนต่อวัน (บาท)</label
                            >
                            <InputNumber
                                class="w-full p-inputtext-sm"
                                mode="decimal"
                                :minFractionDigits="2"
                                :maxFractionDigits="2"
                                v-model="form.CostPerDay"
                            />
                        </div>
                    </div>
                </div>
                <div class="field col-12" v-if="form.FeedType === 'FOOD'">
                    <h4 class="text-xl mb-4 mt-3 text-600">
                        อาหารข้นหรืออาหารหยาบ
                    </h4>
                    <template v-for="(item, index) in foods" :key="item.id">
                        <div class="formgrid grid">
                            <div class="field col-12 md:col-6 xl:col-4">
                                <label
                                    for="chooseFood"
                                    class="block text-600 text-sm font-bold mb-2"
                                    >เลือกอาหารข้นหรือหยาบ</label
                                >
                                <Dropdown
                                    class="w-full"
                                    id="chooseFood"
                                    :filter="true"
                                    :showClear="true"
                                    :options="dropdown.typeFood2"
                                    optionLabel="label"
                                    optionValue="id"
                                    placeholder="เลือกอาหารข้นหรือหยาบ"
                                    :key="index"
                                    v-model="item.Type"
                                    @change="setFood(item.Type, index)"
                                />
                            </div>
                            <div class="field col-12 md:col-6 xl:col-4">
                                <label
                                    for="food"
                                    class="block text-600 text-sm font-bold mb-2"
                                    >เลือกอาหาร</label
                                >
                                <Dropdown
                                    class="w-full"
                                    id="food"
                                    :filter="true"
                                    :key="index"
                                    :options="item.FoodType"
                                    optionLabel="FoodName"
                                    optionValue="FoodID"
                                    v-model="item.FoodID"
                                    :showClear="true"
                                    placeholder="เลือกอาหาร"
                                />
                            </div>
                            <div class="field col-12 md:col-6 xl:col-4">
                                <label
                                    for="totalQuantityTMR"
                                    class="block text-600 text-sm font-bold mb-2"
                                    >ปริมาณอาหาร/วัน (กก.)</label
                                >
                                <InputNumber
                                    class="w-full"
                                    id="totalQuantityTMR"
                                    v-model="item.Total"
                                    :key="index"
                                    @blur="setTotal()"
                                />
                            </div>
                        </div>
                    </template>
                    <div class="formgrid grid">
                        <div class="field col-12 flex justify-content-between">
                            <Button
                                label="เพิ่มอาหาร"
                                class="p-button-sm"
                                icon="pi pi-plus"
                                @click="addFood"
                            />
                            <Button
                                label="ลบ"
                                class="p-button-sm p-button-danger"
                                icon="pi pi-minus"
                                @click="deleteFood"
                            />
                        </div>
                    </div>
                    <div class="formgrid grid">
                        <div class="field col-12 md:col-6 xl:col-3">
                            <label
                                for="totalQuantityFood"
                                class="block text-600 text-sm font-bold mb-2"
                                >ปริมาณอาหาร/วัน (กก.)</label
                            >
                            <InputNumber
                                class="w-full"
                                id="totalQuantityFood"
                                v-model="form.TotalQuantity"
                            />
                        </div>
                        <div class="field col-12 md:col-6 xl:col-3">
                            <label
                                for="proteinPercentageFood"
                                class="block text-600 text-sm font-bold mb-2"
                                >โปรตีน (%)</label
                            >
                            <InputNumber
                                class="w-full"
                                id="proteinPercentageFood"
                                v-model="form.ProteinPercentage"
                            />
                        </div>
                        <div class="field col-12 md:col-6 xl:col-3">
                            <label
                                for="caloriePercentageFood"
                                class="block text-600 text-sm font-bold mb-2"
                                >พลังงาน (%)</label
                            >
                            <InputNumber
                                class="w-full"
                                id="caloriePercentageFood"
                                v-model="form.CaloriePercentage"
                            />
                        </div>
                        <div class="field col-12 md:col-6 xl:col-3">
                            <label
                                for="costFood"
                                class="block text-600 text-sm font-bold mb-2"
                                >ต้นทุนต่อวัน</label
                            >
                            <InputNumber
                                class="w-full"
                                id="costFood"
                                v-model="form.CostPerDay"
                            />
                        </div>
                    </div>
                </div>
            </form>
            <template #footer>
                <div class="grid">
                    <div class="col-6">
                        <Button
                            label="ยกเลิก"
                            class="p-button-secondary w-full"
                            @click="close_progress"
                        />
                    </div>
                    <div class="col-6" v-if="checkLoad">
                        <Button
                            label="แก้ไขข้อมูล"
                            @click="editProgress()"
                            class="w-full"
                        />
                    </div>
                    <div class="col-6" v-else>
                        <Button
                            label="บันทึกข้อมูล"
                            @click="addProgress()"
                            class="w-full"
                        />
                    </div>
                </div>
            </template>
            <form class="formgrid grid" v-if="checkInsert">
                <div class="field col-12">
                    <h4 class="text-xl mb-4 mt-3 text-600">
                        รายงานความคืบหน้า
                    </h4>
                    <DataTable
                        class="text-sm"
                        :value="animalData"
                        responsiveLayout="scroll"
                    >
                        <Column
                            field="Animal.AnimalEarID"
                            header="หมายเลขสัตว์"
                            :sortable="true"
                            class="text-center"
                        ></Column>
                        <Column
                            field="Animal.AnimalName"
                            header="ชื่อสัตว์"
                            :sortable="true"
                            class="text-center"
                        ></Column>
                        <Column field="Weight" header="น้ำหนัก (กก.)">
                            <template #body="slotProps">
                                <InputNumber
                                    class="w-full p-inputtext-sm"
                                    mode="decimal"
                                    :minFractionDigits="2"
                                    :maxFractionDigits="2"
                                    v-model="slotProps.data.Weight"
                                    @blur="
                                        setWeight(
                                            $event,
                                            slotProps.data
                                                .FeedProgramProgressAnimalID
                                        )
                                    "
                                />
                            </template>
                        </Column>
                        <Column field="Height" header="ส่วนสูง (ซม.)">
                            <template #body="slotProps">
                                <InputNumber
                                    class="w-full p-inputtext-sm"
                                    mode="decimal"
                                    :minFractionDigits="2"
                                    :maxFractionDigits="2"
                                    v-model="slotProps.data.Height"
                                    @blur="
                                        setHeight(
                                            $event,
                                            slotProps.data
                                                .FeedProgramProgressAnimalID
                                        )
                                    "
                                />
                            </template>
                        </Column>
                        <Column field="Length" header="ความยาวลำตัว (ซม.)">
                            <template #body="slotProps">
                                <InputNumber
                                    class="w-full p-inputtext-sm"
                                    mode="decimal"
                                    :minFractionDigits="2"
                                    :maxFractionDigits="2"
                                    v-model="slotProps.data.Length"
                                    @blur="
                                        setLength(
                                            $event,
                                            slotProps.data
                                                .FeedProgramProgressAnimalID
                                        )
                                    "
                                />
                            </template>
                        </Column>
                        <Column
                            field="CrossSectionalArea"
                            header="พื้นที่หน้าตัดสันหลัง (ซม.)"
                        >
                            <template #body="slotProps">
                                <InputNumber
                                    class="w-full p-inputtext-sm"
                                    mode="decimal"
                                    :minFractionDigits="2"
                                    :maxFractionDigits="2"
                                    v-model="slotProps.data.CrossSectionalArea"
                                    @blur="
                                        setCrossSectionalArea(
                                            $event,
                                            slotProps.data
                                                .FeedProgramProgressAnimalID
                                        )
                                    "
                                />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </form>
        </Dialog>
    </div>
</template>
<script>
import axios from "axios";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import locale from "dayjs/locale/th";
import PageTitle from "@/components/PageTitle.vue";
import router from "@/router";
import { mapGetters } from "vuex";
import store from "@/service/Vuex";

export default {
    components: {
        PageTitle,
    },
    data() {
        return {
            url: {
                FeedProgram: "/feed-program",
                FeedProgramProgressAnimal: "/feed-program-progress-animal",
                Food: "/food",
                Vaccine: "/vaccine-activity",
                Farm: "/farm",
                ExportFarm: "/farm/export-excel?isActive=1",
                AIZone: "/ai-zone/selection?isActive=1",
                OrganizationZone: "/organization-zone/selection?isActive=1",
                Province: "/province/selection?isActive=1",
                Amphur: "/amphur/selection?isActive=1",
                Tumbol: "/tumbol/selection?isActive=1",
                OrganizationType: "/organization-type/selection?isActive=1",
                Organization: "/organization/selection?isActive=1",
                Project: "/project/selection?includeAll=false&isActive=1",
            },
            urlFarm: "/farm/selection?includeAll=false",
            urlProvince: "/province/selection?includeAll=false",
            json_data: [],
            id: "FeedProgramID",
            name: "ข้อมูลขุนอาหาร",
            columns: [
                {
                    field: "FeedProgramName",
                    header: "ชื่อโปรแกรม",
                },
                {
                    field: "ThaiStartDate",
                    header: "วันที่เข้าขุน/อาหาร",
                },
                {
                    field: "ThaiEndDate",
                    header: "วันที่สิ้นสุดเข้าขุน/อาหาร",
                },
                {
                    field: "WeightGoal",
                    header: "น้ำหนักเป้าหมาย (กก.)",
                },
                {
                    field: "TotalAnimal",
                    header: "จำนวนสัตว์ที่เข้าขุน",
                },
                {
                    field: "PercentSuccess",
                    header: "สำเร็จตามเป้าหมาย (%)",
                },
                {
                    field: "PercentFail",
                    header: "ไม่เป็นไปตามเป้าหมาย (%)",
                },
                {
                    field: "Staff.StaffFullName",
                    header: "ชื่อเจ้าหน้าที่",
                },
            ],
            dropdown: {
                AIZones: [],
                OrganizationZones: [],
                Provinces: [],
                Amphurs: [],
                Tumbols: [],
                OrganizationTypes: [],
                Organizations: [],
                Farms: [],
                Foods: [],
                Projects: [],
                FarmAnimalTypes: [
                    { name: "โค", id: 1 },
                    { name: "กระบือ", id: 2 },
                    { name: "แพะ", id: 3 },
                    { name: "ทุกประเภทสัตว์", id: 99 },
                    { name: "ยังไม่ได้เลือกชนิดสัตว์", id: 98 },
                ],
                typeFood: [
                    { id: "TMR", label: "TMR" },
                    { id: "FOOD", label: "อาหารข้นหรืออาหารหยาบ" },
                ],
                typeFood2: [
                    { id: "1", label: "อาหารข้น" },
                    { id: "2", label: "อาหารหยาบ" },
                ],
            },
            search: {
                // global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                FarmIdentificationNumber: "",
                FarmName: "",
                dateRange: null,
                AIZoneID: null,
                OrganizationZoneID: null,
                ProvinceID: null,
                AmphurID: null,
                TumbolID: null,
                OrganizationTypeID: null,
                OrganizationID: null,
                FarmID: null,
                FarmAnimalType: null,
            },
            // Static Data
            checkInsert: false,
            isLoading: false,
            loader: false,
            total: null,
            data: [],
            valid: false,
            index: null,
            display: false,
            display_delete: false,
            detailInfo: {},
            displayDetail: false,
            temp: [],
            curpage: 0,
            formheader: "",
            sortField: "",
            sortOrder: "",
            items: [
                {
                    label: "ดูข้อมูลฟาร์ม",
                    icon: "pi pi-eye",
                },
                {
                    label: "แก้ไข",
                    icon: "pi pi-pencil",
                },
                {
                    label: "ลบ",
                    icon: "pi pi-times",
                },
            ],
            breadcrumb: [{ label: "", to: "" }],
            permit: null,
            //
            rowPerPage: 20,
            currentPage: 1,
            totalPage: 1,
            totalItems: 0,
            isOverlay: true,
            orderBy: "created_at",
            order: "desc",
            //

            program: [],
            display_progress: false,
            FeedProgramProgressID: null,
            form: {
                isActive: 1,
                TotalQuantity: 0,
            },
            animalData: [],
            foods: [],
            foodList: [],
            params: {},
            filtered: {},
            //
            controller: new AbortController(),
        };
    },
    computed: {
        ...mapGetters({
            permission: "get_permission",
            user: "user",
            AnimalID: "AnimalID",
            animal_id: "animal_id",
        }),
        set_farm() {
            return store.state.SetFarmVaccine;
        },
    },
    mounted() {
        if (this.search.FarmAnimalType == null) {
            this.search.FarmAnimalType = parseInt(this.animal_id);
        }

        this.dropdown.FarmAnimalTypes = this.dropdown.FarmAnimalTypes.filter(
            (x) => {
                return x.id == this.animal_id || x.id == 98 || x.id == 99;
            }
        );

        this.loadDefault();
        this.load();
        dayjs.extend(buddhistEra);
        // this.breadcrumb[1].label = this.name;
        this.permit = this.permission.filter((item) => {
            return item.MenuID == 1;
        });

        if (store.state.user.Staff.Organization.OrganizationZoneID) {
            this.search.OrganizationZoneID =
                store.state.user.Staff.Organization.OrganizationZoneID;
        }
    },
    watch: {
        "search.AIZoneID"(val) {
            if (val) {
                this.search.OrganizationZoneID = null;
                this.isSelectAIZoneDisabled = false;
                this.isSelectOrganizationZoneDisabled = true;
            } else {
                this.isSelectAIZoneDisabled = false;
                this.isSelectOrganizationZoneDisabled = false;
            }

            this.dropdown.Provinces = [];
            this.dropdown.Amphurs = [];
            this.dropdown.Tumbols = [];
            this.dropdown.Organizations = [];
            this.dropdown.Farms = [];
            this.data = [];

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.fetchProvince();
                    this.fetchOrganization();
                    this.fetchFarm();

                    this.search.ProvinceID = null;
                    this.search.AmphurID = null;
                    this.search.TumbolID = null;
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
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
                this.isSelectOrganizationZoneDisabled = false;
            }

            this.dropdown.Provinces = [];
            this.dropdown.Amphurs = [];
            this.dropdown.Tumbols = [];
            this.dropdown.Organizations = [];
            this.dropdown.Farms = [];
            this.data = [];

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.fetchProvince();
                    this.fetchOrganization();
                    this.fetchFarm();

                    this.search.ProvinceID = null;
                    this.search.AmphurID = null;
                    this.search.TumbolID = null;
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.ProvinceID"() {
            this.fetchAmphur();
            this.fetchOrganization();
            this.fetchFarm();
            this.dropdown.Amphurs = [];
            this.dropdown.Tumbols = [];

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.search.AmphurID = null;
                    this.search.TumbolID = null;
                    //   this.search.OrganizationTypeID = null;
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.AmphurID"() {
            this.fetchTumbol();
            this.fetchOrganization();
            this.fetchFarm();
            this.dropdown.Tumbols = [];

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.search.TumbolID = null;
                    //   this.search.OrganizationTypeID = null;
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.TumbolID"() {
            this.fetchOrganization();
            this.fetchFarm();

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.OrganizationTypeID"() {
            this.fetchOrganization();

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.OrganizationID"() {
            this.fetchFarm();

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.FarmID"() {
            this.fetchProgram();
            this.loadProgram();
            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.ProjectIDArray"() {
            this.fetchFarm();
            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.FarmAnimalType"() {
            this.fetchFarm();

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            }
        },
    },
    methods: {
        async edit(id) {
            if (this.permit[0].IsUpdate == 0) {
                this.$toast.add({
                    severity: "error",
                    summary: "ล้มเหลว",
                    detail: "ไม่มีสิทธิ์แก้ไข",
                    life: 5000,
                });
                return;
            }

            let getID = this.data.find((item) => item.FeedProgramID == id);
            await router.push({
                path: `/activity/food/edit/${getID.FeedProgramID}`,
            });
        },
        project_check(id) {
            let prepare_data = this.data.find(function (item) {
                return item.FarmID == id;
            });
            let project_id = prepare_data.ProjectID;
            let projects = prepare_data.Projects;

            if (this.user.GroupID == 1 || this.user.GroupID == 2) {
                return true;
            } else {
                if (project_id == 21) {
                    this.$toast.add({
                        severity: "error",
                        summary: "ไม่มีสามารถแก้ไขได้",
                        detail: "เนื่องจากอยู่ใน " + projects.toString(),
                        life: 5000,
                    });
                    return false;
                } else {
                    return true;
                }
            }
        },
        open_progress(id) {
            axios
                .get("/staff/selection?includeAll=false&isActive=1", {
                    signal: this.controller.signal,
                })
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
            this.form.FeedProgramID = id;

            this.form.ResponsibilityStaffID = this.user.StaffID;
            this.display_progress = true;
        },

        getItems(id) {
            const items = [
                {
                    label: "ความคืบหน้า",
                    icon: "pi pi-external-link",
                    command: () => {
                        this.open_progress(id);
                    },
                },
                {
                    label: "ลบ",
                    icon: "pi pi-trash",
                    command: () => {
                        this.open_delete(id);
                        this.display_delete = true;
                    },
                },
            ];
            return items;
        },
        close_progress() {
            this.display_progress = false;
        },
        async loadProgram() {
            let params = {};

            if (this.animal_id == 1) {
                params["AnimalTypeID"] = "[1,2,41,42]";
            } else if (this.animal_id == 2) {
                params["AnimalTypeID"] = "[3,4,43,44]";
            } else if (this.animal_id == 3) {
                params["AnimalTypeID"] = "[17,18,45,46]";
            }

            axios
                .get(this.url.FeedProgram + "?FarmID=" + this.search.FarmID, {
                    params: this.params,
                    signal: this.controller.signal,
                })
                .then((response) => {
                    this.total = response.data.total;
                    this.program = response.data.rows;

                    if (this.curpage == 0 || this.curpage == 1) {
                        for (let i = 0; i < this.program.length; i++) {
                            this.program[i].show_id = i + 1;
                            if (
                                this.program[i].StartDate != null ||
                                this.program[i].EndDate != null
                            ) {
                                this.program[i].StartDate = dayjs(
                                    this.program[i].StartDate
                                )
                                    .locale(locale)
                                    .format("DD/MM/YYYY");
                                this.program[i].EndDate = dayjs(
                                    this.program[i].EndDate
                                )
                                    .locale(locale)
                                    .format("DD/MM/YYYY");
                            }
                        }
                    } else {
                        let start = (this.curpage - 1) * 15;
                        for (let i = 0; i < this.program.length; i++) {
                            this.program[i].show_id = i + 1 + start;
                        }
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        async addProgress() {
            let data = this.program.find(
                (x) => x.FeedProgramID == this.form.FeedProgramID
            );

            // console.log(data);

            if (this.form.FeedType === "TMR") {
                console.log(data);
                await axios
                    .post("/feed-program-progress", this.form)
                    .then(async (res) => {
                        this.FeedProgramProgressID =
                            res.data.FeedProgramProgressID;

                        for (
                            let i = 0;
                            i < data.FeedProgramAnimals.length;
                            i++
                        ) {
                            let formData = {
                                FeedProgramProgressID:
                                    this.FeedProgramProgressID,
                                FeedProgramAnimalID:
                                    data.FeedProgramAnimals[i]
                                        .FeedProgramAnimalID,
                                AnimalID: data.FeedProgramAnimals[i].AnimalID,
                                WeightDate: this.form.FeedProgramProgressDate,
                                Weight: 0,
                                isActive: 1,
                            };
                            await this.insertAnimal(formData);
                        }
                        this.$toast.add({
                            severity: "success",
                            summary: "สำเร็จ",
                            detail: "เพิ่มข้อมูลเสร็จสิ้น",
                            life: 3000,
                        });
                        // this.$router.push("/activity/food");
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$toast.add({
                            severity: "error",
                            summary: "ล้มเหลว",
                            detail: err.response.data.error.message,
                            life: 5000,
                        });
                    })
                    .finally(() => {
                        this.fetchAnimal();
                        // this.loadAnimal();
                    });
                this.fetchAnimal();

                // this.loadAnimal();
            } else if (this.form.FeedType === "FOOD") {
                this.setTotal();
                await axios
                    .post("/feed-program-progress", this.form)
                    .then(async (res) => {
                        this.FeedProgramProgressID =
                            res.data.FeedProgramProgressID;

                        for (
                            let i = 0;
                            i < data.FeedProgramAnimals.length;
                            i++
                        ) {
                            let formData = {
                                FeedProgramProgressID:
                                    this.FeedProgramProgressID,
                                FeedProgramAnimalID:
                                    data.FeedProgramAnimals[i]
                                        .FeedProgramAnimalID,
                                AnimalID: data.FeedProgramAnimals[i].AnimalID,
                                WeightDate: this.form.FeedProgramProgressDate,
                                Weight: 0,
                                isActive: 1,
                            };

                            await this.insertAnimal(formData);
                        }

                        for (let i = 0; i < this.foods.length; i++) {
                            let foodData = {
                                FeedProgramProgressID:
                                    this.FeedProgramProgressID,
                                FoodID: this.foods[i].FoodID,
                                Total: this.foods[i].Total,
                                isActive: 1,
                            };

                            await this.insertFood(foodData);
                        }

                        this.$toast.add({
                            severity: "success",
                            summary: "สำเร็จ",
                            detail: "เพิ่มข้อมูลเสร็จสิ้น",
                            life: 3000,
                        });
                        // this.$router.push("/activity/food");
                    })
                    .catch((err) => {
                        this.$toast.add({
                            severity: "error",
                            summary: "ล้มเหลว",
                            detail: err.response.data.error.message,
                            life: 5000,
                        });
                    })
                    .finally(() => {
                        this.fetchAnimal();
                    });

                // this.loadAnimal();
                this.fetchAnimal();
            }
        },

        async insertAnimal(formData) {
            // console.log(formData);
            axios
                .post(this.url.FeedProgramProgressAnimal, formData)
                .then(() => {
                    this.checkInsert = true;
                })
                // error
                .catch((err) => {
                    this.$toast.add({
                        severity: "error",
                        summary: "ล้มเหลว",
                        detail: err.response.data.error.message,
                        life: 5000,
                    });
                });
            // return await new Promise(() => {

            // });
        },

        formatArray(value) {
            return value.toLocaleString();
        },
        // sort table
        sort($event) {
            if ($event.sortField !== "show_id") {
                if ($event.sortOrder == 1) {
                    this.sortOrder = "asc";
                } else {
                    this.sortOrder = "desc";
                }
                this.sortField = $event.sortField;
                this.load();
            }
        },

        addFood() {
            this.foods.push({
                id: this.foods.length + 1,
                FeedProgramProgressID: "",
                FoodID: "",
                Total: 0,
                setting: this.selectesetting,
            });
        },

        setFood(data, id) {
            if (data == "1") {
                this.foods[id].FoodType = this.foodList.filter(
                    (item) => item.FoodType == "1"
                );
            } else {
                this.foods[id].FoodType = this.foodList.filter(
                    (item) => item.FoodType == "2"
                );
            }
            console.log(this.foods);
        },

        setFood2() {
            // console.log(555);
            // console.log(this.foods);

            for (var i = 0; i < this.foods.length; i++) {
                if (this.foods[i].Type == "1") {
                    this.foods[i].FoodType = this.foodList.filter(
                        (item) => item.FoodType == "1"
                    );
                } else {
                    this.foods[i].FoodType = this.foodList.filter(
                        (item) => item.FoodType == "2"
                    );
                }
            }
        },

        setTotal() {
            let total = 0;
            for (let i = 0; i < this.foods.length; i++) {
                total += this.foods[i].Total;
            }
            this.form.TotalQuantity = total;
        },

        setWeight($event, $id) {
            let form = {
                Weight: $event.value,
            };
            axios
                .put(this.url.FeedProgramProgressAnimal + "/" + $id, form)
                .then(() => {
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "ข้อมูลถูกบันทึก",
                        // detail: "เพิ่มข้อมูลเสร็จสิ้น",
                        life: 500,
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
        setHeight($event, $id) {
            let form = {
                Height: $event.value,
            };
            axios
                .put(this.url.FeedProgramProgressAnimal + "/" + $id, form)
                .then(() => {
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "ข้อมูลถูกบันทึก",
                        // detail: "เพิ่มข้อมูลเสร็จสิ้น",
                        life: 500,
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
        setLength($event, $id) {
            let form = {
                Length: $event.value,
            };
            axios
                .put(this.url.FeedProgramProgressAnimal + "/" + $id, form)
                .then(() => {
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "ข้อมูลถูกบันทึก",
                        // detail: "เพิ่มข้อมูลเสร็จสิ้น",
                        life: 500,
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
        setCrossSectionalArea($event, $id) {
            let form = {
                CrossSectionalArea: $event.value,
            };
            axios
                .put(this.url.FeedProgramProgressAnimal + "/" + $id, form)
                .then(() => {
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "ข้อมูลถูกบันทึก",
                        // detail: "เพิ่มข้อมูลเสร็จสิ้น",
                        life: 500,
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

        loadDefault() {
            this.isLoading = true;
            this.fetchFood();
            this.fetchAIZone();
            this.fetchOrganizationZone();
            this.fetchProject();
            this.fetchProvince();
            this.fetchAmphur();
            this.fetchTumbol();
            this.fetchOrganizationType();
            this.fetchOrganization();
            this.fetchFarm();
        },
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

                    console.log(this.dropdown.AIZones);
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
        fetchProject() {
            let params = {};

            if (this.animal_id == 1) {
                params["AnimalTypeID"] = "[1,2,41,42]";
            } else if (this.animal_id == 2) {
                params["AnimalTypeID"] = "[3,4,43,44]";
            } else if (this.animal_id == 3) {
                params["AnimalTypeID"] = "[17,18,45,46]";
            }

            axios
                .get(this.url.Project, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Projects = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchProvince() {
            //  Fetch Province
            let params = {};

            if (this.search.AIZoneID != null) {
                params["AIZoneID"] = this.search.AIZoneID;
            }

            if (this.search.OrganizationZoneID != null) {
                params["OrganizationZoneID"] = this.search.OrganizationZoneID;
            }
            axios
                .get(this.urlProvince, {
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
        fetchAmphur() {
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null &&
                this.search.ProvinceID == null
            ) {
                return;
            }

            let params = {};

            if (this.search.ProvinceID != null) {
                params["ProvinceID"] = this.search.ProvinceID;
            }

            axios
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
        fetchTumbol() {
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null &&
                this.search.AmphurID == null
            ) {
                return;
            }

            let params = {};

            if (this.search.AmphurID != null) {
                params["AmphurID"] = this.search.AmphurID;
            }

            axios
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
        fetchOrganizationType() {
            let params = {};

            axios
                .get(this.url.OrganizationType, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.OrganizationTypes = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchOrganization() {
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null
            ) {
                return;
            }

            let params = {};

            if (this.search.OrganizationTypeID != null) {
                params["OrganizationTypeID"] = this.search.OrganizationTypeID;
            }

            // Province IN AIZOne
            if (this.search.AIZoneID != null) {
                params["OrganizationAiZoneID"] = this.search.AIZoneID;
            }

            if (this.search.OrganizationZoneID != null) {
                params["OrganizationZoneID"] = this.search.OrganizationZoneID;
            }

            if (this.search.ProvinceID != null) {
                params["OrganizationProvinceID"] = this.search.ProvinceID;
            }

            if (this.search.AmphurID != null) {
                params["OrganizationAmphurID"] = this.search.AmphurID;
            }

            if (this.search.TumbolID != null) {
                params["OrganizationTumbolID"] = this.search.TumbolID;
            }

            axios
                .get(this.url.Organization, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Organizations = res.data.rows.map((item) => {
                        return {
                            OrganizationID: item.OrganizationID,
                            OrganizationFull:
                                item.OrganizationCode +
                                ", " +
                                item.OrganizationName,
                        };
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        fetchFarm() {
            this.isLoading = true;
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null
            ) {
                this.isLoading = false;
                return;
            }

            let params = {
                size: this.rowPerPage,
                page: this.currentPage,
                orderByField: "FarmID",
                orderBy: "desc",
                // includeAll: false,
            };

            if (this.search.FarmAnimalType == null) {
                this.search.FarmAnimalType = parseInt(this.AnimalID);
                params["FarmAnimalType"] = this.search.FarmAnimalType;
            } else {
                params["FarmAnimalType"] = this.search.FarmAnimalType;
            }

            // Province IN AIZOne
            if (this.search.AIZoneID != null) {
                if (this.search.AIZoneID != 99) {
                    params["AIZoneID"] = this.search.AIZoneID;
                }
            }

            if (this.search.OrganizationZoneID != null) {
                if (this.search.OrganizationZoneID != 99) {
                    params["OrganizationZoneID"] =
                        this.search.OrganizationZoneID;
                }
            }

            if (this.search.ProvinceID != null) {
                params["FarmProvinceID"] = this.search.ProvinceID;
            }

            if (this.search.AmphurID != null) {
                params["FarmAmphurID"] = this.search.AmphurID;
            }

            if (this.search.TumbolID != null) {
                params["FarmTumbolID"] = this.search.TumbolID;
            }

            if (this.search.OrganizationID != null) {
                params["OrganizationID"] = this.search.OrganizationID;
            }

            if (this.search.OrganizationID != null) {
                params["OrganizationID"] = this.search.OrganizationID;
            }

            if (this.search.ProjectIDArray) {
                params["ProjectID"] = JSON.stringify(
                    this.search.ProjectIDArray
                );
            }

            if (this.search.FarmID) {
                params["FarmID"] = this.search.FarmID;
            }

            //
            axios
                .get(this.urlFarm, {
                    signal: this.controller.signal,
                    params: { ...params, size: undefined, page: 1 },
                })
                .then((res) => {
                    this.dropdown.Farms = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        fetchFood() {
            axios.get(this.url.Food).then((response) => {
                this.dropdown.Foods = response.data.rows;
            });
        },
        fetchProgram() {
            this.isLoading = true;

            let params = {
                size: this.rowPerPage,
                page: this.currentPage,
                orderByField: "FarmID",
                orderBy: "desc",
            };

            if (this.search.FarmID) {
                params["FarmID"] = this.search.FarmID;
            } else {
                return;
            }

            axios
                .get(this.url.FeedProgram, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.data = res.data.rows.sort(
                        (a, b) =>
                            new Date(b.ThaiStartDate) -
                            new Date(a.ThaiStartDate)
                    );
                    this.totalPage = res.data.totalPage;
                    this.totalItems = res.data.totalData;
                    this.total = res.data.total;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchAnimal() {
            axios
                .get(
                    this.url.FeedProgramProgressAnimal +
                        "?FeedProgramProgressID=" +
                        this.FeedProgramProgressID,
                    { signal: this.controller.signal }
                )
                .then((response) => {
                    this.animalData = response.data.rows;
                })
                .catch((err) => {
                    this.$toast.add({
                        severity: "error",
                        summary: "ล้มเหลว",
                        detail: err.response.data.error.message,
                        life: 5000,
                    });
                })

                .finally(() => {
                    this.isLoading = false;
                });
        },

        load(event) {
            if (event) {
                this.currentPage = event.page + 1;
            }

            this.fetchProgram();
        },
        add() {
            if (this.permit[0].IsAdd == 0) {
                this.$toast.add({
                    severity: "error",
                    summary: "ล้มเหลว",
                    detail: "ไม่มีสิทธิ์เพิ่ม",
                    life: 5000,
                });
                return;
            } else {
                const id = this.search.FarmID;
                // let item = this.dropdown.Farms.find(
                //     (id) => id.FarmID == this.search.FarmID
                // );

                // const farm = item.FarmIdentificationNumber;

                router.push({ name: "addfood", params: { id } });
            }
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
            this.data.id = id;
            this.display_delete = true;
        },
        close_delete() {
            this.display_delete = false;
        },
        // remove data
        remove() {
            axios.delete(this.url.FeedProgram + this.data.id).then(() => {
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
    },
    unmounted() {
        this.controller.abort();
    },
};
</script>

<style>
.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
}
.styled-table th,
.styled-table td {
    padding: 12px 15px;
}

.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}
/* .styled-table tbody tr.active-row { */
/* font-weight: bold; */
/* color: #009879; */
/* } */

.pagination-container {
    display: flex;
    column-gap: 10px;
}
.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}
.active-page:hover {
    background-color: #2988c8;
}
.p-button:focus {
    box-shadow: #fff;
}
</style>
