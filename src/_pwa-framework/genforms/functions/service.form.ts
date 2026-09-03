import { env } from "@/_pwa-framework/config";
import axios from "axios";

export const getRecordForEdit = async (
  idForEdit: any,
  endpointPath: any,
  args: any
): Promise<any> => {
  const { data } = await axios.get(
    `${env.ENV_SERVER_URL}/gw/${endpointPath}?id=${idForEdit}`
  );
  return data;
};
export const submitValues = async (
  values: object,
  name: any,
  idForEdit: any,
  endpointPath: any
): Promise<any> => {
  try {
    const { data } = await axios.request({
      url: `${env.ENV_SERVER_URL}/gw/${endpointPath}`,
      method: idForEdit ? "PUT" : "POST",
      params: { id: idForEdit, name },
      data: values,
    });
    return data;
  } catch (error: any) {
    console.log(Date.now(), error);
    return {};
  }
};
