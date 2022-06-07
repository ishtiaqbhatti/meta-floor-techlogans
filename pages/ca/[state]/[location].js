import React, { useState, useEffect } from "react";
import Layout from "../../../components/layout/Layout";
import Link from 'next/link'
import { Breadcrumb } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { fetchAPI } from "../../../lib/api";
import qs from 'qs'

const Citylocation = () => {

    const { query } = useRouter()

    const [service, setService] = useState('')
    console.log("single Data", service)
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
    const stateName = query.state.toUpperCase();
    const locationName = query.location.toUpperCase().replace(/[^a-zA-Z ]/g, ' ');
    console.log("router name", query.location);

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
                                States
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
                    For best results, we suggest choosing a location in  .
                </p>
            </div>
            <div className="ca_location py-5">
                <div className="container">
                    <h3 className="main_heading">We Provide The Serives in {query.location.charAt(0).toUpperCase().replace(/[^a-zA-Z ]/g, " ") + query.location.slice(1).replace(/[^a-zA-Z ]/g, " ")} </h3>
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
                </div>
            </div>
        </Layout>
    )
}

export default Citylocation