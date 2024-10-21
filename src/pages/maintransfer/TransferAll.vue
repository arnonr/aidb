<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="ย้ายฝากตัวอ่อน" :pages="breadcrumb" />

      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหาโปรแกรม</h1>
        <span class="p-input-icon-right w-full px-5">
          <i class="pi pi-search px-5" />
          <InputText
            class="w-full"
            type="text"
            v-model="search['global'].value"
            placeholder="ค้นหา"
          />
        </span>
      </div>

      <div class="mt-5 card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">รายการย้ายฝากตัวอ่อน</h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <router-link to="/embryo/transfer/add">
              <Button
                label="ย้ายฝากตัวอ่อน"
                icon="pi pi-plus"
                class="mb-3 p-button-raised p-button-raised p-button-info"
              />
            </router-link>
          </div>
        </div>
        <DataTable
          class="text-sm"
          :value="data"
          :loading="isLoading"
          v-model:filters="search"
          :paginator="true"
          :rows="10"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column
            field="show_id"
            header="ลำดับ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="FullnameAnimal"
            header="อ้างอิงสัตว์"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ThaiTransferDate"
            header="วันที่ย้ายฝาก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="EmbryoNumber"
            header="หมายเลขตัวอ่อน"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="BCS.BCSName"
            header="คะแนนร่างกาย"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="TransferMethod.TransferMethodName"
            header="วิธีการย้ายฝาก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="CLType"
            header="ประเภท CL"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="CLSize"
            header="ขนาด CL"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="CavitySize"
            header="ขนาด Cavity"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="UterusSide"
            header="ตำแหน่ง"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="LeftOvaryAmount"
            header="จำนวนรังไข่ข้างซ้าย"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="RightOvaryAmount"
            header="จำนวนรังไข่ข้างขวา"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="LeftOvaryGrade"
            header="เกรดรังไข่ข้างซ้าย"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="RightOvaryGrade"
            header="เกรดรังไข่ข้างขวา"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ResponsibilityStaffName"
            header="เจ้าหน้าที่ที่ดำเนินการ"
            class="text-center"
          ></Column>
          <!-- <Column field="isActive" header="สถานะ" class="text-center">
              <template #body="slotProps">
                <div
                  v-if="
                    slotProps.data.isActive == 1 ||
                    slotProps.data.isActive == status[0]
                  "
                >
                  <Tag class="w-full" severity="success">เปิดใช้งาน</Tag>
                </div>
                <div v-else>
                  <Tag class="w-full bg-gray-500">ปิดใช้งาน</Tag>
                </div>
              </template>
            </Column> -->
          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <SplitButton
                label="แก้ไข"
                icon="pi pi-pencil"
                @click="open_edit(slotProps.data.TransferEmbryoID)"
                class="p-button-sm p-button-outlined p-button-warning"
                :model="getItems(slotProps.data.TransferEmbryoID)"
              >
              </SplitButton>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <!-- end main page -->

    <!-- Start Details Dialog -->
    <Dialog
      header="รายละเอียดโปรแกรม"
      v-model:visible="displayDetailsModal"
      :style="{ width: '40vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสโปรแกรม
              </label>
              {{ this.codeProgram }}
              <!-- โปรแกรมเหนี่ยวนำการเป็นสัด Donor 01 -->
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อโปรแกรม
              </label>
              {{ this.nameProgram }}
            </div>
            <div class="field col-12 sm:col-3">
              <label class="block text-600 text-sm font-bold mb-2">
                โปรแกรมสำหรับ
              </label>
              {{ this.forProgram }}
            </div>

            <div class="field col-12 sm:col-10">
              <Timeline :value="presetDetail">
                <template #content="slotProps">
                  วันที่ {{ slotProps.item.Day }} เวลา {{ slotProps.item.Time }}
                  <br />
                  กิจกรรม {{ slotProps.item.PresetActivity.PresetActivityName }}
                  <br />
                  รายละเอียด {{ slotProps.item.Description }}
                </template>
              </Timeline>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
    <!-- End Detail -->

    <!-- Start Delete Dialog -->
    <Dialog
      header="ตรวจสอบข้อมูล"
      v-model:visible="displaydelete"
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
            @click="closeConfirmation"
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
    <!-- End Delete Dialog -->
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
import { FilterMatchMode } from "primevue/api";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
    }),
  },
  setup() {
    const breadcrumb = ref([{ label: "บันทึกเก็บตัวอ่อน", to: "" }]);

    const displayAddModal = ref(false);
    const openAddModal = () => {
      displayAddModal.value = true;
    };
    const closeAddModal = () => {
      displayAddModal.value = false;
    };

    const displayEditModal = ref(false);
    const openEditModal = () => {
      displayEditModal.value = true;
    };
    const closeEditModal = () => {
      displayEditModal.value = false;
    };
    const displayDetailsModal = ref(false);
    const openyDetailsModal = () => {
      displayDetailsModal.value = true;
    };

    const displaydelete = ref(false);
    const opendisplaydelete = () => {
      displaydelete.value = true;
    };
    const closeConfirmation = () => {
      displaydelete.value = false;
    };

    return {
      breadcrumb,
      displayAddModal,
      openAddModal,
      closeAddModal,
      displayEditModal,
      openEditModal,
      closeEditModal,
      displaydelete,
      opendisplaydelete,
      closeConfirmation,
      displayDetailsModal,
      openyDetailsModal,
    };
  },
  data() {
    return {
      url: "/transfer-embryo",
      urlDetail: "/preset-detail",
      apiPersonal: "/staff?isActive=1",
      apiOrganizationID: "/organization?isActive=1",
      apiActivity: "/preset-activity?isActive=1",
      apiAnimalTypeID: "/animal-type?isActive=1",
      data: [],
      isLoading: false,
      valid: false,
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      form: {
        isActive: "",
      },
      formDay: [],

      personal: [],
      organization: [],
      activity: [],
      animaltype: [],
      params: { orderByField: "TransferEmbryoID", orderBy: "desc" },
      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],
      setting: [
        {
          id: 1,
        },
      ],

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
    this.load();
    this.form.isActive = this.status[0];

    if (this.animal_id == 1) {
    //   this.form.AnimalTypeID = 1;
    } else if (this.animal_id == 2) {
    //   this.form.AnimalTypeID = 3;
    } else if (this.animal_id == 3) {
    //   this.form.AnimalTypeID = 17;
    }

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

        axios
          .get(this.apiAnimalTypeID, { signal: this.controller.signal })
          .then((response) => {
            this.animaltype = response.data.rows.filter(
              (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
            );

            if (this.animal_id == 1) {
              this.animaltype = response.data.rows.filter(
                (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
              );
            } else if (this.animal_id == 2) {
              this.animaltype = response.data.rows.filter(
                (item) => item.AnimalTypeID === 3 || item.AnimalTypeID === 4
              );
            } else if (this.animal_id == 3) {
              this.animaltype = response.data.rows.filter(
                (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
              );
            }
          });
      });
  },
  methods: {
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

    // Axios
    load() {
      this.isLoading = true;

      if (this.animal_id == 1) {
        this.url += "?AnimalTypeID=[1,2]";
      } else if (this.animal_id == 2) {
        this.url += "?AnimalTypeID=[3,4]";
      } else if (this.animal_id == 3) {
        this.url += "?AnimalTypeID=[17,18]";
      }

      axios
        .get(this.url, {
          params: this.params,
          signal: this.controller.signal,
        })
        .then((response) => {
          dayjs.extend(buddhistEra);
          this.data = response.data.rows;
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].show_id = i + 1;

            if (this.data[i].TransferDate != null) {
              this.data[i].TransferDate = dayjs(this.data[i].TransferDate)
                .locale(locale)
                .format("DD MMM BB");
            }

            this.data[i].FullnameAnimal =
              this.data[i].Animal.AnimalIdentificationID +
              ", " +
              this.data[i].Animal.AnimalName +
              " ";
            this.data[i].Fullname =
              this.data[i].Staff.StaffNumber +
              ", " +
              this.data[i].Staff.StaffGivenName +
              " " +
              this.data[i].Staff.StaffSurname;
          }
          // console.log(this.data);
        })
        .finally(() => {
          this.isLoading = false;
        });
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

    open_edit(id) {
      this.$router.push("/embryo/transfer/edit/" + id);
    },

    open_delete(id) {
      this.form.id = id;
      // this.form.show_id = show_id;
      this.displaydelete = true;
    },
    close_delete() {
      this.displaydelete = false;
    },
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
