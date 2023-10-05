import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.scss"
import MetaData from "../Metadata/MetaData.jsx";


const Search = () => {
  const Navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandlerf = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      Navigate(`/products/${keyword}`);
    } else {
      Navigate("/products");
    }
  };
  return (
    <Fragment>
                <MetaData title={`Search A Product-- AuraBazaar`} />

      <form className="searchBox" onSubmit={searchSubmitHandlerf}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
