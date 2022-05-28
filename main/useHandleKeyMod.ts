import { ref, type Ref } from 'vue';

/**
 * specify key to return true | false
 * @param key - ['Alt', 'AltGraph', 'Control', 'Meta', 'Shift', 'CapsLock', 'NumLock', 'ScrollLock']
 */
export const handleKeyMod = (key = 'CapsLock') => {
  const active: Ref<boolean> = ref(false);

  const handleKey = (e: KeyboardEvent) => {
    active.value = e.getModifierState(key);
  };
  return { active, handleKey };
};
