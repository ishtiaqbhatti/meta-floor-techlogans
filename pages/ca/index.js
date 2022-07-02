import React, { useState, useEffect } from 'react'
import Layout from "../../components/layout/Layout";
import Link from 'next/link'
import { Breadcrumb } from 'react-bootstrap'
import { getStrapiMedia } from "../../lib/media";
import { fetchAPI } from "../../lib/api";
import { useRouter } from "next/router";
import qs from 'qs'

const Capage = ({ candaCity }) => {
    const allStates = candaCity.data
    console.log("All City", candaCity)

    function uniqState(data, key) {
        return [
            ...new Map(
                data.map(x => [key(x), x])
            ).values()
        ]
    }

    const uniqueCities = uniqState(allStates, it => it.attributes.province_id);
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
                                Provinces
                            </Link>

                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <div className="banner_location text-center">
                <h2>We have a lot of listings</h2>
                <p>
                    For best results, we suggest choosing a location.
                </p>
            </div>
            <div className="ca_location py-5">
                <div className="container">
                    <h2 className='text-center main_heading'>
                        All Provinces
                    </h2>
                    <div className="row my-3">
                        {uniqueCities && uniqueCities.map((city) => {
                            // const slug = 
                            return (
                                <>
                                    <div className="col-lg-3 col-md-3 col-sm-4 col-6" key={city.id} >
                                        <div className="states_name my-2">
                                            <Link href={'/ca/' + city.attributes.province_id.toLocaleLowerCase()} className="links_state">
                                                {city?.attributes?.province_name}
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
export const query = qs.stringify({
    pagination: {
        page: 1,
        pageSize: 10000,
        withCount: false
    },
    populate: '*',
});

export const getStaticProps = async () => {
    const res = await fetchAPI(`/canada-cities?${query}`);
    return {
        props: {
            candaCity: res
        }
    }
}

export default Capage