import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { esES } from "@mui/x-date-pickers/locales";
import { routeBase } from "./settings/routeConfig";
import { AllSystemProvider } from "./context/system/AllSystemProvider";
import { LibrosProvider } from "./context/libros/LibrosContext";
import { PrestamosProvider } from "./context/prestamos/PrestamosContext";
import { UsuariosProvider } from "./context/usuarios/UsuariosContext";
import BibliotecaPage from "./components/layout/BibliotecaPage";

function App() {
  return (
    <BrowserRouter basename={routeBase}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={
          esES.components.MuiLocalizationProvider.defaultProps.localeText
        }
        adapterLocale="es"
      >
        <AllSystemProvider>
          <LibrosProvider>
            <PrestamosProvider>
              <UsuariosProvider>
                <BibliotecaPage />
              </UsuariosProvider>
            </PrestamosProvider>
          </LibrosProvider>
        </AllSystemProvider>
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
