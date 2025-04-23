import React from "react";
import { Container } from "@mui/material";
import AdminHeader from "./AdminHeader";
import UserTable from "./UserTable";

const AdminTable: React.FC = () => {
  return (
    <>
      <AdminHeader />

      <Container maxWidth="lg">
        <UserTable isTeam={true} />
      </Container>
    </>
  );
};

export default AdminTable;
