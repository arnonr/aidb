<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="รายงานผลการปฏิบัติงาน" />
      <div class="card">
        <h1 class="text-xl mb-5">เครื่องมือกรองรายงาน</h1>
        <div class="grid">
          <!--  -->
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              ชื่อหน่วยงาน</label
            >
            <InputText
              v-model="sortBy.Organization"
              type="text"
              class="w-full"
              placeholder="ชื่อหน่วยงาน"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="animal_id"
              class="block text-600 text-sm font-bold mb-2"
            >
              พื้นที่เขตปศุสัตว์</label
            >
            <Dropdown
              class="w-full"
              v-model="sortBy.organization_zone"
              :options="dropdown.organization_zone"
              optionLabel="OrganizationZoneName"
              optionValue="OrganizationZoneID"
              :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: onLazyLoad,
                itemSize: dropdown.organization_zone_total,
                showLoader: true,
                loading: loading,
                delay: 250,
              }"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
              @change="load"
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
              จังหวัด</label
            >
            <Dropdown
              class="w-full"
              v-model="sortBy.province"
              :options="dropdown.province"
              optionLabel="ProvinceName"
              optionValue="ProvinceID"
              :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: onLazyLoad,
                itemSize: dropdown.province_total,
                showLoader: true,
                loading: loading,
                delay: 250,
              }"
              :filter="true"
              :showClear="true"
              placeholder="ทั้งหมด"
              @change="filterResidenceAmphur($event)"
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
              อำเภอ</label
            >
            <Dropdown
              class="w-full"
              v-model="sortBy.amphur"
              :options="amphur.data"
              optionLabel="AmphurName"
              optionValue="AmphurID"
              :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: onLazyLoad,
                itemSize: 30,
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
              เจ้าหน้าที่</label
            >
            <Dropdown
              class="w-full"
              v-model="sortBy.staff"
              :options="dropdown.staff"
              optionLabel="StaffFullName"
              optionValue="StaffID"
              :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: onLazyLoad,
                itemSize: 30,
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
              for="dateRange"
              class="block text-600 text-sm font-bold mb-2"
            >
              ช่วงวันที่</label
            >
            <Calendar
              class="w-full"
              id="dateRange"
              v-model="dateRange"
              selectionMode="range"
              :manualInput="false"
              placeholder="ตั้งแต่วันที่ - จนถึงวันที่"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 xl:col-12">
      <div class="card">
        <div class="col-12 text-right">
          <Button
            label="Export To Excel"
            @click="exportCSV($event)"
            class="p-button-success mr-3"
          />
        </div>
        <h5 class="text-center">รายงานผลการปฏิบัติงาน</h5>
        <h6 class="text-center">วันที่ 01/01/2565 - 05/30/2565</h6>
        <DataTable
          :value="data.main"
          :rows="10"
          ref="dt"
          :paginator="true"
          :exportable="true"
          :loading="isLoading"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column
            field="StaffNumber"
            header="รหัสเจ้าหน้าที่"
            class="text-center"
            style="width: 10%"
          >
          </Column>
          <Column
            field="StaffFullName"
            header="ชื่อ"
            class="text-center"
            style="width: 20%"
          >
          </Column>
          <Column
            field="r1"
            header="จำนวนที่ผสม (ตัว)"
            class="text-center"
            style="width: 20%"
          >
          </Column>
          <Column
            field="r2"
            header="จำนวนที่ผสม (ครั้ง)"
            class="text-center"
            style="width: 20%"
          >
          </Column>
          <Column
            field="r3"
            header="ผ.ท.1 (ตัว)"
            class="text-center"
            style="width: 10%"
          >
          </Column>
          <Column
            field="r4"
            header="ตรวจท้อง(ตัว)"
            class="text-center"
            style="width: 20%"
          >
          </Column>
          <Column
            field="r5"
            header="ท้อง(ตัว)"
            class="text-center"
            style="width: 20%"
          >
          </Column>
          <Column
            field="percent"
            header="อัตราการผสมติด"
            class="text-center"
            style="width: 20%"
          >
          </Column>
          <Column
            field="childM"
            header="จำนวนลูกเกิด (ผู้)"
            class="text-center"
            style="width: 20%"
          >
          </Column>
          <Column
            field="childF"
            header="จำนวนลูกเกิด (เมีย)"
            class="text-center"
            style="width: 20%"
          >
          </Column>
          <Column
            field="childT"
            header="จำนวนลูกเกิด (รวม)"
            class="text-center"
            style="width: 20%"
          >
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
import { mapGetters } from "vuex";

export default {
  themeChangeListener: null,
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  data() {
    return {
      data: [],
      url: {
        organization_zone: "/organization-zone",
        province: "/province",
        amphur: "/amphur",
        staff: "/staff",
        report3: "/report/report3?AIZoneID=",
      },
      dropdown: [],
      sortBy: [],
      amphur: [],

      isLoading: false,
      total: null,
      curpage: 0,
      selection: false,
      loading: false,

      controller: new AbortController(),
    };
  },
  loadLazyTimeout: null,

  mounted() {
    this.load();
  },

  methods: {
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    filterResidenceAmphur($event) {
      let val = $event.value;
      if (val) {
        this.amphur.data = this.amphur.temp;
        this.amphur.data = this.amphur.data.filter(
          (item) => item.ProvinceID == val
        );
      } else {
        this.amphur.data = this.amphur.temp;
      }
    },
    load() {
      let ai = this.user.Staff.Organization.OrganizationAiZoneID || 1;
      axios
        .get(this.url.report3 + ai, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.main = res.data;
        })
        .finally(() => {
          this.isLoading = false;
        });
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
  },

  unmounted() {
    this.controller.abort();
  },
  
};
</script>
