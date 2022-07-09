import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaAngleDown } from "react-icons/fa"
import Autocomplete from "react-google-autocomplete"
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
import MainSearch from "./mainSearch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ category, cityInfo, setInfo }) => {
  const router = useRouter();

  const [name, setName] = useState({})
  console.log("Local Strodge", name)
  const [address, setAddress] = useState();

  console.log('Address', address)

  const getDeliveryUrl = async (e) => {

    e.preventDefault();
    localStorage.setItem('mainCityName', address);
    const currentCity = localStorage.getItem('mainCityName');
    setName(currentCity)
    const value = currentCity
    console.log("All Value", value)
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
      toast('Please type a city name correctly', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const city = getSlug(cityInfo.attributes.city_ascii);
      const province_id = cityInfo.attributes.province_id.toLowerCase();
      const newCityInfo = {
        province_id: province_id,
        city: city
      }
      setInfo(newCityInfo)
      // setItems(newCityInfo)
      if (category !== undefined) {
        router.push(`/ca/${province_id}/${city}/${category}`);
        router.reload(window.location.pathname)
      } else {
        router.push(`/ca/${province_id}/${city}`);
        router.reload(window.location.pathname)
      }
    }
  };

  return (
    <header className="header-area d-none d-xl-block">
      <div className="header-navigation">
        <div className="container-fluid">
          <div className="primary-menu">
            <div className="row">
              <div className="col-lg-2 col-2">
                <div className="site-branding">
                  <Link href="/">
                    <a>
                      <img
                        src="/assets/images/flooringmetaverselogo.png"
                        className="brand-logo"
                        alt="Brand Logo"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-10 col-10">
                <div className="nav-menu">
                  <div className="navbar-close">
                    <i className="ti-close"></i>
                  </div>
                  <nav className="main-menu">
                    <ul className="d-flex justify-content-end mt-2">
                      <Home />
                      <li className="menu-item has-children">
                        <Link href="#">
                          <a><span>Hardwood</span>
                            <span className="ml-2">
                              <FaAngleDown />
                            </span>
                          </a>
                        </Link>
                        <ul className="sub-menu">
                          <Hardwood cityInfo={cityInfo} />
                        </ul>
                      </li>
                      <li className="menu-item has-children">
                        <Link href="#">
                          <a><span>Laminate</span>
                            <span className="ml-2">
                              <FaAngleDown />
                            </span>
                          </a>
                        </Link>
                        <ul className="sub-menu">
                          <Laminate cityInfo={cityInfo} />
                        </ul>
                      </li>
                      <li className="menu-item has-children">
                        <Link href="#">

                          <a><span>Vinyl</span>
                            <span className="ml-2">
                              <FaAngleDown />
                            </span>
                          </a>
                        </Link>
                        <ul className="sub-menu">
                          <Vinyl cityInfo={cityInfo} />
                        </ul>
                      </li>
                      <li className="menu-item has-children">
                        <Link href="#">

                          <a><span>Tile</span>
                            <span className="ml-2">
                              <FaAngleDown />
                            </span>
                          </a>
                        </Link>
                        <ul className="sub-menu">
                          <Tile cityInfo={cityInfo} />
                        </ul>
                      </li>
                      <li className="menu-item has-children">
                        <Link href="#">

                          <a><span>Carpet</span>
                            <span className="ml-2">
                              <FaAngleDown />
                            </span>
                          </a>
                        </Link>
                        <ul className="sub-menu">
                          <Carpet cityInfo={cityInfo} />
                        </ul>
                      </li>
                      <Brands cityInfo={cityInfo} />
                      <Blog />
                      <div className="mr-5 mt-1">
                        <Link href="/listing-name">
                          <a className="btn-root login-btn">+ ADD LISTING</a>
                        </Link>
                      </div>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-1 col-md-1 col-sm-1 align-items-left">
                <div className="header-right-nav">
                  <ul className="d-flex align-items-center">
                    {/* <li>
                      <Link href="/">
                        <a className="icon">
                          <i className="flaticon-avatar"></i>
                        </a>
                      </Link>
                    </li> */}
                    <li className="nav-toggle-btn">
                      <div className="navbar-toggler">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
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
                      <div className="form-group">
                        <Autocomplete
                          name="address"
                          className="form_control"
                          placeholder="Search City"
                          required
                          apiKey={process.env.GOOGLE_API_KEY}
                          onPlaceSelected={(place) => {
                            console.log("placee", place)
                            setAddress(place?.address_components[0]?.long_name)
                          }}
                          options={{
                            types: ["geocode", "establishment",],
                            // componentRestrictions: { country: "CA" },
                          }}

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
    </header>
  );
};
export default Header;
