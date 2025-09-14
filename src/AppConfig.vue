<template>
    <div id="layout-config" :class="containerClass">
        <a
            href="#"
            class="layout-config-button"
            id="layout-config-button"
            @click="toggleConfigurator"
        >
            <i class="pi pi-cog"></i>
        </a>
        <Button
            class="p-button-danger layout-config-close p-button-rounded p-button-text"
            icon="pi pi-times"
            @click="hideConfigurator"
            :style="{ 'z-index': 1 }"
        ></Button>

        <div class="layout-config-content">
            <h5 class="mt-0">ปรับขนาดตัวอักษร</h5>
            <div class="config-scale">
                <Button
                    icon="pi pi-minus"
                    @click="decrementScale()"
                    class="p-button-text"
                    :disabled="scale === scales[0]"
                />
                <i
                    class="pi pi-circle-on"
                    v-for="s of scales"
                    :class="{ 'scale-active': s === scale }"
                    :key="s"
                />
                <Button
                    icon="pi pi-plus"
                    @click="incrementScale()"
                    class="p-button-text"
                    :disabled="scale === scales[scales.length - 1]"
                />
            </div>

            <h5>Input Style</h5>
            <div class="p-formgroup-inline">
                <div class="field-radiobutton">
                    <RadioButton
                        id="input_outlined"
                        name="inputstyle"
                        value="outlined"
                        :modelValue="$primevue.config.inputStyle"
                        @change="changeInputStyle('outlined')"
                    />
                    <label for="input_outlined">Outlined</label>
                </div>
                <div class="field-radiobutton">
                    <RadioButton
                        id="input_filled"
                        name="inputstyle"
                        value="filled"
                        :modelValue="$primevue.config.inputStyle"
                        @change="changeInputStyle('filled')"
                    />
                    <label for="input_filled">Filled</label>
                </div>
            </div>

            <h5>Ripple Effect</h5>
            <InputSwitch
                :modelValue="rippleActive"
                @update:modelValue="changeRipple"
            />

            <h5>Default Filter</h5>

            <div class="col-12 sm:col-12 lg:col-12">
                <label
                    for="AIZoneID"
                    class="block text-600 text-sm font-bold mb-2"
                >
                    ศูนย์วิจัย</label
                >
                <Dropdown
                    class="w-full"
                    v-model="search.AIZoneID"
                    :options="dropdown.AIZones"
                    optionLabel="AIZoneName"
                    optionValue="AIZoneID"
                    :disabled="isSelectAIZoneDisabled"
                    :filter="true"
                    :showClear="true"
                    placeholder="เลือกศูนย์วิจัย"
                >
                </Dropdown>
            </div>

            <div class="col-12 sm:col-12 lg:col-12">
                <label
                    for="searchOrganizationZoneID"
                    class="block text-600 text-sm font-bold mb-2"
                >
                    เขตพื้นที่ปศุสัตว์</label
                >
                <Dropdown
                    class="w-full"
                    v-model="search.OrganizationZoneID"
                    :options="dropdown.OrganizationZones"
                    optionLabel="OrganizationZoneName"
                    optionValue="OrganizationZoneID"
                    :disabled="isSelectOrganizationZoneDisabled"
                    :filter="true"
                    :showClear="true"
                    placeholder="เลือกเขตพื้นที่ปศุสัตว์"
                >
                </Dropdown>
            </div>

            <div class="col-12 sm:col-12 lg:col-12">
                <label
                    for="searchProvinceID"
                    class="block text-600 text-sm font-bold mb-2"
                >
                    จังหวัด</label
                >
                <Dropdown
                    class="w-full"
                    v-model="search.ProvinceID"
                    :options="dropdown.Provinces"
                    optionLabel="ProvinceName"
                    optionValue="ProvinceID"
                    :filter="true"
                    :showClear="true"
                    placeholder="ทั้งหมด"
                >
                </Dropdown>
            </div>

            <div class="col-12 sm:col-12 lg:col-12">
                <label
                    for="searchAmphurID"
                    class="block text-600 text-sm font-bold mb-2"
                >
                    อำเภอ</label
                >
                <Dropdown
                    class="w-full"
                    v-model="search.AmphurID"
                    :options="dropdown.Amphurs"
                    optionLabel="AmphurName"
                    optionValue="AmphurID"
                    :filter="true"
                    :showClear="true"
                    placeholder="ทั้งหมด"
                >
                </Dropdown>
            </div>

            <div class="col-12 sm:col-12 lg:col-12">
                <label
                    for="searchTumbolID"
                    class="block text-600 text-sm font-bold mb-2"
                >
                    ตำบล</label
                >
                <Dropdown
                    class="w-full"
                    v-model="search.TumbolID"
                    :options="dropdown.Tumbols"
                    optionLabel="TumbolName"
                    optionValue="TumbolID"
                    :filter="true"
                    :showClear="true"
                    placeholder="ทั้งหมด"
                >
                </Dropdown>
            </div>

            <div class="col-12 sm:col-12 lg:col-12">
                <label
                    for="searchOrganizationID"
                    class="block text-600 text-sm font-bold mb-2"
                >
                    หน่วยงาน</label
                >
                <Dropdown
                    :showClear="true"
                    class="w-full"
                    placeholder="ทั้งหมด"
                    optionLabel="OrganizationFull"
                    optionValue="OrganizationID"
                    :virtualScrollerOptions="{ itemSize: 38 }"
                    :options="dropdown.Organizations"
                    :filter="true"
                    v-model="search.OrganizationID"
                />
            </div>

            <div class="col-12 sm:col-12 lg:col-12">
                <label
                    for="searchFarmID"
                    class="block text-600 text-sm font-bold mb-2"
                >
                    ฟาร์ม
                    (โปรดระบุศูนย์วิจัยหรือเขตพื้นที่ปศุสัตว์ก่อนเลือกฟาร์ม)</label
                >
                <v-select
                    :disabled="
                        search.OrganizationZoneID == null &&
                        search.AIZoneID == null
                    "
                    v-model="search.FarmID"
                    :options="dropdown.Farms"
                    @search="fetchFarm"
                    label="Fullname"
                    value="FarmID"
                    class="w-full"
                    placeholder="เลือกฟาร์มปลายทาง (พิมพ์ 3 ตัวอักษรเพื่อค้นหา)"
                ></v-select>
            </div>

            <div class="col-12 sm:col-12 lg:col-12">
                <div class="text-sm text-red-500 text-center mb-2 mt-5">
                    (โปรดระบุศูนย์วิจัยหรือเขตพื้นที่ปศุสัตว์ก่อนกดปุ่มบันทึก)
                </div>

                <Button
                    @click="onSave"
                    :disabled="
                        search.OrganizationZoneID == null &&
                        search.AIZoneID == null
                    "
                    label="บันทึก"
                    icon=""
                    style="width: 100%"
                    class="mr-2 mb-3"
                />
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from "./AppEventBus";
import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
    components: {
        vSelect,
    },
    data() {
        return {
            active: false,
            scale: 14,
            scales: [12, 13, 14, 15, 16],
            dropdown: {
                AIZones: [],
                OrganizationZones: [],
                Farms: [],
                Provinces: [],
                Amphurs: [],
                Tumbols: [],
                Organizations: [],
            },
            search: {
                AIZoneID: null,
                OrganizationZoneID: null,
                FarmID: null,
                ProvinceID: null,
                AmphurID: null,
                TumbolID: null,
                OrganizationID: null,
            },
            isSelectAIZoneDisabled: false,
            isSelectOrganizationZoneDisabled: false,
            url: {
                AIZone: "/ai-zone/selection?includeAll=false",
                OrganizationZone:
                    "/organization-zone/selection?includeAll=false&isActive=1",
                Farm: "/farm/selection?includeAll=true",
                Province: "/province/selection?includeAll=false",
                Amphur: "/amphur/selection?includeAll=false",
                Tumbol: "/tumbol/selection?includeAll=false",
                Organization: "/organization/selection?includeAll=false",
            },
        };
    },
    outsideClickListener: null,
    themeChangeListener: null,
    watch: {
        "search.AIZoneID"(val) {
            if (val) {
                this.search.OrganizationZoneID = null;
                this.isSelectAIZoneDisabled = false;
                this.isSelectOrganizationZoneDisabled = true;
            } else {
                this.isSelectAIZoneDisabled = false;
                this.isSelectOrganizationZoneDisabled = false;
            }
            if (this.isLoading == false) {
                // this.isLoading = true;
                setTimeout(() => {
                    this.fetchProvince();
                    this.fetchOrganization();
                    this.dropdown.Amphurs = [];
                    this.dropdown.Tumbols = [];

                    this.search.ProvinceID = null;
                    this.search.AmphurID = null;
                    this.search.TumbolID = null;
                    //   this.search.OrganizationTypeID = null;
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.OrganizationZoneID"(val) {
            if (val) {
                this.search.AIZoneID = null;
                this.isSelectAIZoneDisabled = true;
                this.isSelectOrganizationZoneDisabled = false;
            } else {
                this.isSelectAIZoneDisabled = false;
                this.isSelectOrganizationZoneDisabled = false;
            }
            if (this.isLoading == false) {
                // this.isLoading = true;
                setTimeout(() => {
                    this.fetchProvince();
                    this.fetchOrganization();

                    this.search.ProvinceID = null;
                    this.search.AmphurID = null;
                    this.search.TumbolID = null;
                    //   this.search.OrganizationTypeID = null;
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.ProvinceID"() {
            this.fetchAmphur();
            this.fetchOrganization();

            if (this.isLoading == false) {
                setTimeout(() => {
                    this.search.AmphurID = null;
                    this.search.TumbolID = null;
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.AmphurID"() {
            this.fetchTumbol();
            this.fetchOrganization();

            if (this.isLoading == false) {
                setTimeout(() => {
                    this.search.TumbolID = null;
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },
        "search.TumbolID"() {
            this.fetchOrganization();

            if (this.isLoading == false) {
                setTimeout(() => {
                    this.search.OrganizationID = null;
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },

        "search.OrganizationID"() {
            if (this.isLoading == false) {
                setTimeout(() => {
                    this.search.FarmID = null;
                    this.isLoading = false;
                }, 1000);
            }
        },

        "search.FarmID"() {
            if (this.isLoading == false) {
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            }
        },
        $route() {
            if (this.active) {
                this.active = false;
                this.unbindOutsideClickListener();
            }
        },
    },
    beforeUnmount() {
        EventBus.off("theme-change", this.themeChangeListener);
    },
    mounted() {
        this.themeChangeListener = () => {
            this.applyScale();
        };

        this.fetchAIZone();
        this.fetchOrganizationZone();

        EventBus.on("theme-change", this.themeChangeListener);
    },
    methods: {
        fetchAIZone() {
            let params = {};
            //  Fetch AIZone
            axios
                .get(this.url.AIZone, {
                    params: params,
                })
                .then((res) => {
                    this.dropdown.AIZones = res.data.rows;

                    this.dropdown.AIZones.push({
                        AIZoneID: 99,
                        AIZoneName: "ทั้งหมด",
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchOrganizationZone() {
            let params = {};
            //  Fetch OrganizationZone
            axios
                .get(this.url.OrganizationZone, {
                    params: params,
                })
                .then((res) => {
                    this.dropdown.OrganizationZones = res.data.rows;
                    this.dropdown.OrganizationZones.push({
                        OrganizationZoneID: 99,
                        OrganizationZoneName: "ทั้งหมด",
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchProvince() {
            //  Fetch Province
            let params = {};

            if (this.search.AIZoneID != null) {
                params["AIZoneID"] = this.search.AIZoneID;
                // this.dropdown.Provinces = res.data.rows.filter((x) => {
                //   return x.AIZoneID == this.search.AIZoneID;
                // });
            }

            if (this.search.OrganizationZoneID != null) {
                params["OrganizationZoneID"] = this.search.OrganizationZoneID;
                // this.dropdown.Provinces = res.data.rows.filter((x) => {
                //   return x.OrganizationZoneID == this.search.OrganizationZoneID;
                // });
            }
            axios
                .get(this.url.Province, {
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Provinces = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                    this.loader = true;
                });
        },
        fetchAmphur() {
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null &&
                this.search.ProvinceID == null
            ) {
                return;
            }

            let params = {};

            if (this.search.ProvinceID != null) {
                params["ProvinceID"] = this.search.ProvinceID;
            }

            axios
                .get(this.url.Amphur, {
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Amphurs = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                    this.loader = true;
                });
        },
        fetchTumbol() {
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null &&
                this.search.ProvinceID == null
            ) {
                return;
            }

            let params = {};

            if (this.search.AmphurID != null) {
                params["AmphurID"] = this.search.AmphurID;
            }

            axios
                .get(this.url.Tumbol, {
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Tumbols = res.data.rows;
                })
                .finally(() => {
                    this.isLoading = false;
                    this.loader = true;
                });
        },
        fetchOrganization() {
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null
            ) {
                return;
            }

            let params = {};

            if (this.search.OrganizationTypeID != null) {
                params["OrganizationTypeID"] = this.search.OrganizationTypeID;
            }

            // Province IN AIZOne
            if (this.search.AIZoneID != null) {
                params["OrganizationAiZoneID"] = this.search.AIZoneID;
            }

            if (this.search.OrganizationZoneID != null) {
                params["OrganizationZoneID"] = this.search.OrganizationZoneID;
            }

            if (this.search.ProvinceID != null) {
                params["OrganizationProvinceID"] = this.search.ProvinceID;
            }

            if (this.search.AmphurID != null) {
                params["OrganizationAmphurID"] = this.search.AmphurID;
            }

            if (this.search.TumbolID != null) {
                params["OrganizationTumbolID"] = this.search.TumbolID;
            }

            axios
                .get(this.url.Organization, {
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Organizations = res.data.rows.map((item) => {
                        return {
                            OrganizationID: item.OrganizationID,
                            OrganizationFull:
                                item.OrganizationCode +
                                ", " +
                                item.OrganizationName,
                        };
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                    this.loader = true;
                });
        },
        fetchFarm() {
            if (
                this.search.AIZoneID == null &&
                this.search.OrganizationZoneID == null
            ) {
                return;
            }

            let params = {};

            // Province IN AIZOne
            if (this.search.AIZoneID != null) {
                params["AIZoneID"] = this.search.AIZoneID;
            }

            if (this.search.OrganizationZoneID != null) {
                params["OrganizationZoneID"] = this.search.OrganizationZoneID;
            }

            if (this.search.ProvinceID != null) {
                params["ProvinceID"] = this.search.ProvinceID;
            }

            if (this.search.AmphurID != null) {
                params["AmphurID"] = this.search.AmphurID;
            }

            if (this.search.TumbolID != null) {
                params["TumbolID"] = this.search.TumbolID;
            }

            if (this.search.OrganizationID != null) {
                params["OrganizationID"] = this.search.OrganizationID;
            }

            axios
                .get(this.url.Farm, {
                    params: params,
                })
                .then((res) => {
                    this.dropdown.Farms = res.data.rows
                        .sort((a, b) =>
                            a.Province
                                ? a.Province.ProvinceName.localeCompare(
                                      b.Province.ProvinceName
                                  )
                                : false
                        )
                        .map((item) => {
                            // let name = item.Farmer
                            //     ? item.Farmer.FullName
                            //     : "- ";
                            // let number = item.FarmIdentificationNumber
                            //     ? item.FarmIdentificationNumber
                            //     : "- ";
                            // let province = item.Province
                            //     ? item.Province.ProvinceName
                            //     : "- ";
                            // let Organization = item.OrganizationZone
                            //     ? item.OrganizationZone.OrganizationZoneName
                            //     : "- ";

                            return {
                                FarmID: item.FarmID,
                                FarmName: item.FarmName,
                                FarmIdentificationNumber:
                                    item.FarmIdentificationNumber,
                                Fullname: item.Fullname,
                            };
                        });
                })
                .finally(() => {
                    this.isLoading = false;
                    this.loader = true;
                });
        },

        toggleConfigurator(event) {
            this.active = !this.active;
            event.preventDefault();

            if (this.active) this.bindOutsideClickListener();
            else this.unbindOutsideClickListener();
        },
        hideConfigurator(event) {
            this.active = false;
            this.unbindOutsideClickListener();
            event.preventDefault();
        },
        changeInputStyle(value) {
            this.$primevue.config.inputStyle = value;
        },
        changeRipple(value) {
            this.$primevue.config.ripple = value;
        },
        changeLayout(event, layoutMode) {
            this.$emit("layout-change", layoutMode);
            event.preventDefault();
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.active && this.isOutsideClicked(event)) {
                        this.active = false;
                    }
                };
                document.addEventListener("click", this.outsideClickListener);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener) {
                document.removeEventListener(
                    "click",
                    this.outsideClickListener
                );
                this.outsideClickListener = null;
            }
        },
        isOutsideClicked(event) {
            // เพิ่มการตรวจสอบว่าเป็น dropdown หรือไม่
            const isDropdown =
                event.target.closest(".p-dropdown") ||
                event.target.closest(".p-dropdown-panel") ||
                event.target.closest(".vue-select") ||
                event.target.closest(".vs__dropdown-menu");

            // ถ้าเป็น dropdown ให้ return false เพื่อไม่ให้ยุบ layout
            if (isDropdown) {
                return false;
            }

            return !(
                this.$el.isSameNode(event.target) ||
                this.$el.contains(event.target)
            );
        },
        decrementScale() {
            this.scale--;
            this.applyScale();
        },
        incrementScale() {
            this.scale++;
            this.applyScale();
        },
        applyScale() {
            document.documentElement.style.fontSize = this.scale + "px";
        },
        onSave(){
            // ต้องการให้ save local storage
            console.log(this.search);
            localStorage.setItem("AIDMappConfig", JSON.stringify(this.search));
        }
        // changeTheme(event, theme, dark) {
        // 	EventBus.emit('theme-change', { theme: theme, dark: dark });
        // 	event.preventDefault();
        // }
    },
    computed: {
        containerClass() {
            return ["layout-config", { "layout-config-active": this.active }];
        },
        rippleActive() {
            return this.$primevue.config.ripple;
        },
        inputStyle() {
            return this.$appState.inputStyle;
        },
    },
};
</script>
