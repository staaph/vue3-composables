import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { ref, type Ref } from 'vue';

export const useGoogleSignIn = () => {
  const errorMsg: Ref = ref();
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(getAuth(), new GoogleAuthProvider());
    } catch (error) {
      errorMsg.value = 'Something unexpected happened';
    }
  };
  return { loginWithGoogle };
};
