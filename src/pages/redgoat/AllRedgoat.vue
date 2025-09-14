<template>
    <div class="grid">
        <div class="col-12">
            <PageTitle
                title="ข้อมูล : บันทึกการเจริญเติบโต"
                :pages="breadcrumb"
            />
            <div class="card mb-5">
                <div v-if="!loader" class="grid">
                    <div class="col-12">
                        <h1 class="text-xl mb-4 text-500">
                            เครื่องมือช่วยค้นหาข้อมูล : บันทึกการเจริญเติบโต
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
                                v-model="search.FarmID"
                                :disabled="search.OrganizationZoneID == null && search.AIZoneID == null"
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
                                รายการข้อมูล : บันทึกการเจริญเติบโต
                            </h1>
                        </div>
                        <div class="col-12 md:col-6 md:text-right">
                            <Button
                                label="เพิ่มข้อมูล RedGoat"
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
                                        @click="edit(slotProps.data.RedGoatID)"
                                        label="แก้ไข"
                                        icon="pi pi-pencil"
                                        class="p-button-sm p-button-outlined p-button-warning"
                                        :model="
                                            getItems(slotProps.data.RedGoatID)
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
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                รอบการบันทึก<span class="text-red-500"
                                    >*</span
                                ></label
                            >

                            <Dropdown
                                emptyMessage="ไม่มีข้อมูล"
                                emptyFilterMessage="ไม่พบข้อมูล"
                                class="w-full"
                                id="selectedScheme"
                                placeholder="รอบการบันทึก"
                                :options="project_level"
                                optionLabel="name"
                                :class="{
                                    'p-invalid': !form.RedGoatRound && valid,
                                }"
                                v-model="form.RedGoatRound"
                            />
                        </div>

                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                วันที่บันทึก<span class="text-red-500"
                                    >*</span
                                ></label
                            >
                            <Calendar
                                class="w-full"
                                placeholder="วันที่บันทึก"
                                :maxDate="new Date()"
                                :showButtonBar="true"
                                :showIcon="true"
                                v-model="form.RedGoatDate"
                                :class="{
                                    'p-invalid': !form.RedGoatDate && valid,
                                }"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                เจ้าหน้าที่ผู้รับผิดชอบ<span
                                    class="text-red-500"
                                    >*</span
                                ></label
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
                                :class="{
                                    'p-invalid':
                                        !form.ResponsibilityStaffID && valid,
                                }"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความสูงหัวไหล่ (ซม.)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                :class="{
                                    'p-invalid': !form.ShoulderHeight && valid,
                                }"
                                v-model="form.ShoulderHeight"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความกว้างหัวไหล่ (ซม.)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                :class="{
                                    'p-invalid': !form.ShoulderWidth && valid,
                                }"
                                v-model="form.ShoulderWidth"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความยาวลำตัว (ซม.)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                :class="{
                                    'p-invalid': !form.BodyLength && valid,
                                }"
                                v-model="form.BodyLength"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความแข็งแรงของหลัง (ส่วนเอว) (คะแนน)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                :class="{
                                    'p-invalid': !form.WaistScore && valid,
                                }"
                                v-model="form.WaistScore"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความกว้างเชิงกราน (ซม.)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.PelvisWidth"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                มุมสะโพกมุมเฉียง (ซม.)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.HipCurve"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความยาวสะโพก (ซม.)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.HipLength"
                            />
                        </div>
                        <div
                            class="field col-12 sm:col-6 md:col-6"
                            v-if="checkSex == '1'"
                        >
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                เส้นรอบวงอัณฑะ (ซม.) เฉพาะเพศผู้</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.TestisLength"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ลักษณะขาหลังด้านหลัง (คะแนน)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.LegHindScore"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ลักษณะขาหลังด้านข้าง (คะแนน)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.LegSideScore"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ลักษณะการเดิน (คะแนน)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.WalkingScore"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความกว้างช่องอก (ซม.)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.ChestWidth"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความลึกลำตัว (ซม.)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.BodyDeep"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความกางของกระดูกซี่โครง (คะแนน)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.RibWidth"
                            />
                        </div>
                        <div
                            class="field col-12 sm:col-6 md:col-6"
                            v-if="checkSex == '2'"
                        >
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                การยึดเกาะของเต้านมด้านหน้า (คะแนน)
                                เฉพาะเพศเมีย</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.BreastFrontScore"
                            />
                        </div>
                        <div
                            class="field col-12 sm:col-6 md:col-6"
                            v-if="checkSex == '2'"
                        >
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความสูงของเนื้อเยื่อเต้านมด้านหลัง (ซม.)
                                เฉพาะเพศเมีย</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.BreastHeight"
                            />
                        </div>
                        <div
                            class="field col-12 sm:col-6 md:col-6"
                            v-if="checkSex == '2'"
                        >
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความกว้างของเต้านมด้านหลัง (ซม.)
                                เฉพาะเพศเมีย</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.BreastWidth"
                            />
                        </div>
                        <div
                            class="field col-12 sm:col-6 md:col-6"
                            v-if="checkSex == '2'"
                        >
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความแข็งแรงของเอ็นยึดเต้านม (ซม.)
                                เฉพาะเพศเมีย</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.BreastLigament"
                            />
                        </div>
                        <div
                            class="field col-12 sm:col-6 md:col-6"
                            v-if="checkSex == '2'"
                        >
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความลึกของเต้านม (ซม.) เฉพาะเพศเมีย</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.BreastDeep"
                            />
                        </div>
                        <div
                            class="field col-12 sm:col-6 md:col-6"
                            v-if="checkSex == '2'"
                        >
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ตำแหน่งของหัวนมด้านหลัง (คะแนน)
                                เฉพาะเพศเมีย</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.BreastHindScore"
                            />
                        </div>
                        <div
                            class="field col-12 sm:col-6 md:col-6"
                            v-if="checkSex == '2'"
                        >
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ตำแหน่งของหัวนมด้านข้าง (คะแนน)
                                เฉพาะเพศเมีย</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.BreastSideScore"
                            />
                        </div>
                        <div
                            class="field col-12 sm:col-6 md:col-6"
                            v-if="checkSex == '2'"
                        >
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ลักษณะของหัวนม (คะแนน) เฉพาะเพศเมีย</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.BreastLength"
                            />
                        </div>
                        <div class="field col-12 sm:col-6 md:col-6">
                            <label
                                class="block text-600 text-sm font-bold mb-2"
                            >
                                ความแข็งแรงของหลัง (ส่วนเอว) (คะแนน)</label
                            >
                            <InputText
                                type="number"
                                class="w-full"
                                v-model="form.TitsScore"
                            />
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
            <template #footer> </template>
        </Dialog>
    </div>
</template>
<script>
import axios from "axios";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
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
                RedGoat: "/red-goat",
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
            apiPersonal: "/staff?isActive=1",
            urlFarm: "/farm/selection?includeAll=false",
            urlProvince: "/province/selection?includeAll=false",
            json_data: [],
            personal: [],
            id: "RedGoatID",
            name: "ข้อมูล: RedGoat",
            display_edit: false,
            project_level: [
                {
                    id: "1",
                    name: "1 เดือน",
                },
                {
                    id: "2",
                    name: "1 ปี",
                },
            ],
            columns: [
                // {
                //   field: "show_id",
                //   header: "ลำดับ",
                // },

                {
                    field: "ThaiRedGoatDate",
                    header: "วันที่บันทึก",
                },
                // {
                //     field: "Animal.AnimalFarm.FarmName",
                //     header: "ชื่อฟาร์ม",
                // },
                {
                    field: "Animal.Fullname",
                    header: "ชื่อสัตว์",
                },
                {
                    field: "Round",
                    header: "รอบการบันทึก",
                },
                {
                    field: "ShoulderHeight",
                    header: "ความสูงหัวไหล่(ซม.)",
                },
                {
                    field: "ShoulderWidth",
                    header: "ความกว้างหัวไหล่(ซม.)",
                },
                {
                    field: "BodyLength",
                    header: "ความยาวลำตัว(ซม.)",
                },
                {
                    field: "WaistScore",
                    header: "ความแข็งแรงของหลัง(ส่วนเอว)(คะแนน)",
                },
                {
                    field: "PelvisWidth",
                    header: "ความกว้างเชิงกราน(ซม.)",
                },
                {
                    field: "HipCurve",
                    header: "มุมสะโพกมุมเฉียง(ซม.)",
                },
                {
                    field: "HipLength",
                    header: "ความยาวสะโพก(ซม.)",
                },
                {
                    field: "TestisLength",
                    header: "เส้นรอบวงอัณฑะ(ซม.) เฉพาะเพศผู้",
                },
                {
                    field: "LegHindScore",
                    header: "ลักษณะขาหลังด้านหลัง(คะแนน)",
                },
                {
                    field: "LegSideScore",
                    header: "ลักษณะขาหลังด้านข้าง(คะแนน)",
                },
                {
                    field: "WalkingScore",
                    header: "ลักษณะการเดิน(คะแนน)",
                },
                {
                    field: "ChestWidth",
                    header: "ความกว้างช่องอก(ซม.)",
                },
                {
                    field: "BodyDeep",
                    header: "ความลึกลำตัว(ซม.)",
                },
                {
                    field: "RibWidth",
                    header: "ความกางของกระดูกซี่โครง(คะแนน)",
                },
                {
                    field: "BreastFrontScore",
                    header: "การยึดเกาะของเต้านมด้านหน้า(คะแนน) เฉพาะเพศเมีย",
                },
                {
                    field: "BreastHeight",
                    header: "ความสูงของเนื้อเยื่อเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย",
                },
                {
                    field: "BreastWidth",
                    header: "ความกว้างของเต้านมด้านหลัง(ซม.) เฉพาะเพศเมีย",
                },
                {
                    field: "BreastLigament",
                    header: "ความแข็งแรงของเอ็นยึดเต้านม(ซม.) เฉพาะเพศเมีย",
                },
                {
                    field: "BreastDeep",
                    header: "ความลึกของเต้านม(ซม.) เฉพาะเพศเมีย",
                },
                {
                    field: "BreastHindScore",
                    header: "ตำแหน่งของหัวนมด้านหลัง(คะแนน) เฉพาะเพศเมีย",
                },
                {
                    field: "BreastSideScore",
                    header: "ตำแหน่งของหัวนมด้านข้าง(คะแนน) เฉพาะเพศเมีย",
                },
                {
                    field: "BreastLength",
                    header: "ความยาวของหัวนม(ซม.) เฉพาะเพศเมีย",
                },
                {
                    field: "TitsScore",
                    header: "ลักษณะของหัวนม(คะแนน) เฉพาะเพศเมีย",
                },
                //
                {
                    field: "Remark",
                    header: "หมายเหตุ",
                },
                {
                    field: "Staff.StaffFullName",
                    header: "เจ้าหน้าที่",
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
                Projects: [],
                FarmAnimalTypes: [
                    { name: "โค", id: 1 },
                    { name: "กระบือ", id: 2 },
                    { name: "แพะ", id: 3 },
                    { name: "ทุกประเภทสัตว์", id: 99 },
                    { name: "ยังไม่ได้เลือกชนิดสัตว์", id: 98 },
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
            status: [
                { name: "เปิดใช้งาน", key: "A", value: 1 },
                { name: "ปิดใช้งาน", key: "B", value: 0 },
            ],
            // Static Data
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
            form: {
                isActive: "",
            },
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
            return store.state.SetFarmDiagnose;
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
            this.fetchRedGoat();
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

            id = this.data.find((x) => x.RedGoatID == id);
            if (id.isActive == 0) {
                id.isActive = this.status[1];
            } else if (id.isActive == 1) {
                id.isActive = this.status[0];
            }

            let idtmp = [];
            if (id.RedGoatRound == 1) {
                idtmp.RedGoatRound = this.project_level[0];
            } else {
                idtmp.RedGoatRound = this.project_level[1];
            }
            console.log(idtmp.RedGoatRound);

            this.form = {
                ...id,
                RedGoatRound: idtmp.RedGoatRound,
            };
            this.display_edit = true;
        },
        async update() {
            // change data
            this.form.isActive = this.form.isActive.value;
            this.form.RedGoatRound = this.form.RedGoatRound.id;

            // this.form.RedGoatDate = dayjs(this.form.RedGoatDate).format('YYYY-MM-DD')
            this.form.createdAt = undefined;
            axios
                .put("red-goat/" + this.form.RedGoatID, this.form)
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
            //   this.$emit("refresh_secret_status");
        },
        close_edit() {
            this.display_edit = false;
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
        getItems(id) {
            console.log(id);
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
        formatArray(value) {
            return value.toLocaleString();
        },
        // sort table
        sort($event) {
            if ($event.sortField !== "show_id") {
                if ($event.sortOrder == 1) {
                    this.sortOrder = "desc";
                } else {
                    this.sortOrder = "asc";
                }
                this.sortField = $event.sortField;
                this.load();
            }
        },

        loadDefault() {
            this.isLoading = true;

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

        fetchRedGoat() {
            this.isLoading = true;

            let params = {
                size: this.rowPerPage,
                page: this.currentPage,
                orderByField: "RedGoatID",
                orderBy: "desc",
            };

            if (this.search.FarmID) {
                params["FarmID"] = this.search.FarmID;
            } else {
                return;
            }

            axios
                .get(this.url.RedGoat, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.data = res.data.rows
                        .map((x) => {
                            x.Round = this.project_level.find((e) => {
                                return e.id == x.RedGoatRound;
                            }).name;
                            return x;
                        })
                        .sort(
                            (a, b) =>
                                new Date(b.RedGoatDate) -
                                new Date(a.RedGoatDate)
                        );
                    this.totalPage = res.data.totalPage;
                    this.totalItems = res.data.totalData;
                    this.total = res.data.total;
                })
                .finally(() => {
                    this.isLoading = false;
                });

            store.dispatch("FarmDiagnose", {
                id: this.search.FarmID,
            });
        },
        load(event) {
            if (event) {
                this.currentPage = event.page + 1;
            }

            this.fetchRedGoat();
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
                let item = this.dropdown.Farms.find(
                    (id) => id.FarmID == this.search.FarmID
                );

                const farm = item.FarmIdentificationNumber;

                router.push({ name: "add-redgoat", params: { id, farm } });
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
            console.log(id);
            this.data.id = id;
            this.display_delete = true;
        },
        close_delete() {
            this.display_delete = false;
        },
        // remove data
        remove() {
            axios.delete("redgoat/" + this.data.id).then(() => {
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
