<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="กิจกรรมข้อมูลการผสมเทียม" :pages="breadcrumb" />
      <div class="card">
        <div class="card row col bg-primary pb-6">
          <h1 class="text-center text-white">หมายเลขประจำตัวสัตว์</h1>
          <span class="p-input-icon-right w-full px-5">
            <i class="pi pi-search px-5" />
            <InputText
              class="w-full"
              type="text"
              v-model="search"
              placeholder="ค้นหา"
            />
          </span>
        </div>
        <div class="card" v-if="search">
          <div class="text-xl">ข้อมูลหมายเลข {{ search }}</div>
          <div class="grid pt-5">
            <div class="col-12 sm:col lg:col">
              <div>ชื่อ :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>อายุ :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>หมายเลขข้างหู :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>เลขอ้างอิง RFID :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>สถานะ :</div>
            </div>
          </div>
          <div class="grid">
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 1 :</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 1:
            </div>
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 2 :</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 2:
            </div>
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 3 :</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 3:
            </div>
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 4 :</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 4:
            </div>
            <div class="col-12 sm:col lg:col">
              <div>สถานภาพการผลิต :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ลูกตัวสุดท้ายตัวที่ :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>คลอดลูกครั้งสุดท้ายวันที่ :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ผสมครั้งสุดท้ายวันที่ :</div>
            </div>
          </div>
          <div class="text-xl pt-3">ข้อมูลฟาร์ม</div>
          <div class="grid pt-5">
            <div class="col-12 sm:col lg:col">
              <div>หมายเลขทะเบียนฟาร์ม :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ชื่อฟาร์ม :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>วันที่ขึ้นทะเบียนฟาร์ม :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ชื่อเจ้าของฟาร์ม :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>สถานะฟาร์ม :</div>
            </div>
          </div>
        </div>
        <div class="mt-5 card">
          <div class="flex justify-content-between">
            <div class="text-xl">ประวัติการผสมเทียม</div>
            <Button
              label="เพิ่มกิจกรรม"
              icon="pi pi-plus"
              class="mb-3 p-button-raised p-button-raised p-button-info"
              @click="openAddModal"
            />
          </div>
          <DataTable
            class="text-sm"
            :value="data"
            :paginator="true"
            :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          >
            <Column field="id" header="ครั้งที่" class="text-center"></Column>
            <Column
              field="animal_id"
              header="เลขทะเบียนสัตว์"
              class="text-center"
            ></Column>
            <Column
              field="name"
              header="ชื่อสัตว์"
              class="text-center"
            ></Column>
            <Column
              field="time_no"
              header="ผสมเทียมครั้งที่"
              class="text-center"
            ></Column>
            <Column
              field="ai_date"
              header="วันที่ผสมเทียม"
              class="text-center"
            ></Column>
            <Column
              field="responsibility_user_id"
              header="ผู้รับผิดชอบ"
              class="text-center"
            ></Column>
            <Column
              field="project_id"
              header="โครงการ"
              class="text-center"
            ></Column>
            <Column
              field="semen_id"
              header="น้ำเชื้อ"
              class="text-center"
            ></Column>
            <Column
              field="dose"
              header="จำนวนโด๊ส"
              class="text-center"
            ></Column>
            <Column
              field="aestimate_birth_date"
              header="ประมาณการวันที่กำหนดคลอด"
              class="text-center"
            ></Column>
            <Column
              field="birthday"
              header="วันที่คลอด"
              class="text-center"
            ></Column>
            <Column
              field="ai_status"
              header="สถานะการผสมเทียม"
              class="text-center"
            ></Column>
            <Column header="จัดการ" class="text-center">
              <template #body>
                <SplitButton
                  label="แก้ไข"
                  icon="pi pi-pencil"
                  @click="openEditModal"
                  class="p-button-sm p-button-outlined p-button-warning"
                  :model="items"
                >
                </SplitButton>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
    <!-- end main page -->
    <!-- Add Dialog -->
    <Dialog
      header="เพิ่มกิจกรรมข้อมูลการผสมเทียม"
      v-model:visible="displayAddModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <!-- สำหรับแพะ -->
      <form class="grid mt-2" v-if="animal_id == 3">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขทะเบียนสัตว์
              </label>
              <InputText type="text" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อสัตว์
              </label>
              <InputText type="text" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ท้องที่
              </label>
              <InputText type="number" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ผสมครั้งล่าสุด
              </label>
              <InputText type="number" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                คลอดครั้งล่าสุด
              </label>
              <InputText type="number" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวนลูกครั้งล่าสุด
              </label>
              <InputText type="number" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                คะแนนร่างกาย
              </label>
              <Dropdown
                v-model="selectedCity"
                :options="cities"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกคะแนน"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ครั้งที่ผสม
              </label>
              <InputText type="number" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผสมเทียม
              </label>
              <Calendar
                class="w-full"
                id="date"
                v-model="date"
                :manualInput="false"
                :showIcon="true"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขน้ำเชื้อ
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <h4 class="col-12">ผสมครั้งที่ 1</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชุดน้ำเชื้อ
              </label>
              <InputText type="text" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปริมาณเมือก
              </label>
              <Dropdown
                v-model="selectedCity1"
                :options="cities1"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกปริมาณเมือก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สีของเมือก
              </label>
              <Dropdown
                v-model="selectedCity2"
                :options="cities2"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกสีของเมือก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปืนสอดลึก
              </label>
              <Dropdown
                v-model="selectedCity2"
                :options="cities2"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกปืนสอดลึก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                น้ำเชื้อเข้า
              </label>
              <Dropdown
                v-model="selectedCity2"
                :options="cities2"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกปืนน้ำเชื้อเข้า"
              />
            </div>

            <h4 class="col-12">ผสมครั้งที่ 2</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชุดน้ำเชื้อ
              </label>
              <InputText type="text" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปริมาณเมือก
              </label>
              <Dropdown
                v-model="selectedCity1"
                :options="cities1"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกปริมาณเมือก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สีของเมือก
              </label>
              <Dropdown
                v-model="selectedCity2"
                :options="cities2"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกสีของเมือก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปืนสอดลึก
              </label>
              <Dropdown
                v-model="selectedCity2"
                :options="cities2"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกปืนสอดลึก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                น้ำเชื้อเข้า
              </label>
              <Dropdown
                v-model="selectedCity2"
                :options="cities2"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกปืนน้ำเชื้อเข้า"
              />
            </div>
            <div class="field col-12 sm:col-6"></div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสเจ้าหน้าที่ผสมเทียม
              </label>
              <Dropdown
                class="w-full"
                v-model="selecteduser"
                :options="user"
                optionLabel="name"
                :filter="true"
                :showClear="true"
                placeholder="ค้นหาและเลือกรหัสเจ้าหน้าที่"
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
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อเจ้าหน้าที่ผสมเทียม
              </label>
              <InputText type="text" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                โครงการ</label
              >
              <MultiSelect
                v-model="selectedProject"
                class="w-full"
                :options="projects"
                optionLabel="name"
                placeholder="เลือกโครงการ"
                display="chip"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeAddModal"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="closeAddModal"
          />
        </div>
      </form>
      <!-- โค กระบือ -->
      <form class="grid mt-2" v-else>
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขทะเบียนสัตว์
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อสัตว์
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ครั้งที่ผสม
              </label>
              <InputText type="number" class="w-full" />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผสมเทียม
              </label>
              <Calendar
                class="w-full"
                id="date"
                v-model="date"
                :manualInput="false"
                :showIcon="true"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขน้ำเชื้อที่ใช้
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวนโด๊ส
              </label>
              <InputText type="number" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสเจ้าหน้าที่ผสมเทียม
              </label>
              <Dropdown
                class="w-full"
                v-model="selecteduser"
                :options="user"
                optionLabel="name"
                :filter="true"
                :showClear="true"
                placeholder="ค้นหาและเลือกรหัสเจ้าหน้าที่"
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
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อเจ้าหน้าที่ผสมเทียม
              </label>
              <InputText type="text" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                โครงการ</label
              >
              <MultiSelect
                v-model="selectedProject"
                class="w-full"
                :options="projects"
                optionLabel="name"
                placeholder="เลือกโครงการ"
                display="chip"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeAddModal"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="closeAddModal"
          />
        </div>
      </form>
    </Dialog>
    <!-- End Add Dialog -->
    <!-- EDIT Dialog -->
    <Dialog
      header="แก้ไขกิจกรรมข้อมูลการผสมเทียม"
      v-model:visible="displayEditModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <!-- สำหรับแพะ -->
      <form class="grid mt-2" v-if="animal_id == 3">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขทะเบียนสัตว์
              </label>
              <InputText type="text" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อสัตว์
              </label>
              <InputText type="text" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ท้องที่
              </label>
              <InputText type="number" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ผสมครั้งล่าสุด
              </label>
              <InputText type="number" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                คลอดครั้งล่าสุด
              </label>
              <InputText type="number" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวนลูกครั้งล่าสุด
              </label>
              <InputText type="number" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                คะแนนร่างกาย
              </label>
              <Dropdown
                v-model="selectedCity"
                :options="cities"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกคะแนน"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ครั้งที่ผสม
              </label>
              <InputText type="number" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผสมเทียม
              </label>
              <Calendar
                class="w-full"
                id="date"
                v-model="date"
                :manualInput="false"
                :showIcon="true"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขน้ำเชื้อ
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <h4 class="col-12">ผสมครั้งที่ 1</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชุดน้ำเชื้อ
              </label>
              <InputText type="text" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปริมาณเมือก
              </label>
              <Dropdown
                v-model="selectedCity1"
                :options="cities1"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกปริมาณเมือก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สีของเมือก
              </label>
              <Dropdown
                v-model="selectedCity2"
                :options="cities2"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกสีของเมือก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปืนสอดลึก
              </label>
              <Dropdown
                v-model="selectedCity2"
                :options="cities2"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกปืนสอดลึก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                น้ำเชื้อเข้า
              </label>
              <Dropdown
                v-model="selectedCity2"
                :options="cities2"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกปืนน้ำเชื้อเข้า"
              />
            </div>

            <h4 class="col-12">ผสมครั้งที่ 2</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชุดน้ำเชื้อ
              </label>
              <InputText type="text" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปริมาณเมือก
              </label>
              <Dropdown
                v-model="selectedCity1"
                :options="cities1"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกปริมาณเมือก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                สีของเมือก
              </label>
              <Dropdown
                v-model="selectedCity2"
                :options="cities2"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกสีของเมือก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปืนสอดลึก
              </label>
              <Dropdown
                v-model="selectedCity2"
                :options="cities2"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกปืนสอดลึก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                น้ำเชื้อเข้า
              </label>
              <Dropdown
                v-model="selectedCity2"
                :options="cities2"
                class="w-full"
                optionLabel="name"
                placeholder="เลือกปืนน้ำเชื้อเข้า"
              />
            </div>
            <div class="field col-12 sm:col-6"></div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสเจ้าหน้าที่ผสมเทียม
              </label>
              <Dropdown
                class="w-full"
                v-model="selecteduser"
                :options="user"
                optionLabel="name"
                :filter="true"
                :showClear="true"
                placeholder="ค้นหาและเลือกรหัสเจ้าหน้าที่"
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
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อเจ้าหน้าที่ผสมเทียม
              </label>
              <InputText type="text" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                โครงการ</label
              >
              <MultiSelect
                v-model="selectedProject"
                class="w-full"
                :options="projects"
                optionLabel="name"
                placeholder="เลือกโครงการ"
                display="chip"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeAddModal"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="closeAddModal"
          />
        </div>
      </form>
      <!-- โค กระบือ -->
      <form class="grid mt-2" v-else>
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขทะเบียนสัตว์
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อสัตว์
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ครั้งที่ผสม
              </label>
              <InputText type="number" class="w-full" />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผสมเทียม
              </label>
              <Calendar
                class="w-full"
                id="date"
                v-model="date"
                :manualInput="false"
                :showIcon="true"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขน้ำเชื้อที่ใช้
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                จำนวนโด๊ส
              </label>
              <InputText type="number" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสเจ้าหน้าที่ผสมเทียม
              </label>
              <Dropdown
                class="w-full"
                v-model="selecteduser"
                :options="user"
                optionLabel="name"
                :filter="true"
                :showClear="true"
                placeholder="ค้นหาและเลือกรหัสเจ้าหน้าที่"
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
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อเจ้าหน้าที่ผสมเทียม
              </label>
              <InputText type="text" class="w-full" readonly />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                โครงการ</label
              >
              <MultiSelect
                v-model="selectedProject"
                class="w-full"
                :options="projects"
                optionLabel="name"
                placeholder="เลือกโครงการ"
                display="chip"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeAddModal"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="closeAddModal"
          />
        </div>
      </form>
    </Dialog>
    <!-- End EDIT Dialog -->
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
        <span class="text-xl"
          >คุณต้องการลบข้อมูลข้อมูลการผสมเทียมครั้งที่ 2 ใช่หรือไม่</span
        >
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
            @click="closeConfirmation"
            class="p-button-danger w-full ml-3"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

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
  setup() {
    const breadcrumb = ref([
      { label: "กิจกรรม", to: "/" },
      { label: "กิจกรรมข้อมูลการผสมเทียม", to: "/activity/artificial" },
    ]);
    const data = reactive([
      {
        id: "1",
        animal_id: "16512312",
        name: "ชมพู่",
        time_no: "1",
        ai_date: "11/12/2563",
        responsibility_user_id: "น่าน สุทธหลวง",
        project_id: "โครงสร้างโคพันธุ์แกร่ง",
        semen_id: "TH376",
        dose: "1",
        aestimate_birth_date: "11/01/2564",
        birthday: "15/01/2564",
        ai_status: "สำเร็จ (Success)",
      },
      {
        id: "2",
        animal_id: "5156235",
        name: "แดง",
        time_no: "1",
        ai_date: "11/12/2563",
        responsibility_user_id: "น่าน สุทธหลวง",
        project_id: "โครงสร้างโคพันธุ์แกร่ง",
        semen_id: "TH376",
        dose: "1",
        aestimate_birth_date: "11/01/2564",
        birthday: "-",
        ai_status: "รอผล (Wait)",
      },
    ]);
    const items = ref([
      {
        label: "ลบ",
        icon: "pi pi-trash",
        command: () => {
          opendisplaydelete();
        },
      },
    ]);
    const selectedProject = ref();
    const projects = ref([
      { name: "โครงการ1", code: "NY" },
      { name: "โครงการ2", code: "RM" },
      { name: "โครงการ3", code: "LDN" },
    ]);
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
    const displaydelete = ref(false);
    const opendisplaydelete = () => {
      displaydelete.value = true;
    };
    const closeConfirmation = () => {
      displaydelete.value = false;
    };
    const search = ref();
    return {
      data,
      search,
      items,
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
      selectedProject,
      projects,
      selectedCity: null,
      cities: [
        { name: "1", code: "NY" },
        { name: "2", code: "RM" },
        { name: "3", code: "LDN" },
        { name: "4", code: "D" },
        { name: "5", code: "C" },
      ],
    };
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
