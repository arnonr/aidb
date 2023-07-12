<template>
  <div class="layout-topbar surface-ground h-6rem">
    <img alt="Logo" src="../assets/images/logo.png" class="max-w-4rem mr-3" />
    <span class="text-4xl font-bold">AIDM</span>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <router-link :to="{ name: 'login' }">
          <Button
            label="เข้าสู่ระบบ"
            class="btn-reg p-button-info p-button-shadow w-full"
          />
        </router-link>
      </li>
    </ul>
  </div>
  <div class="flex justify-content-center overflow-hidden relative py-8">
    <div
      class="grid justify-content-center p-2 lg:p-0 mt-6"
      style="min-width: 100%"
    >
      <div class="col-12 lg:col-8 xl:col-6">
        <Card
          class="pt-4 pb-4 pl-2 pr-2 sm:pt-4 sm:pb-4 sm:pl-7 sm:pr-7 border-round-2xl mx-auto relative z-1"
          style="max-width: 5000px"
        >
          <template #title>
            <div
              class="text-center text-3xl sm:text-4xl text-black-alpha-90 mb-2"
            >
              สมัครสมาชิกระบบ AIDM
            </div>
            <p class="text-center text-lg text-black-alpha-50">
              กรณีที่ไม่มีรหัสบุคลากร
            </p>
          </template>
          <template #content>
            <form>
              <div class="grid row-gap-3 mt-5">
                <!-- <div class="col-12 text-center">
                  <Image
                    width="150"
                    height="150"
                    alt="Image"
                    previewgi
                    v-if="path"
                    :src="path"
                  >
                  </Image>
                  <Image
                    v-else
                    width="150"
                    height="150"
                    alt="Image"
                    previewgi
                    src="/images/widgets/user-card.png"
                  ></Image>
                  <FileUpload
                    mode="basic"
                    :customUpload="true"
                    @select="preview"
                    chooseLabel="เลือกรูปภาพ"
                  />
                </div> -->
                <!-- ข้อมูลทั่วไป -->
                <div class="col-12">
                  <h2 class="text-2xl font-semibold text-black-alpha-70 mb-3">
                    ข้อมูลทั่วไป
                  </h2>
                  <div class="grid row-gap-2">
                    <div class="col-12">
                      <label
                        for="username"
                        class="block text-700 text-sm uppercase font-bold mb-2"
                      >
                        อีเมล / Email<span class="text-red-500"> *</span>
                      </label>
                      <InputText
                        type="text"
                        class="w-full"
                        placeholder="โปรดกรอกอีเมล"
                        v-model="form_staff.StaffEmail"
                        :class="{
                          'p-invalid': !form_staff.StaffEmail && valid,
                        }"
                      />
                    </div>
                    <div class="col-12">
                      <label
                        for="password"
                        class="block text-700 font-bold text-sm uppercase mb-2"
                      >
                        รหัสผ่าน / Password<span class="text-red-500"> *</span>
                      </label>
                      <Password
                        id="password"
                        placeholder="โปรดกรอกรหัสผ่าน"
                        :toggleMask="true"
                        :feedback="false"
                        class="w-full"
                        inputClass="w-full"
                        v-model="form_user.Password"
                        :class="{
                          'p-invalid':
                            (!form_user.Password && valid) ||
                            (form_user.Password != ConfirmPassword && valid),
                        }"
                      ></Password>
                    </div>
                    <div class="col-12">
                      <label
                        for="confirm-password"
                        class="block text-700 font-bold text-sm uppercase mb-2"
                      >
                        รหัสผ่าน / Confirm Password<span class="text-red-500">
                          *</span
                        >
                      </label>
                      <Password
                        id="confirm-password"
                        placeholder="โปรดกรอกยืนยันรหัสผ่าน"
                        :toggleMask="true"
                        :feedback="false"
                        class="w-full"
                        inputClass="w-full"
                        v-model="ConfirmPassword"
                        :class="{
                          'p-invalid':
                            (!ConfirmPassword && valid) ||
                            (form_user.Password != ConfirmPassword && valid),
                        }"
                      ></Password>
                    </div>
                    <div class="col-6">
                      <label
                        class="block text-700 font-bold text-sm uppercase mb-2"
                        >กลุ่มผู้ใช้งาน<span class="text-red-500">
                          *</span
                        ></label
                      >
                      <Dropdown
                        class="w-full"
                        placeholder="เลือกกลุ่มผู้ใช้งาน"
                        emptyMessage="ไม่มีข้อมูล"
                        emptyFilterMessage="ไม่พบข้อมูล"
                        v-model="form_user.GroupID"
                        optionLabel="GroupName"
                        optionValue="GroupID"
                        :options="selection.Group"
                        :class="{
                          'p-invalid': !form_user.GroupID && valid,
                        }"
                      >
                      </Dropdown>
                    </div>
                    <div class="col-6">
                      <label
                        class="block text-700 font-bold text-sm uppercase mb-2"
                        >ประเภทสัตว์<span class="text-red-500"> *</span></label
                      >
                      <MultiSelect
                        placeholder="เลือกประเภทสัตว์"
                        display="chip"
                        class="w-full"
                        v-model="form_user.AnimalTypeID"
                        :options="selection.Animal"
                        optionLabel="label"
                        optionValue="value"
                        :class="{
                          'p-invalid': !form_user.AnimalTypeID && valid,
                        }"
                      />
                    </div>
                  </div>
                </div>

                <!-- ข้อมูลการทำงาน -->
                <div class="col-12">
                  <h2 class="text-2xl font-semibold text-black-alpha-70 mb-3">
                    ข้อมูลการทำงาน
                  </h2>
                  <div class="grid row-gap-2">
                    <div class="col-6">
                      <label
                        for="username"
                        class="block text-700 text-sm uppercase font-bold mb-2"
                      >
                        หน่วยงานที่สังกัด<span class="text-red-500"> *</span>
                      </label>
                      <Dropdown
                        emptyMessage="ไม่มีข้อมูล"
                        emptyFilterMessage="ไม่พบข้อมูล"
                        v-model="form_staff.StaffOrganizationID"
                        optionLabel="OrganizationName"
                        optionValue="OrganizationID"
                        :options="selection.Organization"
                        class="w-full"
                        placeholder="เลือกหน่วยงานที่สังกัด"
                        :class="{
                          'p-invalid': !form_staff.StaffOrganizationID && valid,
                        }"
                      />
                    </div>
                    <div class="col-6">
                      <label
                        for="username"
                        class="block text-700 text-sm uppercase font-bold mb-2"
                      >
                        ประเภทบุคลากร<span class="text-red-500"> *</span>
                      </label>
                      <Dropdown
                        emptyMessage="ไม่มีข้อมูล"
                        emptyFilterMessage="ไม่พบข้อมูล"
                        class="w-full"
                        placeholder="เลือกประเภทเจ้าหน้าที่"
                        v-model="form_staff.StaffPositionTypeID"
                        optionLabel="PositionTypeName"
                        optionValue="PositionTypeID"
                        :options="selection.PositionType"
                        :class="{
                          'p-invalid': !form_staff.StaffPositionTypeID && valid,
                        }"
                      />
                    </div>
                    <div class="col-6">
                      <label
                        for="confirm-password"
                        class="block text-700 font-bold text-sm uppercase mb-2"
                      >
                        ตำแหน่งงาน<span class="text-red-500"> *</span>
                      </label>
                      <Dropdown
                        emptyMessage="ไม่มีข้อมูล"
                        emptyFilterMessage="ไม่พบข้อมูล"
                        class="w-full"
                        placeholder="เลือกตำแหน่งงาน"
                        v-model="form_staff.StaffPositionID"
                        optionLabel="PositionName"
                        optionValue="PositionID"
                        :options="selection.Position"
                        :class="{
                          'p-invalid': !form_staff.StaffPositionID && valid,
                        }"
                      />
                    </div>
                    <div class="col-6">
                      <label
                        class="block text-700 font-bold text-sm uppercase mb-2"
                        >หน้าที่ความรับผิดชอบ</label
                      >
                      <InputText
                        type="text"
                        class="w-full"
                        v-model="form_staff.StaffResponsible"
                      />
                    </div>
                    <div class="col-6">
                      <label
                        class="block text-700 font-bold text-sm uppercase mb-2"
                        >วันที่เริ่มทำงาน<span class="text-red-500">
                          *</span
                        ></label
                      >
                      <Calendar
                        dateFormat="dd.mm.yy"
                        manualInput=""
                        class="w-full"
                        v-model="form_staff.StaffStartDate"
                        :class="{
                          'p-invalid': !form_staff.StaffStartDate && valid,
                        }"
                      />
                    </div>
                    <div class="col-6">
                      <label
                        class="block text-700 font-bold text-sm uppercase mb-2"
                        >วันที่สิ้นสุดการทำงาน</label
                      >
                      <Calendar
                        dateFormat="dd.mm.yy"
                        manualInput=""
                        class="w-full"
                        v-model="form_staff.StaffEndDate"
                      />
                    </div>
                  </div>
                </div>

                <!-- ประวัติบุคลากร -->
                <div class="col-12">
                  <h2 class="text-2xl font-semibold text-black-alpha-70 mb-3">
                    ประวัติบุคลากร
                  </h2>
                  <div class="grid row-gap-2">
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                      >
                        คำนำหน้า<span class="text-red-500"> *</span>
                      </label>
                      <Dropdown
                        emptyMessage="ไม่มีข้อมูล"
                        emptyFilterMessage="ไม่พบข้อมูล"
                        class="w-full"
                        placeholder="เลือกคำนำหน้า"
                        v-model="form_staff.StaffTitleID"
                        optionLabel="TitleShortName"
                        optionValue="TitleID"
                        :options="selection.Title"
                        :class="{
                          'p-invalid': !form_staff.StaffTitleID && valid,
                        }"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >ชื่อ<span class="text-red-500"> *</span></label
                      >
                      <InputText
                        type="text"
                        placeholder="กรุณากรอกชื่อ"
                        class="w-full"
                        v-model="form_staff.StaffGivenName"
                        :class="{
                          'p-invalid': !form_staff.StaffGivenName && valid,
                        }"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >นามสกุล<span class="text-red-500"> *</span></label
                      >
                      <InputText
                        type="text"
                        placeholder="กรุณากรอกนามสกุล"
                        class="w-full"
                        v-model="form_staff.StaffSurname"
                        :class="{
                          'p-invalid': !form_staff.StaffSurname && valid,
                        }"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >เพศ<span class="text-red-500"> *</span></label
                      >
                      <Dropdown
                        emptyMessage="ไม่มีข้อมูล"
                        emptyFilterMessage="ไม่พบข้อมูล"
                        class="w-full"
                        placeholder="เลือกเพศ"
                        v-model="form_staff.StaffGenderID"
                        optionLabel="GenderName"
                        optionValue="GenderID"
                        :options="selection.Gender"
                        :class="{
                          'p-invalid': !form_staff.StaffGenderID && valid,
                        }"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >วัน/เดือน/ปีเกิด</label
                      >
                      <Calendar
                        class="w-full"
                        v-model="form_staff.StaffBirthDate"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >สถานภาพการสมรส</label
                      >
                      <Dropdown
                        emptyMessage="ไม่มีข้อมูล"
                        emptyFilterMessage="ไม่พบข้อมูล"
                        class="w-full"
                        placeholder="เลือกสถานภาพการสมรส"
                        v-model="form_staff.StaffMarriedStatusID"
                        optionLabel="MarriedStatusName"
                        optionValue="MarriedStatusID"
                        :options="selection.MarriedStatus"
                      />
                    </div>
                    <div class="col-6">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >ระดับการศึกษา</label
                      >
                      <Dropdown
                        emptyMessage="ไม่มีข้อมูล"
                        emptyFilterMessage="ไม่พบข้อมูล"
                        class="w-full"
                        placeholder="เลือกระดับการศึกษา"
                        v-model="form_staff.StaffEducationID"
                        optionLabel="EducationName"
                        optionValue="EducationID"
                        :options="selection.Education"
                      />
                    </div>
                    <div class="col-6">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >สาขาวิชา</label
                      >
                      <Dropdown
                        emptyMessage="ไม่มีข้อมูล"
                        emptyFilterMessage="ไม่พบข้อมูล"
                        class="w-full"
                        placeholder="เลือกสาขาวิชา"
                        v-model="form_staff.StaffMajorID"
                        optionLabel="MajorName"
                        optionValue="MajorID"
                        :options="selection.Major"
                      />
                    </div>
                    <div class="col-6">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >ปีที่สำเร็จการศึกษา</label
                      >
                      <InputText
                        type="text"
                        class="w-full"
                        v-model="form_staff.StaffGraduatedYear"
                      />
                    </div>
                    <div class="col-6">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >หมายเลขโทรศัพท์<span class="text-red-500">
                          *</span
                        ></label
                      >
                      <InputMask
                        mask="999-999-9999"
                        type="text"
                        class="w-full"
                        v-model="form_staff.StaffMobilePhone"
                        :class="{
                          'p-invalid': !form_staff.StaffMobilePhone && valid,
                        }"
                      />
                    </div>
                    <div class="col-6">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >ID ไลน์</label
                      >
                      <InputText
                        type="text"
                        class="w-full"
                        v-model="form_staff.StaffIDLine"
                      />
                    </div>
                    <div class="col-6">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >เลขบัตรประชาชน<span class="text-red-500">
                          *</span
                        ></label
                      >
                      <InputText
                        type="text"
                        class="w-full"
                        :maxlength="13"
                        v-model="form_staff.StaffIdentificationNumber"
                        :class="{
                          'p-invalid':
                            !form_user.StaffIdentificationNumber && valid,
                        }"
                      />
                    </div>
                  </div>
                </div>

                <!-- ที่อยู่บุคลากร -->
                <div class="col-12">
                  <h2 class="text-2xl font-semibold text-black-alpha-70 mb-3">
                    ที่อยู่บุคลากร
                  </h2>
                  <div class="grid row-gap-2">
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >เลขที่บ้าน</label
                      >
                      <InputText
                        type="text"
                        class="w-full"
                        placeholder="โปรดกรอกเลขที่บ้าน"
                        v-model="form_staff.StaffAddress"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >หมู่ที่</label
                      >
                      <InputText
                        type="text"
                        class="w-full"
                        placeholder="โปรดกรอกหมู่ที่"
                        v-model="form_staff.StaffMoo"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >ชื่อหมู่บ้าน/อาคาร</label
                      >
                      <InputText
                        type="text"
                        class="w-full"
                        placeholder="โปรดกรอกชื่อหมู่บ้าน/อาคาร"
                        v-model="form_staff.StaffVillageName"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >ชั้น</label
                      >
                      <InputText
                        type="text"
                        class="w-full"
                        placeholder="โปรดกรอกชั้น"
                        v-model="form_staff.StaffFloor"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >ถนน</label
                      >
                      <InputText
                        type="text"
                        class="w-full"
                        placeholder="โปรดกรอกถนน"
                        v-model="form_staff.StaffStreet"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >ตรอก</label
                      >
                      <InputText
                        type="text"
                        class="w-full"
                        placeholder="โปรดกรอกตรอก"
                        v-model="form_staff.StaffSubLane"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                        >ซอย</label
                      >
                      <InputText
                        type="text"
                        class="w-full"
                        placeholder="โปรดกรอกซอย"
                        v-model="form_staff.StaffLane"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                      >
                        ตำบล/แขวง</label
                      >
                      <Dropdown
                        class="w-full"
                        placeholder="เลือกตำบล/แขวง"
                        :filter="true"
                        @change="filterZipcode($event)"
                        optionLabel="TumbolName"
                        optionValue="TumbolID"
                        v-model="form_staff.StaffTumbolID"
                        :options="selection.Tumbol"
                        :virtualScrollerOptions="{ itemSize: 38 }"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                      >
                        อำเภอ/เขต</label
                      >
                      <Dropdown
                        class="w-full"
                        placeholder="เลือกอำเภอ/เขต"
                        optionLabel="AmphurName"
                        optionValue="AmphurID"
                        v-model="form_staff.StaffAmphurID"
                        :options="selection.Amphur"
                        :filter="true"
                        @change="filterTumbol($event)"
                        :virtualScrollerOptions="{ itemSize: 38 }"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                      >
                        จังหวัด</label
                      >
                      <Dropdown
                        class="w-full"
                        :virtualScrollerOptions="{ itemSize: 38 }"
                        placeholder="เลือกจังหวัด"
                        optionLabel="ProvinceName"
                        optionValue="ProvinceID"
                        v-model="form_staff.StaffProvinceID"
                        :options="selection.Province"
                        :filter="true"
                        @change="filterAmphur($event)"
                      />
                    </div>
                    <div class="col-6 lg:col-4">
                      <label
                        class="block text-700 text-sm uppercase font-bold mb-2"
                      >
                        รหัสไปรษณีย์</label
                      >
                      <InputText
                        type="text"
                        class="w-full"
                        disabled
                        v-model="form_staff.StaffZipCode"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-3 text-right">
                <Button
                  type="button"
                  icon="pi pi-save"
                  label="บันทึก"
                  @click="submit()"
                />
                <router-link to="/login">
                  <Button
                    type="button"
                    icon="pi pi-times"
                    label="ยกเลิก"
                    class="p-button-secondary ml-2"
                  />
                </router-link>
              </div>
            </form>
          </template>
        </Card>
      </div>
    </div>
    <img class="bg-login" src="/images/bg/bg-login.png" alt="bg" />
  </div>
</template>

<script>
import imgProfile from "../assets/images/profile/profile.png";
import Swal from "sweetalert2";
import axios from "axios";
import * as dropdown from "@/service/dropdown.js";
export default {
  components: [imgProfile],

  data() {
    return {
      valid: false,
      data: null,
      form_staff: {},
      ConfirmPassword: "",
      form_user: {},
      path: null,
      selection: {
        Group: [],
        Title: [],
        Gender: [],
        MarriedStatus: [],
        Organization: [],
        PositionType: [],
        Position: [],
        Tumbol: [],
        Amphur: [],
        Province: [],
        Education: [],
        Major: [],
        Animal: [
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
      temp: {
        Tumbol: [],
        Amphur: [],
        Province: [],
      },
      uploading: false,
      //  cancel requests
      controller: new AbortController(),
    };
  },
  mounted() {
    this.onload();
  },
  unmounted() {
    this.controller.abort();
  },
  watch: {
    // ค้นหา
    "form_staff.StaffTitleID"(val) {
      // console.log(val);

      // ชาย 1 หญิง 2
      // นาย
      if (val == 3) {
        this.form_staff.StaffGenderID = 1;
      } else if (val == 4) {
        this.form_staff.StaffGenderID = 2;
      } else if (val == 5) {
        this.form_staff.StaffGenderID = 2;
      }
    },
  },
  methods: {
    async onload() {
      // ส่ง controller
      let a = this.controller.signal;
      // รับข้อมูลเข้าตัวแปร
      for (let i = 0; i < this.selection.Animal.length; i++) {
        this.selection.Animal[i].key = this.selection.Animal[i].label;
      }
      this.selection.Group = await dropdown.get(a, "group");
      this.selection.Tumbol = await dropdown.get(a, "tumbol");
      this.selection.Amphur = await dropdown.get(a, "amphur");
      this.selection.Province = await dropdown.get(a, "province");
      this.selection.Title = await dropdown.get(a, "title");
      this.selection.Gender = await dropdown.get(a, "gender");
      this.selection.MarriedStatus = await dropdown.get(a, "married-status");
      this.selection.Organization = await dropdown.get(a, "organization");
      this.selection.PositionType = await dropdown.get(a, "position-type");
      this.selection.Position = await dropdown.get(a, "position");
      this.selection.Education = await dropdown.get(a, "education");
      this.selection.Major = await dropdown.get(a, "major");
      //เก็บข้อมูลสำรอง
      this.temp.Tumbol = this.selection.Tumbol;
      this.temp.Amphur = this.selection.Amphur;
      this.temp.Province = this.selection.Province;
    },
    // trigger on change
    // filter selection
    filterAmphur($event) {
      let val = $event.value;
      if (val) {
        this.selection.Amphur = this.temp.Amphur;
        this.selection.Amphur = this.selection.Amphur.filter(
          (item) => item.ProvinceID == val
        );
      } else {
        this.selection.Amphur = this.temp.Amphur;
      }
    },
    filterTumbol($event) {
      let val = $event.value;
      if (val) {
        this.selection.Tumbol = this.temp.Tumbol;
        this.selection.Tumbol = this.selection.Tumbol.filter(
          (item) => item.AmphurID == val
        );
      } else {
        this.selection.Tumbol = this.temp.Tumbol;
      }
    },
    filterZipcode($event) {
      let val = $event.value;
      if (val) {
        var tumbol = this.selection.Tumbol.filter(
          (item) => item.TumbolID == val
        );
        this.form_staff.StaffZipCode = tumbol[0].Zipcode;
      } else {
        this.form_staff.StaffZipCode = "";
      }
    },
    // update data
    async update() {
      if (this.uploading == false) {
        this.uploading = true;
        // axios
        //   .put(this.url + this.UserId, this.data)
        //   .then(() => {
        //     axios.put("/staff/" + this.staff.StaffID, this.staff).then(() => {
        //       // if (this.staff.StaffImages) {
        //       //   let formData = new FormData();
        //       //   formData.append("photo_url", this.staff.StaffImages);
        //       //   axios
        //       //     .post("staff/photo/" + this.staff.StaffID, formData)
        //       //     .then(() => {})
        //       //     .catch((err) => {
        //       //       this.staff.isActive = this.status[0];
        //       //       this.$toast.add({
        //       //         severity: "error",
        //       //         summary: "ล้มเหลว",
        //       //         detail: err.response.data.error.message,
        //       //         life: 5000,
        //       //       });
        //       //     });
        //       // }
        //       this.$toast.add({
        //         severity: "success",
        //         summary: "สำเร็จ",
        //         detail: "แก้ไขข้อมูลสำเร็จ",
        //         life: 5000,
        //       });
        //       this.load();
        //     });
        //   })
        //   .catch((err) => {
        //     this.$toast.add({
        //       severity: "error",
        //       summary: "ไม่สามารถแก้ไขข้อมูลได้",
        //       detail: err.response.data.error.message,
        //       life: 5000,
        //     });
        //   })
        //   .finally(() => {
        //     this.uploading = false;
        //   });
        this.form_staff.isFlag = "NewRegister";
        if (this.form_staff) {
          return console.log(this.form_staff);
        }
        await axios.post("/staff", this.form_staff).then(() => {
          Swal.fire({
            title: "สำเร็จ",
            text: "เพิ่มข้อมูลสำเร็จ",
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then(() => {
            this.$router.push("/staff");
          });
        });
      }
    },
    // preview image
    preview(e) {
      const file = e.files[0];
      this.path = URL.createObjectURL(file);
      this.staff.StaffImages = file;
    },
    validate() {
      if (
        this.form_staff.StaffEmail ||
        this.form_user.Password ||
        this.ConfirmPassword ||
        this.form_user.GroupID ||
        this.form_user.AnimalTypeID ||
        this.form_staff.StaffOrganizationID ||
        this.form_staff.StaffPositionTypeID ||
        this.form_staff.StaffPositionID ||
        this.form_staff.StaffStartDate ||
        this.form_staff.StaffTitleID ||
        this.form_staff.StaffGivenName ||
        this.form_staff.StaffSurname ||
        this.form_staff.StaffGenderID ||
        this.form_staff.StaffIdentificationNumber ||
        this.form_staff.StaffMobilePhone
      ) {
        return true;
      } else {
        this.valid = true;
        return false;
      }
    },
    async submit() {
      if (this.validate() == false) {
        return Swal.fire({
          title: "ล้มเหลว",
          text: "กรุณากรอกข้อมูลให้ครบ",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
      if (this.form_user.Password != this.ConfirmPassword) {
        Swal.fire({
          title: "ล้มเหลว",
          text: "กรุณากรอกรหัสผ่านให้ตรงกัน",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
      this.form_staff.isFlag = "NewRegister";
      var result = "";
      await axios.post("/staff", this.form_staff).then((res) => {
        result = res;
      });
      await axios
        .post("/user", {
          StaffID: result.data.StaffID,
          Username: this.form_staff.StaffEmail,
          Password: this.form_user.Password,
          GroupID: this.form_user.GroupID,
          AnimalTypeID: this.form_user.AnimalTypeID,
          RegisterDate: new Date(),
        })
        .then(() => {
          Swal.fire({
            title: "สำเร็จ",
            text: "รอแอดมินอนุมัติ",
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then(() => {
            this.$router.push("/login");
          });
        });
    },
  },
};
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

.bg-login {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 0;
}

.btn-reg.p-button-shadow {
  box-shadow: 0px 4px 12px rgba(68, 126, 242, 0.7);
}
</style>
