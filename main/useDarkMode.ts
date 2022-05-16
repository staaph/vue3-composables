import { ref, type Ref } from 'vue';

const userTheme:Ref<string> = ref('dark');

const useDarkMode = () => {
  const setTheme = (theme:string) => {
    localStorage.setItem('theme', theme);
    userTheme.value = theme;
    document.documentElement.className = theme;
  };

  const getTheme = () => {
    return localStorage.getItem('theme');
  };

  const getMediaPreference = () => {
    const hasDarkPreference = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (hasDarkPreference) {
      return 'dark';
    } else {
      return 'light';
    }
  };

  const toggleTheme = () => {
    const activeTheme = localStorage.getItem('theme');
    if (activeTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return { getTheme, setTheme, getMediaPreference, toggleTheme, userTheme };
};

export default useDarkMode;
