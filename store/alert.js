/*eslint no-unsafe-optional-chaining: "error"*/

export const state = () => ({
  message: null,
});
/*
this will update the state with the posts
*/

export const getters = {

  getCurrentMessage(state) {
    return state.message;
  }

};

export const mutations = {

  ON_MESSAGE: (state, message) => {
    state.message = message;
  },


};
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
  message: ({state, commit, dispatch}, { error }) => {
    commit('ON_MESSAGE', error);
  },
};
