import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { fetchAPI } from "../../lib/api";
import http from '../../components/http'
import { getStrapiMedia } from "../../lib/media";
import { parseCookies } from "nookies";
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'

const HomeComponent = () => {
  const [topBusinesses, setTopBusinesses] = useState("");
  const [topBrands, setTopBrands] = useState("");
  const [businesses, setBusinesses] = useState("");

  useEffect(() => {
    (async () => {
      const businesses = await fetchAPI("/businesses", {
        populate: "*"
      });
      const brands = await fetchAPI("/businesses", {
        filters: {
          services: 6,
        },
        populate: "*",
      });
      setTopBrands(brands.data);
      setTopBusinesses(businesses.data.slice(0, 4));
      setBusinesses(businesses.data);
    })();
  }, []);

  console.log("Business data", businesses)

  const totalStar = 5
  const activeStar = 4

  return (
    <div className="delivery-container container-fluid">
      <div className="delivery-body">
        <div className="delivery-content">
          <div className="delivery-header">
            <Image
              src="/assets/images/iconTopDeliveries.bba1b6f5.svg"
              alt="top-deliveries"
              width="100%"
              height="100%"
              className="top_deliveries"
            />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <h2 className="MuiTypography-root MuiTypography-h2 top_heading">
                TOP Flooring Brands
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {topBrands &&
            topBrands.map((brand, index) => {
              return (
                <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
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
                      {/* <span className="phone-meta">
                        <i className="ti-tablet" />
                        {brand.attributes.phone_number && (
                          <a href={`tel:${brand.attributes.phone_number}`}>
                            {brand.attributes.phone_number}
                          </a>
                        )}
                      </span> */}
                      <div className="listing-meta">
                        <ul>
                          <li>
                            <span className="card_address">
                              {/* <i className="ti-location-pin" /> */}
                              {brand.attributes && brand.attributes.address}

                            </span>
                          </li>
                        </ul>
                        <span className="reviews">
                          {[...new Array(totalStar)].map((arr, index) => {
                            return index < activeStar ? <span className="active_star">
                              <AiTwotoneStar size={24} />
                            </span> : <span><AiOutlineStar size={24} /></span>;
                          })}

                          (4.0) | 53 Reviews

                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="delivery-body">
        <div className="delivery-content">
          <div className="delivery-header">
            <Image
              src="/assets/images/iconPopular.8156dfc8.svg"
              alt="top-deliveries"
              width="100%"
              height="100%"
            />
            <div >
              <h2 className="MuiTypography-root MuiTypography-h2 top_heading">
                Top Services / Contractors from that location
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {topBusinesses &&
            topBusinesses.map((brand, index) => {
              return (
                <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
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

                      <div className="listing-meta">
                        <ul>
                          <li>
                            <span className="card_address">
                              {/* <i className="ti-location-pin" /> */}
                              {brand.attributes && brand.attributes.address}

                            </span>
                          </li>
                        </ul>
                        <span className="reviews">
                          {[...new Array(totalStar)].map((arr, index) => {
                            return index < activeStar ? <span className="active_star">
                              <AiTwotoneStar size={24} />
                            </span> : <span><AiOutlineStar size={24} /></span>;
                          })}

                          (4.0) | 53 Reviews

                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="delivery-body">
        <div className="delivery-content">
          <div className="delivery-header">
            <Image
              src="/assets/images/iconTopDeliveries.bba1b6f5.svg"
              alt="top-deliveries"
              width="100%"
              height="100%"
            />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <h2 className="MuiTypography-root MuiTypography-h2 top_heading">
                Everything you need for your floors and more
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {businesses &&
            businesses.map((brand) => {
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

                      <div className="listing-meta">
                        <ul>
                          <li>
                            <span className="card_address">
                              {/* <i className="ti-location-pin" /> */}
                              {brand.attributes && brand.attributes.address}

                            </span>
                          </li>
                        </ul>
                        <span className="reviews">
                          {[...new Array(totalStar)].map((arr, index) => {
                            return index < activeStar ? <span className="active_star">
                              <AiTwotoneStar size={24} />
                            </span> : <span><AiOutlineStar size={24} /></span>;
                          })}

                          (4.0) | 53 Reviews

                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

// export async function getServerSideProps({context}) {

//   const businesses = await fetchAPI("/businesses", {
//     populate: "*",
//   });

//   const brands = await fetchAPI("/businesses", {
//     filters: {
//       services: {
//         name: "Brand",
//       },
//     },
//     populate: "*",
//   });

//   return {
//     props: {
//       topBrands: brands.data,
//       topBusinesses: businesses.data.slice(0, 3),
//       businesses: businesses.data,
//     },
//   };
// }

export default HomeComponent;
