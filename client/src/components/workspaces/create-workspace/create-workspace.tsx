'use client'
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import AlertBox from "../../admin/alert/alertBox";
import { useState } from "react";
import WorkspaceForm from "../workspaceForm/workspace-form";
import { useAppDispatch } from "@/features/store";
import { WorkspaceInput } from "../workspaceForm/workspace.type";
import { createWorkspaceAsync } from "@/features/workspace/handle-workspace/workspace.action";


export default function CreateWorkspace () {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch()

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleCreateWorkspace = (data : WorkspaceInput) => {
        dispatch(createWorkspaceAsync(data));
    }

    return (
        <>
            <Button onClick={handleOpen}>
                    Create Workspace
            </Button>
            <AlertBox open={open} handleClose={handleClose}>
                <Card>
                    <CardHeader title={"create workspace"}/>

                    <CardContent>
                        <WorkspaceForm onSuccess={handleCreateWorkspace} close={handleClose}/>
                    </CardContent>
                </Card>
            </AlertBox>
        </>
    )
}