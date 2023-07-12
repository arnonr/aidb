<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="ข้อมูลฟาร์ม" :pages="breadcrumb" />

      <div class="card">
        <h1 class="text-xl font-normal text-600 mb-4">ข้อมูลฟาร์ม</h1>
        <div class="grid mb-3 text-bluegray-500">
          <div class="col-12 sm:col-6 md:col-4 xl:col-3">
            <span class="inline pr-2">หมายเลขทะเบียนฟาร์ม :</span
            >{{ show.FarmIdentificationNumber ?? "-" }}
          </div>
          <div class="col-12 sm:col-6 md:col-4 xl:col-3">
            <span class="inline pr-2">ชื่อฟาร์ม :</span
            >{{ show.FarmName ?? "-" }}
          </div>
          <div class="col-12 sm:col-6 md:col-4 xl:col-3">
            <span class="inline pr-2">วันที่ขึ้นทะเบียนฟาร์ม :</span
            >{{ show.FarmRegisterDate ?? "" }}
          </div>
          <div class="col-12 sm:col-6 md:col-4 xl:col-3">
            <span class="inline pr-2">ชื่อเจ้าของฟาร์ม :</span
            >{{ show.FarmOwner ?? "-" }}
          </div>
          <div class="col-12 sm:col-6 md:col-4 xl:col-3">
            <span class="inline pr-2">สถานะฟาร์ม :</span
            >{{ show.FarmStatusID ?? "-" }}
            <!-- <span class="text-green-500">เปิดใช้งาน</span> -->
          </div>
        </div>
        <div class="grid text-bluegray-500">
          <div class="col-12">
            <span class="inline-block pr-2 mb-2 sm:mb-0">ที่ตั้ง :</span>
            {{ show.FarmAddress ?? "-" }}
            <span class="inline-block pr-2 sm:pl-5">โครงการ :</span>
            {{ show.ProjectID ?? "-" }}
          </div>
        </div>
        <h1 class="text-xl font-normal text-600 mb-4">ข้อมูลเกษตรกร</h1>
        <div class="grid text-bluegray-500">
          <div class="col-12 sm:col-6 md:col-4 xl:col-3">
            <span class="inline pr-2">หมายเลขประจำตัวประชาชน :</span
            >{{ show.IdentificationNumber ?? "-" }}
          </div>
          <!-- <div class="col-12 sm:col-6 md:col-4 xl:col-3">
            <span class="inline pr-2">เลขทะเบียนเกษตรกร :</span>100000000
          </div> -->
          <div class="col-12 sm:col-6 md:col-4 xl:col-3">
            <span class="inline pr-2">ชื่อ - นามสกุล :</span
            >{{ show.FarmOwner ?? "-" }}
          </div>
          <div class="col-12 sm:col-6 md:col-4 xl:col-3">
            <span class="inline pr-2">หมายเลขโทรศัพท์ :</span
            >{{ show.MobilePhoneNumber ?? "-" }}
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="col-12">
      <div class="grid">
        <div class="col-12 sm:col-6 xl:col-3">
          <Card
            class="h-12rem max-h-14rem flex align-items-center border-round-2xl"
          >
            <template #content>
              <h4 class="font-normal text-2xl text-gray-700">
                จำนวนสัตว์ทั้งหมดในฟาร์ม
              </h4>
              <span
                class="text-5xl sm:text-4xl md:text-6xl font-bold text-gray-800"
                >30 ตัว</span
              >
            </template>
          </Card>
        </div>
        <div class="col-12 sm:col-6 xl:col-3">
          <Card
            class="
              card-cow
              h-12rem
              max-h-14rem
              flex
              align-items-center
              border-round-2xl
            "
          >
            <template #content>
              <div class="flex justify-content-start align-items-center">
                <div class="mr-4 md:mr-5">
                  <img
                    class="max-w-4rem md:max-w-6rem"
                    src="../../assets/images/logo/cow.png"
                    alt="Cow Logo"
                  />
                </div>
                <div>
                  <h4 class="font-bold text-2xl text-white mb-0">โคเนื้อ</h4>
                  <span
                    class="
                      text-5xl
                      sm:text-4xl
                      md:text-6xl
                      font-bold
                      text-white
                    "
                    >10 ตัว</span
                  >
                </div>
              </div>
            </template>
          </Card>
        </div>
        <div class="col-12 sm:col-6 xl:col-3">
          <Card
            class="
              card-buffalo
              h-12rem
              max-h-14rem
              flex
              align-items-center
              border-round-2xl
            "
          >
            <template #content>
              <div class="flex justify-content-start align-items-center">
                <div class="mr-4 md:mr-5">
                  <img
                    class="max-w-4rem md:max-w-6rem"
                    src="../../assets/images/logo/buffalo.png"
                    alt="Buffalo Logo"
                  />
                </div>
                <div>
                  <h4 class="font-bold text-2xl text-700 mb-0">กระบือ</h4>
                  <span
                    class="text-5xl sm:text-4xl md:text-6xl font-bold text-700"
                    >10 ตัว</span
                  >
                </div>
              </div>
            </template>
          </Card>
        </div>
        <div class="col-12 sm:col-6 xl:col-3">
          <Card
            class="
              card-goat
              h-12rem
              max-h-14rem
              flex
              align-items-center
              border-round-2xl
            "
          >
            <template #content>
              <div class="flex justify-content-start align-items-center">
                <div class="mr-4 md:mr-5">
                  <img
                    class="max-w-4rem md:max-w-6rem"
                    src="../../assets/images/logo/goat.png"
                    alt="Goat Logo"
                  />
                </div>
                <div>
                  <h4 class="font-bold text-2xl text-white mb-0">แพะ</h4>
                  <span
                    class="
                      text-5xl
                      sm:text-4xl
                      md:text-6xl
                      font-bold
                      text-white
                    "
                    >10 ตัว</span
                  >
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div> -->
    <div class="col-12">
      <div class="card">
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">ข้อมูล{{ animalName }}</h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <router-link to="/creature/add">
              <Button
                :label="'เพิ่ม' + animalName"
                icon="pi pi-plus"
                class="w-full md:w-auto"
              />
            </router-link>
          </div>
        </div>
        <div class="mt-5">
          <DataTable
            class="text-sm"
            :value="data.animalData"
            :loading="isLoading"
            :rowHover="true"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            @sort="sort($event)"
          >
            <Column field="show_id" header="ลำดับ" class="text-center"></Column>
            <Column
              field="AnimalIdentificationID"
              header="หมายเลขสัตว์"
              class="text-center"
            ></Column>
            <Column
              field="AnimalName"
              header="ชื่อสัตว์"
              class="text-center"
            ></Column>
            <!-- <Column
              field="animal_age"
              header="อายุ (ปี)"
              class="text-center"
            ></Column> -->
            <Column
              field="AnimalStatus.AnimalStatusName"
              header="สถานะ"
              class="text-center"
            ></Column>
            <Column
              field="AnimalBreed1.AnimalBreedName"
              header="พันธุ์"
              class="text-center"
            ></Column>
            <Column
              field="AnimalPar"
              header="ท้องที่"
              class="text-center"
            ></Column>
            <!-- <Column
              field="latest"
              header="วันที่ผสมล่าสุด"
              class="text-center"
            ></Column> -->
            <!-- <Column
              field="alert"
              header="แจ้งเตือน"
              class="text-center"
            ></Column> -->
            <Column field="AnimalActive" header="สถานะ" class="text-center">
              <template #body="slotProps">
                <div v-if="slotProps.data.isActive == 1">
                  <Tag class="w-full" severity="success">เปิดใช้งาน</Tag>
                </div>

                <div v-else>
                  <Tag class="w-full bg-gray-500">ปิดใช้งาน</Tag>
                </div>
              </template>
            </Column>
            <Column header="จัดการ" class="text-center">
              <template #body>
                <Button
                  label="กิจกรรม"
                  icon="pi pi-refresh"
                  class="p-button-sm p-button-text p-button-warning"
                />
              </template>
            </Column>
            <template #empty>
              <center>ไม่พบข้อมูล</center>
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
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {
    PageTitle,
  },

  data() {
    return {
      store: useStore(),
      animalName: computed(() => this.$store.getters.animal_name),
      breadcrumb: [
        { label: "ทะเบียนฟาร์ม (ผท.3)", to: "/farm" },
        { label: "ข้อมูลฟาร์ม", to: "/farm/info" },
      ],

      url: [],
      data: [],
      show: [],
      isLoading: false,
      curpage: 0,
      sortField: "",
      sortOrder: "",
      //  cancel requests

      controller: new AbortController(),
    };
  },

  mounted() {
    this.load();
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
    formatArray(value) {
      return value.toLocaleString();
    },
    load() {
      // url list

      this.url.animal = "/animal";
      this.url.farm = "/farm";
      this.url.farmer = "/farmer";
      this.url.project = "/project";

      axios
        .get(this.url.animal + "?FarmID=" + this.$route.params.id, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.animalTotal = res.data.total;
          this.data.animalData = res.data.rows;

          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.data.animalData.length; i++) {
              this.data.animalData[i].show_id = i + 1;
            }
          } else {
            let start = (this.curpage - 1) * 15;
            for (let i = 0; i < this.data.animalData.length; i++) {
              this.data.animalData[i].show_id = i + 1 + start;
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.project, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.project = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.farm + "/" + this.$route.params.id, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.farm = res.data;
          // if (this.data.farm.farmer == null) {
          //   this.show = {};
          // } else {
          // console.log(this.data.farm);
          if (this.data.farm.Farmer == null) {
            this.show = {
              FarmIdentificationNumber: this.data.farm.FarmIdentificationNumber,
              FarmName: this.data.farm.FarmName,
              FarmRegisterDate: this.data.farm.FarmRegisterDate,
              // FarmOwner:
              //   this.data.farm.Farmer.GivenName +
              //   " " +
              //   this.data.farm.Farmer.Surname,
              FarmStatusID: this.data.farm.FarmStatus.FarmStatusName,
              FarmAddress:
                this.data.farm.FarmAddress +
                " " +
                this.data.farm.FarmMoo +
                " " +
                this.data.farm.FarmStreet +
                " " +
                this.data.farm.Tumbol.TumbolName +
                " " +
                this.data.farm.Amphur.AmphurName +
                " " +
                this.data.farm.Province.ProvinceName +
                " " +
                this.data.farm.FarmZipCode,

              ProjectID: this.formatArray(this.data.farm.ProjectID),
              // IdentificationNumber:
              //   this.data.farm.farmer.IdentificationNumber ?? "",
              // MobilePhoneNumber: this.data.farm.farmer.MobilePhoneNumber,
            };
          } else {
            this.show = {
              FarmIdentificationNumber: this.data.farm.FarmIdentificationNumber,
              FarmName: this.data.farm.FarmName,
              FarmRegisterDate: this.data.farm.FarmRegisterDate,
              FarmOwner:
                this.data.farm.Farmer.GivenName +
                " " +
                this.data.farm.Farmer.Surname,
              FarmStatusID: this.data.farm.FarmStatus.FarmStatusName,
              FarmAddress:
                this.data.farm.FarmAddress +
                " " +
                this.data.farm.FarmMoo +
                " " +
                this.data.farm.FarmStreet +
                " " +
                this.data.farm.Tumbol.TumbolName +
                " " +
                this.data.farm.Amphur.AmphurName +
                " " +
                this.data.farm.Province.ProvinceName +
                " " +
                this.data.farm.FarmZipCode,

              ProjectID: this.formatArray(this.data.farm.ProjectID),
              IdentificationNumber:
                this.data.farm.Farmer.IdentificationNumber ?? "",
              MobilePhoneNumber: this.data.farm.Farmer.MobilePhoneNumber,
            };
          }
          // }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.p-card {
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.04) !important;
}
</style>
