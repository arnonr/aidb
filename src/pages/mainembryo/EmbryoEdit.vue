<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="บันทึกเก็บตัวอ่อน" :pages="breadcrumb" />
      <div class="card">
        <!-- <div class="card row col bg-primary pb-6">
          <h1 class="text-center text-white">ค้นหาฟาร์ม</h1>
          <span class="p-input-icon-right w-full px-5">
            <i class="pi pi-search px-5" />

            <span class="p-input-icon-right w-full px-5">
              <i class="pi pi-search px-5" />
              <Dropdown
                class="w-full"
                :options="donor"
                optionLabel="Fullname"
                optionValue="DonorID"
                placeholder="เลือกฟาร์ม"
                v-model="form.DonorID"
                :class="{ 'p-invalid': !form.DonorID && valid }"
                :filter="true"
              />
            </span>
          </span>
        </div> -->
        <!-- <div class="card" v-if="form.DonorID">
          <div class="text-xl">ข้อมูลทั่วไปของ Doner</div>
          <div class="grid pt-5">
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
        </div> -->
        <div class="card" v-if="form.AnimalID">
          <div class="text-xl">รายละเอียดตัวอ่อน</div>
          <div class="grid pt-5">
            <div class="col-12 sm:col-6 lg:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่เก็บตัวอ่อน<span class="text-red-500"> *</span>
              </label>
              <Calendar
                class="w-full"
                id="date"
                dateFormat="dd/mm/yy"
                v-model="form.CollectDate"
                :manualInput="false"
                placeholder=""
                :showIcon="true"
                :class="{ 'p-invalid': !form.CollectDate && valid }"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"
                >คะแนนร่างกาย (BCS)<span class="text-red-500"> *</span></label
              >
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
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวน Follicle ด้านซ้าย
              </label>
              <InputText
                type="number"
                class="w-full"
                v-model="form.FollicleLeftAmount"
                min="0"
              />
            </div>
            <div class="col-12 sm:col-6 lg:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวน Follicle ด้านขวา
              </label>
              <InputText
                type="number"
                class="w-full"
                v-model="form.FollicleRightAmount"
                min="0"
              />
            </div>
            <div class="col-12 sm:col-6 lg:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวน CL รังไข่ด้านซ้าย
              </label>
              <InputText
                type="number"
                class="w-full"
                v-model="form.CLLeftAmount"
                min="0"
              />
            </div>
            <div class="col-12 sm:col-6 lg:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวน CL รังไข่ด้านขวา
              </label>
              <InputText
                type="number"
                class="w-full"
                v-model="form.CLRightAmount"
                min="0"
              />
            </div>
            <!-- <div class="col-12 sm:col-6 lg:col-6">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                รหัสเจ้าหน้าที่รับผิดชอบ<span class="text-red-500">
                  *</span
                ></label
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
            </div> -->
          </div>
        </div>
        <div class="mt-5 card" v-if="form.CollectDate && form.BCSID">
          <div class="flex justify-content-between">
            <div class="text-xl">จำนวนตัวอ่อนที่เก็บได้ทั้งหมด</div>
          </div>
          <div class="grid">
            <div class="col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                ระยะตัวอ่อน<span class="text-red-500"> *</span>
              </label>
              <Dropdown
                class="w-full"
                id="selectedstatus"
                :options="embryo"
                optionLabel="Fullname"
                optionValue="EmbryoStageID"
                placeholder="เลือกระยะตัวอ่อน"
                :showClear="true"
                :filter="true"
                v-model="form.EmbryoStageID"
                :class="{ 'p-invalid': !form.EmbryoStageID && valid }"
              />
            </div>
            <div class="col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                เกรด
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="form.EmbryoStageGrade"
                readonly
              />
            </div>
            <!-- <div class="col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                สถาะนการย้ายฝาก
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="form.IsTransferName"
                readonly
              />
            </div> -->
            <div class="col-12 sm:col-6 lg:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวนตัวอ่อน<span class="text-red-500"> *</span>
              </label>
              <InputText
                class="w-full"
                type="number"
                v-model="form.Count"
                :class="{ 'p-invalid': !form.Count && valid }"
                min="0"
              />
            </div>
            <div class="col-12 sm:col-6 lg:col-3">
              <Button icon="pi pi-plus" class="mt-4" @click="addEmbryo()" />
            </div>
          </div>

          <DataTable class="text-sm mt-3 mb-3" :value="embryoTotal">
            <Column field="No" header="ID" class="text-center"></Column>
            <Column
              field="EmbryoStageName"
              header="Embryo Evaluated"
              class="text-center"
            ></Column>
            <Column
              field="EmbryoStageGrade"
              header="เกรด"
              class="text-center"
            ></Column>
            <Column
              field="EmbryoAmount"
              header="จำนวน"
              class="text-center"
            ></Column>

            <Column header="จัดการ" class="text-center">
              <template #body="slotProps">
                <!-- <SplitButton
                  label="ลบ"
                  icon="pi pi-pencil"
                  @click="open_delete(slotProps.data)"
                  class="p-button-sm p-button-outlined p-button-danger"
                >
                </SplitButton>

                <Button
                  label="Primary"
                  class="p-button-raised p-button-rounded"
                /> -->

                <Button
                  icon="pi pi-times"
                  class="p-button-rounded p-button-danger"
                  @click="open_delete(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
          <!-- <div class="text-right text-xl col-12" style="margin-right: 150px">
            รวมทั้งหมด 4
          </div> -->

          <div class="grid mt-3">
            <div class="col-12 sm:col-6 lg:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ตัวอ่อนที่สามารถย้ายฝากได้<span class="text-red-500"> *</span>
                <!-- Transferable -->
              </label>
              <InputText
                class="w-full"
                type="number"
                v-model="form.TransferableAmount"
                readonly
              />
            </div>
            <div class="col-12 sm:col-6 lg:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ตัวอ่อนที่ไม่สามารถย้ายฝากได้<span class="text-red-500">
                  *</span
                >
                <!-- UnTranferable -->
              </label>
              <InputText
                class="w-full"
                type="number"
                v-model="form.NonTransferableAmount"
                readonly
              />
            </div>
            <div class="col-12 sm:col-6 lg:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวนแช่แข็ง (Freeze)<span class="text-red-500"> *</span>
              </label>

              <InputNumber
                id="minmax-buttons"
                v-model="form.FreezeAmount"
                mode="decimal"
                showButtons
                :min="0"
                :max="form.TransferableAmount - form.TransferAmount"
                class="w-full"
                :class="{ 'p-invalid': !form.FreezeAmount && valid }"
              />
            </div>
            <div class="col-12 sm:col-6 lg:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวนย้ายฝาก (Transfer)<span class="text-red-500"> *</span>
              </label>
              <!-- <InputText
                class="w-full"
                type="number"
                v-model="form.TransferAmount"
              /> -->

              <InputNumber
                id="minmax-buttons"
                v-model="form.TransferAmount"
                mode="decimal"
                showButtons
                :min="0"
                :max="form.TransferableAmount - form.FreezeAmount"
                class="w-full"
                :class="{ 'p-invalid': !form.TransferAmount && valid }"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-12 text-center flex justify-content-between"
        v-if="
          (form.TransferableAmount || form.NonTransferableAmount) &&
          form.TransferableAmount == form.FreezeAmount + form.TransferAmount
        "
      >
        <Button label="ยกเลิก" class="p-button-secondary w-full mr-3" />
        <Button
          label="บันทึกข้อมูล"
          @click="add()"
          class="p-button-raise w-full ml-3"
        />
      </div>
    </div>
    <!-- end main page -->
  </div>
</template>

<script>
import { ref } from "vue";

import PageTitle from "@/components/PageTitle.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";
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
    const breadcrumb = ref([
      { label: "ระบบย้ายฝากตัวอ่อน", to: "/embryo" },
      { label: "บันทึกเก็บตัวอ่อน", to: "" },
    ]);

    return {
      breadcrumb,
      selectedCity: null,
      cities: [
        { name: "1", code: "NY" },
        { name: "2", code: "RM" },
        { name: "3", code: "LDN" },
        { name: "4", code: "D" },
        { name: "5", code: "C" },
      ],
    };
  },
  data() {
    return {
      url: "/animal",
      apiDonor: "/donor?isActive=1",
      apiDonorID: "/donor",
      apiBCS: "/bcs?isActive=1",
      apiembryo: "/embryo-stage?isActive=1",
      apiPersonal: "/staff?isActive=1",
      apiDonorCollectEmbryo: "/donor-collect-embryo",
      apiDonorCollectEmbryoDetail: "/donor-collect-embryo-detail",
      isLoading: false,
      valid: false,
      search: {
        FarmID: "",
      },
      filtered: {
        FarmID: "",
      },
      embryo: [],
      No: 0,
      form: {
        TransferableAmount: 0,
        NonTransferableAmount: 0,
        FreezeAmount: 0,
        TransferAmount: 0,
        isActive: "",
      },
      data: [],
      formDay: [],
      donor: [],
      animal: [],
      PresetFor: [
        {
          id: "D",
          name: "ตัวให้ (Donor)",
        },
        {
          id: "R",
          name: "ตัวรับ (Recipient)",
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

      idRoute: null,

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
    this.loadData();

    // this.form.ResponsibilityStaffID = this.user.StaffID;

    axios
      .get(this.apiDonor, {
        signal: this.controller.signal,
      })
      .then((response) => {
        if (this.animal_id == 1) {
          this.donor = response.data.rows
            .sort(function (a, b) {
              var c = new Date(a.StartDate);
              var d = new Date(b.StartDate);
              return c - d;
            })
            .filter(
              (item) =>
                item.Preset.PresetFor == "D" &&
                (item.Preset.AnimalTypeID == 1 || item.Preset.AnimalTypeID == 2)
            )

            .map((item) => {
              return {
                DonorID: item.DonorID,
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
          this.donor = response.data.rows
            .sort(function (a, b) {
              var c = new Date(a.StartDate);
              var d = new Date(b.StartDate);
              return c - d;
            })
            .filter(
              (item) =>
                item.Preset.PresetFor == "D" &&
                (item.Preset.AnimalTypeID == 3 || item.Preset.AnimalTypeID == 4)
            )

            .map((item) => {
              return {
                DonorID: item.DonorID,
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
          this.donor = response.data.rows
            .sort(function (a, b) {
              var c = new Date(a.StartDate);
              var d = new Date(b.StartDate);
              return c - d;
            })
            .filter(
              (item) =>
                item.Preset.PresetFor == "D" &&
                (item.Preset.AnimalTypeID == 17 ||
                  item.Preset.AnimalTypeID == 18)
            )

            .map((item) => {
              return {
                DonorID: item.DonorID,
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
      });
    axios
      .get(this.apiBCS, {
        signal: this.controller.signal,
      })
      .then((response) => {
        this.bcs = response.data.rows.map((item) => {
          return {
            BCSID: item.BCSID,
            Fullname: item.BCSName + " (" + item.BCSNumber + ")",
          };
        });
      });
    axios
      .get(this.apiembryo, {
        signal: this.controller.signal,
      })
      .then((response) => {
        this.embryo = response.data.rows.map((item) => {
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
      .get(this.apiPersonal, {
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
    "form.DonorID"(val) {
      // this.apiDonorID += "/" + val;
      axios
        .get(this.apiDonorID + "/" + val, {
          signal: this.controller.signal,
        })
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
  },
  methods: {
    loadData() {
      const route = useRoute();

      this.id = route.params.id;
      const setUrl = (this.apiDonorCollectEmbryo += "/" + route.params.id);

      axios.get(setUrl, { signal: this.controller.signal }).then((response) => {
        let id = response.data;

        this.form = {
          DonorCollectEmbryoID: id.DonorCollectEmbryoID,
          DonorID: id.DonorID,
          AnimalID: id.AnimalID,
          CollectDate: id.CollectDate,
          BCSID: id.BCSID,
          FollicleLeftAmount: id.FollicleLeftAmount,
          FollicleRightAmount: id.FollicleRightAmount,
          CLLeftAmount: id.CLLeftAmount,
          CLRightAmount: id.CLRightAmount,
          TransferableAmount: id.TransferableAmount,
          NonTransferableAmount: id.NonTransferableAmount,
          FreezeAmount: id.FreezeAmount,
          TransferAmount: id.TransferAmount,
          ResponsibilityStaffID: id.ResponsibilityStaffID,
        };

        this.getEmbyroDetail(id.DonorCollectEmbryoID);
      });
    },

    getEmbyroDetail(id) {
      // console.log(id);
      axios
        .get(
          "/donor-collect-embryo-detail?EmbryoAmount&DonorCollectEmbryoID=" +
            id,
          {
            signal: this.controller.signal,
          }
        )
        .then((response) => {
          let data = response.data.rows;

          // console.log(data);

          for (let i = 0; i < data.length; i++) {
            this.No += 1;
            this.embryoTotal.push({
              No: this.No,
              EmbryoStageID: data[i].EmbryoStageID,
              EmbryoStageGrade: data[i].EmbryoStage
                ? data[i].EmbryoStage.EmbryoStageGrade
                : "",
              EmbryoStageName: data[i].EmbryoStage
                ? data[i].EmbryoStage.EmbryoStageName
                : "",
              EmbryoAmount: data[i].EmbryoAmount,
            });
          }

          // console.log(this.embryoTotal);
        });
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
        !this.form.DonorID ||
        !this.form.AnimalID ||
        !this.form.CollectDate ||
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
      if (this.validation() == false) {
        return;
      }

      if (
        this.form.TransferableAmount == 0 &&
        this.form.NonTransferableAmount == 0
      ) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "กรุณาเลือกเก็บข้อมูลตัวอ่อน",
          life: 5000,
        });
        return;
      }
      this.form.isActive = 1;
      // apiDonorCollectEmbryo: "/donor-collect-embryo",
      // apiDonorCollectEmbryoDetail: "/donor-collect-embryo-detail",
      await axios
        .put(this.apiDonorCollectEmbryo, this.form)
        .then((res) => {
          // console.log(res);
          this.deleteAllDetail();

          if (this.embryoTotal) {
            for (let i = 0; i < this.embryoTotal.length; i++) {
              this.embryoTotal[i].DonorID = res.data.DonorID;
              this.embryoTotal[i].AnimalID = res.data.AnimalID;
              this.embryoTotal[i].isActive = 1;
              this.embryoTotal[i].DonorCollectEmbryoID =
                res.data.DonorCollectEmbryoID;

              this.uploadDetail(this.embryoTotal[i]);
            }
            // console.log(this.embryoTotal);
          }

          // if (this.form.AnimalImagePathGen !== undefined) {
          //   this.uploadPhoto(res.data.AnimalID, formData);
          // }

          // this.form = [];
          // this.setting = [
          //   {
          //     id: 1,
          //   },
          // ];
          // this.close_add();
          // this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });

          this.$router.push("/embryo/embryo");
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

    deleteAllDetail() {
      axios
        .delete(
          "/donor-collect-embryo-detail/delete-by-donor-collect-embryo-id/" +
            this.id
        )
        .then(() => {
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
