<template>
  <div class="grid">
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
              :options="selection.Projects"
              optionLabel="ProjectName"
              optionValue="ProjectID"
              :filter="true"
              v-model="filtered.ProjectID"
              :virtualScrollerOptions="{ itemSize: 38 }"
            />
          </div>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12">
        <router-link :to="'/project/detail?projects=' + filtered.ProjectID">
          <Button severity="primary" label="ทะเบียนฟาร์ม" />
        </router-link>
        <router-link
          :to="'/project/detail-animal?projects=' + filtered.ProjectID"
        >
          <Button severity="secondary" label="ทะเบียนสัตว์" class="ml-2" />
        </router-link>
        <router-link
          :to="'/project/detail-diary?projects=' + filtered.ProjectID"
        >
          <Button severity="secondary" label="กิจกรรมแจ้งเตือน" class="ml-2" />
        </router-link>
      </div>

      <div class="card mb-5">
        <div v-if="!loader" class="grid">
          <div class="col-12">
            <h1 class="text-xl mb-4 text-500">เครื่องมือช่วยค้นหา</h1>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label
              for="codeNumber"
              class="block text-600 text-sm font-bold mb-2"
            >
              หมายเลขทะเบียนฟาร์ม</label>
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <InputText
                type="number"
                class="w-full"
                v-model="search.FarmIdentificationNumber"
              />
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
            <label for="farmName" class="block text-600 text-sm font-bold mb-2">
              ชื่อฟาร์ม</label
            >
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <InputText type="text" class="w-full" v-model="search.FarmName" />
            </span>
          </div>
          <div class="col-12 sm:col-6 lg:col-4">
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
          </div>

          <Accordion class="col-12 sm:col-12 lg:col-12">
            <AccordionTab header="ค้นหาขั้นสูง">
              <div class="grid">
                <div class="col-12 sm:col-6 lg:col-4">
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
                    :options="selection.AIZone.data"
                    optionLabel="AIZoneName"
                    optionValue="AIZoneID"
                    v-model="search.AIZone"
                    @change="filterProvince($event)"
                  />
                </div>
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="selectedScheme"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    เขตพื้นที่ปศุสัตว์</label
                  >
                  <Dropdown
                    :showClear="true"
                    emptyMessage="ไม่มีข้อมูล"
                    emptyFilterMessage="ไม่พบข้อมูล"
                    class="w-full"
                    placeholder="ทั้งหมด"
                    :options="selection.OrganizationZone.data"
                    optionLabel="OrganizationZoneName"
                    optionValue="OrganizationZoneID"
                    v-model="search.OrganizationZone"
                    @change="filterProvince($event)"
                  />
                </div>
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="searchProvince"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    จังหวัด</label
                  >
                  <Dropdown
                    :showClear="true"
                    class="w-full"
                    id="selectedFarm"
                    placeholder="ทั้งหมด"
                    :options="selection.Province.data"
                    optionLabel="ProvinceName"
                    optionValue="ProvinceID"
                    :filter="true"
                    v-model="search.FarmProvinceID"
                    :virtualScrollerOptions="{ itemSize: 38 }"
                    @change="filterAmphur($event)"
                  />
                </div>
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="searchDistrict"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    อำเภอ</label
                  >
                  <Dropdown
                    :showClear="true"
                    class="w-full"
                    id="selectedFarm"
                    placeholder="ทั้งหมด"
                    :options="selection.Amphur.data"
                    optionLabel="AmphurName"
                    optionValue="AmphurID"
                    :filter="true"
                    v-model="search.FarmAmphurID"
                    :virtualScrollerOptions="{ itemSize: 38 }"
                    @change="filterTumbol($event)"
                  />
                </div>
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="searchSubDistrict"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    ตำบล</label
                  >
                  <Dropdown
                    :showClear="true"
                    class="w-full"
                    id="selectedFarm"
                    placeholder="ทั้งหมด"
                    :options="selection.Tumbol.data"
                    optionLabel="TumbolName"
                    optionValue="TumbolID"
                    :filter="true"
                    v-model="search.FarmTumbolID"
                    :virtualScrollerOptions="{ itemSize: 38 }"
                  />
                </div>
                <div class="col-12 sm:col-6 lg:col-4">
                  <label
                    for="dateRange"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    ช่วงวันที่ขึ้นทะเบียนฟาร์ม</label
                  >
                  <Datepicker
                    v-model="search.dateRange"
                    range
                    id="dateRange"
                    locale="th"
                    :format="format"
                    utc
                    :enableTimePicker="false"
                    cancelText="ยกเลิก"
                    selectText="ยืนยัน"
                    placeholder="ตั้งแต่วันที่ - จนถึงวันที่"
                  >
                    <template #year-overlay-value="{ text }">
                      {{ parseInt(text) + 543 }}
                    </template>
                    <template #year="{ year }">
                      {{ year + 543 }}
                    </template>
                  </Datepicker>
                </div>
                <div class="col-12 sm:col-6 lg:col-8">
                  <label
                    for="selectedScheme"
                    class="block text-600 text-sm font-bold mb-2"
                  >
                    หน่วยงาน
                  </label>
                  <Dropdown
                    :showClear="true"
                    emptyMessage="ไม่มีข้อมูล"
                    emptyFilterMessage="ไม่พบข้อมูล"
                    class="w-full"
                    placeholder="ทั้งหมด"
                    :options="selection.Organization.data"
                    optionLabel="OrganizationName"
                    optionValue="OrganizationID"
                    v-model="search.Organization"
                    :filter="true"
                    :virtualScrollerOptions="{ itemSize: 38 }"
                  />
                </div>
                <div class="col-12 sm:col-6 lg:col-4">
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
                </div>
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
          <div class="col-12">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem"></Skeleton>
          </div>
          <div class="col-12">
            <Skeleton height="2rem" class="mb-2"></Skeleton>
          </div>
        </div>
      </div>

      <div class="card">
        <div>
          <div class="grid flex align-items-center mb-5">
            <div class="col-12 md:col-6">
              <h1 class="text-2xl mb-0 text-600">รายการฟาร์ม</h1>
            </div>
            <div class="col-12 md:col-6 md:text-right">
              <!-- <Button
                @click="add"
                label="เพิ่มทะเบียนฟาร์ม"
                icon="pi pi-plus"
                class="md:w-auto mr-2 mb-3"
              />
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
              </json-excel> -->
              <!-- 
                <Button
                  label="ดาวน์โหลด"
                  icon="pi pi-download"
                  class="p-button-raised p-button-raised p-button-success"
                  @click="exportCSV($event)"
                /> -->
            </div>
          </div>
          <div class="mt-3">
            <!-- 
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" -->

            <!-- <table class="styled-table" style="width: 100%">
                <thead>
                  <tr>
                    <th>หมายเลขฟาร์ม</th>
                    <th>ชื่อฟาร์ม</th>
                    <th>ชื่อ-นามสกุล</th>
                    <th>จังหวัด</th>
                    <th>อำเภอ</th>
                    <th>ตำบล</th>
                    <th>หน่วยงาน</th>
                    <th>วันที่ขึ้นทะเบียน</th>
                    <th>สถานะ</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(d, index) in data"
                    :key="index"
                    :class="index % 2 == 0 ? 'active-row' : ''"
                  >
                    <td>
                      <div class="cursor-pointer" @click="openDetail(d.FarmID)">
                        <span class="text-blue-400">
                          <u>{{ d.FarmIdentificationNumber }}</u>
                        </span>
                      </div>
                    </td>
                    <td>{{ d.FarmName }}</td>
                    <td>{{ d.Farmer.FullName }}</td>
                    <td>{{ d.Province.ProvinceName }}</td>
                    <td>{{ d.Amphur.AmphurName }}</td>
                    <td>{{ d.Tumbol.TumbolName }}</td>
                    <td>{{ d.Organization.OrganizationName }}</td>
                    <td>{{ d.FarmRegisterDate }}</td>
                    <td>
                      <div v-if="d.FarmStatusID == [1]">
                        <Tag class="w-full" severity="success">ดำเนินกิจการ</Tag>
                      </div>
  
                      <div v-else-if="d.FarmStatusID == [2]">
                        <Tag class="w-full bg-gray-500">พักกิจการ</Tag>
                      </div>
  
                      <div v-else>
                        <Tag class="w-full bg-gray-500">ยกเลิกกิจการ</Tag>
                      </div>
                    </td>
                    <td>
                      <SplitButton
                        label="แก้ไข"
                        icon="pi pi-pencil"
                        @click="edit(d.FarmID)"
                        class="p-button-sm p-button-outlined p-button-warning"
                        :model="getItems(d.FarmID)"
                      >
                      </SplitButton>
                    </td>
                  </tr>
                </tbody>
              </table> -->

            <!-- <div class="pagination">
                <span class="text-sm text-disabled mr-5">
                  Showing {{ this.currentPage }} to {{ this.rowPerPage }} of
                  {{ this.totalItems }} entries
                </span>
                <vue-awesome-paginate
                  :total-items="this.totalItems"
                  :items-per-page="this.rowPerPage"
                  :max-pages-shown="5"
                  v-model="this.currentPage"
                  :on-click="load"
                />
              </div> -->
            <!-- 
              :paginator="true"
                v-model:rows="rowPerPage"
                stripedRows
                :totalRecords="this.total"
                :value="data"
                :scrollable="true"
                :loading="isLoading"
                :exportable="true"
                ref="dt"
                :rowHover="true"
                scrollDirection="both"
                :rowsPerPageOptions="[10, 20, 50]"
                responsiveLayout="scroll"
                currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
                @sort="sort($event)"
                @page="load" -->

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
              :totalRecords="total"
              @page="load"
              @sort="sort($event)"
              lazy
            >
              <Column
                field="FarmIdentificationNumber"
                header="หมายเลขฟาร์ม"
                :sortable="true"
                style="width: 200px"
                exportFooter="&#8203;"
              >
                <template #body="slotProps">
                  <div
                    class="cursor-pointer text-center"
                    @click="openDetail(slotProps.data.FarmID)"
                  >
                    <span class="text-blue-400">
                      <u>{{ slotProps.data.FarmIdentificationNumber }}</u>
                    </span>
                  </div>
                </template>
              </Column>
              <Column
                v-for="col of columns"
                :field="col.field"
                :header="col.header"
                :key="col.field"
                :sortable="true"
                style="width: 150px"
                class="text-center"
                exportFooter="&#8203;"
              >
              </Column>
              <Column header="จัดการ" style="width: 200px" class="text-center">
                <template #body="slotProps">
                  <!-- <SplitButton
                    label="ดูข้อมูล"
                    @click="edit(slotProps.data.FarmID)"
                    class="p-button-sm p-button-outlined p-button-warning"
                    :model="getItems(slotProps.data.FarmID)"
                  >
                  </SplitButton> -->
                  <Button
                    label="ดูข้อมูล"
                    @click="edit(slotProps.data.FarmID)"
                    class="p-button-sm p-button-outlined p-button-warning"
                    :model="getItems(slotProps.data.FarmID)"
                  ></Button>
                </template>
              </Column>
              <template #empty> ไม่พบข้อมูล </template>
              <template #loading>
                <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
              </template>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
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
    <!-- Start Detail Dialog -->
    <Dialog
      header="รายละเอียด"
      v-model:visible="displayDetail"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '70vw' }"
      :modal="true"
    >
      <h4 class="text-2xl mb-4 font-light">ข้อมูลฟาร์ม</h4>
      <div class="grid">
        <div class="col-12">
          <div class="grid">
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">พื้นที่เขตปศุสัตว์</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.OrganizationZone &&
                  detailInfo.OrganizationZone.OrganizationZoneName
                    ? detailInfo.OrganizationZone.OrganizationZoneName
                    : "-"
                }}
              </span>
            </div>
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">จังหวัด</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.Province && detailInfo.Province.ProvinceName
                    ? detailInfo.Province.ProvinceName
                    : "-"
                }}
              </span>
            </div>
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">อำเภอ</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.Amphur && detailInfo.Amphur.AmphurName
                    ? detailInfo.Amphur.AmphurName
                    : "-"
                }}
              </span>
            </div>
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">ตำบล</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.Tumbol && detailInfo.Tumbol.TumbolName
                    ? detailInfo.Tumbol.TumbolName
                    : "-"
                }}
              </span>
            </div>
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">รหัสไปรษณีย์</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.Tumbol && detailInfo.Tumbol.Zipcode
                    ? detailInfo.Tumbol.Zipcode
                    : "-"
                }}
              </span>
            </div>
            <div class="col-12">
              <span class="font-medium text-700">ศูนย์วิจัย</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.AIZone && detailInfo.AIZone.AIZoneName
                    ? detailInfo.AIZone.AIZoneName
                    : "-"
                }}
              </span>
            </div>
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">หน่วยงาน</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.Organization &&
                  detailInfo.Organization.OrganizationName
                    ? detailInfo.Organization.OrganizationName
                    : "-"
                }}
              </span>
            </div>
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">ประเภทหน่วยงาน</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.Organization &&
                  detailInfo.Organization.OrganizationTypeID
                    ? detailOrganization(
                        detailInfo.Organization.OrganizationTypeID
                      )
                    : "-"
                }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="grid">
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">เลขทะเบียนฟาร์ม</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.FarmIdentificationNumber
                    ? detailInfo.FarmIdentificationNumber
                    : "-"
                }}
              </span>
            </div>
            <div class="col-6 lg:col-8">
              <span class="font-medium text-700">ชื่อฟาร์ม</span>
              <span class="font-semibold ml-2">
                {{ detailInfo.FarmName ? detailInfo.FarmName : "-" }}
              </span>
            </div>
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">วันที่ขึ้นทะเบียนฟาร์ม</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.ThaiFarmRegisterDate
                    ? detailInfo.ThaiFarmRegisterDate
                    : "-"
                }}
              </span>
            </div>
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">ประเภทฟาร์ม</span>
              <span class="font-semibold ml-2">
                {{ detailInfo.FarmType ? detailInfo.FarmType : "-" }}
              </span>
            </div>
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">สถานะฟาร์ม</span>
              <div class="ml-2 inline-block">
                <div v-if="detailInfo.FarmStatus.FarmStatusID === 1">
                  <Tag severity="success">{{
                    detailInfo.FarmStatus.FarmStatusName
                  }}</Tag>
                </div>
                <div v-else-if="detailInfo.FarmStatus.FarmStatusID === 3">
                  <Tag class="bg-gray-500">{{
                    detailInfo.FarmStatus.FarmStatusName
                  }}</Tag>
                </div>
                <div v-else>
                  <Tag class="bg-gray-500">{{
                    detailInfo.FarmStatus.FarmStatusName
                  }}</Tag>
                </div>
              </div>
            </div>
            <div class="col-12">
              <span class="font-medium text-700">ที่อยู่</span>
              <span class="font-semibold ml-2">
                {{ detailInfo.FarmAddress ? detailInfo.FarmAddress : "-" }}
              </span>
            </div>
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">หมู่</span>
              <span class="font-semibold ml-2">
                {{ detailInfo.FarmMoo ? detailInfo.FarmMoo : "-" }}
              </span>
            </div>
            <div class="col-6 lg:col-8">
              <span class="font-medium text-700">ถนน</span>
              <span class="font-semibold ml-2">
                {{ detailInfo.FarmStreet ? detailInfo.FarmStreet : "-" }}
              </span>
            </div>
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">ละติจูด</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.ResidenceLatitude
                    ? detailInfo.ResidenceLatitude
                    : "-"
                }}
              </span>
            </div>
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">ลองจิจูด</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.ResidenceLongitude
                    ? detailInfo.ResidenceLongitude
                    : "-"
                }}
              </span>
            </div>
            <div class="col-6 lg:col-4">
              <span class="font-medium text-700">ลิงก์จาก Google Map</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.FarmLinkGoogleMap
                    ? detailInfo.FarmLinkGoogleMap
                    : "-"
                }}
              </span>
            </div>
            <div class="col-12">
              <span class="font-medium text-700">โครงการ</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.Projects === "undefined" &&
                  detailInfo.Projects.length === 0
                    ? formatArray(detailInfo.Projects)
                    : "-"
                }}
              </span>
            </div>
            <div class="col-12 lg:col-4">
              <span class="font-medium text-700">เบอร์โทรศัพท์</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.FarmTelephoneNumber
                    ? detailInfo.FarmTelephoneNumber
                    : "-"
                }}
              </span>
            </div>
            <div class="col-12 lg:col-4">
              <span class="font-medium text-700">เบอร์โทรศัพท์มือถือ</span>
              <span class="font-semibold ml-2">
                {{
                  detailInfo.FarmMobilePhoneNumber
                    ? detailInfo.FarmMobilePhoneNumber
                    : "-"
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <h4 class="text-2xl mt-4 mb-4 font-light">ข้อมูลเกษตรกร</h4>

      <h5 class="text-xl mb-4 font-light">ข้อมูลบุคคล</h5>
      <div class="grid">
        <div class="col-6 lg:col-4">
          <span class="font-medium text-700">เลขทะเบียนเกษตรกร</span>
          <span class="font-semibold ml-2">
            {{
              detailInfo.Farmer && detailInfo.Farmer.FarmerNumber
                ? detailInfo.Farmer.FarmerNumber
                : "-"
            }}
          </span>
        </div>
        <div class="col-12 lg:col-8">
          <span class="font-medium text-700">เลขบัตรประจำตัวประชาชน</span>
          <span class="font-semibold ml-2">
            {{
              detailInfo.Farmer && detailInfo.Farmer.IdentificationNumber
                ? detailInfo.Farmer.IdentificationNumber
                : "-"
            }}
          </span>
        </div>
        <div class="col-6 lg:col-4">
          <span class="font-medium text-700">คำนำหน้า</span>
          <span class="font-semibold ml-2">
            {{
              detailInfo.Farmer && detailInfo.Farmer.TitleID
                ? detailTitle(detailInfo.Farmer.TitleID)
                : "-"
            }}
          </span>
        </div>
        <div class="col-6 lg:col-4">
          <span class="font-medium text-700">ชื่อ - นามสกุล</span>
          <span class="font-semibold ml-2">
            {{
              detailInfo.Farmer && detailInfo.Farmer.FullName
                ? detailInfo.Farmer.FullName
                : "-"
            }}
          </span>
        </div>
        <div class="col-6 lg:col-4">
          <span class="font-medium text-700">เพศ</span>
          <span class="font-semibold ml-2">
            {{
              detailInfo.Farmer && detailInfo.Farmer.GenderID
                ? detailGender(detailInfo.Farmer.GenderID)
                : "-"
            }}
          </span>
        </div>
        <div class="col-6 lg:col-12">
          <span class="font-medium text-700">วันเดือนปีเกิด</span>
          <span class="font-semibold ml-2">
            {{
              detailInfo.Farmer && detailInfo.Farmer.BirthDate
                ? detailFormatBirthDate(detailInfo.Farmer.BirthDate)
                : "-"
            }}
          </span>
        </div>
        <div class="col-6 lg:col-4">
          <span class="font-medium text-700">หมายเลขโทรศัพท์</span>
          <span class="font-semibold ml-2">
            {{
              detailInfo.Farmer && detailInfo.Farmer.TelephoneNumber
                ? detailInfo.Farmer.TelephoneNumber
                : "-"
            }}
          </span>
        </div>
        <div class="col-6 lg:col-8">
          <span class="font-medium text-700">หมายเลขโทรศัพท์มือถือ</span>
          <span class="font-semibold ml-2">
            {{
              detailInfo.Farmer && detailInfo.Farmer.MobilePhoneNumber
                ? detailInfo.Farmer.MobilePhoneNumber
                : "-"
            }}
          </span>
        </div>
        <div class="col-12 lg:col-4">
          <span class="font-medium text-700">อีเมล</span>
          <span class="font-semibold ml-2">
            {{
              detailInfo.Farmer && detailInfo.Farmer.Email
                ? detailInfo.Farmer.Email
                : "-"
            }}
          </span>
        </div>
        <div class="col-12 lg:col-8">
          <span class="font-medium text-700">ไอดีไลน์</span>
          <span class="font-semibold ml-2">
            {{
              detailInfo.Farmer && detailInfo.Farmer.IDLine
                ? detailInfo.Farmer.IDLine
                : "-"
            }}
          </span>
        </div>
        <div class="col-12">
          <span class="font-medium text-700">สถานะเกษตรกร</span>
          <span class="font-semibold ml-2">
            {{
              detailInfo.Farmer && detailInfo.Farmer.FarmerRegisterStatus
                ? detailFarmerRegisterStatus(
                    detailInfo.Farmer.FarmerRegisterStatus
                  )
                : "-"
            }}
          </span>
        </div>
      </div>
      <!-- <h5 class="text-xl mt-4 mb-4 font-light">ที่อยู่เกษตรกรตามทะเบียนบ้าน</h5>
        <div class="grid">
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">เลขที่บ้าน</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseBuildingNumber
                  ? detailInfo.Farmer.HouseBuildingNumber
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">หมู่ที่</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseMoo
                  ? detailInfo.Farmer.HouseMoo
                  : "-"
              }}
            </span>
          </div>
          <div class="col-12">
            <span class="font-medium text-700">ชื่อหมู่บ้าน/อาคาร</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseVillageName
                  ? detailInfo.Farmer.HouseVillageName
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">ชั้น</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseFloor
                  ? detailInfo.Farmer.HouseFloor
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">ถนน</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseStreet
                  ? detailInfo.Farmer.HouseStreet
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">ตรอก</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseSubLane
                  ? detailInfo.Farmer.HouseSubLane
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">ซอย</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseLane
                  ? detailInfo.Farmer.HouseLane
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">จังหวัด</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseProvinceID
                  ? detailInfo.Farmer.HouseProvinceID
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">อำเภอ/เขต</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseAmphurID
                  ? detailInfo.Farmer.HouseAmphurID
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">ตำบล</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseTumbolID
                  ? detailInfo.Farmer.HouseTumbolID
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">รหัสไปรษณีย์</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseZipCode
                  ? detailInfo.Farmer.HouseZipCode
                  : "-"
              }}
            </span>
          </div>
          <div class="col-12">
            <span class="font-medium text-700">เลขรหัสประจำบ้าน</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseAddressIdentification
                  ? detailInfo.Farmer.HouseAddressIdentification
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">ละติจูด</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseLatitude
                  ? detailInfo.Farmer.HouseLatitude
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">ลองจิจูด</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.HouseLongitude
                  ? detailInfo.Farmer.HouseLongitude
                  : "-"
              }}
            </span>
          </div>
        </div>
        <hr />
        <h5 class="text-xl mt-4 mb-4 font-light">ที่อยู่เกษตรกรที่ติดต่อได้</h5>
        <div class="grid">
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">เลขที่บ้าน</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.ResidenceBuildingNumber
                  ? detailInfo.Farmer.ResidenceBuildingNumber
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">หมู่ที่</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.ResidenceMoo
                  ? detailInfo.Farmer.ResidenceMoo
                  : "-"
              }}
            </span>
          </div>
          <div class="col-12">
            <span class="font-medium text-700">ชื่อหมู่บ้าน/อาคาร</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.ResidenceVillageName
                  ? detailInfo.Farmer.ResidenceVillageName
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">ชั้น</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.ResidenceFloor
                  ? detailInfo.Farmer.ResidenceFloor
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">ถนน</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.ResidenceStreet
                  ? detailInfo.Farmer.ResidenceStreet
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">ตรอก</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.ResidenceSubLane
                  ? detailInfo.Farmer.ResidenceSubLane
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">ซอย</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.ResidenceLane
                  ? detailInfo.Farmer.ResidenceLane
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">จังหวัด</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.ResidenceProvinceID
                  ? detailInfo.Farmer.ResidenceProvinceID
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">อำเภอ/เขต</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.ResidenceAmphurID
                  ? detailInfo.Farmer.ResidenceAmphurID
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">ตำบล</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.ResidenceTumbolID
                  ? detailInfo.Farmer.ResidenceTumbolID
                  : "-"
              }}
            </span>
          </div>
          <div class="col-6 lg:col-4">
            <span class="font-medium text-700">รหัสไปรษณีย์</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.ResidenceZipCode
                  ? detailInfo.Farmer.ResidenceZipCode
                  : "-"
              }}
            </span>
          </div>
          <div class="col-12">
            <span class="font-medium text-700">เลขรหัสประจำบ้าน</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.ResidenceAddressIdentification
                  ? detailInfo.Farmer.ResidenceAddressIdentification
                  : "-"
              }}
            </span>
          </div>
          <div class="col-12">
            <span class="font-medium text-700">วันที่ขึ้นทะเบียนเกษตรกร</span>
            <span class="font-semibold ml-2">
              {{
                detailInfo.Farmer && detailInfo.Farmer.FarmerRegisterDate
                  ? detailInfo.Farmer.FarmerRegisterDate
                  : "-"
              }}
            </span>
          </div>
        </div> -->
    </Dialog>
    <!-- End Detail Dialog -->
    <Dialog
      header=""
      v-model:visible="displayView"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '70vw' }"
      :modal="true"
    >
      <ProjectDialogAnimal
        :FarmID="SendFarmID"
        :projectID="filtered.ProjectID"
      />
    </Dialog>
  </div>
</template>
<script>
import axios from "axios";
import dayjs from "dayjs";
import locale from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import PageTitle from "@/components/PageTitle.vue";
import router from "@/router";
import { mapGetters } from "vuex";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import ProjectDialogAnimal from "@/components/dialog/ProjectDialogAnimal";

// import JsonExcel from "vue-json-excel3";
// import Paginate from "vuejs-paginate";
// import Paginator from "primevue/paginator"

export default {
  components: {
    PageTitle,
    ProjectDialogAnimal,
    // Paginate,
    // JsonExcel,
  },
  data() {
    return {
      json_data: [],
      url: "/farm",
      getFarm: "/farmer/selection?includeAll=false&isActive=1",
      getOrganization: "/organization/selection?includeAll=false&isActive=1",
      getOrganizationZone: "/organization-zone/selection?includeAll=false&isActive=1",
      getOrganizationType: "/organization-type/selection?includeAll=false&isActive=1",
      getProvince: "/province/selection?includeAll=false&isActive=1",
      getAmphur: "/amphur/selection?includeAll=false&isActive=1",
      getTumbol: "/tumbol/selection?includeAll=false&isActive=1",
      getTitle: "/title?isActive=1",
      getAIZone: "/ai-zone/selection?includeAll=false&isActive=1",
      getGender: "/gender?isActive=1",
      urlFarmStatus: "/farm-status/selection?includeAll=false&isActive=1",
      urlProject: "/project/selection?includeAll=false&isActive=1",
      id: "FarmID",
      name: "ทะเบียนฟาร์ม (ผท.3)",
      SendFarmID: null,

      columns: [
        {
          field: "FarmName",
          header: "ชื่อฟาร์ม",
        },
        {
          field: "Farmer.FullName",
          header: "ชื่อ-นามสกุลเกษตรกร",
        },

        {
          field: "Province.ProvinceName",
          header: "จังหวัด",
        },
        {
          field: "Amphur.AmphurName",
          header: "อำเภอ",
        },
        {
          field: "Tumbol.TumbolName",
          header: "ตำบล",
        },

        {
          field: "Organization.OrganizationName",
          header: "หน่วยงาน",
        },

        // {
        //   field: "FarmRegisterDate",
        //   header: "วันที่ขึ้นทะเบียน",
        // },
      ],
      // Start Search
      search: {
        FarmIdentificationNumber: "",
        FarmName: "",
        FarmerFullName: "",
        dateRange: null,
      },

      filtered: {
        FarmIdentificationNumber: "",
        FarmName: "",
        FarmStatusID: null,
        ProjectID: null,
      },
      // END Search

      // Start Selection
      selection: {
        Organization: [],
        OrganizationZone: [],
        OrganizationType: [],
        AIZone: [],
        Province: [],
        Amphur: [],
        Tumbol: [],
        Projects: [],
        farmStatus: [],
        TitleName: [],
        Gender: [],
      },
      // END Search

      // Static Data
      isLoading: false,
      loader: false,
      total: null,
      data: [],
      valid: false,
      index: null,
      display: false,
      display_delete: false,
      detailInfo: {},
      displayDetail: false,
      displayView: false,
      temp: [],
      curpage: 0,
      formheader: "",
      sortField: "",
      sortOrder: "",
      items: [
        {
          label: "ดูข้อมูลฟาร์ม",
          icon: "pi pi-eye",
        },
        {
          label: "แก้ไข",
          icon: "pi pi-pencil",
        },
        {
          label: "ลบ",
          icon: "pi pi-times",
        },
      ],
      breadcrumb: [
        { label: "ติดตามโครงการ", to: "/project/detail" },
        { label: "", to: "" },
      ],
      permit: null,
      //
      rowPerPage: 20,
      currentPage: 1,
      totalPage: 1,
      totalItems: 0,
      isOverlay: true,
      orderBy: "created_at",
      order: "desc",
      //
      controller: new AbortController(),
    };
  },
  computed: {
    ...mapGetters({
      permission: "get_permission",
      user: "user",
    }),
  },
  mounted() {
    if (this.$route.query.projects) {
      if (
        this.$route.query.projects != null &&
        this.$route.query.projects != "null" &&
        this.$route.query.projects != "undefined" &&
        this.$route.query.projects != ""
      ) {
        console.log(this.$route.query.projects + "FREEDOM1");
        let pj = this.$route.query.projects.split(",");
        this.filtered.ProjectID = pj.map((e) => {
          return parseInt(e);
        });
      } else if (
        this.$route.query.projects == "null" ||
        this.$route.query.projects == ""
      ) {
        this.filtered.ProjectID = [];
      } else {
        this.filtered.ProjectID = [];
      }
    }

    this.load();
    this.load_selection();
    this.load_selectionAdvance();
    dayjs.extend(buddhistEra);
    this.breadcrumb[1].label = this.name;
    this.permit = this.permission.filter((item) => {
      return item.MenuID == 1;
    });
  },
  watch: {
    "search.FarmIdentificationNumber"(val) {
      this.filtered.FarmIdentificationNumber = val;
      this.load();
    },
    "search.FarmName"(val) {
      this.filtered.FarmName = val;
      this.load();
    },
    "search.FarmerFullName"(val) {
      this["search.FarmerFullName"] = val;
      this.load();
    },
    "search.Organization"(val) {
      this.filtered.OrganizationID = val;
      this.load();
    },
    "search.OrganizationZone"(val) {
      this.filtered.OrganizationZone = val;
      this.load();
    },
    "filtered.FarmStatusID"(val) {
      this.filtered.FarmStatusID = val;
      this.load();
    },
    "filtered.ProjectID"(val) {
      this.filtered.ProjectID = val;
      this.load();
    },
    "search.dateRange"(val) {
      this["search.dateRange"] = val;
      this.load();
    },
    "search.FarmProvinceID"(val) {
      this.filtered.FarmProvinceID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.FarmAmphurID"(val) {
      this.filtered.FarmAmphurID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.FarmTumbolID"(val) {
      this.filtered.FarmTumbolID = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
  },
  methods: {
    format(date) {
      const dayStart = date[0].getDate();
      const monthStart = date[0].getMonth();
      const yearStart = date[0].getFullYear() + 543;
      const formatStart = format(
        new Date(yearStart, monthStart, dayStart),
        // "dd MMM yyy",
        "dd/MM/yyyy",
        {
          locale: th,
        }
      );

      const dayEnd = date[1].getDate();
      const monthEnd = date[1].getMonth();
      const yearEnd = date[1].getFullYear() + 543;
      const formatEnd = format(
        new Date(yearEnd, monthEnd, dayEnd),
        // "dd MMM yyy",
        "dd/MM/yyyy",
        {
          locale: th,
        }
      );

      return `${formatStart} - ${formatEnd}`;
    },
    async edit(id) {
      // console.log(id)
      this.SendFarmID = id;
      this.displayView = true;

      //   if (this.permit[0].IsUpdate == 0) {
      //     this.$toast.add({
      //       severity: "error",
      //       summary: "ล้มเหลว",
      //       detail: "ไม่มีสิทธิ์แก้ไข",
      //       life: 5000,
      //     });
      //     return;
      //   }
      //   // let getID = this.data.find((item) => item.FarmID == id);
      //   // await router.push({
      //   //   path: `/farm/edit/${getID.FarmID}`,
      //   // });
      //   // console.log(getID);
      //   if (this.project_check(id)) {
      //     await this.$router.push("/farm/edit/" + id);
      //   }
    },
    project_check(id) {
      let prepare_data = this.data.find(function (item) {
        return item.FarmID == id;
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
    getItems(id) {
      const items = [
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
    //load selection
    load_selection() {
      this.loader = true;
      // farm
      axios
        .get(
          this.url + "?size=" + this.rowPerPage + "&page=" + this.currentPage,
          { signal: this.controller.signal }
        )
        .then((res) => (this.selection.Projects.data = res.data.rows));

      const urlProject = axios.get(this.urlProject, {
        signal: this.controller.signal,
      });

      const getTitle = axios.get(this.getTitle, {
        signal: this.controller.signal,
      });

      Promise.all([urlProject, getTitle])
        .then((values) => {
          // this.selection.Organization.data = values[0].data.rows;
          // this.selection.OrganizationZone.data = values[1].data.rows;
          // this.selection.OrganizationType.data = values[2].data.rows;
          // this.selection.Projects.data = values[3].data.rows;
          // this.selection.Province.data = values[4].data.rows;
          // this.selection.Amphur.data = values[5].data.rows;
          // this.selection.Tumbol.data = values[6].data.rows;
          // this.selection.farmStatus = values[7].data.rows;
          // ค้นหาโครงการ
          this.selection.Projects = values[0].data.rows;
          // ค้นหาชื่อ
          this.selection.TitleName.data = values[1].data.rows;
          // this.selection.Gender.data = values[10].data.rows;
        })
        .finally(() => {
          this.loader = false;
        });
    },

    //load selection
    load_selectionAdvance() {
      axios
        .get(this.getOrganization, {
          signal: this.controller.signal,
        })
        .then((res) => (this.selection.Organization.data = res.data.rows));
      axios
        .get(this.getAIZone, {
          signal: this.controller.signal,
        })
        .then((res) => (this.selection.AIZone.data = res.data.rows));
      axios
        .get(this.getOrganizationZone, {
          signal: this.controller.signal,
        })
        .then((res) => (this.selection.OrganizationZone.data = res.data.rows));

      axios
        .get(this.getOrganizationType, {
          signal: this.controller.signal,
        })
        .then((res) => (this.selection.OrganizationType.data = res.data.rows));

      axios
        .get(this.getProvince, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.selection.Province.temp = this.selection.Province.data =
            res.data.rows;
        });

      axios
        .get(this.getAmphur, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.selection.Amphur.temp = this.selection.Amphur.data =
            res.data.rows;
        });

      axios
        .get(this.getTumbol, {
          signal: this.controller.signal,
        })
        .then((res) => {
          this.selection.Tumbol.temp = this.selection.Tumbol.data =
            res.data.rows;
        });

      axios
        .get(this.urlFarmStatus, {
          signal: this.controller.signal,
        })
        .then((res) => (this.selection.farmStatus = res.data.rows));

      axios
        .get(this.getGender, {
          signal: this.controller.signal,
        })
        .then((res) => (this.selection.Gender.data = res.data.rows));

      // Promise.all()
    },
    // main load
    load(event) {
      this.isLoading = true;

      if (event) {
        this.currentPage = event.page + 1;
      }

      let url =
        this.url +
        `?isActive=1&orderByField=FarmID&orderBy=desc&size=` +
        this.rowPerPage +
        `&page=` +
        this.currentPage;

      let urlExcel =
        this.url +
        `?isActive=1&orderByField=FarmID&orderBy=desc&size=100000&page=` +
        this.currentPage;

      if (event) {
        this.curpage = event.page + 1;
      }

      if (this.filtered.FarmIdentificationNumber || this.filtered.FarmName) {
        url +=
          "&FarmIdentificationNumber=" +
          this.filtered.FarmIdentificationNumber +
          "&FarmName=" +
          this.filtered.FarmName;

        urlExcel +=
          "&FarmIdentificationNumber=" +
          this.filtered.FarmIdentificationNumber +
          "&FarmName=" +
          this.filtered.FarmName;
      }
      if (this.search.FarmerFullName) {
        url += "&FullName=" + this.search.FarmerFullName;

        urlExcel += "&FullName=" + this.search.FarmerFullName;
      }
      if (this.filtered.OrganizationID) {
        url += "&OrganizationID=" + this.filtered.OrganizationID;
        urlExcel += "&OrganizationID=" + this.filtered.OrganizationID;
      }
      if (this.filtered.OrganizationZone) {
        url += "&OrganizationZoneID=" + this.filtered.OrganizationZone;
        urlExcel += "&OrganizationZoneID=" + this.filtered.OrganizationZone;
      }
      if (this.filtered.FarmStatusID) {
        url += "&FarmStatusID=" + this.filtered.FarmStatusID;
        urlExcel += "&FarmStatusID=" + this.filtered.FarmStatusID;
      }
      if (this.filtered.FarmProvinceID) {
        url += "&FarmProvinceID=" + this.filtered.FarmProvinceID;
        urlExcel += "&FarmProvinceID=" + this.filtered.FarmProvinceID;
      }
      if (this.filtered.FarmAmphurID) {
        url += "&FarmAmphurID=" + this.filtered.FarmAmphurID;
        urlExcel += "&FarmAmphurID=" + this.filtered.FarmAmphurID;
      }
      if (this.filtered.FarmTumbolID) {
        url += "&FarmTumbolID=" + this.filtered.FarmTumbolID;
        urlExcel += "&FarmTumbolID=" + this.filtered.FarmTumbolID;
      }
      if (this.search.dateRange) {
        url += `&FarmRegisterStartDate=${this.search.dateRange[0]}&FarmRegisterEndDate=${this.search.dateRange[1]}`;
        urlExcel += `&FarmRegisterStartDate=${this.search.dateRange[0]}&FarmRegisterEndDate=${this.search.dateRange[1]}`;
      }
      if (this.filtered.ProjectID) {
        if (this.filtered.ProjectID.length === 0) {
          url += `&ProjectID=`;
          urlExcel += `&ProjectID=`;
        } else {
          url += `&ProjectID=${JSON.stringify(this.filtered.ProjectID)}`;
          urlExcel += `&ProjectID=${JSON.stringify(this.filtered.ProjectID)}`;
        }
      }

      axios
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.total = response.data.total;
          this.data = response.data.rows;

          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
              if (this.data[i].FarmRegisterDate != null) {
                this.data[i].FarmRegisterDate = dayjs(
                  this.data[i].FarmRegisterDate
                )
                  .locale(locale)
                  .format("DD/MM/YYYY");
              }
            }
          } else {
            let start = (this.curpage - 1) * 15;
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1 + start;
            }
          }

          this.totalPage = response.data.totalPage;
          this.totalItems = response.data.totalData;
          this.total = response.data.total;
          console.log(this.total);
        })
        .finally(() => {
          this.isLoading = false;
        });

      console.log(urlExcel);

      //
      //   axios
      //     .get(urlExcel, { signal: this.controller.signal })
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
      //
    },
    add() {
      if (this.permit[0].IsAdd == 0) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "ไม่มีสิทธิ์เพิ่ม",
          life: 5000,
        });
        return;
      } else {
        router.push({ name: "farmerinfo" });
      }
    },
    detailOrganization(id) {
      const { OrganizationTypeName } =
        this.selection.OrganizationType.data.find(
          (val) => val.OrganizationTypeID === id
        );

      return OrganizationTypeName;
    },
    detailTitle(id) {
      const { TitleName } = this.selection.TitleName.data.find(
        (val) => val.TitleID === id
      );

      return TitleName;
    },
    detailGender(id) {
      const { GenderName } = this.selection.Gender.data.find(
        (val) => val.GenderID === id
      );

      return GenderName;
    },
    detailFormatBirthDate(date) {
      return format(new Date(date), "dd/MM/yyyy", {
        locale: th,
      });
    },
    detailFarmerRegisterStatus(id) {
      if (id == 2) {
        return "ขึ้นทะเบียนแล้ว";
      } else {
        return "ยังไม่ขึ้นทะเบียน";
      }
    },
    openDetail(id) {
      this.displayDetail = true;
      let farmId = this.data.find((val) => val.FarmID === id);
      if (!farmId) {
        this.displayDetail = false;
        this.detailInfo = {};
      } else {
        if (this.permit[0].IsPreview == 0) {
          this.$toast.add({
            severity: "error",
            summary: "ล้มเหลว",
            detail: "ไม่มีสิทธิ์ดูข้อมูล",
            life: 5000,
          });
          return;
        } else {
          this.detailInfo = farmId;
        }
      }
    },
    closeDetail() {
      this.displayDetail = false;
      this.detailInfo = {};
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
      this.data.id = id;
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },
    // remove data
    remove() {
      axios.delete("farm/" + this.data.id).then(() => {
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
    exportCSV() {
      this.$refs.dt.exportCSV();
    },

    filterProvince($event) {
      let val = $event.value;
      if (val) {
        this.selection.Province.data = this.selection.Province.temp;
        this.selection.Province.data = this.selection.Province.data.filter(
          (item) => item.AIZoneID == val
        );
      } else {
        this.selection.Province.data = this.selection.Province.temp;
      }
    },
    filterAmphur($event) {
      let val = $event.value;
      if (val) {
        this.selection.Amphur.data = this.selection.Amphur.temp;
        this.selection.Amphur.data = this.selection.Amphur.data.filter(
          (item) => item.ProvinceID == val
        );
      } else {
        this.selection.Amphur.data = this.selection.Amphur.temp;
      }
    },
    filterTumbol($event) {
      let val = $event.value;
      if (val) {
        this.selection.Tumbol.data = this.selection.Tumbol.temp;
        this.selection.Tumbol.data = this.selection.Tumbol.data.filter(
          (item) => item.AmphurID == val
        );
      } else {
        this.selection.Tumbol.data = this.selection.Tumbol.temp;
      }
    },
  },
  unmounted() {
    // this.controller.abort();
  },
};
</script>

<style>
.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}
/* .styled-table tbody tr.active-row { */
/* font-weight: bold; */
/* color: #009879; */
/* } */

.pagination-container {
  display: flex;
  column-gap: 10px;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
.p-button:focus {
  box-shadow: #fff;
}
</style>
