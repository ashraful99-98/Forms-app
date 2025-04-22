import React, { FC, useEffect, useState } from "react";
import { Box, Button, Modal, Snackbar, Alert } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useAuth } from "../../context/AuthContext";
import {
  AddBusinessRounded,
  AdminPanelSettingsOutlined,
  Block,
  Delete,
  Mail,
} from "@mui/icons-material";

type Props = {
  isTeam: boolean;
};

const UserTable: FC<Props> = ({ isTeam }) => {
  const { users, user, fetchAllUsers, updateUserRole, blockUser, unblockUser } =
    useAuth();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUniqueId, setSelectedUniqueId] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState("");

  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleDeleteUser = async () => {
    try {
      await blockUser(selectedUserId);
      setAlert({
        open: true,
        message: "User blocked successfully!",
        severity: "success",
      });
      setOpenDeleteModal(false);
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        message: "Failed to block user.",
        severity: "error",
      });
    }
  };

  const handleUpdateRole = async () => {
    try {
      await updateUserRole(selectedUniqueId, selectedUserRole);
      setAlert({
        open: true,
        message: "User role updated successfully!",
        severity: "success",
      });
      setOpenRoleModal(false);
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        message: "Failed to update user role.",
        severity: "error",
      });
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    {
      field: "updateRole",
      headerName: "Update Role",
      flex: 0.2,
      renderCell: (params) => {
        const row = params.row;
        return row.role === "admin" ? (
          <AdminPanelSettingsOutlined sx={{ fontSize: 22, color: "#1976d2" }} />
        ) : user?.role === "moderator" ? (
          <Button
            onClick={() => {
              setOpenRoleModal(true);
              setSelectedUniqueId(row.uniqueId);
              setSelectedUserRole("moderator");
            }}
          >
            <Block sx={{ fontSize: 22, color: "#f57c00" }} />
          </Button>
        ) : (
          <Button
            onClick={() => {
              setOpenRoleModal(true);
              setSelectedUniqueId(row.uniqueId);
              setSelectedUserRole("user");
            }}
          >
            <AddBusinessRounded sx={{ fontSize: 22, color: "#2e7d32" }} />
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Block",
      flex: 0.2,
      renderCell: (params) => (
        <Button
          onClick={() => {
            setOpenDeleteModal(true);
            setSelectedUserId(params.row.uniqueId);
          }}
        >
          <Delete sx={{ fontSize: 22, color: "#d32f2f" }} />
        </Button>
      ),
    },
    {
      field: "emailAction",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params) => (
        <a href={`mailto:${params.row.email}`}>
          <Mail sx={{ fontSize: 22, color: "#0288d1" }} />
        </a>
      ),
    },
  ];

  const rows = users
    .filter((user) =>
      isTeam ? ["admin", "moderator"].includes(user.role) : true
    )
    .map((user) => ({
      id: user._id,
      uniqueId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));

  return (
    <div
      style={{
        // backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        paddingTop: 30,
        paddingBottom: 40,
      }}
    >
      <Box m="20px">
        <Box
          m="40px 0 0 0"
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": { border: "1px solid #f5f7fa" },
            "& .MuiDataGrid-HeadersContainer": {
              backgroundColor: "#1976d2",
              color: "#000",
              fontSize: "16px",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1976d2",
              color: "#000",
              fontSize: "16px",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "#f2f2f2",
              color: "#333",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#1976d2",
              color: "#fff",
              borderTop: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #ccc",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#f5f7fa",
            },
          }}
        >
          <DataGrid rows={rows} columns={columns} />
        </Box>

        {/* Delete User Modal */}
        <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              color: "#333",
              padding: 4,
              borderRadius: 2,
              width: 400,
              boxShadow: 24,
            }}
          >
            <h2>Block User</h2>
            <p>Are you sure you want to block this user?</p>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteUser}
              >
                Block
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Update Role Modal */}
        <Modal open={openRoleModal} onClose={() => setOpenRoleModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              color: "#333",
              padding: 4,
              borderRadius: 2,
              width: 400,
              boxShadow: 24,
            }}
          >
            <h2>Update User Role</h2>
            <Box mt={2}>
              <select
                value={selectedUserRole}
                onChange={(e) => setSelectedUserRole(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  marginBottom: "20px",
                }}
              >
                <option value="student">User</option>
                {/* <option value="moderator">Moderator</option> */}
                <option value="admin">Admin</option>
              </select>
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenRoleModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleUpdateRole}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>

        {/* Snackbar Alert */}
        <Snackbar
          open={alert.open}
          autoHideDuration={4000}
          onClose={() => setAlert({ ...alert, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setAlert({ ...alert, open: false })}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default UserTable;
