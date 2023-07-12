<template>
  <div class="grid">
    <div class="col-12">
      <PageTitle title="แก้ไขทะเบียนฟาร์ม" :pages="breadcrumb" />
      <div class="card lg:p-0">
        <div class="grid">
          <div
            class="
              col-12
              lg:col-4
              xl:col-3
              border-bottom-1
              lg:border-bottom-0 lg:border-right-1
              border-300
              mb-3
              lg:mb-0 lg:pl-5 lg:pt-4
              pb-4
              lg:pb-0
            "
          >
            <Steps class="vertical" :model="steps" :readonly="false" />
          </div>
          <div class="col-12 lg:col-8 xl:col-9 lg:p-4">
            <router-view
              v-slot="{ Component }"
              @prevPage="prevPage($event)"
              @nextPage="nextPage($event)"
            >
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {
    PageTitle,
  },

  data() {
    return {
      urlOrganization: "/organization",
      breadcrumb: [
        { label: "ทะเบียนฟาร์ม (ผท.3)", to: "/agency/farm" },
        { label: "แก้ไขทะเบียนฟาร์ม", to: "" },
      ],

      // steps

      steps: [
        {
          label: "ข้อมูลฟาร์ม",
          to: "/farm/edit/" + this.$route.params.id,
        },
        {
          label: "ข้อมูลเกษตรกร",
          to: "/farm/edit/farmer-info/" + this.$route.params.id,
        },
      ],
    };
  },
  methods: {
    nextPage(event) {
      this.$router.push(this.steps[event.pageIndex + 1].to);
    },
    prevPage(event) {
      this.$router.push(this.steps[event.pageIndex - 1].to);
    },
  },
};
</script>

<style>
</style>