export default [
  {
    label: "เมนูรายการ",
    items: [
      {
        label: "ทะเบียน",
        icon: "pi pi-fw pi-folder-open",
        category: "registration",
        items: [
          {
            label: "ทะเบียนฟาร์ม (ผท.3)",
            icon: "pi pi-fw pi-circle",
            to: "/agency/farm",
          },
          {
            label: "ทะเบียนสัตว์ (ผท.1)",
            icon: "pi pi-fw pi-circle",
            to: "/agency/creature",
          },
          {
            label: "สืบค้นทะเบียนน้ำเชื้อ",
            icon: "pi pi-fw pi-circle",
            to: "/agency/sperm",
          },
          {
            label: "สืบค้นทะเบียนตัวอ่อน",
            icon: "pi pi-fw pi-circle",
            to: "/agency/embryo",
          },
          {
            label: "ทะเบียนเกษตรกร",
            icon: "pi pi-fw pi-circle",
            to: "/agency/farmer",
          },
          {
            label: "ทะเบียนบุคลากร",
            icon: "pi pi-fw pi-circle",
            to: "/personnel",
          },
          {
            label: "จัดการผู้ใช้งาน (สำหรับแอดมิน)",
            icon: "pi pi-fw pi-circle",
            to: "/setting/manage_users",
          },
        ],
      },
      {
        label: "เจ้าหน้าที่ผสมเทียม",
        icon: "pi pi-fw pi-user",
        category: "activity",
        items: [
          {
            label: "ข้อมูลฟาร์ม",
            icon: "pi pi-fw pi-circle",
            to: "/activity/farm_info",
          },
          {
            label: "ข้อมูลสัตว์",
            icon: "pi pi-fw pi-circle",
            to: "/activity/creature_info",
          },
          {
            label: "แจ้งเตือนรายวัน",
            icon: "pi pi-fw pi-circle",
            to: "/activity/daily-alert",
          },

          {
            label: "การจัดเก็บข้อมูลการขุน/อาหาร",
            icon: "pi pi-fw pi-circle",
            to: "/activity/food",
          },
          // {
          //   label: "การคัดจำหน่ายแบบหลายตัว",
          //   icon: "pi pi-fw pi-circle",
          //   to: "/activity/distribution",
          // },
          {
            label: "สุขภาพ",
            icon: "pi pi-fw pi-circle",
            items: [
              {
                label: "ฉีดวัคซีน",
                icon: "pi pi-minus",
                to: "/activity/vaccine",
              },
              {
                label: "ตรวจโรค",
                icon: "pi pi-minus",
                to: "/activity/diagnose",
              },
              {
                label: "การรักษา",
                icon: "pi pi-minus",
                to: "/activity/treatment",
              },
              {
                label: "ถ่ายพยาธิ",
                icon: "pi pi-minus",
                to: "/activity/deworm",
              },
            ],
          },
        ],
      },
      {
        label: "ย้ายฝากตัวอ่อน",
        icon: "pi pi-fw pi-sort-alt",
        category: "embryo_transfer",
        items: [
          {
            label: "กำหนดโปรแกรมสำหรับแม่ตัวให้/ตัวรับ",
            icon: "pi pi-fw pi-circle",
            to: "/embryo/setting",
          },
          {
            label: "เตรียมแม่ตัวให้ (Donor ET)",
            icon: "pi pi-fw pi-circle",
            to: "/embryo/donor",
          },
          {
            label: "บันทึกเก็บตัวอ่อน",
            icon: "pi pi-fw pi-circle",
            to: "/embryo/embryo",
          },
          {
            label: "เตรียมแม่ตัวรับ (Recipient)",
            icon: "pi pi-fw pi-circle",
            to: "/embryo/recipient",
          },

          {
            label: "ย้ายฝากตัวอ่อน",
            icon: "pi pi-fw pi-circle",
            to: "/embryo/transfer",
          },
        ],
      },
      {
        label: "ระบบโครงการ",
        icon: "pi pi-fw pi-book",
        category: "tropical_holstein",
        items: [
          {
            label: "ติดตามโครงการ",
            icon: "pi pi-fw pi-circle",
            to: "/project/detail",
          },
          {
            label: "โครงการ RedGoat",
            icon: "pi pi-fw pi-circle",
            to: "/project/redgoat",
          },
        ],
      },
      {
        label: "รายงาน",
        icon: "pi pi-fw pi-print",
        category: "report",
        items: [
          {
            label: "ด้านทะเบียนประวัติ",
            icon: "pi pi-fw pi-circle",
            items: [
              // {
              //   label: "สรุปโคแยกตามสายพันธุ์",
              //   icon: "pi pi-minus",
              //   to: "/report/animalbreed",
              // },
              {
                label: "ทะเบียนประวัติเพศเมีย",
                icon: "pi pi-minus",
                to: "/report/animalbreed",
              },
              {
                label: "ประวัติแม่พันธุ์รายตัว",
                icon: "pi pi-minus",
                to: "/report/history_registration",
              },
            ],
          },
          {
            label: "ด้านน้ําเชื้อ ตัวอ่อน",
            icon: "pi pi-fw pi-circle",
            items: [
              {
                label: "รายงานการใช้น้ำเชื้อ",
                icon: "pi pi-minus",
                to: "/report/semen",
              },
              {
                label: "ทะเบียนประวัติพ่อพันธุ์",
                icon: "pi pi-minus",
                to: "/report/breeder",
              },
              {
                label: "รายงานการใช้ตัวอ่อน",
                icon: "pi pi-minus",
                to: "/report/embryo",
              },
            ],
          },
          // {
          //   label: "ด้านการวิเคราะห์ข้อมูล",
          //   icon: "pi pi-fw pi-circle",
          //   to: "",
          // },
          // {
          //   label: "การตรวจระบบสืบพันธุ์",
          //   icon: "pi pi-fw pi-circle",
          //   to: "",
          // },
          // {
          //   label: "ด้านผสมเทียม",
          //   icon: "pi pi-fw pi-circle",
          //   items: [
          //     {
          //       label: "รายงาน ผท6",
          //       icon: "pi pi-minus",
          //       to: "/report/pt6",
          //     },
          //     {
          //       label: "รายงานตรวจท้อง",
          //       icon: "pi pi-minus",
          //       to: "/report/pregranancy",
          //     },
          //     {
          //       label: "รายงานติดตามลูกเกิด",
          //       icon: "pi pi-minus",
          //       to: "/report/born",
          //     },
          //   ],
          // },
          {
            label: "ด้านการผสมเทียม",
            icon: "pi pi-fw pi-circle",
            items: [
              {
                label: "รายงานการผสมเทียม ผท.6", 
                icon: "pi pi-minus",
                to: "/report/aipt6",
              },
              {
                label: "รายงานด้านทะเบียนฟาร์ม",
                icon: "pi pi-minus",
                to: "/report/FarmReport",
              },
              {
                label: "รายงานสรุปทะเบียนโค",
                icon: "pi pi-minus",
                to: "/report/Total_Animal",
              },
              {
                label: "รายงานครบกำหนดคลอด",
                icon: "pi pi-minus",
                to: "/report/mating",
              },
              {
                label: "รายงานตรวจท้อง",
                icon: "pi pi-minus",
                to: "/report/pregnancy",
              },
              {
                label: "รายงานสรุปตรวจท้อง",
                icon: "pi pi-minus",
                to: "/report/pregnancy1",
              },
              {
                label: "รายงานครบกำหนดตรวจท้อง",
                icon: "pi pi-minus",
                to: "/report/CheckupDue",
              },
              {
                label: "รายงานสรุปจำนวนโคตั้งท้อง",
                icon: "pi pi-minus",
                to: "/report/TotalPreg",
              },
              {
                label: "รายงานโคสาวที่ยังไม่ได้รับการผสม",
                icon: "pi pi-minus",
                to: "/report/young",
              },
            ],
          },
          {
            label: "ด้านการตรวจระบบสืบพันธุ์",
            icon: "pi pi-fw pi-circle",
            items: [
              {
                label: "รายงานแก้ไขปัญหาทางระบบสืบพันธุ์",
                icon: "pi pi-minus",
                to: "/report/reproduce",
              },
              {
                label: "รายงานตรวจระบบสืบพันธ์หลังคลอด 30 วัน",
                icon: "pi pi-minus",
                to: "/report/preg30",
              },
            ],
          },
          {
            label: "รายงานการปฏิบัติงาน",
            icon: "pi pi-fw pi-circle",
            to: "/report/work",
          },
          {
            label: "รายงานการเจริญเติบโต",
            icon: "pi pi-fw pi-circle",
            to: "/report/growup",
          },
          // {
          //   label: "รายงานการตั้งท้อง",
          //   icon: "pi pi-fw pi-circle",
          //   to: "/report/conceive",
          // },
        ],
      },

      {
        label: "ผู้ดูแลระบบ",
        icon: "pi pi-fw pi-cog",
        category: "admin",
        items: [
          {
            label: "ข้อมูลภาพรวม (monitor)",
            icon: "pi pi-fw pi-circle",
            to: "/setting/dashboard",
          },
          {
            label: "จัดการผู้ใช้งาน",
            icon: "pi pi-fw pi-circle",
            to: "/setting/users",
          },
          {
            label: "จัดการกลุ่มผู้ใช้งาน",
            icon: "pi pi-fw pi-circle",
            to: "/setting/group",
          },
          {
            label: "เวลาการเข้าใช้งาน",
            icon: "pi pi-fw pi-circle",
            to: "/setting/loglogin",
          },
          {
            label: "จัดการวงจรชีวิตสัตว์",
            icon: "pi pi-fw pi-circle",
            to: "/activity/creature_info",
          },
          {
            label: "จัดการผู้ใช้งานเกษตรกร",
            icon: "pi pi-fw pi-circle",
            to: "/setting/usersfarmer",
          },
          {
            label: "ข่าวสาร",
            icon: "pi pi-fw pi-circle",
            to: "/setting/news",
          },
          {
            label: "อนุมัติรายการ",
            icon: "pi pi-fw pi-circle",
            items: [
              {
                label: "แจ้งขอทำบัตร",
                icon: "pi pi-minus",
                to: "/requestcard",
              },
            ],
          },
          {
            label: "ทะเบียนหน่วยงาน",
            icon: "pi pi-fw pi-circle",
            to: "/agency",
          },
          {
            label: "โครงการ",
            icon: "pi pi-fw pi-circle",
            items: [
              {
                label: "จัดการโครงการ",
                icon: "pi pi-fw pi-circle",
                to: "/project/all",
              },
              {
                label: "ตรวจสอบโครงการ",
                icon: "pi pi-fw pi-circle",
                to: "/project/view",
              },

              {
                label: "ตั้งเป้าหมายโครงการ",
                icon: "pi pi-fw pi-circle",
                to: "/project/goal",
              },
            ],
          },

          // ข้อมูลเมนูพื้นฐาน
          {
            label: "ข้อมูลพื้นฐาน",
            icon: "pi pi-fw pi-circle",
            items: [
              {
                label: "ข้อมูลพื้นฐานที่ตั้ง",
                icon: "pi pi-minus",
                items: [
                  {
                    label: "ประเทศ",
                    icon: "pi pi-minus",
                    to: "/user_center/country",
                  },
                  {
                    label: "ภูมิภาค",
                    icon: "pi pi-minus",
                    to: "/user_center/region",
                  },
                  {
                    label: "จังหวัด",
                    icon: "pi pi-minus",
                    to: "/user_center/province",
                  },
                  {
                    label: "อำเภอ",
                    icon: "pi pi-minus",
                    to: "/user_center/amphur",
                  },
                  {
                    label: "ตำบล",
                    icon: "pi pi-minus",
                    to: "/user_center/tumbol",
                  },
                ],
              },
              {
                label: "ข้อมูลพื้นฐานบุคคล",
                icon: "pi pi-minus",
                items: [
                  {
                    label: "เพศ",
                    icon: "pi pi-minus",
                    to: "/user_center/gender",
                  },
                  {
                    label: "คำนำหน้าชื่อ",
                    icon: "pi pi-minus",
                    to: "/user_center/title",
                  },
                  {
                    label: "สถานภาพการสมรส",
                    icon: "pi pi-minus",
                    to: "/user_center/marriedstatus",
                  },
                  {
                    label: "ประเภทบุคลากร",
                    icon: "pi pi-minus",
                    to: "/user_center/positiontype",
                  },

                  {
                    label: "ระดับการศึกษา",
                    icon: "pi pi-minus",
                    to: "/user_center/education",
                  },

                  {
                    label: "อาชีพ",
                    icon: "pi pi-minus",
                    to: "/user_center/occupation",
                  },
                  // {
                  //   label: "ทำงานด้าน",
                  //   icon: "pi pi-minus",
                  //   to: "/user_center/duty",
                  // },
                  {
                    label: "สาขาวิชา",
                    icon: "pi pi-minus",
                    to: "/user_center/academy_major",
                  },
                ],
              },

              {
                label: "ข้อมูลหน่วยงาน",
                icon: "pi pi-minus",
                items: [
                  {
                    label: "เขตปศุสัตว์",
                    icon: "pi pi-minus",
                    to: "/user_center/zone",
                  },
                  {
                    label: "ศูนย์วิจัย",
                    icon: "pi pi-minus",
                    to: "/user_center/ai_zone",
                  },
                  {
                    label: "ประเภทหน่วยงาน",
                    icon: "pi pi-minus",
                    to: "/user_center/organization_type",
                  },
                  {
                    label: "ตำแหน่งงาน",
                    icon: "pi pi-minus",
                    to: "/user_center/position",
                  },
                ],
              },

              {
                label: "ข้อมูลประจำตัวสัตว์",
                icon: "pi pi-minus",
                items: [
                  {
                    label: "เพศสัตว์",
                    icon: "pi pi-minus",
                    to: "/user_center/animalsex",
                  },

                  {
                    label: "ประเภทสัตว์",
                    icon: "pi pi-minus",
                    to: "/user_center/animalgenre",
                  },

                  {
                    label: "ชนิดสัตว์หลัก",
                    icon: "pi pi-minus",
                    to: "/user_center/animalgrouptype",
                  },

                  {
                    label: "สถานะสัตว์",
                    icon: "pi pi-minus",
                    to: "/user_center/cow_status",
                  },

                  {
                    label: "ชนิดสัตว์",
                    icon: "pi pi-minus",
                    to: "/user_center/animal_type",
                  },

                  {
                    label: "ประเภทสายพันธ์",
                    icon: "pi pi-minus",
                    to: "/user_center/breed_type",
                  },
                ],
              },
              {
                label: "ข้อมูลฟาร์ม",
                icon: "pi pi-minus",
                items: [
                  // {
                  //   label: "ประเภทฟาร์ม",
                  //   icon: "pi pi-minus",
                  //   to: "/user_center/farm_type",
                  // },

                  {
                    label: "สถานะฟาร์ม",
                    icon: "pi pi-minus",
                    to: "/user_center/farmstatus",
                  },
                ],
              },
              {
                label: "ข้อมูลกิจกรรม",
                icon: "pi pi-minus",
                items: [
                  // {
                  //   label: "ฮอร์โมน",
                  //   icon: "pi pi-minus",
                  //   to: "/user_center/hormone",
                  // },

                  {
                    label: "คะแนนร่างกาย",
                    icon: "pi pi-minus",
                    to: "/user_center/bcs",
                  },

                  {
                    label: "วิธีการย้ายฝาก",
                    icon: "pi pi-minus",
                    to: "/user_center/transfermethod",
                  },

                  {
                    label: "ลักษณะการแท้ง",
                    icon: "pi pi-minus",
                    to: "/user_center/abortresult",
                  },
                  {
                    label: "วิธีการตรวจการตั้งท้อง",
                    icon: "pi pi-minus",
                    to: "/user_center/pregnancycheckmethod",
                  },

                  {
                    label: "สถานะตรวจการตั้งท้อง",
                    icon: "pi pi-minus",
                    to: "/user_center/pregnancycheckstatus",
                  },
                  {
                    label: "สถานะตัวอ่อน",
                    icon: "pi pi-minus",
                    to: "/user_center/embryo_stages",
                  },
                  {
                    label: "วิธีการช่วยคลอด",
                    icon: "pi pi-minus",
                    to: "/user_center/givebirthhelp",
                  },
                  {
                    label: "แหล่งที่มาของสัตว์",
                    icon: "pi pi-minus",
                    to: "/user_center/cow_source",
                  },
                  {
                    label: "ปืนสอดลึก",
                    icon: "pi pi-minus",
                    to: "/user_center/gundepth",
                  },
                  {
                    label: "การเป็นสัดของแพะ",
                    icon: "pi pi-minus",
                    to: "/user_center/goatestralactivity",
                  },
                  {
                    label: "โปรแกรมกิจกรรม",
                    icon: "pi pi-minus",
                    to: "/user_center/presetactivity",
                  },
                  {
                    label: "สาเหตุการคัดจำหน่าย",
                    icon: "pi pi-minus",
                    to: "/user_center/distributions",
                  },
                ],
              },
              {
                label: "ข้อมูลการขุนอาหาร",
                icon: "pi pi-minus",
                items: [
                  {
                    label: "อาหารหยาบ",
                    icon: "pi pi-minus",
                    to: "/user_center/roughages",
                  },

                  {
                    label: "อาหารข้น",
                    icon: "pi pi-minus",
                    to: "/user_center/concentrate",
                  },
                ],
              },
              {
                label: "ข้อมูลการตรวจสุขภาพ",
                icon: "pi pi-minus",
                items: [
                  {
                    label: "โรค",
                    icon: "pi pi-minus",
                    to: "/user_center/disease",
                  },

                  {
                    label: "วิธีการตรวจโรค",
                    icon: "pi pi-minus",
                    to: "/user_center/diseasemethod",
                  },
                  {
                    label: "ผลการตรวจโรค",
                    icon: "pi pi-minus",
                    to: "/user_center/diseaseresult",
                  },
                  {
                    label: "วัตถุประสงค์การฉีดวัคซีน",
                    icon: "pi pi-minus",
                    to: "/user_center/vaccineobjective",
                  },
                  {
                    label: "วัคซีน",
                    icon: "pi pi-minus",
                    to: "/user_center/vaccine",
                  },
                  {
                    label: "ยาถ่ายพยาธิ",
                    icon: "pi pi-minus",
                    to: "/user_center/dewormmedicine",
                  },
                ],
              },
              {
                label: "ข้อมูลการตรวจระบบสืบพันธุ์",
                icon: "pi pi-minus",
                items: [
                  {
                    label: "อาการเป็นสัด",
                    icon: "pi pi-minus",
                    to: "/user_center/heattype",
                  },

                  {
                    label: "วงรอบการเป็ดสัด",
                    icon: "pi pi-minus",
                    to: "/user_center/heatcircle",
                  },
                  {
                    label: "ปัญหารังไข่",
                    icon: "pi pi-minus",
                    to: "/user_center/ovarysymptom",
                  },
                  {
                    label: "ปัญหามดลูก/ช่องคลอด",
                    icon: "pi pi-minus",
                    to: "/user_center/vaginasymptom",
                  },
                  {
                    label: "ปัญหาอื่นๆ",
                    icon: "pi pi-minus",
                    to: "/user_center/othersymptom",
                  },
                  {
                    label: "สาเหตุโน้มนำด้านตัวสัตว์",
                    icon: "pi pi-minus",
                    to: "/user_center/causeanimal",
                  },
                  {
                    label: "สาเหตุโน้มนำด้านสิ่งแวดล้อม",
                    icon: "pi pi-minus",
                    to: "/user_center/causeenvironment",
                  },
                  {
                    label: "สาเหตุโน้มนำการเลี้ยงและการจัดการ",
                    icon: "pi pi-minus",
                    to: "/user_center/causefeeder",
                  },
                  {
                    label: "สาเหตุโน้มนำด้านสุขภาพ",
                    icon: "pi pi-minus",
                    to: "/user_center/causehealth",
                  },
                  {
                    label: "ฮอร์โมน",
                    icon: "pi pi-minus",
                    to: "/user_center/curehormone",
                  },
                  {
                    label: "ยาปฏิชีวนะ",
                    icon: "pi pi-minus",
                    to: "/user_center/cureantibiotic",
                  },
                  {
                    label: "ยาและวิตามิน",
                    icon: "pi pi-minus",
                    to: "/user_center/curevitamin",
                  },
                  {
                    label: "คำแนะนำแก้ปัญหาระบบสืบพันธุ์",
                    icon: "pi pi-minus",
                    to: "/user_center/reproducesuggestion",
                  },
                ],
              },
              // {
              //   label: "หน่วยงาน",
              //   icon: "pi pi-minus",
              //   to: "/user_center/organization",
              // },
              // {
              //   label: "สถานภาพการผลิต",
              //   icon: "pi pi-minus",
              //   to: "/user_center/production_status",
              // },
              // {
              //   label: "สถานะการคัดจำหน่าย",
              //   icon: "pi pi-minus",
              //   to: "/user_center/culling_status",
              // },
              // {
              //   label: "สาเหตุการคัดจำหน่าย",
              //   icon: "pi pi-minus",
              //   to: "/user_center/culling_cause",
              // },
            ],
          },
        ],
      },
    ],
  },
];
