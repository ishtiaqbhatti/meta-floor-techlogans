

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { fetchAPI } from "../../lib/api";
import http from "../../components/http";
import { getStrapiMedia } from "../../lib/media";
import ImageView from "../image";
import { parseCookies } from "nookies";
import { BrandsCardData, FlooringBlogData, FlooringProjectData } from "../data";

import flooringCtaImage from "../../public/assets/images/flooring-cta-bg.jpg";
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'
// import "../../public/assets/css/home.css";

const HomeComponent = () => {
  const [topBusinesses, setTopBusinesses] = useState("");
  const [topBrands, setTopBrands] = useState("");
  const [businesses, setBusinesses] = useState("");
  const [article, setArticle] = useState('')
  useEffect(() => {
    (async () => {
      const articlesRes = await fetchAPI("/articles", {
        populate: "*",
      });
      setArticle(articlesRes?.data);
    })();
  }, [])

  console.log("All Blogs", article)

  useEffect(() => {
    (async () => {
      const businesses = await fetchAPI("/businesses", {
        populate: "*"
      });
      const brands = await fetchAPI("/businesses", {
        filters: {
          services: 6
        },
        populate: "*"
      });
      setTopBrands(brands.data);
      setTopBusinesses(businesses.data.slice(0, 4));
      setBusinesses(businesses.data);
    })();
  }, []);

  console.log("Business data", businesses);

  const totalStar = 5
  const activeStar = 4

  return (
    <div>
      <div className="flooring-project flooring-project-container container-fluid pt-20 pb-40">
        <p className="flooring-project-title text-center py-5">
          Start Your Flooring Project Today
        </p>
        <div className="row">
          {FlooringProjectData.map(
            ({ id, link, image, title, buttonText, buttonLink, target }) => {
              return (
                <Link href={link} passHref key={id}>
                  <div className="col-lg-3 col-md-6 col-sm-12 my-4 d-flex flex-column justify-content-center align-items-center">
                    <a target={target} rel="noreferrer">
                      <div className="flooring-project-card">
                        <div className="flooring-project-image">
                          <Image
                            src={image}
                            alt={title}
                            width="400px"
                            height="400px"
                          />
                        </div>
                        <div className="flooring-project-content text-center">
                          <p>
                            {title}
                          </p>
                          <Link href={buttonLink} className="btn">
                            {buttonText}
                          </Link>
                        </div>
                      </div>
                    </a>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>
      <div className="flooring-cta">
        <section className="flooring-cta-wrapper">
          <div className="flooring-cta-content">
            <p className="flooring-cta-title ">List Your Business</p>
            <span>
              Help potential customers find you by adding your business to our
              flooring directory. It’s free to join!
            </span>
            <Link href="/listing-name"> Add Your Business</Link>
          </div>
        </section>
      </div>

      <div className="flooring-top-brands-container container-fluid py-4">
        <div className="flooring-top-brands-wrapper text-center">
          <div className="flooring-top-brands-title">
            <p>TOP Flooring Brands</p>
          </div>
          <div className="flooring-top-title">
            <p>Browse Popular Flooring Categories</p>
          </div>
        </div>
        <div className="flooring-top-brands-card py-4">
          {BrandsCardData.map(({ id, link, img, title }) => {
            return (
              <Link href={link} passHref key={id}>
                <div className="flooring-card-scrolling">
                  <div className="flooring-card border-0">
                    <Image src={img} alt={title} width="250px" height="250px" />
                    <p>
                      {title}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="top-flooring-resources-container container-fluid pb-4">
        <p className="top-flooring-resources-title text-center pb-5">
          Top Flooring Resources
        </p>

        <div className="row">
          {article && article.map((blog) => {
            return (
              <Link href={`blog/${blog?.attributes?.slug}`} passHref key={blog?.id}>
                <div className="col-lg-4 col-md-4 col-sm-6 my-4">
                  <a target="blank_" rel="noreferrer">
                    <div className="top-flooring-resources-card">
                      <div className="top-flooring-resources-image">
                        {/* <ImageView image={blog?.attributes?.image} /> */}
                        <Image
                          src={getStrapiMedia(
                            blog?.attributes?.image
                          )}
                          alt="Listing Image"
                          width="700px"
                          height="500px"
                        />
                      </div>
                      <div className="top-flooring-resources-content text-center">
                        <p>
                          {blog?.attributes?.title}
                        </p>
                        <span>
                          {blog?.attributes?.description}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </Link>
            );
          }
          )}
        </div>
      </div>

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
                  <div className="col-lg-3 col-md-4 col-sm-6" key={brand.id}>
                    <div className="listing-item listing-grid-item-two mb-30">
                      <div className="listing-thumbnail">
                        <Link href={`/listing/${brand.attributes.slug}`}  >
                          <a className="card_image" target="blank_" rel="nofollow" >
                            <Image
                              src={getStrapiMedia(
                                brand.attributes.business_logo
                              )}
                              alt="Listing Image"
                              width="400px"
                              height="250px"
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="listing-content">
                        <h3 className="title">
                          <Link href={`/listing/${brand.attributes.slug}`} >
                            <a target="blank_" rel="nofollow">
                              {brand.attributes.name}
                            </a>
                          </Link>
                        </h3>
                        {/* <span className="phone-meta">
                          <i className="ti-tablet" />
                          {brand.attributes.phone_number &&
                            <a href={`tel:${brand.attributes.phone_number}`}>
                              {brand.attributes.phone_number}
                            </a>}
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
                          {/* <span className="reviews">
                            {[...new Array(totalStar)].map((arr, index) => {
                              return index < activeStar ? <span className="active_star">
                                <AiTwotoneStar size={24} />
                              </span> : <span><AiOutlineStar size={24} /></span>;
                            })}

                            (4.0) | 53 Reviews

                          </span> */}
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
              <div>
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
                          <a className="card_image" target="blank_" rel="nofollow">
                            <Image
                              src={getStrapiMedia(
                                brand.attributes.business_logo
                              )}
                              alt="Listing Image"
                              width="400px"
                              height="250px"
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="listing-content">
                        <h3 className="title">
                          <Link href={`/listing/${brand.attributes.slug}`}>
                            <a target="blank_" rel="nofollow">
                              {brand.attributes.name}
                            </a>
                          </Link>
                        </h3>
                        {/* <span className="phone-meta">
                          <i className="ti-tablet" />
                          {brand.attributes.phone_number &&
                            <a href={`tel:${brand.attributes.phone_number}`}>
                              {brand.attributes.phone_number}
                            </a>}
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
                          {/* <span className="reviews">
                            {[...new Array(totalStar)].map((arr, index) => {
                              return index < activeStar ? <span className="active_star">
                                <AiTwotoneStar size={24} />
                              </span> : <span><AiOutlineStar size={24} /></span>;
                            })}

                            (4.0) | 53 Reviews

                          </span> */}
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
              businesses.map(brand => {
                return (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={brand.id}>
                    <div className="listing-item listing-grid-item-two mb-30">
                      <div className="listing-thumbnail">
                        <Link href={`/listing/${brand.attributes.slug}`}>
                          <a className="card_image" target="blank_" rel="nofollow">
                            <Image
                              src={getStrapiMedia(
                                brand.attributes.business_logo
                              )}
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
                            <a target="blank_" rel="nofollow">
                              {brand.attributes.name}
                            </a>
                          </Link>
                        </h3>
                        {/* <span className="phone-meta">
                          <i className="ti-tablet" />
                          {brand.attributes.phone_number &&
                            <a href={`tel:${brand.attributes.phone_number}`}>
                              {brand.attributes.phone_number}
                            </a>}
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
                          {/* <span className="reviews">
                            {[...new Array(totalStar)].map((arr, index) => {
                              return index < activeStar ? <span className="active_star">
                                <AiTwotoneStar size={24} />
                              </span> : <span><AiOutlineStar size={24} /></span>;
                            })}

                            (4.0) | 53 Reviews

                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
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