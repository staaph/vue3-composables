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
import { stopPageLeave } from '@/composables/stopPageLeave';
import { onMounted, ref, type Ref } from 'vue';

const isEditing: Ref<boolean> = ref(true);

onMounted(() => {
  stopPageLeave(isEditing.value);
});
```

## useHandleKeyMod

```html
<input id="myInput" value="Some text.." @keypress="handleKey" />
<p v-if="active">WARNING! Caps lock is ON.</p>
```

```js
import { handleKeyMod } from '@/composables/useHandleKey';


// accepts String:
// 'Alt', 'AltGraph', 'Control', 'Meta', 'Shift', 'CapsLock', 'NumLock', 'ScrollLock'
const { active, handleKey } = handleKeyMod();
```

## useClipboard

```html
  <div>
    <input type="text" v-model="input"/>
    <button @click="copy(input, 1000)">copy</button>
    <p v-if="message">{{ message }}</p>
  </div>
```

```js
import { ref, type Ref } from 'vue';
import { useClipboard } from '@/composables/useClipboard';

const input: Ref<string> = ref('');
const { copy, message } = useClipboard();
```
