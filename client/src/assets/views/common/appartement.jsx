import { useState, useEffect } from 'react';
import '../../styles/style.css';
import '../../styles/bootstrap.min.css';
import image from '../../images/p-3.png';
import axios from 'axios';

function Appartement() {
  const [appartements, setAppartements] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/appartements') 
      .then(response => {
        setAppartements(response.data);
      })
      .catch(error => {
        console.error('Error fetching appartements:', error);
      });
  }, []);

  const getStatusColor = (status) => {
    // if (status === 'occupied') {
    //   return 'red';
    // }

    switch (status) {
      case 'available':
        return 'text-success';
      case 'under maintenance':
        return 'text-warning';
      case 'occupied':
        return 'text-danger';
      default:
        return 'text-black';
    }
  };

  return (
    <section className="centre  find_section property_section layout_padding pr_mobile_20">
      <div className="container-fluid max_width-1500">
        <div className="row background">
          <div className="col-lg-10 mx-auto">
            <div className="heading_container"></div>
            <div className="row">
              {appartements.map((appartement,index) => (
                <div key={appartement._id} className="col-md-4 col-sm-6">
                  <div className="box" style={{ border: `2px solid ${getStatusColor(appartement.status)}` }}>
                    <div className="number_box">
                      <h5>{index + 1}</h5>
                    </div>
                    <div className="img-box">
                      <img src={image} alt="Property Image" />
                    </div>
                    <div className="detail-box">
                      <h6>
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 323.25 475.54">
                          <g className="cls-1">
                            <path className="" d="M397.29,537.57q-17.4-22.82-29.89-41.29-54.88-77.16-89.12-148.35Q267.4,325.1,261.44,308.8a265.19,265.19,0,0,1-12-40.75Q233.72,188.18,287,128.4q50.53-57.6,129.87-54.34a147.84,147.84,0,0,1,66.84,18.2,164.16,164.16,0,0,1,53.25,45.92,155.85,155.85,0,0,1,28.8,63.57,166.86,166.86,0,0,1-4.89,85.32q-23.37,73.35-77.7,156.5Q467.37,468,433.7,515.29l-22.83,32.07a12.16,12.16,0,0,0-1.63,1.9c-.36.54-1.72-.27-4.07-2.45A62.64,62.64,0,0,1,397.29,537.57Zm89.66-300a77,77,0,0,0-9-38.31,81.36,81.36,0,0,0-26.62-29.89,72,72,0,0,0-37.23-12.77A84.73,84.73,0,0,0,372,165.07a75,75,0,0,0-30.7,27.45q-11.42,17.92-12.5,41.29a69.89,69.89,0,0,0,9,38.31A84.82,84.82,0,0,0,365.23,302a69.32,69.32,0,0,0,37.49,12.23,81.72,81.72,0,0,0,41.3-8.43,75.29,75.29,0,0,0,30.43-27.44Q485.87,260.45,487,237.62Z" transform="translate(-245.88 -73.88)"></path>
                          </g>
                        </svg>
                        <span>{appartement.address} -</span>
                        <span className={`${getStatusColor(appartement.status)}`}>{appartement.status}</span>
                      </h6>
                      <a href="#">
                        <span>Detail</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Appartement;
