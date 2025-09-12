<template>
    <div class="mb-5">
        <h1 class="text-xl mb-2 font-light">ข้อมูลเกษตรกร</h1>
        <p class="p-0 m-0 text-500">ป้อนรายละเอียดเกษตรกร</p>
    </div>
    <form class="grid">
        <div class="col-12 lg:col-12">
            <div class="formgrid grid">
                <div class="field col-12 sm:col-12">
                    <hr />
                    <h1 class="text-xl mb-2 font-light">ข้อมูลบุคคล</h1>
                </div>
                <div class="field col-10 sm:col-10 lg:col-10">
                    <label class="block text-600 text-sm font-bold mb-2">
                        เลขบัตรประจำตัวประชาชน<span class="text-red-500">
                            *</span
                        >
                    </label>
                    <InputText
                        type="text"
                        class="w-full"
                        v-model="form.IdentificationNumber"
                        :readonly="checkSelect == 1"
                        :class="{
                            'p-invalid': !form.IdentificationNumber && valid,
                        }"
                    />
                    <!-- <InputMask
                        type="text"
                        mask="9-9999-99999-99-9"
                        class="w-full"
                        unmask="true"
                        v-model="form.IdentificationNumber"
                        :readonly="checkSelect == 1"
                        :class="{ 'p-invalid': !form.IdentificationNumber && valid }"
                    /> -->
                                <!-- <InputText
                        type="text"
                        class="w-full"
                        v-model="form.IdentificationNumber"
                    /> -->

                                <!-- 

                        :class="{ 'p-invalid': !form.IdentificationNumber && valid }" -->
                </div>
                <div class="field col-2 sm:col-2 lg:col-2">
                    <Button
                        severity="success"
                        icon="pi pi-refresh"
                        @click="updateFarmer"
                        style="margin-top: 25px;"
                    ></Button>
                </div>

                <div class="field col-12 sm:col-6 lg:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        เลขทะเบียนเกษตรกร<span class="text-red-500"> *</span>
                    </label>
                    <InputText
                        type="text"
                        class="w-full"
                        disabled
                        v-model="form.FarmerNumber"
                        :class="{ 'p-invalid': !form.FarmerNumber && valid }"
                    />
                </div>
                <div class="field col-12 sm:col-6 lg:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        คำนำหน้า
                    </label>
                    <Dropdown
                        class="w-full"
                        v-model="form.TitleID"
                        :options="data.title"
                        optionLabel="TitleName"
                        optionValue="TitleID"
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
                        placeholder="เลือกคำนำหน้า"
                        :class="{ 'p-invalid': !form.TitleID && valid }"
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
                <div class="field col-12 sm:col-6 lg:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        ชื่อ</label
                    >
                    <InputText
                        type="text"
                        class="w-full"
                        v-model="form.GivenName"
                        :class="{ 'p-invalid': !form.GivenName && valid }"
                    />
                </div>

                <div class="field col-12 sm:col-6 lg:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        ชื่อกลาง
                    </label>
                    <InputText
                        type="text"
                        class="w-full"
                        v-model="form.MiddleName"
                    />
                </div>

                <div class="field col-12 sm:col-6 lg:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        นามสกุล
                    </label>
                    <InputText
                        type="text"
                        class="w-full"
                        v-model="form.Surname"
                        :class="{ 'p-invalid': !form.Surname && valid }"
                    />
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        เพศ
                    </label>
                    <Dropdown
                        class="w-full"
                        v-model="form.GenderID"
                        :options="data.gender"
                        optionLabel="GenderName"
                        optionValue="GenderID"
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
                        placeholder="เลือกเพศ"
                        :class="{ 'p-invalid': !form.GenderID && valid }"
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
                        autoApply
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
            v-model="form.BirthDate"
            dateFormat="dd-mm-yy"
            :manualInput="false"
            :class="{ 'p-invalid': !form.BirthDate && valid }"
          /> -->
                </div>

                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        หมายเลขโทรศัพท์
                    </label>
                    <!-- <InputMask v-model="form.TelephoneNumber" mask="99-999-9999" /> -->
                    <InputText
                        type="text"
                        class="w-full"
                        v-model="form.TelephoneNumber"
                        :class="{ 'p-invalid': !form.TelephoneNumber && valid }"
                    />
                </div>

                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        หมายเลขโทรศัพท์มือถือ
                    </label>
                    <InputText
                        type="text"
                        class="w-full"
                        v-model="form.MobilePhoneNumber"
                        :class="{
                            'p-invalid': !form.MobilePhoneNumber && valid,
                        }"
                    />
                </div>
                <div class="field col-12 sm:col-6">
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
                        :class="{ 'p-invalid': !form.EducationID && valid }"
                    >
                    </Dropdown>
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        อีเมล
                    </label>
                    <InputText
                        type="text"
                        class="w-full"
                        v-model="form.Email"
                        :class="{ 'p-invalid': !form.Email && valid }"
                    />
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">
                        ไอดีไลน์
                    </label>
                    <InputText
                        type="text"
                        class="w-full"
                        v-model="form.IDLine"
                        :class="{ 'p-invalid': !form.IDLine && valid }"
                    />
                </div>
                <div class="field col-12 sm:col-6">
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
                            lazy: true,
                            onLazyLoad: onLazyLoad,
                            itemSize: 38,
                            showLoader: true,
                            loading: loading,
                            delay: 250,
                        }"
                        :filter="true"
                        :showClear="true"
                        placeholder="เลือกอาชีพหลัก"
                        :class="{
                            'p-invalid': !form.MainOccupationID && valid,
                        }"
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
                        อาชีพรอง
                    </label>
                    <Dropdown
                        class="w-full"
                        v-model="form.SecondOccupationID"
                        :options="data.occupation"
                        optionLabel="OccupationName"
                        optionValue="OccupationID"
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
                        placeholder="เลือกอาชีพรอง"
                        :class="{
                            'p-invalid': !form.SecondOccupationID && valid,
                        }"
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
                <div class="field col-12">
                    <label class="block text-600 text-sm font-bold mb-2">
                        สถานะเกษตรกร
                    </label>
                    <Dropdown
                        class="w-full"
                        v-model="form.FarmerRegisterStatus"
                        :options="FarmerStatus"
                        optionLabel="label"
                        optionValue="value"
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
                        placeholder="เลือกสถานะการขึ้นทะเบียนเกษตรกร"
                        :class="{
                            'p-invalid': !form.FarmerRegisterStatus && valid,
                        }"
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
                <div class="field col-12 sm:col-12">
                    <h1 class="text-xl mt-4 mb-3 font-light">
                        ที่อยู่เกษตรกรตามทะเบียนบ้าน
                    </h1>
                </div>
                <div class="field col-12 sm:col-12">
                    <form class="grid">
                        <div class="col-12 lg:col-12">
                            <div class="formgrid grid">
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        เลขที่บ้าน (ที่อยู่ตามทะเบียนบ้าน)
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.HouseBuildingNumber"
                                        :class="{
                                            'p-invalid':
                                                !form.HouseBuildingNumber &&
                                                valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        หมู่ที่</label
                                    >
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.HouseMoo"
                                        :class="{
                                            'p-invalid':
                                                !form.HouseMoo && valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ชื่อหมู่บ้าน/อาคาร
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.HouseVillageName"
                                        :class="{
                                            'p-invalid':
                                                !form.HouseVillageName && valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ชั้น
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.HouseFloor"
                                        :class="{
                                            'p-invalid':
                                                !form.HouseFloor && valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ถนน
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.HouseStreet"
                                        :class="{
                                            'p-invalid':
                                                !form.HouseStreet && valid,
                                        }"
                                    />
                                </div>

                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ตรอก
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.HouseSubLane"
                                        :class="{
                                            'p-invalid':
                                                !form.HouseSubLane && valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ซอย
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.HouseLane"
                                        :class="{
                                            'p-invalid':
                                                !form.HouseLane && valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        จังหวัด</label
                                    >
                                    <Dropdown
                                        class="w-full"
                                        v-model="form.HouseProvinceID"
                                        :options="province"
                                        optionLabel="ProvinceName"
                                        optionValue="ProvinceID"
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
                                        placeholder="เลือกจังหวัด"
                                        @change="filterHouseAmphur($event)"
                                        :class="{
                                            'p-invalid':
                                                !form.HouseProvinceID && valid,
                                        }"
                                    >
                                        <template v-slot:loader="{ options }">
                                            <div
                                                class="flex align-items-center p-2"
                                                style="height: 38px"
                                            >
                                                <Skeleton
                                                    :width="
                                                        options.even
                                                            ? '60%'
                                                            : '50%'
                                                    "
                                                    height="1rem"
                                                />
                                            </div>
                                        </template>
                                    </Dropdown>
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        อำเภอ/เขต
                                    </label>
                                    <Dropdown
                                        class="w-full"
                                        v-model="form.HouseAmphurID"
                                        :options="amphur.data"
                                        optionLabel="AmphurName"
                                        optionValue="AmphurID"
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
                                        placeholder="เลือกอำเภอ"
                                        @change="filterHouseTumbol($event)"
                                        :class="{
                                            'p-invalid':
                                                !form.HouseAmphurID && valid,
                                        }"
                                    >
                                        <template v-slot:loader="{ options }">
                                            <div
                                                class="flex align-items-center p-2"
                                                style="height: 38px"
                                            >
                                                <Skeleton
                                                    :width="
                                                        options.even
                                                            ? '60%'
                                                            : '50%'
                                                    "
                                                    height="1rem"
                                                />
                                            </div>
                                        </template>
                                    </Dropdown>
                                </div>

                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ตำบล
                                    </label>
                                    <Dropdown
                                        class="w-full"
                                        v-model="form.HouseTumbolID"
                                        :options="tumbol.data"
                                        optionLabel="TumbolName"
                                        optionValue="TumbolID"
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
                                        placeholder="เลือกตำบล"
                                        @change="filterHouseZipcode($event)"
                                        :class="{
                                            'p-invalid':
                                                !form.HouseTumbolID && valid,
                                        }"
                                    >
                                        <template v-slot:loader="{ options }">
                                            <div
                                                class="flex align-items-center p-2"
                                                style="height: 38px"
                                            >
                                                <Skeleton
                                                    :width="
                                                        options.even
                                                            ? '60%'
                                                            : '50%'
                                                    "
                                                    height="1rem"
                                                />
                                            </div>
                                        </template>
                                    </Dropdown>
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
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
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        เลขรหัสประจำบ้าน
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        placeholder=""
                                        v-model="
                                            form.HouseAddressIdentification
                                        "
                                        :class="{
                                            'p-invalid':
                                                !form.HouseAddressIdentification &&
                                                valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ละติจูด
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        placeholder=""
                                        v-model="form.HouseLatitude"
                                        :class="{
                                            'p-invalid':
                                                !form.HouseLatitude && valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ลองจิจูด
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        placeholder=""
                                        v-model="form.HouseLongitude"
                                        :class="{
                                            'p-invalid':
                                                !form.HouseLongitude && valid,
                                        }"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="field col-12 sm:col-12">
                    <h1 class="text-xl mt-4 mb-3 font-light">
                        ที่อยู่เกษตรกรที่ติดต่อได้
                    </h1>
                </div>
                <div class="field col-12 sm:col-12">
                    <form class="grid">
                        <div class="col-12 lg:col-12">
                            <div class="formgrid grid">
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        บ้านเลขที่
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.ResidenceBuildingNumber"
                                        :class="{
                                            'p-invalid':
                                                !form.ResidenceBuildingNumber &&
                                                valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold"
                                    >
                                        หมู่ที่</label
                                    >
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.ResidenceMoo"
                                        :class="{
                                            'p-invalid':
                                                !form.ResidenceMoo && valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ชื่อหมู่บ้าน/อาคาร
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.ResidenceVillageName"
                                        :class="{
                                            'p-invalid':
                                                !form.ResidenceVillageName &&
                                                valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ชั้น
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.ResidenceFloor"
                                        :class="{
                                            'p-invalid':
                                                !form.ResidenceFloor && valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ถนน
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.ResidenceStreet"
                                        :class="{
                                            'p-invalid':
                                                !form.ResidenceStreet && valid,
                                        }"
                                    />
                                </div>

                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ตรอก
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.ResidenceSubLane"
                                        :class="{
                                            'p-invalid':
                                                !form.ResidenceSubLane && valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ซอย
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        v-model="form.ResidenceLane"
                                        :class="{
                                            'p-invalid':
                                                !form.ResidenceLane && valid,
                                        }"
                                    />
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        จังหวัด</label
                                    >
                                    <Dropdown
                                        class="w-full"
                                        v-model="form.ResidenceProvinceID"
                                        :options="province"
                                        optionLabel="ProvinceName"
                                        optionValue="ProvinceID"
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
                                        placeholder="เลือกจังหวัด"
                                        @change="filterResidenceAmphur($event)"
                                        :class="{
                                            'p-invalid':
                                                !form.ResidenceProvinceID &&
                                                valid,
                                        }"
                                    >
                                        <template v-slot:loader="{ options }">
                                            <div
                                                class="flex align-items-center p-2"
                                                style="height: 38px"
                                            >
                                                <Skeleton
                                                    :width="
                                                        options.even
                                                            ? '60%'
                                                            : '50%'
                                                    "
                                                    height="1rem"
                                                />
                                            </div>
                                        </template>
                                    </Dropdown>
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        อำเภอ/เขต
                                    </label>
                                    <Dropdown
                                        class="w-full"
                                        v-model="form.ResidenceAmphurID"
                                        :options="amphur.data"
                                        optionLabel="AmphurName"
                                        optionValue="AmphurID"
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
                                        placeholder="เลือกอำเภอ"
                                        @change="filterResidenceTumbol($event)"
                                        :class="{
                                            'p-invalid':
                                                !form.ResidenceAmphurID &&
                                                valid,
                                        }"
                                    >
                                        <template v-slot:loader="{ options }">
                                            <div
                                                class="flex align-items-center p-2"
                                                style="height: 38px"
                                            >
                                                <Skeleton
                                                    :width="
                                                        options.even
                                                            ? '60%'
                                                            : '50%'
                                                    "
                                                    height="1rem"
                                                />
                                            </div>
                                        </template>
                                    </Dropdown>
                                </div>

                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        ตำบล
                                    </label>
                                    <Dropdown
                                        class="w-full"
                                        v-model="form.ResidenceTumbolID"
                                        :options="tumbol.data"
                                        optionLabel="TumbolName"
                                        optionValue="TumbolID"
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
                                        placeholder="เลือกตำบล"
                                        @change="filterResidenceZipcode($event)"
                                        :class="{
                                            'p-invalid':
                                                !form.ResidenceTumbolID &&
                                                valid,
                                        }"
                                    >
                                        <template v-slot:loader="{ options }">
                                            <div
                                                class="flex align-items-center p-2"
                                                style="height: 38px"
                                            >
                                                <Skeleton
                                                    :width="
                                                        options.even
                                                            ? '60%'
                                                            : '50%'
                                                    "
                                                    height="1rem"
                                                />
                                            </div>
                                        </template>
                                    </Dropdown>
                                </div>
                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
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
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        เลขรหัสประจำบ้าน
                                    </label>
                                    <InputText
                                        type="text"
                                        class="w-full"
                                        placeholder=""
                                        v-model="
                                            form.ResidenceAddressIdentification
                                        "
                                        :class="{
                                            'p-invalid':
                                                !form.ResidenceAddressIdentification &&
                                                valid,
                                        }"
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

                                <div class="field col-12 sm:col-6">
                                    <label
                                        class="block text-600 text-sm font-bold mb-2"
                                    >
                                        วันที่ขึ้นทะเบียนเกษตรกร
                                    </label>
                                    <!-- <Calendar
                    class="w-full"
                    v-model="form.FarmerRegisterDate"
                    dateFormat="dd-mm-yy"
                    :manualInput="false"
                    :class="{ 'p-invalid': !form.FarmerRegisterDate && valid }"
                  /> -->

                                    <!-- <Datepicker
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
                    <template #year="{ year }">
                      {{ year + 543 }}
                    </template>
                    <template #year-overlay="{ value }">
                      {{ value + 543 }}
                    </template>
                  </Datepicker> -->
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-12 text-right mt-5 flex justify-content-between">
            <Button
                label="ย้อนกลับ"
                @click="prevPage()"
                icon="pi pi-angle-left"
                class="p-button-outlined p-button-secondary"
            />
            <Button
                label="บันทึก"
                @click="nextPage()"
                icon="pi pi-save"
                iconPos="left"
            />
        </div>
    </form>
</template>

<script>
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import _ from "lodash";
export default {
    data() {
        return {
            // load
            url: [],
            data: [],
            isLoading: false,
            controller: new AbortController(),

            // form
            valid: false,
            loading: false,
            form: [],

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
            FarmerStatus: [
                {
                    value: 0,
                    label: "ยังไม่ขึ้นทะเบียน",
                },
                {
                    value: 1,
                    label: "ขึ้นทะเบียนแล้ว",
                },
            ],
        };
    },
    loadLazyTimeout: null,
    computed: {
        // lastFarmer() {
        // let item = this.data.farm.slice(-1)[0];
        // console.log(item.FarmerID);
        // return item;
        // },
    },
    mounted() {
        this.load();
    },

    watch: {
        // ค้นหา
        "form.TitleID"(val) {
            // console.log(val);

            // ชาย 1 หญิง 2
            // นาย
            if (val == 3) {
                this.form.GenderID = 1;
                // console.log(11);
            } else if (val == 4) {
                this.form.GenderID = 2;
            } else if (val == 5) {
                this.form.GenderID = 2;
            }
        },

        "form.IdentificationNumber": _.debounce(function () {
            this.getFarmer();
        }, 2000),
    },
    methods: {
        getFarmer() {
            if (this.form.IdentificationNumber) {
                if (this.form.IdentificationNumber.length == 13) {
                    axios
                        .get(
                            this.url.farmer +
                                "?IdentificationNumber=" +
                                this.form.IdentificationNumber,
                            {
                                signal: this.controller.signal,
                            }
                        )
                        .then((res) => {
                            // this.form = res.data.rows[0];
                            if (res.data.rows.length != 0) {
                                this.form.FarmerID = res.data.rows[0].FarmerID;
                                this.form.FarmerNumber =
                                    res.data.rows[0].FarmerNumber;
                                this.form.GivenName =
                                    res.data.rows[0].GivenName;
                                this.form.GenderID = res.data.rows[0].GenderID;
                                this.form.Surname = res.data.rows[0].Surname;
                                this.form.Email = res.data.rows[0].Email;
                                this.form.BirthDate =
                                    res.data.rows[0].BirthDate;
                                this.form.TelephoneNumber =
                                    res.data.rows[0].TelephoneNumber;
                                this.form.MobilePhoneNumber =
                                    res.data.rows[0].MobilePhoneNumber;
                                this.form.MainOccupationID =
                                    res.data.rows[0].MainOccupationID;
                                this.form.EducationID =
                                    res.data.rows[0].EducationID;
                                this.form.SecondOccupationID =
                                    res.data.rows[0].SecondOccupationID;
                                this.form.FarmerRegisterStatus =
                                    res.data.rows[0].FarmerRegisterStatus;

                                this.form.HouseAddressIdentification =
                                    res.data.rows[0].HouseAddressIdentification;
                                this.form.HouseAmphurID =
                                    res.data.rows[0].HouseAmphurID;
                                this.form.HouseBuildingNumber =
                                    res.data.rows[0].HouseBuildingNumber;
                                this.form.HouseFloor =
                                    res.data.rows[0].HouseFloor;
                                this.form.HouseLane =
                                    res.data.rows[0].HouseLane;
                                this.form.HouseLatitude =
                                    res.data.rows[0].HouseLatitude;
                                this.form.HouseLongitude =
                                    res.data.rows[0].HouseLongitude;
                                this.form.HouseMoo = res.data.rows[0].HouseMoo;
                                this.form.HouseProvinceID =
                                    res.data.rows[0].HouseProvinceID;
                                this.form.HouseStreet =
                                    res.data.rows[0].HouseStreet;
                                this.form.HouseSubLane =
                                    res.data.rows[0].HouseSubLane;
                                this.form.HouseTumbolID =
                                    res.data.rows[0].HouseTumbolID;
                                this.form.HouseVillageName =
                                    res.data.rows[0].HouseVillageName;
                                this.form.HouseZipCode =
                                    res.data.rows[0].HouseZipCode;
                                //
                                this.form.ResidenceAddressIdentification =
                                    res.data.rows[0].ResidenceAddressIdentification;
                                this.form.ResidenceAmphurID =
                                    res.data.rows[0].ResidenceAmphurID;
                                this.form.ResidenceBuildingNumber =
                                    res.data.rows[0].ResidenceBuildingNumber;
                                this.form.ResidenceFloor =
                                    res.data.rows[0].ResidenceFloor;
                                this.form.ResidenceLane =
                                    res.data.rows[0].ResidenceLane;
                                this.form.ResidenceLatitude =
                                    res.data.rows[0].ResidenceLatitude;
                                this.form.ResidenceLongitude =
                                    res.data.rows[0].ResidenceLongitude;
                                this.form.ResidenceMoo =
                                    res.data.rows[0].ResidenceMoo;
                                this.form.ResidenceProvinceID =
                                    res.data.rows[0].ResidenceProvinceID;
                                this.form.ResidenceStreet =
                                    res.data.rows[0].ResidenceStreet;
                                this.form.ResidenceSubLane =
                                    res.data.rows[0].ResidenceSubLane;
                                this.form.ResidenceTumbolID =
                                    res.data.rows[0].ResidenceTumbolID;
                                this.form.ResidenceVillageName =
                                    res.data.rows[0].ResidenceVillageName;
                                this.form.ResidenceZipCode =
                                    res.data.rows[0].ResidenceZipCode;

                                // this.checkSelect = 1;
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
                }
            } else {
                // this.form = {};
                this.checkSelect = 3;
            }
        },
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
        fillname($event) {
            let val = $event.value;
            if (val) {
                val = this.data.farmer.find(
                    (val) => val.FarmerID == this.form.selectFarmerID
                );
                this.form = {
                    selectFarmerID: val.FarmerID,
                    IdentificationNumber: val.IdentificationNumber,
                    FarmerNumber: val.FarmerNumber,
                    TitleID: val.TitleID,
                    GivenName: val.GivenName,
                    MiddleName: val.MiddleName,
                    Surname: val.Surname,
                    GenderID: val.GenderID,
                    BirthDate: val.BirthDate,
                    TelephoneNumber: val.TelephoneNumber,
                    MobilePhoneNumber: val.MobilePhoneNumber,
                    EducationID: val.EducationID,
                    Email: val.Email,
                    IDLine: val.IDLine,
                    MainOccupationID: val.MainOccupationID,
                    SecondOccupationID: val.SecondOccupationID,
                    HouseBuildingNumber: val.HouseBuildingNumber,
                    HouseMoo: val.HouseMoo,
                    HouseVillageName: val.HouseVillageName,
                    HouseFloor: val.HouseFloor,
                    HouseStreet: val.HouseStreet,
                    HouseSubLane: val.HouseSubLane,
                    HouseLane: val.HouseLane,
                    HouseTumbolID: val.HouseTumbolID,
                    HouseAmphurID: val.HouseAmphurID,
                    HouseProvinceID: val.HouseProvinceID,
                    HouseZipCode: val.HouseZipCode,
                    HouseAddressIdentification: val.HouseAddressIdentification,
                    HouseLatitude: val.HouseLatitude,
                    HouseLongitude: val.HouseLongitude,
                    ResidenceBuildingNumber: val.ResidenceBuildingNumber,
                    ResidenceMoo: val.ResidenceMoo,
                    ResidenceVillageName: val.ResidenceVillageName,
                    ResidenceFloor: val.ResidenceFloor,
                    ResidenceStreet: val.ResidenceStreet,
                    ResidenceSubLane: val.ResidenceSubLane,
                    ResidenceLane: val.ResidenceLane,
                    ResidenceTumbolID: val.ResidenceTumbolID,
                    ResidenceAmphurID: val.ResidenceAmphurID,
                    ResidenceProvinceID: val.ResidenceProvinceID,
                    ResidenceZipCode: val.ResidenceZipCode,
                    ResidenceAddressIdentification:
                        val.ResidenceAddressIdentification,
                    FarmerRegisterStatus: val.FarmerRegisterStatus,
                    FarmerRegisterDate: val.FarmerRegisterDate,
                    isActive: val.isActive,
                };
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
            let val = $event.value;
            if (val) {
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
            this.url.farm = "/farm";

            axios
                .get(this.url.farm + "/" + this.$route.params.id, {
                    signal: this.controller.signal,
                })
                .then((res) => {
                    this.data.farmID = res.data.FarmerID;
                    if (this.data.farmID != null) {
                        axios
                            .get(this.url.farmer + "/" + this.data.farmID, {
                                signal: this.controller.signal,
                            })
                            .then((res) => {
                                this.data.farmerGET = res.data;

                                this.form = {
                                    FarmerID: this.data.farmerGET.FarmerID,
                                    FarmerNumber:
                                        this.data.farmerGET.FarmerNumber,
                                    FarmID: this.data.farmerGET.FarmID,
                                    IdentificationNumber:
                                        this.data.farmerGET
                                            .IdentificationNumber,
                                    TitleID: this.data.farmerGET.TitleID,
                                    GivenName: this.data.farmerGET.GivenName,
                                    MiddleName: this.data.farmerGET.MiddleName,
                                    Surname: this.data.farmerGET.Surname,
                                    GenderID: this.data.farmerGET.GenderID,
                                    BirthDate: this.data.farmerGET.BirthDate,
                                    TelephoneNumber:
                                        this.data.farmerGET.TelephoneNumber,
                                    MobilePhoneNumber:
                                        this.data.farmerGET.MobilePhoneNumber,
                                    EducationID:
                                        this.data.farmerGET.EducationID,
                                    Email: this.data.farmerGET.Email,
                                    IDLine: this.data.farmerGET.IDLine,
                                    MainOccupationID:
                                        this.data.farmerGET.MainOccupationID,
                                    SecondOccupationID:
                                        this.data.farmerGET.SecondOccupationID,
                                    HouseBuildingNumber:
                                        this.data.farmerGET.HouseBuildingNumber,
                                    HouseMoo: this.data.farmerGET.HouseMoo,
                                    HouseVillageName:
                                        this.data.farmerGET.HouseVillageName,
                                    HouseFloor: this.data.farmerGET.HouseFloor,
                                    HouseStreet:
                                        this.data.farmerGET.HouseStreet,
                                    HouseSubLane:
                                        this.data.farmerGET.HouseSubLane,
                                    HouseLane: this.data.farmerGET.HouseLane,
                                    HouseTumbolID:
                                        this.data.farmerGET.HouseTumbolID,
                                    HouseAmphurID:
                                        this.data.farmerGET.HouseAmphurID,
                                    HouseProvinceID:
                                        this.data.farmerGET.HouseProvinceID,
                                    HouseZipCode:
                                        this.data.farmerGET.HouseZipCode,
                                    HouseAddressIdentification:
                                        this.data.farmerGET
                                            .HouseAddressIdentification,
                                    HouseLatitude:
                                        this.data.farmerGET.HouseLatitude,
                                    HouseLongitude:
                                        this.data.farmerGET.HouseLongitude,
                                    ResidenceBuildingNumber:
                                        this.data.farmerGET
                                            .ResidenceBuildingNumber,
                                    ResidenceMoo:
                                        this.data.farmerGET.ResidenceMoo,
                                    ResidenceVillageName:
                                        this.data.farmerGET
                                            .ResidenceVillageName,
                                    ResidenceFloor:
                                        this.data.farmerGET.ResidenceFloor,
                                    ResidenceStreet:
                                        this.data.farmerGET.ResidenceStreet,
                                    ResidenceSubLane:
                                        this.data.farmerGET.ResidenceSubLane,
                                    ResidenceLane:
                                        this.data.farmerGET.ResidenceLane,
                                    ResidenceTumbolID:
                                        this.data.farmerGET.ResidenceTumbolID,
                                    ResidenceAmphurID:
                                        this.data.farmerGET.ResidenceAmphurID,
                                    ResidenceProvinceID:
                                        this.data.farmerGET.ResidenceProvinceID,
                                    ResidenceZipCode:
                                        this.data.farmerGET.ResidenceZipCode,
                                    ResidenceAddressIdentification:
                                        this.data.farmerGET
                                            .ResidenceAddressIdentification,
                                    FarmerRegisterStatus:
                                        this.data.farmerGET
                                            .FarmerRegisterStatus,
                                    FarmerRegisterDate:
                                        this.data.farmerGET.FarmerRegisterDate,
                                };
                            })
                            .finally(() => {
                                this.isLoading = false;
                            });
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                });

            // axios
            //     .get(this.url.farmer, {
            //         signal: this.controller.signal,
            //     })
            //     .then((res) => {
            //         this.data.farmer = res.data.rows;
            //     })
            //     .finally(() => {
            //         this.isLoading = false;
            //     });

            axios
                .get(this.url.title, {
                    signal: this.controller.signal,
                })
                .then((res) => {
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
            // axios
            //   .get(this.url.farm, {
            //     signal: this.controller.signal,
            //   })
            //   .then((res) => {
            //     this.data.farm = res.data.rows;
            //   })
            //   .finally(() => {
            //     this.isLoading = false;
            //   });
        },
        nextPage() {
            // let id  = this.form.FarmerID

            if (this.validation() == false) {
                return;
            }

            if (this.form.selectFarmerID) {
                axios
                    .get(this.url.farmer + "/" + this.form.selectFarmerID, {
                        signal: this.controller.signal,
                    })
                    .then((res) => {
                        this.data.farmerGET = res.data;
                        this.form = {
                            FarmerID: this.data.farmerGET.FarmerID,
                        };
                        axios
                            .put(
                                "/farm/" + this.$route.params.id,
                                {
                                    FarmerID: this.form.FarmerID,
                                },
                                {
                                    signal: this.controller.signal,
                                }
                            )
                            .then(() => {
                                this.$toast.add({
                                    severity: "success",
                                    summary: "สำเร็จ",
                                    detail: "เพิ่มข้อมูลเสร็จสิ้น",
                                    life: 3000,
                                });
                                setTimeout(() => {
                                    this.$router.push("/agency/farm");
                                }, 4000);
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
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            } else {
                if (this.form.FarmerID == null || this.form.FarmerID == "") {
                    axios
                        .post(
                            "/farmer",
                            {
                                // FarmID: this.$route.params.id,
                                IdentificationNumber:
                                    this.form.IdentificationNumber,
                                TitleID: this.form.TitleID,
                                GivenName: this.form.GivenName,
                                MiddleName: this.form.MiddleName,
                                Surname: this.form.Surname,
                                GenderID: this.form.GenderID,
                                BirthDate: this.form.BirthDate,
                                TelephoneNumber: this.form.TelephoneNumber,
                                MobilePhoneNumber: this.form.MobilePhoneNumber,
                                EducationID: this.form.EducationID,
                                Email: this.form.Email,
                                IDLine: this.form.IDLine,
                                MainOccupationID: this.form.MainOccupationID,
                                SecondOccupationID:
                                    this.form.SecondOccupationID,
                                HouseBuildingNumber:
                                    this.form.HouseBuildingNumber,
                                HouseMoo: this.form.HouseMoo,
                                HouseVillageName: this.form.HouseVillageName,
                                HouseFloor: this.form.HouseFloor,
                                HouseStreet: this.form.HouseStreet,
                                HouseSubLane: this.form.HouseSubLane,
                                HouseLane: this.form.HouseLane,
                                HouseTumbolID: this.form.HouseTumbolID,
                                HouseAmphurID: this.form.HouseAmphurID,
                                HouseProvinceID: this.form.HouseProvinceID,
                                HouseZipCode: this.form.HouseZipCode,
                                HouseAddressIdentification:
                                    this.form.HouseAddressIdentification,
                                HouseLatitude: this.form.HouseLatitude,
                                HouseLongitude: this.form.HouseLongitude,
                                ResidenceBuildingNumber:
                                    this.form.ResidenceBuildingNumber,
                                ResidenceMoo: this.form.ResidenceMoo,
                                ResidenceVillageName:
                                    this.form.ResidenceVillageName,
                                ResidenceFloor: this.form.ResidenceFloor,
                                ResidenceStreet: this.form.ResidenceStreet,
                                ResidenceSubLane: this.form.ResidenceSubLane,
                                ResidenceLane: this.form.ResidenceLane,
                                ResidenceTumbolID: this.form.ResidenceTumbolID,
                                ResidenceAmphurID: this.form.ResidenceAmphurID,
                                ResidenceProvinceID:
                                    this.form.ResidenceProvinceID,
                                ResidenceZipCode: this.form.ResidenceZipCode,
                                ResidenceAddressIdentification:
                                    this.form.ResidenceAddressIdentification,
                                FarmerRegisterStatus: 1,
                                FarmerRegisterDate:
                                    this.form.FarmerRegisterDate,
                                isActive: 1,
                            },
                            {
                                signal: this.controller.signal,
                            }
                        )
                        .then(() => {
                            this.$toast.add({
                                severity: "success",
                                summary: "สำเร็จ",
                                detail: "เพิ่มข้อมูลเสร็จสิ้น",
                                life: 3000,
                            });
                            setTimeout(() => {
                                this.$router.push("/agency/farm");
                            }, 4000);
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
                } else {
                    axios
                        .put(
                            "/farmer/" + this.form.FarmerID,
                            {
                                IdentificationNumber:
                                    this.form.IdentificationNumber,
                                TitleID: this.form.TitleID,
                                GivenName: this.form.GivenName,
                                MiddleName: this.form.MiddleName,
                                Surname: this.form.Surname,
                                GenderID: this.form.GenderID,
                                BirthDate: this.form.BirthDate,
                                TelephoneNumber: this.form.TelephoneNumber,
                                MobilePhoneNumber: this.form.MobilePhoneNumber,
                                EducationID: this.form.EducationID,
                                Email: this.form.Email,
                                IDLine: this.form.IDLine,
                                MainOccupationID: this.form.MainOccupationID,
                                SecondOccupationID:
                                    this.form.SecondOccupationID,
                                HouseBuildingNumber:
                                    this.form.HouseBuildingNumber,
                                HouseMoo: this.form.HouseMoo,
                                HouseVillageName: this.form.HouseVillageName,
                                HouseFloor: this.form.HouseFloor,
                                HouseStreet: this.form.HouseStreet,
                                HouseSubLane: this.form.HouseSubLane,
                                HouseLane: this.form.HouseLane,
                                HouseTumbolID: this.form.HouseTumbolID,
                                HouseAmphurID: this.form.HouseAmphurID,
                                HouseProvinceID: this.form.HouseProvinceID,
                                HouseZipCode: this.form.HouseZipCode,
                                HouseAddressIdentification:
                                    this.form.HouseAddressIdentification,
                                HouseLatitude: this.form.HouseLatitude,
                                HouseLongitude: this.form.HouseLongitude,
                                ResidenceBuildingNumber:
                                    this.form.ResidenceBuildingNumber,
                                ResidenceMoo: this.form.ResidenceMoo,
                                ResidenceVillageName:
                                    this.form.ResidenceVillageName,
                                ResidenceFloor: this.form.ResidenceFloor,
                                ResidenceStreet: this.form.ResidenceStreet,
                                ResidenceSubLane: this.form.ResidenceSubLane,
                                ResidenceLane: this.form.ResidenceLane,
                                ResidenceTumbolID: this.form.ResidenceTumbolID,
                                ResidenceAmphurID: this.form.ResidenceAmphurID,
                                ResidenceProvinceID:
                                    this.form.ResidenceProvinceID,
                                ResidenceZipCode: this.form.ResidenceZipCode,
                                ResidenceAddressIdentification:
                                    this.form.ResidenceAddressIdentification,
                                FarmerRegisterStatus:
                                    this.form.FarmerRegisterStatus,
                                FarmerRegisterDate:
                                    this.form.FarmerRegisterDate,
                                isActive: 1,
                            },
                            {
                                signal: this.controller.signal,
                            }
                        )
                        .then(() => {
                            axios
                                .put(
                                    "/farm/" + this.$route.params.id,
                                    {
                                        FarmerID: this.form.FarmerID,
                                    },
                                    {
                                        signal: this.controller.signal,
                                    }
                                )
                                .then(() => {
                                    this.$toast.add({
                                        severity: "success",
                                        summary: "สำเร็จ",
                                        detail: "เพิ่มข้อมูลเสร็จสิ้น",
                                        life: 3000,
                                    });
                                    setTimeout(() => {
                                        this.$router.push("/agency/farm");
                                    }, 4000);
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
                            // this.$toast.add({
                            //   severity: "success",
                            //   summary: "สำเร็จ",
                            //   detail: "เพิ่มข้อมูลเสร็จสิ้น",
                            //   life: 3000,
                            // });
                            // setTimeout(() => {
                            //   this.$router.push("/agency/farm");
                            // }, 4000);
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
                }
            }
        },

        prevPage() {
            this.$emit("prev-page", { pageIndex: 1 });
        },
        updateFarmer() {
            axios
                .get("/farmer/fetch-api-farmer-with-eregis", {
                    signal: this.controller.signal,
                    params: {
                        farmerPID: this.form.IdentificationNumber,
                    },
                })
                .then((res) => {
                    console.log(res);

                    this.load();
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "อัพเดทข้อมูลเสร็จสิ้น",
                        life: 5000,
                    });
                })
                .catch((err) => {
                    this.load();
                    this.$toast.add({
                        severity: "error",
                        summary: "IdentificationNumber Not Found",
                        detail: err.response.data.error.message,
                        life: 5000,
                    });

                })
                .finally(() => {
                    this.isLoading = false;
                });
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
    },
};
</script>

<style lang="scss" scoped></style>
