export default async function ({ redirect, store, route, $fire, router }) {
  const isUserSignedIn = store.getters['auth/getCurrentUser']?.uid;
  console.log('test sign in', isUserSignedIn, route.path);
  if (!isUserSignedIn && (route.path !== '/prihlaseni') ) {
    redirect("/prihlaseni");
  }

}

