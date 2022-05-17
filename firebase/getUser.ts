import { ref, type Ref } from 'vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';


export const getUser = () => {
  const user: Ref = ref(getAuth().currentUser);
  onAuthStateChanged(getAuth(), (_user) => {
    user.value = _user;
  });
  return { user };
};
