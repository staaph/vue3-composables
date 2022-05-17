# Firebase 9 Composables

Use them in an existing project. Firebase needs to be installed

## useAuth

```js
import { useAuth } from '@/composables/useAuth';

const { login, errorMsg, user } = useAuth();

// user acts like isAuthenticated => user.value will return null or object
```

### useFirestore

```js
import { useFirestore } from '@/composables/useFirestore';

const { getDocument, addDocument } = useFirestore();
```
