<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="ย้ายฝากตัวอ่อน" :pages="breadcrumb" />

      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหาฟาร์ม</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />

          <span class="p-input-icon-right w-full px-5">
            <i class="pi pi-search px-5" />
            <Dropdown
              class="w-full"
              :options="recipient"
              optionLabel="Fullname"
              optionValue="RecipientID"
              placeholder="เลือกฟาร์ม"
              v-model="form.RecipientID"
              :class="{ 'p-invalid': !form.RecipientID && valid }"
              :filter="true"
            />
          </span>
        </span>
      </div>
      <div class="card mt-5" v-if="form.RecipientID">
        <h4 class="text-2xl mb-0 text-600">ข้อมูลทั่วไปของตัวรับ Recipient</h4>
        <div class="grid mt-5">
          <div class="col-12 sm:col-6 lg:col-6">
            <label for="farm" class="block text-600 text-sm font-bold mb-2">
              เลือกตัวให้<span class="text-red-500"> *</span></label
            >
            <Dropdown
              class="w-full"
              id="selectedstatus"
              :options="animal"
              optionLabel="Fullname"
              optionValue="AnimalID"
              placeholder="เลือกตัวให้"
              :showClear="true"
              :filter="true"
              v-model="form.AnimalID"
              :class="{ 'p-invalid': !form.AnimalID && valid }"
            />
          </div>
        </div>
      </div>
      <div class="card mt-5" v-if="form.AnimalID">
        <h4 class="text-2xl mb-0 text-600">รายละเอียดการย้ายฝาก</h4>
        <div class="grid mt-5">
          <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่ย้ายฝาก<span class="text-red-500"> *</span>
            </label>
            <Calendar
              class="w-full"
              id="date"
              dateFormat="dd/mm/yy"
              :maxDate="new Date()"
              @update:model-value="date()"
              v-model="form.TransferDate"
              :manualInput="false"
              placeholder=""
              :showIcon="true"
              :class="{ 'p-invalid': !form.TransferDate && valid }"
            />
          </div>

          <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่เป็นสัด<span class="text-red-500"> *</span>
            </label>
            <Calendar
              class="w-full"
              :maxDate="new Date()"
              id="date"
              dateFormat="dd/mm/yy"
              v-model="form.StandingHeatDate"
              :manualInput="false"
              placeholder=""
              :showIcon="true"
              :class="{ 'p-invalid': !form.StandingHeatDate && valid }"
            />
          </div>

          <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ประมาณการวันคลอด
            </label>
            <Calendar
              class="w-full"
              id="date"
              dateFormat="dd/mm/yy"
              v-model="form.EstimateBirthDate"
              :manualInput="false"
              placeholder=""
              :showIcon="true"
              readonly
              :class="{ 'p-invalid': !form.EstimateBirthDate && valid }"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันคลอด
            </label>
            <Calendar
              class="w-full"
              id="date"
              dateFormat="dd/mm/yy"
              v-model="form.BirthDate"
              :manualInput="false"
              placeholder=""
              :showIcon="true"
              :class="{ 'p-invalid': !form.BirthDate && valid }"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              หมายเลขตัวอ่อน<span class="text-red-500"> *</span>
            </label>

            <Dropdown
              :virtualScrollerOptions="{ itemSize: 38 }"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              :options="EmbryoAll"
              optionLabel="Fullname"
              optionValue="EmbryoID"
              placeholder="เลือกหมายเลขตัวอ่อน"
              :showClear="true"
              :filter="true"
              v-model="form.EmbryoID"
              :class="{ 'p-invalid': !form.EmbryoID && valid }"
            >
            </Dropdown>
          </div>
          <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วิธีการย้ายฝาก<span class="text-red-500"> *</span>
            </label>
            <Dropdown
              class="w-full"
              :options="TransferMethod"
              optionLabel="Fullname"
              optionValue="TransferMethodID"
              placeholder="เลือกวิธีการย้ายฝาก"
              :showClear="true"
              :filter="true"
              v-model="form.TransferMethodID"
              :class="{ 'p-invalid': !form.TransferMethodID && valid }"
            >
            </Dropdown>
          </div>

          <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ท้องที่<span class="text-red-500"> *</span>
            </label>
            <InputText
              type="number"
              class="w-full"
              :class="{ 'p-invalid': !form.PAR && valid }"
              v-model="form.PAR"
              readonly
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ผสมครั้งที่<span class="text-red-500"> *</span></label
            >
            <InputNumber
              :min="0"
              v-model="form.TimeNo"
              class="w-full"
              :class="{
                'p-invalid': !form.TimeNo && valid,
              }"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ปีกมดลูกข้างที่ย้ายฝาก
            </label>
            <Dropdown
              class="w-full"
              :options="UterusSide"
              optionLabel="name"
              placeholder="เลือกปีกมดลูกข้างที่ย้ายฝาก"
              :showClear="true"
              :filter="true"
              v-model="form.UterusSide"
              :class="{ 'p-invalid': !form.UterusSide && valid }"
            >
            </Dropdown>
          </div>
          <!-- สำหรับโค กระบือ -->
          <div class="col-12 sm:col-6 lg:col-6" v-if="animal_id != 3">
            <label class="block text-600 text-sm font-bold mb-2">
              รูปแบบขนาด CL
            </label>
            <Dropdown
              class="w-full"
              :options="CLType"
              optionLabel="name"
              optionValue="id"
              placeholder="เลือกรูปแบบขนาด CL"
              :showClear="true"
              :filter="true"
              v-model="form.CLType"
              :class="{ 'p-invalid': !form.CLType && valid }"
            >
            </Dropdown>
          </div>
          <div
            class="col-12 sm:col-6 lg:col-6"
            v-if="animal_id != 3 && form.CLType == 'WITH'"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ขนาด CL
            </label>
            <InputText
              type="number"
              class="w-full"
              v-model="form.CLSize"
              min="0"
            />
          </div>
          <div
            class="col-12 sm:col-6 lg:col-6"
            v-if="animal_id != 3 && form.CLType == 'WITH'"
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ขนาด Cavity
            </label>
            <InputText
              type="number"
              class="w-full"
              v-model="form.CavitySize"
              min="0"
            />
          </div>
          <!-- สำหรับแพ -->
          <div class="col-12 sm:col-6 lg:col-6" v-if="animal_id == 3">
            <label class="block text-600 text-sm font-bold mb-2">
              จำนวนรังไข่ข้างซ้าย
            </label>
            <InputText
              type="number"
              class="w-full"
              :class="{ 'p-invalid': !form.LeftOvaryAmount && valid }"
              v-model="form.LeftOvaryAmount"
              min="0"
            />
          </div>

          <div class="col-12 sm:col-6 lg:col-6" v-if="animal_id == 3">
            <label class="block text-600 text-sm font-bold mb-2">
              เกรดรังไข่ข้างซ้าย
            </label>
            <Dropdown
              class="w-full"
              :options="LeftOvaryGrade"
              optionLabel="name"
              placeholder="เลือกเกรดรังไข่ข้างซ้าย"
              :showClear="true"
              :filter="true"
              v-model="form.LeftOvaryGrade"
              :class="{ 'p-invalid': !form.LeftOvaryGrade && valid }"
            >
            </Dropdown>
          </div>
          <div class="col-12 sm:col-6 lg:col-6" v-if="animal_id == 3">
            <label class="block text-600 text-sm font-bold mb-2">
              จำนวนรังไข่ข้างขวา
            </label>
            <InputText
              type="number"
              class="w-full"
              :class="{ 'p-invalid': !form.RightOvaryAmount && valid }"
              v-model="form.RightOvaryAmount"
              min="0"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-6" v-if="animal_id == 3">
            <label class="block text-600 text-sm font-bold mb-2">
              เกรดรังไข่ข้างขวา
            </label>
            <Dropdown
              class="w-full"
              :options="RightOvaryGrade"
              optionLabel="name"
              placeholder="เลือกเกรดรังไข่ข้างขวา"
              :showClear="true"
              :filter="true"
              v-model="form.RightOvaryGrade"
              :class="{ 'p-invalid': !form.RightOvaryGrade && valid }"
            >
            </Dropdown>
          </div>
          <div class="col-12 sm:col-6 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2"
              >คะแนนรูปร่าง (BCS)<span class="text-red-500"> *</span>
            </label>
            <Dropdown
              class="w-full"
              :options="bcs"
              optionLabel="Fullname"
              optionValue="BCSID"
              placeholder="เลือกคะแนนร่างกาย"
              :showClear="true"
              :filter="true"
              v-model="form.BCSID"
              :class="{ 'p-invalid': !form.BCSID && valid }"
            >
            </Dropdown>
          </div>
          <div class="col-12 sm:col-6 lg:col-6">
            <label for="farm" class="block text-600 text-sm font-bold mb-2">
              รหัสเจ้าหน้าที่รับผิดชอบ
              <span class="text-red-500"> *</span></label
            >
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
              :class="{ 'p-invalid': !form.ResponsibilityStaffID && valid }"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-12 text-center flex justify-content-between"
      v-if="form.BCSID"
    >
      <Button label="ยกเลิก" class="p-button-secondary w-full mr-3" />
      <Button
        label="บันทึกข้อมูล"
        @click="add()"
        class="p-button-raise w-full ml-3"
      />
    </div>

    <!-- end main page -->
  </div>
</template>

<script>
import { ref } from "vue";

import PageTitle from "@/components/PageTitle.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      user: "user",
    }),
  },
  setup() {
    const breadcrumb = ref([{ label: "บันทึกเก็บตัวอ่อน", to: "" }]);

    return {
      breadcrumb,
    };
  },
  data() {
    return {
      url: "/animal",
      apiDonor: "/donor?isActive=1",
      apiRecipient: "/recipient?isActive=1",
      apiRecipientID: "/recipient",
      apiBCS: "/bcs?isActive=1",
      apiEmbryoAll: "/embryo?isActive=1",
      apiTransferMethod: "/transfer-method?isActive=1",
      apiEmbryoStage: "/embryo-stage?isActive=1",
      apiEmbryo: "/embryo?isActive=1",
      apiPersonal: "/staff?isActive=1",
      apiTransferEmbryo: "/transfer-embryo",

      isLoading: false,
      valid: false,
      search: {
        FarmID: "",
      },
      filtered: {
        FarmID: "",
      },
      embryostage: [],
      EmbryoAll: [],
      TransferMethod: [],
      No: 0,
      form: {
        TransferableAmount: 0,
        NonTransferableAmount: 0,
        FreezeAmount: 0,
        TransferAmount: 0,
        isActive: "",
      },
      data: [],
      show: {},
      formDay: [],
      donor: [],
      recipient: [],
      animal: [],
      UterusSide: [
        {
          id: "L",
          name: "ข้างซ้าย",
        },
        {
          id: "R",
          name: "ข้างขวา",
        },
      ],
      CLType: [
        {
          id: "NO",
          name: "(No Cavity)",
        },
        {
          id: "WITH",
          name: "(With Cavity)",
        },
      ],
      LeftOvaryGrade: [
        {
          id: "A",
          name: "A",
        },
        {
          id: "B",
          name: "B",
        },
        {
          id: "C",
          name: "C",
        },
      ],
      RightOvaryGrade: [
        {
          id: "A",
          name: "A",
        },
        {
          id: "B",
          name: "B",
        },
        {
          id: "C",
          name: "C",
        },
      ],
      personal: [],
      organization: [],
      activity: [],
      bcs: [],
      EmbryoStageGrade: "",
      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],
      setting: [
        {
          id: 1,
        },
      ],

      embryoTotal: [],
      codeProgram: "",
      nameProgram: "",
      forProgram: "",

      presetDetail: [],
      getItemDelete: [],
      //  cancel requests
      controller: new AbortController(),

      // Modal
      display_add: false,
      display_edit: false,
      display_delete: false,
    };
  },
  mounted() {
    // console.log(this.selectItem);
    this.form.ResponsibilityStaffID = this.user.StaffID;
    axios
      .get(this.apiRecipient, { signal: this.controller.signal })
      .then((response) => {
        if (this.animal_id == 1) {
          this.recipient = response.data.rows
            .sort(function (a, b) {
              var c = new Date(a.StartDate);
              var d = new Date(b.StartDate);
              return d - c;
            })
            .filter(
              (item) =>
                item.Preset.PresetFor == "R" &&
                (item.Preset.AnimalTypeID == 1 || item.Preset.AnimalTypeID == 2)
            )

            .map((item) => {
              return {
                RecipientID: item.RecipientID,
                StartDate: item.StartDate,
                Fullname:
                  "ฟาร์ม : " +
                  item.Farm.FarmName +
                  " (" +
                  item.Farm.FarmIdentificationNumber +
                  ")" +
                  " | ชื่อโปรแกรม : " +
                  item.Preset.PresetName +
                  " | วันที่เริ่มโปรแกรม : " +
                  item.ThaiStartDate,
              };
            });
        } else if (this.animal_id == 2) {
          this.recipient = response.data.rows
            .sort(function (a, b) {
              var c = new Date(a.StartDate);
              var d = new Date(b.StartDate);
              return d - c;
            })
            .filter(
              (item) =>
                item.Preset.PresetFor == "R" &&
                (item.Preset.AnimalTypeID == 3 || item.Preset.AnimalTypeID == 4)
            )

            .map((item) => {
              return {
                RecipientID: item.RecipientID,
                StartDate: item.StartDate,
                Fullname:
                  "ฟาร์ม : " +
                  item.Farm.FarmName +
                  " (" +
                  item.Farm.FarmIdentificationNumber +
                  ")" +
                  " | ชื่อโปรแกรม : " +
                  item.Preset.PresetName +
                  " | วันที่เริ่มโปรแกรม : " +
                  item.ThaiStartDate,
              };
            });
        } else if (this.animal_id == 3) {
          this.recipient = response.data.rows
            .sort(function (a, b) {
              var c = new Date(a.StartDate);
              var d = new Date(b.StartDate);
              return d - c;
            })
            .filter(
              (item) =>
                item.Preset.PresetFor == "R" &&
                (item.Preset.AnimalTypeID == 17 ||
                  item.Preset.AnimalTypeID == 18)
            )

            .map((item) => {
              return {
                RecipientID: item.RecipientID,
                StartDate: item.StartDate,
                Fullname:
                  "ฟาร์ม : " +
                  item.Farm.FarmName +
                  " (" +
                  item.Farm.FarmIdentificationNumber +
                  ")" +
                  " | ชื่อโปรแกรม : " +
                  item.Preset.PresetName +
                  " | วันที่เริ่มโปรแกรม : " +
                  item.ThaiStartDate,
              };
            });
        }

        // this.recipient = response.data.rows.map((item) => {
        //   return {
        //     RecipientID: item.RecipientID,
        //     StartDate: item.StartDate,
        //     Fullname:
        //       "ฟาร์ม : " +
        //       item.Farm.FarmName +
        //       " (" +
        //       item.Farm.FarmIdentificationNumber +
        //       ")" +
        //       ", ชื่อโปรแกรม " +
        //       item.Preset.PresetName,
        //   };
        // });
      });
    axios
      .get(this.apiBCS, { signal: this.controller.signal })
      .then((response) => {
        this.bcs = response.data.rows.map((item) => {
          return {
            BCSID: item.BCSID,
            Fullname: item.BCSName + " (" + item.BCSNumber + ")",
          };
        });
      });
    axios
      .get(this.apiEmbryoAll, { signal: this.controller.signal })
      .then((response) => {
        let data;

        if (this.animal_id == 1) {
          data = response.data.rows.filter(
            (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
          );
        } else if (this.animal_id == 2) {
          data = response.data.rows.filter(
            (item) => item.AnimalTypeID === 3 || item.AnimalTypeID === 4
          );
        } else if (this.animal_id == 3) {
          data = response.data.rows.filter(
            (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
          );
        }

        this.EmbryoAll = data.map((item) => {
          return {
            EmbryoID: item.EmbryoID,
            EmbryoNumber: item.EmbryoNumber,
            Fullname: item.EmbryoNumber,
          };
        });
      });
    axios
      .get(this.apiTransferMethod, { signal: this.controller.signal })
      .then((response) => {
        this.TransferMethod = response.data.rows.map((item) => {
          return {
            TransferMethodID: item.TransferMethodID,
            Fullname: item.TransferMethodName,
          };
        });
      });
    axios
      .get(this.apiEmbryoStage, { signal: this.controller.signal })
      .then((response) => {
        this.embryostage = response.data.rows.map((item) => {
          return {
            EmbryoStageID: item.EmbryoStageID,
            EmbryoStageName: item.EmbryoStageName,
            EmbryoStageCode: item.EmbryoStageCode,
            EmbryoStageGrade: item.EmbryoStageGrade,
            IsTransfer: item.IsTransfer,
            Fullname: item.EmbryoStageCode + " (" + item.EmbryoStageName + ")",
          };
        });
      });
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
  },
  watch: {
    "form.EmbryoStageID"(val) {
      let temp = this.embryo.filter((item) => item.EmbryoStageID == val);

      this.form.EmbryoStageGrade = temp[0].EmbryoStageGrade;
      this.form.EmbryoStageName = temp[0].EmbryoStageName;
      this.form.EmbryoStageID = temp[0].EmbryoStageID;
      this.form.IsTransfer = temp[0].IsTransfer;

      this.form.IsTransferName =
        this.form.IsTransfer == 1 ? "สามารถย้ายฝาก" : "ไม่สามารถย้ายฝาก";
    },
    "form.RecipientID"(val) {
      // this.apiRecipientID += "/" + val;
      axios
        .get(this.apiRecipientID + "/" + val, {})
        .then((response) => {
          this.animal = response.data.Animals.map((item) => {
            return {
              AnimalID: item.AnimalID,
              Fullname: item.AnimalIdentificationID + ", " + item.AnimalName,
            };
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    "form.AnimalID"(val) {
      axios
        .get(`/animal/get-by-farm-id?AnimalID=${val}`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          // console.log(response);
          if (response.data.rows[0].TimeNo) {
            this.form.TimeNo = response.data.rows[0].TimeNo + 1;
          } else {
            this.form.TimeNo = 1;
          }

          if (response.data.rows[0].PAR) {
            this.form.PAR = response.data.rows[0].PAR;
          } else {
            this.form.PAR = 1;
          }
          this.form.TimeNo = response.data.rows[0].TimeNo + 1;
        });
    },

    "form.EmbryoID"(val) {
      // console.log(val);
      let id = this.EmbryoAll.find((x) => x.EmbryoID == val);
      // console.log(id.EmbryoNumber);
      if (id) {
        this.form.EmbryoNumber = id.EmbryoNumber;
      }
    },
  },
  methods: {
    date() {
      var x = null;
      if (this.animal_id == 1) {
        x = 280;
      } else if (this.animal_id == 2) {
        x = 310;
      } else if (this.animal_id == 3) {
        x = 150;
      }
      this.form.EstimateBirthDate = new Date(
        dayjs(this.form.TransferDate).add(x, "day")
      );
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
      ];
      return items;
    },

    validationData() {
      if (!this.form.EmbryoStageID || !this.form.Count) {
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

    addEmbryo() {
      if (this.validationData() == false) {
        return;
      }
      this.No += 1;

      this.embryoTotal.push({
        No: this.No,
        EmbryoStageID: this.form.EmbryoStageID,
        EmbryoStageGrade: this.form.EmbryoStageGrade,
        EmbryoStageName: this.form.EmbryoStageName,
        EmbryoAmount: this.form.Count,
        IsTransfer: this.form.IsTransfer,
      });

      if (this.form.IsTransfer == 1) {
        this.form.TransferableAmount =
          this.form.TransferableAmount + parseInt(this.form.Count);
      } else {
        this.form.NonTransferableAmount =
          this.form.NonTransferableAmount + parseInt(this.form.Count);
      }

      // console.log(this.embryoTotal);
    },

    validation() {
      if (
        !this.form.AnimalID ||
        !this.form.TransferDate ||
        !this.form.BCSID ||
        !this.form.TransferMethodID ||
        !this.form.StandingHeatDate ||
        !this.form.PAR ||
        !this.form.ResponsibilityStaffID
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
    async add() {
      // this.form.AnimalID = 1;
      // console.log(this.form);

      if (this.validation() == false) {
        return;
      }

      this.form.isActive = 1;
      // if (this.form.CLType) {
      //   this.form.CLType = this.form.CLType.id;
      // }
      if (this.form.UterusSide) {
        this.form.UterusSide = this.form.UterusSide.id;
      }
      if (this.form.LeftOvaryGrade) {
        this.form.LeftOvaryGrade = this.form.LeftOvaryGrade.id;
      }
      if (this.form.RightOvaryGrade) {
        this.form.RightOvaryGrade = this.form.RightOvaryGrade.id;
      }

      // apiDonorCollectEmbryo: "/donor-collect-embryo",
      // apiDonorCollectEmbryoDetail: "/donor-collect-embryo-detail",
      await axios
        .post(this.apiTransferEmbryo, this.form)
        .then(() => {
          // console.log(res);

          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });

          this.$router.push("/embryo/transfer");
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
    },
    async uploadDetail(formData) {
      await axios
        .post(this.apiDonorCollectEmbryoDetail, formData)
        .then(() => {})
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },
    // ลบข้อมูลใน Preset Detail
    async deleteOldDay(id) {
      // console.log(id);
      await axios.delete(this.urlDetail + "/" + id).then(() => {});
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

    open_delete(id) {
      if (id.IsTransfer == 1) {
        this.form.TransferableAmount =
          parseInt(this.form.TransferableAmount) - parseInt(id.EmbryoAmount);
      } else {
        this.form.NonTransferableAmount =
          parseInt(this.form.NonTransferableAmount) - parseInt(id.EmbryoAmount);
      }

      const indexOfObject = this.embryoTotal.findIndex((object) => {
        return object.No === id.No;
      });
      this.embryoTotal.splice(indexOfObject, 1);
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
