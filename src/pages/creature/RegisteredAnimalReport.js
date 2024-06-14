import axios from "axios";
import pdfMake from "pdfmake";
import pdfFonts from "@/assets/fonts/custom-fonts.js";
import getBase64Image from "@/utils/getBase64Image.js";

import logo from "@/assets/images/logo-2.png";

const RegisteredAnimalReport = async (id) => {
  const result = await axios
    .get("/animal/export-registered-animal/"+id)
    .then((res) => {
      return res.data;
    });

  const bg = await getBase64Image(logo);

  let pdfAnimalImg;

  if (result.AnimalImagePath != null) {
    pdfAnimalImg = await getBase64Image(result.AnimalImagePath);
  } else {
    pdfAnimalImg = await getBase64Image(logo);
  }

  const dataAI = result.AI.map((val) => {
    return [
      {
        text: val.PAR,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: val.TimeNo,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: val.AIDate,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: val.SemenNumber,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: val.Staff,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: val.PregnancyCheckup,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: val.GiveBirthDate,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: val.ChildSex,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
    ];
  });

  const dataVaccine = result.Vaccine.map((val) => {
    const itemTime = val.Time.map((item) => item);

    // const itemTimeSlice = val.Time.slice(1).map((item) => [
    //   {
    //     text: "",
    //   },
    //   {
    //     text: item.Date,
    //     bold: true,
    //     alignment: "center",
    //     style: "textTable",
    //   },
    //   {
    //     text: item.Staff,
    //     bold: true,
    //     alignment: "center",
    //     style: "textTable",
    //   },
    // ]);

    return [
      {
        text: val.VaccineName,
        bold: true,
        alignment: "center",
        style: "textTable",
        rowSpan: 1,
      },
      {
        text: itemTime[0].Date,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: itemTime[0].Staff,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
    ];
  });

  const dataCure = result.Cure.map((val) => {
    return [
      {
        text: val.Date,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: val.Remark,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: val.Staff,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
    ];
  });

  const dataDisease = result.Disease.map((val) => {
    const timeItem = val.Time.map((item) => {
      return item.Date + " (" + item.Result + ")";
    });

    return [
      {
        text: val.DiseaseName,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: timeItem[0],
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: timeItem[1],
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: timeItem[2],
        bold: true,
        alignment: "center",
        style: "textTable",
      },
    ];
  });

  const dataDeworm = result.Deworm.map((val) => {
    const timeItem = val.Time.map((item) => {
      return item.Date + " (" + item.Staff + ")";
    });

    return [
      {
        text: val.DewormMedicineName,
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: timeItem[0],
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: timeItem[1],
        bold: true,
        alignment: "center",
        style: "textTable",
      },
      {
        text: timeItem[2],
        bold: true,
        alignment: "center",
        style: "textTable",
      },
    ];
  });

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.fonts = {
    THSarabun: {
      normal: "THSarabun.ttf",
      bold: "THSarabun-Bold.ttf",
      italics: "THSarabun-Italic.ttf",
      bolditalics: "THSarabun-Bold-Italic.ttf",
    },
  };
  const docDefinition = {
    pageSize: "A4",
    pageMargins: [20, 20, 20, 20],
    defaultStyle: {
      font: "THSarabun",
    },
    info: {
      title: "ทะเบียนประวัติสัตว์",
      author: "กรมปศุสัตว์",
    },
    background: function (currentPage, pageSize) {
      return [
        {
          image: bg,
          width: 300,
          height: 300,
          margin: [0, (pageSize.height - 300) / 2, 0, 0],
          opacity: 0.1,
          alignment: "center",
        },
      ];
    },
    content: [
      {
        columns: [
          {
            width: "80%",
            text: "ทะเบียนประวัติสัตว์",
            style: "header",
          },
          {
            width: "20%",
            qr: "text in QR",
            fit: "70",
            alignment: "right",
          },
        ],
        columnGap: 0,
      },
      {
        columns: [
          {
            width: "40%",
            image: pdfAnimalImg,
            fit: [200, 200],
            alignment: "center",
          },
          {
            width: "60%",
            stack: [
              {
                text: [
                  {
                    text: "ข้อมูลสัตว์เบื้องต้น",
                    style: "title",
                  },
                ],
              },
              {
                margin: [0, 10, 0, 0],
                table: {
                  widths: ["auto", 100, "auto", "*"],
                  body: [
                    [
                      {
                        text: "ชื่อสัตว์",
                        alignment: "right",
                        style: "info",
                        border: [false, false, false, false],
                      },
                      {
                        text: result.AnimalName,
                        bold: true,
                        alignment: "center",
                        style: "info",
                      },
                      {
                        text: "เลขประจำตัว",
                        style: "info",
                        alignment: "center",
                        border: [false, false, false, false],
                      },
                      {
                        text: result.AnimalEarID,
                        bold: true,
                        alignment: "center",
                        style: "info",
                      },
                    ],
                    [
                      {
                        text: "วันเกิด",
                        alignment: "right",
                        style: "info",
                        border: [false, false, false, false],
                      },
                      {
                        text: result.AnimalBirthDate,
                        bold: true,
                        alignment: "left",
                        style: "info",
                        colSpan: 3,
                      },
                    ],
                    [
                      {
                        text: "สายพันธุ์",
                        alignment: "right",
                        style: "info",
                        border: [false, false, false, false],
                      },
                      {
                        text: result.AnimalBreedAll,
                        bold: true,
                        alignment: "left",
                        style: "info",
                        colSpan: 3,
                      },
                    ],
                    [
                      {
                        text: "พ่อ",
                        alignment: "right",
                        style: "info",
                        border: [false, false, false, false],
                      },
                      {
                        text: result.AnimalDadName.replace(/,/g, '\n'),
                        bold: true,
                        alignment: "center",
                        style: "info",
                      },
                      {
                        text: "สายเลือด",
                        style: "info",
                        alignment: "center",
                        border: [false, false, false, false],
                      },
                      {
                        text: result.AnimalDadBreed,
                        bold: true,
                        alignment: "center",
                        style: "info",
                      },
                    ],
                    [
                      {
                        text: "แม่",
                        alignment: "right",
                        style: "info",
                        border: [false, false, false, false],
                      },
                      {
                        // text: result.AnimalMomName+"<br>"+"dsdas",
                        text: result.AnimalMomName.replace(/,/g, '\n'),
                        bold: true,
                        alignment: "center",
                        style: "info",
                      },
                      {
                        text: "สายเลือด",
                        style: "info",
                        alignment: "center",
                        border: [false, false, false, false],
                      },
                      {
                        text: result.AnimaMomBreed,
                        bold: true,
                        alignment: "center",
                        style: "info",
                      },
                    ],
                    [
                      {
                        text: "ชื่อฟาร์ม",
                        alignment: "right",
                        style: "info",
                        border: [false, false, false, false],
                      },
                      {
                        
                        text: result.FarmName,
                        bold: true,
                        alignment: "center",
                        style: "info",
                      },
                      {
                        text: "ทะเบียน",
                        style: "info",
                        alignment: "center",
                        border: [false, false, false, false],
                      },
                      {
                        text: result.FarmIdentificationNumber,
                        bold: true,
                        alignment: "center",
                        style: "info",
                      },
                    ],
                    [
                      {
                        text: "ที่อยู่",
                        alignment: "right",
                        style: "info",
                        border: [false, false, false, false],
                      },
                      {
                        text: result.FarmAddress,
                        bold: true,
                        alignment: "center",
                        style: "info",
                        colSpan: 3,
                      },
                    ],
                  ],
                },
                layout: {
                  hLineColor: function () {
                    return "#ddd";
                  },
                  vLineColor: function () {
                    return "#ddd";
                  },
                  paddingLeft: function () {
                    return 4;
                  },
                  paddingRight: function () {
                    return 4;
                  },
                  paddingTop: function () {
                    return 4;
                  },
                  paddingBottom: function () {
                    return 4;
                  },
                },
              },
            ],
          },
        ],
        columnGap: 2,
      },
      {
        margin: [0, 20, 0, 0],
        stack: [
          {
            text: [
              {
                text: "ข้อมูลด้านระบบสืบพันธุ์",
                style: "title",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            table: {
              headerRows: 1,
              widths: ["auto", "*", "auto", "*", "auto", "*", "auto", "auto"],
              body: [
                [
                  {
                    text: "ท้องที่",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "ครั้งที่",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "วันผสม",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "น้ำเชื้อ",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "ผู้ผสม",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "การตั้งท้อง",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "วันคลอด",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "เพศ",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                ],
                ...dataAI,
              ],
            },
            layout: {
              hLineColor: function () {
                return "#ddd";
              },
              vLineColor: function () {
                return "#ddd";
              },
              paddingLeft: function () {
                return 3;
              },
              paddingRight: function () {
                return 3;
              },
              paddingTop: function () {
                return 3;
              },
              paddingBottom: function () {
                return 3;
              },
            },
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        stack: [
          {
            text: [
              {
                text: "ข้อมูลด้านฉีดวัคซีน",
                style: "title",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            table: {
              headerRows: 1,
              widths: ["*", "*", "*"],
              body: [
                [
                  {
                    text: "ชนิดวัคซีน",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "วัน/เดือน/ปี",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "ผู้ฉีด",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                ],
                ...dataVaccine,
              ],
            },
            layout: {
              hLineColor: function () {
                return "#ddd";
              },
              vLineColor: function () {
                return "#ddd";
              },
              paddingLeft: function () {
                return 3;
              },
              paddingRight: function () {
                return 3;
              },
              paddingTop: function () {
                return 3;
              },
              paddingBottom: function () {
                return 3;
              },
            },
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        stack: [
          {
            text: [
              {
                text: "ข้อมูลด้านการรักษา",
                style: "title",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            table: {
              headerRows: 1,
              widths: ["*", "*", "*"],
              body: [
                [
                  {
                    text: "วัน/เดือน/ปี",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "อาการ",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "ผู้รักษา",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                ],
                ...dataCure,
              ],
            },
            layout: {
              hLineColor: function () {
                return "#ddd";
              },
              vLineColor: function () {
                return "#ddd";
              },
              paddingLeft: function () {
                return 3;
              },
              paddingRight: function () {
                return 3;
              },
              paddingTop: function () {
                return 3;
              },
              paddingBottom: function () {
                return 3;
              },
            },
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        stack: [
          {
            text: [
              {
                text: "ข้อมูลด้านตรวจโรค",
                style: "title",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            table: {
              headerRows: 1,
              widths: ["*", "auto", "auto", "auto"],
              body: [
                [
                  {
                    text: "โปรแกรม",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "ลงวันที่ (ผล)",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "ลงวันที่ (ผล)",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "ลงวันที่ (ผล)",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                ],
                ...dataDisease,
              ],
            },
            layout: {
              hLineColor: function () {
                return "#ddd";
              },
              vLineColor: function () {
                return "#ddd";
              },
              paddingLeft: function () {
                return 3;
              },
              paddingRight: function () {
                return 3;
              },
              paddingTop: function () {
                return 3;
              },
              paddingBottom: function () {
                return 3;
              },
            },
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        stack: [
          {
            text: [
              {
                text: "ข้อมูลด้านถ่ายพยาธิ",
                style: "title",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            table: {
              headerRows: 1,
              widths: ["*", "auto", "auto", "auto"],
              body: [
                [
                  {
                    text: "โปรแกรม",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "ลงวันที่ (ผู้ฉีด)",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "ลงวันที่ (ผู้ฉีด)",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                  {
                    text: "ลงวันที่ (ผู้ฉีด)",
                    bold: true,
                    alignment: "center",
                    style: "textTable",
                  },
                ],
                ...dataDeworm,
              ],
            },
            layout: {
              hLineColor: function () {
                return "#ddd";
              },
              vLineColor: function () {
                return "#ddd";
              },
              paddingLeft: function () {
                return 3;
              },
              paddingRight: function () {
                return 3;
              },
              paddingTop: function () {
                return 3;
              },
              paddingBottom: function () {
                return 3;
              },
            },
          },
        ],
      },
      {
        columns: [
          {
            margin: [0, 20, 0, 0],
            width: "100%",
            table: {
              widths: ["*", "*", "*", "*"],
              body: [
                [
                  {
                    text: "ลงชื่อเจ้าของสัตว์",
                    bold: true,
                    alignment: "right",
                    style: "textTable",
                  },
                  {
                    text: "....................................................",
                    bold: true,
                    alignment: "left",
                    style: "textTable",
                  },
                  {
                    text: "ลงชื่อเจ้าหน้าที่ผสมเทียม",
                    bold: true,
                    alignment: "right",
                    style: "textTable",
                  },
                  {
                    text: "......................................................",
                    bold: true,
                    alignment: "left",
                    style: "textTable",
                  },
                ],
                [
                  {
                    text: "",
                    bold: true,
                    alignment: "right",
                    style: "textTable",
                  },
                  {
                    text: "(....................................................)",
                    bold: true,
                    alignment: "left",
                    style: "textTable",
                  },
                  {
                    text: "",
                    bold: true,
                    alignment: "right",
                    style: "textTable",
                  },
                  {
                    text: "(.....................................................)",
                    bold: true,
                    alignment: "left",
                    style: "textTable",
                  },
                ],
                [
                  {
                    text: "",
                    bold: true,
                    alignment: "right",
                    style: "textTable",
                  },
                  {
                    text: "",
                    bold: true,
                    alignment: "right",
                    style: "textTable",
                  },
                  {
                    text: "ตำแหน่ง",
                    bold: true,
                    alignment: "right",
                    style: "textTable",
                  },
                  {
                    text: "......................................................",
                    bold: true,
                    alignment: "left",
                    style: "textTable",
                  },
                ],
              ],
            },
            layout: "noBorders",
          },
        ],
        columnGap: 2,
      },
    ],
    styles: {
      header: {
        fontSize: 32,
        bold: true,
        margin: [40, 10, 0, 50],
        alignment: "center",
      },
      title: {
        fontSize: 20,
        bold: true,
        alignment: "left",
      },
      info: {
        fontSize: 14,
      },
      textTable: {
        fontSize: 14,
      },
      footer: {
        fontSize: 14,
      },
    },
  };
  pdfMake.createPdf(docDefinition).open({}, window.open("", "_blank"));
};

export default RegisteredAnimalReport;
