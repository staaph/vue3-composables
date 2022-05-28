import { ref, type Ref } from 'vue';

export const useClipboard = () => {
  const message: Ref<string> = ref('');

  /**
   * copy text to clipboard
   * @param data String to be copied to clipboard
   * @param removeMessage specify miliseconds to remove the message
   */
  const copy = async (data: string, removeMessage?: number) => {
    try {
      if (data != '') {
        await navigator.clipboard.writeText(data);
        message.value = 'Copied!';
        if (removeMessage) {
          setTimeout(() => {
            message.value = '';
          }, removeMessage);
        }
      }
    } catch {
      message.value = 'an error occured';
    }
  };

  return { copy, message };
};
