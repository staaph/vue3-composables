import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config.js';
import { ref } from 'vue';

const errorMsg = ref();

const useSignUp = () => {
  errorMsg.value = ref();

  //signup
  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      errorMsg.value = ref();
    } catch (error) {
      // contains basic error messages. Change the errorMsg.value to your needs
      switch (error.code) {
        case 'auth/invalid-password':
          errorMsg.value = 'password must contain at least 6 characters';
          break;
        case 'auth/email-already-exists':
          errorMsg.value = 'email already taken';
      }
    }
  };

  return { signup, errorMsg };
};

export default useSignUp;

// in component use:
// import useSignUp from '../composables/useSignUp.js';
// const { signup, errorMsg } = useSignUp();
