<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="กิจกรรมการตรวจระบบสืบพันธุ์" :pages="breadcrumb" />
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
              <div>รอบการให้นมครั้งที่ :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ครั้งที่ผสม :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>วันที่คลอด/แท้ง ล่าสุด :</div>
            </div>
            <div class="col-12 sm:col lg:col">
              <div>ประวัติการคลอด :</div>
            </div>
          </div>
        </div>
        <div class="mt-5 card">
          <div class="flex justify-content-between">
            <div class="text-xl">ประวัติการตรวจระบบสืบพันธุ์</div>
            <Button
              label="เพิ่มกิจกรรม"
              class="mb-3 p-button-raised"
              icon="pi pi-plus"
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
              field="date"
              header="วันที่ตรวจ"
              class="text-center"
            ></Column>
            <Column field="bcs" header="BCS" class="text-center"></Column>
            <Column
              field="first"
              header="วันที่เป็นสัดครั้งแรก"
              class="text-center"
            ></Column>
            <Column
              field="feel"
              header="อาการเป็นสัด"
              class="text-center"
            ></Column>
            <Column
              field="result"
              header="สรุปการตรวจวินิจฉัย"
              class="text-center"
            ></Column>
            <Column
              field="womb"
              header="มดลูก/ช่องคลอด"
              class="text-center"
            ></Column>
            <Column field="ovary" header="รังไข่" class="text-center"></Column>
            <Column field="other" header="อื่น ๆ" class="text-center"></Column>
            <Column
              field="treat"
              header="วิธีการรักษา"
              class="text-center"
            ></Column>
            <Column
              field="opname"
              header="ชื่อเจ้าหน้าที่ผู้ผสมเทียม"
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
      header="เพิ่มกิจกรรมตรวจระบบสืบพันธุ์"
      v-model:visible="displayAddModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <h4 class="col-12">ประวัติทั่วไป</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                คลอดหรือแท้ง ครั้งล่าสุด วันที่</label
              >
              <Calendar
                class="w-full"
                id="dateRange"
                v-model="birthdate"
                :manualInput="false"
                placeholder="25/05/2565"
                :showIcon="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะการคลอด</label
              >
              <Dropdown
                class="w-full"
                placeholder="คลอดยาก"
                id="selectedUnit"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผสมครั้งล่าสุด</label
              >
              <Calendar
                class="w-full"
                id="dateRange"
                v-model="birthdate"
                :manualInput="false"
                placeholder="25/05/2565"
                :showIcon="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                เป็นการผสมครั้งที่</label
              >
              <InputText type="text" class="w-full" placeholder="1" readonly />
            </div>
            <h4 class="col-12">บันทึกผลตรวจระบบสืบพันธุ์</h4>
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
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                วันที่เป็นสัดครั้งแรก (ในรอบนี้)</label
              >
              <Calendar
                class="w-full"
                id="dateRange"
                v-model="birthdate"
                :manualInput="false"
                placeholder=""
                :showIcon="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                อาการเป็นสัด</label
              >
              <Dropdown class="w-full" id="selectedUnit" placeholder="ชัดเจน" />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วงรอบการเป็นสัด</label
              >
              <Dropdown class="w-full" id="selectedUnit" placeholder="ตรงรอบ" />
            </div>
            <div class="field col-12 sm:col-6">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                อาการผิดปกติอื่น ๆ ที่เกษตรกรพบ</label
              >
              <InputText type="text" class="w-full" />
            </div>

            <h4 class="col-12">ผลการตรวจระบบสืบพันธุ์</h4>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะรังไข่ L</label
              >
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะรังไข่ R</label
              >
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปีกมดลูก</label
              >
              <Dropdown
                class="w-full"
                id="selectedUnit"
                placeholder="เท่ากัน"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> Tone</label>
              <Dropdown class="w-full" id="selectedUnit" placeholder="+++" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปากช่องคลอด</label
              >
              <Dropdown class="w-full" id="selectedUnit" placeholder="ไม่บวม" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ช่องคลอด</label
              >
              <Dropdown class="w-full" id="selectedUnit" placeholder="ไม่บวม" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ช่องคลอด ลักษณะ</label
              >
              <Dropdown
                class="w-full"
                id="selectedUnit"
                placeholder="มีเมือก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปากมดลูก</label
              >
              <Dropdown class="w-full" id="selectedUnit" placeholder="เปิด" />
            </div>

            <h4 class="col-12">สรุปผลการตรวจวินิจฉัย</h4>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                มดลูก/ช่องคลอด</label
              >
              <Dropdown
                class="w-full"
                id="selectedUnit"
                placeholder="มดลูกอักเสบ"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รังไข่</label
              >
              <Dropdown
                class="w-full"
                id="selectedUnit"
                placeholder="ตกไข่ช้า"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                อื่น ๆ</label
              >
              <Dropdown
                class="w-full"
                id="selectedUnit"
                placeholder="มดลูกอักเสบ / ถุงน้ำในรังไข่"
              />
            </div>

            <h4 class="col-12">สาเหตุโน้มนำ</h4>
            <div class="field col-12 sm:col-12">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                แม่โค/กระบือ</label
              >
              <div class="field-checkbox">
                <Checkbox
                  id="city1"
                  name="city"
                  value="0"
                  v-model="treatment"
                />
                <label for="city1" class="pr-5">อายุมาก</label>
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">แท้ง</label>
                <Checkbox
                  id="city3"
                  name="city"
                  value="2"
                  v-model="treatment"
                />
                <label for="city3" class="pr-5">คลอดยาก</label>
                <Checkbox
                  id="city4"
                  name="city"
                  value="3"
                  v-model="treatment"
                />
                <label for="city4" class="pr-5">รกค้าง</label>
                <Checkbox
                  id="city4"
                  name="city"
                  value="3"
                  v-model="treatment"
                />
                <label for="city5" class="pr-5">มดลูกทะลัก</label>
                <Checkbox
                  id="city4"
                  name="city"
                  value="3"
                  v-model="treatment"
                />
                <label for="city5" class="pr-5">อื่น</label>
                <InputText type="text" class="w-full" />
              </div>
            </div>
            <div class="field col-12 sm:col-12">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                สิ่งแวดล้อม</label
              >
              <div class="field-checkbox">
                <Checkbox
                  id="city1"
                  name="city"
                  value="0"
                  v-model="treatment"
                />
                <label for="city1" class="pr-5">พื้นคอกและโรงเรียน</label>
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">เครียดจากสถาพอากาศร้อน</label>
                <Checkbox
                  id="city4"
                  name="city"
                  value="3"
                  v-model="treatment"
                />
                <label for="city5" class="pr-5">อื่น</label>
                <InputText type="text" class="w-full" />
              </div>
            </div>
            <div class="field col-12 sm:col-12">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                การเลี้ยงและการจัดการ</label
              >
              <div class="field-checkbox">
                <Checkbox
                  id="city1"
                  name="city"
                  value="0"
                  v-model="treatment"
                />
                <label for="city1" class="pr-5">การสังเกตการเป็นสัด</label>
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5"
                  >การจัดการอาหารและการให้อาหาร</label
                >
                <Checkbox
                  id="city3"
                  name="city"
                  value="2"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">คะแนนร่างกายต่ำ</label>
                <Checkbox
                  id="city4"
                  name="city"
                  value="3"
                  v-model="treatment"
                />
                <label for="city5" class="pr-5">อื่น</label>
                <InputText type="text" class="w-full" />
              </div>
            </div>

            <div class="field col-12 sm:col-12">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                สุขภาพ</label
              >
              <div class="field-checkbox">
                <Checkbox
                  id="city1"
                  name="city"
                  value="0"
                  v-model="treatment"
                />
                <label for="city1" class="pr-5">ปัญหาขาและกีบ</label>
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">Ureaplasma</label>
                <Checkbox
                  id="city3"
                  name="city"
                  value="2"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">Blood Parasite</label>
                <Checkbox
                  id="city3"
                  name="city"
                  value="2"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">พยาธิภายในและภายนอก</label>
                <Checkbox
                  id="city3"
                  name="city"
                  value="2"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">กลุ่มอาการโคล้มไม่ลุก</label>
                <Checkbox
                  id="city3"
                  name="city"
                  value="2"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">ปัญหาสุขภาพ</label>
              </div>
            </div>
            <div class="field col-12 sm:col-6">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                อื่น ๆ</label
              >
              <InputText type="text" class="w-full" />
            </div>

            <h4 class="col-12">การรักษา</h4>
            <div class="field col-12 sm:col-12">
              <div class="field-checkbox">
                <Checkbox
                  id="city1"
                  name="city"
                  value="0"
                  v-model="treatment"
                />
                <label for="city1" class="pr-5">ฮอร์โมน</label>
                <InputText type="text" class="pr-5" />
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                  class="ml-3"
                />
                <label for="city2" class="pr-5">ยาปฏิชีวนะ</label>
                <InputText type="text" class="pr-5" />
              </div>
            </div>
            <div class="field col-12 sm:col-12">
              <div class="field-checkbox">
                <Checkbox
                  id="city1"
                  name="city"
                  value="0"
                  v-model="treatment"
                />
                <label for="city1" class="pr-5">วิตามินบำรุง</label>
                <InputText type="text" class="pr-5" />
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                  class="ml-3"
                />
                <label for="city2" class="pr-5">ชะล้างมดลูก</label>
                <InputText type="text" class="pr-5" />
              </div>
            </div>

            <div class="field col-12 sm:col-12">
              <div class="field-checkbox">
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                />
                <label for="city4" class="pr-5">อื่น ๆ</label>
                <InputText type="text" class="pr-5" />
              </div>
            </div>
            <h4 class="col-12">คำแนะนำ</h4>
            <div class="field col-12 sm:col-12">
              <div class="field-radiobutton">
                <RadioButton
                  id="city1"
                  name="city"
                  value="Chicago"
                  v-model="check"
                />
                <label for="city1">คัดทิ้ง</label>
              </div>
            </div>
            <div class="field col-12 sm:col-12">
              <label
                for="selectedUnit"
                class="block text-600 text-sm font-bold mb-2"
              >
                อื่น ๆ ระบุ</label
              >
              <InputText type="text" class="w-full" />
            </div>

            <div class="field col-12 sm:col-6">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                วันที่ตรวจวินิจฉัย</label
              >
              <Calendar
                class="w-full"
                id="dateRange"
                v-model="birthdate"
                :manualInput="false"
                placeholder=""
                :showIcon="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label
                for="selectedUnit"
                class="block text-600 text-sm font-bold mb-2"
              >
                รหัสเจ้าหน้าที่</label
              >
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label
                for="selectedUnit"
                class="block text-600 text-sm font-bold mb-2"
              >
                ชื่อเจ้าหน้าที่</label
              >
              <InputText type="text" class="w-full" />
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
      header="แก้ไขกิจกรรมตรวจระบบสืบพันธุ์"
      v-model:visible="displayEditModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="formgrid grid">
            <h4 class="col-12">ประวัติทั่วไป</h4>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                คลอดหรือแท้ง ครั้งล่าสุด วันที่</label
              >
              <Calendar
                class="w-full"
                id="dateRange"
                v-model="birthdate"
                :manualInput="false"
                placeholder="25/05/2565"
                :showIcon="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะการคลอด</label
              >
              <Dropdown
                class="w-full"
                placeholder="คลอดยาก"
                id="selectedUnit"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วันที่ผสมครั้งล่าสุด</label
              >
              <Calendar
                class="w-full"
                id="dateRange"
                v-model="birthdate"
                :manualInput="false"
                placeholder="25/05/2565"
                :showIcon="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                เป็นการผสมครั้งที่</label
              >
              <InputText type="text" class="w-full" placeholder="1" readonly />
            </div>
            <h4 class="col-12">บันทึกผลตรวจระบบสืบพันธุ์</h4>
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
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                วันที่เป็นสัดครั้งแรก (ในรอบนี้)</label
              >
              <Calendar
                class="w-full"
                id="dateRange"
                v-model="birthdate"
                :manualInput="false"
                placeholder=""
                :showIcon="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                อาการเป็นสัด</label
              >
              <Dropdown class="w-full" id="selectedUnit" placeholder="ชัดเจน" />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                วงรอบการเป็นสัด</label
              >
              <Dropdown class="w-full" id="selectedUnit" placeholder="ตรงรอบ" />
            </div>
            <div class="field col-12 sm:col-6">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                อาการผิดปกติอื่น ๆ ที่เกษตรกรพบ</label
              >
              <InputText type="text" class="w-full" />
            </div>

            <h4 class="col-12">ผลการตรวจระบบสืบพันธุ์</h4>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะรังไข่ L</label
              >
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ลักษณะรังไข่ R</label
              >
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปีกมดลูก</label
              >
              <Dropdown
                class="w-full"
                id="selectedUnit"
                placeholder="เท่ากัน"
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"> Tone</label>
              <Dropdown class="w-full" id="selectedUnit" placeholder="+++" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปากช่องคลอด</label
              >
              <Dropdown class="w-full" id="selectedUnit" placeholder="ไม่บวม" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ช่องคลอด</label
              >
              <Dropdown class="w-full" id="selectedUnit" placeholder="ไม่บวม" />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ช่องคลอด ลักษณะ</label
              >
              <Dropdown
                class="w-full"
                id="selectedUnit"
                placeholder="มีเมือก"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ปากมดลูก</label
              >
              <Dropdown class="w-full" id="selectedUnit" placeholder="เปิด" />
            </div>

            <h4 class="col-12">สรุปผลการตรวจวินิจฉัย</h4>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                มดลูก/ช่องคลอด</label
              >
              <Dropdown
                class="w-full"
                id="selectedUnit"
                placeholder="มดลูกอักเสบ"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                รังไข่</label
              >
              <Dropdown
                class="w-full"
                id="selectedUnit"
                placeholder="ตกไข่ช้า"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                อื่น ๆ</label
              >
              <Dropdown
                class="w-full"
                id="selectedUnit"
                placeholder="มดลูกอักเสบ / ถุงน้ำในรังไข่"
              />
            </div>

            <h4 class="col-12">สาเหตุโน้มนำ</h4>
            <div class="field col-12 sm:col-12">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                แม่โค/กระบือ</label
              >
              <div class="field-checkbox">
                <Checkbox
                  id="city1"
                  name="city"
                  value="0"
                  v-model="treatment"
                />
                <label for="city1" class="pr-5">อายุมาก</label>
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">แท้ง</label>
                <Checkbox
                  id="city3"
                  name="city"
                  value="2"
                  v-model="treatment"
                />
                <label for="city3" class="pr-5">คลอดยาก</label>
                <Checkbox
                  id="city4"
                  name="city"
                  value="3"
                  v-model="treatment"
                />
                <label for="city4" class="pr-5">รกค้าง</label>
                <Checkbox
                  id="city4"
                  name="city"
                  value="3"
                  v-model="treatment"
                />
                <label for="city5" class="pr-5">มดลูกทะลัก</label>
                <Checkbox
                  id="city4"
                  name="city"
                  value="3"
                  v-model="treatment"
                />
                <label for="city5" class="pr-5">อื่น</label>
                <InputText type="text" class="w-full" />
              </div>
            </div>
            <div class="field col-12 sm:col-12">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                สิ่งแวดล้อม</label
              >
              <div class="field-checkbox">
                <Checkbox
                  id="city1"
                  name="city"
                  value="0"
                  v-model="treatment"
                />
                <label for="city1" class="pr-5">พื้นคอกและโรงเรียน</label>
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">เครียดจากสถาพอากาศร้อน</label>
                <Checkbox
                  id="city4"
                  name="city"
                  value="3"
                  v-model="treatment"
                />
                <label for="city5" class="pr-5">อื่น</label>
                <InputText type="text" class="w-full" />
              </div>
            </div>
            <div class="field col-12 sm:col-12">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                การเลี้ยงและการจัดการ</label
              >
              <div class="field-checkbox">
                <Checkbox
                  id="city1"
                  name="city"
                  value="0"
                  v-model="treatment"
                />
                <label for="city1" class="pr-5">การสังเกตการเป็นสัด</label>
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5"
                  >การจัดการอาหารและการให้อาหาร</label
                >
                <Checkbox
                  id="city3"
                  name="city"
                  value="2"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">คะแนนร่างกายต่ำ</label>
                <Checkbox
                  id="city4"
                  name="city"
                  value="3"
                  v-model="treatment"
                />
                <label for="city5" class="pr-5">อื่น</label>
                <InputText type="text" class="w-full" />
              </div>
            </div>

            <div class="field col-12 sm:col-12">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                สุขภาพ</label
              >
              <div class="field-checkbox">
                <Checkbox
                  id="city1"
                  name="city"
                  value="0"
                  v-model="treatment"
                />
                <label for="city1" class="pr-5">ปัญหาขาและกีบ</label>
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">Ureaplasma</label>
                <Checkbox
                  id="city3"
                  name="city"
                  value="2"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">Blood Parasite</label>
                <Checkbox
                  id="city3"
                  name="city"
                  value="2"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">พยาธิภายในและภายนอก</label>
                <Checkbox
                  id="city3"
                  name="city"
                  value="2"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">กลุ่มอาการโคล้มไม่ลุก</label>
                <Checkbox
                  id="city3"
                  name="city"
                  value="2"
                  v-model="treatment"
                />
                <label for="city2" class="pr-5">ปัญหาสุขภาพ</label>
              </div>
            </div>
            <div class="field col-12 sm:col-6">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                อื่น ๆ</label
              >
              <InputText type="text" class="w-full" />
            </div>

            <h4 class="col-12">การรักษา</h4>
            <div class="field col-12 sm:col-12">
              <div class="field-checkbox">
                <Checkbox
                  id="city1"
                  name="city"
                  value="0"
                  v-model="treatment"
                />
                <label for="city1" class="pr-5">ฮอร์โมน</label>
                <InputText type="text" class="pr-5" />
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                  class="ml-3"
                />
                <label for="city2" class="pr-5">ยาปฏิชีวนะ</label>
                <InputText type="text" class="pr-5" />
              </div>
            </div>
            <div class="field col-12 sm:col-12">
              <div class="field-checkbox">
                <Checkbox
                  id="city1"
                  name="city"
                  value="0"
                  v-model="treatment"
                />
                <label for="city1" class="pr-5">วิตามินบำรุง</label>
                <InputText type="text" class="pr-5" />
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                  class="ml-3"
                />
                <label for="city2" class="pr-5">ชะล้างมดลูก</label>
                <InputText type="text" class="pr-5" />
              </div>
            </div>

            <div class="field col-12 sm:col-12">
              <div class="field-checkbox">
                <Checkbox
                  id="city2"
                  name="city"
                  value="1"
                  v-model="treatment"
                />
                <label for="city4" class="pr-5">อื่น ๆ</label>
                <InputText type="text" class="pr-5" />
              </div>
            </div>
            <h4 class="col-12">คำแนะนำ</h4>
            <div class="field col-12 sm:col-12">
              <div class="field-radiobutton">
                <RadioButton
                  id="city1"
                  name="city"
                  value="Chicago"
                  v-model="check"
                />
                <label for="city1">คัดทิ้ง</label>
              </div>
            </div>
            <div class="field col-12 sm:col-12">
              <label
                for="selectedUnit"
                class="block text-600 text-sm font-bold mb-2"
              >
                อื่น ๆ ระบุ</label
              >
              <InputText type="text" class="w-full" />
            </div>

            <div class="field col-12 sm:col-6">
              <label
                for="dateRange"
                class="block text-600 text-sm font-bold mb-2"
              >
                วันที่ตรวจวินิจฉัย</label
              >
              <Calendar
                class="w-full"
                id="dateRange"
                v-model="birthdate"
                :manualInput="false"
                placeholder=""
                :showIcon="true"
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label
                for="selectedUnit"
                class="block text-600 text-sm font-bold mb-2"
              >
                รหัสเจ้าหน้าที่</label
              >
              <InputText type="text" class="w-full" />
            </div>
            <div class="field col-12 sm:col-6">
              <label
                for="selectedUnit"
                class="block text-600 text-sm font-bold mb-2"
              >
                ชื่อเจ้าหน้าที่</label
              >
              <InputText type="text" class="w-full" />
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
          >คุณต้องการลบข้อมูลการตรวจระบบสืบพันธ์ุครั้งที่ 2 ใช่หรือไม่</span
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
      { label: "กิจกรรมการตรวจระบบสืบพันธุ์", to: "" },
    ]);
    const data = reactive([
      {
        id: "1",
        date: "25/05/2560",
        bcs: "5",
        first: "20/05.2565",
        feel: "ชัดเจน",
        result: "การผสมซ้ำ",
        womb: "ปกติ",
        ovary: "รังไข่เล็กไม่สมบูรณ์",
        other: "ไม่ทราบสาเหตุ",
        treat: "ฮอร์โมน ",
        opname: "น่าน สุทธหลวง",
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
      cities: [],
    };
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
