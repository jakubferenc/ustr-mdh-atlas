/*eslint no-unsafe-optional-chaining: "error"*/
import User from '~/models/User';

export const state = () => ({
  user_logged: null,
});
/*
this will update the state with the posts
*/

export const getters = {
  getCurrentUser(state) {
    return JSON.parse(localStorage.getItem('user_logged')) || state.user_logged;
  },
};

export const mutations = {
  ON_LOGIN_USER: (state, authUser) => {
    const { uid, email, emailVerified } = authUser;
    state.user_logged = { uid, email, emailVerified };
    localStorage.setItem(
      'user_logged',
      JSON.stringify({ uid, email, emailVerified })
    );
  },
  ON_LOGOUT_USER: (state) => {
    state.user_logged = null;
    localStorage.removeItem('user_logged');
  },

  ON_AUTH_STATE_CHANGED_MUTATION: (state, authUser) => {
    console.log('ON_AUTH_STATE_CHANGED_MUTATION', authUser);
  },
};
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
  logout: ({ state, commit, dispatch }) => {
    commit('ON_LOGOUT_USER');
  },
  login: ({ state, commit, dispatch }, { authUser }) => {
    commit('ON_LOGIN_USER', authUser);
  },
  async register({ state, commit, dispatch }, payload = { email, password }) {
    // call firebase
    try {
      const loginResponse =
        await this.$fire.auth.createUserWithEmailAndPassword(
          payload.email,
          payload.password
        );

      if (loginResponse.user.uid) {
        const db = this.$fire.firestore;
        const batch = db.batch();
        const newUserObject = db
          .collection(this.$config.firebaseConfig.collectionUsersId)
          .doc(loginResponse.user.uid);
        const newUserObjectId = newUserObject.id;

        const newUser = new User({
          id: newUserObjectId,
          email: payload.email,
        });
        batch.set(newUserObject, newUser.getDataForApi());
        batch
          .commit()
          .then(async () => {
            dispatch(
              'alert/message',
              { message: 'Váš profil byl vytvořen.' },
              { root: true }
            );
          })
          .catch((e) => {
            throw new Error(e);
          });
      }
    } catch (error) {
      console.error(error);
      dispatch('alert/error', { error: error.message }, { root: true });
    }
  },
  onAuthStateChangedAction: ({ state, commit, dispatch }, { authUser }) => {
    console.log('onAuthStateChangedAction', authUser);
  },
};
