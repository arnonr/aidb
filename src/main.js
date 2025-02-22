import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "prismjs/themes/prism-coy.css";
import "@vuepic/vue-datepicker/dist/main.css";
import "./assets/styles/layout.scss";
import "./assets/demo/flags/flags.css";
import "./assets/styles/_theme.scss";

import { createApp, reactive } from "vue";
import router from "./router";
import axios from "axios";
import AppWrapper from "./AppWrapper.vue";
import PrimeVue from "primevue/config";
import AutoComplete from "primevue/autocomplete";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import Badge from "primevue/badge";
import BadgeDirective from "primevue/badgedirective";
import Button from "primevue/button";
import Breadcrumb from "primevue/breadcrumb";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import Carousel from "primevue/carousel";
import Chart from "primevue/chart";
import Checkbox from "primevue/checkbox";
import Chip from "primevue/chip";
import Chips from "primevue/chips";
import ColorPicker from "primevue/colorpicker";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmationService from "primevue/confirmationservice";
import ContextMenu from "primevue/contextmenu";
import DataTable from "primevue/datatable";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import Fieldset from "primevue/fieldset";
import FileUpload from "primevue/fileupload";
import Image from "primevue/image";
import InlineMessage from "primevue/inlinemessage";
import Inplace from "primevue/inplace";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import InputText from "primevue/inputtext";
import Knob from "primevue/knob";
import Galleria from "primevue/galleria";
import Listbox from "primevue/listbox";
import MegaMenu from "primevue/megamenu";
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import Message from "primevue/message";
import MultiSelect from "primevue/multiselect";
import OrderList from "primevue/orderlist";
import OrganizationChart from "primevue/organizationchart";
import OverlayPanel from "primevue/overlaypanel";
import Paginator from "primevue/paginator";
import Panel from "primevue/panel";
import PanelMenu from "primevue/panelmenu";
import Password from "primevue/password";
import PickList from "primevue/picklist";
import ProgressBar from "primevue/progressbar";
import Rating from "primevue/rating";
import RadioButton from "primevue/radiobutton";
import Ripple from "primevue/ripple";
import SelectButton from "primevue/selectbutton";
import ScrollPanel from "primevue/scrollpanel";
import ScrollTop from "primevue/scrolltop";
import Slider from "primevue/slider";
import Sidebar from "primevue/sidebar";
import Skeleton from "primevue/skeleton";
import SplitButton from "primevue/splitbutton";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Steps from "primevue/steps";
import StyleClass from "primevue/styleclass";
import TabMenu from "primevue/tabmenu";
import Tag from "primevue/tag";
import TieredMenu from "primevue/tieredmenu";
import Textarea from "primevue/textarea";
import Timeline from "primevue/timeline";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Toolbar from "primevue/toolbar";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Tooltip from "primevue/tooltip";
import ToggleButton from "primevue/togglebutton";
import Tree from "primevue/tree";
import TreeSelect from "primevue/treeselect";
import TreeTable from "primevue/treetable";
import TriStateCheckbox from "primevue/tristatecheckbox";
import Datepicker from "@vuepic/vue-datepicker";

import CodeHighlight from "./AppCodeHighlight";
import BlockViewer from "./BlockViewer";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
// import Paginate from 'vuejs-paginate';
import store from "./service/Vuex";

// import gAuthOptions from "vue3-google-oauth2";

// import App from './App.vue'
import GAuth from "vue3-google-oauth2";
// const app = createApp(App)

// const gAuthOptions = { clientId: 'YOUR_CLIENT_ID', scope: 'email', prompt: 'consent', fetch_basic_profile: false }
// app.use(GAuth, gAuthOptions)
// ```

const app = createApp(AppWrapper);
let gauthClientId =
  "413588373927-vk2f1rqog6lbqh9b2t91fjrnq2vvrhnt.apps.googleusercontent.com";
app.use(GAuth, {
  clientId: gauthClientId,
  scope: "email",
  prompt: "consent",
  fetch_basic_profile: false,
  plugin_name: "vue3-google-oauth2",
});

// window.gapi.client
//         .init({
//           clientId:'Your Client ID',
//           scope: "email",
//           plugin_name:'App Name that you used in google developer console API'
//         })
// const gAuthOptions = { clientId: 'YOUR_CLIENT_ID', scope: 'email', prompt: 'consent',  }
// app.use(GAuth, gAuthOptions)

// axios.defaults.baseURL = "http://178.128.216.177:8081/api/v1";

//axios.defaults.baseURL = "http://122.155.208.221/api/v1";
// axios.defaults.baseURL = "http://localhost:8083/api/v1";
axios.defaults.baseURL = "https://biotech-cbg.dld.go.th/api/v1";
// axios.defaults.headers.common['Referer'] = "https://losadasdasssscalhost1",

router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0);
  next();
});

app.config.globalProperties.$appState = reactive({
  theme: "lara-light-indigo",
  darkTheme: false,
});

app.use(PrimeVue, {
  ripple: true,
  inputStyle: "outlined",
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "เคลียร์",
    apply: "นำมาใช้",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "ยืนยัน",
    reject: "ยกเลิก",
    choose: "เลือก",
    upload: "อัพโหลด",
    cancel: "ยกเลิก",
    dayNames: [
      "อาทิตย์",
      "จันทร์",
      "อังคาร",
      "พุธ",
      "พฤหัสบดี",
      "ศุกร์",
      "เสาร์",
    ],
    dayNamesShort: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
    dayNamesMin: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
    monthNames: [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ],
    monthNamesShort: [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ],
    today: "วันนี้",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    emptyMessage: "No available options",
  },
});
app.use(ConfirmationService);
app.use(ToastService);
app.use(router);
app.use(store);

app.directive("tooltip", Tooltip);
app.directive("ripple", Ripple);
app.directive("code", CodeHighlight);
app.directive("badge", BadgeDirective);
app.directive("styleclass", StyleClass);

app.component("Accordion", Accordion);
app.component("AccordionTab", AccordionTab);
app.component("AutoComplete", AutoComplete);
app.component("Avatar", Avatar);
app.component("AvatarGroup", AvatarGroup);
app.component("Badge", Badge);
app.component("Breadcrumb", Breadcrumb);
app.component("Button", Button);
app.component("Calendar", Calendar);
app.component("Card", Card);
app.component("Carousel", Carousel);
app.component("Chart", Chart);
app.component("Checkbox", Checkbox);
app.component("Chip", Chip);
app.component("Chips", Chips);
app.component("ColorPicker", ColorPicker);
app.component("Column", Column);
app.component("ConfirmDialog", ConfirmDialog);
app.component("ConfirmPopup", ConfirmPopup);
app.component("ContextMenu", ContextMenu);
app.component("DataTable", DataTable);
app.component("DataView", DataView);
app.component("DataViewLayoutOptions", DataViewLayoutOptions);
app.component("Dialog", Dialog);
app.component("Divider", Divider);
app.component("Dropdown", Dropdown);
app.component("Fieldset", Fieldset);
app.component("FileUpload", FileUpload);
app.component("Image", Image);
app.component("InlineMessage", InlineMessage);
app.component("Inplace", Inplace);
app.component("InputMask", InputMask);
app.component("InputNumber", InputNumber);
app.component("InputSwitch", InputSwitch);
app.component("InputText", InputText);
app.component("Galleria", Galleria);
app.component("Knob", Knob);
app.component("Listbox", Listbox);
app.component("MegaMenu", MegaMenu);
app.component("Menu", Menu);
app.component("Menubar", Menubar);
app.component("Message", Message);
app.component("MultiSelect", MultiSelect);
app.component("OrderList", OrderList);
app.component("OrganizationChart", OrganizationChart);
app.component("OverlayPanel", OverlayPanel);
app.component("Paginator", Paginator);
app.component("Panel", Panel);
app.component("PanelMenu", PanelMenu);
app.component("Password", Password);
app.component("PickList", PickList);
app.component("ProgressBar", ProgressBar);
app.component("RadioButton", RadioButton);
app.component("Rating", Rating);
app.component("SelectButton", SelectButton);
app.component("ScrollPanel", ScrollPanel);
app.component("ScrollTop", ScrollTop);
app.component("Slider", Slider);
app.component("Sidebar", Sidebar);
app.component("Skeleton", Skeleton);
app.component("SplitButton", SplitButton);
app.component("Splitter", Splitter);
app.component("SplitterPanel", SplitterPanel);
app.component("Steps", Steps);
app.component("TabMenu", TabMenu);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("Tag", Tag);
app.component("Textarea", Textarea);
app.component("TieredMenu", TieredMenu);
app.component("Timeline", Timeline);
app.component("Toast", Toast);
app.component("Toolbar", Toolbar);
app.component("ToggleButton", ToggleButton);
app.component("Tree", Tree);
app.component("TreeSelect", TreeSelect);
app.component("TreeTable", TreeTable);
app.component("TriStateCheckbox", TriStateCheckbox);
app.component("Datepicker", Datepicker);
app.component("BlockViewer", BlockViewer);

// app.component("VueAwesomePaginate", VueAwesomePaginate);

// app.component('paginate', Paginate)

app.use(VueAwesomePaginate).mount("#app");
