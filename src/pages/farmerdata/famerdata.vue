<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="ทะเบียนเกษตรกร" :pages="breadcrumb" />
      <div class="card mb-5">
        <div class="grid">
          <div class="col-12">
            <h1 class="text-xl mb-4 text-500">
              เครื่องมือช่วยค้นหาทะเบียนเกษตรกร
            </h1>
          </div>
          <div class="col-12 sm:col-12 lg:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              รหัสบัตรประชาชน</label
            >

            <InputMask
              class="w-full"
              mask="9-9999-99999-99-9"
              unmask="true"
              v-model="search.IdentificationNumber"
            />
          </div>

          <div class="col-12 sm:col-12 lg:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              ชื่อ</label
            >
            <InputText class="w-full" type="text" v-model="search.GivenName" />
          </div>

          <div class="col-12 sm:col-12 lg:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              นามสกุล</label
            >
            <InputText class="w-full" type="text" v-model="search.Surname" />
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
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              optionLabel="ProvinceName"
              optionValue="ProvinceID"
              :options="Province"
              :filter="true"
              v-model="search.HouseProvinceID"
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
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              optionLabel="AmphurName"
              optionValue="AmphurID"
              :options="Amphur"
              :filter="true"
              v-model="search.HouseAmphurID"
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
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              optionLabel="TumbolName"
              optionValue="TumbolID"
              :options="Tumbol"
              :filter="true"
              v-model="search.HouseTumbolID"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              สถานะการขึ้นทะเบียนเกษตรกร</label
            >
            <Dropdown
              class="w-full"
              id="selectedFarm"
              v-model="search.FarmerRegisterStatus"
              placeholder="ทั้งหมด"
              :options="drop.RegisterStatus"
              optionLabel="name"
              optionValue="is_on"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              สถานะ</label
            >
            <Dropdown
              class="w-full"
              id="selectedFarm"
              v-model="search.status"
              placeholder="ทั้งหมด"
              :options="drop.status"
              optionLabel="name"
              optionValue="is_on"
            />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">ทะเบียนเกษตรกร</h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button
              label="ดาวน์โหลด"
              icon="pi pi-download"
              class="mb-3 p-button-raised p-button-raised p-button-success"
              @click="exportCSV($event)"
            />
          </div>
        </div>
        <DataTable
          class="text-sm"
          :value="data"
          :loading="isLoading"
          ref="dt"
          :rowHover="true"
          :exportable="true"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          @sort="sort($event)"
        >
          <!-- <Column
              field="show_id"
              header="ลำดับ"
              class="text-center"
              :sortable="true"
            >
            </Column> -->

          <Column
            field="FarmerNumber"
            header="หมายเลขเกษตรกร"
            class="text-center"
            :sortable="true"
          ></Column>

          <Column
            field="GivenName"
            header="ชื่อ"
            class="text-center"
            :sortable="true"
          ></Column>

          <Column
            field="Surname"
            header="นามสกุล"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="MobilePhoneNumber"
            header="เบอร์โทรศัพท์"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Email"
            header="อีเมล"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Tumbol.TumbolName"
            header="ตำบล"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Amphur.AmphurName"
            header="อำเภอ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="Province.ProvinceName"
            header="จังหวัด"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="FarmerRegisterDate"
            header="วันที่ขึ้นทะเบียน"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="FarmerRegisterStatus"
            header="สถานะการขึ้นทะเบียนเกษตรกร"
            class="text-center"
            :sortable="true"
          >
            <template #body="slotProps">
              <div
                v-if="
                  slotProps.data.FarmerRegisterStatus == 2 ||
                  slotProps.data.FarmerRegisterStatus == status[0]
                "
              >
                <Tag class="w-full" severity="success">ขึ้นทะเบียนแล้ว</Tag>
              </div>
              <div v-else>
                <Tag class="w-full bg-gray-500">ยังไม่ขึ้นทะเบียน</Tag>
              </div>
            </template>
          </Column>
          <!-- <Column
              field="isActive"
              header="สถานะ"
              class="text-center"
              :sortable="true"
            >
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
            </Column> -->
          <Column header="จัดการ" class="text-center">
            <template #body="slotProp">
              <Button
                icon="pi pi-eye"
                @click="openShowModal(slotProp.data.FarmerID)"
                class="p-button-rounded p-button-text"
              />
            </template>
          </Column>
        </DataTable>
        <Paginator
          @page="page($event)"
          :rows="15"
          :totalRecords="total"
        ></Paginator>
      </div>
    </div>
    <!-- end main page -->
    <!-- Show Dialog -->
    <Dialog
      header="รายละเอียดทะเบียนเกษตรกร"
      v-model:visible="displayShowModal"
      :style="{ width: '75vw' }"
      :modal="true"
    >
      <h1 class="text-2xl mt-2">ข้อมูลทั่วไปของเกษตรกร</h1>
      <form class="grid">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <!-- <div class="field col-12 sm:col-6 lg:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสอ้างอิงฟาร์ม
              </label>
              <InputText
              
                type="text"
                class="w-full"
                v-model="detail.Farm.FarmIdentificationNumber"
                
              />
            </div> -->
            <!-- <div class="field col-12 sm:col-6 lg:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อฟาร์ม
              </label>
              <InputText
              
                type="text"
                class="w-full"
                v-model="detail.Farm.FarmName"
                
              />
            </div> -->
            <div class="field col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                เลขบัตรประจำตัวประชาชน
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.IdentificationNumber"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                คำนำหน้า
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.title_tmp"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2"> ชื่อ</label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.GivenName"
                disabled
              />
            </div>

            <div
              v-if="detail.MiddleName != null"
              class="field col-12 sm:col-6 lg:col-3"
            >
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อกลาง
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.MiddleName"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                นามสกุล
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.Surname"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6" v-if="detail.Gender">
              <label class="block text-600 text-sm font-bold mb-2"> เพศ </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.Gender.GenderName"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันเดือนปีเกิด
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.BirthDate"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขโทรศัพท์
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.TelephoneNumber"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขโทรศัพท์มือถือ
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.MobilePhoneNumber"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ระดับการศึกษา
              </label>
              <div v-for="item in Education" :key="item.EducationID">
                <InputText
                  v-if="item.EducationID == detail.EducationID"
                  :placeholder="item.EducationName"
                  type="text"
                  class="w-full"
                />
              </div>
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                อีเมล
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.Email"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ไอดีไลน์
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.IDLine"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6" v-if="detail.Occupation">
              <label class="block text-600 text-sm font-bold mb-2">
                อาชีพหลัก
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.Occupation.OccupationName"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6" v-if="detail.SecondOccupation">
              <label class="block text-600 text-sm font-bold mb-2">
                อาชีพรอง
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.SecondOccupation.OccupationName"
                disabled
              />
            </div>
          </div>
        </div>
      </form>

      <h1 class="text-2xl mt-2">ที่อยู่เกษตรกรตามทะเบียนบ้าน</h1>
      <form class="grid">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เลขที่บ้าน (ที่อยู่ตามทะเบียนบ้าน)
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.HouseBuildingNumber"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมู่ที่</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="detail.HouseMoo"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อหมู่บ้าน/อาคาร
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.HouseVillageName"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชั้น
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.HouseFloor"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ถนน </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.HouseStreet"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ตรอก
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.HouseSubLane"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ซอย </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.HouseLane"
                placeholder="100"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6" v-if="detail.Tumbol">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำบล/แขวง
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.Tumbol.TumbolName"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6" v-if="detail.Amphur">
              <label class="block text-600 text-sm font-bold mb-2">
                อำเภอ/เขต
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder=""
                v-model="detail.Amphur.AmphurName"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6" v-if="detail.Province">
              <label class="block text-600 text-sm font-bold mb-2">
                จังหวัด
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder=""
                v-model="detail.Province.ProvinceName"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสไปรษณีย์
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder=""
                v-model="detail.HouseZipCode"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เลขรหัสประจำบ้าน
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder=""
                v-model="detail.HouseAddressIdentification"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ละติจูด
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder=""
                v-model="detail.HouseLatitude"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลองจิจูด
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder=""
                v-model="detail.HouseLongitude"
                disabled
              />
            </div>
          </div>
        </div>
      </form>
      <h1 class="text-2xl mt-2">ที่อยู่เกษตรกรที่ติดต่อได้</h1>
      <form class="grid">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                บ้านเลขที่
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.ResidenceBuildingNumber"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold"> หมู่ที่</label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.ResidenceMoo"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อหมู่บ้าน/อาคาร
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.ResidenceVillageName"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชั้น
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.ResidenceFloor"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ถนน </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.ResidenceStreet"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ตรอก
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.ResidenceSubLane"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> ซอย </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.ResidenceLane"
                disabled
                placeholder="100"
              />
            </div>
            <div class="field col-12 sm:col-6" v-if="detail.ResidenceTumbol">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำบล/แขวง
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="detail.ResidenceTumbol.TumbolName"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6" v-if="detail.ResidenceAmphur">
              <label class="block text-600 text-sm font-bold mb-2">
                อำเภอ/เขต
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder=""
                v-model="detail.ResidenceAmphur.AmphurName"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6" v-if="detail.ResidenceProvince">
              <label class="block text-600 text-sm font-bold mb-2">
                จังหวัด
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder=""
                v-model="detail.ResidenceProvince.ProvinceName"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสไปรษณีย์
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder=""
                v-model="detail.ResidenceZipCode"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เลขรหัสประจำบ้าน
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder=""
                v-model="detail.ResidenceAddressIdentification"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ละติจูด
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder=""
                v-model="detail.ResidenceLatitude"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลองจิจูด
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder=""
                v-model="detail.ResidenceLongitude"
                disabled
              />
            </div>
          </div>
        </div>
      </form>
    </Dialog>
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
      url: "/farmer",
      urlTitle: "/title?isActive=1",
      urlGender: "/gender",
      urlMariedStatus: "/married-status",
      urlOrganization: "/organization",
      urlPositionType: "/position-type",
      urlPosition: "/position",
      urlTumbol: "/tumbol",
      urlAmphur: "/amphur",
      urlProvince: "/province",
      urlEducation: "/education",
      urlMajor: "/major",
      breadcrumb: [
        { label: "หน้าหลัก", to: "/" },
        { label: "ทะเบียนเกษตรกร", to: "/agency/all" },
      ],

      path: null,
      search: {},
      filtered: {
        User: "",
        IdentificationNumber: "",
        FullName: "",
        GivenName: "",
        MiddleName: "",
        Surname: "",
        FarmerRegisterStatus: "",
        FarmID: "",
        status: "",
        HouseProvinceID: "",
        HouseAmphurID: "",
        HouseTumbolID: "",
      },

      // dropdown item
      drop: {
        RegisterStatus: [
          {
            name: "ทั้งหมด",
            is_on: "",
          },
          {
            name: "ขึ้นทะเบียนแล้ว",
            is_on: "2",
          },
          {
            name: "ยังไม่ขึ้นทะเบียน",
            is_on: "0",
          },
        ],
        status: [
          {
            name: "ทั้งหมด",
            is_on: "",
          },
          {
            name: "เปิดใช้งาน",
            is_on: "1",
          },
          {
            name: "ปิดใช้งาน",
            is_on: "0",
          },
        ],
      },
      // load
      data: [],
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
      curpage: 0,
      formheader: "",
      sortField: "",
      sortOrder: "",
      isLoading: false,

      // form
      valid: false,
      detail: [],
      form: {
        FarmStatusCode: "",
        FarmStatusName: "",
        FarmStatusNameEN: "",
        isActive: "",
      },

      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],

      //  cancel requests
      controller: new AbortController(),

      // Modal
      displayShowModal: false,
    };
  },
  mounted() {
    this.load();
    this.loadEducation();
    dayjs.extend(buddhistEra);
    axios.get(this.urlTumbol).then((response) => {
      this.Tumbol = response.data.rows.map((item) => {
        return {
          TumbolID: item.TumbolID,
          AmphurID: item.AmphurID,
          TumbolCode: item.TumbolCode,
          ProvinceID: item.ProvinceID,
          TumbolName: item.TumbolName,
          Fullname: item.TumbolCode.substring(0, 6) + ", " + item.TumbolName,
        };
      });
      this.TempTumbol = this.Tumbol;
    });
    // อำเภอ
    axios.get(this.urlAmphur).then((response) => {
      this.Amphur = response.data.rows.map((item) => {
        return {
          AmphurID: item.AmphurID,
          ProvinceID: item.ProvinceID,
          AmphurCode: item.AmphurCode,
          AmphurName: item.AmphurName,
          Fullname: item.AmphurCode.substring(0, 4) + ", " + item.AmphurName,
        };
      });
      this.TempAmphur = this.Amphur;
    });
    // จังหวัด
    axios.get(this.urlProvince).then((response) => {
      this.Province = response.data.rows;
    });
    this.form.isActive = this.status[0];
  },
  watch: {
    // "search.User"(val) {
    //   this.filtered.User = val;
    //   if (this.isLoading == false) {
    //     this.isLoading = true;
    //     setTimeout(() => {
    //       this.filtered.StaffID = "";
    //       this.load();
    //       this.isLoading = false;
    //     }, 1000);
    //   }
    // },

    "search.FarmerRegisterStatus"(val) {
      this.filtered.FarmerRegisterStatus = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.status"(val) {
      this.filtered.status = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.GivenName"(val) {
      this.filtered.GivenName = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.MiddleName"(val) {
      this.filtered.MiddleName = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.Surname"(val) {
      this.filtered.Surname = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.HouseProvinceID"(val) {
      this.filtered.HouseProvinceID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.HouseAmphurID"(val) {
      this.filtered.HouseAmphurID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.HouseTumbolID"(val) {
      this.filtered.HouseTumbolID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.IdentificationNumber"(val) {
      this.filtered.IdentificationNumber = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // "search.IdentificationNumber"(val) {
    //   // this.filtered.IdentificationNumber = val;
    //   if (!isNaN(val)) {
    //     this.filtered.IdentificationNumber = val;
    //   } else {
    //     this.filtered.GivenName = val.split(" ")[0];
    //     if (val.split(" ")[1]) {
    //       this.filtered.Surname = val.split(" ")[2];
    //     } else {
    //       this.filtered.MiddleName = "";
    //       this.filtered.Surname = "";
    //     }
    //   }

    //   if (this.isLoading == false) {
    //     this.isLoading = true;
    //     setTimeout(() => {
    //       this.filtered.FullName = null;
    //       this.load();
    //       this.isLoading = false;
    //     }, 1000);
    //   }
    // },
  },
  methods: {
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
    // page change
    page($event) {
      this.curpage = $event.page + 1;
      this.load();
    },

    // Axios
    load() {
      this.isLoading = true;

      let url = this.url + "?size=15";

      url += "&page=";
      if (this.curpage) {
        url += this.curpage;
      }

      if (this.filtered.IdentificationNumber) {
        url += "&IdentificationNumber=" + this.filtered.IdentificationNumber;
      }

      if (this.filtered.GivenName || this.filtered.Surname) {
        url +=
          "&GivenName=" +
          this.filtered.GivenName +
          "&Surname=" +
          this.filtered.Surname;
      }

      if (this.filtered.FarmerRegisterStatus) {
        url +=
          "&FarmerRegisterStatus=" + this.filtered.FarmerRegisterStatus ?? "0";
      }

      if (this.filtered.status) {
        url += "&isActive=" + this.filtered.status ?? "0";
      }

      if (this.sortField && this.sortOrder) {
        url += "&sortField=" + this.sortField + "&sortOrder=" + this.sortOrder;
      }
      if (this.filtered.HouseProvinceID) {
        url += "&HouseProvinceID=" + this.filtered.HouseProvinceID;
      }
      if (this.filtered.HouseAmphurID) {
        url += "&HouseAmphurID=" + this.filtered.HouseAmphurID;
      }
      if (this.filtered.HouseTumbolID) {
        url += "&HouseTumbolID=" + this.filtered.HouseTumbolID;
      }
      axios
        .get(url, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.total = res.data.total;
          this.data = res.data.rows;
          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
              if (this.data[i].FarmerRegisterDate != null) {
                this.data[i].FarmerRegisterDate = dayjs(
                  this.data[i].FarmerRegisterDate
                )
                  .locale(locale)
                  .format("DD/MM/YYYY");
              }
            }
          } else {
            let start = (this.curpage - 1) * 15;
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1 + start;
            }
          }

          // function search user
          if (res.data.rows.length == 0) {
            if (this.filtered.User) {
              axios
                .get(
                  this.url +
                    "&GivenName=" +
                    this.filtered.GivenName +
                    "&Surname=" +
                    this.filtered.Surname,
                  {
                    signal: this.controller.signal,
                  }
                )
                .then((res) => {
                  if (res.data.rows.length > 0) {
                    this.filtered.FullName = res.data.rows[0].FarmerID;
                    this.load();
                  } else {
                    return;
                  }
                });
            }
          }
          // end function search user
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    loadEducation() {
      axios
        .get(this.urlEducation, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.Education = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    openShowModal(id) {
      this.detail = this.data.find((item) => item.FarmerID == id);

      if (this.detail.Title) {
        this.detail.title_tmp = this.detail.Title.TitleName;
      } else {
        this.detail.title_tmp = "";
      }
      this.displayShowModal = true;
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
