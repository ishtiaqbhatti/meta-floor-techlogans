import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Title from "./layout/Title";
import PageBanner from "./layout/PageBanner";
import { Breadcrumb } from "react-bootstrap";
import BrandComponent from './Brand/Brand';
import ServiceTemplateFooter from './serviceTemplateFooter'
import { toCamelCase } from "./utils"
import { useRouter } from 'next/router'

const ServiceTemplate = ({ category, }) => {
  const { query } = useRouter()
  console.log("All Slugs", query)
  const [city, setCity] = useState("")
  const stateName = toCamelCase(query.state);
  const locationName = toCamelCase(query.location);
  useEffect(() => {
    const url = document.location.toString().split("/");
    const state = url[url.length - 3].toUpperCase();
    const city = toCamelCase(url[url.length - 2]);
    setCity(city)
  })
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
      <BrandComponent category={category} city={city} />
      <ServiceTemplateFooter />
    </>
  );
};

export default ServiceTemplate;