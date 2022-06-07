import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Accordion, Tab, Nav, Breadcrumb } from "react-bootstrap";
import ListingDetailsRight from "../../components/ListingDetailsRight";
import Layout from "../../components/layout/Layout";
import { getStrapiMedia } from "../../lib/media";
import { fetchAPI } from "../../lib/api";

const Name = () => {
  const { query } = useRouter()
  const [business, setBusiness] = useState("")

  useEffect(() => {
    (async () => {
      const businessesRes = await fetchAPI("/businesses", {
        filters: {
          slug: query['slug'],
        },
        populate: "*",
      });
      setBusiness(businessesRes.data[0]);
    })();
  }, []);

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
                        <li>
                          <i className="flaticon-star-1" />
                        </li>
                        <li>
                          <i className="flaticon-star-1" />
                        </li>
                        <li>
                          <i className="flaticon-star-1" />
                        </li>
                        <li>
                          <i className="flaticon-star-1" />
                        </li>
                        <li>
                          <i className="flaticon-star-1" />
                        </li>
                        <li>
                          <span className="ml-2">
                            <a href="#">(02 Reviews)</a>
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
                    <h3 className="title mt-4">Popular Business in {business.attributes.canada_city?.data?.attributes.city_ascii}</h3>
                    <p>
                      {business.attributes.description}
                    </p>
                    <p className="para">
                      Eros senectus etiam sed habitasse arcu habitant nulla nam
                      amet sociis leo suspendisse in dignissim litora venenatis
                      torquent tempor dapibus ridiculus consectetuer nece sagittis{" "}
                    </p>
                  </div>
                  <div className="description-wrapper mb-45">
                    <div className="row">
                      <div className="col-lg-12">
                        <Tab.Container defaultActiveKey={"reviews"}>
                          <div className="description-tabs">
                            <Nav as="ul" className="nav nav-tabs">
                              {/* <Nav.Item as="li">
                                <Nav.Link
                                  as="a"
                                  href="#products"
                                  eventKey="products"
                                >
                                  Products
                                </Nav.Link>
                              </Nav.Item> */}
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
                                    <li className="review">
                                      <div className="review-thumb">
                                        <img
                                          src="/assets/images/products/review-thumb-1.jpg"
                                          alt="review thumb"
                                        />
                                      </div>
                                      <div className="review-content">
                                        <h4>John F. Medina</h4>
                                        <span className="date">25 May 2021</span>
                                        <ul className="ratings ratings-four">
                                          <li className="star">
                                            <i className="flaticon-star-1" />
                                          </li>
                                          <li className="star">
                                            <i className="flaticon-star-1" />
                                          </li>
                                          <li className="star">
                                            <i className="flaticon-star-1" />
                                          </li>
                                          <li className="star">
                                            <i className="flaticon-star-1" />
                                          </li>
                                          <li className="star">
                                            <i className="flaticon-star-1" />
                                          </li>
                                        </ul>
                                        <p>
                                          Sed ut perspiciatis unde omnis iste
                                          natus error sit voluptatem accusantium
                                          doloremque laudantium, totam rem
                                          aperiam, eaque ipsa quae ab illo
                                          inventore veritatis et quasi architecto
                                          beatae vitae dicta sunt explicabo.
                                        </p>
                                        <a href="#" className="reply">
                                          Reply
                                        </a>
                                      </div>
                                    </li>
                                    <li className="review">
                                      <div className="review-thumb">
                                        <img
                                          src="/assets/images/products/review-thumb-2.jpg"
                                          alt="review thumb"
                                        />
                                      </div>
                                      <div className="review-content">
                                        <h4>John F. Medina</h4>
                                        <span className="date">25 May 2021</span>
                                        <ul className="ratings ratings-five">
                                          <li className="star">
                                            <i className="flaticon-star-1" />
                                          </li>
                                          <li className="star">
                                            <i className="flaticon-star-1" />
                                          </li>
                                          <li className="star">
                                            <i className="flaticon-star-1" />
                                          </li>
                                          <li className="star">
                                            <i className="flaticon-star-1" />
                                          </li>
                                          <li className="star">
                                            <i className="flaticon-star-1" />
                                          </li>
                                        </ul>
                                        <p>
                                          Sed ut perspiciatis unde omnis iste
                                          natus error sit voluptatem accusantium
                                          doloremque laudantium, totam rem
                                          aperiam, eaque ipsa quae ab illo
                                          inventore veritatis et quasi architecto
                                          beatae vitae dicta sunt explicabo.
                                        </p>
                                        <a href="#" className="reply">
                                          Reply
                                        </a>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="products-review-form">
                                  <h4 className="title">Leave Your Reviews</h4>
                                  <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                      <div className="col-lg-12">
                                        <div className="form_group">
                                          <ul className="ratings mb-20">
                                            <li>
                                              <span>Your Rating</span>
                                            </li>
                                            <li className="star">
                                              <i className="flaticon-star-1" />
                                            </li>
                                            <li className="star">
                                              <i className="flaticon-star-1" />
                                            </li>
                                            <li className="star">
                                              <i className="flaticon-star-1" />
                                            </li>
                                            <li className="star">
                                              <i className="flaticon-star-1" />
                                            </li>
                                            <li className="star">
                                              <i className="flaticon-star-1" />
                                            </li>
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
                                            required=""
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="form_group">
                                          <input
                                            type="email"
                                            className="form_control"
                                            placeholder="Email Address"
                                            name="email"
                                            required=""
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12">
                                        <div className="form_group">
                                          <textarea
                                            className="form_control"
                                            placeholder="Write Message"
                                            name="comment"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-12">
                                        <div className="form_group">
                                          <button className="main-btn">
                                            Submit
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
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

export default Name;
