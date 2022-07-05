import React, { Fragment, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ImageView from "../ImageView";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import { activeNavMenu, animation, getSlug, niceSelect, stickyNav } from "../utils";
import { fetchAPI } from "../../lib/api";

const Layout = ({ children, category }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["city", "province_id"])
  const [cityName, setCityName] = useState();
  // const currentCity = localStorage.getItem('mainCityName');
  const [myLocalStorageData, setMyLocalStorageData] = useState()
  const filterState = cityName && cityName?.filter(function (city) {
    return city.attributes.city_ascii === myLocalStorageData;
  });
  useEffect(() => {
    //logic for getting a local storage value
    const data = localStorage.getItem('mainCityName');
    if (data) {
      setMyLocalStorageData(data);
      (
        (async () => {
          // const currentCity = localStorage.getItem('mainCityName');
          const articlesRes = await fetchAPI(`/canada-cities?`, {
            filters: {
              city_ascii: data,
            },
            populate: "*",
          });
          setCityName(articlesRes.data);
        })()
      )
    }
    // setMyLocalStorageData(data)

  }, [])


  const currentCityData = filterState && filterState[0].attributes?.city_ascii
  const currentProvinceData = filterState && filterState[0].attributes?.province_id

  const [cityInfo, setCityInfo] = useState({
    city: 'toronto',
    province_id: 'on'
  })
  // const cityInfo = {
  //   province_id: currentProvinceData && currentProvinceData,
  //   city: currentCityData && currentCityData
  // }
  console.log("Local Strodge", currentProvinceData)
  const getLocation = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(showPosition, error, options);

    function showPosition(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://us1.locationiq.com/v1/reverse.php?key=pk.208fe6b58f412dc962ed45ca46ee8a61&lat=" +
        lat +
        "&lon=" +
        lng +
        "&format=json",
        true
      );
      xhr.send();
      xhr.onreadystatechange = processRequest;
      xhr.addEventListener("readystatechange", processRequest, false);
      async function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          const cityInfoItems = await fetchAPI("/canada-cities", {
            filters: {
              city_ascii: response.address.city,
            },
            populate: "*",
          });
          const cityInfoItem = cityInfoItems.data[0];
          if (cookie.city != undefined) {
            const currentCity = {
              province_id: cookie.province_id,
              city: cookie.city
            }
            setCityInfo(currentCity)
          } else {
            if (cityInfoItem == undefined) {
              const currentCity = {
                province_id: "on",
                city: "toronto"
              }
              setCityInfo(currentCity)
            } else {
              const currentCity = {
                province_id: cityInfoItem.attributes.province_id.toLowerCase(),
                city: getSlug(cityInfoItem.attributes.city_ascii)
              }
              setCityInfo(currentCity)
            }
          }
          return;
        }
      }
    };
  };

  const handleInfo = ({ city, province_id }) => {
    removeCookie("city", { path: '/' })
    removeCookie("province_id", { path: '/' })
    setCookie("city", city, { path: '/' })
    setCookie("province_id", province_id, { path: '/' })
    const newCityInfo = {
      city: city,
      province_id: province_id
    }
    setCityInfo(newCityInfo)
  }

  useEffect(() => {
    animation();
    // niceSelect();
    activeNavMenu();
    window.addEventListener("scroll", stickyNav);
    getLocation();
    // setCityInfo(newCityInfoStatic)
    // console.log("All Console data", cityInfo)
  }, []);

  return (
    <Fragment>
      <ImageView />
      <MobileMenu category={category} cityInfo={cityInfo} setInfo={handleInfo} />
      <Header category={category} cityInfo={cityInfo} setInfo={handleInfo} />
      {children} <Footer cityInfo={cityInfo} />
    </Fragment>
  );
};
export default Layout;
