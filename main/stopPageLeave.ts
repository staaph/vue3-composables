import { onBeforeRouteLeave } from 'vue-router';
import { onUnmounted } from 'vue';

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
    const handleLeave = (e: Event) => {
      if (window.navigator.userAgent.indexOf('Chrome')) {
        e.returnValue = true;
      }
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleLeave);
    onUnmounted(() => {
      window.removeEventListener('beforeunload', handleLeave);
    });
  }
};
