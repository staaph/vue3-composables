import {
  addDoc,
  getDocs,
  setDoc,
  doc,
  getFirestore,
  collection,
  deleteDoc,
  updateDoc,
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
    options: object = { merge: false }
  ) => {
    await setDoc(doc(getFirestore(), reference, docname), data, options);
  };

  const deleteDocument = async (reference: string, document: string) => {
    await deleteDoc(doc(getFirestore(), reference, document));
  };

  const updateDocument = async (
    reference: string,
    document: string,
    data: object
  ) => {
    await updateDoc(doc(getFirestore(), reference, document), data);
  };

  return {
    addDocument,
    getDocument,
    setDocument,
    deleteDocument,
    updateDocument,
  };
};
