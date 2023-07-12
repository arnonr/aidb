<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <PageTitle title="กำหนดสิทธ์ใช้งาน" :pages="breadcrumb" />
      <div class="card">
        <DataTable
          :loading="loading"
          class="text-sm"
          :value="menu"
          showGridlines
          responsiveLayout="scroll"
          :rowHover="true"
          :stripedRows="true"
        >
          <Column field="MenuName" header="ชื่อเมนู"></Column>
          <Column field="status" class="text-center">
            <template #header>
              <div class="table-header">
                อ่าน
                <Checkbox
                  v-model="all.IsPreview"
                  @click="checkAll('IsPreview')"
                  :binary="true"
                />
                ทั้งหมด
              </div>
            </template>
            <template #body="slotProps">
              <div class="field-checkbox justify-content-center">
                <Checkbox
                  @change="
                    save(`${slotProps.data.MenuCode}_${slotProps.data.MenuID}`)
                  "
                  v-model="
                    authorize[
                      `${slotProps.data.MenuCode}_${slotProps.data.MenuID}`
                    ].IsPreview
                  "
                  :binary="true"
                />
              </div>
            </template>
          </Column>
          <Column field="status" class="text-center">
            <template #header>
              <div class="table-header">
                เพิ่ม
                <Checkbox
                  v-model="all.IsAdd"
                  @click="checkAll('IsAdd')"
                  :binary="true"
                />
                ทั้งหมด
              </div>
            </template>
            <template #body="slotProps">
              <div class="field-checkbox justify-content-center">
                <Checkbox
                  @change="
                    save(`${slotProps.data.MenuCode}_${slotProps.data.MenuID}`)
                  "
                  v-model="
                    authorize[
                      `${slotProps.data.MenuCode}_${slotProps.data.MenuID}`
                    ].IsAdd
                  "
                  :binary="true"
                />
              </div>
            </template>
          </Column>
          <Column field="status" class="text-center">
            <template #header>
              <div class="table-header">
                แก้ไข
                <Checkbox
                  v-model="all.IsUpdate"
                  @click="checkAll('IsUpdate')"
                  :binary="true"
                />
                ทั้งหมด
              </div>
            </template>
            <template #body="slotProps">
              <div class="field-checkbox justify-content-center">
                <Checkbox
                  @change="
                    save(`${slotProps.data.MenuCode}_${slotProps.data.MenuID}`)
                  "
                  v-model="
                    authorize[
                      `${slotProps.data.MenuCode}_${slotProps.data.MenuID}`
                    ].IsUpdate
                  "
                  :binary="true"
                />
              </div>
            </template>
          </Column>
          <Column field="status" class="text-center">
            <template #header>
              <div class="table-header">
                ลบ
                <Checkbox
                  v-model="all.IsDelete"
                  @click="checkAll('IsDelete')"
                  :binary="true"
                />
                ทั้งหมด
              </div>
            </template>
            <template #body="slotProps">
              <div class="field-checkbox justify-content-center">
                <Checkbox
                  @change="
                    save(`${slotProps.data.MenuCode}_${slotProps.data.MenuID}`)
                  "
                  v-model="
                    authorize[
                      `${slotProps.data.MenuCode}_${slotProps.data.MenuID}`
                    ].IsDelete
                  "
                  :binary="true"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <!-- end main page -->
  </div>
</template>

<script>
import { ref } from "vue";

import PageTitle from "@/components/PageTitle.vue";
import router from "../../router";
import axios from "axios";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      menu: [],
      params: {},
      authorizes: [],
      authorize: {},
      all: {
        IsPreview: false,
        IsAdd: false,
        IsUpdate: false,
        IsDelete: false,
      },
      loading: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load(event) {
      this.loading = true;
      if (event) {
        this.params.page = event.page + 1;
      }
      await axios
        .get("/menu?orderByField=MenuName&orderBy=asc")
        .then((response) => {
          let data = response.data;
          this.menu = data.rows;

          for (const key in this.menu) {
            this.authorize[
              `${this.menu[key].MenuCode}_${this.menu[key].MenuID}`
            ] = {
              IsPreview: false,
              IsAdd: false,
              IsUpdate: false,
              IsDelete: false,
              MenuID: this.menu[key].MenuID,
            };
          }
        });

      await axios
        .get("/group-authorize", {
          params: {
            GroupID: this.$route.params.group_id,
          },
        })
        .then((response) => {
          this.authorizes = response.data.rows;

          let IsPreview = false;
          let IsAdd = false;
          let IsUpdate = false;
          let IsDelete = false;

          for (const key in this.authorizes) {
            IsPreview = this.authorizes[key].IsPreview === 1;
            IsAdd = this.authorizes[key].IsAdd === 1;
            IsUpdate = this.authorizes[key].IsUpdate === 1;
            IsDelete = this.authorizes[key].IsDelete === 1;

            this.authorize[
              `${this.authorizes[key].Menu.MenuCode}_${this.authorizes[key].Menu.MenuID}`
            ].IsPreview = IsPreview;
            this.authorize[
              `${this.authorizes[key].Menu.MenuCode}_${this.authorizes[key].Menu.MenuID}`
            ].IsAdd = IsAdd;
            this.authorize[
              `${this.authorizes[key].Menu.MenuCode}_${this.authorizes[key].Menu.MenuID}`
            ].IsUpdate = IsUpdate;
            this.authorize[
              `${this.authorizes[key].Menu.MenuCode}_${this.authorizes[key].Menu.MenuID}`
            ].IsDelete = IsDelete;
            this.authorize[
              `${this.authorizes[key].Menu.MenuCode}_${this.authorizes[key].Menu.MenuID}`
            ].authorize_id = this.authorizes[key].GroupAuthorizeID;
          }

          if (this.menu.length === this.authorizes.length) {
            this.all = {
              IsPreview: IsPreview,
              IsAdd: IsAdd,
              IsUpdate: IsUpdate,
              IsDelete: IsDelete,
            };
          }
        });

      this.loading = false;
    },
    async save(key, multiple = false) {
      if (key) {
        if (!multiple) {
          this.loading = true;
        }
        let id = this.authorize[key].authorize_id;
        let data = {
          GroupID: Number(this.$route.params.group_id),
          MenuID: this.authorize[key].MenuID,
          IsAdd: this.authorize[key].IsAdd ? 1 : 0,
          IsUpdate: this.authorize[key].IsUpdate ? 1 : 0,
          IsDelete: this.authorize[key].IsDelete ? 1 : 0,
          IsPreview: this.authorize[key].IsPreview ? 1 : 0,
          IsRemove: 0,
        };
        if (id) {
          await axios.put(`/group-authorize/${id}`, data).then(() => {
            if (!multiple) {
              this.$toast.add({
                severity: "success",
                summary: "บันทึกสำเร็จ",
                detail: "แก้ไขสิทธิ์เรียบร้อย",
                life: 3000,
              });
              this.load();
            }
          });
        } else {
          await axios.post("/group-authorize", data).then(() => {
            if (!multiple) {
              this.$toast.add({
                severity: "success",
                summary: "บันทึกสำเร็จ",
                detail: "แก้ไขสิทธิ์เรียบร้อย",
                life: 3000,
              });
              this.load();
            }
          });
        }
      }
    },
    back() {
      router.push("/setting/group");
    },
    async checkAll(type) {
      this.loading = true;
      this.all[type] = !this.all[type];
      for (const key in this.authorize) {
        await this.set_check(key, type);

        await this.save(key, true);
      }

      await this.load();

      this.$toast.add({
        severity: "success",
        summary: "บันทึกสำเร็จ",
        detail: "แก้ไขสิทธิ์เรียบร้อย",
        life: 3000,
      });
    },
    set_check(key, type) {
      this.authorize[key][type] = this.all[type];
    },
  },
  setup() {
    const breadcrumb = ref([
      { label: "หน้าหลัก", to: "/" },
      { label: "กลุ่มผู้เข้าใช้งาน", to: "/setting/group" },
      { label: "กำหนดสิทธ์ใช้งาน", to: "/setting/Group_authorizes" },
    ]);
    const items = ref([
      {
        label: "ลบ",
        icon: "pi pi-trash",
        command: () => {
          // opendisplaydelete();
        },
      },
    ]);
    const status = ref([
      {
        label: "เปิดการใช้งาน",
        value: "1",
      },
      {
        label: "ปิดการใช้งาน",
        value: "0",
      },
    ]);
    return {
      status,
      items,
      breadcrumb,
    };
  },
};
</script>

<style>
.p-datatable .p-column-header-content {
  justify-content: center;
}
</style>
