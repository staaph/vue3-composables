import { ref, type Ref } from 'vue';

export const useClipboard = () => {
  const message: Ref<string> = ref('');

  /**
   *
   * @param data String to be copied to clipboard
   * @param options msg define message 
   * @param options timer specify milliseconds to remove the message
   */
  const copy = async (data: string, options: {msg: string, timer?: number}) => {
    try {
      if (data != '') {
        await navigator.clipboard.writeText(data);
        message.value = options.msg;
        if (options.timer) {
          setTimeout(() => {
            message.value = '';
          }, options.timer);
        }
      }
    } catch {
      message.value = 'an error occured';
    }
  };

  return { copy, message };
};
