import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toCamelCase } from "../utils";

const PageBannerCategory = ({ category }) => {

  return (
    <>
      <section className="hero-area">
        <div
          className="home-header"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="page-title">
                  <h1 className="MuiTypography-root MuiTypography-h1 ml-0">
                    {category} in Canada
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container py-1">
        <h4 className="MuiTypography-body w-100 ml-0">
          Find the best local <b style={{ color: "#19B5BC" }}> {category} in Canada </b>
        </h4>
      </div>
    </>
  );
};
export default PageBannerCategory;
