import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CreateRoomForm from "~/home/ui/components/CreateRoomForm";
import JoinRoomForm from "~/home/ui/components/JoinRoomForm";
import { useHomePage } from "~/home/ui/pages/useHomePage";

const HomePage = () => {
  const {
    createName,
    joinName,
    roomCode,
    createError,
    joinRoomCodeError,
    joinNameError,
    isCreating,
    isJoining,
    setCreateName,
    setJoinName,
    setRoomCode,
    handleCreateRoom,
    handleJoinRoom,
  } = useHomePage();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h3" component="h1">
          Point Poker
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create a room or join an existing one to start estimating together.
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CreateRoomForm
              name={createName}
              isSubmitting={isCreating}
              errorMessage={createError}
              onNameChange={setCreateName}
              onSubmit={handleCreateRoom}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <JoinRoomForm
              roomCode={roomCode}
              name={joinName}
              isSubmitting={isJoining}
              roomCodeErrorMessage={joinRoomCodeError}
              nameErrorMessage={joinNameError}
              onRoomCodeChange={setRoomCode}
              onNameChange={setJoinName}
              onSubmit={handleJoinRoom}
            />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default HomePage;
