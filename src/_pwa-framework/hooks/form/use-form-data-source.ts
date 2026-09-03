import { atom, useRecoilState } from "recoil";

const formDataSource = atom<any>({
  key: "generic-form-data-source",
  default: null,
});

function useFormDataSource() {
  return useRecoilState(formDataSource);
}
export default useFormDataSource;
