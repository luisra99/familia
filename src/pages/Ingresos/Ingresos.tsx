import { Button, Stack, Typography } from "@mui/material";
import {
  crear,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { useCallback, useRef, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { datico as db } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useConfirm } from "material-ui-confirm";
import { useLiveQuery } from "dexie-react-hooks";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { obtenerMiembroOcupacion } from "../Ocupacion/utils";

export async function tieneIngresos(arr: any) {
  const result = await Promise.all(
    arr.map(async (obj: any) => {
      const ingresos = await db.dat_miembrofuentesingresos
        .where({ idmiembrohogar: obj.idconcepto.toString() })
        .toArray();

      const ocupacionDelMiembro = await obtenerMiembroOcupacion(
        obj.idconcepto.toString()
      );
      const tieneOcupacion = ocupacionDelMiembro?.idocupacion === "1";
      const ingresosValidos = ingresos.filter((ingreso: any) => {
        if (tieneOcupacion) {
          return ingreso.idfuente?.[0] == "9319";
        } else {
          return true;
        }
      });

      if (ingresosValidos.length > 0) {
        return obj.idconcepto.toString();
      } else {
        return 0;
      }
    })
  );
  return result.filter((item) => item != 0);
}

function Ingresos() {
  const idhogar = getHogar() ?? 0;
  // hooks
  const [id, setid] = useState<any>(null);
  const [habilitarAdd, setHabilitarAdd] = useState<any>(true);
  const [ingresosMiembro, setIngresosMiembro] = useState<any>([]);
  const [miembros, setMiembros] = useState<any>([]);
  const [ingresos, setIngresos] = useState<any>([]);
  const [titleForm, setTitleForm] = useState<any>("");
  const [tieneOcupacion, setTieneOcupacion] = useState<boolean>(false);
  const [fuenteProcedencia, setFuenteProcedencia] = useState<any>([]);
  const [fuenteProcedenciaInit, setFuenteProcedenciaInit] = useState<any>([]);
  const miembroRef = useRef<any>(0);
  // utils
  const confirm = useConfirm();
  const notificar = NotificationProvider();
  const navegar = useNavigate();
  const siguiente = () => navegar("/autonomia/discapacidad");
  const anterior = () => navegar("/principal");

  const { modalActions } = useModalState();

  // init

  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    const miembros = data.filter((item) => item.edad > 15);
    setMiembros(miembros);
    const ingresos = await tieneIngresos(miembros);
    setIngresos(ingresos);
    const fuentes = await db.nom_concepto
      .where("idpadre")
      .equals("9318")
      .toArray();
    setFuenteProcedencia(fuentes);
    setFuenteProcedenciaInit(fuentes);
  });

  //#region (procesa los datos antes de enviarlos al TableView)
  async function unionNomenclador(arr: any) {
    let desabilitarAceptar = false;
    const join = await Promise.all(
      arr.map(async (obj: any) => {
        const moneda = obj?.idmoneda
          ? await db.nom_concepto.get(parseInt(obj?.idmoneda?.[0] ?? 0))
          : null;

        const fuente = await db.nom_concepto.get(
          parseInt(obj?.idfuente[0] ?? 0)
        );

        if (obj?.idfuente[0] == "10580") {
          desabilitarAceptar = true;
        }

        let cuantia;
        if (obj.idescala?.length) {
          const cuantias = await db.nom_concepto
            .where({ idconcepto: Number(obj.idescala[0]) })
            .first();
          cuantia = cuantias?.denominacion;
        }

        const fuentestr =
          fuente?.idconcepto == 9326 ? (
            <p style={{ textAlign: "left", width: "max-content" }}>
              {fuente?.denominacion}
              <br />
              {fuente?.denominacion == "Otras fuentes " ? "Cuál: " : ""}
              {obj.esotrafuente}
            </p>
          ) : (
            fuente?.denominacion
          );

        return {
          ...obj,
          moneda: moneda?.denominacion ?? "Ninguna",
          fuente: fuentestr,

          montomensual: (
            <b style={{ textAlign: "left", width: "max-content" }}>
              {obj.idescala?.length
                ? `$${cuantia}`
                : `$${(obj.montomensual ?? 0) * 1}`}
            </b>
          ),
        };
      })
    );
    setHabilitarAdd(desabilitarAceptar);
    return join;
  }

  //#region consulta de la bd
  async function obtenerDatos(idmiembro: any) {
    const data = await db.dat_miembrofuentesingresos
      .where({ idmiembrohogar: idmiembro })
      .toArray();
    const ocupacionDelMiembro = await obtenerMiembroOcupacion(idmiembro);
    setTieneOcupacion(ocupacionDelMiembro?.idocupacion === "1");
    const result = await unionNomenclador(data);
    return result;
  }

  //#region Actualizacion de los estados del tableView por cada usuario
  async function onChangeMiembro(id: any) {
    const datos = await obtenerDatos(id);
    setIngresosMiembro(datos);
  }

  const formModal: () => IGenericControls[] = useCallback(
    () => [
      {
        type: "select",
        label: "Fuente de procedencia",
        name: "idfuente",
        disabledOnEdit: true,
        gridValues: { xl: 4, lg: 4, md: 6, xs: 12, sm: 12 },
        options: fuenteProcedencia.filter((item: any) => {
          return !tieneOcupacion ? item.idconcepto != 9319 : true;
        }),
        validations: {
          required: { message: "Este campo es obligatorio" },
        },
        // url: "9318",
        onChange: (event, ref) => {
          event.target.value == "9322" ||
          event.target.value == "9323" ||
          event.target.value == "869348" ||
          event.target.value == "869349" ||
          event.target.value == "9324" ||
          event.target.value == "10572" ||
          event.target.value == "10573"
            ? ref.setFieldValue("idmoneda", ["9310"], true)
            : ref.setFieldValue("idmoneda", [], false);
        },
      },
      {
        type: "text",
        label: "Cuál",
        name: "esotrafuente",
        disabledOnEdit: false,
        pattern: /[a-zA-Z0-9 ]/,
        multiline: { minRows: 1 },
        gridValues: { xl: 4, lg: 4, md: 6, xs: 12, sm: 12 },
        hidden: (values: any) => values.idfuente != "9326",
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "idfuente",
              expression: (value) =>
                JSON.stringify(value) === JSON.stringify(["9326"]),
            },
          },
          tests: [
            {
              test: (values: any) => {
                return values.esotrafuente?.length >= 50;
              },
              message: "Límite máximo 50 caracteres",
            },
          ],
        },
      },
      {
        type: "select",
        label: "Moneda",
        name: "idmoneda",
        gridValues: { xl: 4, lg: 4, md: 6, xs: 12, sm: 12 },
        url: "9309",
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "idfuente",
              expression: (value) =>
                JSON.stringify(value) !== JSON.stringify(["10580"]),
            },
          },
        },
        disabled: (values) =>
          values.idfuente == "9322" ||
          values.idfuente == "9323" ||
          values.idfuente == "9324" ||
          values.idfuente == "869348" ||
          values.idfuente == "869349" ||
          values.idfuente == "10572" ||
          values.idfuente == "10573",
        disabledOnEdit: true,
        hidden: (values: any) => values.idfuente[0] == "10580",
      },
      {
        type: "select",
        label: "Cuantias",
        name: "idescala",
        gridValues: { xl: 4, lg: 4, md: 6, xs: 12, sm: 12 },
        url: "10394",
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "idfuente",
              expression: (value) =>
                JSON.stringify(value) === JSON.stringify(["9323"]),
            },
          },
        },
        // disabledOnEdit: true,
        hidden: (values: any) => values.idfuente[0] != "9323",
      },
      {
        type: "number" /**es lo generico */,
        label: "Monto",
        name: "montomensual",
        decimalScale: 2,
        disabledOnEdit: false,
        format: "finance",
        negativeValues: false,
        gridValues: { xl: 4, lg: 4, md: 6, xs: 12, sm: 12 },
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "idfuente",
              expression: (value) =>
                JSON.stringify(value) !== JSON.stringify(["9323"]) &&
                JSON.stringify(value) !== JSON.stringify(["10580"]),
            },
          },
          moreThan: {
            value: 0,
            message: "El monto debe de ser mayor que 0",
            when: {
              name: "idfuente",
              expression: (value) =>
                JSON.stringify(value) !== JSON.stringify(["9323"]) &&
                JSON.stringify(value) !== JSON.stringify(["10580"]),
            },
          },
          tests: [
            {
              test: (values: any) => {
                const value = Number(values?.montomensual);
                if (typeof value === "number") return value > 1000000;
              },
              message: "Limite máximo 1000000 ",
            },
          ],
        },
        hidden: (values: any) =>
          values.idfuente[0] == "9323" || values.idfuente[0] == "10580",
      },
    ],
    [tieneOcupacion, fuenteProcedencia, ingresosMiembro]
  );
  const formControls = useCallback(
    (): IGenericControls[] => [
      {
        type: "component",
        component: () => (
          <Typography variant="h6" sx={{ ml: 1, mb: 4 }}>
            Ingresos
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: () => <Typography sx={{ mb: 1 }} />,
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
        onChange: (e: any) => {
          const { value } = e.target;
          setHabilitarAdd(false);
          onChangeMiembro(value);
        },
        validations: {
          required: { message: "Debe seleccionar un miembro" },
        },
        checkValues: ingresos,
        useRef: miembroRef,
      },
      {
        type: "component",
        component: () => (
          <Typography sx={{ mt: 1 }}>
            <span>Nota aclaratoria:</span> Se pregunta a la persona entrevistada
            cuánto dinero gana y/o recibe cada miembro del hogar mensualmente de
            forma habitual, tomando como referencia los últimos 12 meses.
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: () => (
          <Stack
            spacing={2}
            direction="row-reverse"
            mx={"auto"}
            my={2}
            display={"inline-list-item"}
          >
            <Button
              onClick={() => {
                setTitleForm("Adicionar ingreso");
                modalActions.open("formularioModal");
              }}
              variant="contained"
              disabled={habilitarAdd}
            >
              Adicionar
            </Button>
          </Stack>
        ),

        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: () => (
          <TableView
            values={ingresosMiembro}
            headers={[
              { name: "fuente", label: "Fuente de procedencia" },
              { name: "idmiembrofuentesingresos" },
              { name: "moneda", label: "Moneda" },
              { name: "montomensual", label: "Monto", align: "center" },
            ]}
            idKey="idmiembrofuentesingresos"
            multiSelect={true}
            rowActions={[
              {
                label: "Modificar",
                action: (values: any) => {
                  setid(values.idmiembrofuentesingresos);
                  setFuenteProcedencia(fuenteProcedenciaInit);
                  setTitleForm("Modificar ingreso");
                  modalActions.open("formularioModal");
                },
                icon: EditIcon,
              },
              {
                icon: DeleteIcon,
                label: "Eliminar",
                action: (values: any) => {
                  const idmiembro = miembroRef.current.childNodes.item(1).value;
                  confirm({
                    title: "Eliminar",
                    confirmationText: "Aceptar",
                    cancellationText: "Cancelar",
                    description: `¿Está seguro que desea eliminar el ingreso seleccionado?`,
                  })
                    .then(() => {
                      eliminar(
                        "dat_miembrofuentesingresos",
                        "idmiembrofuentesingresos",
                        values.idmiembrofuentesingresos
                      ).then(() => {
                        notificar({
                          type: "success",
                          title:
                            "El ingreso ha sido eliminado satisfactoriamente.",
                          content: "",
                        });
                        onChangeMiembro(idmiembro);
                      });
                    })
                    .catch(() => console.log("Acción cancelada."));
                },
              },
            ]}
            disabled={false}
            useCheckBox={false}
          />
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
    ],
    [ingresosMiembro, habilitarAdd, ingresos, miembroRef, miembros]
  );

  function getFormPage() {
    if (idhogar) {
      if (miembros.length) {
        return (
          <GenericForm
            name="formularioTabla"
            controls={formControls()}
            title=""
            endpointPath=""
            hideButtons={true}
          />
        );
      } else {
        return (
          <Typography variant="h6" p={2}>
            <b>No existen miembros en el hogar seleccionado </b>
          </Typography>
        );
      }
    } else {
      return (
        <Typography variant="h6" p={2}>
          <b>No existe un hogar seleccionado</b>
        </Typography>
      );
    }
  }

  function getFormModal() {
    return (
      <GenericForm
        name="formularioModal"
        controls={formModal()}
        title={titleForm}
        description=""
        endpointPath=""
        showSpecificDescription={true}
        idForEdit={
          id ||
          (tieneOcupacion &&
          ingresosMiembro.filter((item: any) => item.idfuente?.[0] == "9319")
            .length == 0
            ? "init"
            : undefined)
        }
        setIdFunction={setid}
        modalType="fullWith"
        applyButton={!id}
        notifyValidation={(values) => {
          let error: string | undefined;
          ingresosMiembro.forEach((item: any) => {
            if (
              item.idfuente[0] === values.idfuente[0] &&
              item.idmoneda[0] === values.idmoneda[0] &&
              !values.editMode
            )
              error = "Ya existe esta fuente de ingresos con esta moneda.";
            if (
              values.idfuente[0] == "10580" &&
              ingresosMiembro.filter((item: any) => item.idfuente[0] != "10580")
                .length
            ) {
              error =
                "Si ya le declarado ingreso a la persona, no puedes declararlo sin ingreso.";
            }
            if (
              values.idfuente[0] == "10580" &&
              ingresosMiembro.filter((item: any) => item.idfuente[0] == "10580")
                .length
            ) {
              error = "Ya se declaro que esta persona no tiene ingresos.";
            }
          });
          return error;
        }}
        submitFunction={(values: any) => {
          const idmiembro = miembroRef.current.childNodes.item(1).value;
          delete values.editMode;

          if (values.idfuente[0] === "10580") {
            const datosSinIngreso = {
              ...values,
              montomensual: 0,
              idmoneda: [],
            };

            crear("dat_miembrofuentesingresos", {
              ...datosSinIngreso,
              idmiembrohogar: idmiembro,
              idcodigohogar: idhogar,
            }).then((id) => {
              notificar({
                type: "success",
                title: "La persona ha sido marcada como sin ingresos.",
                content: "",
              });
              onChangeMiembro(idmiembro);
            });

            modalActions.close();
            setHabilitarAdd(false);
            return;
          }

          if (id) {
            modificar(
              "dat_miembrofuentesingresos",
              "idmiembrofuentesingresos",
              id,
              values
            )
              .then(() => {
                notificar({
                  type: "success",
                  title: "El ingreso ha sido modificado satisfactoriamente.",
                  content: "",
                });
                onChangeMiembro(idmiembro);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            crear("dat_miembrofuentesingresos", {
              ...values,
              idmiembrohogar: idmiembro,
              idcodigohogar: idhogar,
            })
              .then((id) => {
                notificar({
                  type: "success",
                  title: "El ingreso ha sido adicionado satisfactoriamente.",
                  content: "",
                });
                onChangeMiembro(idmiembro);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }}
        getByIdFunction={async (id) => {
          if (id == "init") {
            return {
              idfuente: ["9319"],
              esotrafuente: "",
              idmoneda: "",
              idescala: "",
              montomensual: "",
            };
          }
          const arr = await obtenerDatosPorLlave(
            "dat_miembrofuentesingresos",
            "idmiembrofuentesingresos",
            id
          );
          return arr[0];
        }}
      />
    );
  }

  function getToolBar() {
    if (idhogar && miembros.length) {
      return (
        <>
          <Stack
            direction="row"
            mx={"auto"}
            my={2}
            px={5}
            display={"inline-list-item"}
            justifyContent="flex-end"
            sx={{ width: "100%" }}
          >
            <Button
              onClick={anterior}
              variant="contained"
              sx={{ marginRight: "5px" }}
            >
              Anterior
            </Button>

            <Button
              onClick={siguiente}
              variant="contained"
              disabled={
                miembros?.length !== ingresos?.length ||
                (tieneOcupacion &&
                  ingresosMiembro.filter(
                    (item: any) => item.idfuente?.[0] == "9319"
                  ).length == 0)
              }
            >
              Siguiente
            </Button>
          </Stack>
        </>
      );
    }
  }

  return (
    <>
      <Meta title="Ingresos" />

      {!!idhogar && !!miembros.length && (
        <GenericForm
          name="formularioTabla"
          controls={formControls()}
          title=""
          endpointPath=""
          hideButtons={true}
        />
      )}
      {!miembros.length && !!idhogar && (
        <Typography variant="h6" p={2}>
          <b>No existen miembros en el hogar seleccionado </b>
        </Typography>
      )}
      {!idhogar && (
        <Typography variant="h6" p={2}>
          <b>No existe un hogar seleccionado</b>
        </Typography>
      )}

      {getFormModal()}

      {getToolBar()}
    </>
  );
}

export default Ingresos;
