import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/Detail.css';
import Navbar from '../../assets/views/common/Navbar.jsx';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error, errorInfo) => {
    console.error('Error caught by error boundary:', error, errorInfo);
    setHasError(true);
  };

  return hasError ? (
    <div>Something went wrong. Please try again later.</div>
  ) : (
    <div onError={handleError}>{children}</div>
  );
};

const Detail = () => {
  const [paiements, setPaiements] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/paiements/${id}`)
      .then(response => {
        console.log(response.data);
        setPaiements(response.data);
      })
      .catch(error => {
        console.error('Error fetching payments:', error.response.data);
      });
  }, [id]);



  const payment = paiements[0];

  return (
    <>
      <Navbar></Navbar>
      <ErrorBoundary>
        <div className="table1">
          <h2>Historique</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Address</th>
                <th scope="col">Client</th>
                <th scope="col">Prix</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Facture</th>
              </tr>
            </thead>
            <tbody>
              {paiements.map((payment, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{payment.appartement.address}</td>
                  <td>{`${payment.client.nom} ${payment.client.prenom}`}</td>
                  <td>{payment.appartement.prix}</td>
                  <td>{payment.date}</td>
                  <td>{payment.appartement.status}</td>
                  <td>
                    <button className="btn btn-info">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default Detail;
