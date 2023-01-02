/*eslint no-unsafe-optional-chaining: "error"*/

export const state = () => ({
  message: null,
  error: null,
});
/*
this will update the state with the posts
*/

export const getters = {
  getCurrentMessage(state) {
    return state.message;
  },
  getCurrentError(state) {
    return state.error;
  },
};

export const mutations = {
  ON_MESSAGE: (state, message) => {
    state.message = message;
  },
  ON_ERROR: (state, error) => {
    state.error = error;
  },
};
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
  message: ({ state, commit, dispatch }, { message }) => {
    commit('ON_MESSAGE', message);
  },
  error: ({ state, commit, dispatch }, { error }) => {
    commit('ON_ERROR', error);
  },
  reset: ({ state, commit, dispatch }) => {
    commit('ON_ERROR', null);
    commit('ON_MESSAGE', null);
  },
};
