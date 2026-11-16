import WorkspaceDetails from "@/components/workspaces/workspace-details/workspace-detail";
import { Container } from "@mui/material";

export default async function Workspace ({params} : {params : Promise<{id : number}>}) {
    const {id} = await params;

    return(
        <Container>
            {/* <WorkspaceDetails wsId={id}/> */}
        </Container>
    )
}