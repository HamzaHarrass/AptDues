import '../../styles/style.css'
import '../../styles/bootstrap.min.css'
import location from '../../images/input-location.png'
import property from '../../images/input-property.png'
import room from '../../images/input-room.png'
import prix from '../../images/input-price.png'

const Perfect = () => {
  return (
    <section className="find_section layout_padding">
    <div className="container">
      <div className="heading_container">
        <h2>
          Add <br/>
          Appartement
        </h2>
      </div>
      <div className="form_tab_container">
        <div className="nav-tabs-navigation">
          <div className="nav-tabs-wrapper">
            <ul className="nav " data-tabs="tabs">
              <li className="nav-item">
                <a className="nav-link active" href="https://html.design/demo/evernest/index.html#rent" data-toggle="tab">For Rent</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab-content text-center">
          <div className="tab-pane active" id="rent">
            <div className="Rent_form find_form">
              <form action="https://html.design/demo/evernest/index.html#">
                <div className="form-row">
                  <div className="col-md-6 px-0">
                    <div className="form-group ">
                      <div className="input-group ">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <img src={location} alt="Location Image"/>
                          </div>
                        </div>
                        <input type="text" className="form-control" id="inputRentDestination" placeholder="Enter your Landmark Location"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 px-0">
                    <div className="form-group ">
                      <div className="input-group ">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <img src={property} alt="Property Image"/>
                          </div>
                        </div>
                        <input type="text" className="form-control" id="inputRentPropery" placeholder="All Properties"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6 px-0">
                    <div className="form-group">
                      <div className="input-group ">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <img src={room} alt="Room Image"/>
                          </div>
                        </div>
                        <input type="text" className="form-control" id="inputRentPropery" placeholder="room"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 px-0">
                    <div className="form-group">
                      <div className="input-group ">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <img src={prix} alt="Money Image"/>
                          </div>
                        </div>
                        <input type="text" className="form-control" id="inputRentPrice" placeholder="Price"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-box">
                  <button type="submit" className="">
                    <span>
                      find Now
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="tab-pane" id="buy">
            <div className="Buy_form find_form">
              <form action="https://html.design/demo/evernest/index.html#">
                <div className="form-row">
                  <div className="col-md-6 px-0">
                    <div className="form-group ">
                      <div className="input-group ">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <img src="./input-location.png" alt="Location Image"/>
                          </div>
                        </div>
                        <input type="text" className="form-control" id="inputBuyDestination" placeholder="Enter your Landmark Location"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 px-0">
                    <div className="form-group ">
                      <div className="input-group ">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <img src="./input-property.png" alt="Property Image"/>
                          </div>
                        </div>
                        <input type="text" className="form-control" id="inputBuyPropery" placeholder="All Properties"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6 px-0">
                    <div className="form-group">
                      <div className="input-group ">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <img src="./input-room.png" alt="Room Image"/>
                          </div>
                        </div>
                        {/* <div className="nice-select form-control" ><span className="current">BHK </span><ul className="list"><li data-value="BHK" data-display="BHK " className="option selected">BHK</li><li data-value="1" className="option">1 </li><li data-value="2" className="option">2 </li><li data-value="3" className="option">3 </li></ul></div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 px-0">
                    <div className="form-group">
                      <div className="input-group ">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <img src="./input-price.png" alt="Money Image"/>
                          </div>
                        </div>
                        <input type="text" className="form-control" id="inputBudget" placeholder="Budget"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-box">
                  <button type="submit" className="">
                    <span>
                      find Now
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
   )
}

export default Perfect