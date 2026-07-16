# Point Poker

## Goal

The goal of this project is to create a simple, easy to use, and free online tool for planning poker. Planning poker is a consensus-based technique for estimating, mostly used to estimate effort or relative size of development goals in software development.

## MVP

### Data Model

#### Participants: The people who join the game. Can point and see the points of other participants. Can be moderator
{
    id: string; (browser related)
    name: string;
    vote: string | null; (if null, the participant has not pointed yet)
}
#### Room: Where the pointing takes place. Participants can join the room by entering the room code. The room code is a random 6 character string. The room code is displayed to the participants.
{
    code: string;
    participants: {
        [participantId: string]: Participant;
    };
    revealVotes: boolean;
    moderators: string[]; (array of participant ids)
    createdAt: number; (timestamp for Firebase TTL)
}

### Rules and scope
- When a participant opens the application for the first time, a random UUID is generated and stored in localStorage. This identifier is reused across visits from the same browser.
- There will be no authentication or user accounts. The "identity" will be browser based. The participant will be identified by the browser they are using. If the participant opens the game in a different browser, they will be treated as a different participant.
- Participants can see if other participants have pointed, but not what they pointed until the moderator reveals the points.
- Available points: 1, 2, 3, 5, 8, ?, ☕️ (pass)
- Everyone can be moderator. For easy setup, the particpant that creates the room will be the moderator. Joiners will not be moderators by default. For practicality, everyone can be self appointed moderator.
- Everyone can change their name. The name is not unique. There can be multiple participants with the same name.
- Resetting points sets revealVotes to false and clears all participant votes (vote = null).
- Rooms are part of the URL

### Flows
- Room creation flow: Participant enters their name -> Participant creates a room -> Participant is set as moderator -> Code is displayed
- Joining room flow: Participant enters the room code -> Participant enters their name -> Participant joins the room
- Pointing flow: Participants point -> Moderator reveals the points -> Moderator resets the points -> Participants point again

### Pages
- Home page: Create or join a room
- Pointing page: Displays the room code, participants, and points. Moderator controls are available to reveal and reset points.


## Tech stack
- Frontend: React, Material UI
- Backend: Firebase (Firestore)

## Future improvements
- Change available points to be configurable by the moderator