/*eslint no-unsafe-optional-chaining: "error"*/

import User from '@/models/User';

export const state = () => ({
  message: null,
});
/*
this will update the state with the posts
*/

export const getters = {};

export const mutations = {};
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
  async register({ state, commit, dispatch }, payload = { email, password }) {
    // call firebase
    try {
      const loginResponse =
        await this.$fire.auth.createUserWithEmailAndPassword(
          payload.email,
          payload.password
        );

      if (loginResponse) {
        const db = this.$fire.firestore;
        const batch = db.batch();
        const newUserObject = db
          .collection(this.$config.firebaseConfig.collectionUsersId)
          .doc();
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
};
