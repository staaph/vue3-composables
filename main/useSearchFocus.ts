import { ref, type Ref, onMounted, onUnmounted } from 'vue';

export const useHotKey = () => {
  const metaKey: Ref = ref();
  const searchbar: Ref = ref();

  const useSearchFocus = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (document.activeElement != document.body) {
        (document.activeElement as HTMLElement).blur();
      } else {
        searchbar.value.focus();
      }
    }
    if(e.key === 'Escape'){
      (document.activeElement as HTMLElement).blur();
    }
  };

  onMounted(() => {
    metaKey.value.textContent =
      window.navigator.userAgent.indexOf('Mac') != -1 ? '⌘' : 'Ctrl';
    window.addEventListener('keydown', useSearchFocus);
  });
  onUnmounted(() => {
    window.removeEventListener('keydown', useSearchFocus);
  });

  return { metaKey, searchbar };
};
