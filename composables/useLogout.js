import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config.js';

const useLogout = () => {
  const logout = async () => {
    await signOut(auth);
  };
  return { logout };
};

export default useLogout;
