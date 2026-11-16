import { SubmitHandler, useForm } from "react-hook-form"
import { WorkspaceInput, workspaceSchema } from "./workspace.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Stack } from "@mui/material"
import ControlField from "@/components/form/controller-field/control-field"


export interface WorkspaceFormProp {
    defaultValues ?: Partial<WorkspaceInput>
    onSuccess : (data : WorkspaceInput) => void,
    close : () => void
}
export default function WorkspaceForm ({
    onSuccess,
    defaultValues,
    close 
} : WorkspaceFormProp) {
    const {
        control,
        handleSubmit
    } = useForm<WorkspaceInput>({
        resolver : zodResolver(workspaceSchema),
        defaultValues
    })

    const onSubmit : SubmitHandler<WorkspaceInput> = (data) => {
        onSuccess(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <Stack spacing={2}>
                    <ControlField 
                        control={control}
                        label="Title"
                        name='title'
                        placeholder="Enter your Title"
                    />

                    <ControlField 
                        control={control}
                        multiline
                        label="description (optional)"
                        name = 'description'
                        placeholder="Enter the description"
                    />
                </Stack>
                <Stack spacing={2}>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                    <Button variant="outlined" onClick={close}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>

        </form>
    )
}