export default async function ({ redirect, store, route, $fire, router }) {
  const isUserSignedIn = store.state.auth.user_logged?.uid;
  console.log('test sign in', isUserSignedIn);

  if (!isUserSignedIn && (route.path !== '/prihlaseni') ) {
    redirect("/prihlaseni");
  }

}

