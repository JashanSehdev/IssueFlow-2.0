'use client'
import useWorkspace from "@/hooks/use-workspace";
import { Workspace } from "@/type/workspace";
import { Card, CardContent, CardHeader, Chip, Stack, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export default function ShowWorkspace () {
    const {workspaces, loading} = useWorkspace();

    if (loading) {
        return( <Typography>Loading....</Typography>)
    }

    return (
        <Stack spacing={2}>
            {
                workspaces.map((ws) => <WsCard ws={ws} key={ws.id} /> )
            }
        </Stack>
    )
}


function WsCard ({ws} : {ws: Workspace}) {

    return (
        <Card>
            <CardHeader 
                title={ws.title}
                subheader = {`created by ` + ws.Owner.username}
                
            />
            <CardContent>
                <Chip
                    avatar={<PersonIcon/>}
                    label={ws.member_count}
                />
            </CardContent>
        </Card>
    )
}