<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="เตรียมแม่ตัวให้ (Donor ET)" :pages="breadcrumb" />
      <div class="card row col bg-primary pb-6">
        <h1 class="text-center text-white">ค้นหาเตรียมแม่ตัวให้ (Donor ET)</h1>
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
            <h1 class="text-2xl mb-0 text-600">
              รายการเตรียมแม่ตัวให้ (Donor ET)
            </h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <router-link to="/embryo/donor/add">
              <Button
                label="เพิ่ม Donor"
                icon="pi pi-plus"
                class="p-button-raised p-button-raised p-button-info"
              />
            </router-link>
          </div>
        </div>
        <DataTable
          v-if="animal_id != 3"
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
            field="AnimalEarID"
            header="หมายเลขสัตว์"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="AnimalName"
            header="ชื่อสัตว์"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="FarmName"
            header="ชื่อฟาร์ม"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column header="ใส่ CIDR-B" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity1"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="FSH" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity2"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="PG" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity3"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="ถอด CIDR-B" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity4"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="Standing Heat" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity5"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="AI1" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity6"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="AI2" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity7"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="AI3" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity8"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="เก็บตัวอ่อน" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity9"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>

          <Column
            field="IsExcludeName"
            header="สถานะ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ExcludeRemark"
            header="เหตุผลคัดออก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ThaiExcludeDate"
            header="วันที่คัดออก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ExcludeResponsibilityStaffID"
            header="เจ้าหน้าที่คัดออก"
            class="text-center"
            :sortable="true"
          >
          </Column>

          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <SplitButton
                label="บันทึกปฏิบัติงาน"
                icon="pi pi-pencil"
                @click="
                  open_detail(slotProps.data.DonorID, slotProps.data.AnimalID)
                "
                class="p-button-sm p-button-outlined p-button-warning"
                :model="
                  getItems(slotProps.data.DonorID, slotProps.data.AnimalID)
                "
              >
              </SplitButton>
            </template>
          </Column>
        </DataTable>

        <DataTable
          v-if="animal_id == 3"
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
            field="AnimalEarID"
            header="หมายเลขสัตว์"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="AnimalName"
            header="ชื่อสัตว์"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="FarmName"
            header="ชื่อฟาร์ม"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column header="ใส่ CIDR-G" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity1"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="FSH" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity2"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="PG" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity3"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="ถอด CIDR-G" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity4"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="Standing Heat" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity5"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="ผสม1" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity6"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="ผสม2" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity7"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="ผสม3" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity8"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>
          <Column header="เก็บตัวอ่อน" class="text-center" :sortable="true">
            <template #body="slotProp">
              <span
                v-for="item in slotProp.data.PresetActivity9"
                :key="item.id"
              >
                {{ item }} {{}}
              </span>
            </template>
          </Column>

          <!-- <Column
              field="Staff"
              header="เจ้าหน้าที่"
              class="text-center"
              :sortable="true"
            ></Column> -->
          <Column
            field="IsExcludeName"
            header="สถานะ"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ExcludeRemark"
            header="เหตุผลคัดออก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ThaiExcludeDate"
            header="วันที่คัดออก"
            class="text-center"
            :sortable="true"
          ></Column>
          <Column
            field="ExcludeResponsibilityStaffID"
            header="เจ้าหน้าที่คัดออก"
            class="text-center"
            :sortable="true"
          >
          </Column>

          <Column header="จัดการ" class="text-center">
            <template #body="slotProps">
              <SplitButton
                label="บันทึกปฏิบัติงาน"
                icon="pi pi-pencil"
                @click="
                  open_detail(slotProps.data.DonorID, slotProps.data.AnimalID)
                "
                class="p-button-sm p-button-outlined p-button-warning"
                :model="
                  getItems(slotProps.data.DonorID, slotProps.data.AnimalID)
                "
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
      header="เตรียมแม่ตัวให้ (Donor ET)"
      v-model:visible="displayDetail"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '60vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="grid surface-200 border-round-lg text-700 p-2">
            <div class="col-7 text-md">
              <span class="font-medium mr-3">หมายเลข</span
              >{{ this.animal.AnimalEarID }}
              {{ " (" + this.animal.AnimalName + ")" }}
            </div>
            <div class="col-5 text-md">
              <span class="font-medium mr-3">สถานะ</span>
              {{ this.AnimalStatusName }}
              <!-- {{ this.animal.AnimalStatus.AnimalStatusName }} -->
            </div>
            <div class="col-7 text-md">
              <span class="font-medium mr-3">สายพันธุ์</span>
              {{ this.animal.AnimalBreedAll }}
            </div>

            <div class="col-5 text-md">
              <span class="font-medium mr-3">อายุ</span
              >{{ this.animal.AnimalAge }}
            </div>

            <div class="col-12 text-md">
              <span class="font-medium mr-3">ฟาร์ม</span
              >{{ this.farm.FarmIdentificationNumber }} ,
              {{ this.farm.FarmName }}
            </div>
          </div>
        </div>
        <div class="col-12">
          <Button
            icon="pi pi-download"
            label="ดาวน์โหลด"
            class="p-button-success"
            @click="exportCSV($event)"
          />
        </div>
        <div class="col-12">
          <DataTable
            class="text-sm p-datatable-sm"
            :value="listActivity"
            :loading="isLoading"
            :rowHover="true"
            :exportable="true"
            ref="dt"
            :rowClass="rowClass"
            responsiveLayout="scroll"
          >
            <Column
              field="ActivityDate"
              header="วันที่ตามโปรแกรม"
              class="text-center"
            ></Column>
            <Column
              field="Time"
              header="เวลาตามโปรแกรม"
              class="text-center"
            ></Column>
            <!-- <Column field="Time" header="เวลา" class="text-center"></Column> -->
            <Column
              field="PresetActivity.PresetActivityName"
              header="กิจกรรม"
              class="text-center"
            ></Column>
            <Column
              field="Description"
              header="รายละเอียด"
              class="text-center"
            ></Column>
            <Column field="WorkActivityDate" header="วันที่ปฎิบัติการ (ว-ด-ป)">
              <template #body="slotProps">
                <div class="grid">
                  <div class="col-6">
                    <Calendar
                      dateFormat="dd-mm-yy"
                      class="p-inputtext-sm w-full"
                      v-model="slotProps.data.WorkActivityDate"
                      @date-select="
                        fillDate($event, slotProps.data.DonorActivityID)
                      "
                      autocomplete="off"
                    />
                  </div>
                  <div class="col-6">
                    <Calendar
                      class="p-inputtext-sm w-full"
                      v-model="slotProps.data.WorkTime"
                      @blur="fillTime($event, slotProps.data.DonorActivityID)"
                      :timeOnly="true"
                      hourFormat="24"
                    />
                  </div>
                </div>
              </template>
            </Column>
            <Column field="IsDone" header="ดำเนินการเรียบร้อย">
              <template #body="slotProps">
                <div class="field-checkbox flex justify-content-center">
                  <!-- <Checkbox id="done" v-model="form.check" /> -->
                  <Checkbox
                    :binary="true"
                    v-model="slotProps.data.IsDone"
                    @input="fillDone($event, slotProps.data.DonorActivityID)"
                  />
                </div>
              </template>
            </Column>
            <Column header="จัดการ" class="text-center">
              <template #body="slotProps">
                <!-- <SplitButton
                  v-if="slotProps.data.check"
                  label="เพิ่มข้อมูล"
                  icon="pi pi-pencil"
                  @click="open_edit(slotProps.data.DonorActivityID)"
                  class="p-button-sm p-button-outlined p-button-warning"
                >
                </SplitButton> -->
                <Button
                  v-if="slotProps.data.check"
                  label="เพิ่มรายละเอียด"
                  icon="pi pi-edit"
                  iconPos="right"
                  class="p-button-sm p-button-outlined p-button-warning"
                  @click="open_update(slotProps.data.DonorActivityID)"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </form>
    </Dialog>
    <!-- End Details Dialog -->
    <!-- Start Delete Dialog -->
    <Dialog
      header="การคัดออก"
      v-model:visible="displaydelete"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เหตุผลการคัดออก</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="formData.ExcludeRemark"
                :class="{ 'p-invalid': !formData.ExcludeRemark && valid }"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่คัดออก</label
              >
              <Calendar
                class="w-full"
                :showButtonBar="true"
                :showIcon="true"
                :touchUI="true"
                v-model="formData.ExcludeDate"
                :class="{ 'p-invalid': !formData.ExcludeDate && valid }"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เจ้าหน้าที่ผู้รับผิดชอบการคัดออก
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
                v-model="formData.ExcludeResponsibilityStaffID"
                :class="{
                  'p-invalid': !formData.ExcludeResponsibilityStaffID && valid,
                }"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="close_delete()"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="exclude()"
          />
        </div>
      </form>
    </Dialog>
    <!-- End Delete Dialog -->
    <!-- Goat Dialog -->
    <Dialog
      header="เพิ่มข้อมูล"
      v-model:visible="displayUpdateModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="col-12 lg:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                วิธีการผสม</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกวิธีการผสม"
                optionLabel="name"
                optionValue="val"
                v-model="form.GoatAIMethodID"
                @change="methodGoat($event)"
                :options="GoatAIMethodID"
                :class="{
                  'p-invalid': !form.GoatAIMethodID && valid,
                }"
              />
            </div>
            <div
              class="col-12 lg:col-12 mt-2"
              v-if="checkMethod == 1 || checkMethod == 2"
            >
              <label class="block text-600 text-sm font-bold mb-2">
                พ่อพันธุ์</label
              >
              <Dropdown
                :virtualScrollerOptions="{ itemSize: 38 }"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกพ่อพันธุ์"
                optionLabel="Fullname"
                optionValue="AnimalID"
                v-model="form.BreederAnimalID"
                :options="FatherAnimal"
                :filter="true"
                :class="{
                  'p-invalid': !form.BreederAnimalID && valid,
                }"
              />
            </div>
            <div class="col-12 lg:col-6 mt-2" v-if="checkMethod == 4">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวนครั้งที่ผสม (ครั้ง)</label
              >
              <InputText
                v-model="form.InseminationTime"
                class="w-full"
                text="number"
                :class="{
                  'p-invalid': !form.InseminationTime && valid,
                }"
                readonly
              />
            </div>
            <div class="col-12 lg:col-6 mt-2" v-if="checkMethod == 3">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวนครั้งที่ผสม (ครั้ง)</label
              >
              <InputText
                v-model="form.InseminationTime"
                class="w-full"
                :class="{
                  'p-invalid': !form.InseminationTime && valid,
                }"
              />
            </div>

            <div
              class="col-12 lg:col-6 mt-2"
              v-if="checkMethod == 3 || checkMethod == 4"
            >
              <label class="block text-600 text-sm font-bold mb-2">
                น้ำเชื้อ</label
              >
              <Dropdown
                :virtualScrollerOptions="{ itemSize: 38 }"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกน้ำเชื้อ"
                optionLabel="SemenNumber"
                optionValue="SemenID"
                v-model="data.SemenID"
                :options="Semen"
                :filter="true"
                :class="{
                  'p-invalid': !data.SemenID && valid,
                }"
              />
            </div>

            <h5 class="col-12" v-if="this.form.InseminationTime > 0">
              ผสมครั้งที่ 1
            </h5>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 0">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผสมครั้งที่ 1</label
              >
              <Calendar
                v-model="form.AIDate1"
                dateFormat="dd/mm/yy"
                :showButtonBar="true"
                :showIcon="true"
                :touchUI="true"
                class="w-full"
                :class="{
                  'p-invalid': !form.AIDate1 && valid,
                }"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 0">
              <label class="block text-600 text-sm font-bold mb-2">
                เวลาที่ผสมครั้งที่ 1</label
              >
              <Calendar
                class="w-full"
                v-model="form.AITime1"
                placeholder="เลือกเวลา"
                :showTime="true"
                :timeOnly="true"
              />
            </div>

            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 0">
              <label class="block text-600 text-sm font-bold mb-2">
                ชุดน้ำเชื้อ</label
              >
              <Calendar
                class="w-full"
                dateFormat="dd/mm/yy"
                :showButtonBar="true"
                :showIcon="true"
                :touchUI="true"
                v-model="form.SemenLot1"
                :class="{ 'p-invalid': !form.SemenLot1 && valid }"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 0">
              <label class="block text-600 text-sm font-bold mb-2">
                ปริมาณเมือก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปริมาณเมือก"
                optionLabel="label"
                optionValue="val"
                v-model="form.MucilageQuantity1"
                :options="MucilageQuantity"
                :class="{
                  'p-invalid': !form.MucilageQuantity1 && valid,
                }"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 0">
              <label class="block text-600 text-sm font-bold mb-2">
                สีของเมือก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปริมาณเมือก"
                optionLabel="label"
                optionValue="val"
                v-model="form.MucilageQuality1"
                :options="MucilageQuality"
                :class="{
                  'p-invalid': !form.MucilageQuality1 && valid,
                }"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 0">
              <label class="block text-600 text-sm font-bold mb-2">
                ปืนสอดลึก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปืนสอดลึก"
                optionLabel="GunDepthName"
                optionValue="GunDepthID"
                v-model="form.GunDepthID1"
                :options="GunDepth"
                :class="{
                  'p-invalid': !form.GunDepthID1 && valid,
                }"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 0">
              <label class="block text-600 text-sm font-bold mb-2">
                น้ำเชื้อเข้า</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกน้ำเชื้อเข้า"
                optionLabel="label"
                optionValue="val"
                v-model="form.SemenEnter1"
                :options="SemenEnter"
                :class="{
                  'p-invalid': !form.SemenEnter1 && valid,
                }"
              />
            </div>
            <h5 class="col-12" v-if="this.form.InseminationTime > 1">
              ผสมครั้งที่ 2
            </h5>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 1">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผสมครั้งที่ 2</label
              >
              <Calendar
                v-model="form.AIDate2"
                dateFormat="dd/mm/yy"
                class="w-full"
                :showButtonBar="true"
                :showIcon="true"
                :touchUI="true"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 1">
              <label class="block text-600 text-sm font-bold mb-2">
                เวลาที่ผสมครั้งที่ 2</label
              >

              <Calendar
                class="p-inputtext-sm w-full"
                v-model="form.AITime2"
                :timeOnly="true"
                hourFormat="24"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 1">
              <label class="block text-600 text-sm font-bold mb-2">
                ชุดน้ำเชื้อ</label
              >
              <Calendar
                class="w-full"
                dateFormat="dd/mm/yy"
                :showButtonBar="true"
                :showIcon="true"
                :touchUI="true"
                v-model="form.SemenLot2"
                :class="{ 'p-invalid': !form.SemenLot2 && valid }"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 1">
              <label class="block text-600 text-sm font-bold mb-2">
                ปริมาณเมือก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปริมาณเมือก"
                optionLabel="label"
                optionValue="val"
                v-model="form.MucilageQuantity2"
                :options="MucilageQuantity"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 1">
              <label class="block text-600 text-sm font-bold mb-2">
                สีของเมือก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปริมาณเมือก"
                optionLabel="label"
                optionValue="val"
                v-model="form.MucilageQuality2"
                :options="MucilageQuality"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 1">
              <label class="block text-600 text-sm font-bold mb-2">
                ปืนสอดลึก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปืนสอดลึก"
                optionLabel="GunDepthName"
                optionValue="GunDepthID"
                v-model="form.GunDepthID2"
                :options="GunDepth"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 1">
              <label class="block text-600 text-sm font-bold mb-2">
                น้ำเชื้อเข้า</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกน้ำเชื้อเข้า"
                optionLabel="label"
                optionValue="val"
                v-model="form.SemenEnter2"
                :options="SemenEnter"
              />
            </div>
            <h5 class="col-12" v-if="this.form.InseminationTime > 2">
              ผสมครั้งที่ 3
            </h5>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 2">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผสมครั้งที่ 3</label
              >
              <Calendar
                v-model="form.AIDate3"
                dateFormat="dd/mm/yy"
                class="w-full"
                :showButtonBar="true"
                :showIcon="true"
                :touchUI="true"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 2">
              <label class="block text-600 text-sm font-bold mb-2">
                เวลาที่ผสมครั้งที่ 3</label
              >
              <Calendar
                class="p-inputtext-sm w-full"
                v-model="form.AITime3"
                :timeOnly="true"
                hourFormat="24"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 2">
              <label class="block text-600 text-sm font-bold mb-2">
                ชุดน้ำเชื้อ</label
              >
              <Calendar
                class="w-full"
                dateFormat="dd/mm/yy"
                :showButtonBar="true"
                :showIcon="true"
                :touchUI="true"
                v-model="form.SemenLot3"
                :class="{ 'p-invalid': !form.SemenLot3 && valid }"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 2">
              <label class="block text-600 text-sm font-bold mb-2">
                ปริมาณเมือก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปริมาณเมือก"
                optionLabel="label"
                optionValue="val"
                v-model="form.MucilageQuantity3"
                :options="MucilageQuantity"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 2">
              <label class="block text-600 text-sm font-bold mb-2">
                สีของเมือก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปริมาณเมือก"
                optionLabel="label"
                optionValue="val"
                v-model="form.MucilageQuality3"
                :options="MucilageQuality"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 2">
              <label class="block text-600 text-sm font-bold mb-2">
                ปืนสอดลึก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปืนสอดลึก"
                optionLabel="GunDepthName"
                optionValue="GunDepthID"
                v-model="form.GunDepthID3"
                :options="GunDepth"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 2">
              <label class="block text-600 text-sm font-bold mb-2">
                น้ำเชื้อเข้า</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกน้ำเชื้อเข้า"
                optionLabel="label"
                optionValue="val"
                v-model="form.SemenEnter3"
                :options="SemenEnter"
              />
            </div>
            <h5 class="col-12" v-if="this.form.InseminationTime > 3">
              ผสมครั้งที่ 4
            </h5>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 3">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผสมครั้งที่ 4</label
              >
              <Calendar
                v-model="form.AIDate4"
                dateFormat="dd/mm/yy"
                class="w-full"
                :showButtonBar="true"
                :showIcon="true"
                :touchUI="true"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 3">
              <label class="block text-600 text-sm font-bold mb-2">
                เวลาที่ผสมครั้งที่ 4</label
              >

              <Calendar
                class="p-inputtext-sm w-full"
                v-model="form.AITime4"
                :timeOnly="true"
                hourFormat="24"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 3">
              <label class="block text-600 text-sm font-bold mb-2">
                ชุดน้ำเชื้อ</label
              >
              <Calendar
                class="w-full"
                dateFormat="dd/mm/yy"
                :showButtonBar="true"
                :showIcon="true"
                :touchUI="true"
                v-model="form.SemenLot4"
                :class="{ 'p-invalid': !form.SemenLot4 && valid }"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 3">
              <label class="block text-600 text-sm font-bold mb-2">
                ปริมาณเมือก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปริมาณเมือก"
                optionLabel="label"
                optionValue="val"
                v-model="form.MucilageQuantity4"
                :options="MucilageQuantity"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 3">
              <label class="block text-600 text-sm font-bold mb-2">
                สีของเมือก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปริมาณเมือก"
                optionLabel="label"
                optionValue="val"
                v-model="form.MucilageQuality4"
                :options="MucilageQuality"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 3">
              <label class="block text-600 text-sm font-bold mb-2">
                ปืนสอดลึก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปืนสอดลึก"
                optionLabel="GunDepthName"
                optionValue="GunDepthID"
                v-model="form.GunDepthID4"
                :options="GunDepth"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 3">
              <label class="block text-600 text-sm font-bold mb-2">
                น้ำเชื้อเข้า</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกน้ำเชื้อเข้า"
                optionLabel="label"
                optionValue="val"
                v-model="form.SemenEnter4"
                :options="SemenEnter"
              />
            </div>
            <h5 class="col-12" v-if="this.form.InseminationTime > 4">
              ผสมครั้งที่ 5
            </h5>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 4">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผสมครั้งที่ 5</label
              >

              <Calendar
                v-model="form.AIDate5"
                dateFormat="dd/mm/yy"
                class="w-full"
                :showButtonBar="true"
                :showIcon="true"
                :touchUI="true"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 4">
              <label class="block text-600 text-sm font-bold mb-2">
                เวลาที่ผสมครั้งที่ 5</label
              >

              <Calendar
                class="p-inputtext-sm w-full"
                v-model="form.AITime5"
                :timeOnly="true"
                hourFormat="24"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 4">
              <label class="block text-600 text-sm font-bold mb-2">
                ชุดน้ำเชื้อ</label
              >
              <Calendar
                class="w-full"
                :showButtonBar="true"
                :showIcon="true"
                :touchUI="true"
                v-model="form.SemenLot5"
                :class="{ 'p-invalid': !form.SemenLot5 && valid }"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 4">
              <label class="block text-600 text-sm font-bold mb-2">
                ปริมาณเมือก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปริมาณเมือก"
                optionLabel="label"
                optionValue="val"
                v-model="form.MucilageQuantity5"
                :options="MucilageQuantity"
              />
            </div>
            <div class="col-12 lg:col-4" v-if="this.form.InseminationTime > 4">
              <label class="block text-600 text-sm font-bold mb-2">
                สีของเมือก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปริมาณเมือก"
                optionLabel="label"
                optionValue="val"
                v-model="form.MucilageQuality5"
                :options="MucilageQuality"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 4">
              <label class="block text-600 text-sm font-bold mb-2">
                ปืนสอดลึก</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกปืนสอดลึก"
                optionLabel="GunDepthName"
                optionValue="GunDepthID"
                v-model="form.GunDepthID5"
                :options="GunDepth"
              />
            </div>
            <div class="col-12 lg:col-6" v-if="this.form.InseminationTime > 4">
              <label class="block text-600 text-sm font-bold mb-2">
                น้ำเชื้อเข้า</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกน้ำเชื้อเข้า"
                optionLabel="label"
                optionValue="val"
                v-model="form.SemenEnter5"
                :options="SemenEnter"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="close_goat()"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="saveGoat()"
          />
        </div>
      </form>
    </Dialog>
    <!-- End Add Dialog -->
    <!-- Cow Dialog -->
    <Dialog
      header="เพิ่มข้อมูลน้ำเชื้อ"
      v-model:visible="displayUpdateCowModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="col-12 lg:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                น้ำเชื้อ</label
              >
              <Dropdown
                :virtualScrollerOptions="{ itemSize: 38 }"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกน้ำเชื้อ"
                optionLabel="SemenNumber"
                optionValue="SemenID"
                v-model="data.SemenID"
                :options="Semen"
                :filter="true"
                :class="{
                  'p-invalid': !data.SemenID && valid,
                }"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeCowModal()"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="updatesemen()"
          />
        </div>
      </form>
    </Dialog>
    <!-- End Cow Dialog -->
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      user: "user",
    }),
  },
  setup() {
    const breadcrumb = ref([
      { label: "ระบบย้ายฝากตัวอ่อน", to: "/embryo" },
      { label: "เตรียมแม่ตัวให้ (Donor ET)", to: "" },
    ]);

    const displayDetail = ref(false);
    const displaydelete = ref(false);

    const openDisplayDetail = () => {
      displayDetail.value = true;
    };

    const closeDisplayDetail = () => {
      displayDetail.value = false;
    };

    const opendisplaydelete = () => {
      displaydelete.value = true;
    };

    const closeConfirmation = () => {
      displaydelete.value = false;
    };
    const date_range = ref();

    return {
      date_range,
      breadcrumb,
      displaydelete,
      opendisplaydelete,
      displayDetail,
      openDisplayDetail,
      closeDisplayDetail,
      closeConfirmation,
    };
  },
  data() {
    return {
      url: "/preset",
      urlDetail: "/preset-detail",
      apiPersonal: "/staff?isActive=1",
      apiOrganizationID: "/organization?isActive=1",
      apiActivity: "/preset-activity?isActive=1",
      apiDonorActivity: "/donor-activity/find-donor",
      apiDetailActivity: "/donor-activity",
      apiAnimal: "/animal",
      apiSemen: "/semen",
      apiEstral: "/goat-estral-activity",
      apiGunDepth: "/gun-depth",
      data: [],
      formData: {},
      GoatAIMethodID: [
        {
          val: "Buck",
          name: "ผสมพันธุ์โดยใช้พ่อพันธุ์ (Buck)",
        },
        {
          val: "VAI",
          name: "ผสมเทียมโดยการเหนี่ยวนำ (V-AI)",
        },
        {
          val: "LAI",
          name: "ผสมเทียมโดยผ่าตัดผ่านช่องท้อง (L-AI)",
        },
      ],
      GunDepth: null,
      Estral: null,
      MucilageQuantity: [
        {
          val: 1,
          label: "มาก",
        },
        {
          val: 2,
          label: "น้อย",
        },
      ],
      MucilageQuality: [
        {
          val: 1,
          label: "ขุ่น",
        },
        {
          val: 2,
          label: "ใส",
        },
      ],
      SemenEnter: [
        {
          val: 1,
          label: "100%",
        },
        {
          val: 2,
          label: "ย้อนกลับ",
        },
      ],
      isLoading: false,
      valid: false,
      search: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      form: {},

      formDay: [],
      PresetFor: [
        {
          id: "D",
          name: "ตัวให้ (Donor)",
        },
        {
          id: "R",
          name: "ตัวรับ (Recipient)",
        },
      ],
      personal: [],
      organization: [],
      activity: [],
      animaltype: [],
      checkMethod: 0,

      FatherAnimal: [],
      animal: [],
      DonorActivityID: null,
      items: [],
      farm: [],
      AnimalStatusName: "",
      listActivity: [
        {
          check: false,
        },
      ],
      day: [
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 },
        { name: 5 },
        { name: 6 },
        { name: 7 },
        { name: 8 },
        { name: 9 },
        { name: 10 },
        { name: 11 },
        { name: 12 },
        { name: 13 },
        { name: 14 },
        { name: 15 },
        { name: 16 },
        { name: 17 },
        { name: 18 },
        { name: 19 },
        { name: 20 },
        { name: 21 },
        { name: 22 },
        { name: 23 },
        { name: 24 },
        { name: 25 },
        { name: 26 },
        { name: 27 },
        { name: 28 },
        { name: 29 },
        { name: 30 },
        { name: 31 },
      ],
      params: { orderByField: "DonorID", orderBy: "desc" },
      status: [
        { name: "เปิดใช้งาน", key: "A", value: 1 },
        { name: "ปิดใช้งาน", key: "B", value: 0 },
      ],
      setting: [
        {
          id: 1,
        },
      ],
      getAnimalID: null,
      codeProgram: "",
      nameProgram: "",
      forProgram: "",
      Semen: null,
      presetDetail: [],
      getItemDelete: [],
      controller: new AbortController(),

      value: null,
      // Modal
      display_add: false,
      display_edit: false,
      display_delete: false,
      displayUpdateModal: false,
      displayUpdateCowModal: false,
    };
  },
  mounted() {
    this.load();
    axios
      .get(this.apiPersonal, {
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

    axios
      .get(this.apiSemen, { signal: this.controller.signal })
      .then((response) => {
        if (this.animal_id == 1) {
          this.Semen = response.data.rows.filter(
            (item) => item.AnimalTypeID === 1 || item.AnimalTypeID === 2
          );
        } else if (this.animal_id == 2) {
          this.Semen = response.data.rows.filter(
            (item) => item.AnimalTypeID === 3 || item.AnimalTypeID === 4
          );
        } else if (this.animal_id == 3) {
          this.Semen = response.data.rows.filter(
            (item) => item.AnimalTypeID === 17 || item.AnimalTypeID === 18
          );
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
    axios
      .get(this.apiEstral, { signal: this.controller.signal })
      .then((response) => {
        this.Estral = response.data.rows;
        // dayjs.extend(buddhistEra);
      })
      .finally(() => {
        this.isLoading = false;
      });
    axios
      .get(this.apiGunDepth, { signal: this.controller.signal })
      .then((response) => {
        this.GunDepth = response.data.rows;
        // dayjs.extend(buddhistEra);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  watch: {
    // ค้นหา
    "form.GoatAIMethodID"() {
      if (this.form.GoatAIMethodID == "NI") {
        this.form.InseminationTime = 0;
        this.checkMethod = 1;
      } else if (this.form.GoatAIMethodID == "Buck") {
        this.form.InseminationTime = 0;
        this.checkMethod = 2;
      } else if (this.form.GoatAIMethodID == "VAI") {
        this.checkMethod = 3;
        this.form.InseminationTime = 2;
      } else if (this.form.GoatAIMethodID == "LAI") {
        this.checkMethod = 4;
        this.form.InseminationTime = 1;
      }
    },
  },
  methods: {
    load() {
      if (this.animal_id == 1) {
        this.apiDonorActivity += "?AnimalTypeID=[1,2]";
      } else if (this.animal_id == 2) {
        this.apiDonorActivity += "?AnimalTypeID=[3,4]";
      } else if (this.animal_id == 3) {
        this.apiDonorActivity += "?AnimalTypeID=[17,18]";
      }

      axios
        .get(this.apiDonorActivity, {
          params: this.params,
          signal: this.controller.signal,
        })
        .then((response) => {
          this.data = response.data.rows;
          // dayjs.extend(buddhistEra);
          for (let i = 0; i < this.data.length; i++) {
            // this.data[i].show_id = i + 1;

            if (this.data[i].IsDone == 1) {
              this.data[i].IsDone = true;
            } else {
              this.data[i].IsDone = false;
            }
          }

          this.apiDonorActivity = "/donor-activity/find-donor";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getItems(donorid, animalid) {
      const items = [
        {
          label: "คัดออก",
          icon: "pi pi-trash",
          command: () => {
            this.open_delete(donorid, animalid);
          },
        },
        {
          label: "นำกลับ",
          icon: "pi pi-undo",
          command: () => {
            this.undo(donorid, animalid);
          },
        },
      ];
      return items;
    },
    rowClass(data) {
      return data.done ? "done" : "pending";
    },
    // เปิดรายการปฏิบัติงาน
    open_detail(donorid, animalid) {
      axios
        .get(
          this.apiDetailActivity +
            "?DonorID=" +
            donorid +
            "&AnimalID=" +
            animalid,
          {
            signal: this.controller.signal,
          }
        )
        .then((response) => {
          this.listActivity = response.data.rows.sort(function (a, b) {
            var c = new Date(a.ActivityDate);
            var d = new Date(b.ActivityDate);
            return c - d;
          });
          dayjs.extend(buddhistEra);
          for (let i = 0; i < this.listActivity.length; i++) {
            this.listActivity[i].show_id = i + 1;
            this.getAnimalID = this.listActivity[i].AnimalID;

            this.listActivity[i].Time = this.listActivity[i].Time.substring(
              0,
              5
            );

            if (this.listActivity[i].IsDone == 1) {
              this.listActivity[i].IsDone = true;
            } else {
              this.listActivity[i].IsDone = false;
            }

            if (this.listActivity[i].ActivityDate != null) {
              // this.listActivity[i].ActivityDate = dayjs(
              //   this.listActivity[i].ActivityDate
              // ).format("DD/MM/YY");
              // // this.listActivity[i].ActivityDate = dayjs(
              //   this.listActivity[i].ActivityDate
              // ).format("DD/MM/YY");
            }

            if (
              this.listActivity[i].PresetActivity.PresetActivityName == "AI1" ||
              this.listActivity[i].PresetActivity.PresetActivityName == "AI2" ||
              this.listActivity[i].PresetActivity.PresetActivityName == "AI3" ||
              this.listActivity[i].PresetActivity.PresetActivityName ==
                "ผสม1" ||
              this.listActivity[i].PresetActivity.PresetActivityName ==
                "ผสม2" ||
              this.listActivity[i].PresetActivity.PresetActivityName == "ผสม3"
            ) {
              this.listActivity[i].check = true;
            } else {
              this.listActivity[i].check = false;
            }
          }

          axios
            .get(this.apiAnimal + "?AnimalID=" + this.getAnimalID, {
              signal: this.controller.signal,
            })
            .then((res) => {
              this.animal = res.data.rows[0];
              this.AnimalStatusName = this.animal.AnimalStatus.AnimalStatusName;
              this.farm = this.animal.AnimalFarm;
            });

          this.displayDetail = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // เปิดการเพิ่มรายละเอียดน้ำเชื้อ
    open_update(id) {
      if (id) {
        this.DonorActivityID = id;
        let temp = this.listActivity.find((x) => x.DonorActivityID == id);
        if (temp) {
          // console.log(temp.SemenID);

          this.form = temp;
          this.data.SemenID = temp.SemenID;
        }
      }

      if (this.animal_id == 3) {
        axios
          .get(this.apiAnimal + "?AnimalTypeID=[17,18]&AnimalStatusID=14", {
            signal: this.controller.signal,
          })
          .then((response) => {
            this.FatherAnimal = response.data.rows;

            for (let i = 0; i < this.FatherAnimal.length; i++) {
              this.FatherAnimal[i].Fullname =
                this.FatherAnimal[i].AnimalEarID +
                ", " +
                this.FatherAnimal[i].AnimalName;
            }

            // console.log(this.FatherAnimal);
            // dayjs.extend(buddhistEra);
          })
          .finally(() => {
            this.isLoading = false;
          });

        this.displayUpdateModal = true;
      } else {
        this.displayUpdateCowModal = true;
      }
    },
    // เปิด modal คัดออก
    open_delete(donorid, animalid) {
      this.formData.ExcludeResponsibilityStaffID = this.user.StaffID;
      this.form.donorid = donorid;
      this.form.animalid = animalid;

      this.displaydelete = true;
    },
    undo(donorid, animalid) {
      // console.log(animalid);
      this.formData.AnimalID = animalid;
      axios
        .put("/donor-activity/include-donor/" + donorid, this.formData)
        .then(() => {
          this.data.SemenID = null;
          this.formData = {};
          this.load();
          this.close_delete();

          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "นำกลับสำเร็จ",
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
    },
    // ปิด modal คัดออก
    close_delete() {
      this.displaydelete = false;
    },
    close_cow() {
      this.displayUpdateCowModal = false;
    },
    // คัดออก
    exclude() {
      // this.form.id
      let id = this.data.find(
        (x) =>
          x.DonorID == this.form.donorid && x.AnimalID == this.form.animalid
      );

      this.formData.IsExclude = 1;
      this.formData.AnimalID = id.AnimalID;

      axios
        .put(
          "/donor-activity/exclude-donor/" + this.form.donorid,
          this.formData
        )
        .then(() => {
          this.data.SemenID = null;
          this.formData = {};
          this.load();
          this.close_delete();

          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "คัดออกสำเร็จ",
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

      // this.formData.AnimalID =
    },
    // ลงวันที่
    fillDate($event, $id) {
      this.form = {
        WorkActivityDate: $event,
      };
      axios
        .put(this.apiDetailActivity + "/" + $id, this.form)
        .then(() => {})
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },
    // ลงเวลา
    fillTime($event, $id) {
      // console.log($event);
      this.form = {
        WorkTime: $event.value,
      };

      // console.log(this.form);
      axios
        .put(this.apiDetailActivity + "/" + $id, this.form)
        .then(() => {})
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },
    // สถานะการปฏิบัติงาน
    fillDone($event, $id) {
      this.form = {
        IsDone: $event,
      };
      axios
        .put(this.apiDetailActivity + "/" + $id, this.form)
        .then(() => {})
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });
    },
    // Excel
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    // สำหรับโคและ กระบือ
    updatesemen() {
      let data = {
        SemenID: this.data.SemenID,
      };

      axios
        .put(this.apiDetailActivity + "/" + this.DonorActivityID, data)
        .then(() => {
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มข้อมูลสำเร็จ",
            life: 5000,
          });
          this.displayUpdateCowModal = false;
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
    // วิะีการของแพะ
    methodGoat($event) {
      // console.log($event);
      this.checkMethod = $event.value;
      // console.log(this.checkMethod);

      if ($event.value == "NI") {
        this.form.InseminationTime = 0;
        this.checkMethod = 1;
      } else if ($event.value == "Buck") {
        this.form.InseminationTime = 0;
        this.checkMethod = 2;
      } else if ($event.value == "VAI") {
        this.checkMethod = 3;
        this.form.InseminationTime = 2;
      } else if ($event.value == "LAI") {
        this.checkMethod = 4;
        this.form.InseminationTime = 1;
      }
    },
    saveGoat() {
      // console.log(this.value);
      // console.log(this.form.WorkTime);
      // console.log(this.DonorActivityID);
      // console.log(this.apiDetailActivity + "/" + this.DonorActivityID);
      // console.log(typeof this.form.AITime1);

      this.form.AITime1
        ? (this.form.AITime1 = dayjs(this.form.AITime1).format("HH:mm:ss"))
        : null;
      this.form.AITime2
        ? (this.form.AITime2 = dayjs(this.form.AITime2).format("HH:mm:ss"))
        : null;
      this.form.AITime3
        ? (this.form.AITime3 = dayjs(this.form.AITime3).format("HH:mm:ss"))
        : null;
      this.form.AITime4
        ? (this.form.AITime4 = dayjs(this.form.AITime4).format("HH:mm:ss"))
        : null;
      this.form.AITime5
        ? (this.form.AITime5 = dayjs(this.form.AITime5).format("HH:mm:ss"))
        : null;

      if (this.form.AITime1 === "Invalid Date") {
        delete this.form.AITime1;
      }
      if (this.form.AITime2 === "Invalid Date") {
        delete this.form.AITime2;
      }
      if (this.form.AITime3 === "Invalid Date") {
        delete this.form.AITime3;
      }
      if (this.form.AITime4 === "Invalid Date") {
        delete this.form.AITime4;
      }
      if (this.form.AITime5 === "Invalid Date") {
        delete this.form.AITime5;
      }

      // console.log(this.form.AITime1);

      // console.log(this.form);

      axios
        .put(this.apiDetailActivity + "/" + this.DonorActivityID, this.form)
        .then(() => {
          // console.log(res);

          this.form = {};
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "เพิ่มข้อมูลสำเร็จ",
            life: 5000,
          });
          this.displayUpdateModal = false;
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
    close_goat() {
      this.displayUpdateModal = false;
    },

    closeCowModal() {
      this.displayUpdateCowModal = false;
    },
  },
};
</script>

<style scoped>
::v-deep(.done) {
  background-color: rgba(34, 197, 94, 0.2) !important;
}
</style>
