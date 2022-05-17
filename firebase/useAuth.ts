import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { ref, type Ref } from 'vue';

export const useAuth = () => {
  const errorMsg: Ref = ref();

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      errorMsg.value = ref();
    } catch (error: any) {
      const errorMessageMap: { [key: string]: string } = {
        'auth/invalid-email': 'Invalid email',
        'auth/wrong-password': 'Incorrect password',
        'auth/user-not-found': 'No account with the provided email found',
      };
      errorMsg.value = errorMessageMap[error.code] ?? 'Incorrect credentials';
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      errorMsg.value = ref();
    } catch (error: any) {
      const errorMessageMap: { [key: string]: string } = {
        'auth/weak-password': 'password must contain at least 6 characters',
        'auth/email-already-in-use': 'email already taken',
      };
      errorMsg.value =
        errorMessageMap[error.code] ?? 'Something unexpected happened';
    }
  };

  const loginAnonymous = () => {
    try {
      signInAnonymously(getAuth());
      errorMsg.value = ref();
    } catch (error: any) {
      errorMsg.value = 'Something unexpected happened';
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(getAuth(), new GoogleAuthProvider());
      errorMsg.value = ref();
    } catch (error) {
      errorMsg.value = 'Something unexpected happened';
    }
  };

  const logout = async () => {
    try {
      await signOut(getAuth());
      errorMsg.value = ref();
    } catch (error: any) {
      errorMsg.value = 'Something unexpected happened.';
    }
  };
  return { login, signup, loginAnonymous, loginWithGoogle, logout, errorMsg };
};
