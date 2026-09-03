import { ListItemIcon, ListItemText } from "@mui/material";

import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { MoreVert } from "@mui/icons-material";
import Popover from "@mui/material/Popover";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  row,
  headers,
  actions,
  handleClick,
  useCheckBox,
  key,disableCheckBox
}: any) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <TableRow
      key={key}
      hover
      tabIndex={-1}
      role="checkbox"
      selected={selected}
      style={{ backgroundColor: selected ? "#c5cae9" : "" }}
    >
      {useCheckBox && (
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} disabled={disableCheckBox?.(row)} />
        </TableCell>
      )}
      {headers.map(({ name, align, label }: any) => {
        return (
          label && (
            <TableCell key="name" align={align ?? "left"}>
              {row?.[name]}
            </TableCell>
          )
        );
      })}
      {actions && (
        <TableCell align="center" width={"5px"}>
          <IconButton onClick={handleOpenMenu}>
            <MoreVert />
          </IconButton>
          <Popover
            open={!!open}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {actions?.map(
              (
                { label, action, icon: Icon, color, disabled }: any,
                index: number
              ) => (
                <MenuItem
                  onClick={() => {
                    action(row);
                    handleCloseMenu();
                  }}
                  disabled={disabled?.(row)}
                  key={index}
                >
                  <ListItemIcon>
                    <Icon
                      fontSize="small"
                      sx={{ color: color ?? "primary.main" }}
                    />
                  </ListItemIcon>
                  <ListItemText>{label}</ListItemText>
                </MenuItem>
              )
            )}
          </Popover>
        </TableCell>
      )}
    </TableRow>
  );
}

UserTableRow.propTypes = {
  headers: PropTypes.any,
  row: PropTypes.any,
  handleClick: PropTypes.func,
  actions: PropTypes.any,
  selected: PropTypes.any,
  useCheckBox: PropTypes.bool,
  disableCheckBox:PropTypes.any
};
