import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toCamelCase } from "../utils";

const PageBanner = ({ category }) => {
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  useEffect(() => {
    const url = document.location.toString().split("/");
    let state = url[url.length - 3];
    setState(state.toUpperCase())
    setLocation(toCamelCase(url[url.length - 2]));
    const service = url[url.length - 1];
    let serviceItems = service.split("-");
    let serviceUrl = "";
    for (let i = 0; i < serviceItems.length; i++) {
      serviceUrl += toCamelCase(serviceItems[i]) + " ";
    }
    setService(serviceUrl);
  });
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
                    {category} in {location}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container py-1">
        <h4 className="MuiTypography-body w-100 ml-0">
          Find the best local {" "}
          <b style={{ color: "#19B5BC" }}>
            {category} in {location}, {state}
          </b>
        </h4>
      </div>
    </>
  );
};
export default PageBanner;
