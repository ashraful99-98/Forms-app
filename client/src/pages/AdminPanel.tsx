import React from "react";
import { Container } from "@mui/material";
import AdminHeader from "../Components/Admin/AdminHeader";
import UserTable from "../Components/Admin/UserTable";

const AdminPanel: React.FC = () => {
  return (
    <>
      {/* <AdminHeader /> */}

      {/* <Container maxWidth="lg"> */}
      <UserTable isTeam={false} />
      {/* </Container> */}
    </>
  );
};

export default AdminPanel;
