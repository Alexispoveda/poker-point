import FormControlLabel from "@mui/material/FormControlLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import { type ChangeEvent } from "react";

type ParticipantActionsMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onRenameClick: () => void;
  isCurrentUserModerator: boolean;
  onModeratorSwitch: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const ParticipantActionsMenu = ({
  anchorEl,
  open,
  onClose,
  onRenameClick,
  isCurrentUserModerator,
  onModeratorSwitch,
}: ParticipantActionsMenuProps) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={onRenameClick}>Rename</MenuItem>
      <MenuItem disableRipple>
        <FormControlLabel
          control={<Switch checked={isCurrentUserModerator} onChange={onModeratorSwitch} />}
          label="Moderator"
        />
      </MenuItem>
    </Menu>
  );
};

export default ParticipantActionsMenu;
