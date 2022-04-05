import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config.js';
import { ref } from 'vue';

const errorMsg = ref(null);

const useSignIn = () => {
  errorMsg.value = ref(null);

  //login
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      errorMsg.value = null;
    } catch (error) {
      // contains basic error messages. Change the errorMsg.value to your needs
      switch (error.code) {
        case 'auth/invalid-email':
          errorMsg.value = 'Invalid email';
          break;
        case 'auth/wrong-password':
          errorMsg.value = 'Incorrect password';
          break;
        case 'auth/user-not-found':
          errorMsg.value = 'No account with the provided email found';
          break;
        default:
          errorMsg.value = 'Incorrect credentials';
          break;
      }
    }
  };

  return { login, errorMsg };
};

export default useSignIn;

// in component use:
// import useSignIn from '../composables/useSignUp.js';
// const { login, errorMsg } = useSignIn();
