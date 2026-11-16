import { api, getErrorMessage } from "@/api/api"
import { ProfileOutput } from "@/components/profile/edit-profile/edit-profile-form/edit-profile.type"
import { RootState } from "@/features/store"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { enqueueSnackbar } from "notistack"


export const createProfileAsync = createAsyncThunk <unknown, ProfileOutput, {state: RootState}>(
    'user/create-profile',
    async(data, thunkApi) => {
        try {
            const state = thunkApi.getState()
            const response = await api.post(`users/${state.auth.user?.id}/profile`, data)
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error))
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)