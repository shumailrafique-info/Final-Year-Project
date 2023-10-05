import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import MetaData from "../Metadata/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../redux/actions/userAction.js";

const UsersList = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      Navigate("/admin/users");
      dispatch({ type: "DELETE_USER_RESET" });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, Navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.6,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          {/* <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          /> */}

          <Table>
            <TableHead style={{ backgroundColor: "rgb(5, 135, 241)" }}>
              <TableRow>
                {window.innerWidth > 950 ? <TableCell>id</TableCell> : ""}
                <TableCell>Email</TableCell>
                {window.innerWidth > 585 ? <TableCell>Name</TableCell> : ""}

                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {users &&
                users.map((user) => (
                  <TableRow key={user._id} className="TableBodyHover">
                    {window.innerWidth > 950 ? (
                      <TableCell>{user._id}</TableCell>
                    ) : (
                      ""
                    )}
                    <TableCell>{user.email}</TableCell>
                    {window.innerWidth > 585 ? (
                      <TableCell>{user.name}</TableCell>
                    ) : (
                      ""
                    )}

                    <TableCell
                      style={{
                        color: user.role === "admin" ? "green" : "red",
                      }}
                    >
                      {user.role}
                    </TableCell>

                    <TableCell style={{ minWidth: "120px" }}>
                      <Link
                        style={{ color: "green" }}
                        to={`/admin/user/${user._id}`}
                      >
                        <EditIcon />
                      </Link>

                      <Button
                        onClick={() => deleteUserHandler(user._id)}
                        style={{ color: "red" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
