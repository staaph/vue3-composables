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


  /**
   * add document to firestore
   * @param reference database reference
   * @param data add data as Object
   */
  export const addDocument = async (reference: string, data: object) => {
    await addDoc(collection(getFirestore(), reference), data);
  };


  /**
   * get documents by collection
   * @param reference database reference
   */
  export const getDocument = async (reference: string) => {
    const documents: Array<object> = [];
    const snapshot = await getDocs(collection(getFirestore(), reference));
    snapshot.forEach((doc) => documents.push({ ...doc.data() }));
    return documents;
  };

  /**
   * set documents with naming and merging option
   * @param reference database reference
   * @param docname name of the document
   * @param data pass data as Object
   * @param options merge with existing data or enable overwriting ?
   */
  export const setDocument = async (
    reference: string,
    docname: string,
    data: object,
    options: { merge?: boolean } = { merge: false }
  ) => {
    await setDoc(doc(getFirestore(), reference, docname), data, options);
  };

  /**
   * delete single document in collection
   * @param reference database reference
   * @param document pass document name or ID
   */
  export const deleteDocument = async (reference: string, document: string) => {
    await deleteDoc(doc(getFirestore(), reference, document));
  };

  /**
   * update a document by name or id
   * @param reference database reference
   * @param document pass Document Name or ID
   * @param data add data in Object format
   * 
   */
  export const updateDocument = async (
    reference: string,
    document: string,
    data: object
  ) => {
    await updateDoc(doc(getFirestore(), reference, document), data);
  };
