import Link from "next/link";
import React from "react";
import Layout from "../../components/layout/Layout";
import ServiceTemplateCategory from "../../components/serviceTemplateCategory";

const LaminateStore = () => {
  return (
    <Layout category={"laminate-floor-store"}>
      <ServiceTemplateCategory category={"Laminate Flooring Store"} />
    </Layout>
  );
};
export default LaminateStore;
