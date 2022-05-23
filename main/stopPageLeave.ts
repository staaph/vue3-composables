import { onBeforeRouteLeave } from 'vue-router';

export const stopPageLeave = (flag: boolean) => {
  if (flag) {
    onBeforeRouteLeave((to, from, next) => {
      const prompt = window.confirm(
        'Do you really want to leave? You have unsaved changes!'
      );
      if (!prompt) {
        next(false);
      } else {
        next();
      }
    });

    window.addEventListener('beforeunload', function (e) {
      if (window.navigator.userAgent.indexOf('Chrome')) {
        e.returnValue = '';
      }
      e.preventDefault();
    });
  }
};
