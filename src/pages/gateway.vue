<template>
  <div class="layout-topbar bg-white h-6rem shadow-none">
    <img alt="Logo" src="../assets/images/logo-2.png" class="max-w-4rem mr-3" />
    <span class="text-4xl font-bold">AIDM</span>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button bg-blue-200"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <!-- <router-link :to="{ name: 'login' }"> -->
        <Button
          @click="logout"
          label="ออกจากระบบ"
          class="btn-gateway p-button-info p-button-shadow w-full"
        />
        <!-- </router-link> -->
      </li>
    </ul>
  </div>
  <div
    class="surface-0 flex align-items-center justify-content-center min-h-screen overflow-hidden mt-8 md:mt-0"
  >
    <div class="grid justify-content-center p-2 lg:p-0">
      <div class="col-12 mt-5 xl:mt-0 text-center">
        <h1 class="text-900 font-bold">เลือกเมนู</h1>
      </div>
      <div class="col-12 xl:col-10">
        <div class="h-full w-full m-0 py-3 px-2 grid">
          <div
            class="col-12 sm:col-6 md:col-3"
            v-if="user.AnimalTypeID.includes(1)"
            :class="{
              'md:col-3': user.GroupID == 1,
              'md:col-12': user.AnimalTypeID.length == 1 && user.GroupID != 1,
              'md:col-6': user.AnimalTypeID.length == 2 && user.GroupID != 1,
              'md:col-4': user.AnimalTypeID.length == 3 && user.GroupID != 1,
            }"
          >
            <card
              class="card-animal cursor-pointer shadow-none"
              @click="
                selectAnimal('1', 'โคเนื้อ', {
                  colorPrimary: '#7E5F45',
                  colorText: '#fff',
                })
              "
            >
              <template #header>
                <img
                  src="layout/images/cow_new.png"
                  alt="cow"
                  class="max-w-full"
                />
              </template>
              <template #content>
                <h1 class="font-bold text-3xl text-900 mb-2 text-center">
                  โคเนื้อ
                </h1>
              </template>
            </card>
          </div>

          <div
            class="col-12 sm:col-6 md:col-3"
            v-if="user.AnimalTypeID.includes(2)"
            :class="{
              'md:col-3': user.GroupID == 1,
              'md:col-12': user.AnimalTypeID.length == 1 && user.GroupID != 1,
              'md:col-6': user.AnimalTypeID.length == 2 && user.GroupID != 1,
              'md:col-4': user.AnimalTypeID.length == 3 && user.GroupID != 1,
            }"
          >
            <card
              class="card-animal cursor-pointer shadow-none"
              @click="
                selectAnimal('2', 'กระบือ', {
                  colorPrimary: '#5372C1',
                  colorText: '#fff',
                })
              "
            >
              <template #header>
                <img
                  src="layout/images/buff_new.png"
                  alt="buffalo"
                  class="max-w-full"
                />
              </template>
              <template #content>
                <h1 class="font-bold text-3xl text-900 mb-2 text-center">
                  กระบือ
                </h1>
              </template>
            </card>
          </div>

          <div
            class="col-12 sm:col-6 md:col-3"
            v-if="user.AnimalTypeID.includes(3)"
            :class="{
              'md:col-3': user.GroupID == 1,
              'md:col-12': user.AnimalTypeID.length == 1 && user.GroupID != 1,
              'md:col-6': user.AnimalTypeID.length == 2 && user.GroupID != 1,
              'md:col-4': user.AnimalTypeID.length == 3 && user.GroupID != 1,
            }"
          >
            <card
              class="card-animal cursor-pointer shadow-none"
              @click="
                selectAnimal('3', 'แพะ', {
                  colorPrimary: '#5DA798',
                  colorText: '#fff',
                })
              "
            >
              <template #header>
                <img
                  src="layout/images/goat_new.png"
                  alt="goat"
                  class="max-w-full"
                />
              </template>
              <template #content>
                <h1 class="font-bold text-3xl text-900 mb-2 text-center">
                  แพะ
                </h1>
              </template>
            </card>
          </div>

          <div
            class="col-12 sm:col-6 md:col-3"
            v-if="user.GroupID == 1"
            :class="{
              'md:col-3': user.GroupID == 1,
              'md:col-12': user.AnimalTypeID.length == 1 && user.GroupID != 1,
              'md:col-6': user.AnimalTypeID.length == 2 && user.GroupID != 1,
              'md:col-4': user.AnimalTypeID.length == 3 && user.GroupID != 1,
            }"
          >
            <card
              class="card-animal cursor-pointer shadow-none"
              @click="
                selectAdmin({ colorPrimary: '#0097FA', colorText: '#fff' })
              "
            >
              <template #header>
                <img
                  src="layout/images/admin_new.png"
                  alt="admin"
                  class="max-w-full"
                />
              </template>
              <template #content>
                <h1 class="font-bold text-3xl text-900 mb-2 text-center">
                  ผู้ดูแล
                </h1>
              </template>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/service/Vuex";
import { mapGetters } from "vuex";
import axios from "axios";
import router from "@/router";
import themeColors from "../utils/themeColors";

export default {
  data() {
    return {
      form: {},
    };
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      color: "color",
      adminTheme: "adminTheme",
      user: "user",
    }),
    form_with_id() {
      return {
        ...this.form,
        id: this.animal_id,
      };
    },
  },
  methods: {
    selectAnimal(id, name, color) {
      store
        .dispatch("selectAnimal", {
          id: id,
          name: name,
          color: {
            color_primary: color.colorPrimary,
            color_text: color.colorText,
          },
        })
        .then(() => {
          store
            .dispatch("selectCategory", { id: 1, name: "registration" })
            .then(() => router.push({ name: "farmall" }));
        });
    },
    selectAdmin(color) {
      store
        .dispatch("selectAdminTheme", {
          color_primary: color.colorPrimary,
          color_text: color.colorText,
        })
        .then(() => {
          store
            .dispatch("selectCategory", { id: 6, name: "admin" })
            .then(() => router.push({ name: "setting-dashboard" }));
        });
    },
    checkTheme() {
      if (
        (!this.animal_id && this.adminTheme.color_primary) ||
        this.adminTheme.color_text
      ) {
        store.dispatch("selectAdminTheme", {
          color_primary: "",
          color_text: "",
        });
        themeColors("#3b82f6", "#FFF");
      } else {
        store
          .dispatch("selectAnimal", {
            id: null,
            name: "",
            color: { color_primary: "", color_text: "" },
          })
          .then(() => themeColors("#3b82f6", "#FFF"));
      }
    },
    save() {
      axios.post("", this.form_with_id);
    },
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.checkTheme();
  },
};
</script>

<style lang="scss">
.card-animal {
  .p-card-body,
  .p-card-content {
    padding: 0 !important;
  }
}

.btn-gateway {
  &.p-button-shadow {
    box-shadow: 0px 4px 12px rgba(68, 126, 242, 0.7);
  }
}
</style>
