# Firebase 9 Composables

Use them in an existing project. Firebase needs to be installed

## useAuth

```js
import { useAuth } from '@/composables/useAuth';

// user acts like isAuthenticated => user.value will return null or object
const { login, errorMsg, user } = useAuth();
```

### useFirestore

```js
import { useFirestore } from '@/composables/useFirestore';

const { addDocument, getDocument, setDocument, deleteDocument, updateDocument } = useFirestore();

// const getDocument: (reference: string) => Promise<object[]>
const click = async () => {
  const document = await getDocument('cities');
  return document;
};

// const addDocument: (reference: string, data: object) => Promise<void>
const click = () => {
  addDocument('test', { data: 'testdata' });
};

// const setDocument: (reference: string, docname: string, data: object, mergeDoc?: object) => Promise<void>
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
