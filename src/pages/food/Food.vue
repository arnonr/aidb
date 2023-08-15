<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="การจัดเก็บข้อมูลการขุน/อาหาร" :pages="breadcrumb" />
      <div class="card bg-primary pb-6 mb-5">
        <h1 class="text-center text-white">ค้นหาหมายเลขฟาร์ม</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />
          <Dropdown
            class="w-full"
            v-model="search.FarmID"
            :options="farm"
            optionLabel="Fullname"
            optionValue="FarmID"
            placeholder="เลือกหมายเลขฟาร์ม"
            :virtualScrollerOptions="{ itemSize: 38 }"
            :filter="true"
            :showClear="true"
          ></Dropdown>
        </span>
      </div>

      <div class="card">
        <div class="flex align-items-center justify-content-between">
          <div>
            <h1 class="text-2xl mb-0 text-600">
              รายการการจัดเก็บข้อมูลการขุน/อาหาร
            </h1>
          </div>
          <Button
            v-if="this.search.FarmID"
            label="เพิ่มโปรแกรม"
            icon="pi pi-plus"
            @click="addProgram()"
            class="p-button-raised p-button-info"
          />
        </div>
        <div class="mt-5">
          <DataTable
            class="text-sm"
            :value="program"
            :loading="isLoading"
            @sort="sort($event)"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
            <Column field="show_id" header="ลำดับ" class="text-center"></Column>
            <Column
              field="FeedProgramName"
              header="ชื่อโปรแกรม"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="ThaiStartDate"
              header="วันที่เข้าขุน/อาหาร"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="ThaiEndDate"
              header="วันที่สิ้นสุดเข้าขุน/อาหาร"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="WeightGoal"
              header="น้ำหนักเป้าหมาย (กก.)"
              class="text-center"
              :sortable="true"
            ></Column>
            <Column
              field="TotalAnimal"
              header="จำนวนสัตว์ที่เข้าขุน"
              class="text-center"
              :sortable="true"
            >
            </Column>
            <Column
              field="PercentSuccess"
              header="สำเร็จตามเป้าหมาย (%)"
              class="text-center"
              :sortable="true"
            >
            </Column>
            <Column
              field="PercentFail"
              header="ไม่เป็นไปตามเป้าหมาย (%)"
              class="text-center"
              :sortable="true"
            >
            </Column>
            <Column
              field="Staff.StaffFullName"
              header="ชื่อเจ้าหน้าที่"
              :sortable="true"
              class="text-center"
            >
            </Column>
            <Column header="จัดการ" class="text-center">
              <template #body="slotProps">
                <SplitButton
                  label="จัดการน้ำหนักเริ่มต้น"
                  icon="pi pi-pencil"
                  @click="edit(slotProps.data.FeedProgramID)"
                  class="p-button-sm p-button-outlined p-button-warning"
                  :model="getItems(slotProps.data.FeedProgramID)"
                >
                </SplitButton>
              </template>
            </Column>
            <template #empty> ไม่พบข้อมูล </template>
            <template #loading>
              <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
            </template>
          </DataTable>
          <Paginator
            @page="page($event)"
            :rows="15"
            :totalRecords="total"
          ></Paginator>
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
            เจ้าหน้าที่ผู้รับผิดชอบ <span class="text-red-500"> *</span>
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
          <label for="date" class="block text-600 text-sm font-bold mb-2"
            >เลือกวันที่<span class="text-red-500"> *</span></label
          >
          <!-- <Calendar
            class="w-full"
            id="dateRange"
            v-model="form.FeedProgramProgressDate"
            :showButtonBar="true"
            :showIcon="true"
            :touchUI="true"
            :class="{ 'p-invalid': !form.FeedProgramProgressDate && valid }"
          /> -->

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
          <label for="typeOfFood" class="block text-600 text-sm font-bold mb-2">
            เลือกประเภทอาหาร TMR / อาหารข้นหรือหยาบ<span class="text-red-500">
              *</span
            >
          </label>
          <Dropdown
            class="w-full"
            id="typeOfFood"
            v-model="form.FeedType"
            :options="typeFood"
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
              <label for="costTMR" class="block text-600 text-sm font-bold mb-2"
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
          <h4 class="text-xl mb-4 mt-3 text-600">อาหารข้นหรืออาหารหยาบ</h4>
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
                  :options="typeFood2"
                  optionLabel="label"
                  optionValue="id"
                  placeholder="เลือกอาหารข้นหรือหยาบ"
                  :key="index"
                  v-model="item.Type"
                  @change="setFood(item.Type, index)"
                />
              </div>
              <div class="field col-12 md:col-6 xl:col-4">
                <label for="food" class="block text-600 text-sm font-bold mb-2"
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
          <h4 class="text-xl mb-4 mt-3 text-600">รายงานความคืบหน้า</h4>
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
                      slotProps.data.FeedProgramProgressAnimalID
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
                      slotProps.data.FeedProgramProgressAnimalID
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
                      slotProps.data.FeedProgramProgressAnimalID
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
                      slotProps.data.FeedProgramProgressAnimalID
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
import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import PageTitle from "@/components/PageTitle.vue";
import { mapGetters } from "vuex";
import router from "../../router";
import store from "@/service/Vuex";
import { format } from "date-fns";
import { th } from "date-fns/locale";
export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      user: "user",
      animal_id: "animal_id",
      farmDataItem: "farmDataItem",
      animalInfo: "animalInfo",
    }),
  },
  data() {
    return {
      breadcrumb: [
        { label: "เจ้าหน้าที่ผสมเทียม", to: "/activity/farm_info" },
        { label: "การจัดเก็บข้อมูลการขุน/อาหาร", to: "/activity/food" },
      ],
      mockupData: [
        {
          number: 1,
        },
      ],
      animalData: [],
      typeFood: [
        { id: "TMR", label: "TMR" },
        { id: "FOOD", label: "อาหารข้นหรืออาหารหยาบ" },
      ],
      typeFood2: [
        { id: "1", label: "อาหารข้น" },
        { id: "2", label: "อาหารหยาบ" },
      ],
      form: {
        isActive: 1,
        TotalQuantity: 0,
      },
      personal: [],
      foods: [],
      food: null,
      formFood: [],
      data: [],
      url: [],
      program: [],
      farm: null,
      search: [],
      params: {
        isActive: 1,
        AnimalTypeID: null,
      },

      animalList: [],

      foodList: [],
      filtered: [],
      controller: new AbortController(),
      curpage: 0,
      FeedProgramProgressID: null,
      formheader: "",
      sortField: "",
      sortOrder: "",
      isLoading: false,
      checkInsert: false,

      checkLoad: false,
      loading: false,
      // Modal
      display_add: false,
      display_edit: false,
      display_delete: false,
      display_progress: false,
      items: [
        {
          label: "แก้ไข",
          icon: "pi pi-pencil",
        },
        {
          label: "ลบ",
          icon: "pi pi-trash",
        },
      ],
    };
  },

  loadLazyTimeout: null,

  mounted() {
    dayjs.extend(buddhistEra);

    if (this.farmDataItem) {
      this.search.FarmID = this.farmDataItem.FarmID;
    }

    this.url.farm = "/farm?isActive=1";
    if (this.farmDataItem) {
      this.search.FarmID = this.farmDataItem.FarmID;
    }

    axios.get("/food").then((response) => {
      this.foodList = response.data.rows;
    });

    axios
      .get(this.url.farm, {
        signal: this.controller.signal,
      })
      .then((res) => {
        this.farm = res.data.rows
          .sort((a, b) =>
            a.Province.ProvinceName.localeCompare(b.Province.ProvinceName)
          )
          .map((item) => {
            let name = item.Farmer ? item.Farmer.FullName : "- ";
            let number = item.FarmIdentificationNumber
              ? item.FarmIdentificationNumber
              : "- ";
            let province = item.Province ? item.Province.ProvinceName : "- ";
            let Organization = item.OrganizationZone
              ? item.OrganizationZone.OrganizationZoneName
              : "- ";
            return {
              FarmID: item.FarmID,
              FarmName: item.FarmName,
              Fullname:
                "ฟาร์ม " +
                item.FarmName +
                " (" +
                number +
                ")" +
                " | เจ้าของฟาร์ม " +
                name +
                " | จังหวัด " +
                province +
                " | " +
                Organization,
              OrganizationZoneName: item.OrganizationZone.OrganizationZoneName,
            };
          });
        this.loader = true;
      });
  },
  watch: {
    "search.FarmID"(val) {
      this.filtered.FarmID = val;
      this.load();
    },
    "form.FeedProgramProgressDate"(val) {
      if (val) {
        let paramsData = {
          FeedProgramProgressDate: val,
          FeedProgramID: this.form.FeedProgramID,
        };

        axios
          .get("/feed-program-progress", {
            params: paramsData,
            signal: this.controller.signal,
          })
          .then((response) => {
            if (response.data.rows[0]) {
              this.form = response.data.rows[0];
              this.checkInsert = true;
              this.checkLoad = true;
              this.loadAnimal2();
              this.loadFood();
            } else {
              this.checkLoad = false;
              this.form = {
                isActive: 1,
                ResponsibilityStaffID: this.user.StaffID,
                FeedProgramProgressDate: val,
                FeedProgramID: this.form.FeedProgramID,
              };
              this.checkInsert = false;
              this.animalData = null;
            }
          })
          .catch(() => {
            this.$toast.add({
              severity: "error",
              summary: "ล้มเหลว",
              detail: "ไม่พบข้อมูลเดิม",
              life: 5000,
            });
          })

          .finally(() => {
            this.isLoading = false;
          });
      }
    },
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

    load() {
      this.isLoading = true;

      let url = "/farm/" + this.filtered.FarmID;

      axios
        .get(url, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data = res.data;
          store.dispatch("farmDataItem", this.data);
          this.loadProgram();
        })
        .catch(() => {
          store.dispatch("farmDataItem", null);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    async loadProgram() {
      let url;

      url = "/feed-program" + "?FarmID=";

      if (this.animal_id == 1) {
        this.params.AnimalTypeID = "[1,2]";
      } else if (this.animal_id == 2) {
        this.params.AnimalTypeID = "[3,4]";
      } else if (this.animal_id == 3) {
        this.params.AnimalTypeID = "[17,18]";
      }

      axios
        .get(url + this.filtered.FarmID, {
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
                this.program[i].StartDate = dayjs(this.program[i].StartDate)
                  .locale(locale)
                  .format("DD/MM/YYYY");
                this.program[i].EndDate = dayjs(this.program[i].EndDate)
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
    open_delete(id) {
      this.data.id = id;
      this.display_delete = true;
    },

    // remove data
    remove() {
      axios.delete("/feed-program/" + this.data.id).then(() => {
        this.load();
        this.$toast.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "ลบข้อมูลเสร็จสิ้น",
          life: 5000,
        });
        this.close_delete();
      });
    },
    close_delete() {
      this.display_delete = false;
    },
    close_progress() {
      this.display_progress = false;
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
    open_progress(id) {
      axios
        .get("/staff?isActive=1", {
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

    edit(id) {
      this.$router.push("/activity/food/edit/" + id);
    },
    onLazyLoad() {
      this.loading = true;

      if (this.loadLazyTimeout) {
        clearTimeout(this.loadLazyTimeout);
      }

      this.loadLazyTimeout = setTimeout(() => {
        this.loading = false;
      }, Math.random() * 1000 + 250);
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
    deleteFood() {
      this.foods.splice(this.foods.length - 1, 1);
    },

    addProgram() {
      const id = this.search.FarmID;
      router.push({ name: "addfood", params: { id } });
    },

    async addProgress() {
      let data = this.program.find(
        (x) => x.FeedProgramID == this.form.FeedProgramID
      );

      // console.log(data);

      if (this.form.FeedType === "TMR") {
        await axios
          .post("/feed-program-progress", this.form)
          .then(async (res) => {
            this.FeedProgramProgressID = res.data.FeedProgramProgressID;

            for (let i = 0; i < data.FeedProgramAnimals.length; i++) {
              let formData = {
                FeedProgramProgressID: this.FeedProgramProgressID,
                FeedProgramAnimalID:
                  data.FeedProgramAnimals[i].FeedProgramAnimalID,
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
            // console.log(err);
            this.$toast.add({
              severity: "error",
              summary: "ล้มเหลว",
              detail: err.response.data.error.message,
              life: 5000,
            });
          })
          .finally(() => {
            this.loadAnimal();
          });

        this.loadAnimal();
      } else if (this.form.FeedType === "FOOD") {
        this.setTotal();
        await axios
          .post("/feed-program-progress", this.form)
          .then(async (res) => {
            this.FeedProgramProgressID = res.data.FeedProgramProgressID;

            for (let i = 0; i < data.FeedProgramAnimals.length; i++) {
              let formData = {
                FeedProgramProgressID: this.FeedProgramProgressID,
                FeedProgramAnimalID:
                  data.FeedProgramAnimals[i].FeedProgramAnimalID,
                AnimalID: data.FeedProgramAnimals[i].AnimalID,
                WeightDate: this.form.FeedProgramProgressDate,
                Weight: 0,
                isActive: 1,
              };

              await this.insertAnimal(formData);
            }

            for (let i = 0; i < this.foods.length; i++) {
              let foodData = {
                FeedProgramProgressID: this.FeedProgramProgressID,
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
            this.loadAnimal();
          });

        this.loadAnimal();
      }
    },

    async editProgress() {
      // console.log(this.form.FeedProgramProgressID);

      if (this.form.FeedType === "TMR") {
        await axios
          .put(
            "/feed-program-progress/" + this.form.FeedProgramProgressID,
            this.form
          )
          .then(async () => {
            this.$toast.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "แก้ไขข้อมูลเสร็จสิ้น",
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
          });
      } else if (this.form.FeedType === "FOOD") {
        this.setTotal();
        await axios
          .put(
            "/feed-program-progress/" + this.form.FeedProgramProgressID,
            this.form
          )
          .then(async (res) => {
            this.FeedProgramProgressID = res.data.FeedProgramProgressID;

            // for (let i = 0; i < this.foods.length; i++) {
            //   let foodData = {
            //     FeedProgramProgressID: this.FeedProgramProgressID,
            //     FoodID: this.foods[i].FoodID,
            //     Total: this.foods[i].Total,
            //     isActive: 1,
            //   };

            //   await this.insertFood(foodData);
            // }

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
          });
      }
    },

    async insertAnimal(formData) {
      // console.log(formData);
      axios
        .post("/feed-program-progress-animal", formData)
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
    async insertFood(foodData) {
      axios
        .post("/feed-program-progress-food", foodData)
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

    async loadAnimal() {
      axios
        .get(
          "/feed-program-progress-animal?FeedProgramProgressID=" +
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
    async loadFood() {
      axios
        .get(
          "/feed-program-progress-food?FeedProgramProgressID=" +
            this.form.FeedProgramProgressID,
          { signal: this.controller.signal }
        )
        .then((response) => {
          this.foods = response.data.rows;

          for (let i = 0; i < this.foods.length; i++) {
            // Map New Data Day
            if (this.foods[i].Food.FoodType == "1") {
              this.foods[i].Type = this.typeFood2[0].id;
            } else if (this.foods[i].Food.FoodType == "2") {
              this.foods[i].Type = this.typeFood2[1].id;
            }
          }

          this.foods = this.foods.map((item) => {
            return {
              id: this.foods.length + 1,
              FeedProgramProgressID: item.FeedProgramProgressID,
              FoodID: item.FoodID,
              Type: item.Type,
              Total: item.Total,
            };
          });

          // console.log(this.foods);

          this.setFood2();
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
    async loadAnimal2() {
      axios
        .get(
          "/feed-program-progress-animal?FeedProgramProgressID=" +
            this.form.FeedProgramProgressID,
          { signal: this.controller.signal }
        )
        .then((response) => {
          this.animalData = response.data.rows;

          // dayjs.extend(buddhistEra);
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

    setWeight($event, $id) {
      let form = {
        Weight: $event.value,
      };
      axios
        .put("/feed-program-progress-animal/" + $id, form)
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
        .put("/feed-program-progress-animal/" + $id, form)
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
        .put("/feed-program-progress-animal/" + $id, form)
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
        .put("/feed-program-progress-animal/" + $id, form)
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

    setFood(data, id) {
      // console.log();
      if (data == "1") {
        this.foods[id].FoodType = this.foodList.filter(
          (item) => item.FoodType == "1"
        );
      } else {
        this.foods[id].FoodType = this.foodList.filter(
          (item) => item.FoodType == "2"
        );
      }
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

    // toggle(event) {
    //   try {
    //     this.$refs.menu.toggle(event);
    //   } catch (e) {
    //     window.location.reload();
    //   }
    // },
    // edit() {
    //   this.$router.push("/activity/food/add");
    // },
    // open_delete() {},
  },

  unmounted() {
    this.controller.abort();
  },
};
</script>
