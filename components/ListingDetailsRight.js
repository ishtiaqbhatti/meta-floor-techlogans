import React from "react";

const ListingDetailsRight = ({ business }) => {
  console.log("All Business Data", business)
  const filterCategory = business.attributes.service_categories.data;
  const hardWoodData = filterCategory && filterCategory?.filter(function (city) {
    return city.attributes.name.split(' ')[0] === "Hardwood";
  });
  const vinyalData = filterCategory && filterCategory?.filter(function (city) {
    return city.attributes.name.split(' ')[0] === "Vinyl";
  });
  const laminateData = filterCategory && filterCategory?.filter(function (city) {
    return city.attributes.name.split(' ')[0] === "Laminate";
  });
  const tileData = filterCategory && filterCategory?.filter(function (city) {
    return city.attributes.name.split(' ')[0] === "Tile";
  });
  const carpetData = filterCategory && filterCategory?.filter(function (city) {
    return city.attributes.name.split(' ')[0] === "Carpet";
  });
  console.log('Filter Category', hardWoodData)
  return (
    <div className="col-lg-4">
      <div className="sidebar-widget-area">
        <div className="widget business-hour-widget reservation-form-widget mb-30 wow fadeInUp">
          <h4 className="widget-title">Services Provide</h4>
          <ul className="time-info">
            {hardWoodData?.length != 0 && (
              <>
                <li className="main_category">
                  Hardwood
                </li>
                {hardWoodData?.map((item) => {
                  return (
                    <>
                      <li className="ml-4">
                        {item.attributes.name}
                      </li>
                    </>
                  )
                })}
              </>
            )}
            {vinyalData?.length != 0 && (
              <>
                <li className="main_category">
                  Vinyl
                </li>
                {vinyalData?.map((item) => {
                  return (
                    <>
                      <li className="ml-4">
                        {item.attributes.name}
                      </li>
                    </>
                  )
                })}
              </>
            )}
            {laminateData?.length != 0 && (
              <>
                <li className="main_category">
                  Laminate
                </li>
                {laminateData?.map((item) => {
                  return (
                    <>
                      <li className="ml-4">
                        {item.attributes.name}
                      </li>
                    </>
                  )
                })}
              </>
            )}
            {tileData?.length != 0 && (
              <>
                <li className="main_category">
                  Tile
                </li>
                {tileData?.map((item) => {
                  return (
                    <>
                      <li className="ml-4">
                        {item.attributes.name}
                      </li>
                    </>
                  )
                })}
              </>
            )}
            {carpetData?.length != 0 && (
              <>
                <li className="main_category" >
                  Carpet
                </li>
                {carpetData?.map((item) => {
                  return (
                    <>
                      <li className="ml-4">
                        {item.attributes.name}
                      </li>
                    </>
                  )
                })}
              </>
            )}

          </ul>

        </div>
        <div className="widget contact-info-widget mb-30 wow fadeInUp">
          <div className="contact-info-widget-wrap">
            <div className="contact-map">
              <iframe src={`https://maps.google.com/maps?q=${business.attributes.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`} />
              <a href="#" className="support-icon">
                <i className="flaticon-headphone" />
              </a>
            </div>
            <div className="contact-info-content">
              <h4 className="widget-title">Contact Info</h4>
              <div className="info-list">
                <p>
                  <i className="ti-tablet" />
                  <a href={`tel:${business.attributes.phone_number}`}>{business.attributes.phone_number}</a>
                </p>
                <p>
                  <i className="ti-location-pin" />
                  {business.attributes.address}
                </p>
                <p>
                  <i className="ti-email" />
                  <a href={`mailto:${business.attributes.contact_email}`}>{business.attributes.contact_email}</a>
                </p>
                {business.attributes.website &&
                  <p>
                    <i className="ti-world" />
                    <a href={business.attributes.website}>{business.attributes.website}</a>
                  </p>
                }
              </div>
            </div>

          </div>
        </div>
        <div className="widget business-hour-widget mb-30 wow fadeInUp">
          <h4 className="widget-title">Business Hour</h4>
          <ul className="time-info">
            <li>
              <span className="day">Monday</span>
              <span className="time">

                {business.attributes.work_hours.monday_open_time === '' && business.attributes.work_hours.monday_close_time === '' ? <span className="st-close"> Closed </span> : `${business.attributes.work_hours.monday_open_time} - ${business.attributes.work_hours.monday_close_time}`}

                {/* 08:00 - 17:00 */}
              </span>
            </li>
            <li>
              <span className="day">Tuesday</span>
              <span className="time">
                {business.attributes.work_hours.tuesday_open_time === '' && business.attributes.work_hours.tuesday_close_time === '' ? <span className="st-close"> Closed </span> : `${business.attributes.work_hours.tuesday_open_time} - ${business.attributes.work_hours.tuesday_close_time}`}
              </span>
            </li>
            <li>
              <span className="day">Wednesday</span>
              <span className="time">
                {business.attributes.work_hours.wednesday_open_time === '' && business.attributes.work_hours.wednesday_close_time === '' ? <span className="st-close"> Closed </span> : `${business.attributes.work_hours.wednesday_open_time} - ${business.attributes.work_hours.wednesday_close_time}`}
              </span>
            </li>
            <li>
              <span className="day">Thursday</span>
              <span className="time">
                {business.attributes.work_hours.thursday_open_time === '' && business.attributes.work_hours.thursday_close_time === '' ? <span className="st-close"> Closed </span> : `${business.attributes.work_hours.thursday_open_time} - ${business.attributes.work_hours.thursday_close_time}`}
              </span>
            </li>
            <li>
              <span className="day">Friday</span>
              <span className="time">
                {business.attributes.work_hours.friday_open_time === '' && business.attributes.work_hours.friday_close_time === '' ? <span className="st-close"> Closed </span> : `${business.attributes.work_hours.friday_open_time} - ${business.attributes.work_hours.friday_close_time}`}
              </span>
            </li>
            <li>
              <span className="day">Saturday</span>
              <span className="time">
                {business.attributes.work_hours.saturday_open_time === '' && business.attributes.work_hours.saturday_close_time === '' ? <span className="st-close"> Closed </span> : `${business.attributes.work_hours.saturday_open_time} - ${business.attributes.work_hours.saturday_close_time}`}
              </span>
            </li>
            <li>
              <span className="day">Sunday</span>
              <span className="time">
                {business.attributes.work_hours.sunday_open_time === '' && business.attributes.work_hours.sunday_close_time === '' ? <span className="st-close"> Closed </span> : `${business.attributes.work_hours.sunday_open_time} - ${business.attributes.work_hours.sunday_close_time}`}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ListingDetailsRight;
