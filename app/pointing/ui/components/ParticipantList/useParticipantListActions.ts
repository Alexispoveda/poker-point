import { useState, type ChangeEvent, type MouseEvent } from "react";

import type { Participant } from "~/pointing/model";

type UseParticipantListActionsParams = {
  moderators: string[];
  currentParticipantId: string;
  onRenameRequest: () => void;
  onBecomeModerator: () => void;
  onRemoveModerator: () => void;
};

export const getVoteLabel = (participant: Participant, revealVotes: boolean): string => {
  if (!participant.vote) {
    return "No vote";
  }

  if (revealVotes) {
    return `Vote: ${participant.vote}`;
  }

  return "Voted";
};

export const useParticipantListActions = ({
  moderators,
  currentParticipantId,
  onRenameRequest,
  onBecomeModerator,
  onRemoveModerator,
}: UseParticipantListActionsParams) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleRenameClick = () => {
    closeMenu();
    onRenameRequest();
  };

  const handleModeratorSwitch = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked && !moderators.includes(currentParticipantId)) {
      onBecomeModerator();
      return;
    }

    if (!checked && moderators.includes(currentParticipantId)) {
      onRemoveModerator();
    }
  };

  return {
    menuAnchorEl,
    isMenuOpen: Boolean(menuAnchorEl),
    isCurrentUserModerator: moderators.includes(currentParticipantId),
    openMenu,
    closeMenu,
    handleRenameClick,
    handleModeratorSwitch,
  };
};
