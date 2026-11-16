import CreateWorkspace from "@/components/workspaces/create-workspace/create-workspace";
import ShowWorkspace from "@/components/workspaces/show-workspaces/show-workspaces";
import { Container, Stack, Typography } from "@mui/material";

export default function WorkspacePage ()  {
  return (
    <Container>
        <Stack direction={'row'} sx={{justifyContent:'space-between', alignContent:'center'}}>
          <Typography>
            WORKSPACE
          </Typography>
          <CreateWorkspace/>
        </Stack>

        <ShowWorkspace/>
    </Container>
  )
}

