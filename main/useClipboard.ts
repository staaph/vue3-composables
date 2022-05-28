import { ref, type Ref } from 'vue';

export const useClipboard = () => {
  const message: Ref<string> = ref('');

  /**
   * copy text to clipboard
   * @param data - String to be copied to clipboard
   * @param timeoutMsg - specify milliseconds to remove the message
   */
  const copy = async (data: string, timeoutMsg?: number) => {
    try {
      if (data != '') {
        await navigator.clipboard.writeText(data);
        message.value = 'Copied!';
        if (timeoutMsg) {
          setTimeout(() => {
            message.value = '';
          }, timeoutMsg);
        }
      }
    } catch {
      message.value = 'an error occured';
    }
  };

  return { copy, message };
};
