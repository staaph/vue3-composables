# Firebase 9 Composables

Use them in an existing project. Firebase needs to be installed

## useAuth

```js
import {
  login,
  signup,
  loginAnonymous,
  loginWithGoogle,
  logout,
  errorMsg,
} from '@/composables/useAuth';

// these functions can be called directly in the template
// const login: (email: string, password: string) => Promise<void>
const click = () => {
  login(email.value, password.value);
};

// const signup: (email: string, password: string) => Promise<void>
const click = () => {
  signup(email.value, password.value);
};

// const loginAnonymous: () => void
const click = () => {
  loginAnonymous();
};

// const loginWithGoogle: () => Promise<void>
const click = () => {
  loginWithGoogle();
};

// const logout: () => Promise<void>
const click = () => {
  logout();
};

// const errorMsg: Ref<string | unknown>
// can be used directly in the template
<p>{{ errorMsg }}</p>;
```

### useFirestore

```js
import {
  addDocument,
  getDocument,
  setDocument,
  deleteDocument,
  updateDocument,
} from '@/composables/useFirestore';

// const getDocument: (reference: string) => Promise<object[]>
const click = async () => {
  const document = await getDocument('cities');
  return document;
};

// const addDocument: (reference: string, data: object) => Promise<void>
const click = () => {
  addDocument('test', { data: 'testdata' });
};

// const setDocument: (reference: string, docname: string, data: object, options?: { merge?: boolean | undefined })
// => Promise<void>
const click = () => {
  setDocument(
    'cities',
    'LA',
    {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    },
    { merge: true }
  );
};

// const deleteDocument: (reference: string, document: string) => Promise<void>
const click = () => {
  deleteDocument('collection', 'document');
};

// const updateDocument: (reference: string, document: string, data: object) => Promise<void>
const click = () => {
  updateDocument('collection', 'document', { data: 'test' });
};
```
