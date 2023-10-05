import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.scss";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, newProduct } from "../../redux/actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../Metadata/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const Alert = useAlert();

  const { loading, error, success, message } = useSelector(
    (state) => state.newProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [Category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState();
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Jewelry",
    "Hats and Caps",
    "Watches",
    "Hand Bags",
    "Perfumes",
    "Foot Wears",
    "Top",
    "Bottoms",
    "Attire",
  ];

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearErrors);
    }
    if (message) {
      Alert.error(message);
    }
    if (success) {
      Alert.success("Product Created Successfully");
      Navigate("/admin/dashboard");
      dispatch({ type: "NEW_PRODUCT_RESET" });
    }
  }, [Alert, dispatch, error, success, Navigate, message]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", Category);
    myForm.set("Stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    for (const value of myForm.entries()) {
    }

    dispatch(newProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      setImages(files);

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"Create Product - Admin"} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            onSubmit={createProductSubmitHandler}
            className="createProductForm"
            encType="multipart/form-data"
            style={{ minWidth: "300px" }}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select required onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div id="createProductFormFile">
              <input
                multiple
                type="file"
                required
                accept="image/*"
                onChange={createProductImagesChange}
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img src={image} key={index} alt="Avatar Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              {loading && loading ? "Creating..." : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
