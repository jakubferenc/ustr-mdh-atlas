export default function (context) {
  context.app.router.beforeEach((to, from, next) => {
    context.store.dispatch('mobileMenuToggle', { isOpen: false });
    next();
    return true;
  });
}
