//Ref -> 1.2.5 เมนูคลอด
<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="การจัดเก็บข้อมูลการขุน/อาหาร" :pages="breadcrumb" />
      <div class="card">
        <div class="grid align-items-center">
          <div class="col-12 md:col-6 lg:col-4 xl:col-8">
            <h1 class="text-2xl mb-0 text-600">สูตรอาหาร TMR</h1>
          </div>
          <div
            class="col-12 md:col-6 lg:col-8 xl:col-4 md:text-right mt-2 sm:mt-0"
          >
            <router-link to="/activity/food/add">
              <Button label="ข้อมูลความคืบหน้า" class="p-button-text mr-2" />
            </router-link>
            <Button
              label="เพิ่มสูตรอาหาร TMR"
              icon="pi pi-plus"
              @click="openAdd"
            />
          </div>
        </div>
        <div class="mt-5">
          <DataTable
            class="text-sm"
            :value="data"
            dataKey="id"
            :paginator="true"
            :rows="10"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            responsiveLayout="scroll"
          >
            <Column field="show_id" header="ลำดับ" class="text-center"></Column>
            <Column
              field="TMRFormulaCode"
              header="รหัสสูตร TMR"
              class="text-center"
            ></Column>
            <Column
              field="TMRFormulaName"
              header="ชื่อสูตร TMR "
              :sortable="true"
              class="text-center"
            >
            </Column>
            <Column field="Roughages" header="อาหารหยาบ" class="text-center"
              ><template #body="slotProps">
                {{ formatArray(slotProps.data.Roughages) }}
              </template></Column
            >
            <Column field="Concentrates" header="อาหารข้น" class="text-center"
              ><template #body="slotProps">
                {{ formatArray(slotProps.data.Concentrates) }}
              </template></Column
            >
            <Column
              field="TotalTMR"
              header="ปริมาณอาหาร TMR/วัน (กก.)"
              class="text-center"
            ></Column>
            <Column
              field="ProteinPercentage"
              header="โปรตีน (%)"
              class="text-center"
            >
            </Column>
            <Column
              field="CaloriePercentage"
              header="พลังงาน (%)"
              class="text-center"
            ></Column>
            <Column
              field="Cost"
              header="ต้นทุนต่อวัน"
              class="text-center"
            ></Column>
            <Column
              field="ResponsibilityStaffID"
              header="เจ้าหน้าที่ที่รับผิดชอบ"
              class="text-center"
            >
              <template #body="slotProps">
                <div>
                  {{
                    slotProps.data.Staff.StaffGivenName +
                    " " +
                    slotProps.data.Staff.StaffSurname
                  }}
                </div>
              </template>
            </Column>
            <Column header="จัดการ" class="text-center">
              <template #body="slotProps">
                <SplitButton
                  label="แก้ไข"
                  icon="pi pi-pencil"
                  @click="edit(slotProps.data.TMRFormulaID)"
                  class="p-button-sm p-button-outlined p-button-warning"
                  :model="getItems(slotProps.data.TMRFormulaID)"
                >
                </SplitButton>
              </template>
              <!-- <template #body>
                <Button
                  type="button"
                  icon="pi pi-ellipsis-v"
                  @click="toggle"
                  class="p-button-text"
                  aria-haspopup="true"
                  aria-controls="overlay_menu"
                />
                <Menu id="overlay_menu" ref="menu" :model="items" :popup="true">
                  <template #item="{ item }">
                    <Button
                      v-if="item.label == 'แก้ไข'"
                      :label="item.label"
                      :icon="item.icon"
                      class="p-button-text w-full text-left"
                      @click="edit()"
                    />
                    <Button
                      v-if="item.label == 'ลบ'"
                      :label="item.label"
                      :icon="item.icon"
                      class="p-button-text w-full text-left"
                      @click="open_delete()"
                    />
                  </template>
                </Menu>
              </template> -->
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
    <!-- เพิ่มสูตรอาหาร TMR -->
    <Dialog
      v-model:visible="display_add"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <template #header>
        <div>
          <h3 class="mb-0 text-xl md:text-2xl font-normal text-indigo-800">
            เพิ่มสูตรอาหาร TMR
          </h3>
          <h6 class="mb-0 mt-2 text-sm md:text-base font-normal text-400">
            รายละเอียดรายละเอียดกข้อมูลสูตรอาหาร TMR
          </h6>
        </div>
      </template>

      <form>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <label
              for="TMRFormulaCode"
              class="block text-600 text-sm font-bold mb-2"
              >รหัสสูตร TMR</label
            >
            <InputText
              class="w-full"
              id="TMRFormulaCode"
              v-model="form.TMRFormulaCode"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="TMRFormulaName"
              class="block text-600 text-sm font-bold mb-2"
              >ชื่อสูตร TMR</label
            >
            <InputText
              type="text"
              v-model="form.TMRFormulaName"
              class="w-full"
              id="TMRFormulaName"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="RoughagesID"
              class="block text-600 text-sm font-bold mb-2"
              >อาหารหยาบ</label
            >
            <Dropdown
              v-model="tmrFormulaId"
              class="w-full"
              id="RoughagesID"
              optionLabel="name"
              :filter="true"
              :showClear="true"
              :options="tmrFormula"
              placeholder="ค้นหาอาหารหยาบ"
            >
              <template #value="slotProps">
                <div
                  class="country-item country-item-value"
                  v-if="slotProps.value"
                >
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
            </Dropdown>
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="ConcentrateID"
              class="block text-600 text-sm font-bold mb-2"
              >อาหารข้น</label
            >
            <Dropdown
              v-model="tmrFormulaId"
              class="w-full"
              id="ConcentrateID"
              optionLabel="name"
              :filter="true"
              :showClear="true"
              :options="tmrFormula"
              placeholder="ค้นหาอาหารข้น"
            >
              <template #value="slotProps">
                <div
                  class="country-item country-item-value"
                  v-if="slotProps.value"
                >
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
            </Dropdown>
          </div>
          <div class="field col-12 md:col-6">
            <label for="TotalTMR" class="block text-600 text-sm font-bold mb-2">
              ปริมาณอาหาร TMR/วัน (กก.)
            </label>
            <InputNumber
              class="w-full"
              id="TotalTMR"
              v-model="form.TotalTMR"
              mode="decimal"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="ProteinPercentage"
              class="block text-600 text-sm font-bold mb-2"
            >
              โปรตีน (%)
            </label>
            <InputNumber
              class="w-full"
              id="ProteinPercentage"
              mode="decimal"
              v-model="form.ProteinPercentage"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="CaloriePercentage"
              class="block text-600 text-sm font-bold mb-2"
            >
              พลังงาน (%)
            </label>
            <InputNumber
              class="w-full"
              id="CaloriePercentage"
              mode="decimal"
              v-model="form.CaloriePercentage"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label for="Cost" class="block text-600 text-sm font-bold mb-2">
              ต้นทุนต่อวัน
            </label>
            <InputNumber
              class="w-full"
              id="Cost"
              v-model="form.Cost"
              mode="decimal"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="ResponsibilityStaffID"
              class="block text-600 text-sm font-bold mb-2"
              >เจ้าหน้าที่ที่รับผิดชอบ</label
            >
            <Dropdown
              class="w-full"
              v-model="form.StaffID"
              :options="Staff"
              optionLabel="StaffNumber"
              optionValue="StaffID"
              :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: onLazyLoad,
                itemSize: 38,
                showLoader: true,
                loading: loading,
                delay: 250,
              }"
              :filter="true"
              :showClear="true"
            >
              <template v-slot:loader="{ options }">
                <div class="flex align-items-center p-2" style="height: 38px">
                  <Skeleton
                    :width="options.even ? '60%' : '50%'"
                    height="1rem"
                  />
                </div>
              </template>
              <template #option="slotProps">
                <div class="p-dropdown-car-option">
                  <span>{{
                    slotProps.option.StaffNumber +
                    " | " +
                    slotProps.option.StaffGivenName +
                    " " +
                    slotProps.option.StaffSurname
                  }}</span>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
        <div class="grid mt-3">
          <div class="col-6">
            <Button
              label="ยกเลิก"
              class="p-button-secondary w-full"
              @click="close_add"
            />
          </div>
          <div class="col-6">
            <Button label="บันทึกข้อมูล" class="w-full" @click="submit" />
          </div>
        </div>
      </form>
    </Dialog>

    <!-- แก้ไขข้สูตรอาหาร TMR -->
    <Dialog
      v-model:visible="display_edit"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <template #header>
        <div>
          <h3 class="mb-0 text-xl md:text-2xl font-normal text-indigo-800">
            แก้ไขสูตรอาหาร TMR
          </h3>
          <h6 class="mb-0 mt-2 text-sm md:text-base font-normal text-400">
            รายละเอียดรายละเอียดกข้อมูลสูตรอาหาร TMR
          </h6>
        </div>
      </template>

      <form>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <label
              for="TMRFormulaCode"
              class="block text-600 text-sm font-bold mb-2"
              >รหัสสูตร TMR</label
            >
            <InputText
              class="w-full"
              id="TMRFormulaCode"
              v-model="form.TMRFormulaCode"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="TMRFormulaName"
              class="block text-600 text-sm font-bold mb-2"
              >ชื่อสูตร TMR</label
            >
            <InputText
              type="text"
              v-model="form.TMRFormulaName"
              class="w-full"
              id="TMRFormulaName"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="RoughagesID"
              class="block text-600 text-sm font-bold mb-2"
              >อาหารหยาบ</label
            >
            <Dropdown
              v-model="tmrFormulaId"
              class="w-full"
              id="RoughagesID"
              optionLabel="name"
              :filter="true"
              :showClear="true"
              :options="tmrFormula"
              placeholder="ค้นหาอาหารหยาบ"
            >
              <template #value="slotProps">
                <div
                  class="country-item country-item-value"
                  v-if="slotProps.value"
                >
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
            </Dropdown>
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="ConcentrateID"
              class="block text-600 text-sm font-bold mb-2"
              >อาหารข้น</label
            >
            <Dropdown
              v-model="tmrFormulaId"
              class="w-full"
              id="ConcentrateID"
              optionLabel="name"
              :filter="true"
              :showClear="true"
              :options="tmrFormula"
              placeholder="ค้นหาอาหารข้น"
            >
              <template #value="slotProps">
                <div
                  class="country-item country-item-value"
                  v-if="slotProps.value"
                >
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
            </Dropdown>
          </div>
          <div class="field col-12 md:col-6">
            <label for="TotalTMR" class="block text-600 text-sm font-bold mb-2">
              ปริมาณอาหาร TMR/วัน (กก.)
            </label>
            <InputNumber
              class="w-full"
              id="TotalTMR"
              v-model="form.TotalTMR"
              mode="decimal"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="ProteinPercentage"
              class="block text-600 text-sm font-bold mb-2"
            >
              โปรตีน (%)
            </label>
            <InputNumber
              class="w-full"
              id="ProteinPercentage"
              mode="decimal"
              v-model="form.ProteinPercentage"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="CaloriePercentage"
              class="block text-600 text-sm font-bold mb-2"
            >
              พลังงาน (%)
            </label>
            <InputNumber
              class="w-full"
              id="CaloriePercentage"
              mode="decimal"
              v-model="form.CaloriePercentage"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label for="Cost" class="block text-600 text-sm font-bold mb-2">
              ต้นทุนต่อวัน
            </label>
            <InputNumber
              class="w-full"
              id="Cost"
              v-model="form.Cost"
              mode="decimal"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="ResponsibilityStaffID"
              class="block text-600 text-sm font-bold mb-2"
              >เจ้าหน้าที่ที่รับผิดชอบ</label
            >
            <Dropdown
              class="w-full"
              v-model="form.StaffID"
              :options="Staff"
              optionLabel="StaffNumber"
              optionValue="StaffID"
              :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: onLazyLoad,
                itemSize: 38,
                showLoader: true,
                loading: loading,
                delay: 250,
              }"
              :filter="true"
              :showClear="true"
            >
              <template v-slot:loader="{ options }">
                <div class="flex align-items-center p-2" style="height: 38px">
                  <Skeleton
                    :width="options.even ? '60%' : '50%'"
                    height="1rem"
                  />
                </div>
              </template>
              <template #option="slotProps">
                <div class="p-dropdown-car-option">
                  <span>{{
                    slotProps.option.StaffNumber +
                    " | " +
                    slotProps.option.StaffGivenName +
                    " " +
                    slotProps.option.StaffSurname
                  }}</span>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
        <div class="grid mt-3">
          <div class="col-6">
            <Button
              label="ยกเลิก"
              class="p-button-secondary w-full"
              @click="close_edit"
            />
          </div>
          <div class="col-6">
            <Button label="บันทึกข้อมูล" class="w-full" @click="update" />
          </div>
        </div>
      </form>
    </Dialog>
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
  </div>
</template>

<script>
// import { reactive, ref } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      breadcrumb: [
        { label: "เจ้าหน้าที่ผสมเทียม", to: "/activity/farm_info" },
        { label: "การจัดเก็บข้อมูลการขุน/อาหาร", to: "/activity/food/tmr" },
      ],
      selectedProducts: null,
      data: [],
      url: [],
      form: [],
      curpage: 0,
      Staff: [],

      formheader: "",
      sortField: "",
      sortOrder: "",
      isLoading: false,
      controller: new AbortController(),
      // Modal
      display_add: false,
      display_edit: false,
      display_delete: false,
    };
  },
  mounted() {
    this.load();
    dayjs.extend(buddhistEra);
  },
  methods: {
    openAdd() {
      this.display_add = true;
    },
    formatArray(value) {
      return value.toLocaleString();
    },
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

    getItems(id) {
      const items = [
        // {
        //   label: "แก้ไข",
        //   icon: "pi pi-pencil",
        //   command: () => {
        //     this.edit(id);
        //   },
        // },
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
    load() {
      this.isLoading = true;

      this.url.main = "/tmr-formula";
      this.url.staff = "/staff";

      axios
        .get(this.url.staff, { signal: this.controller.signal })
        .then((response) => {
          this.Staff = response.data.rows;
          // console.log(this.Staff);
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.main, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data = res.data.rows;
          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
              if (this.data[i].WeightDate != null) {
                this.data[i].WeightDate = dayjs(this.data[i].WeightDate)
                  .locale(locale)
                  .format("DD MMM BB");
              }
            }
          } else {
            let start = (this.curpage - 1) * 15;
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1 + start;
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    close_delete() {
      this.display_delete = false;
    },
    close_edit() {
      this.display_edit = false;
    },
    close_add() {
      this.display_add = false;
    },
    edit(id) {
      id = this.data.find((x) => x.TMRFormulaID == id);
      //   if (id.isActive == 0) {
      //     id.isActive = this.status[1];
      //   } else if (id.isActive == 1) {
      //     id.isActive = this.status[0];
      //   }
      //   console.log(id);
      this.form = {
        TMRFormulaID: id.TMRFormulaID,
        TMRFormulaCode: id.TMRFormulaCode,
        TMRFormulaName: id.TMRFormulaName,
        RoughagesID: [
          [1, 5.2],
          [2, 6.3],
        ],
        ConcentrateID: [
          [1, 5.0],
          [2, 7.1],
        ],
        TotalTMR: id.TotalTMR,
        ResponsibilityStaffID: 1,
        ProteinPercentage: id.ProteinPercentage,
        CaloriePercentage: id.CaloriePercentage,
        Cost: id.Cost,
        isActive: 1,
      };
      //   console.log(id);
      this.display_edit = true;
    },
    submit() {
      axios
        .post(
          this.url.main,
          {
            TMRFormulaCode: this.form.TMRFormulaCode,
            TMRFormulaName: this.form.TMRFormulaName,
            RoughagesID: [
              [1, 5.2],
              [2, 6.3],
            ],
            ConcentrateID: [
              [1, 5.0],
              [2, 7.1],
            ],
            TotalTMR: this.form.TotalTMR,
            ResponsibilityStaffID: this.form.StaffID,
            ProteinPercentage: this.form.ProteinPercentage,
            CaloriePercentage: this.form.CaloriePercentage,
            Cost: this.form.Cost,
            isActive: 1,
          },

          { signal: this.controller.signal }
        )
        .then(() => {
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ข้อมูลถูกบันทึก",
            // detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });
          this.display_add = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    update() {
      axios
        .put(
          this.url.main + "/" + this.form.TMRFormulaID,
          {
            TMRFormulaCode: this.form.TMRFormulaCode,
            TMRFormulaName: this.form.TMRFormulaName,
            RoughagesID: [
              [1, 5.2],
              [2, 6.3],
            ],
            ConcentrateID: [
              [1, 5.0],
              [2, 7.1],
            ],
            TotalTMR: this.form.TotalTMR,
            ResponsibilityStaffID: this.form.StaffID,
            ProteinPercentage: this.form.ProteinPercentage,
            CaloriePercentage: this.form.CaloriePercentage,
            Cost: this.form.Cost,
            isActive: 1,
          },
          { signal: this.controller.signal }
        )
        .then(() => {
          this.load();
          this.display_edit = false;
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ข้อมูลถูกบันทึก",
            // detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });
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
      axios.delete(this.url.main + "/" + this.data.id).then(() => {
        this.display_delete = false;
        this.load();
        this.$toast.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "ลบข้อมูลเสร็จสิ้น",
          life: 5000,
        });
      });
    },
    toggle(event) {
      try {
        this.$refs.menu.toggle(event);
      } catch (error) {
        window.location.reload();
      }
    },
  },
  setup() {
    // const breadcrumb = ref([
    //   { label: "เจ้าหน้าที่ผสมเทียม", to: "/activity/farm_info" },
    //   { label: "การจัดเก็บข้อมูลการขุน/อาหาร", to: "/activity/food/tmr" },
    // ]);
    // const data = reactive([
    //   {
    //     Number: "1",
    //     TMRFormulaCode: "151605349",
    //     TMRFormulaName: "สูตร 60/40",
    //     Roughages: "{[1,12.5], [5,2]}",
    //     Concentrate: "{[1,12.5], [5,2]}",
    //     TotalTMR: "75",
    //     ProteinPercentage: "25",
    //     CaloriePercentage: "20",
    //     Cost: "5",
    //     ResponsibilityStaffID: "เจ้าหน้าที่โรด",
    //   },
    // ]);
    // const items = reactive([
    //   {
    //     label: "แก้ไข",
    //     icon: "pi pi-pencil",
    //   },
    //   {
    //     label: "ลบ",
    //     icon: "pi pi-trash",
    //   },
    // ]);
    // const search = ref("");
    // const modalAdd = ref(false);
    // const modalEdit = ref(false);
    // const tmrFormulaId = ref();
    // const tmrFormula = reactive([{ name: "test" }]);
    // const openModalAdd = () => {
    //   modalAdd.value = true;
    // };
    // const closeModalAdd = () => {
    //   modalAdd.value = false;
    // };
    // const openModalEdit = () => {
    //   modalEdit.value = true;
    // };
    // const closeModalEdit = () => {
    //   modalEdit.value = false;
    // };
    // const edit = () => {
    //   openModalEdit();
    // };
    // const open_delete = () => {};
    // return {
    //   search,
    //   //   data,
    //   //   breadcrumb,
    //   modalAdd,
    //   openModalAdd,
    //   closeModalAdd,
    //   modalEdit,
    //   openModalEdit,
    //   closeModalEdit,
    //   tmrFormulaId,
    //   tmrFormula,
    //   items,
    //   edit,
    //   open_delete,
    // };
  },
};
</script>
