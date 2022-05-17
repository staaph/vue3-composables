# Firebase 9 Composables

Use them in an existing project. Firebase needs to be installed

## useAuth

```js
import { useAuth } from '@/composables/useAuth';

const { login, errorMsg } = useAuth();

//user acts like isAuthentiated => null if not authenticated, object if authenticated
```

### useFirestore

```js
import { useFirestore } from '@/composables/useFirestore'

const { getDocument, addDocument } = useFirestore()
```
