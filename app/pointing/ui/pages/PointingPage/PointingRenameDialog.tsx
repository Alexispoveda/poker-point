import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

type PointingRenameDialogProps = {
  open: boolean;
  nameDraft: string;
  isActionMutating: boolean;
  onClose: () => void;
  onNameDraftChange: (value: string) => void;
  onSave: () => void;
};

const PointingRenameDialog = ({
  open,
  nameDraft,
  isActionMutating,
  onClose,
  onNameDraftChange,
  onSave,
}: PointingRenameDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Rename</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Your name"
          value={nameDraft}
          onChange={(event) => onNameDraftChange(event.target.value)}
          fullWidth
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isActionMutating}>
          Cancel
        </Button>
        <Button variant="contained" disabled={isActionMutating} onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PointingRenameDialog;
