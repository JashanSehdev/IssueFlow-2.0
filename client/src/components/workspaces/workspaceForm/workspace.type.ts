import z from "zod";

export const workspaceSchema = z.object({
    title : z.string().min(4, 'title atleast contain 4 character'),
    description : z.string().optional() 
})

export type WorkspaceInput = z.infer<typeof workspaceSchema>
