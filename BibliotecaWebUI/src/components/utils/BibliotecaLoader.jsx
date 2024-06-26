import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { useLayout } from "../../context/system/LayoutContext";

export default function BibliotecaLoader() {
    const {
        loader: { open, message },
    } = useLayout();

    return (
        <Backdrop
            open={open}
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                zIndex: (theme) => theme.zIndex.modal + 1,
            }}
        >
            <div className="biblioteca-loader">
                <CircularProgress color="inherit" />
                <Typography>{message}</Typography>
            </div>
        </Backdrop>
    );
}
