import BasicSpeedDial from "@/_pwa-framework/speedDial/speedDial";
import Box from "@mui/material/Box";
import Header from "./header";
import Main from "./main";
import Nav from "@/_pwa-framework/sections/Sidebar/Sidebar";
import PropTypes from "prop-types";
import { useScrollToTop } from "@/_pwa-framework/hooks/use-scroll-to-top";
import { useState } from "react";

export default function DashboardLayout({ children }: any) {
  const [openNav, setOpenNav] = useState(false);

  useScrollToTop();
  // SessionManager();
  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        <BasicSpeedDial modalName="gghf" />
        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
