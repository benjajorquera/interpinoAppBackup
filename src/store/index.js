import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessData: {
      username: "admin",
      password: "admin",
    },
    isLogged: false,

    // Snackbars messages
    snackbar: {
      show: false,
      text: "",
      multiLine: false,
      timeout: -1,
      color: "",
    },
    backupDate: "",
    lastDateEmail: ""
  },
  getters: {
    getAccessData: (state) => state.accessData,
    getIsLogged: (state) => state.isLogged,
    getBackupDate: (state) => state.backupDate,
    getLastDateEmail: (state) => state.lastDateEmail,
  },
  mutations: {
    setIsLogged: (state, payload) => {
      state.isLogged = payload;
    },

    // Snackbars messages
    showMessage(state, payload) {
      state.snackbar.show = true;
      state.snackbar.text = payload.text;
      state.snackbar.multiLine = payload.multiLine;
      state.snackbar.timeout = payload.timeout;
      state.snackbar.color = payload.color;
    },
    showSuccessMessage(state, text) {
      state.snackbar.show = true;
      state.snackbar.text = text;
      state.snackbar.multiLine = false;
      state.snackbar.timeout = 3000;
      state.snackbar.color = "success";
    },
    showErrorMessage(state, text) {
      state.snackbar.show = true;
      state.snackbar.text = text;
      state.snackbar.multiLine = true;
      state.snackbar.timeout = -1;
      state.snackbar.color = "error";
    },
    closeMessage(state) {
      state.snackbar.show = false;
    },
    setBackupDate(state, date) {
      state.backupDate = date;
    },
    setLastDateEmail(state, date) {
      state.lastDateEmail = date; 
    }
  },
  actions: {
    login: ({ commit, state }) => {
      commit("setIsLogged", true);
      commit("showSuccessMessage", "Ha iniciado la sesión!");
    },
    logout: ({ commit, state }) => {
      commit("setIsLogged", false);
      commit("showSuccessMessage", "Ha cerrado la sesión!");
    },
    // Snackbars messages
    showMessage: ({ commit }, payload) => {
      commit("showMessage", payload);
    },
    showSuccessMessage: ({ commit }, text) => {
      commit("showSuccessMessage", text);
    },
    showErrorMessage: ({ commit }, text) => {
      commit("showErrorMessage", text);
    },
    closeMessage: ({ commit }) => {
      commit("closeMessage");
    },
    setBackupDate: ({ commit }, date) => {
      commit("setBackupDate", date);
    },
    // Date last email
    setLastDateEmail: ({commit}, date) => {
      commit('setLastDateEmail', date);
    }
  },
  modules: {},
});
