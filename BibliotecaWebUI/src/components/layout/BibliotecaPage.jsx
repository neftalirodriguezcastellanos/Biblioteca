import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { useConfiguration } from "../../context/system/ConfigurationContext";
import BibliotecaAlert from "../utils/BibliotecaAlert";
import BibliotecaLoader from "../utils/BibliotecaLoader";
import BibliotecaAppBar from "./BibliotecaAppBar";
import BibliotecaFooter from "./BibliotecaFooter";
import BibliotecaDashboard from "./BibliotecaDashboard";
import BibliotecaLogin from "./BibliotecaLogin";
import { routeLogin } from "../../settings/routeConfig";

export default function BibliotecaPage() {
  const { theme } = useConfiguration();
  return (
    <ThemeProvider theme={theme}>
      <div className="biblioteca-dashboard">
        <BibliotecaAppBar />
        <div className="content">
          <Routes>
            <Route path="/*" element={<BibliotecaDashboard />} />
            <Route path={routeLogin} element={<BibliotecaLogin />} />
          </Routes>
        </div>
        <BibliotecaFooter />
      </div>
      <BibliotecaAlert />
      <BibliotecaLoader />
    </ThemeProvider>
  );
}
