import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const MetaData = ({title}) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>AuraBazaar</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaData;
