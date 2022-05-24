import { ref, type Ref } from 'vue';

/**
 * specify key to return true | false
 * @param key key ['Alt', 'AltGraph', 'Control', 'Meta', 'Shift', 'CapsLock', 'NumLock', 'ScrollLock']
 */
export const handleKeyMod = (key = 'CapsLock') => {
  const active: Ref<boolean> = ref(false);

  const handleKey = (e: KeyboardEvent) => {
    if (e.getModifierState(key)) {
      active.value = true;
    } else {
      active.value = false;
    }
  };
  return { active, handleKey };
};
