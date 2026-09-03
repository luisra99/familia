import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { Dialog } from "@mui/material";


export const FormContainer = ({
  modalType,
  name,
  setIdFunction,
  children,
}: any) => {
  const { modalState, modalActions } = useModalState();
  return modalType ? (
    <Dialog
      fullWidth={modalType === "fullWith"}
      maxWidth={modalType === "fullWith" ? false : modalType}
      open={modalState === name}
      onClose={() => {
        modalActions.close()
         setIdFunction?.(null);
      }}
      scroll={"paper"}
    >
      {children}
    </Dialog>
  ) : (
    children
  );
};
