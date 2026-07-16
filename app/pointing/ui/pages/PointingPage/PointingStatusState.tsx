import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

type PointingStatusStateProps = {
  message: string;
  severity?: "error" | "warning";
};

const PointingStatusState = ({ message, severity }: PointingStatusStateProps) => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {severity ? <Alert severity={severity}>{message}</Alert> : <Typography>{message}</Typography>}
    </Container>
  );
};

export default PointingStatusState;
