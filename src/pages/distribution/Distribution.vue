<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="คัดจำหน่ายแบบหลายตัว" :pages="breadcrumb" />
      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหาหมายเลขฟาร์ม</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />

          <Dropdown
            class="w-full"
            v-model="form.FarmID"
            :options="Farm.data"
            optionLabel="FarmIdentificationNumber"
            optionValue="FarmID"
            :virtualScrollerOptions="{
              lazy: true,
              onLazyLoad: onLazyLoad,
              itemSize: Farm.total,
              showLoader: true,
              loading: loading,
              delay: 250,
            }"
            :filter="true"
            :showClear="true"
            placeholder="เลือกหมายเลขฟาร์ม"
            @change="load"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>

            <template #option="slotProps">
              <div class="p-dropdown-car-option">
                <span
                  >{{ slotProps.option.FarmIdentificationNumber }} |
                  {{ slotProps.option.FarmName }}
                </span>
              </div>
            </template>
          </Dropdown>
        </span>
      </div>
    </div>
    <div class="col-12">
      <div v-if="this.form.FarmID" class="card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">
              รายการคัดจำหน่ายแบบหลายตัว
            </h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button
              label="เพิ่มข้อมูลคัดจำหน่ายแบบหลายตัว"
              icon="pi pi-plus"
              class="w-full md:w-auto"
              @click="add"
            />
          </div>
        </div>

        <div class="mt-5">
          <DataTable
            class="text-sm"
            :value="data"
            :loading="isLoading"
            @sort="sort($event)"
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
                  @click="edit(slotProps.data.DistributionID)"
                  label="แก้ไข"
                  icon="pi pi-pencil"
                  class="p-button-sm p-button-outlined p-button-warning"
                  :model="getItems(slotProps.data.DistributionID)"
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
                @click="close_delete"
                class="p-button-secondary w-full mr-3"
              />
              <Button
                label="ยืนยัน"
                @click="remove"
                class="p-button-danger w-full ml-3"
              />
            </div>
          </template>
        </Dialog>
        <!-- End Delete Dialog -->
      </div>
    </div>
 
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import router from "../../router";
import { FilterMatchMode } from "primevue/api";
import store from "@/service/Vuex";
import PageTitle from "@/components/PageTitle.vue";
export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      url: "/distribution",
      id: "DistributionID",
      name: "คัดจำหน่ายแบบหลายตัว",
      columns: [
        {
          field: "show_id",
          header: "ลำดับ",
        },

        {
          field: "DistributionDate",
          header: "วันที่คัดจำหน่ายแบบหลายตัว",
        },
        {
          field: "DistributionTypeName",
          header: "ประเภทการคัดจำหน่าย",
        },
        {
          field: "DistributionReasonName",
          header: "ปัญหาในการคัดจำหน่าย",
        },
        {
          field: "DestinationFarmName",
          header: "ฟาร์มปลายทางที่คัดจำหน่าย",
        },
        {
          field: "DestinationOrganizationName",
          header: "หน่วยงานปลายทางที่คัดจำหน่าย",
        },
       {
          field: "DestinationPlace",
          header: "สถานที่ปลายทางที่คัดจำหน่าย",
        },
        {
          field: "Animal.length",
          header: "จำนวนสัตว์ที่คัดจำหน่ายแบบหลายตัว",
        },
        {
          field: "ResponsibilityStaffName",
          header: "เจ้าหน้าที่ผู้รับผิดชอบ",
        },
      ],
      isLoading: false,
      curpage: 0,
      display_view: false,
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      display_delete: false,
      view: [],
      breadcrumb: [{ label: "", to: "" }],
      animal_status: [],
      Farm: [],
      form: [],
      controller: new AbortController(),
    };
  },
    computed: {
    set_farm_distribution() {
      return store.state.SetFarmDistribution;
    },
  },
  async mounted() {
    this.load();
    await dayjs.extend(buddhistEra);
    this.breadcrumb[0].label = this.name;
    await axios
      .get("/farm", { signal: this.controller.signal })
      .then((res) => {
        this.Farm.data = res.data.rows;
        this.Farm.total = res.data.total;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
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
    page($event) {
      this.curpage = $event.page + 1;
      this.load();
    },
    load() {
      this.isLoading = true;
      let url = this.url + "?size=15";
      url += "&page=";
      if (this.curpage) {
        url += this.curpage;
      }
      if (this.form.FarmID) {
        url += "&FarmID=" + this.form.FarmID;
      }

      axios
        .get(url, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.total = response.data.total;
          this.data = response.data.rows;
          this.data.sort(
            (first, last) =>
              new Date(last.DistributionDate) -
              new Date(first.DistributionDate)
          );
          this.data.show = response.data.rows;
          // console.log(this.data);
          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
              if (this.data[i].DistributionDate != null) {
                this.data[i].DistributionDate = dayjs(
                  this.data[i].DistributionDate
                )
                  .locale(locale)
                  .format("DD MMM BB");
              }
              if (this.data[i].VaccineNextDate != null) {
                this.data[i].VaccineNextDate = dayjs(
                  this.data[i].VaccineNextDate
                )
                  .locale(locale)
                  .format("DD MMM BB");
              }
            }
          } else {
            let start = (this.curpage - 1) * 15;
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1 + start;
                        if (this.data[i].DistributionDate != null) {
                this.data[i].DistributionDate = dayjs(
                  this.data[i].DistributionDate
                )
                  .locale(locale)
                  .format("DD MMM BB");
              }
              if (this.data[i].VaccineNextDate != null) {
                this.data[i].VaccineNextDate = dayjs(
                  this.data[i].VaccineNextDate
                )
                  .locale(locale)
                  .format("DD MMM BB");
              }
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
        
      store.dispatch("FarmDistribution", {
        id: this.form.FarmID,
      });
    },
    async edit(id) {
      let getID = this.data.find((item) => item.DistributionID == id);
      await router.push({
        path: `/activity/distribution/edit/${getID.DistributionID}`,
      });
          store.dispatch("FarmDistribution", {
        id: this.form.FarmID,
      });
    },
    getItems(id) {
      const items = [
        {
          label: "รายละเอียด",
          icon: "pi pi-eye",
          command: () => {
            // this.open_view(id);
            this.$router.push("/activity/distribution/view/" + id);
          },
        },
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

    open_delete(id) {
      this.data.id = id;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },

    remove() {
      axios.delete("distribution/" + this.data.id).then(() => {
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
    add() {
      const id = this.form.FarmID;
      let item = this.Farm.data.find((id) => id.FarmID == this.form.FarmID);
      const farm = item.FarmIdentificationNumber;
      router.push({ name: "distributionadd", params: { id, farm } });
    },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>
