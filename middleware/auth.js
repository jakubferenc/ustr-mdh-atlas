export default async function ({ redirect, store, route, $fire, router }) {
  const isUserSignedIn = store.getters['auth/getCurrentUser']?.uid;

  const isRestrictedPage =
    !isUserSignedIn &&
    !['/prihlaseni/', '/registrace/', '/sdilet/', '/', '/prochazky/'].includes(
      route.path
    ) &&
    !['/sdilet-objekt/:id?/'].includes(route.matched[0].path);
  if (isRestrictedPage) {
    redirect('/prihlaseni/');
    console.log('user is not logged in');
  }
}
