import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { ref, type Ref } from 'vue';

const useSignUp = () => {
  const errorMsg: Ref<string> = ref();

  const signup = async (email:string, password:string) => {
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      errorMsg.value = ref();
    } catch (error) {

      const errorMessageMap = {
        'auth/weak-password': 'password must contain at least 6 characters',
        'auth/email-already-in-use': 'email already taken',
      };
      errorMsg.value =
        errorMessageMap[error.code] ?? 'Something unexpected happened';
    }
  };

  return { signup, errorMsg };
};

export default useSignUp;