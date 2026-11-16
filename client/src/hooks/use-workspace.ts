'use client'
import { useAppDispatch } from "@/features/store"
import { fetchWorkspacesAsync } from "@/features/workspace/handle-workspace/workspace.action"
import { Workspace } from "@/type/workspace"
import { useCallback, useEffect, useState } from "react"


export default function useWorkspace () {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()

     const fetchWorkspaces = useCallback(async() =>{
        setLoading(true)
        const result = await dispatch(fetchWorkspacesAsync());
        if (fetchWorkspacesAsync.fulfilled.match(result)) {
            setWorkspaces(result.payload.data)
        }
        setLoading(false)
     },[dispatch])


    useEffect(()=>{
        fetchWorkspaces()
    },[fetchWorkspaces])
    return {
        workspaces,
        loading
    }
}