import User from '~/models/User';

/*eslint no-unsafe-optional-chaining: "error"*/
export const state = () => ({
  user_profile: {},
});
/*
this will update the state with the posts
*/

export const getters = {
  getCurrentUserProfile(state) {
    return state.user_profile;
  },
  getCurrentPublicItems(state) {
    return state.user_profile.publicItems;
  },
};

export const mutations = {
  updateCurrentUserProfile: (state, user_profile) => {
    state.user_profile = user_profile;
  },
};
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
  async getUserProfile({ state, commit, dispatch }, { userId }) {
    try {
      // do db changes
      const db = this.$fire.firestore;
      const collectionQuery = db
        .collection(this.$config.firebaseConfig.collectionUsersId)
        .doc(userId);

      const querySnapshot = await collectionQuery.get();
      console.log('from user store firebase user', querySnapshot.data());
      const user = new User(querySnapshot.data());
      commit('updateCurrentUserProfile', user);
    } catch (error) {
      dispatch('alert/error', { error: error.message }, { root: true });
      console.error(error);
    }
  },
};
