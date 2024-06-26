import { Typography } from "@mui/material";
import { useConfiguration } from "../../context/system/ConfigurationContext";

const BibliotecaFooter = () => {
    const { theme } = useConfiguration();
    return (
        <div
            style={{
                height: 40,
                backgroundColor: theme.palette.secondary.main,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="caption" color="white">
                &copy; {new Date().getFullYear()} | Biblioteca
            </Typography>
        </div>
    );
};

export default BibliotecaFooter;
