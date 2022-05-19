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
import { ref, type Ref } from 'vue';
import { FirebaseError } from '@firebase/util';

export const useAuth = () => {
  const errorMsg: Ref<string | unknown> = ref();

  const login = async (email: string, password: string) => {
    errorMsg.value = '';
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMessageMap: { [key: string]: string } = {
          'auth/invalid-email': 'Invalid email',
          'auth/wrong-password': 'Incorrect password',
          'auth/user-not-found': 'No account with the provided email found',
        };
        errorMsg.value = errorMessageMap[error.code] ?? 'Incorrect credentials';
      } else {
        errorMsg.value = 'unknown server error';
      }
    }
  };

  const signup = async (email: string, password: string) => {
    errorMsg.value = '';
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMessageMap: { [key: string]: string } = {
          'auth/weak-password': 'password must contain at least 6 characters',
          'auth/email-already-in-use': 'email already taken',
        };
        errorMsg.value =
          errorMessageMap[error.code] ?? 'Something unexpected happened';
      }
    }
  };

  const loginAnonymous = () => {
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

  const loginWithGoogle = async () => {
    errorMsg.value = '';
    try {
      await signInWithPopup(getAuth(), new GoogleAuthProvider());
    } catch (error) {
      errorMsg.value = 'Something unexpected happened';
    }
  };

  const logout = async () => {
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

  return {
    login,
    signup,
    loginAnonymous,
    loginWithGoogle,
    logout,
    errorMsg,
  };
};
