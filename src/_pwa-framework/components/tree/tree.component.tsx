import "./tree.css";

import { Checkbox, SvgIconProps } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { Add } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Remove } from "@mui/icons-material";
import { Tree } from "rsuite";

export const CustomTree = ({
  data,
  parentIcon: ParentIcon,
  childrenIcon: ChildrenIcon,
  multiSelect,
  name,
  setFieldValue,
  defaultValues,
  onClick,
  onlyChild,
  checkBox = false,
}: {
  data: any;
  parentIcon: FC<SvgIconProps>;
  childrenIcon: FC<SvgIconProps>;
  checkBox?: boolean;
  defaultValues?: any[];
  multiSelect?: boolean;
  name?: string;
  onlyChild?: true;
  setFieldValue?: any;
  onClick?: any;
}) => {
  const [selected, setSelected] = useState<any[]>(
    defaultValues ? [`${defaultValues}`] : []
  );

  useEffect(() => {
    if (Array.isArray(defaultValues)) setSelected(defaultValues);
  }, [defaultValues]);

  const handleChecked = (e: any) => {
    if (multiSelect) {
      const selectedIndex = selected.indexOf(e.target.name);
      let newSelected: any[] | ((prevState: never[]) => never[]) = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, e.target.name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
      setFieldValue?.(name ?? "tree", newSelected, false);
    } else {
      setFieldValue?.(name ?? "tree", e.target.name, false);
      setSelected([e.target.name]);
    }
    onClick?.(e);
  };

  useEffect(() => {}, [selected]);

  return (
    <Tree
      data={data}
      showIndentLine
      renderTreeIcon={(treeNode, expanded) => {
        if (treeNode.children) {
          return expanded ? <Remove /> : <Add />;
        }
        return null;
      }}
      renderTreeNode={(node) => {
        return (
          <Box
            display={"flex"}
            alignItems={"center"}
            onClick={() => {
              if (!multiSelect) {
                if (node.children && onlyChild) return;
                else handleChecked({ target: { name: `${node.value}` } });
              }
            }}
          >
            {(multiSelect || checkBox) && !node.children && (
              <Checkbox
                checked={selected?.indexOf?.(`${node.value}`) != -1}
                name={`${node.value}`}
                id={`${node.label}`}
                onClick={node.children && onlyChild ? () => {} : handleChecked}
              />
            )}
            {node.children ? (
              <ParentIcon sx={{ mr: 1}} color="primary" />
            ) : (
              <ChildrenIcon sx={{ mr: 1 }} />
            )}
            {node.label}
          </Box>
        );
      }}
    />
  );
};
