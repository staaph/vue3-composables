# Firebase 9 Composables

Use them in an existing project. Firebase needs to be installed

## useAuth

```js
import { useAuth } from '@/composables/useAuth';

const { login, errorMsg } = useAuth();

```

### useFirestore

```js
import { useFirestore } from '@/composables/useFirestore'

const { getDocument, addDocument } = useFirestore()
```
