import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import auth from "./middleware/auth";
import animal from "./middleware/animal";
import menu_authorize from "@/middleware/menu_authorize";
import store from "./service/Vuex";
import Swal from "sweetalert2";

function IsAdmin({ from, next }) {
  if (store.state.user.GroupID === 1) {
    next();
  } else {
    Swal.fire({
      title: "ไม่มีสิทธิ์ในการเข้าถึงหน้านี้",
      text: "หากต้องการใช้งานกรุณาติดต่อผู้ดูแล",
      icon: "error",
      confirmButtonText: "ตกลง",
      timer: 6000,
    });
    if (from.name) {
      return next({ name: from.name });
    }
    next({ name: "gateway" });
  }
}
function IsAdminSub({ from, next }) {
  if (store.state.user.GroupID === 1 || store.state.user.GroupID === 2) {
    next();
  } else {
    Swal.fire({
      title: "ไม่มีสิทธิ์ในการเข้าถึงหน้านี้",
      text: "หากต้องการใช้งานกรุณาติดต่อผู้ดูแล",
      icon: "error",
      confirmButtonText: "ตกลง",
      timer: 6000,
    });
    if (from.name) {
      return next({ name: from.name });
    }
    next({ name: "gateway" });
  }
}
const routes = [
  {
    path: "/",
    name: "gateway",
    component: () => import("./pages/gateway.vue"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/",
    name: "app",
    component: App,
    meta: {
      middleware: [auth, animal],
    },
    children: [
      //  ทะเบียน===========================================================================
      {
        path: "/agency",
        children: [
          //  ทะเบียนสัตว์
          {
            path: "creature",
            name: "creature-search",
            component: () => import("./pages/creature/creature-search.vue"),
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(3, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
          },
          {
            path: "/creature/add",
            name: "addcreature",
            component: () => import("./pages/creature/creature-add.vue"),
          },
          {
            path: "/creature/edit/:id",
            name: "editcreature",
            component: () => import("./pages/creature/creature-edit.vue"),
          },
          {
            path: "/creaturebaby/add",
            name: "addcreaturebaby",
            component: () => import("./pages/creaturebaby/creature-add.vue"),
          },
          {
            path: "/creaturebaby/edit/:id",
            name: "editcreaturebaby",
            component: () => import("./pages/creaturebaby/creature-edit.vue"),
          },
          //  ทะเบียนฟาร์ม
          {
            path: "farm",
            name: "farmall",
            component: () => import("./pages/farm/AllFarm.vue"),
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(1, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
          },
          //  ทะเบียนหน่วยงาน
          {
            path: "",
            name: "agencyall",
            component: () => import("./pages/agency/agencyall.vue"),
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(1, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
          },
          //  ทะเบียนบุคลากร
          {
            path: "/personnel",
            name: "personnel",
            component: () => import("./pages/personnel/Personnel.vue"),
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(1, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
          },
          //  ทะเบียนเกษตรกร
          {
            path: "farmer",
            name: "agencyfarmer",
            component: () => import("./pages/farmerdata/famerdata.vue"),
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(2, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
          },
          //  ทะเบียนน้ำเชื้อ
          {
            path: "sperm",
            name: "sperm-all",
            component: () => import("./pages/sperm/sperm-all.vue"),
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(2, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
          },
          //  ทะเบียนตัวอ่อน
          {
            path: "embryo",
            name: "registration-embryo",
            component: () =>
              import("./pages/registration-embryo/AllRegEmbryo.vue"),
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(5, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
          },
        ],
      },

      //  ย้ายฝากตัวอ่อน======================================================================

      //  กำหนดโปรแกรมสำหรับแม่ตัวให้/ตัวรับ
      {
        path: "/embryo/setting",
        name: "mainsetting",
        component: () => import("./pages/mainsetting/SettingProgramAll.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(6, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  เตรียมแม่ตัวให้ (Donor ET)
      {
        path: "/embryo/donor",
        name: "maindonor",
        component: () => import("./pages/maindonor/DonorAll.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(7, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  บันทึกเก็บตัวอ่อน
      {
        path: "/embryo/embryo",
        name: "mainembryo",
        component: () => import("./pages/mainembryo/EmbryoAll.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(8, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  เตรียมแม่ตัวรับ (Recipient)
      {
        path: "/embryo/recipient",
        name: "mainrecipient",
        component: () => import("./pages/mainrecipient/RecipientAll.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(9, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },

      //  ย้ายฝากตัวอ่อน
      {
        path: "/embryo/transfer",
        name: "maintransfer",
        component: () => import("./pages/maintransfer/TransferAll.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(10, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      {
        path: "/embryo/transfer/add",
        name: "maintransferadd",
        component: () => import("./pages/maintransfer/TransferAdd.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(10, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      {
        path: "/embryo/transfer/edit/:id",
        name: "maintransferedit",
        component: () => import("./pages/maintransfer/TransferEdit.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(10, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },

      //ย้ายฝากตัวอ่อน
      {
        path: "/embryo/donor/add",
        name: "donor",
        props: true,
        component: () => import("./pages/maindonor/AddDonor.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(7, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },

      {
        path: "/embryo/donor/add2/:id",
        name: "donor2",
        component: () => import("./pages/maindonor/AddDonor2.vue"),
        props: true,
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(7, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      {
        path: "/embryo/Recipient",
        name: "Recipient",
        component: () => import("./pages/mainrecipient/RecipientAll.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(9, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      {
        path: "/embryo/Recipient/add",
        name: "Recipient1",
        component: () => import("./pages/mainrecipient/AddRecipient.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(9, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      {
        path: "/embryo/Recipient/add2/:id",
        name: "Recipient2",
        component: () => import("./pages/mainrecipient/AddRecipient2.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(9, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      {
        path: "/embryo/embryo/add",
        name: "mainembryoadd",
        component: () => import("./pages/mainembryo/EmbryoAdd.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(8, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      {
        path: "/embryo/embryo/edit/:id",
        name: "mainembryoedit",
        component: () => import("./pages/mainembryo/EmbryoEdit.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(8, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },

      // {
      //   path: "/dashboard/register",
      //   name: "dashboard-register",
      //   component: () => import("./components/Dashboard.vue"),
      // },
      // {
      //   path: "/dashboard/embryo",
      //   name: "dashboard-embryo",
      //   component: () => import("./components/Dashboard.vue"),
      // },
      // {
      //   path: "/dashboard/artificial",
      //   name: "dashboard-artificial",
      //   component: () => import("./components/Dashboard.vue"),
      // },
      // {
      //   path: "/dashboard/project",
      //   name: "dashboard-project",
      //   component: () => import("./components/Dashboard.vue"),
      // },
      // {
      //   path: "/dashboard/report",
      //   name: "dashboard-report",
      //   component: () => import("./components/Dashboard.vue"),
      // },

      //  เจ้าหน้าที่ผสมเทียม=========================================================
      {
        path: "/activity",
        children: [
          //  ข้อมูลฟาร์ม
          {
            path: "farm_info",
            name: "farm-info",
            component: () => import("./pages/farm_info/farm_info.vue"),
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(11, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
          },
          //  ข้อมูลสัตว์
          {
            path: "creature_info",
            name: "creature_info",
            component: () => import("./pages/farm_info/animal_info.vue"),
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(12, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
          },
          //  ข้อมูลสัตว์
          {
            path: "creature_info_detail",
            name: "creature_info_detail",
            component: () => import("./pages/creature_info/creature_info.vue"),
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(12, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
          },
          //  แจ้งเตือนรายวัน
          {
            path: "daily-alert",
            name: "daily-alert",
            component: () => import("./pages/daily-alert/daily-alert.vue"),
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(13, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
          },
          //  แจ้งเตือนรายวัน-สัตว์
          {
            path: "daily-alert/show",
            name: "daily-alert-show",
            component: () => import("./pages/daily-alert/show.vue"),
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(13, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
          },
          //  การจัดเก็บข้อมูลการขุน/อาหาร
          {
            path: "food",
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(14, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
            children: [
              {
                path: "",
                name: "food",
                component: () => import("./pages/food/Food.vue"),
              },

              {
                path: "add/:id",
                name: "addfood",
                component: () => import("./pages/food/FoodAdd.vue"),
              },
              {
                path: "add1",
                name: "add1",
                component: () => import("./pages/food/FoodGrowUp.vue"),
              },
              {
                path: "progress/:id",
                name: "progressfood",
                component: () => import("./pages/food/FoodProgress.vue"),
              },
              {
                path: "edit/:id",
                name: "editfood",
                component: () => import("./pages/food/FoodEdit.vue"),
              },
              {
                path: "tmr",
                name: "tmrfood",
                component: () => import("./pages/food/FoodTMR.vue"),
              },
            ],
          },
          //  ฉีดวัคซีน
          {
            path: "vaccine",
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(15, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
            children: [
              {
                path: "",
                name: "vaccuine",
                component: () => import("./pages/vaccine/Vaccine.vue"),
              },
              {
                path: "add/:id/:farm",
                name: "vaccuineadd",
                component: () => import("./pages/vaccine/VaccineAdd.vue"),
              },
              {
                path: "edit/:id",
                name: "vaccuineedit",
                component: () => import("./pages/vaccine/VaccineEdit.vue"),
              },
              {
                path: "view/:id",
                name: "vaccuineview",
                component: () => import("./pages/vaccine/VaccineView.vue"),
              },
              // {
              //   path: "add",
              //   name: "vaccuineaddnoid",
              //   component: () => import("./pages/vaccine/VaccineAdd.vue"),
              // },
            ],
          },
          //  ตรวจโรค
          {
            path: "diagnose",
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(16, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
            children: [
              {
                path: "",
                name: "all-diagnose",
                component: () => import("./pages/diagnose/AllDiagnose.vue"),
              },
              {
                path: "view/:id",
                name: "view-diagnose",
                component: () => import("./pages/diagnose/ViewDiagnose.vue"),
              },
              {
                path: "add/:id/:farm",
                name: "add-diagnose",
                component: () => import("./pages/diagnose/AddDiagnose.vue"),
              },
              {
                path: "edit/:id",
                name: "edit-diagnose",
                component: () => import("./pages/diagnose/EditDiagnose.vue"),
              },
            ],
          },
          //  การรักษา
          {
            path: "treatment",
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(1, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
            children: [
              {
                path: "",
                name: "all-treatment",
                component: () => import("./pages/treatment/AllDiagnose.vue"),
              },
              {
                path: "add/:id/:farm",
                name: "add-treatment",
                component: () => import("./pages/treatment/AddDiagnose.vue"),
              },
            ],
          },
          //  ถ่ายพยาธิ
          {
            path: "deworm",
            beforeEnter: async (to, from, next) => {
              let authorize = await menu_authorize(17, "IsPreview", {
                from,
                next,
              });
              if (authorize) {
                return authorize;
              }
              return next();
            },
            children: [
              {
                path: "",
                name: "all-deworm",
                component: () => import("./pages/deworm/AllDeworm.vue"),
              },
              {
                path: "view/:id",
                name: "view-deworm",
                component: () => import("./pages/deworm/ViewDeworm.vue"),
              },
              {
                path: "add/:id/:farm",
                name: "add-deworm",
                component: () => import("./pages/deworm/AddDeworm.vue"),
              },
              {
                path: "edit/:id",
                name: "edit-deworm",
                component: () => import("./pages/deworm/EditDeworm.vue"),
              },
            ],
          },
        ],
      },

      //  ระบบโครงการ=============================================================
      {
        path: "/project/detail",
        name: "project-detail",
        component: () => import("./pages/project/project-detail.vue"),
      }, 
      {
        path: "/project/detail-animal",
        name: "project-detail-animal",
        component: () => import("./pages/project/project-detail-animal.vue"),
      },    
      {
        path: "/project/detail-diary",
        name: "project-detail-diary",
        component: () => import("./pages/project/project-detail-diary.vue"),
      },    
      {
        path: "/project/thaiblack",
        name: "thaiblack",
        component: () => import("./pages/project/thaiblack.vue"),
      },
      {
        path: "/project/redgoat",
        name: "redgoat",
        component: () => import("./pages/project/redgoat.vue"),
      },
      {
        path: "/project/artificial/add",
        name: "project-artificial-add",
        component: () => import("./pages/project/project-artificial-add.vue"),
      },
      {
        path: "/project/creature/add",
        name: "project-creature-add",
        component: () => import("./pages/project/project-creature-add.vue"),
      },
      {
        path: "/project/farm/add",
        name: "project-farm-add",
        component: () => import("./pages/project/project-farm-add.vue"),
      },

      //  รายงาน==================================================================
      //  หห้าแรกรายงาน
      {
        path: "/agency/dashboard",
        name: "dashboard",
        component: () => import("./components/Dashboard.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await menu_authorize(1, "IsPreview", { from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      // รายงาน
      {
        path: "/report",
        children: [
          {
            path: "aipt6",
            name: "aipt6",
            component: () => import("./pages/report/AIPT6.vue"),
          },
          {
            path: "animalbreed",
            name: "animalbreed",
            component: () => import("./pages/report/AnimalBreed.vue"),
          },
          {
            path: "FarmReport",
            name: "FarmReport",
            component: () => import("./pages/report/FarmReport.vue"),
          },
          {
            path: "Total_Animal",
            name: "Total_Animal",
            component: () => import("./pages/report/Total_Animal.vue"),
          },
          {
            path: "farm",
            name: "farm",
            component: () => import("./pages/report/Farm.vue"),
          },
          {
            path: "breeder",
            name: "breeder",
            component: () => import("./pages/report/Breeder.vue"),
          },
          {
            path: "history_registration",
            name: "history_registration",
            component: () => import("./pages/report/HistoryRegistration.vue"),
          },
          {
            path: "pt6",
            name: "pt6",
            component: () => import("./pages/report/PT6.vue"),
          },
          {
            path: "pregnancy",
            name: "pregnancy",
            component: () => import("./pages/report/Pregnancy.vue"),
          },
          {
            path: "pregnancy1",
            name: "pregnancy1",
            component: () => import("./pages/report/Pregnancy2.vue"),
          },
          {
            path: "pregnancy2",
            name: "pregnancy2",
            component: () => import("./pages/report/Pregnancy1.vue"),
          },
          {
            path: "pregnancy3",
            name: "pregnancy3",
            component: () => import("./pages/report/Pregnancy3.vue"),
          },
          {
            path: "birth",
            name: "birth",
            component: () => import("./pages/report/Birth.vue"),
          },
          {
            path: "preg30",
            name: "preg30",
            component: () => import("./pages/report/Preg30.vue"),
          },
          {
            path: "born",
            name: "born",
            component: () => import("./pages/report/Born.vue"),
          },
          {
            path: "semen",
            name: "reportsemen",
            component: () => import("./pages/report/Semen.vue"),
          },
          {
            path: "embryo",
            name: "reportembryo",
            component: () => import("./pages/report/Embryo.vue"),
          },
          {
            path: "work",
            name: "reportwork",
            component: () => import("./pages/report/Work.vue"),
          },
          {
            path: "conceive",
            name: "reportconceive",
            component: () => import("./pages/report/Conceive.vue"),
          },
          {
            path: "growup",
            name: "reportgrowup",
            component: () => import("./pages/report/Growup.vue"),
          },
          {
            path: "mating",
            name: "reportmating",
            component: () => import("./pages/report/Mating.vue"),
          },
          {
            path: "young",
            name: "reportyoung",
            component: () => import("./pages/report/Young.vue"),
          },
          {
            path: "reproduce",
            name: "reportreproduce",
            component: () => import("./pages/report/ReproduceCheckup.vue"),
          },
          {
            path: "CheckupDue",
            name: "checkupdue",
            component: () => import("./pages/report/CheckupDue.vue"),
          },
          {
            path: "TotalPreg",
            name: "TotalPregReport",
            component: () => import("./pages/report/TotalPreg.vue"),
          },
        ],
      },
      //  ผู้ดูแล=================================================================
      //  ข้อมูลภาพรวม (monitor)
      {
        path: "/setting/dashboard",
        name: "setting-dashboard",
        component: () => import("./pages/dashboard/dashboard-setting.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await IsAdmin({ from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  จัดการผู้ใช้งาน
      {
        path: "/setting/users",
        name: "users",
        component: () => import("./pages/users/Users.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await IsAdmin({ from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  จัดการผู้ใช้งาน
      {
        path: "/setting/usersfarmer",
        name: "usersfarmer",
        component: () => import("./pages/users/Usersfarmer.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await IsAdmin({ from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  ตรวจสอบเวลาการเข้าใช้งาน
      {
        path: "/setting/loglogin",
        name: "loglogin",
        component: () => import("./pages/users/Loglogin.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await IsAdmin({ from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  จัดการผู้ใช้งาน
      {
        path: "/setting/manage_users",
        name: "manage_users",
        component: () => import("./pages/users/Users.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await IsAdminSub({ from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  จัดการกลุ่มผู้ใช้งาน
      {
        path: "/setting/group",
        name: "group",
        component: () => import("./pages/groups/Groups.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await IsAdmin({ from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  จัดการกลุ่มผู้ใช้งาน-จัดการสิทธิ์
      {
        path: "/setting/group/authorizes/:group_id",
        name: "group_authorizes",
        component: () =>
          import("./pages/group_authorizes/Group_authorizes.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await IsAdmin({ from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      // ข่าวสาร
      {
        path: "/setting/news",
        name: "all-news",
        component: () => import("./pages/news/AllNews.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await IsAdmin({ from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  แจ้งขอทำบัตร
      {
        path: "/requestcard",
        name: "requestcard",
        component: () => import("./pages/requestcard/requestcard.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await IsAdmin({ from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  จัดการโครงการ
      {
        path: "/project/all",
        name: "project-all",
        component: () => import("./pages/project/project-all.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await IsAdmin({ from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  ตรวจสอบโครงการ
      {
        path: "/project/view",
        name: "project-view",
        component: () => import("./pages/project/project-view.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await IsAdmin({ from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  ตั้งเป้าหมายโครงการ
      {
        path: "/project/goal",
        name: "goal",
        component: () => import("./pages/project/goal.vue"),
        beforeEnter: async (to, from, next) => {
          let authorize = await IsAdmin({ from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
      },
      //  ข้อมูลพื้นฐาน
      {
        path: "/user_center",
        beforeEnter: async (to, from, next) => {
          let authorize = await IsAdmin({ from, next });
          if (authorize) {
            return authorize;
          }
          return next();
        },
        children: [
          {
            path: "production_status",
            name: "production_status",
            component: () =>
              import("./pages/user_center/basic_config/production_status.vue"),
          },
          {
            path: "cow_status",
            name: "cow_status",
            component: () =>
              import("./pages/user_center/basic_config/cow_status.vue"),
          },
          {
            path: "production_status",
            name: "production_status",
            component: () =>
              import("./pages/user_center/basic_config/production_status.vue"),
          },
          {
            path: "cow_status",
            name: "cow_status",
            component: () =>
              import("./pages/user_center/basic_config/cow_status.vue"),
          },
          {
            path: "cow_source",
            name: "cow_source",
            component: () =>
              import("./pages/user_center/basic_config/cow_source.vue"),
          },
          {
            path: "culling_status",
            name: "culling_status",
            component: () =>
              import("./pages/user_center/basic_config/culling_status.vue"),
          },
          {
            path: "culling_cause",
            name: "culling_cause",
            component: () =>
              import("./pages/user_center/basic_config/culling_cause.vue"),
          },
          {
            path: "animal_type",
            name: "animal_type",

            component: () =>
              import("./pages/user_center/basic_config/animal_type.vue"),
          },
          {
            path: "breed_type",
            name: "breed_type",
            component: () =>
              import("./pages/user_center/basic_config/breed_type.vue"),
          },
          {
            path: "farm_type",
            name: "farm_type",
            component: () =>
              import("./pages/user_center/basic_config/farm_type.vue"),
          },
          {
            path: "zone",
            name: "zone",
            component: () =>
              import("./pages/user_center/basic_config/zone.vue"),
          },
          {
            path: "ai_zone",
            name: "ai_zone",
            component: () =>
              import("./pages/user_center/basic_config/ai_zone.vue"),
          },
          {
            path: "education",
            name: "education",
            component: () =>
              import("./pages/user_center/basic_config/education.vue"),
          },
          {
            path: "organization_type",
            name: "organization_type",
            component: () =>
              import("./pages/user_center/basic_config/organization_type.vue"),
          },
          {
            path: "position",
            name: "position",
            component: () =>
              import("./pages/user_center/basic_config/position.vue"),
          },
          {
            path: "duty",
            name: "duty",
            component: () =>
              import("./pages/user_center/basic_config/duty.vue"),
          },
          {
            path: "academy_major",
            ame: "academy_major",

            component: () =>
              import("./pages/user_center/basic_config/academy_major.vue"),
          },
          {
            path: "embryo_stages",
            name: "embryo_stages",
            component: () =>
              import("./pages/user_center/basic_config/embryo_stages.vue"),
          },
          // {
          //   path: "hormone",
          //   name: "hormone",
          //   component: () => import("./pages/user_center/basic_config/hormone.vue"),
          // },
          {
            path: "give_birth_type",
            name: "give_birth_type",
            component: () =>
              import("./pages/user_center/basic_config/give_birth_type.vue"),
          },
          {
            path: "country",
            name: "country",
            component: () =>
              import("./pages/user_center/basic_config/country.vue"),
          },
          {
            path: "region",
            name: "region",
            component: () =>
              import("./pages/user_center/basic_config/region.vue"),
          },
          {
            path: "province",
            name: "province",
            component: () =>
              import("./pages/user_center/basic_config/province.vue"),
          },
          {
            path: "amphur",
            name: "amphur",
            component: () =>
              import("./pages/user_center/basic_config/amphur.vue"),
          },
          {
            path: "tumbol",
            name: "tumbol",
            component: () =>
              import("./pages/user_center/basic_config/tumbol.vue"),
          },
          {
            path: "gender",
            name: "gender",
            component: () =>
              import("./pages/user_center/basic_config/gender.vue"),
          },
          {
            path: "title",
            name: "title",
            component: () =>
              import("./pages/user_center/basic_config/title.vue"),
          },
          {
            path: "education",
            name: "education",
            component: () =>
              import("./pages/user_center/basic_config/education.vue"),
          },
          {
            path: "occupation",
            name: "occupation",
            component: () =>
              import("./pages/user_center/basic_config/occupation.vue"),
          },

          {
            path: "organization",
            name: "organization",
            component: () =>
              import("./pages/user_center/basic_config/organization.vue"),
          },
          {
            path: "animalsex",
            name: "animalsex",
            component: () =>
              import("./pages/user_center/basic_config/animalsex.vue"),
          },
          {
            path: "animalgenre",
            name: "animalgenre",
            component: () =>
              import("./pages/user_center/basic_config/animalgenre.vue"),
          },
          {
            path: "animalgrouptype",
            name: "animalgrouptype",
            component: () =>
              import("./pages/user_center/basic_config/animalgrouptype.vue"),
          },

          {
            path: "farmstatus",
            name: "farmstatus",
            component: () =>
              import("./pages/user_center/basic_config/farmstatus.vue"),
          },
          {
            path: "marriedstatus",
            name: "marriedstatus",
            component: () =>
              import("./pages/user_center/basic_config/marriedstatus.vue"),
          },
          {
            path: "positiontype",
            name: "positiontype",
            component: () =>
              import("./pages/user_center/basic_config/positiontype.vue"),
          },
          {
            path: "bcs",
            name: "bcs",
            component: () => import("./pages/user_center/basic_config/bcs.vue"),
          },
          {
            path: "gundepth",
            name: "gundepth",
            component: () =>
              import("./pages/user_center/basic_config/gundepth.vue"),
          },
          {
            path: "pregnancycheckmethod",
            name: "pregnancycheckmethod",
            component: () =>
              import(
                "./pages/user_center/basic_config/pregnancycheckmethod.vue"
              ),
          },
          {
            path: "pregnancycheckstatus",
            name: "pregnancycheckstatus",
            component: () =>
              import(
                "./pages/user_center/basic_config/pregnancycheckstatus.vue"
              ),
          },
          {
            path: "abortresult",
            name: "abortresult",
            component: () =>
              import("./pages/user_center/basic_config/abortresult.vue"),
          },
          {
            path: "givebirthhelp",
            name: "givebirthhelp",
            component: () =>
              import("./pages/user_center/basic_config/givebirthhelp.vue"),
          },
          {
            path: "transfermethod",
            name: "transfermethod",
            component: () =>
              import("./pages/user_center/basic_config/transfermethod.vue"),
          },
          {
            path: "goatestralactivity",
            name: "goatestralactivity",
            component: () =>
              import("./pages/user_center/basic_config/goatestralactivity.vue"),
          },
          {
            path: "presetactivity",
            name: "presetactivity",
            component: () =>
              import("./pages/user_center/basic_config/presetactivity.vue"),
          },
          {
            path: "distributions",
            name: "user_centerdistributions",
            component: () =>
              import("./pages/user_center/basic_config/distributions.vue"),
          },
          {
            path: "roughages",
            name: "roughages",
            component: () =>
              import("./pages/user_center/basic_config/roughages.vue"),
          },
          {
            path: "concentrate",
            name: "concentrate",
            component: () =>
              import("./pages/user_center/basic_config/concentrate.vue"),
          },

          {
            path: "disease",
            name: "disease",
            component: () =>
              import("./pages/user_center/basic_config/disease.vue"),
          },

          {
            path: "diseasemethod",
            name: "diseasemethod",
            component: () =>
              import("./pages/user_center/basic_config/diseasemethod.vue"),
          },
          {
            path: "diseaseresult",
            name: "diseaseresult",
            component: () =>
              import("./pages/user_center/basic_config/diseaseresult.vue"),
          },
          {
            path: "vaccineobjective",
            name: "vaccineobjective",
            component: () =>
              import("./pages/user_center/basic_config/vaccineobjective.vue"),
          },
          {
            path: "vaccine",
            name: "vaccine",
            component: () =>
              import("./pages/user_center/basic_config/vaccine.vue"),
          },
          {
            path: "dewormmedicine",
            name: "dewormmedicine",
            component: () =>
              import("./pages/user_center/basic_config/dewormmedicine.vue"),
          },
          {
            path: "heattype",
            name: "heattype",
            component: () =>
              import("./pages/user_center/basic_config/heattype.vue"),
          },
          {
            path: "heatcircle",
            name: "heatcircle",
            component: () =>
              import("./pages/user_center/basic_config/heatcircle.vue"),
          },
          {
            path: "ovarysymptom",
            name: "ovarysymptom",
            component: () =>
              import("./pages/user_center/basic_config/ovarysymptom.vue"),
          },
          {
            path: "vaginasymptom",
            name: "vaginasymptom",
            component: () =>
              import("./pages/user_center/basic_config/vaginasymptom.vue"),
          },
          {
            path: "othersymptom",
            name: "othersymptom",
            component: () =>
              import("./pages/user_center/basic_config/othersymptom.vue"),
          },
          {
            path: "causeanimal",
            name: "causeanimal",
            component: () =>
              import("./pages/user_center/basic_config/causeanimal.vue"),
          },
          {
            path: "causeenvironment",
            name: "causeenvironment",
            component: () =>
              import("./pages/user_center/basic_config/causeenvironment.vue"),
          },
          {
            path: "causefeeder",
            name: "causefeeder",
            component: () =>
              import("./pages/user_center/basic_config/causefeeder.vue"),
          },
          {
            path: "causehealth",
            name: "causehealth",
            component: () =>
              import("./pages/user_center/basic_config/causehealth.vue"),
          },
          {
            path: "curehormone",
            name: "curehormone",
            component: () =>
              import("./pages/user_center/basic_config/curehormone.vue"),
          },
          {
            path: "cureantibiotic",
            name: "cureantibiotic",
            component: () =>
              import("./pages/user_center/basic_config/cureantibiotic.vue"),
          },
          {
            path: "curevitamin",
            name: "curevitamin",
            component: () =>
              import("./pages/user_center/basic_config/curevitamin.vue"),
          },
          {
            path: "reproducesuggestion",
            name: "reproducesuggestion",
            component: () =>
              import(
                "./pages/user_center/basic_config/reproducesuggestion.vue"
              ),
          },
        ],
      },
      //  อื่นๆ==================================================================
      //  ข้อมูลส่วนตัว
      {
        path: "/profile",
        name: "profile",
        component: () => import("./pages/profile.vue"),
      },
      //  ยังไม่ได้แยก=================================================================
      {
        path: "/farm/info/:id",
        name: "farm-information",
        component: () => import("./pages/farm/FarmInfo.vue"),
      },
      {
        path: "",
        name: "addfarm",
        component: () => import("./pages/farm/AddFarm.vue"),
        children: [
          {
            path: "/farm/farm-info",
            name: "farminfo",
            component: () => import("./components/form/farm/FormInfo.vue"),
          },
          {
            path: "/farm/farmer-info",
            name: "farmerinfo",
            component: () => import("./components/form/farm/FormFarmer.vue"),
          },
        ],
      },
      {
        path: "/farm/edit/:id",
        name: "edit-farm",
        component: () => import("./pages/farm/EditFarm.vue"),
        children: [
          {
            path: "",
            name: "edit-farminfo",
            component: () => import("./components/form/farm/EditFormInfo.vue"),
          },
          {
            path: "/farm/edit/farmer-info/:id",
            name: "edit-farmerinfo",
            component: () =>
              import("./components/form/farm/EditFormFarmer.vue"),
          },
        ],
      },
      {
        path: "/farm/move/:id",
        name: "move-farm",
        component: () => import("./pages/farm/MoveFarm.vue"),
        children: [
          {
            path: "",
            name: "move-formpoint",
            component: () =>
              import("./components/form/farm/move/FormPoint.vue"),
          },
          {
            path: "form-farm",
            name: "move-formfarm",
            component: () => import("./components/form/farm/move/FormFarm.vue"),
          },
        ],
      },

      //-----------Eed อาร์ม-----------//

      //-----------Start อาจารย์เดียร์-----------//

      //1.2.4 เมนูแท้ง
      {
        path: "/activity/abortion",
        name: "abortionall",
        component: () => import("./pages/abortion/AllAbortion.vue"),
      },
      //1.2.5 เมนูคลอด
      {
        path: "/activity/birth",
        name: "birthall",
        component: () => import("./pages/birth/AllBirth.vue"),
      },

      //1.2 ติดตามงานโครงการ
      {
        path: "/followproject",
        name: "followproject",
        component: () => import("./pages/followproject/FollowProjectAll.vue"),
      },
      {
        path: "/report/history",
        name: "history",
        component: () => import("./pages/report/History.vue"),
      },

      {
        path: "/activity/distribution",
        name: "distribution",
        component: () => import("./pages/distribution/Distribution.vue"),
      },
      {
        path: "/activity/distribution/add/:id/:farm",
        name: "distributionadd",
        component: () => import("./pages/distribution/DistributionAdd.vue"),
      },
      // {
      //   path: "/activity/distribution/edit/:id",
      //   name: "distributionedit",
      //   component: () => import("./pages/distribution/DistributionEdit.vue"),
      // },
      // {
      //   path: "/activity/distribution/view/:id",
      //   name: "distributionview",
      //   component: () => import("./pages/distribution/DistributionView.vue"),
      // },

      //-----------Eed อาจารย์เดียร์-----------//

      //-----------Start เก้า-----------//

      {
        path: "activity/reproduce",
        name: "reproduce",
        component: () => import("./pages/reproduce/AllReproduce.vue"),
      },
      {
        path: "activity/embryo",
        name: "embryo",
        component: () => import("./pages/embryo/AllEmbryo.vue"),
      },
      {
        path: "activity/afterbirth",
        name: "afterbirth",
        component: () => import("./pages/afterbirth/AllAfterbirth.vue"),
      },
      {
        path: "activity/bcsscore",
        name: "bcsscore",
        component: () => import("./pages/bcsscore/AllBcsscore.vue"),
      },
      {
        path: "activity/growup",
        name: "growup",
        component: () => import("./pages/growup/AllGrowup.vue"),
      },
      {
        path: "/activity/artificial-hs",
        name: "artificial-hs",
        component: () => import("./pages/artificial-hs/AllArtificial-hs.vue"),
      },

      //-----------End เก้า-----------//

      //-----------Start โอมเล็ก-----------//
      // โครงการ

      // {
      //   path: "",
      //   name: "move-creature",
      //   component: () => import("./pages/creature/creature-move.vue"),
      //   children: [
      //     {
      //       path: "/creature/move/step1",
      //       name: "move-creature-1",
      //       component: () =>
      //         import("./components/form/creature/move/FormStep1.vue"),
      //     },
      //     {
      //       path: "/creature/move/step2",
      //       name: "move-creature-2",
      //       component: () =>
      //         import("./components/form/creature/move/FormStep2.vue"),
      //     },
      //   ],
      // },

      // 1.1.7

      // 1.2.13
      {
        path: "activity/feed-profile/all",
        name: "feed-profile-all",
        component: () => import("./pages/feed-profile/feed-profile-all.vue"),
      },
      // {
      //   path: "",
      //   name: "addfeed-profile",
      //   component: () => import("./pages/feed-profile/feed-profile-add.vue"),
      //   children: [
      //  {
      //    path: "activity/feed-profile/add",
      //    name: "addfeed-profile-info",
      //    component: () => import("./components/form/feed-profile/add/FormStep0.vue"),
      //  },
      //  {
      //    path: "activity/feed-profile/add/step1",
      //    name: "addfarm-info",
      //    component: () => import("./components/form/feed-profile/add/FormStep1.vue"),
      //  },
      //  {
      //    path: "activity/feed-profile/add/step2",
      //    name: "addfeed-profile-detail",
      //    component: () => import("./components/form/feed-profile/add/FormStep2.vue"),
      //  },
      //   ],
      // },
      // {
      //   path: "",
      //   name: "editfeed-profile",
      //   component: () => import("./pages/feed-profile/feed-profile-edit.vue"),
      //   children: [
      //  {
      //    path: "activity/feed-profile/edit",
      //    name: "editfeed-profile-info",
      //    component: () => import("./components/form/feed-profile/edit/FormStep0.vue"),
      //  },
      //  {
      //    path: "activity/feed-profile/edit/step1",
      //    name: "editfarm-info",
      //    component: () => import("./components/form/feed-profile/edit/FormStep1.vue"),
      //  },
      //  {
      //    path: "activity/feed-profile/edit/step2",
      //    name: "editfeed-profile-detail",
      //    component: () => import("./components/form/feed-profile/edit/FormStep2.vue"),
      //  },
      //   ],
      // },
      // 1.2.10-11
      {
        path: "/activity/artificial",
        name: "artificial-all",
        component: () => import("./pages/artificial/artificial-all.vue"),
      },
      // {
      //   path: "",
      //   name: "addartificial",
      //   component: () => import("./pages/artificial/artificial-add.vue"),
      //   children: [
      //     {
      //       path: "/activity/artificial/add",
      //       name: "addartificial-info",
      //       component: () =>
      //         import("./components/form/artificial/add/form-step1.vue"),
      //     },
      //     {
      //       path: "/activity/artificial/add/step1",
      //       name: "addartificial-farm-info",
      //       component: () =>
      //         import("./components/form/artificial/add/FormStep2.vue"),
      //     },
      //     {
      //       path: "/activity/artificial/add/step2",
      //       name: "addartificial-detail",
      //       component: () =>
      //         import("./components/form/artificial/add/FormStep3.vue"),
      //     },
      //   ],
      // },
      // {
      //   path: "",
      //   name: "editartificial",
      //   component: () => import("./pages/artificial/artificial-edit.vue"),
      //   children: [
      //     {
      //       path: "/activity/artificial/edit",
      //       name: "editartificial-info",
      //       component: () =>
      //         import("./components/form/artificial/edit/form-step1.vue"),
      //     },
      //     {
      //       path: "/activity/artificial/edit/step1",
      //       name: "editartificial-farm-info",
      //       component: () =>
      //         import("./components/form/artificial/edit/FormStep2.vue"),
      //     },
      //     {
      //       path: "/activity/artificial/edit/step2",
      //       name: "editartificial-detail",
      //       component: () =>
      //         import("./components/form/artificial/edit/FormStep3.vue"),
      //     },
      //   ],
      // },

      // 1.2.3
      {
        path: "activity/pregnancy",
        name: "pregnancy-all",
        component: () => import("./pages/pregnancy/pregnancy-all.vue"),
      },
      // 1.2.8
      {
        path: "activity/weaning",
        name: "weaning-all",
        component: () => import("./pages/weaning/weaning-all.vue"),
      },

      //-----------End โอมเล็ก-----------//

      {
        path: "/cart",
        name: "cart",
        component: () => import("./pages/Cart.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/Login.vue"),
  },
  {
    path: "/regis",
    name: "register",
    component: () => import("./pages/register.vue"),
    children: [
      {
        path: "/register",
        name: "register-id",
        component: () => import("./components/form/register/register1.vue"),
      },
      {
        path: "/register/personal",
        name: "register-personal",
        component: () => import("./components/form/register/register2.vue"),
      },
      {
        path: "/register/info",
        name: "register-info",
        component: () => import("./components/form/register/register3.vue"),
      },
    ],
  },
  {
    path: "/register-personnel",
    name: "register-personnel",
    component: () => import("./pages/RegisterPersonnel.vue"),
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: () => import("./pages/reset-password.vue"),
  },
  {
    path: "/new-password",
    name: "new-password",
    component: () => import("./components/form/reset-password/resetpwd2.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("./pages/Error.vue"),
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("./pages/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line no-prototype-builtins
  if (to.meta.hasOwnProperty("middleware")) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };

    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  } else {
    return next();
  }
});

export default router;
