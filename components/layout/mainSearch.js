import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaAngleDown } from "react-icons/fa"
import React, { useEffect, useState } from "react";
import {
    Home,
    Hardwood,
    Laminate,
    Vinyl,
    Tile,
    Carpet,
    Brands,
    Blog,
} from "./Menu";
import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";
import { fetchAPI } from "../../lib/api";
import { getSlug, toCamelCase } from "../utils";

const MainSearch = () => {

    const router = useRouter();

    const getDeliveryUrl = async (e) => {
        e.preventDefault();
        const value = toCamelCase(e.target.location.value);
        const cityInfoItems = await fetchAPI("/canada-cities", {
            filters: {
                city_ascii: {
                    $contains: value,
                },
            },
            populate: "*",
        });
        const cityInfo = cityInfoItems.data[0];
        if (cityInfo == undefined) {
            alert("Please type a city name correctly");
        } else {
            const city = getSlug(cityInfo.attributes.city_ascii);
            const province_id = cityInfo.attributes.province_id.toLowerCase();
            const newCityInfo = {
                province_id: province_id,
                city: city
            }
            setInfo(newCityInfo)
            if (category !== undefined) {
                router.push(`/ca/${province_id}/${city}/${category}`);
            } else {
                router.push("#");
            }
        }
    };


    return (
        <>
            <div className="header-top">
                <div className="container-fluid">
                    <div
                        className="hero-search-wrapper wow fadeInUp"
                        wow-data-delay="70ms"
                    >
                        <form onSubmit={getDeliveryUrl}>
                            <div className="row">
                                <div className="col-lg-9 col-md-12 col-sm-12 col-12 mx-auto py-4">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-12">
                                            <div className="my-3">
                                                <strong className="mx-4 pt-5">Browsing Services For: </strong>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-8">
                                            <div
                                                className="form_group justify-content-center align-items-center"
                                                style={{ width: "100%" }}
                                            >
                                                <i style={{ zIndex: 1 }}>
                                                    <RoomIcon />
                                                </i>
                                                <input
                                                    type="text"
                                                    className="form_control"
                                                    placeholder="City Name"
                                                    name="location"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-4 mt-2">
                                            <input
                                                type="submit"
                                                value="Search"
                                                className="btn-root register-btn"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default MainSearch