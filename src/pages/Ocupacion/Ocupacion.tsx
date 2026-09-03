import { useCallback, useEffect, useState } from "react";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { Typography } from "@mui/material";
import {
  crear,
  deleteRowsIfExist,
} from "@/app/user-interfaces/forms/models/controllers";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useNavigate } from "react-router-dom";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import { tieneOcupacion } from "./utils";

function Ocupacion() {
  const notificar = NotificationProvider();
  const idhogar = getHogar() ?? 0;
  const navegar = useNavigate();
  const siguiente = () => navegar("/ingresos");
  const anterior = () => navegar("/nucleo-info");

  const [id, setid] = useState<any>(null);
  const [miembrosListosParaOcupacion, setMiembrosListosParaOcupacion] =
    useState<any>([]);
  const [todosMiembrosHogar, setTodostodosMiembrosHogar] = useState<any>([]);
  const [motivos, setMotivos] = useState<any>([]);
  const [listo, setListo] = useState(false);
  const [checkocupaciones, checkSetOcupaciones] = useState<any>([]);

  useEffect(() => {
    filterConcepts(miembrosListosParaOcupacion);
    filterConcepts(todosMiembrosHogar);
  }, [miembrosListosParaOcupacion, todosMiembrosHogar]);

  const filterConcepts = async (miembrosListosParaOcupacion: any) => {
    const concepts = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("869333")
      .toArray();
    if (miembrosListosParaOcupacion.length === 1) {
      setMotivos(concepts.filter((item: any) => item.idconcepto !== 869341));
    } else {
      setMotivos(concepts);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await obtenerMiembros();
    const miembros = data?.filter((item) => item.edad > 15);
    setMiembrosListosParaOcupacion(miembros);
    setTodostodosMiembrosHogar(data);
    const checkocupacion = await tieneOcupacion(miembros);
    checkSetOcupaciones(checkocupacion);
    setListo(miembros.length > 0);
  };

  const getControls = useCallback((): IGenericControls[] => {
    return [
      {
        type: "select",
        name: "idmiembrohogar",
        label: "Miembro del hogar",
        validations: {
          required: {
            message: "Este campo es obligatorio",
          },
        },
        gridValues: { xs: 12, lg: 8, md: 8, sm: 8, xl: 8 },
        onChange: (e: any) => {
          setid(e.target.value);
        },
        options: miembrosListosParaOcupacion,
        checkValues: checkocupaciones,
      },
      {
        type: "component",
        component: () => (
          <Typography>
            Se pregunta sí durante la semana anterior a este momento, el miembro
            del hogar ¿Realizó algún trabajo, por el cual recibió ingresos,
            salario, pago o beneficio en dinero o en especie?.
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        // hidden: (values: any) => values.idmiembrohogar == "",
      },

      {
        type: "radio",
        label: "",
        name: "idocupacion",
        radios: [
          { idconcepto: "1", denominacion: "Sí" },
          { idconcepto: "2", denominacion: "No" },
        ],
        direction: "row",
        onChange: (e: any, form: any) => {
          // Resetear campos dependientes
          form.setFieldValue("idtipotrabajando", []);
          form.setFieldValue("idtiposintrabajar", []);
          form.setFieldValue("motivo", "");
        },
        validations: {
          required: { message: "Debe seleccionar una opción" },
        },
        labelPlacement: "end",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: () => (
          <Typography>
            Marque la que represente su ocupación principal, entendida como aquella a la que le dedica más tiempo.
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        hidden: (value: any) =>
          value.idmiembrohogar == "" || value.idocupacion !== "1",
      },
      {
        type: "select",
        name: "idtipotrabajando",
        label: "Trabajando",
        url: "9328",
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "idocupacion",
              expression: (value: any) => value?.[0] == "1",
            },
          },
        },
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        hidden: (value: any) =>
          value.idmiembrohogar === "" || value.idocupacion !== "1",
      },
      {
        type: "component",
        component: () => (
          <Typography>
            Seleccione de la siguiente lista la opción que resuma 
            mejor el motivo por el cual no realizó ningún trabajo remunerado la semana anterior.
          </Typography>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        hidden: (value: any) =>
          value.idmiembrohogar == "" || value.idocupacion !== "2",
      },
      {
        type: "select",
        name: "idtiposintrabajar",
        label: "Sin Trabajar",
        url: "9329",
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "idocupacion",
              expression: (value: any) => value?.[0] == "2",
            },
          },
        },
        gridValues: { xs: 12, lg: 8, md: 8, sm: 8, xl: 8 },
        hidden: (value: any) =>
          value.idmiembrohogar == "" || value.idocupacion !== "2",
      },
      {
        type: "select",
        name: "motivo",
        label: "Motivos",
        // url: "869333",
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "idtiposintrabajar",
              expression: (value: any) => value && value.includes("869328"),
            },
          },
        },
        options: motivos,
        gridValues: { xs: 12, lg: 8, md: 8, sm: 8, xl: 8 },
        hidden: (value: any) =>
          value.idmiembrohogar == "" ||
          value.idtiposintrabajar != "869328" ||
          value.idocupacion == "1",
      },

      {
        type: "multiselect",
        name: "aquiencuida",
        label: "Selecciona todas las personas que cuida",
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "motivo",
              expression: (value) =>
                value == "869341" && todosMiembrosHogar.length > 1,
            },
          },
        },
        gridValues: { xs: 12, lg: 8, md: 8, sm: 8, xl: 8 },
        options: todosMiembrosHogar?.filter(
          (item: any) => item.idmiembrohogar.toString() !== id?.toString()
        ),
        hidden: (value: any) =>
          value.idmiembrohogar == "" ||
          value.motivo != "869341" ||
          value.idtiposintrabajar != "869328" ||
          value.idocupacion == "1",
      },
    ];
  }, [id, miembrosListosParaOcupacion, motivos, todosMiembrosHogar]);

  const submitMiembroOcupacion = useCallback(async (values: any) => {
   const pastRowsCount =  await deleteRowsIfExist(
      "dat_miembroocupacion",
      { idmiembrohogar: values.idmiembrohogar },
      "idmiembroocupacion"
    );

    const datosGuardar = {
      idocupacion: values.idocupacion,
      idtipotrabajando:
        values.idocupacion === "1" ? values.idtipotrabajando : [],
      idtiposintrabajar:
        values.idocupacion === "2" ? values.idtiposintrabajar : [],
      motivo: values.idocupacion === "2" ? values.motivo : "",
      idmiembrohogar: values.idmiembrohogar,
      idcodigohogar: getHogar(),
      aquiencuida:
        values.idtiposintrabajar?.[0] === "869328" ? values.aquiencuida : [],
    };

    await crear("dat_miembroocupacion", datosGuardar);

    const data = await obtenerMiembros();
    const miembros = data?.filter((item) => item.edad > 15);
    const checkocupacion = await tieneOcupacion(miembros);
    checkSetOcupaciones(checkocupacion);

    notificar({
      type: "success",
      title: `Los datos se han ${
        pastRowsCount > 0 ? "modificado" : "adicionado"
      } satisfactoriamente `,
      content: "",
    });
  },
   []);

  const obtenerMiembroOcupacion = useCallback(async (id: any) => {
    const datos = await datico.dat_miembroocupacion
      .where({ idmiembrohogar: [id.toString()] })
      .toArray();
    let element: any = datos.length
      ? { ...datos[0], editMode: true }
      : {
          idmiembrohogar: [id.toString()],
          idocupacion: "",
          idcodigohogar: "",
          idtipotrabajando: [],
          idtiposintrabajar: [],
          motivo: [],
          aquiencuida: [],
          editMode: false,
        };
    return element;
  }, []);

  return (
    <>
      <Meta title="Controles" />

      {!!idhogar && !!todosMiembrosHogar.length && (
        <GenericForm
          key={id}
          name="tesst"
          applyButton={false}
          controls={getControls()}
          title="Ocupación de los miembros del hogar"
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={id}
          saveButton="Guardar"
          notifyValidation={notificar}
          submitFunction={submitMiembroOcupacion}
          getByIdFunction={obtenerMiembroOcupacion}
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          nextDisabledFunction={() =>
            checkocupaciones.length !== miembrosListosParaOcupacion.length
          }
        />
      )}
      {!idhogar && (
        <Typography variant="h6" p={2}>
          <b>No existe un hogar seleccionado</b>
        </Typography>
      )}
      {!!idhogar && !todosMiembrosHogar.length && (
        <Typography variant="h6" p={2}>
          <b>No existen miembros en el hogar seleccionado</b>
        </Typography>
      )}
    </>
  );
}

export default Ocupacion;
