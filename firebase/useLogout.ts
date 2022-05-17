import { signOut, getAuth } from 'firebase/auth';
import { ref, type Ref } from 'vue';

export const useLogout = () => {
  const errorMsg: Ref = ref();
  const logout = async () => {
    try {
      await signOut(getAuth());
    } catch (error: any) {
      errorMsg.value = 'Something unexpected happened.';
    }
  };
  return {logout, errorMsg}
};
