# useDarkMode

```html
<button>
  <Sun @click="toggleTheme" v-if="userTheme === 'dark'" />
  <Moon v-else @click="toggleTheme" />
</button>
```

```js
import useDarkMode from '@/composables/darkMode.js';

const { userTheme, getTheme, toggleTheme, setTheme, getMediaPreference } = useDarkMode();

onMounted(() => {
  const initUserTheme = getTheme() || getMediaPreference();
  setTheme(initUserTheme);
});
```
