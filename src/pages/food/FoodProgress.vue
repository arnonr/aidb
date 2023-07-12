//Ref -> 1.2.5 เมนูคลอด
<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="การจัดเก็บข้อมูลการขุน/อาหาร" :pages="breadcrumb" />
      <div class="card">
        <div class="grid align-items-center">
          <div class="col-12 md:col-6 lg:col-4 xl:col-8">
            <h1 class="text-2xl mb-0 text-600">
              รายงานความคืบหน้าของ {{ data.AnimalIdentificationID }}
              {{ data.AnimalName }}
            </h1>
          </div>
          <div
            class="col-12 md:col-6 lg:col-8 xl:col-4 md:text-right mt-2 sm:mt-0"
          >
            <router-link to="/activity/food/tmr">
              <Button label="สูตร TMR" class="p-button-text mr-2" />
            </router-link>
            <Button
              label="เพิ่มข้อมูลความคืบหน้า"
              icon="pi pi-plus"
              @click="openAdd"
            />
          </div>
        </div>
        <div class="mt-5">
          <DataTable
            class="text-sm"
            :value="detail"
            dataKey="id"
            :loading="isLoading"
            @sort="sort($event)"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            responsiveLayout="scroll"
          >
            <Column field="show_id" header="ลำดับ" class="text-center"></Column>
            <Column
              field="FeedProgramID"
              header="รหัสโปรแกรมเข้าขุน"
              class="text-center"
            ></Column>
            <Column
              field="WeightDate"
              header="วันที่ชั่งน้ำหนัก"
              class="text-center"
            >
            </Column>
            <Column
              field="Weight"
              header="น้ำหนัก (กก.) "
              class="text-center"
            ></Column>
            <Column
              field="Height"
              header="ส่วนสูง (ซม.)"
              class="text-center"
            ></Column>
            <Column
              field="Length"
              header="ความยาวลำตัว (ซม.)"
              class="text-center"
            ></Column>
            <Column
              field="CrossSectionalArea"
              header="พื้นที่หน้าตัดสันหลัง (ซม.)"
              class="text-center"
            >
            </Column>
            <Column
              field="TotalQuantity"
              header="ปริมาณอาหาร/วัน (กก.)"
              class="text-center"
            ></Column>
            <Column
              field="TMRFormulaID"
              header="สูตร TMR"
              class="text-center"
            ></Column>
            <Column
              field="TotalTMR"
              header="ปริมาณอาหาร TMR/วัน (กก.)"
              class="text-center"
            ></Column>
            <Column
              field="Roughages"
              header="รหัสอ้างอิงอาหารหยาบ"
              class="text-center"
            >
              <template #body="slotProps">
                {{ formatArray(slotProps.data.Roughages) }}
              </template>
            </Column>
            <Column
              field="TotalRoughages"
              header="ปริมาณอาหารหยาบ/วัน (กก.)"
              class="text-center"
            ></Column>
            <Column
              field="Concentrates"
              header="รหัสอ้างอิงอาหารข้น"
              class="text-center"
            >
              <template #body="slotProps">
                {{ formatArray(slotProps.data.Concentrates) }}
              </template>
            </Column>
            <Column
              field="TotalConcentrate"
              header="ปริมาณอาหารข้น/วัน (กก.)"
              class="text-center"
            ></Column>
            <Column
              field="ProgressRate"
              header="%ความสำเร็จ"
              class="text-center"
            ></Column>
            <Column
              field="ResponsibilityStaffID"
              header="เจ้าหน้าที่ที่รับผิดชอบ"
              class="text-center"
            >
            </Column>
            <Column header="จัดการ" class="text-center">
              <template #body="slotProps">
                <SplitButton
                  label="แก้ไข"
                  icon="pi pi-pencil"
                  @click="edit(slotProps.data.FeedProgramProgressID)"
                  class="p-button-sm p-button-outlined p-button-warning"
                  :model="getItems(slotProps.data.FeedProgramProgressID)"
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
    <!-- เพิ่มข้อมูลความคืบหน้าการขุน -->
    <Dialog
      v-model:visible="display_add"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <template #header>
        <div>
          <h3 class="mb-0 text-xl md:text-2xl font-normal text-indigo-800">
            เพิ่มข้อมูลความคืบหน้าการขุน/อาหาร
          </h3>
          <h6 class="mb-0 mt-2 text-sm md:text-base font-normal text-400">
            รายละเอียดกข้อมูลความคืบหน้าการขุน/อาหาร
          </h6>
        </div>
      </template>

      <form>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <label
              for="FeedProgramID"
              class="block text-600 text-sm font-bold mb-2"
              >รหัสอ้างอิงโปรแกรมเข้าขุน</label
            >
            <InputNumber
              class="w-full"
              id="FeedProgramID"
              mode="decimal"
              v-model="form.FeedProgramID"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="WeightDate"
              class="block text-600 text-sm font-bold mb-2"
              >วันที่ชั่งน้ำหนัก</label
            >
            <Calendar
              class="w-full"
              id="WeightDate"
              v-model="form.WeightDate"
              :showIcon="true"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label for="Weight" class="block text-600 text-sm font-bold mb-2"
              >น้ำหนัก (กก.)</label
            >
            <InputNumber
              class="w-full"
              id="Weight"
              mode="decimal"
              v-model="form.Weight"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label for="Height" class="block text-600 text-sm font-bold mb-2"
              >ส่วนสูง (ซม.)</label
            >
            <InputNumber
              class="w-full"
              id="Height"
              mode="decimal"
              v-model="form.Height"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label for="Length" class="block text-600 text-sm font-bold mb-2"
              >ความยาวลำตัว (ซม.)</label
            >
            <InputNumber
              class="w-full"
              id="Length"
              mode="decimal"
              v-model="form.Length"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="CrossSectionalArea"
              class="block text-600 text-sm font-bold mb-2"
              >พื้นที่หน้าตัดสันหลัง (ซม.)
            </label>
            <InputNumber
              class="w-full"
              id="CrossSectionalArea"
              mode="decimal"
              v-model="form.CrossSectionalArea"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="TotalQuantity"
              class="block text-600 text-sm font-bold mb-2"
              >ปริมาณอาหาร/วัน (กก.)</label
            >
            <InputNumber
              class="w-full"
              id="TotalQuantity"
              mode="decimal"
              v-model="form.TotalQuantity"
              :useGrouping="false"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <label
              for="TMRFormulaID"
              class="block text-600 text-sm font-bold mb-2"
              >สูตร TMR</label
            >
            <Dropdown
              v-model="tmrFormulaId"
              class="w-full"
              id="TMRFormulaID"
              optionLabel="name"
              :filter="true"
              :showClear="true"
              :options="tmrFormula"
              placeholder="ค้นหาสูตร TMR"
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
              for="TotalRoughages"
              class="block text-600 text-sm font-bold mb-2"
            >
              ปริมาณอาหารหยาบ/วัน (กก.)
            </label>
            <InputNumber
              class="w-full"
              id="TotalRoughages"
              mode="decimal"
              v-model="form.TotalRoughages"
              :useGrouping="false"
            />
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
            <label
              for="TotalConcentrate"
              class="block text-600 text-sm font-bold mb-2"
            >
              ปริมาณอาหารข้น/วัน (กก.)
            </label>
            <InputNumber
              class="w-full"
              id="TotalConcentrate"
              v-model="form.TotalConcentrate"
              mode="decimal"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="ProgressRate"
              class="block text-600 text-sm font-bold mb-2"
            >
              %ความสำเร็จ
            </label>
            <InputNumber
              class="w-full"
              id="ProgressRate"
              mode="decimal"
              v-model="form.ProgressRate"
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

    <!-- แก้ไขข้อมูลความคืบหน้าการขุน -->
    <Dialog
      v-model:visible="display_edit"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <template #header>
        <div>
          <h3 class="mb-0 text-xl md:text-2xl font-normal text-indigo-800">
            แก้ไขข้อมูลความคืบหน้าการขุน/อาหาร
          </h3>
          <h6 class="mb-0 mt-2 text-sm md:text-base font-normal text-400">
            รายละเอียดกข้อมูลความคืบหน้าการขุน/อาหาร
          </h6>
        </div>
      </template>

      <form>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <label
              for="FeedProgramID"
              class="block text-600 text-sm font-bold mb-2"
              >รหัสอ้างอิงโปรแกรมเข้าขุน</label
            >
            <InputNumber
              class="w-full"
              id="FeedProgramID"
              mode="decimal"
              v-model="form.FeedProgramID"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="WeightDate"
              class="block text-600 text-sm font-bold mb-2"
              >วันที่ชั่งน้ำหนัก</label
            >
            <Calendar
              class="w-full"
              id="WeightDate"
              v-model="form.WeightDate"
              :showIcon="true"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label for="Weight" class="block text-600 text-sm font-bold mb-2"
              >น้ำหนัก (กก.)</label
            >
            <InputNumber
              class="w-full"
              id="Weight"
              mode="decimal"
              v-model="form.Weight"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label for="Height" class="block text-600 text-sm font-bold mb-2"
              >ส่วนสูง (ซม.)</label
            >
            <InputNumber
              class="w-full"
              id="Height"
              mode="decimal"
              v-model="form.Height"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label for="Length" class="block text-600 text-sm font-bold mb-2"
              >ความยาวลำตัว (ซม.)</label
            >
            <InputNumber
              class="w-full"
              id="Length"
              mode="decimal"
              v-model="form.Length"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="CrossSectionalArea"
              class="block text-600 text-sm font-bold mb-2"
              >พื้นที่หน้าตัดสันหลัง (ซม.)
            </label>
            <InputNumber
              class="w-full"
              id="CrossSectionalArea"
              mode="decimal"
              v-model="form.CrossSectionalArea"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="TotalQuantity"
              class="block text-600 text-sm font-bold mb-2"
              >ปริมาณอาหาร/วัน (กก.)</label
            >
            <InputNumber
              class="w-full"
              id="TotalQuantity"
              mode="decimal"
              v-model="form.TotalQuantity"
              :useGrouping="false"
            />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <label
              for="TMRFormulaID"
              class="block text-600 text-sm font-bold mb-2"
              >สูตร TMR</label
            >
            <Dropdown
              v-model="tmrFormulaId"
              class="w-full"
              id="TMRFormulaID"
              optionLabel="name"
              :filter="true"
              :showClear="true"
              :options="tmrFormula"
              placeholder="ค้นหาสูตร TMR"
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
              for="TotalRoughages"
              class="block text-600 text-sm font-bold mb-2"
            >
              ปริมาณอาหารหยาบ/วัน (กก.)
            </label>
            <InputNumber
              class="w-full"
              id="TotalRoughages"
              mode="decimal"
              v-model="form.TotalRoughages"
              :useGrouping="false"
            />
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
            <label
              for="TotalConcentrate"
              class="block text-600 text-sm font-bold mb-2"
            >
              ปริมาณอาหารข้น/วัน (กก.)
            </label>
            <InputNumber
              class="w-full"
              id="TotalConcentrate"
              v-model="form.TotalConcentrate"
              mode="decimal"
              :useGrouping="false"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label
              for="ProgressRate"
              class="block text-600 text-sm font-bold mb-2"
            >
              %ความสำเร็จ
            </label>
            <InputNumber
              class="w-full"
              id="ProgressRate"
              mode="decimal"
              v-model="form.ProgressRate"
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
        {
          label: "การจัดเก็บข้อมูลการขุน/อาหาร",
          to: "/activity/food/progress",
        },
      ],
      selectedProducts: null,
      key: this.$route.params.id,
      url: [],
      detail: [],
      form: [],
      data: [],
      Staff: [],
      curpage: 0,
      formheader: "",
      sortField: "",
      sortOrder: "",
      isLoading: false,
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

    // console.log(this.key);
  },
  methods: {
    formatArray(value) {
      return value.toLocaleString();
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

      this.url.main = "/feed-program-progress";

      this.url.animal = "/animal/" + this.key;
      this.url.staff = "/staff";
      axios
        .get(this.url.staff, { signal: this.controller.signal })
        .then((response) => {
          this.Staff = response.data.rows;
          //   console.log(this.Staff);s
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.animal, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data = res.data;
          // console.log(this.data);
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.main + "?AnimalID=" + this.key, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.detail = res.data.rows;
          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.detail.length; i++) {
              this.detail[i].show_id = i + 1;
              if (this.detail[i].WeightDate != null) {
                this.detail[i].WeightDate = dayjs(this.detail[i].WeightDate)
                  .locale(locale)
                  .format("DD MMM BB");
              }
            }
          } else {
            let start = (this.curpage - 1) * 15;
            for (let i = 0; i < this.data.length; i++) {
              this.detail[i].show_id = i + 1 + start;
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openAdd() {
      this.display_add = true;
    },
    edit(id) {
      id = this.detail.find((x) => x.FeedProgramProgressID == id);
      //   if (id.isActive == 0) {
      //     id.isActive = this.status[1];
      //   } else if (id.isActive == 1) {
      //     id.isActive = this.status[0];
      //   }
      //   console.log(id);
      this.form = {
        FeedProgramProgressID: id.FeedProgramProgressID,
        FeedProgramID: id.FeedProgramID,
        AnimalID: this.$route.params.id,
        WeightDate: id.WeightDate,
        Weight: id.Weight,
        Height: id.Height,
        Length: id.Length,
        CrossSectionalArea: id.CrossSectionalArea,
        TotalQuantity: id.TotalQuantity,
        TMRFormulaID: id.TMRFormulaID,
        TotalTMR: id.TotalTMR,
        RoughagesID: [
          [1, 2],
          [2, 3],
        ],
        TotalRoughages: id.TotalRoughages,
        ConcentrateID: [
          [2, 5],
          [4, 9.5],
        ],
        TotalConcentrate: id.TotalConcentrate,
        ProgressRate: id.ProgressRate,
        ResponsibilityStaffID: id.ResponsibilityStaffID,
        isActive: id.isActive,
      };
      // console.log(this.form);
      this.display_edit = true;
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
    submit() {
      axios
        .post(
          this.url.main,
          {
            FeedProgramID: 1,
            AnimalID: this.$route.params.id,
            WeightDate: this.form.WeightDate,
            Weight: this.form.Weight,
            Height: this.form.Height,
            Length: this.form.Length,
            CrossSectionalArea: this.form.CrossSectionalArea,
            TotalQuantity: this.form.TotalQuantity,
            TMRFormulaID: this.form.TMRFormulaID,
            TotalTMR: this.form.TotalTMR,
            RoughagesID: [
              [1, 2],
              [2, 3],
            ],
            TotalRoughages: this.form.TotalRoughages,
            ConcentrateID: [
              [2, 5],
              [4, 9.5],
            ],
            TotalConcentrate: this.form.TotalConcentrate,
            ProgressRate: this.form.ProgressRate,
            ResponsibilityStaffID: this.form.StaffID,
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
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    update() {
      axios
        .put(
          this.url.main + "/" + this.form.FeedProgramProgressID,
          {
            FeedProgramID: 1,
            AnimalID: this.$route.params.id,
            WeightDate: this.form.WeightDate,
            Weight: this.form.Weight,
            Height: this.form.Height,
            Length: this.form.Length,
            CrossSectionalArea: this.form.CrossSectionalArea,
            TotalQuantity: this.form.TotalQuantity,
            TMRFormulaID: this.form.TMRFormulaID,
            TotalTMR: this.form.TotalTMR,
            RoughagesID: [
              [1, 2],
              [2, 3],
            ],
            TotalRoughages: this.form.TotalRoughages,
            ConcentrateID: [
              [2, 5],
              [4, 9.5],
            ],
            TotalConcentrate: this.form.TotalConcentrate,
            ProgressRate: this.form.ProgressRate,
            ResponsibilityStaffID: 1,
            isActive: 1,
          },
          { signal: this.controller.signal }
        )
        .then(() => {
          this.load();
          this.$toast.add({
            severity: "success",
            summary: "สำเร็จ",
            detail: "ข้อมูลฟาร์มถูกบันทึก",
            // detail: "เพิ่มข้อมูลเสร็จสิ้น",
            life: 5000,
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    open_delete(id) {
      this.detail.id = id;
      this.display_delete = true;
    },
    // remove data
    remove() {
      axios.delete(this.url.main + "/" + this.detail.id).then(() => {
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
    close_delete() {
      this.display_delete = false;
    },
    close_edit() {
      this.display_edit = false;
    },
    close_add() {
      this.display_add = false;
    },

    unmounted() {
      this.controller.abort();
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
    //   { label: "การจัดเก็บข้อมูลการขุน/อาหาร", to: "/activity/food/progress" },
    // ]);
    // const data = reactive([
    //   {
    //     Number: "1",
    //     FeedProgramID: "151605349",
    //     WeightDate: "01/05/2565",
    //     Weight: "67",
    //     Height: "125",
    //     Length: "75",
    //     CrossSectionalArea: "55",
    //     TotalQuantity: "12 กก.",
    //     TMRFormulaID: "50/50",
    //     TotalTMR: "12",
    //     RoughagesID: "{[1,12.5], [5,2]}",
    //     TotalRoughages: "6",
    //     ConcentrateID: "{[1,12.5], [5,2]}",
    //     TotalConcentrate: "6",
    //     ProgressRate: "78%",
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

    return {
      //   search,
      //   data,
      //   breadcrumb,
      //   modalAdd,
      //   openModalAdd,
      //   closeModalAdd,
      //   modalEdit,
      //   openModalEdit,
      //   closeModalEdit,
      //   tmrFormulaId,
      //   tmrFormula,
      // items,
      //   edit,
      //   open_delete,
    };
  },
};
</script>
