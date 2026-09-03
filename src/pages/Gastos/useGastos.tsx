import { AddCircleRounded, Delete } from "@mui/icons-material";
import {
  CreateOrModify,
  modificar,
  obtenerPrimero,
  obtenerDatosPorLlave,
  deleteRowsIfExist,
} from "@/app/user-interfaces/forms/models/controllers";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { headControls, lastControls, mediumControls } from "./utils";
import { useCallback, useEffect, useState } from "react";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";

function useGastos() {
  const navegar = useNavigate();
  const notificar = NotificationProvider();
  const hogar = getHogar();
  const siguiente = () => navegar("/estrategia/alimentos");
  const anterior = () => navegar("/servicios-equipamientos/vehiculos");
  const [gastos, setGastos] = useState([]);
  const [gastosFiltradosSi, setGastosFiltradosSi] = useState([]);
  const [gastosFiltradosNo, setGastosFiltradosNo] = useState([]);
  const [gastoSeleccionado, setGastoSeleccionado] = useState(null);
  const [destinoGastos, setDestinoGastos] = useState<any>({});
  const [listo, setListo] = useState<any>(false);
  const [otrosPrioridad, setOtrosPrioridad] = useState<any>("");
  const [ordenDeLosGastosPrioridad, setOrdenDeLosGastosPrioridad] =
    useState<any>([]);
  const conceptosPredeterminados: number[] = [10149, 10158];

  useLiveQuery(async () => {
    const gastos = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("10148")
      .toArray();

    setGastos(gastos);
    setGastosFiltradosSi(gastos);
    return gastos;
  });

  useEffect(() => {
    async function cargarDatos() {
      if (hogar) {
        const data = await getGastosPorHogar(hogar);
        if (data?.cualOtros) {
          setOtrosPrioridad(data.cualOtros); // 🛠️ Aquí está el arreglo
        }
      }
    }
    cargarDatos();
  }, [hogar]);

  const getGastosPorHogar = async (id: any) => {
    const datHogar = await obtenerDatosPorLlave(
      "dat_hogar",
      "idcodigohogar",
      parseInt(id)
    );
    const gastosHogar = await obtenerDatosPorLlave(
      "dat_hogargastos",
      "idcodigohogar",
      `${id}`
    );
    let gastosObject: any = {};
    let gastosPrioridad: any = [];
    let cualOtros: string = "";
    gastosHogar.forEach((item) => {
      gastosObject[parseInt(item.iddestino)] = { monto: item.montocup };
      if (item.detalles) {
        gastosObject[parseInt(item.iddestino)] = {
          ...gastosObject[parseInt(item.iddestino)],
          detalles: item.detalles,
        };
      }
      if (item.iddestino == "10161") {
        cualOtros = item.detalles;
      }
      if (item.pesogasto) {
        gastosPrioridad[parseInt(item.pesogasto) - 1] = parseInt(
          item.iddestino
        );
      }
    });
    const proporcionGastosAlimentacion = await obtenerPrimero(
      "dat_hogargastos",
      {
        iddestino: "10149",
        idcodigohogar: id,
      }
    );
    const proporcionGastosMedicamento = await obtenerPrimero(
      "dat_hogargastos",
      {
        iddestino: "10158",
        idcodigohogar: id,
      }
    );
    return datHogar[0].idtipogasto
      ? {
          montocup: datHogar[0].idtipogasto,
          proporciongastoalimentacion:
            proporcionGastosAlimentacion?.proporciongasto ?? [],
          proporciongastomedicamento:
            proporcionGastosMedicamento?.proporciongasto ?? [],
          destinoGastos: "",
          prioridad: gastosPrioridad,
          cualOtros,
        }
      : {
          montocup: [],
          proporciongastoalimentacion: [],
          proporciongastomedicamento: [],
          destinoGastos: "",
          prioridad: "",
          cualOtros,
        };
  };

  const gastosPrioridad = useCallback(
    () => [
      {
        type: "component",
        component: ({ setFieldValue }: any) =>
          ordenDeLosGastosPrioridad && (
            <Stack direction={"row"}>
              <FormControl fullWidth>
                <InputLabel>Destino de los gastos principales</InputLabel>

                <Select
                  label={"Destino de los gastos principales"}
                  onChange={(event: any) =>
                    setGastoSeleccionado(event.target.value)
                  }
                >
                  {gastosFiltradosSi.map((gastos: any) => (
                    <MenuItem value={gastos.idconcepto} key={gastos.idconcepto}>
                      <InputLabel>{gastos.denominacion}</InputLabel>
                    </MenuItem>
                  ))}
                  {/* {setFieldValue("prioridad", ordenDeLosGastosPrioridad)} */}
                </Select>
              </FormControl>
              <IconButton
                onClick={() => {
                  let _gastoSeleccionado: any = ordenDeLosGastosPrioridad;
                  let referenciaOrden: any = {};

                  if (Array.isArray(_gastoSeleccionado))
                    _gastoSeleccionado.push(gastoSeleccionado);
                  else _gastoSeleccionado = [gastoSeleccionado];

                  _gastoSeleccionado.forEach(
                    (idconcepto: string | number, index: number) => {
                      referenciaOrden[idconcepto] = index;
                    }
                  );

                  let _gastosFiltrados = gastos.filter(
                    (item: any) =>
                      !_gastoSeleccionado.includes(item.idconcepto as never)
                  );
                  let _gastosFiltradosNo = gastos
                    .filter((item: any) =>
                      _gastoSeleccionado.includes(item.idconcepto as never)
                    )
                    .sort(
                      (a: any, b: any) =>
                        referenciaOrden[a.idconcepto] -
                        referenciaOrden[b.idconcepto]
                    );
                  setFieldValue("prioridad", _gastoSeleccionado);
                  setGastosFiltradosSi(_gastosFiltrados);
                  setGastosFiltradosNo(_gastosFiltradosNo);
                  setOrdenDeLosGastosPrioridad([..._gastoSeleccionado]);
                  setGastoSeleccionado(null);
                }}
              >
                <AddCircleRounded />
              </IconButton>
            </Stack>
          ),
        label: "",
        name: "prioridad",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        hidden: (values: any) =>
          values.montocup == "1" || values.montocup == "",
      },
      {
        type: "text",
        label: "¿Cuál?",
        gridValues: { xs: 12 },
        name: "cualOtros",
        pattern: /[A-Z a-z ÁÉÍÓÚáéíóúüÜ]/,
        validations: {
          required: {
            message: "Este campo es obligatorio",
            when: {
              name: "prioridad",
              expression: (value: any) => value === "2",
            },
          },
          tests: [
            {
              test: (values: any) => {
                return values.cualOtros?.length >= 50;
              },
              message: "Límite máximo 50 caracteres",
            },
          ],
        },
        hidden: (values: any) => {
          return !(values.montocup[0] == "2" && gastoSeleccionado == 10161);
        },
        disabled: (values: any) => {
          return values?.cualOtros?.length
            ? false
            : !(gastoSeleccionado == 10161);
        },
        onChange: (event: any) => {
          setOtrosPrioridad(event.target.value);
        },
      },
      {
        type: "component",
        component: ({ setFieldValue }: any) =>
          ordenDeLosGastosPrioridad && (
            <TableView
              values={gastosFiltradosNo.map((item: any, index: number) => {
                return {
                  idconcepto: item.idconcepto,

                  denominacion:
                    item.idconcepto === 10161
                      ? `Otro: ${
                          otrosPrioridad ||
                          destinoGastos?.[10161]?.detalles ||
                          ""
                        }`
                      : item.denominacion,

                  prioridad: index + 1,
                  delete: (
                    <IconButton
                      onClick={() => {
                        let _ordenDeLosGastosPrioridad =
                          ordenDeLosGastosPrioridad;
                        let indiceElemento =
                          _ordenDeLosGastosPrioridad.findIndex(
                            (elemento: any) => elemento === item.idconcepto
                          );

                        if (indiceElemento !== -1) {
                          _ordenDeLosGastosPrioridad
                            .splice(indiceElemento, 1)
                            .filter((item: any) => !item);
                        }

                        let _gastosFiltrados = gastos.filter(
                          (item: any) =>
                            !_ordenDeLosGastosPrioridad.includes(
                              item.idconcepto as never
                            )
                        );
                        let _gastosFiltradosNo = gastos.filter((item: any) =>
                          _ordenDeLosGastosPrioridad.includes(
                            item.idconcepto as never
                          )
                        );
                        setFieldValue("prioridad", _ordenDeLosGastosPrioridad);

                        setGastosFiltradosSi(_gastosFiltrados);
                        setGastosFiltradosNo(_gastosFiltradosNo);
                        setOrdenDeLosGastosPrioridad([
                          ..._ordenDeLosGastosPrioridad,
                        ]);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  ),
                };
              })}
              disabled={false}
              headers={[
                {
                  name: "prioridad",
                  label: "Prioridad",
                  align: "left",
                },
                { name: "denominacion", label: "Gasto" },
                { name: "delete", label: "Eliminar", align: "left" },
              ]}
              idKey="idconcepto"
              multiSelect={true}
              name={""}
              useCheckBox={false}
            />
          ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        hidden: (values: any) =>
          values.montocup == "1" || values.montocup == "",
      },
    ],
    [
      otrosPrioridad,
      ordenDeLosGastosPrioridad,
      gastosFiltradosSi,
      gastoSeleccionado,
      gastos,
    ]
  );

  const gastosMonto: IGenericControls[] = [
    {
      type: "component",
      component: ({ setFieldValue }) =>
        gastos.map((gasto: any) => {
          let controls: IGenericControls[] = [
            {
              type: "component",
              component: () => (
                <Typography sx={{ mt: 2 }}>{gasto.denominacion}</Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 5, lg: 5, md: 5, sm: 5, xl: 5 },
            },
            {
              type: "number",
              label: "Monto",
              gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
              gridSx: {
                textAlign: "center",

                display: gasto.denominacion === "Otro" ? "contents" : "auto",
              },
              sx: {
                margin:
                  gasto.denominacion === "Otro" ? "8px !important" : "unset",
                maxWidth: gasto.denominacion === "Otro" ? 150 : 250,
              },
              name: "idgastos",
              format: "units",
              negativeValues: false,
              // disabled: (values: any) => {
              //   return values.cual;
              // },
              onChange: (event: any) => {
                setDestinoGastos((prev: any) => {
                  let result;
                  if (!event.value.length) {
                    delete prev[gasto.idconcepto];
                    result = { ...prev };
                  } else {
                    result = {
                      ...prev,
                      [gasto.idconcepto]: { monto: event.value },
                    };
                  }
                  setFieldValue("destinoGastos", result);
                  return result;
                });
              },
              validations: {
                min: { value: 1, message: "El valor no puede ser cero" },
                max: { value: 1000000, message: "Límite máximo alcanzado " },
              },
            },
          ];
          if (gasto.denominacion === "Otro")
            controls.push({
              type: "text",
              label: "¿Cuál?",
              multiline: { maxRows: 3 },
              gridValues: { xs: 4, lg: 4, md: 4, sm: 4, xl: 4 },
              name: "cual",
              pattern: /[A-Za-zÁÉÍÓÚáéíóúüÜ]/,
              validations: {
                required: { message: "Este campo es obligatorio" },
                tests: [
                  {
                    test: (values: any) => {
                      return values.cualOtros?.length >= 50;
                    },
                    message: "Límite máximo 50 caracteres",
                  },
                ],
              },
              disabled: (values: any) => {
                return !values.idgastos;
              },
              onChange: (event: any) => {
                setDestinoGastos((prev: any) => {
                  let result = {
                    ...prev,
                  };
                  if (event.target.value.length) {
                    result = {
                      ...result,
                      [gasto.idconcepto]: {
                        ...result[gasto.idconcepto],
                        detalles: event.target.value,
                      },
                    };
                  } else {
                    delete result[gasto.idconcepto].detalles;
                  }

                  setFieldValue("destinoGastos", result);
                  return result;
                });
              },
            });
          return (
            <GenericForm
              sx={{ p: 1 }}
              name="test"
              controls={controls}
              endpointPath="/"
              idForEdit={gasto.idconcepto}
              getByIdFunction={async (id: any) => {
                const gastoConcepto = await obtenerPrimero("dat_hogargastos", {
                  idcodigohogar: getHogar(),
                  iddestino: id.toString(),
                });
                if (gastoConcepto) {
                  setDestinoGastos((prev: any) => {
                    let result;
                    if (!gastoConcepto.montocup?.length) {
                      delete prev[id];
                      result = { ...prev };
                    } else {
                      result = {
                        ...prev,
                        [id]: { monto: gastoConcepto.montocup },
                      };
                      if (gastoConcepto.detalles?.length) {
                        result = {
                          ...result,
                          [id]: {
                            ...result[id],
                            detalles: gastoConcepto.detalles,
                          },
                        };
                      }
                    }
                    setFieldValue("destinoGastos", result);
                    return result;
                  });

                  setOrdenDeLosGastosPrioridad((prev: any) => {
                    if (gastoConcepto.pesogasto) {
                      prev[gastoConcepto.pesogasto - 1] = parseInt(id);
                    }
                    let _gastoSeleccionado: any = prev;
                    let referenciaOrden: any = {};

                    if (Array.isArray(_gastoSeleccionado))
                      _gastoSeleccionado.push(gastoSeleccionado);
                    else _gastoSeleccionado = [gastoSeleccionado];

                    _gastoSeleccionado.forEach(
                      (idconcepto: string | number, index: number) => {
                        referenciaOrden[idconcepto] = index;
                      }
                    );

                    let _gastosFiltrados = gastos.filter(
                      (item: any) =>
                        !_gastoSeleccionado.includes(item.idconcepto as never)
                    );
                    let _gastosFiltradosNo = gastos
                      .filter((item: any) =>
                        _gastoSeleccionado.includes(item.idconcepto as never)
                      )
                      .sort(
                        (a: any, b: any) =>
                          referenciaOrden[a.idconcepto] -
                          referenciaOrden[b.idconcepto]
                      );
                    _gastoSeleccionado = _gastoSeleccionado.filter(
                      (el: any) => el
                    );
                    setGastosFiltradosSi(_gastosFiltrados);
                    setGastosFiltradosNo(_gastosFiltradosNo);

                    return [..._gastoSeleccionado];
                  });

                  return {
                    idgastos: gastoConcepto.montocup,
                    cual: gastoConcepto.detalles,
                  };
                } else {
                  return { idgastos: "", cual: "" };
                }
              }}
              hideButtons={true}
            />
          );
        }),
      label: "",
      name: "destinoGastos",
      gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      hidden: (values: any) => values.montocup == "2" || values.montocup == "",
    },
  ];

  const notifyValidation = (values: any) => {
    if (values.destinoGastos) {
      const montosInvalidos = Object.values(values.destinoGastos)
        .filter((gasto: any) => gasto.monto && parseFloat(gasto.monto) === 0)
        .map(() => "El campo monto tiene un valor cero.");

      if (montosInvalidos.length > 0) {
        return montosInvalidos[0];
      }
    }
    if (
      values.montocup == 2 &&
      Object.values(ordenDeLosGastosPrioridad).length == 0
    )
      return "No se puede guardar si no añade ninguna prioridad en los gastos principales.";
    if (values.montocup == 1 && !Object.values(destinoGastos).length)
      return "No se puede guardar si no añade ningún destino de gastos principales.";
    if (
      values.montocup == 1 &&
      Object.values(destinoGastos).length &&
      destinoGastos["10161"]?.monto?.length &&
      !destinoGastos["10161"]?.detalles?.length
    )
      return "No se puede guardar si no añade la descripción de los otros gastos.";
    if (
      values.montocup == 1 &&
      Object.values(destinoGastos).length &&
      !destinoGastos["10161"]?.monto?.length &&
      destinoGastos["10161"]?.detalles?.length
    )
      return "No se puede guardar si no añade el monto de los otros gastos.";
  };

  const guardarGastosDelHogar = async (values: any) => {
    try {
      // console.log(values);
      const hogar = getHogar();
      let prioridadObject: any = {};
      values.prioridad?.length &&
        values.prioridad.forEach(
          (item: any, index: number) => (prioridadObject[item] = index + 1)
        );
      const conceptos = await (datico as any)["nom_concepto"]
        .where("idpadre")
        .equals("10148")
        .toArray();
      const conceptosList = conceptos.map(
        ({ idconcepto, denominacion }: any) => {
          return idconcepto;
        }
      );

      if (hogar) {
        await modificar("dat_hogar", "idcodigohogar", parseInt(hogar), {
          idtipogasto: values.montocup,
        });
        await deleteRowsIfExist(
          "dat_hogargastos",
          {
            idcodigohogar: hogar,
          },
          "idhogargasto"
        );
        conceptosList
          .filter(
            (concepto: any) => !conceptosPredeterminados.includes(concepto)
          )
          .forEach(async (concepto: number) => {
            if (values.destinoGastos?.[concepto] || prioridadObject[concepto]) {
              let data: any = {
                idcodigohogar: hogar,
                iddestino: `${concepto}`,
              };

              if (values.destinoGastos?.[`${concepto}`]?.monto?.length) {
                data.montocup = values.destinoGastos[`${concepto}`].monto;
              }
              if (prioridadObject[concepto]) {
                data.pesogasto = prioridadObject[concepto];
                if (concepto == 10161 && otrosPrioridad.length)
                  data.detalles = otrosPrioridad;
              }
              if (values.destinoGastos?.[`${concepto}`]?.detalles) {
                data.detalles = values.destinoGastos[`${concepto}`].detalles;
              }
              if (data.montocup?.length) {
                delete data.pesogasto;
              }
              if (data.pesogasto) {
                delete data.montocup;
              }
              if (data.montocup?.length || data.pesogasto) {
                await CreateOrModify(
                  "dat_hogargastos",
                  {
                    idcodigohogar: hogar,
                    iddestino: `${concepto}`,
                  },
                  data,
                  "idhogargasto"
                );
              }
            }
          });
        conceptosPredeterminados.forEach(async (concepto: number) => {
          switch (concepto) {
            case 10158:
              if (values.proporciongastomedicamento) {
                let data: any = {
                  idcodigohogar: hogar,
                  iddestino: `${concepto}`,
                  proporciongasto: values.proporciongastomedicamento,
                };
                if (values.destinoGastos?.[`${concepto}`]?.monto?.length) {
                  data.montocup = values.destinoGastos[`${concepto}`].monto;
                }
                if (prioridadObject[concepto]) {
                  data.pesogasto = prioridadObject[concepto];
                }
                if (values.destinoGastos?.[`${concepto}`]?.detalles) {
                  data.detalles = values.destinoGastos[`${concepto}`].detalles;
                }
                if (data.montocup?.length) {
                  delete data.pesogasto;
                }
                if (data.pesogasto) {
                  delete data.montocup;
                }
                await CreateOrModify(
                  "dat_hogargastos",
                  {
                    idcodigohogar: hogar,
                    iddestino: `${concepto}`,
                  },
                  data,
                  "idhogargasto"
                );
              }

              break;
            case 10149:
              if (values.proporciongastoalimentacion) {
                let data: any = {
                  idcodigohogar: hogar,
                  iddestino: `${concepto}`,
                  proporciongasto: values.proporciongastoalimentacion,
                };
                if (values.destinoGastos?.[`${concepto}`]?.monto?.length) {
                  data.montocup = values.destinoGastos[`${concepto}`].monto;
                }
                if (prioridadObject[concepto]) {
                  data.pesogasto = prioridadObject[concepto];
                }
                if (values.destinoGastos?.[`${concepto}`]?.detalles) {
                  data.detalles = values.destinoGastos[`${concepto}`].detalles;
                }
                if (data.montocup?.length) {
                  delete data.pesogasto;
                }
                if (data.pesogasto) {
                  delete data.montocup;
                }
                await CreateOrModify(
                  "dat_hogargastos",
                  {
                    idcodigohogar: hogar,
                    iddestino: `${concepto}`,
                  },
                  data,
                  "idhogargasto"
                );
              }
              break;
          }
        });

        notificar({ title: "Los datos se han adicionado satisfactoriamente." });
        setListo(true);
      }
    } catch (error: any) {
      notificar({ title: "Error guardando los gastos", type: "error" });
    }
  };

  return [
    [
      ...headControls,
      ...gastosPrioridad(),
      ...mediumControls,
      ...gastosMonto,
      ...lastControls,
    ],
    destinoGastos,
    guardarGastosDelHogar,
    getGastosPorHogar,
    notifyValidation,
    hogar,
    siguiente,
    anterior,
    setListo,
    listo,
    setOtrosPrioridad,
  ];
}

export default useGastos;
