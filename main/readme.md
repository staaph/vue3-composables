# useDarkMode

```html
<button>
  <Sun @click="toggleTheme" v-if="userTheme === 'dark'" />
  <Moon v-else @click="toggleTheme" />
</button>
```

```js
import { useDarkMode } from '@/composables/darkMode';

const { userTheme, toggleTheme} = useDarkMode();

```

## useHotKey

```html
<input ref="searchbar" type="text" />
<!-- metaKey changes its Symbol based on os -->
<div>
  <span ref="metaKey">Meta</span>
  <span>&nbsp;+&nbsp;K</span>
</div>
```

```js
import { useHotKey } from '@/composables/useHotKey';
const { metaKey, searchbar } = useHotKey();
```
