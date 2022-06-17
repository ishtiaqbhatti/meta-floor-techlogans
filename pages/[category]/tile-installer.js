import React from "react";
import Layout from "../../components/layout/Layout";
import ServiceTemplateCategory from "../../components/serviceTemplateCategory";

const TileInstaller = () => {
  return (
    <Layout category={"tile-installer"}>
      <ServiceTemplateCategory category={"Tile Installer"} />
    </Layout>
  );
};

export default TileInstaller;