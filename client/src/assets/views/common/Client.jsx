import { useState } from 'react';
import '../../styles/style.css';
import '../../styles/bootstrap.min.css';
import utilisateur from '../../images/utilisateur.png';
import telephone from '../../images/telephone_159832.png';
import CIN from '../../images/id-card.png';

const Client = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    cin: '',
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
      const response = await fetch('http://localhost:3000/api/clients', {
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
          setMessage('Client added successfully');
          setFormData({
            nom: '',
            prenom: '',
            telephone: '',
            cin: '',
          });
          console.log('Client added successfully:', data);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError.message);
        }
      } else {
        try {
          const errorData = await response.json();
          console.error('Failed to add client:', errorData.error);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError.message);
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <section className="find_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>
            Add client
          </h2>
        </div>
        <div className="form_tab_container">
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
                              <img src={utilisateur} alt="Location Image" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="nom"
                            placeholder="Enter your name"
                            value={formData.nom}
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
                              <img src={utilisateur} alt="Money Image" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="prenom"
                            placeholder="Enter your surname"
                            value={formData.prenom}
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
                              <img src={telephone} alt="Room Image" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="telephone"
                            placeholder="Enter your telephone"
                            value={formData.telephone}
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
                              <img src={CIN} alt="Room Image" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="cin"
                            placeholder="Enter your CIN"
                            value={formData.cin}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-box">
                    <button type="submit">
                      <span>Submit</span>
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
