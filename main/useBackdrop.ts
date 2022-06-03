import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export const useBackdrop = () => {
  const backdrop: Ref = ref();
  const modal: Ref = ref();
  const button: Ref = ref();
  const isModalOpen: Ref<boolean> = ref(false);

  onMounted(() => {
    modal.value.style.display = 'none';
  });

  const outsideClick = (e: Event) => {
    if (e.target == backdrop.value) {
      modal.value.style.display = 'none';
      isModalOpen.value = false;
    }
  };

  const openModal = () => {
    modal.value.style.display = 'block';
    isModalOpen.value = true;
  };

  const closeModal = () => {
    modal.value.style.display = 'none';
    isModalOpen.value = false;
  };

  onMounted(() => {
    window.addEventListener('click', outsideClick);
  });

  onUnmounted(() => {
    window.removeEventListener('click', outsideClick);
  });
  return { backdrop, modal, button, isModalOpen, openModal, closeModal };
};
