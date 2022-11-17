/*eslint no-unsafe-optional-chaining: "error"*/

export const state = () => ({
  novy_objekt: {},
  novy_objekt_nav_pozice: 0,
  objekty: [],
  objekt_detail: {},
  loading: false,
  loadingMsg: '',
  logged_user: null,
});
/*
this will update the state with the posts
*/

export const getters = {

  getCurrentNewObject(state) {
    return state.novy_objekt;
  },

  getCurrentLoggedInUser(state) {
    return state.logged_user;
  }

};

export const mutations = {

  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    // Don't do this:
    state.user = authUser

    // Do this:
    const { uid, email, emailVerified } = authUser
    state.logged_user = { uid, email, emailVerified }
  },

  updateObjektDetail: (state, objekt_detail) => {

    state.objekt_detail = objekt_detail;

  },

  updateLoading: (state, {isLoading, message}) => {

    state.loading = isLoading;
    state.loadingMsg = message;

  },

  updateObjekty: (state, objekty) => {

    state.objekty = objekty;

  },

  updateNovyObjektNavPozice: (state, novy_objekt_nav_pozice) => {

    state.novy_objekt_nav_pozice = novy_objekt_nav_pozice;

  },

  updateNovyObjekt: (state, newData) => {

    state.novy_objekt = {
      ...state.novy_objekt,
      ...newData,
    };

  },

  removeNovyObjekt: (state) => {

    state.novy_objekt = {};

  },

};
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
  onAuthStateLogoutAction: ({state, commit, dispatch}, { authUser }) => {

  },
  onAuthStateLoginAction: ({state, commit, dispatch}, { authUser }) => {

  },

   async getObjekt({state, commit, dispatch}, objektId) {

    const getThisObjekt = state.objekty.filter(objekt => objekt.id === objektId);

    if (state.objekty.length && getThisObjekt.length === 1) {

        // we have the objekt in the stored result
        commit("updateObjektDetail", getThisObjekt[0]);

    } else {

      // we do not have the objekt in the stored results, therefore hit the API

      dispatch("setLoading", {isLoading: true, message: 'Nahrávám...'});

      // I am artificially making the Firebase API compatible with await/async implementation of
      // API calls that I use in fetch() or asyncData() on pages and components
      // In this way, I can use Google Firebase Library as if it already supported async/await syntax
      // At the moment it does not support it yet (I believe)
      // If it supports the async/await syntax, please do refactoring of the code below
      return new Promise((resolve, reject) => {

        try {

          const db = this.$fire.firestore;

          db.collection(this.$config.firebaseConfig.collectionID).doc(objektId)
          .get()
          .then((doc) => {

            const data = doc.data();

            const id = doc.id;

            const objekt = { id, ...data};

            commit("updateObjektDetail", objekt);
            dispatch("setLoading", {isLoading: false, message: false});

            resolve();


          }).catch((error) => {
            console.log("Error getting document:", error);
          });


        } catch (err) {
          console.log(err);
        }

      });

    }

  },


  async getVsechnyObjekty ({ state, commit, dispatch }, { userId }) {

    if (state.objekty.length) return;

    dispatch("setLoading", {
      isLoading: true,
      message: "Načítám...",
    });

    try {

      const db = this.$fire.firestore;
      const collectionQuery = db
        .collection(this.$config.firebaseConfig.collectionID)
        .where('user_id', '==', userId);

      const querySnapshot = await collectionQuery.get();
      const objekty = querySnapshot.docs.map( (doc) => {

          const data = doc.data();

          const id = doc.id;

          return { id, ...data };

      });
      commit("updateObjekty", objekty);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch("setLoading", {isLoading: false, message: false});
    }

  },

  setLoading ({ state, commit }, {isLoading, message}) {
    try {

      commit("updateLoading", {isLoading, message});

    } catch (err) {
      console.log(err);
    }
  },


  setNovyObjektNavPozice ({ state, commit }, nav_pozice) {
    try {

      commit("updateNovyObjektNavPozice", nav_pozice);

    } catch (err) {
      console.log(err);
    }
  },

  setPrihlasenyUzivatel ({ state, commit }, prihlaseny_uzivatel) {
    try {

      commit("updatePrihlasenyUzivatel", prihlaseny_uzivatel);

    } catch (err) {
      console.log(err);
    }
  },

  setNovyObjekt ({ state, commit }, novy_objekt) {
    try {

      commit("updateNovyObjekt", novy_objekt);

    } catch (err) {
      console.log(err);
    }
  },

  removeNovyObjekt ({ state, commit }) {
    try {

      commit("removeNovyObjekt");

    } catch (err) {
      console.log(err);
    }
  },

};
