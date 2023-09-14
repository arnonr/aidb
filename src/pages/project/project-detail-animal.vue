<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="ติดตามโครงการ" :pages="breadcrumb" />

      <div class="card">
        <div class="grid">
          <div class="col-12 sm:col-6 lg:col-12">
            <label
              for="selectedScheme"
              class="block text-600 text-sm font-bold mb-2"
            >
              โครงการ</label
            >
            <MultiSelect
              display="chip"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="ทั้งหมด"
              :options="Projects"
              optionLabel="ProjectName"
              optionValue="ProjectID"
              :filter="true"
              v-model="search.Project"
              :virtualScrollerOptions="{ itemSize: 38 }"
            />
            <!-- v-model="filtered.ProjectID" -->
          </div>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12">
        <router-link :to="'/project/detail?projects=' + search.Project">
          <Button severity="secondary" label="ทะเบียนฟาร์ม" />
        </router-link>
        <router-link :to="'/project/detail-animal?projects=' + search.Project">
          <Button severity="primary" label="ทะเบียนสัตว์" class="ml-2" />
        </router-link>
        <router-link :to="'/project/detail-diary?projects=' + search.Project">
          <Button severity="secondary" label="กิจกรรมแจ้งเตือน" class="ml-2" />
        </router-link>
      </div>
      <div class="card mb-5">
        <div v-if="loader" class="grid">
          <div class="col-12">
            <h1 class="text-xl mb-4 text-500">
              เครื่องมือช่วยค้นหาทะเบียนสัตว์ (ผท.1)
            </h1>
          </div>

          <div class="col-12 sm:col-12 lg:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลขฟาร์ม</label
            >
            <Dropdown
              :showClear="true"
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              optionLabel="FarmFull"
              optionValue="FarmID"
              :virtualScrollerOptions="{ itemSize: 38 }"
              :options="Farm"
              :filter="true"
              v-model="search.FarmID"
            />
          </div>

          <div
            class="col-12 sm:col-6 lg:col-4"
            v-if="this.user.GroupID == 1 || this.user.GroupID == 2"
          >
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              รหัสสัตว์</label
            >
            <InputText
              class="w-full"
              type="text"
              v-model="params.AnimalIdentificationID"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลขใบหู</label
            >
            <InputText
              class="w-full"
              type="text"
              v-model="params.AnimalEarID"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลข NID</label
            >
            <InputText
              class="w-full"
              type="text"
              v-model="params.AnimalNationalID"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลข RFID</label
            >
            <InputText
              class="w-full"
              type="text"
              v-model="params.AnimalMicrochip"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              ชื่อสัตว์</label
            >

            <InputText class="w-full" type="text" v-model="params.AnimalName" />
          </div>

          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="animal_id"
              class="block text-600 text-sm font-bold mb-2"
            >
              เพศ</label
            >
            <Dropdown
              :showClear="true"
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              optionLabel="AnimalSexName"
              optionValue="AnimalSexID"
              :options="AnimalSex"
              :filter="true"
              v-model="search.AnimalSexID"
              @show="test()"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              แหล่งที่มา</label
            >
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              id="selectedScheme"
              placeholder="ทั้งหมด"
              :options="source"
              optionLabel="name"
              v-model="search.AnimalSource"
            />
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedScheme"
              class="block text-600 text-sm font-bold mb-2"
            >
              ศูนย์วิจัย</label
            >
            <Dropdown
              :showClear="true"
              emptyMessage="ไม่มีข้อมูล"
              emptyFilterMessage="ไม่พบข้อมูล"
              class="w-full"
              placeholder="ทั้งหมด"
              :options="AIZone"
              optionLabel="AIZoneName"
              optionValue="AIZoneID"
              v-model="search.AIZone"
            />
          </div>
          <div class="col-12 sm:col-12 lg:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              เขตพื้นที่ปศุสัตว์</label
            >
            <Dropdown
              :showClear="true"
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              optionLabel="OrganizationZoneFull"
              optionValue="OrganizationZoneID"
              :options="OrganizationZone"
              :filter="true"
              v-model="search.OrganizationZoneID"
            />
          </div>
          <div class="col-12 sm:col-12 lg:col-8">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลขหน่วยงาน</label
            >
            <Dropdown
              :showClear="true"
              class="w-full"
              id="selectedFarm"
              placeholder="ทั้งหมด"
              optionLabel="OrganizationFull"
              optionValue="OrganizationID"
              :virtualScrollerOptions="{ itemSize: 38 }"
              :options="Organization"
              :filter="true"
              v-model="search.OrganizationID"
            />
          </div>
          <!-- <div class="col-12 sm:col-6 lg:col-8">
              <label
                for="selectedScheme"
                class="block text-600 text-sm font-bold mb-2"
              >
                โครงการ</label
              >
              <MultiSelect
                display="chip"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="ทั้งหมด"
                :options="Projects"
                optionLabel="ProjectName"
                optionValue="ProjectID"
                v-model="search.Project"
                :filter="true"
                :virtualScrollerOptions="{ itemSize: 38 }"
              />
            </div> -->
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              สถานะ</label
            >
            <Dropdown
              class="w-full"
              id="selectedFarm"
              v-model="search.Status"
              placeholder="ทั้งหมด"
              :options="Status"
              optionLabel="StatusName"
              optionValue="StatusID"
            />
          </div>
          <Accordion class="col-12 sm:col-12 lg:col-12">
            <AccordionTab header="ค้นหาขั้นสูง">
              <div class="grid">
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="FarmName"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    ชื่อฟาร์ม
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    id="FarmName"
                    v-model="params.FarmName"
                  />
                </div>
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="FarmerName"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    ชื่อเกษตรกร
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    id="FarmerName"
                    v-model="params.FarmerName"
                  />
                </div>
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="Province"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    สายพันธุ์ที่ 1</label
                  >
                  <Dropdown
                    :showClear="true"
                    class="w-full"
                    id="selectedFarm"
                    placeholder="ทั้งหมด"
                    optionLabel="Fullname"
                    optionValue="AnimalBreedID"
                    :options="AnimalBreed"
                    :filter="true"
                    v-model="params.AnimalBreedID1"
                  />
                </div>
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="Province"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    สายพันธุ์ที่ 2</label
                  >
                  <Dropdown
                    :showClear="true"
                    class="w-full"
                    id="selectedFarm"
                    placeholder="ทั้งหมด"
                    optionLabel="Fullname"
                    optionValue="AnimalBreedID"
                    :options="AnimalBreed"
                    :filter="true"
                    v-model="params.AnimalBreedID2"
                  />
                </div>
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="Province"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    สายพันธุ์ที่ 3</label
                  >
                  <Dropdown
                    :showClear="true"
                    class="w-full"
                    id="selectedFarm"
                    placeholder="ทั้งหมด"
                    optionLabel="Fullname"
                    optionValue="AnimalBreedID"
                    :options="AnimalBreed"
                    :filter="true"
                    v-model="params.AnimalBreedID3"
                  />
                </div>
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="Province"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    สายพันธุ์ที่ 4</label
                  >
                  <Dropdown
                    :showClear="true"
                    class="w-full"
                    id="selectedFarm"
                    placeholder="ทั้งหมด"
                    optionLabel="Fullname"
                    optionValue="AnimalBreedID"
                    :options="AnimalBreed"
                    :filter="true"
                    v-model="params.AnimalBreedID4"
                  />
                </div>
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="Province"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    สายพันธุ์ที่ 5</label
                  >
                  <Dropdown
                    :showClear="true"
                    class="w-full"
                    id="selectedFarm"
                    placeholder="ทั้งหมด"
                    optionLabel="Fullname"
                    optionValue="AnimalBreedID"
                    :options="AnimalBreed"
                    :filter="true"
                    v-model="params.AnimalBreedID5"
                  />
                </div>
                <!-- <div class="col-12 sm:col-6 lg:col-4"></div> -->
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="dateBirthRange"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    ช่วงอายุตั้งแต่
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    id="dateBirthRange"
                    v-model="params.AnimalAgeStart"
                  />
                </div>
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="dateBirthRange"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    ถึงช่วงอายุ
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    id="dateBirthRange"
                    v-model="params.AnimalAgeTo"
                  />
                </div>

                <!-- <div class="col-12 sm:col-6 lg:col-4">
                      <label
                        for="dateBirthRange"
                        class="block text-600 text-sm font-bold mb-2"
                      >
                        ชื่อเกษตรกร
                      </label>
                      <InputText
                        type="text"
                        class="w-full"
                        id="dateBirthRange"
                        v-model="params.AnimalAgeTo"
                      />
                    </div> -->
              </div>
            </AccordionTab>
          </Accordion>
        </div>

        <div v-else class="grid">
          <div class="col-12">
            <Skeleton width="20rem" height="2rem" class="mb-4"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12">
            <div class="grid">
              <div class="col-12">
                <Skeleton width="5rem" class="mb-2"></Skeleton>
                <Skeleton height="2rem" class="mb-2"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <DataTable
          class="text-sm"
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
          lazy
        >
          <Column
            field="AnimalEarID"
            header="หมายเลขใบหู"
            class="text-center cursor-pointer"
            exportFooter="&#8203;"
          >
            <template #body="slotProps">
              <div>
                <span
                  class="text-blue-400"
                  @click="open_detail(slotProps.data.AnimalID)"
                  ><u>{{ slotProps.data.AnimalEarID }}</u></span
                >
              </div>
            </template>
          </Column>
          <Column
            field="AnimalNationalID"
            header="หมายเลข NID"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="AnimalName"
            header="ชื่อสัตว์"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="AnimalAge"
            header="อายุ (ปี-เดือน)"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="AnimalStatus.AnimalStatusName"
            header="สถานะสัตว์"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="AnimalSex.AnimalSexName"
            header="เพศสัตว์"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="AnimalBreedAll"
            header="สายพันธุ์"
            class="text-center"
            style="width: 100px"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="AnimalFarm.FarmName"
            header="ชื่อฟาร์ม"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <Column
            field="Organization.OrganizationName"
            header="หน่วยงาน"
            class="text-center"
            exportFooter="&#8203;"
          ></Column>
          <!-- <Column
              field="OrganizationZone.OrganizationZoneName"
              header="พื้นที่"
              class="text-center"
              exportFooter="&#8203;"
            >
            </Column> -->
          <Column
            field="AnimalAlive"
            header="สถานะ"
            class="text-center"
            exportFooter="&#8203;"
          >
            <template #body="slotProps">
              <div
                v-if="
                  slotProps.data.AnimalAlive == 1 ||
                  slotProps.data.AnimalAlive == status[0]
                "
              >
                <Tag class="w-full" severity="success">Active</Tag>
              </div>
              <div v-else>
                <Tag class="w-full bg-gray-500">inActive</Tag>
              </div>
            </template>
          </Column>
          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <!-- <Button
                @click="
                  open_edit(slotProps.data.AnimalID, slotProps.data.AnimalID)
                "
              >
                กิจกรรม
              </Button> -->

              <SplitButton
                label="กิจกรรม"
                @click="
                  openAnimal(
                    slotProps.data.AnimalID,
                    slotProps.data.AnimalEarID
                  )
                "
                class="p-button-sm p-button-outlined p-button-warning"
                :model="
                  getItems(
                    slotProps.data.AnimalID,
                    slotProps.data.AnimalSecretStatus,
                    slotProps.data.AnimalEarID
                  )
                "
              >
              </SplitButton>

              <!-- <SplitButton
                label="แก้ไข"
                icon="pi pi-pencil"
                @click="
                  open_edit(slotProps.data.AnimalID, slotProps.data.AnimalID)
                "
                class="p-button-sm p-button-outlined p-button-warning"
                :model="
                  getItems(slotProps.data.AnimalID, slotProps.data.AnimalEarID)
                "
              >
              </SplitButton> -->
            </template>
          </Column>
          <template #empty> ไม่พบข้อมูล </template>
          <template #loading>
            <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
          </template>
        </DataTable>
      </div>
    </div>
    <!-- end main page -->

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
    <!-- End Delete Dialog -->
    <!-- EDIT Dialog -->

    <!-- End View Dialog -->

    <Dialog
      header="กิจกรรม"
      v-model:visible="displaytab"
      :draggable="false"
      :style="{ width: '75vw' }"
      :modal="false"
      :dismissableMask="true"
    >
      <VueCreatureInfo :display="true" v-if="displaytab" />
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
import store from "@/service/Vuex";
import { mapGetters } from "vuex";
import _ from "lodash";
import VueCreatureInfo from "@/pages/farm_info/creature_info.vue";
//   import RegisteredAnimalReport from "./RegisteredAnimalReport";
// import JsonExcel from "vue-json-excel3";

export default {
  components: {
    PageTitle,
    VueCreatureInfo,
    // JsonExcel,
  },
  data() {
    return {
      url: "/animal",
      urlOrganization: "/organization?includeAll=false",
      urlOrganizationZone: "/organization-zone",
      urlAIZone: "/ai-zone?isActive=1",
      urlFarm: "/farm?includeAll=false",
      urlAnimalSex: "/animal-sex",
      urlTumbol: "/tumbol?includeAll=false",
      urlAmphur: "/amphur?includeAll=false",
      urlProvince: "/province?includeAll=false",
      urlAnimalBreedID: "/animal-breed?includeAll=false&isActive=1",
      urlProject: "/project?includeAll=false&isActive=1",
      apiProject: "/project?includeAll=false&isActive=1",

      breadcrumb: [
        { label: "หน้าหลัก", to: "/" },
        { label: "ทะเบียนสัตว์ (ผท.1)", to: "" },
      ],

      // path รูป
      path: null,

      // load
      displaytab: false,
      data: [],
      json_data: [],
      Organization: [],
      OrganizationZone: [],
      Farm: [],
      AnimalSex: [],
      Tumbol: [],
      Amphur: [],
      Province: [],

      // สถานะการโหลด
      loader: true,

      Status: [
        {
          StatusName: "ทั้งหมด",
          StatusID: "",
        },
        {
          StatusName: "Active",
          StatusID: "1",
        },
        {
          StatusName: "InActive",
          StatusID: "0",
        },
      ],
      // หน้า page
      curpage: 0,
      isLoading: false,
      valid: false,

      // Params
      params: {
        page: 1,
        size: 10,
        orderByField: "AnimalID",
        orderBy: "desc",
        IsActive: null,
      },

      table: {
        total: 0,
        last_page: 0,
      },

      // กำหนดฟอร์มการส่ง
      form: {
        isActive: "",
        SourceFarm: {
          FarmName: "",
        },
      },

      // form.SourceFarm.FarmName

      // ผูกไว้ทำปุ่มค้นหา
      search: {
        OrganizationID: "",
        OrganizationZoneID: "",
        FarmID: "",
        AnimalSexID: "",
        AnimalSource: "",
        StaffStartDate: "",
        StaffEndDate: "",
        Status: "",
      },

      // สำหรับตัวแปรในการส่ง api
      filtered: {
        OrganizationID: "",
        OrganizationZoneID: "",
        FarmID: "",
        AnimalSexID: "",
        AnimalSource: "",
        StaffStartDate: "",
        StaffEndDate: "",
      },

      // สร้างข้อมูลจำลอง
      source: [
        {
          id: "BORN",
          name: "เกิดในฟาร์ม",
        },
        {
          id: "BUY",
          name: "ซื้อมา",
        },
        {
          id: "TRANSFER",
          name: "ย้ายมา",
        },
      ],
      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],

      //  cancel requests      permit: null,
      permit: null,
      controller: new AbortController(),

      // Modal
      display_delete: false,
      display_view: false,
      pdfAnimalImg: null,
    };
  },
  computed: {
    ...mapGetters({
      permission: "get_permission",
      animal_id: "animal_id",
      user: "user",
    }),
  },
  mounted() {
    // ข้อมูลหลัก
    if (this.$route.query.projects) {
      let pj = this.$route.query.projects.split(",");
      this.search.Project = pj.map((e) => {
        return parseInt(e);
      });

      this.params.ProjectID = pj.map((e) => {
        return parseInt(e);
      });

      //   this.params.ProjectID
    }

    this.load();

    if (this.animal_id == 1) {
      this.apiProject += "&ProjectLevel=ANIMAL&AnimalTypeID=[1,2,41,42]";
    } else if (this.animal_id == 2) {
      this.apiProject += "&ProjectLevel=ANIMAL&AnimalTypeID=[3,4,43,44]";
    } else if (this.animal_id == 3) {
      this.apiProject += "&ProjectLevel=ANIMAL&AnimalTypeID=[17,18,45,46]";
    }
    axios
      .get(this.apiProject, { signal: this.controller.signal })
      .then((response) => {
        this.project = response.data.rows;
      });

    this.form.isActive = this.status[0];

    this.load_selection();
    this.permit = this.permission.filter((item) => {
      return item.MenuID == 3;
    });
  },
  watch: {
    // ค้นหา
    "search.OrganizationID"(val) {
      if (val) {
        this.params.OrganizationID = val;
      } else {
        this.params.OrganizationID = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.OrganizationZoneID"(val) {
      if (val) {
        this.params.OrganizationZoneID = val;
      } else {
        this.params.OrganizationZoneID = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.AIZone"(val) {
      if (val) {
        this.params.AIZone = val;
      } else {
        this.params.AIZone = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.Project"(val) {
      if (val) {
        this.params.ProjectID = val;
      } else {
        this.params.ProjectID = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    // ค้นหา
    "search.FarmID"(val) {
      if (val) {
        this.params.FarmID = val;
      } else {
        this.params.FarmID = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalIdentificationID": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalEarID": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalNationalID": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalMicrochip": _.debounce(function () {
      this.load();
    }, 500),
    "params.FarmName": _.debounce(function () {
      this.load();
    }, 500),
    "params.FarmerName": _.debounce(function () {
      this.load();
    }, 500),
    "params.Status": _.debounce(function () {
      this.load();
    }, 500),

    // ค้นหา
    "search.AnimalSexID"(val) {
      if (val) {
        this.params.AnimalSexID = val;
      } else {
        this.params.AnimalSexID = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    // ค้นหา
    "search.Status"(val) {
      if (val) {
        this.params.isActive = val;
      } else {
        this.params.isActive = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.AnimalSource"(val) {
      if (val) {
        this.params.AnimalSource = val.id;
      } else {
        this.params.AnimalSource = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalName": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalAgeStart": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalAgeTo": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID1": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID2": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID3": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID4": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID5": _.debounce(function () {
      this.load();
    }, 500),

    // ค้นหา
    "search.StaffTumbolID"(val) {
      this.filtered.StaffTumbolID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
  },
  methods: {
    openAnimal(id, earid) {
      let data = {
        AnimalEarID: earid,
      };
      store.dispatch("animalInfo", data);
      // this.displaytab = true;

      this.$router.push("/activity/creature_info_detail");
      // setTimeout(() => {
      // }, 1000);
    },
    getItems(id, menu, earid) {
      let data = {
        AnimalEarID: earid,
      };
      const items = [
        // {
        //   label: "พิมพ์ประวัติ",
        //   icon: "pi pi-print",
        //   command: async () => {
        //     // window.open("../../pdf/Animal.pdf", "_blank");
        //     await ArtificialReport();
        //   },
        // },
      ];

      if (menu.includes(2)) {
        items.push({
          label: "ผสมเทียม",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 0,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(3)) {
        items.push({
          label: "ย้ายฝากตัวอ่อน",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 1,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(4)) {
        items.push({
          label: "ตรวจการตั้งท้อง",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 2,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(5)) {
        items.push({
          label: "แท้ง",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 3,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(6)) {
        items.push({
          label: "คลอด",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 4,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(7) && this.animal_id != 3) {
        items.push({
          label: "ตรวจระบบสืบพันธุ์",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 11,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(8)) {
        items.push({
          label: "ติดตามลูกหลังคลอด",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 5,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(9)) {
        items.push({
          label: "หย่านม",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 6,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;
          },
        });
      }
      if (menu.includes(1)) {
        items.push({
          label: "คัดจำหน่าย",
          icon: "pi pi-search",
          command: () => {
            let tab = {
              id: 9,
              animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);

            store.dispatch("animalInfo", data);
            this.displaytab = true;

            // this.$router.push("/creature/edit/" + id);
          },
        });
      }
      return items;
    },
    // getItems(id, earid) {
    //   const items = [
    //     {
    //       label: "บันทึกกิจกรรม",
    //       icon: "pi pi-eye",
    //       command: async () => {
    //         let data = {
    //           AnimalEarID: earid,
    //         };
    //         store.dispatch("animalInfo", data);
    //         this.$router.push("/activity/creature_info_detail");
    //       },
    //     },
    //     //   {
    //     //     label: "พิมพ์ประวัติ",
    //     //     icon: "pi pi-eye",
    //     //     command: async () => {
    //     //       await RegisteredAnimalReport(id);
    //     //     },
    //     //   },
    //     {
    //       label: "ลบ",
    //       icon: "pi pi-trash",
    //       command: () => {
    //         this.open_delete(id);
    //       },
    //     },
    //   ];
    //   return items;
    // },
    // clear() {
    //   this.form = {
    //     isActive: this.status[0],
    //   };
    //   this.valid = false;
    // },
    validation() {
      if (
        !this.form.StaffNumber ||
        !this.form.StaffIdentificationNumber ||
        !this.form.StaffTitleID ||
        !this.form.StaffGivenName ||
        !this.form.StaffSurname ||
        !this.form.StaffGenderID ||
        !this.form.StaffOrganizationID ||
        !this.form.StaffPositionTypeID ||
        !this.form.StaffPositionID ||
        !this.form.StaffStartDate ||
        !this.form.StaffEmail ||
        !this.form.StaffMobilePhone
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
    // Axios
    async load(event) {
      this.isLoading = true;

      // สำหรับเปลี่ยนหน้า
      if (event) {
        this.params.page = event.page + 1;
      }

      // กำหนด parameter
      this.setParam();

      // console.log(this.params.ProjectID);
      console.log(typeof this.params.ProjectID);

      if (typeof this.params.ProjectID !== "string") {
        this.params.ProjectID = JSON.stringify(this.params.ProjectID);
      }
      //   console.log(this.params+"FREEDOM5");

      // console.log(this.params.Project);
      console.log("FREEDOM");
      await axios
        .get(this.url, { params: this.params, signal: this.controller.signal })
        .then((response) => {
          let data = response.data;
          this.params.page = data.currPage;
          this.table.total = data.total;
          this.table.last_page = data.lastPage;
          this.data = data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });

      // Excel
      //   axios
      //     .get(this.url, {
      //       params: {
      //         ...this.params,
      //         size: 100000,
      //         noEventLatest: true,
      //         includeEventLatest: false,
      //       },
      //       signal: this.controller.signal,
      //     })
      //     .then((response) => {
      //       console.log(response.data);
      //       this.json_data = response.data.rows.map((x) => {
      //         let e = {
      //           EarID: "'" + x.AnimalEarID,
      //           Name: x.AnimalName,
      //           Age: "'" + x.AnimalAge,
      //           Status: x.AnimalStatus.AnimalStatusName,
      //           BreedAll: x.AnimalBreedAll,
      //           ThaiBirthDate: x.ThaiAnimalBirthDate,
      //           Gender: x.AnimalSex.AnimalSexName,
      //           FarmIdentificationNumber: x.AnimalFarm.FarmIdentificationNumber,
      //           FarmName: x.AnimalFarm.FarmName,
      //           Organization: x.Organization
      //             ? x.Organization.OrganizationName
      //             : "-",
      //         };
      //         return e;
      //       });
      //       console.log(this.json_data);
      //     })
      //     .finally(() => {
      //       this.isLoading = false;
      //     });

      axios
        .get(this.urlAnimalBreedID, { signal: this.controller.signal })
        .then((response) => {
          if (this.animal_id == 1) {
            this.AnimalBreed = response.data.rows
              .filter(
                (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
              )
              .map((item) => {
                return {
                  AnimalBreedID: item.AnimalBreedID,
                  AnimalBreedCode: item.AnimalBreedCode,
                  Fullname: item.AnimalBreedCode + ", " + item.AnimalBreedName,
                };
              });
          } else if (this.animal_id == 2) {
            this.AnimalBreed = response.data.rows
              .filter(
                (item) => item.AnimalTypeID === 3 || item.AnimalTypeID === 4
              )
              .map((item) => {
                return {
                  AnimalBreedID: item.AnimalBreedID,
                  AnimalBreedCode: item.AnimalBreedCode,
                  Fullname: item.AnimalBreedCode + ", " + item.AnimalBreedName,
                };
              });
          } else if (this.animal_id == 3) {
            this.AnimalBreed = response.data.rows
              .filter(
                (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
              )
              .map((item) => {
                return {
                  AnimalBreedID: item.AnimalBreedID,
                  AnimalBreedCode: item.AnimalBreedCode,
                  Fullname: item.AnimalBreedCode + ", " + item.AnimalBreedName,
                };
              });
          }
        });
    },
    setParam() {
      if (this.filtered.OrganizationZoneID) {
        this.params.OrganizationZoneID = this.filtered.OrganizationZoneID;
      }
      if (this.filtered.FarmID) {
        this.params.FarmID = this.filtered.FarmID;
      }
      if (this.filtered.AnimalSource) {
        this.params.AnimalSource = this.filtered.AnimalSource;
      }

      if (this.animal_id == 1) {
        this.params.AnimalTypeID = "[1,2,41,42]";
      } else if (this.animal_id == 2) {
        this.params.AnimalTypeID = "[3,4,43,44]";
      } else if (this.animal_id == 3) {
        this.params.AnimalTypeID = "[17,18,45,46]";
      }
    },
    load_selection() {
      const getOrganization = axios.get(this.urlOrganization, {
        signal: this.controller.signal,
      });
      const getOrganizationZone = axios.get(this.urlOrganizationZone, {
        signal: this.controller.signal,
      });
      const getAIZone = axios.get(this.urlAIZone, {
        signal: this.controller.signal,
      });
      const getProject = axios.get(this.urlProject, {
        signal: this.controller.signal,
      });
      const getFarm = axios.get(this.urlFarm, {
        signal: this.controller.signal,
      });

      const getAnimalSex = axios.get(this.urlAnimalSex, {
        signal: this.controller.signal,
      });
      const getTumbol = axios.get(this.urlTumbol, {
        signal: this.controller.signal,
      });
      const getAmphur = axios.get(this.urlAmphur, {
        signal: this.controller.signal,
      });
      const getProvince = axios.get(this.urlProvince, {
        signal: this.controller.signal,
      });

      Promise.all([
        getOrganization,
        getOrganizationZone,
        getFarm,
        getAnimalSex,
        getTumbol,
        getAmphur,
        getProvince,
        getAIZone,
        getProject,
      ])
        .then((values) => {
          this.Organization = values[0].data.rows;

          for (let i = 0; i < this.Organization.length; i++) {
            this.Organization[i].show_id = i + 1;
            this.Organization[i].OrganizationFull =
              this.Organization[i].OrganizationCode +
              ", " +
              this.Organization[i].OrganizationName;
          }

          this.OrganizationZone = values[1].data.rows;

          for (let i = 0; i < this.OrganizationZone.length; i++) {
            this.OrganizationZone[i].show_id = i + 1;
            this.OrganizationZone[i].OrganizationZoneFull =
              this.OrganizationZone[i].OrganizationZoneName;
          }

          this.Farm = values[2].data.rows;
          for (let i = 0; i < this.Farm.length; i++) {
            this.Farm[i].show_id = i + 1;
            this.Farm[i].FarmFull =
              this.Farm[i].FarmIdentificationNumber +
              ", " +
              this.Farm[i].FarmName;
          }
          this.AnimalSex = values[3].data.rows;

          this.Tumbol = values[4].data.rows.map((item) => {
            return {
              TumbolID: item.TumbolID,
              AmphurID: item.AmphurID,
              TumbolCode: item.TumbolCode,
              ProvinceID: item.ProvinceID,
              TumbolName: item.TumbolName,
              Fullname:
                item.TumbolCode.substring(0, 6) + ", " + item.TumbolName,
            };
          });
          this.TempTumbol = this.Tumbol;

          this.Amphur = values[5].data.rows.map((item) => {
            return {
              AmphurID: item.AmphurID,
              ProvinceID: item.ProvinceID,
              AmphurCode: item.AmphurCode,
              AmphurName: item.AmphurName,
              Fullname:
                item.AmphurCode.substring(0, 4) + ", " + item.AmphurName,
            };
          });
          this.TempAmphur = this.Amphur;

          this.Province = values[6].data.rows;

          this.AIZone = values[7].data.rows;
          this.Projects = values[8].data.rows;

          // console.log(this.Projects);
        })
        .finally(() => (this.loader = true));
    },
    // sort table
    sort($event) {
      // console.log($event);
      if ($event.sortField !== "show_id") {
        if ($event.sortOrder == 1) {
          this.params.orderBy = "asc";
        } else {
          this.params.orderBy = "desc";
        }
        this.params.orderByField = $event.sortField;
        this.load();
      }
    },
    // page change
    page($event) {
      this.curpage = $event.page + 1;
      this.load();
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
    project_check(id) {
      let prepare_data = this.data.find(function (item) {
        return item.AnimalID == id;
      });
      let project_id = prepare_data.ProjectID;
      let projects = prepare_data.Projects;

      if (this.user.GroupID == 1 || this.user.GroupID == 2) {
        return true;
      } else {
        if (project_id == 21) {
          this.$toast.add({
            severity: "error",
            summary: "ไม่มีสามารถแก้ไขได้",
            detail: "เนื่องจากอยู่ใน " + projects.toString(),
            life: 5000,
          });
          return false;
        } else {
          return true;
        }
      }
    },
    async open_edit(id) {
      if (this.permit[0].IsUpdate == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์แก้ไข",
          life: 5000,
        });
        return;
      }

      if (this.project_check(id)) {
        await this.$router.push("/creature/edit/" + id);
      }
    },
    async open_detail(id) {
      // console.log(id);

      this.form = null;
      if (this.permit[0].IsPreview == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์ดูข้อมูล",
          life: 5000,
        });
        return;
      } else {
        this.form = this.data.find((x) => x.AnimalID == id);

        if (!this.form.SourceFarm) {
          this.form.SourceFarm = {
            FarmName: "",
          };
        }
        if (!this.form.AnimalFather) {
          this.form.AnimalFather = {
            AnimalName: "",
          };
        }
        if (!this.form.AnimalMother) {
          this.form.AnimalMother = {
            AnimalName: "",
          };
        }

        if (this.form.AnimalSource == "BORN") {
          this.form.AnimalSourceName = "เกิดในฟาร์ม";
        } else if (this.form.AnimalSource == "BUY") {
          this.form.AnimalSourceName = "ซื้อมา";
        } else if (this.form.AnimalSource == "TRANSFER") {
          this.form.AnimalSourceName = "ย้ายมา";
        } else {
          this.form.AnimalSourceName = "";
        }
        if (this.form.AnimalBornType == "NORMAL") {
          this.form.AnimalBornTypeName = "ผสมพันธุ์ปกติ";
        } else if (this.form.AnimalBornType == "AI") {
          this.form.AnimalBornTypeName = "ผสมเทียม";
        } else if (this.form.AnimalBornType == "EMBRYO") {
          this.form.AnimalBornTypeName = "ตัวอ่อน";
        } else {
          this.form.AnimalBornTypeName = "";
        }
        if (this.form.AnimalFirstBreed == 1) {
          this.form.AnimalFirstBreedName = "สายเลือดตั้งต้น";
        } else if (this.form.AnimalFirstBreed == 0) {
          this.form.AnimalFirstBreedName = "สายเลือดครอบครัว";
        } else {
          this.form.AnimalFirstBreedName = "";
        }

        if (this.form.AnimalFather) {
          this.form.AnimalFather.Fullname =
            this.form.AnimalFather.AnimalEarID +
            ", " +
            this.form.AnimalFather.AnimalName;
        }
        if (this.form.AnimalMother) {
          this.form.AnimalMother.Fullname =
            this.form.AnimalMother.AnimalEarID +
            ", " +
            this.form.AnimalMother.AnimalName;
        }

        this.display_view = true;
      }
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
      this.form.id = id;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },
    creature() {
      if (this.permit[0].IsAdd == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์เพิ่ม",
          life: 5000,
        });
        return;
      } else {
        store.dispatch("bornItem", null);
        this.$router.push("/creature/add");
      }
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
  },
  unmounted() {
    this.controller.abort();
  },
};

// let url = this.url + "?size=15";
// url += "&page=";
// if (this.curpage) {
//   url += this.curpage;
// }

// if (this.filtered.OrganizationID) {
//   url += "&OrganizationID=" + this.filtered.OrganizationID;
// }
// if (this.filtered.OrganizationZoneID) {
//   url += "&OrganizationZoneID=" + this.filtered.OrganizationZoneID;
// }
// if (this.filtered.FarmID) {
//   url += "&FarmID=" + this.filtered.FarmID;
// }
// if (this.filtered.AnimalIdentificationID) {
//   url +=
//     "&AnimalIdentificationID=" + this.filtered.AnimalIdentificationID;
// }
// if (this.filtered.AnimalEarID) {
//   url += "&AnimalEarID=" + this.filtered.AnimalEarID;
// }
// if (this.filtered.AnimalName) {
//   url += "&AnimalName=" + this.filtered.AnimalName;
// }
// if (this.filtered.AnimalNationalID) {
//   url += "&AnimalNationalID=" + this.filtered.AnimalNationalID;
// }
// if (this.filtered.AnimalMicrochip) {
//   url += "&AnimalMicrochip=" + this.filtered.AnimalMicrochip;
// }
// if (this.filtered.AnimalSexID) {
//   url += "&AnimalSexID=" + this.filtered.AnimalSexID;
// }
// if (this.filtered.AnimalSource) {
//   url += "&AnimalSource=" + this.filtered.AnimalSource;
// }

// if (this.filtered.StaffStartDate) {
//   url += "&StaffStartDate=" + this.filtered.StaffStartDate;
// }
// if (this.filtered.StaffEndDate) {
//   url += "&StaffEndDate=" + this.filtered.StaffEndDate;
// }

// if (this.data[i].AnimalBirthDate != null) {
//   // หาจำนวนเดือน
//   var today = new Date();
//   const date1 = dayjs(this.data[i].AnimalBirthDate);
//   this.data[i].AnimalAge = date1.diff(today, "month");

//   // แปลงเป็น ปี และ เดือน
//   let countyear = this.data[i].AnimalAge / 12;
//   let countmonth = this.data[i].AnimalAge % 12;

//   // ถ้าปีน้อยกว่า 0 ไม่ต้องแสดง
//   if (Math.abs(countyear) < 1) {
//     if (Math.abs(Math.ceil(countmonth)) != 0) {
//       this.data[i].AnimalAge =
//         Math.abs(Math.ceil(countmonth)) + " เดือน ";
//     } else {
//       this.data[i].AnimalAge = "-";
//     }
//   } else {
//     this.data[i].AnimalAge =
//       Math.abs(Math.ceil(countyear)) +
//       " ปี " +
//       Math.abs(Math.ceil(countmonth)) +
//       " เดือน ";
//   }
// }
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
