/*eslint no-unsafe-optional-chaining: "error"*/
import Vue from 'vue';
import prochazkyConfig from '~/prochazky.config';
import { resize, findObjectSlideDefinition } from '@/utils/functions';
import ObjectProchazka from '~/models/ObjectProchazka';

export const state = () => ({
  novy_objekt: {},
  novy_objekt_nav_pozice: 0,
  objekty: [],
  objekt_detail: {},
  objekty_prochazka_detail: {},
  loading: false,
  loadingMsg: '',
  logged_user: null,
  prochazky: prochazkyConfig,
  prochazka: null,
  is_mobile_menu_open: false,
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
  },
  getProchazky(state) {
    return state.prochazky;
  },
  getProchazka(state) {
    return state.prochazka;
  },
  getMobileMenuState(state) {
    return state.is_mobile_menu_open;
  },
  // getObjectsByProchazkaId(state) {
  //   return (prochazkaId) => {
  //     return state.objekty_prochazka_detail?.[prochazkaId];
  //   };
  // },
};

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    // Don't do this:
    state.user = authUser;

    // Do this:
    const { uid, email, emailVerified } = authUser;
    state.logged_user = { uid, email, emailVerified };
  },

  updateCurrentProchazka: (state, prochazka) => {
    state.prochazka = prochazka;
  },

  updateObjektDetail: (state, objekt_detail) => {
    state.objekt_detail = objekt_detail;
  },

  updateLoading: (state, { isLoading, message }) => {
    state.loading = isLoading;
    state.loadingMsg = message;
  },

  updateObjekty: (state, objekty) => {
    state.objekty = objekty;
  },
  updateObjektyProchazkaDetail: (state, { prochazkaId, objekty }) => {
    Vue.set(state.objekty_prochazka_detail, prochazkaId, objekty);
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
  updateMobileMenuToggle(state, isOpen) {
    state.is_mobile_menu_open = isOpen;
  },
};
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
  onAuthStateLogoutAction: ({ state, commit, dispatch }, { authUser }) => {},
  onAuthStateLoginAction: ({ state, commit, dispatch }, { authUser }) => {},

  mobileMenuToggle({ state, commit, dispatch }, { isOpen }) {
    try {
      commit('updateMobileMenuToggle', isOpen);
    } catch (e) {
      console.error(e);
    }
  },

  getProchazka({ state, commit, dispatch }, { slug }) {
    if (!state.prochazky) return;

    try {
      const currentProchazkaKey = Object.keys(state.prochazky).find(
        (prochazkaKey) => state.prochazky[prochazkaKey].slug === slug
      );

      commit('updateCurrentProchazka', state.prochazky[currentProchazkaKey]);
    } catch (e) {
      console.error(e);
    }
  },

  async changeProchazkaPermission(
    { state, commit, dispatch },
    { userId, prochazkaId, makePublic }
  ) {
    try {
      // do db changes
      const db = this.$fire.firestore;
      const currentUserObject = db
        .collection(this.$config.firebaseConfig.collectionUsersId)
        .doc(userId);

      if (makePublic) {
        const unionRes = await currentUserObject.update({
          publicItems:
            this.$fireModule.firestore.FieldValue.arrayUnion(prochazkaId),
        });
      } else {
        const unionRes = await currentUserObject.update({
          publicItems:
            this.$fireModule.firestore.FieldValue.arrayRemove(prochazkaId),
        });
      }

      await dispatch('user/getUserProfile', { userId }, { root: true });

      dispatch(
        'alert/message',
        { message: 'Nastavení procházky bylo změněno.' },
        { root: true }
      );
    } catch (error) {
      dispatch('alert/error', { error: error.message }, { root: true });
      console.error(error);
    }
  },

  async removeObjekt({ state, commit, dispatch }, { id }) {
    try {
      dispatch('setLoading', { isLoading: true, message: 'Odstraňuji...' });

      const db = this.$fire.firestore;
      await db
        .collection(this.$config.firebaseConfig.collectionId)
        .doc(id)
        .delete();
      dispatch('removeObjektFromStore', { id });
      dispatch(
        'alert/message',
        { message: 'Objekt byl úspěšně odstraněn' },
        { root: true }
      );
    } catch (error) {
      dispatch('alert/error', { error: error.message }, { root: true });
      console.error('Error getting document:', error);
    } finally {
      dispatch('setLoading', { isLoading: false, message: false });
    }
  },

  removeObjektFromStore({ state, commit, dispatch }, { id }) {
    const updatedObjects = state.objekty.filter((objekt) => objekt.id !== id);
    commit('updateObjekty', updatedObjects);
  },

  async getObjekt({ state, commit, dispatch, getters }, objectProchazkaId) {
    const findCachedObject = state.objekty.filter(
      (objekt) => objekt.id === objectProchazkaId
    );

    if (state.objekty.length && findCachedObject.length === 1) {
      // we have the objekt in the stored result
      commit('updateObjektDetail', findCachedObject[0]);
    } else {
      // we do not have the objekt in the stored results, therefore hit the API

      dispatch('setLoading', { isLoading: true, message: 'Nahrávám...' });

      // I am artificially making the Firebase API compatible with await/async implementation of
      // API calls that I use in fetch() or asyncData() on pages and components
      // In this way, I can use Google Firebase Library as if it already supported async/await syntax
      // At the moment it does not support it yet (I believe)
      // If it supports the async/await syntax, please do refactoring of the code below
      return new Promise((resolve, reject) => {
        try {
          const db = this.$fire.firestore;

          db.collection(this.$config.firebaseConfig.collectionId)
            .doc(objectProchazkaId)
            .get()
            .then((doc) => {
              const data = doc.data();

              const id = doc.id;

              const objekt = { id, ...data };

              commit('updateObjektDetail', objekt);
              dispatch('setLoading', { isLoading: false, message: false });

              resolve();
            })
            .catch((error) => {
              console.log('Error getting document:', error);
            });
        } catch (err) {
          console.log(err);
        }
      });
    }
  },

  async getMyObjects({ state, commit, dispatch }, { userId }) {
    if (state.objekty?.length) return;

    dispatch(
      'setLoading',
      {
        isLoading: true,
        message: 'Načítám...',
      },
      { root: true }
    );
    try {
      const db = this.$fire.firestore;
      const collectionQuery = db
        .collection(this.$config.firebaseConfig.collectionId)
        .where('user_id', '==', userId);

      const querySnapshot = await collectionQuery.get();
      const objekty = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        const id = doc.id;

        return { id, ...data };
      });
      commit('updateObjekty', objekty);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch('setLoading', { isLoading: false, message: false });
    }
  },

  async getMyObjectsByProchazkaId(
    { state, commit, dispatch },
    { userId, prochazkaId }
  ) {
    if (state.objekty_prochazka_detail?.[prochazkaId]) return;
    dispatch(
      'setLoading',
      {
        isLoading: true,
        message: 'Načítám...',
      },
      { root: true }
    );
    try {
      const db = this.$fire.firestore;
      const collectionQuery = db
        .collection(this.$config.firebaseConfig.collectionId)
        .where('user_id', '==', userId)
        .where('prochazka_id', '==', prochazkaId);

      const querySnapshot = await collectionQuery.get();
      const objekty = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        const id = doc.id;

        return { id, ...data };
      });
      commit('updateObjektyProchazkaDetail', { prochazkaId, objekty });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch('setLoading', { isLoading: false, message: false });
    }
  },

  async addNewObject(
    { state, commit, dispatch },
    { objectPayload, prochazka }
  ) {
    dispatch(
      'setLoading',
      {
        isLoading: true,
        message: 'Načítám...',
      },
      { root: true }
    );

    try {
      // save object to database
      const db = this.$fire.firestore;
      const batch = db.batch();

      const newDbObject = db
        .collection(this.$config.firebaseConfig.collectionId)
        .doc();
      const newDbObjectId = newDbObject.id;

      objectPayload.id = newDbObjectId;

      objectPayload.audio = Object.keys(objectPayload.data)
        .filter(
          (key) =>
            Object.keys(
              (prochazka.mapovaniUkolu,
              key,
              this.$config.separatorForDynamicSlideId)
            )?.length &&
            findObjectSlideDefinition(
              prochazka.mapovaniUkolu,
              key,
              this.$config.separatorForDynamicSlideId
            ).type === 'audio'
        )
        .map((key) => {
          return {
            id: key,
            objectID: newDbObjectId,
            items: objectPayload.data[key].map((audioObject, index) => {
              return {
                ...audioObject,
                realURLNormalize: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}/${objectPayload.user_id}/${newDbObjectId}/${audioObject.id}.mp3?alt=media`,
                realURL: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}%2F${objectPayload.user_id}%2F${newDbObjectId}%2F${audioObject.id}.mp3?alt=media`,
              };
            }),
          };
        });

      /* Find images in the task and their attributes */
      // PLUS FILE URL FOR IMAGES!
      objectPayload.obrazky = Object.keys(objectPayload.data)
        .filter(
          (key) =>
            Object.keys(
              (prochazka.mapovaniUkolu,
              key,
              this.$config.separatorForDynamicSlideId)
            )?.length &&
            findObjectSlideDefinition(
              prochazka.mapovaniUkolu,
              key,
              this.$config.separatorForDynamicSlideId
            ).type === 'image'
        )
        .map((key) => {
          return {
            id: key,
            objectID: newDbObjectId,
            items: objectPayload.data[key].map((imageObject) => {
              return {
                ...imageObject,
                ...{
                  realURLNormalize: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}/${objectPayload.user_id}/${newDbObjectId}/${imageObject.id}.webp?alt=media`,
                  realURL: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}%2F${objectPayload.user_id}%2F${newDbObjectId}%2F${imageObject.id}.webp?alt=media`,
                  realURLThumb: `https://firebasestorage.googleapis.com/v0/b/${this.$config.firebaseConfig.apiConfig.projectId}.appspot.com/o/${this.$config.name}%2F${objectPayload.user_id}%2F${newDbObjectId}%2F${imageObject.id}.webp?alt=media`,
                },
              };
            }),
          };
        });

      batch.set(newDbObject, objectPayload);

      batch.commit().then(async () => {
        // upload file to firestore cloud

        for (const [index, audioObject] of objectPayload.audio.entries()) {
          const file_extension = 'mp3';

          try {
            // upload audio files
            ////////////////////////////////////////////////////////////////////////////////////////////////
            const items = audioObject.items;

            for (const audioObjectItem of items) {
              const response = await fetch(audioObjectItem.audioUrl);
              const audioBlob = await response.blob();

              this.$fire.storage
                .ref()
                .child(
                  `${this.$config.name}/${objectPayload.user_id}/${newDbObjectId}/${audioObjectItem.id}.${file_extension}`
                )
                .put(audioBlob);
            }

            ////////////////////////////////////////////////////////////////////////////////////////////////
          } catch (e) {
            console.log(e.message);
          }
        }

        for (const obrazekObjContainer of objectPayload.obrazky) {
          try {
            // upload images
            ////////////////////////////////////////////////////////////////////////////////////////////////

            // obrazekObjContainer is an array of objects

            const items = obrazekObjContainer.items;

            for (const obrazekObj of items) {
              const response = await fetch(obrazekObj.url);

              const blob = await response.blob();

              // resize
              const resizedBlobImage = await resize(
                blob,
                this.$config.imageSizes.full
              );
              const resizedBlobImageThumb = await resize(
                blob,
                this.$config.imageSizes.thumb
              );

              //const file_extension = obrazekObj.type.split('/')[1];
              const file_extension = 'webp';

              let storageRefFull = this.$fire.storage
                .ref()
                .child(
                  `${this.$config.name}/${objectPayload.user_id}/${newDbObjectId}/${obrazekObj.id}.${file_extension}`
                )
                .put(resizedBlobImage);

              let storageRefThumb = this.$fire.storage
                .ref()
                .child(
                  `${this.$config.name}/${objectPayload.user_id}/${newDbObjectId}/${obrazekObj.id}_thumb.${file_extension}`
                )
                .put(resizedBlobImageThumb);
            }

            ////////////////////////////////////////////////////////////////////////////////////////////////
          } catch (e) {
            console.log(e.message);
          }
        }

        // clean store new objekt
        dispatch('removeNovyObjekt');
      });
    } catch (e) {
      console.error(e);
    } finally {
      dispatch('setLoading', { isLoading: false, message: false });
    }
  },

  setLoading({ state, commit }, { isLoading, message }) {
    try {
      commit('updateLoading', { isLoading, message });
    } catch (err) {
      console.log(err);
    }
  },

  setNovyObjektNavPozice({ state, commit }, nav_pozice) {
    try {
      commit('updateNovyObjektNavPozice', nav_pozice);
    } catch (err) {
      console.log(err);
    }
  },

  setPrihlasenyUzivatel({ state, commit }, prihlaseny_uzivatel) {
    try {
      commit('updatePrihlasenyUzivatel', prihlaseny_uzivatel);
    } catch (err) {
      console.log(err);
    }
  },

  setNovyObjekt({ state, commit }, novy_objekt) {
    try {
      commit('updateNovyObjekt', novy_objekt);
    } catch (err) {
      console.log(err);
    }
  },

  removeNovyObjekt({ state, commit }) {
    try {
      commit('removeNovyObjekt');
    } catch (err) {
      console.log(err);
    }
  },
};
