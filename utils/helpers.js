export function isUserLoggedIn() {
  return localStorage && localStorage.getItem('logged_user');
}
