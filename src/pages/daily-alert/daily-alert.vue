<template>
  <div class="grid">
    <!-- start main page -->
    <div class="col-12">
      <div class="card">
        <div class="grid align-items-center mb-6 xl:px-8">
          <div class="col-12 md:col-6 xl:col-8">
            <h1 class="text-2xl sm:text-4xl mb-0 text-indigo-800 font-semibold">
              แจ้งเตือนเหตุการณ์รายวัน
            </h1>
          </div>
          <div class="col-12 md:col-6 xl:col-4">
            <label class="block text-600 text-sm font-bold mb-2"
              >เรียงตาม</label
            >
            <Dropdown
              class="w-full"
              placeholder="เลือก"
              :options="sort"
              optionLabel="text"
              optionValue="value"
              v-model="sortby"
            />
          </div>
        </div>
        <div class="grid align-items-center">
          <div class="col-12">
            <div class="grid">
              <div
                v-for="item in noti"
                :key="item.id"
                class="col-12 xl:col-10 mx-auto"
              >
                <DailyAlertItem
                  v-if="
                    (item.id == 10 && animal_id == 3) ||
                    (item.id == 9 && animal_id == 1) ||
                    (item.id == 4 && animal_id != 3)
                  "
                  :title="item.title"
                  :alert="item.alert"
                  :image="item.image"
                  @click="
                    setAlert_AnimalID(
                      item.AnimalID,
                      item.tab_index,
                      item.title,
                      item.noti
                    )
                  "
                />

                <DailyAlertItem
                  v-else-if="item.id != 9 && item.id != 10 && item.id != 4"
                  :title="item.title"
                  :alert="item.alert"
                  :image="item.image"
                  @click="
                    setAlert_AnimalID(
                      item.AnimalID,
                      item.tab_index,
                      item.title,
                      item.noti
                    )
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end main page -->
  </div>
</template>

<script>
import DailyAlertItem from "@/components/DailyAlertItem";
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/service/Vuex";
export default {
  components: {
    DailyAlertItem,
  },
  data() {
    return {
      sortby: null,
      sort: [
        {
          text: "เรียงจากมากไปน้อย",
          value: "desc",
        },
        {
          text: "เรียงจากน้อยไปมาก",
          value: "asc",
        },
      ],
      noti: [
        {
          id: 1,
          title: "ครบกำหนดคลอด",
          alert: 0,
          AnimalID: null,
          tab_index: 4,
          image: "/images/daily-alert/1.png",
        },
        {
          id: 2,
          title: "ครบกำหนดตรวจท้อง",
          alert: 0,
          tab_index: 2,
          AnimalID: null,
          image: "/images/daily-alert/2.png",
        },
        {
          id: 3,
          title: "ติดตามลูกเกิดหลังคลอด",
          alert: 0,
          AnimalID: null,
          tab_index: 5,
          image: "/images/daily-alert/3.png",
        },
        {
          id: 4,
          title: "ตรวจระบบสืบพันธุ์หลังคลอด",
          alert: 5,
          tab_index: 11,
          AnimalID: null,
          image: "/images/daily-alert/4.png",
        },
        {
          id: 5,
          title: "อายุมากกว่ากำหนดแล้วยังไม่ได้ผสม",
          alert: 0,
          tab_index: 0,
          AnimalID: null,
          image: "/images/daily-alert/6.png",
        },
        {
          id: 6,
          title: "ไม่กลับสัดหลังผสมมากกว่า 90 วัน",
          alert: 0,
          tab_index: 0,
          AnimalID: null,
          image: "/images/daily-alert/5.png",
        },

        {
          id: 7,
          title: "ผสมซ้ำเกิน 3 ครั้งในรอบการตั้งท้องปัจจุบัน",
          alert: 0,
          tab_index: 0,
          AnimalID: null,
          image: "/images/daily-alert/7.png",
        },
        {
          id: 8,
          title: "เลยกำหนดคลอด",
          alert: 0,
          tab_index: 4,
          AnimalID: null,
          image: "/images/daily-alert/8.png",
        },
        {
          id: 9,
          title: "โครงการไทยแบล็ค",
          alert: 0,
          tab_index: 12,
          AnimalID: null,
          image: "/images/daily-alert/12.png",
        },
        {
          id: 10,
          title: "โครงการแดงสุราษฏร์",
          alert: 0,
          tab_index: 11,
          AnimalID: null,
          image: "/images/daily-alert/13.png",
        },
      ],
      controller: new AbortController(),
    };
  },
  watch: {
    //sort function
    sortby: function (val) {
      this.noti.sort((a, b) => {
        if (val == "desc") {
          return b.alert - a.alert;
        } else {
          return a.alert - b.alert;
        }
      });
    },
  },
  mounted() {
    this.load();
  },
  computed: {
    ...mapGetters({
      animal_id: "animal_id",
    }),
  },
  methods: {
    async load() {
      let search = null;
      if (this.animal_id == 1) {
        search = [1, 2];
      } else if (this.animal_id == 2) {
        search = [3, 4];
      } else if (this.animal_id == 3) {
        search = [17, 18];
      }

      await axios
        .get(`/animal/get-by-farm-id?AnimalTypeID=[${search}]`, {
          signal: this.controller.signal,
        })
        .then((response) => {
          this.noti[0].alert = response.data.noti.noti1;
          this.noti[0].AnimalID = response.data.noti.noti1Animal;
          this.noti[1].alert = response.data.noti.noti2;
          this.noti[1].AnimalID = response.data.noti.noti2Animal;
          this.noti[2].alert = response.data.noti.noti3;
          this.noti[2].AnimalID = response.data.noti.noti3Animal;
          this.noti[3].alert = response.data.noti.noti4;
          this.noti[3].AnimalID = response.data.noti.noti4Animal;
          this.noti[4].alert = response.data.noti.noti5;
          this.noti[4].AnimalID = response.data.noti.noti5Animal;
          this.noti[5].alert = response.data.noti.noti6;
          this.noti[5].AnimalID = response.data.noti.noti6Animal;
          this.noti[6].alert = response.data.noti.noti7;
          this.noti[6].AnimalID = response.data.noti.noti7Animal;
          this.noti[7].alert = response.data.noti.noti8;
          this.noti[7].AnimalID = response.data.noti.noti8Animal;
          for (let i in this.noti) {
            if (this.noti[i].alert == null) {
              this.noti[i].alert = 0;
            }
          }
          this.sortby = "desc";
        });
    },
    setAlert_AnimalID(id, title, name) {
      let data = {
        id: id,
        title: title,
        name: name,
      };
      store.dispatch("Alert_AnimalID", data);
    },
  },
};
</script>
