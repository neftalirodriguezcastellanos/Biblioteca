import { Alert, IconButton, Snackbar } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useLayout } from "../../context/system/LayoutContext";

export default function BibliotecaAlert() {
    const {
        alert: { open, message, severity },
        handleCloseAlert,
    } = useLayout();

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert
                onClose={handleCloseAlert}
                severity={severity}
                sx={{ width: "100%" }}
                variant="filled"
                action={
                    <IconButton
                        onClick={handleCloseAlert}
                        color="inherit"
                        style={{ backgroundColor: "transparent" }}
                        size="small"
                    >
                        <CloseIcon />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
