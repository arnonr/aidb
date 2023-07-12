import getBase64Image from "@/utils/getBase64Image.js";

const GetStaff = async (res) => {
  let avatar;
  if (res.StaffImage) {
    avatar = await getBase64Image(res.StaffImage);
  } else {
    avatar = await getBase64Image(
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
    );
  }
  return {
    width: "33.33%",
    margin: [0, 0, 0, 8],
    table: {
      headerRows: 1,
      widths: [80, "*"],
      body: [
        [
          {
            text: "บัตรประจำตัวเจ้าหน้าที่ผสมเทียม",
            style: "header",
            border: [false, false, false, false],
            colSpan: 2,
            fillColor: "#277BC0",
          },
          { text: "" },
        ],
        [
          {
            image: avatar,
            fit: [80, 80],
            alignment: "center",
            rowSpan: 4,
            margin: [0, 6, 0, 0],
            border: [true, false, false, false],
          },
          {
            text: `เลขที่ ${res.StaffNumber ? res.StaffNumber : "-"}`,
            alignment: "left",
            style: "text",
            margin: [0, 6, 0, 0],
            border: [false, false, true, false],
          },
        ],
        [
          { text: "" },
          {
            text: `ชื่อ ${res.StaffGivenName ? res.StaffGivenName : "-"} ${
              res.StaffSurname ? res.StaffSurname : "-"
            }`,
            alignment: "left",
            style: "text",
            border: [false, false, true, false],
          },
        ],
        [
          { text: "" },
          {
            text: `ตำแหน่ง ${res.Position ? res.Position.PositionName : "-"}`,
            alignment: "left",
            style: "text",
            border: [false, false, true, false],
          },
        ],
        [
          { text: "" },
          {
            text: `สังกัด ${
              res.Organization ? res.Organization.OrganizationName : "-"
            }`,
            alignment: "left",
            style: "text",
            border: [false, false, true, false],
          },
        ],
        [
          {
            text: "..........................",
            alignment: "center",
            style: "text",
            border: [true, false, false, false],
          },
          {
            text: "....................................................",
            alignment: "center",
            style: "text",
            border: [false, false, true, false],
          },
        ],
        [
          {
            text: "ลายมือชื่อผู้ถือบัตร",
            alignment: "center",
            style: "text",
            border: [true, false, false, false],
          },
          {
            text: "(นายชัยวัฒน์ โยธคล)",
            alignment: "center",
            style: "text",
            border: [false, false, true, false],
          },
        ],
        [
          {
            text: "",
            alignment: "center",
            style: "text",
            margin: [0, 0, 0, 6],
            border: [true, false, false, true],
          },
          {
            text: "รองอธิบดีปฎิบัติราชการแทนอธิบดีกรมปศุสัตว์",
            alignment: "center",
            style: "text",
            margin: [0, 0, 0, 6],
            border: [false, false, true, true],
          },
        ],
      ],
    },
    layout: {
      hLineColor: function () {
        return "#000";
      },
      vLineColor: function () {
        return "#000";
      },
      paddingLeft: function () {
        return 5;
      },
      paddingRight: function () {
        return 5;
      },
      paddingTop: function () {
        return 3;
      },
      paddingBottom: function () {
        return 3;
      },
    },
  };
};

export default GetStaff;
