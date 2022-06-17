import React from "react";
import Layout from "../../components/layout/Layout";
import ServiceTemplateCategory from "../../components/serviceTemplateCategory";

const CarpetCleaning = () => {
  return (
    <Layout category={"carpet-cleaning"}>
      <ServiceTemplateCategory category={"Carpet Cleaning"} />
    </Layout>
  );
};

export default CarpetCleaning;