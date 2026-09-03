import { Button, Stack, Typography } from "@mui/material";
import {
  calcularEdadByCi,
  cantidadhijos,
  cidentidad,
  datosGeneralesTitle,
  datosmoviles,
  divider,
  embarazada,
  idcolorpiel,
  idorientacionsex,
  idsexo,
  lactando,
  madremenor19,
  nota,
  otrosDatos,
  papellido,
  pnombre,
  registroconsum,
  scanner,
  titleEscolaridad,
  unionNomenclador,
} from "./utils";
import {
  crear,
  descartarMiembro,
  eliminar,
  modificar,
  obtenerPrimero,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { getHogar, setJefeHogar } from "@/app/hogarController/hogar.controller";

import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { atomHogarActualJefe } from "@/_pwa-framework/sections/Sidebar/Sidebar";
import { datico as db } from "@/app/user-interfaces/forms/models/model";
import { useConfirm } from "material-ui-confirm";
import { useLiveQuery } from "dexie-react-hooks";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useCallback, useState } from "react";

function Miembros() {
  const idhogar = getHogar() ?? null;
  // hooks
  const [id, setid] = useState<any>(null);
  const [escolaridad, setEscolaridad] = useState<any>([]);
  const [_nivelescolarninguno, setNivelEscolarNinguno] = useState<any>([]);
  const [_nivelescolarprimaria, setNivelEscolarPrimaria] = useState<any>([]);
  const [_nivelescolarsecundaria, setNivelEscolarSecundaria] = useState<any>(
    []
  );
  const [_nivelescolarobrero, setNivelEscolarObrero] = useState<any>([]);
  const [_nivelescolarpreuniversitario, setNivelEscolarPreuniversitario] =
    useState<any>([]);
  const [_nivelescolarpedagogia, setNivelEscolarPedagogia] = useState<any>([]);
  const [_nivelescolartecnicomedio, setNivelEscolarTecnicomedio] =
    useState<any>([]);
  const [_nivelescolartecnicosuperior, setNivelEscolarTecnicosuperior] =
    useState<any>([]);
  const [_nivelescolaruniversitario, setNivelEscolarUniversitario] =
    useState<any>([]);
  const [miembros, setMiembros] = useState<any[]>([]);
  const [parentesco, setParentesco] = useState<any>([]);
  const [parentescoinit, setParentescoInit] = useState<any>([]);
  const [jefeNucleo, setJefeNucleo] = useState<boolean>(false);
  const [cantidadMiembros, setCantidadMiembros] = useState<boolean>(true);
  const [, setHogarActualJefe] = useRecoilState(atomHogarActualJefe);
  // form
  const disabledButton = useCallback(() => {
    const personasFiltradas = miembros.filter(
      (item: any) => item.parentesco === "JH"
    );
    return !personasFiltradas.length;
  }, [miembros]);

  const formulario = useCallback(
    (): IGenericControls[] => [
      datosGeneralesTitle,
      pnombre,
      papellido,
      cidentidad,
      scanner,
      idcolorpiel,
      nota,
      {
        type: "select",
        label: "Parentesco",
        gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
        name: "idparentesco",
        options: parentesco,
        validations: {
          required: { message: "Este campo es obligatorio" },
        },
      },
      idsexo,
      idorientacionsex,
      divider,
      titleEscolaridad,
      {
        type: "radio",
        label: "¿Cuál es el último nivel vencido?",
        name: "idnivelescolar",
        radios: escolaridad?.escolaridad,
        gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
        onChangeCallback: (e, ref) => {
          const { value } = e.target;
          ref.setFieldValue("idnivelescolargrado", "", false);
          ref.setFieldValue("idgradovencido", "", false);
        },
      },
      {
        type: "radio",
        label:
          "Si tiene un grado superior al nivel vencido marcar nivel y grado",
        name: "idnivelescolargrado",
        persist: true,
        radios: _nivelescolarprimaria,
        gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
        hidden: (values: any) => values.idnivelescolar !== "9697",
      },
      {
        type: "radio",
        label:
          "Si tiene un grado superior al nivel vencido marcar nivel y grado",
        name: "idnivelescolargrado",
        persist: true,
        radios: _nivelescolarsecundaria,
        gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
        hidden: (values: any) => values.idnivelescolar !== "9698",
      },
      {
        type: "radio",
        label:
          "Si tiene un grado superior al nivel vencido marcar nivel y grado",
        name: "idnivelescolargrado",
        persist: true,
        radios: _nivelescolarobrero,
        gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
        hidden: (values: any) => values.idnivelescolar !== "9699",
      },
      {
        type: "radio",
        label:
          "Si tiene un grado superior al nivel vencido marcar nivel y grado",
        name: "idnivelescolargrado",
        persist: true,
        radios: _nivelescolarpreuniversitario,
        gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
        hidden: (values: any) => values.idnivelescolar !== "9700",
      },
      {
        type: "radio",
        label:
          "Si tiene un grado superior al nivel vencido marcar nivel y grado",
        name: "idnivelescolargrado",
        persist: true,
        radios: _nivelescolarpedagogia,
        gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
        hidden: (values: any) => values.idnivelescolar !== "9701",
      },
      {
        type: "radio",
        label:
          "Si tiene un grado superior al nivel vencido marcar nivel y grado",
        name: "idnivelescolargrado",
        persist: true,
        radios: _nivelescolartecnicomedio,
        gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
        hidden: (values: any) => values.idnivelescolar !== "9702",
      },
      {
        type: "radio",
        label:
          "Si tiene un grado superior al nivel vencido marcar nivel y grado",
        name: "idnivelescolargrado",
        persist: true,
        radios: _nivelescolartecnicosuperior,
        gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
        hidden: (values: any) => values.idnivelescolar !== "9704",
      },
      {
        type: "radio",
        label: "Grado escolar vencido",
        name: "idgradovencido",
        persist: true,
        radios: escolaridad?.primaria,
        hidden: (values: any) => values.idnivelescolar !== "9696",
        gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
      },
      {
        type: "radio",
        label: "Grado escolar vencido",
        name: "idgradovencido",
        persist: true,
        radios: escolaridad?.secundaria,
        hidden: (values: any) => values.idnivelescolargrado !== "9698",
        gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
      },
      {
        type: "radio",
        label: "Grado escolar vencido",
        name: "idgradovencido",
        persist: true,
        radios: escolaridad?.obrero,
        hidden: (values: any) => values.idnivelescolargrado !== "9699",
        gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
      },
      {
        type: "radio",
        label: "Grado escolar vencido",
        name: "idgradovencido",
        persist: true,
        radios: escolaridad?.preuniversitario,
        hidden: (values: any) => values.idnivelescolargrado !== "9700",
        gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
      },
      {
        type: "radio",
        label: "Grado escolar vencido",
        name: "idgradovencido",
        persist: true,
        radios: escolaridad?.pedagogia,
        hidden: (values: any) => values.idnivelescolargrado !== "9701",
        gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
      },
      {
        type: "radio",
        label: "Grado escolar vencido",
        name: "idgradovencido",
        persist: true,
        radios: escolaridad?.tecnicomedio,
        hidden: (values: any) => values.idnivelescolargrado !== "9702",
        gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
      },
      {
        type: "radio",
        label: "Grado escolar vencido",
        name: "idgradovencido",
        persist: true,
        radios: escolaridad?.tecnicosuperior,
        hidden: (values: any) => values.idnivelescolargrado !== "9704",
        gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
      },
      {
        type: "radio",
        label: "Grado escolar vencido",
        name: "idgradovencido",
        persist: true,
        radios: escolaridad?.universitario,
        hidden: (values: any) => values.idnivelescolargrado !== "9705",
        gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
      },
      divider,
      otrosDatos,
      datosmoviles,
      registroconsum,
      embarazada,
      lactando,
      madremenor19,
      cantidadhijos,
    ],
    [
      escolaridad,
      _nivelescolarprimaria,
      _nivelescolarsecundaria,
      _nivelescolarobrero,
      _nivelescolarpreuniversitario,
      _nivelescolarpedagogia,
      _nivelescolartecnicomedio,
      _nivelescolartecnicosuperior,
      parentesco,
    ]
  );

  // utils
  const { modalActions } = useModalState();
  const navegar = useNavigate();
  const siguiente = () => navegar("/principal");
  const anterior = () => navegar("/datos-hogar");
  const notificar = NotificationProvider();
  const confirm = useConfirm();

  const submitFunction = useCallback(
    async (values: any) => {
      if (id) {
        const _values = {
          ...values,
          idcodigohogar: idhogar,
          edad: calcularEdadByCi(values.cidentidad),
        };
        modificar("dat_miembrohogar", "idmiembrohogar", id, _values).then(
          async () => {
            const miembros: any = await db.dat_miembrohogar
              .where({ idcodigohogar: idhogar })
              .toArray()
              .then((arr) =>
                arr.map((obj) => {
                  const nombreyapellidos = `${obj.pnombre} ${obj.papellido} `;
                  return {
                    ...obj,
                    nombreyapellidos: nombreyapellidos,
                    jefehogar: "",
                  };
                })
              );
            const indexJefeHogar = miembros.findIndex((obj: any) => {
              return obj?.idparentesco[0] == "9270";
            });
            if (indexJefeHogar != -1) {
              const filter = parentesco.filter(
                (item: any) => item.idconcepto !== 9270
              );
              setParentesco(filter);
            }
            notificar({
              type: "success",
              title:
                "Los datos del miembro del hogar han sido modificados satisfactoriamente.",
              content: "",
            });
          }
        );
      } else {
        // ;
        const _values = {
          ...values,
          idcodigohogar: idhogar,
          edad: calcularEdadByCi(values.cidentidad),
        };
        crear("dat_miembrohogar", _values).then(async () => {
          const miembros: any = await db.dat_miembrohogar
            .where({ idcodigohogar: idhogar })
            .toArray()
            .then((arr) =>
              arr.map((obj) => {
                const nombreyapellidos = `${obj.pnombre} ${obj.papellido} `;
                return {
                  ...obj,
                  nombreyapellidos: nombreyapellidos,
                  jefehogar: "",
                };
              })
            );
          const indexJefeHogar = miembros.findIndex((obj: any) => {
            return obj?.idparentesco[0] == "9270";
          });
          if (indexJefeHogar != -1) {
            const filter = parentesco.filter(
              (item: any) => item.idconcepto !== 9270
            );
            setParentesco(filter);
          }
          notificar({
            type: "success",
            title:
              "El miembro del hogar ha sido adicionado satisfactoriamente.",
          });
        });
      }
    },
    [jefeNucleo, parentesco, idhogar, id]
  );
  const FormularioMeimbro = useCallback(
    () => (
      <GenericForm
        name="formularioMiembro"
        controls={formulario()}
        endpointPath="miembro"
        showSpecificDescription={true}
        idForEdit={id}
        setIdFunction={setid}
        modalType="fullWith"
        createTitle="Adicionar miembro del hogar"
        editTitle="Modificar miembro del hogar"
        submitFunction={submitFunction}
        notifyValidation={async (values: any) => {
          const error = await obtenerPrimero("dat_miembrohogar", {
            cidentidad: values.cidentidad,
          });

          if (
            error &&
            (error.idmiembrohogar !== values.idmiembrohogar)
          ) {
            return "Ya existe una persona registrada con este carnet de identidad.";
          }

          const edad = calcularEdadByCi(values.cidentidad);

          if (
            edad > 6 &&
            (!values.idnivelescolar || values.idnivelescolar.length < 1)
          )
            return "El campo Datos de escolaridad es obligatorio para mayores de 6 años.";
        }}
        getByIdFunction={async (id) => {
          const arr = await obtenerDatosPorLlave(
            "dat_miembrohogar",
            "idmiembrohogar",
            id
          );
          const obj = { ...arr[0], editMode: true };
          return obj;
        }}
      />
    ),
    [formulario, id, submitFunction]
  );
  const mainControls = useCallback(
    (): IGenericControls[] => [
      {
        type: "component",
        component: () => (
          <Stack
            direction="row"
            display={"inline-list-item"}
            justifyContent="flex-start"
            sx={{ width: "100%" }}
          >
            <Button
              onClick={() => {
                if (jefeNucleo) {
                  const filter = parentesco.filter(
                    (item: any) => item.idconcepto !== 9270
                  );
                  setParentesco(filter);
                }
                modalActions.open("formularioMiembro");
              }}
              variant="contained"
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
            values={miembros}
            headers={[
              // { name: "cidentidad", label: "Ci" },
              { name: "nombreyapellidos", label: "Nombre y apellidos" },
              // { name: "jefehogar", label: "Jefe de hogar" },
              {
                name: "parentesco",
                label: "Parentesco",
                align: "center",
              },
              {
                name: "colorpiel",
                label: "Color de la piel",
                align: "center",
              },
              {
                name: "nivelescolar",
                label: "Nivel Escolar",
                align: "center",
              },
              // { name: "gradoscolar", label: "Grado Aprob" },
              { name: "edad", label: "Edad", align: "center" },
              { name: "sexo", label: "Sexo", align: "center" },
              {
                name: "registroconsumidor",
                label: "Reg. Consumidor",
                align: "center",
              },
            ]}
            idKey="idmiembrohogar"
            multiSelect={true}
            rowActions={[
              {
                label: "Modificar",
                action: async (values: any) => {
                  setid(values.idmiembrohogar);
                  if (jefeNucleo && values.idparentesco[0] !== "9270") {
                    const filter = parentesco.filter(
                      (item: any) => item.idconcepto !== 9270
                    );
                    setParentesco(filter);
                  } else {
                    setParentesco(parentescoinit);
                  }
                  modalActions.open("formularioMiembro");
                },
                icon: EditIcon,
              },
              {
                label: "Eliminar",
                action: (values: any) => {
                  confirm({
                    title: "Eliminar",
                    confirmationText: "Aceptar",
                    cancellationText: "Cancelar",
                    description: `¿Está seguro que desea eliminar el miembro del hogar seleccionado?`,
                  }).then(() => {
                    descartarMiembro(values.idmiembrohogar);
                    eliminar(
                      "dat_miembrohogar",
                      "idmiembrohogar",
                      values.idmiembrohogar
                    ).then(() => {
                      notificar({
                        type: "success",
                        title:
                          "El miembro del hogar ha sido eliminado satisfactoriamente.",
                      });
                    });
                  });
                },
                icon: DeleteIcon,
              },
            ]}
            useCheckBox={false}
          />
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
    ],
    [jefeNucleo, parentesco, parentescoinit, miembros]
  );

  useLiveQuery(async () => {
    // // nomencladores
    async function nomenclador(idpadre: string) {
      const data = await db.nom_concepto.where({ idpadre: idpadre }).toArray();
      return data;
    }
    const data: any = {};
    data["escolaridad"] = await nomenclador("9287");
    data["primaria"] = await nomenclador("9697");
    data["secundaria"] = await nomenclador("9698");
    data["obrero"] = await nomenclador("9699");
    data["preuniversitario"] = await nomenclador("9700");
    data["pedagogia"] = await nomenclador("9701");
    data["tecnicomedio"] = await nomenclador("9702");
    data["tecnicosuperior"] = await nomenclador("9704");
    data["universitario"] = await nomenclador("9705");
    setEscolaridad(data);
    const nivelescolarninguno = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9697;
    });
    const nivelescolarprimaria = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9698 || obj.idconcepto == 9699;
    });
    const nivelescolarsecundaria = data.escolaridad.filter((obj: any) => {
      return (
        obj.idconcepto == 9699 ||
        obj.idconcepto == 9700 ||
        obj.idconcepto == 9701 ||
        obj.idconcepto == 9702
      );
    });
    const nivelescolarobrero = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9702 || obj.idconcepto == 9704;
    });
    const nivelescolarpreuniversitario = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9705;
    });
    const nivelescolarpedagogia = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9705;
    });
    const nivelescolartecnicomedio = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9705;
    });
    const nivelescolartecnicosuperior = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9705;
    });
    const nivelescolaruniversitario = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9705;
    });
    setNivelEscolarNinguno(nivelescolarninguno);
    setNivelEscolarPrimaria(nivelescolarprimaria);
    setNivelEscolarSecundaria(nivelescolarsecundaria);
    setNivelEscolarObrero(nivelescolarobrero);
    setNivelEscolarPreuniversitario(nivelescolarpreuniversitario);
    setNivelEscolarPedagogia(nivelescolarpedagogia);
    setNivelEscolarTecnicomedio(nivelescolartecnicomedio);
    setNivelEscolarTecnicosuperior(nivelescolartecnicosuperior);
    setNivelEscolarUniversitario(nivelescolaruniversitario);
    // miembros
    const miembros: any = await db.dat_miembrohogar
      .where({ idcodigohogar: idhogar })
      .toArray()
      .then((arr) =>
        arr.map((obj) => {
          const nombreyapellidos = `${obj.pnombre} ${obj.papellido} `;
          return {
            ...obj,
            nombreyapellidos: nombreyapellidos,
            jefehogar: "",
          };
        })
      );
    let jefeHogar = undefined;
    const indexJefeHogar = miembros.findIndex((obj: any) => {
      return obj?.idparentesco[0] == "9270";
    });
    if (indexJefeHogar != -1) {
      jefeHogar = miembros[indexJefeHogar];
      miembros[indexJefeHogar]["jefehogar"] = (
        <CheckCircleRounded color="primary" />
      );
      setJefeNucleo(true);
    } else {
      setJefeNucleo(false);
    }
    let parentesco = await nomenclador("9269");
    setParentesco(parentesco);
    setParentescoInit(parentesco);
    const jefehogar = jefeHogar
      ? `${jefeHogar.pnombre} ${jefeHogar.papellido}`
      : "";
    setJefeHogar(jefehogar);
    setHogarActualJefe(jefehogar);
    let unionMiembros = await unionNomenclador(miembros);
    unionMiembros.sort(
      (a, b) => parseInt(a.idparentesco[0]) - parseInt(b.idparentesco[0])
    );
    unionMiembros = unionMiembros.map((obj) => {
      let registroconsumidor: any = "";
      if (obj.registroconsum[0] == "1") {
        registroconsumidor = <CheckCircleRounded color="primary" />;
      }
      // carnet de identidad
      // extraer los primeros 6 dígitos
      const edad = calcularEdadByCi(obj.cidentidad);
      return {
        ...obj,
        registroconsumidor: registroconsumidor,
        edad: edad == 0 ? "M" : edad,
      };
    });
    setCantidadMiembros(unionMiembros.length == 0);

    setMiembros(
      unionMiembros.map((miembro) => {
        return {
          ...miembro,
          parentesco:
            miembro.parentesco === "Jefe(a) de hogar"
              ? "JH"
              : miembro.parentesco,
        };
      })
    );
  });

  return (
    <>
      <Meta title="Miembros del hogar" />

      {idhogar ? (
        <GenericForm
          title="Información general de los miembros del hogar"
          name="formularioTable"
          endpointPath=""
          controls={mainControls()}
          hideButtons={true}
        />
      ) : (
        <Typography variant="h6" p={2}>
          <b>No existe un hogar seleccionado</b>
        </Typography>
      )}

      <FormularioMeimbro />

      {idhogar && (
        <Stack
          direction="row"
          mx={"auto"}
          my={2}
          px={3}
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
            disabled={disabledButton()}
          >
            Siguiente
          </Button>
        </Stack>
      )}
    </>
  );
}

export default Miembros;
