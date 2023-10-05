import React, { useEffect, Fragment } from "react";
import {
  getAdminProducts,
  clearErrors,
  deleteProduct,
} from "../../redux/actions/productAction";
import "./ProductList.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, TableRow } from "@material-ui/core";
import MetaData from "../Metadata/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { Table, TableHead, TableBody, TableCell } from "@material-ui/core";
import Loading from "../Loading/Loading";

const ProductList = () => {
  const Dispatch = useDispatch();
  const Alert = useAlert();

  const { loading, error, products } = useSelector((state) => state.Products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (error) {
      Alert.error(error);
      Dispatch(clearErrors());
    }
    if (deleteError) {
      Alert.error(deleteError);
      Dispatch(clearErrors());
    }
    if (isDeleted) {
      Alert.success("Product Deleted");
      Dispatch({
        type: "DELETE_PRODUCT_RESET",
      });
    }
    Dispatch(getAdminProducts());
  }, [error, Dispatch, Alert, deleteError, isDeleted]);

  const delteProductHandler = (id) => {
    Dispatch(deleteProduct(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Products - Admin"} />
      <div className="dashboard">
        <Sidebar />
        {loading ? (
          <div className="productListContainer">
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",fontSize:"23px"}}>Loading.......</div>
          </div>
        ) : (
          <div className="productListContainer">
            <h1 id="productListHeading">All Products</h1>

            <Table>
              <TableHead style={{ backgroundColor: "rgb(5, 135, 241)" }}>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  {window.innerWidth > 470 ? <TableCell>Stock</TableCell> : ""}
                  {window.innerWidth > 900 ? <TableCell>Id</TableCell> : ""}
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products.map((product) => (
                    <TableRow key={product._id} className="TableBodyHover">
                      <TableCell>
                        <img
                          width={window.innerWidth > 500 ? "70px" : "30px"}
                          src={product.images[0].url}
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      {window.innerWidth > 470 ? (
                        <TableCell>{product.Stock}</TableCell>
                      ) : (
                        ""
                      )}
                      {window.innerWidth > 900 ? (
                        <TableCell>{product._id}</TableCell>
                      ) : (
                        ""
                      )}

                      <TableCell>{product.price}</TableCell>
                      <TableCell style={{ minWidth: "120px" }}>
                        <Link
                          style={{ color: "green" }}
                          to={`/admin/product/${product._id}`}
                        >
                          <EditIcon />
                        </Link>

                        <Button
                          onClick={() => delteProductHandler(product._id)}
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
        )}
      </div>
    </Fragment>
  );
};

export default ProductList;
