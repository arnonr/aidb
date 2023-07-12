import axios from "axios";
import pdfMake from "pdfmake";
import pdfFonts from "@/assets/fonts/custom-fonts.js";
import GetStaff from "./GetStaff.js";

const PersonalCard = async (user) => {
  const usersTop = await Promise.all(
    user.slice(0, 3).map(async (item) => {
      let response;
      try {
        response = await axios("/staff/" + item).then((res) => res.data);
      } catch (err) {
        return err;
      }
      return await GetStaff(response);
    })
  ).then((results) => {
    return results;
  });

  const usersBottom = await Promise.all(
    user.slice(3, 6).map(async (item) => {
      let response;
      try {
        response = await axios("/staff/" + item).then((res) => res.data);
      } catch (err) {
        return err;
      }
      return await GetStaff(response);
    })
  ).then((results) => {
    return results;
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
    pageOrientation: "landscape",
    pageMargins: [6, 20, 6, 20],
    defaultStyle: {
      font: "THSarabun",
    },
    info: {
      title: "บัตรประจำตัวเจ้าหน้าที่ผสมเทียม",
      author: "กรมปศุสัตว์",
    },
    content: [
      {
        columns: [...usersTop],
        columnGap: 4,
      },
      {
        columns: [...usersBottom],
        columnGap: 4,
      },
    ],
    styles: {
      header: {
        fontSize: 16,
        color: "#fff",
        bold: true,
        margin: [0, 4],
        alignment: "center",
      },
      text: {
        fontSize: 13,
        color: "#000",
        bold: true,
        alignment: "center",
      },
    },
  };
  pdfMake.createPdf(docDefinition).open({}, window.open("", "_blank"));
};

export default PersonalCard;
