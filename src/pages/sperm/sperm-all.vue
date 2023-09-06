<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="สืบค้นทะเบียนน้ำเชื้อ" :pages="breadcrumb" />
      <div class="card mb-5">
        <h1 class="text-xl mb-4 text-500">
          เครื่องมือช่วยค้นหาทะเบียนน้ำเชื้อ
        </h1>
        <div class="grid">
          <div class="col-12 sm:col-6 lg:col-4">
            <!-- <label
              for="codeNumber"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลขน้ำเชื้อ/ชุดน้ำเชื้อ/พันธุ์น้ำเชื้อ</label
            > -->
            <label
              for="codeNumber"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลขน้ำเชื้อ</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <Dropdown
                class="w-full"
                v-model="search.SemenNumber"
                :options="data.data"
                optionLabel="SemenNumber"
                optionValue="SemenCode"
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
                placeholder="ทั้งหมด"
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
                      slotProps.option.SemenNumber +
                      " | " +
                      slotProps.option.SemenCode
                    }}</span>
                  </div>
                </template>
              </Dropdown>
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              ชุดน้ำเชื้อ</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <Dropdown
                class="w-full"
                v-model="search.SemenCode"
                :options="data.data"
                optionLabel="SemenNumber"
                optionValue="SemenCode"
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
                placeholder="ทั้งหมด"
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
                      slotProps.option.SemenNumber +
                      " | " +
                      slotProps.option.SemenCode
                    }}</span>
                  </div>
                </template>
              </Dropdown>
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              แหล่งที่มาของน้ำเชื้อ</label
            >
            <Dropdown
              v-model="search.source_type"
              :options="data.SourceType"
              optionLabel="SourceTypeName"
              optionValue="SourceTypeID"
              class="w-full"
              placeholder="ทั้งหมด"
              :filter="true"
              :showClear="true"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="animal_id"
              class="block text-600 text-sm font-bold mb-2"
            >
              ประเทศ</label
            >

            <Dropdown
              class="w-full"
              v-model="search.CountryID"
              :options="data.Country"
              optionLabel="CountryName"
              optionValue="CountryID"
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
              placeholder="ทั้งหมด"
            >
              <template v-slot:loader="{ options }">
                <div class="flex align-items-center p-2" style="height: 38px">
                  <Skeleton
                    :width="options.even ? '60%' : '50%'"
                    height="1rem"
                  />
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              หน่วยงานที่ผลิต</label
            >
            <Dropdown
              class="w-full"
              v-model="search.OrganizationID"
              :options="data.Organization"
              optionLabel="OrganizationName"
              optionValue="OrganizationID"
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
              placeholder="ทั้งหมด"
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
                    slotProps.option.OrganizationCode +
                    " | " +
                    slotProps.option.OrganizationName
                  }}</span>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              ชนิดน้ำเชื้อ</label
            >
            <Dropdown
              v-model="search.semenType"
              :options="semen"
              optionLabel="label"
              optionValue="value"
              class="w-full"
              placeholder="ทั้งหมด"
              :showClear="true"
            />
          </div>

          <!-- <div class="col-12 sm:col-6 lg:col-6">
            <label
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              แสดงตั้งแต่วันที่ - จนถึงวันที่</label
            >
            <Calendar
              class="w-full"
              id="dateRange"
              v-model="dateRange"
              selectionMode="range"
              :manualInput="false"
              placeholder="ตั้งแต่วันที่ - จนถึงวันที่"
            />
          </div> -->
        </div>
      </div>

      <div class="card">
        <h1 class="text-2xl mb-0 text-600">สืบค้นทะเบียนน้ำเชื้อ</h1>
        <div class="mt-5">
          <DataTable
            class="text-sm"
            :value="data.data"
            :paginator="true"
            :rowHover="true"
            :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >

          <!-- class="text-sm"
          :value="data"
          :exportable="true"
          ref="dt"
          :rowHover="true"
          :loading="isLoading"
          :paginator="true"
          v-model:rows="params.size"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          :totalRecords="table.total"
          @page="load"
          @sort="sort($event)"
          lazy -->

            <Column field="show_id" header="ลำดับ" class="text-center"></Column>
            <Column
              field="SemenNumber"
              header="เลขน้ำเชื้อ"
              class="text-center"
            ></Column>
            <Column
              field="SemenCode"
              header="ชุดน้ำเชื้อ"
              class="text-center"
            ></Column>

            <Column
              field="Animal.AnimalIdentificationID"
              header="รหัสอ้างอิงพ่อพันธุ์"
              class="text-center"
            ></Column>
            <Column
              field="AnimalType.AnimalTypeName"
              header="ประเภทสัตว์"
              class="text-center"
            ></Column>
            <Column
              field="SourceType.SourceTypeName"
              header="ประเภทแหล่งที่มา"
              class="text-center"
            ></Column>
            <Column
              field="Country.CountryName"
              header="ประเทศ"
              class="text-center"
            ></Column>
            <Column
              field="SourceName"
              header="แหล่งที่มา"
              class="text-center"
            ></Column>
            <Column
              field="SemenType"
              header="ชนิดน้ำเชื้อ"
              class="text-center"
            ></Column>
            <Column
              field="ProduceDate"
              header="วันที่ผลิต"
              class="text-center"
            ></Column>
            <Column
              field="StaffFullName"
              header="ผู้รับผิดชอบ"
              class="text-center"
            >
              <!-- <template #body="slotProp">
                <span>
                  {{
                    slotProp.data.Staff.StaffGivenName +
                    " " +
                    slotProp.data.Staff.StaffSurname
                  }}
                </span>
              </template> -->
            </Column>
            <Column header="จัดการ" class="text-center">
              <template #body="slotProp">
                <Button
                  icon="pi pi-eye"
                  @click="openShowModal(slotProp.data.SemenID)"
                  class="p-button-rounded p-button-text"
                />
              </template>
            </Column>
            <template #empty> ไม่พบข้อมูล </template>
            <template #loading>
              <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
            </template>
          </DataTable>
        </div>
      </div>
    </div>

    <!-- end main page -->
    <!-- Show Dialog -->
    <Dialog
      header="รายละเอียดทะเบียนน้ำเชื้อ"
      v-model:visible="displayShowModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <h1 class="text-2xl mt-2">ข้อมูลทั่วไปของน้ำเชื้อ</h1>
      <form class="grid">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขน้ำเชื้อ*
              </label>
              <InputText
                v-model="data.detail.SemenNumber"
                type="text"
                class="w-full"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชุดน้ำเชื้อ*
              </label>
              <InputText
                v-model="data.detail.SemenCode"
                type="text"
                class="w-full"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขพ่อพันธุ์</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="data.detail.FatherAnimalNumber"
                readonly
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อ
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="data.detail.FatherAnimalName"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                พันธุ์น้ำเชื้อ*
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="data.detail.FatherAnimalBreed"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สถานะพ่อพันธุ์
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="data.detail.FatherAnimalStatus"
                readonly
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                แหล่งที่มาของน้ำเชื้อ
              </label>
              <InputText
                v-model="data.detail.SourceName"
                type="text"
                class="w-full"
                readonly
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ประเทศ
              </label>
              <!-- <InputText
                type="text"
                class="w-full"
                v-model="data.detail.Country.CountryName"
                readonly
              /> -->

              <InputText
                v-if="data.detail.Country"
                v-model="data.detail.Country.CountryName"
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              />
              <InputText
                v-else
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หน่วยงานที่ผลิต
              </label>
              <InputText
                v-if="data.detail.Organization"
                v-model="data.detail.Organization.OrganizationCode"
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              />
              <InputText
                v-else
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อหน่วยงาน
              </label>
              <!-- <InputText
                v-model="data.detail.Organization.OrganizationName"
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              /> -->
              <InputText
                v-if="data.detail.Organization"
                v-model="data.detail.Organization.OrganizationName"
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              />
              <InputText
                v-else
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
          </div>
        </div>
      </form>

      <h1 class="text-2xl mt-2">รายละเอียดน้ำเชื้อ</h1>
      <form class="grid">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผลิตน้ำเชื้อ
              </label>
              <InputText
                v-model="data.detail.ProduceDate"
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ขนาดหลอด</label
              >
              <InputText
                v-model="data.detail.Capacity"
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <!-- <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปริมาตร</label
              >
              <InputText type="text" class="w-full" placeholder="" readonly />
            </div> -->
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชนิดน้ำเชื้อ</label
              >
              <InputText
                v-model="data.detail.SemenType"
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวนหลอดผลิต
              </label>
              <InputText
                v-model="data.detail.ProduceQuantity"
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <!-- <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปริมาณรีด
              </label>
              <InputText type="text" class="w-full" placeholder="-" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวนหลอดที่ใช้ได้
              </label>
              <InputText type="text" class="w-full" placeholder="-" readonly />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความเข้มข้น
              </label>
              <InputText type="text" class="w-full" placeholder="" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ราคาต่อหน่วย
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder="100"
                readonly
              />
            </div> -->
            <!-- <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                การเคลื่อนที่ก่อนแช่แข็ง
              </label>
              <InputText type="text" class="w-full" placeholder="" readonly />
            </div> -->
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                การเคลื่อนที่หลังแช่แข็ง
              </label>
              <InputText
                v-model="data.detail.AfterThawingPercent"
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสเจ้าหน้าที่รับผิดชอบ
              </label>
              <InputText
                v-model="data.detail.StaffNumber"
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อเจ้าหน้าที่
              </label>
              <InputText
                v-model="data.detail.StaffFullName"
                type="text"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
          </div>
        </div>
      </form>
    </Dialog>
    <!-- End Show Dialog -->

    <!-- Start Delete Dialog -->
    <Dialog
      header="ไม่พบข้อมูล"
      v-model:visible="display_notfound"
      :style="{ width: '350px' }"
      :modal="true"
    >
      <div class="confirmation-content text-center">
        <i class="pi pi-times" style="font-size: 5rem" />
        <br />
        <span class="text-xl">ไม่พบข้อมูลไอดีของสัตว์ในหมายเลขน้ำเชื้อ</span>
      </div>
      <template #footer>
        <div class="col-12 text-center flex justify-content-between">
          <Button
            label="ยกเลิก"
            @click="close_delete()"
            class="p-button-secondary w-full mr-3"
          />
        </div>
      </template>
    </Dialog>
    <!-- End Delete Dialog -->
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import PageTitle from "@/components/PageTitle.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
    }),
  },
  data() {
    return {
      breadcrumb: [
        { label: "หน้าหลัก", to: "/agency/all" },
        { label: "สืบค้นทะเบียนน้ำเชื้อ", to: "" },
      ],
      url: [],
      data: [],
      semen: [
        { label: "สด", value: "FRESH" },
        { label: "แช่แข็ง", value: "FREEZE" },
      ],
      search: [],
      filtered: [],
      isLoading: false,
      loading: false,
      sortField: "",
      sortOrder: "",
      curpage: 0,
      displayShowModal: false,
      display_notfound: false,

      //  cancel requests

      controller: new AbortController(),
    };
  },
  watch: {
    "search.SemenNumber"(val) {
      this.filtered.SemenNumber = val;
      this.load();
    },
    "search.SemenCode"(val) {
      this.filtered.SemenCode = val;
      this.load();
    },
    "search.source_type"(val) {
      this.filtered.SourceTypeID = val;
      this.load();
    },
    "search.CountryID"(val) {
      this.filtered.CountryID = val;
      this.load();
    },
    "search.OrganizationID"(val) {
      this.filtered.OrganizationID = val;
      this.load();
    },
    "search.semenType"(val) {
      this.filtered.semenType = val;
      this.load();
    },
  },
  mounted() {
    this.load();
    dayjs.extend(buddhistEra);
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
    load() {
      this.url.main = "/semen";
      this.url.source_type = "/source-type";
      this.url.country = "/country?includeAll=false";
      this.url.organization = "/organization?includeAll=false";
      let url = this.url.main;

      if (this.animal_id == 1) {
        url += "?AnimalTypeID=[1,2,41,42]";
      } else if (this.animal_id == 2) {
        url += "?AnimalTypeID=[3,4,43,44]";
      } else if (this.animal_id == 3) {
        url += "?AnimalTypeID=[17,18,45,46]";
      }

      if (this.filtered.SemenNumber) {
        url += "&SemenNumber=" + this.filtered.SemenNumber;
        // let code = this.data.data.find(
        //   (item) => item.SemenNumber == this.filtered.SemenNumber
        // );
        // this.search.SemenCode = code.SemenCode;
      }
      if (this.filtered.SemenCode) {
        url += "&SemenCode=" + this.filtered.SemenCode;
      }
      if (this.filtered.SourceTypeID) {
        url += "&SourceTypeID=" + this.filtered.SourceTypeID;
      }
      if (this.filtered.CountryID) {
        url += "&CountryID=" + this.filtered.CountryID;
      }
      if (this.filtered.OrganizationID) {
        url += "&SourceOrganizationID=" + this.filtered.OrganizationID;
      }
      if (this.filtered.semenType) {
        url += "&SemenType=" + this.filtered.semenType;
      }

      axios
        .get(this.url.organization, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.Organization = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.source_type, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.SourceType = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.country, {
          signal: this.controller.signal,
        })
        .then((res) => {
          // let data = this.data.SourceType;

          this.data.Country = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });

      // if (this.filtered.semenType) {
      //   url += "&SemenType=" + this.filtered.semenType;
      // }

      axios
        .get(url, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.total = res.data.total;
          this.data.data = res.data.rows;

          // if (this.animal_id == 1) {
          //   this.data.data = res.data.rows.filter(
          //     (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
          //   );
          // } else if (this.animal_id == 2) {
          //   this.data.data = res.data.rows.filter(
          //     (item) =>
          //       item.AnimalTypeID === 3 ||
          //       item.AnimalTypeID === 4 ||
          //       item.AnimalTypeID === 42
          //   );
          // } else if (this.animal_id == 3) {
          //   this.data.data = res.data.rows.filter(
          //     (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
          //   );
          // }

          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.data.data.length; i++) {
              this.data.data[i].show_id = i + 1;
              if (this.data.data[i].ProduceDate != null) {
                this.data.data[i].ProduceDate = dayjs(
                  this.data.data[i].ProduceDate
                )
                  .locale(locale)
                  .format("DD/MM/YY");
              }
            }
          } else {
            let start = (this.curpage - 1) * 15;
            for (let i = 0; i < this.data.data.length; i++) {
              this.data.data[i].show_id = i + 1 + start;
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openShowModal(id) {
      this.data.detail = this.data.data.find((item) => item.SemenID == id);

      console.log(this.data.detail);

      if (this.data.detail.Staff) {
        this.data.detail.StaffFullName =
          this.data.detail.Staff.StaffGivenName +
          " " +
          this.data.detail.Staff.StaffSurname;
      } else {
        this.data.detail.StaffFullName = "";
      }

      let fatherStatus = "";

      if (this.data.detail.Animal) {
        axios
          .get("/animal/" + this.data.detail.Animal.AnimalID, {
            signal: this.controller.signal,
          })
          .then((res) => {
            fatherStatus = res.data.AnimalStatus.AnimalStatusName;
            this.data.detail.FatherAnimalStatus = fatherStatus;
            // console.log(fatherStatus);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }

      this.displayShowModal = true;
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
    close_delete() {
      this.display_delete = false;
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
