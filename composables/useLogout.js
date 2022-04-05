import { auth } from '../firebase/config.js';
import { signOut } from 'firebase/auth';

const useLogout = () => {
  const logout = async () => {
    await signOut(auth);
  };
  return { logout };
};

export default useLogout;
