import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Title from "./layout/Title";
import PageBanner from "./layout/PageBanner";
import { Breadcrumb } from "react-bootstrap";
import BrandComponent from './Brand/Brand';
import ServiceTemplateFooter from './serviceTemplateFooter'
import { toCamelCase } from "./utils"
import { useRouter } from 'next/router'
import { fetchAPI } from "../lib/api";
import Image from 'next/image'
import { getStrapiMedia } from "../lib/media"

const ServiceTemplate = ({ category }) => {
  const { query } = useRouter()
  // const [city, setCity] = useState("")
  const [topBusinesses, setTopBusinesses] = useState('');
  const [loading, setLoading] = useState(false);
  const stateName = toCamelCase(query.state);
  const locationName = toCamelCase(query.location);
  const [categoryName, setCategoryName] = useState('')

  // useEffect(() => {
  //   const url = document.location.toString().split("/");
  //   const state = url[url.length - 3].toUpperCase();
  //   const city = toCamelCase(url[url.length - 2]);
  //   console.log("CITY ", city)
  //   setCity(city)
  // })


  useEffect(() => {
    (async () => {
      setLoading(true);
      const serviceRes = await fetchAPI(`/service-categories`, {
        filters: {
          name: category,
        },
        populate: ["image", "category", "writer.picture"],
      });
      if (serviceRes?.data[0]) {
        setCategoryName(serviceRes.data[0]);
        (async () => {
          const url = document.location.toString().split("/");
          const city = toCamelCase(url[url.length - 2]);
          const businessRes = await fetchAPI(`/businesses`, {
            filters: {
              // $or: [{ city: city }, { service_categories: serviceRes.data[0].id }]
              service_categories: serviceRes.data[0].id,
              city: city
            },
            populate: "*",
          });
          setTopBusinesses(businessRes.data);
          setLoading(false);
        })();
      }
    })();
  }, [])



  console.log("Top Business", topBusinesses)

  return (
    <>
      <div className="bread">
        <div className="container">
          <Breadcrumb>
            <Breadcrumb.Item >
              <Link href="/">
                Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
              <Link href="/ca">
                Province
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item  >
              <Link href={`/ca/${query.state}`}>
                {stateName}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item  >
              <Link href={`/ca/${query.state}/${query.location}`}>
                {locationName}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item  >
              <Link href={`/ca/${query.state}/${query.location}/${category.toLocaleLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}>
                {category}
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <PageBanner category={category} />
      <Title />
      <div className="container py-5">
        {loading === true ? <p>Loading...</p> :
          <div className="">
            {topBusinesses?.length == 0 ?
              <p className="filter_business ">We apologize, we haven’t
                added any brands for your area quite yet. Please let your
                local business owners know to add themselves for FREE.
              </p>
              : (

                <>
                  <div className="top_listing_busniess">
                    <h3>Top Listings in {locationName}</h3>
                  </div>
                  <div className="row">
                    {topBusinesses &&
                      topBusinesses?.map((brand, index) => {
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
                                      height="250px"
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
                                        , CANADA
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
                </>
              )}

          </div>
        }




      </div>
      {/* <BrandComponent category={category} city={city} /> */}
      <ServiceTemplateFooter />

    </>
  );
};





export default ServiceTemplate;