import { addDoc, getDocs, getFirestore, collection } from 'firebase/firestore';

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
  return { addDocument, getDocument };
};
