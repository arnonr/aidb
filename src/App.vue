<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="isMenu" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <Category />
        <router-view v-slot="{ Component }">
          <Transition
            name="slide-fade"
            mode="out-in"
            :duration="{ enter: 300, leave: 200 }"
          >
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
      <AppFooter />
    </div>

    <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" />
    <transition name="layout-mask">
      <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
    </transition>
    <ConfirmDialog></ConfirmDialog>
    <Toast />
  </div>
</template>

<script>
// config
import AppConfig from "./AppConfig.vue";
// components
import AppTopBar from "@/layouts/AppTopbar.vue";
import AppMenu from "@/layouts/AppMenu.vue";
import AppFooter from "@/layouts/AppFooter.vue";
import Category from "./components/Category.vue";
// Sidebar Menu
import menuConfig from "./menuConfig";
// store
import { mapGetters } from "vuex";
// utils
import themeColors from "@/utils/themeColors";

export default {
  emits: ["change-theme"],
  data() {
    return {
      layoutMode: "static",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: menuConfig,
    };
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    },
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className);
      else
        element.className = element.className.replace(
          new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"),
          " "
        );
    },
    isDesktop() {
      return window.innerWidth >= 992;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === "static") return !this.staticMenuInactive;
        else if (this.layoutMode === "overlay") return this.overlayMenuActive;
      }

      return true;
    },
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      color: "color",
      category_name: "category_name",
      adminTheme: "adminTheme",
    }),
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.layoutMode === "overlay",
          "layout-static": this.layoutMode === "static",
          "layout-static-sidebar-inactive":
            this.staticMenuInactive && this.layoutMode === "static",
          "layout-overlay-sidebar-active":
            this.overlayMenuActive && this.layoutMode === "overlay",
          "layout-mobile-sidebar-active": this.mobileMenuActive,
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false,
        },
      ];
    },
    isMenu() {
      const menus = this.menu;
      const menu = menus[0].items.map((item) => item);
      const filterMenu = menu.filter((menu) => menu.category === this.category_name);
      return filterMenu;
    },
  },
  beforeUpdate() {
    if (this.mobileMenuActive) this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  },
  created() {
    if (this.adminTheme.color_primary && this.adminTheme.color_text) {
      themeColors(this.adminTheme.color_primary, this.adminTheme.color_text);
    } else {
      themeColors(this.color.color_primary, this.color.color_text);
    }
  },
  components: {
    AppTopBar,
    AppMenu,
    AppConfig,
    AppFooter,
    Category,
  },
};
</script>

<style lang="scss">
@import "./App.scss";

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
