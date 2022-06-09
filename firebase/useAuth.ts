import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { errorMessage } from './errorMsg';
import { ref, type Ref } from 'vue';
import { urlToHttpOptions } from 'url';

export const errorMsg: Ref<string | unknown> = ref();

/**
 * login with email & password
 * @param email pass email from input
 * @param password pass password from input
 */
export const login = async (email: string, password: string) => {
  errorMsg.value = '';
  try {
    await signInWithEmailAndPassword(getAuth(), email, password);
  } catch (error: unknown) {
    error instanceof FirebaseError
      ? (errorMsg.value =
          errorMessage[error.code] ?? 'Something unexpected happened')
      : (errorMsg.value = 'unknown server error');
  }
};

/**
 * sign user in using email and password
 * @param email pass email from input
 * @param password pass password from input
 */
export const signup = async (email: string, password: string) => {
  errorMsg.value = '';
  try {
    await createUserWithEmailAndPassword(getAuth(), email, password);
  } catch (error: unknown) {
    error instanceof FirebaseError
      ? (errorMsg.value =
          errorMessage[error.code] ?? 'Something unexpected happened')
      : (errorMsg.value = 'unknown server error');
  }
};

/**
 * log user in anonymously
 */
export const loginAnonymous = () => {
  errorMsg.value = '';
  try {
    signInAnonymously(getAuth());
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      errorMsg.value = 'Something unexpected happened';
    } else {
      errorMsg.value = 'unknown server error';
    }
  }
};

/**
 * login with Google, opens popup
 */
export const loginWithGoogle = async () => {
  errorMsg.value = '';
  try {
    await signInWithPopup(getAuth(), new GoogleAuthProvider());
  } catch (error) {
    errorMsg.value = 'Something unexpected happened';
  }
};

/**
 * log user out
 */
export const logout = async () => {
  errorMsg.value = '';
  try {
    await signOut(getAuth());
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      errorMsg.value = 'Something unexpected happened.';
    } else {
      errorMsg.value = 'unknown server error';
    }
  }
};

export const fbUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      (userFirebase) => {
        unsubscribe();
        resolve(userFirebase);
      },
      reject
    );
  });
};

export const user: Ref<object | null> = ref(getAuth().currentUser);
onAuthStateChanged(getAuth(), (_user: object | null) => {
  user.value = _user;
  return user;
});
