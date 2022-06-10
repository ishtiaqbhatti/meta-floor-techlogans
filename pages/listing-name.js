import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import ReCaptcha from "react-google-recaptcha";
import Autocomplete from "react-google-autocomplete"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import SelectSearch, { fuzzySearch } from 'react-select-search';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { getSlug } from "../components/utils";
import http from "../components/http";
import { fetchAPI } from '../lib/api';
import PreLoader from '../components/PreLoader';
import { Rings } from 'react-loader-spinner'

const AddListing = ({ candaCity }) => {
  const router = useRouter()
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [address, setAddress] = useState({})
  const [image, setImage] = useState(null);
  const [showTime, setShowTime] = useState(true)
  const [tushowTime, setTushowTime] = useState(true)
  const [wshowTime, setWshowTime] = useState(true)
  const [tshowTime, setTshowTime] = useState(true)
  const [fshowTime, setFshowTime] = useState(true)
  const [sshowTime, setSshowTime] = useState(true)
  const [suhowTime, setSuhowTime] = useState(true)
  const [loading, setLoading] = useState(false)
  const [selectState, setSelectState] = useState("")
  const [selectcity, setSelectCity] = useState("")
  const [workHours, setWorkHours] = useState({ monday_open_time: "", monday_close_time: "", tuesday_open_time: "", tuesday_close_time: "", wednesday_open_time: "", wednesday_close_time: "", thursday_open_time: "", thursday_close_time: "", friday_open_time: "", friday_close_time: "", saturday_open_time: "", saturday_close_time: "", sunday_open_time: "", sunday_close_time: "" })
  // const [loader, setLoader] = useState(false)
  const [cities, setCities] = useState(null);

  // All States
  const allStates = candaCity?.data
  function uniqState(data, key) {
    return [
      ...new Map(
        data.map(x => [key(x), x])
      ).values()
    ]
  }

  // unique States
  const uniqueCitie = uniqState(allStates, it => it.attributes.province_name);
  const uniqueCities = uniqueCitie.sort((a, b) => {
    let fa = a.attributes.province_name.toLowerCase(),
      fb = b.attributes.province_name.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  console.log("Selected State", selectState)

  // Filter Cities
  const filterSta = allStates && allStates?.filter(function (city) {
    return city.attributes.province_name === selectState;
  });

  const filterState = filterSta.sort((a, b) => {
    let fa = a.attributes.city_ascii.toLowerCase(),
      fb = b.attributes.city_ascii.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  // filter Array City

  let cityOptions = []
  for (let i = 0; i < filterState.length; i++) {
    let cityObj = {}
    cityObj.name = filterState[i].attributes.city_ascii;
    cityObj.value = filterState[i].attributes.city_ascii;
    cityOptions.push(cityObj)
  }

  console.log("State City name", cityOptions);


  const handleCategory = async (e) => {
    if (e.target.checked) {
      setCategory([...category, e.target.value])
    }
    else {
      setCategory([...category.filter(categoryItem => categoryItem !== e.target.value)])
    }
  }

  const handleSubCategory = (e) => {
    if (e.target.checked) {
      setSubCategory([...subCategory, e.target.value])
    }
    else {
      setSubCategory([...subCategory.filter(categoryItem => categoryItem !== e.target.value)])
    }
  }

  // console.log("WORK HOURS", workHours)

  const handleWorkHours = e => {
    const { name, value } = e.target;
    setWorkHours(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  console.log("CATEGORY", subCategory)

  const previewImage = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
    var output = document.getElementById('blah');
    output.style.display = 'block';
    output.src = URL.createObjectURL(e.target.files[0]);
  }

  const handleSubmit = async (values, { resetForm }) => {
    console.log("SUBMITTING", values)
    setLoading(true);

    const { name, email, contact_email, phone, description, tagline, website } = values;

    // setLoader(true)  
    // e.preventDefault();
    const id = toast.loading("Please wait...")

    // let errorFlag = false
    const slug = getSlug(name)
    const categoryRes = []
    for (let i = 0; i < subCategory.length; i++) {
      await fetchAPI("/service-categories", {
        filters: {
          name: subCategory[i]
        }
      })
        .then((response) => {
          categoryRes.push(response.data[0])
        })
        .catch((error) => {
          console.log(error)
          // setLoader(false)
        })
    }

    const serviceRes = []
    for (let i = 0; i < category.length; i++) {
      console.log("CATEGORY", category[i])
      await fetchAPI("/services", {
        filters: {
          name: category[i],
        }
      })
        .then((response) => {
          console.log("RESPONSE", response)
          serviceRes.push(response.data[0])
        })
        .catch((error) => {
          console.log("ERROR", error)
          console.log(error)
          // setLoader(false)
        })
    }
    // const cityRes = await fetchAPI('/canada-cities', {
    //   filters: {
    //     city_ascii: city
    //   }
    // })
    // const provinceRes = await fetchAPI('/canada-cities', {
    //   filters: {
    //     province_id: state
    //   }
    // })

    // console.log("Canada Cities", cityRes)

    // if (cityRes.data[0] == "" || cityRes.data[0] == undefined) {
    //   alert("Please select a city correctly")
    //   // setLoader(false)
    //   // errorFlag = true
    // }

    let imageID = ""
    const formData = new FormData();
    formData.append("files", image);
    const login = await http.post(`/api/auth/local`, {
      identifier: "freelance1773@gmail.com",
      password: "greenland712",
    })
    // const loginData = await http.post(`/api/auth/local`, {
    //   identifier: process.env.LOGIN_EMAIL || "info@theflooringmetaverse.com",
    //   password: process.env.LOGIN_PASSWORD || "test@123",
    // })
    await http.post('/api/upload', formData, {
      headers: {
        Authorization: `Bearer ${login.data.jwt}`
      }
    })
      .then(response => {
        imageID = response.data[0].id
      })

      .catch(error => {
        console.log(error);
        // setLoader(false)
        // errorFlag = true
        // alert("Please upload your business logo")
      })

    const data = {
      "name": name,
      "email": email,
      "address": address,
      "phone_number": phone,
      "website": website,
      "tagline": tagline,
      "description": description,
      "contact_email": contact_email,
      "slug": slug,
      "business_logo": imageID,
      "services": serviceRes,
      "service_categories": categoryRes,
      "work_hours": JSON.stringify(workHours),
      "state": selectState,
      "city": selectcity
    }

    console.log("DATA", data)
    setLoading(false);
    router.push('/')
    toast('Listing Added Sucessfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // if (!errorFlag) {
    await http.post('/api/businesses', {
      "data": data
    },
      {
        headers: {
          Authorization: `Bearer ${login.data.jwt}`
        }
      }
    )
    // .catch((error) => {
    //   setLoader(false)
    //   errorFlag = true
    //   alert("Error occured. Try again")
    //   router.push('/listing-name')
    // })
    // }
    // setLoader(false)
    // if (!errorFlag) {

    // }
    resetForm
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be three or more characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contact_email: Yup.string()
      .email("Invalid Contact Email format")
      .required("Contact Email is required"),
    phone: Yup.string()
      .matches(/^[0-9\s]+$/, "Only number are allowed for this field ")
      .required("Phone Number is required"),
    description: Yup.string().required("Description is required"),
    tagline: Yup.string().required("Tagline is required"),
    // city: Yup.string().required("City is required"),
  });
  const initialValues = {
    name: "",
    email: "",
    contact_email: "",
    phone: "",
    description: "",
    tagline: "",
    website: "",
    tagline: ""
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    // onSubmit: function (values) {
    //   console.log("HELLO", values)
    // },
    // validate,
    validationSchema,
  });

  // console.log("FUNCTION", typeof (formik.handleSubmit))


  return (
    <Layout>
      {/* {loader && <PreLoader />}
      {loader == false &&  */}
      <div className="banner_location text-center">
        <h2>Add Listing</h2>
      </div>

      <section className="add-listing  pb-120">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>

            <div className="add-listing-form details-listing-form  wow fadeInUp">
              <h4 className="title">Business Information</h4>
              <div className="row">

                <div className="col-lg-6">
                  <div className="form_group">
                    <input
                      type="text"
                      className="form_control"
                      placeholder="Business Name *"
                      name="name"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                  </div>
                  {formik.touched.name && formik.errors.name ? (
                    <div className="error">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="col-lg-6">
                  <div className="form_group">
                    <input
                      type="email"
                      className="form_control"
                      placeholder="Business Email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="add-listing-form col-lg-12 pt-1">
                  <div className="form_group file-input-one d-flex">
                    <label className='mr-2'>Business Logo:</label>
                    <input type="file" name="Image" id="imgInp" onChange={previewImage} required />
                    <img id="blah" src="#" alt=" " width="50px" style={{ display: "none" }} />
                    {/* <div className="upload-content">
                          <div className="upload-title-icon d-flex align-items-center justify-content-center">
                            {file.length == 0 &&
                              <img
                                src="/assets/images/elements/input-1.png"
                                alt="Image"
                              />
                            }
                            {file.length != 0 && 
                              <img id="blah" src="#" alt="preview image" />
                            }
                          </div>
                        </div> */}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form_group">
                    <Autocomplete
                      name="address"
                      className="form_control"
                      placeholder="Address *"
                      required
                      apiKey={process.env.GOOGLE_API_KEY}
                      onPlaceSelected={(place) => {
                        setAddress(place.formatted_address)
                      }}
                      options={{
                        types: ["geocode", "establishment"],
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form_group">
                    <input
                      type="text"
                      className="form_control"
                      placeholder="Phone"
                      name="phone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                  </div>
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="error">{formik.errors.phone}</div>
                  ) : null}
                </div>
                <div className="col-lg-6">
                  <div className="form_group">
                    <input
                      type="url"
                      className="form_control"
                      placeholder="Website"
                      name="website"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.website}
                    />
                  </div>
                  {/* {formik.touched.website && formik.errors.website ? (
                    <div className="error">{formik.errors.website}</div>
                  ) : null} */}
                </div>
                <div className="col-lg-6">
                  <div className="form_group">
                    <input
                      type="text"
                      className="form_control"
                      placeholder="Tagline"
                      name="tagline"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.tagline}
                    />
                  </div>
                  {/* {formik.touched.tagline && formik.errors.tagline ? (
                    <div className="error">{formik.errors.tagline}</div>
                  ) : null} */}
                </div>
                <div className="col-lg-12">
                  <div className="form_group">
                    <textarea
                      className="form_control"
                      placeholder="Description"
                      name="description"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                    />
                  </div>
                  {formik.touched.description && formik.errors.description ? (
                    <div className="error">{formik.errors.description}</div>
                  ) : null}
                </div>
                <div className="col-lg-12">
                  <div className="form_group d-flex justify-content-around mobile_category">
                    {/* <div className="single-checkbox d-flex">
                          <input
                            type="radio"
                            id="check1"
                            name="radio"
                            value="Brand"
                            defaultChecked=""
                          />
                          <label htmlFor="check1">
                            <span>Brand</span>
                          </label>
                        </div> */}
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="check2" name="checkbox" value="Hardwood" onChange={handleCategory} />
                      <label htmlFor="check2">
                        <span>Hardwood</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="check3" name="checkbox" value="Laminate" onChange={handleCategory} />
                      <label htmlFor="check3">
                        <span>Laminate</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="check4" name="checkbox" value="Vinyl" onChange={handleCategory} />
                      <label htmlFor="check4">
                        <span>Vinyl</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="check5" name="checkbox" value="Tile" onChange={handleCategory} />
                      <label htmlFor="check5">
                        <span>Tile</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="check6" name="checkbox" value="Carpet" onChange={handleCategory} />
                      <label htmlFor="check6">
                        <span>Carpet</span>
                      </label>
                    </div>
                  </div>
                </div>
                {category.indexOf("Hardwood") != -1 && <div className="col-lg-12">
                  <p>Service Category for Hardwood</p><hr />
                  <div className="form_group d-flex justify-content-around mobile_category">
                    <div className="single-checkbox d-flex">
                      <input
                        type="checkbox"
                        id="hardwood1"
                        name="category"
                        value="Hardwood Floor Refinishing"
                        onChange={handleSubCategory}
                      />
                      <label htmlFor="hardwood1">
                        <span>Hardwood Floor Refinishing</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="hardwood2" name="category" value="Hardwood Floor Installation" onChange={handleSubCategory} />
                      <label htmlFor="hardwood2">
                        <span>Hardwood Floor Installation</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="hardwood3" name="category" value="Hardwood Floor Repair" onChange={handleSubCategory} />
                      <label htmlFor="hardwood3">
                        <span>Hardwood Floor Repair</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="hardwood4" name="category" value="Hardwood Floor Cleaning" onChange={handleSubCategory} />
                      <label htmlFor="hardwood4">
                        <span>Hardwood Floor Cleaning</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="hardwood5" name="category" value="Hardwood Floor Store" onChange={handleSubCategory} />
                      <label htmlFor="hardwood5">
                        <span>Hardwood Floor Store</span>
                      </label>
                    </div>
                  </div>
                </div>}
                {category.indexOf("Laminate") != -1 && <div className="col-lg-12">
                  <p>Service Category for Laminate</p><hr />
                  <div className="form_group d-flex justify-content-around mobile_category">
                    <div className="single-checkbox d-flex">
                      <input
                        type="checkbox"
                        id="laminate1"
                        name="category"
                        value="Laminate Flooring Installation"
                        onChange={handleSubCategory}
                      />
                      <label htmlFor="laminate1">
                        <span>Laminate Flooring Installation</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="laminate2" name="category" value="Laminate Flooring Store" onChange={handleSubCategory} />
                      <label htmlFor="laminate2">
                        <span>Laminate Flooring Store</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="laminate3" name="category" value="Laminate Floor Repair" onChange={handleSubCategory} />
                      <label htmlFor="laminate3">
                        <span>Laminate Floor Repair</span>
                      </label>
                    </div>
                  </div>
                </div>}
                {category.indexOf("Vinyl") != -1 && <div className="col-lg-12">
                  <p>Service Category for Vinyl</p><hr />
                  <div className="form_group d-flex justify-content-around mobile_category">
                    <div className="single-checkbox d-flex">
                      <input
                        type="checkbox"
                        id="vinyl1"
                        name="category"
                        value="Vinyl Flooring Store"
                        onChange={handleSubCategory}
                      />
                      <label htmlFor="vinyl1">
                        <span>Vinyl Flooring Store</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="vinyl2" name="category" value="Vinyl Flooring Installation" onChange={handleSubCategory} />
                      <label htmlFor="vinyl2">
                        <span>Vinyl Floor Installation</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="vinyl3" name="category" value="Vinyl Flooring Repair" onChange={handleSubCategory} />
                      <label htmlFor="vinyl3">
                        <span>Vinyl Floor Repair</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="vinyl4" name="category" value="Vinyl Deck Repair" onChange={handleSubCategory} />
                      <label htmlFor="vinyl4">
                        <span>Vinyl Deck Repair</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="vinyl5" name="category" value="Vinyl Decking Installation" onChange={handleSubCategory} />
                      <label htmlFor="vinyl5">
                        <span>Vinyl Decking Installation</span>
                      </label>
                    </div>
                  </div>
                </div>}
                {category.indexOf("Tile") != -1 && <div className="col-lg-12">
                  <p>Service Category for Tile</p><hr />
                  <div className="form_group d-flex justify-content-around mobile_category">
                    <div className="single-checkbox d-flex">
                      <input
                        type="checkbox"
                        id="tile1"
                        name="category"
                        value="Tile Store"
                        onChange={handleSubCategory}
                      />
                      <label htmlFor="tile1">
                        <span>Tile Store</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="tile2" name="category" value="Vinyl Flooring Installation" onChange={handleSubCategory} />
                      <label htmlFor="tile2">
                        <span>Tile Installer</span>
                      </label>
                    </div>
                  </div>
                </div>}
                {category.indexOf("Carpet") != -1 && <div className="col-lg-12">
                  <p>Service Category for Carpet</p><hr />
                  <div className="form_group d-flex justify-content-around mobile_category">
                    <div className="single-checkbox d-flex">
                      <input
                        type="checkbox"
                        id="carpet1"
                        name="category"
                        value="Carpet Cleaning"
                        onChange={handleSubCategory}
                      />
                      <label htmlFor="carpet1">
                        <span>Carpet Cleaning</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="carpet2" name="category" value="Carpet Installer" onChange={handleSubCategory} />
                      <label htmlFor="carpet2">
                        <span>Carpet Installer</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="carpet3" name="category" value="Carpet Repair" onChange={handleSubCategory} />
                      <label htmlFor="carpet3">
                        <span>Carpet Repair</span>
                      </label>
                    </div>
                    <div className="single-checkbox d-flex">
                      <input type="checkbox" id="carpet4" name="category" value="Carpet Store" onChange={handleSubCategory} />
                      <label htmlFor="carpet4">
                        <span>Carpet Store</span>
                      </label>
                    </div>
                  </div>
                </div>}
                <div className="col-lg-6">
                  <div className="form_group">
                    <input
                      type="email"
                      className="form_control"
                      placeholder="Contact Email *"
                      name="contact_email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.contact_email}
                    />
                  </div>
                  {formik.touched.contact_email && formik.errors.contact_email ? (
                    <div className="error">{formik.errors.contact_email}</div>
                  ) : null}
                </div>
                <div className="col-lg-3">
                  <select className="form_control" onChange={e => setSelectState(e.target.value)} required>
                    <option selected >Select State</option>
                    <option value="Canada State" >Canada State</option>
                    {uniqueCities && uniqueCities?.sort().map((state) => {
                      return (
                        <>
                          <option value={state.attributes?.province_name} >{state.attributes?.province_name}</option>
                        </>
                      )
                    })}
                  </select>
                </div>
                <div className="col-lg-3">
                  <select className="form_control" onChange={e => setSelectCity(e.target.value)} required>
                    <option selected >Select City</option>
                    <option value="Canda City" >Canda City</option>
                    {cityOptions && cityOptions?.sort().map((city) => {
                      return (
                        <>
                          <option value={city.value} >{city.name}</option>
                        </>
                      )
                    })}
                  </select>

                </div>
              </div>
            </div>
            {/* <div className="add-listing-form map-form mb-60 wow fadeInUp">
                  <div className="map-box">
                    <iframe src="https://maps.google.com/maps?q=new%20york&t=&z=13&ie=UTF8&iwloc=&output=embed" />
                  </div>
                </div> */}
            <div className="add-listing-form timing-listing-form wow fadeInUp">
              <h4 className="title">Opening Hours</h4>
              <div className="row">
                <div className="col-lg-12">
                  <div
                    className="timeing-list opening_hours"

                  >
                    <div className="row">
                      <h5 className="col-lg-2 col-6">Monday</h5>
                      <div className="col-lg-2 col-6">
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="monday_closed" name="checkbox" value="Monday Closed" onChange={() => setShowTime(!showTime)} />
                          <label htmlFor="monday_closed">
                            <span>Closed</span>
                          </label>
                        </div>
                      </div>
                      {showTime === true && (
                        <div className="col-lg-8 col-12">
                          <div className="row">
                            <div className="col-lg-6 col-12">
                              <label htmlFor="MondayOpen">Open Time:</label>
                              <input type="time" name="monday_open_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                            <div className="col-lg-6 col-12">
                              <label htmlFor="MondayClose">Close Time:</label>
                              <input type="time" name="monday_close_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                  <div
                    className="timeing-list opening_hours"
                  >
                    <div className="row">
                      <h5 className="col-lg-2 col-6">Tuesday</h5>
                      <div className="col-lg-2 col-6">
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="tuesday_closed" name="checkbox" value="Tuesday Closed" onChange={() => setTushowTime(!tushowTime)} />
                          <label htmlFor="tuesday_closed">
                            <span>Closed</span>
                          </label>
                        </div>
                      </div>
                      {tushowTime === true && (
                        <div className="col-lg-8 col-md-8 col-12">
                          <div className="row">
                            <div className="col-lg-6">
                              <label htmlFor="TuesdayOpen">Open Time:</label>
                              <input type="time" name="tuesday_open_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="TuesdayClose">Close Time:</label>
                              <input type="time" name="tuesday_close_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>
                  <div
                    className="timeing-list opening_hours"
                  >
                    <div className="row">
                      <h5 className="col-lg-2 col-6">Wednesday</h5>
                      <div className="col-lg-2 col-6">
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="wednesday_closed" name="checkbox" value="Wednesday Closed" onChange={() => setWshowTime(!wshowTime)} />
                          <label htmlFor="wednesday_closed">
                            <span>Closed</span>
                          </label>
                        </div>
                      </div>
                      {wshowTime === true && (
                        <div className="col-lg-8 col-12">
                          <div className="row">
                            <div className="col-lg-6 col-12">
                              <label htmlFor="WednesdayOpen">Open Time:</label>
                              <input type="time" id="WednesdayOpen" name="wednesday_open_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                            <div className="col-lg-6 col-12">
                              <label htmlFor="WednesdayClose">Close Time:</label>
                              <input type="time" id="WednesdayClose" name="wednesday_close_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                          </div>
                        </div>
                      )}


                    </div>

                  </div>
                  <div
                    className="timeing-list opening_hours"
                  >
                    <div className="row">
                      <h5 className="col-lg-2 col-6">Thursday</h5>
                      <div className="col-lg-2 col-6">
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="thursday_closed" name="checkbox" value="Tuesday Closed" onChange={() => setTshowTime(!tshowTime)} />
                          <label htmlFor="thursday_closed">
                            <span>Closed</span>
                          </label>
                        </div>
                      </div>
                      {tshowTime === true && (
                        <div className="col-lg-8 col-12">
                          <div className="row">
                            <div className="col-lg-6 col-12">
                              <label htmlFor="ThursdayOpen">Open Time:</label>
                              <input type="time" id="ThursdayOpen" name="thursday_open_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                            <div className="col-lg-6 col-12">
                              <label htmlFor="ThursdayClose">Close Time:</label>
                              <input type="time" id="ThursdayClose" name="thursday_close_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>
                  <div
                    className="timeing-list opening_hours"

                  >
                    <div className="row">
                      <h5 className="col-lg-2 col-6">Friday</h5>
                      <div className="col-lg-2 col-6">
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="friday_closed" name="checkbox" value="Friday Closed" onChange={() => setFshowTime(!fshowTime)} />
                          <label htmlFor="friday_closed">
                            <span>Closed</span>
                          </label>
                        </div>
                      </div>
                      {fshowTime === true && (
                        <div className="col-lg-8 col-12">
                          <div className="row">
                            <div className="col-lg-6 col-12">
                              <label htmlFor="FridayOpen">Open Time:</label>
                              <input type="time" id="FridayOpen" name="friday_open_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                            <div className="col-lg-6 col-12">
                              <label htmlFor="FridayClose">Close Time:</label>
                              <input type="time" id="FridayClose" name="friday_close_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                          </div>
                        </div>
                      )}


                    </div>

                  </div>
                  <div
                    className="timeing-list opening_hours"

                  >
                    <div className="row">
                      <h5 className="col-lg-2 col-6">Saturday</h5>
                      <div className="col-lg-2 col-6">
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="saturday_closed" name="checkbox" value="Saturday Closed" onChange={() => setSshowTime(!sshowTime)} />
                          <label htmlFor="saturday_closed">
                            <span>Closed</span>
                          </label>
                        </div>
                      </div>
                      {sshowTime === true && (
                        <div className="col-lg-8 col-12">
                          <div className="row">
                            <div className="col-lg-6 col-12">
                              <label htmlFor="SaturdayOpen">Open Time:</label>
                              <input type="time" id="SaturdayOpen" name="saturday_open_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                            <div className="col-lg-6 col-12">
                              <label htmlFor="SaturdayClose">Close Time:</label>
                              <input type="time" id="SaturdayClose" name="saturday_close_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                  <div
                    className="timeing-list opening_hours"
                  >
                    <div className="row">
                      <h5 className="col-lg-2 col-6">Sunday</h5>
                      <div className="col-lg-2 col-6">
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="sundaydayClosed" name="checkbox" value="Sunday Closed" onChange={() => setSuhowTime(!suhowTime)} />
                          <label htmlFor="sundaydayClosed">
                            <span>Closed</span>
                          </label>
                        </div>
                      </div>
                      {suhowTime === true && (
                        <div className="col-lg-8 col-12">
                          <div className="row">
                            <div className="col-lg-6 col-12">
                              <label htmlFor="SundayOpen">Open Time:</label>
                              <input type="time" id="SundayOpen" name="sunday_open_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                            <div className="col-lg-6 col-12">
                              <label htmlFor="SundayClose">Close Time:</label>
                              <input type="time" id="SundayClose" name="sunday_close_time" className="time form_control" onChange={handleWorkHours} />
                            </div>
                          </div>
                        </div>
                      )}


                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* <ReCaptcha
              sitekey="6LfPitYfAAAAAPUGdaJjX2aUcA5iJ_eC7NaP2zcp"
              // onChange={handleVerifyRecaptcha}
              theme="dark"
            /> */}
            <div className="mt-2 button text-center">
              <button type="submit" value="Submit Listing" className="main-btn icon-btn">Submit</button>
            </div>

          </form>


        </div>
      </section>
      <ToastContainer />
      {loading === true && (
        <div className="loading_section">
          <Rings color="#00BFFF" height={130} width={130} />
        </div>
      )}
      {/* } */}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const res = await fetchAPI(`/canada-cities`);
  return {
    props: {
      candaCity: res
    }
  }
}

export default AddListing;
