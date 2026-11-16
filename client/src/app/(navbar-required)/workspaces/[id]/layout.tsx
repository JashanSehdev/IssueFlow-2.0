import WorkspaceDetails from "@/components/workspaces/workspace-details/workspace-detail";
import { Container } from "@mui/material";
import { ReactNode } from "react";

export default async function Layout ({params, children} : {params : Promise<{id : number}>, children : ReactNode}) {
    const {id} = await params;

    return(
        <Container>
            <WorkspaceDetails wsId={id}/>
            {children}
        </Container>
    )

}