import '../../styles/style.css'
import '../../styles/bootstrap.min.css'
import image from '../../images/slider-img.png'

const body = () => {
  return (
    <section className="slider_section pl_mobile_20">
    <div className="background section_bg section_bg_right" style={{}}></div>
    <div className="name_design">
      <h6>
        RealEstate
      </h6>
    </div>
    <div id="customSlider1" className="carousel slide " data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active carousel-item-left">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <div className="detail-box mb_md_75">
                  <h1>
                    Apartment <br/>
                    For You
                  </h1>
                  <p>
                    There are many variations of passages of Lorem Ipsum available,
                  </p>
                  <a href="https://html.design/demo/evernest/contact.html" className="hero_btn">
                    <span>
                      Contact Us
                    </span>
                    <span className="icon_span">
                      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 331.64 322.79">
                        <title>right-arrow</title>
                        <g className="cls-1">
                          <path className="" d="M259.32,281.46H448.91l-70.75-70.74a13.44,13.44,0,0,1,0-17.69L408,163.73a12.05,12.05,0,0,1,17.68,0L574.38,312.42a12,12,0,0,1,0,17.68L425.69,478.79a12,12,0,0,1-17.68,0l-29.85-29.3a13.43,13.43,0,0,1,0-17.68l75.72-75.73H259.32a12.28,12.28,0,0,1-12.71-12.71V293.63a11.68,11.68,0,0,1,3.59-8.57A12.4,12.4,0,0,1,259.32,281.46Z" transform="translate(-246.61 -159.87)"></path>
                        </g>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-md-7">
                <div className="img-box">
                  <img src={image}alt="Appartment Image"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item carousel-item-next carousel-item-left">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <div className="detail-box mb_md_75">
                  <h1>
                    Apartment <br/>
                    For You
                  </h1>
                  <p>
                    There are many variations of passages of Lorem Ipsum available,
                  </p>
                  <a href="https://html.design/demo/evernest/contact.html" className="hero_btn">
                    <span>
                      Contact Us
                    </span>
                    <span className="icon_span">
                      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 331.64 322.79">
                        <title>right-arrow</title>
                        <g className="cls-1">
                          <path className="" d="M259.32,281.46H448.91l-70.75-70.74a13.44,13.44,0,0,1,0-17.69L408,163.73a12.05,12.05,0,0,1,17.68,0L574.38,312.42a12,12,0,0,1,0,17.68L425.69,478.79a12,12,0,0,1-17.68,0l-29.85-29.3a13.43,13.43,0,0,1,0-17.68l75.72-75.73H259.32a12.28,12.28,0,0,1-12.71-12.71V293.63a11.68,11.68,0,0,1,3.59-8.57A12.4,12.4,0,0,1,259.32,281.46Z" transform="translate(-246.61 -159.87)"></path>
                        </g>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-md-7">
                <div className="img-box">
                  <img src={image} alt="Appartment Image"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> 
   )
}

export default body