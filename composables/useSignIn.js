import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config.js';
import { ref } from 'vue';

const useSignIn = () => {
  const errorMsg = ref();

  //login
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      errorMsg.value = ref();
    } catch (error) {
      const errorMessageMap = {
        // contains basic error messages. Change the errorMsg.value to your needs
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

// in component use:
// import useSignIn from '../composables/useSignIn.js';
// const { login, errorMsg } = useSignIn();
