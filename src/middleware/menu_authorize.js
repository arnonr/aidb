import store from "./../service/Vuex";
import Swal from "sweetalert2";

export default async function (menu_id, action, { from, next }) {
  return await store
    .dispatch("check_authorize", { menu: menu_id, action: action })
    .catch(() => {
      Swal.fire({
        title: "ไม่มีสิทธิ์ในการเข้าถึงหน้านี้",
        text: "หากต้องการใช้งานกรุณาติดต่อผู้ดูแล",
        icon: "error",
        confirmButtonText: "ตกลง",
        timer: 6000,
      });
      let route_name = "gateway";
      if (from.name) {
        route_name = from.name;
      }
      return next({ name: route_name });
    });
}
