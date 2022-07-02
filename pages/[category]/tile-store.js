import Link from "next/link";
import React from "react";
import Layout from "../../components/layout/Layout";
import ServiceTemplateCategory from "../../components/serviceTemplateCategory";

const TileStore = () => {
  return (
    <Layout category={"tile-store"}>
      <ServiceTemplateCategory category={"Tile Store"} />
    </Layout>
  );
};
export default TileStore;
