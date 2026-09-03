import { Grain, Handyman } from "@mui/icons-material";
import {
  crear,
  deleteRowsIfExist,
  modificar,
  obtenerPrimero,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { useEffect, useState } from "react";

import { CustomTree } from "@/_pwa-framework/components/tree/tree.component";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { Typography } from "@mui/material";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { useNavigate } from "react-router-dom";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";

function Materiales() {
  const navegar = useNavigate();
  const idHogar = getHogar();
  const siguiente = () => navegar("/servicios-equipamientos/afectaciones");
  const notificar = NotificationProvider();
  const anterior = async () => {
    const data = await obtenerMiembros();
    const miembros = data.filter((item) => item.edad <= 18);

    if (miembros?.length) navegar("/adolecentes");
    else navegar("/proteccion");
  };

  const [listo, setListo] = useState<any>(false);
  const [treeData, setTreeData] = useState([]);
  const [childParentMap, setChildParentMap] = useState<{
    [key: string]: string;
  }>({});
  const [requiredCategories, setRequiredCategories] = useState<string[]>([]);

  const checkListo = async (id: string) => {
    const datos: any = await obtenerDatosPorLlave(
      "dat_estadoconstvivienda",
      "idcodigohogar",
      id
    );
    setListo(!!datos?.length);
  };

  useEffect(() => {
    if (idHogar) checkListo(idHogar);
  }, [idHogar]);

  const cargarArbol = async () => {
    let arbol: any = [];
    const newChildParentMap: { [key: string]: string } = {};
    const categories: string[] = [];

    await datico.nom_concepto
      .where("idpadre")
      .equals("9506")
      .toArray()
      .then((data: any) => {
        arbol = data.map((concepto: any) => {
          const parentId = concepto.idconcepto.toString();
          categories.push(parentId);

          concepto.hijos?.forEach((hijo: any) => {
            newChildParentMap[hijo.idconcepto.toString()] = parentId;
          });

          return {
            value: parentId,
            label: concepto.denominacion,
            children: concepto.hijos?.map((hijo: any) => ({
              value: hijo.idconcepto.toString(),
              label: hijo.denominacion,
            })),
          };
        });

        setTreeData(arbol);
        setChildParentMap(newChildParentMap);
        setRequiredCategories(categories);
      });
  };

  useEffect(() => {
    cargarArbol();
  }, []);

  const validateCategories = (selectedMaterials: string[]) => {
    const selectedParents = new Set(
      selectedMaterials.map((childId) => childParentMap[childId])
    );
    return requiredCategories.every((cat) => selectedParents.has(cat));
  };

  return (
    <>
      <Meta title="Controles" />
      {idHogar ? (
        <GenericForm
          name="materialesForm"
          controls={[
            {
              type: "component",
              component: () => (
                <Typography>
                  <b>Nota aclaratoria:</b> La información solicitada aplica a la
                  vivienda o a la parte de ella que ocupa el hogar
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12 },
            },
            {
              type: "select",
              name: "idsituacionalegal",
              label: "Situación legal de la vivienda",
              url: "9299",
              validations: { required: { message: "Este campo es requerido" } },
              gridValues: { xs: 12 },
            },
            {
              type: "component",
              component: () => (
                <Typography sx={{ mt: 3 }} fontSize={"17px"}>
                  Materiales predominantes en
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12 },
            },
            {
              type: "component",
              component: (props) => {
                const selectedMaterials = props.formValue || [];
                const isValid = validateCategories(selectedMaterials);

                return (
                  <div>
                    <CustomTree
                      data={treeData}
                      parentIcon={Handyman}
                      childrenIcon={Grain}
                      multiSelect={true}
                      defaultValues={props.formValue}
                      {...props}
                    />
                    {selectedMaterials.length > 0 && !isValid}
                  </div>
                );
              },
              label: "matPredominates",
              name: "matPredominates",
              gridValues: { xs: 12 },
            },
          ]}
          title="Materiales predominantes de la vivienda"
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={idHogar}
          saveButton="Guardar"
          submitFunction={async (values: any) => {
            const selectedMaterials = values.matPredominates || [];

            if (!validateCategories(selectedMaterials)) {
              notificar({
                type: "error",
                title:
                  "Debe seleccionar al menos un material de cada categoría",
              });
              return;
            }

            await deleteRowsIfExist(
              "dat_estadoconstvivienda",
              { idcodigohogar: idHogar },
              "idestadoconstvivienda"
            );

            if (selectedMaterials.length) {
              selectedMaterials.forEach((material: string) => {
                crear("dat_estadoconstvivienda", {
                  idestadoconst: material,
                  idcodigohogar: idHogar,
                });
              });
            }

            modificar("dat_hogar", "idcodigohogar", parseInt(idHogar), {
              idsituacionalegal: values.idsituacionalegal,
            });

            notificar({
              type: "success",
              title:
                "Los materiales predominantes se han guardado satisfactoriamente.",
            });

            setListo(true);
          }}
          getByIdFunction={async (id) => {
            const materiales = await obtenerDatosPorLlave(
              "dat_estadoconstvivienda",
              "idcodigohogar",
              id
            );
            const hogar = await obtenerPrimero("dat_hogar", {
              idcodigohogar: parseInt(idHogar),
            });
            return {
              matPredominates: materiales.map(
                (material: any) => material.idestadoconst
              ),
              idsituacionalegal: hogar.idsituacionalegal,
            };
          }}
          acceptDisabledFunction={(values) => {
            const hasSituacionLegal = !!values.idsituacionalegal;
            const selectedMaterials = values.matPredominates || [];
            const isValid = validateCategories(selectedMaterials);

            return !(
              hasSituacionLegal &&
              selectedMaterials.length > 0 &&
              isValid
            );
          }}
          prevButton={{ text: "Anterior", action: anterior }}
          nextButton={{ text: "Siguiente", action: siguiente }}
          nextDisabledFunction={(values) => !listo}
          applyButton={false}
        />
      ) : (
        <Typography variant="h6" p={2}>
          <b>No existe un hogar seleccionado</b>
        </Typography>
      )}
    </>
  );
}

export default Materiales;
