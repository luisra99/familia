import { HEADER, NAV } from "./config-layout";

import AccountPopover from "./common/account-popover";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { bgBlur } from "../../theme/css";
import { useResponsive } from "../../hooks/use-responsive";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function Header({ onOpenNav }: any) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: any) =>
    setAnchorEl({ target: e.currentTarget, x: e.pageX, y: e.pageY });
  const handleClose = () => setAnchorEl(null);

  const lgUp = useResponsive("up", "lg");

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <svg
            aria-hidden="true"
            role="img"
            className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <circle cx="4" cy="12" r="1" fill="white"></circle>
            <rect
              width="14"
              height="2"
              x="7"
              y="11"
              fill="white"
              rx=".94"
              ry=".94"
            ></rect>
            <rect
              width="18"
              height="2"
              x="3"
              y="16"
              fill="white"
              rx=".94"
              ry=".94"
            ></rect>
            <rect
              width="18"
              height="2"
              x="3"
              y="6"
              fill="white"
              rx=".94"
              ry=".94"
            ></rect>
          </svg>
        </IconButton>
      )}

      {/* <Searchbar /> */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <LanguagePopover /> */}
        {/* <NotificationsPopover /> */}
        <AccountPopover />
      </Stack>
    </>
  );
  const blur = bgBlur({
    color: theme.palette.background.default,
  });
  const _lgUp = lgUp
    ? {
        width: `calc(100% - ${NAV.WIDTH + 1}px)`,
        height: HEADER.H_DESKTOP,
      }
    : {};
  const _style = Object.assign(
    {
      boxShadow: "none",
      height: HEADER.H_MOBILE,
      zIndex: theme.zIndex.appBar + 1,
      transition: theme.transitions.create(["height"], {
        duration: theme.transitions.duration.shorter,
      }),
    },
    _lgUp
  );

  return (
    <AppBar sx={_style}>
      <Toolbar
        sx={{
          height: 0.5,
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
