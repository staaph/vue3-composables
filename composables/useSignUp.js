import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config.js';
import { ref } from 'vue';

const useSignUp = () => {
  const errorMsg = ref();

  //signup
  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      errorMsg.value = ref();
    } catch (error) {
      // contains basic error messages. Change the errorMsg.value to your needs

      const errorMessageMap = {
        'auth/invalid-password': 'password must contain at least 6 characters',
        'auth/email-already-exists': 'email already taken',
      };
      errorMsg.value =
        errorMessageMap[error.code] ?? 'Something unexpected happened';
    }
  };

  return { signup, errorMsg };
};

export default useSignUp;

// in component use:
// import useSignUp from '../composables/useSignUp.js';
// const { signup, errorMsg } = useSignUp();
