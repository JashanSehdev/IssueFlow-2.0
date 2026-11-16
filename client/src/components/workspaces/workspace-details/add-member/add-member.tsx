"use client";
import AlertBox from "@/components/admin/alert/alertBox";
import SelectUsers from "@/components/select-users/select-user";
import { AdminUser } from "@/type/user.type";
import { Button, Card, CardContent, CardHeader, Paper, Stack } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


type Input = {
    members : AdminUser[]
}
export default function AddMember() {
  const { control, handleSubmit } = useForm<Input>();
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit : SubmitHandler<Input> = (data) => {
    const Ids = data.members.map((item) => item.id);

    //dispatch ids with ws Id
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Members</Button>
      <AlertBox open={open} handleClose={handleClose}>
        <Paper sx={{ minWidth: "200px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader title={"select Members"} />
              <CardContent>
                <Stack spacing={2}>
                    <SelectUsers control={control} />
                <Button variant="contained" type="submit">
                  Add Members
                </Button>
                </Stack>    
                
              </CardContent>
            </Card>

          </form>
        </Paper>
      </AlertBox>
    </>
  );
}
