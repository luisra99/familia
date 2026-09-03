import { IGenericControls } from "../../types/controls/controls.types";
import { getControl } from "../../functions/render.controls";

export const GForm = ({
  controlArray,
  dataSource,
  editMode,
  initialValue,
}: {
  controlArray: IGenericControls[];
  dataSource: any;
  editMode: boolean;
  initialValue: any;
}) => {
  return controlArray.map((control: IGenericControls, index: number) => {
    const Component = getControl(control.type);
    return (
      <Component
        {...control}
        key={`${control.name}-${index}`}
        options={control.options ?? dataSource[control.name]}
        editMode={editMode}
        initialValue={initialValue[control.name]}
      />
    );
  });
};
;
