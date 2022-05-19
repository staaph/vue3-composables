import { ref, type Ref, onMounted, onUnmounted } from 'vue';

export const useSearchFocus = () => {
  const metaKey: Ref = ref();
  const searchbar: Ref = ref();

  const handleSearchHotKey = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.activeElement != document.body
        ? (document.activeElement as HTMLElement).blur()
        : searchbar.value.focus();
    }
    e.key === 'Escape' ? (document.activeElement as HTMLElement).blur() : null;
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
