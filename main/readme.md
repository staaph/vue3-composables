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

const { userTheme, toggleTheme } = useDark();
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

```ts
import { stopPageLeave } from '@/composables/stopPageLeave';
import { ref, type Ref } from 'vue';

const isEditing: Ref<boolean> = ref(true);

stopPageLeave(isEditing.value);
```

## useHandleKeyMod

```html
<input type="password" @keypress="handleKey" />
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
  <input type="text" v-model="input" />
  <button @click="click">copy</button>
  <p v-if="message">{{ message }}</p>
</div>
```

```ts
import { ref, type Ref } from 'vue';
import { useClipboard } from '@/composables/useClipboard';

const input: Ref<string> = ref('');
const { copy, message } = useClipboard();

//const copy: (data: string, options: { msg: string; timer?: number | undefined }) => Promise<void>
const click = () => {
  copy(input.value, { msg: 'Copied!', timer: 1000 });
};
```

## useBackdrop

Plain example (needs styling to determine backdrop):

```html
<template>
  <main ref="backdrop">
    <button ref="button" @click="openModal" v-if="!isModalOpen">Click</button>
    <div ref="modal">
      <h1>Content</h1>
      <button @click="closeModal">CLOSE</button>
    </div>
  </main>
</template>
```

```ts
import { useBackdrop } from '@/composables/useBackdrop';

const { modal, backdrop, button, isModalOpen, closeModal, openModal } = useBackdrop();
```
