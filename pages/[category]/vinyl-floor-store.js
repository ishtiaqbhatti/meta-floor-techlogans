import Link from "next/link";
import React from "react";
import Layout from "../../components/layout/Layout";
import ServiceTemplateCategory from "../../components/serviceTemplateCategory";

const VinylStore = () => {
  return (
    <Layout category={"vinyl-floor-store"}>
      <ServiceTemplateCategory category={"Vinyl Flooring Store"} />
    </Layout>
  );
};
export default VinylStore;
