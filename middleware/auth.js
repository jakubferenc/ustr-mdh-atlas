export default async function ({ redirect, store, route, $fire, router }) {
  const isUserSignedIn = store.getters['auth/getCurrentUser']?.uid;
  if (!isUserSignedIn && !['/prihlaseni', '/registrace'].includes(route.path)) {
    // redirect("/prihlaseni");
    console.log('user is not logged in');
  }
}
