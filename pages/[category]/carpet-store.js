import Link from "next/link";
import React from "react";
import Layout from "../../components/layout/Layout";
import ServiceTemplateCategory from "../../components/serviceTemplateCategory";

const CarpetStore = () => {
  return (
    <Layout category={"carpet-store"}>
      <ServiceTemplateCategory category="Carpet Store" />
    </Layout>
  );
};
export default CarpetStore;
