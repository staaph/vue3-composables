import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { ref, type Ref } from 'vue';


const useSignIn = () => {
  const errorMsg: Ref = ref();

  const login = async (email:string, password:string) => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      errorMsg.value = ref();
    } catch (error: any) {
      const errorMessageMap: {[key: string]: string} = {
        'auth/invalid-email': 'Invalid email',
        'auth/wrong-password': 'Incorrect password',
        'auth/user-not-found': 'No account with the provided email found',
      };
      errorMsg.value = errorMessageMap[error.code] ?? 'Incorrect credentials';
    }
  };

  return { login, errorMsg };
};

export default useSignIn;
