<template>
    <div class="grid">
        <!-- start main page -->
        <div class="col-12">
            <PageTitle title="ข้อมูลฟาร์ม" :pages="breadcrumb" />
            <div
                class="card row grid"
                style="
                    margin-left: 0px;
                    margin-right: 0px;
                    margin-top: 0px;
                    margin-bottom: 0px;
                "
            >
                <div class="col-12 sm:col-6 lg:col-6">
                    <label
                        for="AIZoneID"
                        class="block text-600 text-sm font-bold mb-2"
                    >
                        ศูนย์วิจัย</label
                    >
                    <Dropdown
                        class="w-full"
                        v-model="search.AIZoneID"
                        :options="dropdown.AIZones"
                        optionLabel="AIZoneName"
                        optionValue="AIZoneID"
                        :disabled="isSelectAIZoneDisabled"
                        :filter="true"
                        :showClear="true"
                        placeholder="-- โปรดเลือกศูนย์วิจัย --"
                    >
                    </Dropdown>
                </div>

                <div class="col-12 sm:col-6 lg:col-6">
                    <label
                        for="searchOrganizationZoneID"
                        class="block text-600 text-sm font-bold mb-2"
                    >
                        เขตพื้นที่ปศุสัตว์</label
                    >
                    <Dropdown
                        class="w-full"
                        v-model="search.OrganizationZoneID"
                        :options="dropdown.OrganizationZones"
                        optionLabel="OrganizationZoneName"
                        optionValue="OrganizationZoneID"
                        :disabled="isSelectOrganizationZoneDisabled"
                        :filter="true"
                        :showClear="true"
                        placeholder="-- เลือกเขตพื้นที่ปศุสัตว์ --"
                    >
                    </Dropdown>
                </div>

                <div class="col-12 sm:col-6 lg:col-4">
                    <label
                        for="searchProvinceID"
                        class="block text-600 text-sm font-bold mb-2"
                    >
                        จังหวัด</label
                    >
                    <Dropdown
                        class="w-full"
                        v-model="search.ProvinceID"
                        :options="dropdown.Provinces"
                        optionLabel="ProvinceName"
                        optionValue="ProvinceID"
                        :filter="true"
                        :showClear="true"
                        placeholder="ทั้งหมด"
                    >
                    </Dropdown>
                </div>

                <div class="col-12 sm:col-6 lg:col-4">
                    <label
                        for="searchAmphurID"
                        class="block text-600 text-sm font-bold mb-2"
                    >
                        อำเภอ</label
                    >
                    <Dropdown
                        class="w-full"
                        v-model="search.AmphurID"
                        :options="dropdown.Amphurs"
                        optionLabel="AmphurName"
                        optionValue="AmphurID"
                        :filter="true"
                        :showClear="true"
                        placeholder="ทั้งหมด"
                    >
                    </Dropdown>
                </div>

                <div class="col-12 sm:col-6 lg:col-4">
                    <label
                        for="searchTumbolID"
                        class="block text-600 text-sm font-bold mb-2"
                    >
                        ตำบล</label
                    >
                    <Dropdown
                        class="w-full"
                        v-model="search.TumbolID"
                        :options="dropdown.Tumbols"
                        optionLabel="TumbolName"
                        optionValue="TumbolID"
                        :filter="true"
                        :showClear="true"
                        placeholder="ทั้งหมด"
                    >
                    </Dropdown>
                </div>

                <div class="col-12 sm:col-12 lg:col-6">
                    <label
                        for="searchOrganizationID"
                        class="block text-600 text-sm font-bold mb-2"
                    >
                        ประเภทหน่วยงาน</label
                    >
                    <Dropdown
                        :showClear="true"
                        class="w-full"
                        placeholder="ทั้งหมด"
                        optionLabel="OrganizationTypeName"
                        optionValue="OrganizationTypeID"
                        :virtualScrollerOptions="{ itemSize: 38 }"
                        :options="dropdown.OrganizationTypes"
                        :filter="true"
                        v-model="search.OrganizationTypeID"
                    />
                </div>

                <div class="col-12 sm:col-12 lg:col-6">
                    <label
                        for="searchOrganizationID"
                        class="block text-600 text-sm font-bold mb-2"
                    >
                        หน่วยงาน</label
                    >
                    <Dropdown
                        :showClear="true"
                        class="w-full"
                        placeholder="ทั้งหมด"
                        optionLabel="OrganizationFull"
                        optionValue="OrganizationID"
                        :virtualScrollerOptions="{ itemSize: 38 }"
                        :options="dropdown.Organizations"
                        :filter="true"
                        v-model="search.OrganizationID"
                    />
                </div>

                <div class="col-12 sm:col-12 lg:col-12">
                    <label
                        for="searchSubDistrict"
                        class="block text-600 text-sm font-bold mb-2"
                    >
                        ฟาร์ม
                        (โปรดระบุศูนย์วิจัยหรือเขตพื้นที่ปศุสัตว์ก่อนเลือกฟาร์ม)</label
                    >
                    <v-select
                        v-model="search.FarmID"
                        :disabled="
                            search.OrganizationZoneID == null &&
                            search.AIZoneID == null
                        "
                        :options="dropdown.Farms"
                        @search="fetchSelectionFarm"
                        label="Fullname"
                        value="FarmID"
                        class="w-full"
                        placeholder="เลือกฟาร์มปลายทาง (พิมพ์ 3 ตัวอักษรเพื่อค้นหา)"
                    ></v-select>
                </div>

                <div class="col-12 sm:col-12 lg:col-12">
                    <div class="text-sm text-red-500 text-center mb-2 mt-5">
                        (โปรดระบุฟาร์มก่อนกดปุ่มค้นหา)
                    </div>

                    <Button
                        @click="load"
                        :disabled="
                            search.FarmID == null
                        "
                        label="ค้นหา"
                        icon=""
                        style="width: 100%"
                        class="mr-2 mb-3"
                    />
                </div>

                <!-- <div class="col-12 sm:col-6 lg:col-6">
          <label
            for="FarmerFullName"
            class="block text-600 text-sm font-bold mb-2"
          >
            ชื่อนามสกุลเกษตรกร
          </label>
          <span class="p-input-icon-right w-full">
            <i class="pi pi-search" />
            <InputText
              type="text"
              class="w-full"
              v-model="search.FarmerFullName"
            />
          </span>
        </div> -->
                <!-- 
            <div class="col-12 sm:col-6 lg:col-6">
              <label
                for="selectedStatus"
                class="block text-600 text-sm font-bold mb-2"
              >
                สถานะฟาร์ม</label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="ทั้งหมด"
                :options="selection.farmStatus"
                optionLabel="FarmStatusName"
                optionValue="FarmStatusID"
                v-model="filtered.FarmStatusID"
              />
            </div> -->
                <!-- 
        <div class="col-12 sm:col-6 lg:col-6">
          <label
            for="selectedStatus"
            class="block text-600 text-sm font-bold mb-2"
          >
            ชนิดของสัตว์ที่อยู่ในฟาร์ม</label
          >
          <Dropdown
            :showClear="true"
            emptyMessage="ไม่มีข้อมูล"
            emptyFilterMessage="ไม่พบข้อมูล"
            class="w-full"
            placeholder="ทั้งหมด"
            :options="dropdown.FarmAnimalTypes"
            optionLabel="name"
            optionValue="id"
            v-model="search.FarmAnimalType"
          />
        </div> -->

                <!-- <div class="col-12 sm:col-12 lg:col-12">
          <label
            for="searchSubDistrict"
            class="block text-600 text-sm font-bold mb-2"
          >
            โครงการ</label
          >
          <MultiSelect
            v-model="search.ProjectIDArray"
            class="w-full"
            :options="dropdown.Projects"
            optionLabel="ProjectName"
            optionValue="ProjectID"
            placeholder="เลือกโครงการ"
            display="chip"
          />
        </div> -->
            </div>
        </div>

        <div class="col-12" v-if="data.FarmIdentificationNumber">
            <div class="grid">
                <div class="col-12 lg:col-8">
                    <div class="card border-round-2xl">
                        <h4 class="font-normal text-2xl text-gray-700 mb-5">
                            ข้อมูลฟาร์ม
                        </h4>
                        <div class="grid">
                            <div class="col-12 sm:col-4 lg:col-4">
                                <div>
                                    <span class="font-bold text-gray-800"
                                        >หมายเลขทะเบียนฟาร์ม</span
                                    >
                                    : {{ data.FarmIdentificationNumber }}
                                </div>
                            </div>
                            <div class="col-12 sm:col-4 lg:col-4">
                                <div>
                                    <span class="font-bold text-gray-800"
                                        >ชื่อฟาร์ม</span
                                    >
                                    :
                                    {{ data.FarmName }}
                                </div>
                            </div>
                            <div class="col-12 sm:col-4 lg:col-4">
                                <div>
                                    <span class="font-bold text-gray-800"
                                        >วันที่ขึ้นทะเบียนฟาร์ม</span
                                    >
                                    :
                                    {{ `${data.ThaiFarmRegisterDate || ""} ` }}
                                </div>
                            </div>
                            <div
                                class="col-12 sm:col-4 lg:col-4"
                                v-if="data.FarmStatus"
                            >
                                <div>
                                    <span class="font-bold text-gray-800"
                                        >สถานะฟาร์ม</span
                                    >
                                    :
                                    {{
                                        `${
                                            data.FarmStatus.FarmStatusName || ""
                                        } `
                                    }}
                                </div>
                            </div>
                            <div
                                class="col-12 sm:col-4 lg:col-8"
                                v-if="
                                    data.Tumbol && data.Amphur && data.Province
                                "
                            >
                                <div>
                                    <span class="font-bold text-gray-800"
                                        >ที่ตั้ง</span
                                    >
                                    : {{ data.FarmAddress }} หมู่ที่
                                    {{ data.FarmMoo }} ตำบล/แขวง
                                    {{ data.Tumbol.TumbolName || "-" }}
                                    อำเภอ/เขต
                                    {{ data.Amphur.AmphurName || "-" }} จังหวัด
                                    {{ data.Province.ProvinceName || "-" }}
                                </div>
                            </div>
                            <div class="col-12" v-if="data.Farmer">
                                <div class="grid">
                                    <div class="col-12 sm:col-4 lg:col-4">
                                        <div>
                                            <span
                                                class="font-bold text-gray-800"
                                                >เลขทะเบียนเกษตรกร</span
                                            >
                                            : {{ data.Farmer.FarmerNumber }}
                                        </div>
                                    </div>
                                    <div class="col-12 sm:col-4 lg:col-4">
                                        <div>
                                            <span
                                                class="font-bold text-gray-800"
                                                >ชื่อ - นามสกุล</span
                                            >
                                            : {{ data.Farmer.FullName }}
                                        </div>
                                    </div>
                                    <div class="col-12 sm:col-4 lg:col-4">
                                        <div>
                                            <span
                                                class="font-bold text-gray-800"
                                                >เบอร์โทรศัพท์</span
                                            >
                                            :
                                            {{ data.Farmer.MobilePhoneNumber }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-12 lg:col-12">
                            <div class="grid row-gap-1 xl:row-gap-2">
                                <div class="col-12 sm:col-6 xl:col-4">
                                    <Card
                                        class="h-10rem xl:h-10rem max-h-16rem flex align-items-center border-round-2xl"
                                    >
                                        <template #content>
                                            <h4
                                                class="font-normal text-xl text-gray-700"
                                            >
                                                จำนวนสัตว์ทั้งหมด
                                            </h4>
                                            <span
                                                class="text-3xl sm:text-3xl md:text-4xl font-bold text-gray-800"
                                                >{{
                                                    `${total.all}` || "0"
                                                }}
                                                ตัว</span
                                            >
                                        </template>
                                    </Card>
                                </div>
                                <div class="col-12 sm:col-6 xl:col-4">
                                    <Card
                                        class="h-10rem xl:h-10rem max-h-16rem flex align-items-center border-round-2xl"
                                    >
                                        <template #content>
                                            <h4
                                                class="font-normal text-xl text-gray-700"
                                            >
                                                ลูกสัตว์
                                            </h4>
                                            <span
                                                class="text-3xl sm:text-3xl md:text-4xl font-bold text-gray-800"
                                                >{{
                                                    `${total.child}` || "0"
                                                }}
                                                ตัว</span
                                            >
                                        </template>
                                    </Card>
                                </div>
                                <div class="col-12 sm:col-6 xl:col-4">
                                    <Card
                                        class="h-10rem xl:h-10rem max-h-16rem flex align-items-center border-round-2xl"
                                    >
                                        <template #content>
                                            <h4
                                                class="font-normal text-xl text-gray-700"
                                            >
                                                สัตว์ช่วงวัยรุ่น
                                            </h4>
                                            <span
                                                class="text-3xl sm:text-3xl md:text-4xl font-bold text-gray-800"
                                                >{{
                                                    `${total.young}` || "0"
                                                }}
                                                ตัว</span
                                            >
                                        </template>
                                    </Card>
                                </div>

                                <div class="col-12 sm:col-6 xl:col-4">
                                    <Card
                                        class="h-10rem xl:h-10rem max-h-16rem flex align-items-center border-round-2xl"
                                    >
                                        <template #content>
                                            <h4
                                                class="font-normal text-xl text-gray-700"
                                            >
                                                สัตว์เป็นสาว
                                            </h4>
                                            <span
                                                class="text-3xl sm:text-3xl md:text-4xl font-bold text-gray-800"
                                                >{{
                                                    `${total.girl}` || "0"
                                                }}
                                                ตัว</span
                                            >
                                        </template>
                                    </Card>
                                </div>
                                <div class="col-12 sm:col-6 xl:col-4">
                                    <Card
                                        class="h-10rem xl:h-10rem max-h-16rem flex align-items-center border-round-2xl"
                                    >
                                        <template #content>
                                            <h4
                                                class="font-normal text-xl text-gray-700"
                                            >
                                                พ่อพันธุ์
                                            </h4>
                                            <span
                                                class="text-3xl sm:text-3xl md:text-4xl font-bold text-gray-800"
                                                >{{
                                                    `${total.father}` || "0"
                                                }}
                                                ตัว</span
                                            >
                                        </template>
                                    </Card>
                                </div>
                                <div class="col-12 sm:col-6 xl:col-4">
                                    <Card
                                        class="h-10rem xl:h-10rem max-h-16rem flex align-items-center border-round-2xl"
                                    >
                                        <template #content>
                                            <h4
                                                class="font-normal text-xl text-gray-700"
                                            >
                                                แม่พันธุ์
                                            </h4>
                                            <span
                                                class="text-3xl sm:text-3xl md:text-4xl font-bold text-gray-800"
                                                >{{
                                                    `${total.mother}` || "0"
                                                }}
                                                ตัว</span
                                            >
                                        </template>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-4">
                    <Card class="border-round-2xl">
                        <template #content>
                            <h4 class="font-normal text-2xl text-gray-700 mb-4">
                                การแจ้งเตือน
                            </h4>
                            <div>
                                <ul class="list-none m-0 p-0">
                                    <li
                                        class="notification-item flex align-items-center justify-content-between pb-1 mb-3 border-x-none border-top-none border-bottom-2 border-solid border-gray-200 cursor-pointer"
                                        @click="filterInfo(1)"
                                    >
                                        <div class="text-base text-600">
                                            ครบกำหนดคลอด
                                        </div>
                                        <div>
                                            <Tag
                                                severity="danger"
                                                v-if="noti.noti1"
                                            >
                                                {{ `${noti.noti1}` || "0" }}
                                            </Tag>
                                            <Tag severity="danger" v-else>
                                                0
                                            </Tag>
                                        </div>
                                    </li>
                                    <li
                                        class="notification-item flex align-items-center justify-content-between pb-1 mb-3 border-x-none border-top-none border-bottom-2 border-solid border-gray-200 cursor-pointer"
                                        @click="filterInfo(2)"
                                    >
                                        <div class="text-base text-600">
                                            ครบกำหนดตรวจท้อง
                                        </div>
                                        <div>
                                            <Tag
                                                severity="danger"
                                                v-if="noti.noti2"
                                            >
                                                {{ `${noti.noti2}` || "0" }}
                                            </Tag>
                                            <Tag severity="danger" v-else>
                                                0
                                            </Tag>
                                        </div>
                                    </li>
                                    <li
                                        class="notification-item flex align-items-center justify-content-between pb-1 mb-3 border-x-none border-top-none border-bottom-2 border-solid border-gray-200 cursor-pointer"
                                        @click="filterInfo(3)"
                                    >
                                        <div class="text-base text-600">
                                            ติดตามลูกหลังคลอด
                                        </div>
                                        <div>
                                            <Tag
                                                severity="danger"
                                                v-if="noti.noti3"
                                            >
                                                {{ `${noti.noti3}` || "0" }}
                                            </Tag>
                                            <Tag severity="danger" v-else>
                                                0
                                            </Tag>
                                        </div>
                                    </li>
                                    <li
                                        class="notification-item flex align-items-center justify-content-between pb-1 mb-3 border-x-none border-top-none border-bottom-2 border-solid border-gray-200 cursor-pointer"
                                        @click="filterInfo(4)"
                                    >
                                        <div class="text-base text-600">
                                            ตรวจระบบสืบพันธุ์
                                        </div>
                                        <div>
                                            <Tag
                                                severity="danger"
                                                v-if="noti.noti4"
                                            >
                                                {{ `${noti.noti4}` || "0" }}
                                            </Tag>
                                            <Tag severity="danger" v-else>
                                                0
                                            </Tag>
                                        </div>
                                    </li>
                                    <li
                                        class="notification-item flex align-items-center justify-content-between pb-1 mb-3 border-x-none border-top-none border-bottom-2 border-solid border-gray-200 cursor-pointer"
                                        @click="filterInfo(5)"
                                    >
                                        <div class="text-base text-600">
                                            ไม่กลับสัดหลังผสม
                                        </div>
                                        <div>
                                            <Tag
                                                severity="danger"
                                                v-if="noti.noti5"
                                            >
                                                {{ `${noti.noti5}` || "0" }}
                                            </Tag>
                                            <Tag severity="danger" v-else>
                                                0
                                            </Tag>
                                        </div>
                                    </li>
                                    <li
                                        class="notification-item flex align-items-center justify-content-between pb-1 mb-3 border-x-none border-top-none border-bottom-2 border-solid border-gray-200 cursor-pointer"
                                        @click="filterInfo(6)"
                                    >
                                        <div class="text-base text-600">
                                            อายุมากกว่ากำหนดแล้วยังไม่ได้ผสม
                                        </div>
                                        <div>
                                            <Tag
                                                severity="danger"
                                                v-if="noti.noti6"
                                            >
                                                {{ `${noti.noti6}` || "0" }}
                                            </Tag>
                                            <Tag severity="danger" v-else>
                                                0
                                            </Tag>
                                        </div>
                                    </li>
                                    <li
                                        class="notification-item flex align-items-center justify-content-between pb-1 mb-3 border-x-none border-top-none border-bottom-2 border-solid border-gray-200 cursor-pointer"
                                        @click="filterInfo(7)"
                                    >
                                        <div class="text-base text-600">
                                            ผสมซ้ำเกิน 3
                                            ครั้งในรอบการตั้งท้องปัจจุบัน
                                        </div>
                                        <div>
                                            <Tag
                                                severity="danger"
                                                v-if="noti.noti7"
                                            >
                                                {{ `${noti.noti7}` || "0" }}
                                            </Tag>
                                            <Tag severity="danger" v-else>
                                                0
                                            </Tag>
                                        </div>
                                    </li>
                                    <li
                                        class="notification-item flex align-items-center justify-content-between pb-1 mb-3 border-x-none border-top-none border-bottom-2 border-solid border-gray-200 cursor-pointer"
                                        @click="filterInfo(8)"
                                    >
                                        <div class="text-base text-600">
                                            เลยกำหนดวันคลอด
                                        </div>
                                        <div>
                                            <Tag
                                                severity="danger"
                                                v-if="noti.noti8"
                                            >
                                                {{ `${noti.noti8}` || "0" }}
                                            </Tag>
                                            <Tag severity="danger" v-else>
                                                0
                                            </Tag>
                                        </div>
                                    </li>
                                    <li
                                        v-if="animal_id == 1"
                                        class="notification-item flex align-items-center justify-content-between pb-1 mb-3 border-x-none border-top-none border-bottom-2 border-solid border-gray-200 cursor-pointer"
                                        @click="filterInfo(9)"
                                    >
                                        <div class="text-base text-600">
                                            ครบกำหนดบันทึก Thaiblack
                                        </div>
                                        <div>
                                            <Tag
                                                severity="danger"
                                                v-if="noti.noti9"
                                            >
                                                {{ `${noti.noti9}` || "0" }}
                                            </Tag>
                                            <Tag severity="danger" v-else>
                                                0
                                            </Tag>
                                        </div>
                                    </li>
                                    <li
                                        v-if="animal_id == 3"
                                        class="notification-item flex align-items-center justify-content-between pb-1 mb-3 border-x-none border-top-none border-bottom-2 border-solid border-gray-200 cursor-pointer"
                                        @click="filterInfo(10)"
                                    >
                                        <div class="text-base text-600">
                                            ครบกำหนดบันทึก แดงสุราษฏร์
                                        </div>
                                        <div>
                                            <Tag
                                                severity="danger"
                                                v-if="noti.noti10"
                                            >
                                                {{ `${noti.noti10}` || "0" }}
                                            </Tag>
                                            <Tag severity="danger" v-else>
                                                0
                                            </Tag>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
        </div>

        <div class="col-12" v-if="data.FarmIdentificationNumber">
            <div class="card">
                <div>
                    <div class="grid flex align-items-center mb-5">
                        <div class="col-12 md:col-6">
                            <h4 class="font-normal text-2xl text-gray-700 mb-0">
                                ข้อมูลสัตว์ภายในฟาร์มทั้งหมด
                                {{ animal.length }} ตัว
                            </h4>
                        </div>
                        <div class="col-12 md:col-6 md:text-right">
                            <button
                                label="ดาวน์โหลด"
                                icon="pi pi-download"
                                class="p-button-raised p-button-raised p-button-success"
                                @click="exportCSV($event)"
                            />
                        </div>
                    </div>
                    <DataTable
                        class="text-sm"
                        v-model:filters="searchTable"
                        :value="animal"
                        :paginator="true"
                        :rows="10"
                        :loading="isLoading"
                        :filterField="true"
                        :exportable="true"
                        ref="dt"
                        :rowHover="true"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        :rowsPerPageOptions="[10, 20, 50]"
                        responsiveLayout="scroll"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    >
                        <template #header>
                            <div
                                class="flex justify-content-end align-items-right"
                            >
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText
                                        v-model="searchTable['global'].value"
                                        placeholder="ค้นหา"
                                    />
                                </span>
                            </div>
                        </template>
                        <template #empty> ไม่พบข้อมูล </template>
                        <template #loading> กรุณารอสักครู่... </template>
                        <Column
                            field="show_id"
                            header="ลำดับ"
                            :sortable="true"
                            style="width: 20px"
                        ></Column>
                        <Column
                            field="AnimalEarID"
                            header="หมายเลขใบหู"
                            :sortable="true"
                        ></Column>
                        <Column
                            field="AnimalName"
                            header="ชื่อ"
                            :sortable="true"
                        ></Column>
                        <Column
                            field="AnimalBreedAll"
                            header="สายพันธุ์"
                            :sortable="true"
                            style="width: 100px"
                        ></Column>
                        <Column
                            field="AnimalAge"
                            header="อายุ (ปี)"
                            class="text-center"
                            :sortable="true"
                        ></Column>
                        <Column
                            field="AnimalStatusText"
                            header="สถานะสัตว์"
                            :sortable="true"
                        ></Column>
                        <Column
                            field="PAR"
                            header="ท้องที่"
                            :sortable="true"
                        ></Column>
                        <Column
                            field="giveBirthDateLatest"
                            header="วันที่คลอด"
                            :sortable="true"
                        ></Column>
                        <Column
                            field="TimeNo"
                            header="ครั้งที่ผสม"
                            class="text-center"
                            :sortable="true"
                        ></Column>
                        <Column
                            field="ThaiAIDate"
                            header="วันที่ผสม"
                            :sortable="true"
                        ></Column>
                        <Column
                            field="ThaiAIDateDiff"
                            header="จำนวนวันหลังผสม"
                            :sortable="true"
                        ></Column>
                        <Column
                            field="PregnancyStatus"
                            header="ตรวจท้อง"
                            :sortable="true"
                        ></Column>
                        <Column
                            header="แจ้งเตือน"
                            field="Notification"
                            style="width: 150px"
                            :sortable="true"
                        >
                            <template #body="slotProps">
                                <span class="text-red-500">
                                    -
                                    {{
                                        formatArray(slotProps.data.Notification)
                                    }}</span
                                >
                            </template>
                        </Column>
                        <!-- <Column field="cart" header="ตะกร้า">
              <template #body="slotProps">
                <button
                  v-if="slotProps.data.cart == false"
                  class="p-button p-button-success"
                  label="ใส่ตะกร้า"
                  icon="pi pi-shopping-cart "
                  @click="addCart(slotProps.data.AnimalID)"
                />
                <button
                  v-else
                  class="p-button-sm p-button-danger"
                  label="ลบตะกร้า"
                  icon="pi pi-times"
                  @click="delCart(slotProps.data.AnimalID)"
                />
              </template>
            </Column> -->
                        <Column header="จัดการ">
                            <template #body="slotProps">
                                <!-- <router-link :to="{ name: 'creature_info' }"> -->
                                <SplitButton
                                    label="กิจกรรม"
                                    icon="pi pi-eye"
                                    @click="
                                        // openAnimal(
                                        //     slotProps.data.AnimalID,
                                        //     slotProps.data.AnimalEarID
                                        // )
                                        openFirstTab(
                                            slotProps.data.AnimalID,
                                            slotProps.data.AnimalSecretStatus,
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
                                <!-- </router-link> -->
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
        <!-- end main page -->
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
                    >คุณต้องการลบข้อมูลย้ายฝากตัวอ่อนครั้งที่ 2 ใช่หรือไม่</span
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

        <!-- <Creature_info
        :display="true"
        v-if="displaytab"
        v-show="false"
        @whenClear_display="clear()"
      /> -->
    </div>
</template>

<script>
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { ref } from "vue";
import PageTitle from "@/components/PageTitle.vue";
import { mapGetters } from "vuex";
import axios from "axios";
import store from "@/service/Vuex";
import { FilterMatchMode } from "primevue/api";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

// import locale from "dayjs/locale/th";
// import _ from "lodash";

import ArtificialReport from "@/pages/farm_info/artificialReport.js";
import VueCreatureInfo from "./creature_info.vue";

dayjs.extend(buddhistEra);

export default {
    components: {
        PageTitle,
        VueCreatureInfo,
        vSelect,
    },
    computed: {
        ...mapGetters({
            animal_id: "animal_id",
            farmDataItem: "farmDataItem",
            animalInfo: "animalInfo",
        }),
    },
    setup() {
        const breadcrumb = ref([
            { label: "กิจกรรม", to: "/" },
            { label: "ข้อมูลฟาร์ม", to: "" },
        ]);

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

        return {
            breadcrumb,
            displayEditModal,
            openEditModal,
            closeEditModal,
            displaydelete,
            opendisplaydelete,
            closeConfirmation,
        };
    },
    data() {
        return {
            apiFarm: "/farm?isActive=1",
            animal_url: "/animal/get-by-farm-id",
            getOrganizationZone:
                "/organization-zone/selection?isActive=1&includeAll=false",
            getProvince: "/province/selection?isActive=1",
            getAmphur: "/amphur/selection?isActive=1&includeAll=false",
            getTumbol: "/tumbol/selection?isActive=1&includeAll=false",
            data: {},
            IsSearch: false,
            controller: new AbortController(),
            loader: false,
            filtered: {
                FarmID: "",
                OrganizationZone: "",
            },
            farm: null,
            isLoading: false,
            animal: [],
            noti: {},
            total: {},

            // Start Selection
            selection: {
                Organization: [],
                OrganizationZone: [],
                Province: [],
                Amphur: [],
                Tumbol: [],
            },

            url: {
                Farm: "/farm/selection?isActive=1&includeAll=false",
                AIZone: "/ai-zone/selection?isActive=1&includeAll=false",
                OrganizationZone:
                    "/organization-zone/selection?isActive=1&includeAll=false",
                Province: "/province/selection?isActive=1&includeAll=false",
                Amphur: "/amphur/selection?isActive=1&includeAll=false",
                Tumbol: "/tumbol/selection?isActive=1&includeAll=false",
                OrganizationType:
                    "/organization-type/selection?isActive=1&includeAll=false",
                Organization:
                    "/organization/selection?isActive=1&includeAll=false",
                Project: "/project/selection?isActive=1&includeAll=false",
            },
            dropdown: {
                AIZones: [],
                OrganizationZones: [],
                Provinces: [],
                Amphurs: [],
                Tumbols: [],
                OrganizationTypes: [],
                Organizations: [],
                Farms: [],
                Projects: [],
                FarmAnimalTypes: [
                    { name: "โค", id: 1 },
                    { name: "กระบือ", id: 2 },
                    { name: "แพะ", id: 3 },
                    { name: "ทุกประเภทสัตว์", id: 99 },
                    { name: "ยังไม่ได้เลือกชนิดสัตว์", id: 98 },
                ],
            },
            search: {
                FarmIdentificationNumber: "",
                FarmName: "",
                FarmerFullName: "",
                dateRange: null,
                AIZoneID: null,
                OrganizationZoneID: null,
                ProvinceID: null,
                AmphurID: null,
                TumbolID: null,
                OrganizationTypeID: null,
                OrganizationID: null,
                FarmID: null,
                FarmAnimalType: 1,
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            searchTable: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            checkSearch: 1,
            params: {
                // page: 1,
                GetByOrgProvince: 1,
                // size: 10,
                Fullname: null,
                IsActive: null,
            },
            displaytab: false,
        };
    },
    mounted() {
        this.loadDefault();
        this.loadSearchFromLocalStorage();

        // if (this.farmDataItem) {
        //   this.search.FarmID = this.farmDataItem.FarmID;
        // }
        // axios
        //   .get(this.apiFarm, {
        //     params: this.params,
        //     signal: this.controller.signal,
        //   })
        //   .then((res) => {
        //     this.farm = res.data.rows;
        //     this.loader = true;
        //   });

        // if (store.state.user.Staff.Organization.OrganizationZoneID) {
        //   this.search.OrganizationZoneID =
        //     store.state.user.Staff.Organization.OrganizationZoneID;
        // }
    },
    watch: {
        "search.AIZoneID"(val) {
            if (val) {
                this.search.OrganizationZoneID = null;
                this.isSelectAIZoneDisabled = false;
                this.isSelectOrganizationZoneDisabled = true;
            } else {
                this.isSelectAIZoneDisabled = false;
                this.isSelectOrganizationZoneDisabled = false;
            }

            this.dropdown.Provinces = [];
            this.dropdown.Amphurs = [];
            this.dropdown.Tumbols = [];
            this.dropdown.Organizations = [];
            this.dropdown.Farms = [];
            this.data = [];

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.fetchProvince();
                    this.fetchOrganization();
                    //   this.fetchFarm();
                    this.search.ProvinceID = null;
                    this.search.AmphurID = null;
                    this.search.TumbolID = null;
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.OrganizationZoneID"(val) {
            if (val) {
                this.search.AIZoneID = null;
                this.isSelectAIZoneDisabled = true;
                this.isSelectOrganizationZoneDisabled = false;
            } else {
                this.isSelectAIZoneDisabled = false;
                this.isSelectOrganizationZoneDisabled = false;
            }

            this.dropdown.Provinces = [];
            this.dropdown.Amphurs = [];
            this.dropdown.Tumbols = [];
            this.dropdown.Organizations = [];
            this.dropdown.Farms = [];
            this.data = [];

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.fetchProvince();
                    this.fetchOrganization();
                    //   this.fetchFarm();
                    this.search.ProvinceID = null;
                    this.search.AmphurID = null;
                    this.search.TumbolID = null;
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.ProvinceID"() {
            this.fetchAmphur();
            this.fetchOrganization();
            //   this.fetchFarm();
            this.dropdown.Amphurs = [];
            this.dropdown.Tumbols = [];

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.search.AmphurID = null;
                    this.search.TumbolID = null;
                    //   this.search.OrganizationTypeID = null;
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.AmphurID"() {
            this.fetchTumbol();
            this.fetchOrganization();
            //   this.fetchFarm();
            this.dropdown.Tumbols = [];

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.search.TumbolID = null;
                    //   this.search.OrganizationTypeID = null;
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.TumbolID"() {
            this.fetchOrganization();
            //   this.fetchFarm();

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.OrganizationTypeID"() {
            this.fetchOrganization();

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.OrganizationID"() {
            //   this.fetchFarm();

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.FarmID"() {
            // this.load();
            // //   this.loadAnimal();

            // if (this.isLoading == false) {
            //     this.isLoading = true;
            //     setTimeout(() => {
            //         this.isLoading = false;
            //     }, 1000);
            // }
        },
        "search.ProjectIDArray"() {
            //   this.fetchFarm();
            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.FarmAnimalType"() {
            //   this.fetchFarm();

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.FarmerFullName"() {
            //   this.fetchFarm();

            if (this.isLoading == false) {
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            }
        },
        displaytab() {
            this.load();
        },
    },
    unmounted() {
        this.controller.abort();
    },
    methods: {
        loadSearchFromLocalStorage() {
            try {
                const savedConfig = localStorage.getItem("AIDMappConfig");
                if (savedConfig) {
                    const config = JSON.parse(savedConfig);

                    // ตั้งค่าค่า default จาก localStorage
                    if (config.AIZoneID) {
                        this.search.AIZoneID = config.AIZoneID;
                    }
                    if (config.OrganizationZoneID) {
                        this.search.OrganizationZoneID =
                            config.OrganizationZoneID;
                    }
                    if (config.ProvinceID) {
                        this.search.ProvinceID = config.ProvinceID;
                    }
                    if (config.AmphurID) {
                        this.search.AmphurID = config.AmphurID;
                    }
                    if (config.TumbolID) {
                        this.search.TumbolID = config.TumbolID;
                    }
                    if (config.OrganizationID) {
                        this.search.OrganizationID = config.OrganizationID;
                    }
                    if (config.FarmID) {
                        this.search.FarmID = config.FarmID;
                    }

                    // ถ้ามี FarmID ให้โหลดข้อมูลฟาร์มและสัตว์ทันที
                    if (config.FarmID) {
                        this.load();
                    }
                }
            } catch (error) {
                console.error(
                    "Error loading search config from localStorage:",
                    error
                );
            }
        },
        clear() {
            this.displaytab = false;
            //   this.loadAnimal();
            this.fetchAnimal();
        },

        loadDefault() {
            this.isLoading = true;
            this.fetchAIZone();
            this.fetchOrganizationZone();
            this.fetchProject();
            this.fetchProvince();
            this.fetchAmphur();
            this.fetchTumbol();
            this.fetchOrganizationType();
            this.fetchOrganization();
            //   this.fetchFarm();
        },

        fetchAIZone() {
            let params = {};
            //  Fetch AIZone
            axios
                .get(this.url.AIZone, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.AIZones = res.data.rows;
                    //   if (localStorage.getItem("staffID") !== null) {
                    //     this.open_edit(localStorage.getItem("staffID"));
                    //     localStorage.removeItem("staffID");
                    //   }
                    if (store.state.user.GroupID === 1) {
                        this.dropdown.AIZones.push({
                            AIZoneID: 99,
                            AIZoneName: "ทั้งหมด",
                        });
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchOrganizationZone() {
            let params = { includeAll: false, isActive: 1 };
            //  Fetch OrganizationZone
            axios
                .get(this.url.OrganizationZone, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.OrganizationZones = res.data.rows;

                    if (store.state.user.GroupID === 1) {
                        this.dropdown.OrganizationZones.push({
                            OrganizationZoneID: 99,
                            OrganizationZoneName: "ทั้งหมด",
                        });
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchProject() {
            let params = {};

            if (this.animal_id == 1) {
                params["AnimalTypeID"] = "[1,2,41,42]";
            } else if (this.animal_id == 2) {
                params["AnimalTypeID"] = "[3,4,43,44]";
            } else if (this.animal_id == 3) {
                params["AnimalTypeID"] = "[17,18,45,46]";
            }

            axios
                .get(this.url.Project, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Projects = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchProvince() {
            //  Fetch Province
            let params = {};

            if (this.search.AIZoneID != null) {
                params["AIZoneID"] = this.search.AIZoneID;
            }

            if (this.search.OrganizationZoneID != null) {
                params["OrganizationZoneID"] = this.search.OrganizationZoneID;
            }
            axios
                .get(this.url.Province, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Provinces = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchAmphur() {
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null &&
                this.search.ProvinceID == null
            ) {
                return;
            }

            let params = {};

            if (this.search.ProvinceID != null) {
                params["ProvinceID"] = this.search.ProvinceID;
            }

            axios
                .get(this.url.Amphur, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Amphurs = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchTumbol() {
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null &&
                this.search.AmphurID == null
            ) {
                return;
            }

            let params = {};

            if (this.search.AmphurID != null) {
                params["AmphurID"] = this.search.AmphurID;
            }

            axios
                .get(this.url.Tumbol, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Tumbols = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchOrganizationType() {
            let params = {};

            axios
                .get(this.url.OrganizationType, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.OrganizationTypes = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchOrganization() {
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null
            ) {
                return;
            }

            let params = {};

            if (this.search.OrganizationTypeID != null) {
                params["OrganizationTypeID"] = this.search.OrganizationTypeID;
            }

            // Province IN AIZOne
            if (this.search.AIZoneID != null) {
                params["OrganizationAiZoneID"] = this.search.AIZoneID;
            }

            if (this.search.OrganizationZoneID != null) {
                params["OrganizationZoneID"] = this.search.OrganizationZoneID;
            }

            if (this.search.ProvinceID != null) {
                params["OrganizationProvinceID"] = this.search.ProvinceID;
            }

            if (this.search.AmphurID != null) {
                params["OrganizationAmphurID"] = this.search.AmphurID;
            }

            if (this.search.TumbolID != null) {
                params["OrganizationTumbolID"] = this.search.TumbolID;
            }

            axios
                .get(this.url.Organization, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Organizations = res.data.rows.map((item) => {
                        return {
                            OrganizationID: item.OrganizationID,
                            OrganizationFull:
                                item.OrganizationCode +
                                ", " +
                                item.OrganizationName,
                        };
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchFarm() {
            this.isLoading = true;
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null
            ) {
                this.isLoading = false;
                return;
            }

            let params = {
                size: this.rowPerPage,
                page: this.currentPage,
                orderByField: "FarmID",
                orderBy: "desc",
                // includeAll: false,
            };

            //   if (this.search.FarmAnimalType == null) {
            //     this.search.FarmAnimalType = parseInt(this.animal_id);
            //     params["FarmAnimalType"] = this.search.FarmAnimalType;
            //   } else {
            //     params["FarmAnimalType"] = this.search.FarmAnimalType;
            //   }

            this.search.FarmAnimalType = parseInt(this.animal_id);

            // Province IN AIZOne
            if (this.search.AIZoneID != null) {
                if (this.search.AIZoneID != 99) {
                    params["AIZoneID"] = this.search.AIZoneID;
                }
            }

            if (this.search.OrganizationZoneID != null) {
                if (this.search.OrganizationZoneID != 99) {
                    params["OrganizationZoneID"] =
                        this.search.OrganizationZoneID;
                }
            }

            if (this.search.ProvinceID != null) {
                params["FarmProvinceID"] = this.search.ProvinceID;
            }

            if (this.search.AmphurID != null) {
                params["FarmAmphurID"] = this.search.AmphurID;
            }

            if (this.search.TumbolID != null) {
                params["FarmTumbolID"] = this.search.TumbolID;
            }

            if (this.search.OrganizationID != null) {
                params["OrganizationID"] = this.search.OrganizationID;
            }

            if (this.search.OrganizationID != null) {
                params["OrganizationID"] = this.search.OrganizationID;
            }

            if (this.search.ProjectIDArray) {
                params["ProjectID"] = JSON.stringify(
                    this.search.ProjectIDArray
                );
            }

            if (this.search.FarmerFullName) {
                params["FullName"] = this.search.FarmerFullName;
            }
        },

        async load() {
            if (this.search.FarmID != null) {
                let url = "/farm/" + this.search.FarmID.FarmID;

                console.log(url);
                axios
                    .get(url, {
                        signal: this.controller.signal,
                    })
                    .then((res) => {
                        this.data = res.data;
                        store.dispatch("farmDataItem", this.data);

                        this.fetchAnimal();
                    })
                    .catch(() => {
                        store.dispatch("farmDataItem", null);
                    })
                    .finally(() => {
                        this.IsSearch = false;
                    });
            }
        },

        fetchAnimal() {
            this.isLoading = true;

            if (this.search.FarmID == null) {
                this.isLoading = false;
                return;
            }

            let params = {
                FarmID: this.search.FarmID.FarmID,
                includeAnimalBreed: true,
            };

            if (this.animal_id == 2) {
                params["AnimalTypeID"] = "[3,4,43,44]";
            } else if (this.animal_id == 3) {
                params["AnimalTypeID"] = "[17,18,45,46]";
            } else {
                params["AnimalTypeID"] = "[1,2,41,42]";
            }

            params["is_active"] = 1;

            axios
                .get(this.animal_url, {
                    signal: this.controller.signal,
                    params: params,
                })
                .then((res) => {
                    this.animal = res.data.rows;

                    let test = this.animal;
                    let texttmp;

                    for (let i = 0; i < test.length; i++) {
                        test[i].show_id = i + 1;

                        if (test[i].AnimalStatus) {
                            texttmp = test[i].AnimalStatus.split(" ");
                        }

                        // ครั้งที่ผสม วันที่ผสม ตรวจท้อง
                        if (texttmp[1]) {
                            if (texttmp[1] == "คลอด" || texttmp[1] == "แท้ง") {
                                test[i].TimeNo = "-";
                                test[i].ThaiAIDate = "-";
                                test[i].PregnancyStatus = "-";
                            }
                        }

                        if (texttmp[0]) {
                            console.log(texttmp[0]);

                            if (texttmp[0] == "ลูกโค") {
                                test[i].PAR = "-";
                                test[i].TimeNo = "-";
                                test[i].ThaiAIDate = "-";
                                test[i].PregnancyStatus = "-";
                            }
                        }
                    }

                    this.animal = test;

                    this.noti = res.data.noti;
                    this.total = res.data.countAnimal;

                    if (this.animal_id == 1) {
                        this.animal = res.data.rows.filter(
                            (item) =>
                                item.AnimalTypeID === 1 ||
                                item.AnimalTypeID === 2 ||
                                item.AnimalTypeID === 41 ||
                                item.AnimalTypeID === 42
                        );
                    } else if (this.animal_id == 2) {
                        this.animal = res.data.rows.filter(
                            (item) =>
                                item.AnimalTypeID === 3 ||
                                item.AnimalTypeID === 4 ||
                                item.AnimalTypeID === 43 ||
                                item.AnimalTypeID === 44
                        );
                    } else if (this.animal_id == 3) {
                        this.animal = res.data.rows.filter(
                            (item) =>
                                item.AnimalTypeID === 17 ||
                                item.AnimalTypeID === 18 ||
                                item.AnimalTypeID === 45 ||
                                item.AnimalTypeID === 46
                        );
                    }

                    for (let i = 0; i < this.animal.length; i++) {
                        this.animal[i].show_id = i + 1;
                    }

                    console.log(this.animal);
                })
                .finally(() => {
                    this.IsSearch = false;
                    this.isLoading = false;
                });
        },

        fetchSelectionFarm(search) {
            if (search.length < 3) {
                this.dropdown.Farms = [];
                return;
            }

            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null
            ) {
                this.isLoading = false;
                return;
            }

            let params = {
                size: this.rowPerPage,
                page: 1,
                orderByField: "FarmID",
                orderBy: "desc",
                // includeAll: false,
            };

            params["Fullname"] = search;

            this.search.FarmAnimalType = parseInt(this.animal_id);

            // Province IN AIZOne
            if (this.search.AIZoneID != null) {
                if (this.search.AIZoneID != 99) {
                    params["AIZoneID"] = this.search.AIZoneID;
                }
            }

            if (this.search.OrganizationZoneID != null) {
                if (this.search.OrganizationZoneID != 99) {
                    params["OrganizationZoneID"] =
                        this.search.OrganizationZoneID;
                }
            }

            if (this.search.ProvinceID != null) {
                params["FarmProvinceID"] = this.search.ProvinceID;
            }

            if (this.search.AmphurID != null) {
                params["FarmAmphurID"] = this.search.AmphurID;
            }

            if (this.search.TumbolID != null) {
                params["FarmTumbolID"] = this.search.TumbolID;
            }

            if (this.search.OrganizationID != null) {
                params["OrganizationID"] = this.search.OrganizationID;
            }

            if (this.search.OrganizationID != null) {
                params["OrganizationID"] = this.search.OrganizationID;
            }

            if (this.search.ProjectIDArray) {
                params["ProjectID"] = JSON.stringify(
                    this.search.ProjectIDArray
                );
            }

            if (this.search.FarmerFullName) {
                params["FullName"] = this.search.FarmerFullName;
            }

            console.log(params);

            axios
                .get(this.url.Farm, {
                    signal: this.controller.signal,
                    params: {
                        Fullname: search,
                        OrganizationZoneID: this.search.OrganizationZoneID,
                        orderBy: "desc",
                        // orderByField: "FarmID",
                        page: 1,
                        size: undefined,
                    },
                })
                .then((res) => {
                    this.dropdown.Farms = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        // async loadAnimal() {
        //   let url;
        //   if (this.animal_id == 1) {
        //     url = this.animal_url + "?AnimalTypeID=[1,2,41,42]&FarmID=";
        //   } else if (this.animal_id == 2) {
        //     url = this.animal_url + "?AnimalTypeID=[3,4,43,44]&FarmID=";
        //   } else if (this.animal_id == 3) {
        //     url = this.animal_url + "?AnimalTypeID=[17,18,45,46]&FarmID=";
        //   }

        //   axios
        //     .get(url + "/" + this.search.FarmID, {
        //       signal: this.controller.signal,
        //     })
        //     .then((res) => {
        //       this.animal = res.data.rows;
        //       console.log(this.animal);

        //       let test = this.animal;

        //       let texttmp;

        //       console.log(test);

        //       for (let i = 0; i < test.length; i++) {
        //         test[i].show_id = i + 1;

        //         if (test[i].AnimalStatus) {
        //           texttmp = test[i].AnimalStatus.split(" ");
        //         }

        //         // ครั้งที่ผสม วันที่ผสม ตรวจท้อง
        //         if (texttmp[1]) {
        //           console.log(texttmp[1]);

        //           if (texttmp[1] == "คลอด" || texttmp[1] == "แท้ง") {
        //             console.log(55);
        //             test[i].TimeNo = "-";
        //             test[i].ThaiAIDate = "-";
        //             test[i].PregnancyStatus = "-";
        //           }
        //         }

        //         if (texttmp[0]) {
        //           console.log(texttmp[0]);

        //           if (texttmp[0] == "ลูกโค") {
        //             test[i].PAR = "-";
        //             test[i].TimeNo = "-";
        //             test[i].ThaiAIDate = "-";
        //             test[i].PregnancyStatus = "-";
        //           }
        //         }
        //       }

        //       this.animal = test;

        //       this.noti = res.data.noti;
        //       this.total = res.data.countAnimal;

        //       if (this.animal_id == 1) {
        //         this.animal = res.data.rows.filter(
        //           (item) =>
        //             item.AnimalTypeID === 1 ||
        //             item.AnimalTypeID === 2 ||
        //             item.AnimalTypeID === 41 ||
        //             item.AnimalTypeID === 42
        //         );
        //       } else if (this.animal_id == 2) {
        //         this.animal = res.data.rows.filter(
        //           (item) =>
        //             item.AnimalTypeID === 3 ||
        //             item.AnimalTypeID === 4 ||
        //             item.AnimalTypeID === 43 ||
        //             item.AnimalTypeID === 44
        //         );
        //       } else if (this.animal_id == 3) {
        //         this.animal = res.data.rows.filter(
        //           (item) =>
        //             item.AnimalTypeID === 17 ||
        //             item.AnimalTypeID === 18 ||
        //             item.AnimalTypeID === 45 ||
        //             item.AnimalTypeID === 46
        //         );
        //       }

        //       // this.animal = res.data.rows.map((item) => {
        //       //   return {
        //       //     StaffID: item.StaffID,
        //       //     StaffNumber: item.StaffNumber,
        //       //     Fullname:
        //       //       item.StaffNumber +
        //       //       ", " +
        //       //       item.StaffGivenName +
        //       //       " " +
        //       //       item.StaffSurname,
        //       //   };
        //       // });

        //       for (let i = 0; i < this.animal.length; i++) {
        //         this.animal[i].show_id = i + 1;
        //       }
        //     })
        //     .finally(() => {
        //       this.IsSearch = false;
        //       this.isLoading = false;
        //     });
        // },

        openRegister() {
            let item = {
                FarmID: this.farmDataItem.FarmID,
                OrganizationID: this.farmDataItem.OrganizationID,
                OrganizationZoneID:
                    this.farmDataItem.OrganizationZone.OrganizationZoneID,
                checkFarm: true,
            };

            store.dispatch("bornItem", item);
            this.$router.push("/creature/add");
        },
        openFirstTab(id, menu, earid) {
            let data = {
                AnimalEarID: earid,
            };

            // ตรวจสอบว่ามีเมนู "ผสมเทียม" หรือไม่

            let tab = {
                id: 0,
                animal_id: this.animal_id,
            };

            store.dispatch("tabAnimal", tab);
            store.dispatch("animalInfo", data);
            this.displaytab = true;
        },

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
                //   label: "แก้ไข",
                //   icon: "pi pi-pencil",
                //   command: () => {
                //     this.$router.push("/creature/edit/" + id);
                //   },
                // },
                {
                    label: "พิมพ์ประวัติ",
                    icon: "pi pi-print",
                    command: async () => {
                        // window.open("../../pdf/Animal.pdf", "_blank");
                        await ArtificialReport();
                    },
                },
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
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        filterInfo(id) {
            if (id == 1) {
                this.search["global"].value = "ครบกำหนดคลอด";
            } else if (id == 2) {
                this.search["global"].value = "ครบกำหนดตรวจท้อง";
            } else if (id == 3) {
                this.search["global"].value = "ครบกําหนดติดตามลูกเกิดหลังคลอด";
            } else if (id == 4) {
                this.search["global"].value =
                    "ครบกําหนดตรวจระบบสืบพันธุ์หลังคลอด";
            } else if (id == 5) {
                this.search["global"].value = "อายุมากกว่ากําหนด";
            } else if (id == 6) {
                this.search["global"].value = "แจ้งเตือนกลับสัด";
            } else if (id == 7) {
                this.search["global"].value = "ผสมซ้ำเกิน 3 ครั้ง";
            } else if (id == 8) {
                this.search["global"].value = "เลยกำหนดคลอด";
            } else if (id == 9) {
                this.search["global"].value = "ครบกำหนดบันทึก Thaiblack";
            } else if (id == 10) {
                this.search["global"].value = "ครบกำหนดบันทึก แดงสุราษฏร์";
            }
        },
        formatArray(value) {
            return value.toLocaleString();
        },
        addCart(id) {
            let data = {
                AnimalID: id,
            };

            axios
                .post("/cart", data)
                .then(() => {
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "เพิ่มข้อมูลเสร็จสิ้น",
                        life: 5000,
                    });

                    this.fetchAnimal();
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
        delCart(id) {
            //! กรณีเป็น method delete เวลาส่ง json ต้องถูกครอบด้วย data อีกที
            let data = {
                data: {
                    AnimalID: id,
                },
            };

            axios
                .delete("/cart/", data)
                .then(() => {
                    // console.log(this);
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "ลบข้อมูลเสร็จสิ้น",
                        life: 5000,
                    });
                    this.fetchAnimal();
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
        clearFilter() {
            // console.log("5555");
            this.params.GetByOrgProvince = null;
            this.params.OrganizationZoneID = null;
            this.params.FarmProvinceID = null;
            this.params.FarmAmphurID = null;
            this.params.FarmTumbolID = null;

            this.search.OrganizationZone = 0;
            this.search.FarmProvinceID = 0;
            this.search.FarmAmphurID = 0;
            this.search.FarmTumbolID = 0;

            this.filtered.FarmProvinceID = 0;

            this.checkSearch = 1;
            // axios
            //   .get(this.apiFarm, {
            //     params: this.params,
            //     signal: this.controller.signal,
            //   })
            //   .then((res) => {
            //     this.farm = res.data.rows
            //       .sort((a, b) =>
            //         a.Province.ProvinceName.localeCompare(b.Province.ProvinceName)
            //       )
            //       .map((item) => {
            //         let name = item.Farmer ? item.Farmer.FullName : "- ";
            //         let number = item.FarmIdentificationNumber
            //           ? item.FarmIdentificationNumber
            //           : "- ";
            //         let province = item.Province ? item.Province.ProvinceName : "- ";
            //         let Organization = item.OrganizationZone
            //           ? item.OrganizationZone.OrganizationZoneName
            //           : "- ";

            //         return {
            //           FarmID: item.FarmID,
            //           FarmName: item.FarmName,
            //           Fullname:
            //             "ฟาร์ม " +
            //             item.FarmName +
            //             " (" +
            //             number +
            //             ")" +
            //             " | เจ้าของฟาร์ม " +
            //             name +
            //             " | จังหวัด " +
            //             province +
            //             " | " +
            //             Organization,
            //           OrganizationZoneName: Organization,
            //         };
            //       });
            //     this.loader = true;
            //   });
        },
    },
};
</script>

<style scoped lang="scss">
.p-card {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.04) !important;
}

.notification-item {
    transition: all 0.3s ease-in-out;

    div {
        transition: all 0.3s ease-in-out;
    }

    &.active {
        border-color: var(--primary-color) !important;

        div.text-600 {
            color: var(--primary-color) !important;
            font-weight: 500 !important;
        }
    }

    &:hover,
    &:focus,
    &:active {
        border-color: var(--primary-color) !important;

        div.text-600 {
            color: var(--primary-color) !important;
            font-weight: 500 !important;
        }
    }
}
</style>
