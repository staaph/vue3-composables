import {
  addDoc,
  getDocs,
  setDoc,
  doc,
  getFirestore,
  collection,
} from 'firebase/firestore';

export const useFirestore = () => {
  const addDocument = async (reference: string, data: object) => {
    await addDoc(collection(getFirestore(), reference), data);
  };

  const getDocument = async (reference: string) => {
    const documents: Array<object> = [];
    const snapshot = await getDocs(collection(getFirestore(), reference));
    snapshot.forEach((doc) => documents.push({ ...doc.data() }));
    return documents;
  };

  const setDocument = async (
    reference: string,
    docname: string,
    data: object,
    mergeDoc: object = { merge: false }
  ) => {
    await setDoc(doc(getFirestore(), reference, docname), data, mergeDoc);
  };

  return { addDocument, getDocument, setDocument };
};
