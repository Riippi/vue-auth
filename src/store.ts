import Vue from 'vue';
import Vuex from 'vuex';
import axios from './axios-auth';
import globalAxios from 'axios';
import router from './router';

Vue.use(Vuex);

const FIREBASE_KEY = process.env.VUE_APP_FIREBASE_KEY

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    notes: null,
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    storeNotes(state, notes) {
      state.notes = notes;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    },
  },
  actions: {
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    signup({ commit, dispatch }, authData) {
      axios
        .post(`/signupNewUser?key=${FIREBASE_KEY}`, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((res) => {
          console.log(res);
          dispatch('storeUser', res.data)
          router.replace('/')
        })
        .catch((error) => console.log(error));
    },
    login({ commit, dispatch }, authData) {
      axios.post(`/verifyPassword?key=${FIREBASE_KEY}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
        .then((res) => {
          console.log(res);
          dispatch('storeUser', res.data)
          router.replace('/')
        })
        .catch((error) => console.log(error));
    },
    storeUser({ commit, dispatch }, userData) {
      commit('authUser', {
        token: userData.idToken,
        userId: userData.localId,
      });

      const now = new Date()
      const expirationDate = new Date(now.getTime() + userData.expiresIn * 1000)
      localStorage.setItem('token', userData.idToken)
      localStorage.setItem('userId', userData.localId)
      localStorage.setItem('expirationDate', String(expirationDate.getTime()))

      dispatch('setLogoutTimer', userData.expiresIn)
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate') || ''
      // const savedDate = new Date(expirationDate);
      const now = new Date()
      if (now.getTime() >= +expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    logout({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/sign-in')
    },
    storeNote({ dispatch, state }, note) {
      if (!state.idToken) {
        return;
      }

      globalAxios.post('/notes.json' + '?auth=' + state.idToken, note)
        .then((res) => {

          dispatch('fetchNotes')
          console.log(res)
        })
        .catch((error) => console.log(error));
    },
    deleteNote({ dispatch, state }, noteId) {
      if (!state.idToken) {
        return;
      }
      globalAxios.delete('/notes/' + noteId + '.json?auth=' + state.idToken)
        .then((res) => {
          console.log(res)
          dispatch('fetchNotes')
        })
        .catch((error) => console.log(error));
    },
    fetchNotes({ commit, state }) {
      if (!state.idToken) {
        return;
      }

      globalAxios.get('/notes.json' + '?auth=' + state.idToken)
        .then((res) => {
          console.log(res);
          const data = res.data;
          const notes = [];
          for (const key in data) {
            const note = data[key];
            note.id = key;
            notes.push(note);
          }
          commit('storeNotes', notes);
        })
        .catch((error) => console.log(error));
    },
  },
  getters: {
    notes(state) {
      return state.notes;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    },
  },
});
