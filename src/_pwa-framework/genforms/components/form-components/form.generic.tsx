import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Formik, FormikErrors, FormikProps } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { defaultValueMap } from "../../functions/validation.controls";
import { FormContainer } from "../auxiliar-components/form-container.auxiliar";
import { GForm } from "../auxiliar-components/control-item.auxiliar";
import { GridContainer } from "../auxiliar-components/grid-container.auxiliar";
import { IGForm } from "../../types/forms.types";
import Loading from "@/_pwa-framework/components/Loading";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { initializeForm } from "../../functions/init.controls";
import { normalize } from "../../functions/utils";
import { object } from "yup";
import { submitValues } from "../../functions/service.form";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";

const GenericForm = (props: IGForm) => {
  const {
    title,
    editTitle,
    createTitle,
    name,
    endpointPath,
    controls,
    description,
    modalType,
    showSpecificDescription,
    descriptionOnCreate,
    descriptionOnEdit,
    idForEdit,
    connectionMode,
    hideButtons,
    setIdFunction,
    submitFunction,
    getByIdFunction,
    nextButton,
    prevButton,
    applyButton,
    saveOnDirty,
    saveButton,
    updateButton,
    dataAction,
    notifyValidation,
    sx,
    gridContainerSx,
    acceptDisabledFunction,
    applyDisabledFunction,
    nextDisabledFunction,
    prevDisabledFunction,
    submitDisabledFunction,
    setExternalErrors,
  } = props;
  const formReference = useRef<any>();
  const notificar = NotificationProvider();
  const [initialFormData, setInitialFormData] = useState<any>({});
  const [validationSchema, setValidationSchema] = useState(null);
  const [dataSource, setDataSource] = useState<any>({});
  const [editMode, setEditMode] = useState<any>(false);
  const { modalActions } = useModalState();
  const submit = useCallback(
    (values: any, event: any) => {
      const cleanValues = controls.reduce((acc: any, control) => {
        if (control.name.length > 0) {
          if (!control.hidden?.(values) || control.persist) {
            acc[control.name] = control.type == "text" ? values[control.name]?.trim() : values[control.name];
          } else {
            acc[control.name] = defaultValueMap[control.type as never];
          }
        }
        return acc;
      }, {});

      return submitFunction
        ? submitFunction({ ...cleanValues, editMode }, name, idForEdit, event)
        : submitValues(
          { ...cleanValues, editMode },
          name,
          idForEdit,
          endpointPath
        );
    },
    [idForEdit, editMode, submitFunction, controls, initialFormData]
  );

  useEffect(() => {
    initializeForm(
      controls,
      endpointPath,
      idForEdit,
      connectionMode,
      getByIdFunction
    ).then(({ initialFormData, validationSchema, dataSource, editMode }) => {
      setInitialFormData(initialFormData);
      setValidationSchema(validationSchema);
      setDataSource(dataSource);
      setEditMode(editMode);
    });
  }, [idForEdit]);
  const handleClose = () => {
    modalActions.close;
    setIdFunction?.(null);
  };
  const customDescription = showSpecificDescription
    ? editMode || idForEdit
      ? descriptionOnEdit ?? description
      : descriptionOnCreate ?? description
    : description;
  const customTitle =
    editTitle || createTitle ? (editMode ? editTitle : createTitle) : title;

  return initialFormData && validationSchema && formReference ? (
    <FormContainer
      modalType={modalType}
      name={name}
      setIdFunction={setIdFunction}
    >
      {customTitle && <DialogTitle>{customTitle}</DialogTitle>}
      {customDescription && (
        <DialogContentText mx={3}>{customDescription}</DialogContentText>
      )}
      <Formik
        className={"formik-object"}
        validateOnChange={true}
        initialValues={initialFormData}
        validationSchema={object().shape(validationSchema)}
        onSubmit={(values: any) => console.log(Date.now(), values)}
        innerRef={formReference}
        validateOnMount={false}
        validateOnBlur={false}
        enableReinitialize
      >
        {(props: FormikProps<any>) => {
          const {
            values,
            validateForm,
            setErrors,
            errors,
            resetForm,
            setFieldTouched,
            isValid,
            touched,
          } = props;
          // console.info({values,errors})

          const formButtonAction = async (event?: any) => {
            const message = await notifyValidation?.({
              ...formReference?.current.values,
              editMode,
            });
            if (message) {
              notificar({
                type: "warning",
                title: message,
              });
            } else {
              const error: FormikErrors<any> = await validateForm();
              const errors = Object.keys(error);
              setExternalErrors?.((prev: any) => {
                const old = prev ? prev : {};
                return { ...old, ...errors };
              });

              if (errors.length) {
                errors.forEach((key) => setFieldTouched(key));
                setErrors(error);
              } else {
                const response = await submit(
                  normalize(formReference?.current.values),
                  event
                );
                if (response !== false) {
                  if (event?.target?.id === "acceptButton") {
                    modalActions.close();
                    modalType && setIdFunction?.(null);
                    !modalType && setEditMode(true);
                  }
                  if (event?.target?.id === "applyButton") {
                    resetForm();
                  }
                }
              }
            }
          };
          return (
            <>
              <DialogContent dividers={!!modalType} sx={sx}>
                <GridContainer hideButtons={hideButtons} sx={gridContainerSx}>
                  <GForm
                    controlArray={controls}
                    dataSource={dataSource}
                    editMode={editMode}
                    initialValue={initialFormData}
                  />
                </GridContainer>
              </DialogContent>

              <Box sx={{ flexGrow: 1 }} />

              {!hideButtons && (
                <DialogActions sx={{ justifyContent: " " }}>
                  {prevButton && (
                    <Button
                      onClick={() => {
                        prevButton?.action(values);
                      }}
                      color="primary"
                      variant="contained"
                      disabled={prevDisabledFunction?.(values)}
                    >
                      {prevButton?.text}
                    </Button>
                  )}
                  {modalType && (
                    <Button
                      onClick={() => {
                        modalActions.close();
                        setIdFunction?.(null);
                      }}
                      color="primary"
                      variant="contained"
                    >
                      Cancelar
                    </Button>
                  )}
                  {dataAction?.map((action: any, index: number) => (
                    <Button
                      key={index}
                      onClick={() => {
                        action.action();
                      }}
                      color="primary"
                      variant="contained"
                    >
                      {action.label}
                    </Button>
                  ))}
                  {!editMode && (applyButton === undefined || applyButton) && (
                    <Button
                      onClick={formButtonAction}
                      disabled={
                        applyDisabledFunction?.(values) ||
                        submitDisabledFunction?.(values)
                        // ||
                        // !isValid
                      }
                      color={"primary"}
                      variant="contained"
                      id="applyButton"
                    >
                      Aplicar
                    </Button>
                  )}
                  <Button
                    onClick={formButtonAction}
                    disabled={
                      acceptDisabledFunction?.(values) ||
                      submitDisabledFunction?.(values)
                      // !isValid
                    }
                    color={"primary"}
                    variant="contained"
                    id="acceptButton"
                  >
                    Aceptar
                  </Button>{" "}
                  {nextButton && (
                    <Button
                      onClick={() => {
                        nextButton?.submitOnAction &&
                          formButtonAction().finally(
                            () => nextButton?.action(values)
                          );
                        !nextButton?.submitOnAction &&
                          nextButton?.action(values);
                      }}
                      disabled={nextDisabledFunction?.(values)}
                      color="primary"
                      variant="contained"
                    >
                      {nextButton?.text}
                    </Button>
                  )}
                </DialogActions>
              )}
            </>
          );
        }}
      </Formik>
    </FormContainer>
  ) : (
    <Loading />
  );
};
export default GenericForm;
