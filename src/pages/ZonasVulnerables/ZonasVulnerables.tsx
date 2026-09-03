import { Grain, Handyman } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { CustomTree } from "@/_pwa-framework/components/tree/tree.component";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import { datico } from "@/app/user-interfaces/forms/models/model";

function ZonasVulnerables() {
  const [treeData, setTreeData] = useState([]);
  useEffect(() => {
    cargarArbol();
  }, []);
  const cargarArbol = async () => {
    let arbol: any = [];
    await datico.nom_concepto
      .where("idpadre")
      .equals("8888888")
      .toArray()
      .then(async (data: any) => {
        arbol = data.map((concepto: any) => {
          let leaf: any = {};
          leaf.value = concepto.idconcepto.toString();
          leaf.label = concepto.denominacion;
          leaf.children = concepto.hijos?.map((item: any) => {
            return {
              value: item.idconcepto.toString(),
              label: item.denominacion,
            };
          });

          return leaf;
        });
        setTreeData(arbol);
      });
  };

  return (
    <>
      <Meta title="Zonas Vulnerables" />
      <GenericForm
        name="ZonasVulnerablesForm"
        title="Estructuras"
        endpointPath="/configurar_zona"
        controls={[
          {
            name: "nombre",
            type: "text",
            label: "Nombre de la zona",
            validations: { required: { message: "Este campo es obligatorio" } },
            gridValues: { xs: 12, lg: 6, md: 6, sm: 12, xl: 6 },
          },
          {
            type: "component",
            component: (props) => (
              <CustomTree
                data={treeData}
                parentIcon={Handyman}
                childrenIcon={Grain}
                multiSelect={false}
                defaultValues={props.formValue}
                {...props}
              />
            ),
            label: "estructura",
            name: "idestructura",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
        ]}
      />
    </>
  );
}

export default ZonasVulnerables;
