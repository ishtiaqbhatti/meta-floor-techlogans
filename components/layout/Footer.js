import Link from "next/link";
import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  AiOutlineTwitter,
  AiFillFacebook,
  AiFillLinkedin
} from "react-icons/ai";

const Footer = ({ cityInfo }) => {
  return (
    <footer className="footer-area ">
      <div className="footer-image">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="footer_upper_section text_section mt-3">
                <div className="inner_text">
                  <h2>Find Flooring Stores & Contractors Near You</h2>
                  <Link href="/ca">
                    <a className="btn-root register-btn">Learn More</a>
                  </Link>
                  <button />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="footer_upper_section mt-3">
                <img
                  src="/assets/images/flooring.webp"
                  alt=""
                  className="rounded img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_inside py-5">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <img
                src="/assets/images/flooringmetaverselogo.png"
                alt="footer-logo"
                width="60%"
                className="s7-image"
              />
              <div className="">
                <p className="footer-content px-3">
                  Flooring Metaverse is your source for all flooring. Find
                  stores & contractors, read product & brand reviews, or learn
                  how to just about any flooring job you can think of! We have
                  it all in one place - the Flooring Metaverse!
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-12">
              <h6 className="footer-menu-header mt-4 px-3">SOCIAL LINKS</h6>
              <p className="footer-menu-content px-3">
                <Link href="https://twitter.com/">
                  <a className="footer-menu-item" target="_blank">
                    <AiOutlineTwitter
                      size={24}
                      className="footer-social-icons"
                    />TWITTER
                  </a>
                </Link>
                <Link href="https://www.facebook.com/">
                  <a className="footer-menu-item" target="_blank">
                    <AiFillFacebook
                      size={24}
                      className="footer-social-icons"
                    />
                    FACEBOOK
                  </a>
                </Link>
                <Link href="https://www.linkedin.com/login">
                  <a className="footer-menu-item" target="_blank">
                    <AiFillLinkedin
                      size={24}
                      className="footer-social-icons"
                    />
                    LINKEDIN
                  </a>
                </Link>
              </p>
            </div>
            <div className="col-lg-2 col-md-6 col-12">
              <h6 className="footer-menu-header mt-4 px-3">SITE NAVIGATION</h6>
              <p className="footer-menu-content px-3">
                <Link href="/">
                  <a className="footer-menu-item">HOME</a>
                </Link>
                <Link href="/brand">
                  <a className="footer-menu-item">BRANDS</a>
                </Link>
                <Link href="/blog/blog-category">
                  <a className="footer-menu-item">BLOG</a>
                </Link>
              </p>
            </div>

            <div className="col-lg-2 col-md-6 col-12">
              <h6 className="footer-menu-header mt-4 px-3">IMPORTANTS LINKS</h6>
              <p className="footer-menu-content px-3">
                <Link
                  href={`/ca/${cityInfo.province_id}/${cityInfo.city}/hardwood-floor-store`}
                >
                  <a className="footer-menu-item">HARDWOOD</a>
                </Link>
                <Link
                  href={`/ca/${cityInfo.province_id}/${cityInfo.city}/laminate-floor-store`}
                >
                  <a className="footer-menu-item">LAMINATE</a>
                </Link>
                <Link
                  href={`/ca/${cityInfo.province_id}/${cityInfo.city}/vinyl-floor-store`}
                >
                  <a className="footer-menu-item">VINYL</a>
                </Link>
                <Link
                  href={`/ca/${cityInfo.province_id}/${cityInfo.city}/carpet-floor-store`}
                >
                  <a className="footer-menu-item">CARPET</a>
                </Link>
                <Link
                  href={`/ca/${cityInfo.province_id}/${cityInfo.city}/tile-store`}
                >
                  <a className="footer-menu-item">TILE</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area">
        <div className=" align-items-center">
          <div className="copyright-text">
            <p>Copyright &copy; 2022. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
