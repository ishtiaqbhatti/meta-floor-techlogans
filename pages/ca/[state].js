import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Link from 'next/link'
import { Breadcrumb } from 'react-bootstrap'
import { getStrapiMedia } from "../../lib/media";
import { useRouter } from 'next/router'
import { fetchAPI } from "../../lib/api";
import { Image } from "next/image";
import qs from 'qs'

const CityState = () => {
    const { query } = useRouter()

    const [cityName, setCityName] = useState('')
    const [topBusinesses, setTopBusinesses] = useState('');
    console.log("single Data", topBusinesses)


    useEffect(() => {
        (async () => {
            const articlesRes = await fetchAPI(`/canada-cities?`, {
                filters: {
                    slug: query['province_id'],
                },
                pagination: {
                    page: 17,
                    pageSize: 10000,
                    // withCount: false
                },
                populate: ["image", "category", "writer.picture"],
            });
            setCityName(articlesRes.data);
        })();
    }, [])
    useEffect(() => {
        (async () => {
            const businessRes = await fetchAPI(`/businesses`, {
                populate: "*"
            });
            setTopBusinesses(businessRes.data);
        })();
    }, [])
    const stateName = query.state.toUpperCase();
    console.log("router name", stateName);

    const filterState = cityName && cityName?.filter(function (city) {
        return city.attributes.province_id === stateName.toUpperCase();
    });
    console.log("State City name", filterState);

    const filterBusiness = topBusinesses && topBusinesses?.filter(function (city) {
        return city.attributes.state === filterState[0]?.attributes?.province_name;
    });
    console.log("State City name", filterBusiness);

    return (
        <Layout>
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
                    </Breadcrumb>
                </div>
            </div>
            <div className="banner_location py-5 text-center">
                <h2>We have a lot of listings</h2>
                <p>
                    For best results, we suggest choosing a location in {stateName}.
                </p>
            </div>
            <div className="ca_location py-5">
                <div className="container">
                    <h2 className="main_heading text-center">
                        All Cities Of the {filterState[0]?.attributes?.province_name}
                    </h2>
                    <p className="main_title_intro">
                        Pick your closest location to find flooring services and supplies anywhere in {filterState[0]?.attributes?.province_name}. There are professional flooring contractors ready to serve you, as well as flooring stores which have a large selection of products to suit your needs.
                    </p>
                    <div className="row my-3">
                        {filterState && filterState.map((city) => {
                            return (
                                <>
                                    <div className="col-lg-3 col-md-3 col-sm-4 col-6"
                                        key={city.id}
                                    >
                                        <div className="states_name my-2">
                                            <Link href={`/ca/${city.attributes.province_id.toLocaleLowerCase()}/${city.attributes.city_ascii.toLocaleLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}
                                            >
                                                {city?.attributes?.city_ascii}

                                            </Link>
                                        </div>
                                    </div>
                                </>

                            )
                        })}

                    </div>
                </div>
            </div>

            <div className="container py-5">

                {filterBusiness?.length == 0 ?
                    <p className="filter_business text-center">We apologize, we haven’t
                        added any brands for your area quite yet. Please let your
                        local business owners know to add themselves for FREE.
                    </p>
                    : (

                        <>
                            <div className="top_listing_busniess">
                                <h3>Top Listings in {filterState[0]?.attributes?.province_name}</h3>
                            </div>
                            <div className="row">

                                {filterBusiness &&
                                    filterBusiness?.map((brand, index) => {
                                        return (
                                            <>
                                                <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                                                    <div className="listing-item listing-grid-item-two mb-30">
                                                        <div className="listing-thumbnail">
                                                            <Link href={`/listing/${brand.attributes.slug}`}>
                                                                <a className="">
                                                                    <img
                                                                        src={brand.attributes.business_logo?.data?.attributes?.url}
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
                                                                            , CANADA
                                                                        </span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>

                                        );
                                    })}
                            </div>


                        </>

                    )}

            </div>



        </Layout>
    )
}


export default CityState