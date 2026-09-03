import {
  crear,
  deleteRowsIfExist,
} from "@/app/user-interfaces/forms/models/controllers";
import { useCallback, useState } from "react";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { Typography } from "@mui/material";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembroPorBeneficios } from "./helpers";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useLiveQuery } from "dexie-react-hooks";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";

//import {  } from "@/app/user-interfaces/controls/controls.config.eviel";

function AccesoProgramasProteccionSocialCuidados() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  const [configuracionBeneficios, setConfiguracionBeneficios] = useState<
    Record<string, any>
  >({});
  const [configuracionCausasNoAcceso, setConfiguracionCausasNoAcceso] =
    useState<Record<string, any>>({});
  const idhogar = getHogar() ?? 0;
  const [miembros, setMiembros] = useState<any>([]);
  const [checked, setCheked] = useState<any>("");
  const notificar = NotificationProvider();
  const [isSaved, setIsSaved] = useState(false);

  const navegar = useNavigate();
  const siguiente = async () => {
    const data = await obtenerMiembros();
    const miembros = data.filter((item) => item.edad < 18);

    if (miembros.length) navegar("/adolecentes");
    else navegar("/servicios-equipamientos/materiales");
  };
  const anterior = () => navegar("/autonomia/servicios");

  const ObtenerChecked = async (arr: any) => {
    //logica
    //resultado
    const result = await Promise.all(
      arr.map(async (obj: any) => {
        const uso = await datico.dat_polprogsoc
          .where({ idmiembrohogar: obj.idconcepto.toString() })
          .count();
        if (uso > 0) {
          return obj.idconcepto;
        } else {
          return 0;
        }
      })
    );
    const _result = result.filter((item) => item != 0);
    setCheked(_result.toString());
  };
  const beneficios = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9442")
      .toArray();

    return prueba;
  });
  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    setMiembros(data);
    await ObtenerChecked(data);
  });

  const obtenerBeneficiosXmiembro = async (id: number, beneficio: any) => {
    try {
      const dat_beneficios = await datico.dat_polprogsoc
        .where({
          idbeneficio: beneficio.idconcepto,
          idmiembrohogar: id.toString(),
        })
        .toArray();

      let dat_acceseo: any[] = [];
      if (dat_beneficios.length > 0) {
        dat_acceseo = await datico.dat_estadonoacceso
          .where("idpolprogsoc")
          .equals(dat_beneficios[0].idpolprogsoc)
          .toArray();
      }

      // 1. Construir objeto de causas
      const causas =
        dat_acceseo.length > 0
          ? {
              conocequeexiste: dat_acceseo[0].conocequeexiste,
              entramites: dat_acceseo[0].entramites,
              ayudaparaacceder: dat_acceseo[0].ayudaparaacceder,
            }
          : {
              conocequeexiste: false,
              entramites: false,
              ayudaparaacceder: false,
            };

      // 2. Actualizar estados de configuración
      setConfiguracionCausasNoAcceso((prev) => ({
        ...prev,
        [beneficio.idconcepto]: causas,
      }));

      setConfiguracionBeneficios((prev) => ({
        ...prev,
        [beneficio.idconcepto]: {
          idbeneficio: beneficio.idconcepto,
          idmiembrohogar: id.toString(),
          accede: dat_beneficios[0]?.accede || "",
          editMode: dat_beneficios.length > 0,
        },
      }));

      return {
        idmiembrohogar: id.toString(),
        idbeneficio: beneficio.idconcepto,
        accede: dat_beneficios[0]?.accede || "",
        ...causas,
        editMode: dat_beneficios.length > 0,
      };
    } catch (error) {
      console.log("obtenerBeneficiosXmiembro", error);
    }
  };

  const notifyValidation = useCallback(
    (values: any) => {
      if (!values?.idmiembrohogar.length) {
        return "Debes seleccionar un miembro.";
      }
      if (
        beneficios?.length !==
        Object.values(configuracionBeneficios)
          .map((item: any) => item.accede)
          .filter((item: any) => item.length).length
      ) {
        return "Debe llenar todos los beneficios.";
      }
      const beneficiosConProblema = Object.values(configuracionBeneficios)
        .filter((beneficio: any) => beneficio.accede === "3")
        .some((beneficio: any) => {
          const causas = configuracionCausasNoAcceso[beneficio.idbeneficio];
          return (
            !causas?.conocequeexiste &&
            !causas?.entramites &&
            !causas?.ayudaparaacceder
          );
        });

      if (beneficiosConProblema) {
        return "Debe seleccionar al menos una opción cuando elige 'No accede pero los necesita'";
      }
    },
    [configuracionBeneficios, configuracionCausasNoAcceso, beneficios]
  );

  const submitAccesoProgramas = useCallback(
    async (values: any) => {
      try {
        //#region Bien
        await deleteRowsIfExist(
          "dat_polprogsoc",
          { idmiembrohogar: values.idmiembrohogar[0] },
          "idpolprogsoc"
        );
        await deleteRowsIfExist(
          "dat_estadonoacceso",
          { idmiembrohogar: values.idmiembrohogar[0] },
          "idpolprogsoc"
        );
        //#endregion

        for (const [beneficioId, beneficioData] of Object.entries(
          configuracionBeneficios
        )) {
          const beneficio = beneficioData as any;

          const idpolprogsoc = await crear("dat_polprogsoc", {
            idmiembrohogar: values.idmiembrohogar[0],
            idcodigohogar: idhogar,
            idbeneficio: beneficio.idbeneficio,
            accede: beneficio.accede,
          });

          if (
            beneficio.accede === "3" &&
            configuracionCausasNoAcceso[beneficioId]
          ) {
            await crear("dat_estadonoacceso", {
              idcodigohogar: idhogar,
              idpolprogsoc,
              idmiembrohogar: values.idmiembrohogar[0],
              idbeneficio: beneficio.idbeneficio,
              conocequeexiste:
                configuracionCausasNoAcceso[beneficioId].conocequeexiste,
              entramites: configuracionCausasNoAcceso[beneficioId].entramites,
              ayudaparaacceder:
                configuracionCausasNoAcceso[beneficioId].ayudaparaacceder,
            });
          }
        }

        notificar({
          type: "success",
          title:
            "Los datos de acceso a programas de protección social y cuidados se han guardado satisfactoriamente.",
        });
        setIsSaved(true);
      } catch (error) {
        console.error("Error al guardar los datos:", error);
      }
    },
    [configuracionBeneficios, configuracionCausasNoAcceso, notificar]
  );

  const accesosFlields = useCallback(
    () =>
      beneficios?.map((beneficio: any) => (
        <GenericForm
          name="beneficios"
          applyButton={false}
          sx={{ py: 1, px: 0 }}
          controls={[
            {
              type: "component",
              component: () => (
                <Typography sx={{ mt: 2 }}>{beneficio.denominacion}</Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 6, lg: 4, md: 6, sm: 6, xl: 3 },
            },
            {
              type: "select",
              name: "accede",
              label: "Acceso a beneficios",

              gridValues: { xs: 6, lg: 8, md: 6, sm: 6, xl: 6 },
              onChange: (event, values) => {
                //#region Raul
                //Se actualiza una variable con la configuración de los alimentos
                setConfiguracionBeneficios((prev: any) => {
                  prev[beneficio.idconcepto] = {
                    ...prev[beneficio.idconcepto],
                    idbeneficio: beneficio.idconcepto,
                    accede: event.target.value,
                  };
                  return { ...prev };
                });
                //#endregion
              },
              options: [
                { idconcepto: "1", denominacion: "Sí" },
                { idconcepto: "2", denominacion: "No" },
                {
                  idconcepto: "3",
                  denominacion: "No accede pero los necesita",
                },
              ],
              validations: {
                required: {
                  message: "Este campo es obligatorio",
                },
              },
            },
            {
              type: "check",
              label: "Conoce que existe",
              name: "conocequeexiste",
              gridValues: { xl: 2, lg: 2, md: 4, sm: 4, xs: 4 },
              onChange: (e) => {
                setConfiguracionCausasNoAcceso((prev: any) => {
                  prev[beneficio.idconcepto] = {
                    ...prev[beneficio.idconcepto],
                    idbeneficio: beneficio.idconcepto,
                    conocequeexiste: e.target.checked,
                  };
                  return prev;
                });
              },
              hidden: (values: any) => values.accede != "3",
            },
            {
              type: "check",
              label: "En trámites para obtenerlos",
              name: "entramites",
              gridValues: { xl: 2, lg: 2, md: 4, sm: 4, xs: 4 },
              onChange: (e) => {
                setConfiguracionCausasNoAcceso((prev: any) => {
                  prev[beneficio.idconcepto] = {
                    ...prev[beneficio.idconcepto],
                    idbeneficio: beneficio.idconcepto,
                    entramites: e.target.checked,
                  };
                  return prev;
                });
              },
              hidden: (values: any) => values.accede != "3",
            },
            {
              type: "check",
              label: "Necesitan ayuda para acceder",
              name: "ayudaparaacceder",
              gridValues: { xl: 2, lg: 2, md: 4, sm: 4, xs: 4 },
              onChange: (e) => {
                setConfiguracionCausasNoAcceso((prev: any) => {
                  prev[beneficio.idconcepto] = {
                    ...prev[beneficio.idconcepto],
                    idbeneficio: beneficio.idconcepto,
                    ayudaparaacceder: e.target.checked,
                  };
                  return prev;
                });
              },
              hidden: (values: any) => values.accede != "3",
            },
          ]}
          endpointPath="/"
          hideButtons={true}
          idForEdit={id}
          setIdFunction={setid}
          getByIdFunction={async (id) =>
            await obtenerBeneficiosXmiembro(id, beneficio)
          }
        />
      )),
    [id]
  );
  const controls = useCallback(
    (): IGenericControls[] => [
      {
        type: "select",
        name: "idmiembrohogar",
        label: "Miembro del hogar",
        gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
        options: miembros,
        onChange: async (e: any, ref: any) => {
          const newId = `${e.target.value}`;
          setid(""); 
          setTimeout(() => {
            setid(newId); 
          }, 0);
        },
        checkValues: checked,
        validations: {
          required: { message: "Este campo es obligatorio" },
        },
      },
      {
        type: "component",
        component: () => (
          <Typography mt={"12px"}>
            <b>Nota aclaratoria:</b> Con frecuencia las personas no conocen que
            beneficios existen y pudieran acceder, por ello lee y explica con
            detenimiento las opciones a la persona entrevistada
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        hidden: (values: any) => values.idmiembrohogar == "",
      },

      {
        type: "component",
        component: () => accesosFlields(),
        gridValues: { lg: 12, md: 12, sm: 12, xl: 12, xs: 12 },
        name: "",
        label: "",
        hidden: (values: any) => values.idmiembrohogar == "",
      },
    ],
    [id, miembros, checked, accesosFlields]
  );

  return (
    <>
      <Meta title="Controles" />
      {idhogar && miembros?.length ? (
        <GenericForm
          name="test"
          applyButton={false}
          controls={controls()}
          title="Acceso a programas de protección social y cuidados"
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          nextButton={{ text: "Siguiente", action: siguiente, }}
          prevButton={{ text: "Anterior", action: anterior }}
          nextDisabledFunction={() => {
            return miembros?.length != checked?.split?.(",")?.length;
          }}
          notifyValidation={notifyValidation}
          idForEdit={id}
          saveButton="Guardar"
          setIdFunction={setid}
          submitFunction={submitAccesoProgramas}
          getByIdFunction={(id) => obtenerMiembroPorBeneficios(id)}
        />
      ) : (
        <Typography variant="h6" p={2}>
          {idhogar
            ? " No existen miembros en el hogar seleccionado"
            : "No existe un hogar seleccionado"}
        </Typography>
      )}
    </>
  );
}

export default AccesoProgramasProteccionSocialCuidados;
