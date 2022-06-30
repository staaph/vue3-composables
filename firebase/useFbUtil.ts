import { ref } from 'vue'
import {
  getAuth,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser
} from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { errorMessage } from './errorMsg'

export const errorMsg = ref<string>('')

/**
 * reset user email. Sends email if provided email is found in firestore
 * @param email - provide user email
 */
export const resetPwEmail = async (email: string): Promise<void> => {
  errorMsg.value = ''
  try {
    await sendPasswordResetEmail(getAuth(), email)
  } catch (error: unknown) {
    error instanceof FirebaseError
      ? (errorMsg.value =
          errorMessage[error.code] ?? 'Something unexpected happened')
      : (errorMsg.value = 'unknown server error')
  }
}

/**
 * this function is used by all other util functions to reauthenticate user before making changes
 * @param currentPassword - provide current user password
 */
const reauthenticate = async (currentPassword: string): Promise<void> => {
  const user = getAuth().currentUser
  if (user && user.email !== null) {
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)
  }
}

/**
 * lets user change his email
 * @param newEmail - provide new user email
 * @param currentPassword - current user Password
 */
export const changeEmail = async (
  newEmail: string,
  currentPassword: string
): Promise<void> => {
  errorMsg.value = ''
  const user = getAuth().currentUser
  if (user && currentPassword.length !== 0) {
    try {
      await reauthenticate(currentPassword)
      await updateEmail(user, newEmail)
      currentPassword = ''
    } catch (error) {
      error instanceof FirebaseError
        ? (errorMsg.value =
            errorMessage[error.code] ?? 'Something unexpected happened')
        : (errorMsg.value = 'unknown server error')
    }
  } else {
    errorMsg.value = 'provide a password'
  }
}

/**
 * lets user change his password
 * @param currentPassword - current user Password, provide v-model from input
 */
export const changePassword = async (
  currentPassword: string, newPassword: string
): Promise<void> => {
  errorMsg.value = ''
  const user = getAuth().currentUser
  if (user && currentPassword.length !== 0) {
    try {
      if (newPassword.length !== 0) {
        await reauthenticate(currentPassword)
        await updatePassword(user, newPassword)
        currentPassword = ''
        newPassword = ''
      }
      errorMsg.value = 'provide a new password'
    } catch (error: unknown) {
      error instanceof FirebaseError
        ? (errorMsg.value =
            errorMessage[error.code] ?? 'Something unexpected happened')
        : (errorMsg.value = 'unknown server error')
    }
  } else {
    errorMsg.value = 'provide a password'
  }
}

/**
 * deletes user account
 * @param currentPw - provide current user Password
 */
export const deleteAccount = async (currentPw: string): Promise<void> => {
  const user = getAuth().currentUser
  if (user) {
    await reauthenticate(currentPw)
    await deleteUser(user)
  }
}
