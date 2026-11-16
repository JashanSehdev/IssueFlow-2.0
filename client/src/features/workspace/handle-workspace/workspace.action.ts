import { api, getErrorMessage } from "@/api/api"
import { WorkspaceInput } from "@/components/workspaces/workspaceForm/workspace.type"
import { FilterRequest, PaginationResponse, ResponseType } from "@/type/meta.type"
import { Workspace } from "@/type/workspace"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { enqueueSnackbar } from "notistack"

export const createWorkspaceAsync = createAsyncThunk <ResponseType<Workspace>, WorkspaceInput>(
    'workspace/create',
    async(data, thunkApi) => {
        try {
            const response = await api.post("/workspaces", data)
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error))
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

export const fetchWorkspacesAsync = createAsyncThunk <PaginationResponse<Workspace>, FilterRequest | void>(
    'workspace/fetch',
    async(data, thunkApi) => {
        try {
            const response = await api.get("/workspaces", {params : data})
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error))
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

export const fetchWorkspaceAsync = createAsyncThunk <ResponseType<Workspace>, number>(
    'workspace/fetch_',
    async(wsId, thunkApi) => {
        try {
            const response = await api.get("/workspaces/" + wsId)
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error))
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)