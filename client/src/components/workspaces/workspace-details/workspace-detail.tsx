'use client'
import { useAppDispatch } from "@/features/store";
import { fetchWorkspaceAsync } from "@/features/workspace/handle-workspace/workspace.action";
import { Workspace } from "@/type/workspace";
import { Box, CardHeader, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Members from "./members/member";



export default function WorkspaceDetails ({wsId} : {wsId : number}) {
    const [ws, setWs] = useState<Workspace | null>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
      const fetchWs = async() => {
        const result = await dispatch(fetchWorkspaceAsync(wsId));
        console.log(result)
        if (fetchWorkspaceAsync.fulfilled.match(result)) {
            setWs(result.payload.data)
        }

      }

      fetchWs()
    
   
    }, [dispatch, wsId])

    console.log("workspace",ws)
    
    if(!ws) {
        return(
            <Typography variant="h1"> 404 Not found</Typography>
        )
    }

    return (
        <Box>
            <CardHeader title={ws.title}/>
            <Members/>
        </Box>
    )
}