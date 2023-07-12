import store from "./../service/Vuex";

export default function animal({next}) {
    if (!store.getters.animal_id) {
        return next({name: "gateway"});
    }
    return next();
}
