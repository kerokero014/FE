// SnackbarMessage.tsx
import { Snackbar, Alert } from "@mui/material";

interface SnackbarMessageProps {
  open: boolean;
  message: string;
  type: "error" | "success" | "info";
  onClose: () => void;
}

const SnackbarMessage: React.FC<SnackbarMessageProps> = ({
  open,
  message,
  type,
  onClose,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMessage;
