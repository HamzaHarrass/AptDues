import { useState } from 'react';
import '../../styles/style.css';
import '../../styles/bootstrap.min.css';
import location from '../../images/input-location.png';
import room from '../../images/input-room.png';
import prix from '../../images/input-price.png';

const Appartement = () => {
  const [formData, setFormData] = useState({
    address: '',
    prix: '',
    room: '',
    status: 'available',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/appartements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response);
      if (response.ok) {
        try {
          const data = await response.json();
          setMessageType('success');
          setMessage('Apartment added successfully');
          setFormData({
            address: '',
            prix: '',
            room: '',
            status: 'available',
          });
          console.log('Apartment added successfully:', data);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError.message);
        }
      } else {
        try {
          const errorData = await response.json();
          setMessageType('error');
          setMessage(`Failed to add apartment: ${errorData.error}`);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError.message);
        }
      }
    } catch (error) {
      setMessageType('error');
      setMessage(`Error: ${error.message}`);
      console.error('Error:', error.message);
    }
  };

  return (
    <section className="find_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>
            Add <br />
            Appartement
          </h2>
        </div>
        <div className="form_tab_container">
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <ul className="nav" data-tabs="tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="https://html.design/demo/evernest/index.html#rent"
                    data-toggle="tab"
                  >
                    For Rent
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content text-center">
            <div className="tab-pane active" id="rent">
              <div className="Rent_form find_form">
                {message !== '' && (
                  <p className={`text-${messageType === 'success' ? 'success' : 'danger'}`}>
                    {message}
                  </p>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="col-md-6 px-0">
                      <div className="form-group ">
                        <div className="input-group ">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <img src={location} alt="Location Image" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Enter your Landmark Location"
                            value={formData.address}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 px-0">
                      <div className="form-group">
                        <div className="input-group ">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <img src={prix} alt="Money Image" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="prix"
                            placeholder="prix"
                            value={formData.prix}
                            onChange={handleChange}
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
                              <img src={room} alt="Room Image" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="room"
                            placeholder="Room"
                            value={formData.room}
                            onChange={handleChange}
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

export default Appartement;
