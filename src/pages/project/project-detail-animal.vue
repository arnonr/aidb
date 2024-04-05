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
              :options="dropdown.Projects"
              optionLabel="ProjectName"
              optionValue="ProjectID"
              :filter="true"
              v-model="search.ProjectIDArray"
              :virtualScrollerOptions="{ itemSize: 38 }"
            />
          </div>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12">
        <router-link :to="'/project/detail?projects=' + search.ProjectIDArray">
          <Button severity="secondary" label="ทะเบียนฟาร์ม" />
        </router-link>
        <router-link
          :to="'/project/detail-animal?projects=' + search.ProjectIDArray"
        >
          <Button severity="primary" label="ทะเบียนสัตว์" class="ml-2" />
        </router-link>
        <router-link
          :to="'/project/detail-diary?projects=' + search.ProjectIDArray"
        >
          <Button severity="secondary" label="กิจกรรมแจ้งเตือน" class="ml-2" />
        </router-link>
      </div>

      <div class="card mb-5">
        <div v-if="loader" class="grid">
          <div class="col-12">
            <h1 class="text-xl mb-4 text-500">เครื่องมือช่วยค้นหาสัตว์</h1>
          </div>

          <div class="col-12 sm:col-6 lg:col-6">
            <label for="AIZoneID" class="block text-600 text-sm font-bold mb-2">
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

          <div class="col-12 sm:col-6 lg:col-6">
            <label
              for="searchSubDistrict"
              class="block text-600 text-sm font-bold mb-2"
            >
              ฟาร์ม</label
            >

            <v-select
              v-model="search.FarmID"
              :options="dropdown.Farms"
              @search="fetchFarm"
              label="Fullname"
              value="FarmID"
              class="w-full"
              placeholder="เลือกฟาร์มปลายทาง (พิมพ์ 3 ตัวอักษรเพื่อค้นหา)"
            ></v-select>
          </div>

          <div class="col-12 sm:col-6 lg:col-3">
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

          <div class="col-12 sm:col-6 lg:col-3">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              ชื่อสัตว์</label
            >

            <InputText class="w-full" type="text" v-model="params.AnimalName" />
          </div>

          <div class="col-12 sm:col-6 lg:col-3">
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
              :options="dropdown.AnimalSex"
              :filter="true"
              v-model="search.AnimalSexID"
            />

            <!-- @show="test()" -->
          </div>

          <!-- <div class="col-12 sm:col-12 lg:col-4">
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
          </div> -->
          <!-- 
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
          </div> -->

          <!-- <div class="col-12 sm:col-6 lg:col-4">
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


          <div class="col-12 sm:col-6 lg:col-8">
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

          <div class="col-12 sm:col-6 lg:col-3">
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

          <div class="col-12 sm:col-6 lg:col-3">
            <label
              for="selectedFarm"
              class="block text-600 text-sm font-bold mb-2"
            >
              นับจำนวนสัตว์โครงการ</label
            >
            <Dropdown
              class="w-full"
              id="selectedCountProjectType"
              v-model="search.count_project_type"
              placeholder="สัตว์ที่อยู่ในโครงการที่เลือก"
              :options="[
                {
                  id: 1,
                  name: 'สัตว์ที่อยู่ในโครงการที่เลือก',
                },
                {
                  id: 2,
                  name: 'สัตว์ที่อยู่ในโครงการอื่น',
                },
                {
                  id: 3,
                  name: 'สัตว์ที่ไม่ระบุโครงการ',
                },
              ]"
              optionLabel="name"
              optionValue="id"
            />
          </div>

          <Accordion class="col-12 sm:col-12 lg:col-12">
            <AccordionTab header="ค้นหาขั้นสูง">
              <div class="grid">
                <!-- <div class="col-12 sm:col-6 lg:col-4">
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
                </div> -->
                <!-- <div class="col-12 sm:col-6 lg:col-4">
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
                </div> -->
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
                <!-- <div class="col-12 sm:col-6 lg:col-4">
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
                </div> -->

                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="selectedFarm"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    หมายเลขใบหูพ่อ</label
                  >

                  <InputText
                    class="w-full"
                    type="text"
                    v-model="parents.AnimalFatherEarID"
                  />
                </div>

                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="selectedFarm"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    หมายเลขใบหูแม่</label
                  >

                  <InputText
                    class="w-full"
                    type="text"
                    v-model="parents.AnimalMotherEarID"
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

          <div class="col-12 sm:col-12 lg:col-12">
            <Button
              @click="onSearch"
              label="ค้นหา"
              icon=""
              style="width: 100%"
              class="mr-2 mb-3"
            />
          </div>
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
        <div class="col-12 md:col-12 md:text-right">
          <Button
            @click="onExport()"
            label="ดาวน์โหลด"
            icon="pi pi-download"
            class="mb-3 p-button-raised p-button-raised p-button-success"
          />
        </div>

        <DataTable
          class="text-sm"
          :value="data"
          :exportable="true"
          ref="dt"
          :rowHover="true"
          :loading="isLoading"
          :paginator="true"
          v-model:rows="this.rowPerPage"
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
// import _ from "lodash";
import VueCreatureInfo from "@/pages/farm_info/creature_info.vue";
// import JsonExcel from "vue-json-excel3";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import ExcelJS from "exceljs";

// import dayjs from "dayjs";
// import buddhistEra from "dayjs/plugin/buddhistEra";
//   import RegisteredAnimalReport from "./RegisteredAnimalReport";
// import JsonExcel from "vue-json-excel3";

export default {
  components: {
    PageTitle,
    VueCreatureInfo,
    // JsonExcel,
    vSelect,
  },
  data() {
    return {
      rowPerPage: 10,
      currentPage: 1,
      url: {
        AIZone: "/ai-zone/selection?includeAll=false",
        OrganizationZone:
          "/organization-zone/selection?includeAll=false&isActive=1",
        OrganizationType:
          "/organization-type/selection?includeAll=false&isActive=1",
        Organization: "/organization/selection?includeAll=false&isActive=1",
        Farm: "/farm/selection?includeAll=false&isActive=1",
        Animal: "/animal",
        AnimalSex: "/animal-sex/selection?includeAll=false&isActive=1",
        ExportAnimal: "/animal/export-excel",
        Province: "/province/selection?includeAll=false&isActive=1",
        Amphur: "/amphur/selection?includeAll=false&isActive=1",
        Tumbol: "/tumbol/selection?includeAll=false&isActive=1",
        Project: "/project/selection?includeAll=false&isActive=1",
        AnimalBreedID: "/animal-breed?includeAll=false&isActive=1",
      },
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
      parents: {
        AnimalFatherEarID: null,
        AnimalMotherEarID: null,
      },

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
        FarmAnimalType: null,
        AnimalSexID: "",
        AnimalSource: "",
        StaffStartDate: "",
        StaffEndDate: "",
        Status: "",
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
      if (
        this.$route.query.projects != null &&
        this.$route.query.projects != "null" &&
        this.$route.query.projects != "undefined" &&
        this.$route.query.projects != ""
      ) {
        let pj = this.$route.query.projects.split(",");

        this.search.Project = pj.map((e) => {
          return parseInt(e);
        });

        this.params.ProjectID = pj.map((e) => {
          return parseInt(e);
        });

        this.search.ProjectIDArray = pj.map((e) => {
          return parseInt(e);
        });
      } else if (
        this.$route.query.projects == "null" ||
        this.$route.query.projects == ""
      ) {
        this.search.Project = [];
      } else {
        this.search.Project = [];
      }
    }

    this.load();

    // if (this.animal_id == 1) {
    //   this.url.Project += "&ProjectLevel=ANIMAL&AnimalTypeID=[1,2,41,42]";
    // } else if (this.animal_id == 2) {
    //   this.url.Project += "&ProjectLevel=ANIMAL&AnimalTypeID=[3,4,43,44]";
    // } else if (this.animal_id == 3) {
    //   this.url.Project += "&ProjectLevel=ANIMAL&AnimalTypeID=[17,18,45,46]";
    // }
    axios
      .get(this.url.Project, { signal: this.controller.signal })
      .then((response) => {
        this.project = response.data.rows;
      });

    this.form.isActive = this.status[0];

    this.loadDefault();
    this.permit = this.permission.filter((item) => {
      return item.MenuID == 3;
    });

    if (store.state.user.Staff.Organization.OrganizationZoneID) {
      this.search.OrganizationZoneID =
        store.state.user.Staff.Organization.OrganizationZoneID;
    }
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
        // this.isLoading = true;
        setTimeout(() => {
          this.fetchProvince();
          //   this.fetchOrganization();
          //   this.fetchFarm();
          //   this.fetchAnimal();
          //   this.exportExcel();
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
        // this.isLoading = true;
        setTimeout(() => {
          this.fetchProvince();
          this.fetchOrganization();
          //   this.fetchFarm();
          //   this.fetchAnimal();
          //   this.exportExcel();
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
      //   this.fetchAnimal();
      //   this.exportExcel();
      this.dropdown.Amphurs = [];
      this.dropdown.Tumbols = [];

      if (this.isLoading == false) {
        // this.isLoading = true;
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
      //   this.fetchAnimal();
      //   this.exportExcel();
      this.dropdown.Tumbols = [];

      if (this.isLoading == false) {
        // this.isLoading = true;
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
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
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
        // this.isLoading = true;
        setTimeout(() => {
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.OrganizationID"() {
      //   this.fetchFarm();
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.search.OrganizationID = null;
          this.search.FarmID = null;
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.FarmID"() {
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.ProjectIDArray"() {
      //   this.fetchFarm();
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.count_project_type"() {
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    // count_project_type
    "search.FarmAnimalType"() {
      //   this.fetchFarm();
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.AnimalSexID"(val) {
      if (val) {
        this.params.AnimalSexID = val;
      } else {
        this.params.AnimalSexID = null;
      }
      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          //   this.fetchAnimal();
          //   this.exportExcel();

          this.isLoading = false;
        }, 1000);
      }
    },
    "params.AnimalEarID"() {
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalName"() {
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalSexID"() {
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },

    "search.Status"() {
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },

    "parents.AnimalFatherEarID"() {
      this.fetchFather();
      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },

    "parents.AnimalMotherEarID"() {
      this.fetchMother();
      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalAgeStart"() {
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalAgeTo"() {
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalBreedID1"() {
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalBreedID2"() {
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalBreedID3"() {
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalBreedID4"() {
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalBreedID5"() {
      //   this.fetchAnimal();
      //   this.exportExcel();

      if (this.isLoading == false) {
        // this.isLoading = true;
        setTimeout(() => {
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
        this.currentPage = event.page + 1;
      }

      // กำหนด parameter
      this.setParam();

      if (typeof this.params.ProjectID !== "string") {
        this.params.ProjectID = JSON.stringify(this.params.ProjectID);
      }

      this.fetchAnimal();
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

          this.dropdown.AIZones.push({
            AIZoneID: 99,
            AIZoneName: "ทั้งหมด",
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    fetchOrganizationZone() {
      let params = {};
      //  Fetch OrganizationZone
      axios
        .get(this.url.OrganizationZone, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.OrganizationZones = res.data.rows;
          this.dropdown.OrganizationZones.push({
            OrganizationZoneID: 99,
            OrganizationZoneName: "ทั้งหมด",
          });
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

    fetchAnimalSex() {
      //  Fetch Province
      let params = {};

      if (this.search.AIZoneID != null) {
        params["AIZoneID"] = this.search.AIZoneID;
      }

      if (this.search.OrganizationZoneID != null) {
        params["OrganizationZoneID"] = this.search.OrganizationZoneID;
      }
      axios
        .get(this.url.AnimalSex, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.AnimalSex = res.data.rows;
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
        params["ProvinceID"] = this.search.ProvinceID;
      }

      if (this.search.AmphurID != null) {
        params["FarmAmphurID"] = this.search.AmphurID;
      }

      if (this.search.TumbolID != null) {
        params["FarmTumbolID"] = this.search.TumbolID;
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
                item.OrganizationCode + ", " + item.OrganizationName,
            };
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    fetchFarm() {
      //   this.isLoading = true;
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        this.isLoading = false;
        return;
      }

      let params = {
        // size: this.rowPerPage,
        // page: this.currentPage,
        orderByField: "FarmID",
        orderBy: "desc",
        // includeAll: false,
      };

      if (this.search.FarmAnimalType == null) {
        this.search.FarmAnimalType = parseInt(this.animal_id);
        params["FarmAnimalType"] = this.search.FarmAnimalType;
      } else {
        params["FarmAnimalType"] = this.search.FarmAnimalType;
      }

      // Province IN AIZOne
      if (this.search.AIZoneID != null) {
        if (this.search.AIZoneID != 99) {
          params["AIZoneID"] = this.search.AIZoneID;
        }
      }

      if (this.search.OrganizationZoneID != null) {
        if (this.search.OrganizationZoneID != 99) {
          params["OrganizationZoneID"] = this.search.OrganizationZoneID;
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

      if (this.search.ProjectIDArray) {
        params["ProjectID"] = JSON.stringify(this.search.ProjectIDArray);
      }

      if (this.search.FarmerFullName) {
        params["FullName"] = this.search.FarmerFullName;
      }

      axios
        .get(this.url.Farm, {
          signal: this.controller.signal,
          params: params,
        })
        .then((res) => {
          this.dropdown.Farms = res.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    fetchAnimal() {
      this.isLoading = true;
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        this.isLoading = false;
        return;
      }
      let params = {
        ...this.params,
        size: this.rowPerPage,
        page: this.currentPage,
        orderByField: "FarmID",
        orderBy: "desc",
        isRemove: 0,
        // includeAll: false,
      };

      console.log(this.currentPage);

      if (this.search.FarmAnimalType == null) {
        this.search.FarmAnimalType = parseInt(this.animal_id);
        params["FarmAnimalType"] = this.search.FarmAnimalType;
      } else {
        params["FarmAnimalType"] = this.search.FarmAnimalType;
      }
      // Province IN AIZOne
      if (this.search.AIZoneID != null) {
        if (this.search.AIZoneID != 99) {
          params["AIZoneID"] = this.search.AIZoneID;
        }
      }
      if (this.search.OrganizationZoneID != null) {
        if (this.search.OrganizationZoneID != 99) {
          params["OrganizationZoneID"] = this.search.OrganizationZoneID;
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

      if (this.search.ProjectIDArray) {
        params["ProjectID"] = JSON.stringify(this.search.ProjectIDArray);
      }
      if (this.search.FarmerFullName) {
        params["FullName"] = this.search.FarmerFullName;
      }

      if (this.params.AnimalBreedID1) {
        params["AnimalBreedID1"] = this.params.AnimalBreedID1;
      }

      if (this.params.AnimalBreedID2) {
        params["AnimalBreedID2"] = this.params.AnimalBreedID2;
      }

      if (this.params.AnimalBreedID3) {
        params["AnimalBreedID3"] = this.params.AnimalBreedID3;
      }

      if (this.params.AnimalBreedID4) {
        params["AnimalBreedID4"] = this.params.AnimalBreedID4;
      }

      if (this.params.AnimalBreedID5) {
        params["AnimalBreedID5"] = this.params.AnimalBreedID5;
      }

      if (this.params.AnimalFatherID) {
        params["AnimalFatherID"] = this.params.AnimalFatherID;
      }

      if (this.params.AnimalMotherID) {
        params["AnimalMotherID"] = this.params.AnimalMotherID;
      }

      if (this.search.Status) {
        params["isActive"] = this.search.Status;
      }

      this.setParam();
      if (this.animal_id == 1) {
        params["AnimalTypeID"] = "[1,2,41,42]";
      } else if (this.animal_id == 2) {
        params["AnimalTypeID"] = "[3,4,43,44]";
      } else if (this.animal_id == 3) {
        params["AnimalTypeID"] = "[17,18,45,46]";
      }
      if (this.search.FarmID) {
        params["FarmID"] = this.search.FarmID.FarmID;
      }
      //   if (this.filtered.AnimalSource) {
      //     this.params.AnimalSource = this.filtered.AnimalSource;
      //   }
      if (this.search.ProjectIDArray) {
        params["ProjectID"] = JSON.stringify(this.search.ProjectIDArray);
      }
      this.params.ProjectID = JSON.stringify(this.params.ProjectID);

      if (this.search.count_project_type) {
        params["CountProjectType"] = this.search.count_project_type;
      }

      axios
        .get(this.url.Animal, {
          signal: this.controller.signal,
          params: params,
          size: 10,
        })
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
    },

    async exportExcel() {
      this.isLoading = true;
      if (
        this.search.AIZoneID == null &&
        this.search.OrganizationZoneID == null
      ) {
        this.isLoading = false;
        return;
      }

      let params = {
        ...this.params,
        isRemove: 0,
        size: this.rowPerPage,
        page: this.currentPage,
        orderByField: "FarmID",
        orderBy: "desc",
        // includeAll: false,
      };

      if (this.search.FarmAnimalType == null) {
        this.search.FarmAnimalType = parseInt(this.animal_id);
        params["FarmAnimalType"] = this.search.FarmAnimalType;
      } else {
        params["FarmAnimalType"] = this.search.FarmAnimalType;
      }

      // Province IN AIZOne
      if (this.search.AIZoneID != null) {
        if (this.search.AIZoneID != 99) {
          params["AIZoneID"] = this.search.AIZoneID;
        }
      }

      if (this.search.OrganizationZoneID != null) {
        if (this.search.OrganizationZoneID != 99) {
          params["OrganizationZoneID"] = this.search.OrganizationZoneID;
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
        params["ProjectID"] = JSON.stringify(this.search.ProjectIDArray);
      }

      if (this.search.FarmerFullName) {
        params["FullName"] = this.search.FarmerFullName;
      }

      this.setParam();

      if (this.animal_id == 1) {
        params["AnimalTypeID"] = "[1,2,41,42]";
      } else if (this.animal_id == 2) {
        params["AnimalTypeID"] = "[3,4,43,44]";
      } else if (this.animal_id == 3) {
        params["AnimalTypeID"] = "[17,18,45,46]";
      }

      if (this.search.FarmID) {
        params["FarmID"] = this.search.FarmID.FarmID;
      }

      //   if (this.filtered.AnimalSource) {
      //     this.params.AnimalSource = this.filtered.AnimalSource;
      //   }

      if (this.search.ProjectIDArray) {
        params["ProjectID"] = JSON.stringify(this.search.ProjectIDArray);
      }

      if (this.search.Status) {
        params["isActive"] = this.search.Status;
      }

      await axios
        .get(this.url.ExportAnimal, {
          signal: this.controller.signal,
          params: {
            ...params,
            size: 100000,
            page: 1,
            noEventLatest: true,
            includeEventLatest: false,
          },
        })
        .then((response) => {
          this.json_data = response.data.rows;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    async onExport() {
      this.exportExcel().then(() => {
        setTimeout(async () => {
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet("รายการ", {
            pageSetup: { orientation: "landscape" },
            headerFooter: {
              firstHeader: "Hello Exceljs",
              firstFooter: "Hello World",
            },
          });

          //   หมายเลขใบหู: x.AnimalEarID,
          //         ชื่อสัตว์: x.AnimalName,
          //         อายุ: "'" + x.AnimalAge,
          //         สถานะ: x.AnimalStatus ? x.AnimalStatus.AnimalStatusName : "-",
          //         สายพันธุ์: x.AnimalBreedAll,
          //         วันเกิด: x.ThaiAnimalBirthDate,
          //         เพศ: x.AnimalSex.AnimalSexName,
          //         หมายเลขฟาร์ม: x.AnimalFarm.FarmIdentificationNumber,
          //         ชื่อฟาร์ม: x.AnimalFarm.FarmName,
          //         หน่วยงาน: x.Organization
          //           ? x.Organization.OrganizationName
          //           : "-",

          worksheet.columns = [
            {
              header: "หมายเลขใบหู",
              key: "หมายเลขใบหู",
              width: 25,
              outlineLevel: 1,
            },
            {
              header: "ชื่อสัตว์",
              key: "ชื่อสัตว์",
              width: 25,
              outlineLevel: 1,
            },
            {
              header: "อายุ",
              key: "อายุ",
              width: 25,
              outlineLevel: 1,
            },
            {
              header: "สถานะ",
              key: "สถานะ",
              width: 25,
              outlineLevel: 1,
            },
            {
              header: "สายพันธุ์",
              key: "สายพันธุ์",
              width: 25,
              outlineLevel: 1,
            },
            {
              header: "วันเกิด",
              key: "วันเกิด",
              width: 25,
              outlineLevel: 1,
            },
            {
              header: "เพศ",
              key: "เพศ",
              width: 25,
              outlineLevel: 1,
            },
            {
              header: "วันเกิด",
              key: "วันเกิด",
              width: 25,
              outlineLevel: 1,
            },
            {
              header: "หมายเลขฟาร์ม",
              key: "หมายเลขฟาร์ม",
              width: 25,
              outlineLevel: 1,
            },
            {
              header: "ชื่อฟาร์ม",
              key: "ชื่อฟาร์ม",
              width: 25,
              outlineLevel: 1,
            },
            {
              header: "หน่วยงาน",
              key: "หน่วยงาน",
              width: 25,
              outlineLevel: 1,
            },
            // {
            //   header: "วันที่ขึ้นทะเบียน",
            //   key: "วันที่ขึ้นทะเบียน",
            //   width: 25,
            //   outlineLevel: 1,
            // },
          ];

          // worksheet.properties.defaultRowHeight = 20;

          worksheet.addRows(this.json_data);

          worksheet.eachRow((row) => {
            // row.height = 45;
            row.eachCell(function (cell) {
              cell.alignment = {
                vertical: "middle",
                horizontal: "center",
                wrapText: true,
              };
            });
          });

          const row = worksheet.getRow(1);
          row.height = 20;

          worksheet.insertRow(1, "รายการฟาร์ม");
          worksheet.mergeCells("A1:K1");
          worksheet.getCell("A1").value = "รายการทะเบียนฟาร์ม";
          worksheet.getCell("A1").alignment = {
            vertical: "middle",
            horizontal: "center",
          };
          const font = { name: "Arial", size: 18, bold: true };
          worksheet.getCell("A1").font = font;

          const font1 = { name: "Arial", size: 18, bold: true };
          worksheet.getCell("A1").font = font1;

          // Images
          const buffer = await workbook.xlsx.writeBuffer();
          const blob = new Blob([buffer], { type: "application/octet-stream" });
          const href = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = href;
          link.download = "รายการฟาร์ม.xlsx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 1000);
      });
    },

    fetchAnimalBreed() {
      axios
        .get(this.url.AnimalBreedID, { signal: this.controller.signal })
        .then((response) => {
          if (this.animal_id == 1) {
            this.AnimalBreed = response.data.rows
              .filter(
                (item) =>
                  item.AnimalTypeID === 1 ||
                  item.AnimalTypeID === 2 ||
                  item.AnimalTypeID === 41 ||
                  item.AnimalTypeID === 42
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
                (item) =>
                  item.AnimalTypeID === 3 ||
                  item.AnimalTypeID === 4 ||
                  item.AnimalTypeID === 43 ||
                  item.AnimalTypeID === 44
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
                (item) =>
                  item.AnimalTypeID === 17 ||
                  item.AnimalTypeID === 18 ||
                  item.AnimalTypeID === 45 ||
                  item.AnimalTypeID === 46
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

    fetchFather() {
      if (
        this.parents.AnimalFatherEarID != null &&
        this.parents.AnimalFatherEarID != ""
      ) {
        axios
          .get("/animal?includeAll=false", {
            signal: this.controller.signal,
            params: {
              AnimalEarID: this.parents.AnimalFatherEarID,
            },
          })
          .then((res) => {
            if (res.data.rows.length != 0) {
              this.params.AnimalFatherID = res.data.rows[0].AnimalID;
            } else {
              this.params.AnimalFatherID = 0;
            }
            // this.fetchAnimal();
            // this.exportExcel();
          });
      } else {
        this.params.AnimalFatherID = null;
        // this.fetchAnimal();
        // this.exportExcel();
      }
    },

    fetchMother() {
      if (
        this.parents.AnimalMotherEarID != null &&
        this.parents.AnimalMotherEarID != ""
      ) {
        axios
          .get("/animal?includeAll=false", {
            signal: this.controller.signal,
            params: {
              AnimalEarID: this.parents.AnimalMotherEarID,
            },
          })
          .then((res) => {
            if (res.data.rows.length != 0) {
              this.params.AnimalMotherID = res.data.rows[0].AnimalID;
            } else {
              this.params.AnimalMotherID = 0;
            }
            // this.fetchAnimal();
            // this.exportExcel();
          });
      } else {
        this.params.AnimalMotherID = null;
        // this.fetchAnimal();
        // this.exportExcel();
      }
    },

    setParam() {
      if (this.search.OrganizationZoneID) {
        this.params.OrganizationZoneID = this.search.OrganizationZoneID;
      }
      if (this.search.FarmID) {
        this.params.FarmID = this.search.FarmID;
      }
      if (this.search.AnimalSource) {
        this.params.AnimalSource = this.search.AnimalSource;
      }

      if (this.animal_id == 1) {
        this.params.AnimalTypeID = "[1,2,41,42]";
      } else if (this.animal_id == 2) {
        this.params.AnimalTypeID = "[3,4,43,44]";
      } else if (this.animal_id == 3) {
        this.params.AnimalTypeID = "[17,18,45,46]";
      }
    },
    loadDefault() {
      this.isLoading = true;
      this.fetchAIZone();
      //   this.fetchAnialBreed();
      this.fetchOrganizationZone();
      this.fetchProject();
      this.fetchProvince();
      this.fetchAmphur();
      this.fetchTumbol();
      this.fetchOrganizationType();
      this.fetchOrganization();
      //   this.fetchFarm();
      this.fetchAnimalBreed();
      this.fetchAnimalSex();
      //   this.fetchAnimal();
    },
    // sort table
    sort($event) {
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
      this.currentPage = $event.page + 1;
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
    onSearch() {
      this.fetchAnimal();
      //   this.exportExcel();
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

// if (this.search.OrganizationID) {
//   url += "&OrganizationID=" + this.search.OrganizationID;
// }
// if (this.search.OrganizationZoneID) {
//   url += "&OrganizationZoneID=" + this.search.OrganizationZoneID;
// }
// if (this.search.FarmID) {
//   url += "&FarmID=" + this.search.FarmID;
// }
// if (this.search.AnimalIdentificationID) {
//   url +=
//     "&AnimalIdentificationID=" + this.search.AnimalIdentificationID;
// }
// if (this.search.AnimalEarID) {
//   url += "&AnimalEarID=" + this.search.AnimalEarID;
// }
// if (this.search.AnimalName) {
//   url += "&AnimalName=" + this.search.AnimalName;
// }
// if (this.search.AnimalNationalID) {
//   url += "&AnimalNationalID=" + this.search.AnimalNationalID;
// }
// if (this.search.AnimalMicrochip) {
//   url += "&AnimalMicrochip=" + this.search.AnimalMicrochip;
// }
// if (this.search.AnimalSexID) {
//   url += "&AnimalSexID=" + this.search.AnimalSexID;
// }
// if (this.search.AnimalSource) {
//   url += "&AnimalSource=" + this.search.AnimalSource;
// }

// if (this.search.StaffStartDate) {
//   url += "&StaffStartDate=" + this.search.StaffStartDate;
// }
// if (this.search.StaffEndDate) {
//   url += "&StaffEndDate=" + this.search.StaffEndDate;
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
