import { ref, type Ref, onMounted, onUnmounted } from 'vue';

export const useHotKey = () => {
  const metaKey: Ref = ref();
  const searchbar: Ref = ref();

  const handleSearchHotKey = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (document.activeElement != document.body) {
        (document.activeElement as HTMLElement).blur();
      } else {
        searchbar.value.focus();
      }
    }
  };

  onMounted(() => {
    metaKey.value.textContent =
      window.navigator.userAgent.indexOf('Mac') != -1 ? '⌘' : 'Ctrl';
    window.addEventListener('keydown', handleSearchHotKey);
  });
  onUnmounted(() => {
    window.removeEventListener('keydown', handleSearchHotKey);
  });

  return { metaKey, searchbar };
};
