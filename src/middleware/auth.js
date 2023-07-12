import store from "./../service/Vuex";

export default async function ({ next }) {
  return await store
    .dispatch("checkAccessToken")
    .then(() => {
      store.dispatch("authorize");
      return next();
    })
    .catch(() => {
      return next({ name: "login" });
    });
}
