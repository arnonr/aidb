<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="ทะเบียนสัตว์ (ผท.1)" :pages="breadcrumb" />
      <div class="card mb-5">
        <div v-if="loader" class="grid">
          <div class="col-12">
            <h1 class="text-xl mb-4 text-500">
              เครื่องมือช่วยค้นหาทะเบียนสัตว์ (ผท.1)
            </h1>
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
            <Dropdown
              class="w-full"
              v-model="search.FarmID"
              :options="dropdown.Farms"
              optionLabel="Fullname"
              optionValue="FarmID"
              :filter="true"
              :showClear="true"
              :virtualScrollerOptions="{ itemSize: 38 }"
              placeholder="เลือกหมายเลขฟาร์ม"
            >
            </Dropdown>
          </div>
          <div class="col-6 sm:col-6 lg:col-6">
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
              :options="AnimalSex"
              :filter="true"
              v-model="search.AnimalSexID"
              @show="test()"
            />
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
                <div class="col-12 sm:col-6 lg:col-4">
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
                </div>

                <div class="col-12 sm:col-6 lg:col-3">
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

                <div class="col-12 sm:col-6 lg:col-3">
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
        <div class="grid flex align-items-center mb-5">
          <div class="col-12 md:col-6">
            <h1 class="text-2xl mb-0 text-600">ทะเบียนสัตว์ (ผท.1)</h1>
          </div>
          <div class="col-12 md:col-6 md:text-right">
            <Button
              label="เพิ่มทะเบียนสัตว์"
              icon="pi pi-plus"
              class="mb-3 mr-1 p-button-raised p-button-raised p-button-info"
              @click="creature"
            />
            <!-- <Button
              label="ดาวน์โหลด"
              icon="pi pi-download"
              class="mb-3 p-button-raised p-button-raised p-button-success"
              @click="exportCSV($event)"
            /> -->
            <json-excel
              :data="json_data"
              style="display: inline-block"
              class="mb-3"
            >
              <Button
                label="ดาวน์โหลด"
                icon="pi pi-download"
                class="p-button-raised p-button-raised p-button-success"
              />
            </json-excel>
          </div>
        </div>
        <DataTable
          class="text-sm"
          :value="data"
          :exportable="true"
          ref="dt"
          :rowHover="true"
          :loading="isLoading"
          :paginator="true"
          v-model:rows="params.size"
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
              <SplitButton
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
              </SplitButton>
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
    <Dialog
      header="รายละเอียด"
      v-model:visible="display_view"
      :style="{ width: '75vw' }"
      :modal="true"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="grid">
            <div class="col-12 sm:col-12 lg:col-4 text-center">
              <Image
                width="200"
                height="200"
                alt="Image Text"
                preview
                v-if="form.AnimalImagePath"
                :src="form.AnimalImagePath"
              >
              </Image>
              <Image
                v-else
                width="200"
                height="200"
                alt="Image Text"
                preview
                src="https://static.boredpanda.com/blog/wp-content/uploads/2017/11/My-most-popular-pic-since-I-started-dog-photography-5a0b38cbd5e1e__880.jpg"
              >
              </Image>
            </div>
            <div class="col-12 sm:col-12 lg:col-8 grid">
              <div class="field col-12 sm:col-6">
                <label class="block text-600 text-sm font-bold mb-2">
                  หมายเลขใบหู</label
                >
                <InputText
                  type="text"
                  class="w-full"
                  v-model="form.AnimalEarID"
                  disabled
                />
              </div>

              <div class="field col-12 sm:col-6">
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  หมายเลข NID</label
                >
                <InputText
                  type="text"
                  class="w-full"
                  v-model="form.AnimalNationalID"
                  disabled
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  หมายเลข RFID</label
                >
                <InputText
                  type="text"
                  class="w-full"
                  v-model="form.AnimalMicrochip"
                  disabled
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  ชื่อสัตว์</label
                >
                <InputText
                  type="text"
                  class="w-full"
                  v-model="form.AnimalName"
                  disabled
                />
              </div>

              <div class="field col-12 sm:col-6">
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  สถานะ</label
                >
                <InputText
                  type="text"
                  class="w-full"
                  v-model="form.AnimalStatus.AnimalStatusName"
                  disabled
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  เพศ</label
                >
                <InputText
                  type="text"
                  class="w-full"
                  v-model="form.AnimalSex.AnimalSexName"
                  disabled
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  ชนิดสัตว์</label
                >
                <InputText
                  type="text"
                  class="w-full"
                  v-model="form.AnimalType.AnimalTypeName"
                  disabled
                />
              </div>
              <div class="field col-12 sm:col-6">
                <label
                  for="selectedUnit"
                  class="block text-600 text-sm font-bold mb-2"
                >
                  ฟาร์ม</label
                >
                <InputText
                  type="text"
                  class="w-full"
                  v-model="form.AnimalFarm.FarmName"
                  disabled
                />
              </div>
            </div>
          </div>

          <hr />
          <div class="text-xl">ข้อมูลสัตว์เบื้องต้น</div>
          <div class="formgrid grid mt-2">
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                น้ำหนักแรกเกิด (กก.)</label
              >
              <InputText
                type="number"
                class="w-full"
                v-model="form.AnimalBornWeight"
                min="0"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ท้องที่</label
              >
              <InputText
                type="number"
                class="w-full"
                v-model="form.AnimalPar"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"
                >แหล่งที่มา</label
              >
              <!-- <Dropdown
                class="w-full"
                :options="AnimalSource"
                optionLabel="name"
                :filter="true"
                placeholder="เลือกแหล่งที่มา"
                v-model="form.AnimalSource"
              /> -->
              <InputText
                type="text"
                class="w-full"
                v-model="form.AnimalSourceName"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"
                >รูปแบบการเกิด</label
              >

              <InputText
                type="text"
                class="w-full"
                v-model="form.AnimalBornTypeName"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6 md:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                ฟาร์มต้นทาง</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.SourceFarm.FarmName"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"
                >แหล่งที่มา (ระบุ)</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.SourceText"
                disabled
              />
            </div>

            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2">
                โครงการ</label
              >
              <MultiSelect
                class="w-full"
                :options="project"
                optionLabel="ProjectName"
                optionValue="ProjectID"
                placeholder="เลือกโครงการ"
                display="chip"
                v-model="form.ProjectID"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6">
              <label class="block text-600 text-sm font-bold mb-2"
                >ตั้งต้นสายเลือด</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.AnimalFirstBreedName"
                disabled
              />
            </div>
          </div>
          <hr />
          <div class="text-xl">ข้อมูลสายพันธุ์</div>
          <div class="formgrid grid mt-2">
            <div
              class="field col-12 sm:col-6"
              v-if="form.AnimalFirstBreed == '0'"
            >
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขพ่อ</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.AnimalFather.Fullname"
                disabled
              />
            </div>
            <div
              class="field col-12 sm:col-6"
              v-if="form.AnimalFirstBreed == '0'"
            >
              <label class="block text-600 text-sm font-bold mb-2">
                หมายเลขแม่</label
              >
              <InputText
                type="text"
                class="w-full"
                v-model="form.AnimalMother.Fullname"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6" v-if="form.AnimalBreedID1">
              <label class="block text-600 text-sm font-bold mb-2"
                >สายพันธุ์ที่ 1</label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                optionLabel="Fullname"
                optionValue="AnimalBreedID"
                :options="AnimalBreed"
                placeholder="เลือกสายพันธุ์ที่"
                :showClear="true"
                :filter="true"
                v-model="form.AnimalBreedID1"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6" v-if="form.AnimalBreedID1">
              <label class="block text-600 text-sm font-bold mb-2"
                >สัดส่วนสายพันธุ์ที่ 1 (%)
              </label>
              <InputText
                type="number"
                class="w-full"
                v-model="form.AnimalBreedPercent1"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6" v-if="form.AnimalBreedID2">
              <label class="block text-600 text-sm font-bold mb-2"
                >สายพันธุ์ที่ 2</label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                optionLabel="Fullname"
                optionValue="AnimalBreedID"
                :options="AnimalBreed"
                placeholder="เลือกสายพันธุ์ที่"
                :showClear="true"
                :filter="true"
                v-model="form.AnimalBreedID2"
                disabled
              />
            </div>
            <div class="field col-12 sm:col-6" v-if="form.AnimalBreedID2">
              <label class="block text-600 text-sm font-bold mb-2"
                >สัดส่วนสายพันธุ์ที่ 2 (%)</label
              >
              <InputText
                type="number"
                class="w-full"
                v-model="form.AnimalBreedPercent2"
                disabled
              />
            </div>
            <div
              class="field col-12 sm:col-6"
              v-if="form.AnimalBreedID3 || checkAnimal > 2"
            >
              <label class="block text-600 text-sm font-bold mb-2"
                >สายพันธุ์ที่ 3</label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                optionLabel="Fullname"
                optionValue="AnimalBreedID"
                :options="AnimalBreed"
                placeholder="เลือกสายพันธุ์ที่"
                :showClear="true"
                :filter="true"
                v-model="form.AnimalBreedID3"
                disabled
              />
            </div>
            <div
              class="field col-12 sm:col-6"
              v-if="form.AnimalBreedID3 || checkAnimal > 2"
            >
              <label class="block text-600 text-sm font-bold mb-2"
                >สัดส่วนสายพันธุ์ที่ 3 (%)</label
              >
              <InputText
                type="number"
                class="w-full"
                v-model="form.AnimalBreedPercent3"
                disabled
              />
            </div>
            <div
              class="field col-12 sm:col-6"
              v-if="form.AnimalBreedID4 || checkAnimal > 3"
            >
              <label class="block text-600 text-sm font-bold mb-2"
                >สายพันธุ์ที่ 4</label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                optionLabel="Fullname"
                optionValue="AnimalBreedID"
                :options="AnimalBreed"
                placeholder="เลือกสายพันธุ์ที่"
                :showClear="true"
                :filter="true"
                v-model="form.AnimalBreedID4"
                disabled
              />
            </div>
            <div
              class="field col-12 sm:col-6"
              v-if="form.AnimalBreedID4 || checkAnimal > 3"
            >
              <label class="block text-600 text-sm font-bold mb-2"
                >สัดส่วนสายพันธุ์ที่ 4 (%)</label
              >
              <InputText
                type="number"
                class="w-full"
                v-model="form.AnimalBreedPercent4"
                disabled
              />
            </div>
            <div
              class="field col-12 sm:col-6"
              v-if="form.AnimalBreedID5 || checkAnimal > 4"
            >
              <label class="block text-600 text-sm font-bold mb-2"
                >สายพันธุ์ที่ 5</label
              >
              <Dropdown
                class="w-full"
                id="selectedstatus"
                optionLabel="Fullname"
                optionValue="AnimalBreedID"
                :options="AnimalBreed"
                placeholder="เลือกสายพันธุ์ที่"
                :showClear="true"
                :filter="true"
                v-model="form.AnimalBreedID5"
                disabled
              />
            </div>
            <div
              class="field col-12 sm:col-6"
              v-if="form.AnimalBreedID5 || checkAnimal > 4"
            >
              <label class="block text-600 text-sm font-bold mb-2"
                >สัดส่วนสายพันธุ์ที่ 5 (%)</label
              >
              <InputText
                type="number"
                class="w-full"
                v-model="form.AnimalBreedPercent5"
                disabled
              />
            </div>
          </div>
        </div>
      </form>
    </Dialog>
    <!-- End View Dialog -->
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
import store from "@/service/Vuex";
import { mapGetters } from "vuex";
import _ from "lodash";
import RegisteredAnimalReport from "./RegisteredAnimalReport";
import JsonExcel from "vue-json-excel3";

import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
// import locale from "dayjs/locale/th";

export default {
  components: {
    PageTitle,
    JsonExcel,
  },
  data() {
    return {
      urlOrganization: "/organization?includeAll=false",
      urlOrganizationZone: "/organization-zone",
      urlAIZone: "/ai-zone?isActive=1",
      urlFarm: "/farm?includeAll=false",
      urlAnimalSex: "/animal-sex",
      urlTumbol: "/tumbol?includeAll=false",
      urlAmphur: "/amphur?includeAll=false",
      urlProvince: "/province?includeAll=false",
      urlAnimalBreedID: "/animal-breed?includeAll=false&isActive=1",
      urlProject: "/project?includeAll=false&isActive=1",
      apiProject: "/project?includeAll=false&isActive=1",
      url: {
        Animal: "/animal",
        Farm: "/farm",
        AIZone: "/ai-zone",
        OrganizationZone: "/organization-zone",
        Province: "/province",
        Amphur: "/amphur",
        Tumbol: "/tumbol",
        OrganizationType: "/organization-type",
        Organization: "/organization",
        Project: "/project",
      },
      parents: {
        AnimalFatherEarID: null,
        AnimalMotherEarID: null,
      },

      breadcrumb: [
        { label: "หน้าหลัก", to: "/" },
        { label: "ทะเบียนสัตว์ (ผท.1)", to: "" },
      ],

      // path รูป
      path: null,

      // load
      data: [],
      json_data: [],
      Organization: [],
      OrganizationZone: [],
      Farm: [],
      AnimalSex: [],
      Tumbol: [],
      Amphur: [],
      Province: [],

      rowPerPage: 10,
      currentPage: 1,
      totalPage: 1,
      totalItems: 0,

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

      // สำหรับตัวแปรในการส่ง api
      filtered: {
        OrganizationID: "",
        OrganizationZoneID: "",
        FarmID: "",
        AnimalSexID: "",
        AnimalSource: "",
        StaffStartDate: "",
        StaffEndDate: "",
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
    this.loadDefault();
    this.load();
    dayjs.extend(buddhistEra);

    if (this.animal_id == 1) {
      this.apiProject += "&ProjectLevel=ANIMAL&AnimalTypeID=[1,2,41,42]";
    } else if (this.animal_id == 2) {
      this.apiProject += "&ProjectLevel=ANIMAL&AnimalTypeID=[3,4,43,44]";
    } else if (this.animal_id == 3) {
      this.apiProject += "&ProjectLevel=ANIMAL&AnimalTypeID=[17,18,45,46]";
    }
    axios
      .get(this.apiProject, { signal: this.controller.signal })
      .then((response) => {
        this.project = response.data.rows;
      });

    this.form.isActive = this.status[0];

    this.load_selection();
    this.permit = this.permission.filter((item) => {
      return item.MenuID == 3;
    });
  },
  watch: {
    // ค้นหา
    // "search.OrganizationID"(val) {
    //   if (val) {
    //     this.params.OrganizationID = val;
    //   } else {
    //     this.params.OrganizationID = null;
    //   }
    //   if (this.isLoading == false) {
    //     this.isLoading = true;
    //     setTimeout(() => {
    //       this.load();
    //       this.isLoading = false;
    //     }, 1000);
    //   }
    // },
    // ค้นหา
    // "search.OrganizationZoneID"(val) {
    //   if (val) {
    //     this.params.OrganizationZoneID = val;
    //   } else {
    //     this.params.OrganizationZoneID = null;
    //   }
    //   if (this.isLoading == false) {
    //     this.isLoading = true;
    //     setTimeout(() => {
    //       this.load();
    //       this.isLoading = false;
    //     }, 1000);
    //   }
    // },
    "parents.AnimalFatherEarID"() {
      this.fetchParents();
    },
    "parents.AnimalMotherEarID"() {
      this.fetchParents();
    },

    "params.AnimalFatherID"() {
      this.fetchAnimal();
    },
    "params.AnimalMotherID"() {
      this.fetchAnimal();
    },
    "search.AIZone"(val) {
      if (val) {
        this.params.AIZone = val;
      } else {
        this.params.AIZone = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.Project"(val) {
      if (val) {
        this.params.ProjectID = val;
      } else {
        this.params.ProjectID = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    // ค้นหา
    // "search.FarmID"(val) {
    //   if (val) {
    //     this.params.FarmID = val;
    //   } else {
    //     this.params.FarmID = null;
    //   }
    //   if (this.isLoading == false) {
    //     this.isLoading = true;
    //     setTimeout(() => {
    //       this.load();
    //       this.isLoading = false;
    //     }, 1000);
    //   }
    // },

    "params.AnimalIdentificationID": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalEarID": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalNationalID": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalMicrochip": _.debounce(function () {
      this.load();
    }, 500),
    "params.FarmName": _.debounce(function () {
      this.load();
    }, 500),
    "params.FarmerName": _.debounce(function () {
      this.load();
    }, 500),
    "params.Status": _.debounce(function () {
      this.load();
    }, 500),

    // ค้นหา
    "search.AnimalSexID"(val) {
      if (val) {
        this.params.AnimalSexID = val;
      } else {
        this.params.AnimalSexID = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.Status"(val) {
      if (val) {
        this.params.isActive = val;
      } else {
        this.params.isActive = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    // ค้นหา
    "search.AnimalSource"(val) {
      if (val) {
        this.params.AnimalSource = val.id;
      } else {
        this.params.AnimalSource = null;
      }
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },

    "params.AnimalName": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalAgeStart": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalAgeTo": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID1": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID2": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID3": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID4": _.debounce(function () {
      this.load();
    }, 500),
    "params.AnimalBreedID5": _.debounce(function () {
      this.load();
    }, 500),

    // ค้นหา
    "search.StaffTumbolID"(val) {
      this.filtered.StaffTumbolID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    //
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
          this.fetchFarm();
          this.fetchAnimal();
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
          this.fetchFarm();
          this.fetchAnimal();
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
      this.fetchFarm();
      this.fetchAnimal();
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
      this.fetchFarm();
      this.fetchAnimal();
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
      this.fetchFarm();
      this.fetchAnimal();

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
      this.fetchFarm();
      this.fetchAnimal();

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
      this.fetchAnimal();
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.ProjectIDArray"() {
      this.fetchFarm();
      this.fetchAnimal();
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.FarmAnimalType"() {
      this.fetchFarm();
      this.fetchAnimal();

      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
  },
  methods: {
    getItems(id, earid) {
      const items = [
        {
          label: "บันทึกกิจกรรม",
          icon: "pi pi-eye",
          command: async () => {
            let data = {
              AnimalEarID: earid,
            };
            store.dispatch("animalInfo", data);
            this.$router.push("/activity/creature_info_detail");
          },
        },
        {
          label: "พิมพ์ประวัติ",
          icon: "pi pi-eye",
          command: async () => {
            await RegisteredAnimalReport(id);
          },
        },
        {
          label: "ลบ",
          icon: "pi pi-trash",
          command: () => {
            this.open_delete(id);
          },
        },
      ];
      return items;
    },
    // clear() {
    //   this.form = {
    //     isActive: this.status[0],
    //   };
    //   this.valid = false;
    // },
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
    loadDefault() {
      this.isLoading = true;
      this.fetchAIZone();
      this.fetchAnialBreed();
      this.fetchOrganizationZone();
      this.fetchProject();
      this.fetchProvince();
      this.fetchAmphur();
      this.fetchTumbol();
      this.fetchOrganizationType();
      this.fetchOrganization();
      this.fetchFarm();
      this.fetchAnimal();
    },
    async load(event) {
      this.isLoading = true;
      this.fetchAnimal();
      // สำหรับเปลี่ยนหน้า
      if (event) {
        this.currentPage = event.page + 1;
        this.params.page = event.page + 1;
      }

      this.fetchAnimal();
    },

    fetchAIZone() {
      let params = { includeAll: false };
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
      let params = { includeAll: false, isActive: 1 };
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
      let params = { includeAll: false };

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
      let params = { includeAll: false };

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

      let params = { includeAll: false };

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

      let params = { includeAll: false };

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
      let params = { includeAll: false };

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

      let params = { includeAll: false };

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
      this.isLoading = true;
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
          this.dropdown.Farms = res.data.rows
            .sort((a, b) =>
              a.Province.ProvinceName.localeCompare(b.Province.ProvinceName)
            )
            .map((item) => {
              let name = item.Farmer ? item.Farmer.FullName : "- ";
              let number = item.FarmIdentificationNumber
                ? item.FarmIdentificationNumber
                : "- ";
              let province = item.Province ? item.Province.ProvinceName : "- ";
              let Organization = item.OrganizationZone
                ? item.OrganizationZone.OrganizationZoneName
                : "- ";

              return {
                FarmID: item.FarmID,
                FarmName: item.FarmName,
                FarmIdentificationNumber: item.FarmIdentificationNumber,
                Fullname:
                  "ฟาร์ม " +
                  item.FarmName +
                  " (" +
                  number +
                  ")" +
                  " | เจ้าของฟาร์ม " +
                  name +
                  " | จังหวัด " +
                  province +
                  " | " +
                  Organization,
                OrganizationZoneName: Organization,
              };
            });
          //   this.data = res.data.rows
          //     .sort((a, b) =>
          //       a.Province.ProvinceName.localeCompare(b.Province.ProvinceName)
          //     )
          //     .map((item) => {
          //       item.FarmRegisterDate = dayjs(item.FarmRegisterDate)
          //         .locale(locale)
          //         .format("DD/MM/YYYY");
          //       return item;
          //     });
          //   this.totalPage = res.data.totalPage;
          //   this.totalItems = res.data.totalData;
          //   this.total = res.data.total;
        })
        .finally(() => {
          this.isLoading = false;
        });

      //   axios
      //     .get(this.url.Farm, {
      //       signal: this.controller.signal,
      //       params: {
      //         ...params,
      //         size: 10000000,
      //         page: 1,
      //         includeAll: true,
      //       },
      //     })
      //     .then((response) => {
      //       this.json_data = response.data.rows.map((e) => {
      //         return {
      //           หมายเลขฟาร์ม: e.FarmIdentificationNumber,
      //           ชื่อฟาร์ม: e.FarmName,
      //           ชื่อนามสกุลเกษตรกร: e.Farmer ? e.Farmer.FullName : "-",
      //           จังหวัด: e.Province.ProvinceName,
      //           อำเภอ: e.Amphur.AmphurName,
      //           ตำบล: e.Tumbol.TumbolName,
      //           หน่วยงาน: e.Organization ? e.Organization.OrganizationName : "-",
      //           วันที่ขึ้นทะเบียน: e.FarmRegisterDate
      //             ? dayjs(e.FarmRegisterDate).locale(locale).format("DD/MM/YYYY")
      //             : "",
      //         };
      //       });
      //     })
      //     .finally(() => {
      //       this.isLoading = false;
      //     });
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
        params["FarmID"] = this.search.FarmID;
      }

      //   if (this.filtered.AnimalSource) {
      //     this.params.AnimalSource = this.filtered.AnimalSource;
      //   }

      if (this.search.ProjectIDArray) {
        params["ProjectID"] = JSON.stringify(this.search.ProjectIDArray);
      }

      //   this.params.ProjectID = JSON.stringify(this.params.ProjectID);

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

      // Excel
      axios
        .get(this.url.Animal, {
          params: {
            ...params,
            size: 100000,
            noEventLatest: true,
            includeEventLatest: false,
          },
          signal: this.controller.signal,
        })
        .then((response) => {
          this.json_data = response.data.rows.map((x) => {
            let e = {
            //   EarID: "'" + x.AnimalEarID,
              EarID: x.AnimalEarID,
              Name: x.AnimalName,
            //   Age: "'" + x.AnimalAge,
              Age: x.AnimalAge+" ",
              Status: x.AnimalStatus.AnimalStatusName,
              BreedAll: x.AnimalBreedAll,
              ThaiBirthDate: x.ThaiAnimalBirthDate,
              Gender: x.AnimalSex.AnimalSexName,
              FarmIdentificationNumber: x.AnimalFarm.FarmIdentificationNumber,
              FarmName: x.AnimalFarm.FarmName,
              Organization: x.Organization
                ? x.Organization.OrganizationName
                : "-",
            };
            return e;
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    fetchAnialBreed() {
      axios
        .get(this.urlAnimalBreedID, { signal: this.controller.signal })
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

    fetchParents() {
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
          });
      } else {
        this.params.AnimalFatherID = null;
      }

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
          });
      } else {
        this.params.AnimalMotherID = null;
      }
    },

    setParam() {
      if (this.filtered.OrganizationZoneID) {
        this.params.OrganizationZoneID = this.filtered.OrganizationZoneID;
      }
      if (this.filtered.FarmID) {
        this.params.FarmID = this.filtered.FarmID;
      }
      if (this.filtered.AnimalSource) {
        this.params.AnimalSource = this.filtered.AnimalSource;
      }

      if (this.animal_id == 1) {
        this.params.AnimalTypeID = "[1,2,41,42]";
      } else if (this.animal_id == 2) {
        this.params.AnimalTypeID = "[3,4,43,44]";
      } else if (this.animal_id == 3) {
        this.params.AnimalTypeID = "[17,18,45,46]";
      }
    },
    load_selection() {
      const getOrganization = axios.get(this.urlOrganization, {
        signal: this.controller.signal,
      });
      const getOrganizationZone = axios.get(this.urlOrganizationZone, {
        signal: this.controller.signal,
      });
      const getAIZone = axios.get(this.urlAIZone, {
        signal: this.controller.signal,
      });
      const getProject = axios.get(this.urlProject, {
        signal: this.controller.signal,
      });
      const getFarm = axios.get(this.urlFarm, {
        signal: this.controller.signal,
      });

      const getAnimalSex = axios.get(this.urlAnimalSex, {
        signal: this.controller.signal,
      });
      const getTumbol = axios.get(this.urlTumbol, {
        signal: this.controller.signal,
      });
      const getAmphur = axios.get(this.urlAmphur, {
        signal: this.controller.signal,
      });
      const getProvince = axios.get(this.urlProvince, {
        signal: this.controller.signal,
      });

      Promise.all([
        getOrganization,
        getOrganizationZone,
        getFarm,
        getAnimalSex,
        getTumbol,
        getAmphur,
        getProvince,
        getAIZone,
        getProject,
      ])
        .then((values) => {
          this.Organization = values[0].data.rows;

          for (let i = 0; i < this.Organization.length; i++) {
            this.Organization[i].show_id = i + 1;
            this.Organization[i].OrganizationFull =
              this.Organization[i].OrganizationCode +
              ", " +
              this.Organization[i].OrganizationName;
          }

          this.OrganizationZone = values[1].data.rows;

          for (let i = 0; i < this.OrganizationZone.length; i++) {
            this.OrganizationZone[i].show_id = i + 1;
            this.OrganizationZone[i].OrganizationZoneFull =
              this.OrganizationZone[i].OrganizationZoneName;
          }

          this.Farm = values[2].data.rows;
          for (let i = 0; i < this.Farm.length; i++) {
            this.Farm[i].show_id = i + 1;
            this.Farm[i].FarmFull =
              this.Farm[i].FarmIdentificationNumber +
              ", " +
              this.Farm[i].FarmName;
          }
          this.AnimalSex = values[3].data.rows;

          this.Tumbol = values[4].data.rows.map((item) => {
            return {
              TumbolID: item.TumbolID,
              AmphurID: item.AmphurID,
              TumbolCode: item.TumbolCode,
              ProvinceID: item.ProvinceID,
              TumbolName: item.TumbolName,
              Fullname:
                item.TumbolCode.substring(0, 6) + ", " + item.TumbolName,
            };
          });
          this.TempTumbol = this.Tumbol;

          this.Amphur = values[5].data.rows.map((item) => {
            return {
              AmphurID: item.AmphurID,
              ProvinceID: item.ProvinceID,
              AmphurCode: item.AmphurCode,
              AmphurName: item.AmphurName,
              Fullname:
                item.AmphurCode.substring(0, 4) + ", " + item.AmphurName,
            };
          });
          this.TempAmphur = this.Amphur;

          this.Province = values[6].data.rows;

          this.AIZone = values[7].data.rows;
          this.Projects = values[8].data.rows;
        })
        .finally(() => (this.loader = true));
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
      this.curpage = $event.page + 1;
      this.load();
    },
    remove() {
      axios.delete(this.url.Animal + "/" + this.form.id).then(() => {
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

// if (this.filtered.OrganizationID) {
//   url += "&OrganizationID=" + this.filtered.OrganizationID;
// }
// if (this.filtered.OrganizationZoneID) {
//   url += "&OrganizationZoneID=" + this.filtered.OrganizationZoneID;
// }
// if (this.filtered.FarmID) {
//   url += "&FarmID=" + this.filtered.FarmID;
// }
// if (this.filtered.AnimalIdentificationID) {
//   url +=
//     "&AnimalIdentificationID=" + this.filtered.AnimalIdentificationID;
// }
// if (this.filtered.AnimalEarID) {
//   url += "&AnimalEarID=" + this.filtered.AnimalEarID;
// }
// if (this.filtered.AnimalName) {
//   url += "&AnimalName=" + this.filtered.AnimalName;
// }
// if (this.filtered.AnimalNationalID) {
//   url += "&AnimalNationalID=" + this.filtered.AnimalNationalID;
// }
// if (this.filtered.AnimalMicrochip) {
//   url += "&AnimalMicrochip=" + this.filtered.AnimalMicrochip;
// }
// if (this.filtered.AnimalSexID) {
//   url += "&AnimalSexID=" + this.filtered.AnimalSexID;
// }
// if (this.filtered.AnimalSource) {
//   url += "&AnimalSource=" + this.filtered.AnimalSource;
// }

// if (this.filtered.StaffStartDate) {
//   url += "&StaffStartDate=" + this.filtered.StaffStartDate;
// }
// if (this.filtered.StaffEndDate) {
//   url += "&StaffEndDate=" + this.filtered.StaffEndDate;
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
