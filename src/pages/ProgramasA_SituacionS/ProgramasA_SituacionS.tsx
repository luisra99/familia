import {
  CreateOrModify,
  obtenerPrimero,
  obtenerDatosPorLlave,
  obtenerTodos,
} from "@/app/user-interfaces/forms/models/controllers";

import { Divider } from "@mui/material";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import Typography from "@mui/material/Typography";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";

export async function tieneDatos(arr: any) {
  try {
    const result = await Promise.all(
      arr.map(async (obj: any) => {
        const uso = await datico.dat_miebrobeneficioprogalim
          .where({ idmiembrohogar: obj.idconcepto.toString() })
          .count();
        const uso_ = await datico.dat_miembrosituacionsocial
          .where({ idmiembrohogar: obj.idconcepto.toString() })
          .count();
        const uso__ = await datico.dat_situacionsocialorg
          .where({ idmiembrohogar: obj.idconcepto.toString() })
          .count();
        if (uso + uso_ + uso__ > 0) {
          return obj.idconcepto;
        } else {
          return 0;
        }
      })
    );
    const _result = result.filter((item) => item != 0);
    return _result.toString();
  } catch (error) {
    console.info("errorr", error);
  }
}

function programasSsocial() {
  const idhogar = getHogar() ?? 0;
  const notificar = NotificationProvider();
  const [organismos, setOrganismos] = useState<any[]>([]);
  const [miembros, setMiembros] = useState<any>([]);
  const [ocupaciones, setOcupaciones] = useState<any>([]);
  const [idmiembrohogar, setIdMiembroHogar] = useState<any>(0);
  const [estrategias, setEstrategias] = useState<any[]>([]);
  const [estrategiasSelected, setEstrategiasSelected] = useState<any[]>([]);
  const [checkDatos, checkSetDatos] = useState<any>([]);

  const [, setConfiguracionOrganismos] = useState({});

  useEffect(() => {
    obtenerOrganismo().then((grupos) => setOrganismos(grupos));
  }, []);

  useEffect(() => {
    setConfiguracionOrganismos([]);
  }, [idmiembrohogar]);

  const submitProgramaSocial = useCallback(
    async (values: any) => {
      const { idmiembro, idbeneficioprog, idsituacionsocial, organismo } =
        values;
      if (idbeneficioprog) {
        CreateOrModify(
          "dat_miebrobeneficioprogalim",
          {
            idmiembrohogar: idmiembro[0],
            idcodigohogar: idhogar,
          },
          {
            idbeneficioprog,
            idmiembrohogar: idmiembro[0],
            idcodigohogar: idhogar,
          },
          "idmiebrobeneficioprogalim"
        );
      }
      if (idsituacionsocial) {
        CreateOrModify(
          "dat_miembrosituacionsocial",
          {
            idmiembrohogar: idmiembro[0],
          },
          {
            idsituacionsocial,
            idmiembrohogar: idmiembro[0],
            idcodigohogar: idhogar,
          },
          "idiembrosituacionsocial"
        );
      }
      organismo &&
        Object.values(organismo).map((org: any) => {
          CreateOrModify(
            "dat_situacionsocialorg",
            {
              idcodigohogar: getHogar(),
              idorganismo: [org.idorganismo],
              idmiembrohogar,
            },
            {
              idorganismo: [org.idorganismo],
              lotiene: org.lotiene,
              losnecesita: org.losnecesita,
              idcodigohogar: getHogar(),
              idmiembrohogar,
            },
            "idsituacionsocialorg"
          );
        });
      notificar({
        type: "success",
        title: "Los datos se han adicionado satisfactoriamente.",
        content: "",
      });
    },
    [idmiembrohogar]
  );

  async function obtenerDatosMiembros(id: string) {
    const situacionSocial = await obtenerDatosPorLlave(
      "dat_miembrosituacionsocial",
      "idmiembrohogar",
      id
    );
    const beneficios = await obtenerDatosPorLlave(
      "dat_miebrobeneficioprogalim",
      "idmiembrohogar",
      id
    );
    return {
      idmiembro: [id.toString()],
      idbeneficioprog: beneficios?.[0]?.idbeneficioprog ?? [],
      idsituacionsocial:
        situacionSocial?.[0]?.idsituacionsocial?.map((item: any) =>
          item.toString()
        ) ?? [],
    };
  }

  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    setMiembros(data);
    const usito = await tieneDatos(data);
    checkSetDatos(usito);
  });

  async function obtenerOrganismo() {
    const grupos = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9598")
      .toArray();
    return grupos ?? [];
  }

  const navegar = useNavigate();
  const siguiente = () => navegar("/datos");
  const anterior = () => navegar("/estrategia/otros");

  const organismosGetByIdFuntion = useCallback(
    (idconcepto: any, setFieldValue: any) => async (idmiembrohogar: any) => {
      try {
        const _organismos = await obtenerTodos("dat_situacionsocialorg", {
          // idorganismo: idconcepto,
          idmiembrohogar,
        });
        // console.log(_organismos);
        const __organismos = _organismos.filter((e: any) =>
          e.idorganismo.includes(idconcepto)
        );
        const obj = __organismos.length
          ? __organismos[0]
          : { lotiene: [], losnecesita: [] };
        // console.log(obj);
        return obj;
      } catch (error) {
        console.error("Raul", error);
      }
    },
    [idmiembrohogar, organismos]
  );
  const mainControls = useCallback(
    (): IGenericControls[] => [
      {
        type: "select",
        name: "idmiembro",
        label: "Miembro del hogar",
        gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
        options: miembros,
        checkValues: checkDatos,
        validations: {
          required: { message: "Debe seleccionar un miembro" },
        },
        onChange: (e: any, refs: any) => {
          const { value } = e.target;
          setIdMiembroHogar(value);
        },
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
        name: "idbeneficioprog",
        label: "Programas alimentarios",

        url: "9610",

        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: () => (
          <Typography>
            <b>Nota aclaratoria:</b>La información de la situación social no se
            pregunta, se completa a partir de registros oficiales precedentes,
            con apoyo del TS .
          </Typography>
        ),
        label: "",
        name: "",

        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "multiselect",
        name: "idsituacionsocial",
        label: "Situación social",
        url: "9593",

        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: () => (
          <Typography>¿Tiene necesidad de atención especializada?</Typography>
        ),
        label: "",
        name: "",

        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: () => (
          <Typography mt={3}>
            <b>Organismo</b>
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 4, lg: 4, md: 4, sm: 4, xl: 5 },
      },
      {
        type: "component",
        component: () => (
          <Typography mt={3}>
            <b>Lo tiene</b>
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 4, lg: 4, md: 4, sm: 4, xl: 2 },
      },
      {
        type: "component",
        component: () => (
          <Typography mt={3}>
            <b>Lo necesita</b>
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 4, lg: 4, md: 4, sm: 4, xl: 1 },
      },
      {
        type: "component",
        component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: ({ setFieldValue, name, values }: any) =>
          organismos.map((grupo: any) => (
            <GenericForm
              key={grupo.idconcepto}
              sx={{ p: 1 }}
              name="test"
              controls={[
                {
                  type: "component",
                  component: () => (
                    <Typography sx={{ mt: 2 }}>{grupo.denominacion}</Typography>
                  ),
                  label: "",
                  name: "",
                  gridValues: { xs: 5, lg: 5, md: 5, sm: 5, xl: 5 }, // aqui se modifica el espaciado
                },
                {
                  type: "select",
                  label: "lo tiene",
                  name: "lotiene",
                  options: [
                    { idconcepto: "1", denominacion: "Sí" },
                    { idconcepto: "2", denominacion: "No" },
                  ],
                  // validations: {
                  //   required: { message: "este campo es requerido" },
                  // },
                  onChange: (event: any) => {
                    //#region raul
                    //se actualiza una variable con la configuración de los alimentos
                    setConfiguracionOrganismos((prev: any) => {
                      prev[grupo.idconcepto] = {
                        ...prev[grupo.idconcepto],
                        idorganismo: grupo.idconcepto,
                        lotiene: event.target.value,
                        idmiembrohogar,
                      };
                      setFieldValue(name, prev);
                      return prev;
                    });
                    //#endregion
                  },

                  gridValues: { xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
                },
                {
                  type: "select",
                  label: "los necesita",
                  name: "losnecesita",
                  // validations: {
                  //   required: { message: "este campo es requerido" },
                  // },
                  options: [
                    { idconcepto: "1", denominacion: "Sí" },
                    { idconcepto: "2", denominacion: "No" },
                  ],
                  onChange: (event: any) => {
                    //#region raul
                    //se actualiza una variable con la configuración de los alimentos
                    setConfiguracionOrganismos((prev: any) => {
                      prev[grupo.idconcepto] = {
                        ...prev[grupo.idconcepto],
                        idorganismo: grupo.idconcepto,
                        losnecesita: event.target.value,
                        idmiembrohogar,
                        idcodigohogar: getHogar(),
                      };
                      setFieldValue(name, prev);
                      return prev;
                    });
                    //#endregion
                  },

                  gridValues: { xl: 3, lg: 3, md: 3, sm: 3, xs: 3 },
                },
              ]}
              getByIdFunction={organismosGetByIdFuntion(
                grupo.idconcepto,
                setFieldValue
              )}
              endpointPath="/"
              hideButtons={true}
              idForEdit={idmiembrohogar}
            />
          )),
        label: "",
        name: "organismo",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
    ],
    [organismosGetByIdFuntion, organismos, idmiembrohogar, checkDatos, miembros]
  );

  const isAcceptDisabled = useCallback((values?: any) => {
    if (!values) return true;
  
    const tieneBeneficio = Array.isArray(values.idbeneficioprog) && values.idbeneficioprog.length > 0;
    const tieneSituacion = Array.isArray(values.idsituacionsocial) && values.idsituacionsocial.length > 0;
    const tieneOrganismo = values.organismo && Object.values(values.organismo).some((org: any) => {
      return org.lotiene || org.losnecesita;
    });
  
    // Deshabilitar si todos están vacíos
    return !(tieneBeneficio || tieneSituacion || tieneOrganismo);
  }, []);
  

  return (
    <>
      <Meta title="Controles" />
      {idhogar ? (
        miembros.length ? (
          <GenericForm
            name="test"
            controls={mainControls()}
            title="Programas alimentarios y situación social"
            endpointPath="persona"
            showSpecificDescription={false}
            nextButton={{ text: "Siguiente", action: siguiente }}
            prevButton={{ text: "Anterior", action: anterior }}
            // nextDisabledFunction={() => {
            //   const miembrosCheck = checkDatos.includes(",")
            //     ? checkDatos?.split?.(",")?.length
            //     : checkDatos.length > 0
            //       ? 1
            //       : 0;
            //   return miembros?.length !== miembrosCheck;
            // }}
            idForEdit={idmiembrohogar}
            submitFunction={submitProgramaSocial}
            getByIdFunction={obtenerDatosMiembros}
            applyButton={false}
            saveButton="Guardar"
            acceptDisabledFunction={isAcceptDisabled}
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
    </>
  );
}

export default programasSsocial;
