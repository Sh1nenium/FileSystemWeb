import { useStateObject } from "../utils/state-object";

export function useModal() {
  const isOpen = useStateObject(false);

  const onClose = () => {
    isOpen.setValue(false);
  }

  const onOpen = () => {
    isOpen.setValue(true);
  }

  return {
    isOpen,
    onClose,
    onOpen
  }
}