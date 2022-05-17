import { getAuth, signInAnonymously } from 'firebase/auth';
import { ref, type Ref } from 'vue';

export const useLoginAnonymous = () => {
    const errorMsg: Ref = ref();
  const loginAnonymous = () => {
    try {
      signInAnonymously(getAuth());
    } catch (error: any) {
        errorMsg.value = 'Something unexpected happened';
    }
  };
  return { loginAnonymous, errorMsg };
};
