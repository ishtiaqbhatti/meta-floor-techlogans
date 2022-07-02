import Link from "next/link";
import React from "react";
import Layout from "../../components/layout/Layout";
import ServiceTemplateCategory from "../../components/serviceTemplateCategory";

const HardwoodStore = () => {
  return (
    <Layout category={"hardwood-floor-store"}>
      <ServiceTemplateCategory category={"Hardwood Floor Store"} />
    </Layout>
  );
};
export default HardwoodStore;
