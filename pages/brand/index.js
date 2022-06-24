import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout/Layout";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

const Brand = () => {
  const [businesses, setBusiness] = useState("");
  useEffect(() => {
    (async () => {
      const businesses = await fetchAPI("/businesses", {
        filters: {
          services: 6,
        },
        populate: "*",
      });
      setBusiness(businesses.data);
    })();
  }, []);
  console.log("All Business", businesses)
  return (
    <Layout>
      <div className="home-header">
        <div className="home-header-content">
          <div className="home-header-body">
            <h1
              style={{ width: "80%" }}
              className="MuiTypography-root MuiTypography-h1 MuiTypography-alignLeft"
            >
              Discover Top Flooring Brands
            </h1>
          </div>
        </div>
      </div>
      <div className="delivery-container container-fluid">
        <div className="delivery-body">
          <div className="delivery-content">
            <div className="delivery-header">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <h2 className="MuiTypography-root MuiTypography-h2 top_heading my-3">
                  TOP Flooring Brands
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            {businesses &&
              businesses.map((brand, index) => {
                return (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={brand.id}>
                    <div className="listing-item listing-grid-item-two mb-30">
                      <div className="listing-thumbnail">
                        <Link href={`/listing/${brand.attributes.slug}`}>
                          <a className="">
                            <Image
                              src={getStrapiMedia(brand.attributes.business_logo)}
                              alt="Listing Image"
                              width="400px"
                              height="200px"
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="listing-content">
                        <h3 className="title">
                          <Link href={`/listing/${brand.attributes.slug}`}>
                            <a>{brand.attributes.name}</a>
                          </Link>
                        </h3>
                        <span className="phone-meta">
                          <i className="ti-tablet" />
                          {brand.attributes.phone_number && (
                            <a href={`tel:${brand.attributes.phone_number}`}>
                              {brand.attributes.phone_number}
                            </a>
                          )}
                        </span>
                        <div className="listing-meta">
                          <ul>
                            <li>
                              <span>
                                <i className="ti-location-pin" />
                                {brand.attributes && brand.attributes.address}

                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Brand;
