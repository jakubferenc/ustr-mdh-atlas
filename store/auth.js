/*eslint no-unsafe-optional-chaining: "error"*/

export const state = () => ({
  user_logged: null,
});
/*
this will update the state with the posts
*/

export const getters = {

  getCurrentUser(state) {
    return state.user_logged?.uid || localStorage.getItem('user_logged')?.uid;
  }

};

export const mutations = {

  ON_LOGIN_USER: (state, authUser ) => {
    const { uid, email, emailVerified } = authUser;
    state.user_logged = { uid, email, emailVerified }
    localStorage.setItem('user_logged', state.user_logged);
  },
  ON_LOGOUT_USER: (state) => {
    state.user_logged = null;
    localStorage.removeItem('user_logged');
  },

  ON_AUTH_STATE_CHANGED_MUTATION: (state, authUser) => {
    console.log('ON_AUTH_STATE_CHANGED_MUTATION', authUser);
  }

};
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
  logout: ({state, commit, dispatch}) => {
    commit('ON_LOGOUT_USER');
  },
  login: ({state, commit, dispatch}, { authUser }) => {
    commit('ON_LOGIN_USER', authUser);
  },
  onAuthStateChangedAction: ({state, commit, dispatch}, { authUser }) => {
    console.log('onAuthStateChangedAction', authUser);
  },
};
