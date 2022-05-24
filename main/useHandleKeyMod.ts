import { ref, type Ref } from 'vue';

/**
 * specify key to return true | false
 * @param key key ['Alt', 'AltGraph', 'Control', 'Meta', 'Shift', 'CapsLock', 'NumLock', 'ScrollLock']
 */
export const handleKeyMod = (key = 'CapsLock') => {
  const active: Ref<boolean> = ref(false);

  const handleClick = (e: KeyboardEvent) => {
    const x = e.getModifierState(key);
    active.value = x;
  };
  window.addEventListener('keydown', handleClick);
  window.onunload = function () {
    window.removeEventListener('keydown', handleClick);
    return;
  };

  return { active };
};
