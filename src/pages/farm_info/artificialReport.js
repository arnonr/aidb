import pdfMake from "pdfmake";
import pdfFonts from "@/assets/fonts/custom-fonts.js";
import getBase64Image from "@/utils/getBase64Image.js";

import logo from "@/assets/images/logo-2.png";

const ArtificialReport = async () => {
  const bg = await getBase64Image(logo);

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
      title: "รายงานการผสมเทียม",
      author: "กรมปศุสัตว์",
    },
    background: function (currentPage, pageSize) {
      return [
        {
          image: bg,
          width: 350,
          height: 350,
          margin: [0, (pageSize.height - 350) / 2, 0, 0],
          opacity: 0.1,
          alignment: "center",
        },
      ];
    },
    content: [
      {
        columns: [
          {
            width: "100%",
            text: "รายงานการผสมเทียม",
            style: "header",
          },
        ],
      },
      {
        columns: [
          {
            width: "100%",
            image: await getBase64Image(
              "https://images.unsplash.com/photo-1502590464431-3b66d77494d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            ),
            fit: [250, 250],
            alignment: "center",
          },
        ],
      },
      {
        columns: [
          {
            margin: [0, 30, 0, 30],
            table: {
              widths: [90, "*", "auto", "*"],
              body: [
                [
                  {
                    text: "ชื่อสัตว์",
                    alignment: "right",
                    style: "info",
                    border: [false, false, false, false],
                  },
                  {
                    text: "กรณิการ์",
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
                    text: "201900458",
                    bold: true,
                    alignment: "center",
                    style: "info",
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
                    text: "89.0625HF 3.125SW 6.25NA",
                    bold: true,
                    alignment: "center",
                    style: "info",
                    colSpan: 3,
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
                    text: "กิตติพงษ์ เสียงสนั่น",
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
                    text: "1911005562",
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
                    text: "25 ม.2 ต.หนองย่างเสือ อ.มวกเหล็ก จ.สระบุรี",
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
                return 10;
              },
              paddingRight: function () {
                return 10;
              },
              paddingTop: function () {
                return 10;
              },
              paddingBottom: function () {
                return 10;
              },
            },
          },
        ],
      },
      {
        columns: [
          {
            table: {
              widths: [90, "*", "auto", "*"],
              body: [
                [
                  {
                    text: "วันผสม",
                    alignment: "right",
                    style: "info",
                    border: [false, false, false, false],
                  },
                  {
                    text: "11/11/2564",
                    bold: true,
                    alignment: "center",
                    style: "info",
                  },
                  {
                    text: "ครั้งที่",
                    style: "info",
                    alignment: "center",
                    border: [false, false, false, false],
                  },
                  {
                    text: "4",
                    bold: true,
                    alignment: "center",
                    style: "info",
                  },
                ],
                [
                  {
                    text: "น้ำเชื้อ",
                    alignment: "right",
                    style: "info",
                    border: [false, false, false, false],
                  },
                  {
                    text: "TH457",
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
                    text: "93.5 %HF",
                    bold: true,
                    alignment: "center",
                    style: "info",
                  },
                ],
                [
                  {
                    text: "กำหนดกลับสัด",
                    alignment: "right",
                    style: "info",
                    border: [false, false, false, false],
                  },
                  {
                    text: "2/12/2564",
                    bold: true,
                    alignment: "center",
                    style: "info",
                    colSpan: 3,
                  },
                ],
                [
                  {
                    text: "กำหนดตรวจท้อง",
                    alignment: "right",
                    style: "info",
                    border: [false, false, false, false],
                  },
                  {
                    text: "10/01/2565",
                    bold: true,
                    alignment: "center",
                    style: "info",
                    colSpan: 3,
                  },
                ],
                [
                  {
                    text: "กำหนดคลอด",
                    alignment: "right",
                    style: "info",
                    border: [false, false, false, false],
                  },
                  {
                    text: "23/08/2565",
                    bold: true,
                    alignment: "center",
                    style: "info",
                    colSpan: 3,
                  },
                ],
                [
                  {
                    text: "เจ้าหน้าที่",
                    alignment: "right",
                    style: "info",
                    border: [false, false, false, false],
                  },
                  {
                    text: "H5920002",
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
                return 10;
              },
              paddingRight: function () {
                return 10;
              },
              paddingTop: function () {
                return 10;
              },
              paddingBottom: function () {
                return 10;
              },
            },
          },
        ],
      },
      {
        columns: [
          {
            width: "50%",
            text: "\t\t\tเอกสารฉบับที่ 53/2564\t\t\t",
            alignment: "center",
            style: "footer",
          },
          {
            width: "50%",
            text: "\t\t\tวันที่ออกเอกสาร 11/11/2564 เวลา 10.43 น.\t\t\t",
            alignment: "center",
            style: "footer",
          },
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 46,
        bold: true,
        margin: [0, 0, 0, 20],
        alignment: "center",
      },
      title: {
        fontSize: 20,
        bold: true,
        alignment: "left",
      },
      info: {
        fontSize: 18,
      },
      footer: {
        fontSize: 14,
        margin: [0, 40, 0, 0],
        background: '#FFF38C',
        alignment: "center",
      },
    },
  };
  pdfMake.createPdf(docDefinition).open({}, window.open("", "_blank"));
};

export default ArtificialReport;
