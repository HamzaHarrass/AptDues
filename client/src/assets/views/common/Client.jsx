import '../../styles/style.css';
import '../../styles/bootstrap.min.css';
import utilisateur from '../../images/utilisateur.png';
import telephone from '../../images/telephone_159832.png';
import CIN from '../../images/id-card.png';

const Client = () => {
 
  return (
    <section className="find_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>
            Add <br />
            client
          </h2>
        </div>
        <div className="form_tab_container">
          <div className="tab-content text-center">
            <div className="tab-pane active" id="rent">
              <div className="Rent_form find_form">
                
                <form onSubmit={''}>
                  <div className="form-row">
                    <div className="col-md-6 px-0">
                      <div className="form-group ">
                        <div className="input-group ">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <img src={utilisateur} alt="Location Image" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={'Entre votre nom'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 px-0">
                      <div className="form-group">
                        <div className="input-group ">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <img src={utilisateur} alt="Money Image" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="prix"
                            value={'Entre votre prenom'}
                          />
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
                              <img src={telephone} alt="Room Image" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="room"
                            placeholder="Room"
                            value={'Entre votre telephone'}
                            onChange={'handleChange'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 px-0">
                      <div className="form-group">
                        <div className="input-group ">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <img src={CIN} alt="Room Image" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="room"
                            placeholder="Room"
                            value={'Entre votre CIN'}
                            onChange={'handleChange'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-box">
                    <button type="submit">
                      <span>Find Now</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Client;
