<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="สืบค้นทะเบียนตัวอ่อน" :pages="breadcrumb" />
      <div class="card mb-5">
        <h1 class="text-xl mb-4 text-500">เครื่องมือช่วยค้นหาทะเบียนตัวอ่อน</h1>
        <div class="grid">
          <div class="col-12 sm:col-12 lg:col-4">
            <label
              for="codeNumber"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลขทะเบียนตัวอ่อน</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <Dropdown
                class="w-full"
                v-model="search.EmbryoNumber"
                :options="data.dropdown"
                optionLabel="EmbryoNumber"
                optionValue="EmbryoID"
                :virtualScrollerOptions="{
                  // lazy: true,
                  // onLazyLoad: onLazyLoad,
                  itemSize: 38,
                  showLoader: true,
                  loading: loading,
                  // delay: 250,
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
            </span>
          </div>
          <div class="col-6 sm:col-6 lg:col-4 xl:col-4">
            <label
              for="selectedBreeder"
              class="block text-600 text-sm font-bold mb-2"
            >
              พ่อพันธุ์</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <Dropdown
                class="w-full"
                v-model="search.MaleBreederID"
                :options="data.animal"
                optionLabel="AnimalIdentificationID"
                optionValue="AnimalID"
                :virtualScrollerOptions="{
                  // lazy: true,
                  // onLazyLoad: onLazyLoad,
                  itemSize: 38,
                  showLoader: true,
                  loading: loading,
                  // delay: 250,
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
                      slotProps.option.AnimalIdentificationID +
                      " | " +
                      slotProps.option.AnimalName
                    }}</span>
                  </div>
                </template>
              </Dropdown>
            </span>
          </div>
          <div class="col-6 sm:col-6 lg:col-4 xl:col-4">
            <label
              for="selectedBreederAnimal"
              class="block text-600 text-sm font-bold mb-2"
            >
              แม่พันธุ์</label
            >
            <Dropdown
              class="w-full"
              v-model="search.FemaleBreederID"
              :options="data.animal"
              optionLabel="AnimalIdentificationID"
              optionValue="AnimalID"
              :virtualScrollerOptions="{
                // lazy: true,
                // onLazyLoad: onLazyLoad,
                itemSize: 38,
                showLoader: true,
                loading: loading,
                // delay: 250,
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
                    slotProps.option.AnimalIdentificationID +
                    " | " +
                    slotProps.option.AnimalName
                  }}</span>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="col-6 sm:col-6 lg:col-4 xl:col-4">
            <label
              for="selectedProductionMethod"
              class="block text-600 text-sm font-bold mb-2"
            >
              วิธีการผลิต</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <Dropdown
                class="w-full"
                v-model="search.ProduceType"
                :options="ProduceType"
                optionLabel="label"
                optionValue="value"
                placeholder="ทั้งหมด"
              >
              </Dropdown>
            </span>
          </div>
          <!-- <div class="col-6 sm:col-6 lg:col-4 xl:col-2">
            <label
              for="selectedFreezingMethod"
              class="block text-600 text-sm font-bold mb-2"
            >
              วิธีการแช่แข็ง</label
            >
            <Dropdown
              class="w-full"
              id="selectedFreezingMethod"
              placeholder="ทั้งหมด"
            />
          </div> -->
          <div class="col-12 sm:col-6 lg:col-4 xl:col-4">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              แหล่งที่มาของตัวอ่อน</label
            >
            <Dropdown
              class="w-full"
              v-model="search.SourceTypeID"
              :options="data.SourceType"
              optionLabel="SourceTypeName"
              optionValue="SourceTypeID"
              placeholder="ทั้งหมด"
            >
            </Dropdown>
          </div>
          <div class="col-12 sm:col-6 lg:col-4 xl:col-4">
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
                // lazy: true,
                // onLazyLoad: onLazyLoad,
                itemSize: 38,
                showLoader: true,
                loading: loading,
                // delay: 250,
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
          <div class="col-12 sm:col-6 lg:col-4 xl:col-4">
            <label
              for="selectedUnit"
              class="block text-600 text-sm font-bold mb-2"
            >
              เจ้าหน้าที่ผู้รับผิดชอบ</label
            >
            <Dropdown
              class="w-full"
              v-model="search.ResponsibilityStaffID"
              :options="data.staff"
              optionLabel="Fullname"
              optionValue="StaffID"
              :virtualScrollerOptions="{
                // lazy: true,
                // onLazyLoad: onLazyLoad,
                itemSize: 38,
                showLoader: true,
                loading: loading,
                // delay: 250,
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
          <!-- <div class="col-12 sm:col-6 lg:col-4 xl:col-3">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              ชนิดตัวอ่อน</label
            >
            <Dropdown class="w-full" id="selectedFarm" placeholder="ทั้งหมด" />
          </div> -->
          <!-- <div class="col-12 sm:col-6 lg:col-4 xl:col-3">
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
        <h1 class="text-2xl mb-0 text-600">สืบค้นทะเบียนตัวอ่อน</h1>
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
            <Column field="show_id" header="ลำดับ" class="text-center"></Column>
            <Column
              field="EmbryoNumber"
              header="เลขทะเบียนตัวอ่อน"
              class="text-center"
            ></Column>
            <Column
              field="Semen.SemenNumber"
              header="เลขทะเบียนน้ำเชื้อ"
              class="text-center"
            ></Column>
            <Column
              field="MaleBreederID"
              header="หมายเลขพ่อพันธุ์"
              class="text-center"
            ></Column>
            <Column
              field="FemaleBreederID"
              header="หมายเลขแม่พันธุ์"
              class="text-center"
            ></Column>
            <Column
              field="Organization.OrganizationName"
              header="ชื่อหน่วยงาน"
              class="text-center"
            ></Column>
            <!-- <Column
              field="Semen.AnimalBreedID1"
              header="สายพันธุ์"
              class="text-center"
            ></Column> -->
            <Column
              field="SourceType.SourceTypeName"
              header="ประเภทแหล่งที่มา"
              class="text-center"
            ></Column>
            <Column
              field="ProduceDate"
              header="วันที่ผลิต"
              class="text-center"
            ></Column>
            <Column
              field="ProduceType"
              header="วิธีการผลิต"
              class="text-center"
            ></Column>
            <!-- <Column
              field="Staff"
              header="ผู้รับผิดชอบ"
              class="text-center"
            ></Column> -->
            <!-- <Column field="apply" header="นำไปใช้" class="text-center">
              <template #body="slotProps">
                <div v-if="slotProps.data.apply === 'ใช้แล้ว'">
                  <Tag
                    icon="pi pi-check pr-1"
                    severity="danger"
                    :value="slotProps.data.apply"
                  ></Tag>
                </div>
                <div v-else>
                  <Tag
                    icon="pi pi-box pr-1"
                    severity="success"
                    :value="slotProps.data.apply"
                  ></Tag>
                </div>
              </template>
            </Column> -->
            <Column header="จัดการ" class="text-center">
              <template #body="slotProp">
                <Button
                  icon="pi pi-eye"
                  @click="openShowModal(slotProp.data.EmbryoID)"
                  class="p-button-rounded p-button-text"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
    <!-- end main page -->
    <!-- Show Dialog -->
    <Dialog
      header="รายละเอียดทะเบียนตัวอ่อน"
      v-model:visible="displayShowModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <h1 class="text-2xl mt-2">ข้อมูลทั่วไปของตัวอ่อน</h1>
      <form class="grid">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เลขทะเบียนตัวอ่อน*
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder="-"
                v-model="data.detail.EmbryoNumber"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สถานะ
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder="-"
                v-model="data.detail.EmbryoStatus"
                readonly
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เลขทะเบียนพ่อพันธุ์*
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder="-"
                v-model="data.detail.MaleBreederID"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เลขทะเบียนแม่พันธุ์*
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder="-"
                v-model="data.detail.FemaleBreederID"
                readonly
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สายพันธุ์ที่ 1
              </label>
              <div v-if="data.detail.AnimalBreed1 != null">
                <InputText
                  type="text"
                  v-model="data.detail.AnimalBreed1.AnimalBreedName"
                  class="w-full"
                  placeholder="-"
                  readonly
                />
              </div>
              <div v-else>
                <InputText
                  type="text"
                  class="w-full"
                  placeholder="-"
                  readonly
                />
              </div>
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 1
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder="100%"
                v-model="data.detail.AnimalBreedPercent1"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สายพันธุ์ที่ 2
              </label>
              <div v-if="data.detail.AnimalBreed2 != null">
                <InputText
                  type="text"
                  v-model="data.detail.AnimalBreed2.AnimalBreedName"
                  class="w-full"
                  placeholder="-"
                  readonly
                />
              </div>
              <div v-else>
                <InputText
                  type="text"
                  class="w-full"
                  placeholder="-"
                  readonly
                />
              </div>
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 2
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder="-"
                v-model="data.detail.AnimalBreedPercent2"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สายพันธุ์ที่ 3
              </label>
              <div v-if="data.detail.AnimalBreed3 != null">
                <InputText
                  type="text"
                  v-model="data.detail.AnimalBreed3.AnimalBreedName"
                  class="w-full"
                  placeholder="-"
                  readonly
                />
              </div>
              <div v-else>
                <InputText
                  type="text"
                  class="w-full"
                  placeholder="-"
                  readonly
                />
              </div>
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 3
              </label>
              <InputText
                type="text"
                v-model="data.detail.AnimalBreedPercent3"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สายพันธุ์ที่ 4
              </label>
              <div v-if="data.detail.AnimalBreed4 != null">
                <InputText
                  type="text"
                  v-model="data.detail.AnimalBreed4.AnimalBreedName"
                  class="w-full"
                  placeholder="-"
                  readonly
                />
              </div>
              <div v-else>
                <InputText
                  type="text"
                  class="w-full"
                  placeholder="-"
                  readonly
                />
              </div>
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 4
              </label>
              <InputText
                type="text"
                v-model="data.detail.AnimalBreedPercent4"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สายพันธุ์ที่ 5
              </label>
              <div v-if="data.detail.AnimalBreed5 != null">
                <InputText
                  type="text"
                  v-model="data.detail.AnimalBreed5.AnimalBreedName"
                  class="w-full"
                  placeholder="-"
                  readonly
                />
              </div>
              <div v-else>
                <InputText
                  type="text"
                  class="w-full"
                  placeholder="-"
                  readonly
                />
              </div>
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 5
              </label>
              <InputText
                type="text"
                v-model="data.detail.AnimalBreedPercent5"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
          </div>
        </div>
      </form>

      <h1 class="text-2xl mt-2">รายละเอียดตัวอ่อน</h1>
      <form class="grid">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ประเภทแหล่งที่มาของตัวอ่อน</label
              >
              <InputText
                type="text"
                class="w-full"
                placeholder="-"
                v-model="data.detail.SourceType.SourceTypeName"
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
                placeholder="-"
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
            <!-- <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                แหล่งที่มา
              </label>
              <InputText type="text" class="w-full" placeholder="-" readonly />
            </div> -->
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผลิต
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder="-"
                v-model="data.detail.ProduceDate"
                readonly
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วิธีการผลิต
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder="-"
                v-model="data.detail.ProduceType"
                readonly
              />
            </div>

            <!-- <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เลขไอดีอ้างอิงวิธีเหนี่ยวนำการเป็นสัตว์
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder="FE15265"
                readonly
              />
            </div> -->
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อสถานะตัวอ่อน
              </label>
              <InputText
                type="text"
                class="w-full"
                v-model="data.detail.EmbryoStatus"
                placeholder="-"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ระยะตัวอ่อน
              </label>

              <InputText
                v-if="data.detail.EmbryoStage"
                v-model="data.detail.EmbryoStage.EmbryoStageName"
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
            <!-- <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เพศ
              </label>
              <InputText
                type="text"
                v-model="data.detail.EmbryoSex"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div> -->
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สีหลอด
              </label>
              <InputText
                type="text"
                v-model="data.detail.StrawColor"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                PlugColor
              </label>
              <InputText
                type="text"
                v-model="data.detail.PlugColor"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                Trypsinization
              </label>
              <InputText
                type="text"
                v-model="data.detail.Trypsinization"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ZonaIntact
              </label>
              <InputText
                type="text"
                v-model="data.detail.ZonaIntact"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                EmbryoManipulated
              </label>
              <InputText
                type="text"
                v-model="data.detail.EmbryoManipulated"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวนตัวในหลอด
              </label>
              <InputText
                type="text"
                v-model="data.detail.Amount"
                class="w-full"
                placeholder="-"
                readonly
              />
            </div>

            <!-- <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ผู้รับผิดชอบ
              </label>
              <InputText
                type="text"
                class="w-full"
                placeholder="คุณอานนท์ รักจักร"
                readonly
              />
            </div> -->
          </div>
        </div>
      </form>
    </Dialog>
    <!-- End Show Dialog -->
  </div>
</template>

<script>
// import { ref } from "vue";

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
        { label: "หน้าหลัก", to: "/" },
        { label: "สืบค้นทะเบียนตัวอ่อน", to: "/registration/embryo" },
      ],
      data: [],
      url: [],
      search: [],
      filtered: [],
      ProduceType: [
        {
          label: "INVIVO - ในร่างกายสัตว์",
          value: "INVIVO",
        },
        {
          label: "INVITRO - สิ่งแวดล้อมเทียม",
          value: "INVITRO",
        },
      ],
      isLoading: false,
      loading: false,
      sortField: "",
      sortOrder: "",
      curpage: 0,
      displayShowModal: false,

      //  cancel requests

      controller: new AbortController(),
    };
  },
  watch: {
    "search.EmbryoNumber"(val) {
      this.filtered.EmbryoNumber = val;
      this.load();
    },
    "search.ResponsibilityStaffID"(val) {
      // console.log(555);
      this.filtered.ResponsibilityStaffID = val;
      this.load();
    },
    "search.MaleBreederID"(val) {
      this.filtered.MaleBreederID = val;
      this.load();
    },
    "search.FemaleBreederID"(val) {
      this.filtered.FemaleBreederID = val;
      this.load();
    },
    "search.ProduceType"(val) {
      this.filtered.ProduceType = val;
      this.load();
    },
    "search.SourceTypeID"(val) {
      this.filtered.SourceTypeID = val;
      this.load();
    },
    "search.OrganizationID"(val) {
      this.filtered.OrganizationID = val;
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
      this.url.main = "/embryo";
      this.url.animal = "/animal";
      this.url.source_type = "/source-type";
      this.url.organization = "/organization/selection?includeAll=false";
      this.url.staff = "/staff?isActive=1";

      let url = this.url.main + "?size=15";

      if (this.filtered.EmbryoNumber) {
        url += "&EmbryoNumber=" + this.filtered.EmbryoNumber;
      }
      if (this.filtered.ProduceType) {
        url += "&ProduceType=" + this.filtered.ProduceType;
      }

      if (this.filtered.MaleBreederID) {
        url += "&MaleBreederID=" + this.filtered.MaleBreederID;
      }
      if (this.filtered.FemaleBreederID) {
        url += "&FemaleBreederID=" + this.filtered.FemaleBreederID;
      }
      if (this.filtered.SourceTypeID) {
        url += "&SourceTypeID=" + this.filtered.SourceTypeID;
      }
      if (this.filtered.OrganizationID) {
        url += "&SourceOrganizationID=" + this.filtered.OrganizationID;
      }
      if (this.filtered.ResponsibilityStaffID) {
        url += "&ResponsibilityStaffID=" + this.filtered.ResponsibilityStaffID;
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
        .get(this.url.staff, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.staff = res.data.rows.map((item) => {
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
        .get(this.url.animal, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.animal = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.main, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.dropdown = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(url, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.total = res.data.total;
          if (this.animal_id == 1) {
            this.data.data = res.data.rows.filter(
              (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
            );
          } else if (this.animal_id == 2) {
            this.data.data = res.data.rows.filter(
              (item) =>
                item.AnimalTypeID === 3 ||
                item.AnimalTypeID === 4 ||
                item.AnimalTypeID === 42
            );
          } else if (this.animal_id == 3) {
            this.data.data = res.data.rows.filter(
              (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
            );
          }

          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.data.data.length; i++) {
              this.data.data[i].show_id = i + 1;
              if (this.data.data[i].ProduceDate != null) {
                this.data.data[i].ProduceDate = dayjs(
                  this.data.data[i].ProduceDate
                )
                  .locale(locale)
                  .format("DD MMM BB");
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
          console.log(this.data.data);
          this.isLoading = false;
        });
    },
    openShowModal(id) {
      this.data.detail = this.data.data.find((item) => item.EmbryoID == id);
      // console.log( this.data.data)
      this.displayShowModal = true;

      // this.data.detail.StaffFullName =
      //   this.data.detail.Staff.StaffGivenName +
      //   " " +
      //   this.data.detail.Staff.StaffSurname;
      // let fatherStatus = "";

      // axios
      //   .get(this.data.main + "/" + this.data.detail.Animal.AnimalID, {
      //     signal: this.controller.signal,
      //   })
      //   .then((res) => {
      //     fatherStatus = res.data.AnimalStatus.AnimalStatusName;
      //     this.data.detail.FatherAnimalStatus = fatherStatus;
      //     // console.log(fatherStatus);
      //   })
      //   .finally(() => {
      //     this.isLoading = false;
      //   });
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
  setup() {
    // const breadcrumb = ref([
    //   { label: "ทะเบียน", to: "/" },
    //   { label: "ทะเบียนตัวอ่อน", to: "/registration/embryo" },
    // ]);
    // const data = reactive([
    //   {
    //     id: "1",
    //     code: "151523156",
    //     semen_id: "55265552",
    //     breeder_father: "F5551238",
    //     breeder_mother: "M89542232",
    //     organization: "หน่วยงานผสมเทียม โพธิ์ทอง",
    //     breed: "94.53125HF 1.5625SW",
    //     source: "ABOARD - ต่างประเทศ",
    //     date: "25/05/2565",
    //     production: "INVIVO - ในร่างกายสัตว์",
    //     personal: "คุณอานนท์ รักจักร",
    //   },
    //   {
    //     id: "2",
    //     code: "CS22152",
    //     semen_id: "55265552",
    //     breeder_father: "F5551238",
    //     breeder_mother: "M89542232",
    //     organization: "หน่วยงานผสมเทียม โพธิ์ทอง",
    //     breed: "94.53125HF 1.5625SW",
    //     source: "GOV - หน่วยงานภายในประเทศ",
    //     date: "25/05/2565",
    //     production: "INVIVO - ในร่างกายสัตว์",
    //     personal: "คุณอานนท์ รักจักร",
    //   },
    // ]);
    // const dateRange = ref();
    // const displayShowModal = ref(false);
    // const openShowModal = () => {
    //   displayShowModal.value = true;
    // };
    // const closeShowModal = () => {
    //   displayShowModal.value = false;
    // };
    // // const search = ref();
    // return {
    //   // data,
    //   dateRange,
    //   // search,
    //   // breadcrumb,
    //   displayShowModal,
    //   openShowModal,
    //   closeShowModal,
    // };
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
