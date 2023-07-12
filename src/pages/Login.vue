<template>
  <div
    class="flex align-items-center justify-content-center min-h-screen max-h-screen overflow-hidden relative"
  >
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 100%">
      <div class="col-12 lg:col-8 xl:col-6">
        <LoginForm />
      </div>
    </div>
    <img class="bg-login" src="/images/bg/bg-login.png" alt="bg" />
  </div>
</template>

<script>
import LoginForm from "@/components/form/LoginForm.vue";
import store from "@/service/Vuex";
import { mapGetters } from "vuex";
import themeColors from "@/utils/themeColors";

export default {
  components: { LoginForm },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
      color: "color",
      adminTheme: "adminTheme",
    }),
  },
  methods: {
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
  },
  created() {
    this.checkTheme();
  },
};
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

.bg-login {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 0;
}
</style>
