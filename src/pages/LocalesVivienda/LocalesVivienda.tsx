import {
  crear,
  deleteIfExist,
  deleteRowsIfExist,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

import { Divider } from "@mui/material";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import Typography from "@mui/material/Typography";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerLocalesViviendas } from "./helpers";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function LocalesVivienda() {
  const idhogar = getHogar() ?? 0;
  const [id, setid] = useState<any>(idhogar ?? null);
  const [cant, setCant] = useState(0);
  const [listo, setListo] = useState<any>(false);
  const notificar = NotificationProvider();
  const navegar = useNavigate();
  const siguiente = () => navegar("/servicios-equipamientos/servicios");
  const anterior = () => navegar("/servicios-equipamientos/afectaciones");

  const checkListo = async (id: string) => {
    const datos: any = await obtenerLocalesViviendas(id);
    setListo(!!datos?.cantudormir?.length);
  };

  useEffect(() => {
    if (id) {
      checkListo(id);
    }
  }, [id]);

  function getPage() {
    if (idhogar) {
      return (
        <GenericForm
          name="1"
          controls={[
            {
              type: "component",
              component: () => (
                <Typography>
                  <b>Nota aclaratoria:</b>La información solicitada aplica a la
                  vivienda o a la parte de ella que ocupa el hogar.
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "component",
              component: () => (
                <Typography>
                  <b>Dormitorios</b>
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "component",
              component: () => <Divider sx={{ mb: 2 }} />,
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "number",
              label: "Cantidad de piezas utilizadas para dormir",
              name: "cantudormir",
              format: "units",
              //pattern: /[0-9]/,
              gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
              validations: {
                length: {
                  value: 1,
                  message: "Límite máximo 1 caracteres",
                },
                required: { message: "Este campo es obligatorio" },
                min: { message: "No puede ser 0", value: 1 },
                // tests: [
                //   {
                //     test: (values: any) => {
                //       return (
                //         values.cantudormir?.length >= 2
                //       );
                //     },
                //     message: "Límite máximo 2 caracteres",
                //   },
                // ]
              },
            },
            {
              type: "number",
              label: "Cantidad de piezas exclusivas de tipo dormitorios",
              name: "cantedormir",
              format: "units",
              //pattern: /[0-9]/,
              gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
              validations: {
                max: {
                  reference: "cantudormir",
                  value: 1,
                  message:
                    "La cantidad no puede ser mayor que las piezas utilizadas para dormir.",
                },
                required: {
                  message: "Este campo es obligatorio",
                },
                min: { message: "No puede ser 0", value: 1 },
                tests: [
                  {
                    test: (values: any) => {
                      return values.cantedormir?.length >= 2;
                    },
                    message: "Límite máximo 2 caracteres",
                  },
                ],
              },
            },
            {
              type: "component",
              component: () => (
                <Typography mt={2}>
                  <b>Cocina</b>
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "component",
              component: () => <Divider sx={{ mb: 2 }} />,
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "radio",
              label: "",
              name: "tipousococina",
              url: "10229",
              direction: "row",
              labelPlacement: "end",
              gridValues: { xs: 10, lg: 4, md: 4, sm: 4, xl: 4 },
              onChangeCallback: (e, ref) => {
                const { value } = e.target;
                value == "10231" &&
                  ref.setFieldValue("cantidadcocina", "", true);
              },
            },
            {
              type: "number",
              label: "Cantidad",
              name: "cantidadcocina",
              gridValues: { xs: 4, lg: 2, md: 2, sm: 2, xl: 2 },
              format: "units",
              hidden: (values: any) => values.tipousococina != "10230",
              validations: {
                length: {
                  value: 1,
                  message: "Límite máximo 1 caracteres",
                },
                required: {
                  message: "Este campo es obligatorio",
                  when: {
                    name: "tipousococina",
                    expression: (value: any) => {
                      return value === "10230";
                    },
                  },
                },
              },
            },
            {
              type: "component",
              component: () => <Divider sx={{ mb: -5 }} />,
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "select",
              name: "idtipoubicacion",
              label: "Local para cocinar",

              url: "9752",
              gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
              validations: {
                min: {
                  value: 1,
                  message: "Este campo es obligatorio",
                },
              },
            },
            {
              type: "select",
              name: "idcombustible",
              label: "Combustible más usado para cocinar",
              gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
              url: "9461",
              validations: {
                required: {
                  message: "Este campo es obligatorio",
                },
              },
            },
            {
              type: "radio",
              label: "¿Tiene servicios sanitario?",
              name: "tienesanitario",
              radios: [
                { idconcepto: "1", denominacion: "Sí" },
                { idconcepto: "2", denominacion: "No" },
              ],
              direction: "row",
              labelPlacement: "start",
              onChangeCallback: (e, ref) => {
                const { value } = e.target;
                value == "2" &&
                  ref.setFieldValue("idtipousoservicio", [], true) &&
                  ref.setFieldValue("cantidad", "", true) &&
                  ref.setFieldValue("inodoro", "", true) &&
                  ref.setFieldValue("letrina", "", true);
              },
            },

            {
              type: "component",
              component: () => <Divider sx={{ mb: 2 }} />,
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },

            {
              type: "select",
              label: "Escoja la opción",
              name: "idtipousoservicio",
              url: "10226",
              gridValues: { xs: 7, lg: 6, md: 6, sm: 6, xl: 6 },
              hidden: (values: any) => values.tienesanitario !== "1",
              onChange: (event, ref) => {
                const { value } = event.target;
                if (value !== "10227") ref.setFieldValue("cantidad", "", true);
              },
              validations: {
                required: {
                  message: "Este campo es obligatorio",
                  when: {
                    name: "tienesanitario",
                    expression: (value) => value === "1",
                  },
                },
              },
            },
            {
              type: "number",
              label: "Cantidad",
              name: "cantidad",
              format: "units",
              gridValues: { xs: 5, sm: 2, lg: 2, md: 2, xl: 2 },
              hidden: (values: any) =>
                values.tienesanitario !== "1" ||
                values.idtipousoservicio?.[0] !== "10227",
              validations: {
                length: {
                  value: 1,
                  message: "Límite máximo 1 caracteres",
                },
                required: {
                  message: "Este campo es obligatorio",
                  when: {
                    name: "idtipousoservicio",
                    expression: (value: any) => {
                      return value[0] === "10227";
                    },
                  },
                },
              },
            },

            {
              type: "multiselect",
              label: "Inodoro",
              name: "inodoro",

              url: "10223",
              gridValues: { xs: 12, sm: 6 },
              hidden: (values: any) => values.tienesanitario !== "1",
              // validations: {
              //   required: {
              //     message: "Este campo es obligatorio",
              //     when: {
              //       name: "tienesanitario",
              //       expression: (value) => value === "1",
              //     },
              //   },
              // },
            },
            {
              type: "multiselect",
              label: "Letrina",
              name: "letrina",

              url: "10223",
              gridValues: { xs: 12, sm: 6 },
              hidden: (values: any) => values.tienesanitario !== "1",
              // validations: {
              //   required: {
              //     message: "Este campo es obligatorio",
              //     when: {
              //       name: "tienesanitario",
              //       expression: (value) => value === "1",
              //     },
              //   },
              // },
            },
          ]}
          title="Locales de la vivienda"
          description=""
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          nextDisabledFunction={(values) => !listo}
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={id}
          saveButton="Guardar"
          // getByIdFunction={async () => {
          //   const dato = await obtenerLocalesViviendas(id);
          //   console.log('valuesssss',dato)
          //   return dato;
          // }}

          getByIdFunction={async () => {
            const locales = await obtenerDatosPorLlave(
              "dat_localesvivienda",
              "idcodigohogar",
              id
            );

            if (!locales?.length) return {};

            const datosLocales = locales[0]; // Primer registro
            const idlocalesvivienda = datosLocales.idlocalesvivienda;

            const sanitarios = await obtenerDatosPorLlave(
              "dat_ubicacionsanitaria",
              "idlocalesvivienda",
              idlocalesvivienda
            );

            const inodoro = sanitarios
              ?.filter((s: any) => s.idtiposanitario === "10221")
              ?.flatMap((s: any) => s.idubicacion || []);
            const letrina = sanitarios
              ?.filter((s: any) => s.idtiposanitario === "10222")
              ?.flatMap((s: any) => s.idubicacion || []);

            const ubicacionLocales = await obtenerDatosPorLlave(
              "dat_ubicacionlocales",
              "idlocalesvivienda",
              idlocalesvivienda
            );
            const idtipoubicacion =
              ubicacionLocales?.[0]?.idtipoubicacion ?? "";

            return {
              cantudormir: datosLocales.cantudormir,
              cantedormir: datosLocales.cantedormir,
              tipousococina: datosLocales.tipousococina,
              cantidadcocina: datosLocales.cantidadcocina,
              idtipoubicacion,
              idcombustible: datosLocales.idcombustible,
              tienesanitario: datosLocales.tienesanitario,
              idtipousoservicio: datosLocales.idtipousoservicio,
              cantidad: datosLocales.cantidadsanitario,
              inodoro: inodoro ?? [],
              letrina: letrina ?? [],
              idcodigohogar: id,
              idlocalesvivienda,
              editMode: true,
            };
          }}
          notifyValidation={(values) => {
            if (values.cantidadcocina == "0") {
              return "El valor de cantidad de cocina no puede ser 0";
            }

            if (
              values.idtipousoservicio?.[0] !== "10228" &&
              Number(values.cantidad) <
                (values.inodoro?.length ?? 0) + (values.letrina?.length ?? 0)
            ) {
              return "Los servicios sanitarios seleccionados sobrepasan la cantidad declarada.";
            }
            if (values.tienesanitario === "1") {
              const tieneInodoro =
                Array.isArray(values.inodoro) && values.inodoro.length > 0;
              const tieneLetrina =
                Array.isArray(values.letrina) && values.letrina.length > 0;

              if (!tieneInodoro && !tieneLetrina) {
                return "Debe seleccionar al menos un tipo de sanitario: inodoro o letrina.";
              }
            }
          }}
          // submitFunction={async (values: any) => {
          //   console.log('valuessss',values)
          //   const existelocalesvivienda = await obtenerDatosPorLlave(
          //     "dat_localesvivienda",
          //     "idcodigohogar",
          //     id
          //   );

          //   const valores = {
          //     cantudormir: values.cantudormir,
          //     cantedormir: values.cantedormir,
          //     tipousococina: values.tipousococina,
          //     cantidadcocina: values.cantidadcocina,
          //     cantidadsanitario: values.cantidad,
          //     idcombustible: values.idcombustible,
          //     tienesanitario: values.tienesanitario,
          //     idtipousoservicio: values.idtipousoservicio,
          //     idcodigohogar: id,
          //   };

          //   const cocina =
          //     (values.tipousococina == "10230" &&
          //       !!values.cantidadcocina?.length) ||
          //     (values.tipousococina == "10231" &&
          //       !values.cantidadcocina?.length);
          //   const sanitario =
          //     (values.tienesanitario == "1" &&
          //       values.idtipousoservicio?.[0] == "10227" &&
          //       !!values.cantidad?.length) ||
          //     (values.tienesanitario == "1" &&
          //       values.idtipousoservicio?.[0] == "10228" &&
          //       !values.cantidad?.length) ||
          //     (values.tienesanitario == "1" &&
          //       values.idtipousoservicio?.[0] == "10226") ||
          //     values.tienesanitario == "2";

          //   if (values.tipousococina !== "" && values.tienesanitario !== "") {
          //     if (cocina && sanitario) {
          //       if (!existelocalesvivienda?.length) {
          //         await crear("dat_localesvivienda", valores).then(
          //           (idlocalesvivienda: any) => {
          //             values.inodoro?.length &&
          //               crear("dat_ubicacionsanitaria", {
          //                 idlocalesvivienda,
          //                 idtiposanitario: "10221",
          //                 idubicacion: values.inodoro,
          //                 idcodigohogar: id,
          //               });
          //             values.letrina?.length &&
          //               crear("dat_ubicacionsanitaria", {
          //                 idlocalesvivienda,
          //                 idtiposanitario: "10222",
          //                 idubicacion: values.letrina,
          //                 idcodigohogar: id,
          //               });
          //             crear("dat_ubicacionlocales", {
          //               idlocalesvivienda,
          //               idtipoubicacion: values.idtipoubicacion,
          //               idcodigohogar: id,
          //             });
          //             notificar({
          //               type: "success",
          //               title:
          //                 "Se han adicionado los locales de la vivienda satisfactoriamente.",
          //               content: "",
          //             });
          //           }
          //         );
          //       } else {
          //         const _idlocalesvivienda =
          //           existelocalesvivienda[0]?.idlocalesvivienda;
          //         const existeubicacionsanitaria = await obtenerDatosPorLlave(
          //           "dat_ubicacionsanitaria",
          //           "idlocalesvivienda",
          //           _idlocalesvivienda
          //         );
          //         const existeubicacionlocales = await obtenerDatosPorLlave(
          //           "dat_ubicacionlocales",
          //           "idlocalesvivienda",
          //           _idlocalesvivienda
          //         );
          //         modificar(
          //           "dat_localesvivienda",
          //           "idcodigohogar",
          //           id,
          //           valores
          //         );

          //         existeubicacionsanitaria?.length
          //           ? values.inodoro?.length
          //             ?modificar(
          //               "dat_ubicacionsanitaria",
          //               "idlocalesvivienda", // ---misma llave
          //               _idlocalesvivienda,
          //               {
          //                 idtiposanitario: "10221", // ----inodoro
          //                 idubicacion: values.inodoro,
          //                 idcodigohogar: id,
          //               }
          //             )
          //             : crear("dat_ubicacionsanitaria", {
          //                 idlocalesvivienda: _idlocalesvivienda,
          //                 idtiposanitario: "10221",
          //                 idubicacion: values.inodoro,
          //                 idcodigohogar: id,
          //               })
          //           :
          //             values.inodoro?.length &&
          //             crear("dat_ubicacionsanitaria", {
          //               idlocalesvivienda: _idlocalesvivienda,
          //               idtiposanitario: "10221",
          //               idubicacion: values.inodoro,
          //               idcodigohogar: id,
          //             });

          //         values.letrina?.length
          //           ? modificar(
          //               "dat_ubicacionsanitaria",
          //               "idlocalesvivienda",
          //               _idlocalesvivienda,
          //               {
          //                 idtiposanitario: "10222",
          //                 idubicacion: values.letrina,
          //                 idcodigohogar: id,
          //               }
          //             )
          //           : crear("dat_ubicacionsanitaria", {
          //               idlocalesvivienda: _idlocalesvivienda,
          //               idtiposanitario: "10222",
          //               idubicacion: values.letrina,
          //               idcodigohogar: id,
          //             });

          //         !existeubicacionlocales?.length
          //           ? crear("dat_ubicacionlocales", {
          //               idlocalesvivienda: _idlocalesvivienda,
          //               idtipoubicacion: values.idtipoubicacion,
          //               idcodigohogar: id,
          //             })
          //           : modificar(
          //               "dat_ubicacionlocales",
          //               "idlocalesvivienda",
          //               _idlocalesvivienda,
          //               {
          //                 idtipoubicacion: values.idtipoubicacion,
          //                 idcodigohogar: id,
          //               }
          //             );

          //         notificar({
          //           type: "success",
          //           title:
          //             "Se ha adicionado los locales de la vivienda satisfactoriamente.",
          //           content: "",
          //         });
          //       }
          //     } else {
          //       notificar({
          //         type: "error",
          //         title: "Faltan datos por especificar.",
          //         content: "",
          //       });
          //     }
          //   } else {
          //     notificar({
          //       type: "error",
          //       title:
          //         "Le falta por definir el uso de la cocina o el servicio sanitario. ",
          //       content: "",
          //       // "Le falta por definir el uso de la cocina o el servicio sanitario",
          //     });
          //   }
          //   setListo(true);
          // }}

          submitFunction={async (values: any) => {
            const existelocalesvivienda = await obtenerDatosPorLlave(
              "dat_localesvivienda",
              "idcodigohogar",
              id
            );

            const valores = {
              cantudormir: values.cantudormir,
              cantedormir: values.cantedormir,
              tipousococina: values.tipousococina,
              cantidadcocina: values.cantidadcocina,
              cantidadsanitario: values.cantidad,
              idcombustible: values.idcombustible,
              tienesanitario: values.tienesanitario,
              idtipousoservicio: values.idtipousoservicio,
              idcodigohogar: id,
            };

            const cocina =
              (values.tipousococina == "10230" &&
                !!values.cantidadcocina?.length) ||
              (values.tipousococina == "10231" &&
                !values.cantidadcocina?.length);
            const sanitario =
              (values.tienesanitario == "1" &&
                values.idtipousoservicio?.[0] == "10227" &&
                !!values.cantidad?.length) ||
              (values.tienesanitario == "1" &&
                values.idtipousoservicio?.[0] == "10228" &&
                !values.cantidad?.length) ||
              (values.tienesanitario == "1" &&
                values.idtipousoservicio?.[0] == "10226") ||
              values.tienesanitario == "2";

            if (values.tipousococina !== "" && values.tienesanitario !== "") {
              if (cocina && sanitario) {
                let idlocalesvivienda: any;

                if (!existelocalesvivienda?.length) {
                  idlocalesvivienda = await crear(
                    "dat_localesvivienda",
                    valores
                  );
                } else {
                  idlocalesvivienda =
                    existelocalesvivienda[0]?.idlocalesvivienda;
                  await modificar(
                    "dat_localesvivienda",
                    "idcodigohogar",
                    id,
                    valores
                  );
                }

                const sanitariosexistentes = await obtenerDatosPorLlave(
                  "dat_ubicacionsanitaria",
                  "idlocalesvivienda",
                  idlocalesvivienda
                );

                const tieneinodoro = sanitariosexistentes?.find(
                  (s) => s.idtiposanitario === "10221"
                );
                const tieneletrina = sanitariosexistentes?.find(
                  (s) => s.idtiposanitario === "10222"
                );

                if (values.inodoro?.length) {
                  if (tieneinodoro?.idubicacionsanitario) {
                    await modificar(
                      "dat_ubicacionsanitaria",
                      "idubicacionsanitario",
                      tieneinodoro.idubicacionsanitario,
                      {
                        idubicacion: values.inodoro,
                        idtiposanitario: "10221",
                        idlocalesvivienda,
                        idcodigohogar: id,
                      }
                    );
                  } else {
                    await crear("dat_ubicacionsanitaria", {
                      idtiposanitario: "10221",
                      idubicacion: values.inodoro,
                      idlocalesvivienda,
                      idcodigohogar: id,
                    });
                  }
                } else {
                  await deleteIfExist(
                    "dat_ubicacionsanitaria",
                    {
                      idtiposanitario: "10221",
                      idubicacionsanitario: tieneinodoro?.idubicacionsanitario,
                      idcodigohogar: id,
                    },
                    "idubicacionsanitario"
                  );
                }
                if (values.letrina?.length) {
                  if (tieneletrina?.idubicacionsanitario) {
                    await modificar(
                      "dat_ubicacionsanitaria",
                      "idubicacionsanitario",
                      tieneletrina.idubicacionsanitario,
                      {
                        idubicacion: values.letrina,
                        idtiposanitario: "10222",
                        idlocalesvivienda,
                        idcodigohogar: id,
                      }
                    );
                  } else {
                    await crear("dat_ubicacionsanitaria", {
                      idtiposanitario: "10222",
                      idubicacion: values.letrina,
                      idlocalesvivienda,
                      idcodigohogar: id,
                    });
                  }
                } else {
                  await deleteIfExist(
                    "dat_ubicacionsanitaria",
                    {
                      idtiposanitario: "10222",
                      idubicacionsanitario: tieneletrina?.idubicacionsanitario,
                      idcodigohogar: id,
                    },
                    "idubicacionsanitario"
                  );
                }

                const existeubicacionlocales = await obtenerDatosPorLlave(
                  "dat_ubicacionlocales",
                  "idlocalesvivienda",
                  idlocalesvivienda
                );

                if (!existeubicacionlocales?.length) {
                  await crear("dat_ubicacionlocales", {
                    idlocalesvivienda,
                    idtipoubicacion: values.idtipoubicacion,
                    idcodigohogar: id,
                  });
                } else {
                  await modificar(
                    "dat_ubicacionlocales",
                    "idlocalesvivienda",
                    idlocalesvivienda,
                    {
                      idtipoubicacion: values.idtipoubicacion,
                      idcodigohogar: id,
                    }
                  );
                }

                notificar({
                  type: "success",
                  title:
                    "Se han adicionado los locales de la vivienda satisfactoriamente.",
                  content: "",
                });
              } else {
                notificar({
                  type: "warning",
                  title: "Faltan datos por especificar.",
                  content: "",
                });
              }
            } else {
              notificar({
                type: "error",
                title:
                  "le falta por definir el uso de la cocina o el servicio sanitario.",
                content: "",
              });
            }

            setListo(true);
          }}
          applyButton={false}
        />
      );
    } else {
      return (
        <Typography variant="h6" p={2}>
          {idhogar
            ? " No existen miembros en el hogar seleccionado"
            : "No existe un hogar seleccionado"}
        </Typography>
      );
    }
  }

  return (
    <>
      <Meta title="Controles" />
      {getPage()}
    </>
  );
}

export default LocalesVivienda;
