import { ref, type Ref } from 'vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const auth: Ref<object> = getAuth();

const getUser = () => {
  const user: Ref<object> = ref(auth.currentUser);
  onAuthStateChanged(auth, (_user: Object) => {
    user.value = _user;
  });
  return { user };
};

export default getUser;
