import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  isSignUp: boolean;
  onSignUpTrue: () => void;
  onSignUpFalse: () => void;
  onOpen: () => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  isSignUp: false,
  onSignUpTrue: () => set({ isSignUp: true }),
  onSignUpFalse: () => set({ isSignUp: false }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
