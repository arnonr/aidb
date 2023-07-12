### Getting Started

ขั้นตอนที่ 1. ลงตัว [Vue CLI](https://cli.vuejs.org/) ก่อนที่จะ npm install

```
npm install -g @vue/cli
```

หรือ

```
yarn global add @vue/cli
```

ขั้นตอนที่ 2. ลง Node Modules
                
```
npm install
```

หรือ

```
yarn
```

ขั้นตอนที่ 3. Run Project

```
npm run serve
```

### เครื่องมือที่ใช้งาน

1. สามารถเข้าไปดู Components ได้ที่ [Prime Vue](https://www.primefaces.org/primevue/)
2. สามารถเข้าไปดู CSS ได้ที่ [Prime Flex](https://www.primefaces.org/primeflex/)
3. สามารถเข้าไปดู Icons ได้ที่ [Prime Icons](https://www.primefaces.org/primevue/icons)
4. สามารถเข้าไปดู Datepicker ได้ที่ [Vue3 Datepicker](https://vue3datepicker.com/installation/)

### วิธีสร้างหน้า

1. ไปที่ไฟล์ router.js ตำแหน่งไฟล์ src/router.js

```
 {
    path: "/",
    name: "app",
    component: App,
    children: [
        ...สร้าง route ในนี้
    ]
  }
```

2. เมื่อสร้าง route เสร็จแล้วให้ไปสร้างเมนูที่ไฟล์ menuConfig.js  ตำแหน่งไฟล์ src/menuConfig.js

```
export default [
  {
    label: "เมนูรายการ",
    items: [
        ...สร้างเมนูในนี้
    ]
  }
]
```

***หมายเหตุ: สร้าง Branches ของแต่ละคนนะครับกันทับกัน