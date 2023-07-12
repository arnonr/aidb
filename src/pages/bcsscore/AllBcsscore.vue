<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="กิจกรรมการให้คะแนนรูบร่าง" :pages="breadcrumb" />
      <div class="card">
        <div class="card row col bg-primary pb-6">
          <h1 class="text-center">หมายเลขประจำตัวสัตว์</h1>
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
              <div>ชื่อ : ปางแก้ว</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>อายุ : 4-12</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>หมายเลขข้างหู : 155546</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>เลขอ้างอิง RFID :100245</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>สถานะ : สถานะโค</div>
            </div>
          </div>
          <div class="grid">
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 1 : -</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 1: 100%
            </div>
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 2 : -</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 2: -
            </div>
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 3 : -</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 3: -
            </div>
            <div class="col-12 sm:col-6 lg:col-3">พันธุ์ที่ 4 : -</div>
            <div class="col-12 sm:col-6 lg:col-3">
              สัดส่วนเปอร์เซ็นต์ของสายพันธุ์ที่ 4: -
            </div>
            <div class="col-12 sm:col lg:col">
              <div>หมายเลขพ่อ : 1222054</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>พันธุ์ : -</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>หมายเลขแม่ : 5315011</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>พันธุ์ : -</div>
            </div>
          </div>
          <div class="text-xl pt-3">ข้อมูลฟาร์ม</div>
          <div class="grid pt-5">
            <div class="col-12 sm:col lg:col">
              <div>หมายเลขทะเบียนฟาร์ม :9911002233</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ชื่อฟาร์ม : สมหมาย จินดาเพ็ง(วีระ)</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>วันที่ขึ้นทะเบียนฟาร์ม : 20/4/2550</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ชื่อเจ้าของฟาร์ม :สมหมาย จินดาเพ็ง</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>สถานะฟาร์ม : Masterbull</div>
            </div>
          </div>
        </div>
        <div class="mt-5 card">
          <div class="flex justify-content-between">
            <div class="text-xl">ประวัติการการให้คะแนนรูปร่าง</div>
            <Button
              label="เพิ่มกิจกรรม"
              icon="pi pi-plus"
              class="mb-3 p-button-text p-button-plain bg-primary"
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
            <Column field="id" header="ลำดับ" class="text-center"></Column>
            <Column
              field="farm"
              header="หมายเลขสัตว์"
              class="text-center"
            ></Column>
            <Column
              field="province"
              header="ชื่อสัตว์"
              class="text-center"
            ></Column>
            <Column field="district" header="เพศ" class="text-center"></Column>
            <Column
              field="sub_district"
              header="อายุ"
              class="text-center"
            ></Column>
            <Column field="group" header="สถานะ" class="text-center"></Column>
            <Column
              field="village_name"
              header="ชื่อฟาร์ม"
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
      header="เพิ่มกิจกรรมการให้คะแนนรูปร่าง"
      v-model:visible="displayAddModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่บันทึก
              </label>
              <Calendar
                class="w-full"
                id="date"
                v-model="date"
                :manualInput="false"
                placeholder=""
                :showIcon="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                การให้คะแนน</label
              >
              <Dropdown
                class="w-full"
                id="selectedUnit"
                placeholder="เลือกคะแนน"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสผู้ประเมิน
              </label>
              <Dropdown
                class="w-full"
                v-model="selecteduser"
                :options="user"
                optionLabel="name"
                :filter="true"
                :showClear="true"
                placeholder="รหัสผู้ประเมิน"
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
            <!-- <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อผู้ประเมิน
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ประเมิน
              </label>
              <Calendar class="w-full" id="date" v-model="date" :manualInput="false" placeholder="" :showIcon="true" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ครั้งที่ประเมิน
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <h3 class="col-12">กรอกข้อมูลเพื่อให้คะแนน</h3>
            <h4 class="col-12">โครงสร้าง</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความยาวสะโพก
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความกว้างสะโพก
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                มุมสะโพก (+ / -)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                โคนหาง
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                มุมอวัยวะเพศ
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ไหล่
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความสูงสัมพัทธ์
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หลัง(ส่วนเอว)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> หัว </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความสูง
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <h4 class="col-12">ลักษณะความเป็น</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะ
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หนังและขน
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <h4 class="col-12">ขาและกีบ</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ขาหลัง(ด้านข้าง)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ขาหลัง(ด้านหลัง)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                มุมกีบ
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> กีบ </label>
              <InputText type="text" class="w-full" />
            </div>
            <h4 class="col-12">เต้านม</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความสูงของเนื้อเยื่อเต้านมหลัง
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความกว้างของเนื้อเยื่อเต้านมหลัง
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความลึกของเต้านม(+ / -)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำแหน่งหัวนม(มองด้านหลัง)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำแหน่งหัวนม(มองด้านข้าง)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ขนาดหัวนม
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เอ็นยึดเต้านมหลัง
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                การเกาะยึดของเต้านมหน้า
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความยาวเต้านมหน้า(+ / -)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความสมดุลย์ของเต้านม
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <h4 class="col-12">ความจุร่างกาย</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความลึกของลำตัว
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                อกลึก
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                อกกว้าง
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำแหน่งขาหลัง(ด้านข้าง)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                การเดิน
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ข้อกีบ
              </label>
              <InputText type="text" class="w-full" />
            </div> -->
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeEditModal"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 bg-primary w-full p-button-raised p-button-text p-button-plain"
            @click="closeEditModal"
          />
        </div>
      </form>
    </Dialog>
    <!-- End Add Dialog -->
    <!-- EDIT Dialog -->
    <Dialog
      header="แก้ไขกิจกรรมการให้คะแนนรูปร่าง"
      v-model:visible="displayEditModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่บันทึก
              </label>
              <Calendar
                class="w-full"
                id="date"
                v-model="date"
                :manualInput="false"
                placeholder=""
                :showIcon="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                การให้คะแนน</label
              >
              <Dropdown
                class="w-full"
                id="selectedUnit"
                placeholder="เลือกคะแนน"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสผู้ประเมิน
              </label>
              <Dropdown
                class="w-full"
                v-model="selecteduser"
                :options="user"
                optionLabel="name"
                :filter="true"
                :showClear="true"
                placeholder="รหัสผู้ประเมิน"
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
            <!-- <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อผู้ประเมิน
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ประเมิน
              </label>
              <Calendar class="w-full" id="date" v-model="date" :manualInput="false" placeholder="" :showIcon="true" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ครั้งที่ประเมิน
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <h3 class="col-12">กรอกข้อมูลเพื่อให้คะแนน</h3>
            <h4 class="col-12">โครงสร้าง</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความยาวสะโพก
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความกว้างสะโพก
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                มุมสะโพก (+ / -)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                โคนหาง
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                มุมอวัยวะเพศ
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ไหล่
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความสูงสัมพัทธ์
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หลัง(ส่วนเอว)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> หัว </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความสูง
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <h4 class="col-12">ลักษณะความเป็น</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะ
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                หนังและขน
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <h4 class="col-12">ขาและกีบ</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ขาหลัง(ด้านข้าง)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ขาหลัง(ด้านหลัง)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                มุมกีบ
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> กีบ </label>
              <InputText type="text" class="w-full" />
            </div>
            <h4 class="col-12">เต้านม</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความสูงของเนื้อเยื่อเต้านมหลัง
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความกว้างของเนื้อเยื่อเต้านมหลัง
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความลึกของเต้านม(+ / -)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำแหน่งหัวนม(มองด้านหลัง)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำแหน่งหัวนม(มองด้านข้าง)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ขนาดหัวนม
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                เอ็นยึดเต้านมหลัง
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                การเกาะยึดของเต้านมหน้า
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความยาวเต้านมหน้า(+ / -)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความสมดุลย์ของเต้านม
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <h4 class="col-12">ความจุร่างกาย</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ความลึกของลำตัว
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                อกลึก
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                อกกว้าง
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ตำแหน่งขาหลัง(ด้านข้าง)
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                การเดิน
              </label>
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ข้อกีบ
              </label>
              <InputText type="text" class="w-full" />
            </div> -->
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="closeEditModal"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 bg-primary w-full p-button-raised p-button-text p-button-plain"
            @click="closeEditModal"
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
          >คุณต้องการลบข้อมูลการให้คะแนนรูปร่างที่ 2 ใช่หรือไม่</span
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

export default {
  components: {
    PageTitle,
  },
  setup() {
    const breadcrumb = ref([
      { label: "กิจกรรม", to: "/" },
      { label: "กิจกรรมการให้คะแนนรูบร่าง", to: "" },
    ]);
    const data = reactive([
      {
        id: "1",
        farm: "151605349",
        province: "ชมพู่",
        district: "M",
        sub_district: "11-9",
        group: "CO,MA,MK",
        village_name: "สมพรพุทธฟาร์ม",
        // house_number: 99,
        // pid: "-",
        // phone: "0899999999",
        // status: "เปิดใช้งาน",
      },
      {
        id: "2",
        farm: "151605349",
        province: "ชมพู่",
        district: "M",
        sub_district: "11-9",
        group: "CO,MA,MK",
        village_name: "สมพรพุทธฟาร์ม",
        // house_number: 99,
        // pid: "-",
        // phone: "0899999999",
        // status: "เปิดใช้งาน",
      },
      {
        id: "3",
        farm: "151605349",
        province: "xxx",
        district: "F",
        sub_district: "9-2",
        group: "CO,MA,MK",
        village_name: "สมพรพุทธฟาร์ม",
        // house_number: 99,
        // pid: "-",
        // phone: "0899999999",
        // status: "เปิดใช้งาน",
      },
      {
        id: "4",
        farm: "151605349",
        province: "xxx",
        district: "F",
        sub_district: "7-5",
        group: "CO,MA,MK",
        village_name: "สมพรพุทธฟาร์ม",
        // house_number: 99,
        // pid: "-",
        // phone: "0899999999",
        // status: "เปิดใช้งาน",
      },
      {
        id: "5",
        farm: "151605349",
        province: "xxx",
        district: "M",
        sub_district: "7-5",
        group: "CO,MA,MK",
        village_name: "สมพรพุทธฟาร์ม",
        // house_number: 99,
        // pid: "-",
        // phone: "0899999999",
        // status: "เปิดใช้งาน",
      },
      {
        id: "6",
        farm: "151605349",
        province: "xxx",
        district: "F",
        sub_district: "9-2",
        group: "CO,MA,MK",
        village_name: "สมพรพุทธฟาร์ม",
        // house_number: 99,
        // pid: "-",
        // phone: "0899999999",
        // status: "เปิดใช้งาน",
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
    };
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
