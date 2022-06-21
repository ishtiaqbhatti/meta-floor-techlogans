import React, { useState, useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import Link from 'next/link'
import { Breadcrumb } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { fetchAPI } from "../../../lib/api";
import { getStrapiMedia } from "../../../lib/media"
import Image from "next/image";
// import { Head } from "next/head";
import qs from 'qs'

const Citylocation = () => {

    const { query } = useRouter()

    const [service, setService] = useState('')
    const [topBusinesses, setTopBusinesses] = useState('');
    const [loading, setLoading] = useState(false)
    console.log("single Data", query.location)
    useEffect(() => {
        (async () => {
            const serviceRes = await fetchAPI(`/service-categories`, {
                filters: {
                    slug: query['slug'],
                },
                populate: ["image", "category", "writer.picture"],
            });
            setService(serviceRes.data);
        })();
    }, [])
    useEffect(() => {
        (async () => {
            setLoading(true);
            const businessRes = await fetchAPI(`/businesses`, {
                populate: "*"
            });
            setTopBusinesses(businessRes.data);
            setLoading(false)
        })();
    }, [])
    const stateName = query.state.toUpperCase();
    const locationName = query.location.toUpperCase().replace(/[^a-zA-Z ]/g, ' ');
    const cityName = query.location.replace(/[^a-zA-Z ]/g, ' ');

    const arr = cityName.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const capitalCity = arr.join(" ");

    console.log("router name", capitalCity);

    // Filter the business by City Name

    const filterCity = topBusinesses && topBusinesses?.filter(function (city) {
        return city.attributes.city === capitalCity;
    });
    console.log("State City name", filterCity);

    return (
        <>
            {/* <Head>
                <meta property="title" content={`Find Top-Rated Flooring Services in ${cityName},${query.state} - Flooring Metaverse`} key="title" />
            </Head> */}
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
                            <Breadcrumb.Item  >
                                <Link href={`/ca/${query.state}/${query.location}`}>
                                    {locationName}
                                </Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>

                <div className="banner_location py-5 text-center">
                    <h2>We have a lot of listings</h2>
                    <p>
                        Pick from specific flooring services in {locationName} below
                    </p>
                </div>
                <div className="ca_location py-5">
                    <div className="container">
                        <h3 className="main_heading">Flooring Contractors & Supplies in
                            {query.location.charAt(0).toUpperCase().replace(/[^a-zA-Z ]/g, " ") + query.location.slice(1).replace(/[^a-zA-Z ]/g, " ")}, {stateName} </h3>
                        <div className="row my-3">
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6">
                                <h3 className="category_name">
                                    Hardwood
                                </h3>
                                <div
                                >
                                    <div className="states_name my-2">
                                        <ul >
                                            {service && service.slice(0, 5).map((city) => {
                                                return (
                                                    <>

                                                        <li className="states_name" key={city.id} >
                                                            <Link href={`/ca/${stateName.toLocaleLowerCase()}/${query.location}/${city.attributes.slug}`} className="links_state">
                                                                {city?.attributes?.name}
                                                            </Link>
                                                        </li>
                                                    </>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6">
                                <h3 className="category_name">
                                    Laminate
                                </h3>
                                <div
                                >
                                    <div className="states_name my-2">
                                        <ul >
                                            {service && service.slice(5, 8).map((city) => {
                                                return (
                                                    <>

                                                        <li className="states_name" key={city.id} >
                                                            <Link href={`/ca/${stateName.toLocaleLowerCase()}/${query.location}/${city.attributes.slug}`} className="links_state">
                                                                {city?.attributes?.name}
                                                            </Link>
                                                        </li>
                                                    </>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6">
                                <h3 className="category_name">
                                    Vinyl
                                </h3>
                                <div
                                >
                                    <div className="states_name my-2">
                                        <ul >
                                            {service && service.slice(8, 13).map((city) => {
                                                return (
                                                    <>

                                                        <li className="states_name" key={city.id} >
                                                            <Link href={`/ca/${stateName.toLocaleLowerCase()}/${query.location}/${city.attributes.slug}`} className="links_state">
                                                                {city?.attributes?.name}
                                                            </Link>
                                                        </li>
                                                    </>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6">
                                <h3 className="category_name">
                                    Tile
                                </h3>
                                <div
                                >
                                    <div className="states_name my-2">
                                        <ul >
                                            {service && service.slice(13, 15).map((city) => {
                                                return (
                                                    <>

                                                        <li className="states_name" key={city.id} >
                                                            <Link href={`/ca/${stateName.toLocaleLowerCase()}/${query.location}/${city.attributes.slug}`} className="links_state">
                                                                {city?.attributes?.name}
                                                            </Link>
                                                        </li>
                                                    </>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-6">
                                <h3 className="category_name">
                                    Carpet
                                </h3>
                                <div
                                >
                                    <div className="states_name my-2">
                                        <ul >
                                            {service && service.slice(15, 19).map((city) => {
                                                return (
                                                    <>

                                                        <li className="states_name" key={city.id} >
                                                            <Link href={`/ca/${stateName.toLocaleLowerCase()}/${query.location}/${city.attributes.slug}`} className="links_state">
                                                                {city?.attributes?.name}
                                                            </Link>
                                                        </li>
                                                    </>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="listing_footer">Choose from the categories above to find the specific service for your needs. We have {service?.length} listings in {locationName}, so you are sure to find exactly what you’re looking for.</p>

                    </div>
                </div>
                <div className="container py-5">
                    {loading === true ? <p>Loading</p> :
                        <div className="">
                            {filterCity?.length == 0 ?
                                <p className="filter_business text-center">We apologize, we haven’t
                                    added any brands for your area quite yet. Please let your
                                    local business owners know to add themselves for FREE.
                                </p>
                                : (

                                    <>
                                        <div className="top_listing_busniess">
                                            <h3>Top Listings in {locationName}</h3>
                                        </div>
                                        <div className="row">
                                            {filterCity &&
                                                filterCity.map((brand, index) => {
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
            </Layout>
        </>

    )
}

export default Citylocation