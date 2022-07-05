import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "react-google-autocomplete"

import { fetchAPI } from "../../lib/api";
import { getSlug } from "../utils";
import MainSearch from "./mainSearch";

const MobileMenu = ({ category, cityInfo, setInfo }) => {
  const [toggle, setToggle] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const activeMenuSet = (value) =>
    setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value) =>
      value === activeMenu ? { display: "block" } : { display: "none" };
  const router = useRouter();

  const [address, setAddress] = useState();

  console.log('Address', address)

  const getDeliveryUrl = async (e) => {
    e.preventDefault();
    localStorage.setItem('mainCityName', address);
    const currentCity = localStorage.getItem('mainCityName');
    console.log("Local Strodge", currentCity)
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
      } else {
        router.push(`/ca/${province_id}/${city}`);
      }
    }
  };

  return (
    <header className="header-area header-area-one d-xl-none">
      <div className="header-navigation sticky breakpoint-on">
        <div className="container-fluid">
          <div className="primary-menu">
            <div className="row">
              <div className="col-lg-2 col-5">
                <div className="site-branding">
                  <Link href="/">
                    <a className="brand-logo">
                      <img
                        src="/assets/images/flooringmetaverselogo.png"
                        alt="Brand Logo"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-5">
                <div className={`nav-menu ${toggle ? "menu-on" : ""}`}>
                  <div
                    className="navbar-close"
                    onClick={() => setToggle(false)}
                  >
                    <i className="ti-close"></i>
                  </div>
                  <nav className="main-menu">
                    <ul>
                      <Home />
                      <li className="menu-item has-children">
                        <Link href="#">
                          <a>Hardwood</a>
                        </Link>
                        <ul className="sub-menu" style={activeLi("Hardwood")}>
                          <Hardwood cityInfo={cityInfo} />
                        </ul>
                        <span
                          className="dd-trigger"
                          onClick={() => activeMenuSet("Hardwood")}
                        >
                          <i className="ti-arrow-down"></i>
                        </span>
                      </li>
                      <li className="menu-item has-children">
                        <Link href="#">
                          <a>Laminate</a>
                        </Link>
                        <ul className="sub-menu" style={activeLi("Laminate")}>
                          <Laminate cityInfo={cityInfo} />
                        </ul>
                        <span
                          className="dd-trigger"
                          onClick={() => activeMenuSet("Laminate")}
                        >
                          <i className="ti-arrow-down"></i>
                        </span>
                      </li>
                      <li className="menu-item has-children">
                        <Link href="#">
                          <a>Vinyl</a>
                        </Link>
                        <ul className="sub-menu" style={activeLi("Vinyl")}>
                          <Vinyl cityInfo={cityInfo} />
                        </ul>
                        <span
                          className="dd-trigger"
                          onClick={() => activeMenuSet("Vinyl")}
                        >
                          <i className="ti-arrow-down"></i>
                        </span>
                      </li>
                      <li className="menu-item has-children">
                        <Link href="#">
                          <a>Tile</a>
                        </Link>
                        <ul className="sub-menu" style={activeLi("Tile")}>
                          <Tile cityInfo={cityInfo} />
                        </ul>
                        <span
                          className="dd-trigger"
                          onClick={() => activeMenuSet("Tile")}
                        >
                          <i className="ti-arrow-down"></i>
                        </span>
                      </li>
                      <li className="menu-item has-children">
                        <Link href="#">
                          <a>Carpet</a>
                        </Link>
                        <ul className="sub-menu" style={activeLi("Carpet")}>
                          <Carpet cityInfo={cityInfo} />
                        </ul>
                        <span
                          className="dd-trigger"
                          onClick={() => activeMenuSet("Carpet")}
                        >
                          <i className="ti-arrow-down"></i>
                        </span>
                      </li>
                      <Brands cityInfo={cityInfo} />
                      {/* <Blog /> */}
                      <li className="menu-item has-children">
                        <div className="mr-5 mt-1 mobile_menu">
                          <Link href="/listing-name">
                            <a className="btn-root login-btn">+ ADD LISTING</a>
                          </Link>
                        </div>
                      </li>

                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-1 col-1 col-md-2 col-sm-2 align-items-left">
                <div className="header-right-nav">
                  <ul className="d-flex align-items-center">
                    <li className="user-btn">
                      <Link href="/">
                        <a className="icon">
                          <i className="flaticon-avatar"></i>
                        </a>
                      </Link>
                    </li>
                    <li className="nav-toggle-btn">
                      <div
                        className={`navbar-toggler ${toggle ? "active" : ""}`}
                        onClick={() => setToggle(!toggle)}
                      >
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
                            types: ["geocode", "establishment"],
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
export default MobileMenu;
