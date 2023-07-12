<template>
  <Card>
    <template #title>
      <h3 class="mx-8">ข้อมูลทั่วไป</h3>
    </template>
    <template #subtitle>
      <div class="mx-8">
        <p>
          สถานะ
          <span class="l-3 text-yellow-500" v-if="data.IsApprove == 0"
            ><i class="ml-6 pi pi-exclamation-circle"></i> รออนุมัติข้อมูล</span
          >
          <span class="ml-3 text-green-500" v-if="data.IsApprove == 1"
            ><i class="ml-6 pi pi-check"></i> อนุมัติ</span
          >
          <span class="l-3 text-red-500" v-if="data.IsApprove == 2"
            ><i class="ml-6 pi pi-exclamation-triangle"></i> ไม่อนุมัติ</span
          >
        </p>
        <p v-if="data.Remark">
          หมายเหตุ
          <span class="text-red-500">
            <i class="ml-6 pi pi-exclamation-triangle"></i>
            {{ data.Remark }}</span
          >
        </p>
      </div>
    </template>

    <template #content>
      <div class="grid mx-8">
        <staff>
          <div class="col-12 md:col-12">
            <div class="p-fluid">
              <div class="grid">
                <div class="col-12 sm:col-12 md:col-6 lg:col-4">
                  <Image
                    width="150"
                    height="150"
                    alt="Image"
                    previewgi
                    v-if="staff.StaffImage && !path"
                    :src="staff.StaffImage"
                  >
                  </Image>
                  <Image
                    width="150"
                    height="150"
                    alt="Image"
                    preview
                    v-else-if="path"
                    :src="path"
                  >
                  </Image>
                  <Image
                    v-else
                    width="150"
                    height="150"
                    alt="Image"
                    preview
                    src="images/widgets/user-card.jpg"
                  >
                  </Image>
                  <FileUpload
                    mode="basic"
                    :customUpload="true"
                    @select="preview"
                    chooseLabel="เลือกรูปภาพ"
                  />
                </div>
                <div class="col-12 sm:col-12 md:col-6 lg:col-8 grid">
                  <div class="field col-12 sm:col-6">
                    <label>อีเมล / Email</label>
                    <InputText v-model="staff.StaffEmail" type="text" />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label>รหัสผ่าน</label>
                    <Password v-model="data.Password" :feedback="false" />
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label>กลุ่มผู้ใช้งาน</label>
                    <Dropdown
                      emptyMessage="ไม่มีข้อมูล"
                      emptyFilterMessage="ไม่พบข้อมูล"
                      v-model="data.GroupID"
                      optionLabel="GroupName"
                      optionValue="GroupID"
                      :options="selection.Group"
                      class="w-full"
                      placeholder="เลือกกลุ่มผู้ใช้งาน"
                    >
                    </Dropdown>
                  </div>
                  <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      ประเภทสัตว์
                    </label>

                    <MultiSelect
                      v-model="data.AnimalTypeID"
                      :options="selection.Animal"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="เลือกประเภทสัตว์"
                      display="chip"
                      class="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 md:col-12">
            <div class="p-fluid">
              <h3>ข้อมูลการทำงาน</h3>
              <div class="field">
                <div class="formgrid grid p-2">
                  <div class="field sm:col-12 md:col-6">
                    <label>รหัสบุคลากร</label>
                    <InputText
                      type="text"
                      disabled
                      v-model="staff.StaffNumber"
                    />
                  </div>
                  <div class="field sm:col-12 md:col-6">
                    <label>เลขบัตรประชาชน</label>
                    <InputText
                      type="text"
                      disabled
                      v-model="staff.StaffIdentificationNumber"
                    />
                  </div>
                  <div class="field sm:col-12 md:col-6">
                    <label>หน่วยงานที่สังกัด</label>
                    <Dropdown
                      emptyMessage="ไม่มีข้อมูล"
                      emptyFilterMessage="ไม่พบข้อมูล"
                      v-model="staff.StaffOrganizationID"
                      optionLabel="OrganizationName"
                      optionValue="OrganizationID"
                      :options="selection.Organization"
                      class="w-full"
                      placeholder="เลือกหน่วยงานที่สังกัด"
                    />
                  </div>
                  <div class="field sm:col-12 md:col-6">
                    <label>ประเภทบุคลากร</label>
                    <Dropdown
                      emptyMessage="ไม่มีข้อมูล"
                      emptyFilterMessage="ไม่พบข้อมูล"
                      v-model="staff.StaffPositionTypeID"
                      optionLabel="PositionTypeName"
                      optionValue="PositionTypeID"
                      :options="selection.PositionType"
                      class="w-full"
                      placeholder="เลือกประเภทเจ้าหน้าที่"
                    />
                  </div>
                  <div class="field sm:col-12 md:col-6">
                    <label>ตำแหน่งงาน</label>
                    <Dropdown
                      emptyMessage="ไม่มีข้อมูล"
                      emptyFilterMessage="ไม่พบข้อมูล"
                      v-model="staff.StaffPositionID"
                      optionLabel="PositionName"
                      optionValue="PositionID"
                      :options="selection.Position"
                      class="w-full"
                      placeholder="เลือกตำแหน่งงาน"
                    />
                  </div>
                  <div class="field sm:col-12 md:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      หน้าที่ความรับผิดชอบ
                    </label>
                    <InputText v-model="staff.StaffResponsible" type="text" />
                  </div>
                  <div class="field sm:col-12 md:col-6">
                    <label>วันที่เริ่มทำงาน</label>
                    <Calendar
                      v-model="staff.StaffStartDate"
                      dateFormat="dd.mm.yy"
                      manualInput=""
                    />
                  </div>
                  <div class="field sm:col-12 md:col-6">
                    <label>วันที่สิ้นสุดการทำงาน</label>
                    <Calendar
                      v-model="staff.StaffEndDate"
                      dateFormat="dd.mm.yy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 md:col-12">
            <div class="p-fluid">
              <h3>ประวัติบุคลากร</h3>
              <div class="field">
                <div class="formgrid grid p-2">
                  <div class="field col-3 sm:col-12 md:col-4">
                    <label>คำนำหน้า</label>
                    <Dropdown
                      emptyMessage="ไม่มีข้อมูล"
                      emptyFilterMessage="ไม่พบข้อมูล"
                      v-model="staff.StaffTitleID"
                      optionLabel="TitleShortName"
                      optionValue="TitleID"
                      :options="selection.Title"
                      class="w-full"
                      placeholder="เลือกคำนำหน้า"
                    />
                  </div>
                  <div class="field col-3 sm:col-12 md:col-4">
                    <label>ชื่อ</label>
                    <InputText type="text" v-model="staff.StaffGivenName" />
                  </div>
                  <div class="field col sm:col-12 md:col-4">
                    <label>นามสกุล</label>
                    <InputText type="text" v-model="staff.StaffSurname" />
                  </div>
                  <div class="field col-3 sm:col-12 md:col-4">
                    <label>เพศ</label>
                    <Dropdown
                      emptyMessage="ไม่มีข้อมูล"
                      emptyFilterMessage="ไม่พบข้อมูล"
                      v-model="staff.StaffGenderID"
                      optionLabel="GenderName"
                      optionValue="GenderID"
                      :options="selection.Gender"
                      class="w-full"
                      placeholder="เลือกเพศ"
                    />
                  </div>
                  <div class="field col sm:col-12 md:col-4">
                    <label>วัน เดือน ปีเกิด</label>
                    <Calendar v-model="staff.StaffBirthDate" />
                  </div>
                  <div class="field col-3 sm:col-12 md:col-4">
                    <label>สถานภาพการสมรส</label>
                    <Dropdown
                      emptyMessage="ไม่มีข้อมูล"
                      emptyFilterMessage="ไม่พบข้อมูล"
                      v-model="staff.StaffMarriedStatusID"
                      optionLabel="MarriedStatusName"
                      optionValue="MarriedStatusID"
                      :options="selection.MarriedStatus"
                      class="w-full"
                      placeholder="เลือกสถานภาพการสมรส"
                    />
                  </div>
                  <div class="field col-3 sm:col-12 md:col-6">
                    <label>ระดับการศึกษา</label>
                    <Dropdown
                      emptyMessage="ไม่มีข้อมูล"
                      emptyFilterMessage="ไม่พบข้อมูล"
                      v-model="staff.StaffEducationID"
                      optionLabel="EducationName"
                      optionValue="EducationID"
                      :options="selection.Education"
                      class="w-full"
                      placeholder="เลือกระดับการศึกษา"
                    />
                  </div>
                  <div class="field col-3 sm:col-12 md:col-6">
                    <label>สาขาวิชา</label>
                    <Dropdown
                      emptyMessage="ไม่มีข้อมูล"
                      emptyFilterMessage="ไม่พบข้อมูล"
                      v-model="staff.StaffMajorID"
                      optionLabel="MajorName"
                      optionValue="MajorID"
                      :options="selection.Major"
                      class="w-full"
                      placeholder="เลือกสาขาวิชา"
                    />
                  </div>
                  <div class="field col sm:col-12 md:col-6">
                    <label>ปีที่สำเร็จการศึกษา</label>
                    <InputText type="text" v-model="staff.StaffGraduatedYear" />
                  </div>
                  <div class="field col sm:col-12 md:col-6">
                    <label>หมายเลขโทรศัพท์</label>
                    <InputMask
                      mask="999-999-9999"
                      type="text"
                      v-model="staff.StaffMobilePhone"
                    />
                  </div>
                  <div class="field col sm:col-12 md:col-6">
                    <label>ID ไลน์</label>
                    <InputText type="text" v-model="staff.StaffIDLine" />
                  </div>
                  <div class="field col sm:col-12 md:col-6">
                    <label>แฟกซ์</label>
                    <InputText type="text" v-model="staff.StaffFax" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 md:col-12">
            <div class="p-fluid">
              <h3>ที่อยู่บุคลากร</h3>
              <div class="field">
                <div class="formgrid grid p-2">
                  <div class="field col-3 sm:col-12 md:col-3">
                    <label>เลขที่บ้าน</label>
                    <InputText type="text" v-model="staff.StaffAddress" />
                  </div>
                  <div class="field col-3 sm:col-12 md:col-3">
                    <label>หมู่ที่</label>
                    <InputText type="text" v-model="staff.StaffMoo" />
                  </div>
                  <div class="field col-3 sm:col-12 md:col-3">
                    <label>ชื่อหมู่บ้าน/อาคาร</label>
                    <InputText type="text" v-model="staff.StaffVillageName" />
                  </div>
                  <div class="field col-3 sm:col-12 md:col-3">
                    <label>ชั้น</label>
                    <InputText type="text" v-model="staff.StaffFloor" />
                  </div>
                  <div class="field col-3 sm:col-12 md:col-4">
                    <label>ถนน</label>
                    <InputText type="text" v-model="staff.StaffStreet" />
                  </div>
                  <div class="field col-3 sm:col-12 md:col-4">
                    <label>ตรอก</label>
                    <InputText type="text" v-model="staff.StaffSubLane" />
                  </div>
                  <div class="field col-3 sm:col-12 md:col-4">
                    <label>ซอย</label>
                    <InputText type="text" v-model="staff.StaffLane" />
                  </div>
                  <div class="field col-3 sm:col-12 md:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      ตำบล/แขวง</label
                    >
                    <Dropdown
                      class="w-full"
                      :virtualScrollerOptions="{ itemSize: 38 }"
                      placeholder="เลือกตำบล/แขวง"
                      optionLabel="TumbolName"
                      optionValue="TumbolID"
                      v-model="staff.StaffTumbolID"
                      :options="selection.Tumbol"
                      :filter="true"
                      @change="filterZipcode($event)"
                    />
                  </div>
                  <div class="field col sm:col-12 md:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      อำเภอ/เขต</label
                    >
                    <Dropdown
                      class="w-full"
                      :virtualScrollerOptions="{ itemSize: 38 }"
                      placeholder="เลือกอำเภอ/เขต"
                      optionLabel="AmphurName"
                      optionValue="AmphurID"
                      v-model="staff.StaffAmphurID"
                      :options="selection.Amphur"
                      :filter="true"
                      @change="filterTumbol($event)"
                    />
                  </div>
                  <div class="field col sm:col-12 md:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      จังหวัด</label
                    >
                    <Dropdown
                      class="w-full"
                      :virtualScrollerOptions="{ itemSize: 38 }"
                      placeholder="เลือกจังหวัด"
                      optionLabel="ProvinceName"
                      optionValue="ProvinceID"
                      v-model="staff.StaffProvinceID"
                      :options="selection.Province"
                      :filter="true"
                      @change="filterAmphur($event)"
                    />
                  </div>

                  <div class="field col sm:col-12 md:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                      รหัสไปรษณีย์</label
                    >
                    <InputText
                      type="text"
                      class="w-full"
                      v-model="staff.StaffZipCode"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </staff>
      </div>
    </template>
    <template #footer>
      <div class="col-12 md:col-12">
        <div class="p-fluid">
          <div class="field">
            <div class="formgrid grid p-2">
              <!-- <div class="field col sm:col-12 md:col">
                <Button label="พิมพ์ประวัติ" class="p-button-success" />
              </div> -->
              <!-- <div class="field col sm:col-12 md:col">
                <Button
                  label="ยกเลิก"
                  class="p-button-secondary"
                  @click="refresh()"
                />
              </div> -->

              <div class="field col sm:col-12 md:col">
                <Button label="บันทึกข้อมูล" @click="update()" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
// เรียก dropdown
import * as dropdown from "@/service/dropdown.js";

export default {
  data() {
    return {
      url: "/user/",
      path: null,
      data: [],
      staff: [],
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
    this.load();
    this.onload();
  },
  unmounted() {
    this.controller.abort();
  },
  computed: {
    ...mapGetters({
      UserId: "UserID",
    }),
  },
  watch: {
    // ค้นหา
    "staff.StaffTitleID"(val) {
      // console.log(val);

      // ชาย 1 หญิง 2
      // นาย
      if (val == 3) {
        this.staff.StaffGenderID = 1;
      } else if (val == 4) {
        this.staff.StaffGenderID = 2;
      } else if (val == 5) {
        this.staff.StaffGenderID = 2;
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
      this.selection.Tumbol = await dropdown.get(a, "tumbol");
      this.selection.Amphur = await dropdown.get(a, "amphur");
      this.selection.Province = await dropdown.get(a, "province");
      this.selection.Group = await dropdown.get(a, "group");
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
        this.staff.StaffZipCode = this.temp.Tumbol[val].Zipcode;
      } else {
        this.staff.StaffZipCode = "";
      }
    },
    // load data
    load() {
      axios
        .get(this.url + this.UserId, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.data = response.data;
          this.staff = this.data.Staff;
          delete this.data.Staff;
          delete this.data.AnimalTypes;
          delete this.data.Group;
        });
    },
    // update data
    update() {
      if (this.uploading == false) {
        this.uploading = true;

        if (this.staff.StaffMobilePhone) {
          this.staff.StaffMobilePhone = this.staff.StaffMobilePhone.replaceAll(
            "-",
            ""
          );
        }
        axios
          .put(this.url + this.UserId, this.data)
          .then(() => {
            axios.put("/staff/" + this.staff.StaffID, this.staff).then(() => {
              if (this.staff.StaffImages) {
                let formData = new FormData();
                formData.append("photo_url", this.staff.StaffImages);
                axios
                  .post("staff/photo/" + this.staff.StaffID, formData)
                  .then(() => {})
                  .catch((err) => {
                    this.staff.isActive = this.status[0];
                    this.$toast.add({
                      severity: "error",
                      summary: "ล้มเหลว",
                      detail: err.response.data.error.message,
                      life: 5000,
                    });
                  });
              }
              this.$toast.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "แก้ไขข้อมูลสำเร็จ",
                life: 5000,
              });
              this.load();
            });
          })
          .catch((err) => {
            this.$toast.add({
              severity: "error",
              summary: "ไม่สามารถแก้ไขข้อมูลได้",
              detail: err.response.data.error.message,
              life: 5000,
            });
          })
          .finally(() => {
            this.uploading = false;
          });
      }
    },
    // preview image
    preview(e) {
      const file = e.files[0];
      this.path = URL.createObjectURL(file);
      this.staff.StaffImages = file;
    },
    // on undo
    refresh() {
      window.location.reload();
    },
  },
};
</script>
