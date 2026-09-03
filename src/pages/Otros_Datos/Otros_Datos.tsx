import {
  CreateOrModify,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { Divider } from "@mui/material";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import Typography from "@mui/material/Typography";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";

async function obtenerOrganismo() {
  const grupos = await (datico as any)["nom_concepto"]
    .where("idpadre")
    .equals("9598")
    .toArray();
  return grupos ?? [];
}

export async function tieneDatos(arr: any) {
  const result = await Promise.all(
    arr.map(async (obj: any) => {
      const uso = await datico.dat_miembroestrategias
        .where({ idcodigohogar: obj.idconcepto.toString() })
        .count();
      if (uso > 0) {
        return obj.idconcepto;
      } else {
        return 0;
      }
    })
  );
  const _result = result.filter((item) => item != 0);
  return _result.toString();
}

function Otros_Datos() {
  const idhogar = getHogar() ?? 0;
  const notificar = NotificationProvider();
  // const [miembros, setMiembros] = useState<any>([]);
  // const [idmiembrohogar, setIdMiembroHogar] = useState<any>(0);
  const [estrategias, setEstrategias] = useState<any[]>([]);
  const [estrategiasSelected, setEstrategiasSelected] = useState<any[]>([]);
  const [ayudaeconomica, setAyudaEconomica] = useState(false);
  const [apoyoLabores, setApoyoLabores] = useState(false);
  // const [checkDatos, checkSetDatos] = useState<any>([]);
  // const [configuracionOrganismo, setConfiguracionOrganismo] = useState({});

  const acceptDisabledFunction = (values?: any): boolean => {
    const estrategias = values?.idestrategia;
    const apoyoEconomico = values?.ayudaprobleconomico;
    const apoyoLabores = values?.apoyolaboresd;
  
    const tieneEstrategias = Array.isArray(estrategias) && estrategias.length > 0;
    const tieneRedesApoyo = Boolean(apoyoEconomico || apoyoLabores);
  
    return !(tieneEstrategias || tieneRedesApoyo);
  };

  useEffect(() => {
    obtenerDatosNom().then((estrategias) => setEstrategias(estrategias));
  }, []);

  const obtenerDatosMiembros = async (id: string) => {
    const estrategia = await obtenerDatosPorLlave(
      "dat_miembroestrategias",
      "idcodigohogar",
      id
    );
    const miembroHogar = await obtenerDatosPorLlave(
      "dat_hogar",
      "idcodigohogar",
      parseInt(id)
    );

    setEstrategiasSelected(estrategia?.[0]?.idestrategia ?? []);
    setAyudaEconomica(
      typeof miembroHogar?.[0]?.ayudaprobleconomico === "boolean"
        ? Boolean(miembroHogar?.[0]?.ayudaprobleconomico)
        : false
    );
    setApoyoLabores(
      typeof miembroHogar?.[0]?.apoyolaboresd === "boolean"
        ? Boolean(miembroHogar?.[0]?.apoyolaboresd)
        : false
    );
    return {
      idcodigohogar: [id.toString()],
      idestrategia: estrategia?.[0]?.idestrategia ?? [],
      apoyolaboresd:
        typeof miembroHogar?.[0]?.apoyolaboresd === "boolean"
          ? Boolean(miembroHogar?.[0]?.apoyolaboresd)
          : true,
      ayudaprobleconomico:
        typeof miembroHogar?.[0]?.ayudaprobleconomico === "boolean"
          ? Boolean(miembroHogar?.[0]?.ayudaprobleconomico)
          : true,
    };
  };

  const controles = useCallback((): IGenericControls[] => {
    return [
      {
        type: "component",
        component: () => (
          <Typography mt={3}>
            <b>Estrategias de solución de problemas que afectan al hogar</b>
          </Typography>
        ),
        label: "",
        name: "",

        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
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
        component: () => (
          <Typography marginTop={2}>
            Marca la(s) estrategia(s) que utiliza(n) para darle solución a los
            problemas que afectan al hogar.
          </Typography>
        ),
        label: "",
        name: "",

        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: ({ name, setFieldValue }: any) => (
          <TableView
            values={estrategias}
            defaultRowsPerPage={50}
            headers={[{ name: "denominacion", label: "Estrategias" }]}
            idKey="idconcepto"
            setFieldValue={setFieldValue}
            useCheckBox={true}
            multiSelect={true}
            defaultValues={estrategiasSelected}
            hideTableHead={true}
            name={name}
          />
        ),
        label: "",
        name: "idestrategia",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: () => (
          <Typography>
            <b>Nota aclaratoria:</b> Preguntar si en los últimos 6 meses, se
            vió en la necesidad de hacer alguna de estas activiadades debido a
            que no había suficiente dinero para comprar alimentos o satisfacer
            otras necesidades básicas.
          </Typography>
        ),
        label: "",
        name: "",

        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: () => (
          <Typography mt={3}>
            <b>Redes de apoyo del hogar</b>
          </Typography>
        ),
        label: "",
        name: "",

        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
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
        component: () => (
          <Typography>
            Tiene a quien pedir ayuda ( a un familiar y/o amigo fuera del hogar)
          </Typography>
        ),
        label: "",
        name: "",

        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "check",
        label:
          "Si alguien en el hogar requiere apoyo con labores domésticas y de cuidado, por enfermedades u otra razón",
        name: "apoyolaboresd",
        defaultValue: apoyoLabores,
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "check",
        label: "Ante un problema económico",
        name: "ayudaprobleconomico",
        defaultValue: ayudaeconomica,
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
    ];
  }, [obtenerDatosMiembros, ayudaeconomica,apoyoLabores]);

  // useLiveQuery(async () => {
  //   const data = await obtenerMiembros();
  //   setMiembros(data);
  //   // const usito = await tieneDatos(data);
  //   // checkSetDatos(usito);
  // });

  async function obtenerDatosNom() {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9556")
      .toArray();
    return prueba ?? [];
  }

  const navegar = useNavigate();
  const siguiente = () => navegar("/estrategia/programas_situacion_social");
  const anterior = () => navegar("/estrategia/alimentos");

  return (
    <>
      <Meta title="Controles" />
      {idhogar ? (
        <GenericForm
          name="test"
          controls={controles()}
          title="Estrategias de solución de problemas y redes de apoyo"
          endpointPath="persona"
          showSpecificDescription={false}
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          idForEdit={idhogar}         
          setIdFunction={getHogar}
          submitFunction={(values: any) => {
            const { idestrategia, ayudaprobleconomico, apoyolaboresd } = values;
            CreateOrModify(
              "dat_miembroestrategias",
              {
                idcodigohogar: idhogar,
              },
              {
                idcodigohogar: idhogar,
                idestrategia,
              },
              "idmiembroestrategia"
            );

            CreateOrModify(
              "dat_hogar",
              { idcodigohogar: Number(idhogar) },
              {
                idcodigohogar: Number(idhogar),
                ayudaprobleconomico,
                apoyolaboresd,
              },
              "idcodigohogar"
            );
            notificar({
              type: "success",
              title: "Los datos se han adicionado satisfactoriamente.",
              content: "",
            });
          }}
          getByIdFunction={obtenerDatosMiembros}
          applyButton={false}
          saveButton="Guardar"
          acceptDisabledFunction={acceptDisabledFunction}
        />
      ) : (
        <Typography variant="h6" p={2}>
          <b>No existe un hogar seleccionado</b>
        </Typography>
      )}
    </>
  );
}

export default Otros_Datos;
