import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import {
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

import GenericForm from "../genforms/components/form-components/form.generic";
import { FilePresent, HelpCenter, RemoveRedEye } from "@mui/icons-material";
import { actions } from "@/app/SpeedDialogConfig";
import { getHogar } from "@/app/hogarController/hogar.controller";
import useModalState from "../hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { calcularEdadByCi, unionNomenclador } from "@/pages/NucleoInfo/utils";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { tieneIngresos } from "@/pages/Ingresos/Ingresos";
import { tieneOcupacion } from "@/pages/Ocupacion/utils";
import { tieneDiscapacidad } from "@/pages/AutonomiayNecesidadesEspeciales/helpers";
import { miembrosConEnfermedades } from "@/pages/Enfermedades/utils";
import {
  obtenerMiembroPorEncuesta,
  tieneUso,
} from "@/pages/UsoServiciosSalud/helpers";
import { obtenerLocalesViviendas } from "@/pages/LocalesVivienda/helpers";
import { obtenerServiciosVivienda } from "@/pages/ServiciosVivienda/helpers";
import { IGenericControls } from "../genforms/types/controls/controls.types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { finalizarHogar } from "./utils";
import { useConfirm } from "material-ui-confirm";

export default function BasicSpeedDial({
  modalName = "estadoEntrevista",
}: {
  modalName?: string;
}) {
  const confirm = useConfirm();

  const [open, setOpen] = useState<boolean>();
  const { modalState, modalActions } = useModalState();
  const [home, setHome] = useState<any>();
  const [errorsCheck, setErrors] = useState<string[]>([]);
  const [idhogar] = useLocalStorage("hogarActual");
  const [estadoDeLaCaracterizacion, setEstadoDeLaCaracterizacion] =
    useState<any>();
  const navegar = useNavigate();
  const siguiente = () => {
    modalActions.open("estadoEntrevista");
  };
  const anterior = () => navegar("/estrategia/otros");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const obtenerObservaciones = async (id: any) => {
    const observ = await obtenerDatosPorLlave(
      "dat_hogar",
      "idcodigohogar",
      parseInt(id)
    );
    return observ[0];
  };
  const addError = (errorList: string[], check: boolean, error: string) => {
    if (!check) {
      errorList.push(error);
    }
  };
  const checkCaracterizacion = async () => {
    try {
      const idHogar = getHogar();
      let errors: string[] = [];
      if (idHogar) {
        //#region Consultas generales
        const miembros: any = await datico.dat_miembrohogar
          .where({ idcodigohogar: idHogar })
          .toArray();
        const allMiembros = await obtenerMiembros();
        const miembrosMayoresDeQuince = allMiembros.filter(
          (item) => item.edad > 15
        );
        const mimbrosNombresUnidos = miembros.map((obj: any) => {
          const nombreyapellidos = `${obj.pnombre} ${obj.papellido} `;
          return {
            ...obj,
            nombreyapellidos: nombreyapellidos,
            jefehogar: "",
          };
        });
        let miembrosNomenclados = await unionNomenclador(mimbrosNombresUnidos);
        miembrosNomenclados.sort(
          (a, b) => parseInt(a.idparentesco[0]) - parseInt(b.idparentesco[0])
        );
        miembrosNomenclados = miembrosNomenclados.map((obj) => {
          let registroconsumidor: any = "";
          const edad = calcularEdadByCi(obj.cidentidad);
          return {
            ...obj,
            registroconsumidor: registroconsumidor,
            edad: edad == 0 ? "M" : edad,
          };
        });
        const miembrosParentezcoNomenclado = miembrosNomenclados.map(
          (miembro: any) => {
            return {
              ...miembro,
              parentesco:
                miembro.parentesco === "Jefe(a) de hogar"
                  ? "JH"
                  : miembro.parentesco,
            };
          }
        );

        //#endregion

        //#region NucleoInfo - Existe Jefe de nucleo
        const personasFiltradas = miembrosParentezcoNomenclado.filter(
          (item: any) => item.parentesco === "JH"
        );
        const nucleoInfo = !!personasFiltradas?.length;
        addError(errors, nucleoInfo, "Debe existir un jefe de núcleo.");
        //#endregion

        //#region Ingresos - Todos los mayores de 15 años tienen ingresos
        const miembrosMayoresDeQuinceConIngresos = await tieneIngresos(
          miembrosMayoresDeQuince
        );

        const ingresos =
          miembrosMayoresDeQuince?.length ==
          miembrosMayoresDeQuinceConIngresos?.length &&
          miembrosMayoresDeQuince.length > 0;

        //#endregion

        //#region Ocupación - Todos los mimebros
        const miembrosMayoresDeQuinceConOcupacion = await tieneOcupacion(
          miembrosMayoresDeQuince
        );

        const ocupacion =
          miembrosMayoresDeQuinceConOcupacion.length ==
          miembrosMayoresDeQuince.length &&
          miembrosMayoresDeQuince.length > 0;
        addError(
          errors,
          ocupacion,
          "Los miembros mayores 15 deben tener alguna ocupación."
        );

        //#endregion

        //#region Autonomia - Todos los mimebros tinen datos en autonomia
        const miembrosConDiscapacidad = await tieneDiscapacidad(allMiembros);
        const cantidadDeMiembrosConDiscapacidad =
          miembrosConDiscapacidad.includes(",")
            ? miembrosConDiscapacidad?.split?.(",")?.length
            : miembrosConDiscapacidad.length > 0
              ? 1
              : 0;
        const autonomia =
          miembros?.length == cantidadDeMiembrosConDiscapacidad &&
          miembros.length > 0;
        addError(
          errors,
          autonomia,
          "Debe declarar el nivel de autonomia de todos los miembros."
        );

        //#endregion

        //#region Enfermedades - Todos los mimebros tinen datos en enfermedades
        const miembrosConEnfermedadesCronicas =
          await miembrosConEnfermedades(allMiembros);
        const miembrosConEnfermedadesCronicasNormalizado =
          miembrosConEnfermedadesCronicas.filter((item) => !!item).join(",");
        const miembrosConEnfermedadesLength =
          miembrosConEnfermedadesCronicasNormalizado.includes(",")
            ? miembrosConEnfermedadesCronicasNormalizado?.split?.(",")?.length
            : miembrosConEnfermedadesCronicasNormalizado.length > 0
              ? 1
              : 0;
        const enfermedades =
          miembros?.length == miembrosConEnfermedadesLength &&
          miembros?.length > 0;
        addError(
          errors,
          nucleoInfo,
          "Debe clarar en todos los miembros si padecen enfermedades o no."
        );

        //#endregion

        //#region UsoServiciosSalud - Todos los mimebros tinen datos en Uso de servicios
        // const miebrosServiciosSalud = await obtenerMiembroPorEncuesta(
        //   idHogar ?? ""
        // );
        // const usoServicios = await tieneUso(allMiembros);

        // const verificarUso = (
        //   miebrosServiciosSalud: any,
        //   usoServicios: any
        // ) => {
        //   if (miebrosServiciosSalud?.problemasalud?.length) {
        //     return false;
        //   }
        //   const miembrosCheck = usoServicios.includes(",")
        //     ? usoServicios?.split?.(",")?.length
        //     : usoServicios.length > 0
        //       ? 1
        //       : 0;
        //   if (miembros?.length == miembrosCheck) {
        //     return false;
        //   }
        //   return true;
        // };
        const problemasDeSaludEnElHogar = await obtenerDatosPorLlave(
          "dat_hogar",
          "idcodigohogar",
          parseInt(getHogar() ?? "")
        );

        const usoServiciosSalud =
          !!problemasDeSaludEnElHogar?.[0]?.problemasalud?.length;
        addError(
          errors,
          usoServiciosSalud,
          "Debe declarar si algun miembro ha tenido problemas de salud."
        );

        //#endregion

        //#region Acceso a programas - Todos los mimebros tinen datos en Acceso a programas

        const obtenerAccesoAProgramas = async (miembros: any) => {
          //logica
          //resultado
          const result = await Promise.all(
            miembros.map(async (obj: any) => {
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
          return _result;
        };

        const accedenAProgramas = await obtenerAccesoAProgramas(allMiembros);
        const accesoAProgramas =
          miembros?.length == accedenAProgramas.length && miembros?.length > 0;

        const menoresDe16EnHogarActual = miembros.filter(
          (item: any) => item.edad < 16
        );

        const situacionNNAHpgarActual = await Promise.all(
          menoresDe16EnHogarActual.map(async (obj: any) => {
            const dato = await datico.dat_situacnnaj
              .where({ idmiembrohogar: [obj.idmiembrohogar.toString()] })
              .toArray();
            return !!dato.length ? obj : null;
          })
        );
        const situacionNNAHpgarActualFiltrado =
          situacionNNAHpgarActual.filter(Boolean);
        const situacionNNA =
          menoresDe16EnHogarActual.length ===
          situacionNNAHpgarActualFiltrado.length;

        //  //#region Situacion de Niños y Niñas - Todos los niños tienen datos

        //  const situacionNNA = async (miembros: any) => {
        //   //logica
        //   //resultado
        //   const result = await Promise.all(
        //     miembros.map(async (obj: any) => {
        //       const uso = await datico.dat_situacnnaj
        //         .where({ idmiembrohogar: obj.idconcepto.toString() })
        //         .count();
        //       return uso > 0 ? obj.idconcepto : null;
        //     })
        //   );

        //   return result.filter(Boolean);
        // };

        // (async () => {
        //   if (allMiembros) {
        //     const situacionNna = await situacionNNA(allMiembros);
        //     const situacionnNa =
        //       allMiembros.length === situacionNna.length && allMiembros.length > 0;
        //   }
        // })();

        //#endregion
        //#region Materiales Predominantes
        const estadoConstruccion: any = await obtenerDatosPorLlave(
          "dat_estadoconstvivienda",
          "idcodigohogar",
          idHogar
        );
        const materialesPredomiantes = !!estadoConstruccion?.length;
        addError(
          errors,
          materialesPredomiantes,
          "Debe declarar los materiales que predominan en la vivienda."
        );

        //#endregion

        //#region Afectaciones de la vivienda
        const afectacionesDelHogar: any = await obtenerDatosPorLlave(
          "dat_afectacionmatvivienda",
          "idcodigohogar",
          idHogar
        );
        const afectacionesVivienda = !!afectacionesDelHogar?.length;
        addError(
          errors,
          afectacionesVivienda,
          "Debe declarar si tiene o no afectaciones la vivienda."
        );
        console.log({afectacionesVivienda,afectacionesDelHogar});

        //#endregion

        //#region Locales de la vivienda
        const localesInfo: any = await obtenerLocalesViviendas(idHogar);
        const localesDeLaVivienda = !!localesInfo?.cantudormir;
        addError(
          errors,
          localesDeLaVivienda,
          "Debe declarar los locales de la vivienda ."
        );

        //#endregion

        //#region Servicios de la vivienda
        const servicios: any = await obtenerServiciosVivienda(idHogar);
        const serviciosVivienda = !!servicios?.iddesague?.length;
        addError(
          errors,
          serviciosVivienda,
          "Debe declarar los servicios con los que cuenta la vivienda."
        );

        //#endregion

        //#region Mobiliario de la vivienda
        // const mobiliario: any = await obtenerDatosPorLlave(
        //   "dat_hogarmobiliarioequipos",
        //   "idcodigohogar",
        //   idHogar
        // );
        // const mobiliarioBasico = !!mobiliario?.length;
        // addError(
        //   errors,
        //   mobiliarioBasico,
        //   "Debe declarar los mobiliarios con los que cuenta la vivienda."
        // );

        //#endregion

        //#region Seguridad Alimentaria de la vivienda
        const alimentos: any = await obtenerDatosPorLlave(
          "dat_hogardiversidadalimentaria",
          "idcodigohogar",
          idHogar
        );
        const seguridadAlimentaria = !!alimentos?.length;
        addError(
          errors,
          seguridadAlimentaria,
          "Debe especificar los datos respectivos a la alimentación."
        );

        //#endregion

        //#region Estrategia del hogar
        // const estrategias: any = await obtenerDatosPorLlave(
        //   "dat_miembroestrategias",
        //   "idcodigohogar",
        //   idHogar
        // );

        // const estrategiaDelHogar = !!estrategias?.length;
        // addError(
        //   errors,
        //   estrategiaDelHogar,
        //   "Debe declarar las estrategias del hogar."
        // );

        //#endregion

        //#region Programa alimenttario y Situación social
        // const datosSituacionSocial = await tieneDatos(allMiembros);
        // const checkSituacionSocial = datosSituacionSocial.includes(",")
        //   ? datosSituacionSocial?.split?.(",")?.length
        //   : datosSituacionSocial.length > 0
        //     ? 1
        //     : 0;
        // const situacionSocial =
        //   allMiembros?.length == checkSituacionSocial &&
        //   allMiembros?.length > 0;
        // console.log("allMiembros", checkSituacionSocial);
        // addError(
        //   errors,
        //   situacionSocial,
        //   "Debe especificar la situacion social de cada miembro."
        // );

        //#endregion

        //#region GastosHogar
        const gastos: any = await obtenerDatosPorLlave(
          "dat_hogargastos",
          "idcodigohogar",
          idHogar
        );
        const gastosHogar = !!gastos?.length;
        addError(errors, gastosHogar, "Debe especificar los gastos del hogar.");

        //#endregion

        //#region GastosHogar
        const entrevista: any = await obtenerDatosPorLlave(
          "dat_caracterizacion",
          "idcodigohogar",
          idHogar
        );
        const datosEntrevista = !!entrevista?.length;
        addError(
          errors,
          datosEntrevista,
          "Debe llenar los datos correspondientes a la entrevista."
        );

        //#endregion
        const _estadoDeLaCaracterizacion = {
          nucleoInfo,
          ingresos,
          ocupacion,
          autonomia,
          enfermedades,
          usoServiciosSalud,
          accesoAProgramas,
          situacionNNA,
          materialesPredomiantes,
          localesDeLaVivienda,
          serviciosVivienda,
          afectacionesVivienda,
          // mobiliarioBasico,
          seguridadAlimentaria,
          // estrategiaDelHogar,
          //situacionSocial,
          gastosHogar,
          datosEntrevista,
          menoresDe16EnHogarActual,
        };
        setEstadoDeLaCaracterizacion(_estadoDeLaCaracterizacion);
        setErrors(errors);
        return _estadoDeLaCaracterizacion
      }
    } catch (error: any) {
      console.log("error estadoDeLaCaracterizacion", error);
    }
  };
  const notifyValidation = useCallback(async () => {
    const confirmations = [
      // {
      //   question: "¿Está seguro que completó la información del módulo Afectaciones que presenta la vivienda?",
      //   path: "/servicios-equipamientos/afectaciones"
      // },
      {
        question: "¿Está seguro que completó la información del módulo Vehículos de que dispone el hogar?",
        path: "/servicios-equipamientos/vehiculos"
      },
      {
        question: "¿Está seguro que completó la información del módulo Mobiliario básico y equipos funcionando?",
        path: "/servicios-equipamientos/mobiliario"
      }, {
        question: "¿Está seguro que completó la información del módulo Estrategias de solución de problemas y redes de apoyo?",
        path: "/estrategia/otros"
      }, {
        question: "¿Está seguro que completó la información del módulo Programas alimentarios y situación social?",
        path: "/estrategia/programas_situacion_social"
      }
    ];

    for (const confirmation of confirmations) {
      try {
        await confirm({
          title: "Finalizar",
          confirmationText: "Si",
          cancellationText: "No",
          description: confirmation.question,
        });
      } catch {
        navegar(confirmation.path);
        return; // Salimos de la función si el usuario selecciona "No"
      }
    }
    const estadoCaracterizacion = await checkCaracterizacion()
    // Solo llegamos aquí si el usuario respondió "Si" a todas las confirmaciones
    if (Object.values(estadoCaracterizacion ?? {}).some(item => item === false)) {
      return "Los valores no deben marcarse manualmente";
    }
  }, [confirm, navegar]);

  useLiveQuery(async () => {
    await checkCaracterizacion();
  });

  const estadoEntrevistaControls = useCallback((): IGenericControls[] => {
    const checks = [
      {
        idconcepto: "nucleoInfo",
        denominacion: "Información general de los miembros del hogar",
        path: "/nucleo-info",
      },
      {
        idconcepto: "ingresos",
        denominacion: "Ingresos",
        path: "/ingresos",
      },
      {
        idconcepto: "ocupacion",
        denominacion: "Ocupación",
        path: "/principal",
      },

      {
        idconcepto: "autonomia",
        denominacion: "Grado de autonomía y situación de discapacidad",
        path: "/autonomia/discapacidad",
      },
      {
        idconcepto: "enfermedades",
        denominacion: "Enfermedades",
        path: "/autonomia/enfermedades",
      },
      {
        idconcepto: "usoServiciosSalud",
        denominacion: "Usos de servicios de salud",
        path: "/autonomia/servicios",
      },
      {
        idconcepto: "accesoAProgramas",
        denominacion: "Acceso a programas de proteccion social y cuidados",
        path: "/proteccion",
      },
      {
        idconcepto: "situacionNNA",
        denominacion: "Situación de niños, niñas y adolescentes",
        hidden: !estadoDeLaCaracterizacion?.menoresDe16EnHogarActual.length,
        path: "/adolecentes",
      },
      {
        idconcepto: "afectacionesVivienda",
        denominacion: "Afectaciones que presenta la vivienda",
        path: "/servicios-equipamientos/afectaciones",
      },
      {
        idconcepto: "materialesPredomiantes",
        denominacion: "Materiales predominantes de la vivienda",
        path: "/servicios-equipamientos/materiales",
      },
      {
        idconcepto: "localesDeLaVivienda",
        denominacion: "Locales de la vivienda",
        path: "/servicios-equipamientos/locales",
      },
      {
        idconcepto: "serviciosVivienda",
        denominacion: "Servicios de la vivienda",
        path: "/servicios-equipamientos/servicios",
      },
      // {
      //   idconcepto: "mobiliarioBasico",
      //   denominacion: "Mobiliario básico y equipos funcionando",
      //   path: "/servicios-equipamientos/mobiliario",
      // },
      {
        idconcepto: "seguridadAlimentaria",
        denominacion:
          "Grupos de alimentos y estrategias de afrontamiento en el hogar",
        path: "/estrategia/alimentos",
      },

      // {
      //   idconcepto: "estrategiaDelHogar",
      //   denominacion: "Estrategias de solución de problemas, redes de apoyo",
      //   path: "/estrategia/otros",
      // },
      // {
      //   idconcepto: "situacionSocial",
      //   denominacion:
      //     "Programas alimentarios y Situación social",
      //   path: "/estrategia/programas_situacion_social",

      // },
      {
        idconcepto: "gastosHogar",
        denominacion: "Gastos mensuales del hogar",
        path: "/estrategia/gastos",
      },
      {
        idconcepto: "datosEntrevista",
        denominacion: "Datos de la entrevista",
        path: "/datos",
      },
    ].map((item): IGenericControls => {
      return {
        type: "check",
        label: item.denominacion,
        name: item.idconcepto,
        defaultValue: estadoDeLaCaracterizacion?.[item.idconcepto],
        labelPlacement: "end",
        hidden: () => (item?.hidden ? true : false),
        onChange: () => {
          navegar(item.path);
        },
      };
    });
    const errors: IGenericControls[] = errorsCheck?.map(
      (item): IGenericControls => {
        return {
          type: "component",
          component: () => <Typography>{item}</Typography>,
          label: "",
          name: "",
          gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        };
      }
    );
    return [
      ...checks,
      {
        type: "component",
        component: () => <Typography variant="h5">Revisar:</Typography>,
        label: "",
        name: "",
        hidden: () => !errors.length,
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      ...errors,
    ];
  }, [estadoDeLaCaracterizacion, errorsCheck, modalState]);

  useEffect(() => {
    checkCaracterizacion();
  }, [idhogar]);
  return (
    actions.length && (
      <Box
        sx={{
          height: 320,
          flexGrow: 1,
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 99999,
        }}
      >
        <GenericForm
          name="caracter"
          modalType="fullWith"
          controls={[
            {
              type: "text",
              label: "Observaciones E/R y del trabajador social a cargo",
              name: "observaciones",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              multiline: { minRows: 6 },
            },
          ]}
          title="Observaciones "
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={home}
          saveButton="Guardar"
          submitFunction={(values) => {
            home &&
              modificar(
                "dat_hogar",
                "idcodigohogar",
                parseInt(home),
                values
              ).then(() => setHome(undefined));
          }}
          getByIdFunction={obtenerObservaciones}
          applyButton={false}
        />
        <SpeedDial
          ariaLabel={"speedDial"}
          sx={{ position: "absolute", bottom: 5, right: 5 }}
          onClose={handleClose}
          onOpen={handleOpen}
          icon={<SpeedDialIcon />}
          open={open}
        >
          {[
            {
              icon: HelpCenter,
              name: "Ayuda",
              action: () => {
                navegar("/ayuda");
              },
            },
            {
              icon: RemoveRedEye,
              name: "Observaciones",
              action: () => {
                setHome(getHogar());
                modalActions.open("caracter");
              },
            },
            {
              icon: FilePresent,
              name: "Estado de la caracterización",
              action: async () => {
                await checkCaracterizacion();
              },
              modal: modalName,
            },
            ,
          ].map((action: any) => (
            <SpeedDialAction
              key={action.name}
              icon={<action.icon />}
              onClick={async () => {
                await action.action();
                handleClose();
                if (action.modal) {
                  modalActions.open(action.modal);
                }
              }}
              tooltipTitle={action.name}
              tooltipOpen
            />
          ))}
        </SpeedDial>
        <GenericForm
          name={modalName}
          controls={estadoEntrevistaControls()}
          title="Finalizar caracterización"
          description=""
          endpointPath="persona"
          acceptDisabledFunction={(values) => {
            return !!Object.values(values).filter((item) => item === false)
              .length;
          }}
          notifyValidation={notifyValidation}
          submitFunction={() => {
            finalizarHogar();
            navegar("/datos-hogar");
            localStorage.removeItem("hogarActual")
            localStorage.removeItem("hogarActualDireccion")
            localStorage.removeItem("hogarActualJefe")
          }}
          showSpecificDescription={false}
          applyButton={false}
          modalType="fullWith"
        />
      </Box>
    )
  );
}
