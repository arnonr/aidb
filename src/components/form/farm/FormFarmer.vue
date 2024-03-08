<template>
  <div class="mb-5">
    <h1 class="text-xl mb-2 font-light">ข้อมูลเกษตรกร</h1>
    <p class="p-0 m-0 text-500">ป้อนรายละเอียดเกษตรกร</p>
  </div>
  <form class="grid">
    <div class="col-12 lg:col-12">
      <div class="formgrid grid">
        <!-- <div class="field col-12 sm:col-12 lg:col-12">
          <div class="text-600 text-sm font-bold mb-2">
            เลือกประเภทบัตร<span class="text-red-500"> *</span>
          </div>
          <div
            v-for="(it, idx) of selectOptions.FarmerPIDType"
            :key="idx"
            class="field-radiobutton"
          >
            <RadioButton
              :id="idx"
              name="category"
              :value="it.value"
              v-model="search.FarmerPIDType"
              :readonly="true"
            />
            <label :for="idx">{{ it.name }}</label>
          </div>
        </div> -->
        <div class="field col-12 sm:col-12">
          <label class="block text-600 text-sm font-bold mb-2">
            ค้นหาข้อมูลเกษตรกรจากเลขประจำตัวประชาชน/เลขหนังสือเดินทาง
            (Passport)/เลขประจำตัวคนต่างด้าว<span class="text-red-500">
              *</span
            ></label
          >
          <InputText class="w-full" type="text" v-model="search.FarmerPID" />
          <!-- <Dropdown
            class="w-full"
            v-model="form.FarmerID"
            :options="data.farmer"
            optionLabel="FarmerNumber"
            optionValue="FarmerID"
            emptyMessage="ไม่มีข้อมูล"
            emptyFilterMessage="ไม่พบข้อมูล"
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
            @change="fillname($event)"
            @filter="searchFarmer($event)"
            placeholder="ค้นหาเลขบัตรประชาชน"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
            <template #option="slotProps">
              <div class="p-dropdown-car-option">
                <span>{{
                  slotProps.option.FarmerNumber +
                  " | " +
                  slotProps.option.GivenName +
                  " " +
                  slotProps.option.Surname
                }}</span>
              </div>
            </template>
          </Dropdown> -->
          <hr />
        </div>

        <div class="field col-12 sm:col-12" v-if="!search.FarmerPID">
          <label class="block text-600 text-sm font-bold mb-2">
            <span class="text-red-500"
              >* ในกรณีที่ยังไม่ได้ลงทะเบียนเกษตรกร</span
            ></label
          >
          <Button
            label="เพิ่มข้อมูลทะเบียนเกษตรกรใหม่"
            @click="newAdd()"
            icon="pi pi-save"
            iconPos="left"
          />
          <hr />
        </div>

        <div
          class="field col-12 sm:col-12"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <h1 class="text-xl mb-2 font-light">ข้อมูลบุคคล</h1>
        </div>
        <div
          class="field col-12 sm:col-6 lg:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2">
            เลขทะเบียนเกษตรกร
          </label>
          <InputText
            type="text"
            class="w-full"
            v-model="form.FarmerNumber"
            :readonly="checkSelect == 1"
          />
        </div>

        <div
          class="field col-12 sm:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2"
            >ประเภทบัตร<span class="text-red-500"> *</span></label
          >
          <Dropdown
            class="w-full"
            v-model="form.FarmerPIDType"
            :options="selectOptions.FarmerPIDType"
            optionLabel="name"
            optionValue="value"
            :virtualScrollerOptions="{
              itemSize: 38,
            }"
            :filter="true"
            :showClear="true"
            placeholder="เลือกประเภทบัตร"
            :class="{ 'p-invalid': valid }"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
        </div>

        <div
          class="field col-12 sm:col-6 lg:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2">
            เลขบัตรประจำตัวประชาชน<span class="text-red-500"> *</span>
          </label>

          <InputText
            type="text"
            v-if="form.FarmerPIDType == 1 || form.FarmerPIDType == null"
            class="w-full"
            maxlength="13"
            minlength="13"
            v-model="form.IdentificationNumber"
            :class="{ 'p-invalid': !form.IdentificationNumber && valid }"
            :readonly="checkSelect == 1"
          />

          <InputText
            type="text"
            v-if="form.FarmerPIDType == 3"
            class="w-full"
            maxlength="13"
            minlength="13"
            v-model="form.IdentificationNumber"
            :class="{ 'p-invalid': !form.IdentificationNumber && valid }"
            :readonly="checkSelect == 1"
          />

          <InputText
            type="text"
            v-if="form.FarmerPIDType == 3"
            class="w-full"
            v-model="form.IdentificationNumber"
            :readonly="checkSelect == 1"
          />

          <InputText
            type="text"
            v-if="form.FarmerPIDType == 2"
            class="w-full"
            v-model="form.IdentificationNumber"
            :readonly="checkSelect == 1"
          />
        </div>

        <div
          class="field col-12 sm:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2"
            >เพศ<span class="text-red-500"> *</span></label
          >
          <Dropdown
            class="w-full"
            v-model="form.GenderID"
            :options="data.gender"
            optionLabel="GenderName"
            optionValue="GenderID"
            :virtualScrollerOptions="{
              itemSize: 38,
            }"
            :filter="true"
            :showClear="true"
            placeholder="เลือกเพศ"
            :class="{ 'p-invalid': !form.GenderID && valid }"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
        </div>

        <div
          class="field col-12 sm:col-6 lg:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2">
            คำนำหน้า<span class="text-red-500"> *</span>
          </label>
          <Dropdown
            class="w-full"
            v-model="form.TitleID"
            :options="data.title"
            optionLabel="TitleName"
            optionValue="TitleID"
            :virtualScrollerOptions="{
              itemSize: 38,
            }"
            :filter="true"
            :showClear="true"
            placeholder="เลือกคำนำหน้า"
            :class="{ 'p-invalid': !form.TitleID && valid }"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
        </div>
        <div
          class="field col-12 sm:col-6 lg:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2"
            >ชื่อ<span class="text-red-500"> *</span></label
          >
          <InputText
            type="text"
            class="w-full"
            v-model="form.GivenName"
            :class="{ 'p-invalid': !form.GivenName && valid }"
            :readonly="checkSelect == 1"
          />
        </div>
        <div
          class="field col-12 sm:col-6 lg:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2">
            ชื่อกลาง
          </label>
          <InputText
            type="text"
            class="w-full"
            v-model="form.MiddleName"
            :readonly="checkSelect == 1"
          />
        </div>
        <div
          class="field col-12 sm:col-6 lg:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2"
            >นามสกุล<span class="text-red-500"> *</span></label
          >
          <InputText
            type="text"
            class="w-full"
            v-model="form.Surname"
            :class="{ 'p-invalid': !form.Surname && valid }"
            :readonly="checkSelect == 1"
          />
        </div>
        <div
          class="field col-12 sm:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2">
            วันเดือนปีเกิด
          </label>
          <Datepicker
            v-model="form.BirthDate"
            id="dateRange"
            locale="th"
            :format="format"
            utc
            :enableTimePicker="false"
            cancelText="ยกเลิก"
            selectText="ยืนยัน"
            placeholder="เลือกวันที่"
            :maxDate="new Date()"
          >
            <template #year-overlay-value="{ text }">
              {{ parseInt(text) + 543 }}
            </template>
            <template #year="{ year }">
              {{ year + 543 }}
            </template>
          </Datepicker>
          <!-- <Calendar
            class="w-full"
            :maxDate="new Date()"
            v-model="form.BirthDate"
            :showButtonBar="true"
            :showIcon="true"
            :manualInput="false"
          /> -->
        </div>
        <div
          class="field col-12 sm:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2">
            เบอร์โทรศัพท์
          </label>
          <InputText
            type="text"
            class="w-full"
            v-model="form.TelephoneNumber"
          />
        </div>
        <div
          class="field col-12 sm:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2">
            เบอร์โทรศัพท์ (มือถือ)<span class="text-red-500"> *</span>
          </label>
          <InputMask
            type="text"
            class="w-full"
            mask="999-999-9999"
            v-model="form.MobilePhoneNumber"
            :class="{ 'p-invalid': !form.MobilePhoneNumber && valid }"
          />
        </div>
        <div
          class="field col-12 sm:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2">
            ระดับการศึกษา
          </label>
          <Dropdown
            class="w-full"
            v-model="form.EducationID"
            :options="data.education"
            optionLabel="EducationName"
            optionValue="EducationID"
            :showClear="true"
            placeholder="เลือกระดับการศึกษา"
          >
          </Dropdown>
        </div>
        <div
          class="field col-12 sm:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2"> อีเมล </label>
          <InputText type="email" class="w-full" v-model="form.Email" />
        </div>
        <div
          class="field col-12 sm:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2">
            ไอดีไลน์
          </label>
          <InputText type="text" class="w-full" v-model="form.IDLine" />
        </div>
        <div
          class="field col-12 sm:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2">
            อาชีพหลัก
          </label>
          <Dropdown
            class="w-full"
            v-model="form.MainOccupationID"
            :options="data.occupation"
            optionLabel="OccupationName"
            optionValue="OccupationID"
            :virtualScrollerOptions="{
              itemSize: 38,
            }"
            :filter="true"
            :showClear="true"
            placeholder="เลือกอาชีพหลัก"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
        </div>
        <div
          class="field col-12 sm:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2">
            อาชีพรอง
          </label>
          <Dropdown
            class="w-full"
            v-model="form.SecondOccupationID"
            :options="data.occupation"
            optionLabel="OccupationName"
            optionValue="OccupationID"
            :virtualScrollerOptions="{
              itemSize: 38,
            }"
            :filter="true"
            :showClear="true"
            placeholder="เลือกอาชีพรอง"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
        </div>
        <div
          class="field col-12 sm:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2">
            วันที่ขึ้นทะเบียนเกษตรกร
          </label>
          <Datepicker
            v-model="form.FarmerRegisterDate"
            id="dateRange"
            locale="th"
            :format="format"
            utc
            :enableTimePicker="false"
            cancelText="ยกเลิก"
            selectText="ยืนยัน"
            placeholder="เลือกวันที่"
            :maxDate="new Date()"
          >
            <template #year-overlay-value="{ text }">
              {{ parseInt(text) + 543 }}
            </template>
            <template #year="{ year }">
              {{ year + 543 }}
            </template>
          </Datepicker>
          <!-- <Calendar
            class="w-full"
            v-model="form.FarmerRegisterDate"
            :showButtonBar="true"
            :showIcon="true"
            :manualInput="false"
          /> -->
        </div>
        <!-- <div
          class="field col-12 sm:col-6"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <label class="block text-600 text-sm font-bold mb-2">
            สถานะเกษตรกร
          </label>
          <Dropdown
            class="w-full"
            v-model="form.FarmerRegisterStatus"
            :options="items"
            optionLabel="label"
            optionValue="value"
            placeholder="เลือกสถานะ"
          >
            <template v-slot:loader="{ options }">
              <div class="flex align-items-center p-2" style="height: 38px">
                <Skeleton :width="options.even ? '60%' : '50%'" height="1rem" />
              </div>
            </template>
          </Dropdown>
        </div> -->
        <div
          class="field col-12 sm:col-12"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <h1 class="text-xl mt-4 mb-3 font-light">
            ที่อยู่เกษตรกรตามทะเบียนบ้าน
          </h1>
        </div>
        <div
          class="field col-12 sm:col-12"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <form class="grid">
            <div class="col-12 lg:col-12">
              <div class="formgrid grid">
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    เลขที่บ้าน (ที่อยู่ตามทะเบียนบ้าน)
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.HouseBuildingNumber"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    หมู่ที่</label
                  >
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.HouseMoo"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ชื่อหมู่บ้าน/อาคาร
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.HouseVillageName"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ชั้น
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.HouseFloor"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ถนน
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.HouseStreet"
                  />
                </div>

                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ตรอก
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.HouseSubLane"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ซอย
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.HouseLane"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    จังหวัด<span class="text-red-500"> *</span></label
                  >
                  <Dropdown
                    class="w-full"
                    v-model="form.HouseProvinceID"
                    :options="province"
                    optionLabel="ProvinceName"
                    optionValue="ProvinceID"
                    :virtualScrollerOptions="{
                      itemSize: 38,
                    }"
                    :filter="true"
                    :showClear="true"
                    placeholder="เลือกจังหวัด"
                    @change="filterHouseAmphur($event)"
                  >
                    <template v-slot:loader="{ options }">
                      <div
                        class="flex align-items-center p-2"
                        style="height: 38px"
                      >
                        <Skeleton
                          :width="options.even ? '60%' : '50%'"
                          height="1rem"
                        />
                      </div>
                    </template>
                  </Dropdown>
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    อำเภอ/เขต<span class="text-red-500"> *</span>
                  </label>
                  <Dropdown
                    class="w-full"
                    v-model="form.HouseAmphurID"
                    :options="amphur.data"
                    optionLabel="AmphurName"
                    optionValue="AmphurID"
                    :virtualScrollerOptions="{
                      itemSize: 38,
                    }"
                    :filter="true"
                    :showClear="true"
                    placeholder="เลือกอำเภอ"
                    @change="filterHouseTumbol($event)"
                  >
                    <template v-slot:loader="{ options }">
                      <div
                        class="flex align-items-center p-2"
                        style="height: 38px"
                      >
                        <Skeleton
                          :width="options.even ? '60%' : '50%'"
                          height="1rem"
                        />
                      </div>
                    </template>
                  </Dropdown>
                </div>

                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ตำบล<span class="text-red-500"> *</span>
                  </label>
                  <Dropdown
                    class="w-full"
                    v-model="form.HouseTumbolID"
                    :options="tumbol.data"
                    optionLabel="TumbolName"
                    optionValue="TumbolID"
                    :virtualScrollerOptions="{
                      itemSize: 38,
                    }"
                    :filter="true"
                    :showClear="true"
                    placeholder="เลือกตำบล"
                    @change="filterHouseZipcode($event)"
                  >
                    <template v-slot:loader="{ options }">
                      <div
                        class="flex align-items-center p-2"
                        style="height: 38px"
                      >
                        <Skeleton
                          :width="options.even ? '60%' : '50%'"
                          height="1rem"
                        />
                      </div>
                    </template>
                  </Dropdown>
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    รหัสไปรษณีย์
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    placeholder=""
                    v-model="form.HouseZipCode"
                    readonly
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    เลขรหัสประจำบ้าน
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    placeholder=""
                    v-model="form.HouseAddressIdentification"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ละติจูด
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    placeholder=""
                    v-model="form.HouseLatitude"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ลองจิจูด
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    placeholder=""
                    v-model="form.HouseLongitude"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div
          class="field col-12 sm:col-12"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <h1 class="text-xl mt-4 mb-3 font-light">
            ที่อยู่เกษตรกรที่ติดต่อได้
          </h1>
        </div>
        <div
          class="field col-12 sm:col-12"
          v-if="checkSelect == 1 || checkSelect == 2"
        >
          <form class="grid">
            <div class="col-12 lg:col-12">
              <div class="formgrid grid">
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    บ้านเลขที่
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.ResidenceBuildingNumber"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold">
                    หมู่ที่</label
                  >
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.ResidenceMoo"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ชื่อหมู่บ้าน/อาคาร
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.ResidenceVillageName"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ชั้น
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.ResidenceFloor"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ถนน
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.ResidenceStreet"
                  />
                </div>

                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ตรอก
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.ResidenceSubLane"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ซอย
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    v-model="form.ResidenceLane"
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    จังหวัด</label
                  >
                  <Dropdown
                    class="w-full"
                    v-model="form.ResidenceProvinceID"
                    :options="province"
                    optionLabel="ProvinceName"
                    optionValue="ProvinceID"
                    :virtualScrollerOptions="{
                      itemSize: 38,
                    }"
                    :filter="true"
                    :showClear="true"
                    placeholder="เลือกจังหวัด"
                    @change="filterResidenceAmphur($event)"
                  >
                    <template v-slot:loader="{ options }">
                      <div
                        class="flex align-items-center p-2"
                        style="height: 38px"
                      >
                        <Skeleton
                          :width="options.even ? '60%' : '50%'"
                          height="1rem"
                        />
                      </div>
                    </template>
                  </Dropdown>
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    อำเภอ/เขต
                  </label>
                  <Dropdown
                    class="w-full"
                    v-model="form.ResidenceAmphurID"
                    :options="amphur.data"
                    optionLabel="AmphurName"
                    optionValue="AmphurID"
                    :virtualScrollerOptions="{
                      itemSize: 38,
                    }"
                    :filter="true"
                    :showClear="true"
                    placeholder="เลือกอำเภอ"
                    @change="filterResidenceTumbol($event)"
                  >
                    <template v-slot:loader="{ options }">
                      <div
                        class="flex align-items-center p-2"
                        style="height: 38px"
                      >
                        <Skeleton
                          :width="options.even ? '60%' : '50%'"
                          height="1rem"
                        />
                      </div>
                    </template>
                  </Dropdown>
                </div>

                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    ตำบล
                  </label>
                  <Dropdown
                    class="w-full"
                    v-model="form.ResidenceTumbolID"
                    :options="tumbol.data"
                    optionLabel="TumbolName"
                    optionValue="TumbolID"
                    :virtualScrollerOptions="{
                      itemSize: 38,
                    }"
                    :filter="true"
                    :showClear="true"
                    placeholder="เลือกตำบล"
                    @change="filterResidenceZipcode($event)"
                  >
                    <template v-slot:loader="{ options }">
                      <div
                        class="flex align-items-center p-2"
                        style="height: 38px"
                      >
                        <Skeleton
                          :width="options.even ? '60%' : '50%'"
                          height="1rem"
                        />
                      </div>
                    </template>
                  </Dropdown>
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    รหัสไปรษณีย์
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    placeholder=""
                    v-model="form.ResidenceZipCode"
                    readonly
                  />
                </div>
                <div class="field col-12 sm:col-6">
                  <label class="block text-600 text-sm font-bold mb-2">
                    เลขรหัสประจำบ้าน
                  </label>
                  <InputText
                    type="text"
                    class="w-full"
                    placeholder=""
                    v-model="form.ResidenceAddressIdentification"
                  />
                </div>
                <!-- <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  ละติจูด
                </label>
                <InputText
                  type="text"
                  class="w-full"
                  placeholder=""
                  v-model="form.ResidenceLatitude"
                   :class="{ 'p-invalid': !form.ResidenceLatitude && valid }"
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  ลองจิจูด
                </label>
                <InputText
                  type="text"
                  class="w-full"
                  placeholder=""
                  v-model="form.ResidenceLongitude"
                  :class="{ 'p-invalid': !form.ResidenceLongitude && valid }"
                />
              </div> -->
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-12 text-right mt-5 flex justify-content-between">
      <router-link to="/agency/farm">
        <Button
          label="ย้อนกลับ"
          icon="pi pi-angle-left"
          class="p-button-secondary"
        />
      </router-link>
      <!-- <Button
        label="บันทึก"
        @click="nextPage()"
        icon="pi pi-save"
        iconPos="left"
        v-if="checkSelect == 1 || checkSelect == 2"
      /> -->

      <Button
        label="ต่อไป"
        @click="nextPage()"
        icon="pi pi-angle-right"
        iconPos="right"
        v-if="checkSelect == 1 || checkSelect == 2"
      />
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import _ from "lodash";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import store from "@/service/Vuex";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      // load
      url: [],
      data: [],
      isLoading: false,
      valid: false,
      controller: new AbortController(),
      selectOptions: {
        FarmerPIDType: [
          { name: "เลขประจำตัวประชาชน", value: 1 },
          { name: "เลขหนังสือเดินทาง (Passport)", value: 2 },
          { name: "เลขประจำตัวคนต่างด้าว", value: 3 },
        ],
      },

      // form

      loading: false,
      form: {},

      checkSelect: 0,

      amphur: {
        data: [],
        temp: [],
      },
      tumbol: {
        data: [],
        temp: [],
      },
      province: {
        data: [],
        temp: [],
      },

      FarmID: null,

      search: {
        FarmPID: "",
        FarmerPIDType: null,
      },

      items: [
        // {
        //   label: "ขึ้นทะเบียนแล้ว",
        //   value: 1,
        // },
        {
          label: "ยังไม่ขึ้นทะเบียน",
          value: 0,
        },
      ],
    };
  },
  loadLazyTimeout: null,
  computed: {
    lastFarmer() {
      let item = this.data.farmer.slice(-1)[0];
      // console.log(item.FarmerID);
      return item.FarmerID;
    },
    lastFarm() {
      let item = this.data.farm.slice(-1)[0];
      // console.log(item.FarmID);
      return item.FarmID;
    },
    ...mapGetters({
      user: "user",
      animal_id: "animal_id",
      farmItem: "farmItem",
    }),
  },
  mounted() {
    this.load();
  },
  watch: {
    "form.FarmerID": _.debounce(function () {}, 500),

    "search.FarmerPID": _.debounce(function () {
      this.getFarmer();
    }, 2000),

    "form.IdentificationNumber":
      (function () {
        this.getFarmer();
      },
      2000),

    // search.FarmerPID

    // "form.TitleID"(val) {
    //   // console.log(val);

    //   // ชาย 1 หญิง 2
    //   // นาย
    //   if (val == 3) {
    //     this.form.GenderID = 1;
    //     // console.log(11);
    //   } else if (val == 4) {
    //     this.form.GenderID = 2;
    //   } else if (val == 5) {
    //     this.form.GenderID = 2;
    //   }
    // },

    "form.GenderID"(val) {
      if (val == 1) {
        this.data.title = this.data.title_all.filter((x) => {
          return x.TitleID == 3;
        });
      } else {
        this.data.title = this.data.title_all.filter((x) => {
          return x.TitleID == 4 || x.TitleID == 5;
        });
      }
    },
  },

  methods: {
    format(date) {
      const dayStart = date.getDate();
      const monthStart = date.getMonth();
      const yearStart = date.getFullYear() + 543;
      const formatStart = format(
        new Date(yearStart, monthStart, dayStart),
        "dd/MM/yyyy",
        {
          locale: th,
        }
      );
      return `${formatStart}`;
    },
    getFarmer() {
      if (this.search.FarmerPID) {
        // if (!this.search.FarmerPIDType) {
        //   this.$toast.add({
        //     severity: "error",
        //     summary: "พบข้อผิดพลาด",
        //     detail: "โปรดเลือกประเภทบัตร",
        //     life: 2000,
        //   });
        //   this.form = {};
        //   this.checkSelect = 3;
        //   return;
        // }
        axios
          .get(
            "/farmer/fetch-before-add-farm?IdentificationNumber=" +
              this.search.FarmerPID,
            {
              signal: this.controller.signal,
            }
          )
          .then((res) => {
            // this.form = res.data.rows[0];

            if (Array.isArray(res.data.rows)) {
              this.form = res.data.rows[0];
            } else {
              this.form = res.data.rows.res;
            }
            this.checkSelect = 1;

            if (this.form.FarmerRegisterStatus == 0) {
              Swal.fire({
                title: "หมายเลขบัตรประชาชนนี้ยังไม่ขึ้นทะเบียนกับกรม",
                //   html: "",
                text: "",
                icon: "warning",
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  // ถามว่าพบข้อมูล
                  axios
                    .get(
                      "farm/selection?isActive=1&includeAll=false&includeFarmStatus=true&FarmerID=" +
                        this.form.FarmerID,
                      {
                        signal: this.controller.signal,
                      }
                    )
                    .then((res1) => {
                      if (res1) {
                        let farmCheck = res1.data.rows;

                        let text = "";
                        text =
                          text +
                          "<table style='margin-top:1em; border-collapse: collapse;width:100%'><tr><th style='border: 1px solid;'>เลขทะเบียนฟาร์ม</th><th  style='border: 1px solid;'>ชื่อฟาร์ม</th><th  style='border: 1px solid;'>สถานะ</th></tr>";

                        farmCheck.forEach((el) => {
                          text =
                            text +
                            "<tr><td style='border: 1px solid;'>" +
                            el.FarmIdentificationNumber +
                            "</td><td style='border: 1px solid;'>" +
                            el.FarmName +
                            "</td><td style='border: 1px solid;'>" +
                            el.FarmStatusName +
                            "</td></tr>";
                        });

                        text = text + "</table>";

                        if (farmCheck.length != 0) {
                          Swal.fire({
                            title:
                              "หมายเลขบัตรประชาชนนี้เคยขึ้นทะเบียนฟาร์มแล้ว ดังนี้",
                            html: text,
                            showDenyButton: true,
                            showCancelButton: false,
                            confirmButtonText: "เพิ่มฟาร์มใหม่",
                            customClass: "swal-wide",
                            denyButtonText: `ยกเลิก`,
                          }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                              this.$toast.add({
                                severity: "success",
                                summary: "สำเร็จ",
                                detail: "พบข้อมูลเกษตกร",
                                life: 2000,
                              });
                            } else if (result.isDenied) {
                              //   Swal.fire("Changes are not saved", "", "info");

                              this.$router.push({ name: "farmall" });
                            }
                          });
                        }
                      }

                      // return res;
                    });
                }
              });
            } else {
              axios
                .get(
                  "farm/selection?isActive=1&includeAll=false&includeFarmStatus=true&FarmerID=" +
                    this.form.FarmerID,
                  {
                    signal: this.controller.signal,
                  }
                )
                .then((res1) => {
                  if (res1) {
                    let farmCheck = res1.data.rows;

                    let text = "";
                    text =
                      text +
                      "<table style='margin-top:1em; border-collapse: collapse;width:100%'><tr><th style='border: 1px solid;'>เลขทะเบียนฟาร์ม</th><th  style='border: 1px solid;'>ชื่อฟาร์ม</th><th  style='border: 1px solid;'>สถานะ</th></tr>";

                    farmCheck.forEach((el) => {
                      text =
                        text +
                        "<tr><td style='border: 1px solid;'>" +
                        el.FarmIdentificationNumber +
                        "</td><td style='border: 1px solid;'>" +
                        el.FarmName +
                        "</td><td style='border: 1px solid;'>" +
                        el.FarmStatusName +
                        "</td></tr>";
                    });

                    text = text + "</table>";
                    if (farmCheck.length != 0) {
                      Swal.fire({
                        title:
                          "หมายเลขบัตรประชาชนนี้เคยขึ้นทะเบียนฟาร์มแล้ว ดังนี้",
                        html: text,
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "เพิ่มฟาร์มใหม่",
                        customClass: "swal-wide",
                        denyButtonText: `ยกเลิก`,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          this.$toast.add({
                            severity: "success",
                            summary: "สำเร็จ",
                            detail: "พบข้อมูลเกษตกร",
                            life: 2000,
                          });
                        } else if (result.isDenied) {
                          //   Swal.fire("Changes are not saved", "", "info");

                          this.$router.push({ name: "farmall" });
                        }
                      });
                    }
                  }

                  // return res;
                });
            }
          })
          .catch(() => {
            this.checkSelect = 3;
            this.valid = true;
            this.$toast.add({
              severity: "error",
              summary: "ล้มเหลว",
              detail: "ไม่พบข้อมูล",
              life: 5000,
            });
            return false;
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.form = {};
        this.checkSelect = 3;
      }
    },

    filterHouseAmphur($event) {
      let val = $event.value;
      if (val) {
        this.amphur.data = this.amphur.temp;
        this.amphur.data = this.amphur.data.filter(
          (item) => item.ProvinceID == val
        );
      } else {
        this.amphur.data = this.amphur.temp;
      }
    },
    filterHouseTumbol($event) {
      let val = $event.value;
      if (val) {
        this.tumbol.data = this.tumbol.temp;
        this.tumbol.data = this.tumbol.data.filter(
          (item) => item.AmphurID == val
        );
      } else {
        this.tumbol.data = this.tumbol.temp;
      }
    },
    filterHouseZipcode($event) {
      console.log($event.value);
      let val = $event.value;
      if (val) {
        console.log(this.tumbol);
        console.log(this.tumbol.temp[val].Zipcode);
        this.form.HouseZipCode = this.tumbol.temp[val].Zipcode;
      } else {
        this.form.HouseZipCode = "";
      }
    },
    filterResidenceAmphur($event) {
      let val = $event.value;
      if (val) {
        this.amphur.data = this.amphur.temp;
        this.amphur.data = this.amphur.data.filter(
          (item) => item.ProvinceID == val
        );
      } else {
        this.amphur.data = this.amphur.temp;
      }
    },
    filterResidenceTumbol($event) {
      let val = $event.value;
      if (val) {
        this.tumbol.data = this.tumbol.temp;
        this.tumbol.data = this.tumbol.data.filter(
          (item) => item.AmphurID == val
        );
      } else {
        this.tumbol.data = this.tumbol.temp;
      }
    },
    filterResidenceZipcode($event) {
      let val = $event.value;
      if (val) {
        this.form.ResidenceZipCode = this.tumbol.temp[val].Zipcode;
      } else {
        this.form.ResidenceZipCode = "";
      }
    },
    validation() {
      if (
        !this.form.TitleID ||
        !this.form.GivenName ||
        !this.form.Surname ||
        !this.form.GenderID ||
        !this.form.IdentificationNumber ||
        !this.form.MobilePhoneNumber
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

    chkDigitPid(p_iPID) {
      var total = 0;
      var iPID;
      var chk;
      var Validchk;
      iPID = p_iPID.replace(/-/g, "");
      Validchk = iPID.substr(12, 1);
      var j = 0;
      var pidcut;
      for (var n = 0; n < 12; n++) {
        pidcut = parseInt(iPID.substr(j, 1));
        total = total + pidcut * (13 - n);
        j++;
      }

      chk = 11 - (total % 11);

      if (chk == 10) {
        chk = 0;
      } else if (chk == 11) {
        chk = 1;
      }
      if (chk == Validchk) {
        // alert("ระบุหมายเลขประจำตัวประชาชนถูกต้อง");

        return true;
      } else {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "กรุณาระบุหมายเลขประจำตัวประชาชนให้ถูกต้อง",
          life: 5000,
        });
        // alert("ระบุหมายเลขประจำตัวประชาชนไม่ถูกต้อง");
        return false;
      }
    },
    load() {
      // url list
      this.url.farmer = "/farmer";
      this.url.title = "/title?isActive=1";
      this.url.gender = "/gender?isActive=1";
      this.url.education = "/education?isActive=1";
      this.url.occupation = "/occupation?isActive=1";
      this.url.province = "/province/selection?includeAll=false&isActive=1";
      this.url.tumbol = "/tumbol/selection?includeAll=false&isActive=1";
      this.url.amphur = "/amphur/selection?includeAll=false&isActive=1";
      this.url.farm = "/farm?isActive=1";

      axios
        .get(this.url.title, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.title_all = res.data.rows;
          this.data.title = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.gender, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.gender = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.education, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.education = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.occupation, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.data.occupation = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.province, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.province = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
      axios
        .get(this.url.tumbol, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.tumbol.data = res.data.rows;
          this.tumbol.temp = this.tumbol.data;
        })
        .finally(() => {
          this.isLoading = false;
        });

      axios
        .get(this.url.amphur, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.amphur.data = res.data.rows;
          this.amphur.temp = this.amphur.data;
        })
        .finally(() => {
          this.isLoading = false;
        });

      //   axios
      //     .get(this.url.farm, {
      //       signal: this.controller.signal,
      //     })
      //     .then((res) => {
      //       this.data.farm = res.data.rows;
      //     })
      //     .finally(() => {
      //       this.isLoading = false;
      //     });
    },
    nextPage() {
      if (this.validation() == false) {
        return;
      }

      if (this.checkSelect != 1) {
        if (this.form.FarmerPIDTypeID == 1) {
          if (!this.chkDigitPid(this.form.IdentificationNumber)) {
            return false;
          }
        }
      }

      this.formFarm = this.form;
      // this.formFarm = {
      //   FarmerID: this.form.FarmerID,
      //   FarmerRegisterDate: this.form.FarmerRegisterDate,
      //   FarmerRegisterStatus: this.form.FarmerRegisterStatus,
      //   FarmerTypeID: this.form.FarmerTypeID,
      //   FarmerNumber: this.form.FarmerNumber,
      //   IdentificationNumber: this.form.IdentificationNumber,
      //   TitleID: this.form.TitleID,
      //   GivenName: this.form.GivenName,
      //   MiddleName: this.form.MiddleName,
      //   Surname: this.form.Surname,
      //   GenderID: this.form.GenderID,
      //   BirthDate: this.form.BirthDate,
      //   TelephoneNumber: this.form.TelephoneNumber,
      //   MobilePhoneNumber: this.form.MobilePhoneNumber,
      //   EducationID: this.form.EducationID,
      //   Email: this.form.Email,
      //   IDLine: this.form.IDLine,
      //   MainOccupationID: this.form.MainOccupationID,
      //   SecondOccupationID: this.form.SecondOccupationID,

      //   HouseBuildingNumber: this.form.HouseBuildingNumber,
      //   HouseMoo: this.form.HouseMoo,
      //   HouseVillageName: this.form.HouseVillageName,
      //   HouseFloor: this.form.HouseFloor,
      //   HouseStreet: this.form.HouseStreet,
      //   HouseSubLane: this.form.HouseSubLane,
      //   HouseLane: this.form.HouseLane,
      //   HouseProvinceID: this.form.HouseProvinceID,
      //   HouseAmphurID: this.form.HouseAmphurID,
      //   HouseTumbolID: this.form.HouseTumbolID,
      //   HouseZipCode: this.form.HouseZipCode,
      //   HouseAddressIdentification: this.form.HouseAddressIdentification,
      //   HouseLatitude: this.form.HouseLatitude,
      //   HouseLongitude: this.form.HouseLongitude,
      //   ResidenceBuildingNumber: this.form.ResidenceBuildingNumber,
      //   ResidenceMoo: this.form.ResidenceMoo,
      //   ResidenceVillageName: this.form.ResidenceVillageName,
      //   ResidenceFloor: this.form.ResidenceFloor,
      //   ResidenceStreet: this.form.ResidenceStreet,
      //   ResidenceSubLane: this.form.ResidenceSubLane,
      //   ResidenceLane: this.form.ResidenceLane,
      //   ResidenceProvinceID: this.form.ResidenceProvinceID,
      //   ResidenceAmphurID: this.form.ResidenceAmphurID,
      //   ResidenceTumbolID: this.form.ResidenceTumbolID,
      //   ResidenceZipCode: this.form.ResidenceZipCode,
      //   ResidenceAddressIdentification:
      //     this.form.ResidenceAddressIdentification,
      // };

      if (this.checkSelect == 2) {
        this.callPerson();
      } else {
        store.dispatch("farmItem", this.formFarm).then(() => {
          this.$emit("next-page", {
            pageIndex: 0,
          });
        });
      }

      // this.farmItem.StaffID = this.user.StaffID;

      // // console.log(this.user);

      // // console.log(this.farmItem);
      // axios
      //   .post(this.url.farm, this.farmItem)
      //   .then((res) => {
      //     // console.log(res);
      //     this.FarmID = res.data.FarmID;
      //     if (this.checkSelect == 1) {
      //       this.callAdd(this.FarmID);
      //     } else {
      //       this.callPerson();
      //     }

      //     this.$toast.add({
      //       severity: "success",
      //       summary: "สำเร็จ",
      //       detail: "เพิ่มข้อมูลเสร็จสิ้น",
      //       life: 3000,
      //     });
      //     setTimeout(() => {
      //       this.$router.push("/agency/farm");
      //     }, 3000);
      //   })
      //   // error
      //   .catch((err) => {
      //     this.$toast.add({
      //       severity: "error",
      //       summary: "ล้มเหลว",
      //       detail: err.response.data.error.message,
      //       life: 5000,
      //     });
      //   })
      //   .finally(() => {
      //     this.isLoading = false;
      //   });
    },

    emits: ["next-page", "prev-page"],
    onLazyLoad() {
      this.loading = true;

      if (this.loadLazyTimeout) {
        clearTimeout(this.loadLazyTimeout);
      }

      this.loadLazyTimeout = setTimeout(() => {
        this.loading = false;
      }, Math.random() * 1000 + 250);
    },
    newAdd() {
      this.checkSelect = 2;
    },

    callAdd(id) {
      let dataFarm = {
        FarmerID: this.form.FarmerID,
      };

      // console.log(dataFarm);

      axios
        .put("farm/" + id, dataFarm)
        .then(() => {})
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        });

      this.form.FarmerRegisterStatus = 2;

      axios
        .put("farmer/" + this.form.FarmerID, this.form)
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

    callPerson() {
      // console.log(55);
      this.form.FarmerRegisterStatus = 0;
      axios
        .post(this.url.farmer, this.form)
        .then((res) => {
          this.formFarm.FarmerID = res.data.FarmerID;
          store.dispatch("farmItem", this.formFarm).then(() => {
            this.$emit("next-page", {
              pageIndex: 0,
            });
          });
        })
        // error
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: err.response.data.error.message,
            life: 5000,
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    callAdd2(id) {
      this.FarmID;

      let dataFarm = {
        FarmerID: id,
      };

      axios
        .put("farm/" + this.FarmID, dataFarm)
        .then(() => {
          // this.$toast.add({
          //   severity: "success",
          //   summary: "สำเร็จ",
          //   detail: "แก้ไขข้อมูลเสร็จสิ้น",
          //   life: 5000,
          // });
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
  },
};
</script>

<style lang="scss">
.swal-wide {
  width: 850px;
}
</style>
