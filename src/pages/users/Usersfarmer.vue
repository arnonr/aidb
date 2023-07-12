<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle :title="'จัดการ' + name" :pages="breadcrumb" />
      <div>
        <div class="card">
          <h1 class="text-xl mb-4 text-500">
            เครื่องมือช่วยค้นหาผู้ใช้งานเกษตรกร
          </h1>
          <div class="grid">
            <div class="col-12 sm:col-6 lg:col-3">
              <label
                for="selectedUnit"
                class="block text-600 text-sm font-bold mb-2"
              >
                ค้นหา</label
              >
              <InputText
                class="w-full"
                type="text"
                v-model="search.User"
                placeholder="อีเมลหรือ ชื่อเกษตรกร"
              />
            </div>
            <!-- <div class="col-12 sm:col-6 lg:col-3">
              <label
                for="selectedFarm"
                class="block text-600 text-sm font-bold mb-2"
              >
                กลุ่มผู้ใช้งานเกษตรกร</label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="ทั้งหมด"
                :options="selection.Group.data"
                optionLabel="GroupName"
                optionValue="GroupID"
                v-model="search.Group"
              />
            </div> -->
            <div class="col-12 sm:col-6 lg:col-3">
              <label
                for="animal_id"
                class="block text-600 text-sm font-bold mb-2"
              >
                ยืนยันตัวตน</label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="ทั้งหมด"
                :options="IsApprove"
                optionLabel="label"
                optionValue="value"
                v-model="search.IsApprove"
              />
            </div>
            <div class="col-12 sm:col-6 lg:col-3">
              <label
                for="animal_id"
                class="block text-600 text-sm font-bold mb-2"
              >
                สถานะ</label
              >
              <Dropdown
                :showClear="true"
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="ทั้งหมด"
                :options="isActive"
                optionLabel="label"
                optionValue="value"
                v-model="search.isActive"
              />
            </div>
          </div>
        </div>
        <div class="mt-5 card">
          <div class="grid flex align-items-center mb-5">
            <div class="col-12 md:col-6">
              <h1 class="text-2xl mb-0 text-600">{{ "จัดการ" + name }}</h1>
            </div>
            <div class="col-12 md:col-6 md:text-right">
              <Button
                @click="open()"
                label="เพิ่มข้อมูล"
                icon="pi pi-plus"
                class="p-button-primary"
              />
            </div>
          </div>
          <DataTable
            class="text-sm"
            :value="data"
            :loading="isLoading"
            :rows="10"
            :paginator="true"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]"
            responsiveLayout="scroll"
            currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords}"
            @sort="sort($event)"
          >
            <Column
              v-for="col of columns"
              :field="col.field"
              :header="col.header"
              :key="col.field"
              class="text-center"
              :sortable="true"
            >
            </Column>
            <Column
              field="IsApprove"
              header="ยืนยันตัวตน"
              class="text-center"
              :sortable="true"
            >
              <template #body="slotProps">
                <div v-if="slotProps.data.IsApprove == 1">
                  <Tag class="w-full" severity="success" icon="pi pi-check"
                    >อนุมัติ</Tag
                  >
                </div>
                <div v-else-if="slotProps.data.IsApprove == 0">
                  <Tag
                    class="w-full"
                    severity="warning"
                    icon="pi pi-exclamation-circle"
                  >
                    รออนุมัติ</Tag
                  >
                </div>
                <div v-else>
                  <Tag
                    class="w-full"
                    severity="danger"
                    icon="pi pi-exclamation-triangle"
                  >
                    ไม่อนุมัติ</Tag
                  >
                </div>
              </template>
            </Column>
            <Column
              field="isActive"
              header="สถานะ"
              class="text-center"
              :sortable="true"
            >
              <template #body="slotProps">
                <div
                  v-if="
                    slotProps.data.isActive == '1' ||
                    slotProps.data.isActive == status[0]
                  "
                >
                  <Tag class="w-full" severity="success">เปิดใช้งาน</Tag>
                </div>
                <div v-else>
                  <Tag class="w-full bg-gray-500">ปิดใช้งาน</Tag>
                </div>
              </template>
            </Column>
            <Column header="จัดการ" class="text-center">
              <template #body="slotProps">
                <Button
                  type="button"
                  icon="pi pi-ellipsis-v"
                  @click="toggle($event, slotProps.data.UserFarmerID)"
                  class="p-button-text"
                />
                <Menu ref="menu" :model="items" :popup="true">
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
              </template>
            </Column>
            <template #empty> ไม่พบข้อมูล </template>
            <template #loading>
              <h1 class="text-white text-center">กรุณารอสักครู่...</h1>
            </template>
          </DataTable>
          <!-- <Paginator
            @page="page($event)"
            :rows="15"
            :totalRecords="total"
          ></Paginator> -->
        </div>
      </div>
    </div>
    <Dialog
      :header="formheader + name"
      v-model:visible="display"
      :style="{ width: '50vw' }"
      :modal="true"
      v-on:after-hide="clear()"
    >
      <form class="grid mt-2">
        <div class="col-12 lg:col-12">
          <div class="grid">
            <div class="col-12 lg:col-12">
              <label class="block text-600 text-sm font-bold mb-2">
                ชื่อเกษตรกร</label
              >
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                class="w-full"
                placeholder="เลือกเกษตรกร"
                optionLabel="StaffGivenName"
                optionValue="FarmerID"
                v-model="data[index].FarmerID"
                :options="selection.Staff.data"
                :filter="true"
                filterPlaceholder="รหัส หรือ ชื่อเกษตรกร"
                :class="{ 'p-invalid': !data[index].FarmerID && valid }"
              />
            </div>
            <div class="col-12 sm:col-12 lg:col-6">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                อีเมล
              </label>
              <InputText
                autocomplete="username"
                v-model="data[index].Username"
                class="w-full"
                :class="{ 'p-invalid': !data[index].Username && valid }"
              />
            </div>
            <div class="col-2 sm:col-12 lg:col-6 field p-fluid">
              <label class="block text-600 text-sm font-bold mb-2">
                รหัสผ่าน
              </label>
              <Password
                autocomplete="current-password"
                :feedback="false"
                v-model="data[index].Password"
                toggleMask
                :class="{ 'p-invalid': !data[index].Password && valid }"
              />
            </div>
            <!-- <div class="col-2 sm:col-12 lg:col-6">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                กลุ่มผู้ใช้งานเกษตรกร
              </label>
              <Dropdown
                emptyMessage="ไม่มีข้อมูล"
                emptyFilterMessage="ไม่พบข้อมูล"
                v-model="data[index].GroupID"
                optionLabel="GroupName"
                optionValue="GroupID"
                :options="selection.Group.form"
                class="w-full"
                placeholder="เลือกกลุ่มผู้ใช้งานเกษตรกร"
                :class="{ 'p-invalid': !data[index].GroupID && valid }"
              >
              </Dropdown>
            </div> -->
            <!-- <div class="col-2 sm:col-12 lg:col-6">
              <label for="farm" class="block text-600 text-sm font-bold mb-2">
                ประเภทสัตว์
              </label>

              <MultiSelect
                v-model="data[index].AnimalTypeID"
                :options="selection.Animal.data"
                optionLabel="label"
                optionValue="value"
                placeholder="เลือกประเภทสัตว์"
                display="chip"
                class="w-full"
                :class="{ 'p-invalid': !data[index].AnimalTypeID && valid }"
              />
            </div> -->
            <div class="col">
              <div class="field col-12 sm:col-12 lg:col-12">
                <div class="text-xl">สถานะ</div>
                <div
                  v-for="isActive of status"
                  :key="isActive.key"
                  class="field-radiobutton"
                >
                  <RadioButton
                    name="isActive"
                    :value="isActive.value"
                    v-model="data[this.index].isActive"
                  />
                  <label :for="isActive.key">{{ isActive.name }}</label>
                </div>
              </div>
              <div class="field col-12 sm:col-12 lg:col-12">
                <div class="text-xl">ยืนยันตัวตน</div>
                <div
                  v-for="IsApprove of approve"
                  :key="IsApprove.key"
                  class="field-radiobutton"
                >
                  <RadioButton
                    :id="IsApprove.key"
                    name="approve"
                    :value="IsApprove.value"
                    v-model="data[this.index].IsApprove"
                  />
                  <label :for="IsApprove.key">{{ IsApprove.name }}</label>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="field col-12 sm:col-12 lg:col-12">
                <label for="farm" class="block text-600 text-sm font-bold mb-2">
                  หมายเหตุ
                </label>
                <InputText v-model="data[index].Remark" class="w-full" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center mt-5 flex justify-content-between">
          <Button
            label="ยกเลิก"
            class="p-button-secondary w-full mr-3"
            @click="close()"
          />
          <Button
            label="บันทึกข้อมูล"
            class="ml-3 p-button-info w-full"
            @click="add()"
          />
        </div>
      </form>
    </Dialog>
    <Dialog
      header="ตรวจสอบข้อมูล"
      v-model:visible="display_delete"
      :style="{ width: '350px' }"
      :modal="true"
    >
      <div class="confirmation-content text-center">
        <i class="pi pi-trash" style="font-size: 5rem" />
        <br />
        <span class="text-xl"
          >คุณต้องการลบ{{ name }}ลำดับที่
          {{ data[index].show_id }} ใช่หรือไม่</span
        >
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
import { mapGetters } from "vuex";
import axios from "axios";
import PageTitle from "@/components/PageTitle.vue";
export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapGetters({
      user: "user",
      UserId: "UserID",
    }),
  },
  data() {
    return {
      // API
      url: "/user-farmer",
      getstaff: "/farmer?size=",
      getgroup: "/group",
      // ID
      id: "UserID",
      // Name
      name: "ผู้ใช้งานเกษตรกร",

      // Table Field

      columns: [
        {
          field: "show_id",
          header: "ลำดับที่",
        },
        {
          field: "Username",
          header: "อีเมล",
        },
        {
          field: "Farmer.FullName",
          header: "ชื่อ - นามสกุล",
        },
        {
          field: "ThaiRegisterDate",
          header: "วันที่สมัคร",
        },
        {
          field: "ThaiLastLogin",
          header: "วันที่ใช้งานล่าสุด",
        },
      ],

      // Selection

      selection: {
        Staff: {
          data: [],
          Search: "",
        },
        Group: {
          data: [],
          form: [],
          Search: "",
        },
        Animal: {
          data: [
            {
              value: 1,
              label: "โคเนื้อ",
              key: "A",
            },
            {
              value: 2,
              label: "กระบือ",
              key: "B",
            },
            {
              value: 3,
              label: "แพะ",
              key: "B",
            },
          ],
        },
      },

      // Search

      isSearch: false,
      isSelection: false,
      search: {
        User: "",
        Staff: "",
        Group: "",
        isActive: "",
        IsApprove: "",
      },
      filtered: {
        User: "",
        Username: "",
        Staff: "",
        Group: "",
        isActive: "",
        IsApprove: "",
        StaffID: "",
      },

      // Static Data

      isLoading: false,
      total: null,
      data: [],
      valid: false,
      index: null,
      display: false,
      display_delete: false,
      temp: null,
      curpage: 0,
      formheader: "",
      sortField: "",
      sortOrder: "",
      IsApprove: [
        {
          label: "ทั้งหมด",
          value: "",
        },
        {
          label: "อนุมัติ",
          value: "1",
        },
        {
          label: "รออนุมัติ",
          value: "0",
        },
        {
          label: "ไม่อนุมัติ",
          value: "2",
        },
      ],
      isActive: [
        {
          label: "ทั้งหมด",
          value: "",
        },
        {
          label: "ใช้งาน",
          value: "1",
        },
        {
          label: "ไม่ใช้งาน",
          value: "0",
        },
      ],

      // uneditable

      items: [
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
        { label: "ข้อมูลพื้นฐานระบบ", to: "/user_center/dashboard" },
        { label: "", to: "" },
      ],
      status: [
        { name: "เปิดการใช้งาน", value: 1 },
        { name: "ปิดการใช้งาน", value: 0 },
      ],
      approve: [
        { name: "อนุมัติ", value: 1 },
        { name: "ไม่อนุมัติ", value: 2 },
      ],
      controller: new AbortController(),
    };
  },
  mounted() {
    this.load();
    this.load_selection();
    this.breadcrumb[1].label = "จัดการ" + this.name;
  },
  watch: {
    // ค้นหา
    "search.Group"(val) {
      this.filtered.Group = val;
      this.load();
    },
    "search.User"(val) {
      this.filtered.User = val;
      if (this.isLoading == false) {
        this.isLoading = true;
        setTimeout(() => {
          this.filtered.StaffID = "";
          this.load();
          this.isLoading = false;
        }, 1000);
      }
    },
    "search.IsApprove"(val) {
      this.filtered.IsApprove = val;
      this.load();
    },
    "search.isActive"(val) {
      this.filtered.isActive = val;
      this.load();
    },
    //ค้นหา selection
    "selection.Staff.Search"(val) {
      this.selection.Staff.Search = val;
      if (this.isSelection == false) {
        this.isSelection = true;
        setTimeout(() => {
          this.loadstaff();
          this.isSelection = false;
        }, 1000);
      }
    },
  },

  methods: {
    // แสดงปุ่ม
    toggle(event, index) {
      try {
        //find array offet
        let offset = this.data.findIndex((x) => x.UserFarmerID == index);
        this.$refs.menu.toggle(event);
        this.index = offset;
        this.delete_id = offset;
      } catch (e) {
        window.location.reload();
      }
    },
    // filter Staff selection
    // filterstaff($event) {
    //   this.selection.Staff.Search = $event.value;
    //   if (this.isSelection == false) {
    //     this.isSelection = true;
    //     setTimeout(() => {
    //       this.loadstaff();
    //       this.isSelection = false;
    //     }, 1000);
    //   }
    // },
    //filter Staff selection
    // loadstaff() {
    //   let url = this.getstaff;

    //   if (this.selection.Staff.Search) {
    //     url += "&StaffNumber=" + this.selection.Staff.Search;
    //   }

    //   axios.get(url, { signal: this.controller.signal }).then((response) => {
    //     for (let i = 0; i < response.data.rows.length; i++) {
    //       response.data.rows[i].StaffGivenName =
    //         response.data.rows[i].FarmerNumber +
    //         ", " +
    //         response.data.rows[i].FullName;
    //     }
    //     this.selection.Staff.data = response.data.rows;
    //   });
    // },
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
    // on modal hide
    clear() {
      if (this.temp) {
        // console.log(this.data[this.index], this.temp);
        this.data[this.index] = this.temp;
        this.temp = null;
      } else if (!this.data[this.index].CreatedDatetime) {
        this.data.splice(this.index, 1);
      }
      this.valid = false;
    },
    // validate
    validation() {
      if (!this.data[this.index].FarmerID || !this.data[this.index].Username) {
        this.$toast.add({
          severity: "error",
          summary: "ล้มเหลว",
          detail: "กรุณากรอกข้อมูล",
          life: 5000,
        });
        this.valid = true;
        return false;
      }
      return true;
    },
    //load selection
    load_selection() {
      axios
        .get(this.getstaff, { signal: this.controller.signal })
        .then((response) => {
          for (let i = 0; i < response.data.rows.length; i++) {
            response.data.rows[i].StaffGivenName =
              response.data.rows[i].FarmerNumber +
              ", " +
              response.data.rows[i].FullName;
          }
          this.selection.Staff.data = response.data.rows;
        });
      axios
        .get(this.getgroup, { signal: this.controller.signal })
        .then((response) => {
          this.selection.Group.data = response.data.rows;
          this.selection.Group.data.splice(0, 0, {
            GroupID: "",
            GroupName: "ทั้งหมด",
          });
        });
      axios
        .get(this.getgroup, { signal: this.controller.signal })
        .then((response) => {
          if (this.user.GroupID != 1) {
            this.selection.Group.form = response.data.rows.filter(
              (item) => item.GroupCode != "01"
            );
          } else {
            this.selection.Group.form = response.data.rows;
          }
        });
    },
    // main load
    load() {
      this.isLoading = true;
      let url = this.url + "?size=";
      // url += "&page=";
      // if (this.curpage) {
      //   url += this.curpage;
      // }
      if (this.filtered.User && this.filtered.StaffID == "") {
        url += "&Username=" + this.filtered.User;
      }
      if (this.filtered.Group) {
        url += "&GroupID=" + this.filtered.Group;
      }
      if (this.filtered.StaffID) {
        url += "&StaffID=" + this.filtered.StaffID;
      }
      if (this.filtered.IsApprove) {
        url += "&IsApprove=" + this.filtered.IsApprove;
      }
      if (this.filtered.isActive) {
        url += "&isActive=" + this.filtered.isActive;
      }
      if (this.sortField && this.sortOrder) {
        url += "&sortField=" + this.sortField + "&sortOrder=" + this.sortOrder;
      }
      axios
        .get(url, { signal: this.controller.signal })
        .then((response) => {
          this.total = response.data.total;
          this.data = response.data.rows;

          var c = false;
          if (this.filtered.StaffID) {
            c = true;
          }

          // function search user
          if (response.data.rows.length == 0 && c == false) {
            if (this.filtered.User) {
              axios
                .get(this.getstaff + "&StaffGivenName=" + this.filtered.User, {
                  signal: this.controller.signal,
                })
                .then((response) => {
                  if (response.data.rows.length > 0) {
                    this.filtered.StaffID = response.data.rows[0].StaffID;
                    this.load();
                  } else {
                    axios
                      .get(
                        this.getstaff + "&StaffSurname=" + this.filtered.User,
                        {
                          signal: this.controller.signal,
                        }
                      )
                      .then((response) => {
                        if (response.data.rows.length > 0) {
                          this.filtered.StaffID = response.data.rows[0].StaffID;
                          this.load();
                        }
                      });
                  }
                });
            }
          }
          // end function search user
          if (this.curpage == 0 || this.curpage == 1) {
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1;
            }
          } else {
            let start = (this.curpage - 1) * 15;
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].show_id = i + 1 + start;
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // create or update data
    add() {
      if (this.validation() == false) {
        return;
      }
      let form = {};
      // let form = {
      //   FarmerID: this.data[this.index].FarmerID,
      //   Username: this.data[this.index].Username,
      //   IsApprove: this.data[this.index].IsApprove,
      //   isActive: this.data[this.index].isActive,
      //   GroupID: 1,
      //   Remark: this.data[this.index].Remark,
      // };

      form.FarmerID = this.data[this.index].FarmerID;
      form.Username = this.data[this.index].Username;
      form.Password = this.data[this.index].Password;
      form.IsApprove = this.data[this.index].IsApprove;
      form.isActive = this.data[this.index].isActive;
      form.GroupID = 13;
      form.Remark = this.data[this.index].Remark;

      // if (form.Password) {
      //   delete form.Password;
      // }
      if (
        this.data[this.index].IsApprove == 1 &&
        !this.data[this.index].ApproveDatetime
      ) {
        form.ApproveByStaffID = this.UserId;
        form.ApproveDatetime = Date.now();
      }
      form.RegisterDate = Date.now();

      if (
        this.index == this.data.length - 1 &&
        this.data[this.index].CreatedUserID == ""
      ) {
        //create data

        axios
          .post(this.url, form)
          .then(() => {
            this.close();
            this.load();
            this.$toast.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "เพิ่มข้อมูลเสร็จสิ้น",
              life: 5000,
            });
          })
          .catch((err) => {
            this.data[this.index].isActive = 1;
            this.data[this.index].IsApprove = 1;
            this.$toast.add({
              severity: "error",
              summary: "ล้มเหลว",
              detail: err.response.data.error.message,
              life: 5000,
            });
          });
      }
      // update data
      else if (this.index < this.data.length) {
        if (this.validation() == false) {
          return;
        }

        // console.log(this.data[this.index]);

        // console.log(this.data[this.index].UserFarmerID);

        axios
          .put(this.url + "/" + this.data[this.index].UserFarmerID, form)
          .then(() => {
            this.close();
            this.load();

            this.$toast.add({
              severity: "success",
              summary: "สำเร็จ",
              detail: "แก้ไขข้อมูลเสร็จสิ้น",
              life: 5000,
            });
          })
          .catch((err) => {
            this.$toast.add({
              severity: "error",
              summary: "ล้มเหลว",
              detail: err.response.data.error.message,
              life: 5000,
            });
          });
      }
    },
    // remove data
    remove() {
      axios
        .delete(this.url + "/" + this.data[this.index].UserFarmerID)
        .then(() => {
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
    // form open add
    open() {
      this.index = this.data.length;
      this.formheader = "เพิ่ม";
      this.data.push({});
      for (let i in this.data[0]) {
        this.data[this.index][i] = "";
      }
      this.data[this.index].isActive = 1;
      this.data[this.index].IsApprove = 1;
      this.display = true;
    },
    //form open edit
    edit() {
      this.formheader = "แก้ไข";
      this.temp = JSON.parse(JSON.stringify(this.data[this.index]));
      // this.data[this.index].Password = null;

      if (this.data[this.index].Password) {
        delete this.data[this.index].Password;
      }
      // console.log(this.temp);
      this.display = true;
    },
    close() {
      this.display = false;
    },
    open_delete() {
      this.display_delete = true;
    },
    close_delete() {
      this.display_delete = false;
    },
  },
  unmounted() {
    this.controller.abort();
  },
};
</script>
