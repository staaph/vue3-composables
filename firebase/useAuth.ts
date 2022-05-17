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
      errorMsg.value = ref();
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
      errorMsg.value = ref();
      await createUserWithEmailAndPassword(getAuth(), email, password);
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
      errorMsg.value = ref();
      signInAnonymously(getAuth());
    } catch (error: any) {
      errorMsg.value = 'Something unexpected happened';
    }
  };

  const loginWithGoogle = async () => {
    try {
      errorMsg.value = ref();
      await signInWithPopup(getAuth(), new GoogleAuthProvider());
    } catch (error) {
      errorMsg.value = 'Something unexpected happened';
    }
  };

  const logout = async () => {
    try {
      errorMsg.value = ref();
      await signOut(getAuth());
    } catch (error: any) {
      errorMsg.value = 'Something unexpected happened.';
    }
  };
  return { login, signup, loginAnonymous, loginWithGoogle, logout, errorMsg };
};
