import React from "react";
import Layout from "../../components/layout/Layout";
import Blog from "../../components/Blog/Blog";
import { fetchAPI } from "../../lib/api";
import Seo from '../../components/seo'
import Head from "next/head"

const blog = ({ articles, categories, homepage }) => {
  return (
    <Layout>
      <Head>
        <title>Brands, Find Flooring Services</title>
        <meta property="title" content="Find Top-Rated Flooring Services in Brands - Flooring Metaverse" />
      </Head>
      <Seo seo={homepage.attributes.seo} />
      <div className="home-header">
        <img
          src="/assets/images/flooring-banner.jpg"
          width="100%"
          style={{ height: "100%" }}
          alt="home-header"
        />
        <div className="home-header-content">
          <div className="home-header-body">
            <h1 style={{ width: "80%" }} className="MuiTypography-root MuiTypography-h1 MuiTypography-alignLeft">
              Our Blogs
            </h1>
          </div>
        </div>
      </div>
      <Blog articles={articles} categories={categories} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { res } = context;
  res.setHeader('Cache-Control', `s-maxage=60, stale-while-revalidate`)
  // Run API calls in parallel
  const [articleRes, categoryRes, homepageRes] = await Promise.all([
    fetchAPI("/articles", { populate: ["image", "category", "writer"] }),
    fetchAPI("/categories", { populate: "*" }),
    fetchAPI("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
      },
    }),
  ]);

  return {
    props: {
      articles: articleRes.data,
      categories: categoryRes.data,
      homepage: homepageRes.data,
    }
    // revalidate: 1,
  };
}

export default blog;
