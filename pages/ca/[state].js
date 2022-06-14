import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Link from 'next/link'
import { Breadcrumb } from 'react-bootstrap'
import { getStrapiMedia } from "../../lib/media";
import { useRouter } from 'next/router'
import { fetchAPI } from "../../lib/api";
import qs from 'qs'

const CityState = () => {
    const { query } = useRouter()

    const [cityName, setCityName] = useState('')
    console.log("single Data", cityName)


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
    const stateName = query.state.toUpperCase();
    console.log("router name", stateName);

    const filterState = cityName && cityName?.filter(function (city) {
        return city.attributes.province_id === stateName.toUpperCase();
    });
    console.log("State City name", filterState);

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
        </Layout>
    )
}


export default CityState