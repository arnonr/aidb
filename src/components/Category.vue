<template>
  <div class="category grid mb-5" v-if="user.GroupID == 1">
    <div
      v-for="category in categories"
      :key="category.id"
      class="col-6 lg:col-4 xl:col-2"
    >
      <div
        @click="selectCategory(category.id, category.name)"
        class="category-item bg-white border-2 border-transparent p-3 text-base text-900 flex align-items-center border-round-lg cursor-pointer"
        :class="{ active: category.id === this.category_id }"
      >
        <i :class="category.icon" class="mr-3 text-xl sm:text-2xl"></i>
        <span class="category-name block">{{ categoryName(category.id) }}</span>
      </div>
    </div>
  </div>
  <div class="category grid mb-5" v-else>
    <div
      v-for="category in categories"
      :key="category.id"
      class="col-6 lg:col-4 xl:col-2"
    >
      <div
        v-if="category.id != 6"
        @click="selectCategory(category.id, category.name)"
        class="category-item bg-white border-2 border-transparent p-3 text-base text-900 flex align-items-center border-round-lg cursor-pointer"
        :class="{ active: category.id === this.category_id }"
      >
        <i :class="category.icon" class="mr-3 text-xl sm:text-2xl"></i>
        <span class="category-name block">{{ categoryName(category.id) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/service/Vuex";
import { mapGetters } from "vuex";
import themeColors from "@/utils/themeColors";

export default {
  data() {
    return {
      categories: [
        {
          id: 1,
          icon: "pi pi-folder-open",
          name: "registration", // ลงทะเบียน
        },
        {
          id: 2,
          icon: "pi pi-sort-alt",
          name: "embryo_transfer", // ย้ายฝากตัวอ่อน
        },
        {
          id: 3,
          icon: "pi pi-user",
          name: "activity", // เจ้าหน้าที่ผสมเทียม
        },
        {
          id: 4,
          icon: "pi pi-book",
          name: "tropical_holstein", // ติดตามงานโครงการ
        },
        {
          id: 5,
          icon: "pi pi-print",
          name: "report", // รายงาน
        },
        {
          id: 6,
          icon: "pi pi-cog",
          name: "admin", // ผู้ดูแลระบบ
        },
      ],
    };
  },
  methods: {
    selectCategory(id, name) {
      store.dispatch("selectCategory", { id, name }).then(() => {
        if (id === 6) {
          store
            .dispatch("selectAdminTheme", {
              color_primary: "#0097FA",
              color_text: "#fff",
            })
            .then(() => {
              themeColors("#0097FA", "#fff");
              this.$router.push({ name: "setting-dashboard" });
            });
        } else if (id === 1) {
          if (this.adminTheme.color_primary && this.adminTheme.color_primary) {
            store
              .dispatch("selectAdminTheme", {
                color_primary: "",
                color_text: "",
              })
              .then(() => {
                if (!this.animal_id) {
                  store
                    .dispatch("selectAnimal", {
                      id: "1",
                      name: "โคเนื้อ",
                      color: { color_primary: "#7E5F45", color_text: "#fff" },
                    })
                    .then(() => {
                      themeColors("#7E5F45", "#fff");
                      this.$router.push({ name: "creature-search" });
                    });
                } else {
                  themeColors(this.color.color_primary, this.color.color_text);
                  //   this.$({ name: "creature-search" });
                  this.$router.push({ name: "creature-search" });
                }
              });
          }
          themeColors(this.color.color_primary, this.color.color_text);
          //   this.$({ name: "creature-search" });
          this.$router.push({ name: "creature-search" });
        } else if (id === 2) {
          if (this.adminTheme.color_primary && this.adminTheme.color_primary) {
            store
              .dispatch("selectAdminTheme", {
                color_primary: "",
                color_text: "",
              })
              .then(() => {
                if (!this.animal_id) {
                  store
                    .dispatch("selectAnimal", {
                      id: "1",
                      name: "โคเนื้อ",
                      color: { color_primary: "#7E5F45", color_text: "#fff" },
                    })
                    .then(() => {
                      themeColors("#7E5F45", "#fff");
                      this.$router.push({ name: "mainsetting" });
                    });
                } else {
                  themeColors(this.color.color_primary, this.color.color_text);
                  this.$router.push({ name: "mainsetting" });
                }
              });
          }
          themeColors(this.color.color_primary, this.color.color_text);
          this.$router.push({ name: "mainsetting" });
        } else if (id === 3) {
          if (this.adminTheme.color_primary && this.adminTheme.color_primary) {
            store
              .dispatch("selectAdminTheme", {
                color_primary: "",
                color_text: "",
              })
              .then(() => {
                if (!this.animal_id) {
                  store
                    .dispatch("selectAnimal", {
                      id: "1",
                      name: "โคเนื้อ",
                      color: { color_primary: "#7E5F45", color_text: "#fff" },
                    })
                    .then(() => {
                      themeColors("#7E5F45", "#fff");
                      this.$router.push({ name: "farm-info" });
                    });
                } else {
                  themeColors(this.color.color_primary, this.color.color_text);
                  this.$router.push({ name: "farm-info" });
                }
              });
          }
          themeColors(this.color.color_primary, this.color.color_text);
          this.$router.push({ name: "farm-info" });
        } else if (id === 4) {
          if (this.adminTheme.color_primary && this.adminTheme.color_primary) {
            store
              .dispatch("selectAdminTheme", {
                color_primary: "",
                color_text: "",
              })
              .then(() => {
                if (!this.animal_id) {
                  store
                    .dispatch("selectAnimal", {
                      id: "1",
                      name: "โคเนื้อ",
                      color: { color_primary: "#7E5F45", color_text: "#fff" },
                    })
                    .then(() => {
                      themeColors("#7E5F45", "#fff");
                      this.$router.push({ name: "project-detail" });
                    });
                } else {
                  themeColors(this.color.color_primary, this.color.color_text);
                  this.$router.push({ name: "project-detail" });
                }
              });
          }
          themeColors(this.color.color_primary, this.color.color_text);
          this.$router.push({ name: "project-detail" });
        } else if (id === 5) {
          if (this.adminTheme.color_primary && this.adminTheme.color_primary) {
            store
              .dispatch("selectAdminTheme", {
                color_primary: "",
                color_text: "",
              })
              .then(() => {
                if (!this.animal_id) {
                  store
                    .dispatch("selectAnimal", {
                      id: "1",
                      name: "โคเนื้อ",
                      color: { color_primary: "#7E5F45", color_text: "#fff" },
                    })
                    .then(() => {
                      themeColors("#7E5F45", "#fff");
                      this.$router.push({ name: "dashboard" });
                    });
                } else {
                  themeColors(this.color.color_primary, this.color.color_text);
                  this.$router.push({ name: "dashboard" });
                }
              });
          }
          themeColors(this.color.color_primary, this.color.color_text);
          this.$router.push({ name: "dashboard" });
        } else {
          if (this.adminTheme.color_primary && this.adminTheme.color_primary) {
            store
              .dispatch("selectAdminTheme", {
                color_primary: "",
                color_text: "",
              })
              .then(() => {
                if (!this.animal_id) {
                  store
                    .dispatch("selectAnimal", {
                      id: "1",
                      name: "โคเนื้อ",
                      color: { color_primary: "#7E5F45", color_text: "#fff" },
                    })
                    .then(() => {
                      themeColors("#7E5F45", "#fff");
                      this.$router.push({ name: "dashboard" });
                    });
                } else {
                  themeColors(this.color.color_primary, this.color.color_text);
                  this.$router.push({ name: "dashboard" });
                }
              });
          }
          themeColors(this.color.color_primary, this.color.color_text);
          this.$router.push({ name: "dashboard" });
        }
      });
    },
    categoryName(categoryId) {
      if (categoryId === 1) {
        return "ทะเบียน";
      } else if (categoryId === 2) {
        return "ย้ายฝากตัวอ่อน";
      } else if (categoryId === 3) {
        return "เจ้าหน้าที่ผสมเทียม";
      } else if (categoryId === 4) {
        return "ระบบโครงการ";
      } else if (categoryId === 5) {
        return "รายงาน";
      } else if (categoryId === 6) {
        return "ผู้ดูแลระบบ";
      }
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
      color: "color",
      category_id: "category_id",
      animal_id: "animal_id",
      adminTheme: "adminTheme",
    }),
  },
};
</script>
