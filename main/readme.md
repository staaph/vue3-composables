# main

General composables

## useDark

```html
<button>
  <Sun @click="toggleTheme" v-if="userTheme === 'dark'" />
  <Moon v-else @click="toggleTheme" />
</button>
```

```js
import { useDark } from '@/composables/useDark';

const { userTheme, toggleTheme} = useDark();

```

## useSearchFocus

```html
<div>
  <input ref="searchbar" type="text" />
  <!-- metaKey changes its Symbol based on os -->
  <span ref="metaKey">Meta</span>
  <span>&nbsp;+&nbsp;K</span>
</div>
```

```js
import { useSearchFocus } from '@/composables/useSearchFocus';
const { metaKey, searchbar } = useSearchFocus();
```

## stopPageLeave

```js
<script setup>
import { stopPageLeave } from '@/composables/stopPageLeave';
import { onMounted, ref } from 'vue';

const isEditing = ref(true);

onMounted(() => {
  stopPageLeave(isEditing.value);
});
</script>
```
