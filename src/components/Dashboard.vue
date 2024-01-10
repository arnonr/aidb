<template>
    <div>เลือกรายงาน</div>
</template>

<script>
import EventBus from "@/AppEventBus";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      data: [],
      localAnimal: null,
      curpage: 0,
      isLoading: false,
      valid: false,
      mom: null,
      young: null,
      child: null,
      child2: null,
      // Params
      params: {
        page: 1,
        size: 10,
      },
      table: {
        total: 0,
        last_page: 0,
      },
      permit: null,
      controller: new AbortController(),
      // products: null,
      // lineData: {
      // 	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      // 	datasets: [
      // 		{
      // 			label: 'Revenue',
      // 			data: [65, 59, 80, 81, 56, 55, 40],
      // 			fill: false,
      // 			backgroundColor: '#2f4860',
      // 			borderColor: '#2f4860',
      // 			tension: 0.4
      // 		},
      // 		{
      // 			label: 'Sales',
      // 			data: [28, 48, 40, 19, 86, 27, 90],
      // 			fill: false,
      // 			backgroundColor: '#00bb7e',
      // 			borderColor: '#00bb7e',
      // 			tension: 0.4
      // 		}
      // 	]
      // },
      // items: [
      // 	{ label: 'Add New', icon: 'pi pi-fw pi-plus' },
      // 	{ label: 'Remove', icon: 'pi pi-fw pi-minus' }
      // ],
      // lineOptions: null,
      //   data: [
      //     {
      //       1: "ศูนย์วิจัยฯ 01",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 02",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 03",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 04",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 05",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 06",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 07",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 08",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 09",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 10",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //     {
      //       1: "ศูนย์วิจัยฯ 11",
      //       2: "สุโขทัย",
      //       3: "20",
      //       4: "1,000",
      //       5: "250",
      //       6: "1,150",
      //       7: "1,120",
      //       8: "30",
      //       9: "2,000",
      //     },
      //   ],
    };
  },
  computed: {
    ...mapGetters({
      permission: "get_permission",
      animal_id: "animal_id",
      user: "user",
    }),
  },
  // productService: null,
  // themeChangeListener: null,
  mounted() {
  },
  beforeUnmount() {
    EventBus.off("change-theme", this.themeChangeListener);
  },
  created() {
   
  },
  methods: {
  },
};
</script>
