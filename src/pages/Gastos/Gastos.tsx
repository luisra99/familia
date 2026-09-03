import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import { Typography } from "@mui/material";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import useGastos from "./useGastos";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { useEffect } from "react";
import { obtenerDatosPorLlave } from "@/app/user-interfaces/forms/models/controllers";

function Gastos() {
  const hogar = getHogar();
  const [miembros, setMiembros] = useState<any>([]);

  useLiveQuery(async () => {
    const miembros: any = await datico.dat_miembrohogar
      .where({ idcodigohogar: hogar })
      .toArray();
    setMiembros(miembros);
  });
  const [
    controls,
    destinoGastos,
    guardarGastosDelHogar,
    getGastosPorHogar,
    notifyValidation,
    idHogar,
    siguiente,
    anterior,
    setListo,
    listo,
  ] = useGastos();

  const checkListo = async (id: string | number) => {
    const datos: any = await obtenerDatosPorLlave(
      "dat_hogargastos",
      "idcodigohogar",
      id
    );

    setListo(!!datos?.length);
  };

  useEffect(() => {
    if (hogar) {
      checkListo(hogar);
    }
  }, [hogar]);

  return (
    <>
      <Meta title="Gastos" />
      {destinoGastos &&
        (hogar ? (
          <GenericForm
            name="test"
            title="Gastos mensuales del hogar"
            controls={controls}
            endpointPath="persona"
            notifyValidation={notifyValidation}
            submitFunction={guardarGastosDelHogar}
            getByIdFunction={getGastosPorHogar}
            idForEdit={idHogar}
            nextButton={{ text: "Siguiente", action: siguiente }}
            prevButton={{ text: "Anterior", action: anterior }}
            nextDisabledFunction={(values) => !listo}
            saveButton="Guardar"
            applyButton={false}
          />
        ) : (
          <Typography variant="h6" p={2}>
            No existe un hogar seleccionado
          </Typography>
        ))}
    </>
  );
}

export default Gastos;
