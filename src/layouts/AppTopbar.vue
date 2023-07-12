<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo cursor-pointer">
      <img :src="topBarLogo" alt="logo" />
      <span>{{ topBarTitle }}</span>
    </router-link>
    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
      <i class="pi pi-bars"></i>
    </button>
    <router-link to="/" class="hidden lg:inline">
      <button class="p-link layout-menu-button layout-topbar-button">
        <i class="pi pi-home"></i>
      </button>
    </router-link>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
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
        <router-link to="/cart">
          <button class="p-link layout-topbar-button">
            <i class="pi pi-shopping-cart"></i>
            <span>ตะกร้า</span>
          </button>
        </router-link>
      </li>
      <!-- <li>
				<button class="p-link layout-topbar-button">
					<i class="pi pi-bell"></i>
					<span>แจ้งเตือน</span>
				</button>
			</li> -->
      <li>
        <button
          class="p-link layout-topbar-button"
          @click="toggleProfile"
          aria-haspopup="true"
          aria-controls="profile_menu"
        >
          <Avatar :image="profile.Staff.StaffImage" class="mr-3 lg:mr-0" shape="circle" />
          <span>{{ full_name }}</span>
        </button>
        <Menu id="profile_menu" ref="menu" :model="menus" :popup="true" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import cowLogo from "@/assets/images/logo/cow.png";
import buffaloLogo from "@/assets/images/logo/buffalo.png";
import goatLogo from "@/assets/images/logo/goat.png";
import adminLogo from "@/assets/images/logo-2.png";

export default {
  data() {
    return {
      menus: [
        {
          label: "ตัวเลือก",
          items: [
            {
              label: "ข้อมูลส่วนตัว",
              icon: "pi pi-user",
              to: "/profile",
            },
            {
              label: "ออกจากระบบ",
              icon: "pi pi-sign-out",
              command: async () => {
                await this.logout();
              },
            },
          ],
        },
      ],
    };
  },
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    onTopbarMenuToggle(event) {
      this.$emit("topbar-menu-toggle", event);
    },
    toggleProfile(event) {
      this.$refs.menu.toggle(event);
    },
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      animal_name: "animal_name",
      color: "color",
      profile: "user",
      adminTheme: "adminTheme",
    }),
    full_name() {
      return `${this.profile.Staff.StaffGivenName} ${this.profile.Staff.StaffSurname}`;
    },
    topBarTitle() {
      if (this.adminTheme.color_primary && this.adminTheme.color_text) {
        return "ผู้ดูแลระบบ";
      } else {
        return this.animal_name;
      }
    },
    topBarLogo() {
      if (this.adminTheme.color_primary && this.adminTheme.color_text) {
        return adminLogo;
      } else {
        if (this.animal_id == 1) {
          return cowLogo;
        } else if (this.animal_id == 2) {
          return buffaloLogo;
        } else {
          return goatLogo;
        }
      }
    },
  },
};
</script>
