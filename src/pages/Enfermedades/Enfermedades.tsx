import { Button, Divider, Stack, Typography } from "@mui/material";
import {
  crear,
  CreateOrModify,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import {
  getByIdFunctionMiembro,
  getEnfermedadesMiembroNomencladas,
  getEnfermedadesQueNoTiene,
  miembrosConEnfermedades,
} from "./utils";
import { useCallback, useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useConfirm } from "material-ui-confirm";
import { useLiveQuery } from "dexie-react-hooks";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { Filter } from "@mui/icons-material";

function Enfermedades() {
  const idHogar = getHogar() ?? 0;
  const [idMiembro, setIdMiembro] = useState<any>(null);
  const [idEnfermedad, setIdEnfermedad] = useState<any>(null);

  const [enfermedadesMiembro, setEnfermedadesMiembro] = useState<any>([]);
  const [miembros, setMiembros] = useState<any>([]);
  const [enfermedades, setEnfermedades] = useState<any>([]);
  const [enfermedadesFiltradas, setEnfermedadesFiltradas] = useState<any>([]);

  const [miembrosCheckEnfermedad, setMiembrosCheck] = useState<any>([]);

  const { modalActions } = useModalState();
  const confirm = useConfirm();
  const notificar = NotificationProvider();
  const navegar = useNavigate();

  const siguiente = () => navegar("/autonomia/servicios");
  const anterior = () => navegar("/autonomia/discapacidad");

  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    setMiembros(data);
    const miembrosConDatos = await miembrosConEnfermedades(data);
    setMiembrosCheck(miembrosConDatos.filter((item) => !!item).join(","));
    const enfermedades = await obtenerDatosPorLlave(
      "nom_concepto",
      "idpadre",
      "9793"
    );
    setEnfermedades(enfermedades);
  });

  useEffect(() => {
    if (idMiembro) {
      getEnfermedadesQueNoTiene(idMiembro).then((elementofiltrados: any) => {
        LoadDatos(idMiembro).finally(() =>
          setEnfermedadesFiltradas([...elementofiltrados])
        );
      });
    }
  }, [idMiembro]);

  useEffect(() => {
    if (idMiembro)
      getEnfermedadesQueNoTiene(idMiembro).then((elementofiltrados: any) => {
        setEnfermedadesFiltradas([...elementofiltrados]);
      });
  }, [enfermedadesMiembro]);

  async function LoadDatos(idMiembro: any) {
    const enfermedadesMiembro =
      await getEnfermedadesMiembroNomencladas(idMiembro);
    setEnfermedadesMiembro(enfermedadesMiembro);
  }

  const enfermedadesControls = useCallback((): IGenericControls[] => {
    return [
      {
        type: "select",
        name: "idtipoenfermedad",
        label: "Patología",
        options: enfermedadesFiltradas ?? [],
        gridValues: { md: 4, lg: 4, sm: 4, xl: 4, xs: 4 },
        validations: {
          required: { message: "Este campo es obligatorio" },
        },
        disabledOnEdit: true,
      },
      {
        type: "select",
        name: "accede",
        label: "Accede a medicamentos",
        options: [
          { idconcepto: "1", denominacion: "Sí" },
          { idconcepto: "2", denominacion: "No" },
        ],
        gridValues: { md: 4, lg: 4, sm: 4, xl: 4, xs: 4 },
        onChange: (e, ref) => {
          ref.setFieldValue("idtipoviaacceso", [], true);
        },
        validations: {
          required: {
            message: "Este campo es obligatorio",
          },
        },
      },
      {
        type: "multiselect",
        name: "idtipoviaacceso",
        label: "Vía de acceso",
        url: "9416",
        gridValues: { md: 4, lg: 4, sm: 4, xl: 4, xs: 4 },
        hidden: (values: any) => {
          return values?.accede[0] !== "1";
        },
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "accede",
              expression: (value: any) => {
                return value[0] === "1";
              },
            },
          },
        },
      },
    ];
  }, [enfermedadesFiltradas]);
  const enfermedadesFormControls = useCallback((): IGenericControls[] => {
    return [
      {
        type: "component",
        component: () => (
          <Typography variant="h6" sx={{ ml: 1, mb: 4 }}>
            Enfermedades
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "select",
        label: "Miembro del hogar",
        name: "idmiembro",
        gridValues: { xs: 12, lg: 8, md: 8, sm: 8, xl: 8 },
        options: miembros,
        checkValues: miembrosCheckEnfermedad,
        onChange: (e, ref) => {
          const { value } = e.target;
          setIdMiembro(value);
          ref.setFieldValue("idenfermedad", [], false);
          ref.setFieldValue("idbeneficio", [], false);
        },
        validations: {
          required: { message: "Este campo es obligatorio" },
        },
      },
      {
        type: "radio",
        label: "¿Padece enfermedades crónicas?",
        name: "idmiembroenfcronica",
        radios: [
          { idconcepto: "1", denominacion: "Sí" },
          { idconcepto: "2", denominacion: "No" },
        ],
        direction: "row",
        labelPlacement: "end",
        gridValues: { md: 12, lg: 12, sm: 12, xl: 12, xs: 12 },
        validations: {
          required: {
            message: "Este campo es obligatorio",
          },
        },
      },
      {
        type: "component",
        component: () => (
          <>
            <Stack
              spacing={2}
              direction="row"
              mx={"auto"}
              my={2}
              display={"inline-list-item"}
            >
              <Button
                disabled={!idMiembro || !enfermedadesFiltradas.length}
                onClick={(e: any) => {
                  modalActions.open("Enfermedades");
                }}
                variant="contained"
                sx={{ marginBottom: "10px !important" }}
              >
                Adicionar
              </Button>
            </Stack>
            <TableView
              values={idMiembro ? enfermedadesMiembro : []}
              useCheckBox={false}
              headers={[
                {
                  name: "patologia",
                  align: "left",
                  label: "Patología",
                },
                {
                  name: "accede",
                  align: "left",
                  label: "Accede a medicamentos",
                },
                {
                  name: "via",
                  align: "left",
                  label: "Vías de acceso",
                },
              ]}
              idKey="idmiembroenfcronica"
              multiSelect={true}
              rowActions={[
                {
                  label: "Modificar",
                  action: (values: any) => {
                    setEnfermedadesFiltradas([...enfermedades]);
                    setIdEnfermedad(values.idmiembroenfcronica);
                    modalActions.open("Enfermedades");
                  },
                  icon: EditIcon,
                },
                {
                  label: "Eliminar",
                  action: (values: any) => {
                    const llave = values.idmiembroenfcronica;
                    confirm({
                      title: "Eliminar",
                      confirmationText: "Aceptar",
                      cancellationText: "Cancelar",
                      description: `¿Está seguro que desea eliminar la enfermedad seleccionada?`,
                    }).then(() =>
                      eliminar(
                        "dat_miembroenfcronicas",
                        "idmiembroenfcronica",
                        llave
                      ).then(() => {
                        eliminar(
                          "dat_viasacceso",
                          "idmiembroenfcronica",
                          llave
                        ).then(() => LoadDatos(idMiembro));
                        notificar({
                          type: "success",
                          title:
                            "La enfermedad crónica ha sido eliminada satisfactoriamente.",
                          content: "",
                        });
                      })
                    );
                  },
                  icon: DeleteIcon,
                },
              ]}
            />
          </>
        ),
        gridValues: { lg: 12, md: 12, sm: 12, xl: 12, xs: 12 },
        name: "",
        label: "adt",
        hidden: (values: any) =>
          values.idmiembroenfcronica == "2" ||
          values.idmiembroenfcronica !== "1",
      },
      {
        type: "component",
        component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "multiselect",
        name: "idenfermedad",
        label: "Enfermedades de baja prevalencia",
        gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
        url: "9399",
      },
      {
        type: "multiselect",
        name: "idbeneficio",
        label: "Beneficios focalizados de salud",
        url: "9802",
        gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
      },
    ];
  }, [
    idHogar,
    miembros,
    miembrosCheckEnfermedad,
    idMiembro,
    enfermedadesFiltradas,
    enfermedadesMiembro,
  ]);
  const enfermedadesGetByIdFunction = useCallback(
    async (idEnfermedad: string) => {
      const enfermedadesMiembro: any = await datico.dat_miembroenfcronicas
        .where({
          idmiembroenfcronica: idEnfermedad,
          idmiembrohogar: idMiembro,
        })
        .first();

      return {
        idtipoenfermedad: enfermedadesMiembro?.idtipoenfermedad ?? [],
        accede: enfermedadesMiembro?.accede ?? [],
        idtipoviaacceso: enfermedadesMiembro?.idtipoviaacceso ?? [],
        editMode: !!enfermedadesMiembro?.idtipoenfermedad,
      };
    },
    [idMiembro]
  );
  const enfermedadesSubmitFunction = useCallback(
    async (values: any) => {
      await CreateOrModify(
        "dat_miembroenfcronicas",
        {
          idmiembrohogar: idMiembro,
          idtipoenfermedad: values.idtipoenfermedad,
          idcodigohogar: idHogar,
        },
        {
          ...values,
          idmiembrohogar: idMiembro,
          idcodigohogar: idHogar,
        },
        "idmiembroenfcronica"
      );
      const registro = await datico.dat_miembroenfcronicas
        .where({
          idmiembrohogar: idMiembro,
          idtipoenfermedad: values.idtipoenfermedad,
        })
        .toArray();
      const { idmiembroenfcronica } = registro?.[0] ?? {
        idmiembroenfcronica: "",
      };
      await CreateOrModify(
        "dat_viasacceso",
        { idmiembroenfcronica },

        {
          idtipoviaacceso: values.idtipoviaacceso,
          idmiembrohogar: idMiembro,
          idcodigohogar: idHogar,
        },
        "idviacceso"
      );
      LoadDatos(idMiembro);
      notificar({
        type: "success",
        title: "La enfermedad crónica ha sido guardada satisfactoriamente.",
        content: "",
      });
    },
    [idMiembro]
  );

  return (
    <>
      <Meta title="Controles" />
      {idHogar ? (
        miembros.length ? (
          <GenericForm
            name="1"
            controls={enfermedadesFormControls()}
            endpointPath="persona"
            showSpecificDescription={false}
            idForEdit={idMiembro}
            saveButton="Guardar"
            acceptDisabledFunction={(values) => values.idmiembro == ""}
            applyButton={false}
            nextButton={{ text: "Siguiente", action: siguiente }}
            prevButton={{ text: "Anterior", action: anterior }}
            nextDisabledFunction={() => {
              const miembrosCheck = miembrosCheckEnfermedad.includes(",")
                ? miembrosCheckEnfermedad?.split?.(",")?.length
                : miembrosCheckEnfermedad.length > 0
                  ? 1
                  : 0;
              return miembros?.length !== miembrosCheck;
            }}
            getByIdFunction={getByIdFunctionMiembro}
            submitFunction={async (values: any) => {
              const enfer_bajaprev = await datico.dat_miembroenfbajaprev
                .where({ idmiembrohogar: values.idmiembro[0] })
                .toArray();
              const enfer_beneficio = await datico.dat_miembrobeneficios
                .where({ idmiembrohogar: values.idmiembro[0] })
                .toArray();
              const existe_enfcronicas = await datico.dat_miembroenfcronicas
                .where({ idmiembrohogar: values.idmiembro[0] })
                .toArray();
                
              await modificar(
                "dat_miembrohogar",
                "idmiembrohogar",
                Number(values.idmiembro[0]),
                { idmiembroenfcronica: values.idmiembroenfcronica }
              );

              if (values.idmiembroenfcronica === "1") {
                if (!existe_enfcronicas.length) {
                  notificar({
                    type: "warning",
                    title: "Debe especificar al menos una enfermedad crónica.",
                    content: "",
                  });
                } else {
                  enfer_bajaprev?.length
                    ? modificar(
                        "dat_miembroenfbajaprev",
                        "idmiembrohogar",
                        values.idmiembro[0],
                        {
                          idcodigohogar: getHogar(),
                          idenfermedad: values.idenfermedad,
                        },
                        [
                          "idcodigohogar",
                          "idmiembrohogar",
                          "idmiembroenfbajaprev",
                        ]
                      )
                    : crear(
                        "dat_miembroenfbajaprev",
                        {
                          idmiembrohogar: values.idmiembro[0],
                          idenfermedad: values.idenfermedad,
                          idcodigohogar: idHogar,
                        },
                        [
                          "idcodigohogar",
                          "idmiembrohogar",
                          "idmiembroenfbajaprev",
                        ]
                      );
                  enfer_beneficio?.length
                    ? modificar(
                        "dat_miembrobeneficios",
                        "idmiembrohogar",
                        values.idmiembro[0],
                        {
                          idcodigohogar: getHogar(),
                          idbeneficio: values.idbeneficio,
                        },
                        [
                          "idcodigohogar",
                          "idmiembrohogar",
                          "idmiembrobeneficios",
                        ]
                      )
                    : crear(
                        "dat_miembrobeneficios",
                        {
                          idcodigohogar: idHogar,
                          idmiembrohogar: values.idmiembro[0],
                          idbeneficio: values.idbeneficio,
                        },
                        [
                          "idcodigohogar",
                          "idmiembrohogar",
                          "idmiembrobeneficios",
                        ]
                      );
                  notificar({
                    type: "success",
                    title:
                      "Se han adicionado los datos de enfermedades al miembro satisfactoriamente.",
                    content: "",
                  });
                }
              } else {
                enfer_bajaprev?.length
                  ? modificar(
                      "dat_miembroenfbajaprev",
                      "idmiembrohogar",
                      values.idmiembro[0],
                      {
                        idcodigohogar: getHogar(),
                        idenfermedad: values.idenfermedad,
                      },
                      [
                        "idcodigohogar",
                        "idmiembrohogar",
                        "idmiembroenfbajaprev",
                      ]
                    ).then(() => {
                      existe_enfcronicas.length &&
                        eliminar(
                          "dat_miembroenfcronicas",
                          "idmiembrohogar",
                          values.idmiembro[0]
                        );
                    })
                  : crear(
                      "dat_miembroenfbajaprev",
                      {
                        idmiembrohogar: values.idmiembro[0],
                        idenfermedad: values.idenfermedad,
                        idcodigohogar: idHogar,
                      },
                      [
                        "idcodigohogar",
                        "idmiembrohogar",
                        "idmiembroenfbajaprev",
                      ]
                    ).then(() => {
                      existe_enfcronicas.length &&
                        eliminar(
                          "dat_miembroenfcronicas",
                          "idmiembrohogar",
                          values.idmiembro[0]
                        ).then(() => {});
                    });
                enfer_beneficio?.length
                  ? modificar(
                      "dat_miembrobeneficios",
                      "idmiembrohogar",
                      values.idmiembro[0],
                      {
                        idcodigohogar: getHogar(),
                        idbeneficio: values.idbeneficio,
                      },
                      ["idcodigohogar", "idmiembrohogar", "idmiembrobeneficios"]
                    ).then(() => {
                      existe_enfcronicas.length &&
                        eliminar(
                          "dat_miembroenfcronicas",
                          "idmiembrohogar",
                          values.idmiembro[0]
                        ).then(() => {});
                    })
                  : crear(
                      "dat_miembrobeneficios",
                      {
                        idmiembrohogar: values.idmiembro[0],
                        idbeneficio: values.idbeneficio,
                        idcodigohogar: idHogar,
                      },
                      ["idcodigohogar", "idmiembrohogar", "idmiembrobeneficios"]
                    ).then(() => {
                      existe_enfcronicas.length &&
                        eliminar(
                          "dat_miembroenfcronicas",
                          "idmiembrohogar",
                          values.idmiembro[0]
                        ).then(() => {});
                    });
                notificar({
                  type: "success",
                  title:
                    "La información sobre enfermedades se ha guardado satisfactoriamente.",
                  content: "",
                });
              }
            }}
          />
        ) : (
          <Typography variant="h6" p={2}>
            <b>No existen miembros en el hogar seleccionado</b>
          </Typography>
        )
      ) : (
        <Typography variant="h6" p={2}>
          <b>No existe un hogar seleccionado</b>
        </Typography>
      )}
      <GenericForm
        name="Enfermedades"
        controls={enfermedadesControls()}
        createTitle="Adicionar enfermedades"
        editTitle="Modificar enfermedades"
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={idEnfermedad}
        setIdFunction={setIdEnfermedad}
        modalType="fullWith"
        getByIdFunction={enfermedadesGetByIdFunction}
        submitFunction={enfermedadesSubmitFunction}
      />
    </>
  );
}

export default Enfermedades;
