import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import axios from "axios";
import Swal from "sweetalert2";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

export default createStore({
    plugins: [vuexLocal.plugin],
    state: {
        animal: {
            id: null,
            name: "",
            color: {
                color_primary: "",
                color_text: "",
            },
        },
        adminTheme: {
            color_primary: "",
            color_text: "",
        },
        category: {
            id: 1,
            name: "registration",
        },
        user: {},
        staff: {},
        access_token: null,
        item: {},
        AnimalID: null,
        AnimalSecretStatus: null,

        itemfarm: {},
        itemborn: {},
        itemanimal: {},
        itemtab: {},
        SetFarmDiagnose: null,
        SetFarmVaccine: null,
        SetFarmCure: null,
        SetFarmDeworm: null,
        Alert_AnimalID: null,
        SetFarmDistribution: null,
        permission: [],

        SetGoogleMail: null,
        msg: null,
    },
    getters: {
        animal_id(state) {
            return state.animal.id;
        },
        animal_name(state) {
            return state.animal.name;
        },
        animal(state) {
            return state.animal;
        },
        adminTheme(state) {
            return state.adminTheme;
        },
        color(state) {
            return state.animal.color;
        },
        category_id(state) {
            return state.category.id;
        },
        category_name(state) {
            return state.category.name;
        },
        user(state) {
            return state.user;
        },
        UserID(state) {
            return state.user.UserID;
        },
        staff(state) {
            return state.staff;
        },
        selectItem(state) {
            return state.item;
        },
        AnimalID(state) {
            return state.AnimalID;
        },
        AnimalSecretStatus(state) {
            return state.AnimalSecretStatus;
        },
        farmItem(state) {
            return state.item;
        },
        bornItem(state) {
            return state.itemborn;
        },
        animalInfo(state) {
            return state.itemanimal;
        },
        farmDataItem(state) {
            return state.itemfarm;
        },
        tabAnimal(state) {
            return state.itemtab;
        },
        FarmDiagnose(state) {
            return state.SetFarmDiagnose;
        },
        FarmVaccine(state) {
            return state.SetFarmVaccine;
        },
        FarmCure(state) {
            return state.SetFarmCure;
        },
        FarmDeworm(state) {
            return state.SetFarmDeworm;
        },
        Alert_AnimalID(state) {
            return state.Alert_AnimalID;
        },
        FarmDistribution(state) {
            return state.SetFarmDistribution;
        },
        get_permission(state) {
            return state.permission;
        },

        getGoogleMail(state) {
            return state.SetGoogleMail;
        },
    },
    mutations: {
        set_animal(state, animal) {
            state.animal = animal;
        },
        setAdminTheme(state, adminTheme) {
            state.adminTheme = adminTheme;
        },
        set_category(state, category) {
            state.category = category;
        },
        set_token(state, token) {
            state.access_token = token;
        },
        set_user(state, user) {
            state.user = user;
        },
        set_staff(state, staff) {
            state.staff = staff;
        },
        LogOut(state) {
            state.user = null;
            state.access_token = null;
            state.animal = {};
            state.adminTheme = {};
        },
        set_item(state, item) {
            state.item = item;
        },
        set_SetGoogleMail(state, item) {
            state.SetGoogleMail = item;
        },
        set_AnimalID(state, AnimalID) {
            state.AnimalID = AnimalID;
        },
        set_AnimalSecretStatus(state, AnimalSecretStatus) {
            state.AnimalSecretStatus = AnimalSecretStatus;
        },
        set_farm(state, item) {
            state.item = item;
        },
        set_born(state, item) {
            state.itemborn = item;
        },
        set_farmDataItem(state, item) {
            state.itemfarm = item;
        },
        set_animalInfo(state, item) {
            state.itemanimal = item;
        },
        set_tabAnimal(state, item) {
            state.itemtab = item;
        },
        set_farm_diagnose(state, item) {
            state.SetFarmDiagnose = item;
        },
        set_farm_vaccine(state, item) {
            state.SetFarmVaccine = item;
        },
        set_farm_cure(state, item) {
            state.SetFarmCure = item;
        },
        set_farm_deworm(state, item) {
            state.SetFarmDeworm = item;
        },
        set_farm_distribution(state, item) {
            state.SetFarmDistribution = item;
        },
        set_alert_animalID(state, item) {
            state.Alert_AnimalID = item;
        },
        set_permission(state, item) {
            state.permission = item;
        },
    },
    actions: {
        selectAnimal({ commit }, animal) {
            commit("set_animal", animal);
        },
        selectAdminTheme({ commit }, adminTheme) {
            commit("setAdminTheme", adminTheme);
        },
        selectCategory({ commit }, category) {
            commit("set_category", category);
        },
        login({ commit }, form) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/user/login", form)
                    .then((response) => {
                        commit("set_token", response.data.accessToken);
                        commit("set_user", response.data.userData);
                        axios.defaults.headers.common[
                            "Authorization"
                        ] = `Bearer ${response.data.accessToken}`;

                        axios.get("/user/authorize").then((res) => {
                            commit("set_permission", res.data.rows);
                        });

                        resolve(response);
                    })
                    .catch((errors) => {
                        if (errors.response.data.error.message) {
                            this.msg = errors.response.data.error.message;
                        } else {
                            this.msg = "ชื่อผู้ใช้งาน หรือรหัสผ่านไม่ถูกต้อง";
                        }
                        Swal.fire({
                            title: this.msg,
                            text: "กรุณาลองใหม่อีกครั้ง",
                            icon: "error",
                            confirmButtonText: "ตกลง",
                            timer: 3000,
                        });
                        reject(errors);
                    });
            });
        },
        async checkAccessToken({ state }) {
            return await new Promise((resolve, reject) => {
                if (state.user && state.access_token) {
                    axios
                        .get("/user/" + state.user.UserID, {
                            headers: {
                                Authorization: `Bearer ${state.access_token}`,
                            },
                        })
                        .then(() => {
                            axios.defaults.headers.common[
                                "Authorization"
                            ] = `Bearer ${state.access_token}`;
                            resolve(state.access_token);
                        })
                        .catch(() => {
                            axios.defaults.headers.common["Authorization"] =
                                null;
                            reject("Unauthenticated");
                        });
                } else {
                    reject("Unauthenticated");
                }
            });
        },
        async authorize({ commit, state }) {
            return await new Promise(() => {
                if (state.user && state.access_token) {
                    axios
                        .get("/user/authorize", {
                            headers: {
                                Authorization: `Bearer ${state.access_token}`,
                            },
                        })
                        .then((res) => {
                            commit("set_permission", res.data.rows);
                        });
                }
            });
        },
        registercheck({ commit }, form) {
            return new Promise((resolve, reject) => {
                var data = {};
                axios
                    .get("/staff/staff-by-number/" + form)
                    .then((response) => {
                        if (response.data.StaffNumber == form) {
                            data = response.data;

                            axios
                                .get(
                                    "/user/user-by-staff-id/" +
                                        response.data.StaffID
                                )
                                .then((response) => {
                                    if (response.data) {
                                        if (response.data.userID == null) {
                                            commit("set_staff", {
                                                ...data,
                                                userID: response.data.userID,
                                            });
                                            resolve();
                                        } else {
                                            reject("มีข้อมูลผู้ใช้งานอยู่แล้ว");
                                        }
                                    } else {
                                        commit("set_staff", {
                                            ...data,
                                            userID: null,
                                        });
                                        resolve();
                                    }
                                });
                        } else {
                            axios
                                .get("/staff/staff-by-number/" + form)
                                .then((response) => {
                                    if (response.data.StaffNumber == form) {
                                        data = response.data;
                                        axios
                                            .get(
                                                "/user/user-by-staff-id/" +
                                                    response.data.StaffID
                                            )
                                            .then((response) => {
                                                if (response.data) {
                                                    reject(
                                                        "มีข้อมูลผู้ใช้งานอยู่แล้ว"
                                                    );
                                                } else {
                                                    commit("set_staff", data);
                                                    resolve();
                                                }
                                            });
                                    } else {
                                        reject("ไม่พบข้อมูล");
                                    }
                                });
                        }
                    })
                    .catch((errors) => {
                        reject(errors);
                    });
            });
        },
        register({ commit }, form) {
            return new Promise((resolve, reject) => {
                let mobile = form.StaffMobilePhone;
                delete form.StaffMobilePhone;
                form.StaffID = this.state.staff.StaffID;
                form.RegisterDate = new Date();
                form.isRemove = 0;

                if (this.state.staff.userID != null) {
                    axios
                        .put("/user/" + this.state.staff.userID, form)
                        .then(() => {
                            commit("set_user", null);
                            axios
                                .put(
                                    `/staff/${this.state.staff.StaffID}/mobile-phone`,
                                    mobile
                                )
                                .then(() => {
                                    resolve();
                                })
                                .catch((errors) => {
                                    reject(errors);
                                });
                        });
                } else {
                    axios.post("/user/register", form).then(() => {
                        commit("set_user", null);
                        axios
                            .put(
                                `/staff/${this.state.staff.StaffID}/mobile-phone`,
                                mobile
                            )
                            .then(() => {
                                resolve();
                            })
                            .catch((errors) => {
                                reject(errors);
                            });
                    });
                }
            });
        },
        async LogOut({ commit }) {
            let user = null;
            commit("LogOut", user);
        },

        // eslint-disable-next-line no-unused-vars
        check_authorize({ commit, state }, authorize) {
            return new Promise((resolve, reject) => {
                axios
                    .get("/user/check-permission", {
                        headers: {
                            Authorization: `Bearer ${state.access_token}`,
                        },
                        params: {
                            MenuID: authorize.menu,
                            Action: authorize.action,
                        },
                    })
                    .then((response) => {
                        if (response.data.permission) {
                            resolve();
                        } else {
                            reject();
                        }
                    })
                    .catch(() => {
                        reject();
                    });
            });
        },

        selectItem({ commit }, category) {
            commit("set_item", category);
        },

        SetGoogleMail({ commit }, category) {
            // console.log(category);
            commit("set_SetGoogleMail", category);
        },

        selectAnimalID({ commit }, animalID) {
            commit("set_AnimalID", animalID);
        },
        selectAnimalSecretStatus({ commit }, data) {
            commit("set_AnimalSecretStatus", data);
        },

        farmItem({ commit }, category) {
            commit("set_farm", category);
        },
        // เก็บข้อมูลสัตว์ที่เกิดจากการคลอด
        bornItem({ commit }, category) {
            commit("set_born", category);
        },
        // เก็บข้อมูลสัตว์ หน้าข้อมูลสัตว์
        animalInfo({ commit }, category) {
            commit("set_animalInfo", category);
        },
        // เก็บข้อมูลฟาร์ม หน้าข้อมูลฟาร์ม
        farmDataItem({ commit }, category) {
            commit("set_farmDataItem", category);
        },
        // เก็บข้อมูล Tab ล่าสุด
        tabAnimal({ commit }, category) {
            commit("set_tabAnimal", category);
        },

        FarmDiagnose({ commit }, category) {
            commit("set_farm_diagnose", category);
        },
        FarmVaccine({ commit }, category) {
            commit("set_farm_vaccine", category);
        },
        FarmCure({ commit }, category) {
            commit("set_farm_cure", category);
        },
        FarmDeworm({ commit }, category) {
            commit("set_farm_deworm", category);
        },
        Alert_AnimalID({ commit }, category) {
            commit("set_alert_animalID", category);
        },
    },
});
