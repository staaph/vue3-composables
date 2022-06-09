import { ref } from 'vue';
import {
  getAuth,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { errorMessage } from './errorMsg';

export const useFbUtil = () => {
  const errorMsg = ref<string>('');
  const user = getAuth().currentUser;
  const userProvidedPassword = ref<string>('');
  const newPassword = ref<string>('');

  const resetPwEmail = async (email: string) => {
    errorMsg.value = '';
    try {
      await sendPasswordResetEmail(getAuth(), email);
    } catch (error: unknown) {
       error instanceof FirebaseError ? errorMsg.value =
        errorMessage[error.code] ?? 'Something unexpected happened' : errorMsg.value = 'unknown server error';
    }
  };

  const reauthenticate = async (currentPassword: string) => {
    if (user && user.email !== null) {
      userProvidedPassword.value = currentPassword;
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
    }
  };

  const changeEmail = async (newEmail: string) => {
    errorMsg.value = '';
    if (user && userProvidedPassword.value.length !== 0) {
      try {
        await reauthenticate(userProvidedPassword.value);
        await updateEmail(user, newEmail);
        userProvidedPassword.value = '';
      } catch (error) {
        error instanceof FirebaseError ? errorMsg.value =
        errorMessage[error.code] ?? 'Something unexpected happened' : errorMsg.value = 'unknown server error';
      }
    } else {
      errorMsg.value = 'provide a password';
    }
  };

  const changePassword = async () => {
    errorMsg.value = '';
    if (user && userProvidedPassword.value.length !== 0) {
      try {
        if (newPassword.value.length !== 0) {
          await reauthenticate(userProvidedPassword.value);
          await updatePassword(user, newPassword.value);
          userProvidedPassword.value = '';
          newPassword.value = '';
        }
        errorMsg.value = 'provide a new password';
      } catch (error: unknown) {
        error instanceof FirebaseError ? errorMsg.value =
        errorMessage[error.code] ?? 'Something unexpected happened' : errorMsg.value = 'unknown server error';
      }
    } else {
      errorMsg.value = 'provide a password';
    }
  };

  const deleteAccount = async (currentPw: string) => {
    if (user) {
      await reauthenticate(currentPw);
      await deleteUser(user);
    }
  };

  return {
    resetPwEmail,
    changeEmail,
    changePassword,
    reauthenticate,
    deleteAccount,
    userProvidedPassword,
    errorMsg,
    newPassword,
  };
};
