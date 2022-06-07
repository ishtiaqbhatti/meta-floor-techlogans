import React from 'react'
import Layout from "../../../../components/layout/Layout";
import ServiceTemplate from "../../../../components/serviceTemplate";
import Link from 'next/link'
import { useRouter } from 'next/router'
const Service = () => {
    const { query } = useRouter()
    console.log("All Slugs", query)
    const categorySlug = query.service
    const category = query.service.replace(/[^a-zA-Z ]/g, ' ');
    const arr = category.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const capitalCategory = arr.join(" ");

    return (
        <Layout category={query.service}>
            <ServiceTemplate category={capitalCategory} stateBread={query.state} stateLocation={query.location} stateName={stateName} location={locationName} />
        </Layout>
    )
}

export default Service