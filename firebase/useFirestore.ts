import { getAuth } from 'firebase/auth'
import {
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
  getFirestore,
  collection,
  deleteDoc,
  updateDoc,
  query,
  where
} from 'firebase/firestore'
import type { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import { reactive } from 'vue'

/**
 * add document to firestore
 * @param reference database reference
 * @param data add data as Object
 */
export const addDocument = async (
  reference: string,
  data: object
): Promise<void> => {
  await addDoc(collection(getFirestore(), reference), data)
}

/**
 * get documents by collection
 * @param reference database reference
 */
export const getDocuments = async (reference: string): Promise<object[]> => {
  const documents: Array<object> = []
  const snapshot = await getDocs(collection(getFirestore(), reference))
  snapshot.forEach((doc) => documents.push({ ...doc.data() }))
  return documents
}

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
): Promise<void> => {
  await setDoc(doc(getFirestore(), reference, docname), data, options)
}

/**
 * delete single document in collection
 * @param reference database reference
 * @param document pass document name or ID
 */
export const deleteDocument = async (
  reference: string,
  document: string
): Promise<void> => {
  await deleteDoc(doc(getFirestore(), reference, document))
}

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
): Promise<void> => {
  await updateDoc(doc(getFirestore(), reference, document), data)
}

/**
 * get single document by its id
 * @param docID - String firestore document ID
 * @returns - document by id
 */
export const getDocument = async (
  docID: string
): Promise<DocumentSnapshot<DocumentData>> =>
  await getDoc(doc(getFirestore(), 'articles', docID))

/**
 * query database
 * @param col firestore col
 * @param qry query to be searched
 * @returns array with objects
 */
export const queryDocument = async (
  col: string,
  qry: string
): Promise<object[]> => {
  const result = reactive<object[]>([])
  const q = query(
    collection(getFirestore(), col),
    where(qry, '==', getAuth()!.currentUser!.uid)
  )
  const qSnapshot = await getDocs(q)

  qSnapshot.forEach((doc) => {
    result.push({
      docID: doc.id,
      ...doc.data()
    })
  })
  return result
}
