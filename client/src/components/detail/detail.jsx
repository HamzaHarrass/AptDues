import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import '../../assets/styles/Detail.css'
import Navbar from '../../assets/views/common/Navbar.jsx'


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }

    return this.props.children;
  }
}

const Detail = () => {
  const [paiements, setPaiements] = useState([]);
  const { id } = useParams();
    console.log(id);
  useEffect(() => {
    axios.get(`http://localhost:3000/api/paiements/${id}`)
      .then(response => {
        console.log(response.data);
        setPaiements(response.data);
      })
      .catch(error => {
        console.error('Error fetching payments:', error.response.data);
      });
  }, [id]);
  if (!paiements || paiements.length === 0) {
    return <div>Loading...</div>;
  }

  const payment = paiements[0]; 

  return (
<>
<Navbar></Navbar>
<ErrorBoundary>
      <div className='table1'>
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
