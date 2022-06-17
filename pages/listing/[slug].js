import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Accordion, Tab, Nav, Breadcrumb } from "react-bootstrap";
import ListingDetailsRight from "../../components/ListingDetailsRight";
import Layout from "../../components/layout/Layout";
import { getStrapiMedia } from "../../lib/media";
import { fetchAPI } from "../../lib/api";
import { Rating } from 'react-simple-star-rating'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import http from "../../components/http";
import { Rings } from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import dateFormat from "dateformat";
import qs from 'qs';



// import { DynamicStar } from 'react-dynamic-star';
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'

const Name = () => {
  const { query } = useRouter()
  const [business, setBusiness] = useState("")
  const [allReviews, setAllReviews] = useState("")
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [starReview, setStarReview] = useState("")
  const router = useRouter()

  const actualRating = rating / 20;
  console.log("ACTUAL RATING");
  console.log("rating", allReviews.data)

  const handleRating = (rate) => {
    setRating(rate)
  }


  function formatMyDate(value, locale = 'en-GB') {
    return new Date(value).toLocaleDateString(locale);
  }
  const handleSubmit = async (values, { resetForm }) => {
    console.log("SUBMITTING", values)
    setLoading(true);

    const { name, email, message } = values;

    const data = {
      "Name": name,
      "Email": email,
      "Message": message,
      // "date": formatMyDate(date),
      "business": business?.id,
      "rating": actualRating,
    }

    console.log("DATA", data)


    // if (!errorFlag) {
    // await axios.post('/api/business-review', {
    //   "data": data
    // })
    const login = await http.post(`/api/auth/local`, {
      identifier: "freelance1773@gmail.com",
      password: "greenland712",
      // identifier: process.env.LOGIN_EMAIL_PROD,
      // password: process.env.LOGIN_PASSWORD_PROD,
    })
    console.log("DATA", data)
    await http.post('/api/business-reviews', {
      "data": data
    }, {
      headers: {
        Authorization: `Bearer ${login.data.jwt}`
      }
    })
    setLoading(false);
    toast('Review Added Sucessfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    resetForm();
    router.reload(window.location.pathname)
  }

  useEffect(() => {
    (async () => {
      const businessesRes = await fetchAPI("/businesses", {
        filters: {
          slug: query['slug'],
        },
        populate: "*",
      });

      // console.log("BUSINESS", business)
      if (businessesRes?.data[0]) {
        setBusiness(businessesRes.data[0]);

        (async () => {
          const reviewRes = await fetchAPI(`/business-reviews`, {
            filters: {
              business: businessesRes.data[0].id
            },
            populate: "*",
          });
          setAllReviews(reviewRes);
        })();
      }

    })();

  }, []);

  // All Reviews Calculation
  const totalReviews = allReviews?.data?.length
  const result = allReviews?.data?.reduce((total, currentValue) => total = total + currentValue.attributes?.rating, 0) / totalReviews;
  const totalStars = 5;



  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be three or more characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });
  const initialValues = {
    name: "",
    email: "",
    message: "",
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
              <Link href="">
                Listing
              </Link>

            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      {business &&
        <section className="page-breadcrumbs page-breadcrumbs-one pt-20 pb-10">
          <div className="container">
            <div className="breadcrumbs-wrapper-one">
              <div className="row align-items-center">
                <div className="col-lg-5 col-md-12">
                  <div className="listing-info-name">
                    <div className="info-name d-flex">
                      <div className="thumb">
                        <Image
                          src={getStrapiMedia(business.attributes.business_logo)}
                          alt="Listing Image"
                          width="270px"
                          height="195px"
                        />
                      </div>
                      <div className="content">
                        <span className="cat-btn">
                          {business?.attributes?.services?.data[0]?.attributes.name}
                        </span>
                        <h3>{business.attributes.name}</h3>
                        <p className="tag">
                          <a href="#">Popular Business</a>,
                          <a href="#">{business.attributes.canada_city?.data?.attributes.city_ascii}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="listing-info-content">
                    <div className="content">
                      <ul className="ratings ratings-three">
                        {[...new Array(totalStars)].map((arr, index) => {
                          return index < result ? <span className="active_star">
                            <AiTwotoneStar size={14} />
                          </span> : <span><AiOutlineStar size={14} /></span>;
                        })}
                        <li>
                          <span className="ml-2">
                            <a >({totalReviews} Reviews)</a>
                          </span>
                        </li>
                      </ul>
                      <div className="listing-meta">
                        <ul>
                          <li>
                            <span>
                              <i className="ti-location-pin" />
                              {business.attributes.address}
                            </span>
                          </li><br />
                          <li>
                            <span>
                              <i className="ti-tablet" />
                              <a href={`tel:${business.attributes.phone_number}`}>{business.attributes.phone_number}</a>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="button">
                    <Link href="">
                      <a className="icon-btn">
                        <i className="ti-heart" />
                      </a>
                    </Link>
                    <Link href="">
                      <a className="icon-btn">
                        <i className="ti-share" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
      {/*====== End Breadcrumbs section ======*/}
      {/*====== Start Listing Details section ======*/}
      {business &&
        <section className="listing-details-section pt-20 pb-20">
          <div className="container">
            <div className="row">
              <ListingDetailsRight business={business} />
              <div className="col-lg-8">
                <div className="listing-details-wrapper listing-details-wrapper-one">
                  <div className="listing-content mb-20 wow fadeInUp">
                    <h3 className="title mt-4">Popular Business in {business?.attributes?.city} of {business?.attributes?.state}</h3>
                    <p>
                      {business.attributes.description}
                    </p>
                  </div>
                  <div className="description-wrapper mb-45">
                    <div className="row">
                      <div className="col-lg-12">
                        <Tab.Container defaultActiveKey={"reviews"}>
                          <div className="description-tabs">
                            <Nav as="ul" className="nav nav-tabs">
                              <Nav.Item as="li">
                                <Nav.Link
                                  as="a"
                                  href="#reviews"
                                  eventKey="reviews"
                                >
                                  Reviews
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </div>
                          <Tab.Content className="tab-content mt-30">
                            <Tab.Pane eventKey="reviews">
                              <div className="products-review-wrapper mb-25">
                                <div className="products-review-area mb-45">
                                  <ul className="review-list">

                                    {allReviews?.data?.length != 0 && (
                                      <>
                                        {allReviews.data?.map((review) => {

                                          const activeStars = review?.attributes?.rating;
                                          return (
                                            <>
                                              <li className="review">
                                                <div className="review-thumb">
                                                  <img
                                                    src="/assets/images/avatar.png"
                                                    alt="review thumb"
                                                  />
                                                </div>
                                                <div className="review-content">
                                                  <h4>{review?.attributes?.Name}</h4>
                                                  {[...new Array(totalStars)].map((arr, index) => {
                                                    return index < activeStars ? <span className="active_star">
                                                      <AiTwotoneStar />
                                                    </span> : <AiOutlineStar />;
                                                  })}

                                                  {/* <Rating ratingValue={review?.attributes?.rating} /> */}
                                                  {/* <DynamicStar rating={review?.attributes?.rating} outlined /> */}
                                                  <p className="date">
                                                    {dateFormat(review?.attributes?.createdAt, "dd, mmmm, yyyy")}
                                                  </p>

                                                  <p>
                                                    {review?.attributes?.Message}
                                                  </p>

                                                </div>
                                              </li>
                                            </>
                                          )
                                        })}

                                      </>
                                    )}


                                  </ul>
                                </div>
                                <div className="products-review-form">
                                  <h4 className="title">Leave Your Reviews</h4>
                                  {loading ? (
                                    <div className="loading_section">
                                      <Rings color="#00BFFF" height={130} width={130} />
                                    </div>
                                  ) : (
                                    <form onSubmit={formik.handleSubmit}>
                                      <div className="row">
                                        <div className="col-lg-12">
                                          <div className="form_group">
                                            <ul className="ratings mb-20">
                                              <li>
                                                <span>Your Rating</span>
                                              </li>
                                              <Rating onClick={handleRating} ratingValue={rating} />
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="col-lg-6">
                                          <div className="form_group">
                                            <input
                                              type="text"
                                              className="form_control"
                                              placeholder="Full Name"
                                              name="name"
                                              autoComplete="off"
                                              onChange={formik.handleChange}
                                              onBlur={formik.handleBlur}
                                              value={formik.values.name}
                                              required
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
                                              placeholder="Email Address"
                                              name="email"
                                              onChange={formik.handleChange}
                                              onBlur={formik.handleBlur}
                                              value={formik.values.email}
                                              required
                                            />
                                          </div>
                                          {formik.touched.email && formik.errors.email ? (
                                            <div className="error">{formik.errors.email}</div>
                                          ) : null}
                                        </div>
                                        <div className="col-lg-12">
                                          <div className="form_group">
                                            <textarea
                                              className="form_control"
                                              placeholder="Write Message"
                                              name="message"
                                              autoComplete="off"
                                              onChange={formik.handleChange}
                                              onBlur={formik.handleBlur}
                                              value={formik.values.message}
                                              required
                                            />
                                          </div>
                                          {formik.touched.message && formik.errors.message ? (
                                            <div className="error">{formik.errors.message}</div>
                                          ) : null}
                                        </div>
                                        <div className="col-lg-12">
                                          <div className="form_group">
                                            <button className="main-btn" type="submit">
                                              Submit
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  )}

                                </div>
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </Tab.Container>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />

        </section>
      }
    </Layout>
  );
};

// export async function getStaticPaths() {
//   const businessesRes = await fetchAPI("/businesses", { fields: ["slug"] });

//   return {
//     paths: businessesRes.data.map((business) => ({
//       params: {
//         slug: business.attributes.slug,
//       },
//     })),
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const businessesRes = await fetchAPI("/businesses", {
//     filters: {
//       slug: params.slug,
//     },
//     populate: "*",
//   });

//   return {
//     props: { business: businessesRes.data[0] },
//     revalidate: 1,
//   };
// }

// export const getStaticProps = async () => {
//   const res = await fetchAPI(`/business-reviews`);
//   return {
//     props: {
//       reviews: res
//     }
//   }
// }

export default Name;
