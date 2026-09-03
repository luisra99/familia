import { useCallback, useMemo } from "react";
import { atom, useRecoilState } from "recoil";

import type { Actions } from "./types";

const modalOpenState = atom<string | null>({
  key: "generic-form-modal-state",
  default: null,
});

function useModalState(): {
  modalState: string | null;
  modalActions: Actions;
} {
  const [modalState, setIsOpen] = useRecoilState(modalOpenState);

  const close = useCallback(() => {
    setIsOpen(null);
  }, []);

  const open = useCallback((modalName: string) => {
    setIsOpen(modalName);
  }, []);

  const modalActions = useMemo(() => ({ close, open }), []);

  return { modalState, modalActions };
}
export default useModalState;
