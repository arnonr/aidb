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
        @click="open"
        v-if="AnimalSecretStatus.includes(1) && permit[0].IsAdd"
      />
    </div>
  </div>
  <DataTable
    class="text-sm"
    :value="data"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    responsiveLayout="scroll"
    currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
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
    <Column header="จัดการ" class="text-center">
      <template #body="slotProps">
        <SplitButton
          v-if="slotProps.data.show_id == total || this.user.GroupID == 1"
          label="แก้ไข"
          icon="pi pi-pencil"
          @click="edit(slotProps.data.show_id - 1)"
          class="p-button-sm p-button-outlined p-button-warning"
          :model="getItems(slotProps.data.show_id - 1)"
        >
        </SplitButton>
        <!-- <SplitButton
          v-else
          label="แก้ไข"
          icon="pi pi-pencil"
          @click="edit(slotProps.index)"
          class="p-button-sm p-button-outlined p-button-warning"
          :model="getItems(slotProps.index)"
        >
        </SplitButton> -->
      </template>
    </Column>
    <template #empty> ไม่พบข้อมูล </template>
    <template #loading>
      <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
    </template>
  </DataTable>
  <Dialog
    :draggable="false"
    :header="formheader + name"
    v-model:visible="display"
    :style="{ width: '50vw' }"
    :modal="true"
    v-on:after-hide="clear()"
  >
    <div class="grid">
      <div class="col-12">หมายเลขสัตว์ : {{ show.id }}</div>
      <div class="col-12">ชื่อ : {{ show.name }}</div>
      <div class="col-12">ฟาร์ม : {{ show.farm }}</div>
    </div>
    <form class="grid mt-2">
      <div class="col-12 lg:col-12">
        <div class="grid">
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              รหัสเจ้าหน้าที่ผสมเทียม<span class="text-red-500"> *</span></label
            >
            <Dropdown
              :virtualScrollerOptions="{ itemSize: 38 }"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกรหัสเจ้าหน้าที่ผสมเทียม"
              optionLabel="StaffFullName"
              optionValue="StaffID"
              v-model="data[index].ResponsibilityStaffID"
              :options="selection.Staff"
              :filterFields="['StaffNumber', 'StaffGivenName', 'StaffSurname']"
              :filter="true"
              filterPlaceholder="รหัสเจ้าหน้าที่ผสมเทียม"
              :class="{
                'p-invalid': !data[index].ResponsibilityStaffID && valid,
              }"
            >
            </Dropdown>
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              วันที่คัดจำหน่าย<span class="text-red-500"> *</span></label
            >
            <!-- <Calendar
              :manualInput="false"
              :maxDate="new Date()"
              v-model="data[index].DistributionDate"
              dateFormat="dd/mm/yy"
              class="w-full"
              :class="{
                'p-invalid': !data[index].DistributionDate && valid,
              }"
            /> -->

            <Datepicker
              v-model="data[index].DistributionDate"
              :class="{ 'p-invalid': !data[index].DistributionDate && valid }"
              id="dateRange"
              locale="th"
              :format="format"
              utc
              :enableTimePicker="false"
              :maxDate="new Date()"
              cancelText="ยกเลิก"
              selectText="ยืนยัน"
              placeholder="วันที่คัดจำหน่าย"
            >
              <template #year-overlay-value="{ text }">
                {{ parseInt(text) + 543 }}
              </template>
              <template #year="{ year }">
                {{ year + 543 }}
              </template>
            </Datepicker>
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              ประเภทการคัดจำหน่าย<span class="text-red-500"> *</span></label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกประเภทการคัดจำหน่าย"
              optionLabel="header"
              optionValue="val"
              v-model="data[index].DistributionType"
              :options="selection.DistributionType"
              :class="{
                'p-invalid': !data[index].DistributionType && valid,
              }"
            />
          </div>
          <div class="col-12 lg:col-6">
            <label class="block text-600 text-sm font-bold mb-2">
              สาเหตุการคัดจำหน่าย</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกสาเหตุที่คัดจำหน่าย"
              optionLabel="DistributionReasonName"
              optionValue="DistributionReasonID"
              v-model="data[index].DistributionReasonID"
              :options="selection.DistributionReasonID"
            />
          </div>

          <!--  -->
          <div
            class="col-12 lg:col-6"
            v-if="
              data[index].DistributionType == 'SALE' ||
              data[index].DistributionType == 'TRANSFER'
            "
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ศูนย์วิจัย</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกศูนย์วิจัย"
              optionLabel="AIZoneName"
              optionValue="AIZoneID"
              :filter="true"
              v-model="search.AIZoneID"
              :options="selection.AIZone"
            />
          </div>

          <!-- <div
            class="col-12 lg:col-6"
            v-if="
              data[index].DistributionType == 'SALE' ||
              data[index].DistributionType == 'TRANSFER'
            "
          >
            <label class="block text-600 text-sm font-bold mb-2">
              จังหวัด</label
            >
            <Dropdown
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="เลือกจังหวัด"
              optionLabel="ProvinceName"
              optionValue="ProvinceID"
              :filter="true"
              v-model="search.ProvinceID"
              :options="selection.Province"
            />
          </div> -->

          <div
            class="col-12 lg:col-6"
            v-if="
              data[index].DistributionType == 'SALE' ||
              data[index].DistributionType == 'TRANSFER'
            "
          >
            <label class="block text-600 text-sm font-bold mb-2">
              ฟาร์มปลายทาง</label
            >
            <v-select
              v-model="data[index].DestinationFarmID"
              :options="selection.DestinationFarmIDFilter"
              @search="fetchDestinationFarmOptions"
              label="Fullname"
              value="FarmID"
              class="w-full"
              placeholder="เลือกฟาร์มปลายทาง (พิมพ์ 3 ตัวอักษรเพื่อค้นหา)"
            ></v-select>
          </div>
        </div>
      </div>
      <div class="col-12 text-center mt-5 flex justify-content-between">
        <Button
          label="ยกเลิก"
          class="p-button-secondary w-full mr-3"
          @click="close()"
        />
        <Button
          label="บันทึกข้อมูล"
          class="ml-3 p-button-info w-full"
          @click="add()"
        />
      </div>
    </form>
  </Dialog>
  <Dialog
    header="ตรวจสอบข้อมูล"
    v-model:visible="display_delete"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="confirmation-content text-center">
      <i class="pi pi-trash" style="font-size: 5rem" />
      <br />
      <span class="text-xl"
        >คุณต้องการลบ{{ name }}ลำดับที่
        {{ data[index].show_id }} ใช่หรือไม่</span
      >
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
import { mapGetters } from "vuex";
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import Swal from "sweetalert2";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    vSelect,
  },
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
  },
  data() {
    return {
      // API
      url: "/distribution",
      urlFarm: "/farm/selection?includeAll=false",

      animal_url: "animal",
      // ID
      id: "DistributionID",
      // Name
      name: "การคัดจำหน่าย",
      search: {},
      //load_selection
      LoadSelection: {
        Staff: "/staff/selection?includeAll=false&isActive=1",
        DistributionReasonID: "/distribution-reason",
        DestinationFarmID: "/farm/selection?includeAll=false&isActive=1",
        AIZone: "/ai-zone/selection?isActive=1",
        Province: "/province/selection?isActive=1",
      },
      show: {},
      // Selection

      selection: {
        Staff: null,
        DistributionReasonID: null,
        DestinationFarmID: null,
        DestinationFarmIDFilter: [],
        DistributionType: [
          {
            header: "ตาย",
            val: "DEATH",
          },
          {
            header: "ขาย",
            val: "SALE",
          },
          {
            header: "คัดทิ้ง",
            val: "DROP",
          },
          //   {
          //     header: "ย้าย",
          //     val: "TRANSFER",
          //   },
        ],
      },
      // Table Field
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },
        {
          field: "ThaiDistributionDate",
          header: "วันที่คัดจำหน่าย",
        },
        {
          field: "DistributionTypeName",
          header: "ประเภท",
        },
        {
          field: "DistributionReasonName",
          header: "สาเหตุ",
        },
        {
          field: "SourceFarmName",
          header: "ฟาร์มต้นทาง",
        },
        {
          field: "DestinationFarmName",
          header: "ฟาร์มปลายทาง",
        },
        {
          field: "ResponsibilityStaffName",
          header: "เจ้าหน้าที่",
        },
      ],

      // Search
      isSelection: false,

      // Static Data
      total: null,
      isLoading: false,
      data: [],
      valid: false,
      index: null,
      display: false,
      display_delete: false,
      temp: null,
      formheader: "",
      // uneditable
      items: [
        {
          label: "แก้ไข",
          icon: "pi pi-pencil",
        },
        {
          label: "ลบ",
          icon: "pi pi-times",
        },
      ],
      controller: new AbortController(),
    };
  },
  async mounted() {
    await this.load();
    await this.load_selection();
    if (
      this.display_prop &&
      this.AnimalSecretStatus.includes(1) &&
      this.permit[0].IsAdd
    ) {
      this.open();
    }
  },
  watch: {
    AnimalID(val) {
      if (val) {
        this.load();
      } else {
        this.data = [];
      }
    },
    "search.AIZoneID"() {
      this.fetchFarm();
    },
    "search.ProvinceID"() {
      this.fetchFarm();
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
        this.temp = null;
      }
      this.formheader = "";
      this.index = null;
      this.valid = false;
      this.$emit("onclear_display");
    },
    // validate templates
    validation() {
      if (
        !this.data[this.index].ResponsibilityStaffID ||
        !this.data[this.index].DistributionType ||
        !this.data[this.index].DistributionDate
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
                if (Object.keys(this.LoadSelection).length == index) {
                  resolve();
                }
              });
          }
        }
      });
    },
    // main load
    load() {
      return new Promise((resolve) => {
        this.isLoading = true;

        axios
          .get(`${this.url}?AnimalID=${this.AnimalID}`)
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
      if (this.validation() == false) {
        return;
      }
      if (
        this.index == this.data.length - 1 &&
        !this.data[this.index].CreatedUserID
      ) {
        //create data
        let DesFarmID = this.data[this.index].DestinationFarmID.FarmID;
        this.data[this.index].DestinationFarmID = DesFarmID;

        axios
          .post(this.url, this.data[this.index])
          .then(() => {
            this.close();
            this.load();

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
      }
      // update data
      else if (this.index < this.data.length) {
        if (this.validation() == false) {
          return;
        }
        delete this.data[this.index].Staff;
        delete this.data[this.index].BCS;
        delete this.data[this.index].show_id;

        let DesFarmID = this.data[this.index].DestinationFarmID.FarmID;
        this.data[this.index].DestinationFarmID = DesFarmID;

        axios
          .put(
            this.url + "/" + this.data[this.index][this.id],
            this.data[this.index]
          )
          .then(() => {
            this.close();
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
      }
      // this.$emit("refresh_secret_status");
    },
    // remove data
    remove() {
      axios.delete(this.url + "/" + this.data[this.index][this.id]).then(() => {
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
    // form open add
    async open() {
      this.index = this.data.length;
      this.formheader = "เพิ่ม";
      this.data.push({
        AnimalID: this.AnimalID,
      });

      this.data[this.index].ResponsibilityStaffID = this.user.StaffID;

      await axios
        .get(`animal?AnimalID=${this.AnimalID}`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.show.id = response.data.rows[0].AnimalEarID;
          this.show.name = response.data.rows[0].AnimalName;
          this.show.farm = `${response.data.rows[0].AnimalFarm.FarmIdentificationNumber}, ${response.data.rows[0].AnimalFarm.FarmName} `;
          this.data[this.index].FarmID = response.data.rows[0].FarmID;
        });

      this.display = true;
    },
    //form open edit
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
      this.index = id;
      this.formheader = "แก้ไข";
      this.temp = JSON.parse(JSON.stringify(this.data[this.index]));

      if (this.selection.DestinationFarmID != null) {
        let Farm1 = this.selection.DestinationFarmID.find((x) => {
          return this.data[this.index].DestinationFarmID == x.FarmID;
        });
        this.search.AIZoneID = Farm1.AIZoneID;
        // this.search.ProvinceID = Farm1.ProvinceID;
      }

      await axios
        .get(`animal?AnimalID=${this.AnimalID}`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.show.id = response.data.rows[0].AnimalEarID;
          this.show.name = response.data.rows[0].AnimalName;
          this.show.farm = `${response.data.rows[0].AnimalFarm.FarmIdentificationNumber}, ${response.data.rows[0].AnimalFarm.FarmName} `;
          this.data[this.index].FarmID = response.data.rows[0].FarmID;
        });

      this.display = true;
    },
    close() {
      this.display = false;
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
    close_delete() {
      this.display_delete = false;
    },
    fetchDestinationFarmOptions(search) {
      if (search.length > 3) {
        this.selection.DestinationFarmIDFilter =
          this.selection.DestinationFarmID.filter((x) => {
            return x.Fullname.includes(search); //|| x.FarmIdentificationNumber.includes(search);
          });
      } else {
        this.selection.DestinationFarmIDFilter = [];
      }
    },
    fetchFarm() {
      this.isLoading = true;
      if (this.search.AIZoneID == null) {
        this.isLoading = false;
        return;
      }

      let params = {
        orderByField: "FarmID",
        orderBy: "desc",
      };

      if (this.search.FarmAnimalType == null) {
        this.search.FarmAnimalType = parseInt(this.animal_id);
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

      if (this.search.ProvinceID != null) {
        params["FarmProvinceID"] = this.search.ProvinceID;
      }

      axios
        .get(this.urlFarm, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.selection.DestinationFarmID = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>

<style>
.vs__search {
  padding: 6px !important;
}
</style>
