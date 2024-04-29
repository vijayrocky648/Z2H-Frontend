import { boot } from 'quasar/wrappers';
import { useUserStore } from 'src/stores/user';

const store = useUserStore();

export default boot(({ router }) => {
  router.beforeEach(async (to, from, next) => {
    if (store.token && !store.userInfo) {
      store.getUserInfo();
    }

    validateRoutes(to, from, next);
  });
});

export const validateRoutes = (to, from, next) => {
  if (!store.token && to.name !== 'sign-in') {
    return next({ name: 'sign-in' });
  }

  if (!to.name) {
    return next({ name: 'sign-in' });
  }

  next();
};
